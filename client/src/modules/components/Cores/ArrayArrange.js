export default class ArrayArrange {
  constructor() {
    this.pairs = [];
    this.child_counter = [];
    this.dynamic_parent = [];
    this.parent_collection = [];
    this.additional_item_for_dynamic = [];
    this.template_definition = "";
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

  add_parent_to_collection({ parent }) {
    return this.parent_collection.push(parent);
  }

  getParentCollection() {
    return this.parent_collection;
  }

  item_to_add_for_dynamic({ item_to_add, parent }) {
    let unique = true;

    this.additional_item_for_dynamic.map((data, index) => {
      if (data.parent === parent) {
        unique = false;
        this.additional_item_for_dynamic[index] = { item_to_add, parent };
      }
    });

    if (unique) {
      this.additional_item_for_dynamic.push({ item_to_add, parent });
    }

    return null;
  }

  getAdditionals() {
    return this.additional_item_for_dynamic;
  }

  reworkArray({ array, additionals, parents }) {
    // remove current reference additionals
    additionals.map((additional) => {
      while (array.indexOf(additional.item_to_add) > -1) {
        array.splice(array.indexOf(additional.item_to_add), 0);
      }
    });

    // add additionals with respect to new parent count and dynamic parent declarations
    additionals.map((additional) => {
      //  get number of parents of type additional.parent
      array.splice(
        array.indexOf(additional.parent) +
          this.get_number_of_parent({
            array: parents,
            reference: additional.parent,
          }) +
          1,
        0,
        additional.item_to_add
      );
    });

    return array;
  }

  get_number_of_parent({ array, reference }) {
    return array.filter((data) => data === reference).length;
  }

  set_parent_as_dynamic({ parent }) {
    if (this.dynamic_parent.indexOf(parent) < 0) {
      this.dynamic_parent.push(parent);
    }
    return true;
  }

  getDynamicParents() {
    return this.dynamic_parent;
  }

  check_if_dynamic({ parent }) {
    if (this.dynamic_parent.indexOf(parent) > -1) {
      return true;
    }
    return false;
  }

  setGridTemplateDefinition({ template_definition }) {
    this.template_definition = template_definition;
  }

  getGridTemplateDefinition() {
    return this.template_definition;
  }
}
