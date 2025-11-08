import React, { useState } from 'react'
import {  RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import {auth} from "../firebase";
import LocationMap from './locationMap';
import RequestNotificationPermission from './RequestNotificationPermission';

export default function App() {

 const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  
  const setUpRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {
          console.log("reCAPTCHA verified");
        }
      }
    );
  };

  const handleSendOtp = async () => {
    setUpRecaptcha();
    const appVerifier = window.recaptchaVerifier;

    try {
      const confirmation = await signInWithPhoneNumber(auth, phone, appVerifier);
      setConfirmationResult(confirmation);
      alert("OTP sent");
    } catch (error) {
      console.error("SMS not sent", error);
    }
  };

  const handleVerifyOtp = async () => {
    if (!confirmationResult) return;

    try {
      const result = await confirmationResult.confirm(otp);
      console.log("User:", result.user);
      // once the otp is verified then send token back 
      const user = result?.user;
      const idToken = await user.getIdToken();

// 📨 Send the token to your backend
await fetch('http://localhost:3000/api/v1/auth/firebasePhone', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${idToken}`
  },
  body: JSON.stringify({
    phone: user.phoneNumber  // optional
  })
});

    } catch (error) {
      console.error(error);
      alert("Invalid OTP");
    }
  };

  return (
    <>
    <div>
      <input
        type="tel"
        placeholder="Enter phone +91..."
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <button onClick={handleSendOtp}>Send OTP</button>

      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <button onClick={handleVerifyOtp}>Verify OTP</button>
      <button >conflict New button one for conflict</button>
      <div id="recaptcha-container"></div>
    </div>

    <LocationMap />

    <RequestNotificationPermission />
    
    </>
  )
}
