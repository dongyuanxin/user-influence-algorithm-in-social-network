const { adjust } = require('./adjustment/adjust')

const getUciData = require('./data/uci-format')

getUciData()
    .then(data => {
        console.time()
        adjust(data)
        console.timeEnd()
    })

