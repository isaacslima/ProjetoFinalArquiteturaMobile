
document.getElementById('expense-form').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const description = document.getElementById('description').value;
    const quantity = parseFloat(document.getElementById('quantity').value);
    const value = parseFloat(document.getElementById('value').value);
    const currencyFrom = document.getElementById('currencyFrom').value;
    const currencyTo = document.getElementById('currencyTo').value;

    localStorage.setItem("quatidade", quantity);
  
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

    let expensesLocalStorage = localStorage.getItem("expenses");

    if(typeof expensesLocalStorage === "object" && expensesLocalStorage){
      expenses = JSON.parse(expensesLocalStorage);
    }
    console.log(expensesLocalStorage)
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