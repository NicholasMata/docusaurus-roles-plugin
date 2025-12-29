import DocSidebar, { type Props } from "@theme-init/DocSidebar";
import { getRoleFrontMatter } from "docusaurus-roles-plugin/options";
import { isAllowed, useRoles } from "docusaurus-roles-plugin/runtime";
import type {
  PropSidebarItem,
  PropSidebarItemCategory,
} from "@docusaurus/plugin-content-docs";

const allowedOnly = (userRoles: string[]) => {
  return (item: PropSidebarItem) => {
    const frontMatter = getRoleFrontMatter(item.customProps);
    const category = item as PropSidebarItemCategory;
    if (category.items) {
      category.items = category.items.filter(allowedOnly(userRoles));
    }
    const { allowed } = isAllowed(
      userRoles,
      frontMatter.required_roles ?? [],
      frontMatter.required_roles_mode ?? "all",
    );
    return allowed;
  };
};

export default function RolesDocSidebar({ sidebar, ...props }: Props) {
  const { roles } = useRoles();
  const filteredSidebar = sidebar.filter(allowedOnly(roles));
  return <DocSidebar {...props} sidebar={filteredSidebar} />;
}
