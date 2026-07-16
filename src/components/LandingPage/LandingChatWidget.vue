<template>
  <div 
    class="landing-chat-widget"
    :style="widgetStyle"
    ref="widgetContainer"
  >
    <!-- Draggable Chat Toggle Button -->
    <button 
      v-if="!isOpen"
      @click="handleClick"
      @mousedown="startDrag"
      @touchstart="startDrag"
      class="chat-toggle-btn"
      :class="{ 'dragging': isDragging }"
      aria-label="Open chat"
    >
      <div class="chat-bubble group relative">
        <div class="chat-icon-3d-wrapper relative z-10 transition-transform duration-300 group-hover:scale-110">
          <RobotCanvas />
        </div>
      </div>
      
      <!-- Tech Label -->
      <div class="chat-label">
        <div class="chat-label-content">
          <div class="chat-label-header">UB_AI_ASSISTANT</div>
          <div class="chat-label-text">Tap to ask questions</div>
        </div>
      </div>
    </button>

    <!-- Chat Panel -->
    <Transition name="slide-up">
      <div v-if="isOpen" class="chat-panel border border-gray-200 shadow-2xl">
        <!-- Header (Draggable) -->
        <header 
          class="chat-header bg-white text-gray-900 border-b border-gray-100 cursor-move"
          @mousedown="startPanelDrag"
          @touchstart="startPanelDrag"
        >
          <div class="flex items-center gap-3">
            <div class="avatar bg-gray-50 border-gray-200 overflow-hidden flex items-center justify-center">
               <RobotCanvas style="transform: scale(0.5); width: 100%; height: 100%;" />
            </div>
            <div>
              <h3 class="font-bold font-mono text-sm tracking-wide uppercase text-gray-900">AI_ASSISTANT_V2</h3>
              <div class="flex items-center gap-1.5">
                <span class="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                <p class="text-[10px] font-mono text-gray-500 uppercase tracking-widest">SYSTEM_ONLINE</p>
              </div>
            </div>
          </div>
          <button @click="toggleChat" class="close-btn hover:bg-gray-100 text-gray-400 hover:text-gray-900 transition-colors">
            <i class="fas fa-times"></i>
          </button>
        </header>

        <!-- Messages Area -->
        <div ref="messagesContainer" class="messages-container bg-white relative">
           <!-- Grid Background (Very subtle dark grey grid) -->
           <div class="absolute inset-0 pointer-events-none opacity-[0.03]" 
               style="background-image: linear-gradient(#1f2937 1px, transparent 1px), linear-gradient(90deg, #1f2937 1px, transparent 1px); background-size: 20px 20px;">
           </div>

          <!-- Welcome Message -->
          <div v-if="messages.length === 0" class="welcome-section relative z-10">
            <div class="welcome-icon border-gray-200 shadow-sm bg-white">
              <i class="fas fa-microchip text-2xl text-[#2F2E8B]"></i>
            </div>
            <h4 class="text-base font-black font-mono text-gray-900 mb-2 uppercase">INITIALIZING_CONVERSATION_PROTOCOL...</h4>
            <p class="text-gray-500 text-xs font-mono mb-6 max-w-[260px] mx-auto">
              I am the Uniplexity AI. Query me regarding platform capabilities, pricing models, or integration.
            </p>
            
            <!-- Quick Questions -->
            <div class="quick-questions">
              <button 
                v-for="q in quickQuestions" 
                :key="q"
                @click="sendQuickQuestion(q)"
                class="quick-question-btn group"
              >
                <span class="text-[#2F2E8B] text-[10px] mr-1">></span>
                {{ q }}
              </button>
            </div>
          </div>

          <!-- Chat Messages -->
          <div v-else class="messages-list relative z-10">
            <div 
              v-for="(msg, index) in messages" 
              :key="index"
              :class="['message', msg.type === 'user' ? 'message-user' : 'message-bot']"
            >
              <div v-if="msg.type === 'bot'" class="bot-avatar bg-gray-50 border border-gray-200 overflow-hidden flex items-center justify-center">
                <RobotCanvas style="transform: scale(0.35); width: 100%; height: 100%;" />
              </div>
              <div :class="['message-bubble', msg.type === 'user' ? 'user-bubble' : 'bot-bubble']">
                <div class="message-text" v-html="formatMessage(msg.text)"></div>
              </div>
            </div>

            <!-- Typing Indicator -->
            <div v-if="isTyping" class="message message-bot">
              <div class="bot-avatar bg-gray-50 border border-gray-200 overflow-hidden flex items-center justify-center">
                 <RobotCanvas style="transform: scale(0.35); width: 100%; height: 100%;" />
              </div>
              <div class="typing-indicator border-gray-200 bg-white shadow-sm">
                <span class="bg-gray-400"></span>
                <span class="bg-gray-400"></span>
                <span class="bg-gray-400"></span>
              </div>
            </div>
          </div>
        </div>

        <!-- Input Area -->
        <footer class="chat-footer bg-white border-t border-gray-100">
          <form @submit.prevent="sendMessage" class="input-form">
            <input 
              v-model="userInput"
              type="text"
              placeholder="ENTER_QUERY..."
              class="chat-input font-mono text-xs placeholder:text-gray-400 focus:ring-1 focus:ring-gray-300 focus:border-gray-300 bg-gray-50 focus:bg-white transition-all border-gray-200 text-gray-800"
              :disabled="isTyping"
            />
            <button 
              type="submit" 
              class="send-btn bg-white border border-gray-200 text-[#2F2E8B] hover:bg-[#2F2E8B] hover:text-white hover:border-[#2F2E8B] transition-colors"
              :disabled="!userInput.trim() || isTyping"
            >
              <i class="fas fa-arrow-right text-xs"></i>
            </button>
          </form>
          <p class="powered-by font-mono uppercase tracking-widest text-[9px] text-gray-300">
            // FUELED_BY_UNIPLEXITY_AI_ENGINE
          </p>
        </footer>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, nextTick, onMounted, onUnmounted, computed } from 'vue';
import API_BASE_URL from '@/api_services/api';
import RobotCanvas from './RobotCanvas.vue';

const isOpen = ref(false);
const userInput = ref('');
const messages = ref([]);
const isTyping = ref(false);
const messagesContainer = ref(null);
const sessionId = ref(null);
const widgetContainer = ref(null);

// Drag functionality
const isDragging = ref(false);
const dragStarted = ref(false);
const position = ref({ x: 24, y: 24 }); // Start on the left
const dragOffset = ref({ x: 0, y: 0 });
const dragStartPos = ref({ x: 0, y: 0 });
const isAutoMoving = ref(false);
let autoMoveInterval = null;

// Panel drag functionality
const isPanelDragging = ref(false);
const panelDragStarted = ref(false);
const panelPosition = ref({ x: null, y: null }); // null means centered
const panelDragOffset = ref({ x: 0, y: 0 });
const panelDragStartPos = ref({ x: 0, y: 0 });

const quickQuestions = [
  "What is UB App?",
  "What features do you offer?",
  "How much does it cost?",
  "How can I get started?"
];

// Computed style for widget position
const widgetStyle = computed(() => {
  if (isOpen.value && panelPosition.value.x !== null) {
    // Chat panel is open and has been dragged
    return {
      left: `${panelPosition.value.x}px`,
      top: `${panelPosition.value.y}px`,
      bottom: 'auto',
      right: 'auto'
    };
  }
  // Toggle button position
  return {
    left: `${position.value.x}px`,
    bottom: `${position.value.y}px`,
    right: 'auto'
  };
});

// Generate session ID and load saved position on mount
onMounted(() => {
  sessionId.value = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  
  // Load saved position from localStorage
  const savedPos = localStorage.getItem('chatWidgetPosition');
  if (savedPos) {
    try {
      position.value = JSON.parse(savedPos);
    } catch (e) {
      // Use default position
    }
  }
  
  // Add global event listeners for drag
  document.addEventListener('mousemove', onDrag);
  document.addEventListener('mouseup', stopDrag);
  document.addEventListener('touchmove', onDrag, { passive: false });
  document.addEventListener('touchend', stopDrag);
  
  // Panel drag listeners
  document.addEventListener('mousemove', onPanelDrag);
  document.addEventListener('mouseup', stopPanelDrag);
  document.addEventListener('touchmove', onPanelDrag, { passive: false });
  document.addEventListener('touchend', stopPanelDrag);
  
  // Start automatic movement after 5 seconds
  setTimeout(() => {
    startAutoMovement();
  }, 5000);
});

onUnmounted(() => {
  document.removeEventListener('mousemove', onDrag);
  document.removeEventListener('mouseup', stopDrag);
  document.removeEventListener('touchmove', onDrag);
  document.removeEventListener('touchend', stopDrag);
  document.removeEventListener('mousemove', onPanelDrag);
  document.removeEventListener('mouseup', stopPanelDrag);
  document.removeEventListener('touchmove', onPanelDrag);
  document.removeEventListener('touchend', stopPanelDrag);
  if (autoMoveInterval) clearInterval(autoMoveInterval);
  // Note: animationFrame cleanup handled in movement functions
});

const startDrag = (e) => {
  if (isOpen.value) return;
  
  const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
  const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;
  
  dragStartPos.value = { x: clientX, y: clientY };
  dragOffset.value = {
    x: clientX - position.value.x,
    y: window.innerHeight - clientY - position.value.y
  };
  
  dragStarted.value = false;
  isDragging.value = true;
};

const onDrag = (e) => {
  if (!isDragging.value) return;
  
  const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
  const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;
  
  // Check if we've moved enough to consider it a drag
  const dx = Math.abs(clientX - dragStartPos.value.x);
  const dy = Math.abs(clientY - dragStartPos.value.y);
  
  if (dx > 5 || dy > 5) {
    dragStarted.value = true;
  }
  
  if (dragStarted.value) {
    e.preventDefault();
    
    const newX = clientX - dragOffset.value.x;
    const newY = window.innerHeight - clientY - dragOffset.value.y;
    
    // Constrain to viewport
    // Dynamic widget size based on breakpoints + margin buffer
    let currentWidgetSize = 240;
    if (window.innerWidth <= 480) currentWidgetSize = 120;
    else if (window.innerWidth <= 640) currentWidgetSize = 140;
    else if (window.innerWidth <= 768) currentWidgetSize = 180;
    
    // Add margin buffer
    const widgetSize = currentWidgetSize + 10;
    
    const maxX = window.innerWidth - widgetSize;
    const maxY = window.innerHeight - widgetSize;
    
    position.value = {
      x: Math.max(10, Math.min(newX, maxX)),
      y: Math.max(10, Math.min(newY, maxY))
    };
  }
};

const stopDrag = () => {
  if (isDragging.value && dragStarted.value) {
    // Save position to localStorage
    localStorage.setItem('chatWidgetPosition', JSON.stringify(position.value));
    
    // Stop auto movement when user drags
    if (autoMoveInterval) {
      clearInterval(autoMoveInterval);
      autoMoveInterval = null;
    }
  }
  isDragging.value = false;
};

const startAutoMovement = () => {
  if (isOpen.value) return;
  
  const margin = 20;
  
  // Movement pattern types
  const patterns = ['random', 'curve', 'bounce', 'zigzag'];
  let currentPattern = 'random';
  let animationFrame = null;
  
  const getRandomPosition = () => {
    // Dynamic widget size based on breakpoints + margin buffer
    let currentWidgetSize = 240;
    if (window.innerWidth <= 480) currentWidgetSize = 120;
    else if (window.innerWidth <= 640) currentWidgetSize = 140;
    else if (window.innerWidth <= 768) currentWidgetSize = 180;
    
    const widgetSize = currentWidgetSize + 10;
    const maxX = window.innerWidth - widgetSize;
    const maxY = window.innerHeight - widgetSize;

    return {
      x: Math.max(margin, Math.min(Math.random() * (maxX - margin), maxX)),
      y: Math.max(margin, Math.min(Math.random() * (maxY - margin), maxY))
    };
  };
  
  // Smooth easing function
  const easeInOutCubic = (t) => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  };
  
  // Bezier curve movement - SLOWER
  const moveCurve = (start, end, duration = 4000) => {
    const startTime = Date.now();
    const controlPoint1 = {
      x: start.x + (end.x - start.x) * 0.3 + (Math.random() - 0.5) * 200,
      y: start.y + (end.y - start.y) * 0.3 + (Math.random() - 0.5) * 200
    };
    const controlPoint2 = {
      x: start.x + (end.x - start.x) * 0.7 + (Math.random() - 0.5) * 200,
      y: start.y + (end.y - start.y) * 0.7 + (Math.random() - 0.5) * 200
    };
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeInOutCubic(progress); // Smoother easing
      
      // Cubic bezier calculation
      const t = eased;
      const mt = 1 - t;
      const mt2 = mt * mt;
      const mt3 = mt2 * mt;
      const t2 = t * t;
      const t3 = t2 * t;
      
      position.value = {
        x: mt3 * start.x + 3 * mt2 * t * controlPoint1.x + 3 * mt * t2 * controlPoint2.x + t3 * end.x,
        y: mt3 * start.y + 3 * mt2 * t * controlPoint1.y + 3 * mt * t2 * controlPoint2.y + t3 * end.y
      };
      
      if (progress < 1 && !isOpen.value && !isDragging.value) {
        animationFrame = requestAnimationFrame(animate);
      }
    };
    
    animate();
  };
  
  // Bouncing movement - SLOWER
  const moveBounce = (start, end, duration = 4500) => {
    const startTime = Date.now();
    const bounces = 2; // Reduced bounces for smoother look
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeInOutCubic(progress);
      
      // Linear progress with easing
      const linearX = start.x + (end.x - start.x) * eased;
      const linearY = start.y + (end.y - start.y) * eased;
      
      // Add gentle bounce effect
      const bounceAmount = Math.sin(progress * Math.PI * bounces) * 20 * (1 - progress);
      
      position.value = {
        x: linearX,
        y: linearY + bounceAmount
      };
      
      if (progress < 1 && !isOpen.value && !isDragging.value) {
        animationFrame = requestAnimationFrame(animate);
      }
    };
    
    animate();
  };
  
  // Zigzag movement - SLOWER
  const moveZigzag = (start, end, duration = 5000) => {
    const startTime = Date.now();
    const zigzags = 3; // Reduced zigzags
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeInOutCubic(progress);
      
      const linearX = start.x + (end.x - start.x) * eased;
      const linearY = start.y + (end.y - start.y) * eased;
      
      // Add gentle zigzag perpendicular to movement direction
      const angle = Math.atan2(end.y - start.y, end.x - start.x);
      const perpX = Math.cos(angle + Math.PI / 2);
      const perpY = Math.sin(angle + Math.PI / 2);
      const zigzagAmount = Math.sin(progress * Math.PI * zigzags) * 25; // Reduced amplitude
      
      position.value = {
        x: linearX + perpX * zigzagAmount,
        y: linearY + perpY * zigzagAmount
      };
      
      if (progress < 1 && !isOpen.value && !isDragging.value) {
        animationFrame = requestAnimationFrame(animate);
      }
    };
    
    animate();
  };
  
  const executeMovement = () => {
    if (isOpen.value || isDragging.value) return;
    
    // Recalculate boundaries
    let currentWidgetSize = 240;
    if (window.innerWidth <= 480) currentWidgetSize = 120;
    else if (window.innerWidth <= 640) currentWidgetSize = 140;
    else if (window.innerWidth <= 768) currentWidgetSize = 180;
    const widgetSize = currentWidgetSize + 10;
    const maxX = window.innerWidth - widgetSize;
    const maxY = window.innerHeight - widgetSize;

    // Use local getRandomPosition since the outer one uses stale scope values
    const getRandomPos = () => {
        return {
        x: Math.max(margin, Math.min(Math.random() * (maxX - margin), maxX)),
        y: Math.max(margin, Math.min(Math.random() * (maxY - margin), maxY))
        };
    };

    const start = { ...position.value };
    const end = getRandomPos();
    
    // Randomly select movement pattern
    currentPattern = patterns[Math.floor(Math.random() * patterns.length)];
    
    isAutoMoving.value = true;
    
    if (animationFrame) {
      cancelAnimationFrame(animationFrame);
    }
    
    switch (currentPattern) {
      case 'curve':
        moveCurve(start, end, 4000); // 4 seconds
        break;
      case 'bounce':
        moveBounce(start, end, 4500); // 4.5 seconds
        break;
      case 'zigzag':
        moveZigzag(start, end, 5000); // 5 seconds
        break;
      default:
        // Simple linear movement with smooth easing
        const duration = 3500;
        const startTime = Date.now();
        const animate = () => {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const eased = easeInOutCubic(progress);
          
          position.value = {
            x: start.x + (end.x - start.x) * eased,
            y: start.y + (end.y - start.y) * eased
          };
          
          if (progress < 1 && !isOpen.value && !isDragging.value) {
            animationFrame = requestAnimationFrame(animate);
          }
        };
        animate();
    }
    
    setTimeout(() => {
      isAutoMoving.value = false;
    }, 5000);
  };
  
  // Initial movement after delay
  setTimeout(executeMovement, 3000);
  
  // Set up interval for continuous movement - LONGER INTERVAL
  autoMoveInterval = setInterval(executeMovement, 12000); // 12 seconds between movements
};

const handleClick = () => {
  // Only toggle chat if we didn't drag
  if (!dragStarted.value) {
    toggleChat();
  }
  dragStarted.value = false;
};

const toggleChat = () => {
  isOpen.value = !isOpen.value;
  
  // Center the chat panel when opening if no position is saved
  if (isOpen.value && panelPosition.value.x === null) {
    const panelWidth = window.innerWidth < 420 ? window.innerWidth - 32 : 380;
    const panelHeight = window.innerWidth < 420 ? Math.min(window.innerHeight * 0.7, 520) : 520;
    
    panelPosition.value = {
      x: (window.innerWidth - panelWidth) / 2,
      y: (window.innerHeight - panelHeight) / 2
    };
    
    // Load saved panel position
    const savedPanelPos = localStorage.getItem('chatPanelPosition');
    if (savedPanelPos) {
      try {
        panelPosition.value = JSON.parse(savedPanelPos);
      } catch (e) {
        // Use centered position
      }
    }
  }
};

// Panel drag functions
const startPanelDrag = (e) => {
  const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
  const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;
  
  panelDragStartPos.value = { x: clientX, y: clientY };
  panelDragOffset.value = {
    x: clientX - (panelPosition.value.x || 0),
    y: clientY - (panelPosition.value.y || 0)
  };
  
  panelDragStarted.value = false;
  isPanelDragging.value = true;
};

const onPanelDrag = (e) => {
  if (!isPanelDragging.value) return;
  
  const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
  const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;
  
  // Check if we've moved enough to consider it a drag
  const dx = Math.abs(clientX - panelDragStartPos.value.x);
  const dy = Math.abs(clientY - panelDragStartPos.value.y);
  
  if (dx > 5 || dy > 5) {
    panelDragStarted.value = true;
  }
  
  if (panelDragStarted.value) {
    e.preventDefault();
    
    const newX = clientX - panelDragOffset.value.x;
    const newY = clientY - panelDragOffset.value.y;
    
    // Constrain to viewport
    const panelWidth = window.innerWidth < 420 ? window.innerWidth - 32 : 380;
    const panelHeight = window.innerWidth < 420 ? Math.min(window.innerHeight * 0.7, 520) : 520;
    const maxX = window.innerWidth - panelWidth;
    const maxY = window.innerHeight - panelHeight;
    
    panelPosition.value = {
      x: Math.max(0, Math.min(newX, maxX)),
      y: Math.max(0, Math.min(newY, maxY))
    };
  }
};

const stopPanelDrag = () => {
  if (isPanelDragging.value && panelDragStarted.value) {
    // Save panel position to localStorage
    localStorage.setItem('chatPanelPosition', JSON.stringify(panelPosition.value));
  }
  isPanelDragging.value = false;
  panelDragStarted.value = false;
};

const scrollToBottom = async () => {
  await nextTick();
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
  }
};

const sendQuickQuestion = (question) => {
  userInput.value = question;
  sendMessage();
};


// Format message text with proper HTML formatting
const formatMessage = (text) => {
  if (!text) return '';
  
  // Escape HTML to prevent XSS
  let formatted = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  
  // Convert **bold** to <strong>
  formatted = formatted.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  
  // Convert *italic* to <em>
  formatted = formatted.replace(/\*(.+?)\*/g, '<em>$1</em>');
  
  // Convert numbered lists (1. 2. 3. etc)
  formatted = formatted.replace(/^(\d+)\.\s+(.+)$/gm, '<div class="list-item"><span class="list-number">$1.</span> $2</div>');
  
  // Convert bullet points (- or •)
  formatted = formatted.replace(/^[-•]\s+(.+)$/gm, '<div class="list-item"><span class="bullet">•</span> $2</div>');
  
  // Convert line breaks to <br> tags
  formatted = formatted.replace(/\n/g, '<br>');
  
  // Add spacing after periods for better readability
  formatted = formatted.replace(/\.\s+/g, '. ');
  
  return formatted;
};

const sendMessage = async () => {
  const question = userInput.value.trim();
  if (!question || isTyping.value) return;

  // Add user message
  messages.value.push({
    type: 'user',
    text: question
  });
  userInput.value = '';
  await scrollToBottom();

  // Show typing indicator
  isTyping.value = true;
  await scrollToBottom();

  try {
    const response = await fetch(`${API_BASE_URL}/public/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        question: question,
        session_id: sessionId.value
      })
    });

    if (response.ok) {
      const data = await response.json();
      messages.value.push({
        type: 'bot',
        text: data.answer
      });
    } else {
      messages.value.push({
        type: 'bot',
        text: "I'm having trouble connecting right now. Please try again or contact us at support@uniplexity.com"
      });
    }
  } catch (error) {
    console.error('Chat error:', error);
    messages.value.push({
      type: 'bot',
      text: "I'm having trouble connecting right now. Please try again or contact us at support@uniplexity.com"
    });
  } finally {
    isTyping.value = false;
    await scrollToBottom();
  }
};
</script>

<style scoped>
.landing-chat-widget {
  position: fixed;
  z-index: 9999;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  /* Position controlled by JavaScript animation */
}

/* Toggle Button */
.chat-toggle-btn {
  background: none;
  border: none;
  cursor: grab;
  padding: 0;
  touch-action: none;
}

.chat-toggle-btn:active,
.chat-toggle-btn.dragging {
  cursor: grabbing;
}

.chat-bubble {
  width: 240px;
  height: 240px;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: transform 0.3s ease;
  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.1));
  animation: bubblePulse 4s ease-in-out infinite;
}

/* Tablet responsiveness */
@media (max-width: 768px) {
  .chat-bubble {
    width: 180px;
    height: 180px;
  }
}

/* Mobile responsiveness */
@media (max-width: 640px) {
  .chat-bubble {
    width: 140px;
    height: 140px;
  }
}

@media (max-width: 480px) {
  .chat-bubble {
    width: 120px;
    height: 120px;
  }
}

.chat-bubble:hover {
  transform: scale(1.08);
  filter: drop-shadow(0 6px 16px rgba(0, 0, 0, 0.15));
  animation: none;
}

@keyframes bubblePulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.03);
  }
}

/* Tech Label - Top Right Position with Enhanced Animations */
.chat-label {
  position: absolute;
  right: -20px;
  top: -85px;
  pointer-events: none;
  animation: 
    floatIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards,
    gentleFloat 3s ease-in-out infinite,
    shimmer 4s ease-in-out infinite;
  opacity: 0;
  animation-delay: 1s, 1.8s, 2s;
  z-index: 10;
}

.chat-label-content {
  background: white;
  border: 2px solid #e5e7eb;
  border-left: 4px solid #2F2E8B;
  padding: 10px 14px;
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  white-space: nowrap;
  position: relative;
  overflow: hidden;
}

/* Animated shine effect */
.chat-label-content::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(47, 46, 139, 0.1),
    transparent
  );
  animation: shine 3s ease-in-out infinite;
  animation-delay: 2s;
}

.chat-label-header {
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 10px;
  font-weight: 700;
  color: #2F2E8B;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 3px;
  animation: pulse 2s ease-in-out infinite;
  position: relative;
  z-index: 1;
}

.chat-label-text {
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  color: #6b7280;
  font-weight: 500;
  position: relative;
  z-index: 1;
  animation: textPulse 3s ease-in-out infinite;
}

@keyframes floatIn {
  from {
    opacity: 0;
    transform: translateY(10px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes gentleFloat {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-6px);
  }
}

@keyframes shimmer {
  0%, 100% {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  50% {
    box-shadow: 0 6px 20px rgba(47, 46, 139, 0.2);
  }
}

@keyframes shine {
  0% {
    left: -100%;
  }
  50%, 100% {
    left: 100%;
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

@keyframes textPulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.85;
  }
}

/* Responsive label for mobile */
@media (max-width: 640px) {
  .chat-label {
    right: -10px;
    top: -140px;
    transform: scale(0.85);
  }
  
  .chat-label-header {
    font-size: 9px;
    letter-spacing: 0.3px;
  }
  
  .chat-label-text {
    font-size: 10px;
  }
  
  .chat-label-content {
    padding: 8px 12px;
  }
}

@keyframes pulse {
  0% { transform: scale(1); opacity: 0.8; }
  100% { transform: scale(1.4); opacity: 0; }
}

/* Custom chat icon images */
.chat-icon {
  width: 130px;
  height: 130px;
  object-fit: contain;
}

.avatar-icon {
  width: 20px;
  height: 20px;
  object-fit: contain;
}

/* Chat Panel */
.chat-panel {
  width: 380px;
  height: 520px;
  background: #ffffff;
  border-radius: 4px; /* Squarer look for tech feel */
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* Header */
.chat-header {
  padding: 16px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  user-select: none;
  touch-action: none;
}

.chat-header:active {
  cursor: grabbing;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn {
  width: 32px;
  height: 32px;
  border-radius: 4px;
  border: none;
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

/* Messages Container */
.messages-container {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
}

/* Welcome Section */
.welcome-section {
  text-align: center;
  padding: 20px 0;
}

.welcome-icon {
  width: 64px;
  height: 64px;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
}

/* Quick Questions */
.quick-questions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
}

.quick-question-btn {
  padding: 8px 14px;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 2px;
  font-size: 11px;
  font-family: ui-monospace, SFMono-Regular, monospace;
  color: #374151;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
}

.quick-question-btn:hover {
  border-color: #2F2E8B;
  color: #2F2E8B;
  background: #f9fafb;
}

/* Messages */
.messages-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.message {
  display: flex;
  align-items: flex-end;
  gap: 8px;
}

.message-user {
  flex-direction: row-reverse;
}

.bot-avatar {
  width: 24px;
  height: 24px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.message-bubble {
  max-width: 80%;
  padding: 12px 16px;
  border-radius: 4px;
}

.user-bubble {
  background: #ffffff;
  color: #1f2937;
  border: 1px solid #e5e7eb;
  border-left: 3px solid #2F2E8B;
  border-bottom-right-radius: 0;
}

.bot-bubble {
  background: #ffffff;
  color: #1f2937;
  border: 1px solid #e5e7eb;
  border-bottom-left-radius: 0;
}

/* Typing Indicator */
.typing-indicator {
  display: flex;
  gap: 4px;
  padding: 12px 16px;
  border-radius: 4px;
  border-bottom-left-radius: 0;
}

.typing-indicator span {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  animation: typing 1.4s infinite;
  opacity: 0.5;
}

.typing-indicator span:nth-child(2) { animation-delay: 0.2s; }
.typing-indicator span:nth-child(3) { animation-delay: 0.4s; }

@keyframes typing {
  0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
  30% { transform: translateY(-4px); opacity: 1; }
}

/* Footer */
.chat-footer {
  padding: 16px 20px;
}

.input-form {
  display: flex;
  gap: 8px;
}

.chat-input {
  flex: 1;
  padding: 10px 14px;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  outline: none;
}

.send-btn {
  width: 40px;
  height: 40px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.send-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background: #e5e7eb;
}

.powered-by {
  text-align: center;
  margin-top: 8px;
}

/* Slide Animation */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
}

/* Responsive */
@media (max-width: 420px) {
  .landing-chat-widget {
    bottom: 16px;
    right: 16px;
  }
  
  .chat-panel {
    width: calc(100vw - 32px);
    height: 70vh;
    max-height: 520px;
  }
}
</style>
