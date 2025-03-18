

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
    let myChart = ['myChart','myChart2'];
    
    let chartOptions = ['select-wrapper','select-wrapper2'];
    


    


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
        setTimeout(() => {
              doCalculate(globalAmount,globalrate,globaltime);
        },500)
           // doCalculate(globalAmount,globalrate,globaltime);
              

    
    });

    // Add event listener for the range slider element
    rangeSlider.addEventListener(eventType, () => {
        let rangeSliderValue = parseInt(rangeSlider.value, 10) || 0;
        inputInput.value = rangeSliderValue; // Sync input with slider

        // Update global variables correctly
        if (rangeSlider === rangeAmount) globalAmount = rangeSliderValue;
        if (rangeSlider === rangeRate) globalrate = rangeSliderValue;
        if (rangeSlider === rangeTime) globaltime = rangeSliderValue;
           setTimeout(() => {
               doCalculate(globalAmount,globalrate,globaltime);

           },500);
           // doCalculate(globalAmount,globalrate,globaltime);
              

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
        return parseFloat((result.toFixed(2)));
    }

    getInterest(){
       
        const int = this.getTotalPaid()-this.amount;
        return parseFloat(int.toFixed(2));
        
    }

     getTotalPaid(){
         const total = this.getEmi()*this.time*12;
         return parseFloat(total.toFixed(2));
     }

     getAllTransaction(){
         return {emi:this.getEmi(),totalInterest:this.getInterest(),totalpaid:this.getTotalPaid(),amount:this.amount}
     }
     
getEmiBreakDown() {
    let balance = Number(this.amount);
    let monthTenure = Number(this.time * 12);
    let principal, interest;
    let emi = this.getEmi(); // Keep EMI as precise as possible
    let monthlyRate = this.rate / 1200;
    let month = 1;
    let totalInterest = 0;
    let totalPrincipal = 0;
    this.transactions = [];
    let totalMonthPayment = 0;

    while (balance > 0 && month <= monthTenure) {
        interest = balance * monthlyRate; // No rounding yet
        principal = emi - interest;

        // 🔥 Last EMI Fix: Adjust for final balance
        if (principal > balance) {
            principal = balance;
             // Adjust EMI to exactly clear balance
        }

        if( month === monthTenure){
            principal = balance;
        }

        balance -= principal;
        totalInterest += interest;
        totalPrincipal += principal;
        totalMonthPayment = interest+principal;

        this.transactions.push({
            month,
            totalMonthPayment,
            emi: (emi.toFixed(2)),
            interest: (interest.toFixed(2)),
            principal: (principal.toFixed(2)),
            balance: (balance.toFixed(2))
        });

        month++;
    }

    // 🔥 Final Adjustment: Fix any small floating-point differences
   

    



    console.log("✅ Total Months:", this.transactions.length);
    console.log("✅ Total Interest Paid:", totalInterest);
    console.log("✅ Total Payment:", this.amount + totalInterest);
    

    return {
        transactions: this.transactions,
      
    };
}

     
}

// function to calculate get emis interest and principal,
const  doCalculate =  (amount,rate,time) =>{
   let sets = [];
   let labels = [];
   let sets2 = [];
   let labels2 = [];
   
if( amount<0 || rate<0 || time<0 && !amount && !rate && !time){
    window.alert('please enter valid inputs');
    return;
}
const cal = new Calculate(amount,rate,time);
let datass = cal.getAllTransaction();

let tableData = cal.getEmiBreakDown().transactions;
console.log(tableData.totalMonthPayment);



// DOM updates

if(!datass.emi && !datass.totalInterest && !datass.totalpaid){
    return;
}
emi.textContent = '₹'+' '+datass.emi;
interest.textContent = '₹'+" "+datass.totalInterest;
total.textContent = '₹'+' '+datass.totalpaid;

sets.push(cal.getEmi(),cal.getInterest(),cal.getTotalPaid());
labels.push('emi','totalInterst','totalpaid');
sets2.push(amount,cal.getTotalPaid());
labels2.push('amount','total repayment');


  render(sets,labels,myChart[0],chartOptions[0]);
  render(sets2,labels2,myChart[1],chartOptions[1]);
  renderTable(tableData);



}

// function for chart creation and updates
const charts = {}; // Store chart instances globally

const createOrUpdateChart = (datas, typeOfChart, labels, elementId) => {
    const canvas = document.getElementById(elementId);
    const ctx = canvas.getContext('2d');

    // Destroy existing chart if type is different
    if (charts[elementId]) {
        if (charts[elementId].config.type !== typeOfChart) {
            charts[elementId].destroy();
            charts[elementId] = null;
        }
    }

    // Create new chart if none exists
    if (!charts[elementId]) {
        charts[elementId] = new Chart(ctx, {
            type: typeOfChart,
            data: {
                labels: labels,
                datasets: [{
                    label: 'Dataset',
                    data: datas,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor:['tomato',' #41BE8B','#7d4cb3'],
                    fill: false
                }]
            }
        });
    } else {
        // Update data if type is the same
        charts[elementId].data.labels = labels;
        charts[elementId].data.datasets[0].data = datas;
        charts[elementId].update();
    }
}
const render = (datas,labels,elementId,chartOptions) =>{
    
let typed = document.getElementById(chartOptions);
    typed.addEventListener('input', (e) => {
        if(e.target.tagName === 'SELECT'){

        if(e.target.value !=='Select type of chart'){
            
            selectedType = e.target.value;

            if(charts[elementId]){
                charts[elementId].destroy();
                charts[elementId] = null;
                        
                    
                }
            
               createOrUpdateChart(datas,selectedType,labels,elementId);

            }
             }

    })

}

const renderTable = (data) => {
    if (!Array.isArray(data)) {
        console.log('data is not array or iterable');
        return {mesaage:'data is not an array'}
    }
    

    const tbody = document.getElementById('table-body');
    tbody.innerHTML =  '';

    data.forEach(({month,emi,principal,balance,interest},index) => {
       const row = document.createElement('tr');
         if (index % 2 === 0) {
        row.classList.add("even-row");
           }
           
            else {
        row.classList.add("odd-row");
            }

       row.innerHTML = `<td>${month}</td>
                       <td>₹ ${emi}</td>
                       <td>₹ ${interest}</td>
                       <td>₹ ${principal}</td>
                       <td>₹ ${balance}</td>`;
                       tbody.appendChild(row); 
    })
    
} 


 


syncInputs(inputAmount,rangeAmount,'input');
syncInputs(inputRate,rangeRate,'input');
syncInputs(inputTime,rangeTime,'input');












   





