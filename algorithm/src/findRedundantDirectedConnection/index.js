export default (edges) => {
    const edgesLen = edges.length
    const uf = new UnionFind(edges.length + 1);
    const parents = [];
    for (let i = 0; i < edges.length + 1; i++) {
        parents[i] = i
    };
    // 冲突
    let conflict = -1;
    // 环路
    let cycle = -1;
    for (let i = 0; i < edgesLen; i++) {
        const [node1, node2] = edges[i]
        if (parents[node2] !== node2) {
            conflict = i
        } else {
            parents[node2] = node1
            if (uf.find(node1) === uf.find(node2)) {
                cycle = i
            } else {
                uf.union(node1, node2)
            }
        }
    }
    if (conflict < 0) {
        return [edges[cycle][0], edges[cycle][1]]
    } else {
        const tempEdges = edges[conflict]
        if (cycle >= 0) {
            return [parents[tempEdges[1]], tempEdges[1]]
        } else {
            return tempEdges
        }
    }
}


class UnionFind {
    constructor(n) {
        this.ancestor = [];
        for (let i = 0; i < n; i++) {
            this.ancestor[i] = i
        }
    }

    union(i, j) {
        this.ancestor[this.find(i)] = this.find(j)
    }

    find(i) {
        if (this.ancestor[i] !== i) {
            this.ancestor[i] = this.find(this.ancestor[i])
        }
        return this.ancestor[i];
    }
}