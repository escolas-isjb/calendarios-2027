function renderKPIs() {
  // Usamos a lista filtrada para que os KPIs mudem conforme você busca/filtra
  const listaFiltrada = obterUnidadesFiltradas();
  const total = listaFiltrada.length;
  
  // Se não houver nenhuma unidade no filtro, evita divisão por zero
  if (total === 0) {
    document.getElementById("kpiGrid").innerHTML = "<p style='color: #4b5563;'>Nenhuma unidade encontrada com este filtro.</p>";
    return;
  }

  const validadas = listaFiltrada.filter(u => u.status === "validada").length;
  const incompletas = listaFiltrada.filter(u => u.status === "incompleta").length;
  const erros = listaFiltrada.filter(u => u.status === "erro").length;
  const media = Math.round(listaFiltrada.reduce((a, u) => a + u.diasLetivos, 0) / total);
  
  const cards = [
    { label: "Unidades", value: total, caption: "Rede ISJB", cls: "info" },
    { label: "Validadas", value: validadas, caption: "sem pendências", cls: "ok" },
    { label: "Incompletas", value: incompletas, caption: "dados ausentes", cls: "warn" },
    { label: "Com erro crítico", value: erros, caption: "requer correção", cls: "crit" },
    { label: "Média de dias letivos", value: media, caption: `mín. legal: ${MIN_LEGAL}`, cls: "info" }
  ];
  
  document.getElementById("kpiGrid").innerHTML = cards.map(c => `
    <div class="kpi-card ${c.cls}">
      <div class="kpi-label">${c.label}</div>
      <div class="kpi-value">${c.value}</div>
      <div class="kpi-caption">${c.caption}</div>
    </div>`).join("");
}

function renderTimeline() {
  const tl = document.getElementById("timeline");
  const meses = MESES.map((m, i) => `<div class="tl-month" style="left:${(i / 12) * 100}%">${m}</div>`).join("");
  let html = `<div class="tl-axis"><div class="tl-axis-label-spacer">Unidade</div><div class="tl-axis-track">${meses}</div></div>`;

  obterUnidadesFiltradas().forEach((u, idx) => {
    const bars = [];
    
    // Renderiza as etapas coloridas
    u.etapas.forEach((e, i) => {
      if (!e.ini || !e.fim) return;
      const left = fracaoAno(e.ini) * 100;
      const width = (fracaoAno(e.fim) - fracaoAno(e.ini)) * 100;
      const cor = ["var(--etapa1)", "var(--etapa2)", "var(--etapa3)"][i];
      
      // Adicionado o evento de clique na barra colorida
      bars.push(`<div class="tl-bar" style="left:${left}%;width:${width}%;background:${cor}" data-tip="${e.nome} Etapa: ${fmtData(e.ini)} – ${fmtData(e.fim)}" onclick="abrirDrawerEtapa(${idx}, ${i})"></div>`);
    });
    
    // Renderiza as férias de julho
    if (u.feriasJulho) {
      const left = fracaoAno(u.feriasJulho.ini) * 100;
      const width = (fracaoAno(u.feriasJulho.fim) - fracaoAno(u.feriasJulho.ini)) * 100;
      bars.push(`<div class="tl-bar" style="left:${left}%;width:${width}%;background:var(--ferias);top:14px" data-tip="Férias de julho: ${fmtData(u.feriasJulho.ini)} – ${fmtData(u.feriasJulho.fim)}"></div>`);
    }
    
    // Renderiza os feriados e aniversário da cidade
    const todosFeriados = [...(typeof FERIADOS_NACIONAIS !== 'undefined' ? FERIADOS_NACIONAIS : []), ...u.feriados];
    if (u.aniversarioCidade) {
      todosFeriados.push(u.aniversarioCidade);
    }
    const feriadosUnicos = [...new Set(todosFeriados)];
    
    const dots = feriadosUnicos.map(f => {
      const isAniversario = f === u.aniversarioCidade;
      const textoTip = isAniversario ? "Aniversário da Cidade" : "Feriado";
      const tipFinal = (isAniversario && u.feriados.includes(f)) ? "Aniversário da Cidade / Feriado" : textoTip;
      
      return `<div class="tl-dot ${isAniversario ? 'dot-aniversario' : ''}" style="left:${fracaoAno(f) * 100}%" data-tip="${tipFinal}: ${fmtData(f)}"></div>`;
    }).join("");

    // Monta a linha (Aqui estava o erro do HTML de busca no lugar errado)
    html += `
      <div class="tl-row">
        <button type="button" class="tl-name" data-idx="${idx}">
          <span class="tl-name-city">${escapeHtml(u.nome)}</span>
          <span class="sigla-badge">${u.sigla}</span>
        </button>
        <div class="tl-track-wrap">
          <div class="tl-track">${bars.join("")}${dots}</div>
        </div>
      </div>`;
  });
  
  tl.innerHTML = html;
  
  // Adiciona os eventos de clique e tooltip
  tl.querySelectorAll(".tl-name").forEach(btn => btn.addEventListener("click", () => abrirDrawer(Number(btn.dataset.idx))));
  tl.querySelectorAll("[data-tip]").forEach(el => {
    el.addEventListener("mouseenter", e => showTooltip(e, el.dataset.tip));
    el.addEventListener("mousemove", e => moveTooltip(e));
    el.addEventListener("mouseleave", hideTooltip);
  });
}

function renderMatriz() {
  const tbl = document.getElementById("matrix");
  const head = `<thead><tr><th>Unidade</th>${CAMPOS_MATRIZ.map(c => `<th>${c.label}</th>`).join("")}</tr></thead>`;
  
  const body = obterUnidadesFiltradas().map((u, idx) => {
    const celulas = CAMPOS_MATRIZ.map(c => {
      const s = statusCampo(u, c.key);
      return `<td class="${classeStatusCelula(s)}">${valorCampo(u, c.key)}</td>`;
    }).join("");
    return `<tr class="row-btn" data-idx="${idx}"><td>${escapeHtml(u.nome)} <span class="sigla-badge">${u.sigla}</span></td>${celulas}</tr>`;
  }).join("");
  
  tbl.innerHTML = head + `<tbody>${body}</tbody>`;
  tbl.querySelectorAll("tr.row-btn").forEach(tr => tr.addEventListener("click", () => abrirDrawer(Number(tr.dataset.idx))));
}

function renderCards() {
  const grid = document.getElementById("unitGrid");
  
  const htmlCards = obterUnidadesFiltradas().map((u, idx) => {
    const pct = Math.min(100, Math.round((u.diasLetivos / 220) * 100));
    const cor = u.status === "validada" ? "#15803d" : u.status === "incompleta" ? "#d97706" : "#dc2626";
    const minOk = u.diasLetivos >= MIN_LEGAL;
    return `
      <button type="button" class="unit-card" data-idx="${idx}">
        <div class="unit-card-head">
          <div>
            <div class="unit-card-name">${escapeHtml(u.nome)}</div>
            <span class="sigla-badge">${u.sigla}</span>
          </div>
          ${badgeStatus(u.status)}
        </div>
        <div class="unit-meta">
          <span>Dias letivos: <strong>${u.diasLetivos}</strong></span>
          <span>${minOk ? "≥ mínimo" : "< mínimo"}</span>
        </div>
        <div class="progress"><div class="progress-fill" style="width:${pct}%;background:${cor}"></div></div>
      </button>`;
  }).join("");

  // Se a busca não retornar nada, mostra um aviso
  grid.innerHTML = htmlCards || "<p style='color: #4b5563; grid-column: 1 / -1;'>Nenhuma unidade encontrada.</p>";
  
  grid.querySelectorAll(".unit-card").forEach(btn => btn.addEventListener("click", () => abrirDrawer(Number(btn.dataset.idx))));
}