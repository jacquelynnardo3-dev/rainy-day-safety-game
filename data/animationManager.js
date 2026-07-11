class AnimationManager {
    constructor() {
        this.weatherInterval = null;
        this.lightningInterval = null;
        this.windInterval = null;
        this.currentWeather = 'clear';
        this.init();
    }

    init() {
        console.log('Animation Manager initializing...');
        this.setupLayers();
        console.log('Animation Manager ready!');
    }

    setupLayers() {
        const artContainer = document.getElementById('art-container');
        if (!artContainer) {
            console.error('art-container not found!');
            return;
        }

        let weatherLayer = document.getElementById('weather-effects-layer');
        if (!weatherLayer) {
            weatherLayer = document.createElement('div');
            weatherLayer.id = 'weather-effects-layer';
            weatherLayer.style.position = 'absolute';
            weatherLayer.style.top = '0';
            weatherLayer.style.left = '0';
            weatherLayer.style.width = '100%';
            weatherLayer.style.height = '100%';
            weatherLayer.style.pointerEvents = 'none';
            weatherLayer.style.zIndex = '15';
            weatherLayer.style.overflow = 'hidden';
            artContainer.appendChild(weatherLayer);
            console.log('weather-effects-layer created');
        }

        let lightning = document.getElementById('lightning-flash');
        if (!lightning) {
            lightning = document.createElement('div');
            lightning.id = 'lightning-flash';
            lightning.style.position = 'absolute';
            lightning.style.top = '0';
            lightning.style.left = '0';
            lightning.style.width = '100%';
            lightning.style.height = '100%';
            lightning.style.background = 'white';
            lightning.style.opacity = '0';
            lightning.style.pointerEvents = 'none';
            lightning.style.zIndex = '20';
            lightning.style.transition = 'opacity 0.05s';
            artContainer.appendChild(lightning);
            console.log('lightning-flash created');
        }

        let stormOverlay = document.getElementById('storm-overlay');
        if (!stormOverlay) {
            stormOverlay = document.createElement('div');
            stormOverlay.id = 'storm-overlay';
            stormOverlay.style.position = 'absolute';
            stormOverlay.style.top = '0';
            stormOverlay.style.left = '0';
            stormOverlay.style.width = '100%';
            stormOverlay.style.height = '100%';
            stormOverlay.style.pointerEvents = 'none';
            stormOverlay.style.zIndex = '10';
            stormOverlay.style.transition = 'background 2s';
            artContainer.appendChild(stormOverlay);
            console.log('storm-overlay created');
        }

        let waterLayer = document.getElementById('water-rising-layer');
        if (!waterLayer) {
            waterLayer = document.createElement('div');
            waterLayer.id = 'water-rising-layer';
            waterLayer.style.position = 'absolute';
            waterLayer.style.bottom = '0';
            waterLayer.style.left = '0';
            waterLayer.style.width = '100%';
            waterLayer.style.height = '0%';
            waterLayer.style.zIndex = '14';
            waterLayer.style.pointerEvents = 'none';
            waterLayer.style.background = 'linear-gradient(to top, rgba(52,152,219,0.6), rgba(52,152,219,0.2))';
            waterLayer.style.transition = 'height 3s ease-in-out';
            artContainer.appendChild(waterLayer);
            console.log('water-rising-layer created');
        }

        let fogLayer = document.getElementById('fog-layer');
        if (!fogLayer) {
            fogLayer = document.createElement('div');
            fogLayer.id = 'fog-layer';
            fogLayer.style.position = 'absolute';
            fogLayer.style.bottom = '0';
            fogLayer.style.left = '0';
            fogLayer.style.width = '100%';
            fogLayer.style.height = '30%';
            fogLayer.style.zIndex = '12';
            fogLayer.style.pointerEvents = 'none';
            fogLayer.style.background = 'linear-gradient(to top, rgba(200,220,240,0.3), transparent)';
            artContainer.appendChild(fogLayer);
            console.log('fog-layer created');
        }

        let celebration = document.getElementById('celebration-layer');
        if (!celebration) {
            celebration = document.createElement('div');
            celebration.id = 'celebration-layer';
            celebration.style.position = 'absolute';
            celebration.style.top = '0';
            celebration.style.left = '0';
            celebration.style.width = '100%';
            celebration.style.height = '100%';
            celebration.style.zIndex = '50';
            celebration.style.pointerEvents = 'none';
            celebration.style.overflow = 'hidden';
            artContainer.appendChild(celebration);
            console.log('celebration-layer created');
        }

        let transition = document.getElementById('scene-transition-overlay');
        if (!transition) {
            transition = document.createElement('div');
            transition.id = 'scene-transition-overlay';
            transition.style.position = 'absolute';
            transition.style.top = '0';
            transition.style.left = '0';
            transition.style.width = '100%';
            transition.style.height = '100%';
            transition.style.background = '#0d1b2a';
            transition.style.zIndex = '100';
            transition.style.pointerEvents = 'none';
            transition.style.opacity = '0';
            transition.style.transition = 'opacity 0.5s';
            artContainer.appendChild(transition);
            console.log('scene-transition-overlay created');
        }

        console.log('All layers created!');
    }

    setWeather(type) {
        console.log('Setting weather to:', type);
        this.clearWeather();
        this.currentWeather = type;

        switch(type) {
            case 'rain':
                this.startRain(50);
                break;
            case 'storm':
                this.startRain(100);
                this.startLightning();
                this.startWind();
                let stormOverlay = document.getElementById('storm-overlay');
                if (stormOverlay) {
                    stormOverlay.classList.add('stormy');
                    console.log('Storm overlay activated');
                }
                break;
            case 'flood':
                this.startRain(80);
                this.startLightning();
                this.startWind();
                let stormOv = document.getElementById('storm-overlay');
                if (stormOv) stormOv.classList.add('stormy');
                let waterLayer = document.getElementById('water-rising-layer');
                if (waterLayer) {
                    waterLayer.classList.add('rising');
                    console.log('Water rising activated');
                }
                break;
            case 'clear':
            default:
                console.log('Clear weather');
                break;
        }
    }

    clearWeather() {
        if (this.weatherInterval) clearInterval(this.weatherInterval);
        if (this.lightningInterval) clearInterval(this.lightningInterval);
        if (this.windInterval) clearInterval(this.windInterval);

        let weatherLayer = document.getElementById('weather-effects-layer');
        if (weatherLayer) weatherLayer.innerHTML = '';

        let stormOverlay = document.getElementById('storm-overlay');
        if (stormOverlay) stormOverlay.classList.remove('stormy');

        let waterLayer = document.getElementById('water-rising-layer');
        if (waterLayer) waterLayer.classList.remove('rising');
    }

    startRain(intensity) {
        let weatherLayer = document.getElementById('weather-effects-layer');
        if (!weatherLayer) {
            console.error('weather-effects-layer not found for rain!');
            return;
        }

        console.log('Starting rain with intensity:', intensity);

        this.weatherInterval = setInterval(() => {
            for (let i = 0; i < 3; i++) {
                let drop = document.createElement('div');
                drop.className = 'rain-drop';
                drop.style.left = Math.random() * 100 + '%';
                drop.style.animationDuration = (0.3 + Math.random() * 0.4) + 's';
                drop.style.animationDelay = Math.random() * 0.2 + 's';
                weatherLayer.appendChild(drop);
                setTimeout(() => drop.remove(), 1000);
            }
        }, Math.max(50, 200 - intensity * 2));
    }

    startLightning() {
        let flash = document.getElementById('lightning-flash');
        if (!flash) {
            console.error('lightning-flash not found!');
            return;
        }

        console.log('Starting lightning');

        this.lightningInterval = setInterval(() => {
            if (Math.random() > 0.7) {
                flash.classList.add('flash-active');
                setTimeout(() => flash.classList.remove('flash-active'), 100);
                if (Math.random() > 0.5) {
                    setTimeout(() => {
                        flash.classList.add('flash-active');
                        setTimeout(() => flash.classList.remove('flash-active'), 80);
                    }, 150);
                }
            }
        }, 3000 + Math.random() * 4000);
    }

    startWind() {
        let weatherLayer = document.getElementById('weather-effects-layer');
        if (!weatherLayer) {
            console.error('weather-effects-layer not found for wind!');
            return;
        }

        console.log('Starting wind');

        this.windInterval = setInterval(() => {
            let particle = document.createElement('div');
            particle.className = 'wind-particle';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDuration = (1 + Math.random()) + 's';
            weatherLayer.appendChild(particle);
            setTimeout(() => particle.remove(), 2000);
        }, 800);
    }

    celebrate() {
        let layer = document.getElementById('celebration-layer');
        if (!layer) {
            console.error('celebration-layer not found!');
            return;
        }

        console.log('Celebration!');

        let colors = ['#f1c40f', '#e74c3c', '#3498db', '#2ecc71', '#9b59b6', '#e67e22'];
        
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                let confetti = document.createElement('div');
                confetti.className = 'confetti-piece';
                confetti.style.left = Math.random() * 100 + '%';
                confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
                confetti.style.width = (5 + Math.random() * 10) + 'px';
                confetti.style.height = (5 + Math.random() * 10) + 'px';
                confetti.style.animationDuration = (2 + Math.random() * 2) + 's';
                layer.appendChild(confetti);
                setTimeout(() => confetti.remove(), 4000);
            }, i * 50);
        }
    }

    animateStarCount() {
        let starCount = document.getElementById('star-count');
        if (starCount) {
            starCount.classList.remove('star-bump');
            void starCount.offsetWidth;
            starCount.classList.add('star-bump');
            setTimeout(() => starCount.classList.remove('star-bump'), 500);
        }
    }

    setupSceneAnimations(sceneId) {
        console.log('Setting up animations for scene:', sceneId);

        let sceneConfigs = {
            'start': () => this.setWeather('clear'),
            'morning_clouds': () => {
                this.setWeather('clear');
                setTimeout(() => {
                    let stormOverlay = document.getElementById('storm-overlay');
                    if (stormOverlay) stormOverlay.classList.add('stormy');
                }, 1000);
            },
            'teacher_warning': () => this.setWeather('rain'),
            'school_dismissal_scene': () => this.setWeather('storm'),
            'basement_close_call': () => {
                this.setWeather('flood');
                this.addFloatingDebris('🪵', 20, 80);
                this.addFloatingDebris('🧸', 70, 85);
            },
            'chapter2_nightfall': () => this.setWeather('storm'),
            'chapter3_power_outage': () => {
                this.setWeather('storm');
                setTimeout(() => {
                    let flash = document.getElementById('lightning-flash');
                    if (flash) {
                        flash.classList.add('flash-active');
                        setTimeout(() => flash.classList.remove('flash-active'), 300);
                    }
                }, 500);
            },
            'chapter3_evac_choice': () => this.setWeather('flood'),
            'electrical_hazard_scene': () => {
                this.setWeather('flood');
                setTimeout(() => this.createElectricSpark(window.innerWidth * 0.5, window.innerHeight * 0.5), 500);
            },
            'chapter4_return_home': () => {
                this.setWeather('clear');
                this.addFloatingDebris('☀️', 80, 10);
            },
            'victory_ending': () => {
                this.setWeather('clear');
                this.celebrate();
            },
            'alternative_disaster_branch': () => this.setWeather('flood'),
            'alternative_panic_branch': () => this.setWeather('flood'),
            'trapped_scene': () => this.setWeather('flood'),
            'bad_ending_summary': () => this.setWeather('rain')
        };

        if (sceneConfigs[sceneId]) {
            sceneConfigs[sceneId]();
        } else {
            this.setWeather('clear');
        }
    }

    addFloatingDebris(emoji, x, y) {
        let layer = document.getElementById('weather-effects-layer');
        if (!layer) return;

        let debris = document.createElement('div');
        debris.className = 'floating-debris';
        debris.textContent = emoji;
        debris.style.left = x + '%';
        debris.style.top = y + '%';
        debris.style.animationDelay = Math.random() * 2 + 's';
        layer.appendChild(debris);
        return debris;
    }

    createElectricSpark(x, y) {
        let layer = document.getElementById('weather-effects-layer');
        if (!layer) return;

        for (let i = 0; i < 5; i++) {
            let spark = document.createElement('div');
            spark.className = 'electric-spark';
            spark.style.left = (x + (Math.random() - 0.5) * 40) + 'px';
            spark.style.top = (y + (Math.random() - 0.5) * 40) + 'px';
            layer.appendChild(spark);
            setTimeout(() => spark.remove(), 200);
        }
    }
}

let AnimationMgr = new AnimationManager();
window.AnimationMgr = AnimationMgr;