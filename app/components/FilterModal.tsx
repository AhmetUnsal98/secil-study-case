"use client";
import React, { useState } from "react";
import { Modal } from "@mui/base/Modal";
import { motion } from "framer-motion";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setFilters } from "../redux/filtersReducer";
const FilterModal: React.FC<FilterModalProps> = ({ open, setOpen }) => {
  const dispatch = useDispatch();

  const storedFilters = useSelector((state: RootState) => state.filters);

  const handleClose = () => setOpen(false);

  const [localFilters, setLocalFilters] = useState<typeof storedFilters>({
    colorCode: "",
    product_code: "",
  });

  const handleApplyFilters = () => {
    dispatch(setFilters(localFilters));
    setOpen(false);
  };
  const handleClearLocalFilters = () => {
    setLocalFilters({
      colorCode: "",
      product_code: "",
    });
  };
  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="absolute w-1/2 h-1/2 bg-white z-50 rounded-md top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col  p-4  shadow-lg"
        >
          <h2>Filtreleme Seçenekleri</h2>
          <div className="flex flex-row w-full h-1/4 mt-6 mb-4 space-x-2">
            <Box sx={{ width: "33.33%" }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Color Code
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Color Code"
                  value={localFilters.colorCode}
                  onChange={(e) => {
                    setLocalFilters((prev) => ({
                      ...prev,
                      colorCode: e.target.value,
                    }));
                  }}
                >
                  <MenuItem value="0018">0018</MenuItem>
                  <MenuItem value="0008">0008</MenuItem>
                  <MenuItem value="0317">0317</MenuItem>
                  <MenuItem value="0050">0050</MenuItem>
                  <MenuItem value="0045">0045</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <TextField
              sx={{ mr: "2" }}
              id="outlined-basic"
              label="Product Code"
              variant="outlined"
              value={localFilters.product_code}
              onChange={(e) => {
                setLocalFilters((prev) => ({
                  ...prev,
                  product_code: e.target.value,
                }));
              }}
            />
          </div>
          <h2>Seçilen Flitreler</h2>
          <div className="flex flex-row w-full  space-x-2">
            {localFilters.colorCode && (
              <div className="flex items-center p-2 bg-[#1c1c1c] rounded-md">
                <span className="text-xs text-white">
                  Ürün Kodu: {localFilters.colorCode}
                </span>
                <CloseIcon
                  onClick={() =>
                    setLocalFilters((prev) => ({
                      ...prev,
                      colorCode: "",
                    }))
                  }
                  sx={{
                    ml: 1,
                    color: "white",
                    fontSize: "1rem",
                    cursor: "pointer",
                  }}
                />
              </div>
            )}

            {localFilters.product_code && (
              <div className="flex items-center p-2 bg-[#1c1c1c] rounded-md">
                <span className="text-xs text-white">
                  Ürün Kodu: {localFilters.product_code}
                </span>
                <CloseIcon
                  onClick={() =>
                    setLocalFilters((prev) => ({
                      ...prev,
                      product_code: "",
                    }))
                  }
                  sx={{
                    ml: 1,
                    color: "white",
                    fontSize: "1rem",
                    cursor: "pointer",
                  }}
                />
              </div>
            )}
          </div>
          <div className="flex flex-row w-full mt-auto space-x-2 rounded-md">
            <button
              onClick={handleClearLocalFilters}
              className="w-1/3 h-12 bg-[#1c1c1c] text-white border-1 border-[#1c1c1c] rounded-md cursor-pointer"
            >
              Seçimleri temizle
            </button>
            <button
              onClick={handleApplyFilters}
              className="w-1/3 h-12 bg-white border-1 border-[#1c1c1c] text-[#1c1c1c] rounded-md cursor-pointer"
            >
              Ara
              <SearchIcon
                sx={{ fontSize: "1.4rem", ml: "2", color: "#1c1c1c" }}
              />
            </button>
          </div>
          <div className="absolute right-0 top-0 m-2" onClick={handleClose}>
            <CloseIcon
              onClick={handleClose}
              sx={{ color: "black", fontSize: "1.4rem", cursor: "pointer" }}
            />
          </div>
        </motion.div>
      </Modal>
    </div>
  );
};

export default FilterModal;
