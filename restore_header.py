repo_path = r'c:\Users\ADMIN\Desktop\uniplexity-ai\ABSA\absa-foundry-frontend\src\components\crm\PromiseToFundModal.vue'
with open(repo_path, 'r', encoding='utf-8') as f:
    content = f.read()

import re

old_header = """        <!-- Header: Sticky, Blurred -->
        <div class="px-8 py-6 flex flex-col md:flex-row md:items-start justify-between gap-6 bg-absa-passion relative z-10 shrink-0 shadow-md">
          <div class="flex items-start gap-5">
            <img src="/absa-logo.png" alt="Absa Logo" class="h-10 w-auto object-contain mt-1 brightness-0 invert">
            <div class="w-1.5 h-12 bg-white/30 shrink-0 mt-0.5"></div>
            <div>
               <!-- Font Black + Uppercase + Tracking Tight for Data/Headings -->
               <h3 class="text-xl font-black uppercase tracking-tight text-white mb-2 font-display">
                 Promise to Fund Report
               </h3>
               <!-- Font Mono for Technical/Description text -->
               <p class="text-[10px] text-white/80 max-w-3xl font-mono tracking-wide leading-relaxed">
                 CONSOLIDATED LEDGER OF ALL RECORDED "PROMISE TO FUND" ENGAGEMENTS. OUTLINES SPECIFIC CUSTOMER ACCOUNTS TARGETED, EXPECTED FUNDING AMOUNTS, EXPECTED COMMITMENT DATES, AND CONTACT INFORMATION FOR FOLLOW-UPS.
               </p>
            </div>
          </div>
          <button @click="$emit('close')" class="text-white/70 hover:text-white transition-colors self-start border border-transparent hover:border-white/30 bg-transparent hover:bg-white/10 p-1 rounded-none">
            <span class="material-symbols-outlined text-[24px] block">close</span>
          </button>
        </div>"""

new_header = """        <!-- Header: Sticky, Blurred -->
        <div class="px-8 py-6 flex flex-col md:flex-row md:items-start justify-between gap-6 bg-white/90 backdrop-blur-md relative z-10 shrink-0 border-b border-gray-200">
          <div class="flex items-start gap-5">
            <img src="/absa-logo.png" alt="Absa Logo" class="h-10 w-auto object-contain mt-1 mix-blend-multiply">
            <div class="w-1.5 h-12 bg-absa-passion shrink-0 mt-0.5"></div>
            <div>
               <!-- Font Black + Uppercase + Tracking Tight for Data/Headings -->
               <h3 class="text-xl font-black uppercase tracking-tight text-absa-enrich mb-2 font-display">
                 Promise to Fund Report
               </h3>
               <!-- Font Mono for Technical/Description text -->
               <p class="text-[10px] text-gray-500 max-w-3xl font-mono tracking-wide leading-relaxed">
                 CONSOLIDATED LEDGER OF ALL RECORDED "PROMISE TO FUND" ENGAGEMENTS. OUTLINES SPECIFIC CUSTOMER ACCOUNTS TARGETED, EXPECTED FUNDING AMOUNTS, EXPECTED COMMITMENT DATES, AND CONTACT INFORMATION FOR FOLLOW-UPS.
               </p>
            </div>
          </div>
          <button @click="$emit('close')" class="text-gray-400 hover:text-absa-passion transition-colors self-start border border-transparent hover:border-absa-passion/30 bg-gray-50 hover:bg-absa-passion/5 p-1 rounded-none">
            <span class="material-symbols-outlined text-[24px] block">close</span>
          </button>
        </div>"""

content = content.replace(old_header, new_header)

with open(repo_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("done restoring white header")
