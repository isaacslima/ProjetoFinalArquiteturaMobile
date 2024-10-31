function updateTotals() {
    let currencyFrom = localStorage.getItem("currencyFrom");
    let currencyTo = localStorage.getItem("currencyFrom");

    console.log(currencyFrom)
    if(typeof(currencyFrom) === "object" && !currencyFrom){
        localStorage.setItem("currencyFrom", "BRL")
    };


    console.log(currencyTo)
    if(typeof(currencyTo) === "object" && !currencyTo){
        localStorage.setItem("currencyTo", "USD")
    };

    let expensesLocalStorage = localStorage.getItem("expenses");

    const expenses = JSON.parse(expensesLocalStorage);
    if(typeof(expenses) === "object" && !expenses){
        return;
    }

    const totalOriginal = expenses.reduce((acc, exp) => acc + (exp.value * exp.quantity), 0);
    const totalConverted = expenses.reduce((acc, exp) => acc + exp.convertedValue, 0);
  
    document.getElementById('total-original').textContent = `Total (Moeda de Origem): ${totalOriginal.toFixed(2)}`;
    document.getElementById('total-converted').textContent = `Total (Moeda de Destino): ${totalConverted.toFixed(2)}`;
  }

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems,   
 {});
});