// Inicializa os ícones da biblioteca Lucide
lucide.createIcons();

const mouseGlow = document.getElementById('mouseGlow');
const heroSection = document.getElementById('hero-section');

// Rastreamento do brilho do rato (Apenas no Hero)
if (mouseGlow && heroSection) {
    heroSection.addEventListener('mousemove', (e) => {
        // Calcula a posição relativa à seção Hero
        const rect = heroSection.getBoundingClientRect();
        mouseGlow.style.left = (e.clientX - rect.left) + 'px';
        mouseGlow.style.top = (e.clientY - rect.top) + 'px';
    });

    heroSection.addEventListener('mouseenter', () => {
        mouseGlow.style.opacity = '1';
    });

    heroSection.addEventListener('mouseleave', () => {
        mouseGlow.style.opacity = '0';
    });
}

// Lógica de Scroll
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;

    // Lógica do Menu (Transparente no Topo / Branco ao Rolar)
    const nav = document.getElementById('main-nav');
    const navLogoText = document.getElementById('nav-logo-text');
    const navLinks = document.getElementById('nav-links');

    if (nav && navLogoText && navLinks) {
        if (scrolled > 50) {
            // Estado Rolagem: Fundo com efeito glass
            nav.classList.add('glass-header');
            nav.classList.remove('bg-white');
        } else {
            // Estado Topo: Fundo branco sólido
            nav.classList.remove('glass-header');
            nav.classList.add('bg-white');
        }
    }
});

// Lógica de Alternância do Formulário (Cliente vs Trabalhe Conosco)
const btnCliente = document.getElementById('btn-cliente');
const btnCandidato = document.getElementById('btn-candidato');
const formCliente = document.getElementById('form-cliente');
const formCandidato = document.getElementById('form-candidato');

if (btnCliente && btnCandidato && formCliente && formCandidato) {
    btnCliente.addEventListener('click', () => {
        // Estilos Botão Cliente (Ativo)
        btnCliente.classList.add('bg-white', 'text-blue-600', 'shadow-sm');
        btnCliente.classList.remove('text-slate-500');
        // Estilos Botão Candidato (Inativo)
        btnCandidato.classList.remove('bg-white', 'text-blue-600', 'shadow-sm');
        btnCandidato.classList.add('text-slate-500');
        // Visibilidade
        formCliente.classList.remove('hidden');
        formCandidato.classList.add('hidden');
    });

    btnCandidato.addEventListener('click', () => {
        // Estilos Botão Candidato (Ativo)
        btnCandidato.classList.add('bg-white', 'text-blue-600', 'shadow-sm');
        btnCandidato.classList.remove('text-slate-500');
        // Estilos Botão Cliente (Inativo)
        btnCliente.classList.remove('bg-white', 'text-blue-600', 'shadow-sm');
        btnCliente.classList.add('text-slate-500');
        // Visibilidade
        formCandidato.classList.remove('hidden');
        formCliente.classList.add('hidden');
    });
}

// Contador de Caracteres da Mensagem
const mensagemInput = document.getElementById('mensagem');
const contadorCaracteres = document.getElementById('contador-caracteres');

if (mensagemInput && contadorCaracteres) {
    mensagemInput.addEventListener('input', () => {
        contadorCaracteres.textContent = mensagemInput.value.length;
    });
}

// Formatação Automática do LinkedIn
const linkedinInput = document.getElementById('linkedin');

if (linkedinInput) {
    linkedinInput.addEventListener('blur', () => {
        let valor = linkedinInput.value.trim();
        
        if (valor) {
            // Remove protocolos e domínios antigos se o usuário colou algo bagunçado ou parcial
            // Ex: remove "https://", "www.linkedin.com", "/in/"
            valor = valor.replace(/^(https?:\/\/)?(www\.)?linkedin\.com\/(in\/)?/i, '').replace(/\/$/, '');
            
            // Reconstrói a URL padrão
            linkedinInput.value = `https://www.linkedin.com/in/${valor}`;
        }
    });
}

// Carrossel de Texto no Hero (Sobre a Mateng)
const heroTextElement = document.getElementById('hero-carousel-text');
const heroTexts = [
    "Está no mercado desde 2013, prestando serviços nas áreas de ELÉTRICA e INSTRUMENTAÇÃO com excelência e ética.",
    "Oferecemos soluções para indústrias Farmacêuticas, Alimentícias, Automotivas, Têxteis, Químicas e muito mais.",
    "Nossa missão é maximizar seu processo produtivo com menor tempo de parada, garantindo segurança e eficácia.",
    "Referência em montagem de painéis, calibração de instrumentos e adequação às normas NR-10 e NR-12."
];
let currentTextIndex = 0;

if (heroTextElement) {
    setInterval(() => {
        // Fade out
        heroTextElement.classList.remove('opacity-100');
        heroTextElement.classList.add('opacity-0');

        setTimeout(() => {
            currentTextIndex = (currentTextIndex + 1) % heroTexts.length;
            heroTextElement.textContent = heroTexts[currentTextIndex];
            // Fade in
            heroTextElement.classList.remove('opacity-0');
            heroTextElement.classList.add('opacity-100');
        }, 1000); // Espera a transição de saída terminar (mais suave)
    }, 6000); // Troca a cada 6 segundos (mais lento)
}

// Carrossel de Imagens de Fundo (Hero)
const heroBg1 = document.getElementById('hero-bg-1');
const heroBg2 = document.getElementById('hero-bg-2');

if (heroBg1 && heroBg2) {
    setInterval(() => {
        // Alterna a visibilidade
        if (heroBg1.classList.contains('opacity-100')) {
            heroBg1.classList.remove('opacity-100');
            heroBg1.classList.add('opacity-0');
            heroBg2.classList.remove('opacity-0');
            heroBg2.classList.add('opacity-100');
        } else {
            heroBg1.classList.remove('opacity-0');
            heroBg1.classList.add('opacity-100');
            heroBg2.classList.remove('opacity-100');
            heroBg2.classList.add('opacity-0');
        }
    }, 5000); // Troca a cada 5 segundos
}

// Lógica para Trocar Posição dos Cards de Serviço
const serviceCards = document.querySelectorAll('.service-card');
const servicesGrid = document.querySelector('#servicos .grid');

if (servicesGrid && serviceCards.length > 0) {
    serviceCards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Se já for o card principal (o primeiro), não faz nada
            if (card === servicesGrid.firstElementChild && card.classList.contains('md:col-span-2')) return;

            // --- TÉCNICA FLIP (First, Last, Invert, Play) ---

            // 1. FIRST: Gravar a posição inicial de TODOS os cards
            const firstPositions = [];
            serviceCards.forEach(c => {
                firstPositions.push(c.getBoundingClientRect());
            });

            // 2. LAST: Alterar o DOM (Movimento) - MANTENDO PEQUENO POR ENQUANTO
            
            // Reseta todos para pequeno
            serviceCards.forEach(c => {
                c.classList.remove('md:col-span-2');
                const content = c.querySelector('.service-content');
                if (content) {
                    content.classList.remove('md:grid-cols-2');
                }
                const details = c.querySelector('.expanded-details');
                if (details) {
                    details.classList.add('hidden', 'opacity-0');
                }
            });

            // Move para o topo do HTML
            servicesGrid.prepend(card);

            // 3. INVERT: Calcular a diferença e aplicar transform reverso
            serviceCards.forEach((c, i) => {
                const first = firstPositions[i];
                const last = c.getBoundingClientRect();

                const deltaX = first.left - last.left;
                const deltaY = first.top - last.top;

                // Aplica a transformação instantânea para parecer que ainda está no lugar antigo
                c.style.transition = 'none';
                c.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
            });

            // 4. PLAY: Animar para a posição zero (novo lugar real)
            requestAnimationFrame(() => {
                serviceCards.forEach(c => {
                    // Remove o transform e ativa a transição suave
                    c.style.transition = 'transform 0.6s cubic-bezier(0.2, 0, 0.2, 1)';
                    c.style.transform = '';
                });
            });

            // 5. EXPANDIR (Apenas após o movimento terminar)
            setTimeout(() => {
                // --- ANIMAÇÃO DE EXPANSÃO SUAVE (Double FLIP) ---
                
                // 1. FIRST: Gravar posições de TODOS os cards antes de expandir
                const expansionFirstPositions = new Map();
                serviceCards.forEach(c => {
                    expansionFirstPositions.set(c, c.getBoundingClientRect());
                });

                // 2. LAST: Aplicar mudança de layout (Expandir)
                card.classList.add('md:col-span-2');
                const content = card.querySelector('.service-content');
                if (content) {
                    content.classList.add('md:grid-cols-2');
                }
                const details = card.querySelector('.expanded-details');
                if (details) {
                    details.classList.remove('hidden');
                    // Pequeno delay para permitir o fade-in suave
                    setTimeout(() => details.classList.remove('opacity-0'), 50);
                }

                // 3. INVERT: Calcular diferenças para TODOS e aplicar transform
                serviceCards.forEach(c => {
                    const first = expansionFirstPositions.get(c);
                    const last = c.getBoundingClientRect();
                    const deltaX = first.left - last.left;
                    const deltaY = first.top - last.top;
                    const scaleX = first.width / last.width;
                    const scaleY = first.height / last.height;

                    c.style.transition = 'none';
                    c.style.transformOrigin = 'top left';
                    c.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(${scaleX}, ${scaleY})`;
                    if (c === card) c.style.zIndex = '50';
                });

                // 4. PLAY: Animar para a posição final
                requestAnimationFrame(() => {
                    document.body.offsetHeight; // Força reflow
                    serviceCards.forEach(c => {
                        c.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
                        c.style.transform = '';
                    });
                    setTimeout(() => { if (card.style.zIndex === '50') card.style.zIndex = ''; }, 500);
                });
            }, 600); // Espera 600ms (tempo da transição de movimento)
        });
    });
}