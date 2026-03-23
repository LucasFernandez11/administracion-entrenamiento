import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DataService } from '../../../core/services/data.service';
import { Contrato } from '../../../core/models/entidades';

@Component({
  selector: 'app-contratos-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container">
      <div class="header-actions">
        <h2>Listado de Contratos</h2>
        <a routerLink="/contratos/nuevo" class="btn btn-primary">+ Nuevo Contrato</a>
      </div>

      <div class="table-wrapper">
        <table class="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Código</th>
              <th>Descripción</th>
              <th>Fecha Inicio</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let contrato of contratos">
              <td>{{ contrato.id }}</td>
              <td>{{ contrato.codigo }}</td>
              <td>{{ contrato.descripcion }}</td>
              <td>{{ contrato.fechaInicio | date }}</td>
              <td>
                <span class="badge" [ngClass]="{'bg-green': contrato.estado === 'Activo', 'bg-yellow': contrato.estado === 'Pendiente'}">
                  {{ contrato.estado }}
                </span>
              </td>
              <td class="actions-cell">
                <a [routerLink]="['/contratos/detalle', contrato.id]" class="btn btn-info">Ver</a>
                <a [routerLink]="['/contratos/editar', contrato.id]" class="btn btn-secondary">Editar</a>
                <button (click)="eliminar(contrato.id)" class="btn btn-danger">Eliminar</button>
              </td>
            </tr>
            <tr *ngIf="contratos.length === 0">
              <td colspan="6" style="text-align: center;">No hay contratos registrados.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .badge {
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 0.8rem;
      font-weight: 500;
      color: white;
    }
    .bg-green { background-color: #10B981; }
    .bg-yellow { background-color: #F59E0B; color: #fff; }
  `]
})
export class ContratosListComponent implements OnInit {
  private dataService = inject(DataService);
  contratos: Contrato[] = [];

  ngOnInit() {
    this.cargarContratos();
  }

  cargarContratos() {
    this.dataService.getAll<Contrato>('contratos').subscribe(data => {
      this.contratos = data;
    });
  }

  eliminar(id: number) {
    if (confirm('¿Está seguro de eliminar este contrato?')) {
      this.dataService.delete('contratos', id).subscribe(() => {
        this.cargarContratos();
      });
    }
  }
}
