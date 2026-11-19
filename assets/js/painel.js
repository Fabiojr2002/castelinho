/**
 * ==========================================================================
 * ACADEMIA CASTELINHO - PAINEL DA RECEPÇÃO & GESTÃO DE AULAS EXPERIMENTAIS
 * Reactive Dashboard Engine (Vanilla ES6+)
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. INICIALIZAÇÃO DE ÍCONES
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // 2. CHAVE DE PERSISTÊNCIA NO LOCALSTORAGE
  const STORAGE_KEY = 'castelinho_bookings';

  // 3. DADOS INICIAIS (SEED REALISTA PARA DEMONSTRAÇÃO IMEDIATA)
  function getSeedBookings() {
    const today = new Date();
    const formatDate = (date) => date.toISOString().split('T')[0];

    // Cria datas de teste em torno de hoje
    const d0 = new Date(today);
    const dMinus1 = new Date(today);
    dMinus1.setDate(today.getDate() - 1);
    const dPlus1 = new Date(today);
    dPlus1.setDate(today.getDate() + 1);
    const dPlus2 = new Date(today);
    dPlus2.setDate(today.getDate() + 2);
    const dPlus5 = new Date(today);
    dPlus5.setDate(today.getDate() + 5);

    return [
      {
        id: 'CAST-EXP-1042',
        name: 'Camila Fernandes da Silva',
        phone: '(11) 98452-1144',
        modality: 'Natação Adulto',
        modalityId: 'natacao-adulto',
        icon: 'waves',
        date: formatDate(d0),
        time: '08:30',
        shift: 'morning',
        level: 'Iniciante (Nunca nadou)',
        instructor: 'Prof. Marcos (Piscina Semiolímpica)',
        notes: 'Tem receio de mergulhar a cabeça, precisa de atenção inicial.',
        status: 'confirmed'
      },
      {
        id: 'CAST-EXP-1043',
        name: 'Enzo Gabriel (Mãe: Juliana Santos)',
        phone: '(11) 97120-9988',
        modality: 'Natação Infantil (3 a 12 anos)',
        modalityId: 'natacao-infantil',
        icon: 'smile',
        date: formatDate(d0),
        time: '10:00',
        shift: 'morning',
        level: 'Básico (4 anos)',
        instructor: 'Profª Tatiana (Área Infantil)',
        notes: 'Já usa boinha de braço, quer aprender a bater perna.',
        status: 'confirmed'
      },
      {
        id: 'CAST-EXP-1044',
        name: 'Dona Maria de Lourdes C.',
        phone: '(11) 99341-2287',
        modality: 'Hidroginástica',
        modalityId: 'hidroginastica',
        icon: 'activity',
        date: formatDate(d0),
        time: '15:00',
        shift: 'afternoon',
        level: 'Iniciante',
        instructor: 'Prof. Ricardo (Hidro)',
        notes: 'Recomendação médica para alívio no joelho.',
        status: 'completed'
      },
      {
        id: 'CAST-EXP-1045',
        name: 'Rafael Moreira Costa',
        phone: '(11) 98845-6677',
        modality: 'Musculação & Treino de Força',
        modalityId: 'musculacao',
        icon: 'dumbbell',
        date: formatDate(d0),
        time: '18:00',
        shift: 'evening',
        level: 'Intermediário',
        instructor: 'Instrutor Diego (Salão)',
        notes: 'Treinava em outra academia, quer conhecer a estrutura.',
        status: 'pending'
      },
      {
        id: 'CAST-EXP-1046',
        name: 'Beatriz Lima (Bebê: Theo, 10 meses)',
        phone: '(11) 96523-4411',
        modality: 'Natação para Bebês (6m a 3 anos)',
        modalityId: 'natacao-bebe',
        icon: 'baby',
        date: formatDate(d0),
        time: '16:30',
        shift: 'afternoon',
        level: 'Bebê 10 meses',
        instructor: 'Profª Juliana (Piscina Bebê)',
        notes: 'Primeira vez do bebê na piscina.',
        status: 'confirmed'
      },
      {
        id: 'CAST-EXP-1047',
        name: 'Thiago Alcantara',
        phone: '(11) 97711-3322',
        modality: 'Natação Adulto',
        modalityId: 'natacao-adulto',
        icon: 'waves',
        date: formatDate(d0),
        time: '19:15',
        shift: 'evening',
        level: 'Avançado (Condicionamento)',
        instructor: 'Prof. Marcos',
        notes: 'Treino para prova de concurso.',
        status: 'confirmed'
      },
      {
        id: 'CAST-EXP-1048',
        name: 'Patrícia Prado',
        phone: '(11) 98112-9090',
        modality: 'Aulas Coletivas & Ritmos',
        modalityId: 'coletivas-ritmos',
        icon: 'flame',
        date: formatDate(dPlus1),
        time: '18:00',
        shift: 'evening',
        level: 'Iniciante',
        instructor: 'Profª Vanessa',
        notes: 'Gosta de ritmos e zumba.',
        status: 'confirmed'
      },
      {
        id: 'CAST-EXP-1049',
        name: 'Lucas Souza',
        phone: '(11) 96112-3344',
        modality: 'Musculação & Treino de Força',
        modalityId: 'musculacao',
        icon: 'dumbbell',
        date: formatDate(dPlus1),
        time: '07:00',
        shift: 'morning',
        level: 'Iniciante',
        instructor: 'Instrutor Diego',
        notes: 'Horário antes do trabalho.',
        status: 'pending'
      },
      {
        id: 'CAST-EXP-1050',
        name: 'Fernanda Martins',
        phone: '(11) 95544-7788',
        modality: 'Hidroginástica',
        modalityId: 'hidroginastica',
        icon: 'activity',
        date: formatDate(dPlus2),
        time: '15:00',
        shift: 'afternoon',
        level: 'Iniciante',
        instructor: 'Prof. Ricardo',
        notes: '',
        status: 'confirmed'
      },
      {
        id: 'CAST-EXP-1039',
        name: 'Rodrigo Pires',
        phone: '(11) 94433-2211',
        modality: 'Natação Adulto',
        modalityId: 'natacao-adulto',
        icon: 'waves',
        date: formatDate(dMinus1),
        time: '08:30',
        shift: 'morning',
        level: 'Iniciante',
        instructor: 'Prof. Marcos',
        notes: 'Fez a aula e fechou o Plano Trimestral!',
        status: 'completed'
      }
    ];
  }

  // Carrega ou inicializa os dados
  function loadBookings() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const seed = getSeedBookings();
      saveBookings(seed);
      return seed;
    }
    try {
      return JSON.parse(raw);
    } catch (e) {
      console.error('Erro ao ler localStorage', e);
      return getSeedBookings();
    }
  }

  function saveBookings(bookings) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
  }

  // 3.1 GESTÃO DE USUÁRIOS E AUTENTICAÇÃO NO LOCALSTORAGE
  const USERS_STORAGE_KEY = 'castelinho_users_db';
  const AUTH_USER_KEY = 'castelinho_current_user';

  function getSeedUsers() {
    return [
      {
        id: 'usr-admin-1',
        username: 'adm',
        password: 'adm123',
        name: 'Administrador Master',
        role: 'admin', // 'admin' ou 'reception'
        createdAt: '17/11/2026'
      }
    ];
  }

  function loadUsers() {
    const raw = localStorage.getItem(USERS_STORAGE_KEY);
    if (!raw) {
      const seed = getSeedUsers();
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(seed));
      return seed;
    }
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      const seed = getSeedUsers();
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(seed));
      return seed;
    } catch (e) {
      console.error('Erro ao ler usuários', e);
      return getSeedUsers();
    }
  }

  function saveUsers(users) {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  }

  function getCurrentUser() {
    const raw = sessionStorage.getItem(AUTH_USER_KEY) || localStorage.getItem(AUTH_USER_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch (e) {
      return null;
    }
  }

  function setCurrentUser(user) {
    sessionStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
  }

  function clearCurrentUser() {
    sessionStorage.removeItem(AUTH_USER_KEY);
    localStorage.removeItem(AUTH_USER_KEY);
  }

  // 4. ESTADO REATIVO DO PAINEL
  let allBookings = loadBookings();
  let currentUsers = loadUsers();
  let currentUser = getCurrentUser();

  let currentViewMode = 'daily'; // 'daily' | 'month' | 'list' | 'users'
  let selectedDate = new Date(); // Data ativa no filtro diário
  selectedDate.setHours(0, 0, 0, 0);

  let searchFilter = '';
  let modalityFilter = 'all';
  let statusFilter = 'all';

  // Controle de mês no Mini-Calendário
  let miniCalMonth = selectedDate.getMonth();
  let miniCalYear = selectedDate.getFullYear();

  // 5. ELEMENTOS DO DOM
  const metricsToday = document.getElementById('metric-today-count');
  const metricsMonth = document.getElementById('metric-month-count');
  const metricsRate = document.getElementById('metric-presence-rate');
  const metricsPending = document.getElementById('metric-pending-count');

  const viewTabDaily = document.getElementById('tab-view-daily');
  const viewTabMonth = document.getElementById('tab-view-month');
  const viewTabList = document.getElementById('tab-view-list');
  const viewTabUsers = document.getElementById('tab-view-users');

  const containerDaily = document.getElementById('container-daily-view');
  const containerMonth = document.getElementById('container-month-view');
  const containerList = document.getElementById('container-list-view');
  const containerUsers = document.getElementById('container-users-view');

  // Mini-Calendário e Seletor
  const datePickerInput = document.getElementById('date-current-picker');
  const btnOpenMiniCal = document.getElementById('btn-open-mini-calendar');
  const datePickerDisplayText = document.getElementById('date-picker-display-text');
  const miniCalPopover = document.getElementById('mini-calendar-popover');
  const miniCalMonthTitle = document.getElementById('mini-cal-month-title');
  const miniCalDaysGrid = document.getElementById('mini-cal-days-grid');
  const miniCalPrevBtn = document.getElementById('mini-cal-prev');
  const miniCalNextBtn = document.getElementById('mini-cal-next');
  const miniCalTodayBtn = document.getElementById('mini-cal-btn-today');

  const btnPrevDate = document.getElementById('btn-prev-date');
  const btnNextDate = document.getElementById('btn-next-date');
  const btnTodayShortcut = document.getElementById('btn-today-shortcut');

  const searchInput = document.getElementById('staff-search-input');
  const filterModalitySelect = document.getElementById('staff-filter-modality');
  const filterStatusSelect = document.getElementById('staff-filter-status');
  const searchActiveNotice = document.getElementById('search-active-notice');

  const btnNewBooking = document.getElementById('btn-new-booking-modal');
  const btnExportCsv = document.getElementById('btn-export-csv');

  // Containers de turnos na visão diária
  const morningList = document.getElementById('morning-bookings-list');
  const afternoonList = document.getElementById('afternoon-bookings-list');
  const eveningList = document.getElementById('evening-bookings-list');
  const morningCount = document.getElementById('morning-count');
  const afternoonCount = document.getElementById('afternoon-count');
  const eveningCount = document.getElementById('evening-count');

  // Modal de Novo Agendamento
  const dialogNewBooking = document.getElementById('dialog-staff-booking');
  const btnCloseDialog = document.getElementById('btn-close-dialog');
  const formStaffBooking = document.getElementById('form-staff-booking');

  // Elementos de Autenticação & Usuários
  const loginOverlay = document.getElementById('admin-login-overlay');
  const formAdminLogin = document.getElementById('form-admin-login');
  const loginInputUsername = document.getElementById('login-input-username');
  const loginInputPassword = document.getElementById('login-input-password');
  const loginErrorMsg = document.getElementById('login-error-msg');
  const loginErrorText = document.getElementById('login-error-text');

  const headerUserBadge = document.getElementById('header-user-badge');
  const userDisplayTag = document.getElementById('user-display-tag');
  const btnLogout = document.getElementById('btn-logout');

  // Gestão de Senha & Usuários no Painel
  const currentUserRoleBadge = document.getElementById('current-user-role-badge');
  const currentUserDisplayName = document.getElementById('current-user-display-name');
  const currentUserFullname = document.getElementById('current-user-fullname');
  const inputViewCurrentPassword = document.getElementById('input-view-current-password');
  const btnToggleViewCurrentPw = document.getElementById('btn-toggle-view-current-pw');
  const iconViewCurrentPw = document.getElementById('icon-view-current-pw');

  const formChangeAdminPassword = document.getElementById('form-change-admin-password');
  const inputNewPassword = document.getElementById('input-new-password');
  const inputConfirmPassword = document.getElementById('input-confirm-password');
  const feedbackChangePassword = document.getElementById('feedback-change-password');

  const formAddNewUser = document.getElementById('form-add-new-user');
  const newUserFullname = document.getElementById('new-user-fullname');
  const newUserUsername = document.getElementById('new-user-username');
  const newUserPassword = document.getElementById('new-user-password');
  const newUserRole = document.getElementById('new-user-role');
  const feedbackAddUser = document.getElementById('feedback-add-user');
  const usersTableBody = document.getElementById('users-table-body');
  const totalUsersBadge = document.getElementById('total-users-badge');

  // 6. FORMATAÇÃO AUXILIAR
  function formatIsoDate(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  function formatDisplayDate(date) {
    const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    const str = date.toLocaleDateString('pt-BR', options);
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function getStatusBadge(status) {
    switch (status) {
      case 'confirmed':
        return `<span class="status-pill confirmed"><span class="status-dot"></span>Confirmado</span>`;
      case 'pending':
        return `<span class="status-pill pending"><span class="status-dot"></span>Aguardando</span>`;
      case 'completed':
        return `<span class="status-pill completed"><span class="status-dot"></span>Check-in Feito</span>`;
      case 'cancelled':
        return `<span class="status-pill cancelled"><span class="status-dot"></span>Cancelado</span>`;
      default:
        return `<span class="status-pill confirmed"><span class="status-dot"></span>${status}</span>`;
    }
  }

  // 6.1 AUXILIARES DE ESCAPE E FORMATAÇÃO
  function escapeHtml(str) {
    if (!str) return '';
    return String(str).replace(/[&<>"']/g, function (m) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[m];
    });
  }

  // 7. ATUALIZAÇÃO DOS KPIS / MÉTRICAS DINÂMICAS CONFORME DIA E MÊS SELECIONADOS
  function updateMetrics() {
    const selectedIso = formatIsoDate(selectedDate);
    const selectedMonth = selectedDate.getMonth();
    const selectedYear = selectedDate.getFullYear();

    // 1. Aulas no dia selecionado pelo usuário
    const todayBookings = allBookings.filter((b) => b.date === selectedIso);

    // 2. Aulas no mês selecionado pelo usuário
    const monthBookings = allBookings.filter((b) => {
      const bDate = new Date(b.date + 'T00:00:00');
      return bDate.getMonth() === selectedMonth && bDate.getFullYear() === selectedYear;
    });

    // 4. Aguardando confirmação no dia selecionado
    const pendingForDay = todayBookings.filter((b) => b.status === 'pending').length;

    // 3. Taxa de Presença / Check-in no mês selecionado
    const completedCount = monthBookings.filter((b) => b.status === 'completed').length;
    const totalConsidered = monthBookings.filter((b) => b.status === 'completed' || b.status === 'confirmed').length;
    const presenceRate = totalConsidered > 0 ? Math.round((completedCount / totalConsidered) * 100) : 0;

    if (metricsToday) metricsToday.textContent = todayBookings.length;
    if (metricsMonth) metricsMonth.textContent = monthBookings.length;
    if (metricsRate) metricsRate.textContent = `${presenceRate}%`;
    if (metricsPending) metricsPending.textContent = pendingForDay;

    // Atualiza subtítulos dos cards dinamicamente
    const isToday = selectedIso === formatIsoDate(new Date());
    const trendDay = document.querySelector('.metric-card:nth-child(1) .metric-trend');
    if (trendDay) {
      trendDay.innerHTML = `<i data-lucide="${isToday ? 'trending-up' : 'calendar'}"></i> ${isToday ? 'na agenda de hoje' : 'na data selecionada'}`;
    }

    const monthNames = [
      'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
      'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
    ];
    const trendMonth = document.querySelector('.metric-card:nth-child(2) .metric-trend');
    if (trendMonth) {
      trendMonth.textContent = `${monthNames[selectedMonth]} de ${selectedYear}`;
    }

    const trendPending = document.querySelector('.metric-card:nth-child(4) .metric-trend');
    if (trendPending) {
      trendPending.textContent = pendingForDay === 1 ? '1 para contatar no dia' : `${pendingForDay} para contatar no dia`;
    }

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  // 8. RENDERIZAÇÃO DA VISÃO DIÁRIA COM BUSCA GLOBAL E FILTROS
  function renderDailyView() {
    if (!morningList || !afternoonList || !eveningList) return;

    const selectedIso = formatIsoDate(selectedDate);
    const isSearching = Boolean(searchFilter && searchFilter.trim().length > 0);

    // Controle do Banner de Busca Ativa
    if (searchActiveNotice) {
      if (isSearching) {
        searchActiveNotice.style.display = 'flex';
        searchActiveNotice.innerHTML = `
          <span>
            <i data-lucide="search" style="width: 14px; height: 14px; display: inline-block; vertical-align: middle; margin-right: 4px;"></i>
            Buscando por: "<strong>${escapeHtml(searchFilter)}</strong>" (em todos os agendamentos)
          </span>
          <button type="button" id="btn-clear-search-filter">Limpar Busca</button>
        `;
        const btnClear = document.getElementById('btn-clear-search-filter');
        if (btnClear) {
          btnClear.addEventListener('click', () => {
            searchFilter = '';
            if (searchInput) searchInput.value = '';
            refreshCurrentView();
          });
        }
      } else {
        searchActiveNotice.style.display = 'none';
      }
    }

    // Se estiver buscando por nome/telefone/código, busca em toda a base para que nenhum aluno passe despercebido.
    // Se não estiver buscando, restringe rigorosamente à data selecionada.
    const filteredBookings = allBookings.filter((b) => {
      if (!isSearching && b.date !== selectedIso) return false;
      if (modalityFilter !== 'all' && b.modalityId !== modalityFilter) return false;
      if (statusFilter !== 'all' && b.status !== statusFilter) return false;
      if (isSearching) {
        const query = searchFilter.toLowerCase();
        const matchName = (b.name || '').toLowerCase().includes(query);
        const matchPhone = (b.phone || '').includes(query);
        const matchCode = (b.id || '').toLowerCase().includes(query);
        const matchModality = (b.modality || '').toLowerCase().includes(query);
        const matchInstructor = (b.instructor || '').toLowerCase().includes(query);
        if (!matchName && !matchPhone && !matchCode && !matchModality && !matchInstructor) return false;
      }
      return true;
    });

    // Ordenação: data e horário
    filteredBookings.sort((a, b) => {
      if (a.date !== b.date) return a.date.localeCompare(b.date);
      return a.time.localeCompare(b.time);
    });

    const morningItems = filteredBookings.filter((b) => b.shift === 'morning' || parseInt(b.time.split(':')[0], 10) < 12);
    const afternoonItems = filteredBookings.filter(
      (b) => (b.shift === 'afternoon' || (parseInt(b.time.split(':')[0], 10) >= 12 && parseInt(b.time.split(':')[0], 10) < 18))
    );
    const eveningItems = filteredBookings.filter((b) => b.shift === 'evening' || parseInt(b.time.split(':')[0], 10) >= 18);

    if (morningCount) morningCount.textContent = `${morningItems.length} agendamentos`;
    if (afternoonCount) afternoonCount.textContent = `${afternoonItems.length} agendamentos`;
    if (eveningCount) eveningCount.textContent = `${eveningItems.length} agendamentos`;

    function renderList(container, items, shiftName) {
      container.innerHTML = '';
      if (items.length === 0) {
        container.innerHTML = `
          <div class="empty-shift-notice">
            <i data-lucide="calendar-off"></i>
            <span>${isSearching ? `Nenhum aluno encontrado no turno da ${shiftName}.` : `Nenhuma aula experimental agendada para o turno da ${shiftName} nesta data.`}</span>
          </div>
        `;
        return;
      }

      const canDelete = !currentUser || currentUser.role === 'admin';

      items.forEach((item) => {
        const card = document.createElement('div');
        card.className = 'booking-item-card';

        const encodedMsg = encodeURIComponent(
          `Olá ${item.name}! Somos da recepção da Academia Castelinho.\nConfirmamos sua aula experimental de *${item.modality}* agendada para ${item.date} às *${item.time}h*.\nEstamos ansiosos para recebê-lo(a)! Se precisar de algo, só nos avisar.`
        );
        const cleanPhone = (item.phone || '').replace(/\D/g, '');
        const waUrl = `https://wa.me/55${cleanPhone}?text=${encodedMsg}`;

        const dateParts = (item.date || '').split('-');
        const dateFormatted = dateParts.length === 3 ? `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}` : item.date;

        card.innerHTML = `
          <div>
            <div class="booking-card-top">
              <span class="booking-time-badge" ${isSearching ? 'style="background: rgba(0, 188, 212, 0.2); border-color: rgba(0, 188, 212, 0.5);"' : ''}>
                <i data-lucide="${isSearching ? 'calendar' : 'clock'}"></i> ${isSearching ? `${dateFormatted} às ${item.time}h` : `${item.time}h`}
              </span>
              ${getStatusBadge(item.status)}
            </div>

            <div class="booking-student-info" style="margin-top: 10px;">
              <span class="student-name">${escapeHtml(item.name)}</span>
              <div class="student-modality-badge">
                <i data-lucide="${item.icon || 'waves'}"></i>
                <span>${escapeHtml(item.modality)}</span>
              </div>

              <div class="student-meta-list">
                <div class="student-meta-item">
                  <i data-lucide="phone"></i> <span>${escapeHtml(item.phone)}</span>
                </div>
                <div class="student-meta-item">
                  <i data-lucide="user-check"></i> <span>${escapeHtml(item.instructor || 'Prof. Responsável')}</span>
                </div>
                ${
                  item.notes
                    ? `<div class="student-meta-item">
                        <i data-lucide="info"></i> <span>Obs: ${escapeHtml(item.notes)}</span>
                      </div>`
                    : ''
                }
              </div>
            </div>
          </div>

          <div class="booking-card-actions">
            <div style="display: flex; gap: 8px;">
              <a href="${waUrl}" target="_blank" rel="noopener" class="btn-card-action btn-action-whatsapp" title="Conversar no WhatsApp">
                <i data-lucide="message-circle"></i>
                <span>WhatsApp</span>
              </a>
              <button type="button" class="btn-card-action btn-action-checkin" data-action="toggle-status" data-id="${item.id}" title="Alterar Status / Check-in">
                <i data-lucide="${item.status === 'completed' ? 'check-check' : 'check'}"></i>
                <span>${item.status === 'completed' ? 'Presença OK' : 'Fazer Check-in'}</span>
              </button>
            </div>

            ${canDelete ? `
            <button type="button" class="btn-card-action btn-action-more" data-action="delete" data-id="${item.id}" title="Excluir agendamento">
              <i data-lucide="trash-2"></i>
            </button>` : ''}
          </div>
        `;

        container.appendChild(card);
      });
    }

    renderList(morningList, morningItems, 'Manhã');
    renderList(afternoonList, afternoonItems, 'Tarde');
    renderList(eveningList, eveningItems, 'Noite');

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  // 9. RENDERIZAÇÃO DA VISÃO MENSAL (MONTH VIEW)
  function renderMonthView() {
    if (!containerMonth) return;

    const monthTitle = document.getElementById('month-view-title');
    const monthGrid = document.getElementById('month-calendar-grid');
    if (!monthTitle || !monthGrid) return;

    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();

    const monthNames = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];

    monthTitle.textContent = `${monthNames[month]} de ${year}`;
    monthGrid.innerHTML = '';

    // Cabeçalhos dos dias
    const weekHeaders = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    weekHeaders.forEach((dayName) => {
      const h = document.createElement('div');
      h.className = 'month-cal-header';
      h.textContent = dayName;
      monthGrid.appendChild(h);
    });

    const firstDayIndex = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const todayStr = formatIsoDate(new Date());

    // Células vazias
    for (let i = 0; i < firstDayIndex; i++) {
      const empty = document.createElement('div');
      empty.className = 'month-day-cell disabled';
      monthGrid.appendChild(empty);
    }

    // Dias do mês
    for (let day = 1; day <= daysInMonth; day++) {
      const currentCellDate = new Date(year, month, day);
      const isoStr = formatIsoDate(currentCellDate);
      const dayOfWeek = currentCellDate.getDay();

      const dayCell = document.createElement('div');
      dayCell.className = 'month-day-cell';

      if (dayOfWeek === 0) {
        dayCell.classList.add('disabled');
        dayCell.title = 'Fechado aos Domingos';
      }

      if (isoStr === todayStr) {
        dayCell.classList.add('today');
      }

      if (isoStr === formatIsoDate(selectedDate)) {
        dayCell.classList.add('selected');
      }

      // Conta agendamentos do dia respeitando filtros de modalidade e status
      const count = allBookings.filter((b) => {
        if (b.date !== isoStr) return false;
        if (modalityFilter !== 'all' && b.modalityId !== modalityFilter) return false;
        if (statusFilter !== 'all' && b.status !== statusFilter) return false;
        return true;
      }).length;

      dayCell.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
          <span class="month-day-number">${day}</span>
          ${count > 0 ? `<span class="month-day-badge-count ${count >= 4 ? 'hot' : ''}">${count} ${count === 1 ? 'aula' : 'aulas'}</span>` : ''}
        </div>
        <div style="font-size: 0.72rem; color: var(--text-muted); margin-top: auto;">
          ${dayOfWeek === 0 ? 'Fechado' : count === 0 ? 'Sem reservas' : `${count} confirmada(s)`}
        </div>
      `;

      if (dayOfWeek !== 0) {
        dayCell.addEventListener('click', () => {
          selectedDate = new Date(year, month, day);
          selectedDate.setHours(0, 0, 0, 0);
          updateDatePickerDisplay();
          switchViewMode('daily');
        });
      }

      monthGrid.appendChild(dayCell);
    }
  }

  // 10. RENDERIZAÇÃO DA VISÃO TABELA / LISTA GERAL
  function renderListView() {
    const tableBody = document.getElementById('staff-table-body');
    if (!tableBody) return;

    // Filtra lista geral
    const filtered = allBookings.filter((b) => {
      if (modalityFilter !== 'all' && b.modalityId !== modalityFilter) return false;
      if (statusFilter !== 'all' && b.status !== statusFilter) return false;
      if (searchFilter) {
        const query = searchFilter.toLowerCase();
        const matchName = (b.name || '').toLowerCase().includes(query);
        const matchPhone = (b.phone || '').includes(query);
        const matchCode = (b.id || '').toLowerCase().includes(query);
        const matchModality = (b.modality || '').toLowerCase().includes(query);
        const matchInstructor = (b.instructor || '').toLowerCase().includes(query);
        if (!matchName && !matchPhone && !matchCode && !matchModality && !matchInstructor) return false;
      }
      return true;
    });

    // Ordena da mais recente para a mais antiga
    filtered.sort((a, b) => {
      if (a.date !== b.date) return b.date.localeCompare(a.date);
      return a.time.localeCompare(b.time);
    });

    tableBody.innerHTML = '';

    if (filtered.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="7" style="text-align: center; padding: 36px; color: var(--text-muted);">
            Nenhum agendamento encontrado com os filtros atuais.
          </td>
        </tr>
      `;
      return;
    }

    const canDelete = !currentUser || currentUser.role === 'admin';

    filtered.forEach((item) => {
      const tr = document.createElement('tr');
      const dateParts = (item.date || '').split('-');
      const formattedDate = dateParts.length === 3 ? `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}` : item.date;

      tr.innerHTML = `
        <td>
          <div class="table-student-cell">
            <span class="table-student-name">${escapeHtml(item.name)}</span>
            <span class="table-student-code">${escapeHtml(item.id)}</span>
          </div>
        </td>
        <td>
          <div style="display: flex; align-items: center; gap: 6px;">
            <i data-lucide="${item.icon || 'waves'}" style="width: 14px; height: 14px; color: var(--cyan-glow);"></i>
            <span>${escapeHtml(item.modality)}</span>
          </div>
        </td>
        <td><strong>${formattedDate}</strong> às ${item.time}h</td>
        <td>${escapeHtml(item.phone)}</td>
        <td>${escapeHtml(item.instructor || 'Prof. Responsável')}</td>
        <td>${getStatusBadge(item.status)}</td>
        <td>
          <div style="display: flex; gap: 6px;">
            <button type="button" class="btn-card-action btn-action-checkin" data-action="toggle-status" data-id="${item.id}" style="padding: 4px 8px;" title="Check-in">
              <i data-lucide="check"></i>
            </button>
            ${canDelete ? `
            <button type="button" class="btn-card-action btn-action-more" data-action="delete" data-id="${item.id}" style="padding: 4px 8px;" title="Excluir">
              <i data-lucide="trash-2"></i>
            </button>` : ''}
          </div>
        </td>
      `;

      tableBody.appendChild(tr);
    });

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  // 11. CONTROLE DE ALTERNÂNCIA DE MODOS DE VISUALIZAÇÃO
  function switchViewMode(mode) {
    currentViewMode = mode;

    [viewTabDaily, viewTabMonth, viewTabList, viewTabUsers].forEach((tab) => tab && tab.classList.remove('active'));
    [containerDaily, containerMonth, containerList, containerUsers].forEach((cont) => {
      if (cont) cont.style.display = 'none';
    });

    if (mode === 'daily') {
      if (viewTabDaily) viewTabDaily.classList.add('active');
      if (containerDaily) containerDaily.style.display = 'flex';
      renderDailyView();
    } else if (mode === 'month') {
      if (viewTabMonth) viewTabMonth.classList.add('active');
      if (containerMonth) containerMonth.style.display = 'block';
      renderMonthView();
    } else if (mode === 'list') {
      if (viewTabList) viewTabList.classList.add('active');
      if (containerList) containerList.style.display = 'block';
      renderListView();
    } else if (mode === 'users') {
      if (viewTabUsers) viewTabUsers.classList.add('active');
      if (containerUsers) containerUsers.style.display = 'flex';
      renderUsersTab();
    }
  }

  if (viewTabDaily) viewTabDaily.addEventListener('click', () => switchViewMode('daily'));
  if (viewTabMonth) viewTabMonth.addEventListener('click', () => switchViewMode('month'));
  if (viewTabList) viewTabList.addEventListener('click', () => switchViewMode('list'));
  if (viewTabUsers) viewTabUsers.addEventListener('click', () => {
    if (!currentUser || currentUser.role !== 'admin') {
      alert('Acesso restrito: Apenas administradores podem gerenciar usuários e permissões.');
      return;
    }
    switchViewMode('users');
  });

  // 12. CONTROLE DO SELETOR DE DATAS & MINI-CALENDÁRIO POPOVER
  function updateDatePickerDisplay() {
    const iso = formatIsoDate(selectedDate);
    if (datePickerInput) {
      datePickerInput.value = iso;
    }

    if (datePickerDisplayText) {
      const [y, m, d] = iso.split('-');
      datePickerDisplayText.textContent = `${d}/${m}/${y}`;
    }

    const dateLabel = document.getElementById('selected-date-label');
    if (dateLabel) {
      dateLabel.textContent = formatDisplayDate(selectedDate);
    }

    miniCalMonth = selectedDate.getMonth();
    miniCalYear = selectedDate.getFullYear();
    renderMiniCalendar();

    refreshCurrentView();
  }

  function renderMiniCalendar() {
    if (!miniCalPopover || !miniCalMonthTitle || !miniCalDaysGrid) return;

    const monthNames = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];

    miniCalMonthTitle.textContent = `${monthNames[miniCalMonth]} ${miniCalYear}`;
    miniCalDaysGrid.innerHTML = '';

    const firstDayIndex = new Date(miniCalYear, miniCalMonth, 1).getDay();
    const totalDaysInMonth = new Date(miniCalYear, miniCalMonth + 1, 0).getDate();
    const todayStr = formatIsoDate(new Date());
    const selectedIso = formatIsoDate(selectedDate);

    // Células em branco antes do dia 1
    for (let i = 0; i < firstDayIndex; i++) {
      const emptyCell = document.createElement('div');
      emptyCell.className = 'mini-cal-day-cell empty';
      miniCalDaysGrid.appendChild(emptyCell);
    }

    for (let day = 1; day <= totalDaysInMonth; day++) {
      const cell = document.createElement('div');
      cell.className = 'mini-cal-day-cell';
      cell.textContent = day;

      const cellDate = new Date(miniCalYear, miniCalMonth, day);
      const isoStr = formatIsoDate(cellDate);
      const dayOfWeek = cellDate.getDay();

      if (dayOfWeek === 0) {
        cell.classList.add('disabled');
        cell.title = 'Domingo (Fechado)';
      }

      if (isoStr === todayStr) {
        cell.classList.add('today');
      }

      if (isoStr === selectedIso) {
        cell.classList.add('selected');
      }

      // Verifica se há agendamentos nesta data
      const hasBookings = allBookings.some((b) => b.date === isoStr);
      if (hasBookings) {
        cell.classList.add('has-events');
      }

      cell.addEventListener('click', () => {
        selectedDate = new Date(miniCalYear, miniCalMonth, day);
        selectedDate.setHours(0, 0, 0, 0);
        updateDatePickerDisplay();
        closeMiniCalendar();
      });

      miniCalDaysGrid.appendChild(cell);
    }
  }

  function openMiniCalendar() {
    if (!miniCalPopover) return;
    miniCalMonth = selectedDate.getMonth();
    miniCalYear = selectedDate.getFullYear();
    renderMiniCalendar();
    miniCalPopover.style.display = 'block';
  }

  function closeMiniCalendar() {
    if (miniCalPopover) {
      miniCalPopover.style.display = 'none';
    }
  }

  if (btnOpenMiniCal) {
    btnOpenMiniCal.addEventListener('click', (e) => {
      e.stopPropagation();
      if (miniCalPopover && miniCalPopover.style.display === 'block') {
        closeMiniCalendar();
      } else {
        openMiniCalendar();
      }
    });
  }

  if (miniCalPrevBtn) {
    miniCalPrevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      miniCalMonth--;
      if (miniCalMonth < 0) {
        miniCalMonth = 11;
        miniCalYear--;
      }
      renderMiniCalendar();
    });
  }

  if (miniCalNextBtn) {
    miniCalNextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      miniCalMonth++;
      if (miniCalMonth > 11) {
        miniCalMonth = 0;
        miniCalYear++;
      }
      renderMiniCalendar();
    });
  }

  if (miniCalTodayBtn) {
    miniCalTodayBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      selectedDate = new Date();
      selectedDate.setHours(0, 0, 0, 0);
      updateDatePickerDisplay();
      closeMiniCalendar();
    });
  }

  // Fecha mini-calendário ao clicar fora
  document.addEventListener('click', (e) => {
    if (miniCalPopover && miniCalPopover.style.display === 'block') {
      if (!miniCalPopover.contains(e.target) && !btnOpenMiniCal.contains(e.target)) {
        closeMiniCalendar();
      }
    }
  });

  if (datePickerInput) {
    datePickerInput.addEventListener('change', (e) => {
      if (e.target.value) {
        const [year, month, day] = e.target.value.split('-').map(Number);
        selectedDate = new Date(year, month - 1, day);
        selectedDate.setHours(0, 0, 0, 0);
        updateDatePickerDisplay();
      }
    });
  }

  if (btnPrevDate) {
    btnPrevDate.addEventListener('click', () => {
      if (currentViewMode === 'month') {
        selectedDate.setMonth(selectedDate.getMonth() - 1);
      } else {
        selectedDate.setDate(selectedDate.getDate() - 1);
      }
      updateDatePickerDisplay();
    });
  }

  if (btnNextDate) {
    btnNextDate.addEventListener('click', () => {
      if (currentViewMode === 'month') {
        selectedDate.setMonth(selectedDate.getMonth() + 1);
      } else {
        selectedDate.setDate(selectedDate.getDate() + 1);
      }
      updateDatePickerDisplay();
    });
  }

  if (btnTodayShortcut) {
    btnTodayShortcut.addEventListener('click', () => {
      selectedDate = new Date();
      selectedDate.setHours(0, 0, 0, 0);
      updateDatePickerDisplay();
    });
  }

  // 13. FILTROS E BUSCA EM TEMPO REAL
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchFilter = e.target.value.trim();
      refreshCurrentView();
    });
  }

  if (filterModalitySelect) {
    filterModalitySelect.addEventListener('change', (e) => {
      modalityFilter = e.target.value;
      refreshCurrentView();
    });
  }

  if (filterStatusSelect) {
    filterStatusSelect.addEventListener('change', (e) => {
      statusFilter = e.target.value;
      refreshCurrentView();
    });
  }

  function refreshCurrentView() {
    updateMetrics();
    if (currentViewMode === 'daily') {
      renderDailyView();
    } else if (currentViewMode === 'month') {
      renderMonthView();
    } else if (currentViewMode === 'list') {
      renderListView();
    } else if (currentViewMode === 'users') {
      renderUsersTab();
    }
  }

  // 14. EVENT DELEGATION PARA AÇÕES DE CARDS & TABELAS
  document.addEventListener('click', (e) => {
    const actionBtn = e.target.closest('[data-action]');
    if (!actionBtn) return;

    const action = actionBtn.getAttribute('data-action');
    const id = actionBtn.getAttribute('data-id');

    if (action === 'toggle-status') {
      const booking = allBookings.find((b) => b.id === id);
      if (booking) {
        if (booking.status === 'confirmed') {
          booking.status = 'completed';
        } else if (booking.status === 'completed') {
          booking.status = 'pending';
        } else {
          booking.status = 'confirmed';
        }
        saveBookings(allBookings);
        refreshCurrentView();
      }
    } else if (action === 'delete') {
      if (!currentUser || currentUser.role !== 'admin') {
        alert('Apenas administradores podem excluir agendamentos do sistema.');
        return;
      }
      if (confirm('Tem certeza de que deseja remover este agendamento do painel?')) {
        allBookings = allBookings.filter((b) => b.id !== id);
        saveBookings(allBookings);
        refreshCurrentView();
      }
    }
  });

  // 15. MODAL DE NOVO AGENDAMENTO MANUAL PELA RECEPÇÃO
  if (btnNewBooking && dialogNewBooking) {
    btnNewBooking.addEventListener('click', () => {
      if (typeof dialogNewBooking.showModal === 'function') {
        dialogNewBooking.showModal();
      } else {
        dialogNewBooking.setAttribute('open', '');
      }
    });
  }

  if (btnCloseDialog && dialogNewBooking) {
    btnCloseDialog.addEventListener('click', () => {
      if (typeof dialogNewBooking.close === 'function') {
        dialogNewBooking.close();
      } else {
        dialogNewBooking.removeAttribute('open');
      }
    });
  }

  if (formStaffBooking) {
    formStaffBooking.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('staff-add-name').value.trim();
      const phone = document.getElementById('staff-add-phone').value.trim();
      const modalitySelect = document.getElementById('staff-add-modality');
      const modalityId = modalitySelect.value;
      const modalityName = modalitySelect.options[modalitySelect.selectedIndex].text;
      const date = document.getElementById('staff-add-date').value;
      const time = document.getElementById('staff-add-time').value;
      const instructor = document.getElementById('staff-add-instructor').value.trim() || 'Prof. da Turma';
      const notes = document.getElementById('staff-add-notes').value.trim();

      const hour = parseInt(time.split(':')[0], 10);
      let shift = 'morning';
      if (hour >= 12 && hour < 18) shift = 'afternoon';
      if (hour >= 18) shift = 'evening';

      const iconMap = {
        'natacao-adulto': 'waves',
        'natacao-infantil': 'smile',
        'natacao-bebe': 'baby',
        'hidroginastica': 'activity',
        'musculacao': 'dumbbell',
        'coletivas-ritmos': 'flame'
      };

      const newBooking = {
        id: `CAST-MAN-${Math.floor(1000 + Math.random() * 9000)}`,
        name,
        phone,
        modality: modalityName,
        modalityId,
        icon: iconMap[modalityId] || 'waves',
        date,
        time,
        shift,
        level: 'Agendado pela Recepção',
        instructor,
        notes,
        status: 'confirmed'
      };

      allBookings.push(newBooking);
      saveBookings(allBookings);

      formStaffBooking.reset();
      if (typeof dialogNewBooking.close === 'function') {
        dialogNewBooking.close();
      } else {
        dialogNewBooking.removeAttribute('open');
      }

      const [y, m, d] = date.split('-').map(Number);
      selectedDate = new Date(y, m - 1, d);
      selectedDate.setHours(0, 0, 0, 0);
      updateDatePickerDisplay();
    });
  }

  // 16. EXPORTAR PARA CSV / EXCEL
  if (btnExportCsv) {
    btnExportCsv.addEventListener('click', () => {
      if (allBookings.length === 0) {
        alert('Não há agendamentos para exportar.');
        return;
      }

      let csvContent = '\uFEFF';
      csvContent += 'Código;Nome do Aluno;Telefone;Modalidade;Data;Horário;Turno;Professor;Observações;Status\n';

      allBookings.forEach((b) => {
        csvContent += `"${b.id}";"${b.name}";"${b.phone}";"${b.modality}";"${b.date}";"${b.time}";"${b.shift}";"${b.instructor || ''}";"${b.notes || ''}";"${b.status}"\n`;
      });

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.setAttribute('download', `agendamentos-castelinho-${formatIsoDate(new Date())}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }

  // 17. SISTEMA DE AUTENTICAÇÃO, CONTROLE DE ACESSO E GESTÃO DE USUÁRIOS
  function initAuth() {
    currentUser = getCurrentUser();
    currentUsers = loadUsers();

    if (!currentUser) {
      if (loginOverlay) loginOverlay.style.display = 'flex';
      if (headerUserBadge) headerUserBadge.style.display = 'none';
      if (loginInputUsername) loginInputUsername.focus();
    } else {
      if (loginOverlay) loginOverlay.style.display = 'none';
      if (headerUserBadge) headerUserBadge.style.display = 'flex';
      if (userDisplayTag) {
        userDisplayTag.textContent = `${currentUser.username} (${currentUser.role === 'admin' ? 'Admin' : 'Recepção'})`;
      }

      // Restrições de perfil
      if (currentUser.role === 'reception') {
        if (viewTabUsers) viewTabUsers.style.display = 'none';
        if (currentViewMode === 'users') {
          switchViewMode('daily');
        }
      } else {
        if (viewTabUsers) viewTabUsers.style.display = 'inline-flex';
      }
    }
  }

  // Submit de Login
  if (formAdminLogin) {
    formAdminLogin.addEventListener('submit', (e) => {
      e.preventDefault();
      const userVal = loginInputUsername.value.trim().toLowerCase();
      const passVal = loginInputPassword.value.trim();

      currentUsers = loadUsers();
      const matched = currentUsers.find(
        (u) => u.username.toLowerCase() === userVal && u.password === passVal
      );

      if (matched) {
        if (loginErrorMsg) loginErrorMsg.style.display = 'none';
        setCurrentUser(matched);
        initAuth();
        refreshCurrentView();
        formAdminLogin.reset();
      } else {
        if (loginErrorMsg) {
          loginErrorMsg.style.display = 'flex';
          if (loginErrorText) {
            loginErrorText.textContent = 'Usuário ou senha incorretos. Verifique suas credenciais.';
          }
        }
      }
    });
  }

  // Botão de Logout
  if (btnLogout) {
    btnLogout.addEventListener('click', () => {
      if (confirm('Deseja realmente sair do painel administrativo?')) {
        clearCurrentUser();
        initAuth();
      }
    });
  }

  // Alternador universal de visibilidade de senha (Eye icon)
  document.addEventListener('click', (e) => {
    const toggleBtn = e.target.closest('.btn-toggle-pw');
    if (!toggleBtn) return;

    let targetInput = null;
    const targetId = toggleBtn.getAttribute('data-target');

    if (targetId) {
      targetInput = document.getElementById(targetId);
    } else {
      const wrap = toggleBtn.closest('.password-input-wrap') || toggleBtn.closest('.login-input-wrap');
      if (wrap) targetInput = wrap.querySelector('input');
    }

    if (targetInput) {
      const isPassword = targetInput.type === 'password';
      targetInput.type = isPassword ? 'text' : 'password';

      const icon = toggleBtn.querySelector('i, svg');
      if (icon) {
        icon.setAttribute('data-lucide', isPassword ? 'eye-off' : 'eye');
        if (window.lucide) window.lucide.createIcons();
      }
    }
  });

  // 18. RENDERIZAÇÃO DA ABA DE USUÁRIOS & ALTERAÇÃO DE SENHA
  function renderUsersTab() {
    if (!currentUser) return;

    if (currentUserDisplayName) currentUserDisplayName.textContent = currentUser.username;
    if (currentUserFullname) currentUserFullname.textContent = currentUser.name || 'Administrador Master';
    if (currentUserRoleBadge) {
      currentUserRoleBadge.textContent = currentUser.role === 'admin' ? 'Administrador' : 'Recepção';
      currentUserRoleBadge.className = `badge-role ${currentUser.role}`;
    }

    // Atualiza campo de senha atual do admin
    currentUsers = loadUsers();
    const liveAdmin = currentUsers.find((u) => u.username === currentUser.username) || currentUser;
    if (inputViewCurrentPassword) {
      inputViewCurrentPassword.value = liveAdmin.password;
    }

    // Renderiza tabela de usuários
    if (usersTableBody) {
      usersTableBody.innerHTML = '';
      if (totalUsersBadge) {
        totalUsersBadge.textContent = `${currentUsers.length} ${currentUsers.length === 1 ? 'usuário ativo' : 'usuários ativos'}`;
      }

      currentUsers.forEach((usr) => {
        const tr = document.createElement('tr');
        const isMasterAdmin = usr.username === 'adm';

        tr.innerHTML = `
          <td><strong>${escapeHtml(usr.username)}</strong></td>
          <td>${escapeHtml(usr.name || 'Funcionário')}</td>
          <td>
            <span class="badge-role ${usr.role}">
              ${usr.role === 'admin' ? 'Administrador' : 'Recepção / Visualizador'}
            </span>
          </td>
          <td>
            <div style="display: flex; align-items: center; gap: 6px;">
              <input type="password" value="${escapeHtml(usr.password)}" readonly class="form-control-staff" style="width: 130px; padding: 4px 8px; font-size: 0.82rem;" id="user-pw-display-${usr.id}">
              <button type="button" class="btn-toggle-pw" data-target="user-pw-display-${usr.id}" title="Ver/Ocultar Senha" style="position: static; padding: 2px;">
                <i data-lucide="eye"></i>
              </button>
            </div>
          </td>
          <td>${usr.createdAt || '17/11/2026'}</td>
          <td>
            ${
              isMasterAdmin
                ? `<span style="font-size: 0.75rem; color: var(--text-muted);">(Admin Principal)</span>`
                : `<button type="button" class="btn-card-action btn-action-more" data-action="delete-user" data-user-id="${usr.id}" title="Excluir Usuário" style="padding: 4px 8px;">
                     <i data-lucide="trash-2"></i>
                   </button>`
            }
          </td>
        `;

        usersTableBody.appendChild(tr);
      });
    }

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  // Formulário: Alterar Senha do Administrador
  if (formChangeAdminPassword) {
    formChangeAdminPassword.addEventListener('submit', (e) => {
      e.preventDefault();
      const newPass = inputNewPassword.value.trim();
      const confirmPass = inputConfirmPassword.value.trim();

      if (feedbackChangePassword) {
        feedbackChangePassword.style.display = 'none';
        feedbackChangePassword.className = 'form-feedback-msg';
      }

      if (newPass.length < 4) {
        if (feedbackChangePassword) {
          feedbackChangePassword.style.display = 'block';
          feedbackChangePassword.className = 'form-feedback-msg error';
          feedbackChangePassword.textContent = 'A nova senha deve ter no mínimo 4 caracteres.';
        }
        return;
      }

      if (newPass !== confirmPass) {
        if (feedbackChangePassword) {
          feedbackChangePassword.style.display = 'block';
          feedbackChangePassword.className = 'form-feedback-msg error';
          feedbackChangePassword.textContent = 'As senhas informadas não coincidem. Tente novamente.';
        }
        return;
      }

      currentUsers = loadUsers();
      const userIndex = currentUsers.findIndex((u) => u.username === currentUser.username);
      if (userIndex !== -1) {
        currentUsers[userIndex].password = newPass;
        saveUsers(currentUsers);

        currentUser.password = newPass;
        setCurrentUser(currentUser);

        formChangeAdminPassword.reset();

        if (feedbackChangePassword) {
          feedbackChangePassword.style.display = 'block';
          feedbackChangePassword.className = 'form-feedback-msg success';
          feedbackChangePassword.textContent = 'Senha atualizada com sucesso!';
        }

        renderUsersTab();
      }
    });
  }

  // Formulário: Cadastrar Novo Usuário
  if (formAddNewUser) {
    formAddNewUser.addEventListener('submit', (e) => {
      e.preventDefault();
      const fullName = newUserFullname.value.trim();
      const username = newUserUsername.value.trim().toLowerCase().replace(/\s+/g, '');
      const password = newUserPassword.value.trim();
      const role = newUserRole.value;

      if (feedbackAddUser) {
        feedbackAddUser.style.display = 'none';
        feedbackAddUser.className = 'form-feedback-msg';
      }

      if (password.length < 3) {
        if (feedbackAddUser) {
          feedbackAddUser.style.display = 'block';
          feedbackAddUser.className = 'form-feedback-msg error';
          feedbackAddUser.textContent = 'A senha deve ter no mínimo 3 caracteres.';
        }
        return;
      }

      currentUsers = loadUsers();
      const exists = currentUsers.some((u) => u.username.toLowerCase() === username);
      if (exists) {
        if (feedbackAddUser) {
          feedbackAddUser.style.display = 'block';
          feedbackAddUser.className = 'form-feedback-msg error';
          feedbackAddUser.textContent = `O usuário "${username}" já está cadastrado. Escolha outro login.`;
        }
        return;
      }

      const today = new Date();
      const todayFormatted = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;

      const newUserObj = {
        id: `usr-${Date.now()}`,
        username,
        password,
        name: fullName,
        role,
        createdAt: todayFormatted
      };

      currentUsers.push(newUserObj);
      saveUsers(currentUsers);

      formAddNewUser.reset();

      if (feedbackAddUser) {
        feedbackAddUser.style.display = 'block';
        feedbackAddUser.className = 'form-feedback-msg success';
        feedbackAddUser.textContent = `Usuário "${username}" (${role === 'admin' ? 'Administrador' : 'Recepção'}) adicionado com sucesso!`;
      }

      renderUsersTab();
    });
  }

  // Deleção de Usuários
  document.addEventListener('click', (e) => {
    const delBtn = e.target.closest('[data-action="delete-user"]');
    if (!delBtn) return;

    const targetUserId = delBtn.getAttribute('data-user-id');
    currentUsers = loadUsers();
    const targetUser = currentUsers.find((u) => u.id === targetUserId);

    if (!targetUser) return;
    if (targetUser.username === 'adm') {
      alert('O administrador principal (adm) não pode ser excluído.');
      return;
    }

    if (confirm(`Tem certeza de que deseja remover o usuário "${targetUser.username}" (${targetUser.name})?`)) {
      currentUsers = currentUsers.filter((u) => u.id !== targetUserId);
      saveUsers(currentUsers);
      renderUsersTab();
    }
  });

  // 19. SINCRONIZAÇÃO EM TEMPO REAL ENTRE ABAS
  window.addEventListener('storage', (e) => {
    if (e.key === STORAGE_KEY) {
      allBookings = loadBookings();
      refreshCurrentView();
    } else if (e.key === USERS_STORAGE_KEY) {
      currentUsers = loadUsers();
      if (currentViewMode === 'users') renderUsersTab();
    } else if (e.key === AUTH_USER_KEY) {
      initAuth();
    }
  });

  // Inicializa autenticação e views
  initAuth();
  updateDatePickerDisplay();
});
