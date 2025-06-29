
-- Criar usuários que estavam faltantes na lista original

-- DANIELE PIRES - DANI PIRES
INSERT INTO public.profiles (
  user_id, 
  student_name, 
  display_name, 
  email, 
  phone, 
  instagram, 
  linkedin, 
  youtube, 
  website, 
  location
) VALUES (
  gen_random_uuid(),
  'DANIELE PIRES - DANI PIRES',
  'DANIELE PIRES - DANI PIRES',
  'danipires0703@gmail.com',
  '31971159089',
  '@danipiresanalista',
  'https://www.linkedin.com/in/dani-pires-7777b21ab/',
  'https://youtube.com/@danipiresanalista?si=sGK7pPEfOWUPt7I0',
  'https://www.instagram.com/danipiresanalista?igsh=MXF4Y3o5NWxqZ2Nycg%3D%3D&utm_source=qr',
  'Belo Horizonte, MG'
);

-- DIEGO FELIPE FOPPA
INSERT INTO public.profiles (
  user_id, 
  student_name, 
  display_name, 
  email, 
  phone, 
  instagram, 
  location
) VALUES (
  gen_random_uuid(),
  'DIEGO FELIPE FOPPA',
  'DIEGO FELIPE FOPPA',
  'diegofoppa@hotmail.com',
  '49999264036',
  '@diegofoppa.oficial',
  'Chapecó, SC'
);
