import re

with open('src/views/Modules/settings/UserManagement.vue', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the non-CRM module features blocks
old_etl = '''{
    id: 'etl',
    name: 'DATA PIPELINE',
    icon: 'fas fa-network-wired',
    features: [
      { id: 'pipeline', name: 'ETL PIPELINE', desc: 'Main data integration pipeline', icon: 'fas fa-project-diagram' },
      { id: 'history', name: 'ETL RUN HISTORY', desc: 'Logs and execution history', icon: 'fas fa-history' },
      { id: 'batch', name: 'BATCH EXECUTION', desc: 'Detailed batch execution metrics', icon: 'fas fa-tasks' },
      { id: 'config', name: 'ETL CONFIG MANAGER', desc: 'Pipeline settings and configurations', icon: 'fas fa-cogs' }
    ]
  },
  {
    id: 'ai',
    name: 'INTELLIGENCE & AI',
    icon: 'fas fa-brain',
    features: [
      { id: 'cv', name: 'CUSTOMER VALUE', desc: 'Lifetime value & profitability', icon: 'fas fa-gem' },
      { id: 'forecast', name: 'BALANCE FORECAST', desc: 'Predictive account balances', icon: 'fas fa-chart-area' },
      { id: 'outcomes', name: 'BUSINESS OUTCOMES', desc: 'Goal tracking and projections', icon: 'fas fa-bullseye' },
      { id: 'lifecycle', name: 'LIFECYCLE', desc: 'Customer journey prediction', icon: 'fas fa-recycle' },
      { id: 'models', name: 'MODEL PERFORMANCE', desc: 'AI model monitoring and drift', icon: 'fas fa-robot' }
    ]
  },
  {
    id: 'ops',
    name: 'OPERATIONS',
    icon: 'fas fa-briefcase',
    features: [
      { id: 'branch', name: 'BRANCH MANAGER', desc: 'Branch-level performance dashboard', icon: 'fas fa-store' },
      { id: 'portfolio', name: 'PORTFOLIO OVERVIEW', desc: 'Global portfolio metrics', icon: 'fas fa-globe' },
      { id: 'customer', name: 'CUSTOMER DETAIL', desc: 'Deep dive customer view', icon: 'fas fa-user-circle' },
      { id: 'my', name: 'MY CUSTOMERS', desc: 'Assigned customer list', icon: 'fas fa-users' }
    ]
  },
  {
    id: 'settings',
    name: 'SETTINGS & ADMIN',
    icon: 'fas fa-sliders-h',
    features: [
      { id: 'global', name: 'GLOBAL SETTINGS', desc: 'System-wide configurations', icon: 'fas fa-cog' },
      { id: 'users', name: 'USER MANAGEMENT', desc: 'Roles, permissions and users', icon: 'fas fa-users-cog' },
      { id: 'subaccounts', name: 'SUB ACCOUNTS', desc: 'Manage sub-entities', icon: 'fas fa-sitemap' },
      { id: 'profile', name: 'MY PROFILE', desc: 'Personal settings and security', icon: 'fas fa-user-shield' }
    ]
  }'''

new_etl = '''{
    id: 'etl',
    name: 'DATA PIPELINE',
    icon: 'fas fa-network-wired',
    features: [
      { id: 'pipeline', name: 'ETL PIPELINE', desc: 'Main data integration pipeline', icon: 'fas fa-project-diagram' },
      { id: 'history', name: 'ETL RUN HISTORY', desc: 'Logs and execution history', icon: 'fas fa-history' },
      { id: 'config', name: 'ETL CONFIG MANAGER', desc: 'Pipeline settings and configurations', icon: 'fas fa-cogs' }
    ]
  },
  {
    id: 'ai',
    name: 'INTELLIGENCE & AI',
    icon: 'fas fa-brain',
    features: [
      { id: 'cv', name: 'CUSTOMER VALUE', desc: 'Lifetime value & profitability metrics', icon: 'fas fa-gem' },
      { id: 'lifecycle', name: 'LIFECYCLE PREDICTION', desc: 'Customer journey prediction and churn', icon: 'fas fa-recycle' },
      { id: 'forecast', name: 'BALANCE FORECAST', desc: 'Predictive account balance models', icon: 'fas fa-chart-area' },
      { id: 'outcomes', name: 'BUSINESS OUTCOMES', desc: 'Goal tracking and projections', icon: 'fas fa-bullseye' },
      { id: 'models', name: 'MODEL PERFORMANCE', desc: 'AI model monitoring and drift', icon: 'fas fa-robot' }
    ]
  },
  {
    id: 'ops',
    name: 'OPERATIONS',
    icon: 'fas fa-briefcase',
    features: [
      { id: 'portfolio', name: 'PORTFOLIO OVERVIEW', desc: 'Global portfolio metrics dashboard', icon: 'fas fa-globe' },
      { id: 'branch', name: 'BRANCH MANAGER', desc: 'Branch-level performance dashboard', icon: 'fas fa-store' }
    ]
  },
  {
    id: 'settings',
    name: 'SETTINGS & ADMIN',
    icon: 'fas fa-sliders-h',
    features: [
      { id: 'settings', name: 'PLATFORM SETTINGS', desc: 'System-wide configurations', icon: 'fas fa-cog' },
      { id: 'users', name: 'USER MANAGEMENT', desc: 'Roles, permissions and users', icon: 'fas fa-users-cog' },
      { id: 'subaccounts', name: 'SUB ACCOUNTS', desc: 'Manage sub-entities', icon: 'fas fa-sitemap' }
    ]
  }'''

if old_etl in content:
    content = content.replace(old_etl, new_etl)
    with open('src/views/Modules/settings/UserManagement.vue', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Replaced OTHER features successfully.")
else:
    print("Could not find the old block to replace.")
