export default function StatsCard({ label, value, helper, accent = "#2563eb" }) {
  const gradient = `linear-gradient(145deg, ${accent}1a, #ffffff)`;
  return (
    <div className="stats-card" style={{ borderColor: accent, background: gradient }}>
      <span className="eyebrow">{label}</span>
      <div className="value">{value}</div>
      {helper && <small>{helper}</small>}
    </div>
  );
}

