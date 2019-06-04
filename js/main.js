let img;
let imgModificada;
let inputImg;
let saveBtn;
let imprimir = false;
let xImg = 100;
let yImg = 100;
let inputAncho;
let inputAlto;

// Coordenadas de los inputs
let xInputs = 10;
let yInputs = 10;

// Coordenadas de la imagen original
let xImgOriginal = 0;
let yImgOriginal = 0;
let desfaceX = 0;
let desfaceY = 0;

// Coordenadas de la imagen modificada
let xImgModificada = 0;
let yImgModificada = 0;
let anchoImgModificada = 0;
let altoImgModificada = 0;

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.style('display', 'block');

  inputAncho = createInput();
  inputAncho.attribute('placeholder', 'Ingresa el ancho');
  inputAncho.position(xInputs, yInputs);

  inputAlto = createInput();
  inputAlto.attribute('placeholder', 'Ingresa el alto');
  inputAlto.position(inputAncho.x + inputAncho.width + 10, inputAncho.y);

  inputImg = createFileInput(cargarImg);
  inputImg.position(inputAncho.x, inputAncho.y + inputAncho.height + 10);

  saveBtn = createButton('Guardar imagen');
  saveBtn.position(inputImg.x + inputImg.width + 10, inputImg.y);
  saveBtn.mousePressed(guardarImagen);

  textAlign(CENTER);
  textSize(22);
  strokeWeight(1);
  stroke(0);
  noFill();
}

function draw() {
  clear();
  imprimirImg();
}

function cargarImg(file) {
  if (file.type === 'image') {
    img = createImg(file.data);
    imgModificada = createImg(file.data);
    img.hide();
    imgModificada.hide();

    altoImgModificada = parseInt(inputAlto.value());
    anchoImgModificada = parseInt(inputAncho.value());

    imprimir = true;
  }
  else {
    img = null;
  }
}

function calcularCoordenadas() {
  /* Imagen original */
  xImgOriginal = Math.floor(((windowWidth / 2) - img.width) / 2);
  yImgOriginal = Math.floor((windowHeight - img.height) / 2);

  /*  Imagen modificada */
  xImgModificada = Math.floor((windowWidth / 2) + ((windowWidth / 2) - anchoImgModificada) / 2);
  yImgModificada = Math.floor((windowHeight - altoImgModificada) / 2);
  desfaceX = Math.floor((anchoImgModificada - imgModificada.width) / 2);
  desfaceY = Math.floor((altoImgModificada - imgModificada.height) / 2);
}

function imprimirImg() {
  if(img && imprimir) {
    calcularCoordenadas();
    stroke(0);
    noFill();
    /* Imagen original */
    rect(xImgOriginal, yImgOriginal, img.width + 1, img.height + 1);
    image(img, xImgOriginal + 1, yImgOriginal + 1);

    /*  Imagen modificada */
    rect(xImgModificada, yImgModificada, anchoImgModificada + 2, altoImgModificada + 2);
    image(imgModificada, xImgModificada + desfaceX + 2, yImgModificada + desfaceY + 2);

    fill(0);
    noStroke();
    text("Imagen original", windowWidth / 4, windowHeight - 80);
    text("Imagen modificada", (windowWidth / 4) + (windowWidth / 2), windowHeight - 80);

    //imprimir = false;
  }
}

function guardarImagen() {
  let imgGuardar = get(xImgModificada + 2, yImgModificada + 2, anchoImgModificada, altoImgModificada);
  //image(imgGuardar, 20, 250);
  imgGuardar.save('img', 'png');
}
