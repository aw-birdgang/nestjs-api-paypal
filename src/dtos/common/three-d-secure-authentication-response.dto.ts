import {PaypalAuthenticationStatusDto} from "./paypal-authentication-status.dto";
import {PaypalEnrollmentStatusDto} from "./paypal-enrollment-status.dto";

export class ThreeDSecureAuthenticationResponseDto {
  // The outcome of the issuer's authentication.
  authentication_status: PaypalAuthenticationStatusDto;
  // Status of authentication eligibility.
  enrollment_status: PaypalEnrollmentStatusDto;
}
