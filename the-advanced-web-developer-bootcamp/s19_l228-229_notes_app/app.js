/* global d3 */
var input = d3.select('input');

function preview(innerText){
  d3.select('.new-prev')
    .text(innerText)
    .classed("hidden", !innerText);
}

d3.select(".remove")
  .on("click", function(){
    d3.selectAll(".note")
      .remove();
  });

d3.select(".something")
  .on("click", function(){
  d3.selectAll(".note")
    .style("color", function(){
    return '#'+Math.floor(Math.random()*16777215).toString(16);
  });
});

input.on('input', function(){
  var newText = d3.event.target.value;
  preview(newText);
});

d3.select("#new-note")
    .on('submit', function() {
      d3.event.preventDefault();
      d3.select("#notes")
        .append('p')
          .classed('note', true)
          .text(input.property('value'));
      input.property('value', '');
      preview();
});
