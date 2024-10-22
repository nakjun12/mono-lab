interface ItemInfoSeparatedProps {
  name: string;
  price: number;
}

export const ItemInfoSeparated = ({
  name,
  price
}: Readonly<ItemInfoSeparatedProps>) => (
  <div>
    <h2 className="text-lg font-semibold">{name}</h2>
    <p> {price.toLocaleString()}원 </p>
  </div>
);
