/**
 * Unit Conversion Multipliers
 * Default multipliers to convert base units to sales units.
 * Formula: Selling Price = Base Price * Multiplier
 */
export const unitConversions = {
  weight: [
    { label: 'Kilogram (kg) to Gram (g)', multiplier: 0.001, from: 'kg', to: 'g' },
    { label: 'Gram (g) to Kilogram (kg)', multiplier: 1000, from: 'g', to: 'kg' }
  ],
  volume: [
    { label: 'Litre (L) to Millilitre (ml)', multiplier: 0.001, from: 'L', to: 'ml' },
    { label: 'Millilitre (ml) to Litre (L)', multiplier: 1000, from: 'ml', to: 'L' }
  ],
  length: [
    { label: 'Metre (m) to Centimetre (cm)', multiplier: 0.01, from: 'm', to: 'cm' },
    { label: 'Centimetre (cm) to Metre (m)', multiplier: 100, from: 'cm', to: 'm' }
  ],
  count: [] // Count-based products usually use 1:1 or custom batch sizes
};

export const getMultiplier = (type, from, to) => {
  if (from === to) return 1;
  const list = unitConversions[type] || [];
  const conversion = list.find(c => c.from === from && c.to === to);
  return conversion ? conversion.multiplier : 1;
};
