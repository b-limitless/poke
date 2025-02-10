import {
    BadRequestException,
    Injectable,
    NotFoundException,
  } from '@nestjs/common';
  import { UserService } from './users.service';
  import { randomBytes, scrypt as _scrypt } from 'crypto';
  import { promisify } from 'util';
  
  const scrypt = promisify(_scrypt);
  
  @Injectable()
  export class AuthService {
    constructor(private userService: UserService) {}
  
    async signup(email: string, password: string, ) {
      // Check if email is already in use
      const existingUser = await this.userService.findByEmail(email);
      if (existingUser) {
        throw new BadRequestException('Email already registered');
      }
  
      // Generate a salt
      const salt = randomBytes(8).toString('hex');
      
      // Hash the salt and the password together
      const hash = (await scrypt(password, salt, 32)) as Buffer;
      
      // Concatenate salt and hash to store in database
      const result = salt + '.' + hash.toString('hex');
      
      // Clear out the original password variable (optional, for security)
      password = '';
  
      // Create a new user and save it
      const user = await this.userService.createUser({
        email,
        password: result,
      });
  
      return user;
    }
  
    async signin(email: string, password: string) {
      const user = await this.userService.findByEmail(email);
      if (!user) {
        throw new NotFoundException('Invalid email or password');
      }
  
      const [salt, storedHash] = user.password.split('.');
  
      // Hash the password provided by user
      const hash = (await scrypt(password, salt, 32)) as Buffer;
  
      if (storedHash !== hash.toString('hex')) {
        throw new BadRequestException('Invalid email or password');
      }
  
      return user;
    }
  }
  