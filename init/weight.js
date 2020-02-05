const { RHO } = require('../constants')
const { GraphNode } = require('./node')
const { estimateAffinity } = require('./affinity')
const { estimateImportance } = require('./importance')

/**
 * 初始化权重
 * 
 * @param {GraphNode} u 
 * @param {number} rho
 * @return {number}
 */
function initWeight(u, rho = RHO) {
    if (!(u instanceof GraphNode)) {
        throw TypeError('Param `u` must be GraphNode')
    }

    let affinityTotal = 0
    u.neighbors
        .forEach(
            neighbor => {
                const { ref } = neighbor
                affinityTotal += estimateAffinity(u, ref)
            }
        )
    
    return rho * estimateImportance(u) + (1 - rho) * affinityTotal
}

module.exports = {
    initWeight
}