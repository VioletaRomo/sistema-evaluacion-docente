export interface Task {
    id?: number;
    title: string;
    description?: string;
    status: 'pendiente' | 'completada';
    priority: 'baja' | 'media' | 'alta';
    due_date?: string;
    created_at?: string;
}