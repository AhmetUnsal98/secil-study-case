export const getCollectionProducts = async (
  token: string,
  id: number,
  page: number,
  pageSize: number
) => {
  const response = await fetch(
    `https://maestro-api-dev.secil.biz/Collection/${id}/GetProductsForConstants`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        additionalFilters: [],
        page,
        pageSize,
      }),
    }
  );

  if (!response.ok) throw new Error("API Error");
  return response.json();
};
