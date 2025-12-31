import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importante para *ngFor
import { FormsModule } from '@angular/forms';     // Importante para [(ngModel)]
import { RouterOutlet } from '@angular/router';
import { EvaluationService } from './services/evaluation.service';
import Swal from 'sweetalert2';

// 1. Importamos el componente de la lista
import { EvaluationListComponent } from './components/evaluation-list/evaluation-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    RouterOutlet,
    EvaluationListComponent // <--- 2. Agregamos la tabla aquí
  ], 
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  courses = ['Matemáticas I', 'Programación Web', 'Base de Datos', 'Inglés II'];
  teachers = [{id: 1, name: 'Profesor X'}, {id: 2, name: 'Dra. Y'}, {id: 3, name: 'Mg. Z'}];

  // Configuración FINAL y corregida
  evaluation = {
    course: 'Programación Web',
    teacher: 'Profesor X', // <--- ¡ESTO asegura que se guarde el nombre y no salga vacío!
    score: 1,
    comment: ''
  };

  constructor(private evaluationService: EvaluationService) {}

  submit() {
    // Validación simple
    if (!this.evaluation.comment || this.evaluation.comment.length < 5) {
      Swal.fire('Atención', 'Debes escribir un comentario válido', 'warning');
      return;
    }

    this.evaluationService.saveEvaluation(this.evaluation).subscribe({
      next: () => {
        Swal.fire('¡Éxito!', 'Tu evaluación ha sido guardada', 'success');
        
        // Limpiamos solo el comentario y la nota, dejamos el curso/profe por defecto
        this.evaluation.comment = '';
        this.evaluation.score = 1;
      },
      error: (err) => {
        console.error(err);
        Swal.fire('Error', 'No se pudo conectar con el servidor', 'error');
      }
    });
  }
}