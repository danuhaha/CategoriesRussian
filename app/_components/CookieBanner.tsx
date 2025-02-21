import React, { useState, useEffect } from "react";
import { getCookie, setCookie } from "../_utils/cookieUtils";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const cookieConsent = getCookie("cookieConsent");
    if (!cookieConsent) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    setCookie("cookieConsent", "true", 365); // Set consent for 1 year
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 border border-black text-black p-2 text-xs xxs:text-sm flex justify-between items-center bg-transparent rounded-full" style={{ width: '80%', maxWidth: '400px' }}>
      <p className="mr-2">
        Мы используем cookies :)
      </p>
      <button
        className="border border-black text-black font-bold py-1 px-2 rounded-full bg-transparent"
        onClick={handleAccept}
      >
        OK
      </button>
    </div>
  );
} 