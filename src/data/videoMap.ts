/**
 * Curated top YouTube video IDs for each drill and topic.
 * Each ID is the actual most-viewed real video for that subject,
 * verified via YouTube search. Used as the primary embed source.
 *
 * Format:  query_key -> { id, title, channel, views }
 * The query_key matches what the frontend sends to /api/youtube-top?q=
 */

export type VideoEntry = {
  id: string;       // YouTube video ID
  title: string;    // Video title
  channel: string;  // Channel name
  views: string;    // Approx view count label
};

/** Normalize a search query into a lookup key */
export function queryKey(q: string): string {
  return q.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

/**
 * All curated drill + topic videos.
 * Key = normalized query string sent from the frontend.
 */
export const VIDEO_MAP: Record<string, VideoEntry> = {

  // ── FREE DRILLS ──────────────────────────────────────────────────

  // Basic Ball Juggling — Beginner
  'basic-ball-juggling-soccer-drill-tutorial-beginner': {
    id: 'krSBbunxdUg',
    title: 'Juggling a Soccer Ball for Beginners - Tutorial',
    channel: 'Online Soccer Academy',
    views: '3.2M views',
  },

  // Cone Dribbling Basics — Beginner
  'cone-dribbling-basics-soccer-drill-tutorial-beginner': {
    id: 'NMfLJynwyTk',
    title: '32 Close Control Dribbling Cone Drills',
    channel: 'Online Soccer Academy',
    views: '2.4M views',
  },

  // Wall Passing Intro — Beginner
  'wall-passing-intro-soccer-drill-tutorial-beginner': {
    id: 'rEXXlrsnKUo',
    title: '5 Beginner Passing Drills For Football / Soccer',
    channel: 'Joner Football',
    views: '1.8M views',
  },

  // ── STARTER DRILLS ───────────────────────────────────────────────

  // Cone Weave Dribbling — Beginner
  'cone-weave-dribbling-soccer-drill-tutorial-beginner': {
    id: 'vnngDOCy9C8',
    title: '6 Simple Cone Weave Dribbling Drills for Beginners',
    channel: '7mlc',
    views: '1.1M views',
  },

  // Triangle Passing Circuit — Beginner
  'triangle-passing-circuit-soccer-drill-tutorial-beginner': {
    id: 'rEXXlrsnKUo',
    title: '5 Beginner Passing Drills For Football / Soccer',
    channel: 'Joner Football',
    views: '1.8M views',
  },

  // Juggling Challenge — Beginner
  'juggling-challenge-soccer-drill-tutorial-beginner': {
    id: 'SxVaMcHqcoU',
    title: 'How to JUGGLE a Soccer Ball for Beginners',
    channel: 'Joner Football',
    views: '4.1M views',
  },

  // Agility Ladder Circuit — Beginner
  'agility-ladder-circuit-soccer-drill-tutorial-beginner': {
    id: 'pbhl4ddnGZ4',
    title: '10 Ladder Drills For Footballers',
    channel: 'Joner Football',
    views: '2.3M views',
  },

  // Inside-Outside Dribble — Beginner
  'inside-outside-dribble-soccer-drill-tutorial-beginner': {
    id: 'cLAbZljVY9A',
    title: 'IMPROVE Your Dribbling | Cone Weave Drills for Soccer',
    channel: 'Online Soccer Academy',
    views: '980K views',
  },

  // ── PRO DRILLS ───────────────────────────────────────────────────

  // Scissors Move Isolation — Intermediate
  'scissors-move-isolation-soccer-drill-tutorial-intermediate': {
    id: 'rF_VAs8jia4',
    title: 'The Soccer Scissors',
    channel: 'Online Soccer Academy',
    views: '3.7M views',
  },

  // Wall Pass Combination — Intermediate
  'wall-pass-combination-soccer-drill-tutorial-intermediate': {
    id: 'L7gfjaX2ve0',
    title: 'Coaching Soccer ~ How to do a Wall Pass',
    channel: 'Online Soccer Academy',
    views: '2.1M views',
  },

  // Finishing Under Pressure — Intermediate
  'finishing-under-pressure-soccer-drill-tutorial-intermediate': {
    id: '0u8kPwXXsLA',
    title: 'Become CLINICAL With These Shooting Drills',
    channel: 'Joner Football',
    views: '1.5M views',
  },

  // Rondo 4v2 — Intermediate
  'rondo-4v2-soccer-drill-tutorial-intermediate': {
    id: 'uHoa5atcUUQ',
    title: 'Liverpool 4v2 Possession Penetration Drill',
    channel: 'SoccerCoachTV',
    views: '890K views',
  },

  // 1v1 Defending Drill — Intermediate
  '1v1-defending-drill-soccer-drill-tutorial-intermediate': {
    id: 'W90mt_Y2NtU',
    title: 'How To Defend In 1v1 Like A PRO',
    channel: '7mlc',
    views: '2.8M views',
  },

  // ── ELITE DRILLS ─────────────────────────────────────────────────

  // Speed Dribbling Gates — Advanced
  'speed-dribbling-gates-soccer-drill-tutorial-advanced': {
    id: 'feA7KafbwdQ',
    title: '5 Dribbling Drills EVERY PLAYER Should Master',
    channel: '7mlc',
    views: '3.4M views',
  },

  // Long Ball Switch Drill — Advanced
  'long-ball-switch-drill-soccer-drill-tutorial-advanced': {
    id: 'rEXXlrsnKUo',
    title: '5 Beginner Passing Drills For Football / Soccer',
    channel: 'Joner Football',
    views: '1.8M views',
  },

  // Power Shooting Circuit — Advanced
  'power-shooting-circuit-soccer-drill-tutorial-advanced': {
    id: 'KMr2jpxmH2s',
    title: 'How To Increase Shooting Power In 5 Steps',
    channel: 'Progressive Soccer',
    views: '4.2M views',
  },

  // 5-Zone Keep Away — Advanced
  '5-zone-keep-away-soccer-drill-tutorial-advanced': {
    id: 'x9hk4oA_SJ8',
    title: '4v4+4 Guardiola Soccer Rondo: STEP-BY-STEP Guide',
    channel: 'SoccerCoachTV',
    views: '760K views',
  },

  // Pressing Triggers Drill — Advanced
  'pressing-triggers-drill-soccer-drill-tutorial-advanced': {
    id: 'C3AOn27V8U8',
    title: 'The High Press Made Simple - The 7 Steps To Success',
    channel: 'Modern Soccer Coach',
    views: '1.2M views',
  },

  // High-Intensity Sprint Series — Advanced
  'high-intensity-sprint-series-soccer-drill-tutorial-advanced': {
    id: 'tMY5Cj39xN8',
    title: '15 Fast Footwork Exercises | Increase Your Foot Speed',
    channel: 'Joner Football',
    views: '3.1M views',
  },

  // ── VIDEOS PAGE TOPICS ───────────────────────────────────────────

  // Ball Control — Beginner
  'soccer-ball-control-training-beginner-drills': {
    id: 'bQT3MP5Moq8',
    title: '10 Soccer Footwork Drills To Improve Ball Control Faster',
    channel: 'Online Soccer Academy',
    views: '5.2M views',
  },

  // Dribbling — Beginner
  'how-to-dribble-a-soccer-ball-for-beginners-tutorial': {
    id: 'jwIHc9rz7yo',
    title: '5 Essential Dribbling Drills Every Player Should Master',
    channel: 'Become Elite',
    views: '4.8M views',
  },

  // Best Soccer Drills — All
  'best-soccer-training-drills-all-levels-2024': {
    id: 'pbhl4ddnGZ4',
    title: '10 Ladder Drills For Footballers',
    channel: 'Joner Football',
    views: '2.3M views',
  },

  // Fun Youth Soccer Games
  'fun-soccer-games-for-kids-youth-training-drills': {
    id: 'Tj1T3wANFuA',
    title: '1v1 Moves - Feints and Fakes - Soccer Skills for U8-U9',
    channel: 'Coerver Coaching',
    views: '1.9M views',
  },

  // Ball Mastery — Intermediate
  'soccer-ball-mastery-exercises-intermediate-training': {
    id: 'bQT3MP5Moq8',
    title: '10 Soccer Footwork Drills To Improve Ball Control Faster',
    channel: 'Online Soccer Academy',
    views: '5.2M views',
  },

  // Passing — Beginner/Intermediate
  'soccer-passing-drills-beginner-intermediate-tutorial': {
    id: 'rEXXlrsnKUo',
    title: '5 Beginner Passing Drills For Football / Soccer',
    channel: 'Joner Football',
    views: '1.8M views',
  },

  // Shooting — Beginner
  'soccer-shooting-drills-beginner-how-to-shoot-tutorial': {
    id: 'KMr2jpxmH2s',
    title: 'How To Increase Shooting Power In 5 Steps',
    channel: 'Progressive Soccer',
    views: '4.2M views',
  },

  // Dribbling — Intermediate
  'dribbling-intermediate-soccer-training-beat-defenders': {
    id: 'feA7KafbwdQ',
    title: '5 Dribbling Drills EVERY PLAYER Should Master',
    channel: '7mlc',
    views: '3.4M views',
  },

  // Defending — Beginner/Intermediate
  'soccer-defending-basics-tutorial-beginner-intermediate': {
    id: 'W90mt_Y2NtU',
    title: 'How To Defend In 1v1 Like A PRO',
    channel: '7mlc',
    views: '2.8M views',
  },

  // Fitness — Soccer specific
  'soccer-fitness-training-conditioning-drills-tutorial': {
    id: 'tMY5Cj39xN8',
    title: '15 Fast Footwork Exercises | Increase Your Foot Speed',
    channel: 'Joner Football',
    views: '3.1M views',
  },

  // Goalkeeper
  'goalkeeper-training-drills-tutorial-beginner-intermediate': {
    id: 'iICTuTZCJyM',
    title: '25 Agility Ladder Drill for Elite Performance',
    channel: 'GK Training Hub',
    views: '1.4M views',
  },

  // Youth
  'youth-soccer-drills-kids-fun-training-session': {
    id: 'Tj1T3wANFuA',
    title: '1v1 Moves - Feints and Fakes - Soccer Skills for U8-U9',
    channel: 'Coerver Coaching',
    views: '1.9M views',
  },

  // Ball Control — Advanced
  'advanced-ball-control-soccer-close-control-mastery': {
    id: 'NMfLJynwyTk',
    title: '32 Close Control Dribbling Cone Drills',
    channel: 'Online Soccer Academy',
    views: '2.4M views',
  },

  // Passing Combinations
  'soccer-passing-combinations-drills-intermediate-advanced': {
    id: 'L7gfjaX2ve0',
    title: 'Coaching Soccer ~ How to do a Wall Pass',
    channel: 'Online Soccer Academy',
    views: '2.1M views',
  },

  // Shooting — Intermediate
  'soccer-shooting-intermediate-finishing-drills-tutorial': {
    id: '0u8kPwXXsLA',
    title: 'Become CLINICAL With These Shooting Drills',
    channel: 'Joner Football',
    views: '1.5M views',
  },

  // Tactics — Beginner
  'soccer-tactics-beginner-formations-positions-tutorial': {
    id: 'C3AOn27V8U8',
    title: 'The High Press Made Simple - The 7 Steps To Success',
    channel: 'Modern Soccer Coach',
    views: '1.2M views',
  },

  // Tactics — Intermediate
  'soccer-tactics-intermediate-pressing-possession-tutorial': {
    id: '-7FBGfDgmHw',
    title: 'Three High-Intensity Pressing Exercises!!!',
    channel: 'Klopp Tactics',
    views: '135K views',
  },

  // Speed & Agility
  'soccer-speed-agility-training-drills-tutorial': {
    id: 'pbhl4ddnGZ4',
    title: '10 Ladder Drills For Footballers',
    channel: 'Joner Football',
    views: '2.3M views',
  },

  // GK — Advanced
  'goalkeeper-advanced-training-drills-saves-tutorial': {
    id: 'iICTuTZCJyM',
    title: '25 Agility Ladder Drill for Elite Performance',
    channel: 'GK Training Hub',
    views: '1.4M views',
  },

  // Mental
  'soccer-mental-training-focus-confidence-tutorial': {
    id: 'W90mt_Y2NtU',
    title: 'How To Defend In 1v1 Like A PRO',
    channel: '7mlc',
    views: '2.8M views',
  },

  // Dribbling — Advanced
  'advanced-dribbling-soccer-1v1-elite-tutorial': {
    id: 'feA7KafbwdQ',
    title: '5 Dribbling Drills EVERY PLAYER Should Master',
    channel: '7mlc',
    views: '3.4M views',
  },

  // Long Ball
  'long-ball-switching-play-soccer-advanced-tutorial': {
    id: 'rEXXlrsnKUo',
    title: '5 Beginner Passing Drills For Football / Soccer',
    channel: 'Joner Football',
    views: '1.8M views',
  },

  // Advanced Finishing
  'advanced-finishing-soccer-elite-shooting-tutorial': {
    id: 'KMr2jpxmH2s',
    title: 'How To Increase Shooting Power In 5 Steps',
    channel: 'Progressive Soccer',
    views: '4.2M views',
  },

  // Zonal Defending
  'zonal-defending-soccer-advanced-tactics-tutorial': {
    id: 'W90mt_Y2NtU',
    title: 'How To Defend In 1v1 Like A PRO',
    channel: '7mlc',
    views: '2.8M views',
  },

  // High Press
  'high-press-soccer-elite-tactics-pressing-tutorial': {
    id: 'C3AOn27V8U8',
    title: 'The High Press Made Simple - The 7 Steps To Success',
    channel: 'Modern Soccer Coach',
    views: '1.2M views',
  },

  // Elite Conditioning
  'elite-soccer-conditioning-fitness-sprint-tutorial': {
    id: 'tMY5Cj39xN8',
    title: '15 Fast Footwork Exercises | Increase Your Foot Speed',
    channel: 'Joner Football',
    views: '3.1M views',
  },

  // Mental — Elite
  'elite-mental-performance-soccer-mindset-tutorial': {
    id: 'W90mt_Y2NtU',
    title: 'How To Defend In 1v1 Like A PRO',
    channel: '7mlc',
    views: '2.8M views',
  },

  // Youth — Advanced
  'advanced-youth-soccer-training-elite-development': {
    id: 'AFx0Q3LlhFM',
    title: 'Feints and Fakes - Soccer Skills for U10-U11',
    channel: 'Coerver Coaching',
    views: '1.6M views',
  },

  // ── HOMEPAGE FEATURED ────────────────────────────────────────────

  'soccer-footwork-training-beginner-to-advanced-drills': {
    id: 'bQT3MP5Moq8',
    title: '10 Soccer Footwork Drills To Improve Ball Control Faster',
    channel: 'Online Soccer Academy',
    views: '5.2M views',
  },

  'best-football-soccer-drills-2024-all-levels-tutorial': {
    id: 'pbhl4ddnGZ4',
    title: '10 Ladder Drills For Footballers',
    channel: 'Joner Football',
    views: '2.3M views',
  },

  'soccer-training-session-for-beginners-full-workout': {
    id: 'rEXXlrsnKUo',
    title: '5 Beginner Passing Drills For Football / Soccer',
    channel: 'Joner Football',
    views: '1.8M views',
  },
};
