/**
 * PWA Manager Utility
 * Handles Progressive Web App install prompts with intelligent timing
 * and user preference tracking to reduce bounce rate and improve UX
 */

class PWAManager {
  constructor() {
    this.installPromptEvent = null;
    this.callbacks = {
      onPromptReady: [],
      onInstallSuccess: [],
      onInstallDismiss: []
    };
    
    // Configuration constants
    this.config = {
      USER_INTERACTIONS_THRESHOLD: 3,
      MIN_TIME_BEFORE_PROMPT: 30000, // 30 seconds
      PROMPT_COOLDOWN: 24 * 60 * 60 * 1000, // 24 hours
      MAX_DISMISSALS: 3,
      AUTO_HIDE_TIMEOUT: 10000 // 10 seconds
    };
    
    this.userInteractions = 0;
    this.pageLoadTime = Date.now();
    this.isPromptShowing = false;
    
    this.init();
  }
  
  init() {
    // Listen for the beforeinstallprompt event
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.installPromptEvent = e;
      console.log('PWA install prompt captured and stored');
      
      this.checkAndShowPrompt();
    });
    
    // Track user interactions
    this.setupInteractionTracking();
  }
  
  setupInteractionTracking() {
    const events = ['click', 'scroll', 'keydown', 'touchstart'];
    events.forEach(event => {
      document.addEventListener(event, () => {
        this.userInteractions++;
        this.checkAndShowPrompt();
      }, { passive: true });
    });
  }
  
  // Local storage helpers
  getLastPromptTime() {
    return parseInt(localStorage.getItem('pwaLastPromptTime') || '0');
  }
  
  getDismissalCount() {
    return parseInt(localStorage.getItem('pwaDismissalCount') || '0');
  }
  
  isPermanentlyDismissed() {
    return localStorage.getItem('pwaPermanentlyDismissed') === 'true';
  }
  
  isInstalled() {
    return localStorage.getItem('pwaInstalled') === 'true' || 
           window.matchMedia('(display-mode: standalone)').matches;
  }
  
  shouldShowPrompt() {
    // Don't show if already installed
    if (this.isInstalled()) return false;
    
    // Don't show if already showing
    if (this.isPromptShowing) return false;
    
    // Don't show if no install event captured
    if (!this.installPromptEvent) return false;
    
    const now = Date.now();
    const lastPromptTime = this.getLastPromptTime();
    const dismissalCount = this.getDismissalCount();
    
    // Don't show if permanently dismissed
    if (this.isPermanentlyDismissed()) return false;
    
    // Don't show if dismissed too many times
    if (dismissalCount >= this.config.MAX_DISMISSALS) {
      localStorage.setItem('pwaPermanentlyDismissed', 'true');
      return false;
    }
    
    // Don't show if within cooldown period
    if (now - lastPromptTime < this.config.PROMPT_COOLDOWN) return false;
    
    // Don't show if user hasn't been active long enough
    if (now - this.pageLoadTime < this.config.MIN_TIME_BEFORE_PROMPT) return false;
    
    // Don't show if user hasn't interacted enough
    if (this.userInteractions < this.config.USER_INTERACTIONS_THRESHOLD) return false;
    
    return true;
  }
  
  checkAndShowPrompt() {
    if (this.shouldShowPrompt()) {
      this.showPrompt();
    }
  }
  
  showPrompt() {
    this.isPromptShowing = true;
    localStorage.setItem('pwaLastPromptTime', Date.now().toString());
    
    // Notify callbacks
    this.callbacks.onPromptReady.forEach(callback => callback());
  }
  
  async install() {
    if (!this.installPromptEvent) {
      console.warn('No install prompt event available');
      return false;
    }
    
    try {
      this.hidePrompt();
      this.installPromptEvent.prompt();
      const { outcome } = await this.installPromptEvent.userChoice;
      console.log('Install prompt outcome:', outcome);
      
      if (outcome === 'accepted') {
        this.onInstallSuccess();
        return true;
      } else {
        this.onInstallDismiss();
        return false;
      }
    } catch (error) {
      console.error('Error during PWA installation:', error);
      this.hidePrompt();
      return false;
    }
  }
  
  dismiss() {
    this.hidePrompt();
    
    const dismissalCount = this.getDismissalCount() + 1;
    localStorage.setItem('pwaDismissalCount', dismissalCount.toString());
    localStorage.setItem('pwaLastPromptTime', Date.now().toString());
    
    if (dismissalCount >= this.config.MAX_DISMISSALS) {
      localStorage.setItem('pwaPermanentlyDismissed', 'true');
      console.log('PWA install permanently dismissed after', this.config.MAX_DISMISSALS, 'dismissals');
    }
    
    this.installPromptEvent = null;
    this.callbacks.onInstallDismiss.forEach(callback => callback());
  }
  
  hidePrompt() {
    this.isPromptShowing = false;
  }
  
  onInstallSuccess() {
    // User installed, reset all counters
    localStorage.setItem('pwaInstalled', 'true');
    localStorage.removeItem('pwaLastPromptTime');
    localStorage.removeItem('pwaDismissalCount');
    localStorage.removeItem('pwaPermanentlyDismissed');
    
    this.installPromptEvent = null;
    this.callbacks.onInstallSuccess.forEach(callback => callback());
  }
  
  // Event listeners
  onPromptReady(callback) {
    this.callbacks.onPromptReady.push(callback);
  }
  
  onInstallSuccess(callback) {
    this.callbacks.onInstallSuccess.push(callback);
  }
  
  onInstallDismiss(callback) {
    this.callbacks.onInstallDismiss.push(callback);
  }
  
  // Utility methods
  getInstallStats() {
    return {
      isInstalled: this.isInstalled(),
      isPermanentlyDismissed: this.isPermanentlyDismissed(),
      dismissalCount: this.getDismissalCount(),
      lastPromptTime: this.getLastPromptTime(),
      userInteractions: this.userInteractions,
      timeOnPage: Date.now() - this.pageLoadTime
    };
  }
  
  resetUserPreferences() {
    localStorage.removeItem('pwaLastPromptTime');
    localStorage.removeItem('pwaDismissalCount');
    localStorage.removeItem('pwaPermanentlyDismissed');
    localStorage.removeItem('pwaInstalled');
    console.log('PWA user preferences reset');
  }

  // Debugging/Manual override
  async forcePrompt() {
    console.log('Forcing PWA install prompt...');
    if (this.installPromptEvent) {
      this.hidePrompt();
      this.installPromptEvent.prompt();
      return await this.installPromptEvent.userChoice;
    } else {
      console.warn('Cannot force prompt: No beforeinstallprompt event captured. Ensure site meets PWA criteria and try refreshing.');
      return { outcome: 'dismissed' };
    }
  }
}

// Create singleton instance
const pwaManager = new PWAManager();

// Expose globally for manual testing and debugging
if (typeof window !== 'undefined') {
  window.pwaManager = pwaManager;
  window.forcePWAPrompt = () => pwaManager.forcePrompt();
}

export default pwaManager;