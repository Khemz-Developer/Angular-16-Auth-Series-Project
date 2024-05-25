import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private http = inject(HttpClient);

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>('http://localhost:3000/api/book');
  }

  
}
