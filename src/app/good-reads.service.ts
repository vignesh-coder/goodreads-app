import { Injectable } from '@angular/core';
import { SearchBook } from './models/search-book.model';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { SearchResults } from './models/search-results.model';
import { Book } from './models/book.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GoodReadsService {

  private API_KEY = 'ADD_YOUR_API_KEY';

  private searchResultsReady = new Subject<SearchResults>();

  constructor(private http: HttpClient) { }

  public searchBooks(searchBook: SearchBook) {

    const url = 'http://cors-anywhere.herokuapp.com/https://www.goodreads.com/search/index.xml';
    const httpHeaders = new HttpHeaders({ 'X-Requested-With': 'XMLHttpRequest' });
    this.http.get(url,
      {
        params: new HttpParams()
          .set('q', searchBook.query)
          .set('key', this.API_KEY)
          .set('page', String(searchBook.page))
          .set('search[field]', searchBook.searchField),
        responseType: 'text' as 'json',
        headers: httpHeaders
      })
      .subscribe(response => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(response.toString(), 'application/xml');
        const searchResults: SearchResults = new SearchResults();

        searchResults.resultsStart = +this.getContent(xml, 'search > results-start');
        searchResults.resultsEnd = +this.getContent(xml, 'search > results-end');
        searchResults.totalResults = +this.getContent(xml, 'search > total-results');
        searchResults.queryTimeSeconds = this.getContent(xml, 'search > query-time-seconds');

        searchResults.results = [];
        const bookElements = xml.querySelectorAll('work');
        for (const elem of bookElements as any) {
          const bookElement = elem as Document;
          const book: Book = new Book();

          book.id = +this.getContent(bookElement, 'best_book > id');
          book.title = this.getContent(bookElement, 'best_book > title');
          book.author = {
            id: +this.getContent(bookElement, 'author > id'),
            name: this.getContent(bookElement, 'author > name')
          };
          book.smallImage = this.getContent(bookElement, 'best_book > small_image_url');
          book.editions = +this.getContent(bookElement, 'books_count');
          book.ratings = +this.getContent(bookElement, 'ratings_count');
          book.publishedYear = +this.getContent(bookElement, 'original_publication_year');
          book.avgRating = this.getContent(bookElement, 'average_rating');

          searchResults.results.push(book);
        }

        this.searchResultsReady.next({ ...searchResults });
      });
  }

  public getSearchResultsListener() {
    return this.searchResultsReady.asObservable();
  }

  private getContent(xml: Document, query: string): string {
    const element = xml.querySelector(query);
    return element.textContent;
  }
}
