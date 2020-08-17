import { Item } from './item'
import { Author } from './auhtor'

/**
 * Clase que representa un objeto respuesta de la API
 */
export class APIResponse {

    constructor(
        public author: Author,
        public categories: Array<String>,
        public items: Array<Item>
    ) { }

}