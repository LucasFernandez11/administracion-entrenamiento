import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DataService } from '../../../core/services/data.service';
import { Maquinaria, Contratista } from '../../../core/models/entidades';

@Component({
  selector: 'app-maquinaria-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container">
      <div class="header-actions">
        <h2>Listado de Maquinaria</h2>
        <a routerLink="/maquinaria/nuevo" class="btn btn-primary">+ Nueva Maquinaria</a>
      </div>

      <div class="table-wrapper">
        <table class="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Equipo</th>
              <th>Modelo</th>
              <th>Horas de Uso</th>
              <th>Contratista</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <!-- El modelo vendrá alterado desde el servicio como bug intencional -->
            <tr *ngFor="let m of maquinarias">
              <td>{{ m.id }}</td>
              <td>{{ m.equipo }}</td>
              <td>{{ m.modelo }}</td>
              <td>{{ m.horasUso }}</td>
              <td>{{ getContratistaNombre(m.contratistaId) }}</td>
              <td class="actions-cell">
                <a [routerLink]="['/maquinaria/detalle', m.id]" class="btn btn-info">Ver</a>
                <a [routerLink]="['/maquinaria/editar', m.id]" class="btn btn-secondary">Editar</a>
                <button (click)="eliminar(m.id)" class="btn btn-danger">Eliminar</button>
              </td>
            </tr>
            <tr *ngIf="maquinarias.length === 0">
              <td colspan="6" style="text-align: center;">No hay maquinaria registrada.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `
})
export class MaquinariaListComponent implements OnInit {
  private dataService = inject(DataService);
  
  maquinarias: Maquinaria[] = [];
  contratistas: Contratista[] = [];

  ngOnInit() {
    this.cargarDatos();
  }

  cargarDatos() {
    this.dataService.getAll<Maquinaria>('maquinaria').subscribe(data => this.maquinarias = data);
    this.dataService.getAll<Contratista>('contratistas').subscribe(data => this.contratistas = data);
  }

  getContratistaNombre(id: number): string {
    const c = this.contratistas.find(x => x.id === id);
    return c ? c.nombre : 'Desconocido';
  }

  eliminar(id: number) {
    if (confirm('Eliminar maquinaria?')) {
      this.dataService.delete('maquinaria', id).subscribe(() => this.cargarDatos());
    }
  }
}
