=== Roles & Rules B2B for WooCommerce ===
Contributors: Consortia, Tommy Hansen  
Tags: WooCommerce, B2B, B2C, pricing, roles, dynamic pricing, registration  
Requires at least: 5.0  
Tested up to: 6.7.2  
Stable tag: 2.5.5
Requires PHP: 5.6  
License: GPLv3  
License URI: http://www.gnu.org/licenses/gpl-3.0.html  

== Description ==  
**Tailored B2B and B2C Shopping Experiences Made Simple**  
Maximize your store’s potential with **Roles & Rules B2B for WooCommerce**, the ultimate solution for managing role-based pricing and dynamic shopping rules. This plugin simplifies complex pricing setups and allows you to create tailored shopping experiences for both B2B and B2C customers. 

**Key Benefits:**
* Unified role management for B2B and B2C customers
* Dynamic discounts like “Buy 3, Get 40% Off”
* Private shopping with hidden prices and restricted categories
* Customizable registration fields for tailored onboarding
* Granular role control for VAT exemptions and bulk role assignments

== Key Features ==  
* ** Streamlined Role Management **: Efficiently manage B2B and B2C roles from one interface, with tools to assign roles and capabilities.  
* ** Dynamic Pricing Rules **: Create flexible pricing rules directly from base product prices—no manual adjustments needed.  
* ** Product- and Category-Specific Discounts **: Set targeted promotions for specific products or categories.  
* ** Automatic Storewide Sales **: Schedule sales for specific roles with adjustable start and end dates.  
* ** Enhanced Privacy Settings **: Hide prices or restrict visibility for categories based on roles or login status.  
* ** Role-Based VAT and Tax Control **: Apply VAT exemptions, display net prices, or enable tax-free pricing for specific roles.

== Installation ==  
1. Upload the plugin files to `/wp-content/plugins/` or install via WordPress Plugin screen.  
2. Activate the plugin through the 'Plugins' screen in WordPress.  
3. Configure your settings via WooCommerce > Settings > Roles & Rules B2B.

== Frequently Asked Questions ==  

= Can I manage both B2B and B2C customers with this plugin? =  
Yes, the plugin is designed to handle both B2B and B2C roles from one unified interface.

= Can I create custom discounts for specific roles? =  
Absolutely! You can set dynamic pricing rules and create discounts for specific products, categories, or roles.

= Is it possible to hide prices for non-logged-in users? =  
Yes, you can hide prices or restrict category visibility for non-logged-in users or specific roles.

== Changelog ==  

= 2025-05-22 - version 2.5.5 =
* Fix - Added option in settings to force variable price to get price in a different way in cases where conflicts with other code or the like

= 2025-05-02 - version 2.5.4 =
* Fix - Sometimes a role can be created in RRB2B, but not be created in WP (roles), added logging for this and improvements when adding roles.
* Fix - Added Missing for roles not created in WP 
* Dev - Minor fixes and improvements

= 2025-03-06 - version 2.5.3 =
* Fix - Minor fix for creating user on checkout 

= 2025-02-12 - version 2.5.2 =
* New - Added Dark Mode Style (option in settings)
* Fix - Minor fix in query for rules 
* Dev - Minor fixes and improvements

= 2025-01-14 - version 2.5.1 =
* Fix - Minor fixes that had inpact on the products tab 

= 2024-12-09 - version 2.4.13 =
* Fix - Made a lot of UI (CSS) changes and improvements
* Fix - Removed old multiselect and replaced with select2
* Other - Minor fixes and improvements 

= 2024-09-20 - version 2.4.12 =
* Fix - Minor fix in menu to support new WooCommerce version 
* New - Added API integration - when order is created using API, return role prices 
* Other - Minor fixes and improvements

= 2024-09-18 - version 2.4.11 =
* Fix - Added price ex. VAT in Product Rules 
* Fix - Added regular price (strikethrough) and the discounted price in cart 
* New - Added padding, border, border radius, font family, font weight and font transform to discount price labels 
* Other - Minor fixes and improvements

= 2024-09-07 - version 2.4.10 = 
* Fix - Minor fix in meta box in edit order page, support for HPOS is added

= 2024-09-05 - version 2.4.9 =
* New - Added meta box in edit order page, enables adding role prices when adding or editing a order.
* Fix - Fixes in languages (did not translate strings)
* Other - Minor fixes and improvements

= 2024-07-29 - version 2.4.8 =
* New - Added option to copy rule to multiple roles (both category rules and product rules)
* New - Find duplicates, finds duplicates and mark them red and checked - ready for delete (both in category rules and product rules)
* Fix - Minor updates in look and feel in General rules 

** See changelog file for full history... 

== License ==  
This plugin is licensed under the GPLv3. See http://www.gnu.org/licenses/gpl-3.0.html for details.
