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
let posX = 0, posY = 0, startX = 0, startY = 0;

const img = document.getElementById('uploadedImage');

img.addEventListener('mousedown', function(event) {
    event.preventDefault();
    startX = event.clientX - posX;
    startY = event.clientY - posY;
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
});

function onMouseMove(event) {
    posX = event.clientX - startX;
    posY = event.clientY - startY;
    updateImageTransform();
}

function onMouseUp() {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
}

document.getElementById('zoomIn').addEventListener('click', function() {
    scale += 0.1;
    updateImageTransform();
});

document.getElementById('zoomOut').addEventListener('click', function() {
    scale -= 0.1;
    updateImageTransform();
});

document.getElementById('rotateLeft').addEventListener('click', function() {
    rotation -= 15;
    updateImageTransform();
});

document.getElementById('rotateRight').addEventListener('click', function() {
    rotation += 15;
    updateImageTransform();
});

function updateImageTransform() {
    const img = document.getElementById('uploadedImage');
    img.style.transform = `translate(${posX}px, ${posY}px) scale(${scale}) rotate(${rotation}deg)`;
}