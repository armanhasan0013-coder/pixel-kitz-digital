import Link from "next/link";
import type { ComponentProps, CSSProperties, ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function Container({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12", className)} {...props} />;
}

export function Eyebrow({ children, className, tone = "dark" }: { children: ReactNode; className?: string; tone?: "dark" | "paper" }) {
  return (
    <p className={cn("eyebrow inline-flex items-center gap-2.5", tone === "dark" ? "text-muted" : "text-paper-muted", className)}>
      <span aria-hidden className="size-1.5 rounded-full bg-accent" />
      {children}
    </p>
  );
}

type Variant = "primary" | "accent" | "ghost" | "paper";

const variants: Record<Variant, string> = {
  primary: "bg-fg text-ink [--btn-hover:var(--color-accent-strong)] hover:text-white",
  accent: "bg-accent-strong text-white [--btn-hover:#a92e28]",
  ghost: "border border-line-strong text-fg [--btn-hover:var(--color-fg)] hover:text-ink",
  paper: "bg-paper-ink text-paper [--btn-hover:var(--color-accent-paper)]",
};

type ButtonLinkProps = ComponentProps<typeof Link> & { variant?: Variant; icon?: boolean; size?: "md" | "lg" };

export function ButtonLink({ variant = "primary", icon = true, size = "md", className, children, ...props }: ButtonLinkProps) {
  const external = typeof props.href === "string" && /^https?:/.test(props.href);
  return (
    <Link
      className={cn(
        "btn-sheen group inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors duration-500",
        size === "lg" ? "h-14 px-7 text-[0.95rem]" : "h-12 px-6 text-sm",
        variants[variant],
        className,
      )}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...props}
    >
      <span>{children}</span>
      {icon && (
        <ArrowUpRight
          aria-hidden
          className="size-4 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      )}
    </Link>
  );
}

/** Section heading pairing an eyebrow label with an editorial headline. */
export function SectionHeading({
  eyebrow,
  title,
  lede,
  className,
  tone = "dark",
  as: Tag = "h2",
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  className?: string;
  tone?: "dark" | "paper";
  as?: "h1" | "h2";
}) {
  return (
    <div className={cn("max-w-3xl", className)}>
      <div data-reveal>
        <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
      </div>
      <Tag data-reveal style={{ "--reveal-delay": "80ms" } as CSSProperties} className={cn(Tag === "h1" ? "display-lg" : "display-md", "mt-5 text-balance")}>
        {title}
      </Tag>
      {lede && (
        <p
          data-reveal
          style={{ "--reveal-delay": "160ms" } as CSSProperties}
          className={cn("lede mt-6 max-w-2xl text-pretty", tone === "paper" && "!text-paper-muted")}
        >
          {lede}
        </p>
      )}
    </div>
  );
}

export function PageHero({ eyebrow, title, lede, children }: { eyebrow: string; title: ReactNode; lede?: ReactNode; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden border-b border-line pt-36 pb-16 sm:pt-44 sm:pb-24">
      <div aria-hidden className="bg-grid mask-fade absolute inset-0" />
      <Container className="relative">
        <SectionHeading as="h1" eyebrow={eyebrow} title={title} lede={lede} className="max-w-4xl" />
        {children}
      </Container>
    </section>
  );
}

export function Badge({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn("eyebrow inline-flex items-center rounded-full border border-line-strong px-3 py-1.5 !text-[0.65rem] text-muted", className)}>
      {children}
    </span>
  );
}

export function DraftNotice({ children }: { children: ReactNode }) {
  return (
    <div role="note" className="rounded-2xl border border-accent/40 bg-accent/10 px-5 py-4 text-sm leading-relaxed text-fg">
      <span className="eyebrow mr-2 text-accent-text">Draft</span>
      {children}
    </div>
  );
}
