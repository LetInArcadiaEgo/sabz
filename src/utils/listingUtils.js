// General utilities for formatting listing-related data

export function formatPrice(price, { currency = 'PKR' } = {}) {
  if (price == null) return '';

  // Handle normalized price object format {base: number, weeklyDiscount: number, monthlyDiscount: number}
  const priceValue = typeof price === 'object' && price.base ? price.base : price;
  
  if (priceValue == null || typeof priceValue !== 'number') return '';

  // 1 Crore = 10,000,000 PKR
  const CRORE = 1e7;
  const LAKH  = 1e5;

  // Helper to format value, stripping trailing .0
  const fmt = (num) => {
    const str = Number(num).toFixed(1);
    return str.endsWith('.0') ? str.slice(0, -2) : str;
  };

  // ≥ 1 Crore ➜ show Crore units
  if (priceValue >= CRORE) {
    const value = priceValue / CRORE; // e.g. 30,000,000 → 3
    return `${currency} ${fmt(value)} Crore`;
  }

  // 1 Lakh ≤ price < 1 Crore ➜ show Lakh units
  if (priceValue >= LAKH) {
    const value = priceValue / LAKH; // e.g. 200,000 → 2
    const suffix = Number.isInteger(value) ? 'lakh' : 'lakhs';
    return `${currency} ${fmt(value)} ${suffix}`;
  }

  // < 1 Lakh ➜ still represent in Lakhs with decimal (rare case but handled)
  const value = priceValue / LAKH; // will be < 1
  return `${currency} ${fmt(value)} lakhs`;
}

export function formatSquareFootage(totalArea, areaUnit) {
  return totalArea && areaUnit ? `${totalArea} ${areaUnit}` : undefined;
}

export function formatLocationDetails(listing) {
  if (!listing) return '';
  if (listing.locationDetails) return listing.locationDetails;
  const { address } = listing;
  if (address?.city && address?.state) return `${address.city}, ${address.state}`;
  return '';
} 