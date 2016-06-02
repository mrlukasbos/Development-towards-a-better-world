var line_margin = {top: 20, right: 40, bottom: 30, left: 50},
line_width = 1100 - line_margin.left - line_margin.right,
line_height = 300 - line_margin.top - line_margin.bottom;

var line_color, line_data = [], line_countrydata, line_cdata, line_xaxis, line_yaxis;

var line_x = d3.time.scale()
.range([0, line_width]);

var line_y = d3.scale.linear()
.range([line_height, 0]);

var line_xAxis = d3.svg.axis()
.scale(line_x)
.orient("bottom");

var line_yAxis = d3.svg.axis()
.scale(line_y)
.orient("left");

var line_line = d3.svg.line()
.interpolate("basis")
.x(function(d) { return line_x(d.year); })
.y(function(d) { return line_y(d.value); });

d3.select(".line-chart-holder").append("p").attr("class", "linechartTitleText");

var line_svg = d3.select(".line-chart-holder").append("svg")
.attr("width", line_width + line_margin.left + line_margin.right)
.attr("height", line_height + line_margin.top + line_margin.bottom)
.append("g")
.attr("transform", "translate(" + line_margin.left + "," + line_margin.top + ")");



function CreateLineChart(dataArray) {
  line_color = getColor();
  line_data = getData(dataArray, selectedCountry);
  line_countrydata = getCountryData(line_data);

   line_x.domain(d3.extent(line_data, function(d) { return d.year; }));
  //
  // line_y.domain([
  //   d3.min(line_countrydata, function(c) { return d3.min(c.values, function(v) { return v.value; }); }),
  //   d3.max(line_countrydata, function(c) { return d3.max(c.values, function(v) { return v.value; }); })
  // ]);

  line_y.domain([0, 100]);

  line_xaxis = line_svg.append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(0," + line_height + ")")
  .call(line_xAxis);

  line_yaxis = line_svg.append("g")
  .attr("class", "y axis")
  .call(line_yAxis)
  .append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 6)
  .attr("dy", ".71em")
  .style("text-anchor", "end")
  .text("Population (%)");

  var legend = line_svg.selectAll(".legend")
  .data(line_color.domain().slice().reverse())
  .enter().append("g")
  .attr("class", "legend")
  .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });


  legend.append("rect")
  .attr("x", bar_width - 18)
  .attr("width", 18)
  .attr("class", "barlegend")
  .attr("height", 18)
  .style("fill", function(d) { return line_color(d); });

  legend.append("text")
  .attr("x", bar_width - 24)
  .attr("y", 9)
  .attr("dy", ".35em")
  .attr("class", "label")
  .style("text-anchor", "end")
  .text(function(d){
  if ( d == "water") {
  return "Water inaccessability"; }
  if( d == "malnourished") {
  return "Undernourishment"; }
if( d == "mortality") {
  return "Child mortality"; }
});

  if (selectedCountry) {
      drawLineChart();
    } else {
      d3.select(".linechartTitleText").append("p").html("<h2 align='center'> Click on a dot or bar to select a country </h2>")}
    }

    function drawLineChart() {
      line_data = getData(dataArray, selectedCountry);
      line_countrydata = getCountryData(line_data);

    var countryName = getCountryName(inverseisoAlphaCountries[selectedCountry]);

    d3.select(".linechartTitleText").html("<h2 align='center'> Showing data of " + countryName +  "</h2>");


      drawLines(line_data, line_countrydata);
    }

    function drawLines(line_data, line_countrydata) {

      line_cdata  = line_svg.selectAll(".city").data(line_countrydata, function(d) { return d.key; });

      line_cdata.enter().append("g")
      .attr("class", "city")
    .append("path")
      .attr("class", "line")
      .attr("d", function(d) {
      return line_line(d.values); })
      .style("stroke", function(d) { return line_color(d.key); });


      var templine = line_cdata.selectAll(".line").data(line_countrydata, function(d) { return d.key; });


      templine.transition()
      .attr("class", "line")
      .attr("d", function(d) {
        return line_line(d.values); })
      .style("stroke", function(d) { return line_color(d.key); });

    }



    function getData(dataArray, line_countryShort) {

      line_data = [];
      dataArray.forEach( function(d) {
        if (d.water && d.mortality && d.malnourished) {

          if (d.countryShort === line_countryShort) {
            line_data.push(d);
          }
        }
      });
      return line_data;
    }

    function getColor() {
      line_color = d3.scale.ordinal()
      .domain(d3.keys(line_data[0]).filter(function(key) {
        if (key !== "year" && key !== "countryShort" && key !== "country") {
          return key;
        }
      })).range(["#ff2626", "#333333", "#485df4"]);
      return line_color;
    }

    function getCountryData(line_data) {
      var line_color = getColor();
      var line_countrydata = line_color.domain().map(function(dataset) {
        return {
          key: dataset,
          values: line_data.map(function(d) {
            return {year: d.year, value: +d[dataset]};
          })
        };
      });
      return line_countrydata;
    }
