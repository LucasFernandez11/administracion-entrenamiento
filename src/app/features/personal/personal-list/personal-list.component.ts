import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DataService } from '../../../core/services/data.service';
import { Personal, Contratista } from '../../../core/models/entidades';

@Component({
  selector: 'app-personal-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container">
      <div class="header-actions">
        <h2>Listado de Personal</h2>
        <a routerLink="/personal/nuevo" class="btn btn-primary">+ Nuevo Personal</a>
      </div>

      <div class="table-wrapper">
        <table class="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre Completo</th>
              <th>DNI</th>
              <th>Rol</th>
              <th>Contratista Asignado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let p of personalList">
              <td>{{ p.id }}</td>
              <td>{{ p.nombreCompleto }}</td>
              <td>{{ p.dni }}</td>
              <td>{{ p.rol }}</td>
              <td>{{ getContratistaNombre(p.contratistaId) }}</td>
              <td class="actions-cell">
                <a [routerLink]="['/personal/detalle', p.id]" class="btn btn-info">Ver</a>
                <a [routerLink]="['/personal/editar', p.id]" class="btn btn-secondary">Editar</a>
                <button (click)="eliminar(p.id)" class="btn btn-danger">Eliminar</button>
              </td>
            </tr>
            <tr *ngIf="personalList.length === 0">
              <td colspan="6" style="text-align: center;">No hay personal registrado.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `
})
export class PersonalListComponent implements OnInit {
  private dataService = inject(DataService);
  
  personalList: Personal[] = [];
  contratistas: Contratista[] = [];

  ngOnInit() {
    this.cargarDatos();
  }

  cargarDatos() {
    this.dataService.getAll<Personal>('personal').subscribe(data => this.personalList = data);
    this.dataService.getAll<Contratista>('contratistas').subscribe(data => this.contratistas = data);
  }

  getContratistaNombre(id: number): string {
    const c = this.contratistas.find(x => x.id === id);
    return c ? c.nombre : 'Desconocido';
  }

  eliminar(id: number) {
    if (confirm('Eliminar personal?')) {
      this.dataService.delete('personal', id).subscribe(() => this.cargarDatos());
    }
  }
}
