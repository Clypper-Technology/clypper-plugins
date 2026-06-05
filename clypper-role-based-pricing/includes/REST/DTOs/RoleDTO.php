<?php

namespace ClypperTechnology\RolePricing\REST\DTOs;

class RoleDTO
{
    public int $id;
    public string $name;
    public string $slug;

    public function __construct(int $id, string $name, string $slug)
    {
        $this->id = $id;
        $this->name = $name;
        $this->slug = $slug;
    }
}