import { Header } from '../components/Header';

export default function LocalPage() {
  return (
    <>
      <Header />
      <main className="container">
        <section aria-labelledby="titulo-local">
          <h1 id="titulo-local">Localização</h1>
          <p>Av. Lacordaire Ferreira Lins, S/N - Das Missionárias | Milagres - CE, 63250-000</p>
          <p>
            <a href="https://maps.app.goo.gl/c1v6LkrhrPVS8XDD6" target="_blank" rel="noopener noreferrer">
              Abrir no Google Maps
            </a>
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

