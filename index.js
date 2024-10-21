const baseURL = "http://localhost:3000"
const select = document.getElementById('categoryForm');

const addItemBtn = document.getElementById("addItemBtn");
const newItemContainer = document.getElementById("add-grocery")
let addItem = false
addItemBtn.addEventListener("click", () => {
    addItem = !addItem;
    if (addItem) {
        newItemContainer.style.display = "flex";
        addItemBtn.innerText = 'Close Form';
    } else {
        newItemContainer.style.display = "none";
        addItemBtn.innerText = 'Open Form';
    }
})

const dropdownLoader = () => {
    fetch(`${baseURL}/categoryName`)
        .then((resp) => resp.json())
        .then((data) => {
            data.forEach((category) => {
                const option = document.createElement('option');
                option.innerText = category.name;
                option.value = category.name;
                select.append(option);
            });
        })
        .catch();
};

//creates and posts an object to the json file when the form is submitted
function logSubmit(e) {
    e.preventDefault()
    const newObj = {
        id: Math.floor(Math.random() * 1000),
        name: e.target.name.value,
        category: e.target.category.value,
        unit: e.target.unit.value,
        price: e.target.price.value,
        store: e.target.store.value,
        notes: e.target.notes.value
    }
    fetch(`${baseURL}/groceries`, {
        method: "POST",
        body: JSON.stringify(newObj),
        headers: {"Content-Type": "appllication/json"}
    })
    e.target.name.value = ''
    e.target.category.value = ''
    e.target.unit.value = ''
    e.target.price.value = '$'
    e.target.store.value = ''
    e.target.notes.value = ''
}

//creates the listener for the submit button
function addSubmitBtn() {
    const form = document.getElementById('add-grocery')
    form.addEventListener('submit', (e) => logSubmit(e))
}

const main = () => {
    dropdownLoader();
    addSubmitBtn();
}

document.addEventListener('DOMContentLoaded', main())