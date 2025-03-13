
    let inputAmount = document.getElementById('input-amount');
    let inputRate = document.getElementById('input-rate');
    let inputTime = document.getElementById('input-time');


    let rangeAmount = document.getElementById('amount');
    let rangeRate = document.getElementById('rate');
    let rangeTime = document.getElementById('time');

    


    let gAmount = 0;
    let grate = 0;
    let gtime = 0;
    


    // make input function 
       const syncInputs = (inputInput, rangeSlider, eventType = 'input') => {
    // Check if both elements exist
   

    // Add event listener for the input element
    inputInput.addEventListener(eventType, () => {
        let value = parseInt(inputInput.value,10);
        rangeSlider.value =value;
        console.log(parseInt(rangeSlider.value));
        console.log(value);
        console.log(typeof rangeSlider.value);
       // doCalculate(inputAmount.value,inputRate.value,inputTime); 
    });

    // Add event listener for the range slider element
    rangeSlider.addEventListener(eventType, () => {
        let value = parseInt(rangeSlider.value,10);
        inputInput.value = value;
        console.log(parseInt(inputInput.value));
        console.log(typeof inputInput.value); 
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

const cal = new Calculate(inputAmount.value,inputRate,inputTime);
// let man = cal.getEmi();

console.log(cal.getInterest());
console.log(cal.getTotalPaid());
console.log(cal.getEmi());
console.log(cal.getAllTransaction());

const doCalculate = (amount,rate,time) =>{

const cal = new Calculate(gAmount,grate,gtime);
console.log(cal.getEmi());
console.log(cal.getInterest());
console.log(cal.getTotalPaid());






emi.textContent =cal.getEmi();
interest.textContent =cal.getInterest();
total.textContent = cal.getTotalPaid();

}

const rendered = (gAmount,grate,gtime) =>{
    
    doCalculate(gAmount,grate,gtime);
    console.log('rendered running')
    console.log(gAmount,grate,gtime);

}

btn.addEventListener('click',() =>{
    rendered(gAmount,grate,gtime);
    console.log(' btn sclick');
});



    syncInputs(inputAmount,rangeAmount,eventType='input');
    syncInputs(inputRate,rangeRate,eventType='input');
    syncInputs(inputTime,rangeTime,eventType='input');



   





