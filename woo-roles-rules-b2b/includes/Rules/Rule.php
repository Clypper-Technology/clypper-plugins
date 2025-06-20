<?php

namespace ClypperTechnology\RolePricing\Rules;

class Rule
{
    public string $type;
    public string $value;
    public string $quantity;
    public string $quantity_type;

    public function __construct(
        public string $adjust_type = '',
        public string $adjust_value = '',
        public string $adjust_type_qty = '',
        public string $adjust_value_qty = ''
    )
    {
    }

    
}