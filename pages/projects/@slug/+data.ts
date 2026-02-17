import type { PageContext } from "vike/types";
import { apolloClient } from "@/lib/apollo-client";
import { GET_PROJECT } from "@/lib/queries";
import type { GetProjectQuery } from "@/lib/generated/graphql";

export type Data = Awaited<ReturnType<typeof data>>;

export async function data(pageContext: PageContext) {
  const slug = pageContext.routeParams.slug;

  const { data } = await apolloClient.query<GetProjectQuery>({
    query: GET_PROJECT,
    variables: { slug },
  });

  const project = data?.Projects?.docs?.[0];

  if (!project) {
    throw new Error(`Project not found: ${slug}`);
  }

  return {
    project: {
      slug: project.slug,
      projectName: project.projectName,
      caption: project.caption,
      projectOverview: project.projectOverview,
    },
  };
}
