"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import FilterListAltIcon from "@mui/icons-material/FilterListAlt";
import CloseIcon from "@mui/icons-material/Close";
import { getCollectionProducts } from "@/app/api/collection/getcollectionproducts";
import { Product, ProductsResponse } from "@/app/types/product";
import FilterModal from "@/app/components/FilterModal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { clearColor, clearProductCode } from "@/app/redux/filtersReducer";
import { setFilteredProducts, setProducts } from "@/app/redux/productsReducer";
import FixedProductCard from "@/app/components/FixedProductCard";
import DraggableProductGrid from "@/app/components/DraggableProductGrid";
import RequestModal from "@/app/components/RequestModal";
import Head from "./Head";

const Edit = () => {
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [openReq, setOpenReq] = useState(false);
  const [data, setData] = useState<ProductsResponse | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const pageSize = 36;

  const router = useRouter();
  const { id } = useParams();
  const storedFilters = useSelector((state: RootState) => state.filters);
  const products = useSelector((state: RootState) => state.products.products);
  const filteredProducts = useSelector(
    (state: RootState) => state.products.filteredProducts
  );
  const fixedProducts = useSelector((state: RootState) => state.fixedProducts);

  useEffect(() => {
    const fetchData = async () => {
      if (!id || !session?.accessToken) return;
      try {
        const response = await getCollectionProducts(
          session.accessToken,
          Number(id),
          currentPage,
          pageSize
        );

        setData(response);
        dispatch(setProducts(response.data.data));
        setTotalProducts(response.data.meta.totalProduct);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [id, session?.accessToken, currentPage, dispatch]);

  useEffect(() => {
    if (!products) return;

    const filtered = products.filter((product) => {
      const matchesProductCode =
        !storedFilters.product_code ||
        product.productCode === storedFilters.product_code;

      const matchesColorCode =
        !storedFilters.colorCode ||
        product.colorCode === storedFilters.colorCode;

      return matchesProductCode && matchesColorCode;
    });

    dispatch(setFilteredProducts(filtered));
  }, [storedFilters, products, dispatch]);

  const totalPages = Math.ceil(totalProducts / pageSize);

  return (
    <>
      <Head />
      <div className="flex flex-col w-full lg:w-3/4 h-auto bg-white ml-16 sm:ml-22 md:ml-34 lg:58 xl:ml-58 mt-2 p-4">
        <FilterModal open={open} setOpen={setOpen} />
        <RequestModal open={openReq} setOpen={setOpenReq} />

        {/* Filtre Göstergeleri */}
        <div className="flex w-full h-12 items-center space-x-2">
          <div className="flex w-[90%] items-center h-full border rounded-xl p-2 space-x-2">
            {storedFilters.colorCode && (
              <div className="w-[100px] h-full flex items-center justify-center rounded-xl bg-gray-800 cursor-pointer">
                <span className="text-white">{storedFilters.colorCode}</span>
                <CloseIcon
                  onClick={() => dispatch(clearColor())}
                  sx={{ color: "white", fontSize: "1rem" }}
                />
              </div>
            )}

            {storedFilters.product_code && (
              <div className="min-w-[100px] h-full flex items-center justify-center rounded-xl bg-gray-800 cursor-pointer">
                <span className="text-white">{storedFilters.product_code}</span>
                <CloseIcon
                  onClick={() => dispatch(clearProductCode())}
                  sx={{ color: "white", fontSize: "1rem" }}
                />
              </div>
            )}
          </div>

          <div
            onClick={() => setOpen(true)}
            className="flex items-center justify-around w-[10%] bg-gray-800 h-full rounded-xl cursor-pointer"
          >
            <span className="text-white">Filtreler</span>
            <FilterListAltIcon sx={{ color: "white", fontSize: "1.5rem" }} />
          </div>
        </div>

        <div className="flex w-full mt-2 space-x-4 overflow-x-hidden">
          <div className="flex flex-col w-1/2 min-h-[60vh] h-full border rounded-xl p-4">
            <span className="font-semibold">Koleksiyon Ürünleri</span>

            <div className="flex flex-wrap mt-2 space-x-2 space-y-2">
              {filteredProducts.length > 0 ? (
                <DraggableProductGrid products={filteredProducts} />
              ) : (
                <p>Yükleniyor veya ürün bulunamadı...</p>
              )}
            </div>

            <div className="flex justify-center items-center mt-4 space-x-2 border-t pt-4">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg disabled:opacity-30 bg-gray-100 hover:bg-gray-200 cursor-pointer"
              >
                ◀
              </button>

              <div className="flex items-center px-4 py-1 bg-gray-100 rounded-lg">
                <span className="font-medium text-gray-700">
                  Sayfa {currentPage} / {totalPages}
                </span>
              </div>

              <button
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage >= totalPages}
                className="p-2 rounded-lg disabled:opacity-30 bg-gray-100 hover:bg-gray-200 cursor-pointer"
              >
                ▶
              </button>
            </div>
          </div>

          <div className="flex flex-col w-1/2 h-full border rounded-xl p-4">
            <span className="font-semibold">Sabit Ürünler</span>
            <div className="flex flex-wrap mt-2 space-x-2 space-y-2 overflow-y-scroll">
              {fixedProducts.map((product: Product) => (
                <FixedProductCard
                  key={`${product.productCode}-${product.colorCode}`}
                  product={product}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Alt Butonlar */}
        <div className="flex justify-end w-full h-16 mt-4">
          <button
            onClick={() => router.push("/collections")}
            className="px-6 py-2 m-2 text-[#1c1c1c] border-2 border-[#1c1c1c] rounded-md cursor-pointer"
          >
            Vazgeç
          </button>
          <button
            onClick={() => setOpenReq(true)}
            className="px-6 py-2 m-2 text-white bg-[#1c1c1c] border-2 border-[#1c1c1c] rounded-md cursor-pointer"
          >
            Kaydet
          </button>
        </div>
      </div>
    </>
  );
};

export default Edit;
