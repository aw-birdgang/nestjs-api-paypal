import {SenderBatchHeaderDto} from "./sender_batch_header.dto";

export class PayoutsResponseDto {
    sender_batch_header?: SenderBatchHeaderDto;
    payout_batch_id?: string;
    batch_status?: string;
}
