//general helper functions

const utils = {};

/*
Input:
-jsonArray: list of JSON objects
-attribute: Attribute of JSON object
Output:
-list of values corresponding to input attribute for each JSON object in jsonArray
*/
utils.getAttributeList = (jsonArray, attribute) => {
  const attributeList = jsonArray.map(function(d) {
    return d[attribute]
  })
  return attributeList
}


export default utils;
