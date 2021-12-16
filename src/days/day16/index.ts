import {input} from './input';

export const meta = {};

function expandToBinary(hex: string) {
  return Array.from(hex).map(c => parseInt(c, 16).toString(2).padStart(4, "0")).join("");
}

type Packet = {
  version: number,
  type: number,
  value?: number,
  subpackets?: Packet[]
};

function sliceInt(top: string, start: number, length: number) {
  const sub = top.slice(start, start + length);
  return parseInt(sub, 2);
}

function parsePacket(top: string, cursor: number): [Packet, number] {
  const version = sliceInt(top, cursor, 3);
  const type = sliceInt(top, cursor + 3, 3);

  if (type === 4) {
    let bin = '';
    cursor += 6;
    let more;

    do {
      more = top[cursor] === '1';
      bin += top.slice(cursor + 1, cursor + 5);
      cursor += 5;
    } while (more)

    return [{version, type, value: parseInt(bin, 2)}, cursor];
  }

  cursor += 6;
  const lengthType = top[cursor];
  cursor += 1;
  const subpackets: Packet[] = [];


  if (lengthType === "0") { // in bits
    const lengthInBits = sliceInt(top, cursor, 15);
    cursor += 15;
    const endCursor = cursor + lengthInBits;
    let nextSubPacket: Packet;

    while (cursor < endCursor) {
      [nextSubPacket, cursor] = parsePacket(top, cursor);
      subpackets.push(nextSubPacket);
    }
  }
  else {
    let packetCount = sliceInt(top, cursor, 11);
    cursor += 11;
    let nextSubPacket: Packet;

    while (packetCount--) {
      [nextSubPacket, cursor] = parsePacket(top, cursor);
      subpackets.push(nextSubPacket);
    }
  }

  return [{version, type, subpackets}, cursor];
}

function versionSum(packet: Packet) {
  let sum = 0;

  sum += packet.version;

  if (packet.subpackets) {
    for (let sub of packet.subpackets) {
      sum += versionSum(sub);
    }
  }

  return sum;
}

function getValue({type, subpackets, value}: Packet): number {
  if (subpackets) {
    const [A, B] = subpackets;

    switch (type) {
      case 0: { // sum
        return subpackets.map(p => getValue(p)).reduce(
          (a, b) => (a + b)
        );
      }
      case 1: { // product
        return subpackets.map(p => getValue(p)).reduce(
          (a, b) => (a * b)
        );
      }
      case 2: { // min
        return Math.min(...subpackets.map(p => getValue(p)));
      }
      case 3: { // max
        return Math.max(...subpackets.map(p => getValue(p)));
      }
      case 5: { // a > b
        return getValue(A) > getValue(B) ? 1 : 0;
      }
      case 6: { // a < b
        return getValue(A) < getValue(B) ? 1 : 0;
      }
      case 7: { // a == b
        return getValue(A) === getValue(B) ? 1 : 0;
      }
    }
  }

  return value as number;
}


export function part1() {
  const top = expandToBinary(input);
  const topPacket = parsePacket(top, 0);
  return versionSum(topPacket[0]);
}

export function part2() {
  const top = expandToBinary(input);
  const topPacket = parsePacket(top, 0);
  return getValue(topPacket[0]);
}
