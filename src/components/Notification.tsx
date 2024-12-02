interface NotificationProps {
  message: string;
  type: "success" | "error";
}

export const Notification = ({ message, type }: NotificationProps) => {
  const backgroundColor = type === "success" ? "#4ade80" : "#f87171";

  return (
    <div
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        padding: "12px 24px",
        backgroundColor,
        color: "white",
        borderRadius: "6px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        animation: "slideIn 0.3s ease-out",
        zIndex: 1000,
      }}
    >
      {message}
    </div>
  );
};
