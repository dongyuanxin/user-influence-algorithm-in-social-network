const { GraphNode } = require('./../init/node')
const { ProportionMatrix } = require('./proportion')
const { initWeight } = require('./../init/weight')
const { D } = require('./../constants')

/**
 * 
 * PageRank参考资料：
 *  1. wiki百科：https://zh.wikipedia.org/wiki/PageRank
 *  2. 算法原理与实现：https://zhuanlan.zhihu.com/p/86004363
 *  3. 深入讨论（一）：https://blog.csdn.net/aaasjpsong/article/details/20782251
 *  4. 深入讨论（二）：https://blog.csdn.net/zhaozhn5/article/details/79776163
 * 
 * @param {GraphNode[]} nodes 
 * @param {number} maxSteps
 * @param {number} alpha
 * @return {object}
 */
function adjust(nodes, maxSteps = 1000, alpha = 1e-4) {
    const pMatrix = new ProportionMatrix()
    const num = nodes.length

    // 未优化前
    // console.log('debug 1')
    // // 遍历计算传递比例矩阵，并且缓存P矩阵(类内部实现)
    // for (let i = 0; i < num; ++i) {
    //     if (i === 22) {
    //         console.log(nodes[i].neighbors)
    //     }

    //     for (let j = 0; j < num; ++j) {
    //         pMatrix.calc(nodes[i], nodes[j])
    //     }
    //     console.log('debug 3', '第',i,'个节点')
    // }
    // console.log('debug 2')

    // 计算初始总影响力
    let initTotal = 0
    for (const node of nodes) {
        const w = initWeight(node)
        initTotal += w
    }
    console.log('初始总影响力计算完成', initTotal)

    // 优化后
    // 遍历计算传递比例矩阵，并且缓存P矩阵(类内部实现)
    for (let i = 0; i < num; ++i) {
        const { neighbors } = nodes[i]
        for (const neighbor of neighbors) {
            pMatrix.calc(nodes[i], neighbor.ref)
        }
    }
    console.log('分配比例计算完成')

    // 第一次迭代过程，初始影响力使用 weight
    const initCache = {}
    for (const node of nodes) {
        const { neighbors } = node
        
        let impact = 0
        for (const neighbor of neighbors) {
            const { ref } = neighbor
            const distribution = initWeight(ref) * pMatrix.calc(ref, node)
            impact += distribution
        }

        initCache[node.name] = impact * D + (1 - D)
    }
    console.log('第一次迭代结果计算完成')

    let steps = 1 // 迭代次数
    let preCache = initCache // 上次迭代的结果
    let lastP = 0 // 上次的平均变化率
    while (steps++ < maxSteps) {
        // console.log('steps:', steps)
        const cache = {}
        for (const node of nodes) {
            const { neighbors } = node
            
            let impact = 0
            for (const neighbor of neighbors) {
                const { ref } = neighbor
                const distribution = preCache[ref.name] * pMatrix.calc(ref, node)
                impact += distribution
            }

            cache[node.name] = impact * D + (1 - D)
        }
        preCache = cache

        let total = 0
        const names = Reflect.ownKeys(cache)
        for (const name of names) {
            total += cache[name]
        }

        let nowP = Math.abs(total - initTotal) / num
        // console.log('变化率：', lastP, '->', nowP, '; 差别是：', Math.abs(nowP - lastP))
        if (Math.abs(nowP - lastP) <= alpha) {
            break
        }
        lastP = nowP
    }
    
    return preCache
}


module.exports = {
    adjust
}