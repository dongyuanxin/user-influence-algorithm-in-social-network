const { adjust } = require('./adjustment/adjust')
const fs = require('fs')
const path = require('path')

const getUciData = require('./data/uci-format')

// getUciData()
//     .then(data => {
//         console.time()
//         const cache = adjust(data)
//         console.timeEnd()
//         return Promise.resolve(cache)
//     })
//     .then(cache => {
//         const keys = Reflect.ownKeys(cache)
//         const values = []
//         keys.forEach(key => {
//             values.push(cache[key])
//         })

//         values.sort((a, b) => {
//             if (a < b) return -1
//             if (a === b) return 0
//             return 1
//         })

//         console.log(
//             values[0], 
//             values[values.length - 1], 
//             values.length, 
//             (new Set(values).size)
//         )
//     })

// const getPcuData = require('./data/pcu-format')

getUciData()
    .then(nodes => {
        console.time()
        const cache = adjust(nodes, 100, 1e-4)
        console.timeEnd()
        return Promise.resolve(cache)
    })
    .then(cache => {
        const keys = Reflect.ownKeys(cache)
        const values = []
        keys.forEach(key => {
            // values.push(Math.round(cache[key] * 10000))
            values.push(Math.floor(cache[key] * 10))
        })

        // values.sort((a, b) => {
        //     if (a < b) return -1
        //     if (a === b) return 0
        //     return 1
        // })
        
        return Promise.resolve(values)
    })
    .then(values => {
        const map = new Map()
        values.forEach(val => {
            const times = map.get(val) || 0
            map.set(val, times + 1)
        })

        const csvFile = path.resolve(__dirname, 'results', '无阻尼因子2.csv')
        const sortedVals = Array.from(map.keys())
            .sort((a, b) => {
                if (a < b) return -1
                if (a === b) return 0
                return 1
            })
        
        fs.open(csvFile, 'w', (err, fd) => {
            if (err) throw err
            fs.writeSync(fd, 'influence,times\n')
            sortedVals.forEach(val => {
                fs.writeSync(fd, `${val},${map.get(val)}\n`)
            })
            fs.close(fd, () => {
                console.log('写入完成')
            })
        })
    })