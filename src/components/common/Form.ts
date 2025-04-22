
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/events";
import { Modal } from "./Modal";
//import { Modal } from "./Modal";


interface IFormActions {
  onSubmit: () => void;
}


export interface IForm {
  errors: string[];
  valid: boolean;
}



export class Form<T> extends Modal<IForm> {
  protected _submitButton: HTMLButtonElement;
  protected _errors: HTMLElement;
  protected events: IEvents;
  constructor(protected container: HTMLFormElement,  events: IEvents) {
    super(container, events);

   this.events = events;
    this. _submitButton = ensureElement<HTMLButtonElement>('.submit__Button',this.container);

   
    this._errors = ensureElement<HTMLElement>('.form__errors', this.container);


    /*
    this.container.addEventListener('input', (e: Event) => {
      const target = e.target as HTMLInputElement;
      const field = target.name as keyof T;
      const value = target.value;
      this.onInputChange(field, value);
    });
*/

/*
    this.container.addEventListener('submit', (e: Event) => {
      e.preventDefault();
      //this.events.emit(`${this.container}:submit`);
      this.events.emit( 'order:submit', this.container);
    });
*/
    


  }
 
  /*
  protected onInputChange(field: keyof T, value: string) {
    this.events.emit('orderInput:change', {
      field,
      value,
    })
  }

*/




  set valid(value: boolean) {
    this._submitButton.disabled = !value;
  }

  set errors(value: string) {
   // this.setText(this._errors, value);
   this._errors.textContent = value
  }



  
}
/*
  render(state: Partial<T> & IForm) {
    const { valid, errors, ...inputs } = state;
    super.render({ valid, errors });
    Object.assign(this, inputs);
    return this.container;
  }
 
  */
 