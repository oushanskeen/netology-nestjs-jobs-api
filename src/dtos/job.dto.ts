import { IsString, IsInt } from 'class-validator';

export class JobDTO {
  @IsString()
  readonly title: string;

  @IsInt()
  readonly salary: string;
}
