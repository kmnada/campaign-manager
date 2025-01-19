const Campaign = require('../models/campaign');

module.exports = {
    getCampaigns,
    getCampaignById,
    createCampaign,
    updateCampaign,
    deleteCampaign
};

async function getCampaigns(req, res) {
    const campaigns = await Campaign.find();
    res.status(200).json(campaigns);
}

async function getCampaignById(req, res) {
    try {
        const campaign = await Campaign.findById(req.params.id);
        if (!campaign) {
            return res.status(404).json({ message: "Campaign not found" });
        }
        res.status(200).json(campaign);
    } catch (err) {
        res.status(400).json({ error: "Invalid campaign ID" });
    }
}

async function createCampaign(req, res) {
    const campaign = new Campaign(req.body);
    await campaign.save();
    res.status(201).json(campaign);
}

async function updateCampaign(req, res) {
    const campaign = await Campaign.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(campaign);
}

async function deleteCampaign(req, res) {
    await Campaign.findByIdAndDelete(req.params.id);
    res.status(204).send();
}