# BABAKIZO - Personal Brand Site

Operator · Builder · Believer

## Quick Start

```bash
# Install dependencies
npm install

# Run locally
npm run dev

# Build for production
npm run build
```

## Deploy to Vercel

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) and sign in with GitHub
3. Click "Import Project" and select this repo
4. Vercel auto-detects React — just click Deploy
5. Once live, go to Settings > Domains > Add `babakizo.com`
6. Update your domain DNS:
   - Add an A record pointing to `76.76.21.21`
   - Or add a CNAME record pointing to `cname.vercel-dns.com`
7. Vercel handles SSL automatically

## How to Update Your Social Links

Open `src/App.jsx` and find the `socials` array (around line 60). Replace the `#` placeholder URLs with your real profile links:

```javascript
const socials = [
  { name: "YouTube", type: "youtube", url: "https://youtube.com/@YOUR_HANDLE", ... },
  { name: "X (Twitter)", type: "x", url: "https://x.com/YOUR_HANDLE", ... },
  // etc.
];
```

Push to GitHub and Vercel auto-deploys in ~30 seconds.

## How to Add Content to the Feed

When you publish real content and want it on your site, find the `contentItems` array and add entries:

```javascript
const contentItems = [
  { type: "VIDEO", title: "Your actual video title", platform: "YouTube", color: "#FF0000", desc: "Real description." },
  { type: "THREAD", title: "Your thread title", platform: "X", color: "#F7F2E9", desc: "What it's about." },
];
```

The content carousel will automatically appear once there's at least one item.

## How to Update Projects/Portfolio

Find the `projects` array and add/edit entries:

```javascript
const projects = [
  { name: "Project Name", desc: "What it is.", tech: ["React", "Node.js"], status: "Live", accent: "#D4A843" },
];
```

Status options: "Live", "Complete", "Building", "In Progress", "Designing"

## Stack

- React 18
- No external UI libraries (pure CSS-in-JS)
- Canvas API for animated mesh background
- Deployed on Vercel

## Structure

```
babakizo-site/
├── public/
│   └── index.html
├── src/
│   ├── App.jsx      ← All site code lives here
│   └── index.js     ← Entry point
├── package.json
└── README.md
```

---

Built by the Operator. Blessed by the process.
