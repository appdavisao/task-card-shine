
-- Update Day 4 content with case study structure for all users
UPDATE user_daily_content 
SET content_card = jsonb_build_object(
    'title', 'Me pediu tal coisa e eu fiz desse jeito',
    'roteiro_number', 178,
    'format', 'Narração por Imagens/Vídeos',
    'content_type', 'case_study',
    'platforms', ARRAY['IG Reels (1 minuto)', 'TikTok (1 minuto)'],
    'intentions', ARRAY['Ensinar algum Conhecimento', 'Mostrar Oportunidade', 'Gerar credibilidade', 'Ganhar seguidor'],
    'reference_link', 'https://www.notion.so/ROTEIRO-178-Me-pediu-tal-coisa-e-eu-fiz-desse-jeito-7e146a1f65a74e629964f5b0c780e32c?pvs=24',
    
    -- Conteúdo principal
    'main_content', 'Este formato é extremamente eficaz porque mostra aplicação prática real de conhecimento, criando credibilidade através de casos concretos e oferecendo soluções testadas.',
    
    -- Estrutura específica para caso de estudo
    'case_details', jsonb_build_object(
        'client_request', 'Desafio específico que o cliente apresentou, incluindo limitações de tempo, budget ou recursos',
        'solution_process', 'Estratégia escolhida, passos executados, ferramentas utilizadas e obstáculos superados',
        'practical_result', 'Métricas específicas, reação do cliente, impacto obtido e desdobramentos positivos',
        'key_insight', 'Princípio ou lição principal que outros podem aplicar em situações similares'
    ),
    
    -- 1. Como Criar o Conteúdo (3 passos)
    'how_to_structure', jsonb_build_object(
        'step_1', 'Escolha um caso real onde você resolveu algo aparentemente impossível ou muito desafiador.',
        'step_2', 'Explique o contexto completo: quem pediu, qual era o problema, que limitações existiam e por que era difícil.',
        'step_3', 'Mostre seu processo de pensamento e execução, destacando momentos críticos e como superou obstáculos.'
    ),
    
    -- 2. Estrutura do Vídeo (6 elementos sequenciais)
    'video_structure', jsonb_build_object(
        'hook', 'Me pediram para [desafio aparentemente difícil]',
        'contexto', 'Explique quem pediu, qual problema e que restrições existiam',
        'processo', 'E foi assim que eu fiz: estratégia, passos e decisões críticas',
        'resultado', 'O resultado foi: outcome específico e reação do cliente',
        'licao', 'O que isso ensinou: princípio aplicável para outros',
        'cta', 'Já passaram algo impossível para vocês fazerem?'
    ),
    
    -- 3. Exemplos por Nicho (4 nichos específicos)
    'examples', jsonb_build_object(
        'design', jsonb_build_object(
            'tipo_1', 'Cliente me pediu logo em 2 horas - virou identidade que ele usa há 3 anos',
            'tipo_2', 'Me pediram para fazer milagre com foto ruim - resultado foi capa de revista',
            'tipo_3', 'Cliente queria site por preço de panfleto - entreguei MVP que virou empire'
        ),
        'fitness', jsonb_build_object(
            'tipo_1', 'Cliente me pediu para perder 10kg em 1 mês - perdeu 8kg de forma saudável',
            'tipo_2', 'Me pediram treino para pessoa com 5 lesões - hoje ela compete em maratonas',
            'tipo_3', 'Cliente queria ganhar massa sem academia - montei treino caseiro que funcionou'
        ),
        'marketing', jsonb_build_object(
            'tipo_1', 'Cliente me pediu para vender produto que ninguém comprava - aumentei as vendas em 300%',
            'tipo_2', 'Me pediram campanha com orçamento de R$500 - gerou R$15mil de retorno',
            'tipo_3', 'Cliente queria 1000% de ROI em 30 dias - conseguimos 1200% em 25 dias'
        ),
        'tecnologia', jsonb_build_object(
            'tipo_1', 'Cliente me pediu app em 1 semana - entregamos MVP que captou investimento',
            'tipo_2', 'Me pediram para resolver bug que ninguém conseguia - problema estava na arquitetura',
            'tipo_3', 'Cliente queria IA por preço de planilha - automatizamos 80% dos processos dele'
        )
    ),
    
    -- 4. Gatilhos Psicológicos (4 gatilhos mentais)
    'psychological_triggers', ARRAY[
        'Credibilidade: casos reais são mais convincentes que teoria',
        'Esperança: mostra que problemas difíceis têm solução',
        'Curiosidade: desperta interesse sobre o processo usado',
        'Aspiração: inspira a buscar soluções criativas'
    ],
    
    -- 5. Elementos Virais (4 estratégias)
    'viral_tips', ARRAY[
        'Use pedidos aparentemente impossíveis para gerar curiosidade',
        'Seja específico com números e resultados mensuráveis',
        'Mostre o processo, não apenas o resultado final',
        'Inclua a reação do cliente para validar a história'
    ],
    
    -- 6. Predição de Engajamento (expectativa de resultado)
    'engagement_benefits', ARRAY[
        'Demonstra competência através de evidência prática',
        'Gera identificação com pessoas enfrentando desafios similares',
        'Constrói autoridade através de casos de sucesso reais',
        'Oferece insights aplicáveis para problemas comuns'
    ],
    'viral_potential', 'Alto - casos reais geram credibilidade e inspiração',
    
    -- Observações e CTA
    'observations', 'Funciona especialmente bem quando você consegue mostrar criatividade e adaptabilidade diante de limitações aparentemente impossíveis. Demonstra competência através de casos reais.',
    'cta_text', 'Comente NEGÓCIO se você quer mais estratégias de crescimento!',
    'strategic_analysis', 'Análise personalizada para empreendedor: Use casos reais para demonstrar competência prática e construir autoridade através de resultados mensuráveis.'
)
WHERE day = 4;
