
const menuToggle = document.getElementById('menu-toggle');
const siteNav = document.getElementById('site-nav');
if (menuToggle && siteNav) {
    menuToggle.addEventListener('click', () => {
        const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', String(!expanded));
        siteNav.setAttribute('aria-hidden', String(expanded));
    });
}

const form = document.getElementById('contato-form');
const resposta = document.getElementById('resposta');

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

if (form) {
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const nome = document.getElementById('nome').value.trim();
        const email = document.getElementById('email').value.trim();
        const mensagem = document.getElementById('mensagem').value.trim();

        if (!nome || !email || !mensagem) {
            resposta.textContent = 'Por favor, preencha todos os campos.';
            resposta.style.color = 'crimson';
            return;
        }

        if (!validateEmail(email)) {
            resposta.textContent = 'Por favor, insira um email válido.';
            resposta.style.color = 'crimson';
            return;
        }
        
        const subject = encodeURIComponent(`Contato pelo site: ${nome}`);
        const body = encodeURIComponent(`Nome: ${nome}\nEmail: ${email}\n\n${mensagem}`);
        const mailto = `mailto:contato@iasdmilagrescentral.com?subject=${subject}&body=${body}`;

        resposta.textContent = `Obrigado, ${nome}! Estamos prontos para receber sua mensagem.`;
        resposta.style.color = 'green';
        form.reset();

        window.location.href = mailto;
    });
}
