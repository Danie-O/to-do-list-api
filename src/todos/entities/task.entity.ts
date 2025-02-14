/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, DeleteDateColumn } from "typeorm";
import { ToDoList } from "./todo-list.entity";

export enum TaskStatus {
    PENDING = 'pending',
    COMPLETED = 'completed',
}

@Entity()
export class Task {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    description: string;

    @Column({ type: 'enum', enum: TaskStatus, default: TaskStatus.PENDING })
    status: TaskStatus;

    @Column({ default: false })
    isDeleted: boolean;

    @CreateDateColumn()
    due_date: Date;

    @ManyToOne(() => ToDoList, todoList => todoList.tasks, { onDelete: 'CASCADE' })
    todoList: ToDoList;

    @Column()
    todoListId: string;

    @CreateDateColumn()
    created_at: Date;

    @DeleteDateColumn()
    deleted_at?: Date;
}