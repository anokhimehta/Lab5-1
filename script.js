// script.js

const img = new Image(); // used to load image from <input> and draw to canvas
const canvas = document.getElementById("user-image");
const ctx = canvas.getContext('2d');

//buttons
const generate = document.querySelector("[type='submit']")
const clear = document.querySelector("[type='reset']")
const readText = document.querySelector("[type='button']")

// Fires whenever the img object loads a new image (such as with img.src =)
img.addEventListener('load', () => {
  //clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  //fill canvas
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  //toggle buttons
  generate.disabled = false;
  clear.disabled = true;
  readText.disabled = true;

  //draw image
  const dimensions = getDimmensions(canvas.width, canvas.height, img.width, img.height)
  ctx.drawImage(img, dimensions.startX, dimensions.startY, dimensions.width, dimensions.height);

});

//input image-input
const imageInput = document.getElementById("image-input")
imageInput.addEventListener('change', (event) => {
    img.src = URL.createObjectURL(imageInput.files[0])
    img.alt = imageInput.files[0].name
});

//form: submit
const form = document.getElementById("generate-meme") 
form.addEventListener("submit", (event) => {
  //top and bottom texts
  const textTop = document.getElementById("text-top").value;
  const textBottom = document.getElementById("text-bottom").value;

  console.log(topText);
  console.log(bottomText);
  ctx.font = "30px Arial";
  ctx.fillStyle = "white";
  ctx.textAlign = "center";

  ctx.fillText(textTop.toUpperCase(), canvas.width/2, 50);
  ctx.strokeText(textBottom.toUpperCase(), canvas.width/2, canvas.height - 20);

  ctx.strokeText(textTop.toUpperCase(), canvas.width/2, 50);
  ctx.fillText(textBottom.toUpperCase(), canvas.width/2, canvas.height - 20);

  //toggle buttons
  generate.disabled = true;
  clear.disabled = false;
  readText.disabled = false;  

  event.preventDefault();
})

//button clear
clear.addEventListener("click", () => {
  ctx.clearRect(0,0,canvas.width, canvas.height)

  //toggle buttons
  read.disabled = true;
  clear.disabled = true;
  generate.disabled = false;
})

/**
 * Takes in the dimensions of the canvas and the new image, then calculates the new
 * dimensions of the image so that it fits perfectly into the Canvas and maintains aspect ratio
 * @param {number} canvasWidth Width of the canvas element to insert image into
 * @param {number} canvasHeight Height of the canvas element to insert image into
 * @param {number} imageWidth Width of the new user submitted image
 * @param {number} imageHeight Height of the new user submitted image
 * @returns {Object} An object containing four properties: The newly calculated width and height,
 * and also the starting X and starting Y coordinate to be used when you draw the new image to the
 * Canvas. These coordinates align with the top left of the image.
 */
function getDimmensions(canvasWidth, canvasHeight, imageWidth, imageHeight) {
  let aspectRatio, height, width, startX, startY;

  // Get the aspect ratio, used so the picture always fits inside the canvas
  aspectRatio = imageWidth / imageHeight;

  // If the apsect ratio is less than 1 it's a verical image
  if (aspectRatio < 1) {
    // Height is the max possible given the canvas
    height = canvasHeight;
    // Width is then proportional given the height and aspect ratio
    width = canvasHeight * aspectRatio;
    // Start the Y at the top since it's max height, but center the width
    startY = 0;
    startX = (canvasWidth - width) / 2;
    // This is for horizontal images now
  } else {
    // Width is the maximum width possible given the canvas
    width = canvasWidth;
    // Height is then proportional given the width and aspect ratio
    height = canvasWidth / aspectRatio;
    // Start the X at the very left since it's max width, but center the height
    startX = 0;
    startY = (canvasHeight - height) / 2;
  }

  return { 'width': width, 'height': height, 'startX': startX, 'startY': startY }
}