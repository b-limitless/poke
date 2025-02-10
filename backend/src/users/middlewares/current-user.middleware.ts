import {
  NestMiddleware,
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { NextFunction } from 'express';
import { Request, Response } from 'express';
import { UserService } from '../users.service';
import { User } from '../user.schema';
import { Types } from 'mongoose';

declare global {
  namespace Express {
    interface Request {
      currentUser?: User;
    }
  }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private userService: UserService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const { userId } = req?.session || {};

    if (userId) {
      const user = await this.userService.findById(userId);

      req.currentUser = user;
    }

    next();
  }
}
