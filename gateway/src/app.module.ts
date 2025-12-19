import { Module } from '@nestjs/common';

import { ChatModule } from './chat/chat.module';
import { PublisherModule } from './publisher/publisher.module';

@Module({
  imports: [ChatModule, PublisherModule],
})
export class AppModule {}
