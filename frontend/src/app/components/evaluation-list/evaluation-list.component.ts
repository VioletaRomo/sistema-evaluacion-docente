import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EvaluationService } from '../../services/evaluation.service';

@Component({
  selector: 'app-evaluation-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="table-container">
      <h2>📊 Historial de Evaluaciones</h2>
      
      <table *ngIf="evaluations.length > 0; else noData">
        <thead>
          <tr>
            <th>Asignatura</th>
            <th>Docente</th>
            <th>Nota</th>
            <th>Comentario</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let eval of evaluations">
            <td>{{ eval.course }}</td>
            <td>{{ eval.teacher }}</td>
            <td>
              <span class="badge" [ngClass]="{'aprobado': eval.score >= 4, 'reprobado': eval.score < 4}">
                {{ eval.score }}
              </span>
            </td>
            <td>{{ eval.comment }}</td>
          </tr>
        </tbody>
      </table>

      <ng-template #noData>
        <p class="empty-msg">No hay evaluaciones registradas aún.</p>
      </ng-template>
    </div>
  `,
  styles: [`
    .table-container { margin-top: 30px; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
    table { width: 100%; border-collapse: collapse; margin-top: 15px; }
    th, td { padding: 12px; text-align: left; border-bottom: 1px solid #eee; }
    th { background-color: #f8f9fa; font-weight: bold; }
    .badge { padding: 5px 10px; border-radius: 15px; color: white; font-weight: bold; font-size: 0.9em; }
    .aprobado { background-color: #28a745; }
    .reprobado { background-color: #dc3545; }
    .empty-msg { text-align: center; color: #777; font-style: italic; margin-top: 20px; }
  `]
})
export class EvaluationListComponent implements OnInit {
  evaluations: any[] = [];

  constructor(private evaluationService: EvaluationService) {}

  ngOnInit() {
    this.evaluationService.getEvaluations().subscribe();
    this.evaluationService.evaluations$.subscribe((data: any) => {
      this.evaluations = data;
    });
  }
}