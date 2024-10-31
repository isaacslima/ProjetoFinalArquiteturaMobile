function updateTotals() {
    let expensesLocalStorage = localStorage.getItem("expenses");

    const expenses = JSON.parse(expensesLocalStorage);

    const totalOriginal = expenses.reduce((acc, exp) => acc + (exp.value * exp.quantity), 0);
    const totalConverted = expenses.reduce((acc, exp) => acc + exp.convertedValue, 0);
  
    document.getElementById('total-original').textContent = `Total (Moeda de Origem): ${totalOriginal.toFixed(2)}`;
    document.getElementById('total-converted').textContent = `Total (Moeda de Destino): ${totalConverted.toFixed(2)}`;
  }