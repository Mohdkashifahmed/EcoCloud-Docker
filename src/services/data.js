import { supabase } from './supabase';

export const seedDevices = [
  { id:'d1', name:'Air Conditioner', category:'Cooling', wattage:1500, hours_per_day:5, is_active:true },
  { id:'d2', name:'Refrigerator', category:'Kitchen', wattage:180, hours_per_day:10, is_active:true },
  { id:'d3', name:'LED Lighting', category:'Lighting', wattage:60, hours_per_day:6, is_active:true },
  { id:'d4', name:'Washing Machine', category:'Laundry', wattage:500, hours_per_day:1, is_active:false },
  { id:'d5', name:'Laptop', category:'Electronics', wattage:65, hours_per_day:7, is_active:true },
  { id:'d6', name:'Water Heater', category:'Heating', wattage:2000, hours_per_day:0.5, is_active:false }
];

export async function loadDevices(userId) {
  const { data, error } = await supabase.from('devices').select('*').eq('user_id', userId).order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}
export async function saveDevice(device, userId) {
  const payload = { name:device.name, category:device.category, wattage:Number(device.wattage), hours_per_day:Number(device.hours_per_day), is_active:Boolean(device.is_active), user_id:userId };
  if (device.id && !String(device.id).startsWith('d')) {
    const { data, error } = await supabase.from('devices').update(payload).eq('id',device.id).select().single();
    if (error) throw error; return data;
  }
  const { data, error } = await supabase.from('devices').insert(payload).select().single();
  if (error) throw error; return data;
}
export async function removeDevice(id) {
  const { error } = await supabase.from('devices').delete().eq('id',id);
  if (error) throw error;
}
