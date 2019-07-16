import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit {

  @Input()
  public total: number;
  @Input()
  public pageSize: number;

  @Input()
  public maxPages: number;

  @Input()
  public currentPageIndex = 1;

  @Output()
  public page = new EventEmitter<number>();

  totalPages = 0;

  pageNumbers: number[] = [];

  constructor() {
  }

  ngOnInit() {
    this.totalPages = Math.floor(this.total / this.pageSize);
    const rem = this.total % this.pageSize;
    if (rem > 0) {
      this.totalPages++;
    }
    if (this.totalPages > this.maxPages) {
      this.totalPages = this.maxPages;
    }
    console.log([this.totalPages, this.total, this.pageSize]);
    this.pageNumbers = [];
    for (let i = 1; i <= 10 && i <= this.totalPages; i++) {
      this.pageNumbers.push(i);
    }
    this.fillPageNumbers();
  }

  setPageIndex(pageIndex: number) {

    this.currentPageIndex = pageIndex;

    this.fillPageNumbers();

    this.page.emit(pageIndex);
  }

  fillPageNumbers() {

    let st = this.currentPageIndex - 5;
    if (st < 1) {
      st = 1;
    }
    let end = st + 9;
    if (end > this.totalPages) {
      end = this.totalPages;
      st = end - 9;
      if (st < 1) {
        return;
      }
    }
    this.pageNumbers = [];
    for (let i = st; i <= end; i++) {
      this.pageNumbers.push(i);
    }
  }
}
