import {AfterViewInit, Component, ElementRef, inject, ViewChild, viewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import {TurtleServiceComponent} from "../turtle-service/turtle-service.component";
import {CardModule} from "primeng/card";

@Component({
  selector: 'app-turtle-view',
  standalone: true,
  imports: [CommonModule, CardModule],
  templateUrl: './turtle-view.component.html',
  styleUrl: './turtle-view.component.css'
})
export class TurtleViewComponent implements AfterViewInit {
  @ViewChild('canvas', { static: false }) canvas!: ElementRef<HTMLCanvasElement>;

  private turtleService = inject(TurtleServiceComponent)

  ngAfterViewInit(): void {
    const ctx = this.canvas.nativeElement.getContext('2d');
    if (!ctx) {
      throw new Error('could not render canvas');
    }
    this.turtleService.initializeContext(ctx);
    this.turtleService.getTurtleState().subscribe(turtle => {
      if (turtle.isVisible) {
        ctx.beginPath();

        const x = turtle.position.x;
        const y = turtle.position.y;

        ctx.arc(x, y, 4, 0, 2 * Math.PI); //body
        ctx.arc(x + 4, y, 2, 0, 2 * Math.PI); //head

        // Draw legs
        ctx.moveTo(x - 2, y + 3);
        ctx.lineTo(x - 4, y + 5); // Bottom left leg
        ctx.moveTo(x + 2, y + 3);
        ctx.lineTo(x + 4, y + 5); // Bottom right leg
        ctx.moveTo(x - 2, y - 4);
        ctx.lineTo(x - 4, y - 5); // Top left leg
        ctx.moveTo(x + 6, y - 2);
        ctx.lineTo(x + 8, y - 4); // Top right leg

        ctx.stroke();
        ctx.fillStyle = turtle.color;
      }
    });
  }
}
