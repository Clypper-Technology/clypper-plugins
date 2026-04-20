
<?php
if (!defined('ABSPATH')) { exit; }
add_action('woocommerce_after_add_to_cart_button', 'cl_select_template', 2000);

function cl_select_template() {
    global $product;

    $leasing_type = get_post_meta($product->get_id(), '_cl_leasing_option', true);

    if ($leasing_type == 'none' || !$leasing_type) return;

    ?>

    <div class="leasing-wrapper">

    <?php

    if ($leasing_type == 'erhverv') {
        include CL_DIR . '/templates/erhverv.php';
    } elseif ($leasing_type == 'privat-erhverv') {
        include CL_DIR . '/templates/erhverv.php';
    }
    if ($product->get_price() >= 15000) {

    }

    ?>
    </div>
<?php
}

