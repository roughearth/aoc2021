import {
  gcd
} from "./mathsplus";

describe("mathsplus", () => {
  describe("gcd", () => {
    test.each([
      [4, 10, 2],
      [5, 10, 5],
      [7, 10, 1],
      [10, 10, 10],
    ])("2 values: gcd %i & %i is %i", (a, b, g) => {
      expect(gcd(a, b)).toBe(g);
    });

    test.each([
      [[2, 4, 6, 8, 10, 12, 14, 16, 18, 20], 2],
      [[294, 357, 3003], 21],
      [[294, 357, 3003, 21, 17], 1],
    ])("multi values: gcd %p is %i", ([a, b, ...r], g) => {
      expect(gcd(a, b, ...r)).toBe(g);
    });
  });
});
