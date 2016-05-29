$("#resetbtn").hide();

var countryDefaults = {};
var countryData;
var measurementItem = "co2";
var parseDate = d3.time.format("%Y").parse;

var co2mincolor = "white",
    co2maxcolor = "purple",
    elecmincolor = "white",
    elecmaxcolor = "darkred",
    oilmincolor = "white",
    oilmaxcolor = "blue",
    nodatacolor = "#ccc",
    selectioncolor = "steelblue";
    var steamcolor = d3.scale.linear().range(["#444", "#ccc"]);

var createPaletteScale = function(min, max, minColor, maxColor) {
  return d3.scale.linear().domain([min, max]).range([minColor, maxColor]); // greens
}

var co2PaletteScale, elecPaletteScale, oilPaletteScale;

//this function creates an id and a data-key relationship and already some initial attrubutes.
var createProperty = function(d, data) {
  var key = d.country + d.year;
  data[key] = data[key] || { country: d.country, year: parseDate(d.year), countryShort: isoAlpha3Countries[inverseisoCountries[d.country]] };
  return key;
};

//import all three .csv files asynchronously
d3.csv("co2.csv", function(error, data1) {
  d3.csv("electricity.csv", function(error, data2) {
    d3.csv("oil.csv", function(error, data3) {
      var data = {};
      var minCo2 = 0, maxCo2 = 0, minElec = 0, maxElec = 0, minOil = 0, maxOil = 0;

      /* Here each the data from each .csv sheet is taken and is given an ID, which is countryname + date
        Then the value from the first sheet will be added to that ID.
        Then in the second and third stylesheet, if the id already exists this attribute will be appended to it,
        or a new object will be created.
      */

      data1.forEach(function(d) {
        var key = createProperty(d, data);
        data[key].co2 = d.val ? +d.val : 0;
        countryDefaults[data[key].countryShort] = { "fillColor": nodatacolor };
        minCo2 = Math.min(data[key].co2, minCo2);
        maxCo2 = Math.max(data[key].co2, maxCo2);
      });
      data2.forEach(function(d) {
        var key = createProperty(d, data);
        data[key].elec = d.val ? +d.val : 0;
        countryDefaults[data[key].countryShort] = { "fillColor": nodatacolor };
        minElec = Math.min(data[key].elec, minElec);
        maxElec = Math.max(data[key].elec, maxElec);
      });
      data3.forEach(function(d) {
        var key = createProperty(d, data);
        data[key].oil = d.val ? +d.val : 0;
        countryDefaults[data[key].countryShort] = { "fillColor": nodatacolor };
        minOil = Math.min(data[key].oil, minOil);
        maxOil = Math.max(data[key].oil, maxOil);
      });

      //define the pallete scales for in the map
      co2PaletteScale = createPaletteScale(minCo2, maxCo2/4, co2mincolor, co2maxcolor); //divide by 4 because of one enormous outlier
      elecPaletteScale = createPaletteScale(minElec, maxElec, elecmincolor, elecmaxcolor);
      oilPaletteScale = createPaletteScale(minOil, maxOil, oilmincolor, oilmaxcolor);

      //make the data global
      countryData = data;
      console.log(countryData);

      // from here all functions for the charts can be called

    });
  });
});
