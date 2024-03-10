import { Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

export interface Point {
  readonly x: number;
  readonly y: number;
}

export interface Turtle {
  position: Point;
  angle: number;
  isPenDown: boolean;
  isVisible: boolean;
  color: string;
  context: CanvasRenderingContext2D | null;
}

@Injectable({
  providedIn: 'root',
})
export class TurtleServiceComponent {
  private turtleStateSubject = new BehaviorSubject<Turtle>({
    position: { x: 300, y: 300 }, //if flex display I should make a variable here
    angle: 0,
    isPenDown: true,
    isVisible: true,
    color: 'black',
    context: null
  });



  initializeContext(context: CanvasRenderingContext2D): void {
    const turtle = this.turtleStateSubject.value;
    turtle.context = context;
    this.turtleStateSubject.next(turtle);
  }

  private degreeToRadians(degrees: number): number {
    return degrees * Math.PI / 180;
  }

  private updateTurtle(turtleUpdate: Partial<Turtle>): void {
    const currentTurtle = this.turtleStateSubject.value;
    const updatedTurtle = { ...currentTurtle, ...turtleUpdate };
    this.turtleStateSubject.next(updatedTurtle);
  }

  moveForward(distance: number): void {
    const turtle = this.turtleStateSubject.value;
    if (!turtle.context || !turtle.isPenDown) return;

    const radians = this.degreeToRadians(turtle.angle);
    const startPosition = { ...turtle.position };
    const newPosition = {
      x: startPosition.x + distance * Math.cos(radians),
      y: startPosition.y + distance * Math.sin(radians),
    };

    turtle.context.beginPath();
    turtle.context.moveTo(startPosition.x, startPosition.y);
    turtle.context.lineTo(newPosition.x, newPosition.y);
    turtle.context.strokeStyle = turtle.color;
    turtle.context.stroke();

    this.updateTurtle({ position: newPosition });
  }

  moveBackward(distance: number): void {
    this.moveForward(-distance);
  }

  turnRight(degrees: number): void {
    const turtle = this.turtleStateSubject.value;
    this.updateTurtle({ angle: (turtle.angle + degrees) % 360 });
  }

  turnLeft(degrees: number): void {
    const turtle = this.turtleStateSubject.value;
    this.updateTurtle({ angle: (turtle.angle - degrees + 360) % 360 });
  }

  penUp(): void {
    this.updateTurtle({ isPenDown: false });
  }

  penDown(): void {
    this.updateTurtle({ isPenDown: true });
  }

  hideTurtle(): void {
    this.updateTurtle({ isVisible: false });
  }

  showTurtle(): void {
    this.updateTurtle({ isVisible: true });
  }

  clear(): void {
    const turtle = this.turtleStateSubject.value;
    if (!turtle.context) return;

    turtle.context.clearRect(0, 0, turtle.context.canvas.width, turtle.context.canvas.height);
    this.updateTurtle({ position: { x: 300, y: 300 } });
  }

  reset(): void {
    const turtle = this.turtleStateSubject.value;
    if (!turtle.context) return;

    turtle.context.clearRect(0, 0, turtle.context.canvas.width, turtle.context.canvas.height);
  }

  setPenColor(color: string): void {
    this.updateTurtle({ color });
  }

  getTurtleState(): Observable<Turtle> {
    return this.turtleStateSubject.asObservable();
  }
}
