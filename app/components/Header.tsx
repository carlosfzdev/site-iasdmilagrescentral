import Link from 'next/link';

export function Header() {
  return (
    <header>
      <div className="container cabecalho-interno">
        <div className="marca">
          <Link href="/.">
            <img
              src="https://i.ibb.co/DgkWPyfP/229133089-411187380321827-5405016350897760058-n.jpg"
              alt="Logo IASD"
              className="logo"
              draggable="false"
            />
          </Link>
          <h1 className="nome-site">
            <Link href="/.">
              Igreja Adventista do Sétimo Dia<span className="h1-subtitulo"> - Milagres (Central)</span>
            </Link>
          </h1>
        </div>

        <button id="menu-alternar" aria-expanded="false" aria-controls="navegacao-site" aria-label="Abrir menu">
          ☰
        </button>

        <nav id="navegacao-site" role="navigation">
          <ul>
            <li>
              <Link href="/cultos">Cultos</Link>
            </li>
            <li>
              <Link href="/sobre">Sobre</Link>
            </li>
            <li>
              <Link href="/local">Local</Link>
            </li>
            <li>
              <Link href="/imagens">Imagens</Link>
            </li>
            <li>
              <Link href="/contato">Contato</Link>
            </li>
            <li>
              <Link href="/login">Área do Membro</Link>
            </li>
            <li>
              <a
                href="https://giving.7me.app/guest-donation/church/698ead37-327b-4888-be88-ed64d2495e3e"
                target="_blank"
                rel="noopener noreferrer"
              >
                Dízimos e Ofertas
              </a>
            </li>
          </ul>
        </nav>
        <button id="tema-alternar" aria-label="Alternar tema">
          🌙
        </button>
      </div>
    </header>
  );
}

