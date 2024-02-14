import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Welcome Employee Manager!';
  }
  getHello2(): any {
    let num = 0;
    for (let index = 0; index < 100000; index++) {
      num++;
      for (let j = 0; j < 100000; j++) {
        num--;
      }
      for (let k = 0; k < 100000; k++) {
        num++;
      }
    }
    return { num };
  }
}
