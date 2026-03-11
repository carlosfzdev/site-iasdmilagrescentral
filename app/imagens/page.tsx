import { Header } from '../components/Header';

export default function ImagensPage() {
  return (
    <>
      <Header />
      <main className="container">
        <section>
          <h1>Imagens</h1>
          <p>Uma coleção de momentos especiais em nossa igreja.</p>

          <div className="galeria">
            <div className="img-container">
              <img src="/images/fotoigreja.png" alt="Fachada da Igreja" draggable="false" />
              <div className="texto-hover">Fachada da nossa igreja</div>
            </div>

            <div className="img-container">
              <img src="/images/culto.jpg" alt="Pessoas em um culto" draggable="false" />
              <div className="texto-hover">Momento Especial</div>
            </div>

            <div className="img-container">
              <img src="/images/biblia.jpg" alt="Bíblia aberta" draggable="false" />
              <div className="texto-hover">Bíblia e Livros</div>
            </div>

            <div className="img-container">
              <img src="/images/desbravadores.png" alt="Desbravadores" draggable="false" />
              <div className="texto-hover">Clube de Desbravadores</div>
            </div>

            <div className="img-container">
              <img src="/images/criancas.jpg" alt="Crianças na igreja" draggable="false" />
              <div className="texto-hover">Crianças</div>
            </div>

            <div className="img-container">
              <img src="/images/ministerio-infantil.jpg" alt="Ministério Infantil" draggable="false" />
              <div className="texto-hover">Ministério Infantil</div>
            </div>

            <div className="img-container">
              <img src="/images/quebrando-o-silencio.jpg" alt="Quebrando o Silêncio" draggable="false" />
              <div className="texto-hover">Campanha Quebrando o Silêncio</div>
            </div>

            <div className="img-container">
              <img src="/images/outubro-rosa.jpg" alt="Outubro Rosa" draggable="false" />
              <div className="texto-hover">Campanha Outubro Rosa</div>
            </div>

            <div className="img-container">
              <img src="/images/novembro-azul.jpg" alt="Novembro Azul" draggable="false" />
              <div className="texto-hover">Campanha Novembro Azul</div>
            </div>
          </div>
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

