
export namespace DBInterfaces {

    export interface ProductWarehouse {
        product: any;
        _id?: string;
        p_id: number;
        p_name: string;
        p_price: number;
        p_image: string;
        p_type: string;
        p_stock: number;
        s_ids: Array<number>;
        __v?: number;
    }
}


export namespace FileStructure {
    export interface FilesInterface {
        fieldname: string;
        originalname: string;
        encoding: string;
        mimetype: string;
    }
}

export namespace CustomError {
    export interface Error {
        name: string;
        message: string;
        stack?: string;
        statusCode?:number;
    }
}