import { a2 as createLucideIcon, r as ref, f as onMounted, H as onUnmounted, P as API_BASE_URL } from './index-B6Idg27_.js';

/**
 * @license lucide-vue-next v0.473.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */


const Zap = createLucideIcon("ZapIcon", [
  [
    "path",
    {
      d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
      key: "1xq2db"
    }
  ]
]);

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

export { Zap as Z, useActivityTracker as u };
