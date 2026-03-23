import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <aside class="sidebar">
      <div class="logo">
        <h2>CorpAdmin</h2>
      </div>
      <nav class="menu">
        <a routerLink="/contratos" routerLinkActive="active" class="menu-item">Contratos</a>
        <a routerLink="/contratistas" routerLinkActive="active" class="menu-item">Contratistas</a>
        <a routerLink="/personal" routerLinkActive="active" class="menu-item">Personal</a>
        <a routerLink="/transporte" routerLinkActive="active" class="menu-item">Transporte</a>
        <a routerLink="/maquinaria" routerLinkActive="active" class="menu-item">Maquinaria</a>
      </nav>
    </aside>
  `,
  styles: [`
    .sidebar {
      width: 250px;
      background-color: #1a2332;
      color: #fff;
      height: 100vh;
      position: fixed;
      left: 0;
      top: 0;
      display: flex;
      flex-direction: column;
      box-shadow: 2px 0 5px rgba(0,0,0,0.1);
    }
    .logo {
      padding: 1.5rem;
      border-bottom: 1px solid rgba(255,255,255,0.1);
      text-align: center;
    }
    .logo h2 {
      margin: 0;
      font-size: 1.5rem;
      color: #4CAF50;
      font-weight: 600;
      letter-spacing: 1px;
    }
    .menu {
      display: flex;
      flex-direction: column;
      padding: 1rem 0;
    }
    .menu-item {
      padding: 1rem 1.5rem;
      color: #a0aabf;
      text-decoration: none;
      font-weight: 500;
      transition: all 0.3s ease;
      border-left: 4px solid transparent;
    }
    .menu-item:hover {
      background-color: rgba(255,255,255,0.05);
      color: #fff;
    }
    .menu-item.active {
      background-color: rgba(76, 175, 80, 0.1);
      color: #4CAF50;
      border-left-color: #4CAF50;
    }
  `]
})
export class SidebarComponent {}
