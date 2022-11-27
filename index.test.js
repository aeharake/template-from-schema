const { expect, describe, beforeAll, it } = require("@jest/globals");
const generateTemplateFromSchema = require("./index");
const fs = require("fs");
describe("Generate template from schema", () => {
  let parsed;
  let template;
  beforeAll(() => {
    parsed = JSON.parse(fs.readFileSync("./index.schema.json").toString());
    template = generateTemplateFromSchema(parsed);
  });
  it("should assert that default properties and required length are the same", () => {
    expect(template).toHaveProperty("person");
    expect(Object.keys(template).length).toBe(parsed.required.length);
  });
  it("should assert that default boolean values are either as specified in schema or false", () => {
    expect(template.person.hasBeard).toBe(false);
    expect(template.person.isNice).toBe(true);
  });
  it("should assert that the person's hobbies are sports only", () => {
    expect(template.person.hobbies).toStrictEqual(["sports"]);
  });
});
