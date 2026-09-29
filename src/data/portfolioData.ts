/**
 * Centralized configuration & content for SwordGamer959 Gaming Portfolio.
 * Edit this file to update channel links, videos, bio, projects, and contact info.
 */

export interface CreatorProfile {
  brandName: string;
  creatorName: string;
  youtubeChannelName: string;
  youtubeHandle: string;
  youtubeUrl: string;
  instagramUrl: string;
  discordInviteUrl: string;
  contactEmail: string;
  tagline: string;
  shortBio: string;
  detailedBio: string[];
  attributes: {
    title: string;
    description: string;
    icon: string;
  }[];
}

export interface SkillItem {
  id: string;
  title: string;
  category: 'Gameplay' | 'Content' | 'Progression';
  levelDescription: string;
  summary: string;
  highlights: string[];
  icon: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: 'Survival & Grinds' | 'PvP Practice' | 'Building Logs' | 'Shorts';
  date: string;
  summary: string;
  fullDescription: string;
  image: string;
  tags: string[];
  externalUrl?: string;
  youtubeId?: string;
  milestoneNote?: string;
}

export interface YouTubeVideoItem {
  id: string;
  title: string;
  type: 'video' | 'short' | 'stream';
  videoId: string; // YouTube video ID (e.g. dQw4w9WgXcQ)
  thumbnailUrl: string;
  uploadDate: string;
  duration?: string;
  description: string;
  isFeatured?: boolean;
}

export const CREATOR_PROFILE: CreatorProfile = {
  brandName: 'SwordGamer959',
  creatorName: 'SwordGamer959',
  youtubeChannelName: 'SwordGamer8682',
  youtubeHandle: '@SwordGamer8682',
  youtubeUrl: 'https://www.youtube.com/@SwordGamer8682',
  instagramUrl: 'https://www.instagram.com/SwordGamer959',
  discordInviteUrl: 'https://discord.com/invite/S4MdNCQEcH',
  contactEmail: 'swordgamer8682@gmail.com',
  tagline: 'The Grind Never Stops. Every Block, Every Battle.',
  shortBio: 'Dedicated Minecraft player and creator sharing survival grinds, combat training, beginner builds, and fast-learning adventures.',
  detailedBio: [
    'SwordGamer959 is a passionate Minecraft gaming creator who streams, edits gameplay videos, and produces fast-paced Shorts under the channel @SwordGamer8682.',
    'Known for relentless survival grinds—whether digging massive quarry shafts, mining Netherite debris, or gathering stacks of rare resources—every milestone is earned through patience and gameplay dedication.',
    'Grounded in honesty: with average PvP skills, every duel and bridge combat session is an opportunity to improve mechanics, sword timing, and shield counterplay.',
    'As a beginner builder, focus remains on practical survival bases and utility farms while rapidly developing new aesthetic architectural techniques with each episode.'
  ],
  attributes: [
    {
      title: 'Dedicated Grinder',
      description: 'Hours spent mining ancient debris, gathering resources, and building survival foundations block by block.',
      icon: 'pickaxe'
    },
    {
      title: 'Honest PvP Battler',
      description: 'Transparent average PvP combat skills with steady practice in sword rhythm, shield blocks, and critical hits.',
      icon: 'swords'
    },
    {
      title: 'Beginner Builder',
      description: 'Designing functional starter bases, automated farms, and learning advanced exterior block paletting.',
      icon: 'box'
    },
    {
      title: 'Fast Learner',
      description: 'Quickly mastering new game snapshots, combat mechanics, mob strategies, and community tactics.',
      icon: 'sparkles'
    }
  ]
};

export const MINECRAFT_SKILLS: SkillItem[] = [
  {
    id: 'grinding',
    title: 'Survival Grinding',
    category: 'Progression',
    levelDescription: 'Patient & Methodical Resource Gathering',
    summary: 'Mastery over the long-haul grind. Hours invested in branch mining, strip mining, and Netherite exploration.',
    highlights: [
      'Extensive Netherite ancient debris tunnel mining',
      'Massive resource stockpiles and organized vault storage',
      'Resilient survival world progression without shortcuts',
      'Endurance for multi-hour resource harvesting streams'
    ],
    icon: 'pickaxe'
  },
  {
    id: 'pvp',
    title: 'Combat & PvP Practice',
    category: 'Gameplay',
    levelDescription: 'Average Skill · Steady Mechanical Growth',
    summary: 'Honest, grounded combat approach. Regular duel practice focusing on 1.9+ attack cooldowns, crits, and shield defense.',
    highlights: [
      'Sword cooldown timing and jump-critical hit practice',
      'Shield blocking and axe-disabling counterplay',
      'Active bridge and survival arena skirmishes',
      'Continuous mechanical practice to step up combat awareness'
    ],
    icon: 'swords'
  },
  {
    id: 'exploration',
    title: 'World Exploration',
    category: 'Gameplay',
    levelDescription: 'Fearless Cavern & Nether Spelunker',
    summary: 'Navigating perilous terrains: ancient cities, bastions, Nether fortresses, trial chambers, and deep-slate caverns.',
    highlights: [
      'Nether fortress navigation and blaze rod farming',
      'Deep dark cave exploration and Warden avoidance',
      'Bastion raiding for upgrade templates and loot',
      'High-altitude Elytra scouting and biome charting'
    ],
    icon: 'compass'
  },
  {
    id: 'content-creation',
    title: 'Content & Streaming',
    category: 'Content',
    levelDescription: 'Gameplay Videos, Shorts & Live Sessions',
    summary: 'Crafting engaging gaming content for the @SwordGamer8682 community across long-form videos and bite-sized Shorts.',
    highlights: [
      'Minecraft gameplay recordings and high-intensity cuts',
      'Short-form vertical highlights showcasing clutches and fails',
      'Live community streams sharing real-time survival grinds',
      'Active YouTube and Discord community interactions'
    ],
    icon: 'video'
  },
  {
    id: 'building',
    title: 'Beginner Architecture',
    category: 'Progression',
    levelDescription: 'Functional Starter Bases & Learning Aesthetics',
    summary: 'Practical builder focused on survivability, storage systems, and gradually elevating architectural styling.',
    highlights: [
      'Defensive starter compounds and perimeter walls',
      'Functional storage warehouses and crop farms',
      'Experimenting with depth, roof lines, and block palettes',
      'Learning advanced texturing from community builders'
    ],
    icon: 'hammer'
  },
  {
    id: 'fast-learning',
    title: 'Rapid Adaptation',
    category: 'Progression',
    levelDescription: 'Quickly Absorbing New Meta & Mechanics',
    summary: 'Unmatched speed at learning new updates, mob attack patterns, crafting recipes, and strategic tricks.',
    highlights: [
      'Fast adoption of new Minecraft version mechanics',
      'Quick breakdown of mob pathfinding and combat tricks',
      'Implementing community farm designs and survival tips',
      'Open mindset and enthusiasm for learning from viewers'
    ],
    icon: 'zap'
  }
];

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'netherite-grind',
    title: 'Netherite Mining Odyssey',
    category: 'Survival & Grinds',
    date: 'Recent Episode Log',
    summary: 'A grueling Nether mining expedition at Y=15 using TNT and bed explosions to secure ancient debris for armor upgrades.',
    fullDescription: 'This expedition logged over 4 hours of relentless excavation in the Nether subterranean bedrock. Navigating treacherous lava lakes and piglin territory, the grind resulted in securing ancient debris to forge a complete Netherite gear set. Demonstrates true survival patience and resource management.',
    image: '/src/assets/images/portfolio_gameplay_grind_1790659534393.jpg',
    tags: ['Netherite', 'Mining Grind', 'Survival', 'Ancient Debris'],
    milestoneNote: 'Full Netherite Gear Upgraded',
    externalUrl: 'https://www.youtube.com/@SwordGamer8682'
  },
  {
    id: 'pvp-combat-training',
    title: 'Arena Combat & Shield Timing Sessions',
    category: 'PvP Practice',
    date: 'Gameplay Training Session',
    summary: 'Intensive duel practice sessions refining 1.9+ combat cooldowns, axe disable tactics, and sprint-reset crits.',
    fullDescription: 'Focusing on transparent combat progression. While holding average PvP skills, these sparring sessions analyze hitboxes, spacing, shield knockback recovery, and sword swing rhythm. Captured highlights show both hard-fought victories and constructive defeats.',
    image: '/src/assets/images/portfolio_pvp_arena_1790659549570.jpg',
    tags: ['PvP', 'Sword Combat', 'Shield Timing', 'Practice Arena'],
    milestoneNote: 'Combat Cooldown Mastery Log',
    externalUrl: 'https://www.youtube.com/@SwordGamer8682'
  },
  {
    id: 'starter-fortress-base',
    title: 'Cobblestone & Deepslate Survival Citadel',
    category: 'Building Logs',
    date: 'Survival World Build',
    summary: 'Constructing a resilient beginner base with multi-chest sorting room, defensive watchtowers, and underground farm access.',
    fullDescription: 'As an honest beginner builder, this project prioritized functionality and mob protection over sheer luxury. Combining deepslate tile trims, spruce logs, and stone brick battlements, the starter fortress houses every essential crafting station and automated crop farm needed for survival.',
    image: '/src/assets/images/hero_swordgamer_cinematic_1790659510190.jpg',
    tags: ['Building Log', 'Starter Base', 'Functional Design', 'Deepslate'],
    milestoneNote: 'Primary Survival Base Secured',
    externalUrl: 'https://www.youtube.com/@SwordGamer8682'
  },
  {
    id: 'clutch-escape-short',
    title: 'Lava Lake Water Bucket Save (Short)',
    category: 'Shorts',
    date: 'Viral YouTube Short',
    summary: 'A split-second water bucket clutch after falling from a Nether fortress ledge during a wither skeleton duel.',
    fullDescription: 'One of the most thrilling survival moments captured on stream. Blown back by a ghast fireball, a rapid hotbar switch to the water-in-cauldron / fire resistance potion allowed survival with just half a heart remaining.',
    image: '/src/assets/images/portfolio_gameplay_grind_1790659534393.jpg',
    tags: ['Shorts', 'Clutch', 'Nether', 'Survival Reactions'],
    milestoneNote: 'Community Favorite Highlight',
    externalUrl: 'https://www.youtube.com/@SwordGamer8682'
  }
];

export const YOUTUBE_SHOWCASE_ITEMS: YouTubeVideoItem[] = [
  {
    id: 'yt-1',
    title: 'I Spent 100 Days Grinding Netherite in Hardcore Minecraft',
    type: 'video',
    videoId: 'sample-video-1',
    thumbnailUrl: '/src/assets/images/portfolio_gameplay_grind_1790659534393.jpg',
    uploadDate: 'Latest Video',
    duration: '18:42',
    description: 'An honest look at survival grinding, dealing with unexpected creeper ambushes, and patiently forging Netherite tools.',
    isFeatured: true
  },
  {
    id: 'yt-2',
    title: 'Average PvP Player vs Pro Combat Arena: Can I Win?',
    type: 'video',
    videoId: 'sample-video-2',
    thumbnailUrl: '/src/assets/images/portfolio_pvp_arena_1790659549570.jpg',
    uploadDate: 'Featured Duel',
    duration: '12:15',
    description: 'Testing my combat skills against veteran duelists on sword PvP servers. Analyzing hitboxes and shield timings.',
    isFeatured: true
  },
  {
    id: 'yt-3',
    title: 'Beginner Builder Makes a Fortress: Day 1 to Day 10',
    type: 'video',
    videoId: 'sample-video-3',
    thumbnailUrl: '/src/assets/images/hero_swordgamer_cinematic_1790659510190.jpg',
    uploadDate: 'Base Tour',
    duration: '15:30',
    description: 'Stepping out of my comfort zone to construct an aesthetic stone and deepslate perimeter fortress with storage vaults.',
    isFeatured: false
  },
  {
    id: 'yt-4',
    title: 'The Cleanest Bed Bomb Explosion Timing in the Nether #Shorts',
    type: 'short',
    videoId: 'sample-short-1',
    thumbnailUrl: '/src/assets/images/portfolio_gameplay_grind_1790659534393.jpg',
    uploadDate: 'Popular Short',
    duration: '0:45',
    description: 'Fast ancient debris mining trick using obsidian shield blast protection.',
    isFeatured: false
  },
  {
    id: 'yt-5',
    title: 'When Your Shield Breaks at 1 HP #Shorts',
    type: 'short',
    videoId: 'sample-short-2',
    thumbnailUrl: '/src/assets/images/portfolio_pvp_arena_1790659549570.jpg',
    uploadDate: 'Clutch Short',
    duration: '0:32',
    description: 'A terrifying close call against an axe-wielding vindicator.',
    isFeatured: false
  },
  {
    id: 'yt-6',
    title: 'Weekend Survival Grind & Ancient City Raid',
    type: 'stream',
    videoId: 'sample-stream-1',
    thumbnailUrl: '/src/assets/images/hero_swordgamer_cinematic_1790659510190.jpg',
    uploadDate: 'Past Live Stream',
    duration: '2h 15m',
    description: 'Full unedited survival session spelunking the Deep Dark with viewer chat and gear crafting.',
    isFeatured: false
  }
];

export const YOUTUBE_STATS_NOTE = {
  status: 'Owner-Maintained Data',
  notice: 'To connect live subscriber count and dynamic uploads directly from YouTube, configure the YouTube Data API v3 following the guide in the channel panel.'
};
