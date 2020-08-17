import config from '../config/config';
var Request = require("request");

/**
 * Clase encargada de gestionar recursos de Items
 */
export class ItemService {

    /**
     * Encargada de consumir la api de mercado libre y crear objetos tipo Item
     * @param query 
     */
    async getItems(query): Promise<any> {
        const itemsURI = `${config.URI}sites/MLA/search?q=​'${query}'`;
        return new Promise((resolve, reject) => {

            Request.get(encodeURI(itemsURI), { json: true }, (error, response, body) => {

                if (error) {
                    console.dir(error);
                    reject(error)
                }

                const { results } = body;
                resolve(results.slice(0,4))

            })
        })
    }
}