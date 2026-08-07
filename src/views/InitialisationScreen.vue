<template>
  <div class="absa-init" :class="{ 'absa-init--fading': fadingOut }">
    <!-- Engineering Grid Background -->
    <div class="absa-init__grid"></div>
    <div class="absa-init__vignette"></div>

    <!-- Brand Gradient: Passion → Power at 45° (bottom-left to top-right), 70/30 -->
    <div class="absa-init__gradient"></div>

    <!-- Main Content -->
    <main class="absa-init__canvas">
      <!-- Header Stack -->
      <header class="absa-init__header">
        <img
          alt="Absa Logo"
          class="absa-init__logo"
          src="/src/assets/absa-logo.png"
        />
        <h1 class="absa-init__title">Customer Lifecycle Prediction System</h1>
        <p class="absa-init__subtitle">Enterprise Decision Intelligence Platform</p>
        <p class="absa-init__overline">Internal Operations Platform</p>
      </header>

      <!-- Initialisation Panel (Level 2 elevation) -->
      <section class="absa-init__panel">
        <h2 class="absa-init__panel-title">Initialising Secure Platform</h2>

        <!-- Progress Bar -->
        <div class="absa-init__progress-track">
          <div
            class="absa-init__progress-fill"
            :class="{ 'absa-init__progress-fill--done': progressPercent >= 100 }"
            :style="{ width: progressPercent + '%' }"
          ></div>
        </div>

        <!-- Steps -->
        <ul class="absa-init__steps">
          <li
            v-for="(step, i) in steps"
            :key="i"
            class="absa-init__step"
            :class="{
              'absa-init__step--done': step.state === 'done',
              'absa-init__step--active': step.state === 'active',
              'absa-init__step--pending': step.state === 'pending',
            }"
          >
            <!-- Done: green check -->
            <svg v-if="step.state === 'done'" class="absa-init__step-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" fill="#0f9d58" opacity="0.15"/>
              <circle cx="12" cy="12" r="10" stroke="#0f9d58" stroke-width="2"/>
              <polyline points="8 12 11 15 17 9" stroke="#0f9d58" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <!-- Active: red spinner -->
            <svg v-else-if="step.state === 'active'" class="absa-init__step-icon absa-init__step-icon--spin" width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="#f4eceb" stroke-width="2.5"/>
              <path d="M12 2a10 10 0 0 1 10 10" stroke="#dc0037" stroke-width="2.5" stroke-linecap="round"/>
            </svg>
            <!-- Pending: empty circle -->
            <svg v-else class="absa-init__step-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="#926e6e" stroke-width="2" opacity="0.5"/>
            </svg>
            <span class="absa-init__step-label">{{ step.label }}</span>
          </li>
        </ul>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const progressPercent = ref(0)
const fadingOut = ref(false)

const steps = ref([
  { label: 'Initialising application',       state: 'done' },
  { label: 'Preparing secure workspace',     state: 'done' },
  { label: 'Verifying security',              state: 'done' },
  { label: 'Preparing authentication...',     state: 'active' },
])

const timers = []

onMounted(() => {
  // ═══ ~10 second simple initialisation ═══

  // 1.5s — progress to 30%
  timers.push(setTimeout(() => { progressPercent.value = 30 }, 1500))

  // 3.5s — progress to 55%
  timers.push(setTimeout(() => { progressPercent.value = 55 }, 3500))

  // 6.0s — progress to 75%
  timers.push(setTimeout(() => { progressPercent.value = 75 }, 6000))

  // 9.0s — all done, progress 100%
  timers.push(setTimeout(() => {
    steps.value[3].state = 'done'
    progressPercent.value = 100
  }, 9000))

  // 10.0s — fade out (600ms CSS transition) then navigate
  timers.push(setTimeout(() => {
    fadingOut.value = true
  }, 10000))

  // 10.7s — navigate to login
  timers.push(setTimeout(() => {
    router.push('/login')
  }, 10700))
})

onBeforeUnmount(() => {
  timers.forEach(t => clearTimeout(t))
})
</script>

<style scoped>
/* ═══════════════════════════════════════════════════════
   Absa Enterprise Core V3 — Initialisation Screen
   Token reference:
     primary:        #ae0029    primary-container: #dc0037
     on-primary:     #ffffff    on-primary-container: #ffeded
     surface:        #fff8f7    surface-container-lowest: #ffffff
     surface-container: #f4eceb
     on-surface:     #1e1b1b    on-surface-variant: #5d3f3f
     outline:        #926e6e    outline-variant: #e7bcbc
     background:     #fff8f7    on-background: #1e1b1b
     error:          #ba1a1a    inverse-surface: #332f2f
   ═══════════════════════════════════════════════════════ */

/* ── Design Tokens (scoped) ── */
.absa-init {
  --_bg:    #fff8f7;   /* surface / background */
  --_scl:   #ffffff;   /* surface-container-lowest */
  --_sc:    #f4eceb;   /* surface-container */
  --_pri:   #ae0029;   /* primary */
  --_pric:  #dc0037;   /* primary-container (Passion) */
  --_onp:   #ffffff;   /* on-primary */
  --_onpc:  #ffeded;   /* on-primary-container */
  --_ons:   #1e1b1b;   /* on-surface (Enrich) */
  --_onsv:  #5d3f3f;   /* on-surface-variant */
  --_out:   #926e6e;   /* outline */
  --_outv:  #e7bcbc;   /* outline-variant */
  --_err:   #ba1a1a;   /* error */
  --_invsf: #332f2f;   /* inverse-surface */
  --_sec:   #b90734;   /* secondary (Power) */
  --_ene:   #FF780F;   /* Energy (accent) */

  /* Typography — Source Sans 3 */
  --_font:  'Source Sans 3', ui-sans-serif, system-ui, -apple-system, sans-serif;

  /* Spacing (8px scale + 4px fine) */
  --_sp-xs: 4px;
  --_sp-sm: 8px;
  --_sp-md: 16px;
  --_sp-lg: 24px;
  --_sp-xl: 32px;
  --_sp-2xl: 40px;

  /* Shape */
  --_r-sm:  4px;   /* 0.25rem — buttons, inputs */
  --_r-md:  8px;   /* 0.5rem  — cards, modals */
  --_r-full: 9999px;

  /* Elevation — Level 2: 0 4px 20px 5% Enrich */
  --_shadow-l2: 0px 4px 20px rgba(30, 27, 27, 0.05);

  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: var(--_bg);
  color: var(--_ons);
  font-family: var(--_font);
  transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Fade-out before navigating to login */
.absa-init--fading {
  opacity: 0;
  pointer-events: none;
}

/* ── Engineering Grid ── */
.absa-init__grid {
  position: absolute;
  inset: 0;
  z-index: 0;
  background-size: 40px 40px;
  background-image:
    linear-gradient(to right, rgba(30,27,27,0.03) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(30,27,27,0.03) 1px, transparent 1px);
}

/* ── Radial Vignette ── */
.absa-init__vignette {
  position: absolute;
  inset: 0;
  z-index: 0;
  background: radial-gradient(circle at center, transparent 0%, var(--_bg) 100%);
}

/* ── Brand Gradient (45°, Passion→Power 70/30) ── */
.absa-init__gradient {
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 4px;
  z-index: 1;
  background: linear-gradient(
    135deg,                           /* bottom-left → top-right = 135° from top */
    var(--_pric) 0%,                  /* Passion #DC0037 */
    var(--_pric) 70%,                 /* 70% Passion */
    var(--_sec) 100%                  /* 30% Power #b90734 */
  );
}

/* ── Canvas (responsive margins per spec) ── */
.absa-init__canvas {
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 672px;                    /* comfortable reading width */
  padding: var(--_sp-xl) var(--_sp-md); /* mobile: 32px 16px */
}
@media (min-width: 768px) {
  .absa-init__canvas {
    padding: var(--_sp-xl) var(--_sp-2xl); /* tablet+: 32px 40px */
  }
}

/* ── Header ── */
.absa-init__header {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: var(--_sp-xl);         /* 32px — generous whitespace */
  animation: absaFadeIn 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  opacity: 0;
}

.absa-init__logo {
  width: 128px;
  height: 128px;
  object-fit: contain;
  margin-bottom: var(--_sp-md);         /* 16px */
}

/* headline-lg-mobile / headline-lg */
.absa-init__title {
  font-family: var(--_font);
  font-size: 28px;                      /* headline-lg-mobile */
  font-weight: 700;
  line-height: 36px;
  color: var(--_pri);                   /* primary #ae0029 */
  margin: 0 0 var(--_sp-xs);            /* 4px */
}
@media (min-width: 768px) {
  .absa-init__title {
    font-size: 32px;                    /* headline-lg */
    line-height: 40px;
    letter-spacing: -0.01em;
  }
}

/* body-lg */
.absa-init__subtitle {
  font-family: var(--_font);
  font-size: 18px;
  font-weight: 400;
  line-height: 28px;
  color: var(--_onsv);                  /* on-surface-variant #5d3f3f */
  margin: 0 0 var(--_sp-xs);
}

/* label-md — uppercase tracking */
.absa-init__overline {
  font-family: var(--_font);
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: 0.01em;              /* label-md spec */
  text-transform: uppercase;
  color: var(--_out);                   /* outline #926e6e */
}

/* ── Panel (Level 2 elevation) ── */
.absa-init__panel {
  width: 100%;
  background: var(--_scl);              /* surface-container-lowest #ffffff */
  border: 1px solid color-mix(in srgb, var(--_outv) 30%, transparent);
  /* ↑ outline-variant at 30% = spec's 1px Enrich 10% ≈ subtle border */
  border-radius: var(--_r-md);          /* 8px — cards */
  box-shadow: var(--_shadow-l2);        /* 0 4px 20px 5% Enrich */
  padding: var(--_sp-lg);               /* 24px */
  position: relative;
  overflow: hidden;
  animation: absaFadeIn 1.2s cubic-bezier(0.4, 0, 0.2, 1) 0.4s forwards;
  opacity: 0;
}

/* Red accent bar — Passion primary-container */
.absa-init__panel::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 3px;
  background: var(--_pric);             /* primary-container #dc0037 (Passion) */
  border-radius: var(--_r-sm) var(--_r-sm) 0 0;
}

/* label-md */
.absa-init__panel-title {
  font-family: var(--_font);
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: 0.01em;
  text-transform: uppercase;
  color: var(--_ons);                   /* on-surface #1e1b1b */
  margin: 0 0 var(--_sp-md);            /* 16px */
}

/* ── Progress Bar ── */
.absa-init__progress-track {
  width: 100%;
  height: 4px;
  background: var(--_sc);               /* surface-container #f4eceb */
  border-radius: var(--_r-sm);          /* 4px */
  margin-bottom: var(--_sp-md);         /* 16px */
  overflow: hidden;
}

.absa-init__progress-fill {
  height: 100%;
  background: var(--_pric);             /* primary-container #dc0037 (Passion) */
  border-radius: var(--_r-sm);
  transition: width 2s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Done — brand gradient Passion→Power 70/30 at 135° */
.absa-init__progress-fill--done {
  background: linear-gradient(
    135deg,
    var(--_pric) 0%,
    var(--_pric) 70%,
    var(--_sec) 100%
  );
}

/* ── Steps ── */
.absa-init__steps {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--_sp-sm);                   /* 8px — internal component spacing */
}

/* body-md */
.absa-init__step {
  display: flex;
  align-items: center;
  gap: var(--_sp-sm);
  font-family: var(--_font);
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
}

.absa-init__step-icon {
  flex-shrink: 0;
  display: block;
}

.absa-init__step-icon--spin {
  animation: absaSpin 1s linear infinite;
}

/* Done — on-surface-variant */
.absa-init__step--done {
  color: var(--_onsv);                  /* #5d3f3f */
}

/* Active — on-surface */
.absa-init__step--active {
  color: var(--_ons);                   /* #1e1b1b */
  font-weight: 500;
}

/* Pending — muted, 50% opacity */
.absa-init__step--pending {
  color: var(--_out);                   /* #926e6e */
  opacity: 0.5;
}

/* ═══ Animations ═══ */
@keyframes absaFadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes absaSpin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}
</style>
