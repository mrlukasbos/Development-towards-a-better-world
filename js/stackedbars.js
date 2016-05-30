function CreateStackedBarChart(dataNest, selector) {

  var margin = {top: 20, right: 20, bottom: 120, left: 40},
      width = 1100 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

  var x = d3.scale.ordinal()
      .rangeRoundBands([0, width], .1);

  var y = d3.scale.linear()
      .rangeRound([height, 0]);

  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");

  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left")
      .tickFormat(d3.format(".2s"));

  var svg = d3.select(selector).append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var color = d3.scale.ordinal()
      .range(["#ff0000", "#00ff00", "#0000ff"]);

  //TODO sorting of the array
  //make the data a bit smaller for Testing and for comparing easier (216 countries is too much)
  //dataNest = dataNest.splice(0, 40);

  var mappedData = [];
  var totalCo2 = 0, totalElec = 0, totalOil = 0;
  dataNest.forEach(function(d) {

    d.values.forEach(function(d) {
      if (d.year.getTime() === parseDate("2011").getTime()) {
        if (d.countryShort) {
          /*
          Here we have an object:
          { country: "Cameroon",
          year: Date 2010-12-31T23:00:00.000Z,
          countryShort: "CMR",
          co2: 0.268091792889505, <---
          elec: 259.528534999064, <---
          oil: 321.615895400672 } <---

          We want to use the three pointed values.
          */
          if (!isNaN(d.co2)){
            totalCo2 = totalCo2 + d.co2;
          }
          if (!isNaN(d.elec)){
            totalElec = totalElec + d.elec;
          }
          if (!isNaN(d.oil)){
            totalOil = totalOil + d.oil;
          }

        }
      }
    });
  });
  dataNest.forEach(function(d) {
    color.domain(d3.keys(d.values[0]).filter(function(key) {
      if (key !== 'country' && key !== "countryShort" && key !== "year") {
        return true;
      }
    }));

  d.values.forEach(function(d) {
    if (d.year.getTime() === parseDate("2011").getTime()) {
      if (d.countryShort) {

        d.co2 = d.co2/totalCo2 * 100;
        d.elec = d.elec/totalElec * 100;
        d.oil = d.oil/totalOil * 100;

        var y0 = 0;
        d.mappedvalues = color.domain().map(function(name) { return {name: name, y0: y0, y1: y0 += +d[name]}; });
        d.total = d.mappedvalues[d.mappedvalues.length - 1].y1;

        mappedData.push(d)
      }
    }
  });
});


  mappedData.sort(function(a, b) { return b.total - a.total; });

  //sort i.e. on co2
  // mappedData.sort(function(a, b) { return b.co2 - a.co2; });

  mappedData = mappedData.splice(0,30);

  x.domain(mappedData.map(function(d) { return d.country; }));
  //  y.domain([0, d3.max(mappedData, function(d) { return d.total; })]);
  y.domain([0, 20]);


    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
      .selectAll("text")
        .attr("y", 10)
        .attr("x", 5)
        .attr("dy", ".35em")
        .attr("transform", "rotate(45)")
        .style("text-anchor", "start");

    var layer = svg.selectAll(".state")
        .data(mappedData)
      .enter().append("g")
        .attr("class", "g")
        .attr("transform", function(d) { return "translate(" + x(d.country) + ",0)"; });

    var state = layer.selectAll("rect")
        .data(function(d) { return d.mappedvalues; })
      .enter().append("rect")
        .attr("y", function(d) { return y(d.y0); })
        .attr("x", 0)
        .attr("width", x.rangeBand())
        .attr("height", 0)
        .style("fill", function(d) { return color(d.name); });

    state.transition()
      .delay(function(d, i) { return i * 300; })
      .attr("y", function(d) { return y(d.y1); })
      .attr("height", function(d) { return y(d.y0) - y(d.y1); });

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Population (% of world total)");

    var legend = svg.selectAll(".legend")
        .data(color.domain().slice().reverse())
      .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

    legend.append("rect")
        .attr("x", width - 18)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", color);

    legend.append("text")
        .attr("x", width - 24)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(function(d) {
          if (d === 'elec') {
            return 'electricity';
          }
          return d;
        });


    d3.selectAll("input").on("change", change);

    var timeout = setTimeout(function() {
      d3.select("input[value=\"grouped\"]").property("checked", true).each(change);
    }, 2000);

    function change() {
      clearTimeout(timeout);
      if (this.value === "grouped") transitionGrouped();
      else transitionStacked();
    }

    function transitionGrouped() {
      state.transition()
          .duration(500)
          .delay(function(d, i) { return i * 10; })
          .attr("width", x.rangeBand() / 3)
    //    .transition()
          .attr("x", function(d, i, j) { return x.rangeBand() * i / 3; })
        .transition()
          .attr("y", function(d) { return height + y(d.y1) - y(d.y0) })
          .attr("height", function(d) {
           return y(d.y0)-y(d.y1); });
    }

    function transitionStacked() {
      state.transition()
          .duration(500)
          .delay(function(d, i) { return i * 10; })
          .attr("y", function(d) { return y(d.y1); })
          .attr("height", function(d) { return y(d.y0) - y(d.y1); })
        .transition()
          .attr("x", 0)
      //  .transition()
          .attr("width", x.rangeBand());

    }



}
