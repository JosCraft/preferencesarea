INSERT INTO preguntas ( texto, categoria) VALUES
('¿Podrías indicar el tiempo de nivel de experiencia en programación?', 'Nivel de estudios y experiencia'),
('¿Cuántos proyectos relacionados con tu área de interés has completado en los últimos 12 meses?', 'Nivel de estudios y experiencia'),
('¿Cuáles de las siguientes áreas de la informática te interesa más?', 'Intereses en áreas específicas'),
('¿Te gustaría trabajar en investigación académica dentro de tu área de interés en informática?', 'Intereses en áreas específicas'),
('¿En los próximos 5 años, planeas especializarte en un área de la informática diferente a la que te interesa actualmente?', 'Intereses en áreas específicas'),
('¿Por qué te interesa la informática?', 'Motivos y Objetivos Profesionales'),
('¿Cuáles son tus metas?', 'Motivos y Objetivos Profesionales'),
('¿Con qué frecuencia sigues cursos o tutoriales en línea para mejorar en tu área de interés en informática?', 'Métodos de aprendizaje y recursos'),
('¿Consideras que las certificaciones profesionales son esenciales para destacar en tu área de interés en informática?', 'Métodos de aprendizaje y recursos'),
('¿Qué tan satisfecho estás con los recursos educativos disponibles para aprender sobre tu área de interés en informática?', 'Métodos de aprendizaje y recursos'),
('¿Cuáles son los principales desafíos que enfrentas al aprender programación?', 'Métodos de aprendizaje y recursos');



UPDATE tabla_respuestas
SET categoria = 
    CASE
        WHEN id IN (2, 8, 9, 10, 11, 12, 13, 14, 15, 16)THEN 'Cualitativo Nominal'
        WHEN id IN (4, 5) THEN 'Cualitativo Ordinal'
        WHEN id IN (1, 3) THEN 'Cuantitativo Discreto'
        WHEN id IN (6, 7) THEN 'Cuantitativo Continuo'
        ELSE categoria
    END
WHERE id IN (1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16);

1.Edad
2.Sexo
3.Semestre
4.Estado Civil
5.Cual es tu nivel de experiencia en programacion?
6.Podras indicar el tiempo de nivel de experiencia en programacion?
7.Cuantos proyectos relacionados con tu area de interes has completado en los ultimos 12 meses?
8.Cuales de las siguientes areas de la informatica te interesa mas?
9.Te gustaria trabajar en investigacion academica dentro de tu area de interes en informatica?
10.En los proximos 5 a?os planeas especializarte en un area de la informatica diferente a la que te interesa actualmente?
11.Por que te interesa la informatica?
12.Cuales son tus metas?
13.Con que frecuencia sigues cursos o tutoriales en linea para mejorar en tu area de interes en informatica?
14.Consideras que las certificaciones profesionales son esenciales para destacar en tu area de interes en informatica?
15.Que tan satisfecho estas con los recursos educativos disponibles para aprender sobre tu area de interes en informatica?
16.Cuales son los principales desafios que enfrentas al aprender programacion?