const drawer = document.getElementById("drawer");
const overlay = document.getElementById("overlay");
const tooltipEl = document.getElementById("tooltip");
let ultimoFoco = null;

function showTooltip(e, texto) {
  tooltipEl.textContent = texto;
  tooltipEl.classList.add("show");
  moveTooltip(e);
}
function moveTooltip(e) {
  const x = Math.min(e.clientX + 12, window.innerWidth - 260);
  tooltipEl.style.left = x + "px";
  tooltipEl.style.top = Math.max(8, e.clientY - 36) + "px";
}
function hideTooltip() { tooltipEl.classList.remove("show"); }

function abrirDrawer(idx) {
  // Pega a lista filtrada para achar a unidade certa
  const listaAtual = obterUnidadesFiltradas();
  const u = listaAtual[idx];
  if (!u) return;

  ultimoFoco = document.activeElement;
  
  document.getElementById("drawerTitle").textContent = u.nome;
  document.getElementById("drawerSub").innerHTML = `
    <span class="sigla-badge">${u.sigla}</span>
    ${badgeStatus(u.status)}
    <span style="font-size:12px;color:#4b5563">Ano letivo 2027</span>`;

  const campos = [
    { label: "Início", valor: fmtDataLonga(u.inicio), s: statusCampo(u, "inicio") },
    { label: "Fim", valor: fmtDataLonga(u.fim), s: statusCampo(u, "fim") },
    { label: "Semana Pedagógica", valor: fmtDataLonga(u.semPedagogica), s: statusCampo(u, "semPedagogica") },
    { label: "1ª Etapa", valor: u.etapas[0].ini ? `${fmtData(u.etapas[0].ini)} – ${fmtData(u.etapas[0].fim)}` : "—", s: statusCampo(u, "e1") },
    { label: "2ª Etapa", valor: u.etapas[1].ini ? `${fmtData(u.etapas[1].ini)} – ${fmtData(u.etapas[1].fim)}` : "—", s: statusCampo(u, "e2") },
    { label: "3ª Etapa", valor: u.etapas[2].ini ? `${fmtData(u.etapas[2].ini)} – ${fmtData(u.etapas[2].fim)}` : "—", s: statusCampo(u, "e3") },
    { label: "Férias de Julho", valor: u.feriasJulho ? `${fmtData(u.feriasJulho.ini)} – ${fmtData(u.feriasJulho.fim)}` : "—", s: statusCampo(u, "feriasJulho") },
    { label: "Festa da Família", valor: fmtDataLonga(u.festaFamilia), s: statusCampo(u, "festaFamilia") },
    { label: "Festa Junina", valor: fmtDataLonga(u.festaJunina), s: statusCampo(u, "festaJunina") },
    { label: "Dias Letivos", valor: `${u.diasLetivos} (mín. ${MIN_LEGAL})`, s: statusCampo(u, "diasLetivos") },
    { label: "Conselho Final", valor: fmtDataLonga(u.conselhoFinal), s: statusCampo(u, "conselhoFinal") },
    { label: "Entrega de Resultado", valor: fmtDataLonga(u.entregaResultado), s: statusCampo(u, "entregaResultado") }
  ];

  const lista = campos.map(c => `
    <li>
      <span class="f-label"><span class="ind ${indicadorCls(c.s)}"></span>${c.label}</span>
      <span class="f-value">${c.valor}</span>
    </li>`).join("");

  const obs = u.obs && u.obs.length ? `<ul style="margin:6px 0 0; padding-left:18px">${u.obs.map(o => `<li>${escapeHtml(o)}</li>`).join("")}</ul>` : "<p>Sem observações.</p>";

  document.getElementById("drawerBody").innerHTML = `
    <h3 style="font-size:15px;margin:0 0 4px">Campos do calendário</h3>
    <ul class="field-list">${lista}</ul>
    <div style="margin-top:18px; background:#fffbeb; border:1px solid #fde68a; border-radius:12px; padding:14px; font-size:13px; color:#78350f;">
      <strong>Observações e pendências</strong>
      ${obs}
    </div>`;

  overlay.classList.add("open");
  drawer.classList.add("open");
  document.body.style.overflow = "hidden";
  setTimeout(() => drawer.focus(), 50);
}

// Função para abrir os detalhes de uma Etapa específica
function abrirDrawerEtapa(idxUnidade, idxEtapa) {
  const listaAtual = obterUnidadesFiltradas();
  const u = listaAtual[idxUnidade];
  if (!u) return;
  
  const e = u.etapas[idxEtapa];
  
  // Pega os eventos. Se não existir, cria um vazio para não dar erro.
  const ev = e.eventos || { ciclos: "Não informado", olimpiadas: "Não informado", festas: "Não informado" };

  document.getElementById("drawerTitle").textContent = `${u.nome} - ${e.nome} Etapa`;
  document.getElementById("drawerSub").innerHTML = `
    <span class="sigla-badge">${u.sigla}</span>
    <span style="font-size:12px;color:#4b5563">Ano letivo 2027</span>`;

  const infoList = `
    <div style="display:flex; flex-direction:column; gap:12px;">
      <div style="display:flex; justify-content:space-between; padding:12px; background:#f8fafc; border-radius:8px; border:1px solid #e2e8f0;">
        <span style="font-weight:600; color:#475569;">📅 Período</span>
        <strong style="color:#002b5c;">${fmtDataLonga(e.ini)} até ${fmtDataLonga(e.fim)}</strong>
      </div>
      
      <h4 style="margin-top:10px; font-size:13px; color:#6b7280; text-transform:uppercase; letter-spacing:0.5px;">Eventos da Etapa</h4>
      
      <div style="display:flex; flex-direction:column; gap:8px;">
        <div style="padding:12px; border-left:3px solid #2563eb; background:#eff6ff; border-radius:4px;">
          <span style="display:block; font-size:11px; color:#1e40af; font-weight:700; text-transform:uppercase;">🔄 Ciclos Evolucional</span>
          <strong style="color:#1e3a8a;">${ev.ciclos || "Não informado"}</strong>
        </div>
        <div style="padding:12px; border-left:3px solid #f59e0b; background:#fffbeb; border-radius:4px;">
          <span style="display:block; font-size:11px; color:#b45309; font-weight:700; text-transform:uppercase;">🏆 Olimpíadas</span>
          <strong style="color:#78350f;">${ev.olimpiadas || "Não informado"}</strong>
        </div>
        <div style="padding:12px; border-left:3px solid #10b981; background:#ecfdf5; border-radius:4px;">
          <span style="display:block; font-size:11px; color:#047857; font-weight:700; text-transform:uppercase;">🎉 Festas</span>
          <strong style="color:#064e3b;">${ev.festas || "Não informado"}</strong>
        </div>
      </div>
    </div>
  `;

  document.getElementById("drawerBody").innerHTML = infoList;

  overlay.classList.add("open");
  drawer.classList.add("open");
  document.body.style.overflow = "hidden";
  setTimeout(() => drawer.focus(), 50);
}

function fecharDrawer() {
  drawer.classList.remove("open");
  overlay.classList.remove("open");
  document.body.style.overflow = "";
  if (ultimoFoco && ultimoFoco.focus) ultimoFoco.focus();
}

// =========================================
// INICIALIZAÇÃO DA PÁGINA
// =========================================
document.addEventListener("DOMContentLoaded", () => {
  // 1. Renderiza tudo na tela pela primeira vez
  renderKPIs();
  renderTimeline();
  renderMatriz();
  renderCards();
  
  // 2. Preenche o rodapé
  document.getElementById("footer").textContent = `Painel de calendários 2027 - Setor de Escolas · ISJB · Gerado em ${dataAtual()}`;
  
  // 3. Configura os botões e eventos de fechar painel
  document.getElementById("closeDrawer").addEventListener("click", fecharDrawer);
  overlay.addEventListener("click", fecharDrawer);
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && drawer.classList.contains("open")) fecharDrawer();
  });
  document.getElementById("btnExport").addEventListener("click", () => window.print());

  // 4. Configura os filtros de busca e status
  const inputBusca = document.getElementById("inputBusca");
  const filtroStatus = document.getElementById("filtroStatus");

  function aplicarFiltros() {
    renderKPIs(); // Importante: atualiza os números lá no topo também!
    renderTimeline();
    renderMatriz();
    renderCards();
  }

  inputBusca?.addEventListener("input", aplicarFiltros);
  filtroStatus?.addEventListener("change", aplicarFiltros);
});