import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  if (notification.notification === null) {
    return null;
  }

  if (notification.type === "notification") {
    return <div className="notification"> {notification.notification}</div>;
  }
  return <div className="error"> {notification.notification} </div>;
};

export default Notification;
