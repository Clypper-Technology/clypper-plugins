const ClypperBundlePriceCalculator = {
    init() {
        this.finalPriceElement = document.querySelector('.final-price');
        this.quantityElement = document.querySelector('input[name="quantity"]');
        this.isProcessingClick = false;
        
        this.cleanupDOM();
        this.setupEventListeners();
        this.calculateTotal();
        this.selectNummerplade();
    },
    
    cleanupDOM() {
        document.querySelectorAll('.bundled_product_excerpt').forEach(el => el.remove());
        
        document.querySelectorAll('.bundled_product a').forEach(link => {
            const parent = link.parentNode;
            while (link.firstChild) parent.insertBefore(link.firstChild, link);
            parent.removeChild(link);
        });

        document.querySelectorAll('.bundled_product').forEach(product => {
            product.style.cursor = 'pointer';
            const checkbox = product.querySelector('.bundled_product_checkbox');
            if (checkbox) this.updateProductStyle(product, checkbox.checked);
        });
    },
    
    setupEventListeners() {
        if (this.quantityElement) {
            this.quantityElement.addEventListener('input', () => this.calculateTotal());
        }
        
        ['plus', 'minus'].forEach(btnClass => {
            const button = document.querySelector('.' + btnClass);
            if (button) {
                button.addEventListener('click', () => setTimeout(() => this.calculateTotal(), 30));
            }
        });
        
        document.querySelectorAll('.bundled_product_checkbox').forEach(checkbox => {
            checkbox.addEventListener('change', () => this.calculateTotal());
        });
        
        document.addEventListener('click', event => {
            if (this.isProcessingClick) return;
            this.isProcessingClick = true;
            
            setTimeout(() => { this.isProcessingClick = false; }, 0);
            
            const product = event.target.closest('.bundled_product');
            if (!product) return;
            
            const checkbox = product.querySelector('.bundled_product_checkbox');
            if (!checkbox) return;
            
            if (event.target === checkbox || event.target.closest('label.bundled_product_optional_checkbox')) {
                setTimeout(() => this.updateProductStyle(product, checkbox.checked), 0);
                return;
            }
            
            checkbox.checked = !checkbox.checked;
            this.updateProductStyle(product, checkbox.checked);
            checkbox.dispatchEvent(new Event('change', { bubbles: true }));
            
            event.preventDefault();
            event.stopImmediatePropagation();
        }, true);
    },
    
    selectNummerplade() {
        document.querySelectorAll('.bundled_product_title_inner').forEach(element => {
            if (element.textContent.trim() === 'Nummerplade') {
                const checkbox = element.closest('.bundled_product')?.querySelector('input[type="checkbox"]');
                if (checkbox && !checkbox.checked) {
                    checkbox.checked = true;
                    checkbox.dispatchEvent(new Event('change', { bubbles: true }));
                }
            }
        });
    },
    
    updateProductStyle(product, isChecked) {
        product.classList.toggle('bundled-product-selected', isChecked);
    },
    
    calculateTotal() {
        const basePrice = this.getSafeBasePrice();
        const quantity = this.getQuantity();
        const totalFromBundledProducts = this.calculateBundledProductsTotal();
        const total = basePrice * quantity + totalFromBundledProducts;
        
        this.updatePriceDisplay(total);
        
        // Update the styling after calculation
        document.querySelectorAll('.bundled_product').forEach(product => {
            const checkbox = product.querySelector('.bundled_product_checkbox');
            if (checkbox) this.updateProductStyle(product, checkbox.checked);
        });
    },
    
    getSafeBasePrice() {
        if (typeof cbpc_vars === 'undefined' || typeof cbpc_vars.basePrice === 'undefined') {
            return 0;
        }
        return parseFloat(cbpc_vars.basePrice) || 0;
    },
    
    calculateBundledProductsTotal() {
        return Array.from(
            document.querySelectorAll('.bundled_product_checkbox:checked')
        ).reduce((acc, checkbox) => {
            const details = checkbox.closest('.details');
            if (!details) return acc;
            return acc + this.getPrice(details);
        }, 0);
    },
    
    getPrice(details) {
        const priceElement = details.querySelector('.price ins .woocommerce-Price-amount.amount') ||
            details.querySelector('.price .woocommerce-Price-amount.amount');
            
        if (!priceElement) return 0;
        
        const priceText = priceElement.textContent
            .replace(/[^0-9.,]/g, '')
            .replace('.', '')
            .replace(',', '.');
            
        return parseFloat(priceText) || 0;
    },
    
    getQuantity() {
        return this.quantityElement ? (parseInt(this.quantityElement.value, 10) || 1) : 1;
    },
    
    updatePriceDisplay(total) {
        this.finalPriceElement.innerHTML = '';
        this.finalPriceElement.appendChild(this.createTotalListItem(total));
    },
    
    createTotalListItem(total) {
        return this.createElement('p', 'bundled-product-total', [
            this.createElement('span', 'total-text', 'Total: '),
            this.createElement('span', 'total-price', `${this.formatPrice(total)} kr. Inkl. moms`)
        ]);
    },
    
    createElement(tag, className, content = '') {
        const el = document.createElement(tag);
        el.className = className;
        
        if (Array.isArray(content)) {
            content.forEach(c => el.appendChild(c));
        } else {
            el.textContent = content;
        }
        
        return el;
    },
    
    formatPrice(number) {
        return number.toLocaleString('de-DE', { 
            minimumFractionDigits: 2, 
            maximumFractionDigits: 2 
        });
    }
};

document.addEventListener('DOMContentLoaded', () => ClypperBundlePriceCalculator.init());

jQuery(window).on('load', () => setTimeout(() => ClypperBundlePriceCalculator.init(), 300));