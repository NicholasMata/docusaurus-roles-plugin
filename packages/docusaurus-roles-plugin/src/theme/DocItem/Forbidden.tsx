import { JSX } from "react";
import { BaseForbiddenContent } from "docusaurus-roles-plugin/runtime";

export default function ForbiddenDocItem({
  missingRoles,
}: {
  missingRoles: string[];
}): JSX.Element {
  return <BaseForbiddenContent prefixTranslateId="theme.DocItem.Forbidden" />;
}
