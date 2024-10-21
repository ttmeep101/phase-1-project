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
        addItemBtn.innerText = 'Add new item';
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
        name: e.target.name.value,
        category: e.target.category.value,
        unit: e.target.unit.value,
        price: e.target.price.value,
        notes: e.target.notes.value
    }
    fetch(`${baseURL}/groceries`, {
        method: "POST",
        body: JSON.stringify(newObj),
        headers: {"Content-Type": "appllication/json"}
    })
    .then((resp) => resp.json())
    .then((groceries) => createNewItem(groceries))
    e.target.reset()
}

//creates the listener for the submit button
function addSubmitBtn() {
    const form = document.getElementById('add-grocery')
    form.addEventListener('submit', (e) => logSubmit(e))
}


const renderItems = () => {
    fetch(`${baseURL}/groceries`)
        .then((resp) => resp.json())
        .then((data) => {
            data.forEach((grocery) => {
                createNewItem(grocery)
            });
        })
        .catch();
}

const deleteGroceryItem = (grocery, newItemLi) => {
    const deleteBtn = document.createElement("button")
    deleteBtn.id = "delete-btn"
    deleteBtn.innerText = "Delete Item"
    newItemLi.append(deleteBtn);
    deleteBtn.addEventListener("click", () => {
        newItemLi.remove()
        deleteItem(grocery.id)
    })
}
function deleteItem(id) {
    fetch(`${baseURL}/groceries/${id}`, {
        method: "DELETE",
    })
    .then((resp) => resp.json())
}

function createNewItem(grocery) {
    const categoryIdFinder = grocery.category.replaceAll(' ', '-');
    const ul = document.getElementById(categoryIdFinder);
    const newItemLi = document.createElement("li");
    const nameSpan = document.createElement("span");
    nameSpan.className = "listItem";
    nameSpan.textContent = `${grocery.name}`;
    const notesSpan = document.createElement("span");
    notesSpan.textContent = `${grocery.notes}`;
    const unitSpan = document.createElement("span");
    unitSpan.textContent = `${grocery.unit}`;
    const priceSpan = document.createElement("span");
    priceSpan.textContent = `${grocery.price}`;
    newItemLi.append(nameSpan, unitSpan, notesSpan, priceSpan);
    ul.append(newItemLi);
    deleteGroceryItem(grocery, newItemLi);
}

const main = () => {
    dropdownLoader();
    renderItems();
    addSubmitBtn();
}

document.addEventListener('DOMContentLoaded', main())