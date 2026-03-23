import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DataService } from '../../../core/services/data.service';
import { Maquinaria, Contratista } from '../../../core/models/entidades';

@Component({
  selector: 'app-maquinaria-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container" style="max-width: 600px; margin: 0 auto;" *ngIf="maquinaria">
      <h2>Detalle de Maquinaria</h2>
      
      <div style="background: #f9fafb; padding: 1.5rem; border-radius: 8px; margin-top: 1rem;">
        <p><strong>ID:</strong> {{ maquinaria.id }}</p>
        <p><strong>Equipo:</strong> {{ maquinaria.equipo }}</p>
        <p><strong>Modelo:</strong> {{ maquinaria.modelo }}</p>
        <p><strong>Horas de Uso:</strong> {{ maquinaria.horasUso }}</p>
        <p><strong>Contratista Asignado:</strong> {{ contratistaNombre }}</p>
      </div>

      <div style="margin-top: 2rem;">
        <a routerLink="/maquinaria" class="btn btn-secondary">Volver</a>
        <a [routerLink]="['/maquinaria/editar', maquinaria.id]" class="btn btn-primary" style="margin-left: 1rem;">Editar</a>
      </div>
    </div>
  `
})
export class MaquinariaDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private dataService = inject(DataService);

  maquinaria?: Maquinaria;
  contratistaNombre: string = 'Cargando...';

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.dataService.getById<Maquinaria>('maquinaria', id).subscribe(data => {
        this.maquinaria = data;
        if (this.maquinaria) {
           this.dataService.getById<Contratista>('contratistas', this.maquinaria.contratistaId)
             .subscribe(c => this.contratistaNombre = c ? c.nombre : 'Desconocido');
        }
      });
    }
  }
}
