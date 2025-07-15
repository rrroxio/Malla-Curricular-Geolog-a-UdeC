// Datos completos de la malla curricular (extraídos del PDF)
const mallaData = [
  // Semestre 1
  {
    semestre: 1,
    asignaturas: [
      { nombre: "Álgebra y Trigonometría", prerrequisitos: [] },
      { nombre: "Cálculo I", prerrequisitos: [] },
      { nombre: "Geología General I", prerrequisitos: [] },
      { nombre: "Química General", prerrequisitos: [] }
    ]
  },
  // Semestre 2
  {
    semestre: 2,
    asignaturas: [
      { nombre: "Álgebra Lineal", prerrequisitos: ["Álgebra y Trigonometría"] },
      { nombre: "Cálculo II", prerrequisitos: ["Cálculo I"] },
      { nombre: "Fundamentos de Mecánica", prerrequisitos: ["Álgebra y Trigonometría"] },
      { nombre: "Geología General II", prerrequisitos: ["Geología General I"] },
      { nombre: "Introducción a la escritura académica", prerrequisitos: [] }
    ]
  },
  // Semestre 3
  {
    semestre: 3,
    asignaturas: [
      { nombre: "Campos y Ondas", prerrequisitos: ["Cálculo II", "Fundamentos de Mecánica"] },
      { nombre: "Fisicoquímica", prerrequisitos: ["Cálculo II"] },
      { nombre: "Cristalografía y Mineralogía", prerrequisitos: ["Geología General I", "Química General"] },
      { nombre: "Programación", prerrequisitos: ["Álgebra Lineal", "Geología General II"] },
      { nombre: "Inglés Comunicativo 1 Nivel Básico", prerrequisitos: [] }
    ]
  },
  // Semestre 4
  {
    semestre: 4,
    asignaturas: [
      { nombre: "Estadística", prerrequisitos: ["Cálculo II"] },
      { nombre: "Geofísica", prerrequisitos: ["Geología General II", "Campos y Ondas"] },
      { nombre: "Petrografía macroscópica", prerrequisitos: ["Geología General II", "Cristalografía y Mineralogía"] },
      { nombre: "Paleontología", prerrequisitos: ["Geología General II"] },
      { nombre: "Inglés Comunicativo 2 Nivel Básico Alto", prerrequisitos: ["Inglés Comunicativo 1 Nivel Básico"] }
    ]
  },
  // Semestre 5
  {
    semestre: 5,
    asignaturas: [
      { nombre: "Mineralogía Óptica", prerrequisitos: ["Campos y Ondas", "Cristalografía y Mineralogía"] },
      { nombre: "Geoquímica", prerrequisitos: ["Fisicoquímica", "Petrografía Macroscópica"] },
      { nombre: "Estratigrafía y Ambientes Sedimentarios Continentales", prerrequisitos: ["Petrografía Macroscópica"] },
      { nombre: "Herramientas Matemáticas en Geología", prerrequisitos: ["Programación", "Estadística", "Geofísica"] },
      { nombre: "Complementaria 1", prerrequisitos: [] },
      { nombre: "Inglés Comunicativo 3 Nivel Preintermedio", prerrequisitos: ["Inglés Comunicativo 2 Nivel Básico Alto"] }
    ]
  },
  // Semestre 6
  {
    semestre: 6,
    asignaturas: [
      { nombre: "Petrografía y Petrología Ígnea", prerrequisitos: ["Mineralogía Óptica", "Geoquímica"] },
      { nombre: "Economía", prerrequisitos: [] },
      { nombre: "Estratigrafía y Ambientes Sedimentarios Marinos", prerrequisitos: ["Paleontología", "Estratigrafía y Ambientes Sedimentarios Continentales"] },
      { nombre: "Geología Estructural", prerrequisitos: ["Petrografía Macroscópica"] },
      { nombre: "Inglés Comunicativo 4 Nivel Intermedio", prerrequisitos: ["Inglés Comunicativo 3 Nivel Preintermedio"] }
    ]
  },
  // Semestre 7
  {
    semestre: 7,
    asignaturas: [
      { nombre: "Petrografía y Petrología Metamórfica", prerrequisitos: ["Petrografía y Petrología Ígnea"] },
      { nombre: "Petrografía y Petrología Sedimentaria", prerrequisitos: ["Petrografía y Petrología Ígnea", "Estratigrafía y Ambientes Sedimentarios Marinos"] },
      { nombre: "Geomorfología", prerrequisitos: ["Estratigrafía y Ambientes Sedimentarios Marinos", "Geología Estructural"] },
      { nombre: "Geotectónica", prerrequisitos: ["Geofísica", "Geología Estructural"] },
      { nombre: "Evaluación y Gestión de Proyectos", prerrequisitos: ["Economía"] }
    ]
  },
  // Semestre 8
  {
    semestre: 8,
    asignaturas: [
      { nombre: "Depósitos Minerales", prerrequisitos: ["Geología Estructural", "Petrografía y Petrología Metamórfica", "Petrografía y Petrología Sedimentaria"] },
      { nombre: "Geología de Campo 1: Práctica Inicial", prerrequisitos: ["Petrografía y Petrología Metamórfica", "Petrografía y Petrología Sedimentaria", "Geomorfología"] },
      { nombre: "Yacimientos No-Metálicos y Recursos Energéticos", prerrequisitos: ["Petrografía y Petrología Metamórfica", "Petrografía y Petrología Sedimentaria"] },
      { nombre: "Seminario de Investigación", prerrequisitos: ["Introducción a la escritura académica", "Inglés Comunicativo 3 Nivel Preintermedio", "Geotectónica", "Evaluación y Gestión de Proyectos"] },
      { nombre: "Geología Histórica", prerrequisitos: ["Geotectónica"] }
    ]
  },
  // Semestre 9
  {
    semestre: 9,
    asignaturas: [
      { nombre: "Modelos Geológicos de Yacimientos", prerrequisitos: ["Geotectónica", "Depósitos Minerales"] },
      { nombre: "Geología Ingenieril", prerrequisitos: ["Herramientas Matemáticas en Geología", "Geología de Campo 1: Práctica Inicial"] },
      { nombre: "Hidrogeología", prerrequisitos: ["Herramientas Matemáticas en Geología", "Geología de Campo 1: Práctica Inicial"] },
      { nombre: "Geología Andina", prerrequisitos: ["Geología de Campo 1: Práctica Inicial", "Geología Histórica"] },
      { nombre: "Electiva 1", prerrequisitos: [] },
      { nombre: "Práctica Profesional", prerrequisitos: ["Todos los ramos de semestre 1, 2, 3, 4, 5, 6, 7 y 8"] }
    ]
  },
  // Semestre 10
  {
    semestre: 10,
    asignaturas: [
      { nombre: "Geología de Campo 2: Práctica Intermedia", prerrequisitos: ["Modelos Geológicos de Yacimientos", "Geología Ingenieril", "Hidrogeología", "Geología Andina"] },
      { nombre: "Geología Ambiental", prerrequisitos: ["Seminario de Investigación", "Geología Ingenieril", "Hidrogeología"] },
      { nombre: "Volcanología", prerrequisitos: ["Geología de Campo 1: Práctica Inicial"] },
      { nombre: "Geología de Minas y Exploración Minera", prerrequisitos: ["Evaluación y Gestión de Proyectos", "Yacimientos No-Metálicos y Recursos Energéticos", "Modelos Geológicos de Yacimientos"] }
    ]
  },
  // Semestre 11
  {
    semestre: 11,
    asignaturas: [
      { nombre: "Habilitación Profesional", prerrequisitos: ["Geología de Campo 2: Práctica Intermedia", "Geología Ambiental", "Volcanología", "Geología de Minas y Exploración Minera"] },
      { nombre: "Electiva 2", prerrequisitos: [] },
      { nombre: "Electiva 3", prerrequisitos: [] }
    ]
  }
];

// Variables globales
const asignaturasAprobadas = new Set();

// Función para renderizar la malla
function renderMalla() {
  const mallaContainer = document.getElementById('malla-container');
  mallaContainer.innerHTML = '';

  mallaData.forEach(semestre => {
    const semestreDiv = document.createElement('div');
    semestreDiv.className = 'semestre';
    semestreDiv.innerHTML = `<h2>Semestre ${semestre.semestre}</h2>`;
    
    semestre.asignaturas.forEach(asig => {
      const asigDiv = document.createElement('div');
      const aprobada = asignaturasAprobadas.has(asig.nombre);
      const bloqueada = asig.prerrequisitos.length > 0 && 
                        !asig.prerrequisitos.every(req => asignaturasAprobadas.has(req));
      
      asigDiv.className = `asignatura ${aprobada ? 'aprobada' : ''} ${bloqueada ? 'bloqueada' : ''}`;
      asigDiv.textContent = asig.nombre;
      
      if (asig.prerrequisitos.length > 0) {
        const prereqDiv = document.createElement('div');
        prereqDiv.className = 'prerrequisitos';
        prereqDiv.textContent = `Prerrequisitos: ${asig.prerrequisitos.join(', ')}`;
        asigDiv.appendChild(prereqDiv);
      }
      
      if (!aprobada && !bloqueada) {
        asigDiv.addEventListener('click', () => marcarAprobada(asig.nombre));
      }
      
      semestreDiv.appendChild(asigDiv);
    });
    
    mallaContainer.appendChild(semestreDiv);
  });
}

// Función para marcar una asignatura como aprobada
function marcarAprobada(nombreAsignatura) {
  asignaturasAprobadas.add(nombreAsignatura);
  renderMalla();
}

// Inicializar la malla al cargar la página
document.addEventListener('DOMContentLoaded', renderMalla);
