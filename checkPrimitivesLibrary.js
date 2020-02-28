module.exports = {
  checkOnString,
  checkOnNumber,
  checkOnNotEmptyObject,
  checkOnNotEmptyArray
};

function checkOnString(item) {
  return typeof item === "string";
}

function checkOnNumber(item) {
  return typeof item === "number";
}

function checkOnNotEmptyObject(item) {
  if (typeof item === "object" && item !== null && item.length === undefined) {
    return Object.entries(item).length;
  }

  return false;
}

function checkOnNotEmptyArray(item) {
  return typeof item === "object" && item !== null && item.length;
}
