<?php

?>
<div class="payever-widget-finexp" data-widgetid="04abea71-c635-4a6f-aded-bf12b8b8d19f" data-checkoutid="fc43d431-338a-5a00-a828-8210cbb1ac3b" data-business="c96a3831-7d73-46e2-91dd-4719b604a261" data-type="dropdownCalculator" data-reference="order-id" data-amount="67500.00"></div>
 <script>
      var script = document.createElement('script');
      script.src = 'https://widgets.payever.org/finance-express/widget.min.js';
      script.onload = function() {
          PayeverPaymentWidgetLoader.init(
              '.payever-widget-finexp'
          );
      };
      document.head.appendChild(script);
 </script>
