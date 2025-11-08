import axios from "axios";
import { messaging } from "../firebase";
import { getToken, onMessage } from "firebase/messaging";  // Make sure this is imported
import { useEffect } from "react";

export default  function RequestNotificationPermission() {

  async function requestPermission(){
  try {
    const permission = await window.Notification.requestPermission(); // use `window.Notification` explicitly
    if (permission === "granted") {
      console.log("now fetching token");
      const token = await getToken(messaging, {
        vapidKey:  "BBsH5Tgls_JPdANs0jqmEDBo7x97sYtJZs2cDmeR0suF3eVDnfBD9Jv9JmcWn3wux5VGiS1Nj0PdOQgMLCrEftw", // your VAPID key
      });
      console.log("✅ FCM Token:", token);
      const userId="68b521e4cbeb90889083e94d";
      const platform = "web";

      const result = await axios.post("https://api.rtiexpress.in/v1/notification/savetoken",{userId,token,platform});


    } else {
      console.log("❌ Notification permission not granted");
    }
  } catch (error) {
    console.error("🔥 Error getting FCM token:", error);
  }
}

useEffect(()=>{
requestPermission();

 onMessage(messaging, (payload) => {
      console.log("📲 Foreground message received:", payload);
      const { title, body } = payload.notification;
      alert(`🔔 ${title}: ${body}`);
    });

},[])

return(
<>
<button onClick={()=>{requestPermission()}} 
   className="border px-2 py-1 m-2"
  >  allow notification   </button>

</>

)


}
