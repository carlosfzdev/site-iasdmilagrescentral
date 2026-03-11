import { Header } from '../components/Header';

export default function PerfilPage() {
  return (
    <>
      <Header />
      <main className="container">
        <section aria-labelledby="titulo-perfil" className="secao-perfil">
          <h1 id="titulo-perfil">Meu Perfil</h1>
          <p className="texto-intro">Aqui você pode atualizar seus dados e sua foto de perfil.</p>

          <div className="perfil-layout">
            <div className="perfil-col perfil-resumo">
              <div className="perfil-avatar-wrapper">
                <img id="perfil-avatar" className="perfil-avatar" alt="Foto de perfil" />
                <label htmlFor="perfil-foto" className="btn-ghost">
                  Alterar foto
                </label>
                <input type="file" id="perfil-foto" accept="image/*" hidden />
              </div>
              <div className="perfil-info">
                <p id="perfil-nome-resumo" className="perfil-nome-resumo" />
                <p id="perfil-igreja-resumo" className="perfil-igreja-resumo" />
                <p id="perfil-cargo-resumo" className="perfil-cargo-resumo" />
              </div>
            </div>

            <div className="perfil-col">
              <form id="form-perfil">
                <label htmlFor="perfil-nome">Nome completo</label>
                <input type="text" id="perfil-nome" required />

                <label htmlFor="perfil-email">Email</label>
                <input type="email" id="perfil-email" required disabled />
                <small className="campo-ajuda">O email é usado para login e não pode ser alterado.</small>

                <label htmlFor="perfil-igreja">Igreja</label>
                <input type="text" id="perfil-igreja" required />

                <label htmlFor="perfil-idade">Idade</label>
                <input type="number" id="perfil-idade" min={0} max={120} required />

                <label htmlFor="perfil-cargo">Cargo na igreja</label>
                <input type="text" id="perfil-cargo" required />

                <label htmlFor="perfil-senha-atual">Senha atual (para alterar senha)</label>
                <input type="password" id="perfil-senha-atual" autoComplete="current-password" />

                <label htmlFor="perfil-senha-nova">Nova senha</label>
                <input type="password" id="perfil-senha-nova" autoComplete="new-password" />

                <div className="perfil-acoes">
                  <button type="submit">Salvar alterações</button>
                  <button type="button" id="btn-sair" className="btn-secundario">
                    Sair
                  </button>
                </div>
              </form>

              <p id="perfil-mensagem" className="auth-mensagem" role="status" aria-live="polite" />
            </div>
          </div>
        </section>
      </main>

      <footer className="container">
        <p>
          <a href="/.">Voltar à página inicial</a>
        </p>
      </footer>
    </>
  );
}

