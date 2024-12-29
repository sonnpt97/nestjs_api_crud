import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { dtoProduct } from 'src/DTO/dto.product';
import { Product } from 'src/schemas/product.schema';


@Injectable()
export class ProductsService {
    constructor(@InjectModel(Product.name) private productModel: Model<Product>) { }


    async getAll(): Promise<Product[]> {
        const products = await this.productModel.find({});
        return products;
    }


    async detail(id: string) {
        const product = await this.productModel.findById(id);
        return product;
    }

    async deleteProduct(id: string) {
        const data = await this.productModel.findByIdAndDelete(id);
        return data;
    }


    async createProduct(product: dtoProduct) {
        const data = await this.productModel.create(product);
        return data;
    }
    async updateProduct(product: dtoProduct, id: string) {
        const data = await this.productModel.findByIdAndUpdate(id, product);
        return data;
    }


}
