import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './sql/users/users.module';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './sql/users/user.entity';
import { Profile } from './sql/profiles/profile.entity';

import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UserResolver } from './user/user.resolver';
import { Products } from './sql/product/product.entity';
import { Category } from './sql/category/category.entity';
import { CategoryResolver } from './category/category.resolver';
import { ProductResolver } from './product/product.resolver';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { JwtService } from '@nestjs/jwt';
import { join } from 'path';
import { MailModule } from './sql/mail/mail.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';


@Module({
  // imports: [MongooseModule.forRoot('mongodb://127.0.0.1:27017/demo_cn'), UsersModule, ProductsModule],
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com', // Máy chủ SMTP (thay bằng máy chủ thực tế)
        port: 587,               // Cổng SMTP
        secure: false,           // false nếu không sử dụng TLS, true nếu có
        auth: {
          user: '', // Tài khoản email
          pass: '',   // Mật khẩu email
        },
      },
      defaults: {
        from: '"No Reply" <noreply@example.com>', // Địa chỉ email mặc định
      },
      template: {
        dir: join(__dirname, '/templates'), // Thư mục chứa templates
        adapter: new EjsAdapter(),
        options: {
          strict: true,
        },
      },
    })
    ,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      // playground: false,
      autoSchemaFile: 'schema.gql',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'admin',
      database: 'nest_typeorm_db',
      entities: [User, Profile, Products, Category],
      synchronize: true,
    }),
    UsersModule, ProductModule, CategoryModule, MailModule
  ],
  controllers: [AppController],
  providers: [AppService, JwtService],
})
export class AppModule {}