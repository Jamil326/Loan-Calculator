
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

    
     



    // Update inputAmount value when rangeAmount changes
    rangeAmount.addEventListener('input', () => {
        inputAmount.value = rangeAmount.value;
        gAmount +=inputAmount.value;
        console.log(gAmount);
    });

    // Update rangeAmount value when inputAmount changes
    inputAmount.addEventListener('input', () => {
        rangeAmount.value = inputAmount.value;
        
        console.log(rangeAmount.value);

    //udate inputRate
    rangeRate.addEventListener('input',() => {
        inputRate.value = rangeRate.value;
        grate += inputRate.value; 
        console.log(grate);
    });

    //update inputRange
    inputRate.addEventListener('input',()=>{
        rangeRate.value = inputRate.value;
        console.log(rangeRate.value);
    });

//update tenure
rangeTime.addEventListener('input',() => {
        inputTime.value = rangeTime.value; 
        gtime += inputTime.value;
        console.log(gtime);
    });

    //update inputRange
    inputTime.addEventListener('input',()=>{
        rangeTime.value = inputTime.value;
        console.log(rangeTime.value);
    });


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
emi.textContent=






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






