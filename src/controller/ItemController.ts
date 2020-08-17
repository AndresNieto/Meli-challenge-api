import { Request, Response } from "express";
import { Item, Price } from "../models/item";
import { APIResponse } from '../models/api-response'
import { CategoryService } from '../services/category.service';
import { ItemService } from '../services/item.service';

import config from '../config/config'

var Request = require("request");

/**
 * Clase encargada de gestionar peticiones por parte del cliente para items
 */
export class ItemController {

    static getItemsList = async (req: Request, res: Response) => {
        const categoriesService = new CategoryService();
        const itemService = new ItemService();
        const { q } = req.query;

        try {
            const itemServiceCaller = itemService.getItems(q);

            itemServiceCaller.then(response=>{
                let listaItems: Array<Item> = (ItemController.meliObjectToItem(response));
                let listaCategorias : Array<String>
                const categoriesCaller = categoriesService.getCategories(response);
                categoriesCaller.then(response => {
                    listaCategorias = response;
                    const responseApi = new APIResponse(config.AUTHOR, listaCategorias, listaItems);
                    res.send(responseApi);
                })
            },err=>{
                res.status(400).send({ message: 'Ha ocurrido un error' })
            })

        } catch (error) {
            res.status(400).send({ message: 'Servicio no disponible' })
        }
    };

    /**
     * Encargado de conectar con el API para consultar producto por id
     * TODO: Pendiente por error en api
     */
    static getItemById = async (req: Request, res: Response) => {

        const { id } = req.params;
        res.send(id);

    }

    /**
     * Encargado de convertir un Array<Object> a Array<Item>
     * @param results 
     */
    static meliObjectToItem(results): Array<Item> {
        let listaItems: Array<Item> = []

        results.map(result => {
            const { id, title, thumbnail, shipping, price, currency_id, available_quantity, address, attributes, sold_quantity } = result;
            const { free_shipping } = shipping;
            const { city_name } = address;

            let decimals = null;
            let priceString = price.toString();
            // Verificamos si existen decimales en price
            if (price.toString().includes(".")) {
                let priceAux = price.toString();
                decimals = priceAux.substring(priceAux.indexOf(".") + 1, priceAux.length);
                priceString = priceString.substring(0, priceString.indexOf("."));
            }
            let condition;
            if (Object.keys(attributes).length > 0) {
                condition = attributes.filter(
                    attribute => attribute.id === 'ITEM_CONDITION')
            }

            let priceObject: Price = new Price(priceString, currency_id, available_quantity, decimals);
            let item: Item = new Item(id, title, priceObject, thumbnail, condition[0].value_name, city_name, free_shipping, sold_quantity);
            listaItems.push(item);

        })
        return listaItems;

    }
}

export default ItemController;
