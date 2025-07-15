function desbloquear(...ramoIds) {
    // Marca el ramo como aprobado
    const ramoAprobado = event.target;
    ramoAprobado.classList.remove('bloqueado');
    ramoAprobado.classList.add('aprobado');

    // Desbloquea los ramos dependientes
    ramoIds.forEach(ramoId => {
        const ramo = document.getElementById('ramo' + ramoId);
        if (ramo) {
            ramo.classList.remove('bloqueado');
            ramo.classList.add('desbloqueado');
            ramo.onclick = () => aprobar(ramoId);  // Habilita el clic para aprobar el ramo
        }
    });
}

function aprobar(ramoId) {
    const ramo = document.getElementById('ramo' + ramoId);
    ramo.classList.add('aprobado');
    ramo.classList.remove('desbloqueado');
    ramo.onclick = null;  // Deshabilita el clic para no poder aprobar nuevamente
}
