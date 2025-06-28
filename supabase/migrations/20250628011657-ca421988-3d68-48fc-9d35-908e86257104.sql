
-- Expandir os exemplos por nicho do Dia 3 com novos segmentos
UPDATE user_daily_content 
SET content_card = jsonb_set(
  content_card,
  '{examples}',
  '{
    "empreendedorismo": {
      "tipo_1": "Steve Jobs - Fundador da Apple, conhecido por inovação e design revolucionário",
      "tipo_2": "Elon Musk - CEO da Tesla e SpaceX, visionário em tecnologia sustentável",
      "tipo_3": "Sara Blakely - Fundadora da Spanx, exemplo de empreendedorismo feminino"
    },
    "saude_medicina": {
      "tipo_1": "Dr. Drauzio Varella - Médico oncologista, comunicador de saúde pública",
      "tipo_2": "Dra. Ana Escobar - Pediatra, referência em saúde infantil",
      "tipo_3": "Dr. Roberto Kalil - Cardiologista renomado, pioneiro em cirurgias cardíacas"
    },
    "financas_investimentos": {
      "tipo_1": "Luiz Barsi - Maior investidor pessoa física da B3, especialista em dividendos",
      "tipo_2": "Thiago Nigro - O Primo Rico, educador financeiro e investidor",
      "tipo_3": "Nathalia Arcuri - Me Poupe, especialista em educação financeira"
    },
    "direito_advocacia": {
      "tipo_1": "Rui Barbosa - Jurista histórico, defensor da justiça e direitos",
      "tipo_2": "Miguel Reale Jr. - Jurista renomado, especialista em direito penal",
      "tipo_3": "Janaina Paschoal - Advogada e professora, conhecida por atuação política"
    },
    "educacao_ensino": {
      "tipo_1": "Mario Sergio Cortella - Filósofo e educador, palestrante renomado",
      "tipo_2": "Leandro Karnal - Historiador e professor, comunicador educacional",
      "tipo_3": "Rosely Sayão - Psicóloga e educadora, especialista em desenvolvimento"
    },
    "tecnologia_inovacao": {
      "tipo_1": "Silvio Santos Mello - CTO do Nubank, líder em fintech",
      "tipo_2": "Camila Achutti - Co-fundadora da mastertech, educação em tecnologia",
      "tipo_3": "Eduardo Saverin - Co-fundador do Facebook, investidor em startups"
    },
    "marketing_vendas": {
      "tipo_1": "Flávio Augusto - Fundador da Wise Up, especialista em franchising",
      "tipo_2": "Conrado Adolpho - Especialista em marketing digital e vendas online",
      "tipo_3": "Camila Farani - Investidora e especialista em marketing para startups"
    },
    "imobiliario": {
      "tipo_1": "Cyrela - Construtora de alto padrão, referência no mercado imobiliário",
      "tipo_2": "Lopes - Corretora tradicional, especialista em vendas residenciais",
      "tipo_3": "Fernandez Mera - Incorporadora de luxo, projetos diferenciados"
    }
  }'::jsonb
)
WHERE day = 3 AND content_type = 'social_media_content';
