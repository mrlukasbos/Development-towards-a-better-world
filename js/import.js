var countryDefaults = {};
var measurementItem = "population";
var parseDate = d3.time.format("%Y").parse;

var populationmincolor = "white",
    populationmaxcolor = "purple",
    literacymincolor = "white",
    literacymaxcolor = "darkred",
    employmentmincolor = "white",
    employmentmaxcolor = "blue",
    nodatacolor = "#ccc",
    selectioncolor = "steelblue";
    var steamcolor = d3.scale.linear().range(["#444", "#ccc"]);

var createPaletteScale = function(min, max, minColor, maxColor) {
  return d3.scale.linear().domain([min, max]).range([minColor, maxColor]); // greens
}

var populationPaletteScale, literacyPaletteScale, employmentPaletteScale;

//this function creates an id and a data-key relationship and already some initial attrubutes.
var createProperty = function(d, data) {
  var key = d.country + d.year;
  data[key] = data[key] || { country: d.country, year: parseDate(d.year), countryShort: isoAlpha3Countries[inverseisoCountries[d.country]] };
  return key;
};

//import all three .csv files asynchronously
d3.csv("Population_below_national_poverty_line.csv", function(error, data1) {
  d3.csv("Literacy.csv", function(error, data2) {
    d3.csv("Employment_rates.csv", function(error, data3) {
      var data = {};
      var minpopulation = 0, maxpopulation = 0, minliteracy = 0, maxliteracy = 0, minemployment = 0, maxemployment = 0;

      /* Here each the data from each .csv sheet is taken and is given an ID, which is countryname + date
        Then the value from the first sheet will be added to that ID.
        Then in the second and third stylesheet, if the id already exists this attribute will be appended to it,
        or a new object will be created.
      */

      data1.forEach(function(d) {
        var key = createProperty(d, data);
        data[key].population = d.val ? +d.val : 0;
        countryDefaults[data[key].countryShort] = { "fillColor": nodatacolor };
        minpopulation = Math.min(data[key].population, minpopulation);
        maxpopulation = Math.max(data[key].population, maxpopulation);
      });
      data2.forEach(function(d) {
        var key = createProperty(d, data);
        data[key].literacy = d.val ? +d.val : 0;
        countryDefaults[data[key].countryShort] = { "fillColor": nodatacolor };
        minliteracy = Math.min(data[key].literacy, minliteracy);
        maxliteracy = Math.max(data[key].literacy, maxliteracy);
      });
      data3.forEach(function(d) {
        var key = createProperty(d, data);
        data[key].employment = d.val ? +d.val : 0;
        countryDefaults[data[key].countryShort] = { "fillColor": nodatacolor };
        minemployment = Math.min(data[key].employment, minemployment);
        maxemployment = Math.max(data[key].employment, maxemployment);
      });

      //define the pallete scales for in the map
      // populationPaletteScale = createPaletteScale(minpopulation, maxpopulation/4, populationmincolor, populationmaxcolor); //divide by 4 because of one enormous outlier
      // literacyPaletteScale = createPaletteScale(minliteracy, maxliteracy, literacymincolor, literacymaxcolor);
      // employmentPaletteScale = createPaletteScale(minemployment, maxemployment, employmentmincolor, employmentmaxcolor);

      var dataArray = [];
      for(var key in data){
        dataArray.push(data[key]);
      }

      var dataNest = d3.nest()
        .key(function(d) { return d.country; })
        .entries(dataArray);

      CreateLineChart(dataArray, ".line-chart-holder");
      CreateBubbleChart(dataArray, ".bubble-chart-holder");



      CreateStackedBarChart(dataNest, ".stacked-bar-chart-holder");

      // from here all functions for the charts can be called
    });
  });
});
