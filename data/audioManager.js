// data/audioManager.js
const AudioManager = (function() {
    const ASSET_PATH = 'assets/audio/';
    
    const manifest = {
        music: {
            mainMenu: 'music/main_menu.mp3',
            gameplay: 'music/gameplay.mp3'
        },
        sfx: {
            next: 'sfx/next_click.mp3',
            back: 'sfx/back_click.mp3',
            victory: 'sfx/victory_chime.mp3',
            gameover: 'sfx/gameover_melancholy.mp3', // NEW: Dedicated Game Over Sound Effect
            modal_positive: 'sfx/modal_pop.mp3',
            modal_negative: 'sfx/modal_pop_negative.mp3'
        }
    };

    const instances = { music: {}, sfxPools: {} };
    const poolPointers = { next: 0, back: 0, victory: 0, gameover: 0, modal_positive: 0, modal_negative: 0 };
    const POOL_SIZE = 5; 

    let currentMusicKey = null;
    let fadeIntervalId = null;
    let isUnlocked = false; 

    const settings = {
        musicVolume: 0.15, 
        sfxVolume: 0.95,   
        musicMuted: false,
        sfxMuted: false
    };

    function init() {
        for (const [key, relativePath] of Object.entries(manifest.music)) {
            const audio = new Audio(ASSET_PATH + relativePath);
            audio.loop = true;
            audio.preload = 'auto';
            instances.music[key] = audio;
        }

        for (const [key, relativePath] of Object.entries(manifest.sfx)) {
            instances.sfxPools[key] = [];
            for (let i = 0; i < POOL_SIZE; i++) {
                const audio = new Audio(ASSET_PATH + relativePath);
                audio.preload = 'auto';
                instances.sfxPools[key].push(audio);
            }
        }

        const unlockAudioContext = () => {
            if (isUnlocked) return;
            isUnlocked = true;
            
            if (currentMusicKey && instances.music[currentMusicKey]) {
                instances.music[currentMusicKey].play().catch(err => console.log("Audio kickstart deferred:", err));
            } else if (!currentMusicKey) {
                playMusic('mainMenu');
            }

            ['click', 'keydown', 'touchstart'].forEach(evtType => {
                window.removeEventListener(evtType, unlockAudioContext, true);
            });
        };

        ['click', 'keydown', 'touchstart'].forEach(evtType => {
            window.addEventListener(evtType, unlockAudioContext, true);
        });
    }

    function playMusic(targetKey) {
        if (!instances.music[targetKey] || currentMusicKey === targetKey) return;
        
        if (settings.musicMuted) {
            currentMusicKey = targetKey;
            return;
        }

        if (fadeIntervalId) {
            clearInterval(fadeIntervalId);
            fadeIntervalId = null;
        }

        const outgoing = currentMusicKey ? instances.music[currentMusicKey] : null;
        const incoming = instances.music[targetKey];

        incoming.volume = 0;
        incoming.currentTime = 0;
        
        incoming.play().catch(() => {
            console.warn("Audio context will trigger upon first physical user click interaction.");
        });

        const fadeDuration = 1000; 
        const steps = 25;
        const intervalTime = fadeDuration / steps;
        let currentStep = 0;

        fadeIntervalId = setInterval(() => {
            currentStep++;
            const progress = currentStep / steps;

            incoming.volume = progress * settings.musicVolume;

            if (outgoing) {
                outgoing.volume = (1 - progress) * settings.musicVolume;
            }

            if (currentStep >= steps) {
                clearInterval(fadeIntervalId);
                fadeIntervalId = null;
                
                if (outgoing) {
                    outgoing.pause();
                    outgoing.volume = 0;
                }
                incoming.volume = settings.musicVolume;
            }
        }, intervalTime);

        currentMusicKey = targetKey;
    }

    function stopMusic(fade = true) {
        if (!currentMusicKey) return;
        const track = instances.music[currentMusicKey];
        
        if (fadeIntervalId) {
            clearInterval(fadeIntervalId);
            fadeIntervalId = null;
        }

        if (!fade) {
            track.pause();
            track.volume = 0;
            currentMusicKey = null;
            return;
        }
        
        let vol = track.volume;
        const fadeOut = setInterval(() => {
            vol -= 0.01;
            if (vol <= 0) {
                clearInterval(fadeOut);
                track.pause();
                track.volume = 0;
                currentMusicKey = null;
            } else {
                track.volume = vol;
            }
        }, 20);
    }

    function playSFX(key) {
        if (settings.sfxMuted || !instances.sfxPools[key]) return;
        
        const pool = instances.sfxPools[key];
        const pointer = poolPointers[key];
        
        const sound = pool[pointer];
        sound.currentTime = 0;
        sound.volume = settings.sfxVolume;
        sound.play().catch(() => {});

        poolPointers[key] = (pointer + 1) % POOL_SIZE;
    }

    function setMusicVolume(vol) {
        settings.musicVolume = Math.max(0, Math.min(1, vol));
        if (currentMusicKey) {
            instances.music[currentMusicKey].volume = settings.musicVolume;
        }
    }

    function setSFXVolume(vol) {
        settings.sfxVolume = Math.max(0, Math.min(1, vol));
    }

    function toggleMuteMusic() {
        settings.musicMuted = !settings.musicMuted;
        if (currentMusicKey) {
            if (settings.musicMuted) instances.music[currentMusicKey].pause();
            else instances.music[currentMusicKey].play().catch(() => {});
        }
    }

    function toggleMuteSFX() {
        settings.sfxMuted = !settings.sfxMuted;
    }

    init();

    return {
        playMusic,
        stopMusic,
        playSFX,
        setMusicVolume,
        setSFXVolume,
        toggleMuteMusic,
        toggleMuteSFX
    };
})();