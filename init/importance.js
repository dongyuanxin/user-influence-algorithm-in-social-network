const { GraphNode } = require('./node')

/**
 * 根据features估算重要性（从缓存中读取）
 */
const estimateImportance = (function () {
    let cache = {}

    /**
     * 根据features估算重要性
     * 
     * @param {GraphNode} node 
     * @return {number}
     */
    function __estimateImportance(node) {
        if (!(node instanceof GraphNode)) {
            throw TypeError('Param `node` must be GraphNode')
        }

        if (cache[node.name] !== undefined) {
            return cache[node.name]
        }
    
        const { features } = node
        // 没有features，则返回0
        if (!Array.isArray(features) || !features.length) {
            cache[node.name] = 0
            return 0
        }
    
        const total = features.reduce((pre, current) => pre + current, 0)
        cache[node.name] = total / features.length
        return cache[node.name]
    }

    /**
     * 清空缓存，防止内存泄漏
     */
    __estimateImportance.clear = function () {
        cache = {}
    }

    return __estimateImportance
})()

module.exports = {
    estimateImportance
}