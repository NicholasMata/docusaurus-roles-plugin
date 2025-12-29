import BlogPostItem, { type Props } from "@theme-init/BlogPostItem";
import RoleGate from "../RoleGate.js";
import { getRoleFrontMatter } from "docusaurus-roles-plugin/options";
import { useBlogPost } from "@docusaurus/plugin-content-blog/client";
import ForbiddenBlogPostItem from "./Forbidden.js";

export default function BlogPostItemWrapper(props: Props) {
  const { metadata } = useBlogPost();
  const frontMatter = getRoleFrontMatter(metadata.frontMatter);
  const requiredRoles = frontMatter.required_roles;
  const mode = frontMatter.required_roles_mode;

  return (
    <RoleGate
      requiredRoles={requiredRoles}
      mode={mode}
      forbidden={ForbiddenBlogPostItem}
    >
      <BlogPostItem {...props} />
    </RoleGate>
  );
}
