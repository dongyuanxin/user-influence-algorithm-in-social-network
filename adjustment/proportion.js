const { GraphNode } = require('./../init/node')
const { estimateAffinity } = require('./../init/affinity')

class ProportionMatrix {
    constructor() {
        this.cache = {}
    }

    /**
     * 计算节点v在节点u所有邻居节点中占有的比例
     * 注意：顺序千万别搞错
     * 
     * @param {GraphNode} u 
     * @param {GraphNode} v 
     * @return {number}
     */
    calc(u, v) {
        if (!(u instanceof GraphNode) || !(v instanceof GraphNode)) {
            throw TypeError('Param `u` or `v` must be GraphNode')
        }

        // 矩阵P(i, i)为0
        if (u.name === v.name) {
            return 0
        }

        const key = this.hash(u, v)
        if (this.cache[key] !== undefined) {
            return this.cache[key] || 0
        }
        // 计算u和邻居节点的总相似度
        const { neighbors } = u
        let totalNeighborAffinity = 0

        for (const neighbor of neighbors) {
            // 在做计算的时候，只考虑了节点和邻居节点之间的相关程度，因为和本身特征强度无关
            // 可以理解成点与点之间的连线的粗细。
            // 而在initWeight函数中，返回最初始的迭代值（相关程度 + 节点本身特征强度）
            totalNeighborAffinity += estimateAffinity(u, neighbor.ref)
        }
        
        this.cache[key] = estimateAffinity(v, u) / totalNeighborAffinity
        return this.cache[key] || 0
    }

    /**
     * 节点的哈希生成规则
     * 
     * @param {GraphNode} u 
     * @param {GraphNode} v 
     * @return {string}
     */
    hash(u, v) {
        return `${u.name}-${v.name}`
    }

    /**
     * 清空缓存，防止内存泄漏
     */
    clear() {
        this.cache = null
    }
}

module.exports = {
    ProportionMatrix
}
