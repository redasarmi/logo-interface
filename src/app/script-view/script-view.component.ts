import {Component, EventEmitter, inject, OnInit, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {InputTextareaModule} from "primeng/inputtextarea";
import { FileUploadModule } from 'primeng/fileupload';


@Component({
  selector: 'app-script-view',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, InputTextareaModule, FileUploadModule ],
  templateUrl: './script-view.component.html',
  styleUrl: './script-view.component.css'
})
export class ScriptViewComponent {

  formGroup: FormGroup = new FormGroup({
    scriptInput: new FormControl('', Validators.required)
  });

  @Output() commandEntered = new EventEmitter<{ command: string, respond: (response: string) => void }>();


  executeCommands(): void {
    const commands = this.formGroup.get('scriptInput')?.value.split('\n');
    this.commandEntered.emit({
      command : "VE",
      respond: (response: string) => null
    });
    commands.forEach((command: string) => {
      if (command.trim() !== '') {
        this.commandEntered.emit({
          command,
          respond: (response: string) => null
        });
      }
    });
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      if (!file.name.endsWith('.txt')) {
        alert('File uploaded must be .txt');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.formGroup.patchValue({ scriptInput: e.target.result });
        this.executeCommands();
      };
      reader.readAsText(file);
    }
  }
}
