const tf = require('@tensorflow/tfjs-node');
const { v4: uuidv4 } = require('uuid');
const { model } = require('./loadModel');

const predict = async (imageBuffer) => {
    const imageTensor = tf.node.decodeImage(imageBuffer);
    const prediction = model.predict(imageTensor.expandDims(0)).dataSync();
    const result = prediction[0] > 0.5 ? 'Cancer' : 'Non-cancer';
    const suggestion = result === 'Cancer' ? 'Segera periksa ke dokter!' : 'Tetap jaga kesehatan!';

    const predictionData = {
        id: uuidv4(),
        result,
        suggestion,
        createdAt: new Date().toISOString()
    };

    return predictionData;
};

module.exports = {
    predict
};
