import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';

// PartialTypes diz que você pode mandar somente um CAMPO
export class UpdateProductDto extends PartialType(CreateProductDto) {}
