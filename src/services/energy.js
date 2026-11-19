export const monthlyKwh = (device) =>
  Math.max(0, (Number(device.wattage) * Number(device.hours_per_day) * 30) / 1000);

export const monthlyCost = (kwh, tariff) => Math.max(0, Number(kwh) * Number(tariff));

export function buildRecommendations(devices) {
  const active = devices.filter(d => d.is_active);
  const tips = [];
  devices.forEach(d => {
    const kwh = monthlyKwh(d);
    if (d.is_active && d.hours_per_day >= 8)
      tips.push({ title: `Reduce ${d.name} runtime`, detail: `It runs about ${d.hours_per_day} hours/day. Try reducing usage by 1 hour to save ${(d.wattage * 30 / 1000).toFixed(1)} kWh/month.`, type: 'usage' });
    if (kwh >= 45)
      tips.push({ title: `${d.name} is a high-consumption device`, detail: `Estimated usage is ${kwh.toFixed(1)} kWh/month. Review its schedule and energy-efficiency rating.`, type: 'high' });
    if (!d.is_active)
      tips.push({ title: `${d.name} is switched off`, detail: 'Great habit. Keep standby loads disconnected when practical.', type: 'good' });
  });
  if (!tips.length) tips.push({ title: 'Keep building efficient habits', detail: 'Review your appliance schedules weekly and switch off devices when not in use.', type: 'good' });
  if (active.length === 0) tips.unshift({ title: 'No active appliances', detail: 'Turn on a device in Device Management to begin tracking estimated usage.', type: 'good' });
  return tips.slice(0, 6);
}

export function exportCsv(devices, tariff) {
  const rows = [['Appliance','Category','Wattage (W)','Hours/day','Status','Monthly kWh','Estimated cost']];
  devices.forEach(d => rows.push([d.name,d.category,d.wattage,d.hours_per_day,d.is_active?'Active':'Off',monthlyKwh(d).toFixed(2),(monthlyKwh(d)*tariff).toFixed(2)]));
  const csv = rows.map(row => row.map(v => `"${String(v ?? '').replaceAll('"','""')}"`).join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href = url; a.download = 'ecocloud-energy-report.csv'; a.click();
  URL.revokeObjectURL(url);
}
