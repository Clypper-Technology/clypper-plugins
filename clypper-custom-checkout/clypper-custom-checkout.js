jQuery(document).ready(function($) {

    var warningId = 'cpr-warning';

    $('#cpr_number').on('input keyup', function(e) {
        var input = $(this);
        var val = input.val().replace(/[^0-9]/g, ''); // Allow only numbers
        input.val(val.length > 6 ? val.substring(0, 6) + '-' + val.substring(6, 10) : val); // Format input

        if(input.val().length > 11) {
            e.preventDefault();
            return false;
        }

        // Remove existing warnings
        $('#' + warningId).remove();

        if (input.val().length < 11 && input.val().length > 0) {
            input.after('<span id="' + warningId + '" style="color:red;">Manglende cifre i CPR-Nummeret.</span>');
            input.css('border-color', 'red'); // Make the border color red if incorrect
        } else if (input.val().length === 11) {
            input.css('border-color', 'green'); // Make the border color green if correct
        } else {
            input.css('border-color', ''); // Reset border color if the input is empty
        }
    });
});
