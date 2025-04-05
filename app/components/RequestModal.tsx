"use client";
import React, { useState } from "react";
import { Modal } from "@mui/base/Modal";
import { motion } from "framer-motion";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { RequestModalProp } from "../types/request-modal-prop";
const RequestModal: React.FC<RequestModalProp> = ({ open, setOpen }) => {
  const handleClose = () => setOpen(false);

  const filteredProducts = useSelector(
    (state: RootState) => state.products.filteredProducts
  );
  const fixedProducts = useSelector((state: RootState) => state.fixedProducts);
  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="absolute w-1/2 h-1/2 overflow-hidden bg-white z-50 rounded-md top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col  p-4  shadow-lg"
        >
          <div className="flex flex-row w-full items-center justify-between p-2">
            <span className="text-white p-1 bg-[#1c1c1c] rounded-md">
              Request Products
            </span>
            <CloseIcon
              onClick={handleClose}
              sx={{ color: "black", fontSize: "1.4rem", cursor: "pointer" }}
            />
          </div>
          <div className="w-full h-full flex flex-row space-x-2 p-2">
            <div className="flex-1/2 flex-col h-full ">
              <span>Filtrelenmiş/Sıralanmış Ürünler</span>
              <div className="flex flex-col w-full h-full overflow-x-hidden overflow-y-scroll p-6 pl-0 mt-2">
                {" "}
                {filteredProducts.map((p) => (
                  <span key={Number(p.productCode) - Number(p.colorCode)}>
                    Ürün Kodu : {p.productCode}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex-1/2 h-full ">
              <div className="flex-1/2 flex-col h-full ">
                <span>Sabit Ürünler</span>
                <div className="flex flex-col w-full h-full overflow-x-hidden overflow-y-scroll p-6 pl-0 mt-2">
                  {" "}
                  {fixedProducts.map((p) => (
                    <span key={Number(p.productCode) - Number(p.colorCode)}>
                      Ürün Kodu : {p.productCode}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </Modal>
    </div>
  );
};

export default RequestModal;
