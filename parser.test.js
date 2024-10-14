const { syntax } = require("./parser");

test("Mismatched parenthesis is rejected", () => {
  expect(syntax.test("[12) (BALL(INK[1[35]] (CHARLIE)))")).toBe(false);
});

test("Uppercase letters in square brackets is rejected", () => {
  expect(syntax.test("[BREAD] (BALL(INK[1[35]] (CHARLIE)))")).toBe(false);
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

test("Lowercase letters are rejected", () => {
  expect(syntax.test("[9] (BAlL(INK[1422[57463464]] (CHARLIE)))")).toBe(false);
});

test("Prenthesis inside square brackets is rejected", () => {
  expect(syntax.test("[12] (BALL(INK[1(35)] (CHARLIE)))")).toBe(false);
});
