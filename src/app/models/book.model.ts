export class Book {
  id: number;
  title: string;
  author: {id: number, name: string};
  smallImage: string;
  editions: number;
  ratings: number;
  publishedYear: number;
  avgRating: string;
}
