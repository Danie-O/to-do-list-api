/* eslint-disable prettier/prettier */
import { Controller, Body, Param, Get, Post, Patch, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { TodosService } from './todos.service';
import { CreateTodoListDto } from './dto/create-todo-list.dto';
import { UpdateTodoListDto } from './dto/update-todo-list.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';


@ApiTags('To-Do Lists')
@Controller('todos')
export class TodosController {
    constructor(private todosService: TodosService) {}

    // --- TO-DO LIST CRUD ---
    @Post()
    @ApiOperation({ summary: 'Create a new to-do list' })
    @ApiBody({ type: CreateTodoListDto })
    @ApiResponse({ status: 201, description: 'To-Do List created successfully' })
    createTodo(@Body() createTodoDto: CreateTodoListDto) {
        return this.todosService.createTodoList(createTodoDto);
    }

    @Get('user/:userId')
    @ApiOperation({ summary: 'Get all to-do lists for a user' })
    @ApiParam({ name: 'userId', type: String, description: 'ID of the user' })
    @ApiResponse({ status: 200, description: 'List of to-do lists retrieved successfully' })
    getAllTodos(@Param('userId') userId: string) {
        return this.todosService.getTodoLists(userId);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a to-do list by its ID' })
    @ApiParam({ name: 'id', type: String, description: 'ID of the to-do list' })
    @ApiResponse({ status: 200, description: 'To-Do List retrieved successfully' })
    @ApiResponse({ status: 404, description: 'To-Do List not found' })
    getTodosById(@Param('id') id:string) {
        return this.todosService.getTodoListById(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update a to-do list' })
    @ApiParam({ name: 'id', type: String, description: 'ID of the to-do list' })
    @ApiBody({ type: UpdateTodoListDto })
    @ApiResponse({ status: 200, description: 'To-Do List updated successfully' })
    updateTodo(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoListDto) {
        return this.todosService.updateTodoList(id, updateTodoDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a to-do list' })
    @ApiParam({ name: 'id', type: String, description: 'ID of the to-do list' })
    @ApiResponse({ status: 200, description: 'To-Do List deleted successfully' })
    deleteTodo(@Param('id') id: string) {
        return this.todosService.deleteTodoList(id);
    }


    // --- TASK CRUD ---
    @Post('/:todoListId/tasks')
    @ApiOperation({ summary: 'Add a new task to a to-do list' })
    @ApiParam({ name: 'todoListId', type: String, description: 'ID of the to-do list' })
    @ApiBody({ type: CreateTaskDto })
    @ApiResponse({ status: 201, description: 'Task added successfully' })
    createTask(@Param('todoListId') todoListId: string, @Body() createTaskDto: CreateTaskDto) {
        return this.todosService.createTask(todoListId, createTaskDto);
    }

    @Get('/:todoListId/tasks')
    @ApiOperation({ summary: 'Get all tasks in a to-do list' })
    @ApiParam({ name: 'todoListId', type: String, description: 'ID of the to-do list' })
    @ApiResponse({ status: 200, description: 'Tasks retrieved successfully' })
    getTasksByTodoList(@Param('todoListId') todoListId: string) {
        return this.todosService.getTasksByTodoList(todoListId);
    }

    @Get('/tasks/:id')
    @ApiOperation({ summary: 'Get a task by ID' })
    @ApiParam({ name: 'id', type: String, description: 'ID of the task' })
    @ApiResponse({ status: 200, description: 'Task retrieved successfully' })
    @ApiResponse({ status: 404, description: 'Task not found' })
    getTaskById(@Param('id') id: string) {
        return this.todosService.getTaskById(id);
    }

    @Patch('/tasks/:id')
    @ApiOperation({ summary: 'Update a task' })
    @ApiParam({ name: 'id', type: String, description: 'ID of the task' })
    @ApiBody({ type: UpdateTaskDto })
    @ApiResponse({ status: 200, description: 'Task updated successfully' })
    updateTask(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
        return this.todosService.updateTask(id, updateTaskDto);
    }

    @Delete('/tasks/:id')
    @ApiOperation({ summary: 'Soft delete a task' })
    @ApiParam({ name: 'id', type: String, description: 'ID of the task' })
    @ApiResponse({ status: 200, description: 'Task soft deleted successfully' })
    softDeleteTask(@Param('id') id: string) {
        return this.todosService.softDeleteTask(id);
    }
}
