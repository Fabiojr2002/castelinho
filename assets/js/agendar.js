/**
 * ==========================================================================
 * ACADEMIA CASTELINHO - SISTEMA DE AGENDAMENTO DE AULA EXPERIMENTAL
 * Creative Interaction & Booking Flow Engine (Vanilla ES6+)
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. INICIALIZAÇÃO DOS ÍCONES VETORIAIS
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // 2. INICIALIZAÇÃO DO LENIS SMOOTH SCROLL
  let lenis = null;
  if (typeof Lenis !== 'undefined') {
    lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true
    });

    lenis.on('scroll', () => {
      const header = document.getElementById('site-header');
      if (header) {
        if (window.scrollY > 30) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      }
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }

  // 3. ESTADO DO AGENDAMENTO (REACTIVE STATE OBJECT)
  const bookingState = {
    step: 1,
    modality: {
      id: 'natacao-adulto',
      name: 'Natação Adulto',
      icon: 'waves',
      pack: ['Touca de natação', 'Traje de banho (sunga/maiô)', 'Óculos de natação', 'Toalha de banho']
    },
    date: null, // Objeto Date ou string ISO
    timeSlot: '08:30',
    shift: 'all',
    client: {
      name: '',
      phone: '',
      level: 'iniciante',
      notes: '',
      reminder: true
    },
    bookingCode: ''
  };

  // Mapeamento de Modalidades e Kits
  const modalitiesData = {
    'natacao-adulto': {
      name: 'Natação Adulto',
      icon: 'waves',
      pack: ['Touca de natação', 'Traje de banho (sunga/maiô)', 'Óculos de natação', 'Toalha de banho']
    },
    'natacao-infantil': {
      name: 'Natação Infantil (3 a 12 anos)',
      icon: 'smile',
      pack: ['Touca de natação', 'Traje de banho infantil', 'Óculos e toalha', 'Documento do responsável']
    },
    'natacao-bebe': {
      name: 'Natação para Bebês (6m a 3 anos)',
      icon: 'baby',
      pack: ['Fralda especial para água', 'Traje de banho do bebê e do acompanhante', 'Toalha macia', 'Piscina aquecida a 32°C']
    },
    'hidroginastica': {
      name: 'Hidroginástica',
      icon: 'activity',
      pack: ['Touca de natação', 'Maiô ou bermuda apropriada', 'Toalha ou roupão', 'Garrafinha de água']
    },
    'musculacao': {
      name: 'Musculação & Treino de Força',
      icon: 'dumbbell',
      pack: ['Tênis esportivo apropriado', 'Roupa confortável de treino', 'Toalhinha de treino', 'Garrafa de água']
    },
    'coletivas-ritmos': {
      name: 'Aulas Coletivas & Ritmos',
      icon: 'flame',
      pack: ['Tênis confortável', 'Roupa de ginástica leve', 'Muita disposição', 'Garrafa de hidratação']
    }
  };

  // 4. ELEMENTOS DO DOM
  const stepIndicators = document.querySelectorAll('.step-indicator');
  const stepSections = document.querySelectorAll('.step-section');
  const modalityCards = document.querySelectorAll('.modality-select-card');
  const timeSlotCards = document.querySelectorAll('.time-slot-card');
  const shiftTabBtns = document.querySelectorAll('.shift-tab-btn');

  // Elementos do Ticket Resumo
  const ticketModality = document.getElementById('ticket-modality');
  const ticketDate = document.getElementById('ticket-date');
  const ticketTime = document.getElementById('ticket-time');
  const ticketPackList = document.getElementById('ticket-pack-list');
  const ticketIcon = document.getElementById('ticket-icon');

  // Formulário e Inputs
  const inputName = document.getElementById('booking-name');
  const inputPhone = document.getElementById('booking-phone');
  const selectLevel = document.getElementById('booking-level');
  const inputNotes = document.getElementById('booking-notes');
  const checkReminder = document.getElementById('booking-reminder');

  // Botões de Navegação dos Steps
  const btnNextStep1 = document.getElementById('btn-next-step1');
  const btnPrevStep2 = document.getElementById('btn-prev-step2');
  const btnNextStep2 = document.getElementById('btn-next-step2');
  const btnPrevStep3 = document.getElementById('btn-prev-step3');
  const btnNextStep3 = document.getElementById('btn-next-step3');
  const btnPrevStep4 = document.getElementById('btn-prev-step4');
  const btnSubmitBooking = document.getElementById('btn-submit-booking');
  const btnTicketCta = document.getElementById('btn-ticket-cta');

  // Modal Dialog
  const successModal = document.getElementById('dialog-booking-success');
  const btnCloseModal = document.getElementById('btn-close-modal');
  const btnOpenWhatsapp = document.getElementById('btn-whatsapp-confirm');
  const btnDownloadIcs = document.getElementById('btn-download-ics');

  // 5. NAVEGAÇÃO DE PASSOS (STEPPER LOGIC)
  function goToStep(stepNumber) {
    if (stepNumber < 1 || stepNumber > 4) return;

    // Validações antes de avançar
    if (stepNumber > 1 && !bookingState.modality.id) {
      alert('Por favor, selecione uma modalidade antes de avançar.');
      return;
    }
    if (stepNumber > 2 && !bookingState.date) {
      alert('Por favor, selecione uma data no calendário.');
      return;
    }
    if (stepNumber > 3 && !bookingState.timeSlot) {
      alert('Por favor, escolha um horário para a sua aula.');
      return;
    }

    bookingState.step = stepNumber;

    // Atualiza indicadores visuais dos steps
    stepIndicators.forEach((indicator) => {
      const step = parseInt(indicator.getAttribute('data-step'), 10);
      indicator.classList.remove('active', 'completed');

      if (step === stepNumber) {
        indicator.classList.add('active');
      } else if (step < stepNumber) {
        indicator.classList.add('completed');
      }
    });

    // Exibe a seção ativa
    stepSections.forEach((section) => {
      const sectionStep = parseInt(section.getAttribute('data-step-section'), 10);
      if (sectionStep === stepNumber) {
        section.classList.add('active');
      } else {
        section.classList.remove('active');
      }
    });

    // Rola suavemente até o topo do card stepper se estiver em mobile
    if (window.innerWidth <= 1024) {
      const card = document.querySelector('.booking-stepper-card');
      if (card) {
        card.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  // Cliques nos cabeçalhos dos steps
  stepIndicators.forEach((ind) => {
    ind.addEventListener('click', () => {
      const targetStep = parseInt(ind.getAttribute('data-step'), 10);
      // Permite clicar apenas em passos anteriores ou já liberados
      if (targetStep <= bookingState.step || ind.classList.contains('completed')) {
        goToStep(targetStep);
      }
    });
  });

  // Botões Próximo / Anterior
  if (btnNextStep1) btnNextStep1.addEventListener('click', () => goToStep(2));
  if (btnPrevStep2) btnPrevStep2.addEventListener('click', () => goToStep(1));
  if (btnNextStep2) btnNextStep2.addEventListener('click', () => goToStep(3));
  if (btnPrevStep3) btnPrevStep3.addEventListener('click', () => goToStep(2));
  if (btnNextStep3) btnNextStep3.addEventListener('click', () => goToStep(4));
  if (btnPrevStep4) btnPrevStep4.addEventListener('click', () => goToStep(3));

  if (btnTicketCta) {
    btnTicketCta.addEventListener('click', () => {
      if (bookingState.step < 4) {
        goToStep(bookingState.step + 1);
      } else {
        submitBookingForm();
      }
    });
  }

  // 6. PASSO 1: SELEÇÃO DE MODALIDADE
  modalityCards.forEach((card) => {
    card.addEventListener('click', () => {
      modalityCards.forEach((c) => c.classList.remove('selected'));
      card.classList.add('selected');

      const modalityId = card.getAttribute('data-modality');
      const modData = modalitiesData[modalityId] || modalitiesData['natacao-adulto'];

      bookingState.modality = {
        id: modalityId,
        name: modData.name,
        icon: modData.icon,
        pack: modData.pack
      };

      updateTicketSummary();
    });
  });

  // 7. PASSO 2: CALENDÁRIO INTERATIVO (VANILLA JS ENGINE)
  let currentMonthIndex = new Date().getMonth();
  let currentYear = new Date().getFullYear();

  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const calMonthTitle = document.getElementById('cal-month-title');
  const calDaysGrid = document.getElementById('cal-days-grid');
  const calPrevBtn = document.getElementById('cal-prev-btn');
  const calNextBtn = document.getElementById('cal-next-btn');
  const quickDatePills = document.querySelectorAll('.quick-date-pill');

  function renderCalendar(month, year) {
    if (!calDaysGrid || !calMonthTitle) return;

    calMonthTitle.textContent = `${monthNames[month]} de ${year}`;
    calDaysGrid.innerHTML = '';

    const firstDayIndex = new Date(year, month, 1).getDay(); // 0 (Domingo) a 6 (Sábado)
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Desativa botão prev se estiver no mês/ano atual
    if (year === today.getFullYear() && month <= today.getMonth()) {
      calPrevBtn.disabled = true;
    } else {
      calPrevBtn.disabled = false;
    }

    // Preenchimento de dias vazios antes do primeiro dia do mês
    for (let i = 0; i < firstDayIndex; i++) {
      const emptyCell = document.createElement('div');
      emptyCell.className = 'cal-day-cell empty';
      calDaysGrid.appendChild(emptyCell);
    }

    // Dias do mês
    for (let day = 1; day <= daysInMonth; day++) {
      const cellDate = new Date(year, month, day);
      cellDate.setHours(0, 0, 0, 0);

      const dayCell = document.createElement('button');
      dayCell.type = 'button';
      dayCell.className = 'cal-day-cell';
      dayCell.textContent = day;

      const dayOfWeek = cellDate.getDay(); // 0 = Domingo

      // Bloqueia domingos (academia fechada) e dias passados
      const isPast = cellDate < today;
      const isSunday = dayOfWeek === 0;

      if (isPast || isSunday) {
        dayCell.classList.add('disabled');
        dayCell.disabled = true;
        if (isSunday) {
          dayCell.title = 'Academia fechada aos domingos';
        } else {
          dayCell.title = 'Data anterior';
        }
      } else {
        // Marca hoje
        if (cellDate.getTime() === today.getTime()) {
          dayCell.classList.add('today');
        }

        // Verifica se é a data selecionada
        if (bookingState.date && bookingState.date.getTime() === cellDate.getTime()) {
          dayCell.classList.add('selected');
        }

        dayCell.addEventListener('click', () => {
          document.querySelectorAll('.cal-day-cell').forEach((c) => c.classList.remove('selected'));
          dayCell.classList.add('selected');

          // Desmarca quick pills
          quickDatePills.forEach((p) => p.classList.remove('active'));

          bookingState.date = new Date(cellDate);
          updateTicketSummary();
        });
      }

      calDaysGrid.appendChild(dayCell);
    }
  }

  // Navegação de mês
  if (calPrevBtn) {
    calPrevBtn.addEventListener('click', () => {
      currentMonthIndex--;
      if (currentMonthIndex < 0) {
        currentMonthIndex = 11;
        currentYear--;
      }
      renderCalendar(currentMonthIndex, currentYear);
    });
  }

  if (calNextBtn) {
    calNextBtn.addEventListener('click', () => {
      currentMonthIndex++;
      if (currentMonthIndex > 11) {
        currentMonthIndex = 0;
        currentYear++;
      }
      renderCalendar(currentMonthIndex, currentYear);
    });
  }

  // Atalhos Rápidos (Hoje, Amanhã, Próxima Segunda, Sábado)
  quickDatePills.forEach((pill) => {
    pill.addEventListener('click', () => {
      quickDatePills.forEach((p) => p.classList.remove('active'));
      pill.classList.add('active');

      const type = pill.getAttribute('data-quick-date');
      const targetDate = new Date();
      targetDate.setHours(0, 0, 0, 0);

      if (type === 'today') {
        if (targetDate.getDay() === 0) {
          targetDate.setDate(targetDate.getDate() + 1); // se for domingo joga pra segunda
        }
      } else if (type === 'tomorrow') {
        targetDate.setDate(targetDate.getDate() + 1);
        if (targetDate.getDay() === 0) {
          targetDate.setDate(targetDate.getDate() + 1); // pula domingo
        }
      } else if (type === 'next-monday') {
        const day = targetDate.getDay();
        const diff = (8 - day) % 7 || 7;
        targetDate.setDate(targetDate.getDate() + diff);
      } else if (type === 'next-saturday') {
        const day = targetDate.getDay();
        const diff = (6 - day + 7) % 7 || 7;
        targetDate.setDate(targetDate.getDate() + diff);
      }

      currentMonthIndex = targetDate.getMonth();
      currentYear = targetDate.getFullYear();
      bookingState.date = new Date(targetDate);

      renderCalendar(currentMonthIndex, currentYear);
      updateTicketSummary();
    });
  });

  // Inicializa data padrão: amanhã (ou hoje se dia de semana)
  const defaultInitialDate = new Date();
  defaultInitialDate.setHours(0, 0, 0, 0);
  if (defaultInitialDate.getDay() === 0) {
    defaultInitialDate.setDate(defaultInitialDate.getDate() + 1);
  } else {
    // Escolhe amanhã por cortesia
    defaultInitialDate.setDate(defaultInitialDate.getDate() + 1);
    if (defaultInitialDate.getDay() === 0) {
      defaultInitialDate.setDate(defaultInitialDate.getDate() + 1);
    }
  }
  bookingState.date = defaultInitialDate;
  renderCalendar(currentMonthIndex, currentYear);

  // 8. PASSO 3: HORÁRIOS & FILTROS DE TURNO
  shiftTabBtns.forEach((tab) => {
    tab.addEventListener('click', () => {
      shiftTabBtns.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      const shift = tab.getAttribute('data-shift');
      bookingState.shift = shift;

      timeSlotCards.forEach((card) => {
        const cardShift = card.getAttribute('data-shift');
        if (shift === 'all' || cardShift === shift) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  timeSlotCards.forEach((slot) => {
    slot.addEventListener('click', () => {
      timeSlotCards.forEach((s) => s.classList.remove('selected'));
      slot.classList.add('selected');

      const timeVal = slot.getAttribute('data-time');
      bookingState.timeSlot = timeVal;

      updateTicketSummary();
    });
  });

  // 9. PASSO 4: MÁSCARA DE TELEFONE E ATUALIZAÇÃO DOS CAMPOS
  if (inputPhone) {
    inputPhone.addEventListener('input', (e) => {
      let val = e.target.value.replace(/\D/g, '');
      if (val.length > 11) val = val.slice(0, 11);

      if (val.length > 6) {
        val = `(${val.slice(0, 2)}) ${val.slice(2, 7)}-${val.slice(7)}`;
      } else if (val.length > 2) {
        val = `(${val.slice(0, 2)}) ${val.slice(2)}`;
      } else if (val.length > 0) {
        val = `(${val}`;
      }
      e.target.value = val;
    });
  }

  // 10. ATUALIZAÇÃO DO VOUCHER / TICKET RESUMO
  function updateTicketSummary() {
    if (ticketModality) {
      ticketModality.textContent = bookingState.modality.name;
    }

    if (ticketDate && bookingState.date) {
      const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
      const formatted = bookingState.date.toLocaleDateString('pt-BR', options);
      // Capitaliza a primeira letra
      ticketDate.textContent = formatted.charAt(0).toUpperCase() + formatted.slice(1);
    }

    if (ticketTime) {
      ticketTime.textContent = `${bookingState.timeSlot}h (Duração: ~50min)`;
    }

    if (ticketIcon && bookingState.modality.icon) {
      ticketIcon.setAttribute('data-lucide', bookingState.modality.icon);
    }

    if (ticketPackList && bookingState.modality.pack) {
      ticketPackList.innerHTML = '';
      bookingState.modality.pack.forEach((item) => {
        const li = document.createElement('li');
        li.innerHTML = `<i data-lucide="check-circle-2"></i> <span>${item}</span>`;
        ticketPackList.appendChild(li);
      });
    }

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  // 11. FAQ ACCORDION INTERATIVO
  const faqItems = document.querySelectorAll('.faq-accordion-item');
  faqItems.forEach((item) => {
    const btn = item.querySelector('.faq-question-btn');
    if (btn) {
      btn.addEventListener('click', () => {
        const isOpen = item.classList.contains('active');
        // Fecha outros
        faqItems.forEach((other) => other.classList.remove('active'));
        if (!isOpen) {
          item.classList.add('active');
        }
      });
    }
  });

  // 12. ENVIO E CONFIRMAÇÃO DO AGENDAMENTO
  function generateBookingCode() {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    return `CAST-EXP-${randomNum}`;
  }

  function submitBookingForm() {
    const name = inputName ? inputName.value.trim() : '';
    const phone = inputPhone ? inputPhone.value.trim() : '';
    const level = selectLevel ? selectLevel.value : 'Iniciante';
    const notes = inputNotes ? inputNotes.value.trim() : 'Nenhuma';
    const reminder = checkReminder ? checkReminder.checked : true;

    if (!name) {
      alert('Por favor, informe seu nome completo.');
      if (inputName) inputName.focus();
      return;
    }

    if (!phone || phone.replace(/\D/g, '').length < 10) {
      alert('Por favor, digite um número de WhatsApp válido com DDD.');
      if (inputPhone) inputPhone.focus();
      return;
    }

    bookingState.client = { name, phone, level, notes, reminder };
    bookingState.bookingCode = generateBookingCode();

    // Atualiza modal de sucesso
    const modalCode = document.getElementById('modal-booking-code');
    const modalClientName = document.getElementById('modal-client-name');
    const modalModality = document.getElementById('modal-modality');
    const modalDateTime = document.getElementById('modal-datetime');

    if (modalCode) modalCode.textContent = bookingState.bookingCode;
    if (modalClientName) modalClientName.textContent = name;
    if (modalModality) modalModality.textContent = bookingState.modality.name;

    if (modalDateTime && bookingState.date) {
      const options = { weekday: 'short', day: '2-digit', month: '2-digit' };
      const dateFormatted = bookingState.date.toLocaleDateString('pt-BR', options);
      modalDateTime.textContent = `${dateFormatted} às ${bookingState.timeSlot}h`;
    }

    // Salva no localStorage para sincronização com o painel da recepção
    try {
      const STORAGE_KEY = 'castelinho_bookings';
      const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      const y = bookingState.date.getFullYear();
      const m = String(bookingState.date.getMonth() + 1).padStart(2, '0');
      const d = String(bookingState.date.getDate()).padStart(2, '0');
      const isoDate = `${y}-${m}-${d}`;

      const hour = parseInt(bookingState.timeSlot.split(':')[0], 10);
      let shift = 'morning';
      if (hour >= 12 && hour < 18) shift = 'afternoon';
      if (hour >= 18) shift = 'evening';

      const newRecord = {
        id: bookingState.bookingCode,
        name: bookingState.client.name,
        phone: bookingState.client.phone,
        modality: bookingState.modality.name,
        modalityId: bookingState.modality.id,
        icon: bookingState.modality.icon,
        date: isoDate,
        time: bookingState.timeSlot,
        shift: shift,
        level: bookingState.client.level,
        instructor: 'Prof. da Turma',
        notes: bookingState.client.notes,
        status: 'pending'
      };

      existing.unshift(newRecord);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
    } catch (err) {
      console.warn('Erro ao salvar no localStorage', err);
    }

    // Configura o Link do WhatsApp com mensagem pronta
    setupWhatsAppButton();

    // Abre o Dialog Nativo
    if (successModal && typeof successModal.showModal === 'function') {
      successModal.showModal();
    } else if (successModal) {
      successModal.setAttribute('open', '');
    }

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  if (btnSubmitBooking) {
    btnSubmitBooking.addEventListener('click', (e) => {
      e.preventDefault();
      submitBookingForm();
    });
  }

  if (btnCloseModal && successModal) {
    btnCloseModal.addEventListener('click', () => {
      if (typeof successModal.close === 'function') {
        successModal.close();
      } else {
        successModal.removeAttribute('open');
      }
    });
  }

  // 13. INTEGRAÇÃO WHATSAPP COM TEXTO FORMATADO
  function setupWhatsAppButton() {
    if (!btnOpenWhatsapp) return;

    const dateStr = bookingState.date ? bookingState.date.toLocaleDateString('pt-BR') : '';
    const msg = 
`*AGENDAMENTO DE AULA EXPERIMENTAL GRATUITA* 🏊⚡
*Código:* ${bookingState.bookingCode}

👤 *Nome do Aluno:* ${bookingState.client.name}
🏊 *Modalidade:* ${bookingState.modality.name}
📅 *Data Escolhida:* ${dateStr}
⏰ *Horário:* ${bookingState.timeSlot}h
🎯 *Nível de Experiência:* ${bookingState.client.level}
📝 *Observações:* ${bookingState.client.notes || 'Sem restrições'}
📱 *WhatsApp do Aluno:* ${bookingState.client.phone}

_Olá equipe Castelinho! Agendei minha aula experimental pelo site oficial e gostaria de confirmar minha vaga na recepção._`;

    const encodedMsg = encodeURIComponent(msg);
    // WhatsApp oficial da Academia Castelinho
    btnOpenWhatsapp.href = `https://wa.me/5511996441498?text=${encodedMsg}`;
  }

  // 14. GERADOR DE ARQUIVO .ICS (CALENDÁRIO / GOOGLE / APPLE)
  if (btnDownloadIcs) {
    btnDownloadIcs.addEventListener('click', (e) => {
      e.preventDefault();
      if (!bookingState.date) return;

      const year = bookingState.date.getFullYear();
      const month = String(bookingState.date.getMonth() + 1).padStart(2, '0');
      const day = String(bookingState.date.getDate()).padStart(2, '0');
      const [hours, minutes] = bookingState.timeSlot.split(':');

      const dtStart = `${year}${month}${day}T${hours.padStart(2, '0')}${minutes.padStart(2, '0')}00`;
      
      // Duração 1h
      const endHour = String(parseInt(hours, 10) + 1).padStart(2, '0');
      const dtEnd = `${year}${month}${day}T${endHour}${minutes.padStart(2, '0')}00`;

      const icsContent = 
`BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Academia Castelinho//Aula Experimental//PT
CALSCALE:GREGORIAN
BEGIN:VEVENT
SUMMARY:Aula Experimental: ${bookingState.modality.name} - Academia Castelinho
DESCRIPTION:Sua aula experimental gratuita na Academia Castelinho.\\nCódigo: ${bookingState.bookingCode}\\nModalidade: ${bookingState.modality.name}\\nO que levar: ${bookingState.modality.pack.join(', ')}
LOCATION:Av. Maria Cursi, 745 - Cidade São Mateus, São Paulo - SP
DTSTART:${dtStart}
DTEND:${dtEnd}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

      const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.setAttribute('download', `aula-experimental-castelinho-${bookingState.bookingCode}.ics`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }

  // Inicialização inicial do ticket
  updateTicketSummary();

  // 15. PRÉ-SELEÇÃO DE MODALIDADE VIA QUERY PARAMETER (?modalidade=...)
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const rawModality = (urlParams.get('modalidade') || '').toLowerCase().trim();

    const modalityAliases = {
      'musculacao': 'musculacao',
      'pesos-livres': 'musculacao',
      'forca': 'musculacao',
      'natacao': 'natacao-adulto',
      'natacao-adulto': 'natacao-adulto',
      'natacao-infantil': 'natacao-infantil',
      'infantil': 'natacao-infantil',
      'natacao-bebe': 'natacao-bebe',
      'bebe': 'natacao-bebe',
      'hidroginastica': 'hidroginastica',
      'hidro': 'hidroginastica',
      'coletivas-ritmos': 'coletivas-ritmos',
      'ritmos': 'coletivas-ritmos',
      'funcional': 'coletivas-ritmos'
    };

    const resolvedModality = modalityAliases[rawModality] || (modalitiesData[rawModality] ? rawModality : null);

    if (resolvedModality && modalitiesData[resolvedModality]) {
      const targetCard = document.querySelector(`.modality-select-card[data-modality="${resolvedModality}"]`);
      if (targetCard) {
        modalityCards.forEach((c) => c.classList.remove('selected'));
        targetCard.classList.add('selected');
        const modData = modalitiesData[resolvedModality];
        bookingState.modality = {
          id: resolvedModality,
          name: modData.name,
          icon: modData.icon,
          pack: modData.pack
        };
        updateTicketSummary();

        // Rolagem suave até a área de agendamento para conveniência do usuário
        setTimeout(() => {
          const bookingSection = document.getElementById('booking-stepper');
          if (bookingSection) {
            bookingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 280);
      }
    }
  } catch (err) {
    console.warn('Erro ao processar parâmetro de modalidade', err);
  }
});
