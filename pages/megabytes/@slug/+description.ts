// Environment: server, client
export default (pageContext) => {
  if (!pageContext.data.megabyte) {
    return "Megabyte not found";
  }
  return pageContext.data.megabyte.excerpt || `Read ${pageContext.data.megabyte.title} by Oliver Northam`;
};
