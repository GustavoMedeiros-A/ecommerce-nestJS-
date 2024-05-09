import { Repository } from 'typeorm';
import { CreateOrderCommand, Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';

export class OrderRepository extends Repository<Order> {}
