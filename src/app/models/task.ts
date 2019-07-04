export default interface Task {
  id: number;
  type: TaskType | number;
  progress: number;
  value?: any[];
}

export interface TimeTask {
  [index: string]: Task[];
}

export enum TaskType {
  'SF12'= 13,
  'DN4'= 14,
  'HAD'= 15,
  'ECPA'= 16,
  'SF36'= 17
}
