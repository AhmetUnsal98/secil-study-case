import React, { useState } from "react";
import { ProductCardProps } from "../types/product-card-props";
import { useDispatch } from "react-redux";
import { removeFixedProduct } from "../redux/fixedProductReducer";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import swal from "sweetalert";
const FixedProductCard = ({ product }: ProductCardProps) => {
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);

  const handleRemove = () => {
    const productId = `${product.productCode}-${product.colorCode}`;
    dispatch(removeFixedProduct(productId));
  };

  return (
    <div
      className="relative flex flex-col items-center w-1/4 min-w-[138px]   rounded overflow-hidden shadow-lg bg-white cursor-move"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && (
        <div className="absolute inset-0 bg-gray-200/40  transition-all flex items-center justify-center">
          <IconButton
            onClick={() => {
              swal({
                title: "Emin misin?",
                text: `Ürünü çıkartmak istediğine emin misin ?`,
                icon: "warning",
                buttons: {
                  cancel: {
                    text: "İptal",
                    visible: true,
                    closeModal: true,
                  },
                  confirm: {
                    text: "Sil",
                    visible: true,
                    closeModal: true,
                  },
                },
                dangerMode: true,
              }).then((willDelete) => {
                if (willDelete) {
                  handleRemove();
                  swal({
                    title: "Ürün çıkartıldı.",
                    icon: "success",
                  });
                } else {
                  willDelete = false;
                  swal({
                    title: "Ürün Çıkartılmadı !",
                    icon: "danger",
                  });
                }
              });
            }}
            className="!text-white !bg-red-500 hover:!bg-red-600"
            size="large"
          >
            <DeleteIcon fontSize="inherit" />
          </IconButton>
        </div>
      )}

      <img
        className="w-full h-full object-cover"
        src={product.imageUrl}
        alt="Product"
      />

      <div className="flex flex-col items-center pb-2">
        <h2 className="text-md  font-semibold text-gray-800 p-1">
          {product.productCode}
        </h2>
      </div>
    </div>
  );
};

export default FixedProductCard;
