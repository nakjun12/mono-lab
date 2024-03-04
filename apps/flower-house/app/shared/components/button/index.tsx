import { ButtonHTMLAttributes, FC, ReactNode } from "react";

// ButtonProps 인터페이스 정의
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode; // 버튼 내용
  className?: string; // 추가적인 스타일링을 위한 클래스 이름
}

// Button 컴포넌트
const Button: FC<ButtonProps> = ({ children, className, ...props }) => {
  // className에 기본 스타일을 결합하고, 필요한 경우 추가적인 클래스를 적용합니다.

  return (
    <button
      {...props} // 나머지 props (type, onClick 등)을 버튼에 직접 전달합니다.
      className={className}
    >
      {children}
    </button>
  );
};

export default Button;
