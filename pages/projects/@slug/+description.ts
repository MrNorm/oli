// Environment: server, client
export default (pageContext) => {
  if (!pageContext.data.project) {
    return "Project not found";
  }
  return pageContext.data.project.caption || `${pageContext.data.project.projectName} project by Oliver Northam`;
};
