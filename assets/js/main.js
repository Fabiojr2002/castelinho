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

  // 2. CONFIGURAÇÃO & SINCRONIZAÇÃO LENIS (SMOOTH SCROLL APENAS EM DESKTOP)
  // No mobile/touch, a rolagem nativa por hardware a 120Hz/60Hz é muito superior e evita travamentos
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || window.innerWidth <= 991;
  let lenis = null;

  if (!isTouchDevice && typeof Lenis !== 'undefined') {
    lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      infinite: false
    });

    // Sincroniza Lenis com o ticker do GSAP
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

    gsap.ticker.lagSmoothing(500, 33);
  } else {
    // Dispositivos móveis / Touch: Rolagem nativa suave e responsiva sem interceptação de toque
    window.addEventListener('scroll', () => {
      if (window.ScrollTrigger) {
        ScrollTrigger.update();
      }
      if (typeof handleHeaderScroll === 'function') {
        handleHeaderScroll(window.scrollY);
      }
    }, { passive: true });
  }

  // Suporte a âncoras suaves (inclui tratamento correto para #inicio com position: sticky)
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement || targetId === '#inicio') {
        e.preventDefault();

        // Se o menu mobile estiver aberto, fecha e libera o scroll imediatamente
        closeMobileMenu();

        if (targetId === '#inicio') {
          if (lenis) {
            lenis.scrollTo(0, {
              duration: 1.1,
              easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
            });
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
          return;
        }

        if (lenis) {
          lenis.scrollTo(targetElement, {
            offset: -70,
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
          });
        } else {
          const targetTop = targetElement.getBoundingClientRect().top + (window.scrollY || window.pageYOffset) - 70;
          window.scrollTo({ top: Math.max(0, targetTop), behavior: 'smooth' });
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

    // Identifica seção ativa para destaque na navegação (respeitando #inicio com position: sticky)
    let currentSection = 'inicio';
    const modalidadesEl = document.getElementById('modalidades');
    const heroCutoff = modalidadesEl ? modalidadesEl.offsetTop - 130 : 400;

    if (currentScroll < heroCutoff) {
      currentSection = 'inicio';
    } else {
      sections.forEach((section) => {
        const id = section.getAttribute('id');
        if (id === 'inicio') return;
        const sectionTop = section.offsetTop - 130;
        const sectionHeight = section.offsetHeight;
        if (currentScroll >= sectionTop && currentScroll < sectionTop + sectionHeight) {
          currentSection = id;
        }
      });
    }

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
      // Evita travamentos e recálculos desnecessários causados pela barra de endereço no mobile
      ScrollTrigger.config({ ignoreMobileResize: true });
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
        '.hero-brand-badge',
        {
          scale: 0.85,
          opacity: 0,
          duration: 0.6
        },
        '<+=0.1'
      )
      .from(
        '.hero-ref-title',
        {
          y: 30,
          opacity: 0,
          duration: 0.8
        },
        '-=0.3'
      )
      .from(
        '.hero-ref-desc',
        {
          y: 20,
          opacity: 0,
          duration: 0.7
        },
        '-=0.4'
      )
      .from(
        '.hero-ref-action',
        {
          y: 20,
          opacity: 0,
          duration: 0.6
        },
        '-=0.4'
      )
      .from(
        '.hero-ref-pills',
        {
          y: 25,
          opacity: 0,
          duration: 0.6
        },
        '-=0.3'
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

    // Efeito Curtain Reveal / Section Stacking: 100% nativo via CSS position: sticky
    // Elimina pin-spacers e conflitos de toque no mobile

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

  // Modal de Escolha: Atendimento Online vs WhatsApp Matrícula
  const modalChoice = document.getElementById('modal-start-choice');
  const closeChoiceModalBtn = document.getElementById('close-choice-modal-btn');

  const openChoiceModal = (preselect = null) => {
    if (!modalChoice) return;

    // Atualiza links e textos dinamicamente de acordo com o plano/modalidade selecionado
    const scheduleLink = modalChoice.querySelector('.card-schedule-option');
    const waLink = modalChoice.querySelector('.card-whatsapp-option');
    const subtitle = modalChoice.querySelector('.dialog-subtitle');

    if (preselect) {
      const planName = preselect.trim();
      let modParam = 'musculacao';
      const lower = planName.toLowerCase();
      if (lower.includes('nata') || lower.includes('aquát')) modParam = 'natacao-adulto';
      else if (lower.includes('combo')) modParam = 'musculacao';
      else if (lower.includes('famí') || lower.includes('fami') || lower.includes('bebê')) modParam = 'natacao-infantil';
      else if (lower.includes('hidro')) modParam = 'hidroginastica';
      else if (lower.includes('funcional') || lower.includes('ritmo')) modParam = 'coletivas-ritmos';

      if (scheduleLink) {
        scheduleLink.href = `agendar.html?modalidade=${modParam}`;
      }

      if (waLink) {
        const text = `Olá! Vim pelo site da Academia Castelinho e quero iniciar minha matrícula no plano ${planName}!`;
        waLink.href = `https://wa.me/5511996441498?text=${encodeURIComponent(text)}`;
      }

      if (subtitle) {
        subtitle.textContent = `Interessado no Plano ${planName}? Selecione uma das opções abaixo para darmos início:`;
      }
    } else {
      if (scheduleLink) {
        scheduleLink.href = 'agendar.html';
      }
      if (waLink) {
        const text = 'Olá! Vim pelo site da Academia Castelinho e quero iniciar minha matrícula!';
        waLink.href = `https://wa.me/5511996441498?text=${encodeURIComponent(text)}`;
      }
      if (subtitle) {
        subtitle.textContent = 'Selecione uma das opções abaixo para darmos início ao seu atendimento:';
      }
    }

    if (typeof modalChoice.showModal === 'function') {
      modalChoice.showModal();
    } else {
      modalChoice.setAttribute('open', '');
    }
    if (window.lucide) {
      window.lucide.createIcons();
    }
    if (lenis) lenis.stop();
  };

  const closeChoiceModal = () => {
    if (!modalChoice) return;
    if (typeof modalChoice.close === 'function') {
      modalChoice.close();
    } else {
      modalChoice.removeAttribute('open');
    }
    if (lenis) lenis.start();
  };

  if (closeChoiceModalBtn) {
    closeChoiceModalBtn.addEventListener('click', closeChoiceModal);
  }

  if (modalChoice) {
    modalChoice.addEventListener('click', (e) => {
      const rect = modalChoice.getBoundingClientRect();
      const isInDialog = (
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width
      );
      if (!isInDialog) {
        closeChoiceModal();
      }
    });

    // Fecha ao clicar em uma das opções
    modalChoice.querySelectorAll('.choice-action-card').forEach((card) => {
      card.addEventListener('click', () => {
        closeChoiceModal();
      });
    });
  }

  // Abre Modal de Agendamento Tradicional
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

  // Fecha Modal Tradicional
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
    btn.addEventListener('click', (e) => {
      const targetModal = btn.getAttribute('data-modal');
      const preselect = btn.getAttribute('data-preselect');

      if (targetModal === 'modal-start-choice' || btn.id === 'modalities-start-btn') {
        e.preventDefault();
        openChoiceModal(preselect);
      } else {
        openModal(preselect);
      }
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
      const whatsappNumber = '5511996441498';
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

      // Abre WhatsApp
      window.open(whatsappUrl, '_blank');

      // Limpa e fecha modal
      scheduleForm.reset();
      closeModal();
    });
  }

  // 9. VÍDEO DE FUNDO HERO: CONTROLES & PERFORMANCE (CARREGAMENTO INSTANTÂNEO NO MOBILE)
  const initHeroVideo = () => {
    const video = document.getElementById('hero-video');
    const playBtn = document.getElementById('hero-video-play-toggle');
    const muteBtn = document.getElementById('hero-video-mute-toggle');
    const heroSection = document.getElementById('inicio');

    if (!video) return;

    // Garante atributos e propriedades de reprodução inline silenciosa nativa no mobile
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');

    const isHeroVisibleByScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset || 0;
      const heroHeight = heroSection ? heroSection.offsetHeight : 700;
      return scrollY < heroHeight - 40;
    };

    // Garante reprodução automática suave e trata políticas de autoplay dos navegadores móveis
    const startPlay = () => {
      if (video.dataset.userPaused === 'true') return;
      if (!isHeroVisibleByScroll()) return;
      video.muted = true;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          video.muted = true;
          video.defaultMuted = true;
          video.play().catch(() => {});
        });
      }
    };

    // Seleção de vídeo por viewport: Original no Desktop, Nadadora no Mobile
    const updateVideoSource = () => {
      const isMobile = window.innerWidth <= 768;
      const targetSrc = isMobile ? 'assets/media/hero-mobile.mp4' : 'assets/media/hero-desktop.mp4';
      const targetPoster = isMobile ? 'assets/media/hero-poster-mobile.jpg' : 'assets/media/hero-poster-desktop.jpg';
      const sourceEl = document.getElementById('hero-video-source');
      const currentSrc = video.currentSrc || video.getAttribute('src') || (sourceEl ? sourceEl.getAttribute('src') : '');

      if (video.getAttribute('poster') !== targetPoster) {
        video.setAttribute('poster', targetPoster);
      }

      if (!currentSrc || !currentSrc.includes(targetSrc)) {
        if (sourceEl) sourceEl.setAttribute('src', targetSrc);
        video.src = targetSrc;
        video.load();
      }
      startPlay();
    };

    // Garante disparo do play assim que os primeiros frames estiverem prontos
    video.addEventListener('loadeddata', startPlay);
    video.addEventListener('canplay', startPlay);

    // Fallback para modos restritos de economia de bateria em iOS/Android: inicia no 1º toque/rolagem
    const unlockAutoplay = () => {
      if (video.paused && video.dataset.userPaused !== 'true' && isHeroVisibleByScroll()) {
        startPlay();
      }
      if (!video.paused) {
        document.removeEventListener('touchstart', unlockAutoplay);
        document.removeEventListener('pointerdown', unlockAutoplay);
        window.removeEventListener('scroll', unlockAutoplay);
      }
    };
    document.addEventListener('touchstart', unlockAutoplay, { passive: true });
    document.addEventListener('pointerdown', unlockAutoplay, { passive: true });
    window.addEventListener('scroll', unlockAutoplay, { passive: true });

    updateVideoSource();
    window.addEventListener('resize', () => {
      clearTimeout(window.__videoResizeTimer);
      window.__videoResizeTimer = setTimeout(updateVideoSource, 250);
    });

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

    // Otimização crucial de Performance (Scroll & Visibilidade):
    // Pausa o vídeo assim que o hero for encoberto pelas modalidades, liberando GPU e CPU no mobile
    const checkVideoVisibility = () => {
      if (!isHeroVisibleByScroll()) {
        if (!video.paused) {
          video.pause();
        }
      } else {
        if (video.paused && video.dataset.userPaused !== 'true') {
          startPlay();
        }
      }
    };

    window.addEventListener('scroll', checkVideoVisibility, { passive: true });
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        if (!video.paused) video.pause();
      } else {
        checkVideoVisibility();
      }
    });

    if ('IntersectionObserver' in window && heroSection) {
      const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            checkVideoVisibility();
          } else {
            if (!video.paused) {
              video.pause();
            }
          }
        });
      }, { threshold: 0.05 });

      videoObserver.observe(heroSection);
    }
  };

  initHeroVideo();

  // 9.1 CARROSSEL INTERATIVO DE MODALIDADES (AUTO-SCROLL CONTÍNUO + TOUCH SWIPE & MOUSE DRAG)
  const initModalitiesCarousel = () => {
    const wrapper = document.querySelector('.modalities-marquee-wrapper');
    if (!wrapper) return;
    const tracks = Array.from(wrapper.querySelectorAll('.modalities-marquee-track'));
    if (tracks.length < 2) return;

    let offset = 0;
    let loopWidth = 0;
    let isDragging = false;
    let isHovered = false;
    let isVisible = true;
    let dragDirectionLocked = null; // 'horizontal' | 'vertical' | null
    let startX = 0;
    let startY = 0;
    let lastX = 0;
    let lastTime = 0;
    let velocity = 0; // px/frame momentum
    let totalMoved = 0;
    let blockNextClick = false;
    let prevFrameTime = performance.now();

    const measureLoopWidth = () => {
      const style = window.getComputedStyle(wrapper);
      const gap = parseFloat(style.columnGap || style.gap || '22') || 22;
      loopWidth = tracks[0].offsetWidth + gap;
    };

    const applyTransform = () => {
      if (loopWidth <= 0) return;
      // Envolve suavemente em ambos os sentidos (arraste para esquerda OU direita sem fim)
      offset = ((offset % loopWidth) + loopWidth) % loopWidth;
      const tx = -offset;
      for (let i = 0; i < tracks.length; i++) {
        tracks[i].style.transform = `translate3d(${tx}px, 0, 0)`;
      }
    };

    measureLoopWidth();
    window.addEventListener('resize', () => {
      measureLoopWidth();
      applyTransform();
    });

    // Pausa cálculos quando o carrossel está fora da tela para economizar bateria
    if ('IntersectionObserver' in window) {
      const visObserver = new IntersectionObserver((entries) => {
        isVisible = entries[0]?.isIntersecting ?? true;
        if (isVisible) prevFrameTime = performance.now();
      }, { rootMargin: '120px' });
      visObserver.observe(wrapper);
    }

    // Loop contínuo suave via rAF (velocidade constante independente de 60Hz/120Hz)
    const tick = (now) => {
      const dt = Math.min((now - prevFrameTime) / 1000, 0.05);
      prevFrameTime = now;

      if (isVisible && loopWidth > 0) {
        if (!isDragging) {
          if (Math.abs(velocity) > 0.15) {
            offset += velocity;
            velocity *= 0.93;
          } else {
            velocity = 0;
            if (!isHovered) {
              const autoSpeedPxPerSec = window.innerWidth <= 768 ? 48 : 54;
              offset += autoSpeedPxPerSec * dt;
            }
          }
          applyTransform();
        }
      }
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);

    // Desktop Hover Pause
    wrapper.addEventListener('mouseenter', () => {
      isHovered = true;
    });
    wrapper.addEventListener('mouseleave', () => {
      isHovered = false;
      if (isDragging) {
        isDragging = false;
        wrapper.classList.remove('is-dragging');
      }
    });

    // Touch Events (Celular / Tablet) com detecção de direção para não travar o scroll vertical
    wrapper.addEventListener('touchstart', (e) => {
      if (e.touches.length !== 1) return;
      const touch = e.touches[0];
      startX = touch.clientX;
      startY = touch.clientY;
      lastX = touch.clientX;
      lastTime = performance.now();
      velocity = 0;
      totalMoved = 0;
      dragDirectionLocked = null;
      isDragging = false;
    }, { passive: true });

    wrapper.addEventListener('touchmove', (e) => {
      if (e.touches.length !== 1) return;
      const touch = e.touches[0];
      const dxFromStart = touch.clientX - startX;
      const dyFromStart = touch.clientY - startY;

      if (dragDirectionLocked === null) {
        if (Math.abs(dxFromStart) > 6 || Math.abs(dyFromStart) > 6) {
          dragDirectionLocked = Math.abs(dxFromStart) > Math.abs(dyFromStart) ? 'horizontal' : 'vertical';
          if (dragDirectionLocked === 'horizontal') {
            isDragging = true;
            wrapper.classList.add('is-dragging');
          }
        }
      }

      if (dragDirectionLocked === 'horizontal') {
        e.preventDefault();
        const now = performance.now();
        const deltaX = touch.clientX - lastX;
        const dtMs = Math.max(now - lastTime, 8);
        totalMoved += Math.abs(deltaX);

        offset -= deltaX;
        // Calcula inércia proporcional para deslize suave ao soltar o dedo
        const rawVel = (-deltaX / dtMs) * 16.6;
        velocity = Math.max(-32, Math.min(32, rawVel * 0.75 + velocity * 0.25));

        lastX = touch.clientX;
        lastTime = now;
        applyTransform();
      }
    }, { passive: false });

    const endTouch = () => {
      if (isDragging) {
        if (totalMoved > 8) {
          blockNextClick = true;
          setTimeout(() => { blockNextClick = false; }, 120);
        }
        isDragging = false;
        wrapper.classList.remove('is-dragging');
      }
      dragDirectionLocked = null;
    };

    wrapper.addEventListener('touchend', endTouch, { passive: true });
    wrapper.addEventListener('touchcancel', endTouch, { passive: true });

    // Mouse Drag (Desktop)
    wrapper.addEventListener('mousedown', (e) => {
      if (e.button !== 0) return;
      isDragging = true;
      wrapper.classList.add('is-dragging');
      startX = e.clientX;
      lastX = e.clientX;
      lastTime = performance.now();
      velocity = 0;
      totalMoved = 0;
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      const now = performance.now();
      const deltaX = e.clientX - lastX;
      const dtMs = Math.max(now - lastTime, 8);
      totalMoved += Math.abs(deltaX);

      offset -= deltaX;
      const rawVel = (-deltaX / dtMs) * 16.6;
      velocity = Math.max(-28, Math.min(28, rawVel * 0.7 + velocity * 0.3));

      lastX = e.clientX;
      lastTime = now;
      applyTransform();
    });

    window.addEventListener('mouseup', () => {
      if (!isDragging) return;
      if (totalMoved > 8) {
        blockNextClick = true;
        setTimeout(() => { blockNextClick = false; }, 120);
      }
      isDragging = false;
      wrapper.classList.remove('is-dragging');
    });

    // Evita abrir o link do card acidentalmente quando o usuário apenas arrastou o carrossel
    wrapper.addEventListener('click', (e) => {
      if (blockNextClick) {
        e.preventDefault();
        e.stopPropagation();
        blockNextClick = false;
      }
    }, true);
  };

  initModalitiesCarousel();

  // 10. ANO ATUAL AUTOMÁTICO NO FOOTER
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});
