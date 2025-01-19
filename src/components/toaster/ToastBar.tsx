import { notification } from "antd";
type NotificationType = "success" | "info" | "warning" | "error";

const triggerNotification = (
  type: NotificationType,
  message: string,
  description: string,
  placement: "topLeft" | "topRight" | "bottomLeft" | "bottomRight",
  duration?: number
) => {
  notification[type]({
    message,
    description,
    placement,
    duration,
  });
};
export { triggerNotification };
