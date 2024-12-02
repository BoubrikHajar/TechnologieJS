var _a;
import Book from './Books'; // Adjust the path if necessary
// Function to get form input values and create a new Book instance
function addBookFromForm() {
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = parseInt(document.getElementById("pages").value, 10);
    const status = document.getElementById("status").value;
    const price = parseFloat(document.getElementById("price").value);
    const pagesRead = parseInt(document.getElementById("pages-read").value, 10);
    const format = document.getElementById("format").value;
    const newBook = new Book(title, author, pages, status, price, pagesRead, format);
    displayBookList();
    updateGlobalStats();
}
// Function to display all books in the book list
function displayBookList() {
    const bookListDiv = document.getElementById("book-list");
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
window.deleteBook = function (index) {
    Book.books[index].deleteBook();
    displayBookList();
    updateGlobalStats();
};
// Function to update global statistics
function updateGlobalStats() {
    const totalBooksRead = Book.books.filter(book => book.finished).length;
    const totalPagesRead = Book.books.reduce((sum, book) => sum + book.pagesRead, 0);
    document.getElementById("total-books-read").innerText = totalBooksRead.toString();
    document.getElementById("total-pages-read").innerText = totalPagesRead.toString();
}
// Event listener for the form submission to add a book
(_a = document.getElementById("book-form")) === null || _a === void 0 ? void 0 : _a.addEventListener("submit", (event) => {
    event.preventDefault();
    addBookFromForm();
    event.target.reset(); // Clear form fields after submission
});
// Initial display
displayBookList();
updateGlobalStats();
