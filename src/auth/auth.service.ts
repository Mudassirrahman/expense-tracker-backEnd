import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { secret } from 'src/user/constants/user.constent';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserEntity } from 'src/user/entities/user.entity';
import { UsersService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  private revokedTokens: string[] = [];

  constructor(
    private userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(username);
    if (!user || !(await bcrypt.compare(pass, user.password))) {
      throw new UnauthorizedException();
    }
    const payload = { id: user.id, username: user.username, role: user.role };
    const accessToken = await this.jwtService.signAsync(payload, {
      secret,
      expiresIn: '1h',
    });

    return { accessToken };
  }
  async register(createUserDto: CreateUserDto): Promise<Partial<UserEntity>> {
    const { username, password, role, ...userData } = createUserDto;

    if (role !== 'USER' && role !== 'ADMIN') {
      throw new BadRequestException('Invalid role provided.');
    }

    // Check if the username already exists
    const existingUser = await this.userService.findOne(username);
    if (existingUser) {
      throw new ConflictException('Username already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user with the hashed password
    const user = await this.userService.createUser({
      username,
      password: hashedPassword,
      role,
      ...userData,
    });

    const { password: _, ...result } = user;
    return result;
  }

  async signOut(token: string): Promise<string> {
    this.revokeToken(token);

    return 'Logout successful'; // Return the success message
  }

  private revokeToken(token: string): void {
    this.revokedTokens.push(token); // Add the token to the revoked tokens list
  }

  isTokenRevoked(token: string): boolean {
    return this.revokedTokens.includes(token); // Check if the token is revoked
  }
}
