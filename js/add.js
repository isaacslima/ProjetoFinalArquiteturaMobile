
document.getElementById('expense-form').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    let expenses = JSON.parse(localStorage.getItem("expenses"));
    const description = document.getElementById('description').value;
    const quantity = parseFloat(document.getElementById('quantity').value);
    const value = parseFloat(document.getElementById('value').value);
    
    const currencyFrom = localStorage.getItem("currencyFrom");
    const currencyTo = localStorage.getItem("currencyTo");
  
    const convertedValue = await convertCurrency(value, currencyFrom, currencyTo);
    const totalConverted = (convertedValue * quantity).toFixed(2);
  
    const id = generateGuid();
    const expense = { 
      id,
      description, 
      quantity,value, 
      currencyFrom,  
      convertedValue: 
      parseFloat(totalConverted), currencyTo 
    };
    if(!expenses){
      expenses = [];
    }

    expenses.push(expense);
    localStorage.setItem("expenses", JSON.stringify(expenses));
    e.target.reset();

    let message = description + " adicionado a lista de despesas."

    M.toast({html: message})
  });

  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems,   
 {});
});

function fillCurrencyConfig()
{
    document.getElementById('currencyFrom').innerHTML  = localStorage.getItem("currencyFrom");
    document.getElementById('currencyTo').innerHTML  = localStorage.getItem("currencyTo");
}
fillCurrencyConfig();

function checkConfigIsSetted(){
    var currencyTo = localStorage.getItem("currencyTo");
    if(!currencyTo){
        M.toast({html: "necessário preencher configurações"});
    }
}

checkConfigIsSetted();

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems,   
 {});
});