export default class ArrayArrange {
  constructor() {
    this.pairs = [];
  }

  addArrayPair({ child, parent }) {
    this.pairs = [...this.pairs, [child, parent]];
  }

  getArrayPairs() {
    return this.pairs;
  }

  arrangePairs({ pairs }) {
    return this.sort_left_right(pairs[0][0], pairs[0][1], pairs);
  }

  sort_left_right(item_parent, item_child, array) {
    let item_as_child = item_parent;
    let item_as_parent = item_child;

    let right_wing = [];
    let left_wing = [];

    let childd = this.find_child(item_as_parent, array);
    while (item_as_child || item_as_parent) {
      item_as_child = this.find_parent(item_as_child, array);
      item_as_child && left_wing.unshift(item_as_child);
      item_as_parent = this.find_child(item_as_parent, array);
      item_as_parent && right_wing.push(item_as_parent);
    }
    return left_wing.concat(right_wing);
  }

  find_parent(item_child, array) {
    for (let i = 0; i < array.length; i++) {
      if (array[i][0] === item_child) {
        console.log(array[i][1]);
        return array[i][1];
      }
    }
    return false;
  }

  find_child(item_parent, array) {
    for (let i = 0; i < array.length; i++) {
      if (array[i][1] === item_parent) {
        return array[i][0];
      }
    }
    return false;
  }
}
