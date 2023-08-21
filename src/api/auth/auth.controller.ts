import {Controller, Logger, Post} from '@nestjs/common';
import {ApiOperation, ApiTags} from "@nestjs/swagger";
import {AuthService} from "@app/api/auth/auth.service";

@Controller('v1/auth')
@ApiTags('AUTH API')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    private readonly logger = new Logger(AuthController.name);

    @Post()
    @ApiOperation({
        summary: '유저 토큰 생성 API',
        description: '유저 토큰 생성 한다.',
    })
    async getAccessToken(): Promise<any> {
        return this.authService.getAccessToken();
    }
}
