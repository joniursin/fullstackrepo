import { useSelector } from "react-redux";
import { Alert } from "react-bootstrap";

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  if (notification.notification === null) {
    return null;
  }

  if (notification.type === "notification") {
    return <Alert variant="success">{notification.notification}</Alert>;
  }
  return <Alert variant="danger">{notification.notification}</Alert>;
};

export default Notification;
