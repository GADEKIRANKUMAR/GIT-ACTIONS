export default function EmptyState({ title, description, action }) {
  return (
    <div className="empty-state">
      <h3 style={{ marginBottom: "0.4rem" }}>{title}</h3>
      <p style={{ marginTop: 0 }}>{description}</p>
      {action}
    </div>
  );
}

