// Lightweight event bus for CRM cross-component refresh
// Usage:
// import { on, off, emit } from '@/events/crmEvents';
// const unsubscribe = on('crm:contacts:changed', () => { ... })
// emit('crm:contacts:changed', payload)
// off('crm:contacts:changed', handler)

const _events = Object.create(null);

export function on(event, handler) {
  if (!_events[event]) {
    _events[event] = new Set();
  }
  _events[event].add(handler);
  // Return unsubscribe function for convenience
  return () => off(event, handler);
}

export function off(event, handler) {
  const set = _events[event];
  if (!set) return;
  set.delete(handler);
  if (set.size === 0) delete _events[event];
}

export function emit(event, payload) {
  const set = _events[event];
  if (!set) return;
  // Copy to array to avoid mutation during iteration side-effects
  [...set].forEach((handler) => {
    try {
      handler(payload);
    } catch (err) {
      // Do not break other handlers
      console.error(`[crmEvents] handler error for ${event}:`, err);
    }
  });
}

// Common event names used across CRM
// - crm:leads:changed
// - crm:contacts:changed
// - crm:accounts:changed
// - crm:deals:changed
// - crm:documents:changed
// - crm:communications:changed
