function desbloquear(...ramoIds) {
    ramoIds.forEach(ramoId => {
        const ramo = document.getElementById('ramo' + ramoId);
        if (ramo) {
            ramo.style.display = 'block';
            ramo.classList.add('desbloqueado');
            ramo.onclick = () => aprobar(ramoId);
        }
    });
}

function aprobar(ramoId) {
    const ramo = document.getElementById('ramo' + ramoId);
    ramo.classList.add('aprobado');
    ramo.classList.remove('desbloqueado');
    ramo.onclick = null;
}

