import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookService } from 'src/app/services/book.service';
import { BookCardComponent } from 'src/app/components/book-card/book-card.component';
import {Book}  from 'src/app/models/book.model';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,BookCardComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export default class HomeComponent implements OnInit{
  

  private bookService = inject(BookService);
  books: Book[] = [];  // Define an array to store the book objects with the correct type

  ngOnInit(): void {
    this.bookService.getBooks().subscribe((data: Book[]) => {  // Specify the type as Book[]
      this.books = data;  // Assign the received data to the books array
      console.log(this.books);  // Log the books array to the console
    });
  }
}
