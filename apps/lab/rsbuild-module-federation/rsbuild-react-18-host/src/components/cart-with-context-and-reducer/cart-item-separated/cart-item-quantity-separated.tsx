type CartItemQuantitySepartedProps = {
  quantity: number;
};

export const CartItemQuantitySeparted = ({
  quantity
}: Readonly<CartItemQuantitySepartedProps>) => <span>{quantity}</span>;
