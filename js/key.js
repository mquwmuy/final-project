export function initKey() {
    document.addEventListener("keydown", (event) => {
        const key = event.key;

        const lightbox = document.getElementById("lightbox");
        const lightboxContent = document.getElementById("lightbox-content");
        const lightboxClose = document.getElementById("lightbox-close");

        if (!lightboxContent) {
            if (key === "ArrowLeft") {
                const leftArrow = document.querySelector(".arrow-left");
                if (leftArrow) leftArrow.click();
                event.preventDefault();
            } else if (key === "ArrowRight") {
                const rightArrow = document.querySelector(".arrow-right");
                if (rightArrow) rightArrow.click();
                event.preventDefault();
            }
        }

        if (key === "Escape" && lightboxContent) {
            if (lightboxClose) lightboxClose.click();
            event.preventDefault();
        }
    });
}
