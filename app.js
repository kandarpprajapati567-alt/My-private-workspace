document.addEventListener('DOMContentLoaded', () => {
    const welcomeScreen = document.getElementById('welcome-screen');
    const welcomeText = document.getElementById('welcome-text');
    const onboardingForm = document.getElementById('onboarding-form');
    const nameInput = document.getElementById('name-input');
    const startBtn = document.getElementById('start-btn');
    const appDashboard = document.getElementById('app-dashboard');
    const videoBg = document.getElementById('universe-bg');
    const batterySaverBtn = document.getElementById('battery-saver-btn');

    // 1. Check LocalStorage for User
    const userName = localStorage.getItem('kk_bams_user');

    if (userName) {
        // User exists: Show Cinematic Welcome
        welcomeText.textContent = `वेलकम, ${userName}`;
        welcomeText.classList.remove('hidden');
        welcomeText.classList.add('fade-in');

        // Fade out black screen after 2.5 seconds to reveal Universe & Dashboard
        setTimeout(() => {
            welcomeScreen.style.opacity = '0';
            setTimeout(() => {
                welcomeScreen.classList.add('hidden');
                appDashboard.classList.remove('hidden');
                appDashboard.classList.add('fade-in');
            }, 1500); // Wait for CSS transition
        }, 2500);

    } else {
        // New User: Ask for name
        welcomeText.textContent = "K.K. Master Interface";
        welcomeText.classList.remove('hidden');
        welcomeText.classList.add('fade-in');

        setTimeout(() => {
            onboardingForm.classList.remove('hidden');
            onboardingForm.classList.add('fade-in');
        }, 1500);

        startBtn.addEventListener('click', () => {
            const name = nameInput.value.trim();
            if(name) {
                localStorage.setItem('kk_bams_user', name);
                location.reload(); // Instant reload to trigger cinematic welcome
            }
        });
    }

    // 2. Battery Saver Logic (The Kill Switch)
    batterySaverBtn.addEventListener('click', (e) => {
        if (!videoBg.paused) {
            videoBg.pause(); // Kills background rendering instantly
            e.target.textContent = "🔋 Saver: ON";
            e.target.style.color = "#00ff66";
            e.target.style.borderColor = "#00ff66";
        } else {
            videoBg.play();
            e.target.textContent = "🔋 Saver";
            e.target.style.color = "#fff";
            e.target.style.borderColor = "#333";
        }
    });
});
