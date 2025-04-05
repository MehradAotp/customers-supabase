import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Box } from "@mui/material";
import Link from "next/link";

export default async function Login(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100%",
        direction: "rtl",
      }}
    >
      <form
        className="flex flex-col w-full max-w-md p-8 border rounded-xl
                 bg-white text-black border-gray-300
                 dark:bg-zinc-900 dark:text-white dark:border-gray-600
                 shadow-md"
      >
        <h1 className="text-3xl font-medium mb-6">ورود به حساب</h1>

        <div className="flex flex-col gap-2 [&>input]:mb-3">
          <Label htmlFor="email">ایمیل</Label>
          <Input name="email" placeholder="ایمیل شما" required />

          <Label htmlFor="password">رمز عبور</Label>
          <Input
            type="password"
            name="password"
            placeholder="رمز عبور شما"
            required
          />

          <Link
            className="text-xs text-foreground no-underline self-start my-1"
            href="/forgot-password"
          >
            رمز عبور را فراموش کرده‌اید؟
          </Link>

          <SubmitButton
            pendingText="در حال ورود به حساب..."
            formAction={signInAction}
          >
            ورود
          </SubmitButton>

          <p className="text-sm text-foreground">
            حساب کاربری ندارید؟{" "}
            <Link
              className="text-foreground font-bold no-underline"
              href="/sign-up"
            >
              ثبت‌نام کنید
            </Link>
          </p>

          <FormMessage message={searchParams} />
        </div>
      </form>
    </Box>
  );
}
