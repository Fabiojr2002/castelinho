/**
 * ==========================================================================
 * ACADEMIA CASTELINHO - NATAÇÃO & FITNESS
 * Creative Motion & Interaction Engine (Vanilla ES6+)
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. INICIALIZAÇÃO DOS ÍCONES VETORIAIS (LUCIDE ICONS)
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // 2. CONFIGURAÇÃO & SINCRONIZAÇÃO LENIS (SMOOTH SCROLL) + GSAP SCROLLTRIGGER
  let lenis = null;
  if (typeof Lenis !== 'undefined') {
    lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
      infinite: false
    });

    // Sincroniza Lenis com o ticker do GSAP para evitar conflito de taxas de quadros
    lenis.on('scroll', (e) => {
      if (window.ScrollTrigger) {
        ScrollTrigger.update();
      }
      if (typeof handleHeaderScroll === 'function') {
        handleHeaderScroll(e.scroll);
      }
    });

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
  } else {
    // Fallback nativo
    function raf(time) {
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }

  // Suporte a âncoras suaves via Lenis
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();

        // Se o menu mobile estiver aberto, fecha
        closeMobileMenu();

        if (lenis) {
          lenis.scrollTo(targetElement, {
            offset: -70,
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
          });
        } else {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // 3. HEADER SCROLL EFFECT & NAVEGAÇÃO ATIVA
  const siteHeader = document.getElementById('site-header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  function handleHeaderScroll(scrollYPos) {
    const header = siteHeader || document.getElementById('site-header');
    if (!header) return;
    const currentScroll = typeof scrollYPos === 'number' ? scrollYPos : (window.scrollY || window.pageYOffset || 0);

    // No topo / sobre a hero: fundo 100% transparente.
    // Ao iniciar a rolagem para baixo (> 30px): ganha o background glassmorphic refinado.
    if (currentScroll > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Identifica seção ativa para destaque na navegação
    let currentSection = '';
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (currentScroll >= sectionTop && currentScroll < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', () => handleHeaderScroll(), { passive: true });
  window.addEventListener('load', () => handleHeaderScroll());
  handleHeaderScroll();

  // 4. MENU MOBILE INTERATIVO
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  const openMobileMenu = () => {
    mobileToggle.classList.add('active');
    mobileToggle.setAttribute('aria-expanded', 'true');
    mobileDrawer.classList.add('open');
    mobileDrawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeMobileMenu = () => {
    mobileToggle.classList.remove('active');
    mobileToggle.setAttribute('aria-expanded', 'false');
    mobileDrawer.classList.remove('open');
    mobileDrawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.contains('open');
      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  mobileLinks.forEach((link) => {
    link.addEventListener('click', closeMobileMenu);
  });

  // 5. MOTION DESIGN: GSAP HERO ENTRADA & SCROLLTRIGGER
  if (typeof gsap !== 'undefined') {
    // Registrar plugin ScrollTrigger
    if (window.ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
    }

    // Timeline do Hero
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.9 } });

    heroTl
      .from('.hero-video-wrapper', {
        opacity: 0,
        scale: 1.04,
        duration: 1.2,
        ease: 'power2.out'
      })
      .fromTo('.site-header',
        { y: -30, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8, 
          ease: 'power3.out',
          clearProps: 'transform'
        },
        '-=0.6'
      )
      .from(
        '.hero-badge',
        {
          scale: 0.85,
          opacity: 0,
          duration: 0.6
        },
        '<+=0.1'
      )
      .from(
        '.title-word',
        {
          y: 40,
          opacity: 0,
          stagger: 0.04,
          duration: 0.8
        },
        '-=0.3'
      )
      .from(
        '.hero-subtitle',
        {
          y: 20,
          opacity: 0,
          duration: 0.7
        },
        '-=0.4'
      )
      .from(
        '.hero-actions .btn',
        {
          y: 20,
          opacity: 0,
          stagger: 0.15,
          duration: 0.6
        },
        '-=0.4'
      )
      .from(
        '.hero-stats-strip',
        {
          y: 25,
          opacity: 0,
          duration: 0.6
        },
        '-=0.3'
      )
      .from(
        '.hero-main-card',
        {
          scale: 0.92,
          opacity: 0,
          duration: 1.0,
          ease: 'back.out(1.4)'
        },
        '-=0.8'
      )
      .from(
        '.floating-badge',
        {
          scale: 0.8,
          opacity: 0,
          stagger: 0.2,
          duration: 0.8,
          ease: 'back.out(1.6)'
        },
        '-=0.6'
      )
      .from(
        '.hero-media-controls',
        {
          opacity: 0,
          y: 15,
          duration: 0.6
        },
        '-=0.4'
      );

    // ScrollTriggers para Seções
    // Modalidades - Banner Unificado
    gsap.from('.modalities-hero-banner', {
      scrollTrigger: {
        trigger: '#modalidades',
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      y: 35,
      opacity: 0,
      duration: 0.85,
      ease: 'power3.out',
      clearProps: 'all'
    });

    // Grade de Horários
    gsap.from('#tab-seg-sex .period-card', {
      scrollTrigger: {
        trigger: '#grade',
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      y: 25,
      opacity: 0,
      stagger: 0.08,
      duration: 0.6,
      ease: 'power2.out',
      clearProps: 'all'
    });

    // Planos & Preços
    gsap.from('.pricing-card', {
      scrollTrigger: {
        trigger: '#planos',
        start: 'top 78%',
        toggleActions: 'play none none none'
      },
      y: 35,
      opacity: 0,
      stagger: 0.1,
      duration: 0.75,
      ease: 'power3.out',
      clearProps: 'transform'
    });

    // Diferenciais & Estrutura
    gsap.from('.feature-card', {
      scrollTrigger: {
        trigger: '#estrutura',
        start: 'top 75%',
        toggleActions: 'play none none none'
      },
      y: 35,
      opacity: 0,
      stagger: 0.1,
      duration: 0.7,
      ease: 'power3.out'
    });

    // Banner de Conversão
    gsap.from('.conversion-banner', {
      scrollTrigger: {
        trigger: '.conversion-banner',
        start: 'top 85%',
        toggleActions: 'play none none none'
      },
      scale: 0.95,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out'
    });

    // Localização & Mapa
    gsap.from('.location-card, .map-card', {
      scrollTrigger: {
        trigger: '#localizacao',
        start: 'top 78%',
        toggleActions: 'play none none none'
      },
      y: 40,
      opacity: 0,
      stagger: 0.2,
      duration: 0.9,
      ease: 'power3.out'
    });
  }

  // 6. SPOTLIGHT EFFECT & 3D TILT INTERATIVO (VANILLA JS PURO)
  const spotlightCards = document.querySelectorAll('.spotlight-card');

  spotlightCards.forEach((card) => {
    const isTiltable = card.hasAttribute('data-tilt');

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Posição para o radial-gradient do Spotlight
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);

      // 3D Tilt suave se habilitado
      if (isTiltable && window.innerWidth > 992) {
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const deltaX = (x - centerX) / centerX;
        const deltaY = (y - centerY) / centerY;

        const rotateX = deltaY * -7; // Inclinação vertical sutil
        const rotateY = deltaX * 7;  // Inclinação horizontal sutil

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      }
    });

    card.addEventListener('mouseleave', () => {
      if (isTiltable) {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
      }
    });
  });

  // 7. ABAS DA GRADE DE HORÁRIOS (SEGUNDA A SEXTA / SÁBADO)
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  tabButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetTabId = btn.getAttribute('data-tab');

      // Atualiza estado visual dos botões
      tabButtons.forEach((b) => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      // Alterna painéis
      tabPanels.forEach((panel) => {
        panel.classList.remove('active');
      });

      const activePanel = document.getElementById(`tab-${targetTabId}`);
      if (activePanel) {
        activePanel.classList.add('active');

        // Reinicia e recalcula alturas de ScrollTrigger caso necessário
        if (window.ScrollTrigger) {
          ScrollTrigger.refresh();
        }
      }
    });
  });

  // 7.1 SELETOR DE PLANOS (MENSAL VS ANUAL COM DESCONTO)
  const billingBtns = document.querySelectorAll('.pricing-billing-btn');
  const priceValues = document.querySelectorAll('.pricing-value-amount');
  const pricePeriods = document.querySelectorAll('.pricing-period-label');
  const priceSavings = document.querySelectorAll('.pricing-savings-note');

  billingBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const cycle = btn.getAttribute('data-cycle');
      billingBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      priceValues.forEach((el) => {
        const val = el.getAttribute(`data-${cycle}`);
        if (val) {
          el.style.transform = 'scale(0.85)';
          el.style.opacity = '0.35';
          setTimeout(() => {
            el.textContent = val;
            el.style.transform = 'scale(1)';
            el.style.opacity = '1';
          }, 140);
        }
      });

      pricePeriods.forEach((el) => {
        el.textContent = cycle === 'annual' ? '/mês no plano anual' : '/mês no plano mensal';
      });

      priceSavings.forEach((el) => {
        el.style.opacity = cycle === 'annual' ? '1' : '0';
        el.style.visibility = cycle === 'annual' ? 'visible' : 'hidden';
      });
    });
  });

  // 8. MODAL ACESSÍVEL (<dialog>) & INTEGRAÇÃO WHATSAPP
  const modalSchedule = document.getElementById('modal-schedule');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const openModalButtons = document.querySelectorAll('.open-modal-btn');
  const scheduleForm = document.getElementById('schedule-form');
  const modalitySelect = document.getElementById('form-modality');

  // Abre Modal
  const openModal = (preselectValue = null) => {
    if (!modalSchedule) return;

    if (preselectValue && modalitySelect) {
      for (let i = 0; i < modalitySelect.options.length; i++) {
        if (modalitySelect.options[i].text.toLowerCase().includes(preselectValue.toLowerCase())) {
          modalitySelect.selectedIndex = i;
          break;
        }
      }
    }

    if (typeof modalSchedule.showModal === 'function') {
      modalSchedule.showModal();
    } else {
      modalSchedule.setAttribute('open', '');
    }

    if (lenis) lenis.stop();
  };

  // Fecha Modal
  const closeModal = () => {
    if (!modalSchedule) return;

    if (typeof modalSchedule.close === 'function') {
      modalSchedule.close();
    } else {
      modalSchedule.removeAttribute('open');
    }

    if (lenis) lenis.start();
  };

  openModalButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const preselect = btn.getAttribute('data-preselect');
      openModal(preselect);
    });
  });

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
  }

  // Fecha clicando no backdrop escurecido do <dialog>
  if (modalSchedule) {
    modalSchedule.addEventListener('click', (e) => {
      const rect = modalSchedule.getBoundingClientRect();
      const isInDialog = (
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width
      );
      if (!isInDialog) {
        closeModal();
      }
    });
  }

  // Submissão do Formulário de Agendamento -> Direciona para WhatsApp
  if (scheduleForm) {
    scheduleForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('form-name')?.value.trim() || 'Cliente';
      const modality = document.getElementById('form-modality')?.value || 'Natação';
      const period = document.getElementById('form-period')?.value || 'Qualquer horário';
      const notes = document.getElementById('form-notes')?.value.trim() || 'Nenhuma observação informada';

      // Mensagem personalizada elegante
      const message = `Olá, equipe Academia Castelinho! 👋%0A%0AGostaria de agendar uma *Aula Experimental gratuita*:%0A%0A👤 *Nome:* ${encodeURIComponent(name)}%0A🏊‍♂️ *Modalidade:* ${encodeURIComponent(modality)}%0A⏰ *Turno Preferido:* ${encodeURIComponent(period)}%0A📝 *Observações:* ${encodeURIComponent(notes)}%0A%0APoderiam me informar os dias e horários disponíveis? Obrigado!`;

      // Telefone oficial comercial (pode ser ajustado para o número específico da academia)
      const whatsappNumber = '5511999999999';
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

      // Abre WhatsApp
      window.open(whatsappUrl, '_blank');

      // Limpa e fecha modal
      scheduleForm.reset();
      closeModal();
    });
  }

  // 9. VÍDEO DE FUNDO HERO: CONTROLES & PERFORMANCE
  const initHeroVideo = () => {
    const video = document.getElementById('hero-video');
    const playBtn = document.getElementById('hero-video-play-toggle');
    const muteBtn = document.getElementById('hero-video-mute-toggle');
    const heroSection = document.getElementById('inicio');

    if (!video) return;

    // Garante reprodução automática suave e trata políticas de autoplay dos navegadores
    const startPlay = () => {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Garante mudo e reproduz se o navegador exigir interação para áudio
          video.muted = true;
          video.play().catch(() => {});
        });
      }
    };
    startPlay();

    // Controle de Play / Pause
    if (playBtn) {
      playBtn.addEventListener('click', () => {
        if (video.paused) {
          video.play();
          video.dataset.userPaused = 'false';
          playBtn.innerHTML = '<i data-lucide="pause" id="hero-play-icon"></i>';
          playBtn.setAttribute('title', 'Pausar Vídeo');
          playBtn.setAttribute('aria-label', 'Pausar vídeo');
        } else {
          video.pause();
          video.dataset.userPaused = 'true';
          playBtn.innerHTML = '<i data-lucide="play" id="hero-play-icon"></i>';
          playBtn.setAttribute('title', 'Reproduzir Vídeo');
          playBtn.setAttribute('aria-label', 'Reproduzir vídeo');
        }
        if (window.lucide) window.lucide.createIcons();
      });
    }

    // Controle de Mudo / Áudio
    if (muteBtn) {
      muteBtn.addEventListener('click', () => {
        if (video.muted) {
          video.muted = false;
          muteBtn.innerHTML = '<i data-lucide="volume-2" id="hero-mute-icon"></i>';
          muteBtn.setAttribute('title', 'Desativar Som');
          muteBtn.setAttribute('aria-label', 'Desativar som do vídeo');
        } else {
          video.muted = true;
          muteBtn.innerHTML = '<i data-lucide="volume-x" id="hero-mute-icon"></i>';
          muteBtn.setAttribute('title', 'Ativar Som');
          muteBtn.setAttribute('aria-label', 'Ativar som do vídeo');
        }
        if (window.lucide) window.lucide.createIcons();
      });
    }

    // Otimização de Performance (IntersectionObserver):
    // Pausa o vídeo quando sair do campo de visão da tela para economizar CPU e GPU
    if ('IntersectionObserver' in window && heroSection) {
      const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (video.paused && video.dataset.userPaused !== 'true') {
              video.play().catch(() => {});
            }
          } else {
            if (!video.paused) {
              video.pause();
            }
          }
        });
      }, { threshold: 0.1 });

      videoObserver.observe(heroSection);
    }
  };

  initHeroVideo();

  // 10. ANO ATUAL AUTOMÁTICO NO FOOTER
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});
