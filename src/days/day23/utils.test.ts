import { eg1, input } from "./input";
import { getAvailablStateChanges, makeNode, nextUnvisitedNode, parseInput } from "./utils";

describe("day 23 utils", () => {
  describe("parseInput", () => {
    test("eg1", () => {
      expect(parseInput(eg1)).toEqual(',,BA,,CD,,BC,,DA,,');
    });

    test("input", () => {
      expect(parseInput(input)).toEqual(',,DD,,CA,,BA,,CB,,');
    });
  });

  describe("nextUnvisitedNode", () => {
    it("middle, only", () => {
      const testMap = new Map([
        ['a', makeNode('a', 100, [])],
        ['b', makeNode('b', 10, [])],
        ['c', makeNode('c', 100, [])]
      ]);

      expect(nextUnvisitedNode(testMap)).toBe(testMap.get('b'));
    });

    it("start, only", () => {
      const testMap = new Map([
        ['a', makeNode('a', 1, [])],
        ['b', makeNode('b', 10, [])],
        ['c', makeNode('c', 100, [])]
      ]);

      expect(nextUnvisitedNode(testMap)).toBe(testMap.get('a'));
    });

    it("several", () => {
      const testMap = new Map([
        ['a', makeNode('a', 1, [])],
        ['b', makeNode('b', 10, [])],
        ['c', makeNode('c', 1, [])]
      ]);

      expect(nextUnvisitedNode(testMap)).toBe(testMap.get('a'));
    });
  });

  describe("getAvailablStateChanges", () => {
    test("start pos", () => {
      expect(Array.from(getAvailablStateChanges(",,BA,,CD,,BC,,DA,,", 2).entries())).toEqual([
        [ 'B,,A,,CD,,BC,,DA,,', [ 30, 'B', 'hall' ] ],
        [ ',B,A,,CD,,BC,,DA,,', [ 20, 'B', 'hall' ] ],
        [ ',,A,B,CD,,BC,,DA,,', [ 20, 'B', 'hall' ] ],
        [ ',,A,,CD,B,BC,,DA,,', [ 40, 'B', 'hall' ] ],
        [ ',,A,,CD,,BC,B,DA,,', [ 60, 'B', 'hall' ] ],
        [ ',,A,,CD,,BC,,DA,B,', [ 80, 'B', 'hall' ] ],
        [ ',,A,,CD,,BC,,DA,,B', [ 90, 'B', 'hall' ] ],

        [ 'C,,BA,,D,,BC,,DA,,', [ 500, 'C', 'hall' ] ],
        [ ',C,BA,,D,,BC,,DA,,', [ 400, 'C', 'hall' ] ],
        [ ',,BA,C,D,,BC,,DA,,', [ 200, 'C', 'hall' ] ],
        [ ',,BA,,D,C,BC,,DA,,', [ 200, 'C', 'hall' ] ],
        [ ',,BA,,D,,BC,C,DA,,', [ 400, 'C', 'hall' ] ],
        [ ',,BA,,D,,BC,,DA,C,', [ 600, 'C', 'hall' ] ],
        [ ',,BA,,D,,BC,,DA,,C', [ 700, 'C', 'hall' ] ],

        [ 'B,,BA,,CD,,C,,DA,,', [ 70, 'B', 'hall' ] ],
        [ ',B,BA,,CD,,C,,DA,,', [ 60, 'B', 'hall' ] ],
        [ ',,BA,B,CD,,C,,DA,,', [ 40, 'B', 'hall' ] ],
        [ ',,BA,,CD,B,C,,DA,,', [ 20, 'B', 'hall' ] ],
        [ ',,BA,,CD,,C,B,DA,,', [ 20, 'B', 'hall' ] ],
        [ ',,BA,,CD,,C,,DA,B,', [ 40, 'B', 'hall' ] ],
        [ ',,BA,,CD,,C,,DA,,B', [ 50, 'B', 'hall' ] ],

        [ 'D,,BA,,CD,,BC,,A,,', [ 9000, 'D', 'hall' ] ],
        [ ',D,BA,,CD,,BC,,A,,', [ 8000, 'D', 'hall' ] ],
        [ ',,BA,D,CD,,BC,,A,,', [ 6000, 'D', 'hall' ] ],
        [ ',,BA,,CD,D,BC,,A,,', [ 4000, 'D', 'hall' ] ],
        [ ',,BA,,CD,,BC,D,A,,', [ 2000, 'D', 'hall' ] ],
        [ ',,BA,,CD,,BC,,A,D,', [ 2000, 'D', 'hall' ] ],
        [ ',,BA,,CD,,BC,,A,,D', [ 3000, 'D', 'hall' ] ]
      ]);
    });

    test("one move", () => {
      expect(Array.from(getAvailablStateChanges("B,,A,,CD,,BC,,DA,,", 2).entries())).toEqual([
        [ 'B,C,A,,D,,BC,,DA,,', [ 400, 'C', 'hall' ] ],
        [ 'B,,A,C,D,,BC,,DA,,', [ 200, 'C', 'hall' ] ],
        [ 'B,,A,,D,C,BC,,DA,,', [ 200, 'C', 'hall' ] ],
        [ 'B,,A,,D,,BC,C,DA,,', [ 400, 'C', 'hall' ] ],
        [ 'B,,A,,D,,BC,,DA,C,', [ 600, 'C', 'hall' ] ],
        [ 'B,,A,,D,,BC,,DA,,C', [ 700, 'C', 'hall' ] ],

        [ 'B,B,A,,CD,,C,,DA,,', [ 60, 'B', 'hall' ] ],
        [ 'B,,A,B,CD,,C,,DA,,', [ 40, 'B', 'hall' ] ],
        [ 'B,,A,,CD,B,C,,DA,,', [ 20, 'B', 'hall' ] ],
        [ 'B,,A,,CD,,C,B,DA,,', [ 20, 'B', 'hall' ] ],
        [ 'B,,A,,CD,,C,,DA,B,', [ 40, 'B', 'hall' ] ],
        [ 'B,,A,,CD,,C,,DA,,B', [ 50, 'B', 'hall' ] ],

        [ 'B,D,A,,CD,,BC,,A,,', [ 8000, 'D', 'hall' ] ],
        [ 'B,,A,D,CD,,BC,,A,,', [ 6000, 'D', 'hall' ] ],
        [ 'B,,A,,CD,D,BC,,A,,', [ 4000, 'D', 'hall' ] ],
        [ 'B,,A,,CD,,BC,D,A,,', [ 2000, 'D', 'hall' ] ],
        [ 'B,,A,,CD,,BC,,A,D,', [ 2000, 'D', 'hall' ] ],
        [ 'B,,A,,CD,,BC,,A,,D', [ 3000, 'D', 'hall' ] ]
        ]);
    });

    const workedEg: [string, [number, string, string]][] = [
      [',,BA,,CD,,BC,,DA,,', [    0, '-', '-' ]],
      [',,BA,B,CD,,C,,DA,,', [   40, 'B', 'hall' ]],
      [',,BA,B,D,C,C,,DA,,', [  200, 'C', 'hall' ]], // intermediate
      [',,BA,B,D,,CC,,DA,,', [  200, 'C', 'home' ]],
      [',,BA,B,,D,CC,,DA,,', [ 3000, 'D', 'hall' ]], // intermediate
      [',,BA,,B,D,CC,,DA,,', [   30, 'B', 'home' ]],
      [',,A,B,B,D,CC,,DA,,', [   20, 'B', 'hall' ]], // intermediate
      [',,A,,BB,D,CC,,DA,,', [   20, 'B', 'home' ]],
      [',,A,,BB,D,CC,D,A,,', [ 2000, 'D', 'hall' ]], // intermediate
      [',,A,,BB,D,CC,D,,A,', [    3, 'A', 'hall' ]],
      [',,A,,BB,D,CC,,D,A,', [ 3000, 'D', 'home' ]], // intermediate
      [',,A,,BB,,CC,,DD,A,', [ 4000, 'D', 'home' ]],
      [',,AA,,BB,,CC,,DD,,', [    8, 'A', 'home' ]]
    ];

    const testCases: [string, string, [number, string, string]][] = [];

    for (let i = 0; i < workedEg.length - 1; i++) {
      testCases[i] = [workedEg[i][0], workedEg[i + 1][0], workedEg[i + 1][1]];
    }

    test.each(testCases)("step of the worked example from %s", (s1, s2, c) => {
      expect(Array.from(getAvailablStateChanges(s1, 2).entries()))
        .toEqual(
          expect.arrayContaining([[s2, c]])
        );
    });
  });
});


