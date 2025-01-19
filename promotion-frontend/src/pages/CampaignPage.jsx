
import React from 'react';
import CampaignList from '../components/CampaignList';
import './CampaignPage.scss';

const CampaignPage = () => {

  return (
    <div className="campaign-page">
      <h2>Campaigns</h2>
      <CampaignList />
    </div>
  );
};

export default CampaignPage;
