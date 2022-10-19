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
        sp.move( window.innerWidth / 4, -200);
        // sp.rotate(3.14 / 4);
        sp.scale(4);
        // sp.setOpacity(0.8);

        sp.update();

        let currentAnimation = standingAnimation
        let currentX = currentAnimation.offset.x
        let currentY = currentAnimation.offset.y
        let token = sp.dom
        // let walkingContainerInvertedLimit = walkingContainer.getBoundingClientRect().x + walkingContainer.getBoundingClientRect().width - 800
        let walkingContainerInvertedLimit = window.innerWidth
        let walkToRight = true
        
        let leftToRight = setInterval(() => {
            let tokenRightLimit = token.getBoundingClientRect().x + token.getBoundingClientRect().width
            sp.size(currentAnimation.size.width, currentAnimation.size.height);
            sp.offset(currentX, currentY);
            // console.log('tokenRightLimit = ', tokenRightLimit)
            // console.log('walkingContainerInvertedLimit = ', walkingContainerInvertedLimit)


            if (tokenRightLimit > 1200 ){
                walkToRight = false
            }
            // console.log("tokenRightLimit: ", tokenRightLimit)
            if (tokenRightLimit < 400 ){
                // console.log('walking to right')
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


        // document.querySelector("#start-end-btn").addEventListener("click", () => {
        //     console.log("hi")
        // })
        
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

        window.location.href = `/userProfile.html`;
      
      })

      let dragonbutton = document.querySelector("#dragon-btn");

    console.log('dragonbutton: ', dragonbutton);

    dragonbutton.addEventListener("click", function (e) {

        window.location.href = `./monster-page/digimon-detail.html`;
      
      })
}

let poobutton = document.querySelector("#poo-btn");
let pooButtonAnimationWrapper = document.querySelector("#poo-btn-wrapper");

console.log('poobutton: ', poobutton);

poobutton.addEventListener("click", function(e) {
    /* 1. remove animation class */
    console.log('poobutton: ', poobutton);
    pooButtonAnimationWrapper.classList.remove('poo')

    /* 2. cleanPoo - send request to server to turn off poo status */
    
})

let eatbutton = document.querySelector('#eat-btn');
let eatButtonAnimationWrapper = document.querySelector("#eat-btn-wrapper");

console.log('eatbutton: ', eatbutton);

eatbutton.addEventListener('click', function(e) {
    console.log('eatbutton: ', eatbutton);
    eatButtonAnimationWrapper.classList.remove('bite')
})

async function getDigimonInfo() {
    let res = await fetch('/digimon/digimon_info');
    let data = await res.json();
    console.log('getDigimonInfo', data)

    let bar = document.querySelector('#bar-detail');
    barDetail.innerHTML += /* HTML */`
    <div class="bar-container" id="bar-detail">
      <div class="d-flex flex-align-center bar">
        <div class="hp">
          <div class="hp-text">HP</div>
          <div data-role="progress" data-value="100" style="width: 40%; margin-right: 5px;"></div>
          ${digimon.hp}
        </div>
      </div>
      <div class="d-flex flex-align-center bar">
        <div class="happy-exp">
          <div class="happy-exp-text">HAPPY-EXP</div>
          <div data-role="progress" data-value="100" style="width: 40%; margin-right: 5px;"></div>
          ${digimon.happy_exp}
        </div>
      </div>
      <div class="d-flex flex-align-center bar">
        <div class="att">
          <div class="att-text">Att</div>
          <div data-role="progress" data-value="100" style="width: 40%; margin-right: 5px;"></div>
          ${digimon.att}
        </div>
      </div>
      <div class="row">
        <div class="level-text">${digimon.evo}</div>
      </div>
    </div>

    <div class="digimon-pendulum"
      style="background-position: center;height: 850px;background-image:url('./assets/img/digimon_pendulum_z___nature_spirits_by_imagindevan_ddznazj-pre-removebg.png')">
      <div id="digimon-canvas-container"></div>
    `
}
getDigimonInfo()
run()