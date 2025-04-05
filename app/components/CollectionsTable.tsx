"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from "@mui/material";
import { getAllCollection } from "../api/collection/getallcollection";
import type { Collection, Meta } from "../types/collection";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import { getAllFilters } from "../api/filters/getallfilters";
import { useDispatch } from "react-redux";
import { setColors } from "../redux/colorsReducer";
import { useRouter } from "next/navigation";

const CollectionsTable = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [data, setData] = useState<Collection[]>([]);
  const [pageOptions, setPageOptions] = useState<Meta | null>(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      if (!session?.accessToken) return;
      try {
        const response = await getAllCollection(session.accessToken);
        setData(response.data);
        setPageOptions(response.meta);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching collections:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, [session?.accessToken]);

  useEffect(() => {
    const fetchColorsData = async () => {
      if (!session?.accessToken) return;
      try {
        const response = await getAllFilters(session.accessToken);
        dispatch(setColors(response.data));
      } catch (error) {
        console.error("Error fetching filters:", error);
      }
    };
    fetchColorsData();
  }, [session?.accessToken, dispatch]);

  const handleEdit = (id: number) => {
    router.push(`edit/${id}`);
  };

  return (
    <TableContainer component={Paper}>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <CircularProgress />
        </div>
      ) : (
        <Table sx={{ borderCollapse: "collapse" }}>
          <TableHead>
            <TableRow>
              <TableCell>Koleksiyon ID</TableCell>
              <TableCell>Ürün Bilgileri</TableCell>
              <TableCell>Satış Kanalı</TableCell>
              <TableCell>Sabit Düzenle</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .filter(
                (collection) =>
                  collection.filters.filters.length > 0 &&
                  collection.filters.filters.some(
                    (f) => f.title || f.valueName || f.value
                  )
              )
              .map((collection) => (
                <TableRow key={collection.id}>
                  <TableCell>{collection.id}</TableCell>
                  <TableCell>
                    {collection.filters.filters.length > 0
                      ? collection.filters.filters.map((filter, index) => {
                          return filter.title ? (
                            <div key={index} style={{ margin: "8px 0" }}>
                              {filter.title === "Color" && (
                                <span>Ürünün renk bilgisi: {filter.value}</span>
                              )}
                              {filter.title === "Price" && (
                                <span>
                                  Ürünün fiyat bilgisi: {filter.value}
                                </span>
                              )}
                              {filter.title === "Tag" && (
                                <span>
                                  Ürünün etiket bilgisi: {filter.valueName}
                                </span>
                              )}
                            </div>
                          ) : (
                            <span key={index}>Ürün Bilgisi Bulunamadı...</span>
                          );
                        })
                      : null}
                  </TableCell>
                  <TableCell>{`Satış Kanalı: ${collection.salesChannelId}`}</TableCell>
                  <TableCell>
                    <PlaylistAddCheckIcon
                      onClick={() => handleEdit(collection.id)}
                      sx={{
                        color: "gray",
                        fontSize: "2rem",
                        cursor: "pointer",
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      )}
    </TableContainer>
  );
};

export default CollectionsTable;
