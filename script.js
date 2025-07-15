// Prerrequisitos de cada ramo (ramos que deben estar aprobados para desbloquear este)
const prerequisitos = {
  'ayt': [],
  'c1': [],
  'gg1': [],
  'qg': [],
  'al': ['ayt'],
  'c2': ['c1'],
  'mecanica': ['ayt'],
  'gg2': ['gg1'],
  'escritura': [],
  'cyo': ['c2', 'mecanica'],
  'fcoqca': ['c2'],
  'crista': ['gg1', 'qg'],
  'progra': ['al', 'gg2'],
  'ingles1': [],
  'est': ['c2'],
  'geofisica': ['gg2', 'crista'],
  'petro': ['gg2', 'crista'],
  'paleo': ['gg2'],
  'ingles2': ['ingles1'],
  'optica': ['cyo', 'crista'],
  'gqca': ['fcoqca', 'petro'],
  'estrati1': ['petro'],
  'herramientas': ['progra', 'est', 'geofisica'],
  'complementaria': [],
  'ingles3': ['ingles2'],
  'ignea': ['optica','gqca'],
  'economia': [],
  'estrati2': ['estrati1', 'paleo'], 
  'estructural': ['petro'],
  'ingles4': ['ingles3'],
  'metamorfica': ['ignea'],
  'sedimentaria': ['ignea', 'estrati2'],
  'geomorfo': ['estrati2', 'estructural'],
  'tectonica': ['geofisica', 'estructural'],
  'proyectos': ['economia'],
  'depositos': ['estructural', 'metamorfica', 'sedimentaria'],
  'campo1': ['metamorfica', 'sedimentaria', 'geomorfo'],
  'yacimientos': ['metamorfica', 'sedimentaria'],
  'seminario': ['escritura', 'ingles3', 'tectonica', 'proyectos'],
  'historica': ['tectonica'],
  'modelos': ['tectonica', 'depositos'],
  'ingenieril': ['herramientas', 'campo1'],
  'hidro': ['herramientas', 'campo1'],
  'andina': ['campo1', 'historica'],
  'electiva1': [],
  'practica': ['depositos', 'campo1', 'yacimientos', 'seminario', 'historica'],
  'campo2': ['modelos', 'ingenieril', 'hidro', 'andina'],
  'ambiental': ['seminario', 'ingenieril', 'hidro'],
  'volca': ['campo1'],
  'minas': ['proyectos', 'yacimientos', 'modelos'],
  'habprof': ['campo2', 'ambiental', 'volca', 'minas'],
  'electiva2': ['electiva1'],
  'electiva3': ['electiva1'],
};

// Funciones para guardar y cargar progreso en localStorage
function obtenerAprobados() {
  const data = localStorage.getItem('mallaAprobados');
  return data ? JSON.parse(data) : [];
}

function guardarAprobados(aprobados) {
  localStorage.setItem('mallaAprobados', JSON.stringify(aprobados));
}

// Actualiza qué ramos están desbloqueados o bloqueados según prerrequisitos
function actualizarDesbloqueos() {
  const aprobados = obtenerAprobados();

  for (const [destino, reqs] of Object.entries(prerequisitos)) {
    const elem = document.getElementById(destino);
    if (!elem) continue;

    // Verificar si se cumplen prerrequisitos
    const puedeDesbloquear = reqs.length === 0 || reqs.every(r => aprobados.includes(r));

    if (!elem.classList.contains('aprobado')) {
      if (puedeDesbloquear) {
        elem.classList.remove('bloqueado');
      } else {
        elem.classList.add('bloqueado');
      }
    } else {
      // Si está aprobado, no debe estar bloqueado
      elem.classList.remove('bloqueado');
    }
  }
}

// Maneja el clic para aprobar o desaprobar un ramo
function aprobar(e) {
  const ramo = e.currentTarget;
  if (ramo.classList.contains('bloqueado')) return;

  ramo.classList.toggle('aprobado');

  const aprobados = obtenerAprobados();
  if (ramo.classList.contains('aprobado')) {
    if (!aprobados.includes(ramo.id)) aprobados.push(ramo.id);
  } else {
    const idx = aprobados.indexOf(ramo.id);
    if (idx > -1) aprobados.splice(idx, 1);
  }
  guardarAprobados(aprobados);

  actualizarDesbloqueos();
}

// Inicialización
window.addEventListener('DOMContentLoaded', () => {
  const todosRamos = document.querySelectorAll('.ramo');

  // Cargar progreso guardado
  const aprobados = obtenerAprobados();
  todosRamos.forEach(ramo => {
    if (aprobados.includes(ramo.id)) {
      ramo.classList.add('aprobado');
    }
  });

  // Asignar eventos
  todosRamos.forEach(ramo => {
    ramo.addEventListener('click', aprobar);
  });

  // Actualizar estado inicial
  actualizarDesbloqueos();
});
