/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ToDoList } from './entities/todo-list.entity';
import { CreateTodoListDto } from './dto/create-todo-list.dto';
import { UpdateTodoListDto } from './dto/update-todo-list.dto';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(ToDoList)
    private todoListRepository: Repository<ToDoList>,
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  // Create a new to-do list
  async createTodoList(createTodoListDto: CreateTodoListDto): Promise<ToDoList> {
    const todoList = this.todoListRepository.create(createTodoListDto);
    return this.todoListRepository.save(todoList);
  }

  // Retrieve all to-do lists for a user
  async getTodoLists(userId: string): Promise<ToDoList[]> {
    return this.todoListRepository.find({ where: { userId } });
  }

  // Retrieve a specific to-do list by ID
  async getTodoListById(id: string): Promise<ToDoList> {
    const todoList = await this.todoListRepository.findOne({ 
      where: { id },
      relations: ['tasks']
    });

    if (!todoList) {
      throw new NotFoundException('To-Do List not found');
    }

    return todoList;
  }

  // Update a to-do list
  async updateTodoList(id: string, updateTodoListDto: UpdateTodoListDto): Promise<ToDoList> {
    await this.todoListRepository.update(id, updateTodoListDto);
    return this.getTodoListById(id);
  }

  // Delete a to-do list
  async deleteTodoList(id: string): Promise<void> {
    const result = await this.todoListRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('To-Do List not found');
    }
  }


  // Add a new task to a to-do list
  async createTask(todoListId: string, createTaskDto: CreateTaskDto): Promise<Task> {
    const todoList = await this.todoListRepository.findOne({ where: { id: todoListId } });

    if (!todoList) {
        throw new NotFoundException('To-Do List not found');
    }

    const task = this.taskRepository.create({...createTaskDto, todoList});
    return this.taskRepository.save(task);
  }

  // Retrieve all tasks for a specific to-do list
  async getTasksByTodoList(todoListId: string): Promise<Task[]> {
    return this.taskRepository.find({ 
        where: { 
            todoListId,
            isDeleted: false 
        },
        relations: ['todoList']
    });
  }

  // Retrieve a specific task by ID
  async getTaskById(id: string): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id, isDeleted: false } });
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }

  // Update a task
  async updateTask(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    await this.taskRepository.update(id, updateTaskDto);
    return this.getTaskById(id);
  }

  // Soft delete a task
  async softDeleteTask(id: string): Promise<{message: string}> {
    const result = await this.taskRepository.update(id, { isDeleted: true });
    if (result.affected === 0) throw new NotFoundException('Task not found');

    return { message: "Task soft deleted successfully" };
  }
}
