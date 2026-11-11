const MESES = ["JAN","FEV","MAR","ABR","MAI","JUN","JUL","AGO","SET","OUT","NOV","DEZ"];
const MIN_LEGAL = 200;

function fracaoAno(iso) {
  if (!iso) return 0;
  const d = new Date(iso + "T00:00:00");
  const inicioAno = new Date(d.getFullYear(), 0, 1);
  const diaDoAno = Math.floor((d - inicioAno) / 86400000);
  return diaDoAno / 365;
}
function fmtData(iso) { if (!iso) return "—"; const [a, m, d] = iso.split("-"); return `${d}/${m}`; }
function fmtDataLonga(iso) { if (!iso) return "—"; const [a, m, d] = iso.split("-"); return `${d}/${m}/${a}`; }
function escapeHtml(s) { return String(s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c])); }
function dataAtual() { return new Date().toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" }); }

function statusCampo(u, campo) {
  switch (campo) {
    case "inicio": return u.inicio ? "ok" : "warn";
    case "fim": return u.fim ? "ok" : "warn";
    case "semPedagogica": return u.semPedagogica ? "ok" : "warn";
    case "e1": return (u.etapas[0].ini && u.etapas[0].fim) ? "ok" : "warn";
    case "e2": return (u.etapas[1].ini && u.etapas[1].fim) ? "ok" : "warn";
    case "e3": return (u.etapas[2].ini && u.etapas[2].fim) ? "ok" : "warn";
    case "conselhoFinal": return u.conselhoFinal ? "ok" : "warn";
    case "entregaResultado": return u.entregaResultado ? "ok" : "warn";
    case "feriasJulho": return u.feriasJulho ? "ok" : "warn";
    case "festaFamilia": return u.festaFamilia ? "ok" : "warn";
    case "festaJunina": return u.festaJunina ? "ok" : "warn";
    case "diasLetivos": return u.diasLetivos >= MIN_LEGAL ? "ok" : "crit";
  }
  return "ok";
}

const CAMPOS_MATRIZ = [
  { key: "inicio", label: "Início" }, { key: "fim", label: "Fim" }, { key: "semPedagogica", label: "Sem. Pedagógica" },
  { key: "e1", label: "1ª Etapa" }, { key: "e2", label: "2ª Etapa" }, { key: "e3", label: "3ª Etapa" },
  { key: "feriasJulho", label: "Férias Julho" }, { key: "festaFamilia", label: "Festa Família" }, { key: "festaJunina", label: "Festa Junina" },
  { key: "diasLetivos", label: "Dias Letivos" }, { key: "conselhoFinal", label: "Cons. Final" }, { key: "entregaResultado", label: "Entrega Resultado" }
];

function valorCampo(u, key) {
  switch (key) {
    case "inicio": return fmtData(u.inicio); case "fim": return fmtData(u.fim); case "semPedagogica": return fmtData(u.semPedagogica);
    case "e1": return fmtData(u.etapas[0].ini); case "e2": return fmtData(u.etapas[1].ini); case "e3": return fmtData(u.etapas[2].ini);
    case "conselhoFinal": return fmtData(u.conselhoFinal); case "entregaResultado": return fmtData(u.entregaResultado);
    case "feriasJulho": return u.feriasJulho ? fmtData(u.feriasJulho.ini) : "—";
    case "festaFamilia": return fmtData(u.festaFamilia); case "festaJunina": return fmtData(u.festaJunina);
    case "diasLetivos": return String(u.diasLetivos);
  }
  return "—";
}
function badgeStatus(status) { if (status === "validada") return '<span class="badge-status badge-validada">Validada</span>'; if (status === "incompleta") return '<span class="badge-status badge-incompleta">Incompleta</span>'; return '<span class="badge-status badge-erro">Erro crítico</span>'; }
function classeStatusCelula(s) { return s === "ok" ? "cell-ok" : s === "warn" ? "cell-warn" : "cell-crit"; }
function indicadorCls(s) { return s === "ok" ? "ind-ok" : s === "warn" ? "ind-warn" : "ind-crit"; }
function obterUnidadesFiltradas() {
  const busca = document.getElementById("inputBusca")?.value.toLowerCase() || "";
  const statusFiltro = document.getElementById("filtroStatus")?.value || "todos";
  
  return UNIDADES.filter(u => {
    // Filtro por Nome
    const matchNome = u.nome.toLowerCase().includes(busca) || u.sigla.toLowerCase().includes(busca);
    // Filtro por Status
    const matchStatus = statusFiltro === "todos" || u.status === statusFiltro;
    
    return matchNome && matchStatus;
  });
}