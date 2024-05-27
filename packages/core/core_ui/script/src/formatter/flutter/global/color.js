const StyleDictionary = require("style-dictionary");
const {
  generateSpace,
  createSwiftFile,
  createDartFile,
  createStructHeader,
  camelize,
  capitalize,
} = require("../../../helper/utils");

const generateClassData = (json) => {
  let inner = "";
  Object.keys(json).forEach((key) => {
    if (json[key].isSource) {
      const fields = json[key].path
        .slice(3)
        .map((x) => capitalize(camelize(x)));
      let field = fields
        .map((x, i) => (i === 0 ? x.toLowerCase() : x))
        .join("");
      field = field.replace("transparent", "");
      field =
        field.substring(0, 1).toLowerCase() + field.substring(1, field.length);
      if (field.includes("gradient")) {
        inner += createLinearGradient(field, json[key].value);
      } else {
        inner += `    final ${field} = const Color(${createColor(
          json[key].value
        )});\n`;
      }
    } else {
      inner += generateClassData(json[key]);
    }
  });
  return inner;
};
const generateClasses = (json) => {
  let data = "";

  Object.keys(json).forEach((key) => {
    if (json[key].isSource) {
    } else {
      const inner = generateClassData(json[key]);
      const className = capitalize(camelize(key));
      data += `class BK${className} {\n`;
      data += `    BK${className}._();\n`;
      data += `    static final shared = BK${className}._();\n\n`;
      data += inner;
      data += "}\n\n";
    }
  });

  return data;
};

const createColor = (hex) => {
  let data = hex.replace("#", "");

  if (data.length == 8) {
    opacity = data.substring(6);
    data = opacity + data.substring(0, 6);
  }

  if (data.length < 8) {
    data = "FF" + data;
  }
  data = "0x" + data;
  return data.toUpperCase();
};

const createLinearGradient = (key, value) => {
  const regex = /#([0-9a-fA-F]{6})/g;
  const colors = value.match(regex);
  const colorBegin = `Color(${createColor(colors[0])})`;
  const colorEnd = `Color(${createColor(colors[1])})`;
  return `    final ${key} = const LinearGradient(colors: [${colorBegin},${colorEnd},], begin: Alignment.topLeft, end: Alignment.bottomRight);\n`;
};

const generateMainClass = (json) => {
  let data = "";
  Object.keys(json).forEach((key) => {
    if (json[key].isSource) {
      data += `    final ${key} = const Color(${createColor(
        json[key].value
      )});\n`;
    } else {
      data += `    final ${key} = BK${capitalize(camelize(key))}.shared;\n`;
    }
  });

  return data;
};

StyleDictionary.registerFormat({
  name: "flutter/color",
  formatter: ({ dictionary, platform, options, file }) => {
    const color = dictionary.tokens.bk.global.color;
    let data = createDartFile(
      file.className,
      generateMainClass(color),
      file.destination
    );
    data += generateClasses(color);
    return data;
  },
});
