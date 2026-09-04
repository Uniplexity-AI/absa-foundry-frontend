<template>
  <div class="global-mesh-bg text-on-background w-full p-margin-mobile md:p-margin-desktop max-w-container-max mx-auto pt-20 pb-24">
    <div class="mb-6">
      <button @click="router.back()" class="flex items-center gap-2 text-body-md font-bold text-[#DC0037] hover:text-[#B50232] transition-colors">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"/></svg>
        Back
      </button>
      <div class="flex items-center gap-2 text-label-sm text-secondary mt-2">
        <span>Dashboard</span><span>/</span><span>AI Assistant</span><span>/</span>
        <span class="text-on-surface font-bold">Codebase Insights</span>
      </div>
    </div>

    <h1 class="text-headline-lg font-headline font-semibold text-on-surface mb-6">Codebase Insights</h1>

    <div class="bg-surface border border-outline-variant shadow-sm global-dotted-bg p-5 md:p-6 mb-6">
      <h2 class="text-headline-md font-headline font-semibold text-on-surface mb-4">Graphify Report</h2>
      <div v-if="reportContent" class="prose max-w-none" v-html="renderedMarkdown"></div>
      <div v-else class="text-body-md text-secondary">Loading Graphify report...</div>
      <p class="text-label-sm text-secondary mt-4">Data from `absa-foundry-frontend/graphify-out/GRAPH_REPORT.md`</p>
    </div>

    <div class="bg-surface border border-outline-variant shadow-sm global-dotted-bg p-5 md:p-6">
      <h2 class="text-headline-md font-headline font-semibold text-on-surface mb-4">Interactive Graph</h2>
      <p class="text-body-md text-secondary mb-4">Open the full interactive graph visualization in a new tab.</p>
      <button @click="openInteractiveGraph" class="bg-[#DC0037] text-white text-body-md font-bold py-2.5 px-5 shadow-sm hover:bg-[#B50232] transition-colors">OPEN INTERACTIVE GRAPH</button>
      <p class="text-label-sm text-secondary mt-4">From `absa-foundry-frontend/graphify-out/graph.html`</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { marked } from 'marked';

const router = useRouter();
const reportContent = ref('');

const renderedMarkdown = computed(() => {
  if (!reportContent.value) return '';
  return marked.parse(reportContent.value);
});

const openInteractiveGraph = () => {
  // Assuming graph.html is accessible relative to the frontend's public path
  window.open('/graphify-out/graph.html', '_blank');
};

onMounted(async () => {
  try {
    // Fetch the raw Markdown report
    const response = await fetch('/graphify-out/GRAPH_REPORT.md');
    if (response.ok) {
      reportContent.value = await response.text();
    } else {
      reportContent.value = 'Failed to load Graphify report.';
      console.error('Failed to load Graphify report:', response.statusText);
    }
  } catch (error) {
    reportContent.value = 'Error loading Graphify report.';
    console.error('Error loading Graphify report:', error);
  }
});
</script>

<style scoped>
/* Add prose classes for basic markdown rendering */
.prose {
  font-family: 'Hanken Grotesk', sans-serif;
  font-size: 1rem;
  line-height: 1.75;
  color: #201a1a;
}
.prose h1, .prose h2, .prose h3, .prose h4, .prose h5, .prose h6 {
  font-family: 'Hanken Grotesk', sans-serif;
  font-weight: 700;
  color: #201a1a;
  margin-top: 1.5em;
  margin-bottom: 0.75em;
}
.prose h1 { font-size: 2em; }
.prose h2 { font-size: 1.5em; }
.prose h3 { font-size: 1.25em; }
.prose p { margin-bottom: 1em; }
.prose ul, .prose ol { margin-bottom: 1em; padding-left: 1.5em; }
.prose li { margin-bottom: 0.5em; }
.prose code {
  font-family: 'Space Mono', monospace;
  background-color: #f3f4f6;
  padding: 0.2em 0.4em;
  border-radius: 0.25rem;
}
.prose pre {
  background-color: #f3f4f6;
  padding: 1em;
  border-radius: 0.25rem;
  overflow-x: auto;
}
.prose a {
  color: #DC0037;
  text-decoration: underline;
}
.prose strong {
  font-weight: 700;
}
.prose table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1em;
  margin-bottom: 1em;
}
.prose th, .prose td {
  border: 1px solid #e5e7eb;
  padding: 0.75em;
  text-align: left;
}
.prose th {
  background-color: #f9fafb;
  font-weight: 600;
}
</style>
