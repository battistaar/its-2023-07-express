import { IsInt, Min, Max, IsMongoId } from "class-validator";
import { Type } from 'class-transformer';

export class AddCartItemDTO {
  @IsMongoId()
  productId: string;

  @IsInt()
  @Min(1)
  @Max(10)
  @Type(() => Number)
  quantity: number;
}

export class UpdateQuantityDTO {
  @IsInt()
  @Min(1)
  @Max(10)
  quantity: number;
}