function CreateLineChart(dataArray, selector) {

 var data = getData("BRA");
 var countrydata = getCountryData(data);
var color = getColor();

  var margin = {top: 20, right: 80, bottom: 30, left: 50},
  width = 960 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;

  var x = d3.time.scale()
  .range([0, width]);

  var y = d3.scale.linear()
  .range([height, 0]);

  var xAxis = d3.svg.axis()
  .scale(x)
  .orient("bottom");

  var yAxis = d3.svg.axis()
  .scale(y)
  .orient("left");

  var line = d3.svg.line()
  .interpolate("basis")
  .x(function(d) { return x(d.year); })
  .y(function(d) { return y(d.value); });

  var svg = d3.select(selector).append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  x.domain(d3.extent(data, function(d) { return d.year; }));

  y.domain([
    d3.min(countrydata, function(c) { return d3.min(c.values, function(v) { return v.value; }); }),
    d3.max(countrydata, function(c) { return d3.max(c.values, function(v) { return v.value; }); })
  ]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Temperature (ºF)");

  var cdata = svg.selectAll(".city")
      .data(countrydata)
    .enter().append("g")
      .attr("class", "city");

  cdata.append("path")
      .attr("class", "line")
      .attr("d", function(d) { return line(d.values); })
      .style("stroke", function(d) { return color(d.key); });

  cdata.append("text")
      .datum(function(d) { return {name: d.key, value: d.values[d.values.length - 1]}; })
      .attr("transform", function(d) { return "translate(" + x(d.value.year) + "," + y(d.value.value) + ")"; })
      .attr("x", 3)
      .attr("dy", ".35em")
      .text(function(d) { return d.key; });


function getData(countryShort) {
  var data = [];
  dataArray.forEach( function(d) {
    if (d.water && d.mortality && d.malnourished) {

      if (d.countryShort === "BRA") {
        data.push(d);
      }
    }
  });
  return data;
}

function getColor() {
  var color = d3.scale.category10();
  color.domain(d3.keys(data[0]).filter(function(key) {
    if (key !== "year" && key !== "countryShort" && key !== "country") {
      return key;
    }
  }));
  return color;
}

function getCountryData(data) {
  var color = getColor();
  var countrydata = color.domain().map(function(dataset) {
    return {
      key: dataset,
      values: data.map(function(d) {
        return {year: d.year, value: +d[dataset]};
      })
    };
  });
  return countrydata;
}
}

function updateLineChart(countryShort) {

  cdata = d3.selectAll(".city");

  cdata.data(getCountryData(getData(countryShort)));
  cdata.append("path")
      .attr("class", "line")
      .attr("d", function(d) { return line(d.values); })
      .style("stroke", function(d) { return color(d.key); });

  cdata.append("text")
      .datum(function(d) { return {name: d.key, value: d.values[d.values.length - 1]}; })
      .attr("transform", function(d) { return "translate(" + x(d.value.year) + "," + y(d.value.value) + ")"; })
      .attr("x", 3)
      .attr("dy", ".35em")
      .text(function(d) { return d.key; });

}
