<template>
  <div class="min-h-screen bg-[#f8f9fa]">
    <div class="max-w-[1600px] mx-auto p-8 flex flex-col gap-8">
      <!-- Breadcrumbs + Period Selector -->
      <div class="flex items-end justify-between w-full">
        <div class="flex flex-col gap-2">
          <div class="flex items-center gap-0">
            <span class="text-[#5d3f3f] text-[12px] font-semibold tracking-[0.6px] leading-[16px] cursor-pointer hover:text-[#77021e] hover:underline transition-colors duration-150">Home</span>
            <svg class="mx-1" width="6" height="10" viewBox="0 0 6 10" fill="none">
              <path d="M1 1l4 4-4 4" stroke="#5d3f3f" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span class="text-[#77021e] text-[12px] font-bold tracking-[0.6px] leading-[16px] cursor-pointer hover:text-[#77021e] hover:underline transition-colors duration-150">Dashboard</span>
          </div>
          <h1 class="text-[#191c1d] text-[32px] font-bold tracking-[-0.32px] leading-[40px]">Portfolio Overview</h1>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-[#5d3f3f] text-[12px] font-semibold tracking-[0.6px] leading-[16px]">Data Snapshot:</span>
          <div class="bg-[#f8f9fa] border border-[#e7bcbc] rounded-[4px] flex items-center gap-2 px-[17px] py-[9px]">
            <span class="text-[#191c1d] text-[14px] font-semibold">Latest (July 20, 2026)</span>
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
              <path d="M1 1l4 4 4-4" stroke="#191c1d" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </div>
      </div>

      <!-- KPI Cards -->
      <div class="flex gap-6 w-full">
        <!-- Total Customers -->
        <div class="flex-1 bg-[#f8f9fa] border border-[#e7bcbc] rounded-[6px] p-[25px] flex flex-col">
          <span class="text-[#5d3f3f] text-[12px] font-semibold tracking-[0.6px] uppercase leading-[16px] pb-2">TOTAL CUSTOMERS</span>
          <div class="relative h-10 w-full">
            <span class="text-[#191c1d] text-[32px] font-bold tracking-[-0.32px] leading-[40px]">1,240</span>
            <div class="absolute left-[91.55px] top-[17px] flex items-center">
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none" class="mr-[-0.01px]">
                <path d="M4 0l4 5H0z" fill="#2e7d32"/>
              </svg>
              <span class="text-[#2e7d32] text-[12px] font-bold tracking-[0.6px] leading-[16px]">2.4%</span>
            </div>
          </div>
          <div class="pt-4 w-full">
            <div class="bg-[#f3f4f5] h-8 rounded-[2px] w-full flex items-end gap-[2px] px-1 pb-1">
              <div class="bg-[#dc0037] opacity-20 w-[21.58px] rounded-t-[2px]" style="height: 11.19px"></div>
              <div class="bg-[#dc0037] opacity-30 w-[21.56px] rounded-t-[2px]" style="height: 15.39px"></div>
              <div class="bg-[#dc0037] opacity-50 w-[21.58px] rounded-t-[2px]" style="height: 12.59px"></div>
              <div class="bg-[#dc0037] opacity-40 w-[21.56px] rounded-t-[2px]" style="height: 16.8px"></div>
              <div class="bg-[#dc0037] opacity-60 w-[21.58px] rounded-t-[2px]" style="height: 21px"></div>
              <div class="bg-[#dc0037] opacity-80 w-[21.56px] rounded-t-[2px]" style="height: 18.19px"></div>
              <div class="bg-[#dc0037] w-[21.58px] rounded-t-[2px]" style="height: 25.19px"></div>
            </div>
          </div>
        </div>

        <!-- At Risk -->
        <div class="flex-1 bg-[#f8f9fa] border border-[#e7bcbc] rounded-[6px] p-[25px] pb-[41px] flex flex-col">
          <span class="text-[#5d3f3f] text-[12px] font-semibold tracking-[0.6px] uppercase leading-[16px] pb-2">AT RISK</span>
          <div class="flex items-baseline gap-2">
            <span class="text-[#ed6c02] text-[32px] font-bold tracking-[-0.32px] leading-[40px]">68</span>
            <span class="text-[#5d3f3f] text-[12px] font-medium opacity-60 tracking-[0.6px] leading-[16px]">| 5.5%</span>
          </div>
          <div class="pt-4 w-full">
            <span class="text-[#5d3f3f] text-[12px] font-normal italic leading-[16px]">+4 since last snapshot</span>
          </div>
        </div>

        <!-- Dormant -->
        <div class="flex-1 bg-[#f8f9fa] border border-[#e7bcbc] rounded-[6px] p-[25px] pb-[41px] flex flex-col">
          <span class="text-[#5d3f3f] text-[12px] font-semibold tracking-[0.6px] uppercase leading-[16px] pb-2">DORMANT</span>
          <div class="flex items-baseline gap-2">
            <span class="text-[#757575] text-[32px] font-bold tracking-[-0.32px] leading-[40px]">42</span>
            <span class="text-[#5d3f3f] text-[12px] font-medium opacity-60 tracking-[0.6px] leading-[16px]">| 3.4%</span>
          </div>
          <div class="pt-4 w-full">
            <span class="text-[#5d3f3f] text-[12px] font-normal italic leading-[16px]">Stable across 3 periods</span>
          </div>
        </div>

        <!-- Actions Due Today -->
        <div class="flex-1 bg-[#f8f9fa] border border-[#e7bcbc] rounded-[6px] p-[25px] pb-[38px] flex flex-col">
          <span class="text-[#5d3f3f] text-[12px] font-semibold tracking-[0.6px] uppercase leading-[16px] pb-2">ACTIONS DUE TODAY</span>
          <div class="flex items-baseline">
            <span class="text-[#dc0037] text-[32px] font-bold tracking-[-0.32px] leading-[40px]">12</span>
          </div>
          <div class="pt-4 w-full">
            <div class="flex gap-2">
              <span class="bg-[#ffdad6] text-[#93000a] text-[10px] font-bold px-2 py-0.5 rounded-[2px] leading-[15px]">8 URGENT</span>
              <span class="bg-[#e7e8e9] text-[#5d3f3f] text-[10px] font-bold px-2 py-0.5 rounded-[2px] leading-[15px]">4 ROUTINE</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Two-column grid: Alerts + Table -->
      <div class="grid grid-cols-3 gap-6 w-full" style="grid-template-rows: 500px">
        <!-- Critical Alerts -->
        <div class="bg-[#f8f9fa] border border-[#e7bcbc] rounded-[6px] flex flex-col h-[500px] overflow-hidden p-px col-span-1">
          <div class="border-b border-[#e7bcbc] px-6 py-4 flex items-center justify-between">
            <div class="flex items-center gap-2">
              <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
                <path d="M10 0L20 16H0L10 0z" fill="#dc0037" opacity="0.8"/>
                <rect x="9" y="5" width="2" height="5" fill="white"/>
                <rect x="9" y="11" width="2" height="2" fill="white"/>
              </svg>
              <h3 class="text-[#191c1d] text-[18px] font-bold leading-[28px]">Critical Alerts</h3>
            </div>
            <span class="bg-[#dc0037] text-white text-[10px] font-bold px-2 py-0.5 rounded-[12px] leading-[15px]">5 NEW</span>
          </div>
          <div class="flex-1 overflow-auto relative">
            <!-- Alert 1 -->
            <div class="bg-[rgba(255,218,214,0.3)] border-l-4 border-[#dc0037] mx-4 my-4 pl-5 pr-4 py-4 rounded-[2px]">
              <div class="flex justify-between items-start">
                <span class="text-[#191c1d] text-[12px] font-bold tracking-[0.6px]">M. Kapambwe</span>
                <span class="text-[#5d3f3f] text-[10px] font-normal">2h ago</span>
              </div>
              <div class="pt-1">
                <span class="text-[#dc0037] text-[14px] font-medium leading-[20px]">Health Score drop -25</span>
              </div>
              <div class="pb-3">
                <p class="text-[#5d3f3f] text-[12px] font-normal leading-[16px]">Significant decrease in incoming wire transfers over last 30 days.</p>
              </div>
              <button class="w-full bg-[#dc0037] text-white text-[10px] font-bold tracking-[1px] uppercase py-1.5 rounded-[2px] leading-[15px]">ACKNOWLEDGE</button>
            </div>
            <!-- Alert 2 -->
            <div class="bg-[#f3f4f5] border-l-4 border-[#ed6c02] mx-4 mb-4 pl-5 pr-4 py-4 rounded-[2px]">
              <div class="flex justify-between items-start">
                <span class="text-[#191c1d] text-[12px] font-bold tracking-[0.6px]">J. Phiri</span>
                <span class="text-[#5d3f3f] text-[10px] font-normal">4h ago</span>
              </div>
              <div class="pt-1">
                <span class="text-[#ed6c02] text-[14px] font-medium leading-[20px]">State Transition: At Risk</span>
              </div>
              <div class="pb-3">
                <p class="text-[#5d3f3f] text-[12px] font-normal leading-[16px]">Churn probability exceeds 45% threshold.</p>
              </div>
              <button class="w-full border border-[#926e6e] text-[#191c1d] text-[10px] font-bold tracking-[1px] uppercase py-[7px] rounded-[2px] leading-[15px]">ACKNOWLEDGE</button>
            </div>
            <!-- Alert 3 -->
            <div class="bg-[#f3f4f5] border-l-4 border-[#dc0037] mx-4 mb-4 pl-5 pr-4 py-4 rounded-[2px]">
              <div class="flex justify-between items-start">
                <span class="text-[#191c1d] text-[12px] font-bold tracking-[0.6px]">P. Lungu</span>
                <span class="text-[#5d3f3f] text-[10px] font-normal">Yesterday</span>
              </div>
              <div class="pt-1">
                <span class="text-[#dc0037] text-[14px] font-medium leading-[20px]">Large Withdrawal Detected</span>
              </div>
              <div class="pb-3">
                <p class="text-[#5d3f3f] text-[12px] font-normal leading-[16px]">Withdrawal of ZMW 450,000 from Savings account.</p>
              </div>
              <button class="w-full border border-[#926e6e] text-[#191c1d] text-[10px] font-bold tracking-[1px] uppercase py-[7px] rounded-[2px] leading-[15px]">ACKNOWLEDGE</button>
            </div>
            <!-- Alert 4 -->
            <div class="bg-[#f3f4f5] border-l-4 border-[#ed6c02] mx-4 mb-4 pl-5 pr-4 py-4 rounded-[2px]">
              <div class="flex justify-between items-start">
                <span class="text-[#191c1d] text-[12px] font-bold tracking-[0.6px]">S. Banda</span>
                <span class="text-[#5d3f3f] text-[10px] font-normal">Yesterday</span>
              </div>
              <div class="pt-1">
                <span class="text-[#ed6c02] text-[14px] font-medium leading-[20px]">Profile Incomplete</span>
              </div>
              <div class="pb-3">
                <p class="text-[#5d3f3f] text-[12px] font-normal leading-[16px]">KYC documentation expiring in 15 days.</p>
              </div>
              <button class="w-full border border-[#926e6e] text-[#191c1d] text-[10px] font-bold tracking-[1px] uppercase py-[7px] rounded-[2px] leading-[15px]">ACKNOWLEDGE</button>
            </div>
            <!-- Alert 5 -->
            <div class="bg-[rgba(255,218,214,0.3)] border-l-4 border-[#dc0037] mx-4 mb-4 pl-5 pr-4 py-4 rounded-[2px]">
              <div class="flex justify-between items-start">
                <span class="text-[#191c1d] text-[12px] font-bold tracking-[0.6px]">K. Mulenga</span>
                <span class="text-[#5d3f3f] text-[10px] font-normal">Yesterday</span>
              </div>
              <div class="pt-1">
                <span class="text-[#dc0037] text-[14px] font-medium leading-[20px]">Zero Activity (90 Days)</span>
              </div>
              <div class="pb-3">
                <p class="text-[#5d3f3f] text-[12px] font-normal leading-[16px]">Customer moved to Dormant state automatically.</p>
              </div>
              <button class="w-full bg-[#dc0037] text-white text-[10px] font-bold tracking-[1px] uppercase py-1.5 rounded-[2px] leading-[15px]">ACKNOWLEDGE</button>
            </div>
          </div>
        </div>

        <!-- Predictive Lifecycle Ledger -->
        <div class="bg-white border border-[#e7bcbc] rounded-[6px] flex flex-col h-[500px] overflow-hidden p-px col-span-2">
          <div class="bg-white border-b border-[#e7bcbc] px-6 py-4 flex items-center justify-between">
            <h3 class="text-[#191c1d] text-[18px] font-bold leading-[28px]">Predictive Lifecycle Ledger</h3>
            <div class="flex gap-2">
              <button class="border border-[#e7bcbc] rounded-[2px] p-[7px] pb-[11px] flex items-center justify-center">
                <svg width="10.5" height="7" viewBox="0 0 10.5 7" fill="none">
                  <path d="M0 0h10.5v1.5H0zM0 6h10.5v1H0z" fill="#5d3f3f"/>
                </svg>
              </button>
              <button class="border border-[#e7bcbc] rounded-[2px] p-[7px] pb-[11px] flex items-center justify-center">
                <svg width="9.333" height="9.333" viewBox="0 0 10 10" fill="none">
                  <circle cx="5" cy="5" r="1.5" fill="#5d3f3f"/>
                  <circle cx="5" cy="1" r="1.5" fill="#5d3f3f"/>
                  <circle cx="5" cy="9" r="1.5" fill="#5d3f3f"/>
                  <circle cx="1" cy="5" r="1.5" fill="#5d3f3f"/>
                  <circle cx="9" cy="5" r="1.5" fill="#5d3f3f"/>
                </svg>
              </button>
            </div>
          </div>
          <div class="flex-1 overflow-auto">
            <table class="w-full border-collapse">
              <thead>
                <tr class="bg-[#e7e8e9]">
                  <th class="text-[#5d3f3f] text-xs font-bold tracking-[0.5791px] uppercase text-left px-5 py-4">NAME</th>
                  <th class="text-[#5d3f3f] text-xs font-bold tracking-[0.5791px] uppercase text-left px-5 py-4">STATE</th>
                  <th class="text-[#5d3f3f] text-xs font-bold tracking-[0.5791px] uppercase text-left px-5 py-4">
                    <span class="flex items-center gap-1">
                      HEALTH
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                        <circle cx="4" cy="4" r="3.5" fill="#5d3f3f" opacity="0.5"/>
                        <path d="M4 2v2.5M4 5.5v.5" stroke="white" stroke-width="0.8"/>
                      </svg>
                    </span>
                  </th>
                  <th class="text-[#5d3f3f] text-xs font-bold tracking-[0.5791px] uppercase text-left px-5 py-4">CHURN<br/>PROB</th>
                  <th class="text-[#5d3f3f] text-xs font-bold tracking-[0.5791px] uppercase text-left px-5 py-4">CLV<br/>(ZMW)</th>
                  <th class="text-[#5d3f3f] text-xs font-bold tracking-[0.5791px] uppercase text-left px-5 py-4">ACTION</th>
                </tr>
              </thead>
              <tbody>
                <!-- Row 1: Mwenda Kapambwe - Churned -->
                <tr class="border-t border-[#e7bcbc]">
                  <td class="pl-5 py-3">
                    <div class="flex gap-3 items-center">
                      <div class="w-1 h-8 bg-[#dc0037] rounded-full"></div>
                      <div>
                        <div class="text-[#191c1d] text-sm font-bold leading-5">Mwenda<br/>Kapambwe</div>
                        <div class="text-[#5d3f3f] text-xs font-normal">ID: 994022/11/1</div>
                      </div>
                    </div>
                  </td>
                  <td class="pl-8 py-3">
                    <div class="flex gap-2 items-center">
                      <div class="w-2 h-2 bg-[#ba1a1a] rounded-full"></div>
                      <span class="text-[#191c1d] text-xs font-semibold">Churned</span>
                    </div>
                  </td>
                  <td class="px-5 py-3">
                    <div class="w-24">
                      <span class="text-[#191c1d] text-xs font-normal">12%</span>
                      <div class="bg-[#e1e3e4] h-1.5 rounded w-full mt-1">
                        <div class="bg-[#ba1a1a] h-full rounded" style="width: 12%"></div>
                      </div>
                    </div>
                  </td>
                  <td class="px-5 py-3">
                    <span class="text-[#ba1a1a] text-xs font-bold">92.4%</span>
                  </td>
                  <td class="px-5 py-3">
                    <span class="text-[#191c1d] text-xs font-medium">1.2M</span>
                  </td>
                  <td class="px-5 py-3">
                    <button class="bg-[#dc0037] text-white text-[10px] font-bold tracking-[1px] uppercase px-5 py-1 rounded leading-[14px]">RETENTION<br/>CALL</button>
                  </td>
                </tr>
                <!-- Row 2: Joseph Phiri - At Risk -->
                <tr class="border-t border-[#e7bcbc]">
                  <td class="pl-5 py-3">
                    <div class="flex gap-3 items-center">
                      <div class="w-1 h-8 bg-[#ed6c02] rounded-full"></div>
                      <div>
                        <div class="text-[#191c1d] text-sm font-bold leading-5">Joseph<br/>Phiri</div>
                        <div class="text-[#5d3f3f] text-xs font-normal">ID: 882103/42/1</div>
                      </div>
                    </div>
                  </td>
                  <td class="pl-8 py-3">
                    <div class="flex gap-2 items-center">
                      <div class="w-2 h-2 bg-[#ed6c02] rounded-full"></div>
                      <span class="text-[#191c1d] text-xs font-semibold">At Risk</span>
                    </div>
                  </td>
                  <td class="px-5 py-3">
                    <div class="w-24">
                      <span class="text-[#191c1d] text-xs font-normal">34%</span>
                      <div class="bg-[#e1e3e4] h-1.5 rounded w-full mt-1">
                        <div class="bg-[#ed6c02] h-full rounded" style="width: 34%"></div>
                      </div>
                    </div>
                  </td>
                  <td class="px-5 py-3">
                    <span class="text-[#ed6c02] text-xs font-bold">46.8%</span>
                  </td>
                  <td class="px-5 py-3">
                    <span class="text-[#191c1d] text-xs font-medium">0.8M</span>
                  </td>
                  <td class="px-5 py-3">
                    <button class="border border-[#dc0037] text-[#dc0037] text-[10px] font-bold tracking-[1px] uppercase px-5 py-1 rounded leading-[14px]">BALANCE<br/>REVIEW</button>
                  </td>
                </tr>
                <!-- Row 3: Patricia Lungu - Active -->
                <tr class="border-t border-[#e7bcbc]">
                  <td class="pl-5 py-3">
                    <div class="flex gap-3 items-center">
                      <div class="w-1 h-8 bg-[#2e7d32] rounded-full"></div>
                      <div>
                        <div class="text-[#191c1d] text-sm font-bold leading-5">Patricia<br/>Lungu</div>
                        <div class="text-[#5d3f3f] text-xs font-normal">ID: 774102/55/1</div>
                      </div>
                    </div>
                  </td>
                  <td class="pl-8 py-3">
                    <div class="flex gap-2 items-center">
                      <div class="w-2 h-2 bg-[#2e7d32] rounded-full"></div>
                      <span class="text-[#191c1d] text-xs font-semibold">Active</span>
                    </div>
                  </td>
                  <td class="px-5 py-3">
                    <div class="w-24">
                      <span class="text-[#191c1d] text-xs font-normal">82%</span>
                      <div class="bg-[#e1e3e4] h-1.5 rounded w-full mt-1">
                        <div class="bg-[#2e7d32] h-full rounded" style="width: 82%"></div>
                      </div>
                    </div>
                  </td>
                  <td class="px-5 py-3">
                    <span class="text-[#2e7d32] text-xs font-bold">2.1%</span>
                  </td>
                  <td class="px-5 py-3">
                    <span class="text-[#191c1d] text-xs font-medium">4.5M</span>
                  </td>
                  <td class="px-5 py-3">
                    <button class="border border-[#e7bcbc] text-[#5d3f3f] text-[10px] font-bold tracking-[1px] uppercase px-4 py-1 rounded leading-[14px]">UPSELL<br/>OPPORTUNITY</button>
                  </td>
                </tr>
                <!-- Row 4: Sibongile Banda - Dormant -->
                <tr class="border-t border-[#e7bcbc]">
                  <td class="pl-5 py-3">
                    <div class="flex gap-3 items-center">
                      <div class="w-1 h-8 bg-[#757575] rounded-full"></div>
                      <div>
                        <div class="text-[#191c1d] text-sm font-bold leading-5">Sibongile<br/>Banda</div>
                        <div class="text-[#5d3f3f] text-xs font-normal">ID: 662031/10/1</div>
                      </div>
                    </div>
                  </td>
                  <td class="pl-8 py-3">
                    <div class="flex gap-2 items-center">
                      <div class="w-2 h-2 bg-[#757575] rounded-full"></div>
                      <span class="text-[#191c1d] text-xs font-semibold">Dormant</span>
                    </div>
                  </td>
                  <td class="px-5 py-3">
                    <div class="w-24">
                      <span class="text-[#191c1d] text-xs font-normal">45%</span>
                      <div class="bg-[#e1e3e4] h-1.5 rounded w-full mt-1">
                        <div class="bg-[#757575] h-full rounded" style="width: 45%"></div>
                      </div>
                    </div>
                  </td>
                  <td class="px-5 py-3">
                    <span class="text-[#5d3f3f] text-xs font-bold">15.4%</span>
                  </td>
                  <td class="px-5 py-3">
                    <span class="text-[#191c1d] text-xs font-medium">0.3M</span>
                  </td>
                  <td class="px-5 py-3">
                    <button class="border border-[#e7bcbc] text-[#5d3f3f] text-[10px] font-bold tracking-[1px] uppercase px-4 py-1 rounded leading-[14px]">KYC UPDATE</button>
                  </td>
                </tr>
                <!-- Row 5: Kelvin Mulenga - At Risk -->
                <tr class="border-t border-[#e7bcbc]">
                  <td class="pl-5 py-3">
                    <div class="flex gap-3 items-center">
                      <div class="w-1 h-8 bg-[#ed6c02] rounded-full"></div>
                      <div>
                        <div class="text-[#191c1d] text-sm font-bold leading-5">Kelvin<br/>Mulenga</div>
                        <div class="text-[#5d3f3f] text-xs font-normal">ID: 554201/09/1</div>
                      </div>
                    </div>
                  </td>
                  <td class="pl-8 py-3">
                    <div class="flex gap-2 items-center">
                      <div class="w-2 h-2 bg-[#ed6c02] rounded-full"></div>
                      <span class="text-[#191c1d] text-xs font-semibold">At Risk</span>
                    </div>
                  </td>
                  <td class="px-5 py-3">
                    <div class="w-24">
                      <span class="text-[#191c1d] text-xs font-normal">48%</span>
                      <div class="bg-[#e1e3e4] h-1.5 rounded w-full mt-1">
                        <div class="bg-[#ed6c02] h-full rounded" style="width: 48%"></div>
                      </div>
                    </div>
                  </td>
                  <td class="px-5 py-3">
                    <span class="text-[#ed6c02] text-xs font-bold">32.2%</span>
                  </td>
                  <td class="px-5 py-3">
                    <span class="text-[#191c1d] text-xs font-medium">0.6M</span>
                  </td>
                  <td class="px-5 py-3">
                    <button class="border border-[#dc0037] text-[#dc0037] text-[10px] font-bold tracking-[1px] uppercase px-4 py-1 rounded leading-[14px]">RE-<br/>ENGAGEMENT</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="border-t border-[#e7bcbc] px-4 py-4 flex items-center justify-between">
            <span class="text-[#5d3f3f] text-[12px] font-medium leading-[16px]">Showing 5 of 1,240 customers</span>
            <div class="flex gap-2">
              <button class="bg-[#f8f9fa] border border-[#e7bcbc] rounded-[2px] px-[9px] py-[5px] opacity-50 text-[#5d3f3f] text-[12px] font-medium leading-[16px]">Previous</button>
              <button class="bg-[#f8f9fa] border border-[#e7bcbc] rounded-[2px] px-[9px] py-[5px] text-[#5d3f3f] text-[12px] font-medium leading-[16px]">Next</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Contextual Insight Footer -->
      <div class="flex gap-6 w-full">
        <!-- AI Recommendation -->
        <div class="flex-1 border border-[#e7bcbc] rounded-[6px] p-[25px] flex gap-6 items-start" style="background-image: url(&quot;data:image/svg+xml;utf8,<svg viewBox='0 0 466 132' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><g transform='matrix(43.196 12.143 -42.868 17.711 34.042 10.57)' opacity='1'><rect height='44.318' width='107.39' fill='url(%23grad)' id='quad' shape-rendering='crispEdges'/><use href='%23quad' transform='scale(1 -1)'/><use href='%23quad' transform='scale(-1 1)'/><use href='%23quad' transform='scale(-1 -1)'/></g><defs><linearGradient id='grad' gradientUnits='userSpaceOnUse' x2='5' y2='5'><stop stop-color='rgba(220,35,55,1)' offset='0'/><stop stop-color='rgba(169,25,42,1)' offset='0.19952'/><stop stop-color='rgba(118,14,29,1)' offset='0.39904'/><stop stop-color='rgba(68,15,23,1)' offset='0.69952'/><stop stop-color='rgba(43,16,19,1)' offset='0.84976'/><stop stop-color='rgba(18,16,16,1)' offset='1'/></linearGradient></defs></svg>&quot;); background-repeat: no-repeat; background-position: center;">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <circle cx="11" cy="11" r="10" stroke="white" stroke-width="1.5" opacity="0.8"/>
            <path d="M11 7v4M11 14v1" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
          <div class="flex flex-col gap-[3px]">
            <h4 class="text-white text-[14px] font-bold leading-[20px]">AI Recommendation Engine</h4>
            <p class="text-white text-[12px] font-normal leading-[19.5px]">
              System predicts a <strong>5.2% increase</strong> in dormancy for segment 'HNI-Retail' within 60 days unless proactive outreach is initiated for accounts with declining transaction frequency.
            </p>
          </div>
        </div>
        <!-- Portfolio Health Trend -->
        <div class="flex-1 bg-[#f3f4f5] border border-[#e7bcbc] rounded-[6px] p-[25px] flex gap-6 items-center">
          <div class="bg-[rgba(46,125,50,0.1)] h-16 w-[30px] rounded-[12px] flex items-center justify-center">
            <svg width="25" height="15" viewBox="0 0 25 15" fill="none">
              <path d="M0 12l6-6 5 4 8-8 6 6" stroke="#2e7d32" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
              <circle cx="19" cy="2" r="2" fill="#2e7d32"/>
            </svg>
          </div>
          <div class="flex flex-col gap-[3px]">
            <h4 class="text-[#191c1d] text-[14px] font-bold leading-[20px]">Portfolio Health Trend</h4>
            <p class="text-[#5d3f3f] text-[12px] font-normal leading-[19.5px]">
              Overall portfolio health score has improved by <strong>+3.4 pts</strong> since the last quarter, primarily driven by the success of the 'Fixed Deposit Retention' campaign.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>
