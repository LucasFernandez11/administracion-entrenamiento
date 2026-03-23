import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DataService } from '../../../core/services/data.service';
import { Transporte, Contratista } from '../../../core/models/entidades';

@Component({
  selector: 'app-transporte-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container" style="max-width: 600px; margin: 0 auto;" *ngIf="transporte">
      <h2>Detalle del Transporte</h2>
      
      <div style="background: #f9fafb; padding: 1.5rem; border-radius: 8px; margin-top: 1rem;">
        <p><strong>ID:</strong> {{ transporte.id }}</p>
        <p><strong>Patente:</strong> {{ transporte.patente }}</p>
        <p><strong>Tipo:</strong> {{ transporte.tipo }}</p>
        <p><strong>Capacidad:</strong> {{ transporte.capacidad }}</p>
        <p><strong>Contratista Asignado:</strong> {{ contratistaNombre }}</p>
      </div>

      <div style="margin-top: 2rem;">
        <a routerLink="/transporte" class="btn btn-secondary">Volver</a>
        <a [routerLink]="['/transporte/editar', transporte.id]" class="btn btn-primary" style="margin-left: 1rem;">Editar</a>
      </div>
    </div>
  `
})
export class TransporteDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private dataService = inject(DataService);

  transporte?: Transporte;
  contratistaNombre: string = 'Cargando...';

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.dataService.getById<Transporte>('transporte', id).subscribe(data => {
        this.transporte = data;
        if (this.transporte) {
           this.dataService.getById<Contratista>('contratistas', this.transporte.contratistaId)
             .subscribe(c => this.contratistaNombre = c ? c.nombre : 'Desconocido');
        }
      });
    }
  }
}
