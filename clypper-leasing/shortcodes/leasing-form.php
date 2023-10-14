<?php
	function cl_custom_contact_form_shortcode() {
		// Check for trailer in the query string
		$trailer = isset($_GET['trailer']) ? sanitize_text_field($_GET['trailer']) : '';

		ob_start(); // Start output buffering to capture the form HTML

		?>
		<form action="" method="post">
			<label for="name">Navn *</label>
			<input type="text" id="name" name="name" required>

			<label for="trailer">Trailer *</label>
			<input type="text" id="trailer" name="trailer" value="<?php echo $trailer; ?>" required>

			<label for="phone">Telefon *</label>
			<input type="tel" id="phone" name="phone" required>

			<label for="email">Email *</label>
			<input type="email" id="email" name="email" required>

			<label for="message">Besked</label>
			<textarea id="message" name="message"></textarea>

			<input type="submit" name="submit_contact_form" value="Send">
		</form>
		<?php

		return ob_get_clean(); // Return the buffered content
	}
	add_shortcode('custom_contact_form', 'cl_custom_contact_form_shortcode');

	if (isset($_POST['submit_contact_form'])) {
		// Sanitize input
		$name = sanitize_text_field($_POST['name']);
		$trailer = sanitize_text_field($_POST['trailer']);
		$phone = sanitize_text_field($_POST['phone']);
		$email = sanitize_email($_POST['email']);
		$message = sanitize_textarea_field($_POST['message']);

		// Compose email
		$to = 'casperholten@me.com';  // Replace with your email
		$subject = "Trailer leasing: $name";
		$headers = "Fra: $name <$email>";
		$content = "Navn: $name\nTrailer: $trailer\nTelefon: $phone\nEmail: $email\n\n$message";

		// Send email
		wp_mail($to, $subject, $content, $headers);

		// Redirect or display a message (you can adjust this based on your needs)
		wp_redirect(add_query_arg('form', 'sent', $_SERVER['REQUEST_URI']));
		exit;
	}
