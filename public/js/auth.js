// Armazenamento simples em localStorage (apenas para demonstração).
// Não utilizar este modelo como autenticação segura em produção.

const STORAGE_USER_KEY = 'iasd_usuario';
const STORAGE_SESSION_KEY = 'iasd_sessao';

function salvarUsuario(usuario) {
  localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(usuario));
}

function obterUsuario() {
  const raw = localStorage.getItem(STORAGE_USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function criarSessao(email) {
  localStorage.setItem(STORAGE_SESSION_KEY, email);
}

function destruirSessao() {
  localStorage.removeItem(STORAGE_SESSION_KEY);
}

function obterSessaoAtual() {
  return localStorage.getItem(STORAGE_SESSION_KEY);
}

function redirecionarSeNaoLogado() {
  if (!obterSessaoAtual()) {
    window.location.href = '/login';
  }
}

function mostrarMensagem(el, mensagem, tipo) {
  if (!el) return;
  el.textContent = mensagem;
  el.classList.remove('erro', 'sucesso');
  if (tipo === 'erro') el.classList.add('erro');
  if (tipo === 'sucesso') el.classList.add('sucesso');
}

document.addEventListener('DOMContentLoaded', function () {
  const authMensagem = document.getElementById('auth-mensagem');

  // LOGIN
  const formLogin = document.getElementById('form-login');
  if (formLogin) {
    formLogin.addEventListener('submit', function (e) {
      e.preventDefault();
      const email = document.getElementById('login-email').value.trim().toLowerCase();
      const senha = document.getElementById('login-senha').value;

      const usuario = obterUsuario();
      if (!usuario || usuario.email !== email || usuario.senha !== senha) {
        mostrarMensagem(authMensagem, 'Email ou senha inválidos.', 'erro');
        return;
      }

      criarSessao(usuario.email);
      mostrarMensagem(authMensagem, 'Login realizado com sucesso! Redirecionando…', 'sucesso');
      setTimeout(() => {
        window.location.href = '/perfil';
      }, 800);
    });
  }

  // REGISTRO
  const formRegistro = document.getElementById('form-registro');
  if (formRegistro) {
    formRegistro.addEventListener('submit', function (e) {
      e.preventDefault();
      const nome = document.getElementById('reg-nome').value.trim();
      const email = document.getElementById('reg-email').value.trim().toLowerCase();
      const senha = document.getElementById('reg-senha').value;
      const igreja = document.getElementById('reg-igreja').value.trim();
      const idade = document.getElementById('reg-idade').value;
      const cargo = document.getElementById('reg-cargo').value.trim();

      if (senha.length < 4) {
        mostrarMensagem(authMensagem, 'A senha deve ter pelo menos 4 caracteres.', 'erro');
        return;
      }

      const usuarioExistente = obterUsuario();
      if (usuarioExistente && usuarioExistente.email === email) {
        mostrarMensagem(authMensagem, 'Já existe um cadastro com este email.', 'erro');
        return;
      }

      const usuario = {
        nome,
        email,
        senha,
        igreja,
        idade: idade ? Number(idade) : null,
        cargo,
        avatar: usuarioExistente?.avatar || null
      };

      salvarUsuario(usuario);
      criarSessao(usuario.email);
      mostrarMensagem(authMensagem, 'Cadastro realizado com sucesso! Redirecionando…', 'sucesso');
      formRegistro.reset();
      setTimeout(() => {
        window.location.href = '/perfil';
      }, 800);
    });
  }

  // PÁGINA DE PERFIL
  const perfilMensagem = document.getElementById('perfil-mensagem');
  const formPerfil = document.getElementById('form-perfil');
  if (formPerfil) {
    // Protege rota
    redirecionarSeNaoLogado();

    const usuario = obterUsuario();
    const sessao = obterSessaoAtual();
    if (!usuario || !sessao || usuario.email !== sessao) {
      destruirSessao();
      window.location.href = '/login';
      return;
    }

    const inputNome = document.getElementById('perfil-nome');
    const inputEmail = document.getElementById('perfil-email');
    const inputIgreja = document.getElementById('perfil-igreja');
    const inputIdade = document.getElementById('perfil-idade');
    const inputCargo = document.getElementById('perfil-cargo');
    const inputSenhaAtual = document.getElementById('perfil-senha-atual');
    const inputSenhaNova = document.getElementById('perfil-senha-nova');

    const avatarImg = document.getElementById('perfil-avatar');
    const inputFoto = document.getElementById('perfil-foto');
    const nomeResumo = document.getElementById('perfil-nome-resumo');
    const igrejaResumo = document.getElementById('perfil-igreja-resumo');
    const cargoResumo = document.getElementById('perfil-cargo-resumo');

    function preencherCampos(u) {
      inputNome.value = u.nome || '';
      inputEmail.value = u.email || '';
      inputIgreja.value = u.igreja || '';
      inputIdade.value = u.idade != null ? u.idade : '';
      inputCargo.value = u.cargo || '';

      nomeResumo.textContent = u.nome || '';
      igrejaResumo.textContent = u.igreja || '';
      cargoResumo.textContent = u.cargo || '';
      if (u.avatar) {
        avatarImg.src = u.avatar;
      } else {
        avatarImg.src = 'https://ui-avatars.com/api/?background=2563eb&color=ffffff&name=' + encodeURIComponent(u.nome || 'Membro');
      }
    }

    preencherCampos(usuario);

    if (inputFoto) {
      inputFoto.addEventListener('change', function () {
        const file = inputFoto.files && inputFoto.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = function (e) {
          const dataUrl = e.target.result;
          avatarImg.src = dataUrl;
          const u = obterUsuario();
          if (!u) return;
          u.avatar = dataUrl;
          salvarUsuario(u);
          mostrarMensagem(perfilMensagem, 'Foto de perfil atualizada.', 'sucesso');
        };
        reader.readAsDataURL(file);
      });
    }

    formPerfil.addEventListener('submit', function (e) {
      e.preventDefault();
      const u = obterUsuario();
      if (!u) return;

      u.nome = inputNome.value.trim();
      u.igreja = inputIgreja.value.trim();
      u.idade = inputIdade.value ? Number(inputIdade.value) : null;
      u.cargo = inputCargo.value.trim();

      const senhaAtual = inputSenhaAtual.value;
      const senhaNova = inputSenhaNova.value;

      if (senhaNova) {
        if (!senhaAtual || senhaAtual !== u.senha) {
          mostrarMensagem(perfilMensagem, 'Para alterar a senha, informe a senha atual corretamente.', 'erro');
          return;
        }
        if (senhaNova.length < 4) {
          mostrarMensagem(perfilMensagem, 'A nova senha deve ter pelo menos 4 caracteres.', 'erro');
          return;
        }
        u.senha = senhaNova;
      }

      salvarUsuario(u);
      preencherCampos(u);
      inputSenhaAtual.value = '';
      inputSenhaNova.value = '';

      mostrarMensagem(perfilMensagem, 'Perfil atualizado com sucesso.', 'sucesso');
    });

    const btnSair = document.getElementById('btn-sair');
    if (btnSair) {
      btnSair.addEventListener('click', function () {
        destruirSessao();
        window.location.href = '/login';
      });
    }
  }
});

