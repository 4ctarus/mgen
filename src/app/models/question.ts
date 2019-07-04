import Choice from './choice';

export default interface Question {
  text: string;
  value?: any;
  choices?: Choice[];
  multiple?: boolean;
  required?: boolean;
}
