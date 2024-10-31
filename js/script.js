const API_URL = 'https://api.exchangerate-api.com/v4/latest/';

let expenses = [];

if (!navigator.serviceWorker.controller) {
  navigator.serviceWorker.register("sw.js").then(function(reg) {
      console.log("Service worker has been registered for scope: " + reg.scope);
  });
}

  async function convertCurrency(value, from, to) {
    const res = await fetch(`${API_URL}${from}`);
    const data = await res.json();
    let valueConversion = data.rates[to];

    return (value * valueConversion).toFixed(2);
  }
  
  function updateExpenseList() {

    expenses = JSON.parse(localStorage.getItem("expenses"));

    const list = document.getElementById('expenses-list');
    list.innerHTML = '';
  
    expenses.forEach((expense ) => {
      const item = document.createElement('div');
      item.className = 'expense-item';
      item.innerHTML = `
          <div class="card-panel">
          <div class="row">
            <div class="col s12">
              <p id="description"><b>Descrição: </b> ${expense.description}</p> 
            </div>
            <div class="col s4">
              <p id="quantity"><b>Quantidade: </b> ${expense.quantity}</p> 
            </div>

            <div class="col s4">   
              <span id="value"><b>Valor unitário: </b> $</span>
                <span>${expense.value} </span> <span id="currencyFrom">${expense.currencyFrom}</span> 
              <p>
            <div class="col s4">  
                <b>Total em  </b>
                <span id="currencyTo">${expense.currencyTo} </span>
                <span>$ ${expense.convertedValue}</span> 
            </div>
          </div>
            <span 
              class="material-icons edit-icon" 
              onclick="editExpense(${expense.id})"
              style="cursor: pointer; margin-left: 10px; color: #007bff;">
              edit
            </span>

            <span 
              class="material-icons delete-icon" 
              onclick="deleteExpense(${expense.id})"
              style="cursor: pointer; margin-left: 10px; color: #dc3545;">
              delete
            </span>
          </div>`;
      list.appendChild(item);
    });
  }
  
  function editExpense(id) {
    let expense = getExpense(id);
    
    localStorage.setItem("description", expense.description);
    localStorage.setItem("quantity", expense.quantity);
    localStorage.setItem("value", expense.value);
    localStorage.setItem("currencyFrom", expense.currencyFrom);
    localStorage.setItem("currencyTo", expense.currencyTo);

    window.location.href = 'add.html';
  }

  function getExpense(id){
    let expenses = JSON.parse(localStorage.getItem("expenses"));
    console.log(id)
    let expense = expenses.find((item) => item.id === id);
    return expense;
  }

  function deleteExpense(id) {
    let itemTodelete = getExpense(id);
    
    const confirmation = confirm(`Tem certeza de que deseja deletar o item "${itemTodelete.description}"?`);
  
    if (confirmation) {
      expenses = JSON.parse(localStorage.getItem("expenses"));
      expenses.splice(index, 1);

      localStorage.setItem("expenses", JSON.stringify(expenses));

      M.toast({html: `O item "${deletedItem}" foi deletado.`});

      updateExpenseList();
    } else {
      M.toast({html: `A exclusão do item "${deletedItem}" foi cancelada.`});
      updateExpenseList();
    }
  }

  function generateGuid() {
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
      (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
    );
  }
  updateExpenseList();