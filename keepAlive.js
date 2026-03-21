// Apne hi backend ko har 10 min mein ping karo
const BACKEND_URL = "https://watchhub-backend-6.onrender.com"

export const startKeepAlive = () => {
  setInterval(async () => {
    try {
      await fetch(`${BACKEND_URL}/`)
      console.log("Keep alive ping sent ✅")
    } catch (e) {
      console.log("Keep alive failed:", e.message)
    }
  }, 10 * 60 * 1000) // har 10 minute
}