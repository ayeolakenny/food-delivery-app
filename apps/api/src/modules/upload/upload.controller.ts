import {
  Controller,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  ParseUUIDPipe,
  Post,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Auth, AuthUser } from '../auth/decorators/auth.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import type { IAuthUser } from '../auth/auth.types';
import { UploadService } from './upload.service';
import { bad } from '../../utils/error.utils';

@Controller('upload')
export class UploadController {
  constructor(private readonly upload: UploadService) {}

  @Auth()
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @AuthUser() user: IAuthUser,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 10 * 1024 * 1024 })],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.upload.upload(file, user);
  }

  @Auth()
  @Get(':id')
  async getFile(@Param('id', ParseUUIDPipe) id: string) {
    const file = await this.upload.getFile(id);
    return new StreamableFile(file.data, {
      type: file.type,
      length: file.size,
    });
  }
}
