import { r as ref, h as onMounted, N as onUnmounted, U as API_BASE_URL } from './index-DySaQUSt.js';

function useActivityTracker({ userId, module }) {
  const lastActivity = ref(Date.now());
  let interval = null;

  const markActivity = () => {
    lastActivity.value = Date.now();
  };

  const sendHeartbeat = async () => {
    const now = Date.now();
    const diff = now - lastActivity.value;

    // Only send if user active in last 2 minutes
    if (diff < 2 * 60 * 1000) {
      try {
        const token = localStorage.getItem("token") || "";
        await fetch(`${API_BASE_URL}/activity/heartbeat`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : ""
          },
          body: JSON.stringify({
            user_id: userId,
            module,
            timestamp: new Date().toISOString()
          })
        });
      } catch (e) {
        console.error("Activity ping failed", e);
      }
    }
  };

  onMounted(() => {
    window.addEventListener("mousemove", markActivity);
    window.addEventListener("keydown", markActivity);
    window.addEventListener("click", markActivity);
    window.addEventListener("focus", markActivity);

    // Send initial heartbeat immediately
    sendHeartbeat();

    // Then every 60 seconds
    interval = setInterval(sendHeartbeat, 60 * 1000);
  });

  onUnmounted(() => {
    window.removeEventListener("mousemove", markActivity);
    window.removeEventListener("keydown", markActivity);
    window.removeEventListener("click", markActivity);
    window.removeEventListener("focus", markActivity);
    clearInterval(interval);
  });
}

export { useActivityTracker as u };
