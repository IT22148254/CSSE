import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AvailableTimesPage.css";
import { useNavigate, useParams } from "react-router-dom";

const AvailableTimesPage = () => {
  const [availableTimes, setAvailableTimes] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchAvailableTimes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/available-times/doctor/${id}`
        );
        setAvailableTimes(response.data.availableTimes);
      } catch (error) {
        console.error("Error fetching available times:", error);
      }
    };

    fetchAvailableTimes();
  }, [id]);

  const handleUpdate = (timeId) => {
    navigate(`/update-available-time/${timeId}`);
  };

  const handleDelete = (timeId) => {
    axios
      .delete(`http://localhost:5000/api/available-times/${timeId}`)
      .then(() => {
        setAvailableTimes(availableTimes.filter((time) => time._id !== timeId));
      })
      .catch((error) => {
        console.error("Error deleting available time:", error);
      });
  };

  const handleToggleAvailable = (availableTimesId, timeId) => {
    console.log(availableTimesId, timeId);
    axios
      .patch(
        `http://localhost:5000/api/available-times/${availableTimesId}/toggle/${timeId}`
      )
      .then(() => {
        alert("Availability status updated successfully");
      })
      .catch((error) => {
        console.error("Error toggling available status:", error);
      });
  };

  return (
    <div className="available-times-page">
      <h2>Manage Available Times</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Times</th>
          </tr>
        </thead>
        <tbody>
          {availableTimes && availableTimes.length > 0 ? (
            availableTimes.map((time) => (
                console.log(time),
              <tr key={time._id}>
                <td>{time.date}</td>
                <td>
                  <table className="nested-table">
                    <thead>
                      <tr>
                        <th>Time</th>
                        <th>Available</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {time.times.map((t, index) => (
                        <tr key={`${time._id}-${index}`}>
                          <td>{t}</td>
                          <td>{time.available ? "Yes" : "No"}</td>
                          <td>
                            <button
                              onClick={() =>
                                handleToggleAvailable(time._id, times._id)
                              }
                            >
                              {t.available
                                ? "Mark Unavailable"
                                : "Mark Available"}
                            </button>
                            <button onClick={() => handleUpdate(time._id)}>
                              Update
                            </button>
                            <button onClick={() => handleDelete(time._id)}>
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">No available times</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AvailableTimesPage;
