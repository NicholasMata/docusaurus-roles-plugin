import React from "react";
import { RolesProvider } from "docusaurus-roles-plugin/runtime"; // or wherever yours lives

export default function Root({ children }: { children: React.ReactNode }) {
  return (
    <RolesProvider
      roles={async () => {
        await new Promise((res, rej) => {
          setTimeout(res, 5000);
        });
        return [];
        // throw new Error("Unable to retrieve permissions");
      }}
    >
      {children}
    </RolesProvider>
  );
}
