export class InitiatePayoutsHeadersDto {
  'PayPal-Request-Id'?: string;
  Prefer?: 'return=minimal' | 'return=representation';
}
