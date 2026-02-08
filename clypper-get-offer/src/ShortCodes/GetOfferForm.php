<?php

namespace ClypperTechnology\ClypperGetOffer\ShortCodes;

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

class GetOfferForm {

    public function __construct() {
        add_shortcode('get_offer_form', [$this, 'get_offer_form']);
        add_action('init', [$this, 'get_offer_form_submission']);
    }

    public function get_offer_form() {
        // Check for trailer in the query string
        $trailer = isset($_GET['trailer']) ? sanitize_text_field($_GET['trailer']) : '';

        // Check for mail send status
        $mail_status = get_transient('mail_send_status');

        if ($mail_status) {
            if ($mail_status == 'success') {
                echo '<div class="notice notice-success">Tak for din henvendelse! Vi har nu modtaget din besked</div>';
            } else {
                echo '<div class="notice notice-error">Der har været en fejl under afsendelsen af din besked. Prøv igen senere</div>';
            }

            // Delete the transient after displaying the message
            delete_transient('mail_send_status');
        }

        ob_start(); // Start output buffering to capture the form HTML

        ?>
        <form action="" method="post">

            <?php wp_nonce_field('get_offer_form', 'get_offer_form_nonce'); ?>

            <label for="name">Navn *</label>
            <input type="text" id="name" name="name" required>

            <label for="trailer">Trailer *</label>
            <input type="text" id="trailer" name="trailer" value="<?php echo esc_attr($trailer); ?>" required>

            <label for="phone">Telefon *</label>
            <input type="tel" id="phone" name="phone" required>

            <label for="email">Email *</label>
            <input type="email" id="email" name="email" required>

            <label for="cvr">CVR-Nummer</label>
            <input type="text" id="cvr" name="cvr">

            <label for="message">Besked</label>
            <textarea id="message" name="message"></textarea>

            <input type="submit" name="submit_contact_form" value="Send">
        </form>
        <?php

        return ob_get_clean(); // Return the buffered content
    }

    public function get_offer_form_submission(): void {
        if (isset($_POST['submit_contact_form'])) {
            // Verify the nonce:
            if (!isset($_POST['get_offer_form_nonce']) || !wp_verify_nonce($_POST['get_offer_form_nonce'], 'get_offer_form')) {
                die('Security check failed.');
            }

            // Sanitize input
            $name    = sanitize_text_field( $_POST['name'] );
            $trailer = sanitize_text_field( $_POST['trailer'] );
            $phone   = sanitize_text_field( $_POST['phone'] );
            $email   = sanitize_email( $_POST['email'] );
            $cvr = !empty($_POST['cvr']) ? sanitize_text_field($_POST['cvr']) : 'Ikke oplyst';
            $message = sanitize_textarea_field( $_POST['message'] );

            if($cvr == null) {
                $cvr = "";
            }

            // Compose email
            $to      = 'salg@trekantens-trailercenter.dk';
            $subject = "Tilbudsforespørgsel: $name";
            $headers = "Fra: $name <$email>";
            $content = "Navn: $name\nTrailer: $trailer\nTelefon: $phone\nEmail: $email\nCVR: $cvr\n\n$message";

            // Send email
            if (wp_mail($to, $subject, $content, $headers)) {
                set_transient('mail_send_status', 'success', 60); // 60 seconds
            } else {
                set_transient('mail_send_status', 'failure', 60);
            }

            wp_redirect(remove_query_arg('form', $_SERVER['REQUEST_URI']));
            exit;
        }
    }
}
