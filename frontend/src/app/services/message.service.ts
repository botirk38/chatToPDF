import { Injectable } from '@angular/core';
import { Coordinates, MessageCard } from '../models/MessageCard';
import { LayoutService } from './layout.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(private layoutService: LayoutService) {}

  messageMap: Map<string, MessageCard> = new Map();
  messages: MessageCard[] = [];
  averageMessageSize = { x: 400, y: 272 };
  activeMessageId = new BehaviorSubject<string | null>(null);

  addMessageParent(
    message: string,
    messageTopic: string,
    position: Coordinates
  ) {
    const id = this.generateId();
    const messageCard: MessageCard = {
      messageTopic,
      message,
      id,
      position,
      parentId: null,
      children: []
    };
    this.messageMap.set(id, messageCard);
    this.messages.push(messageCard);
  }

  addMessageChild(
    message: string,
    messageTopic: string,
    parentId: string,
    position: Coordinates
  ) {
    const id = this.generateId();
    const messageCard: MessageCard = {
      messageTopic,
      message,
      id,
      position,
      parentId,
      children: [],
    };
  
    const parent = this.messageMap.get(parentId);
    if (parent) {
      parent.children.push(id);
    }
    this.messageMap.set(id, messageCard);
    this.messages.push(messageCard);
  }

  generateId(): string {
    return Math.random().toString(36);
  }

  onMessageReceived(buttonClicked: string) {
  
   const newPos = this.layoutService.calculatePosition(buttonClicked);

   this.addMessageParent(buttonClicked, "user", newPos)
  }
}
