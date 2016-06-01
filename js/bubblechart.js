var margin = {top: 40, right: 40, bottom: 40, left: 40},
width = 1100 - margin.left - margin.right,
height = 500 - margin.top - margin.bottom;

// add the graph canvas to the body of the webpage
var svg = d3.select(".bubble-chart-holder").append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var dot, xmap, ymap, cValue, xScale, yScale, cScale, tooltip, xAxis, yAxis, xValue, yValue, cValue;

var CreateBubbleChart = function() {

  var data = getBubbleData();

  // setup x
  xValue = function(d) { return d.water;}; // data -> value
  xScale = d3.scale.linear().range([0, width]); // value -> display
  xAxis = d3.svg.axis().scale(xScale).orient("bottom");

  // setup y
  yValue = function(d) { return d.malnourished -5 }; // data -> value
  yScale = d3.scale.linear().range([height, 0]); // value -> display
  yAxis = d3.svg.axis().scale(yScale).orient("left");

  // setup fill color
  cValue = function(d) { return d.mortality;};
  cScale = d3.scale.linear();


  // add the tooltip area to the webpage
  tooltip = d3.select(".bubble-chart-holder").append("div")
  .attr("class", "tooltip")
  .style("opacity", 0);

  // don't want dots overlapping axis, so add in buffer to data domain
  xScale.domain([d3.min(data, xValue)-3, d3.max(data, xValue)+3]);
  yScale.domain([d3.min(data, yValue)-3, d3.max(data, yValue)+3]);
  cScale.domain([d3.min(data, cValue)-3, d3.max(data, cValue)+3]);

  color = d3.scale.linear().domain([d3.min(data, cValue)-1, d3.max(data, cValue)+1]).range(['steelblue', 'red']);

  xMap = function(d) { return xScale(xValue(d));}; // data -> display
  yMap = function(d) { return yScale(yValue(d));}; // data -> display

  // x-axis
  svg.append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(0," + height + ")")
  .call(xAxis)
  .append("text")
  .attr("class", "label")
  .attr("x", width)
  .attr("y", -6)
  .style("text-anchor", "end")
  .text("Water Shortage (%)");


  // y-axis
  svg.append("g")
  .attr("class", "y axis")
  .call(yAxis)
  .append("text")
  .attr("class", "label")
  .attr("transform", "rotate(-90)")
  .attr("y", 6)
  .attr("dy", ".71em")
  .style("text-anchor", "end")
  .text("Undernourishment");

  drawDots(data);
}


function getBubbleData() {
  var yearValue = document.getElementById('yearinput').value; //get the year from the slider
  d3.select('#Bubbleyear').text(yearValue); //set the text to indicate which year is selected
  var year = parseDate(yearValue).getTime();
  var data = [];
  dataArray.forEach( function(d) {
    if (d.water && d.mortality && d.malnourished) {
      if (d.year.getTime() === year) {
        if(d.countryShort) {
          data.push(d);
        }
      }
    }
  });
  return data;
}

function changeBubbleValues() {
  var data = getBubbleData();


  drawDots(data);
}

function drawDots(data) {


  dot = svg.selectAll(".dot")
  .data(data,function(d) { return d.countryShort; });



  dot.transition().duration(1000)
  .attr("class", function(d) { return "dot " + d.countryShort})
  .attr("r", function(d) {
    return d.mortality*2})
    .attr("cx", xMap)
    .attr("cy", yMap)
    //.style("fill", function(d) { return color(cValue(d));});

    dot.on("mouseover", function(d) {
      tooltip.transition()
      .duration(200)
      .style("opacity", .9);
      tooltip.html("<b>" + d.country + " </b> <br/> water shortage: " + xValue(d)
      + " <br> Undernourishment: " + yValue(d) +
      " <br> Mortality: " + cValue(d)
    )
    .style("left", (d3.event.pageX + 10) + "px")
    .style("top", (d3.event.pageY - 28) + "px");
  })
  .on("mouseout", function(d) {
    tooltip.transition()
    .duration(500)
    .style("opacity", 0);
  });

  dot.exit()
  .transition()
  .duration(500)
  .attr("r", 0)
  .remove();


  // draw dots
  dot.enter().append('circle')
  .attr("class", function(d) { return "dot " + d.countryShort})
  .attr("r", 0)
  .attr("cx", xMap)
  .attr("cy", yMap)
  .style("fill", function(d) { return color(cValue(d));})
  .on("mouseover", function(d) {
    tooltip.transition()
    .duration(200)
    .style("opacity", .9);
    tooltip.html(d.country + "<br/> (" + xValue(d)
    + ", " + yValue(d) + ")")
    .style("left", (d3.event.pageX + 5) + "px")
    .style("top", (d3.event.pageY - 28) + "px");
  })
  .on("mouseout", function(d) {
    tooltip.transition()
    .duration(500)
    .style("opacity", 0);
  }).transition().duration(500).attr("r", function(d) { return d.mortality*2});
}
