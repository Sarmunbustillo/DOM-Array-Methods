const main = document.querySelector('.main');
const addUserBtn = document.querySelector('.add-user');
const doubleBtn = document.querySelector('.double');
const showMillionairesBtn = document.querySelector('.show-millionaires');
const sortBtn = document.querySelector('.sort');
const calculateWealthBtn = document.querySelector('.calculate-wealth');

let data = [];

getRandomUser();

// fetch random user and add money
async function getRandomUser() {
  const res = await fetch('https://randomuser.me/api');
  const data = await res.json();

  const user = data.results[0];
  const { first, last } = user.name;
  const newUser = {
    name: `${first} ${last}`,
    money: Math.floor(Math.random() * 1000000),
  };

  addData(newUser);
}

// Double everyones money
function doubleMoney() {
  data = data.map((user) => {
    return { ...user, money: user.money * 2 };
  });

  updateDOM();
}

// Sort users by richest
function sortByRichest() {
  data.sort((a, b) => b.money - a.money);

  updateDOM();
}

// calculate total wealth
function calculateWealth() {
  checkIfRendered('total');
  const wealth = data.reduce((acc, user) => (acc += user.money), 0);

  const wealthEl = document.createElement('div');
  wealthEl.innerHTML = `<h2 class="total">Total Wealth: <strong>${formatMoney(
    wealth
  )}</strong></h2>`;

  main.appendChild(wealthEl);
}

// Filter only millionares
function showMillionares() {
  data = data.filter((user) => user.money > 1000000);

  updateDOM();
}

// Add new obj to do arr
function addData(obj) {
  data.push(obj);

  updateDOM();
}

//update DOM
function updateDOM(providedData = data) {
  // clear man div
  main.innerHTML = ' <h2><strong>Person</strong> Wealth</h2>';

  providedData.forEach((item, i) => {
    const element = document.createElement(`div`);
    element.classList.add('person');
    //fadeIn(element);

    element.innerHTML = `<strong>${item.name}</strong> <span>${formatMoney(item.money)}</span>`;
    main.appendChild(element);
  });
}

// format money
function formatMoney(number) {
  return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}
//util funct

//check if rendered
function checkIfRendered(selector) {
  const el = document.querySelector(`.${selector}`);
  if (!el) return;

  updateDOM();
}

// event listeners
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionairesBtn.addEventListener('click', showMillionares);
calculateWealthBtn.addEventListener('click', calculateWealth);
