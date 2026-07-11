// data/pwa.js - Progressive Web App support
let deferredPrompt = null;

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    const installBanner = document.getElementById('install-prompt');
    if (installBanner) installBanner.classList.remove('hidden');
});

document.addEventListener('DOMContentLoaded', () => {
    const btnInstall = document.getElementById('btn-install');
    const btnDismiss = document.getElementById('btn-dismiss-install');
    
    if (btnInstall && deferredPrompt) {
        btnInstall.addEventListener('click', async () => {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            deferredPrompt = null;
        });
    }
    
    if (btnDismiss) {
        btnDismiss.addEventListener('click', () => {
            const installBanner = document.getElementById('install-prompt');
            if (installBanner) installBanner.classList.add('hidden');
        });
    }
});

console.log('📱 PWA module loaded');