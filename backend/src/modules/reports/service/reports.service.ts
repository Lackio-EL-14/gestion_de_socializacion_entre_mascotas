import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reports } from '../entities/reports.entity';

@Injectable()
export class ReportsService {

  private readonly logger = new Logger(ReportsService.name);

  constructor(
    @InjectRepository(Reports)
    private reportesRepository: Repository<Reports>,
  ) {}

  async findAll(): Promise<Reports[]> {
    
    this.logger.log(`[AUDIT-REPORTS] Consulta global de reportes ejecutada en el sistema.`);

    const reportes = await this.reportesRepository.find();

    this.logger.log(`[AUDIT-REPORTS] Total de reportes obtenidos: ${reportes.length}`);

    return reportes;
  }

}
