const converter = document.querySelector(".convert");
const mySelect = document.querySelector(".currency-select");

function name() {}
convertValues = async () => {
  const myInput = document.querySelector(".digite-o-valor").value;
  const toConvert = document.querySelector(".p-01");
  const toConverted = document.querySelector(".p-02");
  const response = await fetch(
    "https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL,GBP-BRL",
  );
  const api = await response.json();

  const dolarToDay = api.USDBRL.high;
  const euroToDay = api.EURBRL.high;
  const libraToDay = api.GBPBRL.high;
  const bitcoinToDay = api.BTCBRL.high;

  if (mySelect.value == "dolar") {
    toConverted.innerHTML = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(myInput / dolarToDay);
  }

  if (mySelect.value == "euro") {
    toConverted.innerHTML = new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
    }).format(myInput / euroToDay);
  }

  if (mySelect.value == "bitcoin") {
    toConverted.innerHTML = new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "XPT",
    }).format(myInput / bitcoinToDay);
  }

  if (mySelect.value == "libra") {
    toConverted.innerHTML = new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
    }).format(myInput / libraToDay);
  }

  toConvert.innerHTML = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(myInput);
};

function changeCurrency() {
  const currencyName = document.getElementById("currency-name");
  const currencyImg = document.querySelector(".dolar-euro");

  if (mySelect.value == "dolar") {
    currencyName.innerHTML = "$ Dólar americano";
    currencyImg.src = "./assets/img-dolar-usa.png";
  }

  if (mySelect.value == "euro") {
    currencyName.innerHTML = "€ Euro";
    currencyImg.src = "./assets/img-euro.png";
  }

  if (mySelect.value == "bitcoin") {
    currencyName.innerHTML = "₿ Bitcoin";
    currencyImg.src = "./assets/bitcoin 1.png";
  }

  if (mySelect.value == "libra") {
    currencyName.innerHTML = "£ Libra";
    currencyImg.src = "./assets/libra 1.png";
  }

  if (mySelect.value == "real") {
    currencyName.innerHTML = "R$ Real";
    currencyImg.src = "./assets/img-real-brasil.png";
  }

  convertValues();
}

mySelect.addEventListener("change", changeCurrency);
converter.addEventListener("click", convertValues);
