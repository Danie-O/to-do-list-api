/* eslint-disable prettier/prettier */
import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTodoListDto {
    @ApiProperty({ example: 'Daniella\'s Updated To-Do List', description: 'Updated name of the to-do list', required: false })
    @IsOptional()
    @IsString()
    name?: string;
}
  