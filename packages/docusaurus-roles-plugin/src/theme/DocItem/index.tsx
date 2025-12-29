import DocItem, { type Props } from "@theme-init/DocItem";
import RoleGate from "../RoleGate.js";
import { getRoleFrontMatter } from "docusaurus-roles-plugin/options";
import ForbiddenDocItem from "./Forbidden.js";

export default function DocItemWrapper(props: Props) {
  const frontMatter = getRoleFrontMatter(props?.content.frontMatter);
  const requiredRoles = frontMatter.required_roles;
  const mode = frontMatter.required_roles_mode;

  return (
    <RoleGate
      requiredRoles={requiredRoles}
      mode={mode}
      forbidden={ForbiddenDocItem}
    >
      <DocItem {...props} />
    </RoleGate>
  );
}
