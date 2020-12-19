// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {input, eg2, eg2List} from './input';
import {cleanAndParse, indexifyAsMap} from '../../utils';

export function part1() {
  const {rules, messages} = parseInput(input);
  const ruleZero = rules.get("0");

  if (!ruleZero) {
    throw new Error(`Rule 0 not found`);
  }

  const valid = messages.filter(
    m => {
      const {pass, length} = ruleZero.match(m, 0, rules);
      return pass && length === m.length;
    }
  );

  //265
  return valid.length;
}

export function part2() {
  const {rules, messages} = parseInput(input);
  /*
    8: 42 | 42 8
    11: 42 31 | 42 11 31
  */

  // rule zero is "8 11" which means one or more 42s followed by strictly fewer 31s
  const rule42 = rules.get("42");
  const rule31 = rules.get("31");

  const valid = messages.filter(
    (m, messageIndex) => {
      let index = 0;
      let count42s = 0;

      let {pass = false, length = 0} = rule42?.match(m, index, rules) || {};

      if (!pass) {
        return false;
      }

      while (pass) {
        count42s += 1;
        index += length;
        ({pass = false, length = 0} = rule42?.match(m, index, rules) || {});
      }

      ({pass = false, length = 0} = rule31?.match(m, index, rules) || {});

      if (!pass) {
        return false;
      }

      while (pass) {
        count42s -= 1;
        index += length;

        if (index >= m.length) {
          break;
        }

        ({pass = false, length = 0} = rule31?.match(m, index, rules) || {});
      }

      if (!pass || (count42s <= 0)) {
        return false;
      }

      return index === m.length;
    }
  );

  // 394
  return valid.length;
}

function parseRule(line: string) {
  const [id, src] = line.split(": ").map(s => s.trim());
  let match: (s: string, index: number, ruleMap: RuleMap) => {
    pass: boolean,
    length: number
  };

  if (src[0] === '"') {
    const char = src[1];
    match = (s, i) => {
      return {
        pass: s[i] === char,
        length: 1
      };
    };
  }
  else {
    const choices = src.split(" | ").map(s => s.trim().split(" "));
    match = (s, index, ruleMap) => {
      let mainPass = false;
      let lengthOffset = 0;

      for (let i = 0; i < choices.length; i++) {
        const ruleList = choices[i].map(r => ruleMap.get(r));
        lengthOffset = 0;

        for (let j = 0; j < ruleList.length; j++) {
          if (!ruleList[j]) {
            throw new Error(`Rule ${choices[i]} not found`);
          }

          const {pass = false, length = 0} = ruleList[j]?.match(s, index + lengthOffset, ruleMap) || {};
          mainPass = pass;

          if (pass) {
            lengthOffset += length;
          }
          else {
            break;
          }
        }

        if (mainPass) {
          break;
        }
      }

      return {
        pass: mainPass,
        length: lengthOffset
      };
    };
  }

  return {
    id,
    src,
    match
  };
}

function parseInput(input: string) {
  const [ruleBlock, messageBlock] = input.split("\n\n");

  const messages = cleanAndParse(messageBlock, String);
  const rules = indexifyAsMap(
    cleanAndParse(ruleBlock, parseRule),
    r => r.id
  );

  return {
    rules,
    messages
  }
}

type RuleMap = ReturnType<typeof parseInput>["rules"];
