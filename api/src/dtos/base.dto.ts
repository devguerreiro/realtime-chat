import { IsNumber, IsOptional, IsPositive } from 'class-validator';

export class PaginatedQuery {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  limit?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  offset?: number;
}
