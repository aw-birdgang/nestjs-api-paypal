import { Length, Matches } from "class-validator";
import {LiabilityShiftEnumsDto} from "./liability-shift-enums.dto";
import {ThreeDSecureAuthenticationResponseDto} from "./three-d-secure-authentication-response.dto";

export class PaypalAuthenticationResponseDto {

  // Liability shift indicator. The outcome of the issuer's authentication.
  @Matches(/^[0-9A-Z_]+$/)
  @Length(1, 255)
  liability_shift: LiabilityShiftEnumsDto;

  // Results of 3D Secure Authentication.
  three_d_secure: ThreeDSecureAuthenticationResponseDto;
}
