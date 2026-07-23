<template>
  <div class="min-h-screen bg-[#f8f9fa]">
    <div class="max-w-[1600px] mx-auto flex flex-col gap-4 pb-[32px] pt-[8px] px-[32px]">
      <!-- Breadcrumb + View in Core Banking -->
      <div class="flex items-end justify-between w-full">
        <div class="flex flex-col gap-2">
          <div class="flex items-center gap-0">
            <span class="text-[#5d3f3f] text-[12px] font-semibold tracking-[0.6px] leading-[16px] cursor-pointer hover:text-[#77021e] hover:underline transition-colors duration-150">Home</span>
            <svg class="mx-1" width="6" height="10" viewBox="0 0 6 10" fill="none">
              <path d="M1 1l4 4-4 4" stroke="#5d3f3f" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span class="text-[#5d3f3f] text-[12px] font-semibold tracking-[0.6px] leading-[16px] cursor-pointer hover:text-[#77021e] hover:underline transition-colors duration-150">My Customers</span>
            <svg class="mx-1" width="6" height="10" viewBox="0 0 6 10" fill="none">
              <path d="M1 1l4 4-4 4" stroke="#5d3f3f" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span class="text-[#77021e] text-[12px] font-bold tracking-[0.6px] leading-[16px]">Mwenda Kapambwe</span>
          </div>
          <h1 class="text-[#191c1d] text-[32px] font-bold tracking-[-0.32px] leading-[40px]">Mwenda Kapambwe (ID: 994022/11/1)</h1>
        </div>
        <button class="bg-[#77021e] shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex items-center gap-2 px-4 py-[9px] rounded-[2px] text-white text-[16px] font-normal leading-[24px]">
          <svg width="9" height="11" viewBox="0 0 9 11" fill="none">
            <rect x="0.5" y="0.5" width="8" height="10" rx="1.5" stroke="white"/>
            <line x1="2.5" y1="3.5" x2="6.5" y2="3.5" stroke="white" stroke-linecap="round"/>
            <line x1="2.5" y1="5.5" x2="5.5" y2="5.5" stroke="white" stroke-linecap="round"/>
            <line x1="2.5" y1="7.5" x2="6.5" y2="7.5" stroke="white" stroke-linecap="round"/>
          </svg>
          View in Core Banking
        </button>
      </div>

      <!-- Main Content Grid -->
      <div class="grid grid-cols-12 gap-x-6 gap-y-12 w-full max-w-[1600px]">
        <!-- Row 1: Profile Card (4 cols) + AI Intelligence Hub (8 cols) -->
        <!-- Profile Card -->
        <div class="col-span-4 row-start-1">
          <div class="bg-white border border-[#e3bebc] rounded-[6px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] overflow-clip flex flex-col h-[522px]">
            <div class="bg-[#77021e] h-[96px] flex items-center px-6">
              <span class="text-white text-[16px] font-bold leading-[24px]">994022/11/1</span>
            </div>
            <div class="flex flex-col items-start p-6 relative -mt-[48px]">
              <div class="bg-white border-4 border-white rounded-full shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] size-[80px] flex items-center justify-center overflow-clip">
                <div class="bg-[#ffb3b0] rounded-full size-full flex items-center justify-center">
                  <span class="text-[#77021e] text-[28px] font-bold">MK</span>
                </div>
              </div>
              <div class="pt-4 w-full">
                <h2 class="text-[#0b1c30] text-[24px] font-semibold tracking-[-0.24px] leading-[32px]">Mwenda Kapambwe</h2>
              </div>
              <div class="py-3 w-full">
                <p class="text-[#191414] text-[14px] font-normal leading-[20px]">Verified Private Client</p>
              </div>
              <div class="bg-[#ffdad6] rounded-[12px] px-3 py-[4px]">
                <span class="text-[#93000a] text-[12px] font-bold tracking-[0.6px] leading-[16px]">Churned</span>
              </div>
              <div class="flex flex-col gap-[7px] pt-6 w-full">
                <div class="border-b border-[#e3bebc] flex items-center justify-between pb-[9px] pt-2">
                  <span class="text-[#5d5f5f] text-[12px] font-semibold tracking-[0.6px] leading-[16px]">Account #</span>
                  <span class="text-[#77021e] text-[12px] font-bold tracking-[0.6px] leading-[16px]">ZMK-8820-192</span>
                </div>
                <div class="border-b border-[#e3bebc] flex items-center justify-between pb-[9px] pt-2">
                  <span class="text-[#5d5f5f] text-[12px] font-semibold tracking-[0.6px] leading-[16px]">Branch</span>
                  <span class="text-[#77021e] text-[12px] font-bold tracking-[0.6px] leading-[16px]">Lusaka Main</span>
                </div>
                <div class="border-b border-[#e3bebc] flex items-center justify-between pb-[9px] pt-2">
                  <span class="text-[#5d5f5f] text-[12px] font-semibold tracking-[0.6px] leading-[16px]">ID Number</span>
                  <span class="text-[#77021e] text-[12px] font-bold tracking-[0.6px] leading-[16px]">994022/11/1</span>
                </div>
                <div class="border-b border-[#e3bebc] flex items-center justify-between pb-[9px] pt-2">
                  <span class="text-[#5d5f5f] text-[12px] font-semibold tracking-[0.6px] leading-[16px]">Tenure</span>
                  <span class="text-[#77021e] text-[12px] font-bold tracking-[0.6px] leading-[16px]">8 Years</span>
                </div>
                <div class="flex items-center justify-between py-2">
                  <span class="text-[#5d5f5f] text-[12px] font-semibold tracking-[0.6px] leading-[16px]">Assigned RM</span>
                  <span class="text-[#77021e] text-[12px] font-bold tracking-[0.6px] leading-[16px]">Tina Tembo</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- AI Intelligence Hub -->
        <div class="col-span-8 row-start-1 bg-white border border-[#e7bcbc] rounded-[6px] p-[25px] grid grid-cols-2 gap-x-6 gap-y-6">
          <div class="col-span-2 border-b border-[#e7bcbc] pb-[17px] flex items-center justify-between">
            <div class="flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="9" stroke="#77021e" stroke-width="1.5"/>
                <path d="M10 6v4" stroke="#77021e" stroke-width="1.5" stroke-linecap="round"/>
                <circle cx="10" cy="14" r="0.75" fill="#77021e"/>
              </svg>
              <span class="text-[#5d3f3f] text-[12px] font-bold tracking-[2.4px] uppercase leading-[16px]">PREDICTIVE INSIGHTS</span>
            </div>
            <span class="text-[#5d3f3f] text-[10px] font-normal italic leading-[15px]">Last updated: Today, 08:45 AM</span>
          </div>

          <!-- Health Score Gauge -->
          <div class="border-r border-[#e7bcbc] h-[399px] relative">
            <span class="text-[#191c1d] text-[12px] font-bold tracking-[0.6px] leading-[16px]">AI Health Score</span>
            <div class="absolute left-1/2 -translate-x-1/2 top-[40px] size-[192px]">
              <svg viewBox="0 0 192 192" class="size-full">
                <circle cx="96" cy="96" r="83" fill="none" stroke="#f5d5d5" stroke-width="12"/>
                <path d="M96 13 A83 83 0 0 1 161 143" fill="none" stroke="#ba1a1a" stroke-width="12" stroke-linecap="round"/>
              </svg>
              <div class="absolute inset-0 flex flex-col items-center justify-center">
                <span class="text-[#ba1a1a] text-[40px] font-bold tracking-[-0.8px] leading-[48px]">22</span>
                <span class="text-[#ba1a1a] text-[12px] font-bold tracking-[0.6px] uppercase leading-[16px]">CRITICAL</span>
              </div>
            </div>
            <div class="absolute top-[256px] left-0 right-6 flex justify-center">
              <div class="bg-[rgba(255,218,214,0.2)] rounded-[12px] flex items-center gap-1 px-3 py-[4px]">
                <svg width="14" height="8" viewBox="0 0 14 8" fill="none">
                  <path d="M7 8L0 0h14L7 8z" fill="#ba1a1a"/>
                </svg>
                <span class="text-[#ba1a1a] text-[12px] font-bold tracking-[0.6px]">-12 pts vs last month</span>
              </div>
            </div>
            <div class="absolute top-[315px] left-0 right-6 flex flex-col gap-3">
              <div class="flex items-center justify-between w-full">
                <span class="text-[#5d3f3f] text-[14px] font-normal leading-[20px]">Churn Risk</span>
                <span class="text-[#ba1a1a] text-[14px] font-bold leading-[20px]">High</span>
              </div>
              <div class="flex items-center justify-between w-full">
                <span class="text-[#5d3f3f] text-[14px] font-normal leading-[20px]">CLV Percentile</span>
                <span class="text-[#191c1d] text-[14px] font-bold leading-[20px]">85th</span>
              </div>
              <div class="flex items-center justify-between w-full">
                <span class="text-[#5d3f3f] text-[14px] font-normal leading-[20px]">Behavioral Score</span>
                <span class="text-[#ba1a1a] text-[14px] font-bold leading-[20px]">Low</span>
              </div>
            </div>
          </div>

          <!-- Key Risk Drivers -->
          <div class="flex flex-col gap-6 pl-[4px] pb-[134px]">
            <span class="text-[#191c1d] text-[12px] font-bold tracking-[0.6px] leading-[16px]">Key Risk Drivers</span>
            <div class="flex flex-col gap-6 w-full">
              <div class="flex flex-col gap-2 w-full">
                <div class="flex items-start justify-between w-full">
                  <span class="text-[#191c1d] text-[14px] font-normal leading-[20px]">Salary Inflow</span>
                  <span class="text-[#ba1a1a] text-[14px] font-bold leading-[20px]">-42%</span>
                </div>
                <div class="bg-[#e7e8e9] h-2 rounded-[12px] w-full overflow-clip">
                  <div class="bg-[#ba1a1a] h-full rounded-[12px]" style="width: 85%"></div>
                </div>
                <span class="text-[#5d3f3f] text-[10px] font-normal leading-[15px]">Major decrease in monthly deposits detected.</span>
              </div>
              <div class="flex flex-col gap-2 w-full">
                <div class="flex items-start justify-between w-full">
                  <span class="text-[#191c1d] text-[14px] font-normal leading-[20px]">Digital Activity</span>
                  <span class="text-[#5d3f3f] text-[14px] font-bold leading-[20px]">Low</span>
                </div>
                <div class="bg-[#e7e8e9] h-2 rounded-[12px] w-full overflow-clip">
                  <div class="bg-[#926e6e] h-full rounded-[12px]" style="width: 25%"></div>
                </div>
                <span class="text-[#5d3f3f] text-[10px] font-normal leading-[15px]">No mobile app logins in the last 45 days.</span>
              </div>
              <div class="flex flex-col gap-2 w-full">
                <div class="flex items-start justify-between w-full">
                  <span class="text-[#191c1d] text-[14px] font-normal leading-[20px]">Withdrawal Volume</span>
                  <span class="text-[#ba1a1a] text-[14px] font-bold leading-[20px]">Spike</span>
                </div>
                <div class="bg-[#e7e8e9] h-2 rounded-[12px] w-full overflow-clip">
                  <div class="bg-[rgba(186,26,26,0.6)] h-full rounded-[12px]" style="width: 65%"></div>
                </div>
                <span class="text-[#5d3f3f] text-[10px] font-normal leading-[15px]">Recent lump-sum exit to external institution.</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Row 2: State Timeline -->
        <div class="col-span-12 row-start-2 bg-white border border-[#e7bcbc] rounded-[6px] shadow-[0px_1px_1px_rgba(0,0,0,0.05)] p-[25px] flex flex-col gap-12 h-[163px]">
          <span class="text-[#5d3f3f] text-[12px] font-bold tracking-[2.4px] uppercase leading-[16px]">LIFECYCLE JOURNEY (12 MONTHS)</span>
          <div class="relative px-8 w-full">
            <div class="absolute bg-[#e7bcbc] h-[2px] left-8 right-8 top-1/2 -translate-y-1/2"></div>
            <div class="flex items-center justify-between w-full">
              <div class="relative flex flex-col items-center">
                <div class="bg-[#b8063f] rounded-full size-4 shadow-[0px_0px_0px_4px_rgba(184,6,63,0.2)]"></div>
                <div class="absolute top-[28px] left-1/2 -translate-x-1/2 w-[96px] text-center">
                  <span class="text-[#191c1d] text-[12px] font-bold tracking-[0.6px] leading-[16px] block">Active</span>
                  <span class="text-[#5d3f3f] text-[10px] font-normal leading-[15px]">12m ago</span>
                </div>
              </div>
              <div class="relative flex flex-col items-center">
                <div class="bg-[#b8063f] rounded-full size-4 shadow-[0px_0px_0px_4px_rgba(184,6,63,0.2)]"></div>
                <div class="absolute top-[28px] left-1/2 -translate-x-1/2 w-[96px] text-center">
                  <span class="text-[#191c1d] text-[12px] font-bold tracking-[0.6px] leading-[16px] block">Active</span>
                  <span class="text-[#5d3f3f] text-[10px] font-normal leading-[15px]">6m ago</span>
                </div>
              </div>
              <div class="relative flex flex-col items-center">
                <div class="bg-[#b8063f] rounded-full size-4 shadow-[0px_0px_0px_4px_rgba(184,6,63,0.2)]"></div>
                <div class="absolute top-[28px] left-1/2 -translate-x-1/2 w-[96px] text-center">
                  <span class="text-[#191c1d] text-[12px] font-bold tracking-[0.6px] leading-[16px] block">Active</span>
                  <span class="text-[#5d3f3f] text-[10px] font-normal leading-[15px]">4m ago</span>
                </div>
              </div>
              <div class="relative flex flex-col items-center">
                <div class="absolute bg-[#a71935] rounded-[2px] px-2 py-1 -top-[36px] left-1/2 -translate-x-1/2 whitespace-nowrap">
                  <span class="text-[10px] text-white font-bold leading-[15px]">Transition</span>
                </div>
                <div class="bg-[#a71935] rounded-full size-5 shadow-[0px_0px_0px_4px_rgba(167,25,53,0.2)]"></div>
                <div class="absolute top-[32px] left-1/2 -translate-x-1/2 w-[96px] text-center">
                  <span class="text-[#a71935] text-[12px] font-bold tracking-[0.6px] leading-[16px] block">At Risk</span>
                  <span class="text-[#5d3f3f] text-[10px] font-normal leading-[15px]">2m ago</span>
                </div>
              </div>
              <div class="relative flex flex-col items-center">
                <div class="bg-[#2e3132] border-4 border-white rounded-full shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] size-[28px]"></div>
                <div class="absolute top-[32px] left-1/2 -translate-x-1/2 w-[96px] text-center">
                  <span class="text-[#191c1d] text-[12px] font-bold tracking-[0.6px] leading-[16px] block">Churned</span>
                  <span class="text-[#ae0029] text-[10px] font-bold leading-[15px]">Current</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Row 3: NBA Recommendations (4 cols — 1/3 bento) -->
        <div class="col-span-4 row-start-3 self-end mb-6 border border-[#ae0029] rounded-[6px] overflow-clip shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] flex h-[360px]" style="background: linear-gradient(135deg, #dc2337 0%, #a9192a 20%, #760e1d 40%, #440f17 70%, #2b1013 85%, #121010 100%)">
          <div class="bg-[rgba(0,0,0,0.1)] border-r border-[rgba(255,255,255,0.1)] w-[130px] flex flex-col items-center justify-center px-4 py-4">
            <div class="pb-2">
              <svg width="28" height="28" viewBox="0 0 40 40" fill="none">
                <circle cx="20" cy="20" r="18" fill="none" stroke="#ffeded" stroke-width="2"/>
                <path d="M20 12v10" stroke="#ffeded" stroke-width="2.5" stroke-linecap="round"/>
                <circle cx="20" cy="27" r="1.5" fill="#ffeded"/>
              </svg>
            </div>
            <h3 class="text-[#ffeded] text-[16px] font-bold text-center leading-[22px]">Next Best<br>Action</h3>
            <div class="pt-1">
              <p class="text-[#ffeded] text-[11px] font-normal text-center opacity-80 leading-[16px]">Recommended by<br>AI-Lifecycle Engine</p>
            </div>
          </div>
          <div class="flex-1 flex flex-col p-4 overflow-clip">
            <div class="flex items-start justify-between w-full">
              <div class="flex flex-col gap-1">
                <div class="bg-[rgba(255,255,255,0.2)] rounded-[2px] px-2 py-[2px]">
                  <span class="text-[#ffeded] text-[9px] font-bold tracking-[1px] uppercase leading-[14px]">PRIORITY 1</span>
                </div>
                <h4 class="text-[#ffeded] text-[16px] font-bold leading-[22px]">Immediate Retention<br>Call</h4>
              </div>
              <div class="flex flex-col items-end">
                <div class="opacity-70 text-right whitespace-nowrap">
                  <span class="text-[#ffeded] text-[9px] font-bold uppercase tracking-[1px] leading-[13px] block">AI</span>
                  <span class="text-[#ffeded] text-[9px] font-bold uppercase tracking-[1px] leading-[13px] block">CONFIDENCE</span>
                </div>
                <span class="text-[#ffeded] text-[18px] font-bold leading-[24px]">92%</span>
              </div>
            </div>
            <p class="text-[#ffeded] text-[13px] font-normal leading-[18px] pt-3">
              High risk of customer attrition. The AI predicts a 45% chance of re-engagement if contacted within the next 48 hours with a customized "Prestige Loyalty" offer.
            </p>
            <div class="flex-1"></div>
            <div class="flex items-center">
              <button class="bg-white rounded-[4px] flex items-center gap-1.5 px-4 py-[7px] text-[#ae0029] text-[13px] font-bold leading-[18px]">
                <svg width="14" height="14" viewBox="0 0 19 19" fill="none">
                  <rect x="1.5" y="1.5" width="16" height="16" rx="3" stroke="#ae0029" stroke-width="2"/>
                  <line x1="5.5" y1="9.5" x2="13.5" y2="9.5" stroke="#ae0029" stroke-width="2" stroke-linecap="round"/>
                  <line x1="9.5" y1="5.5" x2="9.5" y2="13.5" stroke="#ae0029" stroke-width="2" stroke-linecap="round"/>
                </svg>
                Log Action
              </button>
              <button class="ml-3 bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.2)] rounded-[4px] px-[18px] py-[8px] text-white text-[13px] font-bold leading-[18px]">
                Dismiss
              </button>
            </div>
          </div>
        </div>

        <!-- Row 3: Action History (8 cols — 2/3 bento) -->
        <div class="col-span-8 row-start-3 self-end mb-6 bg-white border border-[#e7bcbc] rounded-[6px] shadow-[0px_1px_1px_rgba(0,0,0,0.05)] p-[25px] flex flex-col gap-6 h-[360px]">
          <div class="flex items-center w-full">
            <span class="text-[#191414] text-[12px] font-bold tracking-[2.4px] uppercase leading-[16px]">ACTION HISTORY</span>
            <div class="flex-1"></div>
            <div class="flex items-center gap-4">
              <div class="flex items-center cursor-pointer">
                <span class="text-[#77021e] text-[12px] font-bold tracking-[0.6px] leading-[16px]">All</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M7 10l5 5 5-5" stroke="#77021e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <span class="text-[#77021e] text-[12px] font-bold tracking-[0.6px] leading-[16px] cursor-pointer hover:underline">View All</span>
            </div>
          </div>

          <div class="relative w-full pl-11 flex-1 overflow-y-auto">
            <div class="absolute bg-[#e7e8e9] w-[2px] left-[21px] top-2 bottom-2"></div>

            <!-- Entry 1 -->
            <div class="relative pb-8">
              <div class="bg-[#f3f4f5] rounded-[4px] p-[13px] flex flex-col gap-1 w-full">
                <div class="flex items-center justify-between w-full">
                  <span class="text-[#191c1d] text-[12px] font-bold tracking-[0.6px] leading-[16px]">General Inquiry</span>
                  <span class="text-[#191414] text-[10px] font-normal leading-[15px]">June 10, 2024</span>
                </div>
                <p class="text-[#191414] text-[14px] font-normal leading-[20px]">
                  Logged by RM Sarah Bwalaya. Customer queried interest rates on fixed deposits but expressed frustration with app performance.
                </p>
              </div>
              <div class="absolute bg-white border-2 border-[#ae0029] rounded-full size-6 flex items-center justify-center p-[2px] left-[-22px] top-1 -translate-x-1/2">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#ae0029" stroke-width="2.5" stroke-linecap="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </div>
            </div>

            <!-- Entry 2 -->
            <div class="relative pb-8">
              <div class="bg-[#f3f4f5] rounded-[4px] p-[13px] flex flex-col gap-1 w-full opacity-80">
                <div class="flex items-center justify-between w-full">
                  <span class="text-[#191c1d] text-[12px] font-bold tracking-[0.6px] leading-[16px]">Cross-sell: Credit Card</span>
                  <span class="text-[#191414] text-[10px] font-normal leading-[15px]">May 15, 2024</span>
                </div>
                <p class="text-[#191414] text-[14px] font-normal leading-[20px]">
                  Inbound call center lead. Product offered: Absa Infinite Card. Customer declined citing high annual fees.
                </p>
              </div>
              <div class="absolute bg-white border-2 border-[#e7bcbc] rounded-full size-6 flex items-center justify-center p-[2px] left-[-22px] top-1 -translate-x-1/2">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#5d3f3f" stroke-width="2.5" stroke-linecap="round">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <line x1="2" y1="10" x2="22" y2="10"/>
                </svg>
              </div>
            </div>

            <!-- Entry 3 -->
            <div class="relative">
              <div class="bg-[#f3f4f5] rounded-[4px] p-[13px] flex flex-col gap-1 w-full opacity-60">
                <div class="flex items-center justify-between w-full">
                  <span class="text-[#191c1d] text-[12px] font-bold tracking-[0.6px] leading-[16px]">KYC Update</span>
                  <span class="text-[#191414] text-[10px] font-normal leading-[15px]">April 02, 2024</span>
                </div>
                <p class="text-[#191414] text-[14px] font-normal leading-[20px]">
                  Routine identity verification completed at Lusaka Main Branch.
                </p>
              </div>
              <div class="absolute bg-white border-2 border-[#e7bcbc] rounded-full size-6 flex items-center justify-center p-[2px] left-[-22px] top-1 -translate-x-1/2">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#5d3f3f" stroke-width="2.5" stroke-linecap="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>
