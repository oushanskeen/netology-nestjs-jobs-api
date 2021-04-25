import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JobsModule } from './jobs/jobs.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    JobsModule,
    MongooseModule.forRoot('mongodb://loclahost:27017/jobsdb'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
