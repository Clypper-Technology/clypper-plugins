<?php
namespace ClypperTechnology\ClypperCvr\includes;

class CustomerFields
{
    // Field keys
    public const FIRST_NAME      = 'first_name';
    public const LAST_NAME       = 'last_name';
    public const PHONE           = 'phone';
    public const COMPANY_NAME    = 'company_name';
    public const COMPANY_TYPE    = 'company_type';
    public const COMPANY_CVR     = 'company_cvr';
    public const COMPANY_ADDRESS = 'company_address';
    public const COMPANY_CITY    = 'company_city';
    public const COMPANY_POSTAL  = 'company_postal';
    public const INVOICE_EMAIL   = "invoice_email";

    public static function get_field( string $key ): ?array {
        return self::get_fields()[$key] ?? null;
    }

    public static function get_fields(): array {
        return [
            self::FIRST_NAME      => [
                'label'     => 'Fornavn',
                'type'      => 'text',
                'row'       => 'first',
                'required'  => true,
                'meta_keys' => [ 'first_name', 'billing_first_name' ],
            ],
            self::LAST_NAME       => [
                'label'     => 'Efternavn',
                'type'      => 'text',
                'row'       => 'last',
                'required'  => true,
                'meta_keys' => [ 'last_name', 'billing_last_name' ],
            ],
            self::PHONE           => [
                'label'     => 'Telefonnummer',
                'type'      => 'tel',
                'row'       => 'wide',
                'required'  => true,
                'meta_keys' => [ 'phone', 'billing_phone' ],
            ],
            self::COMPANY_NAME    => [
                'label'     => 'Firmanavn',
                'type'      => 'text',
                'row'       => 'wide',
                'required'  => true,
                'meta_keys' => [ 'company_name', 'billing_company' ],
            ],
            self::COMPANY_TYPE    => [
                'label'     => 'Branche',
                'type'      => 'text',
                'row'       => 'first',
                'required'  => true,
                'meta_keys' => [ 'company_type' ],
            ],
            self::COMPANY_CVR     => [
                'label'     => 'CVR',
                'type'      => 'number',
                'row'       => 'last',
                'required'  => true,
                'meta_keys' => [ 'company_cvr' ],
                'custom'    => 'cvr',
            ],
            self::COMPANY_ADDRESS => [
                'label'     => 'Firmaadresse',
                'type'      => 'text',
                'row'       => 'wide',
                'required'  => true,
                'meta_keys' => [ 'company_address', 'billing_address_1' ],
            ],
            self::COMPANY_CITY    => [
                'label'     => 'By',
                'type'      => 'text',
                'row'       => 'first',
                'required'  => true,
                'meta_keys' => [ 'company_city', 'billing_city' ],
            ],
            self::COMPANY_POSTAL  => [
                'label'     => 'Postnummer',
                'type'      => 'number',
                'row'       => 'last',
                'required'  => true,
                'meta_keys' => [ 'company_postal', 'billing_postcode' ],
                'custom'    => 'postal',
            ],
            self::INVOICE_EMAIL  => [
                'label'     => 'Faktura e-mail',
                'type'      => 'email',
                'row'       => 'wide',
                'required'  => false,
                'meta_keys' => [ 'invoice_email' ],
            ]
        ];
    }
}