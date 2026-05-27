
// Ждем полной загрузки структуры документа
import { initCursor } from './js/cursor.js';
import { initAudio } from './js/audio.js';

document.addEventListener('DOMContentLoaded', () => {
    initCursor();
    initAudio();
    console.log("Сайт Ночки успешно инициализирован!");
});



document.addEventListener('DOMContentLoaded', () => {

    // ДИНАМИЧЕСКИЙ ВВОД ТЕКУЩЕГО ГОДА В ФУТЕР
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 1. ДВИЖЕНИЕ КРАСНОГО ЛАЗЕРА И СЛЕЖКА ГЛАЗ
    const laser = document.getElementById('laser-pointer');
    const leftPupil = document.getElementById('left-pupil');
    const rightPupil = document.getElementById('right-pupil');

    document.addEventListener('mousemove', (e) => {
        // Перемещаем красный лазер за мышкой
        if (laser) {
            laser.style.left = e.clientX + 'px';
            laser.style.top = e.clientY + 'px';
        }

        // Слежение зрачков за координатами мыши
        if (leftPupil && rightPupil) {
            trackEye(e.clientX, e.clientY, 75, 105, leftPupil);
            trackEye(e.clientX, e.clientY, 125, 105, rightPupil);
        }
    });

    // Функция расчета угла и перемещения зрачка
    function trackEye(mouseX, mouseY, eyeCenterX, eyeCenterY, pupilElement) {
        const svg = document.querySelector('.cat-svg');
        if (!svg) return;
        
        const rect = svg.getBoundingClientRect();
        
        // Превращаем координаты SVG в экранные пиксели
        const absoluteEyeX = rect.left + (eyeCenterX / 200) * rect.width;
        const absoluteEyeY = rect.top + (eyeCenterY / 200) * rect.height;

        const angle = Math.atan2(mouseY - absoluteEyeY, mouseX - absoluteEyeX);
        // Ограничиваем движение зрачка в пределах 4px
        const distance = Math.min(4, Math.hypot(mouseX - absoluteEyeX, mouseY - absoluteEyeY) / 30);

        const pupilX = Math.cos(angle) * distance;
        const pupilY = Math.sin(angle) * distance;

        // Применяем трансформацию сдвига к зрачку
        pupilElement.style.transform = `translate(${pupilX}px, ${pupilY}px)`;
    }

    // При клике лазер визуально "сжимается"
    document.addEventListener('mousedown', () => {
        if (laser) {
            laser.style.width = '6px';
            laser.style.height = '6px';
        }
    });
    document.addEventListener('mouseup', () => {
        if (laser) {
            laser.style.width = '12px';
            laser.style.height = '12px';
        }
    });



    // 3. ПЕРЕКЛЮЧАТЕЛЬ ТЕМЫ (ДЕНЬ / НОЧЬ)
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            
            if (document.body.classList.contains('dark-theme')) {
                themeToggle.textContent = 'Режим: Ночь 🌙';
            } else {
                themeToggle.textContent = 'Режим: День ☀️';
            }
        });
    }




    // if (navContainer && displayTime && displayDesc) {
    //     // Плавный переход для текста
    //     displayTime.style.transition = "opacity 0.2s ease";
    //     displayDesc.style.transition = "opacity 0.2s ease";

    //     // Генерируем кнопки времени в DOM
    //     scheduleData.forEach((item, index) => {
    //         const button = document.createElement('button');
    //         button.classList.add('time-node');
    //         button.textContent = item.time;
            
    //         if (index === 0) {
    //             button.classList.add('active');
    //             updateDisplay(item);
    //         }

    //         button.addEventListener('click', () => {
    //             document.querySelectorAll('.time-node').forEach(btn => btn.classList.remove('active'));
    //             button.classList.add('active');
    //             updateDisplay(item);
    //         });

    //         navContainer.appendChild(button);
    //     });
    // }

    function updateDisplay(item) {
        displayTime.style.opacity = 0;
        displayDesc.style.opacity = 0;
        
        setTimeout(() => {
            displayTime.textContent = `${item.time} — ${item.title}`;
            displayDesc.textContent = item.desc;
            displayTime.style.opacity = 1;
            displayDesc.style.opacity = 1;
        }, 200);
    }
});

    // 2. РАСПИСАНИЕ С ФОТОГРАФИЯМИ (Медиа таймлайн)
    const scheduleData = [
        { 
            time: "05:00", 
            title: "⏰ Время Тыгыдыка", 
            desc: "Устроить забег на сверхзвуковой скорости. Громко пошуршать пакетом и заглянуть в бездну за диваном.",
            img: "./img_video/Аврора1.jpg"
        },
        { 
            time: "08:00", 
            title: "🍳 Завтрак мечты", 
            desc: "Громко требовать еду, понюхать ее и уйти спать на ноутбук.",
            img: "./img_video/Аврора2.jpg"
        },
        { 
            time: "12:00", 
            title: "💤 Сонное затмение", 
            desc: "Спать 6 часов подряд в неестественной для живого существа позе 'калачик'.",
            img: "./img_video/Аврора5.jpg"
        },
        { 
            time: "18:00", 
            title: "👀 Охота", 
            desc: "Пристально смотреть в пустой угол стены и пугать хозяина своим загадочным видом.",
            img: "./img_video/Аврора4.jpg"
        }
    ];

    const navContainer = document.getElementById('timeline-nav');
    const displayTime = document.getElementById('display-time');
    const displayDesc = document.getElementById('display-desc');
    const displayImg = document.getElementById('display-img');

    if (navContainer && displayTime && displayDesc && displayImg) {
        // Рендерим кнопки навигации
        scheduleData.forEach((item, index) => {
            const button = document.createElement('button');
            button.className = 'time-node' + (index === 0 ? ' active' : '');
            button.textContent = item.time;
            
            button.addEventListener('click', () => {
                document.querySelectorAll('.time-node').forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                updateTimelineDisplay(item);
            });
            navContainer.appendChild(button);
        });

        // Инициализируем первое состояние
        updateTimelineDisplay(scheduleData[0]);
    }

    function updateTimelineDisplay(item) {
        displayTime.style.opacity = 0;
        displayDesc.style.opacity = 0;
        displayImg.style.opacity = 0;
        
        setTimeout(() => {
            displayTime.textContent = `${item.time} — ${item.title}`;
            displayDesc.textContent = item.desc;
            displayImg.src = item.img;
            
            displayTime.style.opacity = 1;
            displayDesc.style.opacity = 1;
            displayImg.style.opacity = 1;
        }, 200);
    }


    // 3. СТИЛЬНАЯ МЕДИАГАЛЕРЕЯ И ЛАЙТБОКС
    const mediaList = [
        { type: 'video', url: './img_video/Аврора_видео.mp4', title: 'кушоем' },
        { type: 'video', url: './img_video/Аврора_видео1.mp4', title: 'зависла' },
        { type: 'video', url: './img_video/Аврора_видео2.mp4', title: '...' },
        { type: 'video', url: './img_video/Аврора_видео3.mp4', title: 'завтыкала' },
        { type: 'photo', url: './img_video/Аврора3.jpg', title: 'боится' },
        { type: 'photo', url: './img_video/Аврора6.jpg', title: 'ёпта' },
        { type: 'photo', url: './img_video/Аврора7.jpg', title: 'выше всех' },
        { type: 'photo', url: './img_video/Аврора8.jpg', title: 'ммм угол)))' }
    ];

    const galleryGrid = document.getElementById('gallery-grid');
    const lightbox = document.getElementById('lightbox');
    const lightboxContent = document.getElementById('lightbox-content');
    const lightboxClose = document.getElementById('lightbox-close');

    if (galleryGrid) {
        mediaList.forEach(media => {
            const item = document.createElement('div');
            item.className = 'gallery-item';

            if (media.type === 'photo') {
                const img = document.createElement('img');
                img.src = media.url;
                img.alt = media.title;
                img.loading = 'lazy';
                item.appendChild(img);
            } else {
                // Создаем превью видео
                const video = document.createElement('video');
                video.src = media.url;
                video.muted = true;
                video.playsInline = true;
                item.appendChild(video);

                // Добавляем бейдж «видео»
                const badge = document.createElement('div');
                badge.className = 'video-badge';
                badge.innerHTML = '▶ Видео';
                item.appendChild(badge);
            }

            // Добавляем красивую плашку при наведении
            const overlay = document.createElement('div');
            overlay.className = 'gallery-overlay';
            overlay.innerHTML = `<span class="gallery-overlay-text">${media.title}</span>`;
            item.appendChild(overlay);

            // Клик для открытия в модальном окне
            item.addEventListener('click', () => openLightbox(media));

            galleryGrid.appendChild(item);
        });
    }

    function openLightbox(media) {
        if (!lightbox || !lightboxContent) return;
        lightboxContent.innerHTML = '';

        if (media.type === 'photo') {
            const img = document.createElement('img');
            img.src = media.url;
            img.alt = media.title;
            lightboxContent.appendChild(img);
        } else {
            const video = document.createElement('video');
            video.src = media.url;
            video.autoplay = true;
            video.controls = true;
            video.style.outline = 'none';
            lightboxContent.appendChild(video);
        }

        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Запрещаем прокрутку страницы сзади
    }

    // Закрытие лайтбокса
    const closeLightbox = () => {
        if (!lightbox) return;
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        if (lightboxContent) lightboxContent.innerHTML = ''; // Останавливаем воспроизведение видео при закрытии
    };

    lightboxClose?.addEventListener('click', closeLightbox);
    lightbox?.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });
