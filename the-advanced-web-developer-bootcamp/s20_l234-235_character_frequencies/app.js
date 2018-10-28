/* global d3*/
/* jslint esnext: true */

d3.select('form')
  .on('submit', function(){
      // Get the text in the input field
      d3.event.preventDefault();
      var input = d3.select('input');
      var inText = input.property('value');

      // General update pattern

      var letters = d3.select("#letters")
                      .selectAll(".letter")
                      .data(getCharFreq(inText), (d) => d.char);
      // 1 Making changes in update selection (Data that is currently joined to the DOM)
      letters
        .classed("new",false)
      // 2 Get exit selection and remove elements that are not in the data
        .exit()
        .remove();

      // 3 Get the enter selection and make changes to the new elements
      letters
        .enter()
        .append("div")
          .classed("letter",true)
          .classed("new", true)
      // 4 Merge and apply changes for all joins
        .merge(letters)
          .style("height", (d) => `${d.freq*20}px`)
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
