import { useState, useEffect, useRef } from "react";

const API = "https://api.anthropic.com/v1/messages";

// ═══════════════════════════════════════════════
// REAL BRAND DATA — AS KHUSHBOO
// ═══════════════════════════════════════════════
const BRAND = {
  name: "BrandFlow",
  nameClean: "BrandFlow",
  tagline: "The Pulse of Your Business.",
  taglineUrdu: "آپ کے کاروبار کی نبض۔",
  status: "Pre-Launch",
  city: "Karachi",
  country: "Pakistan",
  industry: "Luxury Perfume / Fragrance",
  primaryColor: "#C9A84C",
  totalBottles: 300,
  totalProducts: 6,
  channels: ["Instagram", "WhatsApp", "Website", "Facebook", "TikTok"],
  topChannel: "Instagram + WhatsApp",
  socialPlatforms: ["Instagram", "Facebook", "TikTok", "YouTube"],
};

const PRODUCTS = [
  {
    id: 1, name: "Shahkaar", urdu: "شاہکار",
    priceMin: 2500, priceMax: 3500, costMin: 700, costMax: 1000,
    stock: 50, sold: 0, gender: "Men",
    top: "Citrus, Saffron", heart: "Rose, Spices", base: "Oud, Amber, Musk",
    occasion: "Formal / Evening", season: "Winter / Night",
    color: "#8B6914", emoji: "♟",
    story: "A masterpiece for the man who commands every room. Bold, powerful, unforgettable.",
    mood: "Power · Legacy · Royalty",
  },
  {
    id: 2, name: "Meharban", urdu: "مہربان",
    priceMin: 2200, priceMax: 3200, costMin: 650, costMax: 900,
    stock: 50, sold: 0, gender: "Men",
    top: "Bergamot, Green Notes", heart: "Lavender, Geranium", base: "Musk, Sandalwood",
    occasion: "Daily Wear", season: "All Season",
    color: "#4A7C8E", emoji: "🌿",
    story: "The scent of warmth and kindness. For the man who wins hearts effortlessly.",
    mood: "Warmth · Kindness · Trust",
  },
  {
    id: 3, name: "Gulnaaz", urdu: "گلناز",
    priceMin: 2400, priceMax: 3400, costMin: 700, costMax: 1000,
    stock: 50, sold: 0, gender: "Women",
    top: "Rose, Lychee", heart: "Jasmine, Peony", base: "Vanilla, White Musk",
    occasion: "Romantic / Casual", season: "Spring / Summer",
    color: "#C4518A", emoji: "🌸",
    story: "The girl who is complete within herself — beautiful, confident, radiant.",
    mood: "Femininity · Grace · Confidence",
  },
  {
    id: 4, name: "Noor-e-Jahan", urdu: "نورِ جہاں",
    priceMin: 2600, priceMax: 3600, costMin: 750, costMax: 1100,
    stock: 50, sold: 0, gender: "Women",
    top: "Rose, Orange Blossom", heart: "Tuberose, Jasmine", base: "Amber, Musk, Sandalwood",
    occasion: "Luxury / Special Events", season: "All Season",
    color: "#8B1A6B", emoji: "👑",
    story: "The queen of all fragrances. Inspired by the grandeur of Mughal royalty.",
    mood: "Royalty · Luxury · Timeless",
  },
  {
    id: 5, name: "Ravaan", urdu: "رواں",
    priceMin: 2300, priceMax: 3300, costMin: 700, costMax: 950,
    stock: 50, sold: 0, gender: "Unisex",
    top: "Lemon, Mint", heart: "Marine Notes, Lavender", base: "Musk, Amber",
    occasion: "Daily Wear", season: "Summer",
    color: "#2E7D52", emoji: "🌊",
    story: "Life is a flow — Ravaan is for those who move freely, boldly, fearlessly.",
    mood: "Freedom · Energy · Boldness",
  },
  {
    id: 6, name: "Rooh", urdu: "روح",
    priceMin: 2500, priceMax: 3500, costMin: 750, costMax: 1050,
    stock: 50, sold: 0, gender: "Unisex",
    top: "Saffron, Pink Pepper", heart: "Rose, Oud", base: "Amber, Leather, Musk",
    occasion: "Night / Special Occasions", season: "Winter",
    color: "#2C5364", emoji: "🌙",
    story: "Some fragrances don't just reach the nose — they reach the soul.",
    mood: "Spirituality · Depth · Mystery",
  },
];

// ═══════════════════════════════════════════════
// AI BRAIN — MULTI-LANGUAGE
// ═══════════════════════════════════════════════
const BRAND_BRAIN = `You are the AI Business Manager for BrandFlow — a Tech SaaS brand from Karachi, Pakistan, currently in Pre-Launch stage.

BRAND DNA:
- Name: BrandFlow
- Tagline: "The Pulse of Your Business."
- Status: PRE-LAUNCH — all products ready, 50 bottles each (300 total)
- City: Karachi, Pakistan
- Industry: Luxury Perfume / Fragrance
- Design: Black & Gold, Luxury Aesthetic

PRODUCT PORTFOLIO (6 fragrances, all unpriced — owner deciding):
1. SHAHKAAR (Men) — Citrus+Saffron / Rose+Spices / Oud+Amber+Musk | Formal/Evening | Winter | Rs.2500-3500 est.
2. MEHARBAN (Men) — Bergamot+Green / Lavender+Geranium / Musk+Sandalwood | Daily | All Season | Rs.2200-3200 est.
3. GULNAAZ (Women) — Rose+Lychee / Jasmine+Peony / Vanilla+White Musk | Romantic | Spring/Summer | Rs.2400-3400 est.
4. NOOR-E-JAHAN (Women) — Rose+Orange Blossom / Tuberose+Jasmine / Amber+Musk+Sandalwood | Luxury Events | All Season | Rs.2600-3600 est.
5. RAVAAN (Unisex) — Lemon+Mint / Marine+Lavender / Musk+Amber | Daily | Summer | Rs.2300-3300 est.
6. ROOH (Unisex) — Saffron+Pink Pepper / Rose+Oud / Amber+Leather+Musk | Night | Winter | Rs.2500-3500 est.

CURRENT SITUATION:
- Revenue: Rs. 0 (not launched yet)
- Stock: 300 bottles total (50 each)
- Sales Channels planned: Instagram, WhatsApp, Website, Facebook, TikTok
- Social Media: All platforms created, building content strategy

BUSINESS GOALS:
- Successful launch in Karachi
- Build brand identity around luxury + Pakistani culture
- Price products competitively in Rs.2000-3500 range
- Generate first 100 sales post-launch

YOUR ROLE — 6 DEPARTMENTS:
1. CEO AI — Strategic decisions, launch planning, business direction
2. Marketing AI — Campaigns, ads, content ideas, launch strategy
3. Sales AI — Revenue projections, pricing, customer insights
4. Inventory AI — Stock management, 300 bottles, reorder planning
5. Social Media AI — Captions, content calendar, platform strategy
6. Customer Support AI — Inquiry handling, order guidance templates

CRITICAL LANGUAGE RULE:
- Detect the language of each user message
- ALWAYS reply in THE SAME LANGUAGE the user writes in
- If user writes Urdu/Roman Urdu → reply in Roman Urdu
- If user writes English → reply in English  
- If user writes Arabic → reply in Arabic
- If user writes mixed → reply in mixed
- NEVER switch languages unless user switches

When advising:
- Always consider pre-launch context — no sales yet, building from scratch
- Reference specific product names
- Think Pakistani luxury market
- Be specific with launch timelines and strategies
- Consider Karachi market dynamics
- Think like a premium brand consultant`;

// ═══════════════════════════════════════════════
// ADMIN DATA STATE
// ═══════════════════════════════════════════════
const DEFAULT_ADMIN = {
  products: PRODUCTS.map(p => ({
    ...p,
    price: p.priceMin,
    notes: "",
    launched: false,
  })),
  revenue: { thisMonth: 0, lastMonth: 0, total: 0 },
  orders: [],
  campaigns: [
    { id:1, name:"Launch Teaser Campaign", platform:"Instagram + TikTok", status:"Planning", budget:0, notes:"Pre-launch hype building" },
    { id:2, name:"Shahkaar Hero Shoot", platform:"Instagram", status:"Idea", budget:0, notes:"Men's power fragrance campaign" },
    { id:3, name:"Gulnaaz Spring Launch", platform:"Instagram + Facebook", status:"Idea", budget:0, notes:"Women's fragrance debut" },
  ],
  tasks: [
    { id:1, text:"Finalize product prices", done:false, priority:"high" },
    { id:2, text:"Complete Instagram profile setup", done:false, priority:"high" },
    { id:3, text:"Shoot product photography", done:false, priority:"high" },
    { id:4, text:"Design product labels", done:false, priority:"medium" },
    { id:5, text:"Website development start", done:false, priority:"medium" },
    { id:6, text:"Plan launch event/campaign", done:false, priority:"medium" },
    { id:7, text:"Influencer outreach list", done:false, priority:"low" },
  ],
  launchDate: "",
  budget: "",
  notes: "",
};

// ═══════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════
const fmt = n => n ? `Rs. ${Number(n).toLocaleString()}` : "TBD";
const fmtRange = (a,b) => `Rs. ${Number(a).toLocaleString()} – ${Number(b).toLocaleString()}`;

const AI_MODULES = {
  ceo:      { icon:"♛", title:"CEO AI",            color:"#C9A84C", desc:"Strategy, decisions, launch planning" },
  marketing:{ icon:"📣", title:"Marketing AI",      color:"#c084fc", desc:"Campaigns, ads, content, launch" },
  sales:    { icon:"📈", title:"Sales AI",          color:"#86efac", desc:"Pricing, revenue, projections" },
  inventory:{ icon:"📦", title:"Inventory AI",      color:"#60a5fa", desc:"Stock, 300 bottles, reorder" },
  social:   { icon:"📱", title:"Social Media AI",   color:"#f9a8d4", desc:"Captions, calendar, growth" },
  support:  { icon:"💬", title:"Support AI",        color:"#fcd34d", desc:"Customer replies, order templates" },
};

const QUICK_PROMPTS = {
  ceo:       ["What should be my launch strategy for Karachi?", "Mujhe launch ke liye kya kya karna chahiye?", "ما هي أفضل استراتيجية للإطلاق؟"],
  marketing: ["Design a 30-day launch campaign for Instagram", "Launch campaign ka plan banao", "Shahkaar ke liye teaser idea do"],
  sales:     ["Recommend final pricing for all 6 products", "Pricing strategy kya honi chahiye?", "How to price luxury perfumes in Karachi?"],
  inventory: ["300 bottles mein se launch mein kitni sell karni chahiye?", "Stock management plan for launch", "Reorder planning kab karein?"],
  social:    ["Write Instagram bio for AS KHUSHBOO", "Pehli Instagram post ka caption likho", "Content calendar for launch month"],
  support:   ["Write WhatsApp reply for pricing inquiry", "Order confirm karne ka message likho", "Customer complaint handle karna"],
};

export default function App() {
  const [tab, setTab] = useState("dashboard");
  const [aiMod, setAiMod] = useState("ceo");
  const [msgs, setMsgs] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [admin, setAdmin] = useState(DEFAULT_ADMIN);
  const [adminTab, setAdminTab] = useState("products");
  const [editingProduct, setEditingProduct] = useState(null);
  const [newTask, setNewTask] = useState("");
  const [newOrder, setNewOrder] = useState({ product:"", qty:1, price:"", customer:"", channel:"Instagram", status:"pending" });
  const [showAddOrder, setShowAddOrder] = useState(false);
  const [ready, setReady] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const chatEnd = useRef(null);

  useEffect(() => { setTimeout(() => setReady(true), 200); }, []);
  useEffect(() => { chatEnd.current?.scrollIntoView({ behavior:"smooth" }); }, [msgs]);

  // Tokens
  const G = "#C9A84C", G2 = "#E8C87A", G3 = "#FFF8E7";
  const D = "#060504", D2 = "#0C0A07", D3 = "#141108", D4 = "#1C1710";
  const BR = "rgba(201,164,76,0.15)", MU = "rgba(245,239,230,0.4)", CR = "#F5EFE6";

  const totalStock = admin.products.reduce((a,p) => a + Number(p.stock||0), 0);
  const totalRevenue = admin.revenue.total || 0;
  const doneTasks = admin.tasks.filter(t => t.done).length;
  const pendingOrders = admin.orders.filter(o => o.status === "pending").length;

  async function sendAI(customMsg) {
    const msg = customMsg || input.trim();
    if (!msg || loading) return;
    setInput("");
    const mod = AI_MODULES[aiMod];
    setMsgs(prev => [...prev, { role:"user", content:msg, mod:mod.title }]);
    setLoading(true);
    try {
      const history = msgs.slice(-12).map(m => ({ role:m.role, content:m.content }));
      const adminContext = `\nCURRENT LIVE DATA:\n- Total Stock: ${totalStock} bottles\n- Revenue: Rs.${totalRevenue}\n- Pending Orders: ${pendingOrders}\n- Tasks Done: ${doneTasks}/${admin.tasks.length}\n- Product Prices Set: ${admin.products.filter(p=>p.price).length}/6`;
      const res = await fetch(API, {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({
          model:"claude-sonnet-4-20250514", max_tokens:1200,
          system: BRAND_BRAIN + adminContext + `\n\nActive Module: ${mod.title} — ${mod.desc}\nRespond as this specialist.`,
          messages: [...history, { role:"user", content:msg }]
        })
      });
      const data = await res.json();
      const reply = data.content?.map(b => b.text||"").join("") || "Error aaya. Please retry.";
      setMsgs(prev => [...prev, { role:"assistant", content:reply, mod:mod.title }]);
    } catch {
      setMsgs(prev => [...prev, { role:"assistant", content:"Connection error. Please try again.", mod:mod.title }]);
    }
    setLoading(false);
  }

  const updateProduct = (id, key, val) => {
    setAdmin(a => ({ ...a, products: a.products.map(p => p.id===id ? {...p, [key]:val} : p) }));
  };

  const toggleTask = (id) => {
    setAdmin(a => ({ ...a, tasks: a.tasks.map(t => t.id===id ? {...t, done:!t.done} : t) }));
  };

  const addTask = () => {
    if (!newTask.trim()) return;
    setAdmin(a => ({ ...a, tasks: [...a.tasks, { id:Date.now(), text:newTask.trim(), done:false, priority:"medium" }] }));
    setNewTask("");
  };

  const addOrder = () => {
    if (!newOrder.product || !newOrder.price) return;
    const order = { ...newOrder, id:`KH-${3000+admin.orders.length+1}`, date:new Date().toLocaleDateString("en-PK") };
    const rev = Number(newOrder.price) * Number(newOrder.qty);
    setAdmin(a => ({
      ...a,
      orders: [order, ...a.orders],
      revenue: { ...a.revenue, thisMonth: a.revenue.thisMonth + rev, total: a.revenue.total + rev },
      products: a.products.map(p => p.name===newOrder.product ? {...p, stock: Math.max(0, p.stock-Number(newOrder.qty)), sold:(p.sold||0)+Number(newOrder.qty)} : p)
    }));
    setNewOrder({ product:"", qty:1, price:"", customer:"", channel:"Instagram", status:"pending" });
    setShowAddOrder(false);
  };

  const TABS = [
    { id:"dashboard", icon:"◈", label:"Dashboard" },
    { id:"products",  icon:"✦", label:"Products" },
    { id:"ai",        icon:"♛", label:"AI Brain" },
    { id:"admin",     icon:"⚙", label:"Admin" },
  ];

  const inputStyle = {
    width:"100%", background:"rgba(255,255,255,0.04)", border:`1px solid ${BR}`,
    borderRadius:"8px", padding:"10px 14px", color:CR,
    fontFamily:"'DM Sans',sans-serif", fontSize:"13px",
  };

  return (
    <div style={{ minHeight:"100vh", background:D, color:CR, fontFamily:"'DM Sans',sans-serif", overflowX:"hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500;600&family=Noto+Nastaliq+Urdu:wght@400;700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        ::-webkit-scrollbar{width:3px;height:3px;} ::-webkit-scrollbar-thumb{background:rgba(201,164,76,0.2);border-radius:2px;}
        @keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.2}}
        @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @keyframes shimmer{0%{background-position:200% center}100%{background-position:-200% center}}
        @keyframes glow{0%,100%{box-shadow:0 0 15px rgba(201,164,76,0.08)}50%{box-shadow:0 0 30px rgba(201,164,76,0.18)}}
        input,textarea,select{outline:none!important;transition:border 0.2s;}
        input:focus,textarea:focus,select:focus{border-color:rgba(201,164,76,0.45)!important;}
        input::placeholder,textarea::placeholder{color:rgba(245,239,230,0.2);}
        .tab-btn:hover{color:${G2}!important;}
        .card:hover{border-color:rgba(201,164,76,0.28)!important;}
        .mod-btn:hover{background:rgba(201,164,76,0.07)!important;border-color:rgba(201,164,76,0.3)!important;}
        .prod-card:hover{transform:translateY(-3px);box-shadow:0 12px 40px rgba(0,0,0,0.4);}
        .qbtn:hover{background:rgba(201,164,76,0.1)!important;border-color:rgba(201,164,76,0.4)!important;color:${G2}!important;}
        .task-row:hover{background:rgba(255,255,255,0.03)!important;}
        .order-row:hover{background:rgba(255,255,255,0.025)!important;}
        .send-btn:hover{opacity:0.82!important;}
        select option{background:#1C1710;}
      `}</style>

      {/* BG */}
      <div style={{ position:"fixed", inset:0, zIndex:0, pointerEvents:"none" }}>
        <div style={{ position:"absolute", top:"-20%", right:"-10%", width:"600px", height:"600px", background:"radial-gradient(ellipse,rgba(201,164,76,0.055) 0%,transparent 65%)" }}/>
        <div style={{ position:"absolute", bottom:"-15%", left:"-10%", width:"500px", height:"500px", background:"radial-gradient(ellipse,rgba(201,164,76,0.035) 0%,transparent 65%)" }}/>
        <svg style={{ position:"absolute",top:0,left:0,width:"100%",height:"100%",opacity:0.018 }}>
          <defs><pattern id="hex" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
            <polygon points="30,2 58,17 58,43 30,58 2,43 2,17" fill="none" stroke="#C9A84C" strokeWidth="0.5"/>
          </pattern></defs>
          <rect width="100%" height="100%" fill="url(#hex)"/>
        </svg>
      </div>

      <div style={{ position:"relative", zIndex:1, maxWidth:"1180px", margin:"0 auto", padding:"24px 16px", opacity:ready?1:0, transition:"opacity 0.5s" }}>

        {/* ══ HEADER ══ */}
        <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:"28px", gap:"16px" }}>
          <div>
            <div style={{ display:"flex", alignItems:"baseline", gap:"2px", marginBottom:"5px" }}>
              <span style={{ fontFamily:"'Cinzel',serif", fontSize:"11px", color:G, letterSpacing:"3px", fontWeight:"600" }}>#</span>
              <span style={{ fontFamily:"'Cinzel',serif", fontSize:"26px", color:CR, letterSpacing:"4px", fontWeight:"700",
                background:`linear-gradient(135deg,${CR},${G2},${CR})`, backgroundSize:"200% auto",
                WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", animation:"shimmer 5s linear infinite" }}>
                AS KHUSHBOO
              </span>
            </div>
            <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"13px", color:G, fontStyle:"italic", marginBottom:"4px" }}>
              "Where Fragrance Becomes Identity."
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
              <span style={{ fontSize:"9px", background:"rgba(252,211,77,0.1)", border:"1px solid rgba(252,211,77,0.25)", color:"#fcd34d", padding:"3px 10px", borderRadius:"20px", letterSpacing:"1.5px", fontWeight:"600" }}>
                ◉ PRE-LAUNCH
              </span>
              <span style={{ fontSize:"9px", color:"rgba(245,239,230,0.2)", letterSpacing:"2px" }}>KARACHI · PAKISTAN 🇵🇰</span>
            </div>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:"6px", alignItems:"flex-end" }}>
            <div style={{ fontSize:"10px", background:"rgba(255,255,255,0.03)", border:`1px solid ${BR}`, color:MU, padding:"5px 14px", borderRadius:"20px" }}>
              300 Bottles Ready
            </div>
            {pendingOrders > 0 && (
              <div style={{ fontSize:"10px", background:"rgba(252,211,77,0.07)", border:"1px solid rgba(252,211,77,0.2)", color:"#fcd34d", padding:"5px 14px", borderRadius:"20px" }}>
                {pendingOrders} Pending Orders
              </div>
            )}
          </div>
        </div>

        {/* ══ NAV TABS ══ */}
        <div style={{ display:"flex", gap:"4px", background:"rgba(255,255,255,0.02)", border:`1px solid ${BR}`, borderRadius:"14px", padding:"5px", marginBottom:"28px" }}>
          {TABS.map(t => (
            <button key={t.id} className="tab-btn" onClick={() => setTab(t.id)}
              style={{ flex:1, padding:"10px 6px", background:tab===t.id?"rgba(201,164,76,0.1)":"transparent",
                border:tab===t.id?`1px solid rgba(201,164,76,0.28)`:"1px solid transparent",
                borderRadius:"10px", color:tab===t.id?G2:MU, fontFamily:"'DM Sans',sans-serif",
                fontSize:"11px", fontWeight:tab===t.id?"600":"400", cursor:"pointer",
                letterSpacing:"0.5px", transition:"all 0.2s" }}>
              <span style={{ marginRight:"5px" }}>{t.icon}</span>{t.label}
            </button>
          ))}
        </div>

        {/* ══════════════════════════════════════ */}
        {/* DASHBOARD */}
        {/* ══════════════════════════════════════ */}
        {tab === "dashboard" && (
          <div style={{ animation:"fadeUp 0.3s ease" }}>

            {/* KPIs */}
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(190px,1fr))", gap:"14px", marginBottom:"24px" }}>
              {[
                { label:"Total Revenue", val:`Rs. ${totalRevenue.toLocaleString()}`, sub:"Since launch", col:G, icon:"💰" },
                { label:"Total Bottles", val:totalStock, sub:"300 initially stocked", col:"#86efac", icon:"🧴" },
                { label:"Products", val:"6 Fragrances", sub:"Men · Women · Unisex", col:"#c084fc", icon:"✦" },
                { label:"Launch Tasks", val:`${doneTasks}/${admin.tasks.length} Done`, sub:`${admin.tasks.length - doneTasks} remaining`, col:"#60a5fa", icon:"✓" },
              ].map((k, i) => (
                <div key={i} className="card" style={{ background:"rgba(255,255,255,0.022)", border:`1px solid ${BR}`, borderRadius:"16px", padding:"20px", transition:"all 0.2s", animation:`glow 4s ease ${i*0.5}s infinite` }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"10px" }}>
                    <div style={{ fontSize:"10px", color:MU, letterSpacing:"1px" }}>{k.label.toUpperCase()}</div>
                    <span style={{ fontSize:"18px" }}>{k.icon}</span>
                  </div>
                  <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"26px", fontWeight:"700", color:k.col, marginBottom:"4px" }}>{k.val}</div>
                  <div style={{ fontSize:"11px", color:"rgba(245,239,230,0.28)" }}>{k.sub}</div>
                </div>
              ))}
            </div>

            {/* 2-col layout */}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"16px", marginBottom:"20px" }}>

              {/* Launch Tasks */}
              <div style={{ background:"rgba(255,255,255,0.022)", border:`1px solid ${BR}`, borderRadius:"16px", padding:"20px" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"16px" }}>
                  <div style={{ fontSize:"11px", color:MU, letterSpacing:"1.5px" }}>LAUNCH CHECKLIST</div>
                  <div style={{ fontSize:"10px", color:G, background:"rgba(201,164,76,0.1)", padding:"3px 10px", borderRadius:"20px" }}>{doneTasks}/{admin.tasks.length}</div>
                </div>
                {/* Progress bar */}
                <div style={{ height:"3px", background:"rgba(255,255,255,0.05)", borderRadius:"2px", marginBottom:"16px", overflow:"hidden" }}>
                  <div style={{ height:"100%", width:`${(doneTasks/admin.tasks.length)*100}%`, background:`linear-gradient(90deg,${G},${G2})`, borderRadius:"2px", transition:"width 0.5s" }}/>
                </div>
                <div style={{ display:"flex", flexDirection:"column", gap:"6px", maxHeight:"260px", overflowY:"auto" }}>
                  {admin.tasks.map(t => (
                    <div key={t.id} className="task-row" onClick={() => toggleTask(t.id)}
                      style={{ display:"flex", alignItems:"center", gap:"10px", padding:"8px 10px", borderRadius:"8px", cursor:"pointer", transition:"all 0.15s" }}>
                      <div style={{ width:"16px", height:"16px", borderRadius:"4px", border:`1px solid ${t.done?"rgba(134,239,172,0.5)":BR}`, background:t.done?"rgba(134,239,172,0.1)":"transparent", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, fontSize:"10px", color:"#86efac" }}>
                        {t.done ? "✓" : ""}
                      </div>
                      <span style={{ fontSize:"12px", color:t.done?"rgba(245,239,230,0.3)":CR, textDecoration:t.done?"line-through":"none", flex:1 }}>{t.text}</span>
                      <span style={{ fontSize:"9px", padding:"2px 7px", borderRadius:"10px", background:t.priority==="high"?"rgba(252,165,165,0.1)":t.priority==="medium"?"rgba(252,211,77,0.08)":"rgba(147,197,253,0.08)", color:t.priority==="high"?"#fca5a5":t.priority==="medium"?"#fcd34d":"#93c5fd", border:`1px solid ${t.priority==="high"?"rgba(252,165,165,0.2)":t.priority==="medium"?"rgba(252,211,77,0.15)":"rgba(147,197,253,0.15)"}` }}>
                        {t.priority}
                      </span>
                    </div>
                  ))}
                </div>
                <div style={{ display:"flex", gap:"8px", marginTop:"12px" }}>
                  <input value={newTask} onChange={e => setNewTask(e.target.value)} onKeyDown={e => e.key==="Enter" && addTask()}
                    placeholder="Add new task..." style={{ ...inputStyle, fontSize:"12px", flex:1 }}/>
                  <button onClick={addTask} style={{ padding:"8px 14px", background:`rgba(201,164,76,0.12)`, border:`1px solid ${BR}`, borderRadius:"8px", color:G, cursor:"pointer", fontSize:"12px" }}>+</button>
                </div>
              </div>

              {/* Campaigns */}
              <div style={{ background:"rgba(255,255,255,0.022)", border:`1px solid ${BR}`, borderRadius:"16px", padding:"20px" }}>
                <div style={{ fontSize:"11px", color:MU, letterSpacing:"1.5px", marginBottom:"16px" }}>PLANNED CAMPAIGNS</div>
                <div style={{ display:"flex", flexDirection:"column", gap:"10px" }}>
                  {admin.campaigns.map((c, i) => (
                    <div key={i} style={{ background:"rgba(255,255,255,0.02)", border:`1px solid rgba(201,164,76,0.08)`, borderRadius:"10px", padding:"12px 14px" }}>
                      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"4px" }}>
                        <div style={{ fontSize:"13px", fontWeight:"500", color:CR }}>{c.name}</div>
                        <span style={{ fontSize:"9px", padding:"2px 8px", borderRadius:"10px", background:c.status==="Planning"?"rgba(252,211,77,0.1)":"rgba(147,197,253,0.1)", color:c.status==="Planning"?"#fcd34d":"#93c5fd", border:`1px solid ${c.status==="Planning"?"rgba(252,211,77,0.2)":"rgba(147,197,253,0.2)"}` }}>
                          {c.status}
                        </span>
                      </div>
                      <div style={{ fontSize:"11px", color:MU }}>{c.platform}</div>
                      {c.notes && <div style={{ fontSize:"11px", color:"rgba(245,239,230,0.25)", marginTop:"4px" }}>{c.notes}</div>}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick AI */}
            <div style={{ background:"rgba(255,255,255,0.018)", border:`1px solid ${BR}`, borderRadius:"16px", padding:"20px" }}>
              <div style={{ fontSize:"11px", color:MU, letterSpacing:"1.5px", marginBottom:"14px" }}>QUICK AI ACTIONS</div>
              <div style={{ display:"flex", flexWrap:"wrap", gap:"8px" }}>
                {[
                  ["What's my best launch strategy?", "ceo"],
                  ["Write Instagram bio for AS KHUSHBOO", "social"],
                  ["Recommend pricing for all products", "sales"],
                  ["30-day content calendar banao", "social"],
                  ["Shahkaar ka launch caption likho", "marketing"],
                  ["Stock management plan do", "inventory"],
                ].map(([q, mod], i) => (
                  <button key={i} className="qbtn" onClick={() => { setTab("ai"); setAiMod(mod); setTimeout(() => sendAI(q), 150); }}
                    style={{ padding:"8px 14px", background:"rgba(255,255,255,0.025)", border:`1px solid ${BR}`, borderRadius:"20px", color:MU, cursor:"pointer", fontFamily:"'DM Sans',sans-serif", fontSize:"12px", transition:"all 0.2s" }}>
                    {q}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════ */}
        {/* PRODUCTS */}
        {/* ══════════════════════════════════════ */}
        {tab === "products" && (
          <div style={{ animation:"fadeUp 0.3s ease" }}>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(320px,1fr))", gap:"16px" }}>
              {admin.products.map(p => (
                <div key={p.id} className="prod-card" style={{ background:"rgba(255,255,255,0.022)", border:`1px solid ${BR}`, borderRadius:"20px", padding:"24px", transition:"all 0.3s", cursor:"default" }}>
                  {/* Header */}
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"18px" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:"12px" }}>
                      <div style={{ width:"46px", height:"46px", borderRadius:"12px", background:`${p.color}18`, border:`1px solid ${p.color}35`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"22px" }}>
                        {p.emoji}
                      </div>
                      <div>
                        <div style={{ fontFamily:"'Cinzel',serif", fontSize:"16px", fontWeight:"700", color:CR, letterSpacing:"1px" }}>{p.name}</div>
                        <div style={{ fontFamily:"'Noto Nastaliq Urdu',serif", fontSize:"13px", color:G, direction:"rtl" }}>{p.urdu}</div>
                      </div>
                    </div>
                    <div style={{ textAlign:"right" }}>
                      <div style={{ fontSize:"9px", padding:"3px 9px", borderRadius:"20px", background:p.gender==="Men"?"rgba(96,165,250,0.1)":p.gender==="Women"?"rgba(249,168,212,0.1)":"rgba(167,139,250,0.1)", color:p.gender==="Men"?"#60a5fa":p.gender==="Women"?"#f9a8d4":"#a78bfa", border:`1px solid ${p.gender==="Men"?"rgba(96,165,250,0.2)":p.gender==="Women"?"rgba(249,168,212,0.2)":"rgba(167,139,250,0.2)"}` }}>
                        {p.gender}
                      </div>
                    </div>
                  </div>

                  {/* Story */}
                  <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"13px", color:"rgba(245,239,230,0.45)", fontStyle:"italic", marginBottom:"14px", lineHeight:"1.6" }}>
                    "{p.story}"
                  </div>

                  {/* Notes */}
                  <div style={{ display:"flex", flexDirection:"column", gap:"5px", marginBottom:"14px" }}>
                    {[["Top", p.top], ["Heart", p.heart], ["Base", p.base]].map(([l,v]) => (
                      <div key={l} style={{ display:"flex", gap:"8px", fontSize:"11px" }}>
                        <span style={{ color:MU, minWidth:"36px" }}>{l}:</span>
                        <span style={{ color:CR, opacity:0.65 }}>{v}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tags */}
                  <div style={{ display:"flex", gap:"6px", flexWrap:"wrap", marginBottom:"16px" }}>
                    {[p.occasion, p.season].map((tag, i) => (
                      <span key={i} style={{ fontSize:"10px", padding:"3px 9px", background:"rgba(255,255,255,0.03)", border:`1px solid rgba(255,255,255,0.07)`, borderRadius:"20px", color:MU }}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Price & Stock */}
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:"10px", padding:"14px", background:"rgba(255,255,255,0.02)", borderRadius:"10px", marginBottom:"14px" }}>
                    <div>
                      <div style={{ fontSize:"9px", color:MU, marginBottom:"4px" }}>PRICE (EST.)</div>
                      <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"14px", color:G, fontWeight:"600" }}>{fmtRange(p.priceMin, p.priceMax)}</div>
                    </div>
                    <div>
                      <div style={{ fontSize:"9px", color:MU, marginBottom:"4px" }}>SET PRICE</div>
                      <input type="number" value={p.price||""} onChange={e => updateProduct(p.id,"price",e.target.value)}
                        placeholder="Rs." style={{ width:"100%", background:"rgba(201,164,76,0.06)", border:`1px solid rgba(201,164,76,0.2)`, borderRadius:"6px", padding:"5px 8px", color:G2, fontFamily:"'DM Sans',sans-serif", fontSize:"12px", fontWeight:"600" }}/>
                    </div>
                    <div>
                      <div style={{ fontSize:"9px", color:MU, marginBottom:"4px" }}>STOCK</div>
                      <input type="number" value={p.stock} onChange={e => updateProduct(p.id,"stock",e.target.value)}
                        style={{ width:"100%", background:"rgba(134,239,172,0.04)", border:`1px solid rgba(134,239,172,0.15)`, borderRadius:"6px", padding:"5px 8px", color:"#86efac", fontFamily:"'DM Sans',sans-serif", fontSize:"12px", fontWeight:"600" }}/>
                    </div>
                  </div>

                  {/* Action */}
                  <button onClick={() => { setTab("ai"); setAiMod("marketing"); setTimeout(() => sendAI(`Write a compelling Instagram launch post for ${p.name} — ${p.gender}'s fragrance with ${p.top} top notes. Make it luxury, emotional, and Pakistani audience focused.`), 150); }}
                    style={{ width:"100%", padding:"10px", background:`rgba(201,164,76,0.07)`, border:`1px solid rgba(201,164,76,0.2)`, borderRadius:"10px", color:G, cursor:"pointer", fontFamily:"'DM Sans',sans-serif", fontSize:"12px", transition:"all 0.2s" }}>
                    ✦ Generate Launch Content
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════ */}
        {/* AI BRAIN */}
        {/* ══════════════════════════════════════ */}
        {tab === "ai" && (
          <div style={{ animation:"fadeUp 0.3s ease" }}>
            {/* Module Grid */}
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"10px", marginBottom:"20px" }}>
              {Object.entries(AI_MODULES).map(([k, m]) => (
                <button key={k} className="mod-btn" onClick={() => { setAiMod(k); setMsgs([]); }}
                  style={{ padding:"14px 10px", background:aiMod===k?"rgba(201,164,76,0.08)":"rgba(255,255,255,0.018)", border:`1px solid ${aiMod===k?"rgba(201,164,76,0.38)":BR}`, borderRadius:"12px", color:aiMod===k?m.color:MU, cursor:"pointer", fontFamily:"'DM Sans',sans-serif", fontSize:"11px", fontWeight:aiMod===k?"600":"400", transition:"all 0.2s", textAlign:"center" }}>
                  <div style={{ fontSize:"20px", marginBottom:"5px" }}>{m.icon}</div>
                  <div style={{ fontWeight:"600" }}>{m.title.replace(" AI","")}</div>
                  <div style={{ fontSize:"9px", opacity:0.6, marginTop:"2px" }}>AI</div>
                </button>
              ))}
            </div>

            {/* Active info */}
            <div style={{ background:"rgba(255,255,255,0.018)", border:`1px solid ${BR}`, borderRadius:"12px", padding:"12px 18px", marginBottom:"14px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
                <span style={{ fontSize:"18px" }}>{AI_MODULES[aiMod].icon}</span>
                <div>
                  <div style={{ fontSize:"13px", fontWeight:"600", color:AI_MODULES[aiMod].color }}>{AI_MODULES[aiMod].title}</div>
                  <div style={{ fontSize:"11px", color:MU }}>{AI_MODULES[aiMod].desc}</div>
                </div>
              </div>
              <div style={{ fontSize:"10px", color:MU, background:"rgba(255,255,255,0.03)", padding:"4px 12px", borderRadius:"20px", border:`1px solid ${BR}` }}>
                🌐 Multilingual
              </div>
            </div>

            {/* Chat */}
            <div style={{ background:"rgba(255,255,255,0.016)", border:`1px solid ${BR}`, borderRadius:"16px", padding:"20px", minHeight:"360px", maxHeight:"400px", overflowY:"auto", marginBottom:"12px", display:"flex", flexDirection:"column", gap:"14px" }}>
              {msgs.length === 0 && (
                <div style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:"12px", padding:"20px 0" }}>
                  <div style={{ fontFamily:"'Cinzel',serif", fontSize:"22px", color:MU, textAlign:"center", letterSpacing:"2px" }}>BrandFlow</div>
                  <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"15px", color:"rgba(245,239,230,0.25)", fontStyle:"italic" }}>{AI_MODULES[aiMod].title} ready hai</div>
                  <div style={{ fontSize:"11px", color:"rgba(245,239,230,0.2)", marginBottom:"8px" }}>English · اردو · Roman Urdu · العربية — sab samajhta hai</div>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:"8px", justifyContent:"center" }}>
                    {QUICK_PROMPTS[aiMod].map((q, i) => (
                      <button key={i} className="qbtn" onClick={() => sendAI(q)}
                        style={{ padding:"7px 13px", background:"rgba(255,255,255,0.025)", border:`1px solid ${BR}`, borderRadius:"20px", color:MU, cursor:"pointer", fontFamily:"'DM Sans',sans-serif", fontSize:"11px", transition:"all 0.2s", maxWidth:"280px", textAlign:"center" }}>
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {msgs.map((m, i) => (
                <div key={i} style={{ display:"flex", flexDirection:m.role==="user"?"row-reverse":"row", gap:"10px", alignItems:"flex-start", animation:"fadeUp 0.2s ease" }}>
                  <div style={{ width:"32px", height:"32px", borderRadius:"50%", background:m.role==="user"?"rgba(201,164,76,0.12)":"rgba(255,255,255,0.04)", border:`1px solid ${BR}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"13px", flexShrink:0 }}>
                    {m.role==="user" ? "👤" : AI_MODULES[aiMod].icon}
                  </div>
                  <div style={{ maxWidth:"80%", padding:"12px 16px", background:m.role==="user"?"rgba(201,164,76,0.07)":"rgba(255,255,255,0.025)", border:`1px solid ${m.role==="user"?"rgba(201,164,76,0.18)":BR}`, borderRadius:m.role==="user"?"16px 3px 16px 16px":"3px 16px 16px 16px", fontSize:"13px", lineHeight:"1.7", color:m.role==="user"?G3:CR, whiteSpace:"pre-wrap" }}>
                    {m.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div style={{ display:"flex", gap:"10px", alignItems:"center" }}>
                  <div style={{ width:"32px", height:"32px", borderRadius:"50%", background:"rgba(255,255,255,0.04)", border:`1px solid ${BR}`, display:"flex", alignItems:"center", justifyContent:"center", animation:"spin 1.2s linear infinite", fontSize:"13px" }}>✦</div>
                  <div style={{ fontSize:"12px", color:MU }}>Thinking...</div>
                </div>
              )}
              <div ref={chatEnd}/>
            </div>

            {/* Input */}
            <div style={{ display:"flex", gap:"10px" }}>
              <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key==="Enter" && !e.shiftKey && sendAI()}
                placeholder="English, Roman Urdu, اردو — kuch bhi puchein..."
                style={{ flex:1, background:"rgba(255,255,255,0.03)", border:`1px solid rgba(201,164,76,0.18)`, borderRadius:"12px", padding:"13px 18px", color:CR, fontFamily:"'DM Sans',sans-serif", fontSize:"14px" }}/>
              <button className="send-btn" onClick={() => sendAI()} disabled={loading||!input.trim()}
                style={{ padding:"13px 24px", background:`linear-gradient(135deg,${G},${G2})`, border:"none", borderRadius:"12px", color:"#060504", fontWeight:"700", cursor:loading||!input.trim()?"not-allowed":"pointer", fontSize:"16px", opacity:loading||!input.trim()?0.35:1, transition:"opacity 0.2s" }}>
                ↑
              </button>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════ */}
        {/* ADMIN PANEL */}
        {/* ══════════════════════════════════════ */}
        {tab === "admin" && (
          <div style={{ animation:"fadeUp 0.3s ease" }}>
            {/* Admin Sub-tabs */}
            <div style={{ display:"flex", gap:"4px", background:"rgba(255,255,255,0.015)", border:`1px solid ${BR}`, borderRadius:"12px", padding:"4px", marginBottom:"22px" }}>
              {[["products","Products"],["orders","Orders"],["revenue","Revenue"],["settings","Settings"]].map(([k,l]) => (
                <button key={k} onClick={() => setAdminTab(k)} style={{ flex:1, padding:"9px", background:adminTab===k?"rgba(201,164,76,0.1)":"transparent", border:adminTab===k?`1px solid rgba(201,164,76,0.25)`:"1px solid transparent", borderRadius:"8px", color:adminTab===k?G2:MU, fontFamily:"'DM Sans',sans-serif", fontSize:"11px", cursor:"pointer", transition:"all 0.2s", fontWeight:adminTab===k?"600":"400" }}>
                  {l}
                </button>
              ))}
            </div>

            {/* PRODUCTS ADMIN */}
            {adminTab === "products" && (
              <div>
                <div style={{ fontSize:"12px", color:MU, marginBottom:"14px" }}>Click on price/stock to edit. Changes apply immediately.</div>
                <div style={{ background:"rgba(255,255,255,0.018)", border:`1px solid ${BR}`, borderRadius:"14px", overflow:"hidden" }}>
                  {/* Header row */}
                  <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr 1fr 1fr", gap:"12px", padding:"12px 18px", borderBottom:`1px solid ${BR}`, fontSize:"10px", color:MU, letterSpacing:"1.5px" }}>
                    <div>PRODUCT</div><div>GENDER</div><div>EST. RANGE</div><div>SET PRICE</div><div>COST (EST.)</div><div>STOCK</div>
                  </div>
                  {admin.products.map((p, i) => (
                    <div key={p.id} className="order-row" style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr 1fr 1fr", gap:"12px", padding:"14px 18px", borderBottom:i<admin.products.length-1?`1px solid rgba(201,164,76,0.06)`:"none", transition:"all 0.15s", alignItems:"center" }}>
                      <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
                        <span style={{ fontSize:"16px" }}>{p.emoji}</span>
                        <div>
                          <div style={{ fontFamily:"'Cinzel',serif", fontSize:"13px", color:CR }}>{p.name}</div>
                          <div style={{ fontSize:"10px", color:MU }}>{p.occasion}</div>
                        </div>
                      </div>
                      <div style={{ fontSize:"12px", color:MU }}>{p.gender}</div>
                      <div style={{ fontSize:"11px", color:MU }}>{fmtRange(p.priceMin,p.priceMax)}</div>
                      <div>
                        <input type="number" value={p.price||""} onChange={e => updateProduct(p.id,"price",e.target.value)}
                          placeholder="Set price" style={{ width:"100%", background:"rgba(201,164,76,0.06)", border:`1px solid rgba(201,164,76,0.2)`, borderRadius:"6px", padding:"5px 8px", color:G2, fontFamily:"'DM Sans',sans-serif", fontSize:"12px" }}/>
                      </div>
                      <div style={{ fontSize:"11px", color:MU }}>{fmtRange(p.costMin,p.costMax)}</div>
                      <div>
                        <input type="number" value={p.stock} onChange={e => updateProduct(p.id,"stock",e.target.value)}
                          style={{ width:"80px", background:"rgba(134,239,172,0.05)", border:`1px solid rgba(134,239,172,0.15)`, borderRadius:"6px", padding:"5px 8px", color:"#86efac", fontFamily:"'DM Sans',sans-serif", fontSize:"12px" }}/>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ORDERS ADMIN */}
            {adminTab === "orders" && (
              <div>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"16px" }}>
                  <div style={{ fontSize:"12px", color:MU }}>Track all sales orders here.</div>
                  <button onClick={() => setShowAddOrder(!showAddOrder)}
                    style={{ padding:"9px 18px", background:`rgba(201,164,76,0.1)`, border:`1px solid rgba(201,164,76,0.25)`, borderRadius:"10px", color:G, fontFamily:"'DM Sans',sans-serif", fontSize:"12px", cursor:"pointer" }}>
                    + Add Order
                  </button>
                </div>

                {/* Add Order Form */}
                {showAddOrder && (
                  <div style={{ background:"rgba(255,255,255,0.025)", border:`1px solid rgba(201,164,76,0.2)`, borderRadius:"14px", padding:"20px", marginBottom:"16px" }}>
                    <div style={{ fontSize:"12px", color:G, fontWeight:"600", marginBottom:"14px" }}>New Order Entry</div>
                    <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))", gap:"10px", marginBottom:"12px" }}>
                      <div>
                        <div style={{ fontSize:"10px", color:MU, marginBottom:"5px" }}>PRODUCT</div>
                        <select value={newOrder.product} onChange={e => setNewOrder({...newOrder,product:e.target.value})} style={{ ...inputStyle }}>
                          <option value="">Select...</option>
                          {admin.products.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
                        </select>
                      </div>
                      <div>
                        <div style={{ fontSize:"10px", color:MU, marginBottom:"5px" }}>QUANTITY</div>
                        <input type="number" min="1" value={newOrder.qty} onChange={e => setNewOrder({...newOrder,qty:e.target.value})} style={inputStyle}/>
                      </div>
                      <div>
                        <div style={{ fontSize:"10px", color:MU, marginBottom:"5px" }}>PRICE PER BOTTLE (Rs.)</div>
                        <input type="number" value={newOrder.price} onChange={e => setNewOrder({...newOrder,price:e.target.value})} placeholder="e.g. 2500" style={inputStyle}/>
                      </div>
                      <div>
                        <div style={{ fontSize:"10px", color:MU, marginBottom:"5px" }}>CUSTOMER</div>
                        <input value={newOrder.customer} onChange={e => setNewOrder({...newOrder,customer:e.target.value})} placeholder="Name/Phone" style={inputStyle}/>
                      </div>
                      <div>
                        <div style={{ fontSize:"10px", color:MU, marginBottom:"5px" }}>CHANNEL</div>
                        <select value={newOrder.channel} onChange={e => setNewOrder({...newOrder,channel:e.target.value})} style={inputStyle}>
                          {BRAND.channels.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </div>
                      <div>
                        <div style={{ fontSize:"10px", color:MU, marginBottom:"5px" }}>STATUS</div>
                        <select value={newOrder.status} onChange={e => setNewOrder({...newOrder,status:e.target.value})} style={inputStyle}>
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                        </select>
                      </div>
                    </div>
                    <div style={{ display:"flex", gap:"10px" }}>
                      <button onClick={addOrder} style={{ padding:"10px 22px", background:`linear-gradient(135deg,${G},${G2})`, border:"none", borderRadius:"10px", color:"#060504", fontFamily:"'DM Sans',sans-serif", fontWeight:"700", fontSize:"13px", cursor:"pointer" }}>
                        Save Order
                      </button>
                      <button onClick={() => setShowAddOrder(false)} style={{ padding:"10px 18px", background:"transparent", border:`1px solid ${BR}`, borderRadius:"10px", color:MU, fontFamily:"'DM Sans',sans-serif", fontSize:"13px", cursor:"pointer" }}>
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                {admin.orders.length === 0 ? (
                  <div style={{ textAlign:"center", padding:"60px 0", color:MU, fontSize:"14px" }}>
                    <div style={{ fontSize:"32px", marginBottom:"12px", opacity:0.3 }}>📦</div>
                    <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"20px", marginBottom:"8px" }}>Koi order nahi abhi</div>
                    <div style={{ fontSize:"12px" }}>Jab pehla order aaye, yahan "Add Order" se record karein</div>
                  </div>
                ) : (
                  <div style={{ background:"rgba(255,255,255,0.018)", border:`1px solid ${BR}`, borderRadius:"14px", overflow:"hidden" }}>
                    <div style={{ display:"grid", gridTemplateColumns:"1fr 2fr 1fr 1fr 1fr 1fr", gap:"10px", padding:"12px 18px", borderBottom:`1px solid ${BR}`, fontSize:"10px", color:MU, letterSpacing:"1.2px" }}>
                      <div>ORDER ID</div><div>PRODUCT</div><div>QTY</div><div>AMOUNT</div><div>CHANNEL</div><div>STATUS</div>
                    </div>
                    {admin.orders.map((o, i) => {
                      const sc = { pending:"#fcd34d", confirmed:"#93c5fd", shipped:"#86efac", delivered:"#86efac" };
                      return (
                        <div key={i} className="order-row" style={{ display:"grid", gridTemplateColumns:"1fr 2fr 1fr 1fr 1fr 1fr", gap:"10px", padding:"13px 18px", borderBottom:i<admin.orders.length-1?`1px solid rgba(201,164,76,0.05)`:"none", alignItems:"center", transition:"all 0.15s" }}>
                          <div style={{ fontSize:"11px", color:MU, fontFamily:"'DM Sans',sans-serif" }}>{o.id}</div>
                          <div>
                            <div style={{ fontSize:"13px", color:CR }}>{o.product}</div>
                            <div style={{ fontSize:"10px", color:MU }}>{o.customer} · {o.date}</div>
                          </div>
                          <div style={{ fontSize:"12px", color:CR }}>{o.qty}</div>
                          <div style={{ fontSize:"13px", color:G, fontFamily:"'Cormorant Garamond',serif", fontWeight:"600" }}>Rs. {(Number(o.price)*Number(o.qty)).toLocaleString()}</div>
                          <div style={{ fontSize:"11px", color:MU }}>{o.channel}</div>
                          <div><span style={{ fontSize:"10px", padding:"3px 9px", borderRadius:"10px", background:`rgba(${o.status==="delivered"||o.status==="shipped"?"134,239,172":o.status==="confirmed"?"147,197,253":"252,211,77"},0.1)`, color:sc[o.status], border:`1px solid ${sc[o.status]}33` }}>{o.status}</span></div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* REVENUE ADMIN */}
            {adminTab === "revenue" && (
              <div>
                <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:"14px", marginBottom:"24px" }}>
                  {[
                    { label:"Total Revenue", key:"total", col:G },
                    { label:"This Month", key:"thisMonth", col:"#86efac" },
                    { label:"Last Month", key:"lastMonth", col:"#60a5fa" },
                  ].map(r => (
                    <div key={r.key} style={{ background:"rgba(255,255,255,0.022)", border:`1px solid ${BR}`, borderRadius:"14px", padding:"20px" }}>
                      <div style={{ fontSize:"10px", color:MU, marginBottom:"8px" }}>{r.label.toUpperCase()}</div>
                      <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"30px", color:r.col, fontWeight:"700", marginBottom:"10px" }}>
                        Rs. {(admin.revenue[r.key]||0).toLocaleString()}
                      </div>
                      <input type="number" value={admin.revenue[r.key]||""} onChange={e => setAdmin(a => ({...a, revenue:{...a.revenue,[r.key]:Number(e.target.value)}}))}
                        placeholder="Update..." style={{ ...inputStyle, fontSize:"12px" }}/>
                    </div>
                  ))}
                </div>
                <div style={{ background:"rgba(255,255,255,0.02)", border:`1px solid ${BR}`, borderRadius:"14px", padding:"20px" }}>
                  <div style={{ fontSize:"11px", color:MU, marginBottom:"12px" }}>REVENUE NOTES</div>
                  <textarea value={admin.notes} onChange={e => setAdmin(a => ({...a,notes:e.target.value}))}
                    placeholder="Revenue notes, payment records, anything you want to track..."
                    rows={5} style={{ ...inputStyle, resize:"none", lineHeight:"1.6" }}/>
                </div>
              </div>
            )}

            {/* SETTINGS */}
            {adminTab === "settings" && (
              <div style={{ display:"flex", flexDirection:"column", gap:"16px" }}>
                <div style={{ background:"rgba(255,255,255,0.022)", border:`1px solid ${BR}`, borderRadius:"14px", padding:"24px" }}>
                  <div style={{ fontSize:"13px", fontWeight:"600", color:G, marginBottom:"16px" }}>Brand Settings</div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"14px" }}>
                    <div>
                      <div style={{ fontSize:"10px", color:MU, marginBottom:"5px" }}>LAUNCH DATE (PLANNED)</div>
                      <input type="date" value={admin.launchDate} onChange={e => setAdmin(a => ({...a,launchDate:e.target.value}))} style={inputStyle}/>
                    </div>
                    <div>
                      <div style={{ fontSize:"10px", color:MU, marginBottom:"5px" }}>INITIAL INVESTMENT (Rs.)</div>
                      <input type="number" value={admin.budget} onChange={e => setAdmin(a => ({...a,budget:e.target.value}))} placeholder="Total investment amount" style={inputStyle}/>
                    </div>
                  </div>
                </div>

                <div style={{ background:"rgba(255,255,255,0.022)", border:`1px solid ${BR}`, borderRadius:"14px", padding:"24px" }}>
                  <div style={{ fontSize:"13px", fontWeight:"600", color:G, marginBottom:"14px" }}>Brand Summary</div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"10px" }}>
                    {[
                      ["Brand Name", BRAND.name],
                      ["Status", "Pre-Launch"],
                      ["City", "Karachi, Pakistan"],
                      ["Products", "6 Fragrances"],
                      ["Total Stock", "300 Bottles"],
                      ["Channels", BRAND.channels.join(", ")],
                      ["Social Media", BRAND.socialPlatforms.join(", ")],
                      ["Investment", admin.budget ? `Rs. ${Number(admin.budget).toLocaleString()}` : "Not set"],
                    ].map(([k,v]) => (
                      <div key={k} style={{ padding:"10px 14px", background:"rgba(255,255,255,0.02)", borderRadius:"8px" }}>
                        <div style={{ fontSize:"10px", color:MU, marginBottom:"3px" }}>{k}</div>
                        <div style={{ fontSize:"13px", color:CR }}>{v}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ background:"rgba(252,165,165,0.04)", border:"1px solid rgba(252,165,165,0.15)", borderRadius:"14px", padding:"20px" }}>
                  <div style={{ fontSize:"12px", color:"#fca5a5", fontWeight:"600", marginBottom:"8px" }}>⚠ Important Note</div>
                  <div style={{ fontSize:"12px", color:"rgba(245,239,230,0.5)", lineHeight:"1.6" }}>
                    Data abhi browser memory mein hai — page refresh hone par reset ho jaayega. Permanent storage ke liye software ko Vercel par deploy karein aur database add karein.
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
