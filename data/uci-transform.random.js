const readline = require('readline')
const fs = require('fs')
const path = require('path')
const { genRandom } = require('./../helper')

const num = 100000

const fromPath = path.resolve(__dirname, 'uci.features.txt')
const toPath = path.resolve(__dirname, `uci.features.${num}.txt`)

const map = {}
const rl = readline.createInterface({
    input: fs.createReadStream(fromPath)
})

rl.on('line', (data) => {
    const infos = data.split('\t')
    if (!infos.length || infos === '\n') {
        return
    }

    map[infos[0]] = infos.slice(1, 4).map(parseFloat)
})

rl.on('close', () => {
    const ids = Reflect.ownKeys(map)
    const randomIds = []
    
    for (let i = 0; i < num; ++i) {
        const index = genRandom(0, ids.length - 1)
        randomIds.push(ids[index])
        ids.splice(index, 1)
    }

    fs.open(toPath, 'w', (err, fd) => {
        if (err) throw err

        const length = randomIds.length
        let index = 0
        write()

        function write() {
            if (index >= length) {
                fs.close(fd, () => console.log('写入成功'))
                return
            }

            const id = randomIds[index]
            index += 1
            let line = [id, ...map[id]].join('\t')
            line += '\n'
            fs.write(fd, line, (err) => {
                if (err) throw err
                write()
            })
        }
    })
})