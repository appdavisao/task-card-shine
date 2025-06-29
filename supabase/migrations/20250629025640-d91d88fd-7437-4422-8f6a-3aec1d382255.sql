
-- Update Elisabete's dashboard data with personalized texts to match other users' patterns
UPDATE user_dashboard 
SET 
  strategy_text = 'Este plano foi desenvolvido especificamente para você, que possui uma trajetória empresarial sólida e experiência comprovada em desenvolvimento humano. Considerando sua expertise em transformação pessoal e seu histórico como palestrante, este guia focará em consolidar sua autoridade digital e expandir seu impacto através de conteúdo estratégico que ressoa com mulheres empreendedoras em busca de superação.',
  instructions_text = 'Cada semana foi estruturada pensando em sua experiência como empresária e especialista em desenvolvimento humano. Use suas vivências reais de superação como base para criar conteúdos autênticos. Aplique as estratégias considerando seu público-alvo de mulheres empreendedoras e utilize sua experiência em palestras para adaptar o tom e a linguagem. Documente seus resultados e ajuste as abordagens conforme sua audiência responde.',
  context_text = 'sua experiência como empresária de sucesso há mais de 10 anos, especialização em desenvolvimento humano, trajetória de superação pessoal inspiradora e atuação como palestrante profissional',
  motivation_quote = 'Elisabete, sua jornada de superação e expertise em desenvolvimento humano são a base perfeita para construir uma autoridade digital que transforma vidas de mulheres empreendedoras. 💙',
  updated_at = now()
WHERE user_id = (
  SELECT user_id 
  FROM profiles 
  WHERE student_name ILIKE '%elisabete%' OR display_name ILIKE '%elisabete%'
  LIMIT 1
);
