<?php

defined( 'ABSPATH' ) || exit;

class Ajax_Handler {

    public function __construct()
    {
        add_action( 'wp_ajax_rrb2b_get_user_role', array( __CLASS__, 'rrb2b_get_user_role' ) );

    }

}