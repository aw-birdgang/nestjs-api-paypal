import { IsArray, IsNotEmpty, IsOptional } from "class-validator";
import {PaypalPayerDto} from "../paypal-payer.dto";
import {PurchaseUnitRequestDto} from "../purchase-unit-request.dto";
import {PaypalOperationDto} from "../common";

export class AllowedValueToPatchOrderDto {

  @IsOptional()
  intent?: 'CAPTURE' | 'AUTHORIZE';


  @IsOptional()
  payer?: PaypalPayerDto;

  @IsArray()
  @IsOptional()
  purchase_units?: PurchaseUnitRequestDto[];
}

export class UpdatePaypalOrderDto {

  @IsNotEmpty()
  op: PaypalOperationDto;

  @IsOptional()
  path?: string;

  @IsOptional()
  value?: any;

  @IsOptional()
  from?: string;
}
