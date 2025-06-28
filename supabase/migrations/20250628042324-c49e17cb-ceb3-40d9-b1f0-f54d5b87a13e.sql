
-- Corrigir "Cópia" para "Copia" em todos os registros do dia 2 (Roteiro 180)
UPDATE user_daily_content 
SET title = REPLACE(title, 'Cópia', 'Copia'),
    content_card = jsonb_set(
      content_card,
      '{title}',
      to_jsonb(REPLACE(content_card->>'title', 'Cópia', 'Copia'))
    )
WHERE day = 2 AND content_card->>'roteiro_number' = '180';

-- Corrigir também no template base
UPDATE content_templates 
SET title = REPLACE(title, 'Cópia', 'Copia'),
    content_structure = jsonb_set(
      content_structure,
      '{main_content}',
      to_jsonb(REPLACE(content_structure->>'main_content', 'Cópia', 'Copia'))
    )
WHERE roteiro_number = 180;

-- Verificar e corrigir outros campos que possam conter "Cópia"
UPDATE user_daily_content 
SET content_card = jsonb_set(
  content_card,
  '{format}',
  to_jsonb(REPLACE(content_card->>'format', 'Cópia', 'Copia'))
)
WHERE day = 2 AND content_card->>'format' LIKE '%Cópia%';

-- Corrigir em observações se existir
UPDATE user_daily_content 
SET content_card = jsonb_set(
  content_card,
  '{observations}',
  to_jsonb(REPLACE(content_card->>'observations', 'Cópia', 'Copia'))
)
WHERE day = 2 AND content_card->>'observations' LIKE '%Cópia%';

-- Atualizar updated_at para forçar refresh
UPDATE user_daily_content 
SET updated_at = now()
WHERE day = 2 AND content_card->>'roteiro_number' = '180';
