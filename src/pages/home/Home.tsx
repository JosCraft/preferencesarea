import React from 'react';
import MainLayout from '../../templates/MainLayout';

const Home = () => {
  return (
    <MainLayout>
      <h1>Preferencias de Áreas de Informática</h1>
      <p>
        Exploración de las tendencias y preferencias entre estudiantes de ciencias de la computación, 
        enfocándonos en aspectos clave como lenguajes de programación, entornos de desarrollo, y más.
      </p>

      <section>
        <h2>Subtítulos sugeridos:</h2>
        <ul>
          <li>🖥️ **Lenguajes de programación principales**: ¿Qué lenguajes lideran las preferencias de los estudiantes?</li>
          <li>💻 **Entornos de desarrollo favoritos**: Herramientas más utilizadas para programar.</li>
          <li>📈 **Popularidad actual de los lenguajes**: Lenguajes que dominan el panorama actual.</li>
          <li>🎓 **Autodidactismo en programación**: Recursos y métodos utilizados para aprender.</li>
          <li>🧩 **Proyectos desarrollados**: Tipos de proyectos más comunes entre los programadores.</li>
          <li>🏆 **Competencias y hackatones**: Participación y lenguajes utilizados.</li>
        </ul>
      </section>

      <section>
        <h2>Objetivo del estudio</h2>
        <p>
          Analizar las preferencias, tendencias y características de los estudiantes de informática, 
          identificando factores clave que influyen en la elección de herramientas y lenguajes de programación.
        </p>
      </section>
    </MainLayout>
  );
};

export default Home;
