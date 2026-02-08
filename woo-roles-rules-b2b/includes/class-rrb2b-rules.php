<?php
/**
 * Roles & Rules B2B
 *
 * @package Roles&RulesB2B/includes
 */

use ClypperTechnology\RolePricing\Rules\ApplicableRule;
use ClypperTechnology\RolePricing\Rules\RoleRules;
use ClypperTechnology\RolePricing\Services\RuleService;

defined( 'ABSPATH' ) || exit;


/**
 * Class for rules
 */
class Rrb2b_Rules {
    private RuleService $rule_service;

    private static bool $processing = false;
    private static bool $generating_qty_price = false;

    public function __construct()
    {
        $this->rule_service = new RuleService();

        if ( !is_product() ) {
            // Price filters - both use same method
            add_filter( 'woocommerce_product_get_price', array( $this, 'get_rule_sale_price' ), 20, 2 );
            add_filter( 'woocommerce_product_variation_get_price', array( $this, 'get_rule_sale_price' ), 20, 2 );

            // Sale price filters
            add_filter( 'woocommerce_product_get_sale_price', array( $this, 'get_rule_sale_price' ), 20, 2 );
            add_filter( 'woocommerce_product_variation_get_sale_price', array( $this, 'get_rule_sale_price' ), 20, 2 );

            // Variation price filters
            add_filter( 'woocommerce_variation_prices_price', array( $this, 'get_rule_sale_price' ), 20, 3 );
            add_filter( 'woocommerce_variation_prices_sale_price', array( $this, 'get_rule_sale_price' ), 20, 3 );
        }

        // On Sale
        add_filter( 'woocommerce_product_is_on_sale', array( $this, 'rrb2b_product_is_on_sale' ), 999, 2 );

        // x for y banner
        add_action('woocommerce_before_shop_loop_item', array( $this, 'show_discount_banner_shop_archive'), 999);
        add_filter('flatsome_custom_single_product_1', array($this, 'show_discount_banner_product_page'), 999, 3);

        // Quantity discount pricing
        add_filter( 'woocommerce_get_price_html', array( $this, 'modify_price_html_with_quantity_discount' ), 999, 2 );
    }

    /**
     * Modify the price HTML to show quantity discount pricing
     *
     * @param string $price_html The existing price HTML from tax plugin
     * @param WC_Product $product The product object
     * @return string Modified price HTML
     */
    public function modify_price_html_with_quantity_discount( string $price_html, $product ): string {
        if ( is_admin() || self::$processing || self::$generating_qty_price || !$this->user_has_rule() || !is_product()) {
            return $price_html;
        }

        $rule = $this->rule_service->get_rule_by_current_role();
        $applicable_rule = $this->get_applicable_rule( $rule, $product );

        if ( !$applicable_rule || !$applicable_rule->rule->has_quantity_value() ) {
            return $price_html;
        }

        if ( $this->get_cart_item_qty($product->get_id()) >= $applicable_rule->min_quantity ) {
            return $price_html;
        }

        self::$processing = true;

        $original_price = wc_get_price_including_tax( $product );

        // Calculate quantity discount price (bypasses regular role discount)
        $qty_discount_price = $applicable_rule->calculatePrice( $original_price, $applicable_rule->min_quantity );

        if ( !$qty_discount_price ) {
            return $price_html;
        }

        self::$generating_qty_price = true;

        $temp_product = clone $product;
        $temp_product->set_price( $qty_discount_price );

        $qty_price_html = $temp_product->get_price_html();

        self::$generating_qty_price = false;
        self::$processing = false;

        return $price_html . '<div class="rrb2b-quantity-price">'
                . $qty_price_html
                . ' pr. styk ved ' . esc_html( $applicable_rule->min_quantity ) . '+ stk</div>';
    }

    /**
     * Check if product is on sale
     *
     * @param bool $is_on_sale bool value.
     * @param var $product product.
     */
    public function rrb2b_product_is_on_sale(bool $is_on_sale, $product): bool {
        if (is_admin() || self::$processing || !$this->user_has_rule()) {
            return $is_on_sale;
        }

        self::$processing = true;

        try {
            $regular_price = floatval($product->get_regular_price());
            $sale_price = $this->get_rule_sale_price('', $product);

            if (empty($sale_price)) {
                return $is_on_sale;
            }

            return floatval($sale_price) < $regular_price;
        } finally {
            self::$processing = false;
        }
    }

    public function show_discount_banner_shop_archive(): void
    {
        $this->show_discount_banner(shortened_message: true);
    }

    public function show_discount_banner_product_page(): void
    {
        $this->show_discount_banner();
    }

    private function show_discount_banner(bool $shortened_message = false): void {
        global $product;

        // Fallback if global not set
        if (!$product) {
            $product = wc_get_product();
        }

        if (!$product) {
            return;
        }

        $rule = $this->rule_service->get_rule_by_current_role();

        if(!$rule || !$rule->rule_active) {
            return;
        }

        $applicable_rule = $this->get_applicable_rule( $rule, $product );

        if(!$applicable_rule || ! $applicable_rule->rule->quantity_value) {
            return;
        }

        $message = $applicable_rule->quantityReductionMessage();

        if( $shortened_message ) {
            ?>
            <div class="badge-container absolute right top z-1">
                <div class="callout badge badge-circle">
                    <div class="badge-inner secondary on-sale" style="background-color: #e3ad30"><span class="onsale">Mængderabat!</span></div>
                </div>
            </div>
            <?php
        } else {
            ?>
            <div class="badge-container absolute right top z-1">
                <div class="callout badge badge-circle">
                    <div class="badge-inner secondary on-sale" style="background-color: #e3ad30"><span class="onsale"><?php echo $message ?></span></div>
                </div>
            </div>
            <?php
        }
    }


    /**
     * Check if user has a role or is guest frontend
     */
    public function user_has_rule(): bool {
        $rule = $this->rule_service->get_rule_by_current_role();

        if ($rule == null) {
            return false;
        }

        return $rule->rule_active;
    }

    /**
     * Get sale price with role discount
     *
     * @param var $price current price.
     * @param var $product current product.
     */
    public function get_rule_sale_price( $price, $product ) {
        if ( self::$processing || ! $this->user_has_rule() ) {
            return $price;
        }

        self::$processing = true;

        try {
            // Get base price: use WC sale if exists, otherwise regular
            $wc_sale_price = $product->get_sale_price();
            $base_price = !empty($wc_sale_price) ? floatval($wc_sale_price) : floatval($product->get_regular_price());

            $cart_qty = $this->get_cart_item_qty($product->get_id());
            $rule = $this->rule_service->get_rule_by_current_role();

            if (!$rule) {
                return $price;
            }

            // Apply role discount to the base price
            $calculated_price = $this->role_price($rule, $product, $base_price, $cart_qty);

            // Return calculated price if valid, otherwise return WC sale price if exists, else original
            return $calculated_price !== null ? strval($calculated_price) : (!empty($wc_sale_price) ? $wc_sale_price : $price);
        } finally {
            self::$processing = false;
        }
    }

    public function role_price(RoleRules $rule, $product, float $price_new, int $cart_qty) : ?float {
        $applicable_rule = $this->get_applicable_rule( $rule, $product );

        return $applicable_rule?->calculatePrice($price_new, $cart_qty);
    }

    private function get_applicable_rule( RoleRules $rule, $product ): ?ApplicableRule {
        $category_ids = $this->get_category_ids( $product );

        if( is_wp_error($category_ids) ) {
            $category_ids = [];
        }

        return $rule->get_applicable_rule( $product->get_id(), $category_ids );
    }


    /**
     * Get cart quantity for a given product.
     */
    private  function get_cart_item_qty(int $product_id ): int {
        $cart = WC()->cart;

        if ( ! $cart ) {
            return 0;
        }

        $quantities = $cart->get_cart_item_quantities();

        return intval( $quantities[ $product_id ] ?? 0);
    }

    /**
     * @return int[]
     */
    private function get_category_ids( $product ): array{
        return ('variation' === $product->get_type()) ?
            wc_get_product_term_ids($product->get_parent_id(), 'product_cat') :
            wc_get_product_term_ids($product->get_id(), 'product_cat');
    }
}
