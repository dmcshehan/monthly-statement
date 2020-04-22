var mainApp = {};
var backendAPI = 'https://monthlystatement.herokuapp.com';
//var backendAPI = 'http://localhost:5000';


(function setOnAuth() {
    var firebase = app_firebase;

    mainApp.uid = null;
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            mainApp.uid = user.uid;
            getEntries();
        } else {
            mainApp.uid = null;
            window.location.replace('login.html');
        }
    });

    function logout() {
        firebase.auth().signOut();
    }

    mainApp.logout = logout;
})();


var costForm = document.querySelector('.header-cost-form');
var reasonEl = document.querySelector('.header-cost-form__reason');
var amountEl = document.querySelector('.header-cost-form__amount');
var typeEl = document.querySelector('.header-cost-form__type');
var dateEl = document.querySelector('.header-cost-form__date');
var currencyEl = document.querySelector('.header-cost-form__currency');
var logoutBtn = document.querySelector('.header-nav__logout');


const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

setCurrentDate();
setCurrentMonth();
setMonthToogleActions();

logoutBtn.addEventListener('click', mainApp.logout);

costForm.addEventListener('submit', function handleFormSubmit(e) {
    e.preventDefault();

    var reason = reasonEl.value;
    var amount = amountEl.value;
    var type = typeEl.value;
    var date = dateEl.value;
    var currency = currencyEl.value;

    var newEntry = new createEntry(reason, amount, type, date, currency, mainApp.uid);
    addEntry(newEntry);
})

function createEntry(reason, amount, type, date, currency, uid) {
    this.reason = reason;
    this.amount = amount;
    this.uid = uid;
    this.currency = currency;
    this.type = type;
    this.date = new Date(date);
}

function addEntry(newEntry) {
    fetch(backendAPI, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + mainApp.uid,
        },
        body: JSON.stringify(newEntry)
    })
        .then((response) => response.json())
        .then((data) => {
            if (localStorage.getItem('month')) {
                getEntriesPerMonth(localStorage.getItem('month'));
            } else {
                getEntries();
            }

            crearForm();
        })
        .catch((error) => {
            console.error('Error:', error);
        })
}

function getEntries() {

    return fetch(backendAPI, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + mainApp.uid,
        }
    })
        .then((response) => response.json())
        .then((entries) => {
            updateUI(entries);
            addActions();
            bindDeleteAction();
        })
        .catch((error) => {
            console.error('Error:', error);
        })
}

function getEntriesPerMonth(date) {

    return fetch(`${backendAPI}/month/${date}`, {
        headers: {
            'Authorization': 'Bearer ' + mainApp.uid,
        }
    })
        .then((response) => response.json())
        .then((entries) => {
            updateUI(entries);
            addActions();
            bindDeleteAction();
        })
        .catch((error) => {
            console.error('Error:', error);
        })
}

function deleteEntry(entryId) {
    fetch(`${backendAPI}/${entryId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + mainApp.uid,
        }
    })
        .then((response) => response.json())
        .then((data) => {
            if (localStorage.getItem('month')) {
                getEntriesPerMonth(localStorage.getItem('month'));
            } else {
                getEntries();
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        })
}

function updateUI(entries) {

    var expenseTableTrs = [];
    var incomeTableTrs = [];
    var allExpenses = [];
    var allIncomes = [];

    if (entries.length > 0) {
        allExpenses = entries.filter(function getAllExpenses(entry) {
            return entry.type == 'expense';
        });

        allIncomes = entries.filter(function getAllExpenses(entry) {
            return entry.type == 'income';
        });

        if (allExpenses.length > 0) {
            var expenseTableTrs = allExpenses.map(function createExpTable(entry) {
                return createTr(entry);
            });
        }

        if (allIncomes.length > 0) {
            var incomeTableTrs = allIncomes.map(function createExpTable(entry) {
                return createTr(entry);
            });
        }
    }

    var expenseTbody = document.querySelector('.month-row__col--expenses tbody');
    expenseTbody.innerHTML = "";

    var incomeTbody = document.querySelector('.month-row__col--incomes tbody');
    incomeTbody.innerHTML = "";

    appedToTable(expenseTableTrs, expenseTbody);
    appedToTable(incomeTableTrs, incomeTbody);

    var expenseSummary = document.querySelector('.summary__all--expenses');
    expenseSummary.textContent = calculateTotal(allExpenses);
    var incomeSummary = document.querySelector('.summary__all--incomes');
    incomeSummary.textContent = calculateTotal(allIncomes);
}

function crearForm() {
    reasonEl.value = "";
    amountEl.value = "";
    typeEl.value = 'expense';
    setCurrentDate();
}

function appedToTable(entryNodeArr, parentNode) {
    if (entryNodeArr.length > 0) {
        entryNodeArr.forEach(function appendEnryNode(entryNode) {
            parentNode.appendChild(entryNode);
        });
    } else {
        parentNode.textContent = 'No Records';
    }
}


function createTr(entry) {
    var entryDate = new Date(entry.date);

    var dateTd = document.createElement("td");
    var actions = document.createElement('span');
    actions.setAttribute('class', 'month-row__actions');
    actions.classList.add('month-row__actions--animate');


    var del = document.createElement('button');
    del.setAttribute('class', 'month-row__delete')
    del.textContent = 'x';

    actions.appendChild(del);


    dateTd.setAttribute('class', 'month-row__td month-row__td--date')
    var date = document.createElement('span');
    date.setAttribute('class', 'month-row__date')
    date.textContent = `${entryDate.getDate()} - ${monthNames[entryDate.getMonth()]} - ${entryDate.getFullYear()}`;

    dateTd.appendChild(date);
    dateTd.prepend(actions);

    var reasonTd = document.createElement("td");
    reasonTd.setAttribute('class', 'month-row__td month-row__td--reason')
    reasonTd.textContent = entry.reason;

    var amountTd = document.createElement("td");
    amountTd.setAttribute('class', 'month-row__td month-row__td--amount')
    amountTd.textContent = entry.amount;

    var actionTd = document.createElement("td");
    actionTd.setAttribute('class', 'month-row__td month-row__td--actions')

    var tr = document.createElement('tr');
    tr.setAttribute("id", entry._id);
    tr.setAttribute("class", 'month-row__tr');
    tr.appendChild(dateTd);
    tr.appendChild(reasonTd);
    tr.appendChild(amountTd);

    return tr;
}

function calculateTotal(entryArr) {
    if (entryArr.length > 0) {
        return entryArr.reduce(function getTotal(acc, entry) {
            return acc + entry.amount
        }, 0)
    } else {
        return 0;
    }
}

function addActions() {
    var trs = document.querySelectorAll('tbody tr');

    trs.forEach(function bindListners(tr) {
        tr.addEventListener('mouseover', function appeaarActions() {
            this.firstChild.lastChild.classList.add('month-row__date--animate');
            this.firstChild.firstChild.classList.add('month-row__actions--show');
        })
        tr.addEventListener('mouseout', function appeaarActions() {
            this.firstChild.lastChild.classList.remove('month-row__date--animate');
            this.firstChild.firstChild.classList.remove('month-row__actions--show');
        })
    })
}

function bindDeleteAction() {
    var deleteButtons = document.querySelectorAll('.month-row__delete');
    deleteButtons.forEach(function bindDelete(button) {
        button.addEventListener('click', function deteleEntry() {
            var entryId = this.parentNode.parentNode.parentNode.getAttribute('id');

            var entryReason = this.parentNode.parentNode.nextSibling.textContent;

            if (confirm(`Are you sure you want to delete "${entryReason}" ?`)) {
                deleteEntry(entryId);
            }
            return;
        })
    })
}


function setCurrentDate() {
    var now = new Date();
    var month = (now.getMonth() + 1);
    var day = now.getDate();
    if (month < 10)
        month = "0" + month;
    if (day < 10)
        day = "0" + day;
    var today = now.getFullYear() + '-' + month + '-' + day;
    document.querySelector('.header-cost-form__date').value = today;
}

function setCurrentMonth() {
    var now = new Date();
    var thisMonth = (now.getMonth() + 1);
    if (thisMonth < 10) {
        thisMonth = "0" + thisMonth;
    }
    var thisYear = now.getFullYear();
    var yearAndMonth = `${thisYear}-${thisMonth}`;
    document.querySelector('.header-month-toogle__select').value = yearAndMonth;
}


function setMonthToogleActions() {
    var monthToggle = document.querySelector('.header-month-toogle__select');
    monthToggle.addEventListener('change', function getEntriesBasedOnMonth(e) {
        getEntriesPerMonth(e.target.value);
        localStorage.setItem('month', JSON.stringify(e.target.value));
    })
}
