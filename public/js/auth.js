function mostrarMensagem(el, mensagem, tipo) {
  if (!el) return;
  el.textContent = mensagem;
  el.classList.remove('erro', 'sucesso');
  if (tipo === 'erro') el.classList.add('erro');
  if (tipo === 'sucesso') el.classList.add('sucesso');
}

document.addEventListener('DOMContentLoaded', function () {
  const authMensagem = document.getElementById('auth-mensagem');

  async function api(path, options) {
    const res = await fetch(path, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      ...options
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      const msg = data.message || 'Ocorreu um erro. Tente novamente.';
      throw new Error(msg);
    }
    return data;
  }

  // LOGIN
  const formLogin = document.getElementById('form-login');
  if (formLogin) {
    formLogin.addEventListener('submit', async function (e) {
      e.preventDefault();
      const email = document.getElementById('login-email').value.trim().toLowerCase();
      const senha = document.getElementById('login-senha').value;

      try {
        mostrarMensagem(authMensagem, 'Entrando…', 'sucesso');
        await api('/api/auth/login', {
          method: 'POST',
          body: JSON.stringify({ email, senha })
        });
        mostrarMensagem(authMensagem, 'Login realizado com sucesso! Redirecionando…', 'sucesso');
        setTimeout(() => {
          window.location.href = '/perfil';
        }, 800);
      } catch (err) {
        mostrarMensagem(authMensagem, err.message, 'erro');
      }
    });
  }

  // REGISTRO
  const formRegistro = document.getElementById('form-registro');
  if (formRegistro) {
    formRegistro.addEventListener('submit', async function (e) {
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

      try {
        mostrarMensagem(authMensagem, 'Criando conta…', 'sucesso');
        await api('/api/auth/register', {
          method: 'POST',
          body: JSON.stringify({ nome, email, senha, igreja, idade, cargo })
        });
        mostrarMensagem(authMensagem, 'Cadastro realizado com sucesso! Redirecionando…', 'sucesso');
        formRegistro.reset();
        setTimeout(() => {
          window.location.href = '/perfil';
        }, 800);
      } catch (err) {
        mostrarMensagem(authMensagem, err.message, 'erro');
      }
    });
  }

  // PÁGINA DE PERFIL
  const perfilMensagem = document.getElementById('perfil-mensagem');
  const formPerfil = document.getElementById('form-perfil');
  if (formPerfil) {
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

    async function carregarPerfil() {
      try {
        const u = await api('/api/auth/me', { method: 'GET' });
        preencherCampos(u);
      } catch {
        window.location.href = '/login';
      }
    }

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

    carregarPerfil();

    if (inputFoto) {
      inputFoto.addEventListener('change', function () {
        const file = inputFoto.files && inputFoto.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = async function (e) {
          const dataUrl = e.target.result;
          try {
            await api('/api/auth/me', {
              method: 'PUT',
              body: JSON.stringify({ avatar: dataUrl })
            });
            avatarImg.src = dataUrl;
            mostrarMensagem(perfilMensagem, 'Foto de perfil atualizada.', 'sucesso');
          } catch (err) {
            mostrarMensagem(perfilMensagem, err.message, 'erro');
          }
        };
        reader.readAsDataURL(file);
      });
    }

    formPerfil.addEventListener('submit', async function (e) {
      e.preventDefault();
      const senhaAtual = inputSenhaAtual.value;
      const senhaNova = inputSenhaNova.value;

      if (senhaNova && senhaNova.length < 4) {
        mostrarMensagem(perfilMensagem, 'A nova senha deve ter pelo menos 4 caracteres.', 'erro');
        return;
      }

      try {
        const payload = {
          nome: inputNome.value.trim(),
          igreja: inputIgreja.value.trim(),
          idade: inputIdade.value ? Number(inputIdade.value) : null,
          cargo: inputCargo.value.trim()
        };

        if (senhaNova) {
          payload.senhaAtual = senhaAtual;
          payload.senhaNova = senhaNova;
        }

        const resData = await api('/api/auth/me', {
          method: 'PUT',
          body: JSON.stringify(payload)
        });

        preencherCampos(resData.user);
        inputSenhaAtual.value = '';
        inputSenhaNova.value = '';
        mostrarMensagem(perfilMensagem, 'Perfil atualizado com sucesso.', 'sucesso');
      } catch (err) {
        mostrarMensagem(perfilMensagem, err.message, 'erro');
      }
    });

    const btnSair = document.getElementById('btn-sair');
    if (btnSair) {
      btnSair.addEventListener('click', async function () {
        try {
          await api('/api/auth/logout', { method: 'POST' });
        } catch (err) {
          // silencioso
        }
        window.location.href = '/login';
      });
    }
  }
});

