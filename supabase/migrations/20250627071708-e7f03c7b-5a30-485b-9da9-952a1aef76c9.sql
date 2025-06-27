
-- Update all students' Day 7 records with the enhanced content_card structure
UPDATE user_daily_content 
SET content_card = '{
  "title": "Tipos de pessoas do seu nicho",
  "format": "Narração por Imagens/Vídeos",
  "cta_text": "Comente NEGÓCIO se você quer mais estratégias de crescimento!",
  "examples": {
    "fitness": {
      "tipo_1": "O Consistente (treina todo dia, mesmo resultado)",
      "tipo_2": "O Intenso (treina pesado mas irregular)",
      "tipo_3": "O Teórico (sabe tudo mas não pratica)"
    },
    "culinaria": {
      "tipo_1": "O Tradicional (receitas da vovó sempre)",
      "tipo_2": "O Experimentador (inventa sempre algo novo)",
      "tipo_3": "O Prático (receitas rápidas e simples)"
    },
    "empreendedorismo": {
      "tipo_1": "O Planejador (planeja tudo mas não executa)",
      "tipo_2": "O Executor (age rápido mas sem estratégia)",
      "tipo_3": "O Equilibrado (planeja e executa na medida)"
    }
  },
  "platforms": ["IG Reels (1 minuto)", "TikTok (1 minuto)"],
  "intentions": ["Viralizar", "Entreter a Audiência", "Se Conectar com a Audiência", "Ganhar seguidor"],
  "viral_tips": [
    "Use representações visuais claras para cada tipo",
    "Inclua situações cômicas/relacionáveis",
    "Termine perguntando qual tipo a pessoa é",
    "Considere fazer uma \"parte 2\" com mais tipos"
  ],
  "main_content": "Categorizar tipos de pessoas é uma estratégia que gera muito engajamento porque todos querem se identificar ou descobrir \"que tipo\" eles são.",
  "observations": "Este formato gera muito comentário porque as pessoas adoram se categorizar e marcar amigos que se encaixam nos perfis. É ótimo para engajamento e alcance.",
  "reference_link": "https://www.notion.so/ROTEIRO-161-Tipos-de-pessoas-do-seu-nicho-d4f485ae5f86420fb37185cb79fde05a?pvs=24",
  "roteiro_number": 161,
  "practical_steps": "Siga os 3 passos de estruturação, use os exemplos como referência e aplique as 4 dicas virais para maximizar engajamento.",
  "video_structure": {
    "cta": "Comenta aí qual você é!",
    "hook": "Existem X tipos de [pessoas do seu nicho], qual você é?",
    "tipo_1": "Características + exemplo visual",
    "tipo_2": "Características + exemplo visual",
    "tipo_3": "Características + exemplo visual"
  },
  "viral_potential": "Alto - formato de identificação pessoal",
  "how_to_structure": {
    "step_1": "Defina 3-4 tipos distintos de pessoas dentro do seu nicho, com características bem marcantes e reconhecíveis.",
    "step_2": "Para cada tipo, inclua: Nome/apelido característico, Comportamentos típicos, Frases que costumam dizer, Como agem em situações específicas, Resultados que geralmente obtêm",
    "step_3": "Estrutura do vídeo: Hook + Tipos + Call to action"
  },
  "strategic_analysis": "Análise personalizada para empreendedor: Conecte com estratégias de negócio, crescimento e oportunidades de mercado.",
  "engagement_benefits": [
    "Gera muitos comentários de identificação",
    "Pessoas marcam amigos que se encaixam nos perfis",
    "Ótimo para engajamento e alcance",
    "Alto potencial de compartilhamento"
  ]
}'::jsonb
WHERE day = 7;
