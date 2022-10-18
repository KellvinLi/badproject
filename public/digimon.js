const imgUrl = './assets/img/digimonleft.png'
const imgUrl2 = './assets/img/digimonright.png'
let isMove = false
function run() {
    let walkingContainer = document.querySelector('#digimon-canvas-container')
    let yContainerInvertedLimit = walkingContainer.getBoundingClientRect().y + walkingContainer.getBoundingClientRect() - 200

    let scene = sjs.Scene({ w: window.innerWidth, h: walkingContainer });
    scene.loadImages([imgUrl], function () {
        const standingAnimation = {
            size: { width: 44, height: 47 },
            offset: { x: 0, y: 0 },
            velocityX: 0, velocityY: 0, animationSize: 44 * 1,
        }
        const walkingAnimation = {
            size: { width: 44, height: 47 },
            offset: { x: 96, y: 0 },
            velocityX: 100, velocityY: 0, animationSize: 44 * 3,
        }
        // create the Sprite object;
        var sp = scene.Sprite(imgUrl);

        // change the visible size of the sprite
        sp.size(standingAnimation.size.width, standingAnimation.size.height);

        // apply the latest visual changes to the sprite
        // (draw if canvas, update attribute if DOM);
        sp.update();

        // change the offset of the image in the sprite
        // (this works the opposite way of a CSS background)
        // sp.offset(0, 0);

        // various transformations
        console.log(walkingContainer.getBoundingClientRect())
        console.log(window.innerHeight)
        sp.move( window.innerWidth / 4, walkingContainer.getBoundingClientRect().bottom -  walkingContainer.getBoundingClientRect().height + 300);
        // sp.rotate(3.14 / 4);
        sp.scale(4);
        // sp.setOpacity(0.8);

        sp.update();

        let currentAnimation = standingAnimation
        let currentX = currentAnimation.offset.x
        let currentY = currentAnimation.offset.y
        let token = sp.dom
        let walkingContainerInvertedLimit = walkingContainer.getBoundingClientRect().x + walkingContainer.getBoundingClientRect().width - 800
        let walkToRight = true
        
        let leftToRight = setInterval(() => {
            let tokenRightLimit = token.getBoundingClientRect().x + token.getBoundingClientRect().width
            sp.size(currentAnimation.size.width, currentAnimation.size.height);
            sp.offset(currentX, currentY);
            // console.log('tokenRightLimit = ', tokenRightLimit)
            // console.log('walkingContainerInvertedLimit = ', walkingContainerInvertedLimit)


            if (tokenRightLimit > walkingContainerInvertedLimit ){
                walkToRight = false
            }
            if (tokenRightLimit < 600 ){
                console.log('walking to right')
                walkToRight = true
            }


            let moveX = walkToRight ? currentAnimation.velocityX : -currentAnimation.velocityX
            if(walkToRight){
                sp.setXScale(4)
            }else {
                sp.setXScale(-4)
            }
            // if (count < 20 ) {
            //     sp.rotate(3.14 / 4);
            // }
            // scene.Sprite(imgUrl2);

            sp.move(moveX, currentAnimation.velocityY);
            sp.update();
            currentX += currentAnimation.size.width
            if (currentX >= currentAnimation.animationSize + currentAnimation.offset.x) {
                currentX = currentAnimation.offset.x
            }
        }, 300)


        document.querySelector("#start-end-btn").addEventListener("click", () => {
            console.log("hi")
        })
        
        walkingContainer.addEventListener("click", () => {
            if (currentAnimation == walkingAnimation) {
                currentAnimation = standingAnimation
                currentX = currentAnimation.offset.x
            } else {
                currentAnimation = walkingAnimation
                currentX = currentAnimation.offset.x
            }
        })

    });

    let homebutton = document.querySelector("#back-btn");

    console.log('homebutton: ', homebutton);

    homebutton.addEventListener("click", function (e) {

        window.location.href = `/digimon.html`;
      
      })
}

run()