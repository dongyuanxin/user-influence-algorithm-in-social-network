/**
 * @author 董沅鑫
 * @description 为UCI数据集生成1个离散值属性，2个连续值属性
 * @result 189114个节点，1049870个关系
 */

const readline = require('readline')
const fs = require('fs')
const path = require('path')
const os = require('os')

const { genRandom } = require('./../helper')

const rawFile = path.resolve(__dirname, 'uci.txt')
const newFile = path.resolve(__dirname, 'uci.features.txt')

const rs = fs.createReadStream(rawFile)
const ws = fs.createWriteStream(newFile)

const rl = readline.createInterface({
    input: rs
})

const map = {}
let lineNum = 0

rl.on('line', (data) => {
    lineNum += 1
    if (data.startsWith('#')) {
        return
    }

    const id = data.split('\t')[0]
    // 之前记录过属性
    if (map[id] === true) {
        return 
    }

    map[id] = true
    const a = Math.random() >= 0.5 ? 1 : 0
    const b = genRandomFloat()
    const c = genRandomFloat()
    const line = `${id}\t${a}\t${b}\t${c}\t${os.EOL}`

    if (!ws.write(line)) {
        rl.pause()
    }
})

rl.on('close', () => {
    console.log('写入完成，一共', Reflect.ownKeys(map).length, '个节点')
    console.log('写入完成，一共', lineNum, '个关系')
})

ws.on('drain', () => rl.resume())

function genRandomFloat() {
    return genRandom(0, 10) / 10
}