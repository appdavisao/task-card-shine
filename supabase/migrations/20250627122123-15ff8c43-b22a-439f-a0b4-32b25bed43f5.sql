
-- Replace all user_tasks with new book writing tasks
DELETE FROM user_tasks;

-- Insert new book writing tasks for all existing users
INSERT INTO user_tasks (user_id, day, title, description, platform, difficulty, time, type, completed)
SELECT 
    p.user_id,
    t.day,
    t.title,
    t.description,
    NULL as platform,
    NULL as difficulty, 
    NULL as time,
    'book_writing' as type,
    FALSE as completed
FROM profiles p
CROSS JOIN (
    VALUES 
    (1, 'Escreva mais um momento em que a dor lhe ensinou algo que nenhuma vitória ensinaria (7 a 10 linhas)', 'Como fazer? Descreva um momento real de dor que te transformou.'),
    (2, 'Defina a transformação que seu livro entrega', 'Como fazer? Escreva em 2 a 3 frases o que o leitor vai conquistar ao final da leitura.'),
    (3, 'Mapeie o leitor ideal: idade, dores, crenças e sonhos', 'Como fazer? Crie um perfil detalhado do seu público-alvo. Imagine uma pessoa específica.'),
    (4, 'Visite uma livraria, fotografe 5 capas e fontes marcantes', 'Como fazer? Vá até uma livraria física, observe capas que chamam atenção e registre com fotos e envie para o nosso time.'),
    (5, 'Leia 1 capítulo de um livro do Paulo Vieira e anote suas percepções estruturais', 'Como fazer? Escolha um livro e anote como ele começa, como prende o leitor, estilo e lições.'),
    (6, 'Preencha o Briefing do Livro completo', 'Como fazer? Use o modelo oficial e preencha título, promessa, público e tema geral.'),
    (7, 'Complete a ferramenta "3 Pilares da Sua História"', 'Como fazer? Responda cada passo da ferramenta com uma história sua real e marcante.'),
    (8, 'Estruture os 10 capítulos com nome e objetivo', 'Como fazer? Crie um roteiro do seu livro: nome de cada capítulo (mesmo que não seja definitivo) e seu papel na jornada do leitor.'),
    (9, 'Defina 2 a 3 subtemas para cada capítulo', 'Como fazer? Desdobre o conteúdo de cada capítulo em tópicos claros e práticos.'),
    (10, 'Valide a estrutura com mentor ou leitor-alvo', 'Como fazer? Apresente a estrutura e ouça o que gera dúvida, empolgação ou confusão.'),
    (11, 'Escolha 2 livros referência e anote elementos-chave', 'Como fazer? Leia com olhar analítico: abertura, títulos, estrutura, linguagem, ritmo.'),
    (12, 'Crie uma frase de 1 linha que resuma a promessa', 'Como fazer? Resuma o valor do seu livro em uma única frase poderosa e memorável.'),
    (13, 'Grave um vídeo: "Por que esse livro existe?"', 'Como fazer? Fale por 2 minutos com paixão sobre a missão por trás da sua escrita e envie na comunidade de mentores.'),
    (14, 'Pomodoro – Início do Capítulo 1 (3 blocos)', 'Como fazer? Escreva 3 blocos de 25 minutos com 5 min de pausa (busque a quantidade de linhas sugerida - 15 a 20 linhas por bloco de 25 minutos).'),
    (15, 'Pomodoro – Continuação do Capítulo 1', 'Como fazer? Continue com 3 blocos. Foque no desenvolvimento e conexão emocional.'),
    (16, 'Pomodoro – Conclusão + revisão e leitura em voz alta', 'Como fazer? Finalize o capítulo e revise lendo em voz alta. Corte o que não toca ou transforma.'),
    (17, 'Compartilhe com mentor/leitor e reescreva com base no feedback', 'Como fazer? Mostre a alguém do público-alvo e melhore com base no retorno (você pode enviar na comunidade de mentores).'),
    (18, 'Pomodoro – Capítulo 2 (3 blocos)', 'Como fazer? Escreva o capítulo inteiro em 3 sessões com foco em evolução narrativa.'),
    (19, 'Pomodoro – Revisão e ajustes do Capítulo 2', 'Como fazer? Leia em voz alta e ajuste linguagem, ritmo e clareza. Foque em transformação.'),
    (20, 'Grave vídeo: "Quem me tornei como escritor nestes 20 dias?"', 'Como fazer? Fale de forma autêntica sobre o que mudou em você após esse processo e publique nos seus stories e na comunidade.')
) AS t(day, title, description);
