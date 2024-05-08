import {
  ArrayNotEmpty,
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
export class CreateOrderDto {
  @ArrayNotEmpty()
  @ValidateNested({ each: true }) // Validate each item
  @Type(() => OrderItemDto)
  items: OrderItemDto[];

  @MaxLength(255)
  @IsNotEmpty()
  @IsString()
  card_hash: string; // Is not right pass the card information to the application because of LGPD :)
}

export class OrderItemDto {
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  quantity: number;

  @IsNotEmpty()
  @IsString()
  product_id: string;
}
