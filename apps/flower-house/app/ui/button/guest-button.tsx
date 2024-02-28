"use client";

// GuestButton.tsx
interface GuestButtonProps {
  children: React.ReactNode;
  onClick?: () => void; // 필요에 따라 onClick 이벤트 핸들러를 추가할 수 있습니다.
}

const GuestButton: React.FC<GuestButtonProps> = ({ children, onClick }) => {
  return (
    <button
      className="justify-center items-center md:px-16 py-4 mt-6 font-bold text-center text-green-500 whitespace-nowrap bg-gray-100 rounded-3xl border border-green-500 border-solid"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default GuestButton;
