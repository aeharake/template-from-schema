const DEFAULT_VALUES = {
  string: "",
  integer: 1,
  number: 1.2,
  boolean: false,
  array: [],
  null: null,
};
const getDefaultValue = (obj) => {
  if (obj.default) {
    return obj.default;
  }
  const def = DEFAULT_VALUES[obj.type];
  if (def === undefined) {
    return "";
  }
  return def;
};
const generateTemplateFromSchema = (obj) => {
  let res = {};
  const props = Object.keys(obj.properties).filter((property) =>
    obj.required.includes(property)
  );
  for (const prop of props) {
    if (obj.properties[prop].type !== "object") {
      res[prop] = getDefaultValue(obj.properties[prop]);
    } else {
      res[prop] = generateTemplateFromSchema(obj.properties[prop]);
    }
  }
  return res;
};
module.exports = generateTemplateFromSchema;
