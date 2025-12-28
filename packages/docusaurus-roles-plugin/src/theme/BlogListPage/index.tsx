import BlogListPage from "@theme-init/BlogListPage";
import { useRoles, isAllowed } from "docusaurus-roles-plugin/runtime";
import type { Props } from "@theme/BlogListPage";
import { getRoleFrontMatter } from "../../options";

export default function BlogListPageWrapper({ items, ...rest }: Props) {
  const { roles, loading } = useRoles();

  const filteredItems = items.filter((i) => {
    const frontMatter = getRoleFrontMatter(i.content.frontMatter);
    const { allowed } = isAllowed(
      roles,
      frontMatter.required_roles ?? [],
      frontMatter.required_roles_mode ?? "all",
    );
    return allowed;
  });

  return <BlogListPage {...rest} items={filteredItems} />;
}
