const InferenceService = require('./inferenceService');
const StoreData = require('./storeData');
const InputError = require('./InputError');

const handlePrediction = async (request, h) => {
    try {
        const { image } = request.payload;

        if (!image) {
            throw new InputError('Image file is required');
        }

        const predictionData = await InferenceService.predict(image._data);
        await StoreData.savePrediction(predictionData);

        return {
            status: 'success',
            message: 'Model is predicted successfully',
            data: predictionData
        };
    } catch (error) {
        if (error instanceof InputError) {
            return h.response({
                status: 'fail',
                message: error.message
            }).code(400);
        }

        console.error('Error during prediction:', error);
        return h.response({
            status: 'fail',
            message: 'Terjadi kesalahan dalam melakukan prediksi'
        }).code(500);
    }
};

module.exports = {
    handlePrediction
};
