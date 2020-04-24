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

var notificationWrapper = document.querySelector('.notification');


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
            mainApp.entries = entries;
            updateUI(entries);
            bindDeleteAction();
            bindEditAction();
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
            mainApp.entries = entries;
            updateUI(entries);
            bindDeleteAction();
            bindEditAction();
        })
        .catch((error) => {
            console.error('Error:', error);
        })
}

function updateEntry(data) {

    console.log('data', JSON.stringify(data));

    return fetch(`${backendAPI}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + mainApp.uid,
        },
        body: JSON.stringify(data)
    })
        .then((response) => response.json())
        .then((response) => {
            showNotification(response.message);

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

    var expenseSummary = document.querySelector('.month-row__total--allExpenses');
    expenseSummary.textContent = calculateTotal(allExpenses);
    var incomeSummary = document.querySelector('.month-row__total--allIncomes');
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
    var formattedDate = `${(entryDate.getMonth() + 1) < 10 ? "0" + (entryDate.getMonth() + 1) : entryDate.getMonth() + 1}-${entryDate.getDate() < 10 ? "0" + entryDate.getDate() : entryDate.getDate()}-${entryDate.getFullYear()}`;

    var tr = document.createElement('tr');
    tr.setAttribute("id", entry._id);
    tr.setAttribute("class", 'month-row__tr');

    var trText = `<td class="month-row__td month-row__td--date">${formattedDate}</td>
    <td class="month-row__td month-row__td--reason">${entry.reason}</td>
    <td class="month-row__td month-row__td--amount">${entry.amount}</td>
    <td class="month-row__td month-row__td--actions">
        <button class="month-row__edit button">Edit</button>
        <button class="month-row__delete button">Delete</button>
    </td>`;

    tr.innerHTML = trText;

    return tr;
}

function calculateTotal(entryArr) {
    if (entryArr.length > 0) {
        var full = entryArr.reduce(function getTotal(acc, entry) {
            return acc + entry.amount
        }, 0)
        return numberWithCommas(full);
    } else {
        return 0;
    }
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


function bindDeleteAction() {
    var deleteButtons = document.querySelectorAll('.month-row__delete');
    deleteButtons.forEach(function bindDelete(button) {
        button.addEventListener('click', function deteleEntry() {
            var entryId = this.parentNode.parentNode.getAttribute('id');

            var entryReason = this.parentElement.parentElement.children[1].textContent;

            if (confirm(`Are you sure you want to delete "${entryReason}" ?`)) {
                deleteEntry(entryId);
            }
            return;
        })
    })
}

function bindEditAction() {
    mainApp.changedEntry = {};
    var editButtons = document.querySelectorAll('.month-row__edit');
    editButtons.forEach(function bindEdit(button) {
        button.addEventListener('click', function editEntry() {


            document.querySelectorAll('tbody td button').forEach(function disableAllButtons(btn) {
                btn.setAttribute('disabled', true);
            })


            var entryId = this.parentNode.parentNode.getAttribute('id');
            var entry = mainApp.entries.find(function findEntry(entry) {
                return entry._id == entryId;
            })

            var inputDate = `${new Date(entry.date).getFullYear()}-${(new Date(entry.date).getMonth() + 1 < 10 ? "0" + (new Date(entry.date).getMonth() + 1) : new Date(entry.date).getMonth() + 1)}-${new Date(entry.date).getDate() < 10 ? "0" + new Date(entry.date).getDate() : new Date(entry.date).getDate()}`;

            var selectedTr = this.parentElement.parentElement;
            var children = selectedTr.children;


            for (let i = 0; i < children.length; i++) {
                children[i].style.display = 'none'
            }


            var newTdDate = document.createElement('td');
            var newDateInput = document.createElement('input');
            newDateInput.setAttribute('class', 'input');
            newDateInput.addEventListener('change', function checkChanges(e) {

                if (new Date(e.target.value).getTime() == new Date(entry.date).getTime()) {

                    delete mainApp.changedEntry.date;
                    return toogleDisableInSaveBtn(false);
                }
                mainApp.changedEntry.date = new Date(e.target.value);
                toogleDisableInSaveBtn(true);

            })
            newDateInput.type = 'date';
            newDateInput.value = inputDate;
            newTdDate.appendChild(newDateInput);

            var newTdReason = document.createElement('td');
            var newReasonInput = document.createElement('input');
            newReasonInput.setAttribute('class', 'input');

            newReasonInput.addEventListener('input', function (e) {
                if (e.target.value.trim() == entry.reason) {

                    delete mainApp.changedEntry.reason;
                    return toogleDisableInSaveBtn(false);
                }

                mainApp.changedEntry.reason = e.target.value.trim()
                toogleDisableInSaveBtn(true);

            })

            newReasonInput.type = 'text';
            newReasonInput.value = entry.reason;
            newTdReason.appendChild(newReasonInput);

            var newTdAmount = document.createElement('td');
            var newAmountInput = document.createElement('input');
            newAmountInput.setAttribute('class', 'input');

            newAmountInput.addEventListener('input', function checkAmountChanges(e) {
                if (Number(e.target.value) == Number(entry.amount)) {
                    delete mainApp.changedEntry.amount;
                    return toogleDisableInSaveBtn(false);
                }

                mainApp.changedEntry.amount = Number(e.target.value);
                toogleDisableInSaveBtn(true);
            });

            newAmountInput.type = 'number';
            newAmountInput.value = entry.amount;
            newTdAmount.appendChild(newAmountInput);

            var newTdActions = document.createElement('td');
            var saveBtn = document.createElement('button');
            saveBtn.classList.add('button');
            saveBtn.classList.add('month-row__save');
            saveBtn.setAttribute('disabled', true);
            saveBtn.textContent = 'Save';
            saveBtn.addEventListener('click', function cancelSaveEntry() {
                var updatedEntry = mainApp.changedEntry;
                updatedEntry._id = entry._id;
                updateEntry(updatedEntry);
            })

            function toogleDisableInSaveBtn(disable, btn = saveBtn) {
                if (disable) {
                    return btn.removeAttribute('disabled');
                }
                return btn.setAttribute('disabled', true);
            }


            var cancelBtn = document.createElement('button');
            cancelBtn.classList.add('button');
            cancelBtn.classList.add('month-row__cancel');
            cancelBtn.textContent = 'Cancel';
            cancelBtn.addEventListener('click', function cancelSaveEntry() {
                document.querySelectorAll('tbody td button').forEach(function disableAllButtons(btn) {
                    btn.removeAttribute('disabled');
                })


                for (let i = 0; i < children.length; i++) {
                    if (children[i].style.display == 'none') {
                        if (children[i].classList.contains('month-row__td--actions')) {
                            children[i].style.display = 'flex'
                        } else {
                            children[i].style.display = 'table-cell'
                        }

                    } else {
                        children[i].style.display = 'none'
                    }
                }
            })

            newTdActions.appendChild(saveBtn);
            newTdActions.appendChild(cancelBtn);

            selectedTr.prepend(newTdActions);
            selectedTr.prepend(newTdAmount);
            selectedTr.prepend(newTdReason);
            selectedTr.prepend(newTdDate);

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
    var monthToggle = document.querySelector('.header-month-toogle__select');

    monthToggle.value = yearAndMonth;
}


function setMonthToogleActions() {
    var monthToggle = document.querySelector('.header-month-toogle__select');
    monthToggle.addEventListener('change', function getEntriesBasedOnMonth(e) {
        getEntriesPerMonth(e.target.value);
        localStorage.setItem('month', JSON.stringify(e.target.value));
    })
}


function hideNotification() {
    this.parentElement.parentElement.style.display = 'none';
}

function showNotification(message, error) {

    var notoficationHTML = `
        <div class="notification__text-wrapper">
            <p class="notification__text">${message}</p>
        </div>
        <div class="notification__close-wrapper">
            <button class="notification__close">x</button>
        </div>
    `;

    var notificationItem = document.createElement('div');
    notificationItem.setAttribute('class', "notification__item");
    notificationItem.classList.add(error ? 'notification__item--error' : 'notification__item--success');
    notificationItem.innerHTML = notoficationHTML;

    notificationWrapper.appendChild(notificationItem);

    var allCloseBtns = document.querySelectorAll('.notification__close');
    allCloseBtns.forEach(function bindClose(closeBtn) {
        closeBtn.addEventListener('click', hideNotification);
    })

    if (!error) {
        setTimeout(function hideNotification() {
            notificationItem.style.display = 'none';
        }, 1000)
    }
}