<?php
/**
 * Roles & Rules B2B
 *
 * @package Roles&RulesB2B/includes
 */

namespace ClypperTechnology\RolePricing\Admin;

use ClypperTechnology\RolePricing\Services\RoleService;
use ClypperTechnology\RolePricing\Services\RuleService;

defined('ABSPATH') || exit;

/**
 * Class for templates
 */
class Layout
{

    /**
     * Functions
     *
     * @var var $functions .
     */
    public $functions;

    /**
     * Constructor
     */
    public function __construct(RoleService $role_service, RuleService $rule_service)
    {
        $this->functions = new Templates($rule_service, $role_service);
    }

    /**
     * Get page
     */
    public function rrb2b_get_main_page()
    {

        $tab = (!empty(filter_input(1, 'tab', FILTER_SANITIZE_FULL_SPECIAL_CHARS))) ? filter_input(1, 'tab', FILTER_SANITIZE_FULL_SPECIAL_CHARS) : 'rules';

        ?>
        <div class="rrb2b-main">
            <?php
            $this->rrb2b_get_main_header();
            self::rrb2b_get_notices();

            switch ($tab) {
                case 'rules':
                    $this->rrb2b_get_rules_table();
                    break;
                case 'categories':
                    $this->rrb2b_get_rules_categories_table();
                    break;
                case 'products':
                    $this->rrb2b_get_rules_products_table();
                    break;
            }

            ?>
            <?php wp_nonce_field('rrb2b_id'); ?>
            <input type="hidden" id="msg-confirm-delete"
                   value="<?php esc_attr_e('You are about to delete a rule, are you sure?', 'clypper-role-pricing'); ?>">
        </div>
        <?php
    }

    /**
     * Get General Rules table
     */
    public function rrb2b_get_rules_table(): void
    {
        ?>
        <div class="wrap"> <!-- Table -->
            <table class="widefat fixed striped posts rrb2b-table" id="rrb2b_table" style="width:100%;">
                <thead>
                <tr>
                    <th style="width: 50px;"><?php esc_attr_e('Active', 'clypper-role-pricing'); ?></th>
                    <th style="width: 190px;"><i
                                class="fas fa-user-tag"></i> <?php esc_attr_e('Role', 'clypper-role-pricing'); ?></i>
                    </th>
                    <th><i class="fas fa-sliders-h"></i> <?php esc_attr_e('Rule: General', 'clypper-role-pricing'); ?>
                    </th>
                </tr>
                </thead>
                <tbody id="rrb2b-list">
                <?php $this->functions->rrb2b_get_rules(); ?>
                </tbody>
            </table>

        </div>

        <?php
    }

    /**
     * Get notices
     */
    private static function rrb2b_get_notices()
    {
        ?>
        <div id="cas-notice-product-changed" class="notice notice-info is-dismissible cas-notice1">
            <p>
                <?php echo esc_attr__('Product Rules Saved!', 'clypper-role-pricing'); ?>
                </a>
            </p>
        </div>
        <div id="cas-notice-category-changed" class="notice notice-info is-dismissible cas-notice2">
            <p>
                <?php echo esc_attr__('Categories Rules Saved!', 'clypper-role-pricing'); ?>
                </a>
            </p>
        </div>
        <div id="cas-notice-rules-copied" class="notice notice-info is-dismissible cas-notice3">
            <p>
                <?php echo esc_attr__('Rules Copied', 'clypper-role-pricing'); ?>
                </a>
            </p>
        </div>
        <?php
    }

    /**
     * Get rules for products
     */
    public function rrb2b_get_rules_products_table()
    {

        $order = (!empty(filter_input(1, 'order', FILTER_SANITIZE_FULL_SPECIAL_CHARS))) ? filter_input(1, 'order', FILTER_SANITIZE_FULL_SPECIAL_CHARS) : '';

        if (empty($order) || 'ASC' === $order) {
            $order = 'DESC';
        } else {
            $order = 'ASC';
        }

        $url = admin_url('admin.php?page=rrb2b&order=' . $order);

        ?>
        <div class="wrap"> <!-- Table -->
            <table class="widefat fixed striped posts rrb2b-table" id="rrb2b_table" style="width:100%;">
                <thead>
                <tr>
                    <th style="width: 210px;"><i class="fas fa-user-tag"></i> <a
                                href="<?php echo esc_url($url . '&tab=products'); ?>"> <?php esc_attr_e('Role', 'clypper-role-pricing'); ?>
                            <i class="fas fa-sort"></i> </a></th>
                    <th>
                        <i class="fas fa-sliders-h"></i> <?php esc_attr_e('Rule: Products (overrides category rule)', 'clypper-role-pricing'); ?>
                    </th>
                </tr>
                </thead>
                <tbody id="rrb2b-list">
                <?php $this->functions->rrb2b_get_rules_products(); ?>
                </tbody>
                <tfoot>
                <tr>
                    <td></td>
                    <td></td>
                </tr>
                </tfoot>
            </table>

        </div>
        <?php
    }

    /**
     * Get rules for categories
     */
    public function rrb2b_get_rules_categories_table()
    {

        $order = (!empty(filter_input(1, 'order', FILTER_SANITIZE_FULL_SPECIAL_CHARS))) ? filter_input(1, 'order', FILTER_SANITIZE_FULL_SPECIAL_CHARS) : '';

        if (empty($order) || 'ASC' === $order) {
            $order = 'DESC';
        } else {
            $order = 'ASC';
        }

        $url = admin_url('admin.php?page=rrb2b&order=' . $order);
        ?>
        <div class="wrap"> <!-- Table -->
            <table class="widefat fixed striped posts rrb2b-table" id="rrb2b_table" style="width:100%;">
                <thead>
                <tr>
                    <th style="width: 300px;"><i class="fas fa-user-tag"></i> <a
                                href="<?php echo esc_url($url . '&tab=categories'); ?>"> <?php esc_attr_e('Role', 'clypper-role-pricing'); ?>
                            <i class="fas fa-sort"></i> </a></th>
                    <th>
                        <i class="fas fa-sliders-h"></i> <?php esc_attr_e('Rule: Products in Category', 'clypper-role-pricing'); ?>
                    </th>
                </tr>
                </thead>
                <tbody id="rrb2b-list">
                <?php $this->functions->rrb2b_get_rules_categories(); ?>
                </tbody>
                <tfoot>
                <tr>
                    <td></td>
                    <td></td>
                </tr>
                </tfoot>
            </table>

        </div>

        <?php
    }


    /**
     * Get header
     */
    public function rrb2b_get_main_header()
    {

        $tab = (!empty(filter_input(1, 'tab', FILTER_SANITIZE_FULL_SPECIAL_CHARS))) ? filter_input(1, 'tab', FILTER_SANITIZE_FULL_SPECIAL_CHARS) : 'rules';
        $filter_rule = (!empty(filter_input(1, 'filter', FILTER_SANITIZE_FULL_SPECIAL_CHARS))) ? '&filter=' . filter_input(1, 'filter', FILTER_SANITIZE_FULL_SPECIAL_CHARS) : '';
        $url = admin_url('admin.php?page=rrb2b');

        ?>
        <div class="wrap">
            <h1 class="wp-heading-inline"><?php esc_html_e('Roles & Rules B2B', 'clypper-role-pricing'); ?></h1>
        </div>
        <div class="wrap woocommerce">
            <nav class="nav-tab-wrapper woo-nav-tab-wrapper">
                <a href="<?php echo esc_url($url . '&tab=rules' . $filter_rule); ?>"
                   class="nav-tab <?php echo ('rules' === $tab) ? 'nav-tab-active' : ''; ?>"><i
                            class="fas fa-sliders-h"></i> <?php esc_attr_e('General Rules', 'clypper-role-pricing'); ?>
                </a>
                <a href="<?php echo esc_url($url . '&tab=categories' . $filter_rule); ?>"
                   class="nav-tab <?php echo ('categories' === $tab) ? 'nav-tab-active' : ''; ?>"><i
                            class="fas fa-sliders-h"></i> <?php esc_attr_e('Category Rules', 'clypper-role-pricing'); ?>
                </a>
                <a href="<?php echo esc_url($url . '&tab=products' . $filter_rule); ?>"
                   class="nav-tab <?php echo ('products' === $tab) ? 'nav-tab-active' : ''; ?>"><i
                            class="fas fa-sliders-h"></i> <?php esc_attr_e('Product Rules', 'clypper-role-pricing'); ?>
                </a>
            </nav>

            <?php
            if ('rules' === $tab) {
                ?>
                <ul class="subsubsub" style="margin-bottom:15px;margin-top:15px;">
                    <li>
                        <select name="filter_role" id="product_filter_role" onchange="productFilterByRole();">
                            <option value=""
                                    selected="selected"><?php esc_html_e('Filter by role ( none )', 'clypper-role-pricing'); ?></option>
                            <?php $this->functions->rrb2b_get_filter_roles(); ?>
                        </select>
                    </li>
                    <li>
                        <form method="post" id="rrb2b_add_rule"
                              action="<?php esc_attr_e(admin_url('admin-post.php')); ?>">
                            <input type="hidden" name="action" value="rrb2b_add_rule">
                            <?php wp_nonce_field('rrb2b_id'); ?>
                            <label for="role"
                                   style="padding-left: 20px;"><?php esc_html_e('Add rules for:', 'clypper-role-pricing'); ?></label>
                            <select name="role" id="select_role_to_add">
                                <option value="guest"><?php esc_html_e('Guest ( B2C customers )', 'clypper-role-pricing'); ?></option>
                                <?php esc_attr_e($this->functions->rrb2b_dropdown_roles('')); ?>
                            </select>
                            <button class="button" type="submit" name="btn_add_rule"
                                    title="<?php esc_html_e('Add Role and set up Rules', 'clypper-role-pricing'); ?>"><i
                                        class="fas fa-plus-circle"></i></button>
                            <a class="button" style="margin-left: 20px;position:absolute;right:20px;" type="button"
                               name="btn_settings"
                               href="<?php echo esc_url(admin_url('admin.php?page=wc-settings&tab=rrb2b')); ?>"><i
                                        class="fas fa-cog"></i> <?php esc_attr_e('Settings', 'clypper-role-pricing'); ?>
                            </a>
                        </form>
                    </li>

                </ul>
                <?php
            } elseif ('products' === $tab) {
                ?>
                <ul class="subsubsub" style="margin-bottom:15px;margin-top:15px;">
                    <li>
                        <select name="filter_role" id="product_filter_role" onchange="productFilterByRole();">
                            <option value=""
                                    selected="selected"><?php esc_html_e('Filter by role ( none )', 'clypper-role-pricing'); ?></option>
                            <?php $this->functions->rrb2b_get_filter_roles(); ?>
                        </select>
                    </li>
                    <li>
                        <label for="copy_product_rule_from"
                               style="padding-left:20px;padding-right:4px;"><?php esc_html_e('Copy Rule:', 'clypper-role-pricing'); ?></label>
                        <select name="copy_product_rule_from" id="copy_product_rule_from">
                            <?php $this->functions->rrb2b_get_filter_roles(); ?>
                        </select>
                    </li>
                    <li>
                        <select name="copy_product_rule_to" id="copy_product_rule_to">
                            <?php $this->functions->rrb2b_get_filter_roles(); ?>
                        </select>
                        <button class="button" style="height:40px;" onclick="rrb2bCopyProductRules();"
                                title="<?php esc_html_e('Copy and overwrite existing rules', 'clypper-role-pricing'); ?>">
                            <i class="fa-regular fa-copy"></i> <?php esc_html_e('Copy', 'clypper-role-pricing'); ?>
                        </button>
                    </li>
                </ul>
                <?php
            } elseif ('categories' === $tab) {
                ?>
                <ul class="subsubsub" style="margin-bottom:15px;margin-top:15px;">
                    <li>
                        <select name="filter_role" id="category_filter_role" onchange="categoryFilterByRole();">
                            <option value=""
                                    selected="selected"><?php esc_html_e('Filter by role ( none )', 'clypper-role-pricing'); ?></option>
                            <?php $this->functions->rrb2b_get_filter_roles(); ?>
                        </select>
                    </li>
                    <li>
                        <label for="copy_category_rule_from"
                               style="padding-left:20px;padding-right:4px;"><?php esc_html_e('Copy Rule:', 'clypper-role-pricing'); ?></label>
                        <select name="copy_category_rule_from" id="copy_category_rule_from">
                            <?php $this->functions->rrb2b_get_filter_roles(); ?>
                        </select>
                    </li>
                    <li>
                        <select name="copy_category_rule_to" id="copy_category_rule_to">
                            <?php $this->functions->rrb2b_get_filter_roles(); ?>
                        </select>
                        <button class="button" onclick="rrb2bCopyCategoryRules();" style="height:40px;"
                                title="<?php esc_html_e('Copy and overwrite existing rules', 'clypper-role-pricing'); ?>">
                            <i class="fa-regular fa-copy"></i> <?php esc_html_e('Copy', 'clypper-role-pricing'); ?>
                        </button>
                    </li>
                </ul>
                <?php
            }
            ?>

            <br/>

        </div>
        <?php
    }
}


