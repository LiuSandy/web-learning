const cloneGraph = (node, visited = {}) => {
    if (!node) {
        return node
    }

    if (visited[node.val]) {
        return visited[node.val]
    }
    // 克隆节点
    const clone_node = new Node(node.val, []);
    visited[node] = clone_node;

    const clone_neighbors = []
    for (const neighbor of node.neighbors) {
        clone_neighbors.push(cloneGraph(neighbor, visited))
    }
    clone_node.neighbors = clone_neighbors
    return clone_node
}
const map = new Map()
const cloneGraphV1 = (node) => {
    if (!node) {
        return node
    }

    if (map.has(node)) {
        return map.get(node)
    }
    // 克隆节点
    const clone_node = new Node(node.val, []);
    map.set(node, clone_node);

    for (const neighbor of node.neighbors) {
        clone_node.clone_neighbors.push(cloneGraph(neighbor))
    }
    return clone_node
}

