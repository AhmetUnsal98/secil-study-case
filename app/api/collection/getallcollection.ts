// api/collection/getallcollection.ts
import { ApiResponse } from "../../types/collection";

export const getAllCollection = async (token: string): Promise<ApiResponse> => {
  const response = await fetch(
    "https://maestro-api-dev.secil.biz/Collection/GetAll",
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  );

  if (!response.ok) throw new Error("API Error");
  return response.json() as Promise<ApiResponse>;
};
