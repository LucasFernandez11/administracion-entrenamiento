import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, SidebarComponent],
  template: `
    <div class="app-layout">
      <app-sidebar></app-sidebar>
      <div class="main-content">
        <app-navbar></app-navbar>
        <div class="page-content">
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .app-layout {
      display: flex;
      min-height: 100vh;
      background-color: #f4f7f6;
    }
    .main-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      margin-left: 250px; /* Sidebar width */
    }
    .page-content {
      padding: 2rem;
      flex: 1;
    }
  `]
})
export class AppComponent {
  title = 'Administración';
}
