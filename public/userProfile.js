

// below code for userProfile redirect page
window.onload = () => {
    init()
}

function init() {
    document.querySelector('#diginmon-park')
        .addEventListener('click', DigimonParkPage)
    document.querySelector('#diginmon-profile')
        .addEventListener('click', DigimonProfilePage)
    document.querySelector('#battle-history')
        .addEventListener('click', battleHistoryPage)
    document.querySelector('#logout')
        .addEventListener('click', logout)
}

async function DigimonParkPage() {
    window.location.href = 'digimon.html'
}

async function DigimonProfilePage() {
    window.location.href = '/monster-page/digimon-detail.html'
}

async function battleHistoryPage() {
    window.location.href = '/battle-history/battle-history.html'
}

async function logout() {
    const res = await fetch(`/user/logout`, {
        method: "POST"
    })
    console.log(res)
    if (res.ok) {
        window.location.href = './registerAndLogin.html'
    }
}

// below code for QR code
const wrapper = document.querySelector(".wrapper"),
    qrInput = wrapper.querySelector(".form input"),
    generateBtn = wrapper.querySelector(".form button"),
    qrImg = wrapper.querySelector(".qr-code img");
let preValue;

generateBtn.addEventListener("click", () => {
    let qrValue = qrInput.value.trim();
    if (!qrValue || preValue === qrValue) return;
    preValue = qrValue;
    generateBtn.innerText = "Generating QR Code...";
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${qrValue}`;
    qrImg.addEventListener("load", () => {
        wrapper.classList.add("active");
        generateBtn.innerText = "Generate QR Code";
    });
});

qrInput.addEventListener("keyup", () => {
    if (!qrInput.value.trim()) {
        wrapper.classList.remove("active");
        preValue = "";
    }
});