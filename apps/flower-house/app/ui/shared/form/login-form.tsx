function LoginForm() {
  return (
    <div className="flex overflow-hidden relative flex-col px-3.5 pt-12 w-full min-h-[932px]">
      <div className="relative self-center mt-24 text-4xl tracking-widest text-center text-emerald-700">
        Flowerfly
      </div>
      <div className="flex relative flex-col items-center py-11 mt-20 w-full border border-emerald-100 border-solid bg-neutral-50 rounded-[45px_45px_0px_0px]">
        <div className="flex flex-col self-stretch px-5 mt-1.5 text-base text-emerald-700">
          <div className="text-2xl font-bold">Log in</div>
          <div className="justify-center items-start py-5 pr-16 pl-4 mt-9 bg-white rounded-lg border border-emerald-100 border-solid leading-[100%] text-zinc-500">
            Email address
          </div>
          <div className="justify-center items-start py-5 pr-16 pl-4 mt-5 whitespace-nowrap bg-white rounded-lg border border-emerald-100 border-solid leading-[100%] text-zinc-500">
            Password
          </div>
          <div className="self-end mt-6 text-xs font-thin whitespace-nowrap">
            <span className="font-light">Forgot your </span>
            <span className="font-bold text-emerald-700">Password</span>
            <span className="font-light"> ? </span>
            <span className="font-bold text-emerald-700">Сlick here</span>
          </div>
        </div>
        <div className="justify-center items-center px-16 py-3.5 mt-7 w-full text-base font-bold text-center text-white whitespace-nowrap bg-green-500 rounded-3xl max-w-[362px]">
          Log in
        </div>
        <div className="flex gap-4 items-center mt-6 max-w-full w-[268px]">
          <div className="flex flex-col flex-1 self-stretch my-auto">
            <div className="shrink-0 h-px bg-emerald-100" />
            <div className="z-10 shrink-0 h-px bg-emerald-100" />
          </div>
          <div className="self-stretch text-xs font-light text-center text-emerald-700">
            Continue with
          </div>
          <div className="flex flex-col flex-1 self-stretch my-auto">
            <div className="shrink-0 h-px bg-emerald-100" />
            <div className="z-10 shrink-0 h-px bg-emerald-100" />
          </div>
        </div>

        <div className="flex gap-4 items-center mt-6 w-full text-xl font-light text-center text-emerald-700 whitespace-nowrap max-w-[362px]">
          <div className="self-stretch my-auto h-px bg-emerald-100 w-[149px]" />
          <div className="self-stretch">OR</div>
          <div className="self-stretch my-auto h-px bg-emerald-100 w-[151px]" />
        </div>
        <div className="justify-center items-center px-16 py-4 mt-6 w-full text-base font-bold text-center text-green-500 whitespace-nowrap bg-gray-100 rounded-3xl border border-green-500 border-solid max-w-[362px]">
          Continue as a guest
        </div>
        <div className="mt-6 text-xs font-bold text-emerald-700 whitespace-nowrap">
          <span className="">Don’t have</span>{" "}
          <span className="font-black">an account</span>
          <span className=""> ?</span>{" "}
          <span className="font-black">Sign up</span>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
