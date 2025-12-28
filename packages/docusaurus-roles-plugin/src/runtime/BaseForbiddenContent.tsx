import { JSX } from "react";
import type { Props as NotFoundProps } from "@theme/NotFound/Content";
import Translate from "@docusaurus/Translate";
import Heading from "@theme/Heading";

export type BaseForbiddenContentProps = {
  prefixTranslateId: string;
  title?: string;
  shortDescription?: string;
  description?: string;
} & NotFoundProps;

export function BaseForbiddenContent({
  prefixTranslateId,
  title = "Forbidden",
  shortDescription = "You don't have permission to access this page.",
  description = "If you believe this is a mistake, contact the site owner or sign in with an account that has access.",
}: BaseForbiddenContentProps): JSX.Element {
  return (
    <div className="row">
      <div className="col">
        <Heading as="h1" className="hero__title">
          <Translate
            id={`${prefixTranslateId}.title`}
            description="The title of the 403 page"
          >
            {title}
          </Translate>
        </Heading>
        <p>
          <Translate
            id={`${prefixTranslateId}.p1`}
            description="The first paragraph of the 403 page"
          >
            {shortDescription}
          </Translate>
        </p>
        <p>
          <Translate
            id={`${prefixTranslateId}.p2`}
            description="The 2nd paragraph of the 403 page"
          >
            {description}
          </Translate>
        </p>
      </div>
    </div>
  );
}
