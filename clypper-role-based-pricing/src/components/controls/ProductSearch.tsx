import { ProductService } from "@/services/productService"
import { Product } from "@/types/product"
import { ComboboxControl } from "@wordpress/components"
import { useState } from "react"

export interface ProductSearchProps {
  onProductAdded: (product: Product) => void
}

export const ProductSearch = (props: ProductSearchProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [options, setOptions] = useState<{ value: string, label: string}[]>([]);

  const onFilterValueChange = async (inputValue: string) => {
    if (!inputValue) {
      setOptions([]);
      return;
    }
    // replace with your actual product search call
    const results = await ProductService.getProductsByName(inputValue);
    setProducts(results);
    setOptions(results.map(p => ({ value: String(p.id), label: p.name })));
  };

  const onChange = async (value: string | null | undefined) => {
    if(!value) {
      return;
    }

    const product: Product | undefined = products.find(p => String(p.id) == value);

    if(!product) return;

    props.onProductAdded(product);
  }

  return (
           <ComboboxControl
      label="Search for product"
      options={options}
      onFilterValueChange={onFilterValueChange}
      onChange={onChange}
      __experimentalRenderItem={({ item }) => {
        const product = products.find(p => String(p.id) === item.value);
        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {product?.image_url && (
              <img
                src={product.image_url}
                alt=""
                style={{ width: 45, height: 45, objectFit: 'cover', borderRadius: 2 }}
              />
            )}
            <span>{item.label}</span>
          </div>
        );
      }}
    />
  )
}
