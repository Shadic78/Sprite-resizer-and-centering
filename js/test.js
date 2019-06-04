let img;
let xImgOriginal;
let yImgOriginal;

function setup() {
  createCanvas(640, 480);
  input = createFileInput(handleFile);
  input.position(0, 0);
}

function draw() {
  clear();
  imprimirImagen();
}

function imprimirImagen() {
  if (img) {
    image(img, xImgOriginal, yImgOriginal);
  }
}

function handleFile(file) {
  print(file);
  if (file.type === 'image') {
    img = createImg(file.data);
    img.hide();
    xImgOriginal = Math.floor(((windowWidth / 2) - img.width) / 2);
    yImgOriginal = Math.floor((windowHeight - img.height) / 2);
  } else {
    img = null;
  }
}
