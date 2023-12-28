import { Controller, Get } from '@nestjs/common';
import { Public } from '../auth/decorators/public.decorator';

@Controller('')
export class HelloController {

    @Public()
    @Get()
    helloWorld(): string {
      return 'Hello world';
    }
}
