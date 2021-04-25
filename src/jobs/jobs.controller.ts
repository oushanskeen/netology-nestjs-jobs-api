import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpException,
  HttpStatus,
  UseFilters,
  UsePipes,
  CacheKey,
  CacheTTL,
  UseInterceptors,
  CacheInterceptor,
} from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JobDTO } from '../dtos/job.dto';
import { Job } from '../interfaces/job.interface';
import { HttpExceptionFilter } from '../filters/http-exceptions.filter';
import { ValidationExceptionFilter } from '../filters/validation-exceptions.filter';
import { ValidationPipe } from '../pipes/validation.pipe';
import {JobData} from '../decorators/jobdata.decorator';

@Controller('jobs')
//@UsePipes(ValidationPipe)
//@UseFilters(HttpExceptionFilter)
@UseInterceptors(CacheInterceptor)
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}
  @Get()
  @CacheKey('allJobs')
  @CacheTTL(15)
  findAll(): string {
    return 'find all jobs';
  }
  @Get(':id')
  @CacheTTL(30)
  //@UseFilters(HttpExceptionFilter)
  find(@Param('id') id): Promise<Job> {
    //return 'find one job';
    return this.jobsService
      .find(id)
      .then(result => {
        if (result) {
          return result;
        } else {
          throw new HttpException('Job not found', HttpStatus.NOT_FOUND);
        }
      })
      .catch(() => {
        throw new HttpException('Job not found', HttpStatus.NOT_FOUND);
      });
  }
  @Post()
  @UseFilters(new ValidationExceptionFilter())
  //@UsePipes(ValidationPipe)
  //create(/*@Body(ValidationPipe)*/ job: JobDTO): Promise<Job> {
  create(@JobData(ValidationPipe) job: JobDTO): Promise<Job> {
    return this.jobsService.create(job);
  }
  @Put(':id')
  update(@Param('id') id, @Body('job') job: JobDTO): Promise<Job> {
    return this.jobsService.update(id, job);
  }
  @Delete(':id')
  delete(@Param('id') id): Promise<Job> {
    return this.jobsService.delete(id);
  }
}
