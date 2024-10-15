const { syntax, Parser } = require("./parser");

// input validation tests
test("Mismatched parenthesis is rejected", () => {
  expect(syntax.test("[12) (BALL(INK[1[35]] (CHARLIE)))")).toBe(false);
});

test("Open ended digits square brackets & parenthesis is rejected", () => {
  expect(syntax.test("[12] (BALL((INK[1[[35]] (CHARLIE)))")).toBe(false);
});

test("Uppercase letters in square brackets is rejected", () => {
  expect(syntax.test("[BREAD] (BALL(INK[1[35]] (CHARLIE)))")).toBe(false);
});

test("Numbers in parenthesis is rejected", () => {
  expect(syntax.test("(12) (BALL(INK[1[35]] (CHARLIE)))")).toBe(false);
});

test("Uppercase gibberish is accepted", () => {
  expect(syntax.test("[1] (RGSSTG(RHDFG[1[5]] (YJUTT)))")).toBe(true);
});

test("Single digits in square brackets is accepted", () => {
  expect(syntax.test("[1] (BALL(INK[1[5]] (CHARLIE)))")).toBe(true);
});

test("Double digits in square brackets is accepted", () => {
  expect(syntax.test("[12] (BALL(INK[14[57]] (CHARLIE)))")).toBe(true);
});

test("Varying digits in square brackets is accepted", () => {
  expect(syntax.test("[9] (BALL(INK[1422[57463464]] (CHARLIE)))")).toBe(true);
});

test("Full lowercase letters input are rejected", () => {
  expect(syntax.test("[9] (ball(ink[12[57]] (charlie)))")).toBe(false);
});

test("Mixture of lowercase and uppercase letters input are rejected", () => {
  expect(syntax.test("[9] (ball(INK[1422[57463464]] (CHArLIE)))")).toBe(false);
});

test("Prenthesis inside square brackets is rejected", () => {
  expect(syntax.test("[12] (BALL(INK[1(35)] (CHARLIE)))")).toBe(false);
});



// Parser function tests
test("Invalid parser input returns error", () => {
  expect(Parser("[12) (BALL(INK[1[35]] (CHARLIE)))")).toStrictEqual({error: 'Invalid input'});
});

test("Valid parser input returns correct data structure", () => {
  expect(Parser("[12] (BALL(INK[1[35]] (CHARLIE)))")).toStrictEqual({
    square: '12',
    child: {
      circle: 'BALL',
      child: {
        circle: 'INK',
        child: {
          child: {
            square: '1',
            child: {
              square: '35',
            },
          },
          circle: 'CHARLIE',
        },
      },
    },
  });
});

test("Parser input with varying number length returns correct data structure", () => {
  expect(Parser("[1264] (BALL(INK[0[4664433654]] (CHARLIE)))")).toStrictEqual({
    square: '1264',
    child: {
      circle: 'BALL',
      child: {
        circle: 'INK',
        child: {
          child: {
            square: '0',
            child: {
              square: '4664433654',
            },
          },
          circle: 'CHARLIE',
        },
      },
    },
  });
});

test("Parser input with varying character length returns correct data structure", () => {
  expect(Parser("[12] (BALLINTHEHOOD(I[1[35]] (CHARLIEEEEE)))")).toStrictEqual({
    square: '12',
    child: {
      circle: 'BALLINTHEHOOD',
      child: {
        circle: 'I',
        child: {
          child: {
            square: '1',
            child: {
              square: '35',
            },
          },
          circle: 'CHARLIEEEEE',
        },
      },
    },
  });
});
