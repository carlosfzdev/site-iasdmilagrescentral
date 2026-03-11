import { Header } from '../components/Header';

export default function ContatoPage() {
  return (
    <>
      <Header />
      <main className="container">
        <section aria-labelledby="titulo-contato">
          <h1 id="titulo-contato">Contato</h1>
          <form id="formulario-contato" action="https://api.web3forms.com/submit" method="POST">
            <input type="hidden" name="access_key" value="6d493f3e-e24c-410d-9e37-802e4cfb9d9d" />
            <input type="hidden" name="subject" value="Nova Mensagem do Site IASD Milagres Central" />
            <input type="hidden" name="from_name" value="Formulário de Contato" />
            <input type="checkbox" name="botcheck" style={{ display: 'none' }} />

            <label htmlFor="nome">Nome</label>
            <input type="text" id="nome" name="name" required />

            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required />

            <label htmlFor="mensagem">Mensagem</label>
            <textarea id="mensagem" name="message" rows={5} required />

            <button type="submit">Enviar Mensagem</button>
          </form>
        </section>
      </main>
      <footer className="container">
        <p>
          <a href="/.">Voltar à página inicial</a>
        </p>
        <p>
          <a href="/politica-de-privacidade">Política de Privacidade</a>
        </p>
      </footer>
    </>
  );
}

