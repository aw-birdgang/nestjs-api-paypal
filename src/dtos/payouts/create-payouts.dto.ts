import {SenderBatchHeaderDto} from "@app/dtos/payouts/sender_batch_header.dto";
import {ItemDto} from "@app/dtos/payouts/item.dto";

export class CreatePayoutsDto {
  items?: ItemDto[];
  sender_batch_header?: SenderBatchHeaderDto;
}
