// Environment: server, client
export default (pageContext) => {
  return pageContext.data.project.caption || `${pageContext.data.project.projectName} project by Oliver Northam`;
};
