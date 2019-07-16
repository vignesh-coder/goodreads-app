import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SearchBook } from '../models/search-book.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchBook: SearchBook = {
    query: null,
    searchField: 'all',
    page: 1,
  };

  @Output() search: EventEmitter<SearchBook> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onSearchClicked() {
    if ( this.searchBook !== null && this.searchBook.query !== null && this.searchBook.query.trim() !== '') {
      this.search.emit({...this.searchBook});
    }
  }
}
