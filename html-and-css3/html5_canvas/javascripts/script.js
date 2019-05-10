// Checking if browser support canvas element



var drawLogo = function(ctx){

  //Creating gradients
  var gradient = ctx.createLinearGradient(0,0,0,40);
  gradient.addColorStop(0, "#AA0000");
  gradient.addColorStop(1, "#FF0000");

  ctx.fillStyle = gradient;
  ctx.strokeStyle = gradient;
  ctx.lineWidth = 2;

  ctx.beginPath();
  ctx.moveTo(0,40);
  ctx.lineTo(30,0);
  ctx.lineTo(60,40);
  ctx.lineTo(285,40);

  ctx.stroke();
  ctx.closePath();

  ctx.font = "italic 40px 'Arial'";
  ctx.fillText("AwesomeCo", 60, 36);

  ctx.save();
  ctx.translate(20,20);
  ctx.fillRect(0,0,20,20);

  ctx.fillStyle = "#ffffff";
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 2;

  ctx.beginPath();
  ctx.moveTo(0,20);
  ctx.lineTo(10,0);
  ctx.lineTo(20,20);
  ctx.lineTo(0,20);

  ctx.fill();
  ctx.closePath();
  ctx.restore();

};

var canvas = document.getElementById('logo');

if (canvas.getContext){
  console.log("Browser supports canvas elements");
  drawLogo(canvas.getContext('2d'));
} else {
  console.log("Browser do not support canvas elements");
  // Fallback
}




