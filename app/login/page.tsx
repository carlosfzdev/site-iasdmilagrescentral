import { Header } from '../components/Header';

export default function LoginPage() {
  return (
    <>
      <Header />
      <main className="container">
        <section aria-labelledby="titulo-login" className="secao-auth">
          <h1 id="titulo-login">Área do Membro</h1>
          <p className="texto-intro">Acesse ou crie seu perfil para manter seus dados atualizados.</p>

          <div className="auth-grid">
            <div className="auth-col">
              <h2>Entrar</h2>
              <form id="form-login">
                <label htmlFor="login-email">Email</label>
                <input type="email" id="login-email" required autoComplete="email" />

                <label htmlFor="login-senha">Senha</label>
                <input type="password" id="login-senha" required autoComplete="current-password" />

                <button type="submit">Entrar</button>
              </form>
            </div>

            <div className="auth-col">
              <h2>Criar conta</h2>
              <form id="form-registro">
                <label htmlFor="reg-nome">Nome completo</label>
                <input type="text" id="reg-nome" required autoComplete="name" />

                <label htmlFor="reg-email">Email</label>
                <input type="email" id="reg-email" required autoComplete="email" />

                <label htmlFor="reg-senha">Senha</label>
                <input type="password" id="reg-senha" required autoComplete="new-password" minLength={4} />

                <label htmlFor="reg-igreja">Igreja</label>
                <input type="text" id="reg-igreja" placeholder="Ex: IASD Central Milagres" required />

                <label htmlFor="reg-idade">Idade</label>
                <input type="number" id="reg-idade" min={0} max={120} required />

                <label htmlFor="reg-cargo">Cargo na igreja</label>
                <input type="text" id="reg-cargo" placeholder="Ex: Ancião, Diácono, Jovem, Membro" required />

                <button type="submit">Criar conta</button>
              </form>
            </div>
          </div>

          <p id="auth-mensagem" className="auth-mensagem" role="status" aria-live="polite" />
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

