/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEnum, IsDate } from 'class-validator';
import { TaskStatus } from "../entities/task.entity";

/* eslint-disable prettier/prettier */
export class CreateTaskDto {
    @ApiProperty({ example: 'Learn Nestjs', description: 'Description of the task' })
    @IsNotEmpty()
    @IsString()
    description: string;

    @ApiProperty({ example: 'pending', description: 'Indicates the current status of the task' })
    @IsEnum(TaskStatus)
    status?: TaskStatus;

    @ApiProperty({ example: '2025-02-14T18:03:35.474Z', description: 'Due date for the task, as specified by the user' })
    @IsNotEmpty()
    @IsDate()
    dueDate: Date;

    @ApiProperty({ example: 'uuid-of-todo-list', description: 'ID of the associated to-do list' })
    @IsNotEmpty()
    todoListId: string;
}