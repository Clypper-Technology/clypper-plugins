<?php
    $popup_header = get_option("wc_clypper_popup_header");
    $popup_text = get_option("wc_clypper_popup_text");
    $no_vat_button_text = get_option("wc_clypper_no_vat_button_text");
    $vat_button_text = get_option("wc_clypper_vat_button_text");
?>

<div class="tax-popup-background"></div>
<div class="tax-popup-wrapper">
    <h2 class="tax-popup-header"><?php echo $popup_header?></h2>
    <h3 class="tax-popup-text"><?php echo $popup_text?></h3>
    <div class="vat-button-wrapper">
        <button class="with-vat-button"><?php echo $vat_button_text?></button>
        <button class="no-vat-button"><?php echo $no_vat_button_text?></button>
    </div>
</div>