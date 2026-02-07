import { IsNotEmpty, IsNumber, IsString, Length } from "class-validator";

export class BookDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  title: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  author: string;

  @IsNumber()
  publishedYear: number;

  @IsString()
  @Length(1, 100)
  genre: string;
}