const COLOR_MAP = {
  PENDING: "pending",
  IN_PROGRESS: "in_progress",
  RESOLVED: "resolved",
};

const formatLabel = (status) =>
  status
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

export default function StatusBadge({ status }) {
  const normalized = COLOR_MAP[status] ?? "pending";
  return <span className={`status-badge ${normalized}`}>{formatLabel(status)}</span>;
}

StatusBadge.defaultProps = {
  status: "PENDING",
};

