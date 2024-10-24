# THE GROCER

## Description
The Grocer app streamlines your shopping experience by allowing you to easily create, manage, and share your grocery lists. With features like categorization of items, and budget tracking it helps ensure you never forget an essential ingredient. Whether you’re shopping solo or with family, a grocery list app simplifies the process and enhances your efficiency.

The Grocer is a single page web application that allows the user to customize their grocery needs for their families. The user has the ability to add a new item to be bought, edit the item, remove an item, and strikethrough an item if the item is already in their cart while currently shopping. The user also has the capabillity to write down some notes attached to a specific grocery item they have entered.

## Technologies Used
JavaScript, HTML and CSS were used for development of this application. HTML served as the backbone to the webpage, CSS allowed it to have a more user-friendly look and appeal, and JavaScript gave the webpage functionality and interactivity, and additonally allowed the information entered to be stored on a JSON file to allow for persistent changes.

## Challenges and Future
The developers have faced several challenges that complicated the process of building this effective single page website. Putting education into practice can be a significant struggle for many, as it often involves bridging the gap between knowledge and real-world application. The developers found it challenging to translate classroom concepts into practical skills, leading to feelings of uncertainty and frustration. Overcoming this hurdle required a supportive learning environment, a lot of trial and error, and multiple opportunities for hands-on experiences that reinforce classroom teachings.

## How to Install and use the project
### 1. Starting the server 
    All of our grocery list object datas are stored in the `db.json` file. You can access this using a JSON server by running `json-server --watch db.json` in your terminal to start the server and keep it running.
    Link `http://localhost:3000/categoryName` for specific category names, and `http://localhost:3000/groceries` for access to the grocery item object.
    To access a specific grocery item, attach an "id" into the url ex: `http://localhost:3000/groceries/1` 
    Open another tab in your terminal and open `index.html` to view the page in your browser. 
### 2. Adding a new grocery item
    If you click on the "Add new item" it will expose a form for the user to fill out everytime the user wants to add a new grocery item in her list, once you click the "Submit" button the form or by pressing "enter" will automatically close for you. The new item will be listed under the specific category it falls.
### 3. Editing a current grocery item
    The user will click on the "Edit" button aligned on the specific grocery item that the user wants to edit. An "edit form" will pop out, and is currently pre-populated with the information stored on the specific item. The user then can edit any section or all of them. The user will click the "Submit Changes" or press "enter" button once she is happy with her editing. 
### 4. Deleting a current grocery item
    The user can remove or delete a specific item that they wish to by clicking on the "Delete" button aligned to the specific gocery item the user wants to delete. 
### 5. Strikethrough an item
    The user can strike item names by clicking on them, allowing them to strike items that have already been added to the cart.
### 6. Estimated total cost
    The Grocer shows the user a "Total Estimated Cost" on the bottom right of the web application. The total is computed using the the price and amount of units that each item has.

## The Developers
1. Janine Pamintuan
2. Tristan Tritch
3. Robert Ayling