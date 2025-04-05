import { signUpAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Box, Card } from "@mui/material";

export default async function Signup(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;

  if ("message" in searchParams) {
    return (
      <div className="w-full flex-1 flex items-center h-screen sm:max-w-md justify-center gap-2 p-4">
        <FormMessage message={searchParams} />
      </div>
    );
  }

  return (
    <Card
      sx={{
        maxWidth: 500,
        mx: "auto",
        mt: 8,
        p: 4,
        direction: "rtl",
      }}
    >
      <Box component="form" sx={{ direction: "rtl" }}>
        <h1 className="text-3xl font-medium mb-6">ثبت‌نام در حساب</h1>

        <div className="flex flex-col gap-2 [&>input]:mb-3">
          <Label htmlFor="email">ایمیل</Label>
          <Input name="email" placeholder="ایمیل شما" required />

          <Label htmlFor="password">رمز عبور</Label>
          <Input
            type="password"
            name="password"
            placeholder="رمز عبور شما"
            minLength={6}
            required
          />

          <SubmitButton
            formAction={signUpAction}
            pendingText="در حال ثبت‌نام..."
          >
            ثبت‌نام
          </SubmitButton>

          <FormMessage message={searchParams} />
        </div>

        <p className="text-sm text-foreground mt-4">
          قبلاً حساب دارید؟{" "}
          <Link
            className="text-foreground font-bold no-underline"
            href="/sign-in"
          >
            ورود
          </Link>
        </p>
      </Box>
    </Card>
  );
}
