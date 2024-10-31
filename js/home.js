
if (!navigator.serviceWorker.controller) {
    navigator.serviceWorker.register("sw.js").then(function(reg) {
        console.log("Service worker has been registered for scope: " + reg.scope);
    });
  }
function updateTotals() {

    let currencyFrom = localStorage.getItem("currencyFrom");

    let currencyTo = localStorage.getItem("currencyTo");

    if(typeof(currencyFrom) === "object" && !currencyFrom){
        localStorage.setItem("currencyFrom", "USD")
    };

    if(typeof(currencyTo) === "object" && !currencyTo){
        localStorage.setItem("currencyTo", "BRL")
    };
    let expensesLocalStorage = localStorage.getItem("expenses");

    const expenses = JSON.parse(expensesLocalStorage);
    if(typeof(expenses) === "object" && !expenses){
        return;
    }

    const totalOriginal = expenses.reduce((acc, exp) => acc + (exp.value * exp.quantity), 0);
    const totalConverted = expenses.reduce((acc, exp) => acc + exp.convertedValue, 0);
  
    document.getElementById('total-original').textContent = `Total ${currencyFrom}: ${totalOriginal.toFixed(2)}`;
    document.getElementById('total-converted').textContent = `Total ${currencyTo    }: ${totalConverted.toFixed(2)}`;
  }

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems,   
 {});
});