/**
 * 705. Design HashSet
 * 不使用任何内建的哈希表库设计一个哈希集合（HashSet）。
 */

/**
 * Initialize your data structure here.
 */
 var MyHashSet = function () {
  this.base = 769
  this.data = new Array(this.base).fill(0).map(() => new Array())
};

/** 
 * @param {number} key
 * @return {void}
 */
MyHashSet.prototype.add = function (key) {
  const h = this.hash(key)
  if (this.data[h].includes(key)) {
    return
  }
  this.data[h].push(key)
};

/** 
 * @param {number} key
 * @return {void}
 */
MyHashSet.prototype.remove = function (key) {
  const h = this.hash(key)
  const itemList = this.data[h]
  const index = itemList.indexOf(key);
  itemList.splice(index, 1)
};

/**
 * Returns true if this set contains the specified element 
 * @param {number} key
 * @return {boolean}
 */
MyHashSet.prototype.contains = function (key) {
  const h = this.hash(key)
  return this.data[h].includes(key)
};

/**
 * 设计 hash 函数
 * 把key值映射为数组下表的值的函数叫做哈希函数/散列函数，
 * 返回的值叫做散列值/哈希值
 */
MyHashSet.prototype.hash = function (key) {
  return key & this.base
}

/**
 * Your MyHashSet object will be instantiated and called as such:
 * var obj = new MyHashSet()
 * obj.add(key)
 * obj.remove(key)
 * var param_3 = obj.contains(key)
 */