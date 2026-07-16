/**
 * UB Pay Fee Schedule
 * Lenco's rates + UB Pay markup = what tenants are charged.
 * UB Profit = ubFee - lencoFee per transaction.
 */

// Mobile Money Payout Tiers
export const MOMO_PAYOUT_TIERS = [
  { min: 0,         max: 150,          label: 'K0 - K150',              ubFee: 11,   lencoFee: 8.50 },
  { min: 150.01,    max: 300,          label: 'K150.01 - K300',         ubFee: 12.50, lencoFee: 10   },
  { min: 300.01,    max: 500,          label: 'K300.01 - K500',         ubFee: 13.50, lencoFee: 11   },
  { min: 500.01,    max: 1000,         label: 'K500.01 - K1,000',       ubFee: 14.50, lencoFee: 12   },
  { min: 1000.01,   max: 3000,         label: 'K1,000.01 - K3,000',     ubFee: 17.50, lencoFee: 15   },
  { min: 3000.01,   max: 5000,         label: 'K3,000.01 - K5,000',     ubFee: 20.50, lencoFee: 18   },
  { min: 5000.01,   max: 10000,        label: 'K5,000.01 - K10,000',    ubFee: 22.50, lencoFee: 20   },
  { min: 10000.01,  max: 50000,        label: 'K10,000.01 - K50,000',   ubFee: 30,    lencoFee: 25   },
  { min: 50000.01,  max: 100000000,    label: 'K50,000.01 - K100M',     ubFee: 50,    lencoFee: 35   },
];

// Bank Account Payout Tiers
export const BANK_PAYOUT_TIERS = [
  { min: 0,         max: 150,          label: 'K0 - K150',              ubFee: 11,    lencoFee: 8.50 },
  { min: 150.01,    max: 500,          label: 'K150.01 - K500',         ubFee: 12,    lencoFee: 9.50 },
  { min: 500.01,    max: 1000,         label: 'K500.01 - K1,000',       ubFee: 12.50, lencoFee: 10   },
  { min: 1000.01,   max: 3000,         label: 'K1,000.01 - K3,000',     ubFee: 17.50, lencoFee: 15   },
  { min: 3000.01,   max: 5000,         label: 'K3,000.01 - K5,000',     ubFee: 20.50, lencoFee: 18   },
  { min: 5000.01,   max: 10000,        label: 'K5,000.01 - K10,000',    ubFee: 22.50, lencoFee: 20   },
  { min: 10000.01,  max: 50000,        label: 'K10,000.01 - K50,000',   ubFee: 30,    lencoFee: 25   },
  { min: 50000.01,  max: 100000000,    label: 'K50,000.01 - K100M',     ubFee: 50,    lencoFee: 35   },
];

// Collection fee rates
export const COLLECTION_FEE_RATE  = 0.015; // 1.5% — charged to tenant
export const LENCO_COLLECTION_RATE = 0.01;  // 1.0% — Lenco's cut
export const UB_COLLECTION_PROFIT_RATE = 0.005; // 0.5% — our profit

/**
 * Get the payout fee for a given amount and payment type.
 * @param {number} amount  - Payout / disbursement amount
 * @param {'mobile_money'|'bank'} type
 * @returns {{ ubFee: number, lencoFee: number, profit: number, totalDeducted: number, tier: object }}
 */
export function getPayoutFee(amount, type = 'mobile_money') {
  const tiers = type === 'bank' ? BANK_PAYOUT_TIERS : MOMO_PAYOUT_TIERS;
  const tier = tiers.find(t => amount >= t.min && amount <= t.max)
    || tiers[tiers.length - 1]; // fallback to highest tier
  return {
    ubFee:         tier.ubFee,
    lencoFee:      tier.lencoFee,
    profit:        parseFloat((tier.ubFee - tier.lencoFee).toFixed(2)),
    totalDeducted: parseFloat((amount + tier.ubFee).toFixed(2)),
    tier,
  };
}

/**
 * Get the collection fee for a given amount.
 * @param {number} amount - Amount collected
 * @returns {{ ubFee: number, lencoFee: number, profit: number }}
 */
export function getCollectionFee(amount) {
  const ubFee     = parseFloat((amount * COLLECTION_FEE_RATE).toFixed(2));
  const lencoFee  = parseFloat((amount * LENCO_COLLECTION_RATE).toFixed(2));
  return {
    ubFee,
    lencoFee,
    profit: parseFloat((ubFee - lencoFee).toFixed(2)),
  };
}
