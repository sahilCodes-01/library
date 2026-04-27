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

function addBookToLibrary(title, author, pages, read) {
  // take params, create a book then store it in the array
  let book = new Book(title, author, pages, read);
  myLibrary.push(book);
}

const container = document.querySelector("#book-container");

function addBookToDisplay() {
  container.textContent = "";
  for (const book of myLibrary) {
    const div = document.createElement("Div");
    container.appendChild(div);

    div.textContent = book.info();

    //div for remove button
    const removebtn = document.createElement("button");
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
