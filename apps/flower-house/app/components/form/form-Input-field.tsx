import { FC } from "react";

// FormInputField.tsx
interface FormInputFieldProps extends React.HTMLProps<HTMLInputElement> {
  // 필요한 경우 여기에 추가적인 프로퍼티를 선언할 수 있습니다.
}
const FormInputField: FC<FormInputFieldProps> = ({ type, placeholder }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="justify-center items-start py-5 pr-16 pl-4 bg-white rounded-lg border border-emerald-100 border-solid leading-[100%]"
    />
  );
};

export default FormInputField;
