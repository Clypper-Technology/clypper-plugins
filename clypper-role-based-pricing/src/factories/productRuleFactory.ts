import { PricingRule } from "@/types/pricingRule";
import { Product } from "@/types/product";
import { ProductRule } from "@/types/productRule";


export const createProductRule = (product: Product): ProductRule => {
  
  const pricingRule: PricingRule = {
    type: 'percent',
    value: '0',
    quantity: '0',
    quantity_type: 'percent' 
  };

  return {
    id: product.id,
    name: product.name,
    price: product.price,
    rule: pricingRule,
    min_qty: 0,
    image_url: product.image_url
  }
}
