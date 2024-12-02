export var StatusEnum;
(function (StatusEnum) {
    StatusEnum["READ"] = "Read";
    StatusEnum["REREAD"] = "Re-read";
    StatusEnum["DNF"] = "DNF";
    StatusEnum["CURRENTLY_READING"] = "Currently reading";
    StatusEnum["RETURNED_UNREAD"] = "Returned Unread";
    StatusEnum["WANT_TO_READ"] = "Want to read";
})(StatusEnum || (StatusEnum = {}));
export var FormatEnum;
(function (FormatEnum) {
    FormatEnum["PRINT"] = "Print";
    FormatEnum["PDF"] = "PDF";
    FormatEnum["EBOOK"] = "Ebook";
    FormatEnum["AUDIOBOOK"] = "AudioBook";
})(FormatEnum || (FormatEnum = {}));
// Define the Book class
class Book {
    constructor(title, author, pages, status, price, pagesRead, format) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.status = status;
        this.price = price;
        this.pagesRead = pagesRead;
        this.format = format;
        this.finished = pagesRead >= pages;
        // Ajout du livre à la liste statique
        Book.books.push(this);
    }
    // Method to get the reading progress as a percentage
    currentlyAt() {
        return `${((this.pagesRead / this.pages) * 100).toFixed(2)}%`;
    }
    // Méthode pour supprimer ce livre de la collection
    deleteBook() {
        const index = Book.books.indexOf(this);
        if (index !== -1) {
            Book.books.splice(index, 1);
            console.log(`${this.title} par ${this.author} a été supprimé.`);
        }
        else {
            console.log("Livre non trouvé.");
        }
    }
    // Method to update pages read and update the finished status automatically
    updatePagesRead(newPagesRead) {
        if (newPagesRead > this.pages) {
            throw new Error("Pages read cannot exceed total pages.");
        }
        this.pagesRead = newPagesRead;
        this.finished = this.pagesRead === this.pages;
    }
}
// Attribut statique pour stocker les instances de `Book`
Book.books = [];
export default Book;
