<?php

class PdfInvoicesCompatability {
  public function __construct() {
    add_action( 'wpo_wcpdf_after_item_meta', function( $template_type, $item, $order ) {
      if( $template_type == 'packing-slip' ) {
          // check if item exists first
         if( empty($item) ) return;
         // get bin location
         if( $bin_location = $item['product']->get_meta('_clypper_bin_number') ){
              echo '<div class="bin-location">bin: ' . $bin_location . '</div>';
          }
      }
    }, 10, 3);
 
  }
}

