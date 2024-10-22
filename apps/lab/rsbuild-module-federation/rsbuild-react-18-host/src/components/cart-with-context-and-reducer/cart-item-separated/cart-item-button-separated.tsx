export const CartItemButtonSeparated = ({
  onClick,
  children,
  isParameter = false
}: {
  onClick: () => void;
  children: React.ReactNode;
  isParameter?: boolean;
}) => (
  <button
    type="button"
    className={`px-2 py-1 ${isParameter ? "bg-green-500" : "bg-orange-400"} text-white rounded`}
    onClick={onClick}>
    {children}
  </button>
);
