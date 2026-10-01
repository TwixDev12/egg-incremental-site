import { asset } from '../utils/assets';

export interface SiteConfig {
  game: {
    name: string;
    badge: string;
    tagline: string;
    shortDescription: string;
    fullDescription: string;
    genre: string;
    platform: string;
    placeId: string;
    universeId: string;
    playUrl: string;
    groupUrl: string;
    groupName: string;
  };
  creators: {
    name: string;
    role: string;
    title: string;
    userId: string;
    avatarUrl?: string;
  }[];
  event: {
    title: string;
    badge: string;
    description: string;
    startDate: string; // ISO 8601 string
    endDate: string; // ISO 8601 string
    rewardsSummary: string[];
    endedMessage: string;
  };
  features: {
    id: string;
    title: string;
    category: string;
    description: string;
    iconImage: string;
    badge?: string;
    color: string;
  }[];
  gallery: {
    id: string;
    title: string;
    category: 'gameplay' | 'items' | 'events';
    imageUrl: string;
    caption: string;
  }[];
  analytics: {
    enabled: boolean;
    provider: 'plausible' | 'google-analytics' | 'none';
    measurementId?: string;
  };
  seo: {
    title: string;
    description: string;
    keywords: string[];
    siteUrl: string;
    ogImage: string;
    themeColor: string;
  };
}

export const SITE_CONFIG: SiteConfig = {
  game: {
    name: "[NEW] 🥚 Egg Incremental Simulator",
    badge: "v1.0 OFFICIAL LAUNCH",
    tagline: "Ready to hatch, grow and build your ultimate egg empire?",
    shortDescription:
      "Step into Egg Incremental Simulator on Roblox! Tap to earn coins, hatch rare cosmic eggs, forge legendary hammer upgrades, and conquer mythical chests.",
    fullDescription:
      "Egg Incremental Simulator is an exciting Roblox experience crafted with vibrant visuals, exponential upgrades, and rewarding progression. Hatch exclusive companions, unleash magnetic collectors, drink from the lucky fountain, and team up with fellow players to open the legendary Bitcoin Guardian Chest!",
    genre: "Incremental / Simulator / Adventure",
    platform: "Roblox (PC, Mobile, Tablet, Console)",
    placeId: "109556760281977",
    universeId: "10767098369",
    // Official Roblox experience play link
    playUrl: "https://www.roblox.com/games/109556760281977/Egg-Incremental-Simulator",
    // Official Roblox developer group link
    groupUrl: "https://www.roblox.com/groups/1004997125/QLF-INC",
    groupName: "QLF INC",
  },
  creators: [
    {
      name: "mamouny54",
      role: "Studio Lead & Creator",
      title: "Gardien du Coffre",
      userId: "234784023",
    },
    {
      name: "IAyakaal",
      role: "Co-Developer & Admin",
      title: "Gardien du Coffre",
      userId: "5858488396",
    },
  ],
  event: {
    title: "10-DAY LAUNCH CELEBRATION EVENT",
    badge: "LIMITED-TIME EVENT",
    description:
      "Celebrate the grand release! For the first 10 days of the launch campaign, enjoy double egg luck, boosted fountain bonuses, and exclusive Guardian Chest multiplier drops. Every second counts!",
    // Absolute start and end dates (UTC)
    // 10-day campaign: Started Oct 1, 2026 -> Ends Oct 11, 2026 at 23:59:59 UTC
    startDate: "2026-10-01T00:00:00Z",
    endDate: "2026-10-11T23:59:59Z",
    rewardsSummary: [
      "2x Cosmic Egg Hatching Luck",
      "Bonus Bitcoin Mystery Chest Drop Rates",
      "Free Playtime Gift Crates every 5 minutes",
      "Exclusive Pioneer Group Role in QLF INC",
    ],
    endedMessage:
      "The 10-day Launch Celebration Event has officially ended! Thank you to all the early players who joined us. Jump into the game now to check out our newest live updates and weekly community milestones!",
  },
  features: [
    {
      id: "eggs-pets",
      title: "Cosmic Eggs & Companions",
      category: "Collection",
      description:
        "Hatch glowing eggs to discover companions with exponential earning multipliers. Upgrade your inventory and show off your rarest finds to other players.",
      iconImage: asset("/assets/images/cosmic_egg.png"),
      badge: "Core Mechanic",
      color: "from-purple-500/20 to-pink-500/20 border-purple-500/30",
    },
    {
      id: "hammer-upgrades",
      title: "Legendary Hammer Forging",
      category: "Upgrades",
      description:
        "Power up your clicking potential! Forge stronger hammers with higher multipliers to break coin caps and accelerate your incremental progression.",
      iconImage: asset("/assets/images/hammer_upgrade.png"),
      badge: "Progression",
      color: "from-amber-500/20 to-orange-500/20 border-amber-500/30",
    },
    {
      id: "guardian-chest",
      title: "Guardian Bitcoin Chest",
      category: "World Event",
      description:
        "Guarded by the founding Guardians, this colossal chest holds astronomical coin windfalls. Gather at the central plaza to crack it open together!",
      iconImage: asset("/assets/images/bitcoin_coin.png"),
      badge: "Multiplayer",
      color: "from-yellow-500/20 to-amber-500/20 border-yellow-500/30",
    },
    {
      id: "magnetic-collectors",
      title: "Magnetic Auto-Collector",
      category: "Tools",
      description:
        "Equip magnetic pulses that automatically draw nearby gold coins, energy orbs, and rare drops straight into your wallet without missing a beat.",
      iconImage: asset("/assets/images/magnet_pull.png"),
      badge: "Automation",
      color: "from-blue-500/20 to-cyan-500/20 border-blue-500/30",
    },
    {
      id: "lucky-fountain",
      title: "Mythic Wish Fountain",
      category: "Boosts",
      description:
        "Visit the ancient luminescent fountain to trigger temporary luck floods and supercharge your next egg openings with maximum fortune.",
      iconImage: asset("/assets/images/fountain_magic.png"),
      badge: "Special Zone",
      color: "from-cyan-500/20 to-teal-500/20 border-cyan-500/30",
    },
    {
      id: "clover-luck",
      title: "Clover Luck Boosters",
      category: "Buffs",
      description:
        "Stack 4-leaf clover power-ups to dramatically increase your chances of hatching legendary and mythic grade eggs.",
      iconImage: asset("/assets/images/clover_luck.png"),
      badge: "Boost",
      color: "from-emerald-500/20 to-green-500/20 border-emerald-500/30",
    },
    {
      id: "playtime-rewards",
      title: "Playtime Mystery Gifts",
      category: "Rewards",
      description:
        "Get rewarded simply for playing! Claim free timed loot chests at 5, 15, and 30-minute intervals containing free coins, gems, and rare boost potions.",
      iconImage: asset("/assets/images/promo_gift.png"),
      badge: "Free Loot",
      color: "from-rose-500/20 to-red-500/20 border-rose-500/30",
    },
    {
      id: "cartoon-shop",
      title: "In-Game Merchant Shop",
      category: "Shop",
      description:
        "Exchange your amassed wealth for permanent upgrades, exclusive cosmetics, speed boots, and special starter packs to turbocharge your climb.",
      iconImage: asset("/assets/images/shop_cartoon.png"),
      badge: "Store",
      color: "from-indigo-500/20 to-violet-500/20 border-indigo-500/30",
    },
  ],
  gallery: [
    {
      id: "official-game-cover",
      title: "Official Egg Incremental Art",
      category: "gameplay",
      imageUrl: asset("/assets/images/official_game_icon.png"),
      caption:
        "Official game cover featuring the cracked Golden Egg filled with mini village structures, upward multiplier graphs, and progression coins.",
    },
    {
      id: "guardians-at-chest",
      title: "Founders Guarding the Bitcoin Chest",
      category: "gameplay",
      imageUrl: asset("/assets/images/capture_guardians_chest.png"),
      caption:
        "Official in-game capture featuring creators IAyakaal and mamouny54 standing guard in front of the massive Bitcoin Chest.",
    },
    {
      id: "cosmic-egg-render",
      title: "Mystic Cosmic Egg with Orbital Ring",
      category: "items",
      imageUrl: asset("/assets/images/cosmic_egg.png"),
      caption:
        "High-tier celestial egg model featuring vibrant magenta gradients and orbital energy band.",
    },
    {
      id: "cartoon-shop-facade",
      title: "Plaza Merchant Shop",
      category: "items",
      imageUrl: asset("/assets/images/shop_cartoon.png"),
      caption:
        "The lively in-game market stall where players can purchase gear, boosters, and equipment upgrades.",
    },
    {
      id: "playtime-gift-chest",
      title: "Timed Playtime Gift Crate",
      category: "events",
      imageUrl: asset("/assets/images/promo_gift.png"),
      caption:
        "Earnable milestone reward box granted to active players during daily play sessions.",
    },
    {
      id: "mystic-fountain-structure",
      title: "Luminescent Wish Fountain",
      category: "gameplay",
      imageUrl: asset("/assets/images/fountain_magic.png"),
      caption:
        "The sacred fountain zone where water bursts grant temporary global luck blessings.",
    },
    {
      id: "bitcoin-emblem",
      title: "Golden Bitcoin Coin Emblem",
      category: "items",
      imageUrl: asset("/assets/images/bitcoin_coin.png"),
      caption:
        "The iconic currency token representing the ultimate economic milestones in the game.",
    },
  ],
  analytics: {
    enabled: false, // Privacy first: disabled by default, easily enabled via environment or config
    provider: "none",
  },
  seo: {
    title: "[NEW] 🥚 Egg Incremental Simulator - Official Roblox Showcase",
    description:
      "Play Egg Incremental Simulator on Roblox! Tap to grow, hatch cosmic eggs, forge powerful hammer upgrades, and conquer the Guardian Chest in this vibrant incremental adventure.",
    keywords: [
      "Roblox",
      "Egg Incremental Simulator",
      "Roblox Simulator",
      "Egg Simulator",
      "Roblox Games",
      "Incremental Game",
      "Roblox QLF INC",
      "Roblox Tycoon",
    ],
    siteUrl: "https://eggincrementalsimulator.com",
    ogImage: asset("/assets/images/official_game_icon.png"),
    themeColor: "#f59e0b",
  },
};
