export type UnauthorizedBehavior = "forbidden" | "redirect";

export type RolesPluginOptions = {
  unauthorizedBehavior?: UnauthorizedBehavior;
  redirectTo?: string; // default '/access-denied'
};

export type InternalRolesPluginOptions = {
  rolesByPermalink: RoleEntry[];
} & RolesPluginOptions;

export type RolesMode = "all" | "any";

export type RoleRequirements = {
  requiredRoles: string[];
  requiredRolesMode: RolesMode;
};

export type RoleFrontMatter = {
  required_roles?: string[];
  required_roles_mode?: RolesMode;
};

export type RoleEntry = RoleRequirements & {
  permalink: string;
};

export function getRoleFrontMatter(frontMatter: unknown): RoleFrontMatter {
  if (!frontMatter || typeof frontMatter !== "object") return {};
  return frontMatter as RoleFrontMatter;
}

export function transformRoleFrontMatterToRoleRequirements(
  frontMatter: unknown,
): RoleRequirements {
  const roleFrontMatter = getRoleFrontMatter(frontMatter);
  return {
    requiredRoles: roleFrontMatter.required_roles ?? [],
    requiredRolesMode: roleFrontMatter.required_roles_mode ?? "all",
  };
}

export function getRoleRequirements(obj: unknown): RoleRequirements {
  if (
    !obj ||
    typeof obj !== "object" ||
    !("requiredRoles" in obj || "requiredRolesMode" in obj)
  )
    return { requiredRoles: [], requiredRolesMode: "all" };
  return obj as RoleRequirements;
}
