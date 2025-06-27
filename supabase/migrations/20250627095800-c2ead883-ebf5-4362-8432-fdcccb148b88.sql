
-- Verificar o conteúdo do dia 2 para todos os usuários
SELECT 
  day,
  content_type,
  title,
  content_card->>'roteiro_number' as roteiro_number,
  content_card->>'format' as format,
  content_card->>'main_content' as main_content,
  COUNT(*) as user_count
FROM user_daily_content 
WHERE day = 2
GROUP BY day, content_type, title, content_card->>'roteiro_number', content_card->>'format', content_card->>'main_content'
ORDER BY user_count DESC;

-- Verificar um exemplo completo do content_card do dia 2
SELECT 
  content_card
FROM user_daily_content 
WHERE day = 2 
LIMIT 1;
