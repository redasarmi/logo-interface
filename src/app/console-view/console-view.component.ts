import {Component, EventEmitter, inject, OnInit, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import {TerminalModule, TerminalService} from 'primeng/terminal';

@Component({
  selector: 'app-console-view',
  standalone: true,
  imports: [CommonModule, FormsModule, TerminalModule],
  providers: [TerminalService],
  templateUrl: './console-view.component.html',
  styleUrl: './console-view.component.css'
})
export class ConsoleViewComponent implements OnInit {
  private terminalService = inject(TerminalService);

  @Output() commandEntered = new EventEmitter<{ command: string, respond: (response: string) => void }>();

  ngOnInit(): void {
    this.terminalService.commandHandler.subscribe(command => {
      this.commandEntered.emit({
        command,
        respond: (response) => {
          this.terminalService.sendResponse(response)
      }
      });
    });
  }
}
