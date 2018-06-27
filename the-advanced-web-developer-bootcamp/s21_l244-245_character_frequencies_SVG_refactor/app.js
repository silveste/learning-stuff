/* global d3*/
/* jslint esnext: true */
var svgWidth = 800;
var svgHeight = 400;
var colPadding = 5;
var svg = d3.select("#letters")
              .attr("width", svgWidth)
              .attr("height", svgHeight);

d3.select('form')
  .on('submit', function(){
      // Get the text in the input field
      d3.event.preventDefault();
      var input = d3.select('input');
      var inText = input.property('value');
      var data = getCharFreq(inText);
      var freqs = data.map((val) => val.freq );
      // normaliseWidth gives us the width of each column
      var normaliseWidth = svgWidth / data.length - colPadding;
      // textspace is the font size of the character that is rendered at the bottom of the column (20% of the column width)
      var textSpace = normaliseWidth/5;
      // normaliseHeight gives the height value per frequency unit for the column
      var normaliseHeight = (svgHeight - textSpace) / Math.max(...freqs);


      // General update pattern

      var letters = svg
                      .selectAll(".letter")
                      .data(data, (d) => d.char);
      // 1 Making changes in update selection (Data that is currently joined to the DOM)
      letters
          .classed("new", false)
      // 2 Get exit selection and remove elements that are not in the data
        .exit()
        .remove();

      // 3 Get the enter selection and make changes to the new elements
      var letterGroup = letters
        .enter()
        .append("g")
          .classed("new", true)
          .classed("letter", true);
      letterGroup.append("rect");
      letterGroup.append("text");
      // 4 Merge and apply changes for all joins
      letterGroup.merge(letters)
        .select("rect")
          .style("height", (d) => d.freq*normaliseHeight + textSpace) //Adding textspace to have space for the letters at the bottom
          .style("width", normaliseWidth)
          .attr("y", (d) => svgHeight - d.freq*normaliseHeight)
          .attr("x", (d, i) => (normaliseWidth + colPadding) * i );

      letterGroup.merge(letters)
        .select("text")
          .attr("y", svgHeight - 3 )
          .attr("x", (d, i) => (normaliseWidth + colPadding) * i + normaliseWidth/2)
          .attr("text-anchor", "middle")
          .style("font-size", textSpace + "px")
          .text((d) => d.char);

      // Remove input text
      input.property('value', "");

      // Headline
      d3.select("#phrase")
        .text(inText);

      // Count
      d3.select('#count')
        .text(`New characters: ${letters.enter().nodes().length}`);
});

d3.select("#reset")
  .on("click", function(){
    d3.selectAll(".letter")
      .remove();

    d3.select("#phrase")
      .text("");

    d3.select("#count")
      .text("");
});


// returns an array with the characters and frequencies
function getCharFreq(str){

  //Split string into array
  var chars = str.split("");

  //Create a set to remove duplicates
  var s = new Set(chars);

  //Get the frequencies
  var freqs = chars.reduce(function(acc, val){
      if (acc[val]) {
        acc[val] += 1;
      } else {
        acc[val] = 1;
      }
      return acc;
    }, {});

  //create array of objects with chars and frequencies
  var result = [];
  for (let char of s){
    result.push({ char: char, freq: freqs[char]});
  }
  return result;
}
