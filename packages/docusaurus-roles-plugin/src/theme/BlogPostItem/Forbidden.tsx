import { type ReactNode } from "react";
import { BaseForbiddenContent } from "docusaurus-roles-plugin/runtime";

export default function ForbiddenBlogPostItem({
  missingRoles,
}: {
  missingRoles: string[];
}): ReactNode {
  return (
    <main className={"container margin-vert--xl"}>
      <BaseForbiddenContent
        prefixTranslateId="theme.BlogPostItem.Forbidden"
        missingRoles={missingRoles}
      />
    </main>
  );
}
