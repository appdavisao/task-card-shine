
-- Adicionar campos de contato na tabela profiles
ALTER TABLE public.profiles 
ADD COLUMN email TEXT,
ADD COLUMN phone TEXT,
ADD COLUMN instagram TEXT,
ADD COLUMN linkedin TEXT,
ADD COLUMN youtube TEXT,
ADD COLUMN website TEXT,
ADD COLUMN tiktok TEXT,
ADD COLUMN facebook TEXT,
ADD COLUMN location TEXT;

-- Migrar emails dos campos student_name/display_name para o campo email correto
UPDATE public.profiles 
SET email = CASE 
  WHEN student_name LIKE '%@%' THEN student_name
  WHEN display_name LIKE '%@%' THEN display_name
  ELSE NULL
END
WHERE student_name LIKE '%@%' OR display_name LIKE '%@%';

-- Limpar emails dos campos de nome onde foram migrados
UPDATE public.profiles 
SET 
  student_name = CASE 
    WHEN student_name LIKE '%@%' THEN 'Usuário'
    ELSE student_name
  END,
  display_name = CASE 
    WHEN display_name LIKE '%@%' THEN 'Usuário'
    ELSE display_name
  END
WHERE student_name LIKE '%@%' OR display_name LIKE '%@%';

-- Verificar a migração
SELECT 
  COUNT(*) as total_profiles,
  COUNT(email) as profiles_with_email,
  COUNT(CASE WHEN student_name LIKE '%@%' THEN 1 END) as remaining_emails_in_student_name,
  COUNT(CASE WHEN display_name LIKE '%@%' THEN 1 END) as remaining_emails_in_display_name
FROM public.profiles;
