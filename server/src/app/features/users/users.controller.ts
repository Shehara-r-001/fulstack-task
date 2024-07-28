import {
  Controller,
  Query,
  Get,
  Patch,
  Body,
  ParseIntPipe,
  Param,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { PaginationRequest } from 'src/app/shared/utils/pagination-request';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';
import { PaginatedResponse } from 'src/app/shared/utils/paginated-response';
import { User } from 'src/app/shared/data/users';
import { UpdateUserDTO } from './dto/updateUser.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({
    summary: 'Get users list',
    description: 'Retrieve a paginated list of users',
  })
  @ApiQuery({ name: 'page', required: true, type: Number })
  @ApiQuery({ name: 'pageSize', required: true, type: Number })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved users',
    type: PaginatedResponse<User>,
  })
  getUsers(@Query() paginationRequest: PaginationRequest) {
    return this.usersService.getUsers(paginationRequest);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get user by Id',
    description: 'Retrieve a user by id',
  })
  @ApiParam({ name: 'id', type: 'number', description: 'User ID' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved user',
  })
  getUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getUserByID(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update user points',
    description: 'Update the points of a specific user',
  })
  @ApiParam({ name: 'id', type: 'number', description: 'User ID' })
  @ApiBody({ type: UpdateUserDTO })
  @ApiResponse({
    status: 200,
    description: 'User points updated successfully',
    type: Boolean,
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  updateUserPoints(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDTO: UpdateUserDTO
  ): boolean {
    return this.usersService.updateUserPoints(id, updateUserDTO);
  }
}
