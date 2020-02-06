/**
 * @author 董沅鑫
 * @description PCU数据集
 * @result 142365个节点，99413个关系
 */


const readline = require('readline')
const fs = require('fs')
const path = require('path')
const { getNode, isNeighbor } = require('./../init/node')

const nodes = []

function readFeatures() {
    const file = path.resolve(__dirname, 'pcu.features.txt')
    const map = {} // 保存了 id -> 节点 的映射关系

    return new Promise((resolve) => {
        const rl = readline.createInterface({
            input: fs.createReadStream(file)
        })

        rl.on('line', (data) => {
            const words = data.split(',')
            const node = getNode(
                words[0], 
                words.slice(1, 4).map(item => parseFloat(item))
            )
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
    const file = path.resolve(__dirname, 'pcu.csv')
    // let edge = 0
    return new Promise((resolve) => {
        const rl = readline.createInterface({
            input: fs.createReadStream(file)
        })

        rl.on('line', (data) => {
            if (!data.startsWith('0')) {
                return
            }

            const infos = data.split(',')
            const from = infos[2], to = infos[4]

            if (!map[from] || !map[to]) {
                console.log(from, to, 'not exists')
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
            // edge += 1
        })

        rl.on('close', () => {
            resolve(true)
            // console.log(edge, nodes.length)
        })
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

