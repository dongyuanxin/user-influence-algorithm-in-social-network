const readline = require('readline')
const fs = require('fs')
const path = require('path')
const { getNode, GraphNode } = require('./../init/node')
const { float2bit } = require('./../helper')

const file = path.resolve(__dirname, 'pcu.csv')
const featureFile = path.resolve(__dirname, 'pcu.features.mean.txt')

const rl = readline.createInterface({
    input: fs.createReadStream(file, {
        encoding: 'utf8'
    })
})

const mem = {}

rl.on('line', (data) => {
    if (!data.startsWith('0')) {
        return
    }

    const node = lineToNode(data)
    mem[node.name] = node
})

rl.on('close', () => {
    const names = Reflect.ownKeys(mem)
    const length = names.length
    let idx = 0
    
    // 计算最大值和最小值
    let maxFollower = 0, minFollower = Number.MAX_SAFE_INTEGER
    let maxPost = 0, minPost = Number.MAX_SAFE_INTEGER
    names.forEach(name => {
        const node = mem[name]
        const features = node.features
        maxFollower = Math.max(maxFollower, features[0])
        minFollower = Math.min(minFollower, features[0])

        maxPost = Math.max(maxPost, features[1])
        minPost = Math.min(minPost, features[1])
    })

    // 计算max-min scale
    const diffFollower = maxFollower - minFollower
    const diffPost = maxPost - minPost
    names.forEach(name => {
        const node = mem[name]
        const features = node.features 
        features[0] = Math.max((features[0] - minFollower) / diffFollower, 0.001)
        features[0] = Math.floor(Math.round(features[0] * 1000)) /100
        features[1] = Math.max((features[1] - minPost) / diffPost, 0.001)
        features[1] = Math.floor(Math.round(features[1] * 1000)) /100

    })
    
    fs.open(featureFile, 'w', (err, fd) => {
        if (err) {
            console.log('打开文件出错')
            throw err
        }

        writeLine()
        function writeLine() {
            if (idx >= length) {
                fs.close(fd, () => console.log('关闭成功'))
                return
            }

            const node = mem[names[idx]]
            const line = node.name + ',' + node.features.join(',') + '\n'

            fs.write(fd, line, (err) => {
                if (err) {
                    console.log('写入文件出错', err)
                    throw err
                }
                idx++
                writeLine()
            })
        }
    })
})

/**
 * 
 * @param {string} line 
 * @return {GraphNode}
 */
function lineToNode(line) {
    const infos = line.split(',')
    const tag = infos[infos.length - 1]

    let name = ''
    if (tag === 'last') {
        name = infos[4]
    } else if (tag === 'first') {
        name = infos[2]
    } else {
        throw new Error(`${line} 非法`)
    }

    return getNode(
        name, 
        [parseInt(infos[6]), parseInt(infos[7]), infos[8] === 'female' ? 1 : 0]
    )
}

