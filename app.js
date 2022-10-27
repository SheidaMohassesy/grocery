// ****** SELECT ITEMS **********

const alertElement = document.querySelector(".alert");
const form = document.querySelector(".grocery-form");
const grocery = document.getElementById("grocery");
const submitButton = document.querySelector(".submit-btn");
const container = document.querySelector(".grocery-container");
const list = document.querySelector(".grocery-list");
const clearButton = document.querySelector(".clear-btn");
// edit option

let editElement;
let editFlag = false;
let editID = "";
// ****** EVENT LISTENERS **********
// submit form



// ****** FUNCTIONS **********
const addItem = (e) => {

    e.preventDefault();
    const value = grocery.value;
    const id = new Date().getTime().toString();
    if(value && !editFlag){
        console.log("adding item to the list");
    }
    else if(value && editFlag){
        console.log("editing");
    }
    else{
        alertElement.textContent = "empty value";
    }
};
form.addEventListener("submit", addItem);
// ****** LOCAL STORAGE **********

// ****** SETUP ITEMS **********
