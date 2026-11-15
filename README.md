# Surabhi Subhas Chandra — 3D Space & CSE Portfolio

An immersive, futuristic **Computer Science & Engineering (CSE)** developer portfolio built for **Surabhi Subhas Chandra** (B.Tech CSE Undergraduate at Srinivas University & Best Intern Awardee at Abhimo Technologies).

## ✨ Core Features

1. **3D Deep Space Stars Background (Three.js)**:
   - Over 3,600 multi-colored 3D celestial stars with twinkling textures.
   - Atmospheric cosmic nebula dust clouds.
   - Dynamic diagonal shooting stars / meteors crossing the sky.
   - Responsive mouse parallax that tilts and navigates through the starfield in 3D perspective.
   - Interactive **Warp Drive / Hyperspace** accelerator button (`🚀 Engage Warp`).

2. **Interactive Cursor Shine & Stardust Sparks**:
   - **Global Cursor Spotlight**: Radiant cyan/violet radial gradient that follows the cursor, illuminating glassmorphism cards and borders.
   - **Stardust Particle Trail**: Physics-driven micro-sparkles emitting and softly drifting as the cursor moves across the viewport.
   - **3D Card Tilt & Surface Shine**: Every card (projects, certificates, skills) dynamically tilts in 3D and projects a local spotlight reflecting the exact cursor position over the card.

3. **CSE Engineering Theme**:
   - Cyber-cosmic obsidian, electric cyan (`#00f5d4`), cyber violet (`#a855f7`), and sapphire palette.
   - Glassmorphic translucent cards with glowing hover borders.
   - Interactive Live CSE Terminal (`surabhi@cse-terminal:~$ `) with executable commands (`help`, `about`, `skills`, `projects`, `awards`, `certs`, `warp`, `matrix`, `sudo hire`).
   - Clean, modern monospace & modern sans typography (`Outfit`, `Inter`, `JetBrains Mono`).

4. **Showcase of Honors, Awards & Certificates**:
   - **Best Intern Award**: Conferred by Abhimo Technologies Private Limited (with photo preview).
   - **NPTEL Elite Certification**: Software Conceptual Design (Ministry of Education, Govt. of India / IIT Kharagpur, Roll No: `NPTEL26CS185S674201360`) with direct PDF view/download.
   - **NxtWave CCBP 4.0 Academy Fellow**: Full-Stack & DSA Track.
   - **Tech Yuva 2026 "Mind Print"**: Research paper presentation on *"Impact of Social Media Algorithms on Youth Behavior"*.
   - **Prompt Buddy AI Championship**: University competitive prompt engineering honors.
   - **3x Live Production Deployments Milestone**: Verified client platforms.
   - Interactive Certificate Modal with credential verification and direct document access.

5. **Featured Projects Showcase**:
   - Filterable categories: *All*, *Production & Client*, *Hackathon / AI*, *Web Applications*, *Research & Systems*.
   - Includes **FoodBridge AI** (Hackathon), **Abhimo Corporate Portal & Chatbot**, **Mahalaxmi Industrial Web Portal**, **AI Scam Detector**, and **Blockchain in Governance**.

6. **Interactive Features**:
   - Soft synthesized UI sound effects (Web Audio API, muted by default with toggle).
   - Live typewriter effect cycling through professional titles.
   - Animated counter stats (3+ production apps, Top 1% Intern, 60% Elite NPTEL, 8+ projects).
   - Working contact form with instant validation and direct mail routing.
   - Direct verified resume download (`assets/Surabhi_Subhas_Chandra_Resume.pdf`).

## 📁 File Structure

```
c:\Users\surab\OneDrive\Desktop\threeD\
├── index.html                   # Main semantic HTML5 portfolio
├── css\
│   └── style.css                # Custom CSE cosmic glassmorphic styles
├── js\
│   ├── stars.js                 # Three.js 3D starfield, nebula & warp speed
│   ├── cursor.js                # Cursor spotlight, stardust canvas trail & card tilt
│   └── main.js                  # Navigation, terminal, modal viewer, audio & form
├── assets\
│   ├── Surabhi_Subhas_Chandra_Resume.pdf
│   ├── NPTEL_Certificate_Software_Conceptual_Design.pdf
│   ├── abhimo_logo.png
│   ├── best_intern_award.jpg
│   └── internship_completion.jpg
└── README.md
```

## 🚀 How to Run Locally

You can open `index.html` directly in any modern browser:
```powershell
start "c:\Users\surab\OneDrive\Desktop\threeD\index.html"
```

Or run via Python HTTP server:
```powershell
python -m http.server 3000 --directory "c:\Users\surab\OneDrive\Desktop\threeD"
```
Then visit: `http://localhost:3000`
