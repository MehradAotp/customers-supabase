import { signOutAction } from "@/app/actions";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { createClient } from "@/utils/supabase/server";

export default async function AuthButton() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!hasEnvVars) {
    return (
      <div className="flex gap-4 items-center" dir="rtl">
        <div>
          <Badge
            variant={"default"}
            className="font-normal pointer-events-none"
          >
            لطفاً فایل .env.local را با anon key و url کامل کنید
          </Badge>
        </div>
        <div className="flex gap-2">
          <Button
            asChild
            size="sm"
            variant={"outline"}
            disabled
            className="opacity-75 cursor-none pointer-events-none"
          >
            <Link href="/sign-in">ورود</Link>
          </Button>
          <Button
            asChild
            size="sm"
            variant={"default"}
            disabled
            className="opacity-75 cursor-none pointer-events-none"
          >
            <Link href="/sign-up">ثبت‌نام</Link>
          </Button>
        </div>
      </div>
    );
  }

  return user ? (
    <div className="flex items-center gap-4" dir="rtl">
      سلام، {user.email}
      <form action={signOutAction}>
        <Button
          type="submit"
          variant={"outline"}
          className="bg-black text-white dark:bg-white dark:text-black"
        >
          خروج
        </Button>
      </form>
    </div>
  ) : (
    <div className="flex gap-2" dir="rtl">
      <Button
        asChild
        size="sm"
        variant={"outline"}
        className="bg-black text-white dark:bg-white dark:text-black"
      >
        <Link href="/sign-in">ورود</Link>
      </Button>
      <Button asChild size="sm" variant={"default"}>
        <Link href="/sign-up">ثبت‌نام</Link>
      </Button>
    </div>
  );
}
