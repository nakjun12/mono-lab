"use client";

// FormSubmitButton.tsx
interface FormSubmitButtonProps {
  children: React.ReactNode;
  onClick?: () => void; // 필요에 따라 onClick 이벤트 핸들러를 추가할 수 있습니다.
  type?: "submit" | "button";
}

const FormSubmitButton: React.FC<FormSubmitButtonProps> = ({
  children,
  onClick,
  type = "submit"
}) => {
  return (
    <button
      type={type}
      className="justify-center items-center px-16 py-3.5 mt-6 font-bold text-center text-white whitespace-nowrap bg-green-500 rounded-3xl"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default FormSubmitButton;
