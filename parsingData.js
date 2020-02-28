const checkPrimLib = require("./checkPrimitivesLibrary");

module.exports = {
  convertToResult
};

let nonAlphabetCounter = 0;
let excludedKeys = new Set();

let resultArray = [];

function convertToResult(unconvertedData) {
  unconvertedData.forEach(element => {
    if (checkPrimLib.checkOnString(element)) {
      let splitedByColon = element.split(":");
      if (splitedByColon.length % 2 === 0) {
        //FIND array as value

        splitedByColon[1] = splitedByColon[1].replace(/\[|]|}|\s/g, "");
        splitedByColon[1] = splitedByColon[1].split(",");
        if (splitedByColon[1].length >= 2) {
          splitedByColon[0] = splitedByColon[0].replace(/\[|{|'|\s/g, "");
          let obj = {};
          excludedKeys.add(splitedByColon[0]);
          obj[splitedByColon[0]] = 1;
          obj.type = splitedByColon[1];
          resultArray.push(obj);
        }
      }

      let splitedByComa = element.split(",");

      splitedByComa.forEach(part => {
        //Split strings
        let keyValue = part.split(":");
        if (keyValue.length % 2 === 0) {
          keyValue[0] = keyValue[0].replace(/'/g, "");
          keyValue[0] = keyValue[0].replace(/{|"|\[|\s/g, "");

          if (keyValue[0] === "") {
            let obj = {};
            obj[keyValue[1]] = 1;
            resultArray.push(obj);
            return;
          }

          if (
            typeof Number(keyValue[0]) === "number" &&
            keyValue[0] !== "" &&
            keyValue[0] !== "" &&
            !isNaN(keyValue[0])
          ) {
            let obj = {};
            obj[keyValue[1]] = Number(keyValue[0]);
            resultArray.push(obj);
            return;
          }

          let obj = {};
          if (!excludedKeys.has(keyValue[0])) {
            obj[keyValue[0]] = 1;
            obj["type"] = keyValue[1].replace(/}|"\s/g, "");
            obj["type"] = obj["type"].replace(/"|\s/g, "");
            resultArray.push(obj);
          }
        } else {
          if (keyValue[0].match(/{/) && keyValue[0].match(/}/)) {
            let obj = {};
            obj[keyValue[0].replace(/{|"|}/g, "")] = 1;
            resultArray.push(obj);
          } else {
            if (!keyValue[0].match(/}|]/)) {
              nonAlphabetCounter++;
            }
          }
        }
      });
    } else {
      if (checkPrimLib.checkOnNumber(element)) {
        nonAlphabetCounter++;
      }
      Object.entries(element).forEach(entry => {
        let obj = {};
        obj[entry[0]] = 1;
        obj["type"] = entry[1];
        resultArray.push(obj);
      });
    }
  });

  resultArray.push({ "Total Distinct Labels": resultArray.length });
  resultArray.push({ "Total Non-Alpha": nonAlphabetCounter });

  // console.log(32, resultArray);
  return resultArray;
}
