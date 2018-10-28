document.addEventListener('DOMContentLoaded', function() {
  var minYear = birthData[0].year;
  var maxYear = birthData[birthData.length - 1].year;

  var width = 600;
  var height = 600;
  var numBars = 12;
  var barPadding = 5;
  var barWidth = width/numBars - barPadding;

  d3.select("input")
      .property("min", minYear)
      .property("max", maxYear)
      .property("value", minYear);

  d3.select("svg")
      .attr("width", width)
      .attr("height", height)
    .selectAll("rect")
    .data(birthData.filter((d) => d.year === minYear))
    .enter()
    .append("rect")
      .attr("width", barWidth)
      .attr("height", (d) =>  d.births / 2.5e6 * height)
      .attr("y", (d) => height - d.births / 2.5e6 * height)
      .attr("x", (d, i) => (barWidth + barPadding) * i)
      .attr("fill", "turquoise");

  d3.select("input")
      .on("input", function(){
        var year = +d3.event.target.value; //Adding the + symbol converts the string to a number
        d3.selectAll("rect")
            .data(birthData.filter((d) => d.year === year))
              .attr("height", (d) =>  d.births / 2.5e6 * height)
              .attr("y", (d) => height - d.births / 2.5e6 * height);
      });
});
