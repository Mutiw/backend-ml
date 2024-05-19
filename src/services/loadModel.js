const tf = require('@tensorflow/tfjs-node');
const { Storage } = require('@google-cloud/storage');
const fs = require('fs');
const path = require('path');

const MODEL_BUCKET = 'your-bucket-name'; // Replace with your bucket name
const MODEL_FILE_PATH = 'model/model.json'; // Path to the model file in the bucket
const LOCAL_MODEL_PATH = path.join(__dirname, 'model.json');

const storage = new Storage();

let model;

const downloadModel = async () => {
    const options = {
        destination: LOCAL_MODEL_PATH,
    };

    await storage.bucket(MODEL_BUCKET).file(MODEL_FILE_PATH).download(options);
    console.log('Model downloaded to', LOCAL_MODEL_PATH);
};

const loadModel = async () => {
    await downloadModel();
    model = await tf.loadLayersModel(`file://${LOCAL_MODEL_PATH}`);
    console.log('Model loaded successfully');
};

module.exports = {
    loadModel,
    model
};
