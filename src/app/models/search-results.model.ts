import { Book } from './book.model';

export class SearchResults {
  resultsStart: number;
  resultsEnd: number;
  totalResults: number;
  queryTimeSeconds: string;
  results: Book[];
}
