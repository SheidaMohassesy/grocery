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
let editId = "";

// ****** FUNCTIONS **********
const addItem = (e) => {

  e.preventDefault();
  const value = grocery.value;
  const id = new Date().getTime().toString();
  if (value && !editFlag) {
    const element = document.createElement("article");
    // add class
    element.classList.add("grocery-item");
    // add id
    const attr = document.createAttribute("data-id");
    attr.value = id;
    element.setAttributeNode(attr);

    // element.setAttribute("data-id", id);

    // element.attributes["data-id"] = id;

    element.innerHTML = `<p class="title">${value}</p>
    <div class="btn-container">
      <button type="button" class="edit-btn">
        <i class="fas fa-edit"></i>
      </button>
      <button type="button" class="delete-btn">
        <i class="fas fa-trash"></i>
      </button>
    </div>`;
    const deleteButton = element.querySelector(".delete-btn");
    const editButton = element.querySelector(".edit-btn");

    deleteButton.addEventListener("click", deleteItem);
    editButton.addEventListener("click", editItem);

    // append child
    list.appendChild(element);
    //display alert
    displayAlert("item added to the list", "success");
    // show container
    container.classList.add("show-container");
    // add to local storage
    addToLocalStorage(id, value);
    // set back to default
    setBackToDefault()
  }
  else if (value && editFlag) {
    editElement.innerHTML = value;
    displayAlert("value changed", "success");
    // edit the local storage
    editLocalSotrage(editId, value);
    setBackToDefault();
  }
  else {
    displayAlert("please enter value", "danger");
  }
};


// display alert
const displayAlert = (text, action) => {
  alertElement.textContent = text;
  alertElement.classList.add(`alert-${action}`);
  // remove alert
  setTimeout(() => {
    alertElement.textContent = "";
    alertElement.classList.remove(`alert-${action}`);
  }, 1000);
};
// clear items
const clearItems = () => {
  const items = document.querySelectorAll(".grocery-item");
  if (items.length > 0) {
    items.forEach((item) => {
      list.removeChild(item);
    });
  }
  container.classList.remove("show-container");
  displayAlert("empty list", "danger");
  setBackToDefault();
  // localStorage.removeItem("list");
};
// delete item
const deleteItem = (e) => {
  const element = e.currentTarget.parentElement.parentElement;
  const id = element.dataset.id;
  list.removeChild(element);
  if (list.children.length === 0) {
    container.classList.remove("show-container");
    displayAlert("item removed", "danger");
    setBackToDefault();
  }
  // remove from local storage
  // removeFromLocalStorage(id);
};
// edit item
const editItem = (e) => {
  const element = e.currentTarget.parentElement.parentElement;
  // set edit item
  editElement = e.currentTarget.parentElement.previousElementSibling;
  // set form value
  grocery.value = editElement.innerHTML;
  editFlag = true;
  editId = element.dataset.id;
  submitButton.innerText = "edit";
};
// set back to default
const setBackToDefault = () => {
  grocery.value = "";
  editFlag = false;
  editId = "";
  submitButton.innerText = "submit";
};
// ****** LOCAL STORAGE **********
const addToLocalStorage = (id, value) => {
  const grocery = {id,value};
  let items = localStorage.getItem("list")?JSON.parse(localStorage.getItem("list")):[];
  items.push(grocery);
  localStorage.setItem("list",JSON.stringify(items));
  // console.log("added to local storage");
};
const removeFromLocalStorage = (id) => {
};
const editLocalSotrage = (id, value) => {

};

// localStorage API
// setItem
// getItem
// removeItem
// save as strings
// localStorage.setItem("orange",JSON.stringify(["item", "item2"]));
// const oranges = JSON.parse(localStorage.getItem("orange"));
// console.log(oranges);
// ****** SETUP ITEMS **********

// ****** EVENT LISTENERS **********
// submit form
form.addEventListener("submit", addItem);
// clear items
clearButton.addEventListener("click", clearItems);
