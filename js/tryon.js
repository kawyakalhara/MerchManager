const video = document.getElementById('webcam');
const overlay = document.getElementById('overlay-img');

// Access Webcam
async function startCamera() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
    } catch (err) {
        console.error("Error accessing webcam: ", err);
    }
}

function changeTryOnItem(imagePath) {
    overlay.src = imagePath;
}

startCamera();