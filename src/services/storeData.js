const { Firestore } = require('@google-cloud/firestore');

const firestore = new Firestore();

const savePrediction = async (predictionData) => {
    await firestore.collection('predictions').doc(predictionData.id).set(predictionData);
};

module.exports = {
    savePrediction
};
