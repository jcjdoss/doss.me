# 🎮 RPG Agent Dashboard

**Live at:** `/Users/jdoss/projects/doss.me/rpg/index.html`

## Features Delivered

### ✅ 8-Bit Aesthetic
- Press Start 2P pixel font from Google Fonts
- NES-inspired color palette
- CRT scanline effect overlay
- Retro game screen background (#0f0f1e dark)
- Glowing title with animation

### ✅ Character Sprites
Custom CSS pixel art (16x16 grid) for each class:
- **⚔️ Clawd (Paladin)** - Gold armor, sword & shield
- **🔍 Scout (Ranger)** - Green, bow equipped
- **🔧 Keeper (Cleric)** - Blue robes, holy cross
- **🛡️ Sentinel (Knight)** - Silver armor, red shield
- **📜 Scribe (Mage)** - Purple robes, golden staff
- **📣 Herald (Bard)** - Orange garb, lute

### ✅ Party Roster
Each character card shows:
- Character sprite (CSS pixel art)
- Name, class, title
- Level and XP progress bar with shimmer effect
- All 6 stats (STR, SPD, INT, WIS, CON, CHA)
- Battle record (wins/total + win rate)
- Current streak (🔥 indicator)
- Color-coded borders from party-state.json

### ✅ Active Battles Section
- Shows current cron jobs as enemy encounters
- Real-time progress bars
- Character vs Enemy display
- Victory animation when complete

### ✅ Battle Log
- Displays recent battle results
- Color-coded by outcome (victory/critical/defeat)
- Shows time, character, and enemy
- Auto-scrolling for latest entries
- Slide-in animation for new entries

### ✅ Leaderboard
- Ranked by total XP
- Shows level and XP count
- #1 position highlighted with gold border and trophy 🏆
- Hover effects

### ✅ Auto-Refresh
- Fetches party-state.json every 30 seconds
- Cache-busting timestamp parameter
- Live data updates without page reload

### ✅ Mobile Responsive
- Adapts to small screens
- Single column on mobile
- Readable font sizes at all breakpoints

### ✅ Data Linking
```bash
/Users/jdoss/projects/doss.me/rpg/
├── index.html (dashboard)
├── party-state.json -> /Users/jdoss/.openclaw/workspace/memory/1-PROJECTS/AI-Automation-Systems/rpg-agents/party-state.json
└── stats.json -> party-state.json (legacy alias)
```

Both `stats.json` and `party-state.json` are symlinked to the live data source in workspace memory.

## Technology
- **Single-page HTML** - No build process needed
- **Vanilla JavaScript** - No frameworks
- **CSS Grid & Flexbox** - Modern responsive layout
- **CSS Pixel Art** - Hand-crafted 16x16 sprites for each character
- **Font:** Press Start 2P from Google Fonts

## Performance
- Small file size (~27KB HTML)
- No external dependencies except Google Fonts
- Efficient DOM updates on refresh
- Smooth animations via CSS

## Future Enhancements (Not Implemented)
- Battle animations (attack/defend/cast sequences)
- Victory sparkle effects on level-up
- Sound effects (8-bit battle music)
- Real-time WebSocket updates instead of polling
- Character idle animations (sprite frame cycling)

---

**Status:** ✅ COMPLETE  
**Built:** 2026-02-14  
**Aesthetic:** Classic Final Fantasy / Dragon Quest meets operations dashboard
