import { useEffect, useState } from "react";
import axios from "../api/axiosClient";

export default function AdminDashboard() {
  const [feedbacks, setFeedbacks] = useState([]);

  const loadAll = async () => {
    const res = await axios.get("/feedback/all");
    setFeedbacks(res.data);
  };

  useEffect(() => {
    loadAll();
  }, []);

  const updateStatus = async (id, status) => {
    await axios.put(`/feedback/${id}/status?status=${status}`);
    loadAll();
  };

  return (
    <div className="container">
      <div style={{ width: "90%" }}>
        <h2 style={{ color: "white", marginBottom: 20 }}>Admin Dashboard</h2>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Rating</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {feedbacks.map((f) => (
              <tr key={f.id}>
                <td>{f.id}</td>
                <td>{f.title}</td>
                <td>{f.rating}</td>
                <td>
                  <span
                    className={`badge ${
                      f.status === "PENDING"
                        ? "pending"
                        : f.status === "IN_PROGRESS"
                        ? "progress"
                        : "resolved"
                    }`}
                  >
                    {f.status}
                  </span>
                </td>
                <td>
                  <button onClick={() => updateStatus(f.id, "IN_PROGRESS")}>
                    In Progress
                  </button>
                  <button
                    onClick={() => updateStatus(f.id, "RESOLVED")}
                    style={{ marginTop: 5 }}
                  >
                    Resolve
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
