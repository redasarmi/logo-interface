import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ConsoleViewComponent } from './console-view/console-view.component';
import {UiViewComponent} from "./ui-view/ui-view.component";
import {MenubarModule} from "primeng/menubar";
import {MenuItem} from "primeng/api";
import {NgOptimizedImage} from "@angular/common";
import {FileUploadModule} from "primeng/fileupload";
import {ScriptViewComponent} from "./script-view/script-view.component";
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ConsoleViewComponent, UiViewComponent, MenubarModule, NgOptimizedImage, FileUploadModule, ScriptViewComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      {
        label: 'File',
        icon: 'pi pi-fw pi-file',
        items: [
          {
            label: 'New',
            icon: 'pi pi-fw pi-plus',
            items: [
              {
                label: 'import script',
                icon: 'pi pi-fw pi-bookmark'
              },
              {
                label: 'create script',
                icon: 'pi pi-fw pi-video'
              }
            ]
          },
          {
            separator: true
          },
          {
            label: 'Export',
            icon: 'pi pi-fw pi-external-link'
          }
        ]
      },
      {
        label: 'Classes',
        icon: 'pi pi-fw pi-pencil',
        items: []
      },
      {
        label: 'Quit',
        icon: 'pi pi-fw pi-power-off'
      }
    ];
  }
}
