
export enum StatusEnum {
    READ = "Read",
    REREAD = "Re-read",
    DNF = "DNF",
    CURRENTLY_READING = "Currently reading",
    RETURNED_UNREAD = "Returned Unread",
    WANT_TO_READ = "Want to read",
  }

  export enum FormatEnum {
    PRINT = "Print",
    PDF = "PDF",
    EBOOK = "Ebook",
    AUDIOBOOK = "AudioBook",
  }
  
  // Define the Book class
  export default class Book {
    title: string;
    author: string;
    pages: number;
    status: StatusEnum;
    price: number;
    pagesRead: number;
    format: FormatEnum;
    finished: boolean;
    // Attribut statique pour stocker les instances de `Book`
    static books: Book[] = [];
  
    constructor(title: string, author: string, pages: number, status: StatusEnum, price: number, pagesRead: number, format: FormatEnum) 
    {
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
    currentlyAt(): string {
      return `${((this.pagesRead / this.pages) * 100).toFixed(2)}%`;
    }
  
    // Méthode pour supprimer ce livre de la collection
    deleteBook(): void {
        const index = Book.books.indexOf(this);
        if (index !== -1) {
        Book.books.splice(index, 1);
        console.log(`${this.title} par ${this.author} a été supprimé.`);
        } else {
        console.log("Livre non trouvé.");
        }
    }
  
    // Method to update pages read and update the finished status automatically
    updatePagesRead(newPagesRead: number): void {
      if (newPagesRead > this.pages) {
        throw new Error("Pages read cannot exceed total pages.");
      }
      this.pagesRead = newPagesRead;
      this.finished = this.pagesRead === this.pages;
    }
  }
  