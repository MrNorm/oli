// Environment: server, client
export default (pageContext) => {
  if (!pageContext.data.megabyte) {
    return "Megabyte not found - Oliver Northam";
  }
  return `${pageContext.data.megabyte.title} - Oliver Northam`;
};
