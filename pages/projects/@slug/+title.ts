// Environment: server, client
export default (pageContext) => {
  if (!pageContext.data.project) {
    return "Project not found - Oliver Northam";
  }
  return `${pageContext.data.project.projectName} - Oliver Northam`;
};
