import { ButtonLink, Container } from "@/components/ui/primitives";
import { LogoMark } from "@/components/brand/logo";

export const metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80svh] items-center overflow-hidden pt-28">
      <div aria-hidden className="bg-grid mask-fade absolute inset-0" />
      <Container className="relative text-center">
        <LogoMark className="mx-auto w-16 text-fg/80" />
        <p className="eyebrow mt-10 text-accent-text">404 — Page not found</p>
        <h1 className="display-lg mx-auto mt-5 max-w-[14ch]">This page drifted off the grid.</h1>
        <p className="lede mx-auto mt-6 max-w-md">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/">Back to home</ButtonLink>
          <ButtonLink href="/services" variant="ghost">
            Explore services
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
