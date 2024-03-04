// Divider.tsx
interface DividerProps {
  text: string;
}

const Divider: React.FC<DividerProps> = ({ text }) => {
  return (
    <div className="flex gap-4 items-center mt-6 text-xl font-light text-center text-emerald-700 whitespace-nowrap">
      <div className="self-stretch my-auto h-px bg-emerald-100 w-1/2" />
      {text}
      <div className="self-stretch my-auto h-px bg-emerald-100 w-1/2" />
    </div>
  );
};

export default Divider;
