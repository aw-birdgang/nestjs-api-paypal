export class ItemDto {
    recipient_type?: string;
    amount?: Amount;
    note?: string;
    sender_item_id?: string;
    receiver?: string;
    recipient_wallet?: string;
}

export class Amount {
    value?: string;
    currency?: string;
}
