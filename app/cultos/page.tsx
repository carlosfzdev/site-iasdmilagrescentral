import { Header } from '../components/Header';

export default function CultosPage() {
  return (
    <>
      <Header />
      <main className="container">
        <section aria-labelledby="titulo-culto">
          <h1 id="titulo-culto">Cultos</h1>
          <p>Nossos cultos acontecem semanalmente em horários práticos para a comunidade.</p>
          <ul>
            <li>Domingo: 19:30</li>
            <li>Quarta-feira: 19:30</li>
            <li>Sábado: 08:30</li>
          </ul>
        </section>
        <section aria-labelledby="programacoes">
          <h1 id="programacoes">Programações</h1>
          <ul>
            <li>Nenhuma programação no momento.</li>
          </ul>
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

