const xlsx = require("xlsx");
const fs = require("fs");

const workbook = xlsx.readFile("C:/Users/kirti/Desktop/LGD - Local Government Directory, Government of India.xlsx");
const sheet = workbook.Sheets[workbook.SheetNames[0]];
const data = xlsx.utils.sheet_to_json(sheet);

fs.writeFileSync("lgd.json", JSON.stringify(data, null, 2));
console.log("LGD JSON created");
