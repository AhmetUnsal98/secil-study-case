import React from "react";
import { ProductCardProps } from "../types/product-card-props";
import { useDispatch, useSelector } from "react-redux";
import { addFixedProduct } from "../redux/fixedProductReducer";
import { RootState } from "../redux/store";
import { useDraggable } from "@dnd-kit/core";

const ProductCard = ({ product }: ProductCardProps) => {
  const dispatch = useDispatch();

  const { attributes, listeners, setNodeRef } = useDraggable({
    id: `${product.productCode}-${product.colorCode}`,
  });

  const handleAddToFixed = () => {
    const { id: _, ...productWithoutId } = product;
    const fixedProduct = {
      id: `${product.productCode}-${product.colorCode}`,
      ...productWithoutId,
    };
    dispatch(addFixedProduct(fixedProduct));
  };

  const fixedProducts = useSelector((state: RootState) => state.fixedProducts);
  const productId = `${product.productCode}-${product.colorCode}`;
  const isAdded = fixedProducts.some((item) => item.id === productId);

  return (
    <div
      ref={setNodeRef}
      className="relative flex flex-col items-center m-2 min-w-[138px] rounded overflow-hidden shadow-lg bg-white"
    >
      <div {...attributes} {...listeners} className="w-full cursor-move">
        <img
          className="w-full h-full object-cover"
          src={product.imageUrl}
          alt="Product"
        />
      </div>

      {isAdded && (
        <div className="absolute flex items-center justify-center z-50 w-full h-full inset-0 bg-gray-400/30">
          <span className="text-white text-md bg-black p-2 w-full text-center">
            Eklendi
          </span>
        </div>
      )}

      <div className="flex flex-col items-center pb-2 ">
        <h2 className="text-md font-semibold text-gray-800 p-1">
          {product.productCode}
        </h2>
        {isAdded ? (
          <button
            className="bg-gray-400 text-sm text-white px-2 py-1 rounded-md cursor-default"
            disabled
          >
            Eklendi
          </button>
        ) : (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleAddToFixed();
            }}
            className="bg-[#1c1c1c] border-2 border-[#1c1c1c] text-sm text-white px-2 py-1 rounded-md hover:text-[#1c1c1c] hover:bg-white transition duration-300 cursor-pointer"
          >
            Sabitlere Ekle
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
