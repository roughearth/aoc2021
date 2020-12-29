// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {input, eg1} from './input';
import {cleanAndParse, coordinates as gridCoordinates, simpleRange} from '../../utils';

export function part1() {
  const tileset = paresTiles(input);
  const {corners} = findSides(tileset);

  // 79412832860579
  return corners.reduce(
    (prod, tile) => prod * tile.id,
    1
  );
}

export function part2() {
  const tileset = paresTiles(input);
  const {
    corners: cornerTiles,
    sides: sideTiles,
    middles: middleTiles,
  } = findSides(tileset);

  const {size} = tileset;
  const tileGrid = blankGrid(size);
  const usedTiles = new Set<Tile>();

  const startingTile = cornerTiles[0];
  startingTile.orientation = startingTile.orientations.filter(({edges: [t,,,l]}) => {
    return hasUnmatchedEdge(startingTile, t) && hasUnmatchedEdge(startingTile, l);
  })[0];

  tileGrid[0][0] = startingTile;

  for(const [row, column] of coordinates(size)) {
    if (row === 0 && column === 0) {
      continue;
    }

    let testTop: (t: Tile) => boolean;
    let matchTop: (t: Tile, e: number) => boolean;
    let testLeft: (t: Tile) => boolean;
    let matchLeft: (t: Tile, e: number) => boolean;

    if (row === 0) {
      testTop = tile => true;
      matchTop = (tile, edge) => hasUnmatchedEdge(tile, edge);
    }
    else {
      testTop = tile => {
        const tileAboveBottomEdge = tileGrid[row - 1][column].orientation.edges[2];
        return tile.allMaskValues.includes(tileAboveBottomEdge);
      };
      matchTop = (tile, edge) => {
        const tileAbove = tileGrid[row - 1][column];
        return matchesEdge(tile, edge, tileAbove, 2);
      };
    }

    if (column === 0) {
      testLeft = tile => true;
      matchLeft = (tile, edge) => hasUnmatchedEdge(tile, edge);
    }
    else {
      testLeft = tile => {
        const tileToLeftRightEdge = tileGrid[row][column - 1].orientation.edges[1];
        return tile.allMaskValues.includes(tileToLeftRightEdge);
      };
      matchLeft = (tile, edge) => {
        const tileToLeft = tileGrid[row][column - 1];
        return matchesEdge(tile, edge, tileToLeft, 1);
      }
    }

    const isLRSide = [0, size - 1].includes(column);
    const isTBSide = [0, size - 1].includes(row);

    let tileTypes = middleTiles;

    if (isLRSide && isTBSide) {
      tileTypes = cornerTiles;
    }
    else if (isLRSide || isTBSide) {
      tileTypes = sideTiles;
    }

    const availableNextTiles = tileTypes.filter(tile => (!usedTiles.has(tile) && testLeft(tile) && testTop(tile)));

    const [nextTile] = availableNextTiles;

    const availableOrientations = nextTile.orientations.filter(({edges: [t,,,l]}) => {
      return matchTop(nextTile, t) && matchLeft(nextTile, l);
    });

    nextTile.orientation = availableOrientations[0];

    tileGrid[row][column] = nextTile;
    usedTiles.add(nextTile);
  }

  const mainMap: string[][] = [];

  for(const [row, column] of coordinates(size)) {
    const {src, orientation: {flip, rotation}} = tileGrid[row][column];

    const tile = orientedTile(src, flip, rotation, true);

    const size = 8;

    for (let i = 0; i < tile.length; i++) {
      const r = mainMap[i + size * row] = mainMap[i + size * row] || [];
      r.push(...Array.from(tile[i]));
    }
  }

  const image = mainMap.map(l => l.join(""));
  const imageSize = image.length;

  const seaMonsterSrc = [
    "                  # ",
    "#    ##    ##    ###",
    " #  #  #  #  #  #   "
  ];

  const seaMonsterRegExSrc = seaMonsterSrc.map(l => l.replaceAll(" ", "[.#O]"))
  .join(`[.#OR]{${imageSize - 19}}`);

  const seaMonsterReplaceSrc = Array.from(seaMonsterSrc.join(" ".repeat(imageSize - 19)));

  const seaMonster = new RegExp(seaMonsterRegExSrc);

  for (const flip of Flip) {
    for (const rotation of Rotation) {
      const oriented = orientedTile(image, flip, rotation, false);
      const fullString = oriented.join("R");

      if (seaMonster.test(fullString)) {
        let replaced = fullString;
        do {
          replaced = replaced.replace(seaMonster, found => {
            const foundArray = Array.from(found);
            for (let i = 0; i < seaMonsterReplaceSrc.length; i++) {
              if (seaMonsterReplaceSrc[i] === "#") {
                foundArray[i] = "O";
              }
            }

            return foundArray.join("");
          });
        }
        while (seaMonster.test(replaced))

        return Array.from(replaced).filter(c => c === "#").length;
      }
    }
  }

  return "Not found";
}

function hasUnmatchedEdge(tile: Tile, value: number) {
  const index = tile.maskValues.indexOf(value);
  const reverseIndex = tile.reversedValues.indexOf(value);

  return tile.unmatchedEdges.has(index) || tile.unmatchedEdges.has(reverseIndex);
}

function matchesEdge(tile: Tile, value: number, prevTile: Tile, edgeIndex: number) {
  const targetEdge = <number>prevTile.orientation?.edges[edgeIndex];

  return value === targetEdge;
}

function findSides({tiles}: TileSet) {
  const corners: Tile[] = [];
  const sides: Tile[] = [];
  const middles: Tile[] = [];

  tiles.forEach(
    tile => {
      const {unmatchedEdges} = tile;

      outer:
      for (const mask of tile.maskValues) {
        for (const candidateTile of tiles) {
          if (candidateTile === tile) {
            continue;
          }

          for (const candidateMask of candidateTile.allMaskValues) {
            if (candidateMask === mask) {
              unmatchedEdges.delete(tile.maskValues.indexOf(mask));
              continue outer;
            }
          }
        }
      }

      switch(unmatchedEdges.size) {
        case 2:
          corners.push(tile);
          break;
        case 1:
          sides.push(tile);
          break;
        case 0:
          middles.push(tile);
          break;
        default:
          throw new Error("incorrect matching");
      }
    }
  );

  return {
    corners,
    sides,
    middles
  };
}

function coordinates(size: number) {
  return gridCoordinates(simpleRange([size, size]));
}

const Rotation = <const>[0, 1, 2, 3];
type Rotation = (typeof Rotation)[number];

const Flip = <const>[false, true];
type Flip = (typeof Flip)[number];

function toMask(side: string[], reverse: boolean): number {
  if (reverse) {
    side = [...side].reverse();
  }
  return parseInt(side.map(c => ((c === "#") ? 1 : 0)).join(""), 2);
}

function paresTiles(input: string) {
  const raw = cleanAndParse(input, String, {separator: "\n\n"});
  const SIDE = 10; // always 10x10

  const tiles = raw.map(
    r => {
      const [idline, ...lines] = cleanAndParse(r, String);

      const top = Array.from(lines[0]);
      const bottom = Array.from(lines[SIDE - 1]);
      const left = lines.map(l => l[0]);
      const right = lines.map(l => l[SIDE - 1]);

      const  T = toMask(top   , false);
      const  R = toMask(right , false);
      const  B = toMask(bottom, false);
      const  L = toMask(left  , false);

      const _T = toMask(top   , true);
      const _R = toMask(right , true);
      const _B = toMask(bottom, true);
      const _L = toMask(left  , true);

      const maskValues =     [ T,  R,  B,  L];
      const reversedValues = [_T, _R, _B, _L];

      return {
        id: Number(idline.slice(5, -1)),
        src: lines,
        maskValues,
        reversedValues,
        allMaskValues: [
          ...maskValues,
          ...reversedValues
        ],
        unmatchedEdges: new Set([0, 1, 2, 3]),
        orientation: <Orientation | undefined>undefined,
        orientations: <Orientation[]>[
          {flip: false, rotation: 0, edges: [ T,  R,  B,  L]},
          {flip: false, rotation: 1, edges: [_L,  T, _R,  B]},
          {flip: false, rotation: 2, edges: [_B, _L, _T, _R]},
          {flip: false, rotation: 3, edges: [ R, _B,  L, _T]},
          // flip swaps top and bottom
          {flip: true,  rotation: 0, edges: [ B, _R,  T, _L]},
          {flip: true,  rotation: 1, edges: [ L,  B,  R,  T]},
          {flip: true,  rotation: 2, edges: [_T,  L, _B,  R]},
          {flip: true,  rotation: 3, edges: [_R, _T, _L, _B]}
        ]
      }
    }
  )

  return {
    tiles,
    size: Math.sqrt(raw.length)
  };
}

type Orientation = {
  flip: Flip;
  rotation: Rotation
  edges: number[]
}

function orientedTile(src: string[], flip: Flip, rotation: Rotation, trim = true): string[] {
  const slices = trim ? [1, -1] : [0];
  const grid = src.slice(...slices).map(s => Array.from(s).slice(...slices));
  const size = grid.length;
  const max = size - 1;
  const out = blankGrid(size);

  if (flip) {
    grid.reverse();
  }

  for(const [row, column] of coordinates(size)) {
    switch (rotation) {
      case 0:
        out[row][column] = grid[row][column];
        break;
      case 1:
        out[column][max - row] = grid[row][column];
        break;
      case 2:
        out[max - row][max - column] = grid[row][column];
        break;
      case 3:
        out[max - column][row] = grid[row][column];
        break;
    }
  }

  return out.map(r => r.join(""));
}

function blankGrid(size: number) {
  return   Array.from({length: size}, () => Array(size));
}

type TileSet = ReturnType<typeof paresTiles>;
type Tile = TileSet['tiles'][number];
