import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  template: `
    <nav class="navbar">
      <div class="user-info">
        <span class="role-badge">Admin</span>
        <span>Administrador de Contratos</span>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      height: 60px;
      background-color: #ffffff;
      box-shadow: 0 2px 4px rgba(0,0,0,0.05);
      display: flex;
      align-items: center;
      justify-content: flex-end; /* right-aligned content */
      padding: 0 2rem;
    }
    .user-info {
      display: flex;
      align-items: center;
      gap: 1rem;
      font-weight: 500;
      color: #333;
    }
    .role-badge {
      background-color: #4CAF50;
      color: white;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 0.8rem;
      font-weight: bold;
    }
  `]
})
export class NavbarComponent {}
