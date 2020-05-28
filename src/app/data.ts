export interface Category {
  category: categoryInfo;
  currentPage: number;
  pagesCount: number;
  products: Product[];
}

interface categoryInfo {
  id: number;
  name: string;
  description: string;
}

interface Image {
  miniaturePath: string;
  path: string;
}
export interface Rating {
  percent: number;
  fullName: string;
  description: string;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  unitsOnStock: number;
  price: number;
  images: Image[];
  parameters: [];
  ratings: Rating[];
}


