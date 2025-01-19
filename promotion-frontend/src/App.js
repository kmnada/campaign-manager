import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CampaignForm from './components/CampaignForm';
import CampaignPage from './pages/CampaignPage';
import './App.scss';
function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          {/* Homepage - Campaign List */}
          <Route path="/" element={<CampaignPage />} />

          {/* Create Campaign */}
          <Route path="/campaigns/create" element={<CampaignForm />} />

          {/* Edit Campaign (with :id parameter) */}
          <Route path="/campaigns/edit/:id" element={<CampaignForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
