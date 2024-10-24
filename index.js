const baseURL = "http://localhost:3000"
const select = document.getElementById('categoryForm');
const editSelect = document.getElementById('categoryEdit')
const addItemBtn = document.getElementById("addItemBtn");
const newItemContainer = document.getElementById("add-grocery")
const editItemContainer = document.getElementById('edit-grocery')
let shouldOpenAddItemForm = true;

// we are using verbatim "Meat and Seafood"
// our code is case sensitive
// we do not use and ampersand "&"

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
        notes: e.target.notes.value,
        isStriked: false
    }
    fetch(`${baseURL}/groceries`, {
        method: "POST",
        body: JSON.stringify(newObj),
        headers: {"Content-Type": "application/json", "Accept": "application/json"}
    })
    .then((resp) => resp.json())
    .then((groceries) => createNewItem(groceries))
    e.target.reset()
    newItemContainer.style.display = 'none'
    addItemBtn.innerText = 'Add new item'
    shouldOpenAddItemForm = true
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
        notes: e.target.notes.value,
        isStriked: grocery.isStriked,
    };
    fetch(`${baseURL}/groceries/${grocery.id}`, {
        method: 'PUT',
        headers: {'Content-Type': "application/json", "Accept": "application/json"},
        body: JSON.stringify(newObj)
    }).then((res) => res.json())
    .then((data) => {
        itemLi.remove()
        createNewItem(data)
        totalCost()
        editItemContainer.style.display = 'none'
        addItemBtn.innerText = 'Add new item'
        shouldOpenAddItemForm = true
    })
}

function editItem(grocery, itemLi) {
    window.scrollTo(0, 0)
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
    deleteBtn.innerText = "Delete"
    newItemLi.append(deleteBtn);
    deleteBtn.addEventListener("click", () => {
        newItemLi.remove()
        deleteItem(grocery.id)
        totalCost()
    })
}

function deleteItem(id) {
    fetch(`${baseURL}/groceries/${id}`, {
        method: "DELETE",
    })
    .then((resp) => resp.json())
    .then(() => {});
    totalCost()
}

function patchItem(grocery) {
    fetch(`${baseURL}/groceries/${grocery.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify(grocery)
    })
    .then((resp) => resp.json())
    .then(() => {});
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
    nameSpan.textContent = `${capitalizeName(grocery.name)}`;
    // added a strikethrough option
    if (grocery.isStriked) {
        nameSpan.classList.add("strikeName");
    }
    nameSpan.addEventListener("click", () => {
        nameSpan.classList.toggle("strikeName");
        grocery.isStriked = !grocery.isStriked;
        patchItem(grocery);
    });
    const notesSpan = document.createElement("span");
    notesSpan.className = 'notesSpan';
    notesSpan.textContent = `Note: ${grocery.notes}`;
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
    totalCost()
}

function totalCost(){
    const costDisplay = document.getElementById('totalCost')
    const totalCost = []
    fetch(`${baseURL}/groceries`).then((resp) => resp.json()).then((data) => {
        for(keys in data){
            let cost = parseFloat(data[keys].price.slice(1))
            let unit = parseInt(data[keys].unit)
            if(cost > 0 && unit > 0){
                totalCost.push(cost*unit)
            }
        }
        costDisplay.textContent = `Total Estimated Cost: $${totalCost.reduce((acc, curVal) => acc + curVal)}`
    })
}

function capitalizeName(name) {
    return name.charAt(0).toUpperCase() + name.slice(1)
}

const main = () => {
    openForm();
    dropdownLoader();
    renderItems();
    totalCost();
}

document.addEventListener('DOMContentLoaded', main())