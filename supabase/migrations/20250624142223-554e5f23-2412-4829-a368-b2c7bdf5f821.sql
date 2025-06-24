
-- Update the profile data for Ana Patricia
UPDATE profiles 
SET 
  student_name = 'ANA_PATRICIA_DE_SOUZA_VELLOSO',
  display_name = 'Ana Patricia',
  title = 'Transformando Vidas através da Terapia e Mentoria',
  subtitle = '🏥 Saúde + Transformação: Criando Impacto através do Método Próprio de Terapia Breve',
  archetype = 'health_professional',
  focus = 'Mentora de Transformação'
WHERE user_id = '4ce63888-29b0-4387-881e-f9c54e41c3dc';

-- Insert/update dashboard data for Ana Patricia
INSERT INTO user_dashboard (
  user_id,
  colors,
  platform_strategy,
  scores,
  profile_highlights,
  motivation_quote,
  strategy_text,
  instructions_text,
  context_text,
  key_data
) VALUES (
  '4ce63888-29b0-4387-881e-f9c54e41c3dc',
  '{"primary": "#27ae60", "secondary": "#2ecc71", "accent": "#2c3e50"}',
  '{"instagram": 60, "linkedin": 25, "youtube": 15, "priority": "instagram"}',
  '{"digital": 0, "speaking": 5, "mentoring": 0, "book": 0}',
  '[
    {
      "icon": "🎯",
      "title": "Seu Objetivo Principal",
      "content": "Criar Uma Mentoria de sucesso de high ticket estruturada e com alta demanda, baseada no Método que utilizo para Transformação de vidas e reconexão com a identidade."
    },
    {
      "icon": "🏥",
      "title": "Sua Expertise",
      "content": "Mais de 10 anos na área da saúde, criadora de método próprio de Terapia Breve, especialista em transformação de vidas e autoconhecimento, gestora de clínica familiar"
    },
    {
      "icon": "🏆",
      "title": "Seus Pontos Fortes",
      "content": "Posicionamento Digital (0/10 - iniciando), Experiência em Palestras (5/10), Método próprio desenvolvido, empresa de sucesso criada aos 22 anos, resiliência na pandemia"
    },
    {
      "icon": "💝",
      "title": "Sua Motivação",
      "content": "Quero ser lembrada por ter ajudado muitas pessoas a transformarem suas vidas e entenderam que elas tem este poder dentro delas. Quero ser lembrada pelo impacto que minha ação gerou nas pessoas."
    }
  ]',
  'Ana Patricia, sua jornada de superação na pandemia e seu método próprio de transformação será a base para construir uma mentoria de alto impacto que transforma vidas e inspira mulheres.',
  'Este plano foi adaptado especificamente para sua transição de terapeuta experiente para mentora digital, priorizando Instagram para educação em saúde e humanização, LinkedIn para networking médico e autoridade, e YouTube para conteúdo educativo e casos de transformação.',
  'Ana Patricia, suas atividades foram personalizadas baseadas no seu perfil de profissional da saúde com foco em transformação de vidas através do seu método próprio. Priorizamos Instagram (60%) para educação em saúde e humanização, LinkedIn (25%) para networking médico e autoridade e YouTube (15%) para conteúdo educativo e casos de transformação.',
  'Cada atividade considera sua experiência em gestão de clínica, seu método de terapia breve e seu desejo de impactar mulheres através do autoconhecimento.',
  '{"experience": "Mais de 10 anos", "segment": "Área da Saúde", "current_work": "Gestora de clínica familiar, criadora de método próprio de Terapia Breve", "major_achievements": "Empresa de sucesso criada aos 22 anos, método próprio desenvolvido, resiliência durante pandemia, especialização em PNL e Hipnose", "turning_point": "Superação na pandemia que fortaleceu sua resiliência e método de transformação", "legacy": "Ajudar muitas pessoas a transformarem suas vidas e entenderem que têm este poder dentro delas"}'
)
ON CONFLICT (user_id) DO UPDATE SET
  colors = EXCLUDED.colors,
  platform_strategy = EXCLUDED.platform_strategy,
  scores = EXCLUDED.scores,
  profile_highlights = EXCLUDED.profile_highlights,
  motivation_quote = EXCLUDED.motivation_quote,
  strategy_text = EXCLUDED.strategy_text,
  instructions_text = EXCLUDED.instructions_text,
  context_text = EXCLUDED.context_text,
  key_data = EXCLUDED.key_data;

-- Insert sample tasks for Ana Patricia
INSERT INTO user_tasks (user_id, day, title, description, time, difficulty, platform, type, completed) VALUES
('4ce63888-29b0-4387-881e-f9c54e41c3dc', 1, 'Perfil: Mentora de Transformação', 'Configure perfil destacando "Nascida para Brilhar" + "Método Próprio" + "Espelho da Coragem" + "Transformação de Vida"', '45 min', 'Fácil', 'Instagram', 'profile_setup', false),
('4ce63888-29b0-4387-881e-f9c54e41c3dc', 2, 'Story: "Espelho da Coragem"', 'Apresentação pessoal: "Sou Ana Patricia, criei método próprio de terapia breve transformadora"', '15 min', 'Médio', 'Instagram', 'content_creation', false),
('4ce63888-29b0-4387-881e-f9c54e41c3dc', 3, 'Canal: "Jornada do Autoconhecimento"', 'Configure canal focado em transformação de vida e reconexão com identidade', '60 min', 'Fácil', 'YouTube', 'channel_setup', false),
('4ce63888-29b0-4387-881e-f9c54e41c3dc', 4, 'Mapeamento de Mulheres em Transformação', 'Identifique 20 perfis de mulheres buscando autoconhecimento e transformação', '30 min', 'Fácil', 'Instagram', 'networking', false),
('4ce63888-29b0-4387-881e-f9c54e41c3dc', 5, 'Post: "O Amor Move Montanhas"', 'Primeiro post: "Como descobri força interior que não imaginava ter durante a pandemia"', '30 min', 'Fácil', 'Instagram', 'content_creation', false),
('4ce63888-29b0-4387-881e-f9c54e41c3dc', 6, 'Artigo: "Método de Terapia Breve"', 'Expertise: "Como desenvolvi método próprio de transformação e reconexão"', '20 min', 'Médio', 'LinkedIn', 'content_creation', false),
('4ce63888-29b0-4387-881e-f9c54e41c3dc', 7, 'Estrutura de Mentoria: Mulheres Corajosas', 'Defina formato: 1h/semana, temas (autoconhecimento, transformação), investimento R$2000/mês', '60 min', 'Médio', 'Geral', 'business_structure', false);
