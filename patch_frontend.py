import re

path = 'src/views/Modules/datapipeline/EtlPipeline.vue'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Inject fetchManualRunStatus and manualRunPollInterval near fetchExtractionProgress
new_funcs = """
let manualRunPollInterval = null

const fetchManualRunStatus = async () => {
  try {
    const { data } = await api.get('/api/etl/manual-run-status');
    if (data && data.status !== 'idle') {
      if (!showRunModal.value && (data.status === 'running' || data.status === 'started')) {
        showRunModal.value = true;
      }
      isRunning.value = data.status === 'running' || data.status === 'started';
      
      pipelineSteps.value.forEach((s, idx) => {
        const stepNum = idx + 1;
        if (data.step > stepNum) {
          s.status = 'done';
          const res = data.results.find(r => r.step === stepNum);
          s.detail = res ? res.message : '';
          stopStepTimer(s.id);
        } else if (data.step === stepNum) {
          s.status = data.status === 'error' ? 'error' : 'running';
          if (data.status === 'error') {
            s.detail = data.error_message || 'Pipeline failed';
            stopStepTimer(s.id);
          } else {
            if (!stepIntervals[s.id]) startStepTimer(s.id);
          }
        } else {
          s.status = 'idle';
          s.detail = '';
          stopStepTimer(s.id);
        }
      });
      
      if (data.step === 1 && (data.status === 'running' || data.status === 'started')) {
        if (!extractionPollInterval) startExtractionPoll();
      } else {
        if (extractionPollInterval) stopExtractionPoll(data.step > 1);
      }

      if (!isRunning.value && manualRunPollInterval) {
        clearInterval(manualRunPollInterval);
        manualRunPollInterval = null;
        runResult.value = { 
            ok: data.status === 'completed', 
            message: data.status === 'completed' ? 'Pipeline completed successfully across all models.' : 'Pipeline stopped at error.' 
        };
      }
    }
  } catch (err) {
    console.error('Failed to fetch manual run status', err);
  }
}
"""

if 'fetchManualRunStatus' not in content:
    content = content.replace('let progressInterval = null', 'let progressInterval = null\n' + new_funcs)

# 2. Inject into onMounted
content = content.replace('progressInterval = setInterval(fetchExtractionProgress, 2000);', 
                          'progressInterval = setInterval(fetchExtractionProgress, 2000);\n    fetchManualRunStatus();\n    manualRunPollInterval = setInterval(fetchManualRunStatus, 2000);')

# 3. Replace startPipeline completely
start_pipeline_match = re.search(r'async function startPipeline\(\) \{.*?\n  \}\n\}', content, re.DOTALL)
if start_pipeline_match:
    new_start = """async function startPipeline() {
  if (isRunning.value) return
  isRunning.value = true
  resetSteps()
  const date = runDate.value
  
  try {
      await api.post(/api/etl/trigger-manual-run?snapshot=);
      if (!manualRunPollInterval) {
          manualRunPollInterval = setInterval(fetchManualRunStatus, 2000);
      }
  } catch (err) {
      console.error(err);
      isRunning.value = false;
      alert('Failed to start manual pipeline');
  }
}"""
    content = content.replace(start_pipeline_match.group(0), new_start)

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Vue Patched!")
