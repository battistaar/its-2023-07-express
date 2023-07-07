import { IsNumber, Min, IsOptional, IsString } from "class-validator";
import { Type } from 'class-transformer';
import { IsGreaterThan } from "../../utils/greater-than.validator";

export class QueryProductDTO {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  minPrice: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @IsGreaterThan('minPrice', {
    message: 'maxPrice should be greater than minPrice',
  })
  @Type(() => Number)
  maxPrice: number;
}