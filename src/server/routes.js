const { handlePrediction } = require('./handler');

const routes = [
    {
        method: 'POST',
        path: '/predict',
        handler: handlePrediction,
        options: {
            payload: {
                maxBytes: 1000000, // 1MB limit
                output: 'stream',
                parse: true,
                allow: 'multipart/form-data'
            }
        }
    }
];

module.exports = { routes };
