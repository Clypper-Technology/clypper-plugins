
<?php

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
        ?>
        <div class="payever-widget-finexp"
             data-widgetid="04abea71-c635-4a6f-aded-bf12b8b8d19f"
             data-checkoutid="fc43d431-338a-5a00-a828-8210cbb1ac3b"
             data-business="c96a3831-7d73-46e2-91dd-4719b604a261"
             data-type="dropdownCalculator"
             data-reference="order-id"
             data-amount="<?php echo $product->get_price() ?>"></div>
        <script>
            var script = document.createElement('script');
            script.src = 'https://widgets.payever.org/finance-express/widget.min.js';
            script.onload = function() {
                PayeverPaymentWidgetLoader.init(
                    '.payever-widget-finexp'
                );
            };
            document.head.appendChild(script);
        </script>
        <?php
        }

    ?>
    </div>
<?php
}

