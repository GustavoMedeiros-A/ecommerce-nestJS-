import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { In, Repository } from 'typeorm';
import { OrderRepository } from './orders.repository';
import { Product } from 'src/products/entities/product.entity';
import { ProductRepository } from 'src/products/product.repository';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepository: OrderRepository,
    @InjectRepository(Product) private productRepository: ProductRepository,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const productsIds = createOrderDto.items.map((item) => item.product_id);
    // Catch only the uniqueProductIds :)
    const uniqueProductIds = [...new Set(productsIds)];
    const products = await this.productRepository.findByIds(uniqueProductIds);

    if (products.length !== uniqueProductIds.length) {
      throw new NotFoundException('Error to find some products');
    }

    Order.create({
      client_id: 1,
      items: createOrderDto.items.map((item) => {
        const product = products.find(
          (product) => product.id === item.product_id,
        );
        return {
          price: product.price,
          product_id: item.product_id,
          quantity: item.quantity,
        };
      }),
    });
  }

  findAll() {
    return `This action returns all orders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }
}
