// elementsVlue
    let inputAmountValue =parseInt(document.getElementById('input-amount').value,10) ;
    let inputRateValue = parseInt( document.getElementById('input-rate').value,10);
    let inputTimeValue = parseInt( document.getElementById('input-time').value,10);

    


    let rangeAmountValue = parseInt( document.getElementById('amount').value,10);
    let rangeRateValue = parseInt(document.getElementById('rate').value,10);
    let rangeTimeValue = parseInt(document.getElementById('time').value,10);

    // elements
    let inputAmount = document.getElementById('input-amount');
    let inputRate =   document.getElementById('input-rate');
    let inputTime =  document.getElementById('input-time');


    let rangeAmount =  document.getElementById('amount');
    let rangeRate =  document.getElementById('rate');
    let rangeTime = document.getElementById('time');


    


    let gAmount = 0;
    let grate = 0;
    let gtime = 0;
    


    // make input function 
      const syncInputs = (inputInput, rangeSlider, eventType = 'input') => {
    // Add event listener for the input element
    inputInput.addEventListener(eventType, () => {
        let inputValue = parseInt(inputInput.value, 10) || 0;
        rangeSlider.value = inputValue; // Sync slider with input

        // Update global variables correctly
        if (inputInput === inputAmount) gAmount = inputValue;
        if (inputInput === inputRate) grate = inputValue;
        if (inputInput === inputTime) gtime = inputValue;

      
      console.log(gAmount,grate,gtime);
    });

    // Add event listener for the range slider element
    rangeSlider.addEventListener(eventType, () => {
        let rangeSliderValue = parseInt(rangeSlider.value, 10) || 0;
        inputInput.value = rangeSliderValue; // Sync input with slider

        // Update global variables correctly
        if (rangeSlider === rangeAmount) gAmount = rangeSliderValue;
        if (rangeSlider === rangeRate) grate = rangeSliderValue;
        if (rangeSlider === rangeTime) gtime = rangeSliderValue;
        
    });
};

    
     





    // make class for Calculation

class Calculate{
    constructor(amount,rate,time){
        this.amount = amount;
        this.rate = rate;
        this.time = time;
        this.transactions=[];
    }

    getEmi(){
        const monthlyRate =this.rate/1200;
        const tenure =12*this.time;
        const upper = this.amount*monthlyRate*(Math.pow(1+monthlyRate,tenure));
        const lower = (Math.pow(1+monthlyRate,tenure)-1);
        const result = upper/lower;
        return result.toFixed(2);
    }

    getInterest(){
       
        const int = 12*this.getEmi()-this.amount;
        return int.toFixed(2);
        
    }

     getTotalPaid(){
         const total = this.getEmi()*this.time*12;
         return total.toFixed(2);
     }

     getAllTransaction(){
         return {emi:this.getEmi(),totalInterst:this.getInterest(),totalpaid:this.getTotalPaid()}
     }
}


// let man = cal.getEmi();


const  doCalculate =  (amount,rate,time) =>{

const cal = new Calculate(amount,rate,time);
console.log(cal.getEmi());
console.log(cal.getInterest());
console.log(cal.getTotalPaid());






emi.textContent =cal.getEmi();
interest.textContent =cal.getInterest();
total.textContent = cal.getTotalPaid();

}

syncInputs(inputAmount,rangeAmount,'input');
syncInputs(inputAmount,rangeAmount,'input');







   





