import {ItemDto} from "./item.dto";
import {SenderBatchHeaderDto} from "./sender_batch_header.dto";

export class CreatePayoutsDto {
  items?: ItemDto[];
  sender_batch_header?: SenderBatchHeaderDto;
}
