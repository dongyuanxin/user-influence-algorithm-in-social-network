const { GraphNode, getCommonNeighbors } = require('./node')
const { LAMBDA, MU } = require('../constants')

/**
 * 根据节点信息生成哈希值
 * 
 * @param {GraphNode} u 
 * @param {GraphNode} v 
 * @return {string}
 */
function hash(u, v) {
    return `${u.name}-${v.name}`
}

/**
 * 计算特征的相似度
 * 
 * @param {number} f1 
 * @param {number} f2 
 * @param {number} lambda 
 */
function compareSimilarity(f1, f2, lambda = LAMBDA) {
    // 如果 f1 和 f2 均为0
    // 代表两个节点都没有此特征，是相似的
    if (f1 === f2 && !f1) {
        return lambda
    }

    return f1 * f2
} 

/**
 * 计算直接相似度（从缓存中读取）
 */
const estimateDirectAffinity = (function () {
    let cache = {}

    /**
     * 计算直接相似度
     * 
     * @param {GraphNode} u
     * @param {GraphNode} v
     * @return {number}
     */
    function __estimateDirectAffinity(u, v) {
        if (!(u instanceof GraphNode) || !(v instanceof GraphNode)) {
            throw TypeError('Param `u` or `v` must be GraphNode')
        }

        const key = hash(u, v)
        if (cache[key] !== undefined) {
            return cache[key]
        }
    
        let affinity = 0
        const featureNum = u.features.length
        for (let i = 0; i < featureNum; ++i) {
            affinity += compareSimilarity(u.features[i] || 0, v.features[i] || 0)
        }
        
        // 不需要重复计算。directAffinity(u, v) = directAffinity(v, u)
        // cache[key] = getTie(u, v) * affinity / featureNum
        cache[key] = affinity / featureNum
        cache[hash(v, u)] = cache[key]
        
        return cache[key]
    }

    /**
     * 清空缓存
     */
    __estimateDirectAffinity.clear = function () {
        cache = {}
    }

    return __estimateDirectAffinity
})()

/**
 * 计算共同邻居增加的共同相似度（从缓存中读取）
 */
const estimateIndirectAffinity = (function () {
    let cache = {}

    /**
     * 计算共同邻居增加的共同相似度
     * 
     * @param {GraphNode} u 
     * @param {GraphNode} v 
     * @return {number}
     */
    function __estimateIndirectAffinity(u, v) {
        if (!(u instanceof GraphNode) || !(v instanceof GraphNode)) {
            throw TypeError('Param `u` or `v` must be GraphNode')
        }

        const key = hash(u, v)
        if (cache[key] !== undefined) {
            return cache[key]
        }
    
        const neighbors = getCommonNeighbors(u, v)
        let total = 0
        for (const node of neighbors) {
            const multi = estimateDirectAffinity(u, node) * estimateDirectAffinity(node, v)
            total += multi
        }

        cache[key] = Math.min(1, Math.sqrt(total))
        cache[hash(v, u)] = cache[key]
    
        return cache[key]
    }

    __estimateIndirectAffinity.clear = function () {
        cache = {}
    }

    return __estimateIndirectAffinity
})()

/**
 * 计算总相似度 = μ * 直接影响 + (1 - u) * 间接影响
 * 
 * @param {GraphNode} u 
 * @param {GraphNode} v 
 * @return {number}
 */
function estimateAffinity(u, v, mu = MU) {
    return mu * estimateDirectAffinity(u, v) + (1 - mu) * estimateIndirectAffinity(u, v)
}


module.exports = {
    estimateDirectAffinity,
    estimateIndirectAffinity,
    estimateAffinity
}