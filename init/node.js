/**
 * 图节点的结构
 */
class GraphNode {
    /**
     * 构造函数
     * 
     * @param {string} name 
     * @param {number[]} features 
     * @param {Set<GraphNode>} neighbors 
     */
    constructor(name, features, neighbors) {
        this.name = name
        this.features = features
        this.neighbors = neighbors
    }
}

/**
 * 函数式构造图节点
 * 
 * @param {string} name 
 * @param {number[]} features 
 * @param {any[]} neighbors 
 */
function getNode(name, features, neighbors) {
    features = features || []
    neighbors = neighbors || []

    const node = new GraphNode(name, features)
    
    return node
}

/**
 * 获得两个图节点的关联强度
 * 
 * @param {GraphNode} u 
 * @param {GraphNode} v 
 * @return {number}
 */
function getTie(u, v) {
    const { neighbors } = u
    for (let item of neighbors) {
        if (item.ref === v) {
            return item.tie
        }
    }

    return 0
}

/**
 * 获得两个图节点的共同邻居
 * 
 * @param {GraphNode} u 
 * @param {GraphNode} v 
 * @return {GraphNode[]}
 */
function getCommonNeighbors(u, v) {
    // 借助hashmap将复杂度降低为 O(N + N) = O(N)
    // 注意这里需要用WeakMap，防止内存泄漏
    const hashmap = new WeakMap()
    u.neighbors.forEach(neighbor => hashmap.set(neighbor.ref, true))
    
    return v.neighbors
        .filter(neighbor => hashmap.get(neighbor.ref) === true)
        .map(neighbor => neighbor.ref)
}

module.exports = {
    GraphNode, 
    getNode,
    getTie,
    getCommonNeighbors
}