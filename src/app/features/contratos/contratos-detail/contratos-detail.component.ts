import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DataService } from '../../../core/services/data.service';
import { Contrato } from '../../../core/models/entidades';

@Component({
  selector: 'app-contratos-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container" style="max-width: 600px; margin: 0 auto;" *ngIf="contrato">
      <h2>Detalle del Contrato</h2>
      
      <div style="background: #f9fafb; padding: 1.5rem; border-radius: 8px; margin-top: 1rem;">
        <p><strong>ID:</strong> {{ contrato.id }}</p>
        <p><strong>Código:</strong> {{ contrato.codigo }}</p>
        <p><strong>Descripción:</strong> {{ contrato.descripcion }}</p>
        <p><strong>Fecha Inicio:</strong> {{ contrato.fechaInicio | date:'longDate' }}</p>
        <p><strong>Estado:</strong> {{ contrato.estado }}</p>
      </div>

      <div style="margin-top: 2rem;">
        <a routerLink="/contratos" class="btn btn-secondary">Volver al listado</a>
        <a [routerLink]="['/contratos/editar', contrato.id]" class="btn btn-primary" style="margin-left: 1rem;">Editar</a>
      </div>
    </div>
  `
})
export class ContratosDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private dataService = inject(DataService);

  contrato?: Contrato;

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.dataService.getById<Contrato>('contratos', id).subscribe(data => {
        this.contrato = data;
      });
    }
  }
}
