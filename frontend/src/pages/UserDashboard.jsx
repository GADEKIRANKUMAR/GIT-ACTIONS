import { useEffect, useState } from "react";
import axios from "../api/axiosClient";

export default function UserDashboard() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [form, setForm] = useState({ title: "", message: "", rating: 5 });

  const loadMyFeedback = async () => {
    const res = await axios.get("/feedback/my");
    setFeedbacks(res.data);
  };

  useEffect(() => {
    loadMyFeedback();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("/feedback", form);
    setForm({ title: "", message: "", rating: 5 });
    loadMyFeedback();
  };

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: "700px" }}>
        <h2>My Feedback</h2>

        <form onSubmit={handleSubmit}>
          <input
            name="title"
            placeholder="Feedback Title"
            value={form.title}
            onChange={handleChange}
            required
          />

          <textarea
            name="message"
            placeholder="Enter your feedback"
            value={form.message}
            onChange={handleChange}
            required
          />

          <select name="rating" value={form.rating} onChange={handleChange}>
            {[1, 2, 3, 4, 5].map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>

          <button type="submit">Submit Feedback</button>
        </form>

        <h3 style={{ marginTop: 20 }}>Previous Feedback</h3>

        <ul style={{ marginTop: 10 }}>
          {feedbacks.map((f) => (
            <li key={f.id}>
               <b>{f.title}</b> ({f.rating}/5) – <i>{f.status}</i>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
