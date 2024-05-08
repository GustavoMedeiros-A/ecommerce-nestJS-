import { In, Repository } from 'typeorm';
import { Product } from './entities/product.entity';

export class ProductRepository extends Repository<Product> {
  async findByIds(productsIds: string[]): Promise<Product[]> {
    const products = await this.findBy({
      id: In(productsIds),
    });
    return products;
  }
}
