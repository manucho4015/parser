const Parser = (input) => {
  // const syntax =
  //   /[[\d+:\d+]]\s*\([A-Z]*\([A-Z]*[[\d+:\d+][[\d+:\d+]]]\s+\([A-Z]*\)\)\)*/;
  const syntax =
    /[[\d+:\d+]]\s+\([A-Z]*\([A-Z]*\[[0-9]*\[[0-9]*\]\]\s+\([A-Z]*\)\)\)/;
  if (syntax.test(input)) {
    return true;
  } else {
    return false;
  }
};
("[12] (BALL(INK[1[35]] (CHARLIE)))");
// const upperCase = /^\([A-Z]*\)$/;
console.log(Parser("[12] (BALL(INK[1[35]] (CHARLIE)))"));
// console.log(upperCase.test("(MANUCHa)"));

