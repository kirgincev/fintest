const appState = {
  activeTab: "home",
  mode: "demo",
  realOpened: false,
  busy: false,
};

const icon = (id) => `<svg aria-hidden="true"><use href="#${id}"/></svg>`;

const quickActions = () => `
  <div class="quick-actions" aria-label="Быстрые действия">
    <button data-quick="Пополнение станет доступно после открытия счёта"><i>${icon("i-plus")}</i><span>Пополнить</span></button>
    <button data-quick="Вывод средств"><i>${icon("i-up")}</i><span>Вывести</span></button>
    <button data-nav="accounts"><i>${icon("i-card")}</i><span>Все счета</span></button>
    <button data-quick="Переводы между счетами"><i>${icon("i-transfer")}</i><span>Перевести</span></button>
  </div>`;

const commonRows = () => `
  <section class="mobile-card">
    <div class="list-row">
      <i class="row-icon">${icon("i-chart")}</i>
      <div><h3>Продолжить в MT5</h3><p>Демо · Standard</p></div>
      <button class="outline-small" data-nav="trade">Открыть</button>
    </div>
    <div class="list-row">
      <i class="row-icon">${icon("i-book")}</i>
      <div><h3>Как перейти с демо на реальный счёт</h3><p>3 минуты</p></div>
      <span class="chevron">›</span>
    </div>
  </section>`;

function homeDemo() {
  return `
    <section class="mobile-card balance-card">
      <div class="balance-head"><div><h3>MT5 · Standard</h3><span>Демо-счёт 20485731</span></div>${icon("i-eye")}</div>
      <div class="balance-main"><strong>$10 245<small>,80</small></strong><div class="profit-box"><b>+$245,80</b><span>Прибыль</span></div></div>
    </section>
    <section class="mobile-card upgrade-card">
      <i class="upgrade-icon">${icon("i-check")}</i>
      <div><h3>Перейдите к реальной торговле</h3><p>Откройте счёт и пополните его от $10</p></div>
      <button class="mobile-primary" data-action="open-real" ${appState.busy ? "disabled" : ""}>${appState.busy ? "Открываем…" : "Открыть реальный счёт"}</button>
      <button class="mobile-secondary-link" data-mode="real">Почему это безопасно</button>
    </section>
    ${quickActions()}
    ${commonRows()}`;
}

function homeRealEmpty() {
  return `
    <section class="mobile-card account-card">
      <span class="card-kicker">Реальный счёт</span>
      <h2>У вас пока нет реального счёта</h2>
      <p>Откройте счёт, чтобы начать торговать на реальные средства.</p>
      <i class="wallet-illustration">${icon("i-card")}</i>
      <button class="mobile-primary" data-action="open-real" ${appState.busy ? "disabled" : ""}>${appState.busy ? "Открываем счёт…" : "Открыть реальный счёт"}</button>
      <button class="mobile-secondary-link">Сравнить типы счетов</button>
    </section>
    <section class="mobile-card trust-card">
      <h3>Почему можно начать спокойно</h3>
      <div class="trust-grid">
        <div class="trust-item"><i>${icon("i-shield")}</i><div><b>Средства защищены</b><span>Хранятся отдельно</span></div></div>
        <div class="trust-item"><i>${icon("i-accounts")}</i><div><b>Лицензия и контроль</b><span>Регулируемая работа</span></div></div>
        <div class="trust-item"><i>${icon("i-transfer")}</i><div><b>Вывод в любое время</b><span>Без скрытых ограничений</span></div></div>
        <div class="trust-item"><i>${icon("i-card")}</i><div><b>Начните с $10</b><span>Сумму выбираете вы</span></div></div>
      </div>
      <button class="mobile-secondary-link">Подробнее о безопасности →</button>
    </section>
    ${quickActions()}
    ${commonRows()}`;
}

function homeRealActive() {
  return `
    <section class="mobile-card balance-card">
      <div class="balance-head"><div><h3>MT5 · Standard</h3><span>Реальный счёт 30916482</span></div>${icon("i-eye")}</div>
      <div class="balance-main"><strong>$0<small>,00</small></strong><div class="profit-box"><b>Счёт открыт</b><span>Готов к пополнению</span></div></div>
    </section>
    <section class="mobile-card upgrade-card">
      <i class="upgrade-icon">${icon("i-card")}</i>
      <div><h3>Сделайте первый депозит</h3><p>Минимальная сумма — $10. Пополнение без комиссии.</p></div>
      <button class="mobile-primary" data-quick="Демо пополнения готово">Пополнить счёт</button>
      <button class="mobile-secondary-link" data-nav="trade">Перейти к торговле</button>
    </section>
    ${quickActions()}
    ${commonRows()}`;
}

function accountsScreen() {
  const real = appState.realOpened ? `
    <div class="list-row"><i class="row-icon">${icon("i-card")}</i><div><h3>MT5 · Standard</h3><p>Реальный · $0,00</p></div><button class="outline-small" data-mode="real">Открыть</button></div>` : `
    <div class="list-row"><i class="row-icon">${icon("i-plus")}</i><div><h3>Реальный счёт</h3><p>Ещё не открыт</p></div><button class="outline-small" data-action="open-real">Создать</button></div>`;
  return `<h2 class="screen-title">Все счета</h2><p class="screen-subtitle">Управляйте демо- и реальными счетами в одном месте.</p><section class="mobile-card"><div class="list-row"><i class="row-icon">${icon("i-chart")}</i><div><h3>MT5 · Standard</h3><p>Демо · $10 245,80</p></div><button class="outline-small" data-mode="demo">Открыть</button></div>${real}</section><button class="mobile-primary" data-action="open-real">Добавить счёт</button>`;
}

function tradeScreen() {
  return `<h2 class="screen-title">Торговля</h2><p class="screen-subtitle">Популярные инструменты. Котировки показаны для демонстрации.</p>
    <section class="mobile-card">
      <div class="market-row"><div><h3>EUR / USD</h3><p>Forex</p></div><svg class="sparkline" viewBox="0 0 90 30"><path d="M1 23 10 18 18 21 28 11 37 15 48 8 56 13 68 5 77 9 89 3"/></svg><strong>1.0842<small>+0.31%</small></strong></div>
      <div class="market-row"><div><h3>S&amp;P 500</h3><p>Index</p></div><svg class="sparkline" viewBox="0 0 90 30"><path d="M1 8 12 10 20 7 31 15 40 12 51 20 60 16 71 23 80 18 89 25"/></svg><strong>5,258<small>−0.11%</small></strong></div>
      <div class="market-row"><div><h3>Apple</h3><p>NASDAQ</p></div><svg class="sparkline" viewBox="0 0 90 30"><path d="M1 25 13 22 21 24 31 17 41 18 52 11 63 14 75 7 89 5"/></svg><strong>224.72<small>+0.84%</small></strong></div>
    </section><button class="mobile-primary" data-quick="Торговый тикет открыт">Открыть торговый тикет</button>`;
}

function operationsScreen() {
  return `<h2 class="screen-title">Операции</h2><p class="screen-subtitle">История движений по всем счетам.</p><p class="section-label">Сегодня</p><section class="mobile-card"><div class="operation-row"><i class="row-icon">${icon("i-chart")}</i><div><b>Демо-прибыль</b><span>EUR / USD · 10:42</span></div><strong>+$42,10</strong></div><div class="operation-row"><i class="row-icon">${icon("i-transfer")}</i><div><b>Виртуальное пополнение</b><span>Демо-счёт · 09:41</span></div><strong>+$10 000</strong></div></section><p class="section-label">Вчера</p><section class="mobile-card"><div class="operation-row"><i class="row-icon">${icon("i-clock")}</i><div><b>Сделка закрыта</b><span>S&amp;P 500 · 18:07</span></div><strong>+$18,70</strong></div></section>`;
}

function profileScreen() {
  return `<h2 class="screen-title">Профиль</h2><section class="mobile-card profile-card"><span class="avatar">AA</span><h2>Алексей Алексеев</h2><p>Базовый профиль · Верификация пройдена</p></section><section class="mobile-card settings-list"><button>Личные данные <span>›</span></button><button>Безопасность <span>›</span></button><button>Уведомления <span>›</span></button><button>Документы <span>›</span></button><button>Поддержка <span>›</span></button></section>`;
}

function render() {
  const content = document.querySelector("#appScreen");
  if (!content) return;

  let markup;
  if (appState.activeTab === "home") {
    markup = appState.mode === "demo" ? homeDemo() : appState.realOpened ? homeRealActive() : homeRealEmpty();
  } else if (appState.activeTab === "accounts") markup = accountsScreen();
  else if (appState.activeTab === "trade") markup = tradeScreen();
  else if (appState.activeTab === "operations") markup = operationsScreen();
  else markup = profileScreen();

  content.innerHTML = markup;
  content.scrollTop = 0;

  document.querySelectorAll(".account-toggle button").forEach((button) => button.classList.toggle("active", button.dataset.mode === appState.mode));
  document.querySelector(".account-toggle")?.classList.toggle("real", appState.mode === "real");
  document.querySelectorAll(".app-nav button").forEach((button) => button.classList.toggle("active", button.dataset.nav === appState.activeTab));
}

function showToast(message) {
  const toast = document.querySelector("#appToast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 1800);
}

function setScenario(value) {
  appState.activeTab = "home";
  appState.busy = false;
  if (value === "demo") {
    appState.mode = "demo";
    appState.realOpened = false;
  } else if (value === "real-empty") {
    appState.mode = "real";
    appState.realOpened = false;
  } else {
    appState.mode = "real";
    appState.realOpened = true;
  }
  document.querySelectorAll(".scenario-chip").forEach((button) => button.classList.toggle("active", button.dataset.preview === value));
  render();
}

document.addEventListener("click", (event) => {
  const modeButton = event.target.closest("[data-mode]");
  const navButton = event.target.closest("[data-nav]");
  const actionButton = event.target.closest("[data-action]");
  const scenarioButton = event.target.closest("[data-preview]");
  const quickButton = event.target.closest("[data-quick]");

  if (scenarioButton) {
    setScenario(scenarioButton.dataset.preview);
    return;
  }

  if (modeButton) {
    appState.mode = modeButton.dataset.mode;
    appState.activeTab = "home";
    document.querySelectorAll(".scenario-chip").forEach((button) => button.classList.remove("active"));
    render();
    return;
  }

  if (navButton) {
    appState.activeTab = navButton.dataset.nav;
    render();
    return;
  }

  if (actionButton?.dataset.action === "open-real") {
    if (appState.busy) return;
    appState.busy = true;
    render();
    window.setTimeout(() => {
      appState.busy = false;
      appState.realOpened = true;
      appState.mode = "real";
      appState.activeTab = "home";
      document.querySelectorAll(".scenario-chip").forEach((button) => button.classList.toggle("active", button.dataset.preview === "real-active"));
      render();
      showToast("Реальный счёт открыт");
    }, 900);
    return;
  }

  if (quickButton) showToast(quickButton.dataset.quick);
});

render();
