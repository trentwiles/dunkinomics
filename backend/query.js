const fs = require("fs");
const csv = require("csv-parser");

function select(number, greater, equal){
    var results = []
    operator = ""
    if(greater){
        operator += ">"
    }else{
        operator += "<"
    }
    if (equal){
        operator += "="
    }

    var csv_lines = [];
  fs.createReadStream("data/prices.csv")
    .pipe(csv())
    .on("data", (data) => csv_lines.push(data))
    .on("end", () => {
        csv_lines.forEach(element => {
            if(element["price"] == -1){
                // nothing
            }else if (eval(element["price"] + operator + number)){
                csv_lines.push(element)
                console.log(element)
            }
        })
    });

    return csv_lines
}

console.log(select(2.09, false, true))