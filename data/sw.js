// ============================================
// SERVICE WORKER - Offline Game Support
// ============================================

const CACHE_NAME = 'rainy-day-v1';
const OFFLINE_PAGE = '/index.html';

// List ALL files your game needs to run offline
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/styles/style.css',
  '/styles/mobile.css',
  '/data/story.js',
  '/data/audioManager.js',
  '/data/leaderboard.js',
  '/data/pwa.js',
  '/data/animationManager.js',
  '/data/voiceOverManager.js',
  '/data/ui.js',
  '/data/game.js',
  '/data/mobile-fix.js',
  // Add all your image assets here:
  'assets/images/school_hallway.png',
  'assets/images/dark_clouds.png',
  'assets/images/classroom.png',
  'assets/images/supply_table.png',
  'assets/images/backpack_screen.png',
  'assets/images/school_dismissal.png',
  'assets/images/safe_home.png',
  'assets/images/family_meeting.png',
  'assets/images/flooding_basement.png',
  'assets/images/windy_window.png',
  'assets/images/home_prep.png',
  'assets/images/home_shelf.png',
  'assets/images/storm_night.png',
  'assets/images/power_outage.png',
  'assets/images/dark_room.png',
  'assets/images/flashlight_use.png',
  'assets/images/emergency_radio_alert.png',
  'assets/images/evac_map.png',
  'assets/images/outlet_danger.png',
  'assets/images/evac_center.png',
  'assets/images/return_home.png',
  'assets/images/inspect_house.png',
  'assets/images/hazard_screen.png',
  'assets/images/school_circle.png',
  'assets/images/grand_victory.png',
  'assets/images/sad_classroom.png',
  'assets/images/flooded_hallway.png',
  'assets/images/stranded_classroom.png',
  'assets/images/rescue_boat.png',
  'assets/images/failed_inspection.png',
  // Item images
  'assets/images/items/water.png',
  'assets/images/items/game.png',
  'assets/images/items/flashlight.png',
  'assets/images/items/radio.png',
  'assets/images/items/candy.png',
  'assets/images/items/toy.png',
  'assets/images/items/powerbank.png',
  'assets/images/items/docs.png',
  'assets/images/items/food.png',
  'assets/images/items/icecream.png',
  'assets/images/items/laptop.png',
  'assets/images/items/cord.png',
  'assets/images/items/wetfood.png',
  'assets/images/items/debris.png',
  'assets/images/items/mug.png',
  'assets/images/items/pillow.png',
  // Icons
  'assets/icons/icon-192.png',
  'assets/icons/icon-512.png'
];

// INSTALL: Cache all assets
self.addEventListener('install', (event) => {
  console.log('📦 Service Worker installing...');
  self.skipWaiting(); // Activate immediately
  
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('📦 Caching game assets...');
      return cache.addAll(PRECACHE_ASSETS);
    }).catch((err) => {
      console.error('❌ Cache failed:', err);
    })
  );
});

// ACTIVATE: Clean up old caches
self.addEventListener('activate', (event) => {
  console.log('🚀 Service Worker activated');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});

// FETCH: Serve from cache first, fallback to network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Return cached version if found
      if (cachedResponse) {
        return cachedResponse;
      }
      // Otherwise fetch from network and cache it
      return fetch(event.request).then((networkResponse) => {
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
          return networkResponse;
        }
        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });
        return networkResponse;
      }).catch(() => {
        // If both cache and network fail, return offline page
        if (event.request.mode === 'navigate') {
          return caches.match(OFFLINE_PAGE);
        }
      });
    })
  );
});