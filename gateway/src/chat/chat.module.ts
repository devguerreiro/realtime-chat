import { Module } from '@nestjs/common';

import { PublisherModule } from 'src/publisher/publisher.module';

import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';

@Module({
  imports: [PublisherModule],
  providers: [ChatGateway, ChatService],
})
export class ChatModule {}
