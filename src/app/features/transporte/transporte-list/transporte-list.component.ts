import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DataService } from '../../../core/services/data.service';
import { Transporte, Contratista } from '../../../core/models/entidades';

@Component({
  selector: 'app-transporte-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container">
      <div class="header-actions">
        <h2>Listado de Transporte</h2>
        <a routerLink="/transporte/nuevo" class="btn btn-primary">+ Nuevo Transporte</a>
      </div>

      <div class="table-wrapper">
        <table class="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Patente</th>
              <th>Tipo</th>
              <th>Capacidad</th>
              <th>Contratista</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let t of transportes">
              <td>{{ t.id }}</td>
              <td>{{ t.patente }}</td>
              <td>{{ t.tipo }}</td>
              <td>{{ t.capacidad }}</td>
              <td>{{ getContratistaNombre(t.contratistaId) }}</td>
              <td class="actions-cell">
                <a [routerLink]="['/transporte/detalle', t.id]" class="btn btn-info">Ver</a>
                <a [routerLink]="['/transporte/editar', t.id]" class="btn btn-secondary">Editar</a>
                <button (click)="eliminar(t.id)" class="btn btn-danger">Eliminar</button>
              </td>
            </tr>
            <tr *ngIf="transportes.length === 0">
              <td colspan="6" style="text-align: center;">No hay vehículos registrados.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `
})
export class TransporteListComponent implements OnInit {
  private dataService = inject(DataService);
  
  transportes: Transporte[] = [];
  contratistas: Contratista[] = [];

  ngOnInit() {
    this.cargarDatos();
  }

  cargarDatos() {
    this.dataService.getAll<Transporte>('transporte').subscribe(data => this.transportes = data);
    this.dataService.getAll<Contratista>('contratistas').subscribe(data => this.contratistas = data);
  }

  getContratistaNombre(id: number): string {
    const c = this.contratistas.find(x => x.id === id);
    return c ? c.nombre : 'Desconocido';
  }

  eliminar(id: number) {
    if (confirm('Eliminar vehículo?')) {
      this.dataService.delete('transporte', id).subscribe(() => this.cargarDatos());
    }
  }
}
