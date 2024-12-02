import Book, { StatusEnum, FormatEnum } from './Books'; // Adjust the path if necessary

// Function to get form input values and create a new Book instance
function addBookFromForm(): void {
  const title = (document.getElementById("title") as HTMLInputElement).value;
  const author = (document.getElementById("author") as HTMLInputElement).value;
  const pages = parseInt((document.getElementById("pages") as HTMLInputElement).value, 10);
  const status = (document.getElementById("status") as HTMLSelectElement).value as StatusEnum;
  const price = parseFloat((document.getElementById("price") as HTMLInputElement).value);
  const pagesRead = parseInt((document.getElementById("pages-read") as HTMLInputElement).value, 10);
  const format = (document.getElementById("format") as HTMLSelectElement).value as FormatEnum;
  const newBook = new Book(title, author, pages, status, price, pagesRead, format);

  displayBookList();
  updateGlobalStats();
}

// Function to display all books in the book list
function displayBookList(): void {
  const bookListDiv = document.getElementById("book-list") as HTMLElement;
  bookListDiv.innerHTML = ""; // Clear previous content

  Book.books.forEach((book, index) => {
    const bookDiv = document.createElement("div");
    bookDiv.className = "p-4 border border-gray-300 rounded bg-gray-50";

    bookDiv.innerHTML = `
      <h3 class="text-lg font-semibold">${book.title} by ${book.author}</h3>
      <p>Pages: ${book.pages} - Status: ${book.status} - Format: ${book.format}</p>
      <p>Price: $${book.price.toFixed(2)} - Pages Read: ${book.pagesRead} (${book.currentlyAt()})</p>
      <button onclick="deleteBook(${index})" class="bg-red-500 text-white p-2 rounded mt-2">Delete</button>
    `;
    bookListDiv.appendChild(bookDiv);
  });
}

// Function to delete a book and refresh the list and stats
(window as any).deleteBook = function(index: number): void {
  Book.books[index].deleteBook();
  displayBookList();
  updateGlobalStats();
}

// Function to update global statistics
function updateGlobalStats(): void {
  const totalBooksRead = Book.books.filter(book => book.finished).length;
  const totalPagesRead = Book.books.reduce((sum, book) => sum + book.pagesRead, 0);

  (document.getElementById("total-books-read") as HTMLElement).innerText = totalBooksRead.toString();
  (document.getElementById("total-pages-read") as HTMLElement).innerText = totalPagesRead.toString();
}

// Event listener for the form submission to add a book
document.getElementById("book-form")?.addEventListener("submit", (event) => {
  event.preventDefault();
  addBookFromForm();
  (event.target as HTMLFormElement).reset(); // Clear form fields after submission
});

// Initial display
displayBookList();
updateGlobalStats();
