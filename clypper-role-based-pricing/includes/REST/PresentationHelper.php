<?php

namespace ClypperTechnology\RolePricing\REST;
final class PresentationHelper
{
    public static function get_image_from_product_id(int $product_id): ?string
    {
        $product = wc_get_product($product_id);

        if (!$product) {
            return null;
        }

        return self::get_image_from_product($product);
    }

    public static function get_image_from_product(\WC_Product $product): ?string
    {
        $image_url = wp_get_attachment_image_url(
            $product->get_image_id(),
            'thumbnail'
        );

        return $image_url ?: null;
    }
}