import { FileModule } from './file/file.module';
import { GlobalModule } from './global';
import { PostModule } from './post/post.module';
import { TagModule } from './tag/tag.module';

export const Modules = [GlobalModule, PostModule, TagModule, FileModule];
