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
  In demo mode (no Supabase) we still send them to /auth/sign-in, which
  explains that accounts need a connected backend.
*/
export function GatedLink({ href, onClick, children, ...rest }: GatedLinkProps) {
  const router = useRouter();
  const { user, ready } = useAuthUser();

  function handleClick(event: React.MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);
    if (event.defaultPrevented) return;

    const needsAuth = isSupabaseConfigured() ? !user : true;
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
