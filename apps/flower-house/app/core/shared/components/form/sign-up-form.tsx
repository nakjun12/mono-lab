import Button from "@/app/core/shared/components/button";
import FormSubmitButton from "@/app/core/shared/components/button/form-submit-button";
import GuestButton from "@/app/core/shared/components/button/guest-button";
import SocialLoginButton from "@/app/core/shared/components/button/social-login-button";
import Divider from "@/app/core/shared/components/divider";
import FormInputField from "@/app/core/shared/components/form/form-Input-field";
import Image from "next/image";

function SignUpForm() {
  return (
    <div className="flex overflow-hidden relative flex-col px-3.5 w-full min-h-[932px]">
      <Image
        loading="lazy"
        src={"/flower-bg.jpg"}
        alt="background image"
        className="object-cover absolute inset-0 size-full"
        width={1920}
        height={1080}
      />
      <div className="flex relative flex-col px-5 py-8 mt-8 w-full bg-neutral-50 rounded-[45px_45px_0px_0px]">
        <div className="text-2xl font-bold text-emerald-700">Sign Up</div>
        {/* 폼 추가 시작 */}
        <form className="flex flex-col gap-5 mt-5">
          <FormInputField type="text" placeholder="Nick Name" />
          <FormInputField type="email" placeholder="Email address" />
          <FormInputField type="password" placeholder="Password" />
          <FormInputField type="password" placeholder="Confirm Password" />

          {/* 제출 버튼 */}
          <FormSubmitButton type="submit">Sign Up</FormSubmitButton>
        </form>
        {/* 폼 추가 끝 */}
        <div className="flex gap-4 items-center self-center mt-6 max-w-full text-xs font-light text-center text-emerald-700 w-[268px]">
          <div className="flex-1 shrink-0 my-auto h-px bg-emerald-100" />
          <div className="self-stretch">Continue with</div>
          <div className="flex-1 shrink-0 my-auto h-px bg-emerald-100" />
        </div>
        <div className="flex gap-5 justify-between px-5">
          <SocialLoginButton src="/google.svg" alt="google icon" />
          <SocialLoginButton src="/apple.svg" alt="apple icon" />
          <SocialLoginButton src="/facebook.svg" alt="facebook icon" />
        </div>
        <Divider text="OR" />
        <GuestButton>Continue as a guest</GuestButton>

        <div className="self-center mt-6 text-xs font-bold text-emerald-700 whitespace-nowrap">
          <span className="">Already have</span>
          <span className=""> account</span>
          <span className="">? </span>
          <Button className="font-black">Log in</Button>
        </div>
      </div>
    </div>
  );
}

export default SignUpForm;
