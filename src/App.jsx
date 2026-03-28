import { useState, useEffect, useRef } from "react";

const themes = {
  dark: {
    bg: "#050505", card: "#0C0C0C", border: "#1A1A1A",
    gold: "#D4A843", goldLight: "#F0D78C", goldDim: "rgba(212,168,67,0.12)", goldGlow: "rgba(212,168,67,0.06)",
    text: "#F7F2E9", gray: "#8A847A", grayLight: "#B5AFA5", scripture: "#A89D8F",
    navBg: "rgba(5,5,5,0.93)", grain: 0.02,
  },
  light: {
    bg: "#FAF8F4", card: "#FFFFFF", border: "#E8E2D8",
    gold: "#B8922A", goldLight: "#8B6914", goldDim: "rgba(184,146,42,0.08)", goldGlow: "rgba(184,146,42,0.04)",
    text: "#1A1714", gray: "#5C574E", grayLight: "#7A756C", scripture: "#4A4438",
    navBg: "rgba(250,248,244,0.93)", grain: 0.01,
  },
};

function useInView(th=0.1){const r=useRef(null);const[v,setV]=useState(false);useEffect(()=>{const e=r.current;if(!e)return;const o=new IntersectionObserver(([x])=>{if(x.isIntersecting)setV(true)},{threshold:th});o.observe(e);return()=>o.disconnect()},[th]);return[r,v]}
function useMouseGlow(r){const[p,setP]=useState({x:0,y:0,active:false});useEffect(()=>{const e=r.current;if(!e)return;const m=(ev)=>{const b=e.getBoundingClientRect();setP({x:ev.clientX-b.left,y:ev.clientY-b.top,active:true})};const l=()=>setP(x=>({...x,active:false}));e.addEventListener("mousemove",m);e.addEventListener("mouseleave",l);return()=>{e.removeEventListener("mousemove",m);e.removeEventListener("mouseleave",l)}},[r]);return p}
function useTyper(p,s=65,d=30,w=2200){const[t,setT]=useState("");const[i,setI]=useState(0);const[dl,setD]=useState(false);useEffect(()=>{const c=p[i];let tm;if(!dl&&t===c)tm=setTimeout(()=>setD(true),w);else if(dl&&t===""){setD(false);setI(x=>(x+1)%p.length)}else if(dl)tm=setTimeout(()=>setT(x=>x.slice(0,-1)),d);else tm=setTimeout(()=>setT(c.slice(0,t.length+1)),s);return()=>clearTimeout(tm)},[t,i,dl]);return t}
function useCountUp(target,dur=1600,start=false){const[v,setV]=useState(0);useEffect(()=>{if(!start)return;let s;const a=(ts)=>{if(!s)s=ts;const p=Math.min((ts-s)/dur,1);setV(Math.floor((1-Math.pow(1-p,3))*target));if(p<1)requestAnimationFrame(a)};requestAnimationFrame(a)},[start,target,dur]);return v}
function Carousel({children,bg,gold}){const sr=useRef(null);const[cl,setCl]=useState(false);const[cr,setCr]=useState(true);const check=()=>{const e=sr.current;if(!e)return;setCl(e.scrollLeft>10);setCr(e.scrollLeft<e.scrollWidth-e.clientWidth-10)};useEffect(()=>{const e=sr.current;check();if(e){e.addEventListener('scroll',check,{passive:true});return()=>e.removeEventListener('scroll',check)}},[]);return <div style={{position:"relative"}}>{cl&&<div style={{position:"absolute",left:0,top:0,bottom:0,width:40,background:`linear-gradient(to right, ${bg}, transparent)`,zIndex:5,pointerEvents:"none"}}/>}{cr&&<div style={{position:"absolute",right:0,top:0,bottom:0,width:40,background:`linear-gradient(to left, ${bg}, transparent)`,zIndex:5,pointerEvents:"none"}}/>}{cl&&<button onClick={()=>sr.current?.scrollBy({left:-280,behavior:"smooth"})} style={{position:"absolute",left:4,top:"50%",transform:"translateY(-50%)",zIndex:10,width:32,height:32,borderRadius:"50%",background:`${gold}15`,border:`1px solid ${gold}30`,color:gold,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14}}>←</button>}{cr&&<button onClick={()=>sr.current?.scrollBy({left:280,behavior:"smooth"})} style={{position:"absolute",right:4,top:"50%",transform:"translateY(-50%)",zIndex:10,width:32,height:32,borderRadius:"50%",background:`${gold}15`,border:`1px solid ${gold}30`,color:gold,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14}}>→</button>}<div ref={sr} style={{display:"flex",gap:14,overflowX:"auto",scrollSnapType:"x mandatory",WebkitOverflowScrolling:"touch",scrollbarWidth:"none",msOverflowStyle:"none",padding:"4px 2px 12px"}}>{children}</div></div>}

const divisions=[
  {name:"Pejji",tag:"Web Agency",desc:"Digital presence for Nigerian SMEs powering Africa's largest economy.",icon:"🌍",accent:"#4ECDC4"},
  {name:"Securva",tag:"Cybersecurity SaaS",desc:"Threat detection and security infrastructure for the modern attack surface.",icon:"🛡️",accent:"#7B68EE"},
  {name:"Utility Vault",tag:"Digital Products",desc:"Templates, SOPs, and tools. Systems packaged for builders who move fast.",icon:"⚡",accent:"#FFB347"},
  {name:"CyberArmor",tag:"Web3 Security",desc:"Smart contract audits, DeFi breakdowns, and Web3 threat intelligence.",icon:"🔐",accent:"#FF6B6B"},
];
const journey=[{phase:"NOW",label:"The Foundation"},{phase:"Q2/Q3",label:"First Revenue"},{phase:"Q4+",label:"Systems Running"},{phase:"VISION",label:"Remote Operator"}];
const socials=[
  {name:"YouTube",type:"youtube",url:"https://youtube.com/@babakizo1?si=eAgJFOS8qCu0wIcR",color:"#FF0000",handle:"Vlogs, builds, monthly reports"},
  {name:"X (Twitter)",type:"x",url:"https://x.com/_babakizo?s=21",color:"#888",handle:"Threads, intel drops, daily logs"},
  {name:"Instagram",type:"instagram",url:"https://www.instagram.com/_babakizo?igsh=MWUwb2c4ZWM3anM0cw%3D%3D&utm_source=qr",color:"#E1306C",handle:"Reels, carousels, BTS"},
  {name:"LinkedIn",type:"linkedin",url:"https://www.linkedin.com/in/kingsley-olukanni-572420196?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",color:"#0A66C2",handle:"Professional narrative"},
  {name:"TikTok",type:"tiktok",url:"https://www.tiktok.com/@_babakizo?_r=1&_t=ZS-954XJXdRYJk",color:"#00C8C8",handle:"Short-form, discipline"},
  {name:"Snapchat",type:"snapchat",url:"https://snapchat.com/t/vmQWYqUY",color:"#CCCC00",handle:"Day-in-the-life, raw"},
  {name:"GitHub",type:"github",url:"https://github.com/babakizo420",color:"#999",handle:"Code, repos, build logs"},
  {name:"Gumroad",type:"gumroad",url:"#",color:"#FF90E8",handle:"Templates, digital products"},
];
const contentItems=[];
const projects=[
  {name:"babakizo.com",desc:"Personal brand HQ with animated mesh, scroll reveals, 3D elements.",tech:["React","Three.js"],status:"Live",accent:"#D4A843"},
  {name:"BlessedOps Group",desc:"Holding company site connecting all four divisions.",tech:["React","Next.js"],status:"Building",accent:"#4ECDC4"},
  {name:"Pejji Template System",desc:"Reusable web templates for Nigerian SMEs. Mobile-first.",tech:["React","Tailwind"],status:"Building",accent:"#7B68EE"},
  {name:"Securva Dashboard",desc:"Threat monitoring MVP. Real-time alerts, clean data viz.",tech:["React","D3"],status:"Designing",accent:"#FF6B6B"},
  {name:"Utility Vault SOP Pack",desc:"First digital product. Business SOPs on Gumroad.",tech:["Notion","Gumroad"],status:"Building",accent:"#FFB347"},
  {name:"YT Intro Animation",desc:"3D cross-shield emblem with cinematic particle effects.",tech:["Three.js","Canvas"],status:"Complete",accent:"#D4A843"},
];

const sp={
  youtube:<><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.13C5.12 19.56 12 19.56 12 19.56s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.43z"/><polygon points="9.75,15.02 15.5,11.75 9.75,8.48" fill="currentColor" stroke="none"/></>,
  instagram:<><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></>,
  linkedin:<><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></>,
  tiktok:<><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></>,
  snapchat:<><path d="M12 2C6.48 2 2 6.48 2 12c0 2.05.62 3.95 1.68 5.53-.1.43-.4 1.2-1.18 1.97 0 0 2.28.2 3.5-.7C7.68 19.56 9.74 20 12 20c5.52 0 10-4.48 10-10S17.52 2 12 2z"/></>,
  github:<><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></>,
  gumroad:<><circle cx="12" cy="12" r="10"/><path d="M8 12l2.5 2.5L16 9"/></>,
};
function SI({type,size=18,color}){
  if(type==="x")return <svg width={size} height={size} viewBox="0 0 24 24" fill={color||"currentColor"}><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>;
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color||"currentColor"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">{sp[type]}</svg>;
}

export default function BabakizoV5Final(){
  const typed=useTyper(["Cybersecurity Operator.","Systems Architect.","Faith-Driven Founder.","CAF Reservist.","Building from the Margins.","Documenting Everything."]);
  const[heroVis,setHeroVis]=useState(false);
  const[scrollY,setScrollY]=useState(0);
  const[menuOpen,setMenuOpen]=useState(false);
  const[dark,setDark]=useState(true);
  const T=dark?themes.dark:themes.light;
  const[storyRef,storyIn]=useInView(0.08);
  const[divRef,divIn]=useInView(0.05);
  const[workRef,workIn]=useInView(0.05);
  const[socialRef,socialIn]=useInView(0.08);
  const[footRef,footIn]=useInView(0.08);
  const[statsRef,statsIn]=useInView(0.1);

  useEffect(()=>{setTimeout(()=>setHeroVis(true),300);const s=()=>setScrollY(window.scrollY);window.addEventListener("scroll",s,{passive:true});return()=>window.removeEventListener("scroll",s)},[]);
  const scrollTo=(id)=>{setMenuOpen(false);document.getElementById(id)?.scrollIntoView({behavior:"smooth",block:"start"})};

  // Inline sub-components that need T
  const CrossIcon=({size=16,color})=><svg width={size} height={size} viewBox="0 0 24 28" fill="none" stroke={color||T.gold} strokeWidth="1.5"><line x1="12" y1="1" x2="12" y2="27"/><line x1="4" y1="9" x2="20" y2="9"/></svg>;

  return(
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600;700&display=swap');
        *{margin:0;padding:0;box-sizing:border-box}html{scroll-behavior:smooth}body{overflow-x:hidden}
        @keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(.7)}}
        @keyframes cursorBlink{0%,100%{opacity:1}50%{opacity:0}}
        @keyframes breathe{0%,100%{transform:scale(1);opacity:.4}50%{transform:scale(1.05);opacity:.65}}
        @keyframes floatSlow{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
        @keyframes grain{0%,100%{transform:translate(0,0)}10%{transform:translate(-3%,-8%)}50%{transform:translate(8%,6%)}90%{transform:translate(-1%,5%)}}
        @keyframes glowPulse{0%,100%{box-shadow:0 0 25px rgba(212,168,67,0.04)}50%{box-shadow:0 0 50px rgba(212,168,67,0.1)}}
        ::selection{background:rgba(212,168,67,0.3);color:#F7F2E9}
      `}</style>

      <div style={{backgroundColor:T.bg,minHeight:"100vh",color:T.text,fontFamily:"'DM Sans', sans-serif",transition:"background-color 0.4s, color 0.4s"}}>
        <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:999,opacity:T.grain,background:`url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,animation:"grain 5s steps(6) infinite"}}/>

        {/* NAV */}
        <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:100,padding:"12px 20px",background:T.navBg,backdropFilter:"blur(20px)",borderBottom:`1px solid ${scrollY>50?T.border:"transparent"}`,transition:"all 0.4s"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div style={{display:"flex",alignItems:"center",gap:7}}>
              <CrossIcon size={13}/>
              <span style={{fontFamily:"'Cormorant Garamond', serif",fontSize:15,fontWeight:700,color:T.text,letterSpacing:2}}>BABAKIZO</span>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <button onClick={()=>setDark(!dark)} style={{width:36,height:36,borderRadius:"50%",background:`${T.gold}12`,border:`1px solid ${T.gold}30`,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.3s"}}>
                {dark?<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={T.gold} strokeWidth="1.5" strokeLinecap="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
                  :<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={T.gold} strokeWidth="1.5" strokeLinecap="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>}
              </button>
              <button onClick={()=>setMenuOpen(!menuOpen)} style={{background:"none",border:"none",cursor:"pointer",padding:6,display:"flex",flexDirection:"column",gap:4}}>
                <div style={{width:18,height:1.5,backgroundColor:T.gold,borderRadius:1,transition:"all 0.3s",transform:menuOpen?"rotate(45deg) translateY(5.5px)":"none"}}/>
                <div style={{width:18,height:1.5,backgroundColor:T.gold,borderRadius:1,transition:"all 0.3s",opacity:menuOpen?0:1}}/>
                <div style={{width:menuOpen?18:12,height:1.5,backgroundColor:T.gold,borderRadius:1,transition:"all 0.3s",transform:menuOpen?"rotate(-45deg) translateY(-5.5px)":"none"}}/>
              </button>
            </div>
          </div>
          <div style={{maxHeight:menuOpen?260:0,overflow:"hidden",transition:"max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1)"}}>
            <div style={{display:"flex",flexDirection:"column",gap:2,paddingTop:14,paddingBottom:6}}>
              {[["Story","story"],["Building","building"],["Work","work"],["Connect","connect"]].map(([l,id],i)=>
                <button key={l} onClick={()=>scrollTo(id)} style={{fontFamily:"'IBM Plex Mono', monospace",fontSize:11,fontWeight:500,color:T.gray,letterSpacing:2,textTransform:"uppercase",background:"none",border:"none",cursor:"pointer",padding:"9px 0",textAlign:"left",opacity:menuOpen?1:0,transform:menuOpen?"translateX(0)":"translateX(-8px)",transition:`all 0.3s ease ${i*0.05}s`}}>{l}</button>
              )}
            </div>
          </div>
        </nav>

        {/* HERO */}
        <section style={{minHeight:"100vh",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",position:"relative",padding:"130px 24px 70px",textAlign:"center",overflow:"hidden"}}>
          <div style={{position:"absolute",top:"20%",left:"50%",transform:"translate(-50%,-50%)",width:500,height:500,borderRadius:"50%",background:`radial-gradient(circle, ${T.goldDim} 0%, transparent 60%)`,pointerEvents:"none",animation:"breathe 8s ease infinite"}}/>
          <div style={{opacity:heroVis?1:0,transform:heroVis?"translateY(0)":"translateY(16px)",transition:"all 1.1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s",display:"flex",alignItems:"center",gap:14,marginBottom:32}}>
            <div style={{width:40,height:2,background:`linear-gradient(to right, transparent, ${T.gold})`}}/>
            <span style={{fontFamily:"'IBM Plex Mono', monospace",fontSize:12,color:T.gold,letterSpacing:5,textTransform:"uppercase",fontWeight:700}}>Operator&nbsp;&nbsp;·&nbsp;&nbsp;Builder&nbsp;&nbsp;·&nbsp;&nbsp;Believer</span>
            <div style={{width:40,height:2,background:`linear-gradient(to left, transparent, ${T.gold})`}}/>
          </div>
          <h1 style={{fontFamily:"'Cormorant Garamond', serif",fontSize:"clamp(44px, 10vw, 86px)",fontWeight:700,color:T.text,lineHeight:0.95,marginBottom:6,opacity:heroVis?1:0,transform:heroVis?"translateY(0)":"translateY(30px)",transition:"all 1.1s cubic-bezier(0.16, 1, 0.3, 1) 0.4s",letterSpacing:-1}}>BABAKIZO</h1>
          <p style={{fontFamily:"'IBM Plex Mono', monospace",fontSize:11,color:T.gray,letterSpacing:6,textTransform:"uppercase",marginBottom:28,opacity:heroVis?1:0,transition:"opacity 1s ease 0.7s"}}>BlessedOps Group</p>
          <div style={{height:26,display:"flex",alignItems:"center",marginBottom:36,opacity:heroVis?1:0,transition:"opacity 1s ease 0.9s"}}>
            <span style={{fontFamily:"'IBM Plex Mono', monospace",fontSize:"clamp(12px, 2vw, 17px)",color:T.goldLight}}>{typed}</span>
            <span style={{display:"inline-block",width:2,height:18,backgroundColor:T.gold,marginLeft:3,animation:"cursorBlink 1s infinite"}}/>
          </div>
          <p style={{fontFamily:"'DM Sans'",fontSize:"clamp(13px, 1.8vw, 16px)",color:T.gray,maxWidth:460,lineHeight:1.8,opacity:heroVis?1:0,transform:heroVis?"translateY(0)":"translateY(14px)",transition:"all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.8s"}}>
            I build systems that create freedom. Documenting every step from the factory floor to the founder's desk.
            <br/><span style={{color:T.gold,fontStyle:"italic"}}>No shortcuts. Just proof-of-work.</span>
          </p>
          <div style={{flex:1}}/>
          <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:10,opacity:heroVis?0.6:0,transition:"opacity 1s ease 1.4s",animation:"floatSlow 3s ease infinite",marginTop:40,marginBottom:20}}>
            <span style={{fontFamily:"'IBM Plex Mono'",fontSize:11,color:T.gold,letterSpacing:5,textTransform:"uppercase",fontWeight:600}}>Discover</span>
            <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke={T.gold} strokeWidth="1.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg>
          </div>
        </section>

        {/* STORY */}
        <section id="story" ref={storyRef} style={{padding:"90px 24px",maxWidth:700,margin:"0 auto",scrollMarginTop:60}}>
          <div style={{opacity:storyIn?1:0,transition:"all 0.8s ease",textAlign:"center",marginBottom:52,padding:"32px 20px",position:"relative"}}>
            <div style={{position:"absolute",top:0,left:"50%",transform:"translateX(-50%)",width:2,height:28,backgroundColor:T.gold,opacity:0.5}}/>
            <CrossIcon size={24} color={T.gold}/>
            <p style={{fontFamily:"'Cormorant Garamond', serif",fontSize:"clamp(20px, 4vw, 26px)",fontStyle:"italic",color:T.scripture,lineHeight:1.8,marginTop:18,fontWeight:600}}>"Whatever you do, work at it with all your heart,<br/>as working for the Lord."</p>
            <p style={{fontFamily:"'IBM Plex Mono', monospace",fontSize:11,color:T.gold,marginTop:16,letterSpacing:5,fontWeight:700}}>COLOSSIANS 3:23</p>
          </div>
          <div style={{opacity:storyIn?1:0,transform:storyIn?"translateY(0)":"translateY(20px)",transition:"all 0.8s ease 0.2s"}}>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:20}}>
              <div style={{width:24,height:1,background:`linear-gradient(to right, ${T.gold}, transparent)`}}/>
              <span style={{fontFamily:"'IBM Plex Mono', monospace",fontSize:10,color:T.gold,letterSpacing:4,textTransform:"uppercase",fontWeight:600}}>My Story</span>
            </div>
            <h2 style={{fontFamily:"'Cormorant Garamond', serif",fontSize:"clamp(26px, 5vw, 38px)",fontWeight:700,color:T.text,lineHeight:1.15,marginBottom:24}}>I don't talk about building.<br/><span style={{color:T.gold}}>I ship.</span></h2>
            {["Clamp Operator by trade. CAF Reservist in training. Founder of BlessedOps Group, a personal holding company with four divisions being built from the ground up.","This isn't a highlight reel. It's a build log. Cybersecurity, systems architecture, digital products, Web3 security. All under one roof, all built in the margins, all on faith."].map((t,i)=>
              <p key={i} style={{fontFamily:"'DM Sans'",fontSize:14,color:T.gray,lineHeight:1.85,marginBottom:16,opacity:storyIn?1:0,transition:`opacity 0.6s ease ${0.4+i*0.15}s`}}>{t}</p>
            )}
          </div>
          <div ref={statsRef} style={{display:"flex",gap:12,marginTop:28,flexWrap:"wrap",opacity:statsIn?1:0,transition:"opacity 0.8s ease"}}>
            {[{n:4,l:"Divisions"},{n:1,l:"Holding Co."},{n:0,l:"Excuses"}].map(s=>{const c=useCountUp(s.n,1400,statsIn);return <div key={s.l} style={{padding:"16px 18px",background:T.card,border:`1px solid ${T.border}`,borderRadius:12,flex:"1 1 90px",textAlign:"center",transition:"all 0.4s"}}><div style={{fontFamily:"'Cormorant Garamond', serif",fontSize:26,fontWeight:700,color:T.gold,lineHeight:1}}>{c}</div><div style={{fontFamily:"'IBM Plex Mono', monospace",fontSize:8,color:T.gray,letterSpacing:2,textTransform:"uppercase",marginTop:6}}>{s.l}</div></div>})}
          </div>
          <div style={{display:"flex",gap:0,marginTop:36,overflow:"hidden",opacity:storyIn?1:0,transition:"opacity 0.8s ease 0.6s"}}>
            {journey.map((j,i)=><div key={j.phase} style={{flex:1,textAlign:"center",position:"relative",padding:"16px 4px 0"}}>
              {i>0&&<div style={{position:"absolute",top:20,left:0,width:"50%",height:1,background:`${T.gold}30`}}/>}
              {i<journey.length-1&&<div style={{position:"absolute",top:20,right:0,width:"50%",height:1,background:`${T.gold}30`}}/>}
              <div style={{width:i===0?10:7,height:i===0?10:7,borderRadius:"50%",backgroundColor:i===0?T.gold:"transparent",border:i===0?"none":`1.5px solid ${T.gold}60`,margin:"0 auto 10px",position:"relative",zIndex:2,boxShadow:i===0?`0 0 10px ${T.gold}40`:"none"}}/>
              <span style={{fontFamily:"'IBM Plex Mono', monospace",fontSize:9,fontWeight:700,color:i===0?T.gold:T.gray,letterSpacing:2,display:"block"}}>{j.phase}</span>
              <span style={{fontFamily:"'Cormorant Garamond', serif",fontSize:13,fontWeight:600,color:i===0?T.text:T.gray,display:"block",marginTop:4}}>{j.label}</span>
            </div>)}
          </div>
        </section>

        {/* BUILDING */}
        <section id="building" ref={divRef} style={{padding:"90px 24px",maxWidth:1060,margin:"0 auto",scrollMarginTop:60}}>
          <div style={{textAlign:"center",marginBottom:44}}>
            <span style={{fontFamily:"'IBM Plex Mono', monospace",fontSize:10,color:T.gold,letterSpacing:4,textTransform:"uppercase",fontWeight:600,opacity:divIn?1:0,transition:"opacity 0.6s"}}>BlessedOps Group // Active Divisions</span>
            <h2 style={{fontFamily:"'Cormorant Garamond', serif",fontSize:"clamp(26px, 5vw, 38px)",fontWeight:700,color:T.text,marginTop:10,opacity:divIn?1:0,transform:divIn?"translateY(0)":"translateY(14px)",transition:"all 0.6s ease 0.1s"}}>What I'm <span style={{color:T.gold}}>Building</span></h2>
          </div>
          <div style={{display:"flex",flexWrap:"wrap",gap:14,justifyContent:"center"}}>
            {divisions.map((d,i)=>{const ref=useRef(null);const glow=useMouseGlow(ref);const[vR,inV]=useInView(0.05);const[h,setH]=useState(false);
              return <div key={d.name} ref={vR} style={{flex:"1 1 240px",maxWidth:280}}>
                <div ref={ref} onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)} style={{position:"relative",background:T.card,border:`1px solid ${h?d.accent:T.border}`,borderRadius:18,padding:"28px 22px 24px",overflow:"hidden",opacity:inV?1:0,transform:inV?"translateY(0)":"translateY(36px)",transition:`all 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${i*0.1}s`,cursor:"default"}}>
                  {glow.active&&<div style={{position:"absolute",left:glow.x-80,top:glow.y-80,width:160,height:160,borderRadius:"50%",background:`radial-gradient(circle, ${d.accent}12, transparent 70%)`,pointerEvents:"none"}}/>}
                  <div style={{position:"absolute",top:0,left:"10%",width:h?"80%":"0%",height:2,background:`linear-gradient(90deg, transparent, ${d.accent}, transparent)`,transition:"width 0.5s ease"}}/>
                  <div style={{fontSize:32,marginBottom:14,transform:h?"scale(1.1)":"scale(1)",transition:"transform 0.3s ease"}}>{d.icon}</div>
                  <h3 style={{fontFamily:"'Cormorant Garamond', serif",fontSize:22,fontWeight:700,color:T.text,margin:"0 0 4px"}}>{d.name}</h3>
                  <p style={{fontFamily:"'IBM Plex Mono', monospace",fontSize:9,fontWeight:600,color:d.accent,letterSpacing:2.5,textTransform:"uppercase",margin:"0 0 12px"}}>{d.tag}</p>
                  <p style={{fontFamily:"'DM Sans', sans-serif",fontSize:13,color:T.gray,lineHeight:1.65,margin:0}}>{d.desc}</p>
                </div>
              </div>})}
          </div>
          <div style={{textAlign:"center",marginTop:36,opacity:divIn?1:0,transition:"opacity 0.6s ease 0.5s"}}>
            <a href="https://blessedops.com" target="_blank" rel="noopener noreferrer" style={{fontFamily:"'IBM Plex Mono', monospace",fontSize:10,color:T.gold,textDecoration:"none",letterSpacing:2,padding:"10px 24px",border:`1px solid ${T.gold}`,borderRadius:8,display:"inline-block",transition:"all 0.3s ease",textTransform:"uppercase",fontWeight:600}} onMouseEnter={e=>{e.target.style.backgroundColor=T.gold;e.target.style.color=dark?"#050505":"#FFFFFF"}} onMouseLeave={e=>{e.target.style.backgroundColor="transparent";e.target.style.color=T.gold}}>blessedops.com →</a>
          </div>
        </section>

        {/* WORK */}
        <section id="work" ref={workRef} style={{padding:"90px 24px",maxWidth:1060,margin:"0 auto",scrollMarginTop:60}}>
          <div style={{textAlign:"center",marginBottom:44}}>
            <span style={{fontFamily:"'IBM Plex Mono', monospace",fontSize:10,color:T.gold,letterSpacing:4,textTransform:"uppercase",fontWeight:600,opacity:workIn?1:0,transition:"opacity 0.6s"}}>{contentItems.length>0?"Content + Portfolio":"Portfolio"}</span>
            <h2 style={{fontFamily:"'Cormorant Garamond', serif",fontSize:"clamp(26px, 5vw, 38px)",fontWeight:700,color:T.text,marginTop:10,opacity:workIn?1:0,transform:workIn?"translateY(0)":"translateY(14px)",transition:"all 0.6s ease 0.1s"}}>Proof of <span style={{color:T.gold}}>Work</span></h2>
          </div>
          {contentItems.length>0&&<div style={{marginBottom:40,opacity:workIn?1:0,transform:workIn?"translateY(0)":"translateY(20px)",transition:"all 0.6s ease 0.2s"}}>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16}}><div style={{width:20,height:1,background:`linear-gradient(to right, ${T.gold}, transparent)`}}/><span style={{fontFamily:"'IBM Plex Mono', monospace",fontSize:9,color:T.gold,letterSpacing:3,textTransform:"uppercase",fontWeight:600}}>Latest Drops</span></div>
            <Carousel bg={T.bg} gold={T.gold}>{contentItems.map(c=><div key={c.title} style={{minWidth:250,maxWidth:250,scrollSnapAlign:"start",background:T.card,border:`1px solid ${T.border}`,borderRadius:14,padding:"22px 20px",flexShrink:0}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}><span style={{fontFamily:"'IBM Plex Mono', monospace",fontSize:8,fontWeight:700,color:c.color,letterSpacing:2,textTransform:"uppercase",padding:"2px 8px",background:`${c.color}10`,borderRadius:4}}>{c.type}</span><span style={{fontFamily:"'IBM Plex Mono', monospace",fontSize:8,color:T.gray,letterSpacing:1}}>{c.platform}</span></div>
              <h4 style={{fontFamily:"'Cormorant Garamond', serif",fontSize:16,fontWeight:700,color:T.text,margin:"0 0 8px",lineHeight:1.3}}>{c.title}</h4>
              <p style={{fontFamily:"'DM Sans'",fontSize:11,color:T.gray,lineHeight:1.6,margin:0}}>{c.desc}</p>
            </div>)}</Carousel>
          </div>}
          <div style={{opacity:workIn?1:0,transform:workIn?"translateY(0)":"translateY(20px)",transition:"all 0.6s ease 0.2s"}}>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16}}><div style={{width:20,height:1,background:`linear-gradient(to right, ${T.gold}, transparent)`}}/><span style={{fontFamily:"'IBM Plex Mono', monospace",fontSize:9,color:T.gold,letterSpacing:3,textTransform:"uppercase",fontWeight:600}}>Shipped</span></div>
            <Carousel bg={T.bg} gold={T.gold}>{projects.map(p=>{const[h,setH]=useState(false);return <div key={p.name} onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)} style={{minWidth:270,maxWidth:270,scrollSnapAlign:"start",background:T.card,border:`1px solid ${h?p.accent:T.border}`,borderRadius:14,padding:"24px 20px",flexShrink:0,transition:"border-color 0.3s",cursor:"default"}}>
              <div style={{width:h?50:28,height:3,borderRadius:2,backgroundColor:p.accent,marginBottom:16,transition:"width 0.3s ease"}}/>
              <h4 style={{fontFamily:"'Cormorant Garamond', serif",fontSize:18,fontWeight:700,color:T.text,margin:"0 0 8px"}}>{p.name}</h4>
              <p style={{fontFamily:"'DM Sans'",fontSize:11,color:T.gray,lineHeight:1.6,margin:"0 0 14px"}}>{p.desc}</p>
              <div style={{display:"flex",flexWrap:"wrap",gap:5,marginBottom:14}}>{p.tech.map(t=><span key={t} style={{fontFamily:"'IBM Plex Mono', monospace",fontSize:8,color:T.grayLight,padding:"2px 8px",border:`1px solid ${T.border}`,borderRadius:5}}>{t}</span>)}</div>
              <div style={{display:"inline-flex",alignItems:"center",gap:5,padding:"3px 10px",borderRadius:12,background:`${p.accent}10`,border:`1px solid ${p.accent}20`}}><div style={{width:4,height:4,borderRadius:"50%",backgroundColor:p.accent}}/><span style={{fontFamily:"'IBM Plex Mono', monospace",fontSize:8,fontWeight:600,color:p.accent,letterSpacing:1.5,textTransform:"uppercase"}}>{p.status}</span></div>
            </div>})}</Carousel>
          </div>
        </section>

        {/* CONNECT */}
        <section id="connect" ref={socialRef} style={{padding:"90px 24px",maxWidth:480,margin:"0 auto",textAlign:"center",scrollMarginTop:60}}>
          <div style={{marginBottom:40}}>
            <span style={{fontFamily:"'IBM Plex Mono', monospace",fontSize:10,color:T.gold,letterSpacing:4,textTransform:"uppercase",fontWeight:600,opacity:socialIn?1:0,transition:"opacity 0.6s"}}>Follow the Build</span>
            <h2 style={{fontFamily:"'Cormorant Garamond', serif",fontSize:"clamp(26px, 5vw, 38px)",fontWeight:700,color:T.text,marginTop:10,opacity:socialIn?1:0,transform:socialIn?"translateY(0)":"translateY(14px)",transition:"all 0.6s ease 0.1s"}}>Let's <span style={{color:T.gold}}>Connect</span></h2>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
            {socials.map((s,i)=><a key={s.name} href={s.url} style={{display:"flex",alignItems:"center",gap:10,padding:"13px 14px",background:T.card,border:`1px solid ${T.border}`,borderRadius:10,textDecoration:"none",color:T.text,opacity:socialIn?1:0,transform:socialIn?"translateY(0)":"translateY(12px)",transition:`all 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${i*0.04}s`}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor=s.color;e.currentTarget.style.background=`${s.color}08`}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor=T.border;e.currentTarget.style.background=T.card}}>
              <div style={{color:s.color,display:"flex",alignItems:"center"}}><SI type={s.type} size={16} color={s.color}/></div>
              <div style={{textAlign:"left"}}><div style={{fontFamily:"'DM Sans'",fontSize:12,fontWeight:600}}>{s.name}</div><div style={{fontFamily:"'IBM Plex Mono', monospace",fontSize:8,color:T.gray,marginTop:1}}>{s.handle}</div></div>
            </a>)}
          </div>
          <div style={{marginTop:40,padding:"28px 22px",background:`linear-gradient(145deg, ${T.goldGlow}, ${T.card})`,border:`1px solid ${T.gold}15`,borderRadius:18,animation:"glowPulse 5s infinite",opacity:socialIn?1:0,transition:"opacity 0.6s ease 0.4s"}}>
            <CrossIcon size={18} color={`${T.gold}90`}/>
            <h3 style={{fontFamily:"'Cormorant Garamond', serif",fontSize:18,fontWeight:700,color:T.text,marginTop:12,marginBottom:8}}>The Build Report</h3>
            <p style={{fontFamily:"'DM Sans'",fontSize:12,color:T.gray,lineHeight:1.7,marginBottom:18,maxWidth:320,margin:"0 auto 18px"}}>Monthly dispatch. Build updates, cybersecurity intel, behind-the-scenes. No spam. Just proof.</p>
            <div style={{fontFamily:"'IBM Plex Mono', monospace",fontSize:9,fontWeight:600,color:T.gold,padding:"9px 20px",border:`1px solid ${T.gold}35`,borderRadius:8,display:"inline-block",letterSpacing:2,textTransform:"uppercase"}}>Coming Soon</div>
          </div>
        </section>

        {/* FOOTER */}
        <footer ref={footRef} style={{padding:"56px 24px 32px",borderTop:`1px solid ${T.border}`,textAlign:"center",opacity:footIn?1:0,transition:"opacity 0.6s"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:7,marginBottom:14}}>
            <CrossIcon size={11}/><span style={{fontFamily:"'Cormorant Garamond', serif",fontSize:14,fontWeight:700,color:T.text,letterSpacing:2}}>BABAKIZO</span>
          </div>
          <p style={{fontFamily:"'Cormorant Garamond', serif",fontSize:14,fontStyle:"italic",color:T.scripture,marginBottom:18}}>Built by the Operator. Blessed by the process.</p>
          <div style={{display:"flex",justifyContent:"center",gap:12,marginBottom:20,flexWrap:"wrap"}}>
            {socials.map(s=><a key={s.name} href={s.url} style={{color:T.gray,transition:"color 0.3s"}} onMouseEnter={e=>e.currentTarget.style.color=s.color} onMouseLeave={e=>e.currentTarget.style.color=T.gray}><SI type={s.type} size={13} color={undefined}/></a>)}
          </div>
          <div style={{width:32,height:1,background:T.gold,margin:"0 auto 16px",opacity:0.25}}/>
          <p style={{fontFamily:"'IBM Plex Mono', monospace",fontSize:8,color:T.gray,letterSpacing:2,opacity:0.6}}>© {new Date().getFullYear()} BABAKIZO // BLESSEDOPS GROUP</p>
        </footer>
      </div>
    </>
  );
}
