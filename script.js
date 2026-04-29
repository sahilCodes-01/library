const submit = document.querySelector("#submit-btn");

submit.addEventListener("click", submitclick);

function submitclick(event) {
  event.preventDefault();

  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const pages = document.querySelector("#pages").value;
  const read =
    document.querySelector("[name = 'complete']:checked").value === "read";

  addBookToLibrary(title, author, pages, read);
  addBookToDisplay();
  dialog.close();
}

const myLibrary = [];

function Book(title, author, pages, read) {
  // the constructor...
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = crypto.randomUUID();

  this.info = function () {
    return `${this.title} by ${this.author} ${this.pages} ${this.read ? "Read" : "Not read yet"}`;
  };
}

//Constructor prototype
Book.prototype.toggleRead = function () {
  this.read = !this.read;
};

function addBookToLibrary(title, author, pages, read) {
  // take params, create a book then store it in the array
  let book = new Book(title, author, pages, read);
  myLibrary.push(book);
}

const container = document.querySelector("#book-container");

function addBookToDisplay() {
  container.textContent = "";
  //loop start from here
  for (const book of myLibrary) {
    const div = document.createElement("Div");
    div.classList.add("card-div");
    div.dataset.id = book.id;
    container.appendChild(div);

    div.textContent = book.info();

    //div for remove button
    const removebtn = document.createElement("button");
    removebtn.classList.add("removebtn");
    removebtn.textContent = "Remove";
    div.appendChild(removebtn);

    //eventlistner to find the id for the book
    // and remove it using splice

    removebtn.addEventListener("click", () => {
      const id = div.dataset.id;
      const index = myLibrary.findIndex((book) => book.id === id);
      myLibrary.splice(index, 1);
      addBookToDisplay();
    });

    //toggle button for read status
    const togglebtn = document.createElement("button");
    togglebtn.classList.add("togglebtn");

    togglebtn.textContent = "Toggle Read";
    div.appendChild(togglebtn);

    togglebtn.addEventListener("click", () => {
      const id = div.dataset.id;
      const index = myLibrary.findIndex((book) => book.id === id);
      myLibrary[index].toggleRead();
      addBookToDisplay();
    });
  }
}

const dialog = document.querySelector("dialog");
const showButton = document.querySelector("dialog + #new-book");
const closeButton = document.querySelector("dialog button");

// "Show the dialog" button opens the dialog modally
showButton.addEventListener("click", () => {
  dialog.showModal();
});

// "Close" button closes the dialog
closeButton.addEventListener("click", () => {
  dialog.close();
});
