import { resolve } from "url";
import $ from 'jquery';

class Calculation {
    constructor() {
        this.resultCalculation = null;
        this.userResult = null;
        this.operator_1 = null;
        this.operator_2 = null;
        this.randomOperation = null;
        this.operator = {
            addition: "+",
            subtraction: "-",
            multiplication: "*",
          };
    }
    randomCalculation(operator) {
        let operatorSize, operatorKeys, randomOperate;
        this.operator_1 = _.random(1,10);
        this.operator_2 = _.random(1,10);
        operatorKeys = _.keys(operator);
        operatorSize = _.size(operator);
        randomOperate = operatorKeys[_.random(operatorSize - 1)];
        this.randomOperation = operator[randomOperate];
        this.resultCalculation = this.operator_1 + this.randomOperation + this.operator_2;
        this.resultCalculation = eval(this.resultCalculation);
    }
    addCalculationText(operator_1, operator_2, randomOperation) {
        const calculationPopupText = document.querySelector(".calculation-popup-text");
        calculationPopupText.innerHTML = `<div class="calculation-popup-text__title">
                                           <h3>Please, solve a mathematical example:</h3><br>
                                           <div>
                                             <span>${operator_1}</span>
                                             <span>${randomOperation}</span>
                                             <span>${operator_2}</span>
                                             <span> = ?</span>
                                           </div>
                                          </div>
                                          `
      }
      setCalcListener() {
        return new Promise((res)=>{
          const buttonCalculation = document.querySelector(".calculation-submit");
          buttonCalculation.addEventListener('click', () => {
              let inputResult = document.querySelector('.calculation-input');
              if(inputResult.value) {
                this.userResult = inputResult.value;
                $('.calculation-popup').fadeOut('faster');
                res(this.userResult == this.resultCalculation ? true : false);
              }
            });
        })

      }

      start() {
          this.randomCalculation(this.operator);
          this.addCalculationText(this.operator_1, this.operator_2, this.randomOperation);
          $('.calculation-popup').fadeIn('faster');
          return this.setCalcListener();
      }
}

export default Calculation;
