document.addEventListener('DOMContentLoaded', () => {
    const ClypperBundlePriceCalculator = {
        init() {
            document.querySelectorAll('.bundled_product_excerpt').forEach(el => el.remove());
            document.body.addEventListener('change', e => {
                if (e.target.closest('.bundled_product_checkbox')) this.calculateTotal();
            });

            const quantityElement = document.querySelector('input[name="quantity"]');
            quantityElement.addEventListener('input', () => this.calculateTotal());

            const plusButton = document.querySelector('.plus');
            const minusButton = document.querySelector('.minus');

            plusButton.addEventListener('click', () => {
                setTimeout(() => {
                    this.calculateTotal();
                }, 30);
            });

            minusButton.addEventListener('click', () => {
                setTimeout(() => {
                    this.calculateTotal();
                }, 30);
            });

            this.calculateTotal();
        },

        calculateTotal() {
            const basePrice = parseFloat(cbpc_vars.basePrice) || 0;
            const finalPriceList = document.querySelector('.final-price-list');
            const fragment = document.createDocumentFragment();
            const quantity = this.getQuantity();

            const totalFromBundledProducts = Array.from(document.querySelectorAll('.bundled_product_checkbox:checked')).reduce((acc, checkbox) => {
                const details = checkbox.closest('.details');
                if (!details) return acc;

                const price = this.getPrice(details);
                const listItem = this.createListItem(this.getName(details), price);
                fragment.appendChild(listItem);

                return acc + price;
            }, 0);

            const total = basePrice * quantity + totalFromBundledProducts;

            if (quantity > 1) {
                const parentProductName = document.querySelector('.product-title').textContent.trim();
                fragment.prepend(this.createListItem(parentProductName, basePrice * quantity, quantity));
            }

            finalPriceList.innerHTML = '';
            finalPriceList.append(this.createTotalListItem(total), fragment);
        },


        getPrice(details) {
            const priceElement = details.querySelector('.price ins .woocommerce-Price-amount.amount') ||
                details.querySelector('.price .woocommerce-Price-amount.amount');
            const priceText = priceElement.textContent.replace(/[^0-9.,]/g, '').replace('.', '').replace(',', '.');
            return parseFloat(priceText) || 0;
        },

        getQuantity() {
            const quantityElement = document.querySelector('input[name="quantity"]');
            return parseInt(quantityElement.value, 10) || 1;
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

        createListItem(name, price, quantity = null) {
            const itemName = quantity ? `${quantity}x ${name}` : name;
            return this.createElement('li', 'bundled-product-total-item', [
                this.createElement('span', 'item-name', itemName),
                this.createElement('span', 'item-price', `${this.formatPrice(price)} kr.`)
            ]);
        },

        createTotalListItem(total) {
            return this.createElement('li', 'bundled-product-total', [
                this.createElement('span', 'total-text', 'Total: '),
                this.createElement('span', 'total-price', `${this.formatPrice(total)} kr. Inkl. moms`)
            ]);
        },

        formatPrice(number) {
            return number.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        }
    };

    ClypperBundlePriceCalculator.init();
});
