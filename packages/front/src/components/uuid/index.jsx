import uuid from 'uuid';

class UIDKey {
  constructor(value = 'key') {
    this.value = this.init(value);
  }
  get key() {
    return this.value;
  }
  set key(value) {
    this.value = this.init(value);
  }
  init(value) {
    return `$$uuid-${value}`;
  }
}

const GUIDKey = new UIDKey().key;

export default GUIDKey;

export function addKeyForObject(object, value = GUIDKey) {
  return { ...object, [value]: uuid() };
}


// Generator 方案

function* simpleUIDGenerator() {
  let index = 0;
  while (true) {
    yield index++;
  }
}
const simpleUIDMaker = simpleUIDGenerator();
const simpleUID = function(){
  return simpleUIDMaker.next().value;
};

export function easyAddKey() {
  return simpleUID();
}
