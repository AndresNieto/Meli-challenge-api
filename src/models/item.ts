// Clase que representa un item de Mercado Libre
export class Item {
    constructor(
        public id: string,
        public title: String,
        public price: Price,
        public picture: String,
        public condition: String,
        public city: String,
        public free_shiping: Boolean,
        public sold_quantity: number) {}
}

// Clase que representa un objeto tipo precio de Mercado Libre
export class Price {
    constructor(
        public price: number,
        public currency: String,
        public amount: number,
        public decimals: number
    ) { }
}
