
-- Update Day 5 content with enhanced structure
UPDATE user_daily_content 
SET content_card = jsonb_build_object(
    'title', 'Conteúdo para Dia 5',
    'roteiro_number', 159,
    'format', 'Reels/Vídeo Curto',
    'platforms', ARRAY['Instagram Reels', 'TikTok', 'YouTube Shorts'],
    'intentions', ARRAY['Educar', 'Engajar', 'Viralizar'],
    'reference_link', 'https://exemplo.com/roteiro-159',
    
    -- Conteúdo principal
    'main_content', 'Conteúdo educativo que ensina de forma prática e direta, focando em resolver um problema específico da audiência.',
    
    -- 1. Como Criar o Conteúdo (3 passos)
    'how_to_structure', jsonb_build_object(
        'step_1', 'Identifique um problema comum que sua audiência enfrenta no dia a dia.',
        'step_2', 'Crie uma solução simples e aplicável que pode ser implementada imediatamente.',
        'step_3', 'Estruture o conteúdo com gancho forte, problema, solução e call-to-action claro.'
    ),
    
    -- 2. Estrutura do Vídeo (5 elementos sequenciais)
    'video_structure', jsonb_build_object(
        'hook', 'Pare de fazer isso que está sabotando seus resultados!',
        'apresentacao', 'Apresente o problema de forma clara e relatable',
        'desafio', 'Mostre as consequências de não resolver o problema',
        'revelacao', 'Revele a solução de forma surpreendente',
        'educacao', 'Ensine o passo a passo da solução'
    ),
    
    -- 3. Exemplos por Nicho (4 nichos específicos)
    'examples', jsonb_build_object(
        'fitness', jsonb_build_object(
            'tipo_1', 'Pare de fazer abdominais todos os dias - está sabotando seus resultados',
            'tipo_2', 'Este erro no agachamento está prejudicando seus joelhos',
            'tipo_3', 'Por que você não emagrece mesmo fazendo dieta'
        ),
        'marketing', jsonb_build_object(
            'tipo_1', 'Pare de postar todo dia - está matando seu alcance',
            'tipo_2', 'Este erro no seu funil está perdendo 70% dos leads',
            'tipo_3', 'Por que suas vendas caíram depois que você aumentou o preço'
        ),
        'produtividade', jsonb_build_object(
            'tipo_1', 'Pare de usar to-do lists - está diminuindo sua produtividade',
            'tipo_2', 'Este hábito matinal está arruinando seu dia inteiro',
            'tipo_3', 'Por que você não consegue manter a disciplina'
        ),
        'financas', jsonb_build_object(
            'tipo_1', 'Pare de guardar dinheiro na poupança - está perdendo dinheiro',
            'tipo_2', 'Este erro nos investimentos está corroendo seu patrimônio',
            'tipo_3', 'Por que você não consegue sair do vermelho'
        )
    ),
    
    -- 4. Gatilhos Psicológicos (4 gatilhos mentais)
    'psychological_triggers', ARRAY[
        'Urgência: criar senso de necessidade imediata de mudança',
        'Medo da perda: mostrar o que se perde ao não agir',
        'Autoridade: posicionar-se como especialista que conhece a solução',
        'Prova social: usar exemplos de outros que obtiveram sucesso'
    ],
    
    -- 5. Elementos Virais (4 estratégias)
    'viral_tips', ARRAY[
        'Use ganchos controversos como "Pare de fazer X"',
        'Contrarie crenças populares do seu nicho',
        'Crie títulos que geram curiosidade e debate',
        'Use dados e estatísticas para dar credibilidade'
    ],
    
    -- 6. Predição de Engajamento (expectativa de resultado)
    'engagement_benefits', ARRAY[
        'Alto engajamento devido ao gancho controverso',
        'Comentários questionando ou confirmando a informação',
        'Compartilhamentos por pessoas que se identificam com o problema',
        'Salvamentos para aplicar a solução depois'
    ],
    'viral_potential', 'Médio a alto, especialmente se o gancho for controverso o suficiente para gerar debate',
    
    -- Observações e CTA
    'observations', 'Conteúdos que contrariam crenças populares tendem a gerar mais engajamento, mas devem ser baseados em fatos para manter credibilidade.',
    'cta_text', 'Comente SOLUÇÃO se você quer mais dicas práticas como essa!',
    'strategic_analysis', 'Análise estratégica: Use controvérsias baseadas em fatos para posicionar-se como autoridade que vai além do senso comum.'
)
WHERE day = 5;
