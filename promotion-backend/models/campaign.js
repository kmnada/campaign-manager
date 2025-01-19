const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
    type: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    schedule: [
      {
        day: { type: String, required: true },
        startTime: { type: String, required: true },
        endTime: { type: String, required: true },
      },
    ],
  });

module.exports = mongoose.model('Campaign', campaignSchema);