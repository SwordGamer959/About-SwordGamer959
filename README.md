# SwordGamer959 – Ultra-Premium Gaming Creator Website

Welcome to the official static repository for **SwordGamer959** (YouTube: [@SwordGamer8682](https://www.youtube.com/@SwordGamer8682)).

This website is a **production-ready, zero-build, static HTML5 + CSS3 + Vanilla JavaScript** gaming creator portfolio. It is engineered so you can **drag and drop all files directly into the root of any GitHub repository, enable GitHub Pages, and have it live in 30 seconds**—no Node.js, npm, Vite, React, or build steps required!

---

## ⚡ Zero-Build GitHub Pages Setup (Drag & Drop)

Deploying this website to GitHub Pages takes under 1 minute:

### Step 1: Create a GitHub Repository
1. Log in to [GitHub](https://github.com/) and navigate to [github.com/new](https://github.com/new).
2. Name your repository (for example: `SwordGamer959` or `<your-username>.github.io`).
3. Make sure the repository visibility is set to **Public**.
4. Leave *"Add a README file"* unchecked.
5. Click **Create repository**.

### Step 2: Upload Project Files
1. Download or extract the project files.
2. In your newly created GitHub repository, click **uploading an existing file** (or drag and drop into the repository browser).
3. Drag and drop the following files and folders directly into the repository root:
   - `index.html`
   - `style.css`
   - `script.js`
   - `favicon.svg`
   - `robots.txt`
   - `sitemap.xml`
   - `README.md`
   - `assets/` (the entire folder containing `assets/images/`)
4. Type a commit message (e.g., `Launch SwordGamer959 portfolio`) and click **Commit changes**.

### Step 3: Enable GitHub Pages
1. In your GitHub repository, click the **Settings** tab.
2. In the left navigation menu, click **Pages**.
3. Under **Build and deployment** > **Source**, keep it set to **Deploy from a branch**.
4. Under **Branch**, select **main** (or **master**) and root folder (`/`), then click **Save**.
5. Your website will be live in 30–60 seconds at:
   ```text
   https://<your-username>.github.io/<repository-name>/
   ```

*(All file references use relative paths like `./style.css`, `./script.js`, and `./assets/images/...` so your site will load smoothly whether it's on a custom domain, root domain, or repository subfolder!)*

---

## 🎮 Features Included

1. **Cinematic Loading Screen**: Atmospheric logo animation with progress bar, skippable intro, and `localStorage` preference memory.
2. **Sticky Navigation**: Wordmark with stylized sword logo, active section tracking, dark/light theme switch, and responsive mobile drawer.
3. **Cinematic Hero**: Brand identity, authentic tagline (*"Minecraft Gamer • Content Creator • Grinder • PvP Player"*), YouTube & Discord CTA buttons, and interactive particle canvas.
4. **Live Creator Statistics**:
   - **YouTube Subscribers**: Highly visible card ready to connect the YouTube Data API v3 or display a clean, unconfigured state without inventing fake numbers.
   - **Local Time**: 1-second live clock with visitor's local date and detected timezone.
   - **Website Visitors**: Configurable endpoint integration layer with local device counter fallback (clearly labeled).
5. **About Section**: Creator narrative strictly adhering to authentic facts (grinding endurance, average PvP mechanics, beginner architecture, fast mechanical learning).
6. **Minecraft Identity**: 6 voxel-inspired cards for PvP, Grinding, Survival, Exploration, Building, and Fast Learning.
7. **YouTube Showcase**: Channel banner for `@SwordGamer8682`, Subscribe button, and video showcase cards with duration badges and lightbox preview player.
8. **Content Portfolio**: Filterable gameplay chronicles (All, Survival Gameplay, PvP Combat, Shorts, Streams).
9. **Skills Dashboard**: Honest mechanical overview with zero fake percentage gauges.
10. **Interactive Mini-Game ("Minecraft Gem Hunt")**:
    - 30-second round, score, combo multiplier, countdown timer, high score saved in `localStorage`.
    - Clickable moving gems (Diamond, Emerald, Netherite, Amethyst) and hazardous TNT blocks.
    - Web Audio API retro 8-bit sound effects (toggleable, off by default).
    - Full mobile touchscreen and desktop mouse support.
11. **Community Socials**: YouTube, Instagram, Discord, and Email cards.
12. **Contact Hub**: Contact form with configurable endpoint, direct `mailto:swordgamer8682@gmail.com` fallback, and 1-click email copy button.
13. **SEO & Accessibility**: Complete OpenGraph, Twitter card metadata, semantic HTML5, favicon, robots.txt, and sitemap.xml.

---

## ⚙️ Easy Configuration (`script.js`)

At the very top of `script.js`, you will find the **SITE CONFIGURATION** block:

```javascript
const CONFIG = {
  // Official YouTube Data API v3 configuration
  // Get an API key from Google Cloud Console (https://console.cloud.google.com/)
  YOUTUBE_API_KEY: '', // Insert your YouTube Data API v3 key here
  YOUTUBE_CHANNEL_ID: '', // Optional: YouTube Channel ID
  YOUTUBE_CHANNEL_HANDLE: 'SwordGamer8682', // YouTube Handle without @

  // Shared Visitor Counter Service (e.g., CountAPI: https://countapi.xyz)
  VISITOR_COUNTER_ENABLED: false, // Set to true to enable remote global counter
  VISITOR_COUNTER_ENDPOINT: '', // e.g., 'https://api.countapi.xyz/hit/your-id/visits'

  // Contact Form Backend Endpoint (e.g., Formspree: https://formspree.io/f/xyz or EmailJS)
  CONTACT_FORM_ENDPOINT: '', // When blank, uses mailto: fallback

  // Creator Details
  CONTACT_EMAIL: 'swordgamer8682@gmail.com',
  YOUTUBE_URL: 'https://www.youtube.com/@SwordGamer8682',
  DISCORD_URL: 'https://discord.com/invite/S4MdNCQEcH',
  INSTAGRAM_URL: 'https://www.instagram.com/SwordGamer959'
};
```

### 1. Connecting the Live YouTube Subscriber Count
1. Go to [Google Cloud Console](https://console.cloud.google.com/) and enable the **YouTube Data API v3**.
2. Create an API Key under **APIs & Services** > **Credentials**.
3. *Recommended Security*: Under **API restrictions**, select "YouTube Data API v3" and restrict the key by HTTP referrer to your GitHub Pages URL (`https://<username>.github.io/*`).
4. Paste the key into `YOUTUBE_API_KEY: 'YOUR_KEY_HERE'`.
5. The subscriber count will immediately fetch and animate live numbers on your page! If left blank, it displays an honest "API Ready" state rather than fake statistics.

### 2. Connecting a Global Visitor Counter
1. To track visitors across the globe (instead of local device visits), set `VISITOR_COUNTER_ENABLED: true`.
2. Provide a free endpoint in `VISITOR_COUNTER_ENDPOINT` (such as [CountAPI](https://countapi.xyz/)).

### 3. Connecting the Contact Form
1. If you want emails sent silently in the background without launching the visitor's mail client, create a free endpoint at [Formspree](https://formspree.io/) and paste the form URL into `CONTACT_FORM_ENDPOINT`.
2. When empty, clicking "Send Message" automatically opens the user's default email client (`mailto:swordgamer8682@gmail.com`) with their name, email, and message pre-filled.

---

## 📁 Repository File Structure

```text
/
├── index.html        # Main HTML5 semantic page
├── style.css         # Complete responsive styles & dark/light theme
├── script.js         # Vanilla JS with configuration, game, clock, and API logic
├── favicon.svg       # Vector diamond sword favicon
├── robots.txt        # Search engine indexing rules
├── sitemap.xml       # Site map configuration
├── README.md         # Deployment & setup documentation
└── assets/
    └── images/
        ├── hero.jpg     # Cinematic Minecraft voxel landscape
        ├── avatar.jpg   # Stylized 3D gamer avatar
        ├── grind.jpg    # Deep survival cavern mining scene
        └── pvp.jpg      # Tactical sword sparring arena
```

---

## 📜 Attribution
- Brand: **SwordGamer959**
- YouTube: [@SwordGamer8682](https://www.youtube.com/@SwordGamer8682)
- Minecraft is a trademark of Mojang Synergies AB / Microsoft. This portfolio is an independent creator fan website.
