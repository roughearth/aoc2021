import {
  coordinates,
  faceCentredCubicNeighbors,
  growRange,
  hexagonalNeighbors,
  neighbours,
  orthogonalNeighbours,
  padCoordinate,
  simpleRange,
  getKey,
  parseKey
} from "./grid";

describe("grid", () => {
  describe("simpleRange", () => {
    test("with inferred dimensions", () => {
      expect(simpleRange([3])).toEqual([
        [0, 2]
      ]);

      expect(simpleRange([5, 9])).toEqual([
        [0, 4],
        [0, 8]
      ]);

      expect(simpleRange([1, 2, 3, 4, 5])).toEqual([
        [0, 0],
        [0, 1],
        [0, 2],
        [0, 3],
        [0, 4]
      ]);
    });

    test("with explicit dimensions", () => {
      expect(simpleRange([3], 2)).toEqual([
        [0, 2],
        [0, 0]
      ]);

      expect(simpleRange([5, 9], 5)).toEqual([
        [0, 4],
        [0, 8],
        [0, 0],
        [0, 0],
        [0, 0]
      ]);

      expect(simpleRange([1, 2, 3, 4, 5], 2)).toEqual([
        [0, 0],
        [0, 1],
        [0, 2],
        [0, 3],
        [0, 4]
      ]);
    });

    test("invalid range", () => {
      expect(() => simpleRange([0])).toThrow("Range is invalid at dimension 1, 0 > -1");
    });
  });

  describe("growRange", () => {
    test("with default amount", () => {
      expect(growRange([
        [3, 5]
      ])).toEqual([
        [2, 6]
      ]);

      expect(growRange([
        [ 4, 9],
        [ 0, 2],
        [-1, 7]
      ])).toEqual([
        [ 3, 10],
        [-1, 3],
        [-2, 8]
      ]);
    });

    test("with explicit amount", () => {
      expect(growRange([
        [3, 5]
      ], 2)).toEqual([
        [1, 7]
      ]);

      expect(growRange([
        [ 4, 9],
        [ 0, 2],
        [-1, 7]
      ], 10)).toEqual([
        [ -6, 19],
        [-10, 12],
        [-11, 17]
      ]);
    });
  });

  describe("coordinates", () => {
    test("1d", () => {
      expect(Array.from(coordinates([
        [1, 3]
      ]))).toEqual([
        [1],
        [2],
        [3]
      ]);
    });

    test("2d", () => {
      expect(Array.from(coordinates([
        [-1, 3],
        [ 2, 5]
      ]))).toEqual([
        [-1, 2],
        [-1, 3],
        [-1, 4],
        [-1, 5],

        [ 0, 2],
        [ 0, 3],
        [ 0, 4],
        [ 0, 5],

        [ 1, 2],
        [ 1, 3],
        [ 1, 4],
        [ 1, 5],

        [ 2, 2],
        [ 2, 3],
        [ 2, 4],
        [ 2, 5],

        [ 3, 2],
        [ 3, 3],
        [ 3, 4],
        [ 3, 5],
      ]);
    });

    test("3d", () => {
      expect(Array.from(coordinates([
        [0, 2],
        [1, 3],
        [2, 4]
      ]))).toEqual([
        [0, 1, 2],
        [0, 1, 3],
        [0, 1, 4],
        [0, 2, 2],
        [0, 2, 3],
        [0, 2, 4],
        [0, 3, 2],
        [0, 3, 3],
        [0, 3, 4],
        [1, 1, 2],
        [1, 1, 3],
        [1, 1, 4],
        [1, 2, 2],
        [1, 2, 3],
        [1, 2, 4],
        [1, 3, 2],
        [1, 3, 3],
        [1, 3, 4],
        [2, 1, 2],
        [2, 1, 3],
        [2, 1, 4],
        [2, 2, 2],
        [2, 2, 3],
        [2, 2, 4],
        [2, 3, 2],
        [2, 3, 3],
        [2, 3, 4],
      ]);
    });

    test("7d with some fixed", () => {
      expect(Array.from(coordinates([
        [1, 2],
        [2, 3],
        [3, 4],
        [4, 4],
        [5, 5],
        [6, 6],
        [7, 7]
      ]))).toEqual([
        [1, 2, 3, 4, 5, 6, 7],
        [1, 2, 4, 4, 5, 6, 7],
        [1, 3, 3, 4, 5, 6, 7],
        [1, 3, 4, 4, 5, 6, 7],
        [2, 2, 3, 4, 5, 6, 7],
        [2, 2, 4, 4, 5, 6, 7],
        [2, 3, 3, 4, 5, 6, 7],
        [2, 3, 4, 4, 5, 6, 7],
      ]);
    });

    test("invalid range", () => {
      expect(() => Array.from(coordinates([
        [1, 0]
      ]))).toThrow("Range is invalid at dimension 1, 1 > 0");
    });
  });

  describe("neighbors", () => {
    test("1d", () => {
      expect(Array.from(neighbours([1]))).toEqual([
        [0],
        [2]
      ]);
    });

    test("2d", () => {
      expect(Array.from(neighbours([1, 2]))).toEqual([
        [0, 1],
        [0, 2],
        [0, 3],
        [1, 1],
        [1, 3],
        [2, 1],
        [2, 2],
        [2, 3],
      ]);
    });

    test("3d", () => {
      expect(Array.from(neighbours([1, 2, 3]))).toEqual([
        [0, 1, 2],
        [0, 1, 3],
        [0, 1, 4],
        [0, 2, 2],
        [0, 2, 3],
        [0, 2, 4],
        [0, 3, 2],
        [0, 3, 3],
        [0, 3, 4],
        [1, 1, 2],
        [1, 1, 3],
        [1, 1, 4],
        [1, 2, 2],
        [1, 2, 4],
        [1, 3, 2],
        [1, 3, 3],
        [1, 3, 4],
        [2, 1, 2],
        [2, 1, 3],
        [2, 1, 4],
        [2, 2, 2],
        [2, 2, 3],
        [2, 2, 4],
        [2, 3, 2],
        [2, 3, 3],
        [2, 3, 4]
      ]);
    });
  });

  describe("orthogonalNeighbours", () => {
    test("1d", () => {
      expect(Array.from(orthogonalNeighbours([1]))).toEqual([
        [0],
        [2]
      ]);
    });

    test("2d", () => {
      expect(Array.from(orthogonalNeighbours([1, 2]))).toEqual([
        [1, 1],
        [1, 3],
        [0, 2],
        [2, 2],
      ]);
    });

    test("3d", () => {
      expect(Array.from(orthogonalNeighbours([1, 2, 3]))).toEqual([
        [1, 2, 2],
        [1, 2, 4],
        [1, 1, 3],
        [1, 3, 3],
        [0, 2, 3],
        [2, 2, 3]
      ]);
    });
  });

  test("hexagonalNeighbors", () => {
    expect(Array.from(hexagonalNeighbors([1, 2]))).toEqual([
      [0, 2],
      [1, 1],
      [0, 3],
      [2, 1],
      [1, 3],
      [2, 2]
    ]);
  });

  describe("faceCentredCubicNeighbors", () => {
    test("3d", () => {
      expect(Array.from(faceCentredCubicNeighbors([1, 2, 3]))).toEqual([
        [1, 2, 2],
        [1, 3, 2],
        [2, 2, 2],
        [0, 2, 3],
        [1, 1, 3],
        [0, 3, 3],
        [2, 1, 3],
        [1, 3, 3],
        [2, 2, 3],
        [0, 2, 4],
        [1, 1, 4],
        [1, 2, 4],
      ]);
    });

    it("should be symetrrically hexagonal on all three axes", () => {
      const Hex = Array.from(hexagonalNeighbors([0,0])).sort();

      const YZplane = [];
      const XZplane = [];
      const XYplane = [];

      for(const [x, y, z] of faceCentredCubicNeighbors([0,0,0])) {
        if (x === 0) {
          YZplane.push([y,z]);
        }
        if (y === 0) {
          XZplane.push([x,z]);
        }
        if (z === 0) {
          XYplane.push([x,y]);
        }
      }

      YZplane.sort();
      XZplane.sort();
      XYplane.sort();

      expect(Hex).toEqual(YZplane);
      expect(Hex).toEqual(XZplane);
      expect(Hex).toEqual(XYplane);
    });
  });

  test("padCoordinate", () => {
    expect(padCoordinate([1, 2, 3], 7)).toEqual([1, 2, 3, 0, 0, 0, 0]);
  });

  test("getKey", () => {
    expect(getKey([1, 2, 3])).toEqual("1,2,3");
  });

  test("parseKey", () => {
    expect(parseKey("1,2,3")).toEqual([1, 2, 3]);
  });
});
