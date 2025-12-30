import FooterLinks, { Props } from "@theme-init/Footer/Links";
import { useRoles, isAllowed } from "docusaurus-roles-plugin/runtime";
import { getRoleRequirements } from "docusaurus-roles-plugin/options";

export default function RolesFooterLinks(props: Props) {
  const { roles } = useRoles();
  const allowedLinks = props.links.filter((linkOrCategory) => {
    const links = linkOrCategory.items;
    if (links && Array.isArray(links)) {
      const allowedLinksForCategory = links
        .filter((link) => {
          const { requiredRoles, requiredRolesMode } =
            getRoleRequirements(link);
          const { allowed } = isAllowed(
            roles,
            requiredRoles,
            requiredRolesMode,
          );
          return allowed;
        })
        .map(({ requiredRoles, requiredRolesMode, ...link }) => link);
      linkOrCategory.items = allowedLinksForCategory;
      return allowedLinksForCategory.length > 0;
    }
    const { requiredRoles, requiredRolesMode } =
      getRoleRequirements(linkOrCategory);
    const { allowed } = isAllowed(roles, requiredRoles, requiredRolesMode);
    return allowed;
  });

  return <FooterLinks links={allowedLinks} />;
}
