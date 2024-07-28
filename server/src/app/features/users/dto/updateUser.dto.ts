import { IsInt, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDTO {
  // @ApiProperty({
  //   description: 'ID of the user to update',
  //   type: Number,
  //   maximum: 30,
  // })
  // @IsNotEmpty()
  // @IsInt()
  // id: number;

  @ApiProperty({
    description: 'new points value for the user',
    type: Number,
    maximum: 100,
  })
  @IsNotEmpty()
  @IsInt()
  points: number;
}
