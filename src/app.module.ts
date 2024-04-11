import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { SchoolModule } from './school/school.module';
import { StudentModule } from './student/student.module';
import { SubjectModule } from './subject/subject.module';
import { StudentSubjectMapModule } from './student-subject-map/student-subject-map.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>{
        console.log(configService)
        return({
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'postgres',
          password: '2003',
          database: 'ForStudent',
          entities: [join(process.cwd(), 'dist/**/*.entity.js')],

        synchronize: true,
        })
      }}),
    SchoolModule,
    StudentModule,
    SubjectModule,
    StudentSubjectMapModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
