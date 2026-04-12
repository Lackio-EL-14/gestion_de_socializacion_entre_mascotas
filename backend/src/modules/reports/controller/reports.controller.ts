import { Controller, Get } from '@nestjs/common';
import { ReportsService } from '../service/reports.service';

@Controller('reports')
export class ReportsController {

  constructor(private readonly reportsService: ReportsService) {}

  @Get()
  findAll() {
    return this.reportsService.findAll();
  }

}
