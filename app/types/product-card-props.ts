import { Product } from "./product";

export interface ProductCardProps {
  product: Product & {
    id?: string;
  };
}
