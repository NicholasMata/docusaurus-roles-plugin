import { useContext } from "react";
import { RolesContext } from "./context";

export function useRoles() {
  return useContext(RolesContext);
}
