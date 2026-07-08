"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ComponentProps } from "react";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { useAuthUser } from "@/lib/use-auth";

type GatedLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  href: string;
};

/*
  Build and example CTAs: signed-out visitors go to sign-in first.
  In demo mode (no Supabase configured) there's no backend to sign in
  against, so links behave exactly as they did before this gate existed —
  gating only kicks in once real accounts are possible.
*/
export function GatedLink({ href, onClick, children, ...rest }: GatedLinkProps) {
  const router = useRouter();
  const { user, ready } = useAuthUser();

  function handleClick(event: React.MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);
    if (event.defaultPrevented) return;

    const needsAuth = isSupabaseConfigured() && !user;
    if (ready && needsAuth) {
      event.preventDefault();
      router.push("/auth/sign-in");
    }
  }

  return (
    <Link href={href} onClick={handleClick} {...rest}>
      {children}
    </Link>
  );
}
