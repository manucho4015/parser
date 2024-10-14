const syntax =
  /[[\d+:\d+]]\s+\([A-Z]*\([A-Z]*\[[0-9]*\[[0-9]*\]\]\s+\([A-Z]*\)\)\)/;

const Parser = (input) => {
  let parseObj = {};
  // initial parse is based on whitespace
  const parseArr = input.split(" ");
  console.log(parseArr);

  parseArr.map((item) => {
    const reg1 = new RegExp(/[\d]/);
    const reg2 = new RegExp(/([A-Z])/);
    if (reg1.test(item)) {
      parseObj = {
        ...parseObj,
        square: item.replace("[", "").replace("]", ""),
      };
      return parseObj;
    }
    if (reg2.test(item)) {
      parseObj = {
        ...parseObj,
        circle: item.replace("(", "").replace(")", ""),
      };
      return parseObj;
    }
  });
  console.log(parseObj);
  return parseObj;
};

Parser("[12] (BALL(INK[1[35]] (CHARLIE)))");

module.exports = {
  syntax,
};
