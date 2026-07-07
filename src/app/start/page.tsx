import { redirect } from "next/navigation";

/* Onboarding lives inline on the landing page now. */
export default function StartPage() {
  redirect("/");
}
