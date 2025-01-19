
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import ScheduleTable from "./ScheduleTable";
import './CampaignList.scss';
const CampaignList = () => {
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    // Fetch campaigns from the backend
    fetch("http://localhost:5000/api/campaigns")
      .then((res) => res.json())
      .then((data) => setCampaigns(data))
      .catch((err) => console.error("Error fetching campaigns:", err));
  }, []);

  const handleCreate = () => {
    navigate("/campaigns/create");
  };

  const handleEdit = (id) => {
    navigate(`/campaigns/edit/${id}`);
  };

  return (
    <div>
      <h1>Campaign List</h1>
      <button onClick={handleCreate}>Create Campaign</button>
      <ul>
        {campaigns.map((campaign) => (
          <div key={campaign._id} className="campaign-list__item">
            <li key={campaign._id}>
              <strong>Type:</strong> {campaign.type},{" "}
              <strong>Start:</strong> {dayjs(campaign.startDate).format('MM/DD/YYYY')},{" "}
              <strong>End:</strong> {dayjs(campaign.endDate).format('MM/DD/YYYY')}{" "}
              <ScheduleTable schedule={campaign.schedule} />
            </li>
              <button onClick={() => handleEdit(campaign._id)}>Edit</button>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default CampaignList;
