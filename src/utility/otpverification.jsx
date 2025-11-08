// App.jsx
import React, { useState } from "react";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { initializeApp } from "firebase/app";


// ✅ Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAGVnS26MF2O1efBxMHkJ7KzimrI46K90M",
  authDomain: "phone-a7775.firebaseapp.com",
  projectId: "phone-a7775",
  storageBucket: "phone-a7775.firebasestorage.app",
  messagingSenderId: "253867636986",
  appId: "1:253867636986:web:3470343eb1817fbd49f143",
  measurementId: "G-CEQ1B60W80"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function App() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);

  // ✅ Setup reCAPTCHA
  function setupRecaptcha() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: () => {
            console.log("Recaptcha verified");
          },
        }
      
      );
    }
  };

  // ✅ Send OTP
  function sendOtp () {
     setupRecaptcha();
    const phoneNumber = phone;
    const appVerifier = window.recaptchaVerifier;

    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        alert("OTP sent");
        setIsOtpSent(true);
      })
      .catch((error) => {
        console.error("Error sending OTP:", error);
        alert("Failed to send OTP. Check the number or try later.");
      });
  };

  // ✅ Verify OTP
  function verifyOtp() {
    window.confirmationResult
      .confirm(otp)
      .then((result) => {
        const user = result.user;
        console.log("User signed in:", user);
        alert("Phone number verified ✅");
      })
      .catch((error) => {
        console.error("Invalid OTP:", error);
        alert("Invalid OTP. Please try again.");
      });
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "400px", margin: "auto" }}>
      <h2>📱 Firebase Phone Auth</h2>

      <input
        type="tel"
        placeholder="+91XXXXXXXXXX"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        style={{ padding: "10px", width: "100%", marginBottom: "10px" }}
      />

      {!isOtpSent ? (
        <button onClick={sendOtp} id="sign-in-button" style={{ padding: "10px", width: "100%" }}>
          Send OTP
        </button>
      ) : (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            style={{ padding: "10px", width: "100%", marginTop: "10px" }}
          />
          <button onClick={verifyOtp} style={{ padding: "10px", width: "100%", marginTop: "10px" }}>
            Verify OTP
          </button>
        </>
      )}

      {/* 🔐 Invisible Recaptcha placeholder */}
      <div id="recaptcha-container"></div>
    </div>
  );
}

export default App;
