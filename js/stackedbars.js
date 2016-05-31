function CreateStackedBarChart(dataArray, selector) {

  var compressedData = [];
  dataArray.forEach( function(d) {
    if (d.water && d.mortality && d.malnourished) {
      compressedData.push(d);
    }
  });

  var dataNest = d3.nest()
  .key(function(d) { return d.country; })
  .entries(compressedData);

  var amountOfSamples = 33,
  amounfOfLayers = 3,
  groupMax = 4;
  stackMax = 8;

  var margin = {top: 20, right: 40, bottom: 120, left: 40},
  width = 1100 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;

  var x = d3.scale.ordinal()
  .rangeRoundBands([0, width], .2);

  var y = d3.scale.linear()
  .rangeRound([height, 0]);

  var xAxis = d3.svg.axis()
  .scale(x)
  .orient("bottom");

  var yAxis = d3.svg.axis()
  .scale(y)
  .orient("left")
  .tickFormat(function(d) { return d + "%"; });

  var svg = d3.select(selector).append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var color = d3.scale.ordinal()
  .range(["#ff2626", "#333333", "#485df4"]);

  var mappedData = [];
  var totalmalnourished = 0, totalmortality = 0, totalwater = 0;
  dataNest.forEach(function(d) {

    d.values.forEach(function(d) {
      if (d.year.getTime() === parseDate("2011").getTime()) {
        if (d.countryShort) {
          /*
          Here we have an object:
          { country: "Cameroon",
          year: Date 2010-12-31T23:00:00.000Z,
          countryShort: "CMR",
          malnourished: 0.268091792889505, <---
          mortality: 259.528534999064, <---
          water: 321.615895400672 } <---

          We want to use the three pointed values.
          */
          if (!isNaN(d.malnourished)){
            totalmalnourished = totalmalnourished + d.malnourished;
          } else {
            d.malnourished = 0;
          }
          if (!isNaN(d.mortality)){
            totalmortality = totalmortality + d.mortality;
          } else {
            d.mortality = 0;
          }
          if (!isNaN(d.water)){
            totalwater = totalwater + d.water;
          } else {
            d.water = 0;
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

          d.malnourished = d.malnourished/totalmalnourished * 100;
          d.mortality = d.mortality/totalmortality * 100;
          d.water = d.water/totalwater * 100;

          var y0 = 0;
          d.mappedvalues = color.domain().map(function(name) { return {name: name, y0: y0, y1: y0 += +d[name]}; });
          d.total = d.mappedvalues[d.mappedvalues.length - 1].y1;

          mappedData.push(d)
        }
      }
    });
  });


  mappedData.sort(function(a, b) { return b.total - a.total; });
  slicedmappedData = mappedData.slice(0,amountOfSamples);

  x.domain(slicedmappedData.map(function(d) { return d.country; }));
  //  y.domain([0, d3.max(mappedData, function(d) { return d.total; })]);
  y.domain([0, stackMax]);

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
  .data(slicedmappedData)
  .enter().append("g")
  .attr("class", function(d) { return "g layer " + d.countryShort })
  .attr("transform", function(d) { return "translate(" + x(d.country) + ",0)"; });

  var state = layer.selectAll("rect")
  .data(function(d) { return d.mappedvalues; })
  .enter().append("rect")
  .attr("class", function(d) { return d.countryShort })
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
  .text("malnourished (% of world total)");

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
  .attr("class", "label")
  .style("text-anchor", "end")
  .text(function(d) { return d; });

  d3.selectAll(".modetoggle").on("click", change);
  d3.selectAll(".sorttoggle").on("click", changeSort);


  var timeout = setTimeout(function() {
    d3.select("input[value=\"grouped\"]").property("checked", true).each(change);
  }, 2000);

  var selectedMode = "stacked";
  function change() {
    clearTimeout(timeout);
    if (this.value === "grouped") {
      selectedMode = "grouped";
      transitionGrouped();
    }
    if ((this.value === "stacked")) {
      selectedMode = "stacked";
      transitionStacked();
    }
  }

  function changeSort() {
    if ((this.value === "total")) sortData('total');
    if (this.value === "malnourished") sortData('malnourished');
    if ((this.value === "mortality")) sortData('mortality');
    if ((this.value === "water")) sortData('water');


    var tempLayer = layer.data(slicedmappedData)

    tempLayer.enter().append("g")
    .attr("class", function(d) { return "g " + d.countryShort })
    .attr("transform", function(d) { return "translate(" + x(d.country) + ",0)"; });

    tempLayer.transition().attr("class", function(d) { return "g " + d.countryShort })
    .attr("transform", function(d) { return "translate(" + x(d.country) + ",0)"; });

    tempLayer.exit().remove();


    var tempState = state.data(function(d) { return d.mappedvalues; });


    tempState.enter().append('rect').attr("y", function(d) { return y(d.y0); })
    .attr("x", 0)
    .attr("width", x.rangeBand())
    .attr("height", 0)
    .style("fill", function(d) { return color(d.name); });


    if (selectedMode === "stacked") {
      transitionStacked();
    } else if (selectedMode === "grouped") {
      transitionGrouped();
    }

    tempState.exit().remove();




    svg.selectAll("g.x.axis")
    .attr("transform", "translate(0," + height + ")")
    .transition()
    .duration(900)
    .call(xAxis)
    .selectAll("text")
    .attr("y", 10)
    .attr("x", 5)
    .attr("dy", ".35em")
    .attr("transform", "rotate(45)")
    .style("text-anchor", "start");

  }

  function sortData(param) {
    if (param === "total") {
      mappedData.sort(function(a, b) { return b.total - a.total; });
    } else if (param === "malnourished") {
      mappedData.sort(function(a, b) { return b.malnourished - a.malnourished; });
    } else if (param === "mortality") {
      mappedData.sort(function(a, b) { return b.mortality - a.mortality; });
    } else if (param === "water") {
      mappedData.sort(function(a, b) { return b.water - a.water; });
    }
    slicedmappedData = mappedData.slice(0,amountOfSamples);

    x.domain(slicedmappedData.map(function(d) {
      return d.country; }));
    }

    function transitionGrouped() {
      y.domain([0, groupMax]);
      rescale();
      state.transition()
      .duration(500)
      .delay(function(d, i) { return i * 10; })
      .attr("width", x.rangeBand() / 3)
      .transition() //
      .attr("x", function(d, i, j) { return x.rangeBand() * i / 3; })
      .transition()
      .attr("y", function(d) { return height + y(d.y1) - y(d.y0) })
      .attr("height", function(d) {
        return y(d.y0)-y(d.y1); });


      }

      function transitionStacked() {
        y.domain([0, stackMax]);
        rescale();
        state.transition()
        .duration(500)
        .delay(function(d, i) { return i * 10; })
        .attr("y", function(d) { return y(d.y1); })
        .attr("height", function(d) { return y(d.y0) - y(d.y1); })
        .transition()
        .attr("x", 0)
        .transition() //
        .attr("width", x.rangeBand());


      }

      function rescale() {
        svg.selectAll("g.y.axis")
        .transition().duration(900).ease("sin-in-out")  // https://github.com/mbostock/d3/wiki/Transitions#wiki-d3_ease
        .call(yAxis);

      }



    }
