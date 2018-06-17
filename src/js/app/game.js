import Calculation from './calc.js';
import Translate from './translate.js';
import Sortable from './sortable.js';
import Speech from './speech.js';
import nameDictionary from '../dictionary/nameDictionary.js';
import imgDictionary from '../dictionary/imgDictionary.js';
import $ from 'jquery';

const taskDamage = {
  "damage": {
    "numbers": [5,10],
    "translate": [13,20],
  },
  "health": {
    "sort": [5,10],
    "speech": [13,20],
  }
};

class Game {
    constructor(playerName) {
      this.playerName = playerName;
      this.enemyName = '';
      this.enemyImg = null;
      this.taskArray = [new Calculation(), new Translate(), new Sortable(), new Speech()];
      this.health = 100;
      this.monsterHealth = 100;
      this.userHealthBar = document.getElementById("firstHealth");
      this.enemyHealthBar = document.getElementById("secondHealth");
      this.textUserHealth = document.getElementById("textFirstHealth");
      this.textEnemyHealth = document.getElementById("textSecondHealth");
      this.castSpellButton = document.getElementById("castSpell");
      this.spellWindow = document.getElementById("modalWindow");
      this.animationDiv = document.querySelector(".animation");
      this.popupsOverlay = document.querySelector(".popups-overlay");
      this.congratulationPopup = document.querySelector(".congratulation-popup");
      this.startTime = new Date();
      this.countTurns = 0;
      this.countEnemies = 0;
    }
    setUserName() {
      const userName = document.getElementById("firstName");
      userName.textContent = this.playerName;
    }
    generateEnemyName(nameDictionary) {
        const name = document.getElementById("secondName");
        for(let index in nameDictionary) {
            this.enemyName += nameDictionary[index][Math.floor(Math.random() * nameDictionary[index].length)] + " ";
        }
        name.textContent = this.enemyName;
    }
    generateEnemyImg(imgDictionary) {
        const battlefield = document.getElementById("battlefield");
        this.enemyImg = document.createElement("div");
        this.enemyImg.id = "enemyImg";
        this.enemyImg.classList = "enemyImg";
        for(let index in imgDictionary) {
            const img = document.createElement("img");
            img.src = imgDictionary[index][Math.floor(Math.random() * imgDictionary[index].length)];
            this.enemyImg.appendChild(img);
        }
        battlefield.appendChild(this.enemyImg);
    }

    setModalListener(modalWindow) {
        modalWindow.addEventListener("click", event => {
            let taskInstance;
            let action;
            switch(event.target.id) {
                case 'numbers': {
                  taskInstance = this.taskArray[0];
                  action = 'damage'
                  break;
                };
                case 'translate': {
                  taskInstance = this.taskArray[1];
                  action = 'damage'
                  break;
                };
                case 'sort': {
                  taskInstance = this.taskArray[2];
                  action = 'health';
                  break;
                }
                case 'speech': {
                  taskInstance = this.taskArray[3];
                  action = 'health';
                  break;
                }
            }
            const self = this;
            if(taskInstance) {

              this.checkAnswer(taskInstance)
                .then( (res) => {
                  this.popupsOverlay.classList.toggle("hide");
                  this.trues(res);
                  if(res) {
                    self.calculate(taskDamage[action][event.target.id], action, true);
                  }
                  self.monsterTurn(taskDamage[action][event.target.id]);
                });
            }
        });
    }

    checkAnswer(task) {
        this.spellWindow.classList.toggle("hide");

        return task.start();
    }

    calculate(valueArr, action, userTurn){
      let value = _.random(valueArr[0], valueArr[1]);
      this.turns(userTurn);
      this.animation(userTurn, action);

      if(action === "damage") {
         let audio = new Audio("sounds/hit.mp3").play();
         userTurn ? value += Math.floor(Math.random() * value) : 0;
         this[userTurn ? 'monsterHealth' : 'health'] -= value;

        if (this[userTurn ? 'monsterHealth' : 'health'] <= 0) {
          //alert(`You ${userTurn ? 'win' : 'lose'}`);
          this.checkWin(userTurn);
        }
      } else {
        let audio = new Audio("sounds/heal.mp3").play();
        this[userTurn ? 'health' : 'monsterHealth'] += value;
      }
      this.updateHealth();
      console.log("monster Health",this.monsterHealth, "user Health", this.health);
    }

    animation(userTurn, action) {
      this.animationDiv.classList.add(`${userTurn ? true : false}`);
      // true - слева направо анимация
      // false - справа налево
      this.animationDiv.classList.add(`${action}`);
      $('.animation').fadeIn('faster');
      setTimeout(() => {
        this.animationDiv.classList.remove(`${userTurn ? true : false}`);
        this.animationDiv.classList.remove(`${action}`);
        $('.animation').fadeOut('faster');
      }, 2000);
    }

    trues(res) {
      const answerDiv = document.getElementById("true");
      if(res) {
        answerDiv.innerHTML = "You are right!";
        answerDiv.style.color = "green";
      } else {
        answerDiv.innerHTML = "sorry, but your answer is wrong!";
        answerDiv.style.color = "red";
      }
      $('#true').fadeIn('faster');
      setTimeout(() => {
        $('#true').fadeOut('faster');
      }, 2000);
    }

    monsterTurn(valueArr) {
      const damageKeys = _.keys(taskDamage);
      const sizetaskDamage = _.size(taskDamage);
      let action = damageKeys[_.random(sizetaskDamage - 1)];
      if(this.monsterHealth > 80){
        action = "damage";
      }
      this.turns(false);
      setTimeout(() => {
        this.calculate(valueArr, action);
        this.turns(true);
      }, 2000);
    }

    turns(userTurn) {
      const turns = document.getElementById("turns");
      this.countTurns++;
      if(userTurn) {
        turns.textContent = "YOU TURN";
      } else {
        turns.textContent = "ENEMY TURN";
      }
      $('#turns').fadeIn('faster');
      setTimeout(() => {
        $('#turns').fadeOut('faster');
      }, 2000);
    }

    updateHealth() {
      let self = this;
      this.textEnemyHealth.textContent =  this.monsterHealth;
      this.textUserHealth.textContent = this.health;
      if(this.health > this.userHealthBar.value
        || this.monsterHealth > this.enemyHealthBar.value) increaseHealth();
      if(this.health <= this.userHealthBar.value
        || this.monsterHealth <= this.enemyHealthBar.value) reduceHealth();

      function increaseHealth() {
        if(self.userHealthBar.value < self.health) {
          self.userHealthBar.value++;
         setTimeout(increaseHealth, 10);
        }
        if(self.enemyHealthBar.value < self.monsterHealth) {
          self.enemyHealthBar.value++;
          setTimeout(increaseHealth, 10);
        }
      }

      function reduceHealth() {
        if(self.userHealthBar.value > self.health) {
          self.userHealthBar.value--;
         setTimeout(reduceHealth, 10);
        }
        if(self.enemyHealthBar.value > self.monsterHealth) {
          self.enemyHealthBar.value--;
          setTimeout(reduceHealth, 10);

        }
      }
    }

    start() {
      this.castSpellButton.addEventListener("click", event => {
        this.spellWindow.classList.toggle("hide");
        this.popupsOverlay.classList.toggle("hide");
      })
      this.generateEnemyName(nameDictionary);
      this.setUserName();
      this.generateEnemyImg(imgDictionary);
      this.setModalListener(this.spellWindow);
      setTimeout(this.turns(true), 500);
      this.countEnemies++;
    }

    checkWin(userTurn) {
      if (userTurn) {

        this.showCongratulation();

      } else {
        this.showScoreboard();
      }
    }

    timer() {
      const newDate = new Date() - this.startTime;
            let sec = Math.abs(Math.floor(newDate/1000)%60);
            let min = Math.abs(Math.floor(newDate/1000/60)%60);
            let hours = Math.abs(Math.floor(newDate/1000/60/60)%24);
            if(sec.toString().length == 1) sec = "0" + sec;
            if(min.toString().length == 1) min = "0" + min;
            if(hours.toString().length == 1) hours = "0" + hours;
            return hours + ":" + min + ":" + sec;
    }
    showScoreboard() {
      const scoreBoard = document.getElementById("scoreboard");


      document.querySelector(".player-name").innerHTML = `Player name: <span class="player-name-span">${this.playerName}</span>`;
      document.querySelector(".playing-time").innerHTML = `Playing time: <span class="playing-time-span">${this.timer()}</span>`;
      document.querySelector(".count-enemies").innerHTML = `Count enemies: <span class="count-enemies-span">${this.countEnemies}</span>`;
      document.querySelector(".count-steps").innerHTML = `Count steps: <span class="count-steps-span">${this.countTurns - 1}</span>`;
      scoreBoard.style.display = "block";

      this.popupsOverlay.classList.toggle("hide");

      scoreBoard.addEventListener("click", event => {
        if(event.target.id == "playAgain") {
          this.newGame();
        }
      })
    }
    showCongratulation() {
      setTimeout(() => {
        this.congratulationPopup.classList.toggle("hide");
        this.popupsOverlay.classList.toggle("hide");


      }, 2000);
      this.congratulationPopup.addEventListener("click", event => {
        if(event.target.id == "nextFight") {

          this.nextFight();
        }
      })
    }
    newGame() {
      const scoreBoard = document.getElementById("scoreboard");
      this.popupsOverlay.classList.add("hide");
      scoreBoard.style.display = "none";
      const battlefield = document.getElementById("battlefield");
      battlefield.removeChild(document.getElementById("enemyImg"));
      this.health = 100;
      this.monsterHealth = 100;
      this.enemyName = '';
      this.generateEnemyName(nameDictionary);
      this.generateEnemyImg(imgDictionary);
      this.countEnemies = 0;
      this.countTurns = 0;
      this.startTime = new Date();
      this.updateHealth();
    }
    nextFight() {
      const battlefield = document.getElementById("battlefield");
      battlefield.removeChild(document.getElementById("enemyImg"));
      this.congratulationPopup.classList.add("hide");
      this.popupsOverlay.classList.add("hide");
      this.enemyName = '';
      this.health = 100;
      this.monsterHealth = 100;
      this.updateHealth();
      this.generateEnemyName(nameDictionary);
      this.generateEnemyImg(imgDictionary);
      this.countEnemies++;
    }
}
export default Game;
