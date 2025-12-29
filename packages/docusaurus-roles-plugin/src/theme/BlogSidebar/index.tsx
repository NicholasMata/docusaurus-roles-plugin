import { usePluginData } from "@docusaurus/useGlobalData";
import BlogSidebar, { type Props } from "@theme-init/BlogSidebar";
import { isAllowed, useRoles } from "docusaurus-roles-plugin/runtime";
import { type InternalRolesPluginOptions } from "docusaurus-roles-plugin/options";

export default function BlogSidebarWrapper({ sidebar, ...props }: Props) {
  const plugin = usePluginData(
    "docusaurus-roles-plugin",
  ) as InternalRolesPluginOptions;
  const { roles } = useRoles();
  if (sidebar) {
    sidebar.items = sidebar.items.filter((i) => {
      const roleInfo = plugin.rolesByPermalink.find(
        (r) => r.permalink === i.permalink,
      );
      if (!roleInfo) return true;
      const { allowed } = isAllowed(
        roles,
        roleInfo.requiredRoles,
        roleInfo.requiredRolesMode,
      );
      return allowed;
    });
  }
  return <BlogSidebar {...props} sidebar={sidebar} />;
}
