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


const main = () => {
    dropdownLoader();
}
main();