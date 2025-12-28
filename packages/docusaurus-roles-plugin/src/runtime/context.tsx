import React from "react";

export type RolesState = {
  roles: string[];
  loading: boolean;
  error?: Error;
  /** true if RolesProvider is mounted */
  hasProvider: boolean;
};

export const RolesContext = React.createContext<RolesState>({
  roles: [],
  loading: false,
  hasProvider: false,
});
