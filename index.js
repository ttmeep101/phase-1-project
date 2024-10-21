const baseURL = "http://localhost:3000"
const select = document.getElementById('categoryForm');
const editSelect = document.getElementById('categoryEdit')
const addItemBtn = document.getElementById("addItemBtn");
const newItemContainer = document.getElementById("add-grocery")
const editItemContainer = document.getElementById('edit-grocery')
let addItemToggle = false

function openForm(){
    addItemBtn.addEventListener("click", () => {
        document.getElementById('add-grocery').reset()
        if(editItemContainer.style.display ='none' === true){
            addItemToggle = false
        }
        if (!addItemToggle) {
            editItemContainer.style.display ='none'
            newItemContainer.style.display = "flex";
            addItemBtn.innerText = 'Close Form';
        } else {
            newItemContainer.style.display = "none";
            addItemBtn.innerText = 'Add new item';
        }
        addItemToggle = !addItemToggle
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
                editSelect.append(option)
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
        headers: {"Content-Type": "appllication/json"}
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

const logEdit = function(e, grocery){
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
        headers: {'Content-Type': "application/json"},
        body: JSON.stringify(newObj)
    }).then((res) => res.json())
    .then((data) => console.log(data))
    console.log('edit logged')
}

function editItem(grocery) {
    addItem = true
    newItemContainer.style.display = "none";
    editItemContainer.style.display = 'flex'
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
    const form = document.getElementById('edit-grocery')
    form.addEventListener('submit', (e) => logEdit(e, grocery))
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
    editBtn.textContent = 'Edit'
    editBtn.addEventListener('click', (e) => editItem(grocery))
    newItemLi.append(nameSpan, unitSpan, notesSpan, priceSpan, editBtn);
    ul.append(newItemLi);
    deleteGroceryItem(grocery, newItemLi);
}

const main = () => {
    openForm();
    dropdownLoader();
    renderItems();
}

document.addEventListener('DOMContentLoaded', main())