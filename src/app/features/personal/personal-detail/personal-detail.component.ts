import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DataService } from '../../../core/services/data.service';
import { Personal, Contratista } from '../../../core/models/entidades';

@Component({
  selector: 'app-personal-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container" style="max-width: 600px; margin: 0 auto;" *ngIf="personal">
      <h2>Detalle del Personal</h2>
      
      <div style="background: #f9fafb; padding: 1.5rem; border-radius: 8px; margin-top: 1rem;">
        <p><strong>ID:</strong> {{ personal.id }}</p>
        <p><strong>Nombre Completo:</strong> {{ personal.nombreCompleto }}</p>
        <p><strong>DNI:</strong> {{ personal.dni }}</p>
        <p><strong>Rol:</strong> {{ personal.rol }}</p>
        <p><strong>Contratista Asignado:</strong> {{ contratistaNombre }}</p>
      </div>

      <div style="margin-top: 2rem;">
        <a routerLink="/personal" class="btn btn-secondary">Volver</a>
        <a [routerLink]="['/personal/editar', personal.id]" class="btn btn-primary" style="margin-left: 1rem;">Editar</a>
      </div>
    </div>
  `
})
export class PersonalDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private dataService = inject(DataService);

  personal?: Personal;
  contratistaNombre: string = 'Cargando...';

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.dataService.getById<Personal>('personal', id).subscribe(data => {
        this.personal = data;
        if (this.personal) {
           this.dataService.getById<Contratista>('contratistas', this.personal.contratistaId)
             .subscribe(c => this.contratistaNombre = c ? c.nombre : 'Desconocido');
        }
      });
    }
  }
}
