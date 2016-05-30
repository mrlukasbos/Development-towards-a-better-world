function CreateLineChart(dataNest, selector) {

  var data = [];
    dataNest.forEach( function(d) {
        if (d.country === "Brazil") {
            data.push(d);
      }
    });

console.log(data);
}
