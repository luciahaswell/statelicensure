const sheetId = "1oRmBifryew8lSII-_qQMnFaJohzLwd0QZICkvFfRCXo";
const sheetName = encodeURIComponent("Sheet1");
const sheetURL = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=${sheetName}`;


function csvToObjects(csv) {
    const csvRows = csv.split("\n");
    const propertyNames = csvRows[0].split(",").map(removeQuotes); // Remove quotes from property names
  
    function removeQuotes(str) {
      return str.replace(/^"|"$/g, "");
    }
  
    let objects = [];
    for (let i = 1, max = csvRows.length; i < max; i++) {
      let thisObject = {};
      let row = csvRows[i].split(",");
      for (let j = 0, max = row.length; j < max; j++) {
        // Use the modified property name without quotes
        thisObject[propertyNames[j]] = removeQuotes(row[j]);
      }
      objects.push(thisObject);
    }
    return objects;
  }


    function fetchSheetData() {
        return fetch(sheetURL)
          .then((response) => response.text())
          .then((csvText) => {
            return csvToObjects(csvText);
          });
      }



export default fetchSheetData;


