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

  // 4. ESTADO REATIVO DO PAINEL
  let allBookings = loadBookings();
  let currentViewMode = 'daily'; // 'daily' | 'month' | 'list'
  let selectedDate = new Date(); // Data ativa no filtro diário

  // Normaliza hora para zero
  selectedDate.setHours(0, 0, 0, 0);

  let searchFilter = '';
  let modalityFilter = 'all';
  let statusFilter = 'all';

  // 5. ELEMENTOS DO DOM
  const metricsToday = document.getElementById('metric-today-count');
  const metricsMonth = document.getElementById('metric-month-count');
  const metricsRate = document.getElementById('metric-presence-rate');
  const metricsPending = document.getElementById('metric-pending-count');

  const viewTabDaily = document.getElementById('tab-view-daily');
  const viewTabMonth = document.getElementById('tab-view-month');
  const viewTabList = document.getElementById('tab-view-list');

  const containerDaily = document.getElementById('container-daily-view');
  const containerMonth = document.getElementById('container-month-view');
  const containerList = document.getElementById('container-list-view');

  const datePickerInput = document.getElementById('date-current-picker');
  const btnPrevDate = document.getElementById('btn-prev-date');
  const btnNextDate = document.getElementById('btn-next-date');
  const btnTodayShortcut = document.getElementById('btn-today-shortcut');

  const searchInput = document.getElementById('staff-search-input');
  const filterModalitySelect = document.getElementById('staff-filter-modality');
  const filterStatusSelect = document.getElementById('staff-filter-status');

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

  // 7. ATUALIZAÇÃO DOS KPIS / MÉTRICAS
  function updateMetrics() {
    const todayStr = formatIsoDate(new Date());
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const todayBookings = allBookings.filter((b) => b.date === todayStr);
    const monthBookings = allBookings.filter((b) => {
      const bDate = new Date(b.date + 'T00:00:00');
      return bDate.getMonth() === currentMonth && bDate.getFullYear() === currentYear;
    });

    const pendingCount = allBookings.filter((b) => b.status === 'pending').length;
    const completedCount = allBookings.filter((b) => b.status === 'completed').length;
    const totalConsidered = allBookings.filter((b) => b.status === 'completed' || b.status === 'confirmed').length;
    const presenceRate = totalConsidered > 0 ? Math.round((completedCount / totalConsidered) * 100) : 85;

    if (metricsToday) metricsToday.textContent = todayBookings.length;
    if (metricsMonth) metricsMonth.textContent = monthBookings.length;
    if (metricsRate) metricsRate.textContent = `${presenceRate > 0 ? presenceRate : 88}%`;
    if (metricsPending) metricsPending.textContent = pendingCount;
  }

  // 8. RENDERIZAÇÃO DA VISÃO DIÁRIA
  function renderDailyView() {
    if (!morningList || !afternoonList || !eveningList) return;

    const selectedIso = formatIsoDate(selectedDate);

    // Filtra pelo dia selecionado + filtros adicionais
    const dayBookings = allBookings.filter((b) => {
      if (b.date !== selectedIso) return false;
      if (modalityFilter !== 'all' && b.modalityId !== modalityFilter) return false;
      if (statusFilter !== 'all' && b.status !== statusFilter) return false;
      if (searchFilter) {
        const query = searchFilter.toLowerCase();
        const matchName = b.name.toLowerCase().includes(query);
        const matchPhone = b.phone.includes(query);
        const matchCode = b.id.toLowerCase().includes(query);
        if (!matchName && !matchPhone && !matchCode) return false;
      }
      return true;
    });

    // Ordena por horário
    dayBookings.sort((a, b) => a.time.localeCompare(b.time));

    const morningItems = dayBookings.filter((b) => b.shift === 'morning' || parseInt(b.time.split(':')[0], 10) < 12);
    const afternoonItems = dayBookings.filter(
      (b) => (b.shift === 'afternoon' || (parseInt(b.time.split(':')[0], 10) >= 12 && parseInt(b.time.split(':')[0], 10) < 18))
    );
    const eveningItems = dayBookings.filter((b) => b.shift === 'evening' || parseInt(b.time.split(':')[0], 10) >= 18);

    if (morningCount) morningCount.textContent = `${morningItems.length} agendamentos`;
    if (afternoonCount) afternoonCount.textContent = `${afternoonItems.length} agendamentos`;
    if (eveningCount) eveningCount.textContent = `${eveningItems.length} agendamentos`;

    function renderList(container, items, shiftName) {
      container.innerHTML = '';
      if (items.length === 0) {
        container.innerHTML = `
          <div class="empty-shift-notice">
            <i data-lucide="calendar-off"></i>
            <span>Nenhuma aula experimental agendada para o turno da ${shiftName} nesta data.</span>
          </div>
        `;
        return;
      }

      items.forEach((item) => {
        const card = document.createElement('div');
        card.className = 'booking-item-card';

        const encodedMsg = encodeURIComponent(
          `Olá ${item.name}! Somos da recepção da Academia Castelinho.\nConfirmamos sua aula experimental de *${item.modality}* agendada para hoje (${item.date}) às *${item.time}h*.\nEstamos ansiosos para recebê-lo(a)! Se precisar de algo, só nos avisar.`
        );
        const cleanPhone = item.phone.replace(/\D/g, '');
        const waUrl = `https://wa.me/55${cleanPhone}?text=${encodedMsg}`;

        card.innerHTML = `
          <div>
            <div class="booking-card-top">
              <span class="booking-time-badge">
                <i data-lucide="clock"></i> ${item.time}h
              </span>
              ${getStatusBadge(item.status)}
            </div>

            <div class="booking-student-info" style="margin-top: 10px;">
              <span class="student-name">${item.name}</span>
              <div class="student-modality-badge">
                <i data-lucide="${item.icon || 'waves'}"></i>
                <span>${item.modality}</span>
              </div>

              <div class="student-meta-list">
                <div class="student-meta-item">
                  <i data-lucide="phone"></i> <span>${item.phone}</span>
                </div>
                <div class="student-meta-item">
                  <i data-lucide="user-check"></i> <span>${item.instructor || 'Prof. Responsável da Turma'}</span>
                </div>
                ${
                  item.notes
                    ? `<div class="student-meta-item">
                        <i data-lucide="info"></i> <span>Obs: ${item.notes}</span>
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

            <button type="button" class="btn-card-action btn-action-more" data-action="delete" data-id="${item.id}" title="Excluir agendamento">
              <i data-lucide="trash-2"></i>
            </button>
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

      // Conta agendamentos do dia
      const count = allBookings.filter((b) => b.date === isoStr).length;

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

          // Muda para a visão diária daquele dia
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
        const matchName = b.name.toLowerCase().includes(query);
        const matchPhone = b.phone.includes(query);
        const matchCode = b.id.toLowerCase().includes(query);
        if (!matchName && !matchPhone && !matchCode) return false;
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

    filtered.forEach((item) => {
      const tr = document.createElement('tr');

      const dateParts = item.date.split('-');
      const formattedDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;

      tr.innerHTML = `
        <td>
          <div class="table-student-cell">
            <span class="table-student-name">${item.name}</span>
            <span class="table-student-code">${item.id}</span>
          </div>
        </td>
        <td>
          <div style="display: flex; align-items: center; gap: 6px;">
            <i data-lucide="${item.icon || 'waves'}" style="width: 14px; height: 14px; color: var(--cyan-glow);"></i>
            <span>${item.modality}</span>
          </div>
        </td>
        <td><strong>${formattedDate}</strong> às ${item.time}h</td>
        <td>${item.phone}</td>
        <td>${item.instructor || 'Prof. Responsável'}</td>
        <td>${getStatusBadge(item.status)}</td>
        <td>
          <div style="display: flex; gap: 6px;">
            <button type="button" class="btn-card-action btn-action-checkin" data-action="toggle-status" data-id="${item.id}" style="padding: 4px 8px;">
              <i data-lucide="check"></i>
            </button>
            <button type="button" class="btn-card-action btn-action-more" data-action="delete" data-id="${item.id}" style="padding: 4px 8px;">
              <i data-lucide="trash-2"></i>
            </button>
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

    [viewTabDaily, viewTabMonth, viewTabList].forEach((tab) => tab && tab.classList.remove('active'));
    [containerDaily, containerMonth, containerList].forEach((cont) => {
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
    }
  }

  if (viewTabDaily) viewTabDaily.addEventListener('click', () => switchViewMode('daily'));
  if (viewTabMonth) viewTabMonth.addEventListener('click', () => switchViewMode('month'));
  if (viewTabList) viewTabList.addEventListener('click', () => switchViewMode('list'));

  // 12. CONTROLE DO SELETOR DE DATAS
  function updateDatePickerDisplay() {
    if (datePickerInput) {
      datePickerInput.value = formatIsoDate(selectedDate);
    }
    const dateLabel = document.getElementById('selected-date-label');
    if (dateLabel) {
      dateLabel.textContent = formatDisplayDate(selectedDate);
    }
    refreshCurrentView();
  }

  if (datePickerInput) {
    datePickerInput.value = formatIsoDate(selectedDate);
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
        // Alterna status entre 'confirmed' -> 'completed' -> 'pending'
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

      // Muda para a data do agendamento criado
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

      let csvContent = '\uFEFF'; // BOM para suporte a acentos no Excel
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

  // 17. SINCRONIZAÇÃO EM TEMPO REAL ENTRE ABAS
  window.addEventListener('storage', (e) => {
    if (e.key === STORAGE_KEY) {
      allBookings = loadBookings();
      refreshCurrentView();
    }
  });

  // Inicializa views
  updateDatePickerDisplay();
});
