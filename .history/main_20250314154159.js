

    // elements inputs
    let inputAmount = document.getElementById('input-amount');
    let inputRate =   document.getElementById('input-rate');
    let inputTime =  document.getElementById('input-time');
    const btn = document.querySelectorAll('.scrollTo');
    btn.forEach(btns =>{
        btns.addEventListener('click' , () => {
            document.getElementById('emiContainer').scrollIntoView({behavior:"smooth"});
        })
    });

     // elements of ange slide
    let rangeAmount =  document.getElementById('amount');
    let rangeRate =  document.getElementById('rate');
    let rangeTime = document.getElementById('time');

    // global  variable or state variable
    let globalAmount = 0;
    let globalrate = 0;
    let globaltime = 0;
    let selectedType = 'bar';

    


    // make input function 
      const syncInputs = (inputInput, rangeSlider, eventType = 'input') => {
    // Add event listener for the input element
    inputInput.addEventListener(eventType, () => {
        let inputValue = parseInt(inputInput.value, 10) || 0;
        rangeSlider.value = inputValue; // Sync slider with input

        // Update global variables correctly
        if (inputInput === inputAmount) globalAmount = inputValue;
        if (inputInput === inputRate) globalrate = inputValue;
        if (inputInput === inputTime) globaltime = inputValue;
            doCalculate(globalAmount,globalrate,globaltime);
    
    });

    // Add event listener for the range slider element
    rangeSlider.addEventListener(eventType, () => {
        let rangeSliderValue = parseInt(rangeSlider.value, 10) || 0;
        inputInput.value = rangeSliderValue; // Sync input with slider

        // Update global variables correctly
        if (rangeSlider === rangeAmount) globalAmount = rangeSliderValue;
        if (rangeSlider === rangeRate) globalrate = rangeSliderValue;
        if (rangeSlider === rangeTime) globaltime = rangeSliderValue;
            doCalculate(globalAmount,globalrate,globaltime);
    });
};

    // go to calculator container emi directly
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
       
        const int = this.getTotalPaid()-this.amount;
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

// function to calculate get emis interest and principal,
const  doCalculate =  (amount,rate,time) =>{
if(!amount && !rate && !time){
    console.log('no value');
    return ;
}
const cal = new Calculate(amount,rate,time);

// DOM updates
emi.textContent = '₹'+' '+cal.getEmi();
interest.textContent = '₹'+" "+cal.getInterest();
total.textContent = '₹'+' '+cal.getTotalPaid();



}

// function for chart creation and updates
const createChart = (datas,typeOfChart,labels,elementId) => {
    const ele = document.getElementById(elementId).getContext('2d');
    const options = {
      label: lables,
      type: typeOfChart,
      data: datas
    }
  const myChart = new Chart(ele,options);
}

const render = () =>{
let typed = document.getElementById('select-wrapper');
    typed.addEventListener('click', (e) => {
        if(selectedType !=='Select type of chart'){
            console.log(' not empty');
        }


    })

}


 


syncInputs(inputAmount,rangeAmount,'input');
syncInputs(inputRate,rangeRate,'input');
syncInputs(inputTime,rangeTime,'input');




render();








   





