const readline = require('readline')
const fs = require('fs')
const path = require('path')
const { getNode, isNeighbor } = require('./../init/node')

const nodes = []

function readFeatures() {
    const file = path.resolve(__dirname, 'uci.features.txt')
    const map = {} // 保存了 id -> 节点 的映射关系

    return new Promise((resolve) => {
        const rl = readline.createInterface({
            input: fs.createReadStream(file)
        })

        rl.on('line', (data) => {
            const words = data.split('\t')
            const node = getNode(words[0], words.slice(1, 4))
            nodes.push(node)
            map[words[0]] = node
        })

        rl.on('close', () => {
            resolve(map)
        })
    })
}

/**
 * @param {Object} map 
 * @return {Promise<boolean>}
 */
function readNeighbors(map) {
    const file = path.resolve(__dirname, 'uci.txt')

    return new Promise((resolve) => {
        const rl = readline.createInterface({
            input: fs.createReadStream(file)
        })

        rl.on('line', (data) => {
            if (data.startsWith('#')) {
                return
            }

            const [from, to] = data.split('\t')
            if (!map[from] || !map[to]) {
                return
            }

            if (!isNeighbor(map[from], map[to])) {
                map[from].neighbors.push({
                    ref: map[to],
                    tie: 1
                })
            }

            if (!isNeighbor(map[to], map[from])) {
                map[to].neighbors.push({
                    ref: map[from],
                    tie: 1
                })
            }
        })

        rl.on('close', () => resolve(true))
    })
}

async function getUciData() {
    if (nodes.length) {
        return nodes
    }
    
    const map = await readFeatures()
    const success = await readNeighbors(map)
    return nodes
}

module.exports = getUciData

