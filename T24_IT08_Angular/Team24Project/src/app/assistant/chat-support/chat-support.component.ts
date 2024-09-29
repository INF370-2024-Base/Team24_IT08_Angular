import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageService } from '../../../services/message.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Component, ViewChild } from '@angular/core';

export interface Message {
  type: string;
  message: string;
}

@Component({
  selector: 'app-chat-support',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './chat-support.component.html',
  styleUrl: './chat-support.component.scss'
})
export class ChatSupportComponent {
  isOpen = false;
  loading = false;
  messages: Message[] = [];
  chatForm = new FormGroup({
    message: new FormControl('', [Validators.required]),
  });
  @ViewChild('scrollMe') private myScrollContainer: any;

  constructor(private messageService: MessageService) {
  }

  openSupportPopup() {
    this.isOpen = !this.isOpen;
  }

  sendMessage() {
    const sentMessage = this.chatForm.value.message!;
    this.loading = true;
    this.messages.push({
      type: 'user',
      message: sentMessage,
    });
    this.chatForm.reset();
    this.scrollToBottom();
    this.messageService.sendMessage(sentMessage).subscribe((response: any) => {
      for (const obj of response) {
        let value
        if (obj.hasOwnProperty('text') ) {
          value = obj['text']
          this.pushMessage(value)

        }
        if (obj.hasOwnProperty('image') ) {
          value = obj['image']
          this.pushMessage(value)
        }
      }
    });
  }

  pushMessage(message:string){
     this.messages.push({
        type: 'client',
        message: message,
      });
      this.scrollToBottom();
  }

  scrollToBottom() {
    setTimeout(() => {
      try {
        this.myScrollContainer.nativeElement.scrollTop =
          this.myScrollContainer.nativeElement.scrollHeight + 500;
      } catch (err) {}
    }, 150);
  }
}

