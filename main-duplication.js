const { adjust } = require('./adjustment/adjust')
const fs = require('fs')
const path = require('path')

// 微博数据 + 基于节点相似度：95.82348385020067%
const getPcuData = require('./data/pcu-format')
const { estimateDirectAffinity } = require('./init/affinity')
getPcuData()
    .then(data => {
        const cache = {}
        data.forEach(item => {
            cache[item.name] = 0
            item.neighbors.forEach(neighbor => {
                cache[item.name] += estimateDirectAffinity(neighbor.ref, item)
            })
            // console.log(cache[item.name])
        })
        return Promise.resolve(cache)
    })
    .then(cache => {
        const keys = Reflect.ownKeys(cache)
        const values = []
        keys.forEach(key => {
            values.push(Math.round(cache[key] * 1000000))
        })

        const setLength = (new Set(values)).size
        console.log(
            values[0], values[1],
            values.length, 
            setLength,
            (100 - (setLength /values.length) * 100) +'%'
        )
    })

// 论文合作 + 基于节点相似度：92.52355%
// const getUciData = require('./data/uci-format')
// const { estimateDirectAffinity } = require('./init/affinity')
// getUciData()
//     .then(data => {
//         const cache = {}
//         data.forEach(item => {
//             cache[item.name] = 0
//             item.neighbors.forEach(neighbor => {
//                 cache[item.name] += estimateDirectAffinity(neighbor.ref, item)
//             })
//             // console.log(cache[item.name])
//         })
//         return Promise.resolve(cache)
//     })
//     .then(cache => {
//         const keys = Reflect.ownKeys(cache)
//         const values = []
//         keys.forEach(key => {
//             values.push(cache[key])
//         })

//         const setLength = (new Set(values)).size
//         console.log(
//             values[0], values[1],
//             values.length, 
//             setLength,
//             (100 - (setLength /values.length) * 100) +'%'
//         )
//     })
    

// 论文合作 + 本文算法：3.741658470552153%
// const getUciData = require('./data/uci-format')

// getUciData()
//     .then(data => {
//         console.time()
//         const cache = adjust(data, 100, 1e-3)
//         console.timeEnd()
//         return Promise.resolve(cache)
//     })
//     .then(cache => {
//         const keys = Reflect.ownKeys(cache)
//         const values = []
        // keys.forEach(key => {
        //     values.push(Math.round(cache[key] * 1000000))
        // })

        // const setLength = (new Set(values)).size
        // console.log(
        //     values[0], values[1],
        //     values.length, 
        //     setLength,
        //     (100 - (setLength /values.length) * 100) +'%'
        // )
//     })

// 论文合作 + FBI：重复率是 6.345907759340932%
// const getUciData = require('./data/uci-format')
// getUciData()
//     .then(data => {
//         console.time()
//         const cache = adjust(data, 100, 1e-3)
//         console.timeEnd()
//         return Promise.resolve(cache)
//     })
//     .then(cache => {
//         const keys = Reflect.ownKeys(cache)
//         const values = []
//         keys.forEach(key => {
//             values.push(Math.round(cache[key] * 1000000))
//         })

//         const setLength = (new Set(values)).size
//         console.log(
//             values[0], values[1],
//             values.length, 
//             setLength,
//             (100 - (setLength /values.length) * 100) +'%'
//         )
//     })


// 微博数据 + 本文算法：重复率是15.785661834971279%
// const getPcuData = require('./data/pcu-format')
// getPcuData()
//     .then(data => {
//         console.time()
//         const cache = adjust(data, 100, 1e-3)
//         console.timeEnd()
//         return Promise.resolve(cache)
//     })
//     .then(cache => {
//         const keys = Reflect.ownKeys(cache)
//         const values = []
//         const values2 = []
//         keys.forEach(key => {
//             这是放大后的，不放大的话，重复率更低，因为有小数点
//             values.push(Math.round(cache[key] * 10000000))
//             // console.log(cache[key])
//         })

//         const setLength = (new Set(values)).size
//         console.log(
//             values[0], values[1],
//             values.length, 
//             setLength,
//             (100 - (setLength /values.length) * 100) +'%'
//         )
//     })

// 微博数据 + FBI算法：22.91249%
// const getPcuData = require('./data/pcu-format')
// getPcuData()
//     .then(data => {
//         console.time()
//         const cache = adjust(data, 100, 1e-3)
//         console.timeEnd()
//         return Promise.resolve(cache)
//     })
//     .then(cache => {
//         const keys = Reflect.ownKeys(cache)
//         const values = []
//         keys.forEach(key => {
//             values.push(Math.round(cache[key]))
//         })

//         const setLength = (new Set(values)).size
//         console.log(
//             values[0], values[1],
//             values.length, 
//             setLength,
//             (100 - (setLength /values.length) * 100) +'%'
//         )
//     })