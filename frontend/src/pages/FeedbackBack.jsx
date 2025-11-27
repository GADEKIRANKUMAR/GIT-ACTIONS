import { useEffect, useState } from "react";
import axios from "../api/axiosClient";
import "./Styles.css";

export default function FeedbackBack() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const res = await axios.get("/feedback");
      setFeedbacks(res.data);
    } catch (err) {
      console.error("Failed to fetch feedback");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post("/feedback", {
        title,
        description,
      });

      setTitle("");
      setDescription("");
      fetchFeedbacks();
    } catch (err) {
      alert("Failed to submit feedback");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Feedback Management</h1>

      {/* Submit Feedback */}
      <div className="feedback-form-card">
        <h2>Submit New Feedback</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          <input
            placeholder="Feedback Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <textarea
            placeholder="Describe your feedback..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <button className="btn-primary" disabled={loading}>
            {loading ? "Submitting..." : "Submit Feedback"}
          </button>
        </form>
      </div>

      {/* Feedback List */}
      <div className="feedback-list">
        {feedbacks.length === 0 ? (
          <p className="empty-state">No feedback submitted yet.</p>
        ) : (
          feedbacks.map((item) => (
            <div className="feedback-card" key={item.id}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <span className={`status ${item.status?.toLowerCase()}`}>
                {item.status || "PENDING"}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
