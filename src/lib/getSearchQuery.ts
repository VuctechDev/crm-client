const getSearchQuery = (key: string): string => {
  const query = new URLSearchParams(window.location.search);
  return query.get(key) ?? "";
};

export default getSearchQuery;
