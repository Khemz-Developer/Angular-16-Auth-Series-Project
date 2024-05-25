import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Book } from 'src/app/models/book.model';

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss']
})
export class BookCardComponent {
 
  @Input() book!:Book;
}
