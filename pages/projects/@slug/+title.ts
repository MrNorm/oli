// Environment: server, client
export default (pageContext) => {
  return `${pageContext.data.project.projectName} - Oliver Northam`;
};
