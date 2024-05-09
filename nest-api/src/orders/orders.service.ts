import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { In, Repository } from 'typeorm';
import { OrderRepository } from './orders.repository';
import { Product } from 'src/products/entities/product.entity';
import { ProductRepository } from 'src/products/product.repository';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepository: OrderRepository,
    @InjectRepository(Product) private productRepository: ProductRepository,
    private amqpConnection: AmqpConnection,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const productsIds = createOrderDto.items.map((item) => item.product_id);
    // Catch only the uniqueProductIds :)
    const uniqueProductIds = [...new Set(productsIds)];
    const products = await this.productRepository.findByIds(uniqueProductIds);
    console.log(products);
    if (products.length !== uniqueProductIds.length) {
      throw new NotFoundException(
        `Error to find some products; ${productsIds}. Find products: ${products.map((product) => product.id)}`,
      );
    }

    const order = Order.create_orders({
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

    await this.orderRepository.save(order);
    this.amqpConnection.publish('amq.direct', 'OrderCreated', {
      order_id: order.id,
      card_hash: createOrderDto.card_hash,
      total: order.total,
    });
    // Publicar diretamente em uma fila
    // Em um cenario de microserviço, publicar em uma fila seria ruim caso outro microserviço esteja INTERASSADO na messagem
    // Pra nao ter esse problema e o publish Rotear a messagem para varias filas se elas estiverem interessadas
    // AS EXCHANGES vão fazer isso
    return order;
  }

  findAll() {
    return this.orderRepository.find();
  }

  findOne(id: string) {
    return this.orderRepository.findBy({
      id: id,
    });
  }
}
