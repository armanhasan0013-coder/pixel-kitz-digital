"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, X } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [openedAt, setOpenedAt] = useState(pathname);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Close the menu when the route changes (adjusting state during render).
  if (openedAt !== pathname) {
    setOpenedAt(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const toggle = toggleRef.current;
    document.body.style.overflow = "hidden";
    menuRef.current?.querySelector<HTMLElement>("a")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "Tab" && menuRef.current) {
        const items = menuRef.current.querySelectorAll<HTMLElement>("a, button");
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      toggle?.focus();
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <a
        href="#main"
        className="fixed top-3 left-3 z-[60] -translate-y-20 rounded-full bg-fg px-4 py-2 text-sm text-ink focus:translate-y-0"
      >
        Skip to content
      </a>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500",
          scrolled && !open ? "border-b border-line bg-ink/75 backdrop-blur-xl" : "border-b border-transparent",
        )}
      >
        <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between gap-6 px-5 sm:px-8 lg:h-20 lg:px-12">
          <Link href="/" aria-label="Pixel Kitz Digital — home" className="relative z-10 shrink-0">
            <Logo className="h-9 w-auto lg:h-10" title="Pixel Kitz Digital" />
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {siteConfig.nav.slice(0, 5).map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={cn(
                      "relative rounded-full px-4 py-2 text-sm transition-colors",
                      isActive(item.href) ? "text-fg" : "text-muted hover:text-fg",
                    )}
                  >
                    {item.label}
                    {isActive(item.href) && (
                      <span aria-hidden className="absolute -bottom-0.5 left-1/2 size-1 -translate-x-1/2 rounded-full bg-accent" />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/contact"
              className="hidden text-sm text-muted transition-colors hover:text-fg md:inline-flex lg:px-3"
              aria-current={isActive("/contact") ? "page" : undefined}
            >
              Contact
            </Link>
            <Link
              href="/contact"
              className="btn-sheen group hidden h-11 items-center gap-2 rounded-full bg-fg px-5 text-sm font-medium text-ink transition-colors duration-500 [--btn-hover:var(--color-accent-strong)] hover:text-white sm:inline-flex"
            >
              Start a Project
              <ArrowUpRight aria-hidden className="size-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="relative z-10 grid size-11 place-items-center rounded-full border border-line-strong lg:hidden"
            >
              <span aria-hidden className="flex w-4 flex-col gap-[5px]">
                <span className={cn("h-px w-full bg-fg transition-transform duration-500", open && "translate-y-[3px] rotate-45")} />
                <span className={cn("h-px w-full bg-fg transition-transform duration-500", open && "-translate-y-[3px] -rotate-45")} />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        ref={menuRef}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        hidden={!open}
        className="fixed inset-0 z-40 overflow-y-auto bg-ink lg:hidden"
      >
        <div aria-hidden className="bg-grid absolute inset-0 opacity-60" />
        <div className="relative flex min-h-full flex-col px-5 pt-28 pb-10 sm:px-8">
          <nav aria-label="Mobile">
            <ul className="divide-y divide-line border-y border-line">
              {siteConfig.nav.map((item, i) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className="group flex items-baseline justify-between py-4"
                  >
                    <span className={cn("text-[2rem] leading-none tracking-[-0.04em]", isActive(item.href) ? "text-fg" : "text-fg/80")}>
                      {item.label}
                    </span>
                    <span className="eyebrow text-subtle">0{i + 1}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-auto pt-10">
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="flex h-14 items-center justify-center gap-2 rounded-full bg-fg font-medium text-ink"
            >
              Start a Project <ArrowUpRight aria-hidden className="size-4" />
            </Link>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="mt-3 flex h-12 w-full items-center justify-center gap-2 rounded-full border border-line-strong text-sm text-muted"
            >
              <X aria-hidden className="size-4" /> Close menu
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
