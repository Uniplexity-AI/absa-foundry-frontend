// Web Worker: dataProcessor.worker.js
// Receives raw salesData and weeklyTransactions, returns downsampled arrays and precomputed metrics.

function downsample(data, maxPoints = 200) {
  if (!Array.isArray(data) || data.length <= maxPoints) return data;
  const out = [];
  const bucketSize = Math.ceil(data.length / maxPoints);
  for (let i = 0; i < data.length; i += bucketSize) {
    // pick average of bucket
    const slice = data.slice(i, i + bucketSize);
    const avg = slice.reduce((s, v) => ({
      sales: (s.sales || 0) + (v.sales || 0),
      profit: (s.profit || 0) + (v.profit || 0),
      dateCount: (s.dateCount || 0) + 1
    }), { sales: 0, profit: 0, dateCount: 0 });
    out.push({
      sales: Math.round(avg.sales / avg.dateCount),
      profit: Math.round(avg.profit / avg.dateCount),
      date: slice[Math.floor(slice.length / 2)].date
    });
  }
  return out;
}

function processWeekly(weekly) {
  if (!Array.isArray(weekly)) return [];
  return weekly.map(w => ({ day: w.day, transactions: Number(w.transactions || 0) }));
}

self.addEventListener('message', (e) => {
  const { salesData, weeklyTransactions } = e.data || {};
  try {
    const downsampled = downsample(salesData || [], 200);
    const weekly = processWeekly(weeklyTransactions || []);
    // Precompute numeric arrays and maxes to avoid Math.max(...bigArray) on main thread
    const salesArr = downsampled.map(d => Number(d.sales || 0));
    const profitArr = downsampled.map(d => Number(d.profit || 0));
    const weeklyArr = weekly.map(w => Number(w.transactions || 0));
    const result = {
      salesData: downsampled,
      weeklyTransactions: weekly,
      salesArr,
      profitArr,
      weeklyArr,
      salesMax: salesArr.length ? Math.max(...salesArr) : 0,
      weeklyMax: weeklyArr.length ? Math.max(...weeklyArr) : 0
    };
    self.postMessage(result);
  } catch (err) {
    self.postMessage({ error: String(err) });
  }
});
