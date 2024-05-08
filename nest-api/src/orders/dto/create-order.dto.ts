export class CreateOrderDto {
  items: OrderItemDto[];

  card_hash: string; // Is not right pass the card information to the application because of LGPD :)
}

export class OrderItemDto {
  quantity: number;

  product_id: string;
}
