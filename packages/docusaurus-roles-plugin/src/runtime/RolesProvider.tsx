import React, { useEffect, useState } from "react";
import type { PropsWithChildren } from "react";
import { RolesContext, type RolesState } from "./context";

export type ErrorSlotProps = {
  error: Error;
};

export type RolesProviderProps = PropsWithChildren<{
  roles: () => Promise<string[]> | string[];
  slots?: {
    loading?: React.ElementType;
    error?: React.ElementType<ErrorSlotProps>;
  };
}>;

export const DefaultRolesLoading = () => {
  return (
    <div
      style={{
        display: "flex",
        flexGrow: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      Checking Permissions...
    </div>
  );
};

export const DefaultRolesError = ({ error }: ErrorSlotProps) => {
  return (
    <div
      style={{
        display: "flex",
        flexGrow: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "#c1121f",
      }}
    >
      {error.message}
    </div>
  );
};

export function RolesProvider({
  roles: getRoles,
  slots = {},
  children,
}: RolesProviderProps) {
  const LoadingComponent = slots.loading ?? DefaultRolesLoading;
  const ErrorComponent = slots.error ?? DefaultRolesError;

  const [state, setState] = useState<RolesState>({
    roles: [],
    loading: true,
    hasProvider: true,
  });

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        setState((s) => ({ ...s, loading: true }));
        const roles = await getRoles();
        if (!roles) {
          console.warn(
            "No roles were returned an empty array should be returned if user has no roles.",
          );
        }
        setState((s) => ({
          ...s,
          loading: false,
          roles: roles,
        }));
      } catch (e) {
        setState((s) => ({
          ...s,
          loading: false,
          roles: [],
          error: e instanceof Error ? e : new Error(String(e)),
        }));
      }
    };

    fetchRoles();
  }, [getRoles]);

  if (state.loading) {
    return <LoadingComponent />;
  }

  if (state.error) {
    return <ErrorComponent error={state.error} />;
  }

  return (
    <RolesContext.Provider value={state}>{children}</RolesContext.Provider>
  );
}
