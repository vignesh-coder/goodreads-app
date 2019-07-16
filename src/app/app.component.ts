import { Component } from '@angular/core';
import { SearchBook } from './models/search-book.model';
import { ConstantPool } from '@angular/compiler';
import { GoodReadsService } from './good-reads.service';
import { SearchResults } from './models/search-results.model';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'goodreads-app';
  searchResults: SearchResults = null;
  isloading = false;
  currSearch: SearchBook = { page: 1, query: '', searchField: 'all' };

  constructor(private goodReadsService: GoodReadsService) {
    goodReadsService.getSearchResultsListener().subscribe(results => {
      this.searchResults = results;
      this.isloading = false;
      console.log(results);
    });
  }

  search(searchBook: SearchBook) {
    this.searchResults = null;
    this.currSearch = searchBook;
    this.currSearch.page = 1;
    this.isloading = true;
    this.goodReadsService.searchBooks(searchBook);
  }

  onPageChanged(pageIndex: number) {
    this.currSearch.page = pageIndex;
    this.isloading = true;
    this.goodReadsService.searchBooks(this.currSearch);
  }
}
