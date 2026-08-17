<?php

namespace ClypperTechnology\RolePricing\REST\DTOs;

use ClypperTechnology\RolePricing\REST\PresentationHelper;
use ClypperTechnology\RolePricing\Rules\ProductRule;


class ProductRuleDTO
{
    public ProductRule $rule;
    public ?string $image_url;

    public function __construct(
        ProductRule $rule,
        ?string $image_url
    ) {
        $this->rule = $rule;
        $this->image_url = $image_url;
    }

    public static function from( ProductRule $rule ): self
    {
        return new self(
            $rule,
            PresentationHelper::get_image_from_product_id( $rule->id )
        );
    }

    public function to_array(): array
    {
        return [
            ...$this->rule->to_array(),
            'image_url' => $this->image_url,
        ];
    }
}