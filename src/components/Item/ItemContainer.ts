import { IItemContainer } from '../../types';
import { Component } from '../base/Component';



export class ItemContainer extends Component<IItemContainer> {
	protected _catalog: HTMLElement;

	constructor(container: HTMLElement) {
		super(container);
	}

	set catalog(items: HTMLElement[]) {
		this.container.replaceChildren(...items);
	}
}
