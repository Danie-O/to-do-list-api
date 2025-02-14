/* eslint-disable prettier/prettier */
import { IsOptional, IsString, IsEnum, IsBoolean, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TaskStatus } from "../entities/task.entity";

export class UpdateTaskDto {
    @ApiProperty({ example: 'Learn Nestjs in less than 3 days', description: 'Updated description of the task', required: false })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty({ example: 'completed', description: 'Updated status of the task', enum: TaskStatus, required: false })
    @IsOptional()
    @IsEnum(TaskStatus)
    status?: TaskStatus;

    @ApiProperty({ example: true, description: 'Mark task as deleted', required: false })
    @IsOptional()
    @IsBoolean()
    isDeleted?: boolean;

    @ApiProperty({ example: '2025-03-01T12:00:00Z', description: 'Updated due date for the task', required: false, type: String })
    @IsOptional()
    @IsDate()
    dueDate?: Date;
}