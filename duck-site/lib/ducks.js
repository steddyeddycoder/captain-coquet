// lib/ducks.js
// The Captain Coquet fleet. Change this file if you add future collections.

export const DUCKS = [
  {
    id: 'captain-coquet',
    number: '001',
    name: 'Captain Coquet',
    role: 'Fearless Leader',
    emoji: '⚓',
    origin: 'Amble Harbour',
    motto: 'Adventure is better when it is shared.',
    mission: 'Find brave explorers and keep the fleet sailing.',
    personality: 'Calm, kind and quietly adventurous. The tiny captain who never leaves a duck behind.',
  },
  {
    id: 'puffin-pete',
    number: '002',
    name: 'Puffin Pete',
    role: 'Chief Wildlife Officer',
    emoji: '🐧',
    origin: 'Coquet Island',
    motto: 'Beak kind.',
    mission: 'Spot wildlife and celebrate nature wherever he lands.',
    personality: 'Cheeky, bright-eyed and convinced every puffin knows his name.',
  },
  {
    id: 'admiral-amble',
    number: '003',
    name: 'Admiral Amble',
    role: 'First Mate',
    emoji: '🌊',
    origin: 'Amble Harbour Village',
    motto: 'Steady tides, happy crew.',
    mission: 'Visit somewhere by the sea and keep everyone smiling.',
    personality: 'Friendly, dependable and usually first to suggest fish and chips.',
  },
  {
    id: 'navigator-nelly',
    number: '004',
    name: 'Navigator Nelly',
    role: 'Master of Maps',
    emoji: '🧭',
    origin: 'The North Sea charts',
    motto: 'Wrong turns become great stories.',
    mission: 'Cross borders, find new places and never stop exploring.',
    personality: 'Curious, clever and never truly lost — only temporarily scenic.',
  },
  {
    id: 'lighthouse-lily',
    number: '005',
    name: 'Lighthouse Lily',
    role: 'Keeper of the Light',
    emoji: '💡',
    origin: 'Coquet Lighthouse',
    motto: 'Shine bright for the next traveller.',
    mission: 'Chase sunsets and guide the fleet safely onward.',
    personality: 'Warm, watchful and happiest when the sky turns gold.',
  },
  {
    id: 'craster',
    number: '006',
    name: 'Craster',
    role: "Ship's Cook",
    emoji: '🦀',
    origin: 'Craster Harbour',
    motto: "Calories don't count on holiday.",
    mission: 'Find delicious places and collect proper food stories.',
    personality: 'Big-hearted, hungry and famous for imaginary kipper breakfasts.',
  },
  {
    id: 'sir-warkworth',
    number: '007',
    name: 'Sir Warkworth',
    role: 'Keeper of Stories',
    emoji: '🏰',
    origin: 'Warkworth Castle',
    motto: 'Every place has a tale.',
    mission: 'Visit landmarks, castles and places with history.',
    personality: 'Dramatic, noble and prone to making every story sound legendary.',
  },
  {
    id: 'druridge',
    number: '008',
    name: 'Druridge',
    role: 'The Explorer',
    emoji: '🌾',
    origin: 'Druridge Bay',
    motto: 'Quiet paths lead to the best views.',
    mission: 'Discover hidden beaches, secret corners and peaceful places.',
    personality: 'Gentle, wandering and always returns with sand in his feathers.',
  },
  {
    id: 'breezy-bamburgh',
    number: '009',
    name: 'Breezy Bamburgh',
    role: 'Weather Watcher',
    emoji: '🌬️',
    origin: 'Bamburgh Beach',
    motto: 'No bad weather, only wet ducks.',
    mission: 'Meet big skies, sea breezes and dramatic waves.',
    personality: 'Bold, windswept and suspiciously excited by clouds.',
  },
  {
    id: 'tern-tim',
    number: '010',
    name: 'Tern Tim',
    role: 'Cabin Boy',
    emoji: '⭐',
    origin: 'The harbour wall',
    motto: 'Is it adventure time yet?',
    mission: 'Meet children, families and anyone who likes sprinkles.',
    personality: 'Young, excitable and amazed by absolutely everything.',
  },
  {
    id: 'skipper-seaton',
    number: '011',
    name: 'Skipper Seaton',
    role: 'Chief Engineer',
    emoji: '⚙️',
    origin: 'Seaton Sluice',
    motto: 'A little wobble never stopped a voyage.',
    mission: 'Travel the furthest and keep the adventure shipshape.',
    personality: 'Practical, cheerful and convinced he can fix anything except a broken biscuit.',
  },
  {
    id: 'rosie-rosebay',
    number: '012',
    name: 'Rosie Rosebay',
    role: 'Chief Happiness Officer',
    emoji: '🌹',
    origin: 'Northumberland coastal paths',
    motto: 'Kindness travels further than luggage.',
    mission: 'Collect smiles, kind notes and colourful memories.',
    personality: 'Sunny, thoughtful and certain every stranger is a friend she has not met yet.',
  },
];

export function duckForId(id) {
  return DUCKS.find((d) => d.id === id);
}

export function duckName(id) {
  const d = duckForId(id);
  return d ? d.name : id;
}

export function isValidDuckId(id) {
  return DUCKS.some((d) => d.id === id);
}

// Shortcut locations for the Norwegian Viva Mediterranean 2026 adventure and likely follow-up stops.
// Anything else typed by a finder can still resolve through the free geocoder.
export const KNOWN_PORTS = [
  ['amble', 55.3310, -1.5850],
  ['coquet island', 55.3337, -1.5398],
  ['northumberland', 55.2500, -2.0000],
  ['istanbul', 41.0082, 28.9784],
  ['kusadasi', 37.8579, 27.2610],
  ['kuşadası', 37.8579, 27.2610],
  ['ephesus', 37.9396, 27.3417],
  ['santorini', 36.3932, 25.4615],
  ['thira', 36.3932, 25.4615],
  ['mykonos', 37.4467, 25.3289],
  ['piraeus', 37.9475, 23.6361],
  ['athens', 37.9838, 23.7275],
  ['katakolon', 37.6500, 21.3214],
  ['olympia', 37.6383, 21.6300],
  ['corfu', 39.6243, 19.9217],
  ['dubrovnik', 42.6507, 18.0944],
  ['bar', 42.0950, 19.0904],
  ['montenegro', 42.0950, 19.0904],
  ['split', 43.5081, 16.4402],
  ['ravenna', 44.4184, 12.2035],
  ['florence', 43.7696, 11.2558],
  ['bologna', 44.4949, 11.3426],
];
