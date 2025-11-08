import React from 'react'

export default function LocationMap() {

    const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        console.log("Location:", latitude, longitude);

        // Send location to backend
        try {
          const res = await fetch("http://localhost:3000/location1", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ latitude, longitude }),
          });

          const data = await res.json();
          alert(data.message);
        } catch (err) {
          console.error("Error sending location:", err);
        }
      },
      (error) => {
        alert("Error getting location: " + error.message);
      }
    );
  };


  return (
    <>
 <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Send My Location</h1>
      <button onClick={handleGetLocation}>Send Location</button>
    </div>
    </>
    )
}
