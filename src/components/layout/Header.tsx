"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { Logo, Wordmark } from "@/components/brand/Logo";
import { whatsapp } from "@/lib/whatsapp";

const ENLACES = [
  { href: "/carta/", label: "La carta" },
  { href: "/#el-lugar", label: "El lugar" },
  { href: "/#donde-estamos", label: "Cómo llegar" },
] as const;

export function Header() {
  const pathname = usePathname();

  return (
    <header
      className="sticky top-0 border-b border-line bg-paper/92 backdrop-blur-sm"
      style={{ zIndex: "var(--z-header)", height: "var(--header-h)" }}
    >
      <div className="shell flex h-full items-center justify-between gap-4">
        <Link
          href="/"
          className="flex items-center gap-2.5 rounded-sm"
          aria-label="La Cafebrería UIO — inicio"
        >
          <Logo size={40} priority />
          <Wordmark className="hidden sm:block" />
        </Link>

        <nav aria-label="Principal" className="hidden items-center gap-7 md:flex">
          {ENLACES.map((e) => {
            const activo = e.href.startsWith("/carta") && pathname.startsWith("/carta");
            return (
              <Link
                key={e.href}
                href={e.href}
                className="nav-link"
                {...(activo ? { "aria-current": "page" as const } : {})}
              >
                {e.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/carta/" className="btn btn-ghost btn-sm md:hidden">
            La carta
          </Link>
          <a
            href={whatsapp("general")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-sm hidden sm:inline-flex"
          >
            <MessageCircle size={17} aria-hidden="true" />
            WhatsApp
          </a>
        </div>
      </div>
    </header>
  );
}
