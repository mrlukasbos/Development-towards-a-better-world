var dataArray = [];
var countryDefaults = {};
var measurementItem = "malnourished";
var parseDate = d3.time.format("%Y").parse;
var selectedCountry = "BRA";

var malnourishedmincolor = "white",
malnourishedmaxcolor = "purple",
mortalitymincolor = "white",
mortalitymaxcolor = "darkred",
watermincolor = "white",
watermaxcolor = "blue",
nodatacolor = "#ccc",
selectioncolor = "steelblue";
var steamcolor = d3.scale.linear().range(["#444", "#ccc"]);

var createPaletteScale = function(min, max, minColor, maxColor) {
  return d3.scale.linear().domain([min, max]).range([minColor, maxColor]); // greens
}

var malnourishedPaletteScale, mortalityPaletteScale, waterPaletteScale;

//this function creates an id and a data-key relationship and already some initial attrubutes.
var createProperty = function(d, data) {
  var key = d.country + d.year;
  data[key] = data[key] || { country: d.country, year: parseDate(d.year), countryShort: isoAlpha3Countries[inverseisoCountries[d.country]] };
  return key;
};

//import all three .csv files asynchronously
d3.csv("malnourished.csv", function(error, data1) {
  d3.csv("mortality.csv", function(error, data2) {
    d3.csv("nowater.csv", function(error, data3) {
      var data = {};
      var minmalnourished = 0, maxmalnourished = 0, minmortality = 0, maxmortality = 0, minwater = 0, maxwater = 0;

      /* Here each the data from each .csv sheet is taken and is given an ID, which is countryname + date
      Then the value from the first sheet will be added to that ID.
      Then in the second and third stylesheet, if the id already exists this attribute will be appended to it,
      or a new object will be created.
      */

      data1.forEach(function(d) {
        var key = createProperty(d, data);
        data[key].malnourished = d.val ? +d.val : 0;
        countryDefaults[data[key].countryShort] = { "fillColor": nodatacolor };
        minmalnourished = Math.min(data[key].malnourished, minmalnourished);
        maxmalnourished = Math.max(data[key].malnourished, maxmalnourished);
      });
      data2.forEach(function(d) {
        var key = createProperty(d, data);
        data[key].mortality = d.val ? +d.val : 0;
        countryDefaults[data[key].countryShort] = { "fillColor": nodatacolor };
        minmortality = Math.min(data[key].mortality, minmortality);
        maxmortality = Math.max(data[key].mortality, maxmortality);
      });
      data3.forEach(function(d) {
        var key = createProperty(d, data);
        data[key].water = d.val ? +d.val : 0;
        countryDefaults[data[key].countryShort] = { "fillColor": nodatacolor };
        minwater = Math.min(data[key].water, minwater);
        maxwater = Math.max(data[key].water, maxwater);
      });

      //define the pallete scales for in the map
      // malnourishedPaletteScale = createPaletteScale(minmalnourished, maxmalnourished/4, malnourishedmincolor, malnourishedmaxcolor); //divide by 4 because of one enormous outlier
      // mortalityPaletteScale = createPaletteScale(minmortality, maxmortality, mortalitymincolor, mortalitymaxcolor);
      // waterPaletteScale = createPaletteScale(minwater, maxwater, watermincolor, watermaxcolor);

      for(var key in data){
        dataArray.push(data[key]);
      }

      CreateLineChart(dataArray);
      CreateBubbleChart();
      CreateStackedBarChart(dataArray);
      addOnclickListeners()
    });
  });
});


function addOnclickListeners() {

  d3.selectAll('.dot').on('click', function(info) {
    selectedCountry = info.countryShort;

    updateColors(info.countryShort);
    drawLineChart();

  });
  d3.selectAll('.layer').on('click', function(info) {
    selectedCountry = info.countryShort;

    updateColors(info.countryShort);
    drawLineChart();
  });
}


function updateColors(selector) {
  resetBarColors();
  resetBubbleColors();


  selector = "." + selector;
  d3.selectAll(selector).style('fill', 'green');
  d3.selectAll(selector+" rect").style('fill', function(d,i) { return "rgb(0, " + (102 + (i * 51)) + ", 0)" });
}


function resetBarColors() {
  d3.selectAll("rect").style('fill', function(d,i) {
    return bar_color(d.name); });
    d3.selectAll(".barlegend").style('fill', function(d,i) {
      return bar_color(d); });
}
function resetBubbleColors() {
  d3.selectAll(".dot").style("fill", function(d) { return color(cValue(d)); });

}
