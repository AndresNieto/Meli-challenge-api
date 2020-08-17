import config from '../config/config'
var Request = require("request");

/**
 * Clase encargada de gestionar recursos de Categorias
 */
export class CategoryService {

    /**
     * Encargada de consultar la api de Mercado Libre y construir objetos de Categorias
     * @param results
     */
    async getCategories(results): Promise<any> {
        let listaCategorias: Array<String> = [];
        return new Promise(resolve => {
            let i = 1;
            
            results.map(result => {
                const { category_id} = result;
                const categoriesURI = `${config.URI}categories/${category_id}`;
                Request.get(encodeURI(categoriesURI), { json: true }, (error, response, body) => {

                    if (error) {
                        console.dir(error);
                    }
                    const { name } = body;

                    if (!listaCategorias.includes(name)) {
                        listaCategorias.push(name);
                    }
                    i++ 
                    if (i === results.length) {
                        resolve(listaCategorias)
                    }
                });
            })

        })
    }
}