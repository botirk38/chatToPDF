import { Injectable } from '@angular/core';
import { MessageCard } from '../models/MessageCard';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  messageMap: Map<string, MessageCard> = new Map();
  messages: MessageCard[] = [];


  addMessage(message: string, messageTopic: string, parentId: string | null, position: { x: number; y: number; }) {
    const id = this.generateId();
    const messageCard: MessageCard = {
      messageTopic,
      message,
      parentId,
      id,
      position
    }
    this.messageMap.set(id, messageCard);
    this.messages.push(messageCard);
  }

  generateId(): string {
    return Math.random().toString(36);
  }



  constructor() { }
}
