
-- Atualizar exemplos do Dia 3 com manias peculiares específicas por nicho
UPDATE user_daily_content 
SET content_card = jsonb_set(
  content_card,
  '{examples}',
  '{
    "saude_medicina": {
      "tipo_1": "Dr. Drauzio Varella - Sempre usa a mesma caneta vermelha há 30 anos, faz 100 flexões todo dia às 5h da manhã, nunca atende telefone durante consultas",
      "tipo_2": "Dra. Ana Escobar - Leva boneca de pano em todas as consultas pediátricas, come exatamente 7 amêndoas antes de cada cirurgia, só usa sapatos azuis no hospital",
      "tipo_3": "Dr. Roberto Kalil - Ouve a mesma música clássica antes de toda cirurgia cardíaca, nunca opera sem comer banana no café da manhã, conta até 21 antes de fazer primeira incisão"
    },
    "financas_investimentos": {
      "tipo_1": "Luiz Barsi - Lê todos os balanços financeiros impressos em papel (nunca digital), almoça no mesmo restaurante há 25 anos, anota tudo à mão em cadernos numerados",
      "tipo_2": "Thiago Nigro - Acorda 4h30 todo dia e medita exatamente 17 minutos, só bebe água em copos de vidro transparente, escreve metas diárias em post-its amarelos",
      "tipo_3": "Nathalia Arcuri - Usa sempre batom vermelho em vídeos (diz que dá sorte), organiza a mesa de trabalho 3 vezes por dia, nunca grava conteúdo sem tomar chá de camomila"
    },
    "direito_advocacia": {
      "tipo_1": "Rui Barbosa - Escrevia de pé em uma escrivaninha alta, dormia apenas 4 horas por noite, lia 3 jornais diferentes toda manhã na mesma ordem",
      "tipo_2": "Miguel Reale Jr. - Sempre carrega uma moeda antiga no bolso durante julgamentos, usa apenas canetas azuis, relê cada petição exatamente 3 vezes antes de protocolar",
      "tipo_3": "Janaina Paschoal - Toma banho frio toda manhã há 15 anos, usa sempre um anel no dedo mindinho, anota ideias em guardanapos durante refeições"
    },
    "educacao_ensino": {
      "tipo_1": "Mario Sergio Cortella - Sempre usa terno mesmo em casa, caminha 30 minutos pensando antes de cada palestra, nunca usa slides com mais de 7 palavras",
      "tipo_2": "Leandro Karnal - Come maçã verde todo dia às 15h, escreve à mão todas as anotações em cadernos Moleskine pretos, dorme exatamente 7 horas por noite",
      "tipo_3": "Rosely Sayão - Atende pais sempre com uma xícara de chá na mão, usa o mesmo perfume há 20 anos, anota sonhos em um diário específico toda manhã"
    },
    "tecnologia_inovacao": {
      "tipo_1": "Elon Musk - Trabalha em blocos de 5 minutos cronometrados, toma banho frio todo dia, só come depois do meio-dia (jejum intermitente extremo)",
      "tipo_2": "Steve Jobs - Usava apenas roupas pretas, caminhava descalço no escritório, testava produtos pessoalmente por horas antes de aprovar",
      "tipo_3": "Mark Zuckerberg - Usa a mesma roupa todo dia para não gastar energia decidindo, programa pelo menos 1 hora por dia ainda hoje, caminha durante todas as reuniões importantes"
    },
    "marketing_vendas": {
      "tipo_1": "Flávio Augusto - Atende todos os clientes pessoalmente pelo menos uma vez, usa relógio no pulso direito (é canhoto), anota ideias em guardanapos de restaurante",
      "tipo_2": "Conrado Adolpho - Grava vídeos sempre no mesmo horário (14h), bebe café em xícara específica durante lives, testa todos os produtos que vende pessoalmente",
      "tipo_3": "Camila Farani - Usa batom roxo em todas as gravações, faz 50 agachamentos antes de apresentações, carrega sempre um caderninho rosa para anotações"
    },
    "empreendedorismo": {
      "tipo_1": "Luiza Trajano - Visita uma loja Magazine Luiza pessoalmente todo dia, almoça com funcionários diferentes semanalmente, usa sempre esmalte vermelho nas unhas",
      "tipo_2": "Jorge Paulo Lemann - Acorda 5h e nada 1km todo dia, só toma decisões importantes depois das 10h, anota tudo em cadernos numerados sequencialmente",
      "tipo_3": "Abilio Diniz - Corre 10km todo dia há 40 anos, só come frutas no café da manhã, faz reuniões em pé (nunca sentado)"
    },
    "imobiliario": {
      "tipo_1": "Cyrela Brasil Realty - Fundador visita todos os canteiros de obras pessoalmente, usa capacete dourado em vistorias, toma decisões sempre às terças-feiras",
      "tipo_2": "Lopes Consultoria - Fundador decora o nome de todos os corretores (mais de 5000), usa terno azul marinho em todas as reuniões, almoça no escritório todo dia",
      "tipo_3": "Gafisa - Ex-CEO acompanhava pessoalmente entrega de chaves, carregava sempre uma trena no bolso, visitava apartamentos decorados nos fins de semana"
    }
  }'::jsonb
)
WHERE day = 3 AND content_type = 'social_media_content';
