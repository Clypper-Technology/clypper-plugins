document.addEventListener('DOMContentLoaded', function () {
    const ClypperBundlePriceCalculator = {
        init() {
            this.removeExcerptElements();
            this.addCheckboxEventListeners();
        },

        removeExcerptElements() {
            document.querySelectorAll('.bundled_product_excerpt').forEach(element => element.remove());
        },

        addCheckboxEventListeners() {
            document.body.addEventListener('change', (event) => {
                const checkbox = event.target.closest('.bundled_product_checkbox');
                if (checkbox) this.calculateTotal();
            });
        },

        calculateTotal() {
            const basePrice = parseFloat(cbpc_vars.basePrice) || 0;
            const finalPriceList = document.querySelector('.final-price-list');
            const fragment = document.createDocumentFragment();

            const total = Array.from(document.querySelectorAll('.bundled_product_checkbox:checked')).reduce((acc, checkbox) => {
                const details = checkbox.closest('.details');
                if (!details) return acc;

                const price = this.getPrice(details);
                const name = this.getName(details);

                fragment.appendChild(this.createListItem(name, price));
                return acc + price;
            }, basePrice);

            // Clear the previous list and Append the total at the top of the list
            finalPriceList.innerHTML = '';
            finalPriceList.appendChild(this.createTotalListItem(total));
            finalPriceList.appendChild(fragment);
        },

        getPrice(details) {
            // Try to find the <ins> tag for discounted price first
            const discountedPriceElement = details.querySelector('.price ins .woocommerce-Price-amount.amount');
            if (discountedPriceElement) {
                return parseFloat(discountedPriceElement.textContent.replace(/[^0-9.,]/g, '').replace(',', '.')) || 0;
            }

            // If there is no <ins> tag, then get the regular price
            const priceElement = details.querySelector('.price .woocommerce-Price-amount.amount');
            return parseFloat(priceElement.textContent.replace(/[^0-9.,]/g, '').replace(',', '.')) || 0;
        },

        getName(details) {
            const nameElement = details.querySelector('.bundled_product_title_inner');
            return nameElement.textContent.trim() || '';
        },

        createListItem(name, price) {
            const listItem = this.createElement('li', 'bundled-product-total-item', [
                this.createElement('span', 'item-name', name),
                this.createElement('span', 'item-price', `${price.toFixed(2)} kr.`)
            ]);
            return listItem;
        },

        createElement(tag, className, content = '') {
            const element = document.createElement(tag);
            element.className = className;
            if (Array.isArray(content)) content.forEach(child => element.appendChild(child));
            else element.textContent = content;
            return element;
        },

        createTotalListItem(total) {
            return this.createElement('li', 'bundled-product-total', `Total: ${total.toFixed(2)} kr. Inkl. moms`);
        }
    };

    ClypperBundlePriceCalculator.init();
});
