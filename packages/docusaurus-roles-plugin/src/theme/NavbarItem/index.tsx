import NavbarItem, { Props } from "@theme-init/NavbarItem";
import { useRoles, isAllowed } from "docusaurus-roles-plugin/runtime";
import { RoleRequirements } from "docusaurus-roles-plugin/options";

export default function RolesNavbarItem({
  requiredRoles = [],
  requiredRolesMode = "all",
  ...props
}: Props & Partial<RoleRequirements>) {
  const { roles } = useRoles();

  const { allowed } = isAllowed(roles, requiredRoles, requiredRolesMode);
  if (!allowed) return;

  return <NavbarItem {...props} />;
}
