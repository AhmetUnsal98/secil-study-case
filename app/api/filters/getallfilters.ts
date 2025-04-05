export const getAllFilters = async (token: string) => {
  const response = await fetch(
    "https://maestro-api-dev.secil.biz/Collection/72/GetFiltersForConstants",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json; charset=utf-8",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Api Error");
  }
  return response.json();
};
