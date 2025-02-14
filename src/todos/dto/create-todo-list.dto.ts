/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTodoListDto {
    @ApiProperty({ example: 'Daniella\'s To-Do List', description: 'The name of the to-do list' })
    @IsNotEmpty()
    @IsString()
    name: string;
}
  