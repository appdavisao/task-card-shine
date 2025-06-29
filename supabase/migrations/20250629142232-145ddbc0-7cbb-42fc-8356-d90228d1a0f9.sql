
-- Standardize Week 1 content titles for all students to use the framework pattern
UPDATE user_daily_content 
SET 
  title = CASE 
    WHEN day = 1 THEN 'Eu acabei de [verbo] [situação negativa]'
    WHEN day = 2 THEN 'Copia só não faz igual'
    WHEN day = 3 THEN 'Manias de profissionais famosos'
    WHEN day = 4 THEN 'Me pediu tal coisa e eu fiz desse jeito'
    WHEN day = 5 THEN 'Conteúdo para Dia 5'
    WHEN day = 6 THEN 'Desafie a sua audiência a perceber algum detalhe contraintuitivo'
    WHEN day = 7 THEN 'Tipos de pessoas do seu nicho'
  END,
  content_card = jsonb_set(
    content_card,
    '{title}',
    to_jsonb(CASE 
      WHEN day = 1 THEN 'Eu acabei de [verbo] [situação negativa]'
      WHEN day = 2 THEN 'Copia só não faz igual'
      WHEN day = 3 THEN 'Manias de profissionais famosos'
      WHEN day = 4 THEN 'Me pediu tal coisa e eu fiz desse jeito'
      WHEN day = 5 THEN 'Conteúdo para Dia 5'
      WHEN day = 6 THEN 'Desafie a sua audiência a perceber algum detalhe contraintuitivo'
      WHEN day = 7 THEN 'Tipos de pessoas do seu nicho'
    END)
  ),
  updated_at = now()
WHERE day BETWEEN 1 AND 7;

-- Verify the update by counting affected rows
SELECT day, COUNT(*) as updated_count, 
       STRING_AGG(DISTINCT title, ' | ') as titles
FROM user_daily_content 
WHERE day BETWEEN 1 AND 7 
GROUP BY day 
ORDER BY day;
