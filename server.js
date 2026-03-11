const path = require('path');
const fs = require('fs');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { v4: uuid } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3000;

// Pasta pública
const publicDir = path.join(__dirname, 'public');
const dataDir = path.join(__dirname, 'data');
const usersFile = path.join(dataDir, 'users.json');

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}
if (!fs.existsSync(usersFile)) {
  fs.writeFileSync(usersFile, JSON.stringify([]));
}

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'iasd-milagres-secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 // 1 dia
    }
  })
);

app.use(express.static(publicDir));

function readUsers() {
  try {
    const content = fs.readFileSync(usersFile, 'utf8');
    return JSON.parse(content);
  } catch (e) {
    return [];
  }
}

function writeUsers(users) {
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
}

function findUserByEmail(email) {
  const users = readUsers();
  const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  return { user, users };
}

function requireAuth(req, res, next) {
  if (!req.session.userId) {
    return res.redirect('/login');
  }
  next();
}

// Rotas de páginas (URLs limpas)
app.get('/', (req, res) => {
  res.sendFile(path.join(publicDir, 'index.html'));
});

app.get('/cultos', (req, res) => {
  res.sendFile(path.join(publicDir, 'cultos.html'));
});

app.get('/sobre', (req, res) => {
  res.sendFile(path.join(publicDir, 'sobre.html'));
});

app.get('/local', (req, res) => {
  res.sendFile(path.join(publicDir, 'local.html'));
});

app.get('/imagens', (req, res) => {
  res.sendFile(path.join(publicDir, 'imagens.html'));
});

app.get('/contato', (req, res) => {
  res.sendFile(path.join(publicDir, 'contato.html'));
});

app.get('/politica-de-privacidade', (req, res) => {
  res.sendFile(path.join(publicDir, 'politica-de-privacidade.html'));
});

app.get('/login', (req, res) => {
  if (req.session.userId) {
    return res.redirect('/perfil');
  }
  res.sendFile(path.join(publicDir, 'login.html'));
});

app.get('/perfil', requireAuth, (req, res) => {
  res.sendFile(path.join(publicDir, 'perfil.html'));
});

// API de autenticação
app.post('/api/auth/register', (req, res) => {
  const { nome, email, senha, igreja, idade, cargo } = req.body;

  if (!nome || !email || !senha || !igreja || !cargo) {
    return res.status(400).json({ message: 'Preencha todos os campos obrigatórios.' });
  }

  const { user: existingUser, users } = findUserByEmail(email);
  if (existingUser) {
    return res.status(409).json({ message: 'Já existe um cadastro com este email.' });
  }

  const newUser = {
    id: uuid(),
    nome,
    email: email.toLowerCase(),
    senha, // Para produção, utilizar hash (bcrypt). Aqui é apenas demo.
    igreja,
    idade: idade ? Number(idade) : null,
    cargo,
    avatar: null,
    criadoEm: new Date().toISOString()
  };

  users.push(newUser);
  writeUsers(users);

  req.session.userId = newUser.id;
  res.json({
    message: 'Cadastro realizado com sucesso.',
    user: {
      id: newUser.id,
      nome: newUser.nome,
      email: newUser.email,
      igreja: newUser.igreja,
      idade: newUser.idade,
      cargo: newUser.cargo,
      avatar: newUser.avatar
    }
  });
});

app.post('/api/auth/login', (req, res) => {
  const { email, senha } = req.body;
  if (!email || !senha) {
    return res.status(400).json({ message: 'Informe email e senha.' });
  }

  const { user } = findUserByEmail(email);
  if (!user || user.senha !== senha) {
    return res.status(401).json({ message: 'Email ou senha inválidos.' });
  }

  req.session.userId = user.id;
  res.json({
    message: 'Login realizado com sucesso.',
    user: {
      id: user.id,
      nome: user.nome,
      email: user.email,
      igreja: user.igreja,
      idade: user.idade,
      cargo: user.cargo,
      avatar: user.avatar
    }
  });
});

app.post('/api/auth/logout', (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('connect.sid');
    res.json({ message: 'Sessão encerrada.' });
  });
});

app.get('/api/auth/me', (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: 'Não autenticado.' });
  }
  const users = readUsers();
  const user = users.find((u) => u.id === req.session.userId);
  if (!user) {
    return res.status(401).json({ message: 'Sessão inválida.' });
  }
  res.json({
    id: user.id,
    nome: user.nome,
    email: user.email,
    igreja: user.igreja,
    idade: user.idade,
    cargo: user.cargo,
    avatar: user.avatar
  });
});

app.put('/api/auth/me', (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: 'Não autenticado.' });
  }

  const { nome, igreja, idade, cargo, senhaAtual, senhaNova, avatar } = req.body;

  const users = readUsers();
  const idx = users.findIndex((u) => u.id === req.session.userId);
  if (idx === -1) {
    return res.status(401).json({ message: 'Sessão inválida.' });
  }

  const user = users[idx];

  user.nome = nome || user.nome;
  user.igreja = igreja || user.igreja;
  user.idade = typeof idade !== 'undefined' ? Number(idade) : user.idade;
  user.cargo = cargo || user.cargo;

  if (avatar !== undefined) {
    user.avatar = avatar;
  }

  if (senhaNova) {
    if (!senhaAtual || senhaAtual !== user.senha) {
      return res.status(400).json({ message: 'Senha atual incorreta.' });
    }
    if (senhaNova.length < 4) {
      return res.status(400).json({ message: 'A nova senha deve ter pelo menos 4 caracteres.' });
    }
    user.senha = senhaNova;
  }

  users[idx] = user;
  writeUsers(users);

  res.json({
    message: 'Perfil atualizado com sucesso.',
    user: {
      id: user.id,
      nome: user.nome,
      email: user.email,
      igreja: user.igreja,
      idade: user.idade,
      cargo: user.cargo,
      avatar: user.avatar
    }
  });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

