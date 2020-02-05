const { adjust } = require('./adjustment/adjust')

const getUciData = require('./data/uci-format')

getUciData()
    .then(data => adjust(data))

