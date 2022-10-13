
const imgUrl = '../assets/img/digimon1.png'
// create the Scene object
var scene = sjs.Scene({ w: 640, h: 480 });

// load the images in parallel. When all the images are
// ready, the callback function is called.
scene.loadImages([imgUrl], function () {
    const standingAnimation = {
        size: { width: 44, height: 47 },
        offset: { x: 0, y: 0 },
        velocityX: 0, velocityY: 0, animationSize: 44 * 1,
    }
    const walkingAnimation = {
        size: { width: 44, height: 47 },
        offset: { x: 96, y: 0 },
        velocityX: 20, velocityY: 0, animationSize: 44 * 3,
    }
    let currentAnimation = standingAnimation

    // create the Sprite object;
    var sp = scene.Sprite(imgUrl);

    // change the visible size of the sprite
    sp.size(44, 47);

    // apply the latest visual changes to the sprite
    // (draw if canvas, update attribute if DOM);
    sp.update();

    // change the offset of the image in the sprite
    // (this works the opposite way of a CSS background)
    sp.offset(0, 0);

    // various transformations
    sp.move(100, 100);
    //sp.rotate(3.14 / 4);
    sp.scale(4);
    //sp.setOpacity(0.8);

    sp.update();
    let i = currentAnimation.offset.x
    let animation = setInterval(() => {
        sp.size(currentAnimation.size.width, currentAnimation.size.height);
        sp.offset(i, currentAnimation.offset.y);
        sp.move(currentAnimation.velocityX, currentAnimation.velocityY);
        sp.update();
        i += currentAnimation.size.width
        if (i >= currentAnimation.animationSize + currentAnimation.offset.x) {
            i = currentAnimation.offset.x
        }
    }, 300)
    window.addEventListener("click", () => {
        if (currentAnimation == walkingAnimation) {
            currentAnimation = standingAnimation
            i = currentAnimation.offset.x
        } else {
            currentAnimation = walkingAnimation
            i = currentAnimation.offset.x
        }
    })
});