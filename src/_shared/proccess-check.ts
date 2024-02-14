import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class ProcessIdMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: any) {
    // Get the process ID (PID) of the current worker process
    const processId = process.pid;

    // Append the process ID to the request headers
    // req.headers['x-process-id'] = processId;

    // Optionally, you can log the process ID for debugging purposes
    console.log(`Request handled by process ${processId}`);

    // Call the next middleware or route handler
    next();
  }
}
