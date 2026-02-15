const convertButton = document.querySelector(".convert");
const fromSelect = document.querySelector(".from-currency");
const toSelect = document.querySelector(".to-currency");
const input = document.querySelector(".digite-o-valor");

const valueFrom = document.querySelector(".p-01");
const valueTo = document.querySelector(".p-02");

const fromImage = document.querySelector(".from-image");
const toImage = document.querySelector(".to-image");

let rates = {};

const currencyInfo = {
  BRL: {
    name: "Real",
    image: "./assets/img-real-brasil.png",
  },
  USD: {
    name: "Dólar",
    image: "./assets/img-dolar-usa.png",
  },
  EUR: {
    name: "Euro",
    image: "./assets/img-euro.png",
  },
  GBP: {
    name: "Libra",
    image: "./assets/libra 1.png",
  },
  BTC: {
    name: "Bitcoin",
    image: "./assets/bitcoin 1.png",
  },
};

async function getRates() {
  const response = await fetch(
    "https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL,GBP-BRL,BTC-BRL",
  );

  const data = await response.json();

  rates = {
    BRL: 1,
    USD: Number(data.USDBRL.ask),
    EUR: Number(data.EURBRL.ask),
    GBP: Number(data.GBPBRL.ask),
    BTC: Number(data.BTCBRL.ask),
  };
}

function updateImages() {
  fromImage.src = currencyInfo[fromSelect.value].image;
  toImage.src = currencyInfo[toSelect.value].image;
}

async function convertValues() {
  if (Object.keys(rates).length === 0) {
    await getRates();
  }

  const inputValue = Number(input.value);
  if (isNaN(inputValue) || input.value === "") return;

  const fromCurrency = fromSelect.value;
  const toCurrency = toSelect.value;

  const rateFrom = rates[fromCurrency];
  const rateTo = rates[toCurrency];

  const valueInBRL = inputValue * rateFrom;
  const finalValue = valueInBRL / rateTo;

  valueFrom.innerHTML = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: fromCurrency,
  }).format(inputValue);

  valueTo.innerHTML = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: toCurrency,
  }).format(finalValue);
}

fromSelect.addEventListener("change", updateImages);
toSelect.addEventListener("change", updateImages);

convertButton.addEventListener("click", convertValues);

getRates();
updateImages();
