let backbutton = document.querySelector("#back-btn");

console.log('backbutton: ', backbutton);


backbutton.addEventListener("click", function (e) {

  window.location.href = `/digimon.html`;

})

async function getDigimonRecord() {
  let res = await fetch('/digimon/battle_info=?');
  let data = await res.json();
  console.log('getDigimonRecord', data)

  UpperBattleRecordDetailRow = document.querySelector('#upper-battle-record-detail-row');
  UpperBattleRecordDetailRow.innerHTML += /* HTML */ `
  <div class="bottom-section d-flex">
                    <div class="left-row-wrapper">
                        <div class="avg-score">
                            <div class="avg-top">avg. score</div>
                            <div class="avg-bottom">${avg. score}</div>
                        </div>
                        <div class="No-of-battle">
                            <div class="No-top">No. of battle</div>
                            <div class="No-bottom">78</div>
                        </div>
                        <div class="win-rate">
                            <div class="win-top">Win Rate</div>
                            <div class="win-bottom">89%</div>
                        </div>
                    </div>

                    <div class="right-row-wrapper">
                        <div class="battle-record" id="battle-record-1">
                            <div class="digimon-container">
                                <div>${digimon.name}</div>
                                <div class="agumon-img-container">
                                    <img src=${digimon.image}/>

                                </div>
                            </div>
                            <div class="vs-text">vs</div>

                            <div class="digimon-container">
                                <div>${digimon.name}</div>
                                <div class="gabumon-img-container">
                                    <img src=${digimon.image}/>
                                </div>
                            </div>
                            <div class="random-match">Random Match</div>
                        </div>
                    </div>
`
}
