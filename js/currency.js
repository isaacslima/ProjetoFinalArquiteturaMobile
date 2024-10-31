const API_URL = 'https://api.exchangerate-api.com/v4/latest/';

document.getElementById('currency-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const currencyFrom = document.getElementById('currencyFrom').value;
    const currencyTo = document.getElementById('currencyTo').value;

    localStorage.setItem("currencyFrom", currencyFrom);
    localStorage.setItem("currencyTo", currencyTo);

    M.toast({html: "Configurações de moedas salvas."})
  });

  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems,   
 {});
});

  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems, {});
  });