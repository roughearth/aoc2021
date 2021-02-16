export function ArrayKeyedMap(initialEntries) {
  const rootMap = new Map();

  if (initialEntries) {
    for(const [key, value] of initialEntries) {
      setValue(rootMap, key, value);
    }
  }

  const _this = {
    hasGet: keyArray => getValue(rootMap, keyArray),
    has:    keyArray => getValue(rootMap, keyArray)[0],
    get:    keyArray => getValue(rootMap, keyArray)[1],

    set: (keyArray, value) => {setValue(rootMap, keyArray, value); return _this;},

    forEach(callback, thisArg) { mapEach(rootMap, _this, callback, thisArg); },

    delete: keyArray => deleteValue(rootMap, keyArray),

    clear() {rootMap.clear()},

    get size() { return Array.from(allValues(rootMap)).length; },

    *entries() {yield *allEntries(rootMap)},
    *keys()    {yield *allKeys   (rootMap)},
    *values()  {yield *allValues (rootMap)},

    *[Symbol.iterator]() {yield *allEntries(rootMap)}
  };

  return _this;
}
ArrayKeyedMap[Symbol.species] = ArrayKeyedMap

/* Helpers */

function mapEach(rootMap, callbackMapArg, callback, thisArg) {
  for(const [key, value] of allEntries(rootMap)) {
    callback.call(thisArg, value, key, callbackMapArg);
  }
}

function *getEntries(map, baseKey, limit) {
  for(const [key, next] of map.entries()) {
    const newKey = [...baseKey, key];
    if (limit > 1) {
      yield *getEntries(next, newKey, limit - 1);
    }
    else {
      yield [newKey, next];
    }
  }
}


function *allEntries(rootMap) {
  for(const [len, map] of rootMap.entries()) {
    yield *getEntries(map, [], len);
  }
}

function *allKeys(rootMap) {
  for(const [k] of allEntries(rootMap)) {
    yield k;
  }
}

function *allValues(rootMap) {
  for(const [, v] of allEntries(rootMap)) {
    yield v;
  }
}

function deleteAndClear(map, keys) {
  const [thisKey, ...nextKeys] = keys;
  if (!map.has(thisKey)) {
    return false;
  }
  else if (nextKeys.length === 0) {
    return map.delete(thisKey);
  }
  else {
    const nextMap = map.get(thisKey);
    const deleted = deleteAndClear(nextMap, nextKeys);
    if (nextMap.size === 0) {
      map.delete(thisKey);
    }

    return deleted;
  }
}

function deleteValue(rootMap, keyArray) {
  return deleteAndClear(rootMap, mapKeys(keyArray));
}

function getValue(rootMap, keyArray) {
  let current = rootMap;

  for (const key of mapKeys(keyArray)) {
    if (!current.has(key)) {
      return [false];
    }
    current = current.get(key);
  }

  return [true, current];
}

function setValue(rootMap, keyArray, value) {
  const keys = mapKeys(keyArray);
  const lastKey = keys.pop();

  let current = rootMap;

  for (const key of keys) {
    if (!current.has(key)) {
      current.set(key, new Map());
    }
    current = current.get(key);
  }

  current.set(lastKey, value);
}

function mapKeys(keyArray) {
  return [keyArray.length, ...keyArray];
}
