import type { Metadata } from "next";
import { AuthForm } from "../_components/auth-form";

export const metadata: Metadata = {
  title: "Create account",
  robots: { index: false },
};

export default async function SignUpPage({
  searchParams,
}: {
  searchParams: Promise<{ university?: string; discipline?: string }>;
}) {
  const params = await searchParams;
  return (
    <div className="mx-auto flex min-h-[70vh] w-full max-w-sm flex-col justify-center px-4 py-12">
      <AuthForm
        mode="sign-up"
        initialUniversitySlug={params.university}
        initialDiscipline={params.discipline}
      />
    </div>
  );
}
