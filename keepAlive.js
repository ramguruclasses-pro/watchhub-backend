// ✅ FIX: Railway backend URL use karo
const BACKEND_URL = "https://watchhub-backend-production.up.railway.app";

export const startKeepAlive = () => {
  setInterval(async () => {
    try {
      await fetch(`${BACKEND_URL}/`);
      console.log("Keep alive ping sent ✅");
    } catch (e) {
      console.log("Keep alive failed:", e.message);
    }
  }, 10 * 60 * 1000);
};