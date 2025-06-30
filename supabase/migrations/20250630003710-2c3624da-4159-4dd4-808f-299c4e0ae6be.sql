
-- Primeiro, vamos verificar os dados atuais para entender a situação
SELECT 
  id,
  user_id,
  email,
  student_name,
  display_name,
  created_at
FROM public.profiles 
WHERE student_name = 'Usuário' OR display_name = 'Usuário'
ORDER BY created_at;

-- Vamos também verificar se há registros duplicados ou com nomes corretos para os mesmos emails
SELECT 
  email,
  COUNT(*) as count,
  array_agg(student_name) as names,
  array_agg(id) as profile_ids
FROM public.profiles 
GROUP BY email 
HAVING COUNT(*) > 1 OR array_agg(student_name) @> ARRAY['Usuário'];

-- Verificar todos os perfis para entender a estrutura atual
SELECT 
  id,
  user_id,
  email,
  student_name,
  display_name,
  phone,
  instagram
FROM public.profiles 
ORDER BY email;
