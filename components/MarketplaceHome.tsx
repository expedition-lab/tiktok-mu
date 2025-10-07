'use client';
import { useMemo, useState } from 'react';

type Creator = {
  id: number;
  name: string;
  avatar: string;
  location: string;
  followers: number;
  engagement: number;
  views: number;
  price: number;
  category: 'lifestyle'|'fashion'|'food'|'tech'|'fitness';
  badges?: string[];
};

const CREATORS: Creator[] = [
  { id:1, name:"Maya Lifestyle", avatar:"ML", location:"Port Louis", followers:125000, engagement:7.1, views:15000, price:5000, category:"lifestyle", badges:['Top Rated','Fast Responder'] },
  { id:2, name:"Tech Curepipe", avatar:"TC", location:"Curepipe", followers:89000, engagement:5.8, views:12000, price:3500, category:"tech", badges:['Trending','New Talent'] },
  { id:3, name:"Beach Flic", avatar:"BF", location:"Flic-en-Flac", followers:156000, engagement:6.2, views:18000, price:7500, category:"lifestyle", badges:['Island Pro','Top Rated'] },
  { id:4, name:"Fashion Forward", avatar:"FF", location:"Grand Baie", followers:203000, engagement:8.4, views:25000, price:12000, category:"fashion" },
  { id:5, name:"Foodie Mauritius", avatar:"FM", location:"Quatre Bornes", followers:95000, engagement:9.1, views:14000, price:4500, category:"food" },
  { id:6, name:"Fitness Island", avatar:"FI", location:"Port Louis", followers:78000, engagement:6.7, views:11000, price:3000, category:"fitness" },
];

const formatK = (n:number) => n >= 1000 ? (n/1000).toFixed(n%1000?1:0)+'k' : String(n);

export default function MarketplaceHome() {
  const [query, setQuery] = useState('');
  const [loc, setLoc] = useState('');
  const [minEng, setMinEng] = useState('');
  const [budget, setBudget] = useState('');
  const [cat, setCat] = useState('');
  const [sort, setSort] = useState('relevance');

  const list = useMemo(() => {
    let arr = [...CREATORS];
    const q = query.trim().toLowerCase();
    if (q) arr = arr.filter(c =>
      c.name.toLowerCase().includes(q) ||
      c.category.toLowerCase().includes(q) ||
      c.location.toLowerCase().includes(q)
    );
    if (loc) arr = arr.filter(c => c.location === loc);
    if (minEng) arr = arr.filter(c => c.engagement >= parseFloat(minEng));
    if (budget) {
      if (budget.includes('-')) {
        const [a,b] = budget.split('-').map(Number);
        arr = arr.filter(c => c.price >= a && c.price <= b);
      } else if (budget === '50000+') {
        arr = arr.filter(c => c.price >= 50000);
      }
    }
    if (cat) arr = arr.filter(c => c.category === cat);
    switch (sort) {
      case 'followers': arr.sort((a,b) => b.followers - a.followers); break;
      case 'engagement': arr.sort((a,b) => b.engagement - a.engagement); break;
      case 'price': arr.sort((a,b) => a.price - b.price); break;
    }
    return arr;
  }, [query, loc, minEng, budget, cat, sort]);

  return (
    <div className="mpx">
      <section className="hero">
        <div className="container hero-inner">
          <div className="kicker">Creator Marketplace • Mauritius</div>
          <div className="h1">Hire TikTok creators in minutes</div>
          <p className="sub">Search, book, and pay creators for LIVE promos, shoutouts, and collabs. Instant scheduling. Escrow-protected payouts.</p>
          <div className="hero-cta">
            <a className="btn btn-pri" href="#creators">Find Creators</a>
            <a className="btn" href="/signup">Join Now</a>
          </div>
          <div className="chiprow">
            <span className="pill">15–20% commission</span>
            <span className="pill">Juice • MyT • Card</span>
            <span className="pill">Gift → MUR tracker</span>
            <span className="pill">Verified Creators</span>
          </div>
          <div className="metrics container" style={{paddingTop:18}}>
            <div className="kpi"><div className="val">500+</div><div className="lab">Active Creators</div></div>
            <div className="kpi"><div className="val">15M+</div><div className="lab">Total Reach</div></div>
            <div className="kpi"><div className="val">Rs 2.5M</div><div className="lab">Paid to Creators</div></div>
            <div className="kpi"><div className="val">96%</div><div className="lab">Success Rate</div></div>
          </div>
        </div>
      </section>

      <main className="container">
        <section className="filters" style={{marginTop:22}}>
          <div className="filters-top">
            <div className="search">
              <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search creators by name or keyword…" />
            </div>
            <button className="btn" onClick={()=>{
              setQuery(''); setLoc(''); setMinEng(''); setBudget(''); setCat(''); setSort('relevance');
            }}>Clear Filters</button>
          </div>
          <div className="filter-row">
            <select value={loc} onChange={e=>setLoc(e.target.value)}>
              <option value="">All Locations</option>
              <option>Port Louis</option><option>Curepipe</option><option>Flic-en-Flac</option><option>Grand Baie</option><option>Quatre Bornes</option>
            </select>
            <select value={minEng} onChange={e=>setMinEng(e.target.value)}>
              <option value="">Min Engagement</option>
              <option value="1">1%+</option><option value="3">3%+</option><option value="5">5%+</option><option value="8">8%+</option>
            </select>
            <select value={budget} onChange={e=>setBudget(e.target.value)}>
              <option value="">Budget (Rs)</option>
              <option value="0-5000">0–5,000</option><option value="5000-15000">5,000–15,000</option><option value="15000-50000">15,000–50,000</option><option value="50000+">50,000+</option>
            </select>
            <select value={cat} onChange={e=>setCat(e.target.value)}>
              <option value="">Category</option>
              <option value="lifestyle">Lifestyle</option><option value="fashion">Fashion</option><option value="food">Food & Travel</option><option value="tech">Tech</option><option value="fitness">Fitness</option>
            </select>
            <select value={sort} onChange={e=>setSort(e.target.value)}>
              <option value="relevance">Sort: Relevance</option>
              <option value="followers">Followers ↓</option>
              <option value="engagement">Engagement ↓</option>
              <option value="price">Price ↑</option>
            </select>
          </div>
        </section>

        <section id="creators" className="grid" aria-live="polite">
          {list.map(c=>(
            <article key={c.id} className="card">
              <div className="hdr">
                {c.badges && (
                  <div className="badgewrap">
                    {c.badges.map(b=><span className="badge" key={b}>{b}</span>)}
                  </div>
                )}
                <div className="av">{c.avatar}</div>
              </div>
              <div className="body">
                <div className="nm">{c.name}</div>
                <div className="loc">📍 {c.location}</div>
                <div className="stats">
                  <div className="stat"><div className="v">{formatK(c.followers)}</div><div>Followers</div></div>
                  <div className="stat"><div className="v">{c.engagement}%</div><div>Engagement</div></div>
                  <div className="stat"><div className="v">{formatK(c.views)}</div><div>Avg Views</div></div>
                </div>
                <span className="price">From Rs {c.price.toLocaleString()}</span>
                <div className="actions">
                  <button className="ghost">Message</button>
                  <button className="solid">Book</button>
                </div>
              </div>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}
