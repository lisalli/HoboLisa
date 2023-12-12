document.addEventListener("DOMContentLoaded", function() {
    const images = [
      { id: 1, element: document.getElementById("image1"), isStopped: false, x: 0, y: 0, xSpeed: 0, ySpeed: 0 },
      { id: 2, element: document.getElementById("image2"), isStopped: false, x: 0, y: 0, xSpeed: 0, ySpeed: 0 },
      { id: 3, element: document.getElementById("image3"), isStopped: false, x: 0, y: 0, xSpeed: 0, ySpeed: 0 }
    ];

    images.forEach(image => {
      image.element.addEventListener("mouseover", function() {
        image.isStopped = true;
      });

      image.element.addEventListener("mouseout", function() {
        image.isStopped = false;
        moveImage(image);
      });

      moveImage(image);
    });

    function moveImage(image) {
      if (!image.isStopped) {
        if (image.x === 0 && image.y === 0 && image.xSpeed === 0 && image.ySpeed === 0) {
          image.x = Math.random() * (window.innerWidth - image.element.clientWidth);
          image.y = Math.random() * (window.innerHeight - image.element.clientHeight);
          image.xSpeed = (Math.random() - 0.5) * 5;
          image.ySpeed = (Math.random() - 0.5) * 5;
        }

        const maxX = window.innerWidth - image.element.clientWidth;
        const maxY = window.innerHeight - image.element.clientHeight;

        image.x += image.xSpeed;
        image.y += image.ySpeed;

        if (image.x < 0 || image.x > maxX) {
          image.xSpeed *= -1;
        }

        if (image.y < 0 || image.y > maxY) {
          image.ySpeed *= -1;
        }

        image.element.style.left = image.x + "px";
        image.element.style.top = image.y + "px";

        requestAnimationFrame(() => moveImage(image));
      }
    }
  });