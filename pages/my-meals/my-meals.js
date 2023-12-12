let scrollPosition = 0;
let isScrolling = false;
const viewportHeight = window.innerHeight;
const scrollAmount = viewportHeight;

document.addEventListener('wheel', function (e) {
    if (!isScrolling) {
        if (e.deltaY > 0) {
            smoothScrollDown();
        } else {
            smoothScrollUp();
        }
    }
});

function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function smoothScrollDown() {
    isScrolling = true;
    const targetPosition = scrollPosition + scrollAmount;
    let startTimestamp;
    const totalDuration = 1000;

    function step(timestamp) {
        if (!startTimestamp) {
            startTimestamp = timestamp;
        }

        const progress = (timestamp - startTimestamp) / totalDuration;

        if (progress < 1) {
            const easedProgress = easeInOutCubic(progress);
            const delta = scrollAmount * easedProgress;
            window.scrollBy(0, delta);
            requestAnimationFrame(step);
        } else {
            window.scrollTo(0, targetPosition);
            isScrolling = false;
        }
    }

    requestAnimationFrame(step);
}

function smoothScrollUp() {
    isScrolling = true;
    let startTimestamp;
    const totalDuration = 1000; 

    function step(timestamp) {
        if (!startTimestamp) {
            startTimestamp = timestamp;
        }

        const progress = (timestamp - startTimestamp) / totalDuration;

        if (progress < 1) {
            const easedProgress = easeInOutCubic(progress);
            const delta = scrollAmount * easedProgress;
            window.scrollBy(0, -delta);
            requestAnimationFrame(step);
        } else {
            window.scrollTo(0, 0);
            isScrolling = false;
        }
    }

    requestAnimationFrame(step);
}


document.addEventListener("DOMContentLoaded", function() {
    const draggables = document.querySelectorAll('.draggable');

    draggables.forEach(draggable => {
        makeDraggable(draggable);
    });

    function makeDraggable(element) {
        let offsetX, offsetY, isDragging = false;

        element.addEventListener('mousedown', (e) => {
            isDragging = true;
            offsetX = e.clientX - element.getBoundingClientRect().left;
            offsetY = e.clientY - element.getBoundingClientRect().top;
            element.style.cursor = 'grabbing';
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;

            const x = e.clientX - offsetX;
            const y = e.clientY - offsetY;

            element.style.left = `${x}px`;
            element.style.top = `${y}px`;
        });

        element.addEventListener('mouseup', () => {
            isDragging = false;
            element.style.cursor = 'grab';
        });
    }
});