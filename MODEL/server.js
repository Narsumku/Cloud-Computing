const express = require('express');
const bodyParser = require('body-parser');
const tf = require('@tensorflow/tfjs-node');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8080;

// Middleware
app.use(bodyParser.json());

async function l2Normalize(tensor, axis) {
  // Calculate the L2 norm along the specified axis
  const l2Norm = tf.norm(tensor, 2, axis);

  // Expand dimensions to match tensor shape for broadcasting
  const l2NormExpanded = tf.expandDims(l2Norm, axis);

  // Perform element-wise division
  const normalizedTensor = tf.div(tensor, l2NormExpanded);

  return normalizedTensor;
}

class TFOpLambda {
  static className = 'TFOpLambda';

  constructor(config) {
    return l2Normalize(config, 1);
  }
}
tf.serialization.registerClass(TFOpLambda);

// URL model di Google Cloud Storage
const modelUrl = 'https://storage.googleapis.com/narsumku/model/model.json';

// Load the model
let model;

async function loadModel() {
  try {
    model = await tf.loadLayersModel(modelUrl);
    console.log('Model loaded successfully from URL');
  } catch (error) {
    console.error('Error loading model from URL:', error);
  }
}

app.post('/recommendations', async (req, res) => {
  if (!model) {
    return res.status(500).send('Model is not loaded yet');
  }

  try {
    const input = req.body.input;
    const tensorInput = tf.tensor([input]);
    const prediction = model.predict(tensorInput);
    const output = prediction.dataSync();

    res.json({ prediction: output });
  } catch (error) {
    console.error('Prediction error:', error);
    res.status(500).send('Prediction error');
  }
});

// Example route to check if the server is running
app.get('/', (req, res) => {
  res.send('SERVER JALAN BOS!');
});

// Load the model and start the server
loadModel()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Failed to load model and start server:', error);
  });
