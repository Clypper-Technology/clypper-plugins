<?php

global $product;

$image_path = CL_URL . "assets/images/pacta-leasing.png";

?>

    <div class="erhvers-leasing-wrapper">
        <a href="/trailer-leasing?trailer=<?php echo $product->get_title() ?>" target="_blank" class="leasing-link">

        <img src="<?php echo $image_path?>" class="leasing-image">

        <div class="erhvers-leasing-inner-wrapper">
            <h3 class="leasing-header">Erhvervsleasing</h3>
            <p>Finansiering med 0 kr. i udbetaling. Leasingperioder fra 12-60 måneder.</p>
        </div>
        </a>
    </div>

