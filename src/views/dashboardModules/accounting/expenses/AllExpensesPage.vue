<template>
  <div class="relative overflow-hidden min-h-screen bg-gray-50 flex flex-col">
    <!-- Overlay Terminal Header -->
    <div class="fixed top-0 left-0 right-0 z-[200] bg-white border-b border-gray-200">
      <div class="max-w-[1600px] mx-auto px-4 h-12 flex items-center justify-between">
        <button @click="goBack" class="flex items-center gap-2 text-[10px] font-mono font-black text-gray-500 hover:text-[#2F2E8B] uppercase tracking-widest transition-colors">
          <i class="fas fa-arrow-left"></i>
          <span>Exit Document Manager</span>
        </button>
        <div class="flex items-center gap-4">
          <div class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-[0.2em] animate-pulse">
            <span class="w-2 h-2 rounded-full bg-emerald-500 inline-block mr-2"></span> Connection: Ledger_Safe
          </div>
          <div class="w-px h-6 bg-gray-100"></div>
          <div class="text-[10px] font-mono font-bold text-gray-900 uppercase">System // Expense_All_In_One</div>
        </div>
      </div>
    </div>

    <!-- Main Content Area -->
    <div class="flex-1 mt-12 bg-white">
      <!-- Rendering the original monolithic module functions -->
      <ExpensesModuleFull />
    </div>
  </div>
</template>

<script setup>
import { BackButton } from '@/components/ui'
import { useRouter } from 'vue-router';
import ExpensesModuleFull from '../ExpensesModuleFull.vue';

const router = useRouter();

