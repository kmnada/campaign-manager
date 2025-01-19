// // File: server.js (Backend using Node.js with Express)
// const express = require('express');
// const bodyParser = require('body-parser');
// const app = express();
// const PORT = 5000;
// const cors = require('cors');
// app.use(cors());

// app.use(bodyParser.json());

// // In-memory storage for campaigns
// let campaigns = [];

// // Get all campaigns
// app.get('/campaigns', (req, res) => {
//     res.json(campaigns);
// });

// // Create a new campaign
// app.post('/campaigns', (req, res) => {
//     const { type, startDate, endDate, schedule } = req.body;
//     if (!type || !startDate || !endDate || !schedule) {
//         return res.status(400).send('Missing required fields');
//     }

//     const newCampaign = {
//         id: campaigns.length + 1,
//         type,
//         startDate,
//         endDate,
//         schedule,
//         nextActivation: calculateNextActivation(schedule),
//     };

//     campaigns.push(newCampaign);
//     res.status(201).json(newCampaign);
// });

// // Update an existing campaign
// app.put('/campaigns/:id', (req, res) => {
//     const { id } = req.params;
//     const { type, startDate, endDate, schedule } = req.body;

//     const campaign = campaigns.find(c => c.id === parseInt(id));
//     if (!campaign) {
//         return res.status(404).send('Campaign not found');
//     }

//     campaign.type = type;
//     campaign.startDate = startDate;
//     campaign.endDate = endDate;
//     campaign.schedule = schedule;
//     campaign.nextActivation = calculateNextActivation(schedule);

//     res.json(campaign);
// });

// // Calculate the next activation time (stub function)
// function calculateNextActivation(schedule) {
//     // Logic to calculate the next activation time based on schedule
//     return "Next activation calculated based on schedule";
// }

// app.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
// });

// initialization with express and mongoose
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = 5000;
const campaignRoutes = require('./routes/campaignRoutes');

app.use(bodyParser.json());
app.use(cors());
app.use('/api', campaignRoutes);

mongoose.connect('mongodb://localhost:27017/campaignsDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error('MongoDB Connection Error: ', err));

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});