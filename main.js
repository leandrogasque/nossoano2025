document.addEventListener('DOMContentLoaded', async () => {
    const loader = document.getElementById('loader');
    const unlockBtn = document.getElementById('unlock-btn');
    const hero = document.getElementById('hero');
    const mainContent = document.getElementById('main-content');
    const timeline = document.getElementById('timeline');
    const bgMusic = document.getElementById('bg-music');
    const musicToggle = document.getElementById('music-toggle');

    const monthNames = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];

    const messages = [
        "O dia em que dissemos 'Sim' foi o início do nosso para sempre. 💍",
        "2025: O ano em que nos tornamos um só perante Deus e os homens.",
        "Cada detalhe do nosso casamento ainda brilha na minha memória.",
        "Ver você de branco foi o momento mais lindo da minha vida.",
        "Obrigado por ser minha esposa e minha melhor amiga todos os dias.",
        "Nosso primeiro ano como casados foi apenas o primeiro de muitos capítulos felizes.",
        "Que 2026 seja a continuação desse sonho que começamos juntos."
    ];

    // Carregar lista de fotos e músicas
    let photos = [];
    let musicList = [];
    try {
        const photoRes = await fetch('./photos.json');
        photos = await photoRes.json();
        const musicRes = await fetch('./music.json');
        musicList = await musicRes.json();

        // Configurar primeira música
        if (musicList.length > 0) {
            bgMusic.src = `/assets/music/${musicList[0]}`;
        }
    } catch (e) {
        console.error("Erro ao carregar assets:", e);
    }

    const renderPhotos = () => {
        // Ordenar fotos por data extraída do nome
        photos.sort((a, b) => a.localeCompare(b));

        photos.forEach((photo, index) => {
            const polaroid = document.createElement('div');
            polaroid.className = 'polaroid scroll-reveal';

            const randomRotation = (Math.random() * 8 - 4).toFixed(2);
            polaroid.style.transform = `rotate(${randomRotation}deg)`;

            polaroid.innerHTML = `
                <img src="/assets/${photo}" alt="Nossa Memória" loading="lazy">
            `;

            timeline.appendChild(polaroid);

            // Inserir mensagem a cada 10 fotos
            if ((index + 1) % 10 === 0 && index < photos.length - 1) {
                const msgIndex = Math.floor(index / 10);
                if (messages[msgIndex]) {
                    const msgCard = document.createElement('div');
                    msgCard.className = 'timeline-message scroll-reveal';
                    msgCard.innerHTML = `<p class="font-script">"${messages[msgIndex]}"</p>`;
                    timeline.appendChild(msgCard);
                }
            }
        });
    };

    renderPhotos();

    // Remover loader
    setTimeout(() => {
        gsap.to(loader, {
            opacity: 0,
            duration: 1,
            onComplete: () => loader.style.display = 'none'
        });
    }, 1500);

    // Controle de Música
    let isPlaying = false;
    const toggleMusic = () => {
        if (isPlaying) {
            bgMusic.pause();
            musicToggle.innerText = '🔇';
        } else {
            // iOS Safari e Chrome mobile exigem interação do usuário para tocar áudio
            bgMusic.play().then(() => {
                musicToggle.innerText = '🎵';
            }).catch(e => {
                console.log("Integração de áudio aguardando interação...");
                musicToggle.innerText = '🔇';
                isPlaying = false; // Reseta se falhar
            });
        }
        isPlaying = !isPlaying;
    };

    musicToggle.addEventListener('click', toggleMusic);

    // Botão Destravar
    unlockBtn.addEventListener('click', () => {
        const tl = gsap.timeline();

        // Iniciar música se não estiver tocando
        if (!isPlaying) toggleMusic();

        // Revelar conteúdo antes de animar
        mainContent.classList.remove('hidden');

        // Lançar alguns corações iniciais
        for (let i = 0; i < 10; i++) {
            setTimeout(createHeart, i * 100);
        }

        tl.to(hero, {
            y: '-100%',
            duration: 1.5,
            ease: "power4.inOut"
        })
            .to(mainContent, {
                opacity: 1,
                y: 0,
                duration: 1.2,
                ease: "power2.out",
                onComplete: initScrollAnimations
            }, "-=0.8");
    });

    function initScrollAnimations() {
        gsap.utils.toArray('.scroll-reveal').forEach((el) => {
            gsap.from(el, {
                scrollTrigger: {
                    trigger: el,
                    start: "top 85%",
                    toggleActions: "play none none none"
                },
                opacity: 0,
                y: 50,
                duration: 1.2,
                ease: "power2.out"
            });
        });

        // Corações flutuantes no scroll
        initHeartParticles();

        // Animação de Stats (Contagem progressiva)
        initStatsAnimation();

        // Lógica do Envelope
        initEnvelope();

        // Fogos de Artifício ao chegar no fim
        initFireworks();
    }

    function initStatsAnimation() {
        const stats = document.querySelectorAll('.stat-value');
        stats.forEach(stat => {
            const finalValue = stat.innerText;
            const isSpecial = finalValue === '∞' || finalValue === 'Milhares';
            const targetNumber = isSpecial ? 500 : parseInt(finalValue);

            if (isNaN(targetNumber) && !isSpecial) return;

            const obj = { val: 0 };
            gsap.to(obj, {
                val: targetNumber,
                duration: 2,
                scrollTrigger: {
                    trigger: stat,
                    start: "top 90%",
                },
                onUpdate: () => {
                    if (isSpecial && obj.val >= targetNumber) {
                        stat.innerText = finalValue;
                    } else {
                        stat.innerText = Math.floor(obj.val);
                    }
                },
                onComplete: () => {
                    stat.innerText = finalValue;
                }
            });
        });
    }

    function initEnvelope() {
        const envelope = document.getElementById('envelope');
        const tapMsg = document.querySelector('.envelope-tap');

        envelope.parentElement.addEventListener('click', () => {
            envelope.classList.toggle('open');
            if (envelope.classList.contains('open')) {
                tapMsg.style.display = 'none';
                // Lançar fogos ao abrir a carta
                launchFireworkBurst();
            } else {
                tapMsg.style.display = 'block';
            }
        });
    }

    function initFireworks() {
        const container = document.getElementById('fireworks-container');

        ScrollTrigger.create({
            trigger: ".final-message",
            start: "top 50%",
            onEnter: () => {
                // Iniciar fogos contínuos sutilmente
                setInterval(launchFireworkBurst, 3000);
            }
        });
    }

    function launchFireworkBurst() {
        const container = document.getElementById('fireworks-container');
        for (let i = 0; i < 5; i++) {
            setTimeout(() => createFirework(container), i * 300);
        }
    }

    function createFirework(container) {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * (window.innerHeight * 0.5);
        const color = `hsl(${Math.random() * 360}, 100%, 50%)`;

        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.width = '4px';
            particle.style.height = '4px';
            particle.style.backgroundColor = color;
            particle.style.borderRadius = '50%';
            container.appendChild(particle);

            const angle = (Math.PI * 2 / 30) * i;
            const velocity = Math.random() * 100 + 50;

            gsap.to(particle, {
                x: Math.cos(angle) * velocity,
                y: Math.sin(angle) * velocity,
                opacity: 0,
                duration: 1.5,
                ease: "power2.out",
                onComplete: () => particle.remove()
            });
        }
    }

    function initHeartParticles() {
        let lastScrollY = window.scrollY;
        let distanceScrolled = 0;

        window.addEventListener('scroll', () => {
            const currentScroll = window.scrollY;
            distanceScrolled += Math.abs(currentScroll - lastScrollY);
            lastScrollY = currentScroll;

            // Cria um coração a cada 150px scrollados
            if (distanceScrolled > 150) {
                createHeart();
                distanceScrolled = 0;
            }
        });
    }

    function createHeart() {
        const heart = document.createElement('div');
        heart.className = 'heart-particle';
        heart.innerHTML = '❤️';
        heart.style.left = Math.random() * 100 + 'vw';

        // Variação de tamanho e duração
        const size = Math.random() * 20 + 10;
        const duration = Math.random() * 3 + 4;

        heart.style.fontSize = size + 'px';
        heart.style.animation = `heartFloatUp ${duration}s linear forwards`;

        document.body.appendChild(heart);

        // Remove após a animação
        setTimeout(() => {
            heart.remove();
        }, duration * 1000);
    }
});