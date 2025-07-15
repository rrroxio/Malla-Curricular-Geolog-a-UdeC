// Prerrequisitos de cada ramo
const prerequisitos = {
  'ayt': [], 'c1': [], 'gg1': [], 'qg': [],
  'al': ['ayt'], 'c2': ['c1'], 'mecanica': ['ayt'], 'gg2': ['gg1'],
  'escritura': [], 'cyo': ['c2', 'mecanica'], 'fcoqca': ['c2'],
  'crista': ['gg1', 'qg'], 'progra': ['al', 'gg2'], 'ingles1': [],
  'est': ['c2'], 'geofisica': ['gg2', 'crista'], 'petro': ['gg2', 'crista'],
  'paleo': ['gg2'], 'ingles2': ['ingles1'], 'optica': ['cyo', 'crista'],
  'gqca': ['fcoqca', 'petro'], 'estrati1': ['petro'],
  'herramientas': ['progra', 'est', 'geofisica'], 'complementaria': [],
  'ingles3': ['ingles2'], 'ignea': ['optica','gqca'], 'economia': [],
  'estrati2': ['estrati1', 'paleo'], 'estructural': ['petro'],
  'ingles4': ['ingles3'], 'metamorfica': ['ignea'],
  'sedimentaria': ['ignea', 'estrati2'], 'geomorfo': ['estrati2', 'estructural'],
  'tectonica': ['geofisica', 'estructural'], 'proyectos': ['economia'],
  'depositos': ['estructural', 'metamorfica', 'sedimentaria'],
  'campo1': ['metamorfica', 'sedimentaria', 'geomorfo'],
  'yacimientos': ['metamorfica', 'sedimentaria'],
  'seminario': ['escritura', 'ingles3', 'tectonica', 'proyectos'],
  'historica': ['tectonica'], 'modelos': ['tectonica', 'depositos'],
  'ingenieril': ['herramientas', 'campo1'], 'hidro': ['herramientas', 'campo1'],
  'andina': ['campo1', 'historica'], 'electiva1': [],
  'practica': ['depositos', 'campo1', 'yacimientos', 'seminario', 'historica'],
  'campo2': ['modelos', 'ingenieril', 'hidro', 'andina'],
  'ambiental': ['seminario', 'ingenieril', 'hidro'], 'volca': ['campo1'],
  'minas': ['proyectos', 'yacimientos', 'modelos'],
  'habprof': ['campo2', 'ambiental', 'volca', 'minas'],
  'electiva2': ['electiva1'], 'electiva3': ['electiva1']
};

// Gestión del tema (modo claro/oscuro)
function toggleTheme() {
  const body = document.body;
  const isDarkMode = body.classList.toggle('dark-mode');
  localStorage.setItem('darkMode', isDarkMode);
  updateThemeButton();
}

function updateThemeButton() {
  const themeToggle = document.getElementById('theme-toggle');
  const isDarkMode = document.body.classList.contains('dark-mode');
  themeToggle.setAttribute('aria-label', isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
}

function loadThemePreference() {
  const savedTheme = localStorage.getItem('darkMode');
  if (savedTheme === 'true') {
    document.body.classList.add('dark-mode');
  }
  updateThemeButton();
}

// Gestión del progreso de la malla
const MallaManager = {
  getApprovedCourses() {
    const data = localStorage.getItem('mallaAprobados');
    return data ? JSON.parse(data) : [];
  },

  saveApprovedCourses(courses) {
    localStorage.setItem('mallaAprobados', JSON.stringify(courses));
  },

  // Función para verificar si un curso puede ser aprobado
  canApproveCourse(courseId, approvedCourses) {
    const requirements = prerequisitos[courseId] || [];
    return requirements.length === 0 || requirements.every(req => approvedCourses.includes(req));
  },

  // Función para encontrar todos los cursos que dependen de un curso específico
  getDependentCourses(courseId) {
    return Object.keys(prerequisitos).filter(id => 
      prerequisitos[id].includes(courseId)
    );
  },

  // Actualiza el estado de todos los cursos
  updateCourseStatus() {
    const approved = this.getApprovedCourses();
    
    // Primero actualizamos todos los cursos
    Object.keys(prerequisitos).forEach(courseId => {
      const element = document.getElementById(courseId);
      if (!element) return;

      const isApproved = approved.includes(courseId);
      const canUnlock = this.canApproveCourse(courseId, approved);

      if (isApproved) {
        // Si está aprobado pero ya no cumple los requisitos, lo desaprobamos
        if (!canUnlock) {
          element.classList.remove('aprobado');
          element.classList.add('bloqueado');
          // Eliminamos de la lista de aprobados
          const index = approved.indexOf(courseId);
          if (index > -1) {
            approved.splice(index, 1);
          }
          this.saveApprovedCourses(approved);
        } else {
          element.classList.remove('bloqueado');
          element.classList.add('aprobado');
        }
      } else {
        // Si no está aprobado, actualizamos su estado de bloqueo
        element.classList.toggle('bloqueado', !canUnlock);
        element.classList.remove('aprobado');
      }
    });
  },

  handleCourseClick(event) {
    const courseElement = event.currentTarget;
    if (courseElement.classList.contains('bloqueado')) return;

    const courseId = courseElement.id;
    const approvedCourses = this.getApprovedCourses();
    const courseIndex = approvedCourses.indexOf(courseId);
    
    // Verificamos si estamos aprobando o desaprobando
    const isNowApproved = !courseElement.classList.contains('aprobado');

    if (isNowApproved) {
      // Solo aprobamos si cumple con los requisitos
      if (this.canApproveCourse(courseId, approvedCourses)) {
        courseElement.classList.add('aprobado');
        approvedCourses.push(courseId);
      }
    } else {
      // Al desaprobar, necesitamos verificar cursos dependientes
      courseElement.classList.remove('aprobado');
      approvedCourses.splice(courseIndex, 1);
      
      // Encontramos y desaprobamos cursos que dependían de este
      const dependents = this.getDependentCourses(courseId);
      dependents.forEach(depId => {
        const depElement = document.getElementById(depId);
        if (depElement && depElement.classList.contains('aprobado')) {
          depElement.classList.remove('aprobado');
          const depIndex = approvedCourses.indexOf(depId);
          if (depIndex > -1) {
            approvedCourses.splice(depIndex, 1);
          }
        }
      });
    }

    this.saveApprovedCourses(approvedCourses);
    this.updateCourseStatus();
  },

  initialize() {
    // Inicializar tema
    loadThemePreference();
    document.getElementById('theme-toggle').addEventListener('click', toggleTheme);

    // Inicializar malla
    const allCourses = document.querySelectorAll('.ramo');
    const approvedCourses = this.getApprovedCourses();

    allCourses.forEach(course => {
      if (approvedCourses.includes(course.id)) {
        course.classList.add('aprobado');
      }
      course.addEventListener('click', (e) => this.handleCourseClick(e));
    });

    this.updateCourseStatus();
  }
};

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => MallaManager.initialize());
