
document.getElementById('expense-form').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    let expenses = JSON.parse(localStorage.getItem("expenses"));
    const description = document.getElementById('description').value;
    const quantity = parseFloat(document.getElementById('quantity').value);
    const value = parseFloat(document.getElementById('value').value);
    
    const currencyFrom = localStorage.getItem("currencyFrom");
    const currencyTo = localStorage.getItem("currencyTo");
  
    const convertedValue = await convertCurrency(value, currencyFrom, currencyTo);
    console.log("convertedvalue", convertedValue);
    const totalConverted = (convertedValue * quantity).toFixed(2);
  
    let id = localStorage.getItem("id");
    let newItem = false;

    if(!id){
      newItem = true;
      console.log('criou novo');
      id = generateGuid();
    }
    
    const expense = { 
      id,
      description, 
      quantity,
      value, 
      currencyFrom,  
      convertedValue: parseFloat(totalConverted), 
      currencyTo 
    };

    if(!expenses){
      expenses = [];
    }

    if(newItem){
      expenses.push(expense);
    }else{
      console.log("editar")
      const index = expenses.findIndex(item => item.id === id);

      if (index !== -1) {
          expenses[index].description = description;
          expenses[index].value = value;
          expenses[index].quantity = quantity;
          expenses[index].currencyFrom = currencyFrom;
          expenses[index].convertedValue = parseFloat(totalConverted);
          expenses[index].currencyTo = currencyTo;
      }
    }
    

    localStorage.setItem("expenses", JSON.stringify(expenses));
    e.target.reset();

    let saveMessage =  newItem ? "adicionado" : "salvo" ;
    let message = description + saveMessage + " a lista de despesas."

    M.toast({html: message})
    window.location.href = "list.html";
  });

document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems, {});
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

function fillToEdit(){

  var id = localStorage.getItem("id");
  if(id)
  {
    document.getElementById('button-save').innerHTML = "salvar"
  }

  document.getElementById('description').value = localStorage.getItem("description");
  
  document.getElementById('quantity').value = localStorage.getItem("quantity");
  
  document.getElementById('value').value = localStorage.getItem("value");
}


document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems,   
 {});
});