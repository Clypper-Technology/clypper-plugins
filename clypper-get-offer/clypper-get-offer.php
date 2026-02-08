<?php
	/*
	* Plugin Name: Clypper's Get Offer
	* Description: Allows users to get an offer for some trailers.
	* Version: 1.0.0
    * Author: Clypper Technology
    * Author URI: https://clyppertechnology.com
	 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

require_once plugin_dir_path(__FILE__) . 'vendor/autoload.php';

const GET_OFFER_VERSION   = '1.0.0';

use ClypperTechnology\ClypperGetOffer\Admin\Admin;
use ClypperTechnology\ClypperGetOffer\ShortCodes\DisplayGetOffer;
use ClypperTechnology\ClypperGetOffer\ShortCodes\GetOfferForm;

define('GET_OFFER_URL', plugin_dir_url(__FILE__));

new GetOfferForm();
new DisplayGetOffer();

if (is_admin()) {
    new Admin();
}