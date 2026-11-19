import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
export default function DeviceModal({device,onClose,onSave}) {
  const [form,setForm] = useState(device || {name:'',category:'Cooling',wattage:'',hours_per_day:'',is_active:true});
  const [error,setError] = useState('');
  useEffect(()=>{setForm(device || {name:'',category:'Cooling',wattage:'',hours_per_day:'',is_active:true})},[device]);
  const change = e => setForm({...form,[e.target.name]:e.target.type==='checkbox'?e.target.checked:e.target.value});
  const submit = e => {e.preventDefault(); if(!form.name.trim()||Number(form.wattage)<=0||Number(form.hours_per_day)<0||Number(form.hours_per_day)>24){setError('Enter a name, positive wattage and valid hours (0–24).');return;} onSave(form);};
  return <div className="modal-backdrop" onMouseDown={e=>e.target===e.currentTarget&&onClose()}><form className="modal" onSubmit={submit}><div className="modal-head"><div><span className="eyebrow">DEVICE CONFIGURATION</span><h2>{device?'Edit appliance':'Add appliance'}</h2></div><button type="button" className="icon-btn" onClick={onClose}><X size={19}/></button></div>
    <label>Appliance name<input name="name" value={form.name} onChange={change} placeholder="e.g. Air Conditioner" maxLength="60"/></label>
    <label>Category<select name="category" value={form.category} onChange={change}>{['Cooling','Heating','Kitchen','Lighting','Electronics','Laundry','Other'].map(x=><option key={x}>{x}</option>)}</select></label>
    <div className="form-grid"><label>Power rating (watts)<input name="wattage" type="number" min="1" max="50000" value={form.wattage} onChange={change} placeholder="1500"/></label><label>Hours used per day<input name="hours_per_day" type="number" min="0" max="24" step=".5" value={form.hours_per_day} onChange={change} placeholder="5"/></label></div>
    <label className="check-label"><input type="checkbox" name="is_active" checked={form.is_active} onChange={change}/> Currently active</label>
    {error&&<p className="form-error">{error}</p>}<div className="modal-actions"><button type="button" className="btn btn-light" onClick={onClose}>Cancel</button><button className="btn btn-primary" type="submit">{device?'Save changes':'Add appliance'}</button></div>
  </form></div>;
}
