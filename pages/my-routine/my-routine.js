function scrollToY(targetY, duration) {
    const startingY = window.scrollY;
    const startTime = 'now' in window.performance ? performance.now() : new Date().getTime();

    function step() {
      const currentTime = 'now' in window.performance ? performance.now() : new Date().getTime();
      const elapsed = currentTime - startTime;

      window.scrollTo(0, easeInOutCubic(elapsed, startingY, targetY - startingY, duration));

      if (elapsed < duration) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }

  function easeInOutCubic(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t * t + b;
    t -= 2;
    return c / 2 * (t * t * t + 2) + b;
  }

  function handleScroll(event) {
    if (event.deltaY > 0) {
      scrollToY(window.scrollY + window.innerHeight, 500);
    } else {
      scrollToY(window.scrollY - window.innerHeight, 500);
    }

    event.preventDefault();
  }

  window.addEventListener('wheel', handleScroll);

function random_flutter(container_name, flutter_name){
    let have_init = false;
    console.log(container_name, flutter_name)
    let eat_container = document.getElementById(container_name);
    let eats = Array.from(document.querySelectorAll(flutter_name));

    let init_count = eats.length;

    eats.forEach((eat) => {
        function getRandomPosition() {
            if(have_init == false){
                let containerRect = eat_container.getBoundingClientRect();
                let initialX = Math.random() * (containerRect.width - eat.clientWidth);
                let initialY = Math.random() * (containerRect.height - eat.clientHeight);
                init_count --;
                if(init_count == 0){
                    have_init = true
                }
                return { initialX, initialY };
            }
            
        }

        let { initialX, initialY } = getRandomPosition();

        eat.style.position = 'absolute';
        eat.style.left = `${initialX}px`;
        eat.style.top = `${initialY}px`;

        let vx = Math.min((Math.random() - 0.5) * 4, 2);
        let vy = Math.min((Math.random() - 0.5) * 4, 2);

        function update() {
            let rect = eat.getBoundingClientRect();
            let containerRect = eat_container.getBoundingClientRect();

            let x = rect.left - containerRect.left + vx;
            let y = rect.top - containerRect.top + vy;

            if (x < 0 || x > containerRect.width - eat.clientWidth) {
                vx *= -1;
            }

            if (y < 0 || y > containerRect.height - eat.clientHeight) {
                vy *= -1;
            }

            eat.style.left = `${x}px`;
            eat.style.top = `${y}px`;
        }

        function animate() {
            update();
            requestAnimationFrame(animate);
        }

        window.addEventListener('scroll', () => {
            let { initialX, initialY } = getRandomPosition();
            eat.style.left = `${initialX}px`;
            eat.style.top = `${initialY}px`;
        });

        animate();
    });
}


random_flutter('eat-photo-album','.eat')
random_flutter('play-photo-album','.play')
random_flutter('sleep-photo-album','.sleep')

let to_right = document.getElementsByClassName('to-right-1');

for (let container of to_right) {
    console.log(container)
    container.addEventListener('click', function (event) {
        if (event.target.tagName === 'IMG') {
            openOverlay(event.target.src);
        }
    });
}

to_right = document.getElementsByClassName('to-right-2');
for (let container of to_right) {
    container.addEventListener('click', function (event) {
        if (event.target.tagName === 'IMG') {
            openOverlay(event.target.src);
        }
    });
}

function openOverlay(imageSrc) {
    let overlay = document.getElementById('overlay');
    let overlayImage = document.getElementById('overlayImage');

    overlayImage.src = imageSrc;
    overlay.style.display = 'flex';
}

document.getElementById('overlay').addEventListener('click', function() {
    this.style.display = 'none';
});