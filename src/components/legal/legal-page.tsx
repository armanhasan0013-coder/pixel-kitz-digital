import type { ReactNode } from "react";
import { Container, DraftNotice, Eyebrow } from "@/components/ui/primitives";
import { siteConfig } from "@/config/site";

export function LegalPage({ title, intro, children }: { title: string; intro: string; children: ReactNode }) {
  return (
    <article className="pt-32 pb-24 sm:pt-40">
      <Container className="max-w-[860px]">
        <Eyebrow>Legal</Eyebrow>
        <h1 className="display-md mt-5">{title}</h1>
        <p className="mt-4 text-sm text-subtle">Last updated: {siteConfig.legal.lastUpdated}</p>
        <div className="mt-8">
          <DraftNotice>
            This is an editable draft and has not been reviewed by a lawyer. Items in [square brackets] must be
            completed and the full text approved before publication.
          </DraftNotice>
        </div>
        <p className="lede mt-10">{intro}</p>
        <div className="prose-pk mt-6">{children}</div>
      </Container>
    </article>
  );
}

/** Entity name shown in legal text — falls back to a visible placeholder until configured. */
export function Entity() {
  return <>{siteConfig.legal.entityName ?? `${siteConfig.name} [registered legal entity name]`}</>;
}

export function ContactLine() {
  const { email, address } = siteConfig.contact;
  return (
    <>
      {email ?? "[business email]"}, {address ?? "[registered business address]"}
    </>
  );
}
