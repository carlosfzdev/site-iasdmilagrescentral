import { Header } from '../components/Header';

export default function SobrePage() {
  return (
    <>
      <Header />
      <main className="container">
        <section aria-labelledby="titulo-sobre">
          <h1 id="titulo-sobre">Sobre Nós</h1>
          <p>
            A Igreja Adventista do Sétimo dia é uma comunidade cristã comprometida em transmitir esperança e serviço ao
            próximo.
          </p>
          <p>
            Nossa missão é anunciar o evangelho, servir a comunidade e preparar corações para a volta de Jesus.
          </p>
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

