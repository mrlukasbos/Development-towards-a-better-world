var line_margin = {top: 20, right: 120, bottom: 30, left: 50},
line_width = 1100 - line_margin.left - line_margin.right,
line_height = 300 - line_margin.top - line_margin.bottom;

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


function CreateLineChart(dataArray, line_selector) {

  var line_data = getData("ZMB");
  var line_countrydata = getCountryData(line_data);
  var line_color = getColor();

  var line_svg = d3.select(line_selector).append("svg")
  .attr("width", line_width + line_margin.left + line_margin.right)
  .attr("height", line_height + line_margin.top + line_margin.bottom)
  .append("g")
  .attr("transform", "translate(" + line_margin.left + "," + line_margin.top + ")");

  line_x.domain(d3.extent(line_data, function(d) { return d.year; }));

  line_y.domain([
    d3.min(line_countrydata, function(c) { return d3.min(c.values, function(v) { return v.value; }); }),
    d3.max(line_countrydata, function(c) { return d3.max(c.values, function(v) { return v.value; }); })
  ]);

  line_svg.append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(0," + line_height + ")")
  .call(line_xAxis);

  line_svg.append("g")
  .attr("class", "y axis")
  .call(line_yAxis)
  .append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 6)
  .attr("dy", ".71em")
  .style("text-anchor", "end")
  .text("Population (%)");

  var line_cdata = line_svg.selectAll(".city")
  .data(line_countrydata)
  .enter().append("g")
  .attr("class", "city");

  line_cdata.append("path")
  .attr("class", "line")
  .attr("d", function(d) { return line_line(d.values); })
  .style("stroke", function(d) { return line_color(d.key); })
  .transition().delay(3000).duration(2000).attr("d", function(d) {
    console.log(d.values);
    d.values.forEach(function(d) {
      d.value = Math.random()*40 + 10;
    })
    return line_line(d.values); });

    line_cdata.append("text")
    .datum(function(d) { return {name: d.key, value: d.values[0]}; })
    .attr("transform", function(d) {
      console.log((d.value.value));

      return "translate(" + line_x(d.value.year) + "," + line_y(d.value.value) + ")"; })
      .attr("x", 3)
      .attr("dy", ".35em")
      .text(function(d) {
        if (d.name === "water") {
          return "Water inaccessability";
        }
        if(d.name === "malnourished") {
          return "Undernourishment";
        }
        if(d.name === "mortality") {
          return "Child mortality";
        }
      })


      function getData(line_countryShort) {
        var line_data = [];
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
        var line_color = d3.scale.ordinal()
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
    }
