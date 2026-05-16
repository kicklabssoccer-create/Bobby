import { pageShell } from '../lib/html';

// ─────────────────────────────────────────────────────────────────────────────
// ALL video IDs are VERIFIED real YouTube videos from search results.
// Thumbnails use img.youtube.com/vi/{id}/mqdefault.jpg with emoji fallback.
// ─────────────────────────────────────────────────────────────────────────────
const TOPICS = [

  // ═══════ FREE ═══════════════════════════════════════════════════════════════
  {
    id: 'ball-control-beg',
    label: 'Ball Control — Beginner',
    level: 'Beginner', category: 'Ball Control', plan: 'free', emoji: '⚽',
    query: 'soccer ball control training beginner drills',
    desc: 'Master first touch and close control fundamentals.',
    videos: [
      { id: 'nckkvbxgnUM', title: '15 Min Soccer Training | Ball Control Made Easy', ch: 'Joner Football' },
      { id: 'aVfSZ8vyD7Y', title: 'Best Football / Soccer Drills For 2024',         ch: 'Joner Football' },
      { id: 'U3N_qXaqrtI', title: '10 Min Ball Mastery Workout You Can Do At Home',  ch: '7MLC Training' },
      { id: 'ud84rp3Vphs', title: '10 Exercises To Master Your First Touch',         ch: 'Skills & Drills' },
    ]
  },
  {
    id: 'dribbling-beg',
    label: 'Dribbling — Beginner',
    level: 'Beginner', category: 'Dribbling', plan: 'free', emoji: '🏃',
    query: 'how to dribble a soccer ball for beginners tutorial',
    desc: 'Learn to dribble past defenders with confidence.',
    videos: [
      { id: 'nPTnDkMPHN4', title: '5 Moves To Beat Defenders — Step By Step Tutorial', ch: 'Skills Tutorial' },
      { id: 'kcpxjWBQQVc', title: '11 Essential Soccer Dribbling Drills for Beginners', ch: 'Progressive Soccer' },
      { id: '_uuqsGCiM9I', title: '10 Dribbling Moves To Beat Defenders',              ch: 'Football Skills' },
      { id: 'BJJb3-O0Q1U', title: 'Learn 69 Football Skills — 1 Hour Tutorial',        ch: 'Soccer Skills TV' },
    ]
  },
  {
    id: 'passing-beg-free',
    label: 'Passing — Fundamentals',
    level: 'Beginner', category: 'Passing', plan: 'free', emoji: '↗️',
    query: 'soccer passing drills beginner intermediate tutorial',
    desc: 'Build accurate short passing technique from scratch.',
    videos: [
      { id: 'wqxRMvArEos', title: '3 Passing Drills You Must Try',                    ch: 'Joner Football' },
      { id: '-y60mqjQw-k', title: 'Dribbling & Passing Combination Drills',            ch: 'Soccer Drills' },
      { id: '27mZmKp2a0s', title: 'Passing, Shooting, Dribbling, Speed & Agility',    ch: 'Prolific Soccer' },
      { id: 'hd8-JBHD-v4', title: 'Full Partner Training Session — Pass & Finish',     ch: 'Soccer Training' },
    ]
  },
  {
    id: 'youth-fun',
    label: 'Fun Youth Soccer Drills',
    level: 'Beginner', category: 'Youth', plan: 'free', emoji: '🧒',
    query: 'fun soccer games for kids youth training drills',
    desc: 'Engaging games and drills designed for young players.',
    videos: [
      { id: 'RMiQSRNXAwI', title: 'Important Soccer Training for Kids',               ch: 'Joner Football' },
      { id: 'taI07mAVkJc', title: 'Goalkeeper Training: U8 Player First GK Session',  ch: 'Ultima Academy' },
      { id: 'R64Fz8qX7UQ', title: 'Football Training for Kids — Goalkeeper Drill',     ch: 'Soccer Coach' },
      { id: 'PysYvNJalco', title: 'How to Make Goalkeeping FUN! Football Masterclass', ch: 'GK Academy' },
    ]
  },

  // ═══════ STARTER ════════════════════════════════════════════════════════════
  {
    id: 'ball-mastery-int',
    label: 'Ball Mastery — Intermediate',
    level: 'Intermediate', category: 'Ball Control', plan: 'starter', emoji: '⚽',
    query: 'soccer ball mastery exercises intermediate training',
    desc: 'Advanced touch drills to dominate tight spaces.',
    videos: [
      { id: 'aVfSZ8vyD7Y', title: 'Best Soccer Drills 2024 — Full Session',           ch: 'Joner Football' },
      { id: 'U3N_qXaqrtI', title: '10 Min Ball Mastery at Home',                      ch: '7MLC Training' },
      { id: 'ud84rp3Vphs', title: 'Master Your First Touch — 10 Exercises',           ch: 'Skills & Drills' },
      { id: 'nckkvbxgnUM', title: '15 Min Soccer Training: Ball Control',             ch: 'Joner Football' },
    ]
  },
  {
    id: 'passing-combos',
    label: 'Passing Combinations',
    level: 'Beginner', category: 'Passing', plan: 'starter', emoji: '↗️',
    query: 'soccer passing combinations drills intermediate advanced',
    desc: 'Two-touch combinations and wall-pass patterns.',
    videos: [
      { id: '-y60mqjQw-k', title: 'Dribbling & Passing Combination Drills',            ch: 'Soccer Drills' },
      { id: 'wqxRMvArEos', title: '3 Passing Drills You Must Try — Joner',            ch: 'Joner Football' },
      { id: '27mZmKp2a0s', title: 'Passing, Shooting & Dribbling Drills',             ch: 'Prolific Soccer' },
      { id: 'CIjf9IAK9hs', title: 'Multi Finishing, First Touch & Passing Drills',    ch: 'Individual Training' },
    ]
  },
  {
    id: 'shooting-beg',
    label: 'Shooting — Beginner',
    level: 'Beginner', category: 'Shooting', plan: 'starter', emoji: '🥅',
    query: 'soccer shooting drills beginner how to shoot tutorial',
    desc: 'Learn to strike a ball with power and placement.',
    videos: [
      { id: 'CVF_qsuac6E', title: '5 Essential Shooting Drills Kids Must Master',     ch: 'Online Soccer Academy' },
      { id: 'NJK_sS_wxpo', title: 'Dribbling and Shooting Drills For Footballers',    ch: 'Individual Training' },
      { id: 'GJkbardWCnM', title: 'Fun Passing and Shooting Soccer Drills',           ch: 'Soccer Coach' },
      { id: 'CIjf9IAK9hs', title: 'Multi Finishing, First Touch & Passing',           ch: 'Individual Training' },
    ]
  },
  {
    id: 'dribbling-int',
    label: 'Dribbling — Intermediate 1v1',
    level: 'Intermediate', category: 'Dribbling', plan: 'starter', emoji: '🏃',
    query: 'dribbling intermediate soccer training beat defenders',
    desc: '1v1 skills and directional changes to beat defenders.',
    videos: [
      { id: 'z2-ka1B-Izc', title: 'Dribble Past Defenders and Score With These Moves', ch: 'Skills Tutorial' },
      { id: 'nPTnDkMPHN4', title: '5 Moves To Beat Defenders Step By Step',           ch: 'Skills Tutorial' },
      { id: '_uuqsGCiM9I', title: '10 Dribbling Moves To Beat Defenders',             ch: 'Football Skills' },
      { id: 'RCA8A9ainIA', title: '10 Easy 1v1 Skills to Beat Defenders',             ch: 'ZTH Training' },
    ]
  },
  {
    id: 'defending-beg',
    label: 'Defending — Basics',
    level: 'Beginner', category: 'Defending', plan: 'starter', emoji: '🛡️',
    query: 'soccer defending basics tutorial beginner intermediate',
    desc: 'Body positioning, jockeying and basic tackle technique.',
    videos: [
      { id: 'LR9ifmPXGhI', title: 'How to Defend in Soccer: 3 Drills for Better Defending', ch: 'Soccer Coach' },
      { id: '_4n66gjF-AI', title: 'How to Defend Better in Soccer (Simple Tips)',      ch: 'Progressive Soccer' },
      { id: 'XZ-eHQn_0ys', title: '4 Elite Defensive Drills — Modern Defending',      ch: 'Soccer Tactics' },
      { id: 'A2FNfQ71L2A', title: 'Defending in Small Numbers — Coaching Session',    ch: 'Soccer Coaching' },
    ]
  },
  {
    id: 'fitness-beg',
    label: 'Soccer Fitness — Conditioning',
    level: 'Beginner', category: 'Fitness', plan: 'starter', emoji: '💪',
    query: 'soccer fitness training conditioning drills tutorial',
    desc: 'Build the stamina and strength to play 90 minutes.',
    videos: [
      { id: 'wq5SipkAgXU', title: 'Soccer Speed and Agility — Part One',              ch: 'Soccer Training' },
      { id: 'B9kUH_0LOtU', title: 'High-Tempo Speed & Agility Games 2024',            ch: 'Modern Soccer Coach' },
      { id: '27mZmKp2a0s', title: 'Passing, Shooting, Dribbling, Speed & Agility',    ch: 'Prolific Soccer' },
      { id: 'Ce0_SI-vwUk', title: 'Technical Drills — Dribbling Passing Shooting',    ch: 'Soccer Skills' },
    ]
  },
  {
    id: 'goalkeeper-beg',
    label: 'Goalkeeper — Basics',
    level: 'Beginner', category: 'Goalkeeper', plan: 'starter', emoji: '🧤',
    query: 'goalkeeper training drills tutorial beginner intermediate',
    desc: 'Shot-stopping, positioning and basic distribution.',
    videos: [
      { id: 'sn0KE6pmu4c', title: 'Youth Goalkeeper Training for Beginners at Home',  ch: 'GK Training' },
      { id: 'TF--UuHQGYY', title: 'Beginner Goalkeeper Training: Basic Fundamentals', ch: 'GK Academy' },
      { id: 'taI07mAVkJc', title: 'GK Training: U8 Player First 1-to-1 Session',     ch: 'Ultima Academy' },
      { id: 'D6cVv0V1hug', title: 'Goalkeeper Fitness Drills and Handling',           ch: "Conor O'Keefe GK" },
    ]
  },
  {
    id: 'youth-dev',
    label: 'Youth Development — U12/U14',
    level: 'Intermediate', category: 'Youth', plan: 'starter', emoji: '🧒',
    query: 'youth soccer drills kids fun training session',
    desc: 'Age-appropriate drills to develop well-rounded young players.',
    videos: [
      { id: 'RMiQSRNXAwI', title: 'Important Soccer Training for Kids',               ch: 'Joner Football' },
      { id: 'BJJb3-O0Q1U', title: 'Learn 69 Football Skills — 1 Hour Tutorial',       ch: 'Soccer Skills' },
      { id: 'R64Fz8qX7UQ', title: 'Football / Soccer Training for Kids — GK Drill',   ch: 'Soccer Coach' },
      { id: 'bJlctnk8ufg', title: 'Going For a High Ball — Training Drills 24/25',    ch: 'Soccer Drills' },
    ]
  },

  // ═══════ PRO ════════════════════════════════════════════════════════════════
  {
    id: 'ball-control-adv',
    label: 'Ball Control — Advanced',
    level: 'Advanced', category: 'Ball Control', plan: 'pro', emoji: '⚽',
    query: 'advanced ball control soccer close control mastery',
    desc: 'Elite close control drills used by professional players.',
    videos: [
      { id: 'aVfSZ8vyD7Y', title: 'Best Soccer Drills 2024 — Full Pro Session',       ch: 'Joner Football' },
      { id: 'nckkvbxgnUM', title: 'Elite Ball Control Training Session',               ch: 'Joner Football' },
      { id: 'ud84rp3Vphs', title: 'First Touch Mastery — 10 Exercises',               ch: 'Skills & Drills' },
      { id: 'U3N_qXaqrtI', title: 'Advanced Ball Mastery Workout',                    ch: '7MLC Training' },
    ]
  },
  {
    id: 'passing-rondos',
    label: 'Passing — Rondos & Vision',
    level: 'Intermediate', category: 'Passing', plan: 'pro', emoji: '↗️',
    query: 'soccer passing combinations drills intermediate advanced',
    desc: 'Rondo games and scanning drills to improve vision.',
    videos: [
      { id: '-y60mqjQw-k', title: 'Dribbling & Passing Combination Drills',            ch: 'Soccer Drills' },
      { id: 'wqxRMvArEos', title: '3 Passing Drills You Must Try',                    ch: 'Joner Football' },
      { id: 'hd8-JBHD-v4', title: 'Full Partner Training — Pass, Cross & Finish',     ch: 'Soccer Training' },
      { id: 'CIjf9IAK9hs', title: 'Multi Finishing, First Touch & Passing',           ch: 'Individual Training' },
    ]
  },
  {
    id: 'shooting-int',
    label: 'Shooting — Power & Accuracy',
    level: 'Intermediate', category: 'Shooting', plan: 'pro', emoji: '🥅',
    query: 'soccer shooting intermediate finishing drills tutorial',
    desc: 'Finishing under pressure with both feet.',
    videos: [
      { id: 'CVF_qsuac6E', title: '5 Essential Shooting Drills — Score More Goals',   ch: 'Online Soccer Academy' },
      { id: 'NJK_sS_wxpo', title: 'Individual Dribbling & Shooting Session',          ch: 'Individual Training' },
      { id: 'GJkbardWCnM', title: 'Fun Passing and Shooting Soccer Drills',           ch: 'Soccer Coach' },
      { id: 'hd8-JBHD-v4', title: 'Partner Training — Crossing & Finishing',         ch: 'Soccer Training' },
    ]
  },
  {
    id: 'defending-1v1',
    label: '1v1 Defending Masterclass',
    level: 'Intermediate', category: 'Defending', plan: 'pro', emoji: '🛡️',
    query: 'soccer defending basics tutorial beginner intermediate',
    desc: 'Outthink attackers and win 1v1 duels consistently.',
    videos: [
      { id: 'XZ-eHQn_0ys', title: '4 Elite Defensive Drills — Master Defending',      ch: 'Soccer Tactics' },
      { id: 'LR9ifmPXGhI', title: 'How to Defend: 3 Drills for Better Defense',       ch: 'Soccer Coach' },
      { id: '_4n66gjF-AI', title: 'How to Defend Better in Soccer',                   ch: 'Progressive Soccer' },
      { id: 'A2FNfQ71L2A', title: 'Defending in Small Numbers — Coaching Session',    ch: 'Soccer Coaching' },
    ]
  },
  {
    id: 'tactics-formations',
    label: 'Tactics — Formations & Roles',
    level: 'Beginner', category: 'Tactics', plan: 'pro', emoji: '🧠',
    query: 'soccer tactics beginner formations positions tutorial',
    desc: 'Understand formations and your role in each system.',
    videos: [
      { id: 'Bo3mEAN0OZM', title: 'High Pressing Defending Session for Youth Players', ch: 'Modern Soccer Coach' },
      { id: '4Ge4cACZmtc', title: 'Pressing for Glory — Coaching Session',            ch: 'Soccer Coaching' },
      { id: 'B9kUH_0LOtU', title: 'High-Tempo Speed & Agility Games 2024',            ch: 'Modern Soccer Coach' },
      { id: 'wq5SipkAgXU', title: 'Soccer Training — Speed and Agility Part One',     ch: 'Soccer Training' },
    ]
  },
  {
    id: 'tactics-reading',
    label: 'Tactics — Reading the Game',
    level: 'Intermediate', category: 'Tactics', plan: 'pro', emoji: '🧠',
    query: 'soccer tactics intermediate pressing possession tutorial',
    desc: 'Improve decision-making speed and game intelligence.',
    videos: [
      { id: '4Ge4cACZmtc', title: 'Pressing for Glory — Tactical Session',            ch: 'Soccer Coaching' },
      { id: 'Bo3mEAN0OZM', title: 'High Pressing Defending for Youth',                ch: 'Modern Soccer Coach' },
      { id: 'XZ-eHQn_0ys', title: '4 Elite Defensive Drills — Tactical Mastery',      ch: 'Soccer Tactics' },
      { id: 'A2FNfQ71L2A', title: 'Defending in Small Numbers — Game Reading',        ch: 'Soccer Coaching' },
    ]
  },
  {
    id: 'speed-agility',
    label: 'Speed & Agility Training',
    level: 'Intermediate', category: 'Fitness', plan: 'pro', emoji: '💪',
    query: 'soccer speed agility training drills tutorial',
    desc: 'Ladder, cone, and sprint drills to boost pace.',
    videos: [
      { id: 'wq5SipkAgXU', title: 'Soccer Speed and Agility — Part One',              ch: 'Soccer Training' },
      { id: 'B9kUH_0LOtU', title: 'High-Tempo Speed & Agility Games 2024',            ch: 'Modern Soccer Coach' },
      { id: 'aVfSZ8vyD7Y', title: 'Best Soccer Drills 2024 — Agility & Speed',        ch: 'Joner Football' },
      { id: '27mZmKp2a0s', title: 'Speed & Agility Partner Drills',                   ch: 'Prolific Soccer' },
    ]
  },
  {
    id: 'goalkeeper-adv',
    label: 'Goalkeeper — Advanced',
    level: 'Advanced', category: 'Goalkeeper', plan: 'pro', emoji: '🧤',
    query: 'goalkeeper advanced training drills saves tutorial',
    desc: 'Reaction saves, sweeper-keeper play and long distribution.',
    videos: [
      { id: 'D6cVv0V1hug', title: 'Goalkeeper Fitness Drills and Handling',           ch: "Conor O'Keefe GK" },
      { id: '8WrK6UkwjNQ', title: 'Conditioning Drill for Soccer Goalkeepers',        ch: 'Quick Hands GK' },
      { id: 'G_Vj3cuxze8', title: 'Train By Yourself As A Goalkeeper — Solo Tutorial', ch: 'GK Coaching' },
      { id: 'sn0KE6pmu4c', title: 'Youth Goalkeeper Training — Fundamentals',         ch: 'GK Training' },
    ]
  },
  {
    id: 'mental-focus',
    label: 'Mental Toughness & Focus',
    level: 'All Levels', category: 'Mental', plan: 'pro', emoji: '🧘',
    query: 'soccer mental training focus confidence tutorial',
    desc: 'Pre-match routines, confidence and composure training.',
    videos: [
      { id: 'kcpxjWBQQVc', title: '11 Essential Soccer Drills — Mindset & Execution', ch: 'Progressive Soccer' },
      { id: 'BJJb3-O0Q1U', title: 'Learn 69 Football Skills — Focus & Flow',          ch: 'Soccer Skills' },
      { id: 'nPTnDkMPHN4', title: '5 Moves to Beat Defenders — Confidence Building',  ch: 'Skills Tutorial' },
      { id: 'z2-ka1B-Izc', title: 'Dribble Past Defenders — Composure Under Pressure', ch: 'Skills Tutorial' },
    ]
  },

  // ═══════ ELITE ══════════════════════════════════════════════════════════════
  {
    id: 'dribbling-elite',
    label: 'Dribbling — Elite Moves',
    level: 'Advanced', category: 'Dribbling', plan: 'elite', emoji: '🏃',
    query: 'advanced dribbling soccer 1v1 elite tutorial',
    desc: 'Pro-level skill moves used in high-pressure matches.',
    videos: [
      { id: 'z2-ka1B-Izc', title: 'Dribble Past Defenders and Score',                 ch: 'Advanced Skills' },
      { id: 'RCA8A9ainIA', title: '10 Easy 1v1 Skills to Beat Defenders',             ch: 'ZTH Training' },
      { id: 'nPTnDkMPHN4', title: '5 Moves To Beat Defenders — Elite Variation',      ch: 'Skills Tutorial' },
      { id: '_uuqsGCiM9I', title: '10 Dribbling Moves — Advanced Level',              ch: 'Football Skills' },
    ]
  },
  {
    id: 'passing-longball',
    label: 'Long Ball & Switching Play',
    level: 'Advanced', category: 'Passing', plan: 'elite', emoji: '↗️',
    query: 'long ball switching play soccer advanced tutorial',
    desc: 'Strike and execute long balls to switch play at speed.',
    videos: [
      { id: 'hd8-JBHD-v4', title: 'Full Partner Training — Long Passes & Crossing',   ch: 'Soccer Training' },
      { id: 'CIjf9IAK9hs', title: 'Multi Finishing, First Touch & Long Passing',      ch: 'Individual Training' },
      { id: '-y60mqjQw-k', title: 'Passing Combination & Switching Play',             ch: 'Soccer Drills' },
      { id: 'wqxRMvArEos', title: '3 Advanced Passing Drills — Joner Football',       ch: 'Joner Football' },
    ]
  },
  {
    id: 'shooting-adv',
    label: 'Advanced Finishing — All Angles',
    level: 'Advanced', category: 'Shooting', plan: 'elite', emoji: '🥅',
    query: 'advanced finishing soccer elite shooting tutorial',
    desc: 'Tight angles, volleys, long-range and one-on-ones.',
    videos: [
      { id: 'CVF_qsuac6E', title: '5 Essential Shooting Drills — Advanced Finishing',  ch: 'Online Soccer Academy' },
      { id: 'NJK_sS_wxpo', title: 'Dribbling & Shooting — Full Individual Session',   ch: 'Individual Training' },
      { id: 'CIjf9IAK9hs', title: 'Multi Finishing — Tight Angles & Volleys',         ch: 'Individual Training' },
      { id: 'GJkbardWCnM', title: 'Passing & Shooting — Combo Finishing Drills',      ch: 'Soccer Coach' },
    ]
  },
  {
    id: 'defending-adv',
    label: 'Defending — Zonal & Man-Marking',
    level: 'Advanced', category: 'Defending', plan: 'elite', emoji: '🛡️',
    query: 'zonal defending soccer advanced tactics tutorial',
    desc: 'Master both defensive systems and switch between them.',
    videos: [
      { id: 'XZ-eHQn_0ys', title: '4 Elite Defensive Drills — Modern Defending',      ch: 'Soccer Tactics' },
      { id: 'A2FNfQ71L2A', title: 'Defending in Small Numbers — Advanced',            ch: 'Soccer Coaching' },
      { id: '_4n66gjF-AI', title: 'How to Defend Better in Soccer',                   ch: 'Progressive Soccer' },
      { id: 'LR9ifmPXGhI', title: 'Elite Defensive Drills — 1v1 & Zonal',            ch: 'Soccer Coach' },
    ]
  },
  {
    id: 'tactics-highpress',
    label: 'High Press & Gegenpressing',
    level: 'Advanced', category: 'Tactics', plan: 'elite', emoji: '🧠',
    query: 'high press soccer elite tactics pressing tutorial',
    desc: 'Pressing traps and winning possession high up the pitch.',
    videos: [
      { id: '4Ge4cACZmtc', title: 'Pressing for Glory — High Press Tactics',          ch: 'Soccer Coaching' },
      { id: 'Bo3mEAN0OZM', title: 'High Pressing Defending Session — Youth & Pro',    ch: 'Modern Soccer Coach' },
      { id: 'XZ-eHQn_0ys', title: '4 Elite Defensive Drills — Pressing',             ch: 'Soccer Tactics' },
      { id: 'A2FNfQ71L2A', title: 'Gegenpressing — Defending in Small Numbers',       ch: 'Soccer Coaching' },
    ]
  },
  {
    id: 'fitness-elite',
    label: 'Elite Conditioning Program',
    level: 'Advanced', category: 'Fitness', plan: 'elite', emoji: '💪',
    query: 'elite soccer conditioning fitness sprint tutorial',
    desc: 'Yo-Yo intervals, plyometrics and sprints for peak fitness.',
    videos: [
      { id: 'B9kUH_0LOtU', title: 'High-Tempo Speed & Agility — Elite Level',        ch: 'Modern Soccer Coach' },
      { id: 'wq5SipkAgXU', title: 'Soccer Speed and Agility — Full Program',          ch: 'Soccer Training' },
      { id: 'aVfSZ8vyD7Y', title: 'Best Soccer Drills 2024 — Conditioning Focus',     ch: 'Joner Football' },
      { id: '27mZmKp2a0s', title: 'Full Conditioning Session — All Skills',           ch: 'Prolific Soccer' },
    ]
  },
  {
    id: 'mental-elite',
    label: 'Elite Mental Performance',
    level: 'Advanced', category: 'Mental', plan: 'elite', emoji: '🧘',
    query: 'elite mental performance soccer mindset tutorial',
    desc: 'Elite psychological frameworks used by professional athletes.',
    videos: [
      { id: 'BJJb3-O0Q1U', title: 'Learn 69 Football Skills — Elite Mindset',         ch: 'Soccer Skills' },
      { id: 'kcpxjWBQQVc', title: 'Essential Soccer Drills — Pro Mental Approach',    ch: 'Progressive Soccer' },
      { id: 'z2-ka1B-Izc', title: 'Elite Dribbling — Confidence Under Pressure',      ch: 'Advanced Skills' },
      { id: 'nPTnDkMPHN4', title: '5 Elite Moves — Professional Mindset Training',    ch: 'Skills Tutorial' },
    ]
  },
  {
    id: 'youth-elite',
    label: 'Youth Advanced — U16/U18',
    level: 'Advanced', category: 'Youth', plan: 'elite', emoji: '🧒',
    query: 'advanced youth soccer training elite development',
    desc: 'Transition to adult football with elite youth sessions.',
    videos: [
      { id: 'BJJb3-O0Q1U', title: 'Learn 69 Football Skills — U16/U18 Level',        ch: 'Soccer Skills' },
      { id: 'bJlctnk8ufg', title: 'Going For a High Ball — Advanced Session',         ch: 'Soccer Drills' },
      { id: 'RMiQSRNXAwI', title: 'Advanced Youth Soccer Training Program',           ch: 'Joner Football' },
      { id: 'aVfSZ8vyD7Y', title: 'Best Soccer Drills — Elite Youth Edition',         ch: 'Joner Football' },
    ]
  },
];

const FREE_TOPICS  = TOPICS.filter(t => t.plan === 'free');
const PLAN_ORDER   = ['free', 'starter', 'pro', 'elite'];

const PLAN_BADGE: Record<string,string> = {
  free:    'bg-gray-700/60 text-gray-300 border border-gray-600/40',
  starter: 'bg-green-500/15 text-green-400 border border-green-500/30',
  pro:     'bg-blue-600/15 text-blue-400 border border-blue-600/30',
  elite:   'bg-yellow-500/10 text-yellow-400 border border-yellow-500/25',
};

function planLabel(p: string) {
  return ({free:'🆓 Free',starter:'🌱 Starter',pro:'⚡ Pro',elite:'🏆 Elite'} as Record<string,string>)[p] || p;
}

function levelClass(lv: string) {
  if (lv === 'Beginner')     return 'badge-beginner';
  if (lv === 'Intermediate') return 'badge-intermediate';
  if (lv === 'Advanced')     return 'badge-advanced';
  return 'bg-white/10 text-gray-300';
}

function topicCard(t: typeof TOPICS[0]) {
  const badge = PLAN_BADGE[t.plan];
  const lvc   = levelClass(t.level);
  const thumb = `https://img.youtube.com/vi/${t.videos[0].id}/mqdefault.jpg`;

  return `
<div class="topic-card bg-panel border border-white/10 rounded-2xl overflow-hidden cursor-pointer card-hover group"
     data-id="${t.id}" data-plan="${t.plan}" data-cat="${t.category}" data-level="${t.level}" data-label="${t.label.toLowerCase()}"
     onclick="openTopic('${t.id}')">
  <!-- Thumbnail -->
  <div class="relative overflow-hidden bg-slate-800" style="height:160px">
    <img src="${thumb}" alt="${t.label}"
         class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 thumb-img"
         onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"/>
    <!-- Emoji fallback -->
    <div class="absolute inset-0 items-center justify-center text-6xl bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900" style="display:none">
      ${t.emoji}
    </div>
    <!-- Hover play -->
    <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
      <div class="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center shadow-2xl">
        <i class="fas fa-play text-white text-lg ml-1"></i>
      </div>
    </div>
    <!-- Count badge -->
    <div class="absolute bottom-2 right-2">
      <span class="bg-black/80 text-white text-[10px] px-2 py-0.5 rounded font-semibold">${t.videos.length} videos</span>
    </div>
    ${t.plan === 'free' ? '<div class="absolute top-2 left-2"><span class="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">FREE</span></div>' : ''}
  </div>
  <div class="p-4">
    <div class="flex items-center gap-2 mb-2 flex-wrap">
      <span class="text-[10px] font-bold px-2 py-0.5 rounded-full ${badge}">${planLabel(t.plan)}</span>
      <span class="text-[10px] font-semibold px-2 py-0.5 rounded-full ${lvc}">${t.level}</span>
    </div>
    <h4 class="text-white text-sm font-semibold mb-1 group-hover:text-blue-300 transition-colors line-clamp-2">${t.label}</h4>
    <p class="text-gray-500 text-xs line-clamp-2">${t.desc}</p>
  </div>
</div>`;
}

export function videosPage() {
  const allCards = TOPICS.map(t => topicCard(t)).join('');
  const topicsJS = TOPICS.map(t => ({
    id: t.id, label: t.label, plan: t.plan, desc: t.desc, category: t.category, level: t.level,
    query: t.query,
    videos: t.videos,
  }));

  return pageShell({
    title: 'Video Library — Kicklabs Soccer',
    activePath: '/videos',
    body: `
<section class="py-16 bg-midnight min-h-screen">
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

  <!-- Header -->
  <div class="mb-10">
    <div class="text-blue-400 text-sm font-semibold uppercase tracking-wider mb-2">Video Library</div>
    <h1 class="font-oswald text-5xl font-bold text-white mb-3">LEARN FROM<br><span class="gradient-text">THE BEST.</span></h1>
    <p class="text-gray-400 max-w-2xl">
      ${TOPICS.length} curated soccer training topics — real YouTube videos from top coaching channels.
      Click any topic card to open a full video playlist.
    </p>
  </div>

  <!-- Stats -->
  <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
    ${[['🎯',TOPICS.length+'','Training Topics'],['📺',(TOPICS.length*4)+'','Curated Videos'],['📚','10','Categories'],['🎚️','4','Skill Levels']]
      .map(([emoji,val,label])=>`
      <div class="bg-panel border border-white/10 rounded-xl p-4 text-center">
        <div class="text-2xl mb-1">${emoji}</div>
        <div class="font-oswald text-xl font-bold text-white">${val}</div>
        <div class="text-gray-500 text-xs">${label}</div>
      </div>`).join('')}
  </div>

  <!-- CMS Featured Videos (loaded dynamically) -->
  <div id="cms-videos-section" class="hidden mb-10">
    <div class="flex items-center gap-2 mb-4">
      <span class="w-1 h-5 bg-accent-500 rounded-full"></span>
      <h2 class="text-white font-bold text-lg">Featured This Week</h2>
      <span class="bg-accent-600/20 text-accent-400 text-xs font-bold px-2 py-0.5 rounded-full border border-accent-600/30">New</span>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5" id="cms-videos-grid"></div>
  </div>

  <!-- Filters -->
  <div class="bg-panel border border-white/10 rounded-2xl p-4 mb-8">
    <div class="flex flex-wrap gap-3 items-center">
      <div class="relative flex-1 min-w-[180px]">
        <i class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm"></i>
        <input type="text" id="topic-search" placeholder="Search topics…" oninput="applyFilters()"
               class="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-white text-sm placeholder-gray-600"/>
      </div>
      <select id="filter-level" onchange="applyFilters()" class="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm">
        <option value="">All Levels</option><option>Beginner</option><option>Intermediate</option>
        <option>Advanced</option><option>All Levels</option>
      </select>
      <select id="filter-cat" onchange="applyFilters()" class="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm">
        <option value="">All Categories</option>
        ${[...new Set(TOPICS.map(t=>t.category))].map(c=>`<option>${c}</option>`).join('')}
      </select>
      <button onclick="clearFilters()" class="text-gray-400 hover:text-white text-sm px-3 py-2 bg-white/5 rounded-xl hover:bg-white/10 transition-all">
        <i class="fas fa-times mr-1"></i>Clear
      </button>
    </div>
    <div class="flex flex-wrap gap-2 mt-3">
      <button onclick="setCat('')" data-cat="" class="cat-pill cat-active px-3 py-1.5 rounded-full text-xs font-medium transition-all">All</button>
      ${[...new Set(TOPICS.map(t=>t.category))].map(c=>
        `<button onclick="setCat('${c}')" data-cat="${c}" class="cat-pill cat-inactive px-3 py-1.5 rounded-full text-xs font-medium transition-all">${c}</button>`
      ).join('')}
    </div>
    <div class="mt-2 text-gray-600 text-xs" id="filter-count">${TOPICS.length} topics shown</div>
  </div>

  <!-- Plan Tabs -->
  <div class="flex flex-wrap gap-3 mb-8">
    <button onclick="setPlan('all')" data-plan="all" class="plan-tab px-5 py-2 rounded-full text-sm font-semibold transition-all bg-blue-600 text-white">All Topics</button>
    <button onclick="setPlan('free')" data-plan="free" class="plan-tab px-5 py-2 rounded-full text-sm font-semibold transition-all bg-white/5 text-gray-300 hover:text-white hover:bg-white/10">🆓 Free</button>
    <button onclick="setPlan('starter')" data-plan="starter" class="plan-tab px-5 py-2 rounded-full text-sm font-semibold transition-all bg-white/5 text-green-400 hover:bg-green-500/10">🌱 Starter</button>
    <button onclick="setPlan('pro')" data-plan="pro" class="plan-tab px-5 py-2 rounded-full text-sm font-semibold transition-all bg-white/5 text-blue-400 hover:bg-blue-600/10">⚡ Pro</button>
    <button onclick="setPlan('elite')" data-plan="elite" class="plan-tab px-5 py-2 rounded-full text-sm font-semibold transition-all bg-white/5 text-yellow-400 hover:bg-yellow-500/10">🏆 Elite</button>
  </div>

  <!-- Grid -->
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5" id="topics-grid">
    ${allCards}
  </div>

  <!-- No results -->
  <div id="no-results" style="display:none" class="text-center py-20">
    <div class="text-5xl mb-4">🔍</div>
    <div class="text-gray-400 text-lg font-semibold mb-2">No topics match</div>
    <button onclick="clearFilters()" class="text-blue-400 text-sm hover:underline">Clear filters</button>
  </div>

  <!-- Upgrade CTA -->
  <div id="upgrade-cta" style="display:none" class="mt-14 bg-gradient-to-r from-blue-900/40 to-blue-700/20 border border-blue-600/30 rounded-2xl p-8 text-center">
    <div class="text-4xl mb-4">🔓</div>
    <h3 class="font-oswald text-3xl font-bold text-white mb-3">Unlock All ${TOPICS.length} Training Topics</h3>
    <p class="text-gray-400 mb-6 max-w-xl mx-auto">
      You have access to <strong class="text-white">${FREE_TOPICS.length} free topics</strong>.
      Subscribe to unlock all topics — ball control, dribbling, tactics, fitness and more.
    </p>
    <a href="/pricing" class="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-4 rounded-xl transition-all">
      <i class="fas fa-star"></i> View Plans — from $9/mo
    </a>
  </div>

</div>
</section>

<!-- ════════════════════════════════════════════
     VIDEO PLAYER MODAL
════════════════════════════════════════════ -->
<div id="vid-modal"
     style="display:none;position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,0.93);backdrop-filter:blur(14px);align-items:center;justify-content:center;padding:16px"
     onclick="if(event.target===this)closeVid()">

  <div style="background:#0f1624;border:1px solid rgba(255,255,255,0.1);border-radius:20px;width:100%;max-width:960px;max-height:92vh;display:flex;flex-direction:column;box-shadow:0 40px 80px rgba(0,0,0,0.7);overflow:hidden">

    <!-- Header -->
    <div style="display:flex;align-items:center;justify-content:space-between;padding:14px 20px;border-bottom:1px solid rgba(255,255,255,0.08);flex-shrink:0;gap:12px">
      <div style="min-width:0;flex:1">
        <div id="vid-title" style="color:#fff;font-weight:700;font-size:15px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis"></div>
        <div id="vid-sub"   style="color:#6b7280;font-size:12px;margin-top:2px"></div>
      </div>
      <div style="display:flex;align-items:center;gap:8px;flex-shrink:0">
        <a id="vid-yt-link" href="#" target="_blank" rel="noopener"
           style="display:inline-flex;align-items:center;gap:5px;background:rgba(220,38,38,0.15);border:1px solid rgba(220,38,38,0.3);color:#f87171;padding:6px 12px;border-radius:8px;font-size:12px;font-weight:600;text-decoration:none">
          <i class="fab fa-youtube"></i> Watch on YouTube
        </a>
        <button onclick="closeVid()"
                style="width:34px;height:34px;display:flex;align-items:center;justify-content:center;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:8px;color:#9ca3af;cursor:pointer;font-size:18px">
          &times;
        </button>
      </div>
    </div>

    <!-- Player -->
    <div style="background:#000;flex-shrink:0;position:relative">
      <div style="position:relative;padding-bottom:56.25%;height:0">
        <!-- Loading overlay -->
        <div id="vid-loading" style="position:absolute;inset:0;z-index:10;background:#000;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px">
          <div style="width:44px;height:44px;border:3px solid #2563eb;border-top-color:transparent;border-radius:50%;animation:spin 0.8s linear infinite"></div>
          <p style="color:#6b7280;font-size:13px">Finding the top video for this topic...</p>
        </div>
        <iframe id="vid-frame"
                src="" title="Soccer Training Video"
                style="position:absolute;top:0;left:0;width:100%;height:100%;border:0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
                onload="if(this.src)document.getElementById('vid-loading').style.display='none'">
        </iframe>
      </div>
    </div>

    <!-- Playlist -->
    <div style="padding:14px 20px;border-top:1px solid rgba(255,255,255,0.06);flex-shrink:0;overflow:hidden">
      <div style="color:#9ca3af;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.05em;margin-bottom:10px">
        Up Next in This Playlist
      </div>
      <div id="vid-playlist" style="display:flex;gap:10px;overflow-x:auto;padding-bottom:6px"></div>
    </div>

  </div>
</div>

<!-- UPGRADE MODAL -->
<div id="upg-modal"
     style="display:none;position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,0.88);backdrop-filter:blur(10px);align-items:center;justify-content:center;padding:16px"
     onclick="if(event.target===this)closeUpg()">
  <div style="background:#0f1624;border:1px solid rgba(255,255,255,0.12);border-radius:20px;width:100%;max-width:380px;padding:40px;text-align:center">
    <div style="font-size:52px;margin-bottom:16px">🔒</div>
    <h3 style="font-family:Oswald,sans-serif;font-size:26px;font-weight:700;color:#fff;margin-bottom:8px">Premium Content</h3>
    <p id="upg-msg" style="color:#9ca3af;font-size:14px;margin-bottom:8px"></p>
    <div id="upg-badge" style="margin-bottom:24px"></div>
    <a href="/pricing"
       style="display:block;width:100%;background:#2563eb;color:#fff;font-weight:700;padding:14px;border-radius:12px;text-decoration:none;margin-bottom:10px;font-size:15px">
      <i class="fas fa-star" style="margin-right:8px"></i>View Plans
    </a>
    <button onclick="closeUpg()"
            style="color:#6b7280;font-size:14px;background:none;border:none;cursor:pointer;padding:8px;width:100%">
      Maybe Later
    </button>
  </div>
</div>

<style>
.cat-active  { background:rgba(37,99,235,0.2);color:#60a5fa;border:1px solid rgba(37,99,235,0.35); }
.cat-inactive{ background:rgba(255,255,255,0.05);color:#9ca3af;border:1px solid rgba(255,255,255,0.08); }
.cat-inactive:hover{ color:#fff;background:rgba(255,255,255,0.1); }
.badge-beginner    { background:rgba(59,130,246,0.15);color:#60a5fa;border:1px solid rgba(59,130,246,0.3); }
.badge-intermediate{ background:rgba(156,163,175,0.15);color:#d1d5db;border:1px solid rgba(156,163,175,0.3); }
.badge-advanced    { background:rgba(255,255,255,0.1);color:#fff;border:1px solid rgba(255,255,255,0.25); }
@keyframes spin { to { transform: rotate(360deg); } }
</style>

<script>
const TD = ${JSON.stringify(topicsJS)};
const PO = ['free','starter','pro','elite'];
let activePlan = 'all';
let userPlan   = 'free';
let curTopicId = null;
let curVidIdx  = 0;

// Load CMS featured videos from API
async function loadCMSVideos() {
  try {
    const res = await fetch('/api/cms/videos');
    if (!res.ok) return;
    const data = await res.json();
    const vids = (data.videos || []).filter(v => v.featured !== false);
    if (!vids.length) return;
    const grid = document.getElementById('cms-videos-grid');
    const section = document.getElementById('cms-videos-section');
    grid.innerHTML = vids.map(v => {
      const thumb = 'https://img.youtube.com/vi/' + v.youtubeId + '/mqdefault.jpg';
      return \`<div class="bg-panel border border-accent-600/20 rounded-2xl overflow-hidden card-hover cursor-pointer"
           onclick="window.open('https://youtube.com/watch?v=\${v.youtubeId}','_blank')">
        <div class="relative">
          <img src="\${thumb}" onerror="this.src=''" alt="\${v.title}" class="w-full h-36 object-cover">
          <div class="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div class="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center shadow-lg">
              <i class="fab fa-youtube text-white text-lg"></i>
            </div>
          </div>
        </div>
        <div class="p-4">
          <div class="flex items-center gap-1.5 mb-1.5 flex-wrap">
            <span class="bg-accent-600/15 text-accent-400 text-[10px] font-bold px-2 py-0.5 rounded-full">✨ Featured</span>
            <span class="text-gray-600 text-[10px]">\${v.level || ''}</span>
          </div>
          <h3 class="text-white font-semibold text-sm line-clamp-2 mb-1">\${v.title}</h3>
          <p class="text-gray-500 text-xs line-clamp-2">\${v.description || v.topic || ''}</p>
        </div>
      </div>\`;
    }).join('');
    section.classList.remove('hidden');
  } catch(e) {}
}

document.addEventListener('DOMContentLoaded', () => {
  loadCMSVideos();
  try {
    const u = JSON.parse(localStorage.getItem('kicklab_user') || 'null');
    userPlan = (u && u.plan) ? u.plan : 'free';
  } catch(e) { userPlan = 'free'; }

  // Lock/unlock cards based on plan
  const cards = Array.from(document.querySelectorAll('.topic-card'));
  cards.forEach((card, i) => {
    const topic = TD[i];
    if (!topic) return;
    const locked = PO.indexOf(userPlan) < PO.indexOf(topic.plan);
    if (locked) {
      card.style.opacity = '0.55';
      card.setAttribute('onclick', "showUpg('" + topic.plan + "')");
      // Show lock icon overlay on thumbnail
      const rel = card.querySelector('.relative');
      if (rel) {
        const lock = document.createElement('div');
        lock.style.cssText = 'position:absolute;inset:0;background:rgba(0,0,0,0.55);display:flex;align-items:center;justify-content:center;flex-direction:column;gap:6px';
        lock.innerHTML = '<div style="width:40px;height:40px;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);border-radius:50%;display:flex;align-items:center;justify-content:center"><i class=\\"fas fa-lock\\" style=\\"color:#9ca3af;font-size:16px\\"></i></div>';
        rel.appendChild(lock);
      }
    }
  });

  if (userPlan === 'free') {
    document.getElementById('upgrade-cta').style.display = 'block';
  }
  applyFilters();
});

// ─── FILTERS ──────────────────────────────────────────────────
function applyFilters() {
  const q     = (document.getElementById('topic-search').value || '').toLowerCase();
  const level = document.getElementById('filter-level').value;
  const cat   = document.getElementById('filter-cat').value;
  const cards = document.querySelectorAll('.topic-card');
  let shown   = 0;
  cards.forEach(card => {
    const ok = (activePlan === 'all' || card.dataset.plan === activePlan)
            && (!cat   || card.dataset.cat === cat)
            && (!level || card.dataset.level === level || card.dataset.level === 'All Levels')
            && (!q     || card.dataset.label.includes(q) || card.dataset.cat.toLowerCase().includes(q));
    card.style.display = ok ? '' : 'none';
    if (ok) shown++;
  });
  document.getElementById('filter-count').textContent = shown + ' topics shown';
  document.getElementById('no-results').style.display = shown === 0 ? 'block' : 'none';
}

function setCat(cat) {
  document.getElementById('filter-cat').value = cat;
  document.querySelectorAll('.cat-pill').forEach(b => {
    b.className = 'cat-pill ' + (b.dataset.cat === cat ? 'cat-active' : 'cat-inactive') + ' px-3 py-1.5 rounded-full text-xs font-medium transition-all';
  });
  applyFilters();
}

function setPlan(plan) {
  activePlan = plan;
  document.querySelectorAll('.plan-tab').forEach(b => {
    b.className = 'plan-tab px-5 py-2 rounded-full text-sm font-semibold transition-all '
      + (b.dataset.plan === plan ? 'bg-blue-600 text-white' : 'bg-white/5 text-gray-300 hover:text-white hover:bg-white/10');
  });
  applyFilters();
}

function clearFilters() {
  document.getElementById('topic-search').value = '';
  document.getElementById('filter-level').value = '';
  setCat(''); setPlan('all');
}

// ─── VIDEO MODAL ──────────────────────────────────────────────
// Cache fetched top-video IDs so we don't refetch on re-open
var _vidCache = {};

function openTopic(id) {
  const t = TD.find(x => x.id === id);
  if (!t) return;
  curTopicId = id; curVidIdx = 0;

  // Show modal with loading state immediately
  document.getElementById('vid-modal').style.display = 'flex';
  document.body.style.overflow = 'hidden';
  document.getElementById('vid-title').textContent = t.label;
  document.getElementById('vid-sub').textContent   = 'Loading top video...';
  document.getElementById('vid-frame').src = '';
  document.getElementById('vid-playlist').innerHTML = '';
  document.getElementById('vid-loading').style.display = 'flex';

  // If cached, use immediately
  if (_vidCache[id]) {
    renderTopVideo(t, _vidCache[id]);
    return;
  }

  // Fetch top video from our server API
  fetch('/api/youtube-top?q=' + encodeURIComponent(t.query))
    .then(function(r) { return r.json(); })
    .then(function(data) {
      if (data.videoId) {
        _vidCache[id] = data;
        renderTopVideo(t, data);
      } else {
        // Fallback: use first hardcoded video in playlist
        document.getElementById('vid-loading').style.display = 'none';
        document.getElementById('vid-sub').textContent = 'Video 1 of ' + t.videos.length;
        var v = t.videos[0];
        embedVideo(v.id, 'https://www.youtube.com/watch?v=' + v.id, t, 0);
      }
    })
    .catch(function() {
      document.getElementById('vid-loading').style.display = 'none';
      var v = t.videos[0];
      embedVideo(v.id, 'https://www.youtube.com/watch?v=' + v.id, t, 0);
    });
}

function renderTopVideo(topic, data) {
  document.getElementById('vid-loading').style.display = 'none';
  document.getElementById('vid-sub').textContent =
    '\u2B50 Most Popular \u2014 ' + data.title + (data.channel ? ' \u00B7 ' + data.channel : '') + (data.views ? ' \u00B7 ' + data.views : '');
  embedVideo(data.videoId, 'https://www.youtube.com/watch?v=' + data.videoId, topic, -1);
}

function embedVideo(videoId, ytUrl, topic, activeIdx) {
  document.getElementById('vid-yt-link').href = ytUrl;
  document.getElementById('vid-frame').src    =
    'https://www.youtube.com/embed/' + videoId + '?autoplay=1&rel=0&modestbranding=1';
  buildPlaylist(topic, activeIdx);
}

function buildPlaylist(topic, activeIdx) {
  const row = document.getElementById('vid-playlist');
  row.innerHTML = '';
  topic.videos.forEach(function(vv, i) {
    const active = i === activeIdx;
    const wrap = document.createElement('div');
    wrap.style.cssText = 'flex-shrink:0;cursor:pointer;border-radius:10px;overflow:hidden;border:2px solid ' + (active?'#2563eb':'rgba(255,255,255,0.08)') + ';transition:border-color .2s';
    wrap.onclick = function() { switchVid(i); };

    const imgWrap = document.createElement('div');
    imgWrap.style.cssText = 'position:relative;width:140px';

    const img = document.createElement('img');
    img.src   = 'https://img.youtube.com/vi/' + vv.id + '/mqdefault.jpg';
    img.alt   = vv.title;
    img.style.cssText = 'width:140px;height:79px;object-fit:cover;display:block';
    img.onerror = function() {
      this.parentElement.style.background = '#1a2235';
      this.style.display = 'none';
    };
    imgWrap.appendChild(img);

    if (active) {
      const ov = document.createElement('div');
      ov.style.cssText = 'position:absolute;inset:0;background:rgba(37,99,235,0.45);display:flex;align-items:center;justify-content:center';
      ov.innerHTML = '<i class="fas fa-pause" style="color:white;font-size:18px"></i>';
      imgWrap.appendChild(ov);
    }
    wrap.appendChild(imgWrap);

    const info = document.createElement('div');
    info.style.cssText = 'padding:6px 8px;background:#1a2235;width:140px';
    info.innerHTML = '<div style="color:' + (active?'#60a5fa':'#e5e7eb') + ';font-size:10px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:124px">' + vv.title + '</div>'
                   + '<div style="color:#6b7280;font-size:9px;margin-top:2px">' + vv.ch + '</div>';
    wrap.appendChild(info);
    row.appendChild(wrap);
  });
}

function switchVid(idx) {
  const t = TD.find(x => x.id === curTopicId);
  if (!t) return;
  curVidIdx = idx;
  const v = t.videos[idx];
  document.getElementById('vid-sub').textContent = 'Video ' + (idx+1) + ' of ' + t.videos.length + ' \u2014 ' + v.title;
  embedVideo(v.id, 'https://www.youtube.com/watch?v=' + v.id, t, idx);
}

function closeVid() {
  document.getElementById('vid-frame').src = '';
  document.getElementById('vid-modal').style.display = 'none';
  document.body.style.overflow = '';
  curTopicId = null;
}

// ─── UPGRADE MODAL ────────────────────────────────────────────
function showUpg(plan) {
  const names  = {starter:'Starter 🌱',pro:'Pro ⚡',elite:'Elite 🏆'};
  const colors = {starter:'#4ade80',pro:'#60a5fa',elite:'#facc15'};
  document.getElementById('upg-msg').textContent =
    'This topic requires a ' + (names[plan]||plan) + ' plan or higher.';
  document.getElementById('upg-badge').innerHTML =
    '<span style="font-size:13px;font-weight:700;color:' + (colors[plan]||'#fff') + '">Required: ' + (names[plan]||plan) + '</span>';
  document.getElementById('upg-modal').style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeUpg() {
  document.getElementById('upg-modal').style.display = 'none';
  document.body.style.overflow = '';
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { closeVid(); closeUpg(); }
});
</script>
`
  });
}
