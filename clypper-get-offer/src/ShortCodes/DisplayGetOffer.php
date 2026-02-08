<?php


namespace ClypperTechnology\ClypperGetOffer\ShortCodes;

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

class DisplayGetOffer {
    public function __construct() {
        add_shortcode('get_offer_button', [$this, 'get_offer_button']);
    }

    public function get_offer_button() {
        global $product;

        $display_offer_button = boolval(get_post_meta($product->get_id(), '_cl_enable_get_offer', true));

        if (!$display_offer_button) return "";

        ob_start(); // Start output buffering to capture the form HTML

        ?>

        <a class="button alert" href="/faa-trailer-tilbud?trailer=<?php echo $product->get_title() ?>" target="_blank" style="margin: 15px 15px 0 0">
            <span>Få et tilbud</span>
        </a>
        <?php

        return ob_get_clean();
    }
}