// FERIADOS QUE AFETAM TODAS AS UNIDADES (Nacionais e datas base)
const FERIADOS_NACIONAIS = [
  "2027-01-01", // Confraternização Universal
  "2027-02-09", // Carnaval
  "2027-03-26", // Sexta-feira Santa
  "2027-04-21", // Tiradentes
  "2027-05-01", // Dia do Trabalho
  "2027-06-03", // Corpus Christi
  "2027-09-07", // Independência do Brasil
  "2027-10-12", // Nossa Senhora Aparecida
  "2027-11-02", // Finados
  "2027-11-15", // Proclamação da República
  "2027-11-20", // Consciência Negra (Feriado Nacional a partir de 2024)
  "2027-12-25"  // Natal
];

const UNIDADES = [
  { 
    nome: "Araxá", sigla: "CDBA", inicio: "2027-02-02", fim: "2027-12-11", semPedagogica: "2027-01-26", 
    etapas: [ { nome: "1ª", ini: "2027-02-02", fim: "2027-04-17" }, { nome: "2ª", ini: "2027-04-20", fim: "2027-08-14" }, { nome: "3ª", ini: "2027-08-17", fim: "2027-11-27" } ], 
    conselhoFinal: "2027-12-04", entregaResultado: "2027-12-11", feriasJulho: { ini: "2027-07-13", fim: "2027-07-24" }, 
    festaFamilia: "2027-06-06", festaJunina: "2027-06-20", diasLetivos: 203, 
    feriados: ["2027-08-15"], // Ex: Aniversário de Araxá (Municipal)
    obs: ["Entrega de resultados aguardando assinatura da direção.", "Festa Junina remarcada para 20/06."], status: "validada" 
  },
  { 
    nome: "Belo Horizonte", sigla: "CSBH", inicio: "2027-02-03", fim: "2027-12-10", semPedagogica: "2027-01-29", 
    etapas: [ { nome: "1ª", ini: "2027-02-03", fim: "2027-04-10" }, { nome: "2ª", ini: "2027-04-13", fim: "2027-07-03" }, { nome: "3ª", ini: "2027-08-03", fim: "2027-11-20" } ], 
    conselhoFinal: "2027-12-03", entregaResultado: "2027-12-10", feriasJulho: { ini: "2027-07-06", fim: "2027-07-31" }, 
    festaFamilia: "2027-05-16", festaJunina: "2027-06-26", diasLetivos: 201, 
    feriados: ["2027-08-15"], // Aniversário de BH
    obs: ["Dia letivo de 2ª Etapa com 4 dias a mais que o previsto — revisar."], status: "validada" 
  },
  { 
    nome: "Núcleo Bandeirante", sigla: "CSNB", inicio: "2027-02-09", fim: "2027-12-15", semPedagogica: "2027-02-02", 
    etapas: [ { nome: "1ª", ini: "2027-02-09", fim: "2027-04-24" }, { nome: "2ª", ini: "2027-04-27", fim: "2027-08-21" }, { nome: "3ª", ini: "2027-08-24", fim: "2027-12-02" } ], 
    conselhoFinal: "2027-12-09", entregaResultado: null, feriasJulho: { ini: "2027-07-20", fim: "2027-07-31" }, 
    festaFamilia: "2027-08-29", festaJunina: "2027-06-12", diasLetivos: 198, 
    feriados: ["2027-11-30"], // Dia do Evangélico (DF)
    obs: ["Data de entrega de resultado não definida.", "Dias letivos abaixo do mínimo legal (200)."], status: "erro" 
  },
  { 
    nome: "Goiânia", sigla: "CSG", inicio: "2027-02-02", fim: "2027-12-08", semPedagogica: "2027-01-28", 
    etapas: [ { nome: "1ª", ini: "2027-02-02", fim: "2027-04-17" }, { nome: "2ª", ini: "2027-04-20", fim: "2027-08-07" }, { nome: "3ª", ini: "2027-08-10", fim: "2027-11-27" } ], 
    conselhoFinal: "2027-12-02", entregaResultado: "2027-12-08", feriasJulho: { ini: "2027-07-13", fim: "2027-07-24" }, 
    festaFamilia: "2027-06-13", festaJunina: "2027-06-19", diasLetivos: 204, 
    feriados: ["2027-10-24"], // Aniversário de Goiânia
    obs: ["Calendário completo e conforme."], status: "validada" 
  },
  { 
    nome: "Campos dos Goytacazes", sigla: "CSCG", inicio: "2027-02-04", fim: "2027-12-11", semPedagogica: "2027-01-30", 
    etapas: [ { nome: "1ª", ini: "2027-02-04", fim: "2027-04-18" }, { nome: "2ª", ini: "2027-04-21", fim: "2027-08-14" }, { nome: "3ª", ini: "2027-08-17", fim: "2027-11-27" } ], 
    conselhoFinal: "2027-12-04", entregaResultado: "2027-12-11", feriasJulho: { ini: "2027-07-06", fim: "2027-07-17" }, 
    festaFamilia: "2027-06-27", festaJunina: "2027-06-13", diasLetivos: 202, 
    feriados: ["2027-05-28", "2027-08-15"], // Aniversário e Nossa Senhora
    obs: ["Feriado municipal de 20/11 incluído no calendário."], status: "incompleta" 
  },
  { 
    nome: "Jacarezinho", sigla: "CSJ", inicio: "2027-02-02", fim: null, semPedagogica: "2027-01-26", 
    etapas: [ { nome: "1ª", ini: "2027-02-02", fim: "2027-04-17" }, { nome: "2ª", ini: "2027-04-20", fim: "2027-08-14" }, { nome: "3ª", ini: null, fim: null } ], 
    conselhoFinal: null, entregaResultado: null, feriasJulho: { ini: "2027-07-13", fim: "2027-07-24" }, 
    festaFamilia: "2027-07-18", festaJunina: "2027-06-19", diasLetivos: 185, 
    feriados: ["2027-11-15"], // Aniversário de Jacarezinho
    obs: ["3ª Etapa sem datas cadastradas.", "Fim do ano letivo e conselho final pendentes.", "Dias letivos abaixo do mínimo legal."], status: "erro" 
  },
  { 
    nome: "Santa Rosa", sigla: "CSSR", inicio: "2027-02-03", fim: "2027-12-09", semPedagogica: "2027-01-27", 
    etapas: [ { nome: "1ª", ini: "2027-02-03", fim: "2027-04-10" }, { nome: "2ª", ini: "2027-04-13", fim: "2027-07-31" }, { nome: "3ª", ini: "2027-08-03", fim: "2027-11-20" } ], 
    conselhoFinal: "2027-12-02", entregaResultado: "2027-12-09", feriasJulho: { ini: "2027-07-27", fim: "2027-08-07" }, 
    festaFamilia: "2027-06-06", festaJunina: "2027-06-26", diasLetivos: 200, 
    feriados: ["2027-07-08"], // Aniversário de Santa Rosa
    obs: ["Calendário validado na última revisão."], status: "validada" 
  },
  { 
    nome: "Região Oceânica", sigla: "CSRO", inicio: "2027-02-09", fim: "2027-12-16", semPedagogica: "2027-02-03", 
    etapas: [ { nome: "1ª", ini: "2027-02-09", fim: "2027-04-24" }, { nome: "2ª", ini: "2027-04-27", fim: "2027-08-21" }, { nome: "3ª", ini: "2027-08-24", fim: "2027-12-09" } ], 
    conselhoFinal: "2027-12-10", entregaResultado: "2027-12-16", feriasJulho: { ini: "2027-07-20", fim: "2027-07-31" }, 
    festaFamilia: "2027-09-19", festaJunina: "2027-06-26", diasLetivos: 207, 
    feriados: ["2027-04-23", "2027-11-20"], // São Jorge (RJ) e Zumbi
    obs: ["Cronograma completo. Festa da Família agendada para setembro."], status: "validada" 
  },
  { 
    nome: "Resende", sigla: "CSR", inicio: "2027-02-04", fim: "2027-12-11", semPedagogica: "2027-01-30", 
    etapas: [ { nome: "1ª", ini: "2027-02-04", fim: "2027-04-17" }, { nome: "2ª", ini: "2027-04-20", fim: "2027-08-07" }, { nome: "3ª", ini: "2027-08-10", fim: "2027-11-27" } ], 
    conselhoFinal: null, entregaResultado: "2027-12-11", feriasJulho: { ini: "2027-07-06", fim: "2027-07-17" }, 
    festaFamilia: "2027-06-13", festaJunina: "2027-06-12", diasLetivos: 196, 
    feriados: ["2027-09-29"], // Aniversário de Resende
    obs: ["Conselho final não agendado.", "Dias letivos abaixo do mínimo legal (196 < 200)."], status: "erro" 
  },
  { 
    nome: "Nossa Senhora da Vitória", sigla: "CSNSV", inicio: "2027-02-03", fim: "2027-12-10", semPedagogica: "2027-01-29", 
    etapas: [ { nome: "1ª", ini: "2027-02-03", fim: "2027-04-17" }, { nome: "2ª", ini: "2027-04-20", fim: "2027-08-14" }, { nome: "3ª", ini: "2027-08-17", fim: "2027-11-27" } ], 
    conselhoFinal: "2027-12-03", entregaResultado: "2027-12-10", feriasJulho: { ini: "2027-07-13", fim: "2027-07-24" }, 
    festaFamilia: "2027-06-06", festaJunina: "2027-06-19", diasLetivos: 202, 
    feriados: ["2027-04-24", "2027-09-08"], // N. Sra. da Penha e Vitória
    obs: ["Calendário validado."], status: "validada" 
  },
  { 
    nome: "Jardim Camburi", sigla: "CSJC", inicio: "2027-02-02", fim: "2027-12-11", semPedagogica: null, 
    etapas: [ { nome: "1ª", ini: "2027-02-02", fim: "2027-04-17" }, { nome: "2ª", ini: "2027-04-20", fim: "2027-08-14" }, { nome: "3ª", ini: "2027-08-17", fim: "2027-11-27" } ], 
    conselhoFinal: "2027-12-04", entregaResultado: "2027-12-11", feriasJulho: { ini: "2027-07-13", fim: "2027-07-24" }, 
    festaFamilia: null, festaJunina: "2027-06-26", diasLetivos: 203, 
    feriados: ["2027-09-08"], // Nossa Senhora da Penha (ES)
    obs: ["Semana Pedagógica sem data cadastrada.", "Festa da Família ainda não definida."], status: "incompleta" 
  }
  
];
