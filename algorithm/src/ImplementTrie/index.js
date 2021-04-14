/**
 * 208. Implement Trie (Prefix Tree)
 * 208. 实现 Trie (前缀树)
 */

/**
 * Initialize your data structure here.
 */
var Trie = function () {
  this.trie = {}
};

/**
 * Inserts a word into the trie. 
 * @param {string} word
 * @return {void}
 */
Trie.prototype.insert = function (word) {
  let node = this.trie
  for (const chart of word) {
    if (!node[chart]) {
      node[chart] = {}
    }
    node = node[chart]
  }
  node.isEnd = true
};

Trie.prototype.searchPrefix = function (prefix) {
  let node = this.trie
  for (const pre of prefix) {
    if (!node[pre]) {
      return false
    }
    node = node[pre]
  }
  return node
}

/**
 * Returns if the word is in the trie. 
 * @param {string} word
 * @return {boolean}
 */
Trie.prototype.search = function (word) {
  const node = this.startsWith(word)
  return node !== undefined && node.isEnd !== undefined
};

/**
 * Returns if there is any word in the trie that starts with the given prefix. 
 * @param {string} prefix
 * @return {boolean}
 */
Trie.prototype.startsWith = function (prefix) {
  let node = this.trie
  for (const pre of prefix) {
    if (!node[pre]) {
      return false
    }
    node = node[pre]
  }
  return node
};

/**
 * Your Trie object will be instantiated and called as such:
 * var obj = new Trie()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */