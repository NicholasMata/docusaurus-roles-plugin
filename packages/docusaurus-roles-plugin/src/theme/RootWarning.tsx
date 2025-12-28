import React from "react";

export default function RootWarning() {
  return (
    <div style={{ padding: 16 }}>
      <h2>RolesProvider is missing</h2>
      <p>
        You installed <code>docusaurus-plugin-roles</code> but did not wrap your
        site Root with
        <code> RolesProvider</code>.
      </p>
      <p>
        Swizzle Root and wrap it with <code>RolesProvider</code> from{" "}
        <code>docusaurus-plugin-roles/runtime</code>.
      </p>
    </div>
  );
}
