
-- Listar todos os usuários que ainda estão como "Usuário"
SELECT 
  id,
  user_id,
  email,
  student_name,
  display_name,
  created_at
FROM public.profiles 
WHERE student_name = 'Usuário' OR display_name = 'Usuário'
ORDER BY email;

-- Verificar especificamente se há algum Ricardo
SELECT 
  id,
  user_id,
  email,
  student_name,
  display_name,
  created_at
FROM public.profiles 
WHERE (student_name ILIKE '%ricardo%' OR display_name ILIKE '%ricardo%' OR email ILIKE '%ricardo%')
ORDER BY created_at;

-- Contar total de usuários ainda como "Usuário"
SELECT 
  COUNT(*) as total_usuarios_ainda_como_usuario
FROM public.profiles 
WHERE student_name = 'Usuário' OR display_name = 'Usuário';
