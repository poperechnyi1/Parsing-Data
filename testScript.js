const checkPrimitive = require("./checkPrimitivesLibrary");
const parsing = require("./parsingData");

const labels = [
  '"":"tie","1":"nail polish"',
  {},
  [],
  "{Shoes:brown}",
  "-",
  "[{'Rings' : [Diamond, Gold]]}",
  '"{"T-Shirt":"white"}"',
  55,
  "\0",
  "\\0",
  '{"Pants":"black"}',
  "*",
  { Pants: ["Jeans", "Dress Pant", '{"Pants":"black"}'] },
  '{"Hat"}'
];

let report = [];

function parsingObject() {
  report = labels.filter(item => {
    if (checkPrimitive.checkOnString(item)) {
      return item;
    }

    if (checkPrimitive.checkOnNumber(item)) {
      return item;
    }

    if (checkPrimitive.checkOnNotEmptyObject(item)) {
      return item;
    }

    if (checkPrimitive.checkOnNotEmptyArray(item)) {
      return item;
    }
  });

  console.log("Result ", parsing.convertToResult(report));
}

parsingObject();
