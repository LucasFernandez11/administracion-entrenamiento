import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DataService } from '../../../core/services/data.service';
import { Contratista } from '../../../core/models/entidades';

@Component({
  selector: 'app-contratistas-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container" style="max-width: 600px; margin: 0 auto;" *ngIf="contratista">
      <h2>Detalle del Contratista</h2>
      
      <div style="background: #f9fafb; padding: 1.5rem; border-radius: 8px; margin-top: 1rem;">
        <p><strong>ID:</strong> {{ contratista.id }}</p>
        <p><strong>Nombre:</strong> {{ contratista.nombre }}</p>
        <p><strong>CUIT:</strong> {{ contratista.cuit }}</p>
        <h4 style="margin-top: 1rem;">Contacto</h4>
        <ul>
          <li><strong>Nombre:</strong> {{ contratista.contacto.nombre }}</li>
          <li><strong>Tel:</strong> {{ contratista.contacto.telefono }}</li>
        </ul>
      </div>

      <div style="margin-top: 2rem;">
        <a routerLink="/contratistas" class="btn btn-secondary">Volver al listado</a>
        <a [routerLink]="['/contratistas/editar', contratista.id]" class="btn btn-primary" style="margin-left: 1rem;">Editar</a>
      </div>
    </div>
  `
})
export class ContratistasDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private dataService = inject(DataService);

  contratista?: Contratista;

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.dataService.getById<Contratista>('contratistas', id).subscribe(data => {
        this.contratista = data;
      });
    }
  }
}
