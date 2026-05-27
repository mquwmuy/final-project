export function initCursor() {
    const laser = document.getElementById('laser-pointer');
    const leftPupil = document.getElementById('left-pupil');
    const rightPupil = document.getElementById('right-pupil');

    document.addEventListener('mousemove', (e) => {
        if (laser) {
            laser.style.left = e.clientX + 'px';
            laser.style.top = e.clientY + 'px';
        }
        trackEye(e.clientX, e.clientY, 75, 105, leftPupil);
        trackEye(e.clientX, e.clientY, 125, 105, rightPupil);
    });

    function trackEye(mouseX, mouseY, eyeCenterX, eyeCenterY, pupilElement) {
        const svg = document.querySelector('.cat-svg');
        if (!svg || !pupilElement) return;
        const rect = svg.getBoundingClientRect();
        const absX = rect.left + (eyeCenterX / 200) * rect.width;
        const absY = rect.top + (eyeCenterY / 200) * rect.height;
        const angle = Math.atan2(mouseY - absY, mouseX - absX);
        const dist = Math.min(4, Math.hypot(mouseX - absX, mouseY - absY) / 30);
        pupilElement.style.transform = `translate(${Math.cos(angle)*dist}px, ${Math.sin(angle)*dist}px)`;
    }
}