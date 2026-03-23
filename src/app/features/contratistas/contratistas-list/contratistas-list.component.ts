import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DataService } from '../../../core/services/data.service';
import { Contratista } from '../../../core/models/entidades';

@Component({
  selector: 'app-contratistas-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container">
      <div class="header-actions">
        <h2>Listado de Contratistas</h2>
        <a routerLink="/contratistas/nuevo" class="btn btn-primary">+ Nuevo Contratista</a>
      </div>

      <div class="table-wrapper">
        <table class="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>CUIT</th>
              <th>Contacto</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let c of contratistas">
              <td>{{ c.id }}</td>
              <td>{{ c.nombre }}</td>
              <td>{{ c.cuit }}</td>
              <!-- BUG EDUCATIVO: 'c.contacto' es un objeto {nombre, telefono}. Se mostrará [object Object] -->
              <td>{{ c.contacto }}</td>
              <td class="actions-cell">
                <a [routerLink]="['/contratistas/detalle', c.id]" class="btn btn-info">Ver</a>
                <a [routerLink]="['/contratistas/editar', c.id]" class="btn btn-secondary">Editar</a>
                <button (click)="eliminar(c.id)" class="btn btn-danger">Eliminar</button>
              </td>
            </tr>
            <tr *ngIf="contratistas.length === 0">
              <td colspan="5" style="text-align: center;">No hay contratistas.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `
})
export class ContratistasListComponent implements OnInit {
  private dataService = inject(DataService);
  contratistas: Contratista[] = [];

  ngOnInit() {
    this.cargar();
  }

  cargar() {
    this.dataService.getAll<Contratista>('contratistas').subscribe(data => {
      this.contratistas = data;
    });
  }

  eliminar(id: number) {
    if (confirm('Eliminar contratista?')) {
      this.dataService.delete('contratistas', id).subscribe(() => this.cargar());
    }
  }
}
