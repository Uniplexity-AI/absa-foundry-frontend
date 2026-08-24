// Simple event bus for CRM module events
const listeners = new Map()

export function on(event, callback) {
  if (!listeners.has(event)) {
    listeners.set(event, new Set())
  }
  listeners.get(event).add(callback)
  return () => off(event, callback)
}

export function off(event, callback) {
  if (listeners.has(event)) {
    listeners.get(event).delete(callback)
  }
}

export function emit(event, payload) {
  if (listeners.has(event)) {
    listeners.get(event).forEach((cb) => {
      try {
        cb(payload)
      } catch (err) {
        console.error(`Error in CRM event listener for "${event}":`, err)
      }
    })
  }
}

export default { on, off, emit }
