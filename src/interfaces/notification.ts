import { Base } from "./global";

export interface Notification extends Base {
  id: string;
  updatedAt: string;
  message: string;
  recipient: string | string[];
  isRead: boolean;
  triggeredBy: string;
}

export interface NotificationCount {
  count: number;
}
