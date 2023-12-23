/**@type {HTMLCanvasElement} */

const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d", { willReadFrequently: true });
const refreshRate = 1000;

const updateColor = () => {
  // Draw video onto the canvas
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  // Get image data
  let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  // Extract RGB values
  let r = imageData.data[0];
  let g = imageData.data[1];
  let b = imageData.data[2];

  // Create RGB string
  let rgb = `rgb(${r}, ${g}, ${b})`;

  // Set background color using CSS variable
  let root = document.documentElement;
  root.style.setProperty("--change-color", rgb);
};

const paintToCanvas = () => {
  canvas.width = 1;
  canvas.height = 1;

  setInterval(updateColor, refreshRate);
};

const startCam = () => {
  if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      video.srcObject = stream;
      paintToCanvas();
    });
  }
};

$(document).ready(() => {
  startCam();
});

stopCam = () => {
  let stream = video.srcObject;
  let tracks = stream.getTracks();
  tracks.forEach((track) => track.stop());
  video.srcObject = null;
  let root = document.documentElement;
  root.style.setProperty("--change-color", "rgb(0, 0, 0)");
};
