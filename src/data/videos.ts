export type Video = {
  id: string;
  title: string;
  channel: string;
  views: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All';
  category: string;
  youtubeId: string;
  plan: 'free' | 'starter' | 'pro' | 'elite';
  featured?: boolean;
};

export const VIDEOS: Video[] = [
  // BALL CONTROL
  { id: 'v1', title: 'Full Soccer Footwork Training: Beginner to Advanced (21 Drills)', channel: 'Progressive Soccer', views: '2.1M', duration: '22:14', level: 'Beginner', category: 'Ball Control', youtubeId: 'vJHlhFN5r1c', plan: 'free', featured: true },
  { id: 'v2', title: '10 Dynamic Ball Mastery Exercises Every Player Should Master', channel: 'Online Soccer Academy', views: '678K', duration: '14:32', level: 'Beginner', category: 'Ball Control', youtubeId: 'bZoXMfNMBDE', plan: 'free' },
  { id: 'v3', title: 'Soccer Ball Control for Beginners — Step by Step', channel: 'Online Soccer Academy', views: '1.2M', duration: '18:44', level: 'Beginner', category: 'Ball Control', youtubeId: 'vJHlhFN5r1c', plan: 'starter' },
  { id: 'v4', title: 'Beginner Soccer Training: Learn to Juggle in 10 Minutes', channel: 'Joner Football', views: '945K', duration: '10:28', level: 'Beginner', category: 'Ball Control', youtubeId: 'PYCxct2e0zI', plan: 'starter' },
  { id: 'v5', title: 'Intermediate Ball Mastery — 15 Moves to Master', channel: 'Progressive Soccer', views: '780K', duration: '19:55', level: 'Intermediate', category: 'Ball Control', youtubeId: 'bZoXMfNMBDE', plan: 'pro' },
  { id: 'v6', title: 'Advanced Footwork Patterns for Midfielders', channel: 'Soccer IQ Training', views: '560K', duration: '17:20', level: 'Advanced', category: 'Ball Control', youtubeId: 'vJHlhFN5r1c', plan: 'pro' },
  { id: 'v7', title: 'Elite Ball Mastery: Professional Level Techniques', channel: 'Progressive Soccer', views: '430K', duration: '25:10', level: 'Advanced', category: 'Ball Control', youtubeId: 'bZoXMfNMBDE', plan: 'elite' },

  // DRILLS & TRAINING
  { id: 'v8', title: 'Best Football Drills 2024 — All Levels | Joner Football', channel: 'Joner Football', views: '1.4M', duration: '31:05', level: 'All', category: 'Drills', youtubeId: 'PYCxct2e0zI', plan: 'free' },
  { id: 'v9', title: 'Best Soccer Drills Compilation 2025 (So Far)', channel: 'Joner Football', views: '3.2M', duration: '28:44', level: 'All', category: 'Drills', youtubeId: 'PYCxct2e0zI', plan: 'starter' },
  { id: 'v10', title: 'How I Train a Group of Beginners — Full Session Breakdown', channel: 'Joner Football', views: '890K', duration: '41:20', level: 'Beginner', category: 'Drills', youtubeId: 'PYCxct2e0zI', plan: 'starter' },
  { id: 'v11', title: '10 Best U12 Soccer Drills | Fun Soccer Drills by MOJO', channel: 'MOJO Sport', views: '1.8M', duration: '12:33', level: 'Beginner', category: 'Drills', youtubeId: 'PYCxct2e0zI', plan: 'starter' },
  { id: 'v12', title: 'Complete Beginner Soccer Tutorial — All Basic Skills', channel: 'Online Soccer Academy', views: '2.4M', duration: '35:20', level: 'Beginner', category: 'Drills', youtubeId: 'bZoXMfNMBDE', plan: 'starter' },

  // DRIBBLING
  { id: 'v13', title: 'How to Dribble a Soccer Ball for Beginners', channel: 'Soccer Drills and Tips', views: '3.1M', duration: '15:00', level: 'Beginner', category: 'Dribbling', youtubeId: 'vJHlhFN5r1c', plan: 'free' },
  { id: 'v14', title: '1v1 Attacking Skills: Beat Your Defender Every Time', channel: 'Joner Football', views: '1.1M', duration: '22:45', level: 'Intermediate', category: 'Dribbling', youtubeId: 'PYCxct2e0zI', plan: 'pro' },
  { id: 'v15', title: 'How to Beat a Defender: 5 Beginner Moves', channel: 'Soccer Tips TV', views: '2.2M', duration: '16:10', level: 'Beginner', category: 'Dribbling', youtubeId: 'bZoXMfNMBDE', plan: 'starter' },
  { id: 'v16', title: 'Advanced Dribbling Skills — Elite 1v1 Moves', channel: 'Progressive Soccer', views: '930K', duration: '26:40', level: 'Advanced', category: 'Dribbling', youtubeId: 'vJHlhFN5r1c', plan: 'elite' },

  // PASSING
  { id: 'v17', title: 'Loads of Passing Combos With Awareness | Pro Soccer Drills', channel: 'Online Soccer Academy', views: '445K', duration: '18:30', level: 'Intermediate', category: 'Passing', youtubeId: 'bZoXMfNMBDE', plan: 'pro' },
  { id: 'v18', title: 'How to Pass a Soccer Ball — Beginner Tutorial', channel: 'Progressive Soccer', views: '1.9M', duration: '12:15', level: 'Beginner', category: 'Passing', youtubeId: 'vJHlhFN5r1c', plan: 'starter' },
  { id: 'v19', title: 'Rondo and Possession Drills — Intermediate Training', channel: 'Joner Football', views: '620K', duration: '24:00', level: 'Intermediate', category: 'Passing', youtubeId: 'PYCxct2e0zI', plan: 'pro' },
  { id: 'v20', title: 'Complete Passing Session: Long Ball and Switching Play', channel: 'Soccer Coaching Pro', views: '320K', duration: '35:50', level: 'Advanced', category: 'Passing', youtubeId: 'bZoXMfNMBDE', plan: 'elite' },

  // SHOOTING
  { id: 'v21', title: 'How to Create the Perfect Shooting Technique', channel: 'Online Soccer Academy', views: '2.3M', duration: '14:55', level: 'Beginner', category: 'Shooting', youtubeId: 'vJHlhFN5r1c', plan: 'starter' },
  { id: 'v22', title: '6-Week Shooting Improvement Plan', channel: 'Progressive Soccer', views: '540K', duration: '20:30', level: 'Intermediate', category: 'Shooting', youtubeId: 'bZoXMfNMBDE', plan: 'pro' },
  { id: 'v23', title: 'Advanced Finishing: Goals From Tight Angles and Long Range', channel: 'Online Soccer Academy', views: '870K', duration: '28:10', level: 'Advanced', category: 'Shooting', youtubeId: 'PYCxct2e0zI', plan: 'elite' },
  { id: 'v24', title: 'How to Chip the Goalkeeper — Panenka and Lob Tutorial', channel: 'Online Soccer Academy', views: '710K', duration: '11:45', level: 'Intermediate', category: 'Shooting', youtubeId: 'vJHlhFN5r1c', plan: 'pro' },

  // DEFENDING
  { id: 'v25', title: '1v1 Defending Masterclass — Stop Any Attacker', channel: 'Soccer IQ Training', views: '756K', duration: '19:20', level: 'Intermediate', category: 'Defending', youtubeId: 'bZoXMfNMBDE', plan: 'pro' },
  { id: 'v26', title: 'Defending Basics for Beginners — How to Win the Ball', channel: 'Joner Football', views: '1.3M', duration: '16:35', level: 'Beginner', category: 'Defending', youtubeId: 'PYCxct2e0zI', plan: 'starter' },
  { id: 'v27', title: 'Advanced Defensive Tactics: Zonal vs Man-Marking', channel: 'TacticalPad', views: '520K', duration: '22:00', level: 'Advanced', category: 'Defending', youtubeId: 'vJHlhFN5r1c', plan: 'elite' },

  // TACTICS
  { id: 'v28', title: 'High Press and Gegenpressing: How To Press Like Klopp', channel: 'TacticalPad', views: '987K', duration: '18:44', level: 'Advanced', category: 'Tactics', youtubeId: 'bZoXMfNMBDE', plan: 'elite' },
  { id: 'v29', title: 'Positional Play and Building From the Back', channel: 'TacticalPad', views: '678K', duration: '24:15', level: 'Advanced', category: 'Tactics', youtubeId: 'PYCxct2e0zI', plan: 'elite' },
  { id: 'v30', title: 'Soccer Tactics for Beginners — Understanding Formations', channel: 'Soccer IQ Training', views: '1.6M', duration: '15:30', level: 'Beginner', category: 'Tactics', youtubeId: 'vJHlhFN5r1c', plan: 'pro' },
  { id: 'v31', title: 'Intermediate Tactics: How to Read the Game', channel: 'TacticalPad', views: '450K', duration: '20:20', level: 'Intermediate', category: 'Tactics', youtubeId: 'bZoXMfNMBDE', plan: 'pro' },

  // FITNESS
  { id: 'v32', title: 'Soccer Fitness: Complete Conditioning Program', channel: 'Progressive Soccer', views: '892K', duration: '30:00', level: 'All', category: 'Fitness', youtubeId: 'PYCxct2e0zI', plan: 'pro' },
  { id: 'v33', title: 'Speed and Agility Training for Soccer Players', channel: 'Online Soccer Academy', views: '1.5M', duration: '18:10', level: 'Intermediate', category: 'Fitness', youtubeId: 'vJHlhFN5r1c', plan: 'pro' },
  { id: 'v34', title: 'Beginner Soccer Fitness — Get Match Ready in 4 Weeks', channel: 'Progressive Soccer', views: '740K', duration: '22:45', level: 'Beginner', category: 'Fitness', youtubeId: 'bZoXMfNMBDE', plan: 'starter' },
  { id: 'v35', title: 'Advanced Soccer Conditioning: Yo-Yo and Sprint Intervals', channel: 'Soccer Fitness Pro', views: '410K', duration: '27:30', level: 'Advanced', category: 'Fitness', youtubeId: 'PYCxct2e0zI', plan: 'elite' },

  // GOALKEEPER
  { id: 'v36', title: 'Complete Goalkeeper Training Session: All Fundamentals', channel: 'GK Icons', views: '654K', duration: '35:00', level: 'All', category: 'Goalkeeper', youtubeId: 'vJHlhFN5r1c', plan: 'pro' },
  { id: 'v37', title: 'Goalkeeper Basics for Beginners — Positioning and Handling', channel: 'GK Icons', views: '880K', duration: '20:15', level: 'Beginner', category: 'Goalkeeper', youtubeId: 'bZoXMfNMBDE', plan: 'starter' },
  { id: 'v38', title: 'Advanced Goalkeeper Training: Reflex and Distribution', channel: 'GK Icons', views: '330K', duration: '28:50', level: 'Advanced', category: 'Goalkeeper', youtubeId: 'PYCxct2e0zI', plan: 'elite' },

  // MENTAL
  { id: 'v39', title: 'Mental Toughness in Soccer: How to Build Confidence', channel: 'Soccer IQ Training', views: '430K', duration: '16:00', level: 'All', category: 'Mental', youtubeId: 'vJHlhFN5r1c', plan: 'pro' },
  { id: 'v40', title: 'Pre-Game Mental Routine for Soccer Players', channel: 'Soccer IQ Training', views: '560K', duration: '12:30', level: 'All', category: 'Mental', youtubeId: 'bZoXMfNMBDE', plan: 'pro' },
  { id: 'v41', title: 'Elite Mental Performance: What Pro Players Do Differently', channel: 'Soccer IQ Training', views: '290K', duration: '21:00', level: 'Advanced', category: 'Mental', youtubeId: 'PYCxct2e0zI', plan: 'elite' },

  // YOUTH
  { id: 'v42', title: '20 Fun Soccer Games for Kids — Youth Training Session', channel: 'MOJO Sport', views: '2.6M', duration: '14:22', level: 'Beginner', category: 'Youth', youtubeId: 'PYCxct2e0zI', plan: 'free' },
  { id: 'v43', title: 'U14-U16 Soccer Training: Skill Development Session', channel: 'Joner Football', views: '700K', duration: '38:10', level: 'Intermediate', category: 'Youth', youtubeId: 'vJHlhFN5r1c', plan: 'pro' },
];

export const VIDEO_CATEGORIES = ['All', 'Ball Control', 'Drills', 'Dribbling', 'Passing', 'Shooting', 'Defending', 'Tactics', 'Fitness', 'Goalkeeper', 'Mental', 'Youth'];
export const VIDEO_LEVELS = ['All', 'Beginner', 'Intermediate', 'Advanced'];
