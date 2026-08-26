<?php

namespace ClypperTechnology\RolePricing\REST\DTOs;

defined('ABSPATH') || exit;

class ProductDTO
{
    public int $id;
    public string $name;
    public float $price;
    public string $image_url;

    public function __construct(
        string $id,
        string $name,
        float $price,
        string $url
    ) {
        $this->id = $id;
        $this->name = $name;
        $this->price = $price;
        $this->image_url = $url;
    }

    public static function from( \WC_Product $product ): self {
        return new self(
            $product->get_id(),
            $product->get_title(),
            floatval($product->get_price()),
            wp_get_attachment_image_url( $product->get_image_id(), 'thumbnail' )
        );
    }
}