export class PaymentPreferences {
    auto_bill_outstanding?: boolean;
    setup_fee?: SetupFee;
    setup_fee_failure_action?:string;
    payment_failure_threshold?:number;
}

export class SetupFee {
    value?:string;
    currency_code?:string;
}
