<?php

	global $product;

	$image_path = CL_URL . "assets/images/pacta-leasing.png";

?>

<a href="/trailer-leasing?trailer=<?php echo $product->get_title() ?>" target="_blank" class="leasing-link">
    <h3 class="leasing-header">Erhvervs-leasing</h3>
    <img src="<?php echo $image_path?>" class="leasing-image">
</a>


