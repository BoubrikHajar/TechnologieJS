import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Book } from './shared/book';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'TpAngular';
  books: Book[] = [
    new Book('BOOK 1', true),
    new Book('BOOK 2', false),
    new Book('BOOK 3', true)
  ];
}
