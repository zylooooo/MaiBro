import { firebaseMessaging } from "../service/firebaseConfig";
import { getToken } from "firebase/messaging";

export async function requestNotificationPermissionAndGetToken() {
  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      const token = await getToken(firebaseMessaging, { vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY });
      sessionStorage.setItem("fcmToken", token);
    } else {
      console.error("Permission not granted for notifications");
      sessionStorage.setItem("fcmToken", null);
    }
    
  } catch (error) {
    console.error("Error getting FCM token", error);
    return null;
  }

  
};
