
-- Update Day 6 content with enhanced structure for roteiro #160
UPDATE user_daily_content 
SET content_card = jsonb_build_object(
    'title', 'Desafie a sua audiência a perceber algum detalhe contraintuitivo',
    'roteiro_number', 160,
    'format', 'Narração por Imagens/Vídeos',
    'platforms', ARRAY['IG Reels (1 minuto)', 'TikTok (1 minuto)'],
    'intentions', ARRAY['Viralizar', 'Ensinar algum Conhecimento', 'Entreter a Audiência', 'Ganhar seguidor'],
    'reference_link', 'https://www.notion.so/ROTEIRO-160-Desafie-a-sua-audi-ncia-a-perceber-algum-detalhe-contraintuitivo-f214b7c8b00a4cd988c5497d6c15e0ab?pvs=24',
    
    -- Conteúdo principal
    'main_content', 'A contraintuição é uma das ferramentas mais poderosas para prender a atenção e gerar engajamento. Quando você apresenta algo que vai contra o senso comum, as pessoas param para prestar atenção.',
    
    -- 1. Como Criar o Conteúdo (3 passos)
    'how_to_structure', jsonb_build_object(
        'step_1', 'Escolha um tema do seu nicho onde existe uma crença comum ou um "conhecimento" que todos "sabem" ser verdade.',
        'step_2', 'Identifique o detalhe contraintuitivo - algo que vai contra essa crença comum mas que é factualmente correto ou tem uma explicação lógica.',
        'step_3', 'Estruture o vídeo seguindo o fluxo: Hook → Situação → Desafio → Revelação → Educação'
    ),
    
    -- 2. Estrutura do Vídeo (5 elementos sequenciais)
    'video_structure', jsonb_build_object(
        'hook', 'Você consegue perceber o que está errado nesta situação?',
        'apresentacao', 'Mostre visualmente a situação/exemplo',
        'desafio', 'A maioria das pessoas não percebe, mas...',
        'revelacao', 'Explique o detalhe contraintuitivo',
        'educacao', 'Por que isso acontece/funciona assim'
    ),
    
    -- 3. Exemplos por Nicho (4 nichos específicos)
    'examples', jsonb_build_object(
        'design', jsonb_build_object(
            'tipo_1', 'Este layout parece feio, mas converte melhor por causa de...',
            'tipo_2', 'Esta cor parece errada, mas psychologicamente funciona porque...',
            'tipo_3', 'Este botão parece pequeno, mas gera mais cliques por...'
        ),
        'fitness', jsonb_build_object(
            'tipo_1', 'Todo mundo acha que este exercício trabalha X músculo, mas na verdade...',
            'tipo_2', 'Esta postura parece errada, mas é mais eficiente porque...',
            'tipo_3', 'Este peso parece leve, mas é mais desafiador por...'
        ),
        'culinaria', jsonb_build_object(
            'tipo_1', 'Parece que estou fazendo errado, mas este é o jeito certo de...',
            'tipo_2', 'Esta temperatura parece baixa, mas preserva melhor os nutrientes...',
            'tipo_3', 'Este tempo parece curto, mas é o ideal para...'
        ),
        'marketing', jsonb_build_object(
            'tipo_1', 'Esta estratégia parece contraproducente, mas aumenta as vendas porque...',
            'tipo_2', 'Este preço parece alto, mas converte melhor por...',
            'tipo_3', 'Esta abordagem parece agressiva, mas gera mais leads porque...'
        )
    ),
    
    -- 4. Gatilhos Psicológicos (4 gatilhos mentais)
    'psychological_triggers', ARRAY[
        'Curiosidade: desperta interesse imediato',
        'Exclusividade: sensação de informação privilegiada', 
        'Surpresa: quebra expectativas estabelecidas',
        'Validação: pessoas se sentem inteligentes ao entender'
    ],
    
    -- 5. Elementos Virais (4 estratégias)
    'viral_tips', ARRAY[
        'Use palavras como "a maioria não percebe", "poucos sabem", "contraintuitivo"',
        'Crie suspense antes de revelar a resposta',
        'Incentive comentários perguntando "você percebeu?"',
        'Use elementos visuais que destacam o detalhe'
    ],
    
    -- 6. Predição de Engajamento (expectativa de resultado)
    'engagement_benefits', ARRAY[
        'Alto engajamento nos comentários com pessoas tentando descobrir o detalhe',
        'Compartilhamentos por pessoas querendo desafiar amigos',
        'Aumento de seguidores curiosos pelo conteúdo "revelador"',
        'Posicionamento como especialista que conhece "segredos"'
    ],
    'viral_potential', 'Alto engajamento nos comentários com pessoas tentando descobrir o detalhe antes da revelação',
    
    -- Observações e CTA
    'observations', 'Este formato funciona porque desperta a curiosidade e faz as pessoas sentirem que estão aprendendo algo "secreto" ou exclusivo. O engajamento nos comentários tende a ser alto.',
    'cta_text', 'Comente NEGÓCIO se você quer mais estratégias de crescimento!',
    'strategic_analysis', 'Análise personalizada para empreendedor: Use contraintuições do seu nicho para gerar curiosidade e posicionar-se como especialista que conhece "segredos" do mercado.'
)
WHERE day = 6;
