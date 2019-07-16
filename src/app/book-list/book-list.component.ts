import { Component, OnInit, Input } from '@angular/core';
import { SearchResults } from '../models/search-results.model';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  @Input()
  searchResults: SearchResults;

  constructor() { }

  ngOnInit() {
  }
}
