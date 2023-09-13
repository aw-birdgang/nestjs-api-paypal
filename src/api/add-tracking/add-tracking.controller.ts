import {Controller, Get, HttpStatus, Logger, Param, Query, Res} from '@nestjs/common';
import {ApiOkResponse, ApiOperation, ApiTags} from "@nestjs/swagger";
import {Response} from "express";
import {instanceToPlain} from "class-transformer";
import {AddTrackingService} from "./add-tracking.service";

@Controller('v1/add-tracking')
@ApiTags('ADD TRACKING API')
export class AddTrackingController {

    constructor(private readonly addTrackingService: AddTrackingService) {}

    private readonly logger = new Logger(AddTrackingController.name);

    @Get('/:transactionId')
    @ApiOperation({
        summary: '트랙 정보 목록 API',
        description: '트랙 정보 목록 가져 온다.',
    })
    @ApiOkResponse({
        description: '트랙 정보를 조회 한다.',
    })
    async getTracks(
        @Param('transactionId') transactionId: string,  //8MC585209K746392H
        @Res() res: Response,
    ) {
        this.logger.log("getTracks > transactionId :: " + transactionId);
        const response = await this.addTrackingService.getListTrackingInformation(transactionId);
        return res.status(HttpStatus.OK).json(instanceToPlain(response));
    }




}
