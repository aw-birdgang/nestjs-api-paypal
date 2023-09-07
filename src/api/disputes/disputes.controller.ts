import {Controller, Get, HttpStatus, Logger, Res} from '@nestjs/common';
import {ApiOkResponse, ApiOperation, ApiTags} from "@nestjs/swagger";
import {Response} from "express";
import {instanceToPlain} from "class-transformer";
import {DisputesService} from "./disputes.service";

@Controller('v1/disputes')
@ApiTags('DISPUTES API')
export class DisputesController {
    constructor(private readonly catalogService: DisputesService) {}

    private readonly logger = new Logger(DisputesController.name);


    @Get()
    @ApiOperation({
        summary: '논쟁 정보 API',
        description: '논쟁 정보 한다.',
    })
    @ApiOkResponse({
        description: '논쟁 정보를 조회 한다.',
    })
    async getProductions(
        @Res() res: Response,
    ) {
        const response = await this.catalogService.getDisputes();
        return res.status(HttpStatus.OK).json(instanceToPlain(response));
    }

}
