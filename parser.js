const syntax =
  /[[\d+:\d+]]\s+\([A-Z]*\([A-Z]*\[[0-9]*\[[0-9]*\]\]\s+\([A-Z]*\)\)\)/;

const Parser = (input) => {
  if (syntax.test(input)) {
    let parseObj = {};

    // get all numbers
    const numbers = /[0-9]+/g;
    const numberMatches = input.match(numbers);

    // get all circles
    const circles = /[A-Z]+/g;
    const circleMatch = input.match(circles);

    parseObj = {
      square: numberMatches[0],
      child: {
        circle: circleMatch[0],
        child: {
          circle: circleMatch[1],
          child: {
            child: {
              square: numberMatches[1],
              child: {
                square: numberMatches[2],
              },
            },
            circle: circleMatch[2],
          },
        },
      },
    };

    console.log(parseObj);
    return parseObj;
  } else {
    return { error: "Invalid input" };
  }
};

Parser("[12] (BALL(INK[1[35]] (CHARLIE)))");

module.exports = {
  syntax,
  Parser,
};
