jQuery(document).ready(function($) {

    var warningId = 'cpr-warning';
    var billingCin = $('#billing_cin');
    var cvrField = $('input[name="cpr_number"]'); // Targeting input with the name 'cpr_number'
    var cvrCheckbox = $('input[name="user_agreement"]');
    var cvrWrapper = $('#cvr-checkout-field'); // Replace with the actual ID or class of your CVR field wrapper, if it exists
    var cvrRequired = $('input[name=is_cpr_required]');

    if(billingCin.val().length > 1) {
        hideCvr();
    } else {
        showCvr();
    }

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

    billingCin.on('input', function(){
        if(billingCin.val().trim()) {
            hideCvr();
        }else{
            showCvr();
        }
    });


    function hideCvr() {
        cvrWrapper.hide(300); // Hide the wrapper
        cvrField.prop('required',false); // Make cvrField non-required
        cvrCheckbox.prop('required',false); // Make cvrCheckbox non-required
        cvrRequired.val('0');
    }

    function showCvr() {
        cvrWrapper.show(300); // Show the wrapper
        cvrField.prop('required',true); // Make cvrField required
        cvrCheckbox.prop('required',false); // Make cvrCheckbox required
        cvrRequired.val('1');
    }
});