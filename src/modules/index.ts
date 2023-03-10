import { AuthModule } from './auth/auth.module';
import { FileModule } from './file/file.module';
import { GlobalModule } from './global';
import { PostModule } from './post/post.module';
import { ProjectModule } from './project/project.module';
import { TagModule } from './tag/tag.module';
import { UserModule } from './user/user.module';

export const Modules = [GlobalModule, PostModule, TagModule, FileModule, ProjectModule, AuthModule, UserModule];
