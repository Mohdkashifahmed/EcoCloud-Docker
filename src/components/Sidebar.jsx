import React from 'react';
import { Leaf, LayoutDashboard, Monitor, Activity, Lightbulb, Calculator, FileText, Shield, Settings, LogOut, X } from 'lucide-react';

const items = [
  ['Overview','dashboard',LayoutDashboard],['Devices','devices',Monitor],['Analytics','analytics',Activity],
  ['Recommendations','recommendations',Lightbulb],['Bill calculator','billing',Calculator],['Reports','reports',FileText],['Admin','admin',Shield]
];
export default function Sidebar({page,setPage,onLogout,admin,open,setOpen,mode}) {
  return <><div className={`mobile-shade ${open?'show':''}`} onClick={()=>setOpen(false)} />
    <aside className={`sidebar ${open?'sidebar-open':''}`}>
      <div className="brand"><div className="brand-mark"><Leaf size={21}/></div><div><b>EcoCloud</b><small>ENERGY INTELLIGENCE</small></div><button className="mobile-close" onClick={()=>setOpen(false)}><X size={19}/></button></div>
      <div className="workspace-label">WORKSPACE</div>
      <nav>{items.filter(([label])=>label!=='Admin'||admin).map(([label,key,Icon])=><button key={key} className={`nav-item ${page===key?'active':''}`} onClick={()=>{setPage(key);setOpen(false)}}><Icon size={18}/><span>{label}</span>{key==='recommendations'&&<i className="nav-dot"/>}</button>)}</nav>
      <div className="sidebar-bottom"><div className="cloud-card"><div className="cloud-icon"><Leaf size={16}/></div><b>{mode?'Cloud connected':'Demo workspace'}</b><p>{mode?'Your data syncs securely with Supabase.':'Explore all features with sample data.'}</p><span className="online-dot"/> {mode?'LIVE CLOUD':'LOCAL DEMO'}</div>
        <button className="nav-item" onClick={()=>setPage('settings')}><Settings size={18}/><span>Settings</span></button>
        <button className="nav-item logout" onClick={onLogout}><LogOut size={18}/><span>Sign out</span></button>
      </div>
    </aside></>;
}
