import { Header } from './components/Header';

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="principal">
        <section className="destaque revelar">
          <img
            src="/images/fotoigreja.png"
            alt="Fachada da igreja"
            className="destaque-imagem paralaxe"
            loading="lazy"
            draggable="false"
          />
          <div className="destaque-conteudo revelar" data-delay="120">
            <h2>Bem-vindo à IASD Central-Milagres CE</h2>
            <p>Junte-se a nós nos cultos e atividades — todos são bem-vindos.</p>
            <a className="btn" href="/contato">
              Fale Conosco
            </a>
          </div>
        </section>

        <section className="grade-links container">
          <h2>Explore</h2>
          <div className="cartoes">
            <a className="cartao revelar" href="/cultos" data-delay="80">
              <span className="cartao-icone">🙏</span>
              <h3>Cultos</h3>
              <p className="cartao-subtitulo">Horários e informações</p>
            </a>
            <a className="cartao revelar" href="/sobre" data-delay="160">
              <span className="cartao-icone">⛪</span>
              <h3>Sobre Nós</h3>
              <p className="cartao-subtitulo">Nossa missão e história</p>
            </a>
            <a className="cartao revelar" href="/local" data-delay="200">
              <span className="cartao-icone">📍</span>
              <h3>Localização</h3>
              <p className="cartao-subtitulo">Encontre nossa igreja</p>
            </a>
            <a className="cartao revelar" href="/imagens" data-delay="240">
              <span className="cartao-icone">🖼️</span>
              <h3>Imagens</h3>
              <p className="cartao-subtitulo">Galeria de fotos</p>
            </a>
            <a className="cartao revelar" href="/contato" data-delay="280">
              <span className="cartao-icone">✉️</span>
              <h3>Contato</h3>
              <p className="cartao-subtitulo">Fale conosco</p>
            </a>
            <a className="cartao revelar" href="/login" data-delay="300">
              <span className="cartao-icone">🙋</span>
              <h3>Área do Membro</h3>
              <p className="cartao-subtitulo">Acesse e edite seu perfil</p>
            </a>
            <a
              className="cartao revelar"
              href="https://giving.7me.app/guest-donation/church/698ead37-327b-4888-be88-ed64d2495e3e"
              target="_blank"
              rel="noopener noreferrer"
              data-delay="340"
            >
              <span className="cartao-icone">❤️</span>
              <h3>Dízimos e Ofertas</h3>
              <p className="cartao-subtitulo">Contribua com a obra</p>
            </a>
          </div>
        </section>

        <section className="secao-doacoes container revelar" data-delay="360">
          <img
            src="https://giving.7me.app/assets/images/logo.png"
            alt="7me Giving Logo"
            className="logo-doacoes"
            draggable="false"
          />
          <h2>Dízimos e Ofertas</h2>
          <p>
            Sua contribuição ajuda a manter nossa igreja e a expandir a obra de Deus em nossa comunidade. Agradecemos
            sua generosidade.
          </p>
          <a
            href="https://giving.7me.app/guest-donation/church/698ead37-327b-4888-be88-ed64d2495e3e"
            className="btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ofertar Agora
          </a>
        </section>
      </main>
      <footer>
        <div className="container">
          <p>&copy; 2026 IASD Central Milagres — Todos os direitos reservados.</p>
          <p>
            <a href="/sobre">Política de Privacidade</a>
          </p>
        </div>
      </footer>
    </>
  );
}

