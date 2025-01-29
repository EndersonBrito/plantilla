document.getElementById("upload-button").addEventListener("click", function() {
    document.getElementById("imageUpload").click();
});

document.getElementById('imageUpload').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = document.getElementById('uploadedImage');
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

document.getElementById('frameShape').addEventListener('change', function(event) {
    const frame = document.getElementById('imageFrame');
    frame.className = 'frame ' + event.target.value;
});

let scale = 1;
let rotation = 0;
let posX = 0, posY = 0;
let isDragging = false;

const img = document.getElementById('uploadedImage');

// Función para manejar el inicio del arrastre (táctil y ratón)
function startDrag(event) {
    event.preventDefault();
    isDragging = true;

    // Obtener la posición inicial del toque o clic
    if (event.type === 'touchstart') {
        startX = event.touches[0].clientX - posX;
        startY = event.touches[0].clientY - posY;
    } else {
        startX = event.clientX - posX;
        startY = event.clientY - posY;
    }

    // Agregar eventos de movimiento y fin de arrastre
    document.addEventListener('mousemove', onDragMove);
    document.addEventListener('mouseup', endDrag);
    document.addEventListener('touchmove', onDragMove, { passive: false });
    document.addEventListener('touchend', endDrag);
}

// Función para manejar el movimiento durante el arrastre (táctil y ratón)
function onDragMove(event) {
    if (!isDragging) return;

    event.preventDefault();

    // Obtener la posición actual (táctil o ratón)
    let clientX, clientY;
    if (event.type === 'touchmove') {
        clientX = event.touches[0].clientX;
        clientY = event.touches[0].clientY;
    } else {
        clientX = event.clientX;
        clientY = event.clientY;
    }

    // Calcular la nueva posición
    posX = clientX - startX;
    posY = clientY - startY;

    // Actualizar la posición de la imagen
    updateImageTransform();
}

// Función para manejar el fin del arrastre (táctil y ratón)
function endDrag() {
    isDragging = false;

    // Eliminar eventos de movimiento y fin de arrastre
    document.removeEventListener('mousemove', onDragMove);
    document.removeEventListener('mouseup', endDrag);
    document.removeEventListener('touchmove', onDragMove);
    document.removeEventListener('touchend', endDrag);
}

// Agregar eventos de inicio de arrastre (táctil y ratón)
img.addEventListener('mousedown', startDrag);
img.addEventListener('touchstart', startDrag, { passive: false });

document.getElementById('zoomIn').addEventListener('click', function() {
    scale += 0.1;
    updateImageTransform();
});

document.getElementById('zoomOut').addEventListener('click', function() {
    scale -= 0.1;
    updateImageTransform();
});

document.getElementById('rotateLeft').addEventListener('click', function() {
    rotation -= 22.5;
    updateImageTransform();
});

document.getElementById('rotateRight').addEventListener('click', function() {
    rotation += 22.5;
    updateImageTransform();
});

function updateImageTransform() {
    img.style.transform = `translate(${posX}px, ${posY}px) scale(${scale}) rotate(${rotation}deg)`;
}