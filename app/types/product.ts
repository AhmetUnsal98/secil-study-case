export interface Product {
  id: string;
  productCode: string;
  colorCode: string;
  name: string | null;
  outOfStock: boolean;
  imageUrl: string;
  isSaleB2B: boolean;
}
export interface ProductState {
  products: Product[];
}

export interface ProductsResponse {
  meta: {
    page: number;
    pageSize: number;
    totalProduct: number;
  };
  data: {
    data: Product[];
    meta: {
      page: number;
      pageSize: number;
      totalProduct: number;
    };
  };
  message: string;
  status: number;
}
