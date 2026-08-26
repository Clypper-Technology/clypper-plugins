<?php

namespace ClypperTechnology\RolePricing\Factories\Factories;

use ClypperTechnology\RolePricing\REST\DTOs\ProductRuleDTO;
use ClypperTechnology\RolePricing\Rules\ItemRule;

defined( 'ABSPATH' ) || exit;

final class ProductRuleDTOFactory
{
    public static function from_rule(ItemRule $rule): ProductRuleDTO {
        $product = wc_get_product($rule->id);

        if ( ! $product ) {
            return new ProductRuleDTO(
                $rule,
                null,
                0.0
            );
        }

        $image_url = self::get_image_from_product($product);

        return new ProductRuleDTO(
            $rule,
            $image_url,
            (float)$product->get_price()
        );
    }

    private static function get_image_from_product(\WC_Product $product): ?string
    {
        $image_url = wp_get_attachment_image_url(
            $product->get_image_id(),
            'thumbnail'
        );

        return $image_url ?: null;
    }
}