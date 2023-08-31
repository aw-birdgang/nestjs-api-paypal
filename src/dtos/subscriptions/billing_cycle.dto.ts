export class BillingCycleDto {
    frequency?: Frequency;
    tenure_type?: string;
    sequence?: number;
    total_cycles?: number;
    pricing_scheme?: PricingScheme;
}

export class PricingScheme {
    fixed_price?: FixedPrice;
}

export class Frequency {
    interval_unit: string;
    interval_count: number
}

export class FixedPrice {
    value?: string;
    currency_code?: string;
}
