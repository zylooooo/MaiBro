import { firebaseMessaging } from "../service/firebaseConfig";
import { getToken } from "firebase/messaging";

export const requestNotificationPermissionAndGetToken = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      const token = await getToken(firebaseMessaging, { vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY });
      console.log("FCM Token: ", token);
      return token;
    } else {
      console.error("Permission not granted for notifications");
      return null;
    }
  } catch (error) {
    console.error("Error getting FCM token", error);
    return null;
  }
};
