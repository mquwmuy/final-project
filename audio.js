export function initAudio() {
    const petBtn = document.getElementById('pet-btn');
    let audioCtx = null;

    petBtn?.addEventListener('click', (e) => {
        createHeart(e.clientX, e.clientY);
        if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        if (audioCtx.state === 'suspended') audioCtx.resume();
        playPurr(audioCtx);
    });

    function playPurr(ctx) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(35, ctx.currentTime);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        osc.connect(gain).connect(ctx.destination);
        osc.start();
        setTimeout(() => osc.stop(), 2000);
    }

    function createHeart(x, y) {
        const h = document.createElement('div');
        h.className = 'heart';
        h.innerHTML = '❤️';
        h.style.left = `${x-12}px`; h.style.top = `${y-12}px`;
        document.body.appendChild(h);
        setTimeout(() => h.remove(), 1000);
    }
}