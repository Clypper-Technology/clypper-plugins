document.addEventListener('DOMContentLoaded', () => {
    const ClypperBundlePriceCalculator = {
        init() {
            document.querySelectorAll('.bundled_product_excerpt').forEach(el => el.remove());
            document.body.addEventListener('change', e => {
                if (e.target.closest('.bundled_product_checkbox')) this.calculateTotal();
            });
            this.calculateTotal();
        },

        calculateTotal() {
            const basePrice = parseFloat(cbpc_vars.basePrice) || 0;
            const finalPriceList = document.querySelector('.final-price-list');
            const fragment = document.createDocumentFragment();

            const total = Array.from(document.querySelectorAll('.bundled_product_checkbox:checked')).reduce((acc, checkbox) => {
                const details = checkbox.closest('.details');
                if (!details) return acc;

                const price = this.getPrice(details);
                fragment.appendChild(this.createListItem(this.getName(details), price));

                return acc + price;
            }, basePrice);

            finalPriceList.innerHTML = '';
            finalPriceList.append(this.createTotalListItem(total), fragment);
        },

        getPrice(details) {
            const priceElement = details.querySelector('.price ins .woocommerce-Price-amount.amount') ||
                details.querySelector('.price .woocommerce-Price-amount.amount');
            const priceText = priceElement.textContent.replace(/[^0-9.,]/g, '').replace('.', '').replace(',', '.');
            return parseFloat(priceText) || 0;
        },

        getName(details) {
            return details.querySelector('.bundled_product_title_inner').textContent.trim();
        },

        createElement(tag, className, content = '') {
            const el = document.createElement(tag);
            el.className = className;
            Array.isArray(content) ? content.forEach(c => el.appendChild(c)) : el.textContent = content;
            return el;
        },

        createListItem(name, price) {
            return this.createElement('li', 'bundled-product-total-item', [
                this.createElement('span', 'item-name', name),
                this.createElement('span', 'item-price', `${this.formatPrice(price)} kr.`)
            ]);
        },

        createTotalListItem(total) {
            return this.createElement('li', 'bundled-product-total', `Total: ${this.formatPrice(total)} kr. Inkl. moms`);
        },

        formatPrice(number) {
            return number.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        }
    };

    ClypperBundlePriceCalculator.init();
});
