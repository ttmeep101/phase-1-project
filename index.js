const baseURL = "http://localhost:3000"
const select = document.getElementById('categoryForm');
const editSelect = document.getElementById('categoryEdit')
const addItemBtn = document.getElementById("addItemBtn");
const newItemContainer = document.getElementById("add-grocery")
const editItemContainer = document.getElementById('edit-grocery')
let shouldOpenAddItemForm = true;

function openForm(){
    addItemBtn.addEventListener("click", () => {
        document.getElementById('add-grocery').reset()
        if (addItemBtn.innerText === 'Close Form') {
            editItemContainer.style.display = 'none';
            newItemContainer.style.display = 'none';
            addItemBtn.innerText = 'Add new item';
            shouldOpenAddItemForm = true;
        } else if (shouldOpenAddItemForm) {
            editItemContainer.style.display = 'none';
            newItemContainer.style.display = 'flex';
            addItemBtn.innerText = 'Close Form';
        } else {
            editItemContainer.style.display = 'flex';
            newItemContainer.style.display = 'none';
            addItemBtn.innerText = 'Close Form';
        }
        addSubmitBtn();
    })
}

const dropdownLoader = () => {
    fetch(`${baseURL}/categoryName`)
        .then((resp) => resp.json())
        .then((data) => {
            data.forEach((category) => {
                const option = document.createElement('option');
                option.innerText = category.name;
                option.value = category.name;
                select.append(option);
                const editOption = document.createElement('option');
                editOption.innerText = category.name;
                editOption.value = category.name;
                editSelect.append(editOption);
            });
        })
        .catch();
};

//creates and posts an object to the json file when the form is submitted
const logSubmit =  function(e) {
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
        headers: {"Content-Type": "application/json", "Accept": "application/json"}
    })
    .then((resp) => resp.json())
    .then((groceries) => createNewItem(groceries))
    e.target.reset()
}

//creates the listener for the submit button
function addSubmitBtn() {
    const form = document.getElementById('add-grocery')
    form.addEventListener('submit', logSubmit)
}

const logEdit = function(e, grocery, itemLi){
    e.preventDefault()
    const newObj = {
        name: e.target.name.value,
        category: e.target.category.value,
        unit: e.target.unit.value,
        price: e.target.price.value,
        notes: e.target.notes.value
    }
    fetch(`${baseURL}/groceries/${grocery.id}`, {
        method: 'PUT',
        headers: {'Content-Type': "application/json", "Accept": "application/json"},
        body: JSON.stringify(newObj)
    }).then((res) => res.json())
    .then((data) => {
        itemLi.remove()
        createNewItem(data)
        editItemContainer.style.display = 'none'
        addItemBtn.innerText = 'Add new item'
        shouldOpenAddItemForm = true
    })
}

function editItem(grocery, itemLi) {
    addItem = true
    newItemContainer.style.display = "none";
    editItemContainer.style.display = 'flex';
    addItemBtn.innerText = 'Close Form';
    // Don't show the add item grocery form, instead show the edit one
    shouldOpenAddItemForm = false;
    document.getElementById('editSubmitBtn').innerText = 'Submit Changes'
    const name = document.getElementById('nameEdit')
    const category = document.getElementById('categoryEdit')
    const unit = document.getElementById('unitEdit')
    const price = document.getElementById('priceEdit')
    const notes = document.getElementById('notesEdit')
    name.value = `${grocery.name}`
    category.value = `${grocery.category}`
    unit.value =`${grocery.unit}`
    price.value = `${grocery.price}`
    notes.value = `${grocery.notes}`
    const id = grocery.id
    const form = document.getElementById('edit-grocery');
    // Had to add once: true here because each time editItem was called it was adding
    // the submit listener again and running multiple times
    // once: true tells it to only run once
    form.addEventListener('submit', (e) => logEdit(e, grocery, itemLi), {once:true});
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

function editItemBtn(grocery, newItemLi) {
    const editBtn = document.createElement('button')
    editBtn.textContent = 'Edit'
    editBtn.className = 'editBtn';
    editBtn.addEventListener('click', (e) => editItem(grocery, newItemLi))
    newItemLi.append(editBtn)
}
function createNewItem(grocery) {
    const categoryIdFinder = grocery.category.replaceAll(' ', '-');
    const ul = document.getElementById(categoryIdFinder);
    const newItemLi = document.createElement("li");
    newItemLi.className = "listItem";
    const nameSpan = document.createElement("span");
    nameSpan.className = 'nameSpan';
    nameSpan.id = 'nameId'
    nameSpan.textContent = `${grocery.name}`;
    const notesSpan = document.createElement("span");
    notesSpan.className = 'notesSpan';
    notesSpan.textContent = `${grocery.notes}`;
    const unitSpan = document.createElement("span");
    unitSpan.className = 'unitSpan';
    unitSpan.textContent = `${grocery.unit}`;
    const priceSpan = document.createElement("span");
    priceSpan.textContent = `${grocery.price}`;
    priceSpan.className = 'priceSpan';
    newItemLi.append(nameSpan, unitSpan, notesSpan, priceSpan);
    ul.append(newItemLi);
    editItemBtn(grocery, newItemLi)
    deleteGroceryItem(grocery, newItemLi);
}

const main = () => {
    openForm();
    dropdownLoader();
    renderItems();
}

document.addEventListener('DOMContentLoaded', main())