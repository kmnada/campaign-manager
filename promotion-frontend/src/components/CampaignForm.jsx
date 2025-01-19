
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import './CampaignForm.scss';

const CampaignForm = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get the campaign ID from the URL

  // State to store campaign data
  const [campaignData, setCampaignData] = useState({
    type: "",
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
    schedule: [], // Schedule added
  });

  useEffect(() => {
    // Fetch campaign details if `id` exists (for editing)
    if (id) {
      console.log("in campaign form");
      fetch(`http://localhost:5000/api/campaigns/${id}`)
        .then((res) => res.json())
        .then((data) => {console.log('data', data); setCampaignData(data)})
        .catch((err) => console.error("Error fetching campaign:", err));
    }
  }, [id]);

  const handleChange = (e) => {
    setCampaignData({ ...campaignData, [e.target.name]: e.target.value });
  };

  const updateSchedule = (index, field, value) => {
    const updatedSchedule = [...campaignData.schedule];
    updatedSchedule[index][field] = value;
    setCampaignData({ ...campaignData, schedule: updatedSchedule });
  };

  const addSchedule = () => {
    setCampaignData({
      ...campaignData,
      schedule: [
        ...campaignData.schedule,
        { day: "", startTime: "", endTime: "" },
      ],
    });
  };

  const removeSchedule = (index) => {
    const updatedSchedule = campaignData.schedule.filter((_, i) => i !== index);
    setCampaignData({ ...campaignData, schedule: updatedSchedule });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const url = id ? `http://localhost:5000/api/campaigns/${id}` : "http://localhost:5000/api/campaigns";
    const method = id ? "PUT" : "POST";

    fetch(url, {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...campaignData }),
    })
      .then((res) => res.json())
      .then(() => {
        alert(id ? "Campaign updated!" : "Campaign created!");
        navigate("/"); // Redirect to the list
      })
      .catch((err) => console.error("Error submitting campaign:", err));
  };

  return (
    <div className="campaign-form">
      <h1>{id ? "Edit Campaign" : "Create Campaign"}</h1>
      <form onSubmit={handleSubmit} className="campaign-form__form">
        <label>
          Campaign Type:
          <select
            name="type"
            value={campaignData.type}
            onChange={handleChange}
            required
          >
            <option value="">Select...</option>
            <option value="Cost per Order">Cost per Order</option>
            <option value="Cost per Click">Cost per Click</option>
            <option value="Buy One Get One">Buy One Get One</option>
          </select>
        </label>
        <br />
        <label>
          Start Date:
          <input
            type="date"
            name="startDate"
            value={campaignData.startDate ? campaignData.startDate.split('T')[0] : new Date().toISOString().split('T')[0]} // Extract only the date portion
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          End Date:
          <input
            type="date"
            name="endDate"
            value={campaignData.endDate ? campaignData.endDate.split('T')[0] : new Date().toISOString().split('T')[0]} // Extract only the date portion
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <h3>Campaign Schedule</h3>
        {campaignData.schedule.map((item, index) => (
          <div key={index} className="campaign-form__form__schedule-item">
            <label>
              Day:
              <select
                value={item.day}
                onChange={(e) => updateSchedule(index, "day", e.target.value)}
                required
              >
                <option value="">Select Day</option>
                {[
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday",
                ].map((day) => (
                  <option value={day} key={day}>
                    {day}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Start Time:
              <input
                type="time"
                value={item.startTime}
                onChange={(e) =>
                  updateSchedule(index, "startTime", e.target.value)
                }
                required
              />
            </label>
            <label>
              End Time:
              <input
                type="time"
                value={item.endTime}
                onChange={(e) =>
                  updateSchedule(index, "endTime", e.target.value)
                }
                required
              />
            </label>
            <button type="button" onClick={() => removeSchedule(index)}>
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={addSchedule}>
          Add Schedule
        </button>
        <br />
        <button type="submit">{id ? "Update" : "Create"}</button>
      </form>
    </div>
  );
};

export default CampaignForm;
