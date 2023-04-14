// ****** SELECT ITEMS **********
const alert = document.querySelector(".alert");
const form = document.querySelector(".grocery-form");
const grocery = document.getElementById("grocery");
const submitBtn = document.querySelector(".submit-btn");
const container = document.querySelector(".grocery-container");
const list = document.querySelector(".grocery-list");
const clearBtn = document.querySelector(".clear-btn");

// edit option
let editElement;
let editFlag = false;
let editID = "";

// ****** EVENT LISTENERS **********
// submit form
form.addEventListener("submit", addItem);

// delete items using the clear item function
clearBtn.addEventListener("click", clearItems);

// ****** FUNCTIONS **********
function addItem(e) {
  e.preventDefault();
  const value = grocery.value;

  const id = new Date().getTime().toString();
  if (value && !editFlag) {
    const element = document.createElement("article");

    // add class to element
    element.classList.add("grocery-item");

    // add id to element
    const attr = document.createAttribute("data-id");
    attr.value = id;
    element.setAttributeNode(attr);
    element.innerHTML = `<p class="title">${value}</p>
            <div class="btn-container">
              <button type="button" class="edit-btn">
                <i class="fas fa-edit"></i>
              </button>
              <button type="button" class="delete-btn">
                <i class="fas fa-trash"></i>
              </button>
            </div> `;
    const deleteBtn = element.querySelector(".delete-btn");
    const editBtn = element.querySelector(".edit-btn");
    deleteBtn.addEventListener("click", deleteItem);
    editBtn.addEventListener("click", editItem);

    // append child
    list.appendChild(element);

    // display alert
    displayAlert("Item added to the list,", "successful");

    // show container
    container.classList.add("show-container");

    // add to local storage
    addToLocalStorage(id, value);

    // set back to default
    setBackToDefault();
  } else if (value && editFlag) {
    editElement.innerHTML = value;
    displayAlert("value changed to " + "success");

    console.log("editing item to the list");

    // edit local storage
    editLocalStorage(editID, value);
    setBackToDefault();
  } else {
    displayAlert("please enter value", "danger");
  }
}

// display alert
function displayAlert(text, action) {
  alert.textContent = text;
  alert.classList.add(`alert-${action}`);

  // remove alert
  setTimeout(function () {
    alert.textContent = "";
    alert.classList.remove(`alert-${action}`);
  }, 1000);
}

//clear items from
function clearItems() {
  const item = document.querySelectorAll(".grocery-item");

  if (item.length > 0) {
    item.forEach(function (item) {
      list.removeChild(item); // remove the item from
    });
  }

  container.classList.remove("show-container");
  displayAlert("empty list", "danger"); // remove the list from
  setBackToDefault(); // reset back to default state after resetting
  // localStorage.removeItem("list");
}

// delete function
function deleteItem(e) {
  const currentItem = e.currentTarget.parentElement.parentElement;
  const itemName =
    e.currentTarget.parentElement.previousElementSibling.innerText;
  console.log(itemName);
  console.log("Deleted item from local storage");
  list.removeChild(currentItem);
  if (list.children.length === 0) {
    container.classList.remove("show-container");
  }
  setBackToDefault();
  displayAlert(`${itemName} is deleted`, "danger");
  // remove from local storage
  // removeFromLocalStorage(id);}
}

// edit function
function editItem(e) {
  const currentItem = e.currentTarget.parentElement.parentElement;
  console.log("Edit Item");

  // set edit item
  editElement = e.currentTarget.parentElement.previousElementSibling;

  // set form value
  grocery.value = editElement.innerHTML;
  editFlag = true;
  editID = currentItem.dataset.id;
  submitBtn.textContent = "edit";
}

// set back to default
function setBackToDefault() {
  grocery.value = "";
  editFlag = false;
  editID = "";
  submitBtn.textContent = "submit";
}

// ****** LOCAL STORAGE **********
function addToLocalStorage(id, value) {
  console.log("adding to local storage");

  const grocery = { id, value };
  let items = getLocalStorage();
  console.log(items);

  items.push(grocery);
  localStorage.setItem("list", JSON.stringify(items));
}

function removeFromLocalStorage(id) {
  let item = getLocalStorage();
  item = items.filter(function (item) {
    if (item.id !== id) {
      return item;
    }
  });
  localStorage.setItem("list", JSON.stringify(items));
}
function editLocalStorage(id, value) {}
function getLocalStorage() {
  if (localStorage.getItem("list")) {
    let items = JSON.parse(localStorage.getItem("list"));
  } else {
    let items = [];
  }
}

// localStorage API
// setItem
// getItem
// removeItem
// save as string
localStorage.setItem("orange", JSON.stringify(["item", "item2"]));
const oranges = JSON.parse(localStorage.getItem("orange"));
console.log(oranges);
localStorage.removeItem("orange");

// ****** SETUP ITEMS **********
