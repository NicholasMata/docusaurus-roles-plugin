export type RoleMode = "any" | "all";

export type RoleCheckResult = {
  allowed: boolean;
  missing: string[];
};

export function isAllowed(
  userRoles: string[],
  required: string[],
  mode: RoleMode,
): RoleCheckResult {
  // No requirements → always allowed
  if (!required || required.length === 0) {
    return { allowed: true, missing: [] };
  }

  const userRoleSet = new Set(userRoles);

  if (mode === "all") {
    const missing = required.filter((r) => !userRoleSet.has(r));
    return {
      allowed: missing.length === 0,
      missing,
    };
  }

  // mode === "any"
  const hasAny = required.some((r) => userRoleSet.has(r));
  return {
    allowed: hasAny,
    missing: hasAny ? [] : required.slice(), // nothing matched → all are effectively missing
  };
}
