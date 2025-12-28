import React from "react";
import { Redirect } from "@docusaurus/router";
import { usePluginData } from "@docusaurus/useGlobalData";
import {
  useRoles,
  isAllowed,
  type RoleMode,
} from "docusaurus-roles-plugin/runtime";
import RootWarning from "./RootWarning";
import { PluginOptions } from "../options";

type Props = {
  requiredRoles?: string[];
  mode?: RoleMode;
  children: React.ReactNode;
  forbidden: React.ElementType<{ missingRoles: string[] }>;
};

export function getPluginConfig() {
  return usePluginData("docusaurus-roles-plugin") as PluginOptions;
}

export default function RoleGate({
  requiredRoles,
  mode,
  children,
  forbidden: Forbidden,
}: Props) {
  const pluginConfig = getPluginConfig();
  const { roles, loading, hasProvider } = useRoles();

  if (loading) {
    return <>loading...</>;
  }

  const required = requiredRoles ?? [];
  if (required.length === 0) return children;

  const effectiveMode: RoleMode = mode ?? "any";

  if (process.env.NODE_ENV !== "production" && !hasProvider) {
    return <RootWarning />;
  }

  const { allowed, missing } = isAllowed(roles, required, effectiveMode);
  if (allowed) return children;

  if (pluginConfig?.unauthorizedBehavior === "redirect") {
    return <Redirect to={pluginConfig?.redirectTo ?? "/access-denied"} />;
  }

  return <Forbidden missingRoles={missing} />;
}
