# Clypper's Role Based Pricing

![WordPress Plugin Version](https://img.shields.io/badge/version-2.5.7-blue.svg)
![WordPress Tested](https://img.shields.io/badge/WordPress-6.8.1%20tested-brightgreen.svg)
![WooCommerce Tested](https://img.shields.io/badge/WooCommerce-9.8.5%20tested-brightgreen.svg)
![PHP Version](https://img.shields.io/badge/PHP-7.4%2B-purple.svg)
![License](https://img.shields.io/badge/license-GPL--3.0-orange.svg)

**Part of the Clypper Plugin Series**

**Tailored B2B and B2C Shopping Experiences Made Simple**

Maximize your store's potential with **Clypper's Role Based Pricing**, the ultimate solution for managing role-based pricing and dynamic shopping rules. This plugin simplifies complex pricing setups and allows you to create tailored shopping experiences for both B2B and B2C customers.

## 🚀 Key Features

- **🎯 Role-Based Pricing** - Different prices for wholesalers, retailers, VIP customers, and more
- **💰 Dynamic Discounts** - "Buy 3, Get 40% Off" quantity-based pricing rules
- **📦 Product & Category Rules** - Targeted promotions for specific products or entire categories
- **🔒 Private Shopping** - Hide prices or restrict categories by role or login status
- **🏷️ VAT Management** - Role-specific VAT exemptions and net/gross price display
- **📝 Custom Registration** - Collect company information (CVR, company type) during registration
- **👥 Role Management** - Create custom B2B roles with specific capabilities
- **📊 Admin Dashboard** - Comprehensive interface for managing all pricing rules
- **🔌 REST API** - Modern REST API for programmatic rule management (New!)

## 📋 Requirements

- **WordPress:** 5.0 or higher
- **WooCommerce:** 3.5 or higher
- **PHP:** 7.4 or higher (8.1+ recommended)
- **Node.js:** 18.0+ (for development)
- **Composer:** 2.0+ (for development)

## 🛠️ Installation

### For Users

1. Download the plugin from the [WordPress Plugin Directory](https://wordpress.org/plugins/)
2. Upload to `/wp-content/plugins/` directory
3. Activate through the 'Plugins' menu in WordPress
4. Configure settings via **WooCommerce > Clypper's Role Based Pricing**

### For Developers

```bash
# Clone the repository
git clone https://github.com/clypper-technology/clypper-role-pricing.git
cd clypper-role-pricing

# Install PHP dependencies
composer install

# Install Node dependencies
npm install

# Start local development environment (wp-env with WooCommerce)
npm run setup
```

## 🏗️ Development Setup

This plugin uses `@wordpress/env` for local development with WooCommerce pre-installed.

### Starting Development Environment

```bash
# Start WordPress + WooCommerce environment
npm run start

# Your site will be available at:
# http://localhost:8888
# Admin: http://localhost:8888/wp-admin
# Username: admin
# Password: password
```

### Available npm Scripts

| Command | Description |
|---------|-------------|
| `npm run start` | Start wp-env development environment |
| `npm run stop` | Stop the development environment |
| `npm run restart` | Restart the environment |
| `npm run clean` | Clean all wp-env data |
| `npm run logs` | View WordPress logs |
| `npm run wp` | Run WP-CLI commands |
| `npm run setup` | Start environment + activate plugins |
| `npm run test:php` | Run PHPUnit tests |
| `npm run test:php:watch` | Run tests in watch mode |

### Running Tests

```bash
# Run all PHP tests
npm run test:php

# Run specific test suite
composer run test:unit
composer run test:integration

# Generate coverage report
composer run test:coverage
```

### Project Structure

```
clypper-role-pricing/
├── assets/                    # CSS, JS, and images
│   ├── css/
│   │   ├── rrb2b.css         # Main styles
│   │   └── rrb2b-dark.css    # Dark mode styles
│   └── js/
│       ├── rrb2b.js          # Main JavaScript
│       └── rrb2b.min.js      # Minified version
├── includes/                  # PHP source code
│   ├── Rules/                 # Domain models for pricing rules
│   │   ├── Rule.php          # Core rule calculation logic
│   │   ├── RoleRules.php     # Rule collection per role
│   │   ├── ProductRule.php   # Product-specific rules
│   │   └── CategoryRule.php  # Category-specific rules
│   ├── Services/              # Business logic layer
│   │   ├── RuleService.php   # CRUD for rules
│   │   └── RoleService.php   # Role management
│   ├── Admin.php              # Admin menu & request handling
│   ├── AjaxHandler.php        # AJAX endpoints
│   ├── RegistrationForm.php   # Custom registration fields
│   └── Users.php              # User profile extensions
├── languages/                 # Translation files
├── tests/                     # Test files
│   ├── Unit/                  # Unit tests
│   ├── Integration/           # Integration tests
│   └── bootstrap.php          # Test bootstrap
├── vendor/                    # Composer dependencies
├── .wp-env.json              # wp-env configuration
├── composer.json             # PHP dependencies
├── package.json              # Node dependencies
├── phpunit.xml.dist          # PHPUnit configuration
└── clypper-role-pricing.php  # Main plugin file
```

## 🏛️ Architecture

This plugin follows modern PHP best practices with a clean architecture:

- **Namespace:** `ClypperTechnology\RolePricing`
- **PSR-4 Autoloading:** Via Composer
- **Service Layer Pattern:** Separates business logic from controllers
- **Domain-Driven Design:** Clear domain models (Rules, Services)
- **WooCommerce Integration:** Hooks into price filters and admin
- **HPOS Compatible:** Supports High-Performance Order Storage

### Key Components

- **Rules System:** Handles pricing calculation logic (5 rule types: percent discount/increase, fixed discount/increase, fixed price)
- **Service Layer:** Manages data persistence and business operations
- **Admin Interface:** Provides UI for managing rules and roles
- **AJAX Handlers:** Process admin operations asynchronously
- **Registration Extensions:** Custom fields for B2B onboarding

## 🔧 Configuration

### wp-env Configuration

The `.wp-env.json` file configures your local development environment:

```json
{
  "core": "WordPress/WordPress#6.8.1",
  "phpVersion": "8.1",
  "plugins": [
    "https://downloads.wordpress.org/plugin/woocommerce.9.8.5.zip",
    "."
  ],
  "port": 8888
}
```

### Environment Variables

WordPress debugging is enabled by default in development:

- `WP_DEBUG`: true
- `WP_DEBUG_LOG`: true
- `WP_DEBUG_DISPLAY`: false
- `SCRIPT_DEBUG`: true

## 🧪 Testing

### Test Structure

```
tests/
├── Unit/                      # Unit tests (no WordPress)
│   └── RuleServiceTest.php   # Example unit test
├── Integration/               # Integration tests (with WordPress)
│   └── AdminTest.php         # Example integration test
└── bootstrap.php             # Loads WordPress test environment
```

### Writing Tests

```php
<?php
namespace ClypperTechnology\RolePricing\Tests\Unit;

use ClypperTechnology\RolePricing\Services\RuleService;
use PHPUnit\Framework\TestCase;

class RuleServiceTest extends TestCase {
    public function test_can_create_rule(): void {
        $service = new RuleService();
        // Your test logic here
        $this->assertTrue(true);
    }
}
```

## 📚 Documentation

- **User Guide:** See [readme.txt](readme.txt) for end-user documentation
- **Changelog:** See [changelog.txt](changelog.txt) for version history
- **REST API:** See [REST-API.md](REST-API.md) for REST API documentation
- **Contributing Guide:** Coming soon

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests (`npm run test:php`)
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Coding Standards

- Follow [WordPress PHP Coding Standards](https://developer.wordpress.org/coding-standards/wordpress-coding-standards/php/)
- Use type hints for PHP 7.4+
- Write tests for new features
- Document complex logic with inline comments

## 📝 License

This plugin is licensed under the **GNU General Public License v3.0 or later**.

See [LICENSE](http://www.gnu.org/licenses/gpl-3.0.html) for details.

## 👨‍💻 Authors

- **Consortia AS** - *Original Development (2018-2024)*
- **Clypper Technology** - *Current Maintenance and Development (2024-Present)*

## 🐛 Support

For issues, questions, or feature requests:

- **GitHub Issues:** [Report an issue](https://github.com/clypper-technology/clypper-role-pricing/issues)
- **Email:** support@clypper.dk

## 🎯 Roadmap

- [x] REST API endpoints for modern integrations
- [ ] Additional REST endpoints (products, categories, roles)
- [ ] GraphQL support
- [ ] Gutenberg blocks for pricing display
- [ ] Enhanced test coverage (>80%)
- [ ] CI/CD pipeline with GitHub Actions
- [ ] Internationalization improvements

## 📊 Compatibility

| Platform | Version | Status |
|----------|---------|--------|
| WordPress | 6.8.1 | ✅ Tested |
| WooCommerce | 9.8.5 | ✅ Tested |
| PHP | 8.1 | ✅ Recommended |
| PHP | 7.4 | ✅ Supported |
| HPOS | Latest | ✅ Compatible |

---

**Part of the Clypper Plugin Series - Made with ❤️ by [Clypper Technology](https://clypper.dk)**
