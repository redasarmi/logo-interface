import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ConsoleViewComponent} from "../console-view/console-view.component";
import {TurtleViewComponent} from "../../turtle/turtle-view/turtle-view.component";
import {TurtleServiceComponent} from "../../turtle/turtle-service/turtle-service.component";
import {TerminalService} from "primeng/terminal";
import {CardModule} from "primeng/card";
import {ScriptViewComponent} from "../script-view/script-view.component";

@Component({
  selector: 'app-ui-view',
  standalone: true,
  imports: [CommonModule, ConsoleViewComponent, TurtleViewComponent, CardModule, ScriptViewComponent],
  providers: [TurtleServiceComponent, TerminalService],
  templateUrl: './ui-view.component.html',
  styleUrl: './ui-view.component.css'
})
export class UiViewComponent {

  private turtleService = inject(TurtleServiceComponent);

  handleCommandCondition(command: { command: string; respond: (response: string) => void }): void {
    const { command: cmd, respond } = command;

    if (cmd.startsWith('REPETE')) {
      this.handleRepeatCommand(cmd, respond);
    } else {
      this.handleCommand({command: cmd, respond});
    }
  }

  handleCommand(command: { command: string; respond: (response: string) => void }): void {
    const { command: cmd, respond } = command;
    const parts = cmd.split(' ');
    const action = parts[0].toUpperCase();
    const value = parts.length > 1 ? parseInt(parts[1], 10) : null;

    try {
      switch (action) {
        case 'AV': // Move forward
          if (value !== null) this.turtleService.moveForward(value);
          else respond('AV requires a numeric value');
          break;
        case 'RE': // Move backward
          if (value !== null) this.turtleService.moveBackward(value);
          else respond('RE requires a numeric value');
          break;
        case 'TD': // Turn right
          if (value !== null) this.turtleService.turnRight(value);
          else respond('TD requires a numeric value');
          break;
        case 'TG': // Turn left
          if (value !== null) this.turtleService.turnLeft(value);
          else respond('TG requires a numeric value');
          break;
        case 'LC': // Pen up
          this.turtleService.penUp();
          break;
        case 'BC': // Pen down
          this.turtleService.penDown();
          break;
        case 'CT': // Hide turtle
          this.turtleService.hideTurtle();
          break;
        case 'MT': // Show turtle
          this.turtleService.showTurtle();
          break;
        case 'VE': // Clear canvas and reset turtle
          this.turtleService.clear();
          break;
        case 'NETTOIE': // Clear canvas without moving turtle
          this.turtleService.reset();
          break;
        case 'ORIGINE': // Move turtle to origin (center)
          break;
        case 'FCC': // Change pen color
          if (parts.length > 1) this.turtleService.setPenColor(parts[1]);
          else respond('FCC requires a color value');
          break;
        case 'HELP': // Returns all the commands with explanations
          respond(`Here is a list of all commands: \n` +
            `- AV x: Move forward by x pixels \n` +
            `- RE x: Move backward by x pixels \n` +
            `- TD x: Turn right by x degrees \n` +
            `- TG x: Turn left by x degrees \n` +
            `- LC: Lift the pen \n` +
            `- BC: Put the pen down \n` +
            `- CT: Hide the turtle \n` +
            `- MT: Show the turtle \n` +
            `- VE: Clear the canvas and reposition the turtle at the center \n` +
            `- NETTOIE: Clear the canvas without moving the turtle \n` +
            `- ORIGINE: Reposition the turtle at the center \n` +
            `- FCC x: Change the pen color to x (x is a color as string) \n` +
            `- REPETE x [commands]: Repeat the commands x times \n` +
            `- HELP: Gives a list of commands \n`);
          break;
        default:
          respond(`Error: Unknown command "${action}"`);
      }
    } catch (error) {
      respond(`error: ${error}`);
    }
  }

  private handleRepeatCommand(cmd: string, respond: (response: string) => void): void {
    const repeatRegex = /REPETE (\d+) \[(.+)\]/;
    const match = cmd.match(repeatRegex);

    if (match) {
      const times = parseInt(match[1], 10);
      const commandsBlock = match[2].split('] [').join(' ').split(' ');

      for (let i = 0; i < times; i++) {
        for (let j = 0; j < commandsBlock.length; j += 2) {
          const action = commandsBlock[j];
          const valueStr = commandsBlock[j + 1];

          this.handleCommand({ command: `${action} ${valueStr}`, respond });
        }
      }
    } else {
      respond('Error: Invalid REPETE command format.');
    }
  }
}

