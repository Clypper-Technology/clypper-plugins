<?php

	global $product;

	$image_path = CL_URL . "assets/images/Leasing-link-5.png";

?>

<div class="leasing-wrapper">
    <a href="/trailer-leasing?trailer=<?php echo $product->get_title() ?>" target="_blank">
        <img src="<?php echo $image_path?>">
    </a>
</div>

