import { forgotPasswordAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Box } from "@mui/material";
import Link from "next/link";

export default async function ForgotPassword(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  return (
    <>
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
        <form className="flex-1 flex flex-col w-full gap-2 text-foreground [&>input]:mb-6 min-w-64 max-w-64 mx-auto">
          <div>
            <h1 className="text-2xl font-medium">بازیابی رمز عبور</h1>
          </div>
          <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
            <Label htmlFor="email">ایمیل</Label>
            <Input name="email" placeholder="you@example.com" required />
            <SubmitButton formAction={forgotPasswordAction}>
              بازیابی رمز عبور
            </SubmitButton>
            <p className="text-sm text-secondary-foreground">
              قبلا حساب کاربری دارید؟{" "}
              <Link className="text-primary underline" href="/sign-in">
                ورود
              </Link>
            </p>
            <FormMessage message={searchParams} />
          </div>
        </form>
      </Box>
    </>
  );
}
