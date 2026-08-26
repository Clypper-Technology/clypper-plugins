/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/App.tsx"
/*!********************************!*\
  !*** ./src/components/App.tsx ***!
  \********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ App)
/* harmony export */ });
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/dist/development/chunk-62JRHF6Z.mjs");
/* harmony import */ var _pages_roles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pages/roles */ "./src/components/pages/roles.tsx");
/* harmony import */ var _pages_rules__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pages/rules */ "./src/components/pages/rules.tsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__);




function App() {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(react_router_dom__WEBPACK_IMPORTED_MODULE_0__.HashRouter, {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(react_router_dom__WEBPACK_IMPORTED_MODULE_0__.Routes, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(react_router_dom__WEBPACK_IMPORTED_MODULE_0__.Route, {
        path: "/",
        element: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_pages_roles__WEBPACK_IMPORTED_MODULE_1__.Roles, {})
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(react_router_dom__WEBPACK_IMPORTED_MODULE_0__.Route, {
        path: "/role/:id",
        element: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_pages_rules__WEBPACK_IMPORTED_MODULE_2__.Rules, {})
      })]
    })
  });
}

/***/ },

/***/ "./src/components/cards/roleCard.tsx"
/*!*******************************************!*\
  !*** ./src/components/cards/roleCard.tsx ***!
  \*******************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RoleCard: () => (/* binding */ RoleCard)
/* harmony export */ });
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/ui */ "./node_modules/@wordpress/ui/build-module/badge/badge.mjs");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/dist/development/chunk-62JRHF6Z.mjs");
/* harmony import */ var _feedback_roleStatus__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../feedback/roleStatus */ "./src/components/feedback/roleStatus.tsx");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__);






const RoleCard = ({
  role,
  onRoleChanged
}) => {
  const navigate = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_2__.useNavigate)();
  const [isPending, startTransition] = (0,react__WEBPACK_IMPORTED_MODULE_4__.useTransition)();
  const handleRoleChange = () => {
    startTransition(async () => {
      await onRoleChanged(role);
    });
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Card, {
    className: "row-card",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.CardBody, {
      className: "row-card-body",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
        className: "row space-between card-text",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
          className: "row",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_feedback_roleStatus__WEBPACK_IMPORTED_MODULE_3__.RoleStatus, {
            active: role.active
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span", {
            children: role.name
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_ui__WEBPACK_IMPORTED_MODULE_1__.Badge, {
          intent: "draft",
          children: `${role.rule_count} rules`
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
        className: "row",
        children: role.active ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.Fragment, {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Button, {
            onClick: () => navigate(`/role/${role.id}`),
            variant: "primary",
            disabled: isPending,
            isBusy: isPending,
            children: "Edit"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Button, {
            isDestructive: true,
            variant: "primary",
            onClick: handleRoleChange,
            disabled: isPending,
            isBusy: isPending,
            children: "Disable"
          })]
        }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Button, {
          variant: "primary",
          onClick: handleRoleChange,
          disabled: isPending,
          isBusy: isPending,
          children: "Activate"
        })
      })]
    })
  });
};

/***/ },

/***/ "./src/components/controls/ItemSearch.tsx"
/*!************************************************!*\
  !*** ./src/components/controls/ItemSearch.tsx ***!
  \************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ItemSearch: () => (/* binding */ ItemSearch)
/* harmony export */ });
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__);



const ItemSearch = ({
  searchItems,
  displayItem,
  onItemAdded,
  addedItems = []
}) => {
  const [items, setItems] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
  const [options, setOptions] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
  const [isPending, setTransition] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useTransition)();
  const onInputChange = inputValue => {
    setTransition(async () => {
      const results = await searchItems(inputValue);
      setItems(results);
      setOptions(results.map(displayItem));
    });
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.ComboboxControl, {
    label: "Search for product",
    options: options,
    onFilterValueChange: onInputChange,
    isLoading: isPending,
    __experimentalRenderItem: ({
      item: option
    }) => {
      const item = items.find(p => String(p.id) === option.value);
      if (!item) return null;
      const isAdded = addedItems.some(element => item.id == element.id);
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
        style: {
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        },
        children: [item.image_url && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("img", {
          src: item.image_url,
          alt: "",
          style: {
            width: 45,
            height: 45,
            objectFit: 'cover',
            borderRadius: 2
          }
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("span", {
          style: {
            flex: 1
          },
          children: option.label
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Button, {
          variant: isAdded ? "secondary" : "primary",
          disabled: isAdded,
          onClick: e => {
            e.stopPropagation();
            onItemAdded(item);
          },
          children: isAdded ? "Added" : "Add"
        })]
      });
    }
  });
};

/***/ },

/***/ "./src/components/controls/RuleList.tsx"
/*!**********************************************!*\
  !*** ./src/components/controls/RuleList.tsx ***!
  \**********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RuleList: () => (/* binding */ RuleList)
/* harmony export */ });
/* harmony import */ var _listItems_RuleListItem__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./listItems/RuleListItem */ "./src/components/controls/listItems/RuleListItem.tsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);


const RuleList = ({
  fields,
  ruleKey,
  onRemove
}) => {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("table", {
    className: "wp-list-table widefat fixed striped",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("thead", {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("tr", {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("th", {
          style: {
            width: 70
          }
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("th", {
          children: "Name"
        }), ruleKey == "products" && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("th", {
          style: {
            width: 150
          },
          children: "Price"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("th", {
          children: "Rule type"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("th", {
          style: {
            width: 130
          },
          children: "Value"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("th", {
          style: {
            width: 130
          },
          children: "Min quantity"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("th", {
          children: "Reduction type"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("th", {
          style: {
            width: 130
          },
          children: "Value"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("th", {
          style: {
            width: 50
          }
        })]
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("tbody", {
      children: fields.map((field, index) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_listItems_RuleListItem__WEBPACK_IMPORTED_MODULE_0__.RuleListItem, {
        ruleKey: ruleKey,
        index: index,
        onRemove: () => onRemove(index)
      }, field.id))
    })]
  });
};

/***/ },

/***/ "./src/components/controls/listItems/RuleListItem.tsx"
/*!************************************************************!*\
  !*** ./src/components/controls/listItems/RuleListItem.tsx ***!
  \************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RuleListItem: () => (/* binding */ RuleListItem)
/* harmony export */ });
/* harmony import */ var _types_ruleType__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/types/ruleType */ "./src/types/ruleType.ts");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/trash.mjs");
/* harmony import */ var _wordpress_ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/ui */ "./node_modules/@wordpress/ui/build-module/form/primitives/input/input.mjs");
/* harmony import */ var react_hook_form__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-hook-form */ "./node_modules/react-hook-form/dist/index.esm.mjs");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__);






const RuleListItem = ({
  index,
  ruleKey,
  onRemove
}) => {
  const {
    control,
    watch
  } = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_4__.useFormContext)();
  const rule = watch(`${ruleKey}.${index}`);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("tr", {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("td", {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("img", {
        src: rule.image_url,
        alt: "",
        style: {
          width: 50,
          height: 50,
          objectFit: "cover",
          borderRadius: 2
        }
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("td", {
      children: rule.name
    }), ruleKey === "products" && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("td", {
      children: rule.price
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("td", {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(react_hook_form__WEBPACK_IMPORTED_MODULE_4__.Controller, {
        control: control,
        name: `${ruleKey}.${index}.rule.type`,
        render: ({
          field
        }) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
          value: field.value,
          options: _types_ruleType__WEBPACK_IMPORTED_MODULE_0__.ruleTypeFormValues,
          onChange: field.onChange
        })
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("td", {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(react_hook_form__WEBPACK_IMPORTED_MODULE_4__.Controller, {
        control: control,
        name: `${ruleKey}.${index}.rule.value`,
        render: ({
          field
        }) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_ui__WEBPACK_IMPORTED_MODULE_3__.Input, {
          value: field.value,
          onChange: field.onChange
        })
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("td", {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(react_hook_form__WEBPACK_IMPORTED_MODULE_4__.Controller, {
        control: control,
        name: `${ruleKey}.${index}.min_qty`,
        render: ({
          field
        }) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_ui__WEBPACK_IMPORTED_MODULE_3__.Input, {
          value: field.value,
          onChange: field.onChange
        })
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("td", {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(react_hook_form__WEBPACK_IMPORTED_MODULE_4__.Controller, {
        control: control,
        name: `${ruleKey}.${index}.rule.quantity_type`,
        render: ({
          field
        }) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
          value: field.value,
          options: _types_ruleType__WEBPACK_IMPORTED_MODULE_0__.ruleTypeFormValues,
          onChange: field.onChange
        })
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("td", {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(react_hook_form__WEBPACK_IMPORTED_MODULE_4__.Controller, {
        control: control,
        name: `${ruleKey}.${index}.rule.quantity`,
        render: ({
          field
        }) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_ui__WEBPACK_IMPORTED_MODULE_3__.Input, {
          value: field.value,
          onChange: field.onChange
        })
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("td", {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
        icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_2__["default"],
        label: "Delete",
        isDestructive: true,
        onClick: onRemove
      })
    })]
  });
};

/***/ },

/***/ "./src/components/editingSections/AddRule.tsx"
/*!****************************************************!*\
  !*** ./src/components/editingSections/AddRule.tsx ***!
  \****************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AddRule: () => (/* binding */ AddRule)
/* harmony export */ });
/* harmony import */ var _controls_ItemSearch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../controls/ItemSearch */ "./src/components/controls/ItemSearch.tsx");
/* harmony import */ var react_hook_form__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-hook-form */ "./node_modules/react-hook-form/dist/index.esm.mjs");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__);



const AddRule = ({
  onAdd,
  onSearch,
  ruleKey: key
}) => {
  const {
    watch
  } = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_1__.useFormContext)();
  const items = watch(key);
  const displayItem = item => {
    return {
      label: item.name,
      value: String(item.id)
    };
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_controls_ItemSearch__WEBPACK_IMPORTED_MODULE_0__.ItemSearch, {
    onItemAdded: onAdd,
    searchItems: onSearch,
    displayItem: displayItem,
    addedItems: items
  });
};

/***/ },

/***/ "./src/components/editingSections/CategoryRulesPanel.tsx"
/*!***************************************************************!*\
  !*** ./src/components/editingSections/CategoryRulesPanel.tsx ***!
  \***************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CategoryRulesPanel: () => (/* binding */ CategoryRulesPanel)
/* harmony export */ });
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/ui */ "./node_modules/@wordpress/ui/build-module/badge/badge.mjs");
/* harmony import */ var _wordpress_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/ui */ "./node_modules/@wordpress/ui/build-module/collapsible-card/root.mjs");
/* harmony import */ var _wordpress_ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/ui */ "./node_modules/@wordpress/ui/build-module/collapsible-card/header.mjs");
/* harmony import */ var _wordpress_ui__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/ui */ "./node_modules/@wordpress/ui/build-module/collapsible-card/content.mjs");
/* harmony import */ var react_hook_form__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-hook-form */ "./node_modules/react-hook-form/dist/index.esm.mjs");
/* harmony import */ var _factories_itemRuleFactory__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/factories/itemRuleFactory */ "./src/factories/itemRuleFactory.ts");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _controls_RuleList__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../controls/RuleList */ "./src/components/controls/RuleList.tsx");
/* harmony import */ var _AddRule__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./AddRule */ "./src/components/editingSections/AddRule.tsx");
/* harmony import */ var _services_categoryService__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @/services/categoryService */ "./src/services/categoryService.ts");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__);









const CategoryRulesPanel = props => {
  const [addRule, setAddRule] = (0,react__WEBPACK_IMPORTED_MODULE_7__.useState)(false);
  const {
    control
  } = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_5__.useFormContext)();
  const {
    fields,
    append,
    remove
  } = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_5__.useFieldArray)({
    control,
    name: 'single_categories'
  });
  const onCategoryAdded = category => {
    append((0,_factories_itemRuleFactory__WEBPACK_IMPORTED_MODULE_6__.createRuleFromCategory)(category));
  };
  const search = async search => {
    return await _services_categoryService__WEBPACK_IMPORTED_MODULE_10__.CategoryService.getCategoriesByName(search);
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)(_wordpress_ui__WEBPACK_IMPORTED_MODULE_2__.Root, {
    defaultOpen: true,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_wordpress_ui__WEBPACK_IMPORTED_MODULE_3__.Header, {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)("div", {
        className: "row",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("h2", {
          children: "Category Rules"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_wordpress_ui__WEBPACK_IMPORTED_MODULE_1__.Badge, {
          intent: "draft",
          children: `${fields.length}`
        })]
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)(_wordpress_ui__WEBPACK_IMPORTED_MODULE_4__.Content, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("div", {
        className: "row",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Button, {
          isDestructive: addRule,
          variant: "primary",
          onClick: () => setAddRule(!addRule),
          children: addRule ? "Close" : "Add rule"
        })
      }), addRule && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_AddRule__WEBPACK_IMPORTED_MODULE_9__.AddRule, {
        onAdd: onCategoryAdded,
        onSearch: search,
        ruleKey: "single_categories"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_controls_RuleList__WEBPACK_IMPORTED_MODULE_8__.RuleList, {
        fields: fields,
        ruleKey: "single_categories",
        onRemove: remove
      })]
    })]
  });
};

/***/ },

/***/ "./src/components/editingSections/ProductRulesPanel.tsx"
/*!**************************************************************!*\
  !*** ./src/components/editingSections/ProductRulesPanel.tsx ***!
  \**************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ProductRulesPanel: () => (/* binding */ ProductRulesPanel)
/* harmony export */ });
/* harmony import */ var _wordpress_ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/ui */ "./node_modules/@wordpress/ui/build-module/badge/badge.mjs");
/* harmony import */ var _wordpress_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/ui */ "./node_modules/@wordpress/ui/build-module/collapsible-card/root.mjs");
/* harmony import */ var _wordpress_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/ui */ "./node_modules/@wordpress/ui/build-module/collapsible-card/header.mjs");
/* harmony import */ var _wordpress_ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/ui */ "./node_modules/@wordpress/ui/build-module/collapsible-card/content.mjs");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _controls_RuleList__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../controls/RuleList */ "./src/components/controls/RuleList.tsx");
/* harmony import */ var react_hook_form__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-hook-form */ "./node_modules/react-hook-form/dist/index.esm.mjs");
/* harmony import */ var _factories_itemRuleFactory__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @/factories/itemRuleFactory */ "./src/factories/itemRuleFactory.ts");
/* harmony import */ var _AddRule__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./AddRule */ "./src/components/editingSections/AddRule.tsx");
/* harmony import */ var _services_productService__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @/services/productService */ "./src/services/productService.ts");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__);









const ProductRulesPanel = ({}) => {
  const [addRule, setAddRule] = (0,react__WEBPACK_IMPORTED_MODULE_5__.useState)(false);
  const {
    control
  } = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_7__.useFormContext)();
  const {
    fields,
    append,
    remove
  } = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_7__.useFieldArray)({
    control,
    name: 'products'
  });
  const productAdded = product => {
    append((0,_factories_itemRuleFactory__WEBPACK_IMPORTED_MODULE_8__.createRuleFromProduct)(product));
  };
  const search = async search => {
    return await _services_productService__WEBPACK_IMPORTED_MODULE_10__.ProductService.getProductsByName(search);
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)(_wordpress_ui__WEBPACK_IMPORTED_MODULE_1__.Root, {
    defaultOpen: true,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_wordpress_ui__WEBPACK_IMPORTED_MODULE_2__.Header, {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)("div", {
        className: "row",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("h2", {
          children: "Product Rules"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_wordpress_ui__WEBPACK_IMPORTED_MODULE_0__.Badge, {
          intent: "draft",
          children: `${fields.length}`
        })]
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_wordpress_ui__WEBPACK_IMPORTED_MODULE_3__.Content, {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)("div", {
        className: "col",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("div", {
          className: "row",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Button, {
            isDestructive: addRule,
            variant: "primary",
            onClick: () => setAddRule(!addRule),
            children: addRule ? "Close" : "Add rule"
          })
        }), addRule && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_AddRule__WEBPACK_IMPORTED_MODULE_9__.AddRule, {
          onAdd: productAdded,
          onSearch: search,
          ruleKey: "products"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_controls_RuleList__WEBPACK_IMPORTED_MODULE_6__.RuleList, {
          fields: fields,
          onRemove: remove,
          ruleKey: "products"
        })]
      })
    })]
  });
};

/***/ },

/***/ "./src/components/feedback/roleStatus.tsx"
/*!************************************************!*\
  !*** ./src/components/feedback/roleStatus.tsx ***!
  \************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RoleStatus: () => (/* binding */ RoleStatus)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

const RoleStatus = props => {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
    className: "status-indicator " + (props.active ? "active" : "inactive")
  });
};

/***/ },

/***/ "./src/components/pages/roles.tsx"
/*!****************************************!*\
  !*** ./src/components/pages/roles.tsx ***!
  \****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Roles: () => (/* binding */ Roles)
/* harmony export */ });
/* harmony import */ var _services_roleService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/services/roleService */ "./src/services/roleService.ts");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _cards_roleCard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../cards/roleCard */ "./src/components/cards/roleCard.tsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__);





function Roles() {
  const [allRoles, setAllRoles] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
  const [isPending, setTransition] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useTransition)();
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    setTransition(async () => {
      const roles = await _services_roleService__WEBPACK_IMPORTED_MODULE_0__.RoleService.getRoles();
      setAllRoles(roles);
    });
  }, []);
  const setActiveStatus = async (role, active) => {
    const roles = await _services_roleService__WEBPACK_IMPORTED_MODULE_0__.RoleService.setRoleActive(role, active);
    setAllRoles(roles);
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("h1", {
        children: "Roles"
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
      className: "roles-list",
      children: isPending ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Spinner, {}) : allRoles.map(role => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_cards_roleCard__WEBPACK_IMPORTED_MODULE_3__.RoleCard, {
        role: role,
        onRoleChanged: async role => await setActiveStatus(role, !role.active)
      }))
    })]
  });
}

/***/ },

/***/ "./src/components/pages/rules.tsx"
/*!****************************************!*\
  !*** ./src/components/pages/rules.tsx ***!
  \****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Rules: () => (/* binding */ Rules)
/* harmony export */ });
/* harmony import */ var _services_ruleService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/services/ruleService */ "./src/services/ruleService.ts");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/dist/development/chunk-62JRHF6Z.mjs");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _editingSections_CategoryRulesPanel__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../editingSections/CategoryRulesPanel */ "./src/components/editingSections/CategoryRulesPanel.tsx");
/* harmony import */ var _editingSections_ProductRulesPanel__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../editingSections/ProductRulesPanel */ "./src/components/editingSections/ProductRulesPanel.tsx");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/arrow-left.mjs");
/* harmony import */ var react_hook_form__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-hook-form */ "./node_modules/react-hook-form/dist/index.esm.mjs");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__);









function Rules() {
  const {
    id
  } = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_2__.useParams)();
  const numericId = id ? parseInt(id) : 0;
  const [rule, setRule] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)();
  const [isLoading, setIsLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
  const navigate = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_2__.useNavigate)();
  const methods = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_7__.useForm)();
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    const load = async () => {
      const rule = await _services_ruleService__WEBPACK_IMPORTED_MODULE_0__.RuleService.getRule(numericId);
      setRule(rule);
      methods.reset(rule);
      setIsLoading(false);
    };
    load();
  }, [numericId]);
  const onSubmit = async rule => {
    await _services_ruleService__WEBPACK_IMPORTED_MODULE_0__.RuleService.updateRules(rule);
  };
  if (isLoading || !rule) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Spinner, {});
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(react_hook_form__WEBPACK_IMPORTED_MODULE_7__.FormProvider, {
      ...methods,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("form", {
        onSubmit: methods.handleSubmit(onSubmit),
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
          className: "row",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Icon, {
            icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_6__["default"],
            onClick: () => navigate(-1),
            style: {
              cursor: "pointer"
            }
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("h1", {
            children: rule?.role_name
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
          className: "roles-list",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
            type: "submit",
            children: "Save"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_editingSections_ProductRulesPanel__WEBPACK_IMPORTED_MODULE_5__.ProductRulesPanel, {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_editingSections_CategoryRulesPanel__WEBPACK_IMPORTED_MODULE_4__.CategoryRulesPanel, {})]
        })]
      })
    })
  });
}

/***/ },

/***/ "./src/factories/itemRuleFactory.ts"
/*!******************************************!*\
  !*** ./src/factories/itemRuleFactory.ts ***!
  \******************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createRuleFromCategory: () => (/* binding */ createRuleFromCategory),
/* harmony export */   createRuleFromProduct: () => (/* binding */ createRuleFromProduct)
/* harmony export */ });
const createRuleFromProduct = product => {
  return {
    id: product.id,
    name: product.name,
    price: product.price,
    rule: itemRule(),
    min_qty: 0,
    image_url: product.image_url
  };
};
const createRuleFromCategory = category => {
  return {
    id: category.id,
    name: category.name,
    rule: itemRule(),
    min_qty: 0,
    image_url: category.image_url
  };
};
const itemRule = () => {
  return {
    type: 'percent',
    value: '0',
    quantity: '0',
    quantity_type: 'percent'
  };
};

/***/ },

/***/ "./src/services/categoryService.ts"
/*!*****************************************!*\
  !*** ./src/services/categoryService.ts ***!
  \*****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CategoryService: () => (/* binding */ CategoryService)
/* harmony export */ });
/* harmony import */ var _shared_apiPaths__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/shared/apiPaths */ "./src/shared/apiPaths.ts");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1__);


class CategoryService {
  static async getCategoriesByName(name) {
    const rule = await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1___default()({
      path: _shared_apiPaths__WEBPACK_IMPORTED_MODULE_0__.ApiPath.categoryPathSearch(name)
    });
    return rule;
  }
}

/***/ },

/***/ "./src/services/productService.ts"
/*!****************************************!*\
  !*** ./src/services/productService.ts ***!
  \****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ProductService: () => (/* binding */ ProductService)
/* harmony export */ });
/* harmony import */ var _shared_apiPaths__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/apiPaths */ "./src/shared/apiPaths.ts");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1__);


class ProductService {
  static async getProductsByName(name) {
    const rule = await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1___default()({
      path: _shared_apiPaths__WEBPACK_IMPORTED_MODULE_0__.ApiPath.productPathSearch(name)
    });
    return rule;
  }
}

/***/ },

/***/ "./src/services/roleService.ts"
/*!*************************************!*\
  !*** ./src/services/roleService.ts ***!
  \*************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RoleService: () => (/* binding */ RoleService)
/* harmony export */ });
/* harmony import */ var _shared_apiPaths__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/apiPaths */ "./src/shared/apiPaths.ts");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1__);


class RoleService {
  static async getRoles() {
    const response = await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1___default()({
      path: _shared_apiPaths__WEBPACK_IMPORTED_MODULE_0__.ApiPath.rolesPath()
    });
    return response;
  }
  static async setRoleActive(role, active) {
    role.active = active;
    await this.updateRole(role);
    return this.getRoles();
  }
  static async updateRole(role) {
    const id = await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1___default()({
      path: _shared_apiPaths__WEBPACK_IMPORTED_MODULE_0__.ApiPath.rolesPath(),
      method: "PATCH",
      data: role
    });
    return id;
  }
  static async getExistingRoles() {
    const response = await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1___default()({
      path: _shared_apiPaths__WEBPACK_IMPORTED_MODULE_0__.ApiPath.rolesPath("existing")
    });
    return response;
  }
}

/***/ },

/***/ "./src/services/ruleService.ts"
/*!*************************************!*\
  !*** ./src/services/ruleService.ts ***!
  \*************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RuleService: () => (/* binding */ RuleService)
/* harmony export */ });
/* harmony import */ var _shared_apiPaths__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/apiPaths */ "./src/shared/apiPaths.ts");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1__);


class RuleService {
  static resource = _shared_apiPaths__WEBPACK_IMPORTED_MODULE_0__.ApiPath.rulesPath();
  static async getRule(id) {
    const rule = await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1___default()({
      path: _shared_apiPaths__WEBPACK_IMPORTED_MODULE_0__.ApiPath.rulePath(id)
    });
    return rule;
  }
  static async getAllRules() {
    const rules = await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1___default()({
      path: this.resource
    });
    return rules;
  }
  static async addRules(slug) {
    const id = await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1___default()({
      path: this.resource,
      method: "POST",
      data: {
        slug: slug
      }
    });
    return id;
  }
  static async updateRules(rule) {
    await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1___default()({
      path: _shared_apiPaths__WEBPACK_IMPORTED_MODULE_0__.ApiPath.rulePath(rule.id),
      method: "POST",
      data: rule
    });
  }
  static async deleteRule(id) {
    await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1___default()({
      path: _shared_apiPaths__WEBPACK_IMPORTED_MODULE_0__.ApiPath.rulePath(id),
      method: "DELETE"
    });
  }
}

/***/ },

/***/ "./src/shared/apiPaths.ts"
/*!********************************!*\
  !*** ./src/shared/apiPaths.ts ***!
  \********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ApiPath: () => (/* binding */ ApiPath)
/* harmony export */ });
/* harmony import */ var _types_apiBases__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../types/apiBases */ "./src/types/apiBases.ts");

class ApiPath {
  static rulesPath() {
    return `${_types_apiBases__WEBPACK_IMPORTED_MODULE_0__.ApiBase.Base}${_types_apiBases__WEBPACK_IMPORTED_MODULE_0__.ApiBase.Rules}`;
  }
  static rulePath(ruleId) {
    return `${this.rulesPath()}/${ruleId}`;
  }
  static rolesPath(status = "") {
    if (status) {
      return `${_types_apiBases__WEBPACK_IMPORTED_MODULE_0__.ApiBase.Base}${_types_apiBases__WEBPACK_IMPORTED_MODULE_0__.ApiBase.Roles}?status=${status}`;
    }
    return `${_types_apiBases__WEBPACK_IMPORTED_MODULE_0__.ApiBase.Base}${_types_apiBases__WEBPACK_IMPORTED_MODULE_0__.ApiBase.Roles}`;
  }
  static rolePath(roleId) {
    return this.rolesPath() + "/" + roleId;
  }
  static productPathSearch(searchQuery) {
    return `${_types_apiBases__WEBPACK_IMPORTED_MODULE_0__.ApiBase.Base}${_types_apiBases__WEBPACK_IMPORTED_MODULE_0__.ApiBase.Product}?search=${searchQuery}`;
  }
  static categoryPathSearch(searchQuery) {
    return `${_types_apiBases__WEBPACK_IMPORTED_MODULE_0__.ApiBase.WooCommerce}${_types_apiBases__WEBPACK_IMPORTED_MODULE_0__.ApiBase.Categories}?search=${searchQuery}`;
  }
}

/***/ },

/***/ "./src/types/apiBases.ts"
/*!*******************************!*\
  !*** ./src/types/apiBases.ts ***!
  \*******************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ApiBase: () => (/* binding */ ApiBase)
/* harmony export */ });
let ApiBase = /*#__PURE__*/function (ApiBase) {
  ApiBase["Rules"] = "/rules";
  ApiBase["Roles"] = "/roles";
  ApiBase["Base"] = "/rrb2b/v1";
  ApiBase["Categories"] = "/products/categories";
  ApiBase["Product"] = "/products";
  ApiBase["WooCommerce"] = "/wc/v3";
  return ApiBase;
}({});

/***/ },

/***/ "./src/types/ruleType.ts"
/*!*******************************!*\
  !*** ./src/types/ruleType.ts ***!
  \*******************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ruleTypeFormValues: () => (/* binding */ ruleTypeFormValues)
/* harmony export */ });
const ruleTypeFormValues = [{
  label: "Percent",
  value: "percent"
}, {
  label: "Percent add",
  value: "percent_add"
}, {
  label: "Fixed",
  value: "fixed"
}, {
  label: "Fixed add",
  value: "fixed_add"
}, {
  label: "Fixed set",
  value: "fixed_set"
}];

/***/ },

/***/ "./src/index.scss"
/*!************************!*\
  !*** ./src/index.scss ***!
  \************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "react"
/*!************************!*\
  !*** external "React" ***!
  \************************/
(module) {

module.exports = window["React"];

/***/ },

/***/ "react-dom"
/*!***************************!*\
  !*** external "ReactDOM" ***!
  \***************************/
(module) {

module.exports = window["ReactDOM"];

/***/ },

/***/ "react/jsx-runtime"
/*!**********************************!*\
  !*** external "ReactJSXRuntime" ***!
  \**********************************/
(module) {

module.exports = window["ReactJSXRuntime"];

/***/ },

/***/ "@wordpress/api-fetch"
/*!**********************************!*\
  !*** external ["wp","apiFetch"] ***!
  \**********************************/
(module) {

module.exports = window["wp"]["apiFetch"];

/***/ },

/***/ "@wordpress/components"
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
(module) {

module.exports = window["wp"]["components"];

/***/ },

/***/ "@wordpress/dom-ready"
/*!**********************************!*\
  !*** external ["wp","domReady"] ***!
  \**********************************/
(module) {

module.exports = window["wp"]["domReady"];

/***/ },

/***/ "@wordpress/element"
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
(module) {

module.exports = window["wp"]["element"];

/***/ },

/***/ "@wordpress/primitives"
/*!************************************!*\
  !*** external ["wp","primitives"] ***!
  \************************************/
(module) {

module.exports = window["wp"]["primitives"];

/***/ },

/***/ "./node_modules/@base-ui/react/collapsible/panel/CollapsiblePanel.mjs"
/*!****************************************************************************!*\
  !*** ./node_modules/@base-ui/react/collapsible/panel/CollapsiblePanel.mjs ***!
  \****************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CollapsiblePanel: () => (/* binding */ CollapsiblePanel)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @base-ui/utils/useIsoLayoutEffect */ "./node_modules/@base-ui/utils/useIsoLayoutEffect.mjs");
/* harmony import */ var _base_ui_utils_warn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @base-ui/utils/warn */ "./node_modules/@base-ui/utils/warn.mjs");
/* harmony import */ var _utils_resolveStyle_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/resolveStyle.mjs */ "./node_modules/@base-ui/react/utils/resolveStyle.mjs");
/* harmony import */ var _internals_useRenderElement_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../internals/useRenderElement.mjs */ "./node_modules/@base-ui/react/internals/useRenderElement.mjs");
/* harmony import */ var _root_CollapsibleRootContext_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../root/CollapsibleRootContext.mjs */ "./node_modules/@base-ui/react/collapsible/root/CollapsibleRootContext.mjs");
/* harmony import */ var _root_stateAttributesMapping_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../root/stateAttributesMapping.mjs */ "./node_modules/@base-ui/react/collapsible/root/stateAttributesMapping.mjs");
/* harmony import */ var _useCollapsiblePanel_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./useCollapsiblePanel.mjs */ "./node_modules/@base-ui/react/collapsible/panel/useCollapsiblePanel.mjs");
/* harmony import */ var _CollapsiblePanelCssVars_mjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./CollapsiblePanelCssVars.mjs */ "./node_modules/@base-ui/react/collapsible/panel/CollapsiblePanelCssVars.mjs");
'use client';










/**
 * A panel with the collapsible contents.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Collapsible](https://base-ui.com/react/components/collapsible)
 */
const CollapsiblePanel = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(function CollapsiblePanel(componentProps, forwardedRef) {
  const {
    className,
    hiddenUntilFound: hiddenUntilFoundProp,
    keepMounted: keepMountedProp,
    render,
    id: idProp,
    style,
    ...elementProps
  } = componentProps;
  if (true) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    (0,_base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_1__.useIsoLayoutEffect)(() => {
      if (hiddenUntilFoundProp && keepMountedProp === false) {
        (0,_base_ui_utils_warn__WEBPACK_IMPORTED_MODULE_2__.warn)('The `keepMounted={false}` prop on `Collapsible.Panel` is ignored when `hiddenUntilFound` is enabled, since the panel must remain mounted while closed.');
      }
    }, [hiddenUntilFoundProp, keepMountedProp]);
  }
  const {
    mounted,
    onOpenChange,
    open,
    panelId,
    setMounted,
    setPanelIdState,
    setOpen,
    state,
    transitionStatus
  } = (0,_root_CollapsibleRootContext_mjs__WEBPACK_IMPORTED_MODULE_5__.useCollapsibleRootContext)();
  const hiddenUntilFound = hiddenUntilFoundProp ?? false;
  const keepMounted = keepMountedProp ?? false;
  (0,_base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_1__.useIsoLayoutEffect)(() => {
    if (idProp) {
      setPanelIdState(idProp);
      return () => {
        setPanelIdState(undefined);
      };
    }
    return undefined;
  }, [idProp, setPanelIdState]);
  const {
    height,
    props,
    ref,
    shouldPreventOpenAnimation,
    shouldRender,
    transitionStatus: panelTransitionStatus,
    width
  } = (0,_useCollapsiblePanel_mjs__WEBPACK_IMPORTED_MODULE_7__.useCollapsiblePanel)({
    externalRef: forwardedRef,
    hiddenUntilFound,
    id: panelId,
    keepMounted,
    mounted,
    onOpenChange,
    open,
    setMounted,
    setOpen,
    transitionStatus
  });
  const panelState = {
    ...state,
    transitionStatus: panelTransitionStatus
  };
  const resolvedStyle = (0,_utils_resolveStyle_mjs__WEBPACK_IMPORTED_MODULE_3__.resolveStyle)(style, panelState);
  const element = (0,_internals_useRenderElement_mjs__WEBPACK_IMPORTED_MODULE_4__.useRenderElement)('div', {
    ...componentProps,
    style: undefined
  }, {
    state: panelState,
    ref,
    props: [props, {
      style: {
        [_CollapsiblePanelCssVars_mjs__WEBPACK_IMPORTED_MODULE_8__.CollapsiblePanelCssVars.collapsiblePanelHeight]: height === undefined ? 'auto' : `${height}px`,
        [_CollapsiblePanelCssVars_mjs__WEBPACK_IMPORTED_MODULE_8__.CollapsiblePanelCssVars.collapsiblePanelWidth]: width === undefined ? 'auto' : `${width}px`
      }
    }, elementProps, resolvedStyle ? {
      style: resolvedStyle
    } : undefined,
    // Resolve the public `style` prop so temporary `animationName: 'none'`
    // can still win after user's inline styles have been merged.
    shouldPreventOpenAnimation ? {
      style: {
        animationName: 'none'
      }
    } : undefined],
    stateAttributesMapping: _root_stateAttributesMapping_mjs__WEBPACK_IMPORTED_MODULE_6__.collapsibleStateAttributesMapping
  });
  if (!shouldRender) {
    return null;
  }
  return element;
});
if (true) CollapsiblePanel.displayName = "CollapsiblePanel";

/***/ },

/***/ "./node_modules/@base-ui/react/collapsible/panel/CollapsiblePanelCssVars.mjs"
/*!***********************************************************************************!*\
  !*** ./node_modules/@base-ui/react/collapsible/panel/CollapsiblePanelCssVars.mjs ***!
  \***********************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CollapsiblePanelCssVars: () => (/* binding */ CollapsiblePanelCssVars)
/* harmony export */ });
let CollapsiblePanelCssVars = /*#__PURE__*/function (CollapsiblePanelCssVars) {
  /**
   * The collapsible panel's height.
   * @type {number}
   */
  CollapsiblePanelCssVars["collapsiblePanelHeight"] = "--collapsible-panel-height";
  /**
   * The collapsible panel's width.
   * @type {number}
   */
  CollapsiblePanelCssVars["collapsiblePanelWidth"] = "--collapsible-panel-width";
  return CollapsiblePanelCssVars;
}({});

/***/ },

/***/ "./node_modules/@base-ui/react/collapsible/panel/CollapsiblePanelDataAttributes.mjs"
/*!******************************************************************************************!*\
  !*** ./node_modules/@base-ui/react/collapsible/panel/CollapsiblePanelDataAttributes.mjs ***!
  \******************************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CollapsiblePanelDataAttributes: () => (/* binding */ CollapsiblePanelDataAttributes)
/* harmony export */ });
/* harmony import */ var _internals_stateAttributesMapping_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../internals/stateAttributesMapping.mjs */ "./node_modules/@base-ui/react/internals/stateAttributesMapping.mjs");

let CollapsiblePanelDataAttributes = function (CollapsiblePanelDataAttributes) {
  /**
   * Present when the collapsible panel is open.
   */
  CollapsiblePanelDataAttributes["open"] = "data-open";
  /**
   * Present when the collapsible panel is closed.
   */
  CollapsiblePanelDataAttributes["closed"] = "data-closed";
  /**
   * Present when the panel is animating in.
   */
  CollapsiblePanelDataAttributes[CollapsiblePanelDataAttributes["startingStyle"] = _internals_stateAttributesMapping_mjs__WEBPACK_IMPORTED_MODULE_0__.TransitionStatusDataAttributes.startingStyle] = "startingStyle";
  /**
   * Present when the panel is animating out.
   */
  CollapsiblePanelDataAttributes[CollapsiblePanelDataAttributes["endingStyle"] = _internals_stateAttributesMapping_mjs__WEBPACK_IMPORTED_MODULE_0__.TransitionStatusDataAttributes.endingStyle] = "endingStyle";
  return CollapsiblePanelDataAttributes;
}({});

/***/ },

/***/ "./node_modules/@base-ui/react/collapsible/panel/useCollapsiblePanel.mjs"
/*!*******************************************************************************!*\
  !*** ./node_modules/@base-ui/react/collapsible/panel/useCollapsiblePanel.mjs ***!
  \*******************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useCollapsiblePanel: () => (/* binding */ useCollapsiblePanel)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _base_ui_utils_addEventListener__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @base-ui/utils/addEventListener */ "./node_modules/@base-ui/utils/addEventListener.mjs");
/* harmony import */ var _base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @base-ui/utils/useIsoLayoutEffect */ "./node_modules/@base-ui/utils/useIsoLayoutEffect.mjs");
/* harmony import */ var _base_ui_utils_useMergedRefs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @base-ui/utils/useMergedRefs */ "./node_modules/@base-ui/utils/useMergedRefs.mjs");
/* harmony import */ var _base_ui_utils_useAnimationFrame__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @base-ui/utils/useAnimationFrame */ "./node_modules/@base-ui/utils/useAnimationFrame.mjs");
/* harmony import */ var _base_ui_utils_useStableCallback__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @base-ui/utils/useStableCallback */ "./node_modules/@base-ui/utils/useStableCallback.mjs");
/* harmony import */ var _base_ui_utils_useValueAsRef__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @base-ui/utils/useValueAsRef */ "./node_modules/@base-ui/utils/useValueAsRef.mjs");
/* harmony import */ var _base_ui_utils_warn__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @base-ui/utils/warn */ "./node_modules/@base-ui/utils/warn.mjs");
/* harmony import */ var _base_ui_utils_owner__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @base-ui/utils/owner */ "./node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs");
/* harmony import */ var _internals_createBaseUIEventDetails_mjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../internals/createBaseUIEventDetails.mjs */ "./node_modules/@base-ui/react/internals/createBaseUIEventDetails.mjs");
/* harmony import */ var _internals_reasons_mjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../internals/reasons.mjs */ "./node_modules/@base-ui/react/internals/reason-parts.mjs");
/* harmony import */ var _internals_useOpenChangeComplete_mjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../internals/useOpenChangeComplete.mjs */ "./node_modules/@base-ui/react/internals/useOpenChangeComplete.mjs");
/* harmony import */ var _internals_useAnimationsFinished_mjs__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../internals/useAnimationsFinished.mjs */ "./node_modules/@base-ui/react/internals/useAnimationsFinished.mjs");
/* harmony import */ var _CollapsiblePanelDataAttributes_mjs__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./CollapsiblePanelDataAttributes.mjs */ "./node_modules/@base-ui/react/collapsible/panel/CollapsiblePanelDataAttributes.mjs");
'use client';















const EMPTY_DIMENSIONS = {
  height: undefined,
  width: undefined
};
function useCollapsiblePanel(parameters) {
  const {
    externalRef,
    hiddenUntilFound,
    id: idParam,
    keepMounted,
    mounted,
    onOpenChange,
    open,
    setMounted,
    setOpen,
    transitionStatus
  } = parameters;
  const panelRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
  const animationTypeRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
  const [dimensions, setDimensionsUnwrapped] = react__WEBPACK_IMPORTED_MODULE_0__.useState(EMPTY_DIMENSIONS);
  const lastMeasuredDimensionsRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(EMPTY_DIMENSIONS);
  // `beforematch` should reveal the matched content immediately, so the next
  // open cycle skips author-defined motion once and then returns to normal.
  const shouldSkipNextOpenRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(false);
  // Keyframe mount animations on initially open panels cause a visible layout
  // shift during the server-rendered first paint, so suppress that first open
  // lifecycle until the panel has been closed once.
  const shouldPreventMountAnimationRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(open);
  // React.Activity tears down Effects while preserving state, so revealing an
  // already-open panel would otherwise replay its CSS keyframe open animation.
  const shouldPreventActivityResumeAnimationRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(false);
  // Some open paths intentionally bypass motion, but the shared root transition
  // status still advances asynchronously. Override the panel to idle so its data
  // attributes and dimension cleanup reflect the immediate open state.
  const [forcePanelIdle, setForcePanelIdle] = react__WEBPACK_IMPORTED_MODULE_0__.useState(false);
  const pendingTemporaryStyleRestoreRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
  const mergedPanelRef = (0,_base_ui_utils_useMergedRefs__WEBPACK_IMPORTED_MODULE_3__.useMergedRefs)(externalRef, panelRef);
  const latestStateRef = (0,_base_ui_utils_useValueAsRef__WEBPACK_IMPORTED_MODULE_6__.useValueAsRef)({
    mounted,
    open
  });
  // Only used to handle panel close
  const runOnceCloseAnimationsFinish = (0,_internals_useAnimationsFinished_mjs__WEBPACK_IMPORTED_MODULE_12__.useAnimationsFinished)(panelRef, false, false);
  const hidden = !open && !mounted;
  const panelTransitionStatus = forcePanelIdle ? 'idle' : transitionStatus;
  const shouldPreventOpenAnimation = open && (
  // These 2 refs are safe to read in render, they are only written from committed
  // layout/effect paths and gate one-shot motion suppression for the next open
  // lifecycle. They intentionally expose the last committed motion snapshot.
  shouldPreventMountAnimationRef.current || shouldPreventActivityResumeAnimationRef.current);
  const renderedDimensions = !open && mounted &&
  // These 2 refs are also safe to read in render, both hold the last committed
  // animation mode and measurement. This fallback only restores a previously
  // measured pixel size after the live dimensions state has been reset back to `auto`.
  animationTypeRef.current === 'css-animation' && dimensions.height === undefined && dimensions.width === undefined ? lastMeasuredDimensionsRef.current : dimensions;
  const shouldPersistHiddenTransitionStyles = hiddenUntilFound && hidden && animationTypeRef.current !== 'css-animation';

  // Most measured dimensions are reused later when CSS keyframe closes need a
  // pixel size after the rendered dimensions have been reset back to `auto`.
  // Passing `false` is only for clearing the current dimensions state.
  const setDimensions = (0,_base_ui_utils_useStableCallback__WEBPACK_IMPORTED_MODULE_5__.useStableCallback)((nextDimensions, shouldCacheMeasurement = true) => {
    if (shouldCacheMeasurement) {
      lastMeasuredDimensionsRef.current = nextDimensions;
    }
    setDimensionsUnwrapped(nextDimensions);
  });
  const restorePendingTemporaryStyle = (0,_base_ui_utils_useStableCallback__WEBPACK_IMPORTED_MODULE_5__.useStableCallback)(() => {
    pendingTemporaryStyleRestoreRef.current?.();
    pendingTemporaryStyleRestoreRef.current = null;
  });
  const setPendingTemporaryStyleRestore = (0,_base_ui_utils_useStableCallback__WEBPACK_IMPORTED_MODULE_5__.useStableCallback)(restore => {
    restorePendingTemporaryStyle();
    pendingTemporaryStyleRestoreRef.current = () => {
      pendingTemporaryStyleRestoreRef.current = null;
      restore();
    };
  });

  // React.Activity unmounts Effects while preserving component state. If that
  // teardown happens while an already-open keyframe panel is visible, remember
  // to suppress the replayed open animation on the next committed reveal.
  const markActivityResumeAnimationSuppressed = (0,_base_ui_utils_useStableCallback__WEBPACK_IMPORTED_MODULE_5__.useStableCallback)(() => {
    if (open && mounted && animationTypeRef.current === 'css-animation') {
      shouldPreventActivityResumeAnimationRef.current = true;
    }
  });
  (0,_base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_2__.useIsoLayoutEffect)(() => {
    // `forcePanelIdle` is only a temporary override for open paths that skip
    // motion. Keep it active while the shared root still reports `starting`,
    // then drop it once the root transition state catches up.
    if (!forcePanelIdle || transitionStatus === 'starting') {
      return;
    }
    setForcePanelIdle(false);
  }, [forcePanelIdle, transitionStatus]);
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    return () => {
      markActivityResumeAnimationSuppressed();
      restorePendingTemporaryStyle();
    };
  }, [markActivityResumeAnimationSuppressed, restorePendingTemporaryStyle]);
  (0,_base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_2__.useIsoLayoutEffect)(() => {
    const panel = panelRef.current;
    if (!panel) {
      return undefined;
    }

    // `beforematch` can temporarily force a `0s` motion duration so the matched
    // content reveals immediately. Restore the authored duration before detecting
    // the next close animation type, otherwise that first close is misread as
    // "no motion" and the close transition or keyframe gets skipped.
    if (!open && pendingTemporaryStyleRestoreRef.current) {
      restorePendingTemporaryStyle();
    }
    const animationType = getAnimationType(panel, shouldPreventOpenAnimation);
    animationTypeRef.current = animationType;

    // Initially open keyframe panels skip their first paint animation to avoid
    // layout shift, but we still need to cache the expanded size so the first
    // close animation can start from pixels instead of `auto`.
    if (open && transitionStatus === 'idle' && shouldPreventMountAnimationRef.current && animationType === 'css-animation') {
      lastMeasuredDimensionsRef.current = getDimensions(panel);
      return undefined;
    }

    // Handle the opening pass: measure the expanded size and, when necessary,
    // neutralize author-defined motion so the panel can open immediately.
    if (open && transitionStatus === 'starting') {
      // `beforematch` opens should reveal the panel immediately so find-in-page
      // does not wait for the author-defined transition or animation to finish.
      const skipNextOpen = shouldSkipNextOpenRef.current;
      shouldSkipNextOpenRef.current = false;
      if (animationType === 'none') {
        setDimensions(getDimensions(panel));
        setForcePanelIdle(true);
        return undefined;
      }
      if (animationType === 'css-transition') {
        const restoreLayoutStyles = resetLayoutStyles(panel);
        setDimensions(getDimensions(panel));
        if (!skipNextOpen) {
          return restoreLayoutStyles;
        }
        const restoreTransitionDuration = setTemporaryStyle(panel, 'transition-duration', '0s');
        setPendingTemporaryStyleRestore(restoreTransitionDuration);
        setForcePanelIdle(true);
        return restoreLayoutStyles;
      }
      if (animationType === 'css-animation') {
        setDimensions(getDimensions(panel));
        if (!skipNextOpen) {
          const restoreAnimationName = setTemporaryStyle(panel, 'animation-name', 'none');
          restoreAnimationName();
          return undefined;
        }
        const restoreAnimationName = setTemporaryStyle(panel, 'animation-name', 'none');
        const restoreAnimationDuration = setTemporaryStyle(panel, 'animation-duration', '0s');
        restoreAnimationName();
        setPendingTemporaryStyleRestore(restoreAnimationDuration);
        setForcePanelIdle(true);
        return undefined;
      }
    }

    // Capture the current size as soon as close is requested, before the
    // deferred ending phase applies closed styles. This keeps close transitions
    // starting from a measured pixel value, including interrupted opens.
    if (!open && mounted && (transitionStatus === 'idle' || transitionStatus === 'starting')) {
      shouldPreventMountAnimationRef.current = false;
      shouldPreventActivityResumeAnimationRef.current = false;
      if (animationType === 'none') {
        setDimensions(EMPTY_DIMENSIONS, false);
        setMounted(false);
        return undefined;
      }
      setDimensions(getDimensions(panel));
      return undefined;
    }
    if (transitionStatus !== 'ending') {
      return undefined;
    }
    if (animationType === 'none') {
      setMounted(false);
      return undefined;
    }
    const nextDimensions = getDimensions(panel);
    const hasMeasuredSize = (nextDimensions.height ?? 0) > 0 || (nextDimensions.width ?? 0) > 0;
    if (!hasMeasuredSize) {
      setMounted(false);
      return undefined;
    }
    setDimensions(nextDimensions);
    if (animationType === 'css-animation') {
      const restoreAnimationName = setTemporaryStyle(panel, 'animation-name', 'none');
      restoreAnimationName();
    }
    return undefined;
  }, [mounted, open, restorePendingTemporaryStyle, setDimensions, setMounted, setPendingTemporaryStyleRestore, shouldPreventOpenAnimation, transitionStatus]);
  (0,_internals_useOpenChangeComplete_mjs__WEBPACK_IMPORTED_MODULE_11__.useOpenChangeComplete)({
    enabled: open && mounted && panelTransitionStatus === 'idle',
    open: true,
    ref: panelRef,
    onComplete() {
      if (!open) {
        return;
      }
      setDimensions(EMPTY_DIMENSIONS, false);
    }
  });

  // Closing panels need extra sequencing beyond `useOpenChangeComplete`.
  // This passive effect runs after the `ending` render has committed, so
  // `[data-ending-style]` is already present. Chrome can still register the
  // exit transition one frame later when an Accordion closes one item while
  // opening another, so wait one frame before watching animations.
  // See https://github.com/mui/base-ui/issues/3099
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    if (open || !mounted || panelTransitionStatus !== 'ending') {
      return undefined;
    }
    const panel = panelRef.current;
    if (!panel) {
      return undefined;
    }
    const abortController = new AbortController();
    let endingStyleFrame = -1;
    function handleComplete() {
      if (latestStateRef.current.open) {
        return;
      }
      setMounted(false);
      setDimensions(EMPTY_DIMENSIONS, false);
    }
    endingStyleFrame = _base_ui_utils_useAnimationFrame__WEBPACK_IMPORTED_MODULE_4__.AnimationFrame.request(() => {
      if (!abortController.signal.aborted) {
        runOnceCloseAnimationsFinish(handleComplete, abortController.signal);
      }
    });
    return () => {
      _base_ui_utils_useAnimationFrame__WEBPACK_IMPORTED_MODULE_4__.AnimationFrame.cancel(endingStyleFrame);
      abortController.abort();
    };
  }, [latestStateRef, mounted, open, panelTransitionStatus, runOnceCloseAnimationsFinish, setDimensions, setMounted]);
  (0,_base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_2__.useIsoLayoutEffect)(() => {
    const panel = panelRef.current;
    if (!panel || !hiddenUntilFound || !hidden) {
      return;
    }

    // React only supports a boolean for the `hidden` attribute and forces
    // legit string values to booleans so we have to force it back in the DOM
    // when necessary: https://github.com/facebook/react/issues/24740
    panel.setAttribute('hidden', 'until-found');
  }, [hidden, hiddenUntilFound]);
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(function registerBeforeMatchListener() {
    const panel = panelRef.current;
    if (!panel) {
      return undefined;
    }
    function handleBeforeMatch(event) {
      const eventDetails = (0,_internals_createBaseUIEventDetails_mjs__WEBPACK_IMPORTED_MODULE_9__.createChangeEventDetails)(_internals_reasons_mjs__WEBPACK_IMPORTED_MODULE_10__.none, event);
      onOpenChange(true, eventDetails);
      if (eventDetails.isCanceled) {
        return;
      }
      shouldSkipNextOpenRef.current = true;
      setOpen(true);
    }
    return (0,_base_ui_utils_addEventListener__WEBPACK_IMPORTED_MODULE_1__.addEventListener)(panel, 'beforematch', handleBeforeMatch);
  }, [onOpenChange, setOpen]);
  const shouldRender = keepMounted || hiddenUntilFound || mounted || open;
  return {
    height: renderedDimensions.height,
    props: {
      ...(shouldPersistHiddenTransitionStyles ? {
        [_CollapsiblePanelDataAttributes_mjs__WEBPACK_IMPORTED_MODULE_13__.CollapsiblePanelDataAttributes.startingStyle]: ''
      } : undefined),
      hidden,
      id: idParam
    },
    ref: mergedPanelRef,
    shouldPreventOpenAnimation,
    shouldRender,
    transitionStatus: panelTransitionStatus,
    width: renderedDimensions.width
  };
}
function getDimensions(element) {
  return {
    height: element.scrollHeight,
    width: element.scrollWidth
  };
}
function getAnimationType(element, hasSuppressedMountAnimation = false) {
  const panelStyles = (0,_base_ui_utils_owner__WEBPACK_IMPORTED_MODULE_8__.getWindow)(element).getComputedStyle(element);
  const hasAnimation = (panelStyles.animationName.split(',').map(name => name.trim()).some(name => name !== '' && name !== 'none') || hasSuppressedMountAnimation) && hasNonZeroDuration(panelStyles.animationDuration);
  const hasTransition = hasNonZeroDuration(panelStyles.transitionDuration);
  if (hasAnimation && hasTransition) {
    if (true) {
      (0,_base_ui_utils_warn__WEBPACK_IMPORTED_MODULE_7__.warn)('CSS transitions and CSS animations both detected on Collapsible or Accordion panel.', 'Only one of either animation type should be used.');
    }
    return 'css-transition';
  }
  if (hasTransition) {
    return 'css-transition';
  }
  if (hasAnimation) {
    return 'css-animation';
  }
  return 'none';
}
function hasNonZeroDuration(value) {
  return value.split(',').map(part => part.trim()).some(part => part !== '' && Number.parseFloat(part) > 0);
}

/**
 * Temporarily overrides an inline style property and returns a cleanup that
 * restores the previous inline value and priority.
 * @param element - The element whose inline style should be updated.
 * @param property - The CSS property name to override.
 * @param value - The temporary value to assign.
 * @returns A cleanup function that restores the original inline style state.
 */
function setTemporaryStyle(element, property, value) {
  const previousValue = element.style.getPropertyValue(property);
  const previousPriority = element.style.getPropertyPriority(property);
  element.style.setProperty(property, value);
  return () => {
    if (previousValue === '') {
      element.style.removeProperty(property);
      return;
    }
    element.style.setProperty(property, previousValue, previousPriority);
  };
}

/**
 * Temporarily resets inline alignment styles that can distort scroll-based
 * size measurements, then restores them on the next animation frame.
 * @param element - The panel element being measured.
 * @returns A cleanup function that cancels the scheduled restore and reapplies
 * the original inline layout styles immediately.
 */
function resetLayoutStyles(element) {
  const originalLayoutStyles = {
    'justify-content': element.style.justifyContent,
    'align-items': element.style.alignItems,
    'align-content': element.style.alignContent,
    'justify-items': element.style.justifyItems
  };
  Object.keys(originalLayoutStyles).forEach(key => {
    element.style.setProperty(key, 'initial', 'important');
  });
  function restoreLayoutStyles() {
    Object.entries(originalLayoutStyles).forEach(([key, value]) => {
      if (value === '') {
        element.style.removeProperty(key);
        return;
      }
      element.style.setProperty(key, value);
    });
  }
  const frame = _base_ui_utils_useAnimationFrame__WEBPACK_IMPORTED_MODULE_4__.AnimationFrame.request(restoreLayoutStyles);
  return () => {
    _base_ui_utils_useAnimationFrame__WEBPACK_IMPORTED_MODULE_4__.AnimationFrame.cancel(frame);
    restoreLayoutStyles();
  };
}

/***/ },

/***/ "./node_modules/@base-ui/react/collapsible/root/CollapsibleRoot.mjs"
/*!**************************************************************************!*\
  !*** ./node_modules/@base-ui/react/collapsible/root/CollapsibleRoot.mjs ***!
  \**************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CollapsibleRoot: () => (/* binding */ CollapsibleRoot)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _base_ui_utils_useStableCallback__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @base-ui/utils/useStableCallback */ "./node_modules/@base-ui/utils/useStableCallback.mjs");
/* harmony import */ var _internals_useRenderElement_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../internals/useRenderElement.mjs */ "./node_modules/@base-ui/react/internals/useRenderElement.mjs");
/* harmony import */ var _useCollapsibleRoot_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./useCollapsibleRoot.mjs */ "./node_modules/@base-ui/react/collapsible/root/useCollapsibleRoot.mjs");
/* harmony import */ var _CollapsibleRootContext_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./CollapsibleRootContext.mjs */ "./node_modules/@base-ui/react/collapsible/root/CollapsibleRootContext.mjs");
/* harmony import */ var _stateAttributesMapping_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./stateAttributesMapping.mjs */ "./node_modules/@base-ui/react/collapsible/root/stateAttributesMapping.mjs");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
'use client';








/**
 * Groups all parts of the collapsible.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Collapsible](https://base-ui.com/react/components/collapsible)
 */
const CollapsibleRoot = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(function CollapsibleRoot(componentProps, forwardedRef) {
  const {
    render,
    className,
    defaultOpen = false,
    disabled = false,
    onOpenChange: onOpenChangeProp,
    open,
    style,
    ...elementProps
  } = componentProps;
  const onOpenChange = (0,_base_ui_utils_useStableCallback__WEBPACK_IMPORTED_MODULE_1__.useStableCallback)(onOpenChangeProp);
  const collapsible = (0,_useCollapsibleRoot_mjs__WEBPACK_IMPORTED_MODULE_3__.useCollapsibleRoot)({
    open,
    defaultOpen,
    onOpenChange,
    disabled
  });
  const state = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => ({
    open: collapsible.open,
    disabled: collapsible.disabled,
    transitionStatus: collapsible.transitionStatus
  }), [collapsible.open, collapsible.disabled, collapsible.transitionStatus]);
  const contextValue = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => ({
    ...collapsible,
    onOpenChange,
    state
  }), [collapsible, onOpenChange, state]);
  const element = (0,_internals_useRenderElement_mjs__WEBPACK_IMPORTED_MODULE_2__.useRenderElement)('div', componentProps, {
    state,
    ref: forwardedRef,
    props: elementProps,
    stateAttributesMapping: _stateAttributesMapping_mjs__WEBPACK_IMPORTED_MODULE_5__.collapsibleStateAttributesMapping
  });
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_CollapsibleRootContext_mjs__WEBPACK_IMPORTED_MODULE_4__.CollapsibleRootContext.Provider, {
    value: contextValue,
    children: element
  });
});
if (true) CollapsibleRoot.displayName = "CollapsibleRoot";

/***/ },

/***/ "./node_modules/@base-ui/react/collapsible/root/CollapsibleRootContext.mjs"
/*!*********************************************************************************!*\
  !*** ./node_modules/@base-ui/react/collapsible/root/CollapsibleRootContext.mjs ***!
  \*********************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CollapsibleRootContext: () => (/* binding */ CollapsibleRootContext),
/* harmony export */   useCollapsibleRootContext: () => (/* binding */ useCollapsibleRootContext)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
'use client';



const CollapsibleRootContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createContext(undefined);
if (true) CollapsibleRootContext.displayName = "CollapsibleRootContext";
function useCollapsibleRootContext() {
  const context = react__WEBPACK_IMPORTED_MODULE_0__.useContext(CollapsibleRootContext);
  if (context === undefined) {
    throw new Error( true ? 'Base UI: CollapsibleRootContext is missing. Collapsible parts must be placed within <Collapsible.Root>.' : 0);
  }
  return context;
}

/***/ },

/***/ "./node_modules/@base-ui/react/collapsible/root/stateAttributesMapping.mjs"
/*!*********************************************************************************!*\
  !*** ./node_modules/@base-ui/react/collapsible/root/stateAttributesMapping.mjs ***!
  \*********************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   collapsibleStateAttributesMapping: () => (/* binding */ collapsibleStateAttributesMapping)
/* harmony export */ });
/* harmony import */ var _utils_collapsibleOpenStateMapping_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/collapsibleOpenStateMapping.mjs */ "./node_modules/@base-ui/react/utils/collapsibleOpenStateMapping.mjs");
/* harmony import */ var _internals_stateAttributesMapping_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../internals/stateAttributesMapping.mjs */ "./node_modules/@base-ui/react/internals/stateAttributesMapping.mjs");


const collapsibleStateAttributesMapping = {
  ..._utils_collapsibleOpenStateMapping_mjs__WEBPACK_IMPORTED_MODULE_0__.collapsibleOpenStateMapping,
  ..._internals_stateAttributesMapping_mjs__WEBPACK_IMPORTED_MODULE_1__.transitionStatusMapping
};

/***/ },

/***/ "./node_modules/@base-ui/react/collapsible/root/useCollapsibleRoot.mjs"
/*!*****************************************************************************!*\
  !*** ./node_modules/@base-ui/react/collapsible/root/useCollapsibleRoot.mjs ***!
  \*****************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useCollapsibleRoot: () => (/* binding */ useCollapsibleRoot)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _base_ui_utils_useControlled__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @base-ui/utils/useControlled */ "./node_modules/@base-ui/utils/useControlled.mjs");
/* harmony import */ var _base_ui_utils_useStableCallback__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @base-ui/utils/useStableCallback */ "./node_modules/@base-ui/utils/useStableCallback.mjs");
/* harmony import */ var _internals_useBaseUiId_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../internals/useBaseUiId.mjs */ "./node_modules/@base-ui/react/internals/useBaseUiId.mjs");
/* harmony import */ var _internals_createBaseUIEventDetails_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../internals/createBaseUIEventDetails.mjs */ "./node_modules/@base-ui/react/internals/createBaseUIEventDetails.mjs");
/* harmony import */ var _internals_reasons_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../internals/reasons.mjs */ "./node_modules/@base-ui/react/internals/reason-parts.mjs");
/* harmony import */ var _internals_useTransitionStatus_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../internals/useTransitionStatus.mjs */ "./node_modules/@base-ui/react/internals/useTransitionStatus.mjs");
'use client';








function useCollapsibleRoot(parameters) {
  const {
    open: openParam,
    defaultOpen,
    onOpenChange,
    disabled
  } = parameters;
  const [open, setOpen] = (0,_base_ui_utils_useControlled__WEBPACK_IMPORTED_MODULE_1__.useControlled)({
    controlled: openParam,
    default: defaultOpen,
    name: 'Collapsible',
    state: 'open'
  });
  const {
    mounted,
    setMounted,
    transitionStatus
  } = (0,_internals_useTransitionStatus_mjs__WEBPACK_IMPORTED_MODULE_6__.useTransitionStatus)(open, true, true);
  const defaultPanelId = (0,_internals_useBaseUiId_mjs__WEBPACK_IMPORTED_MODULE_3__.useBaseUiId)();
  const [panelIdState, setPanelIdState] = react__WEBPACK_IMPORTED_MODULE_0__.useState();
  const panelId = panelIdState ?? defaultPanelId;
  const handleTrigger = (0,_base_ui_utils_useStableCallback__WEBPACK_IMPORTED_MODULE_2__.useStableCallback)(event => {
    const nextOpen = !open;
    const eventDetails = (0,_internals_createBaseUIEventDetails_mjs__WEBPACK_IMPORTED_MODULE_4__.createChangeEventDetails)(_internals_reasons_mjs__WEBPACK_IMPORTED_MODULE_5__.triggerPress, event.nativeEvent);
    onOpenChange(nextOpen, eventDetails);
    if (eventDetails.isCanceled) {
      return;
    }
    setOpen(nextOpen);
  });
  return react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => ({
    disabled,
    handleTrigger,
    mounted,
    open,
    panelId,
    setMounted,
    setOpen,
    setPanelIdState,
    transitionStatus
  }), [disabled, handleTrigger, mounted, open, panelId, setMounted, setOpen, setPanelIdState, transitionStatus]);
}

/***/ },

/***/ "./node_modules/@base-ui/react/collapsible/trigger/CollapsibleTrigger.mjs"
/*!********************************************************************************!*\
  !*** ./node_modules/@base-ui/react/collapsible/trigger/CollapsibleTrigger.mjs ***!
  \********************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CollapsibleTrigger: () => (/* binding */ CollapsibleTrigger)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _utils_collapsibleOpenStateMapping_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/collapsibleOpenStateMapping.mjs */ "./node_modules/@base-ui/react/utils/collapsibleOpenStateMapping.mjs");
/* harmony import */ var _internals_stateAttributesMapping_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../internals/stateAttributesMapping.mjs */ "./node_modules/@base-ui/react/internals/stateAttributesMapping.mjs");
/* harmony import */ var _internals_useRenderElement_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../internals/useRenderElement.mjs */ "./node_modules/@base-ui/react/internals/useRenderElement.mjs");
/* harmony import */ var _internals_use_button_index_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../internals/use-button/index.mjs */ "./node_modules/@base-ui/react/internals/use-button/useButton.mjs");
/* harmony import */ var _root_CollapsibleRootContext_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../root/CollapsibleRootContext.mjs */ "./node_modules/@base-ui/react/collapsible/root/CollapsibleRootContext.mjs");
'use client';







const stateAttributesMapping = {
  ..._utils_collapsibleOpenStateMapping_mjs__WEBPACK_IMPORTED_MODULE_1__.triggerOpenStateMapping,
  ..._internals_stateAttributesMapping_mjs__WEBPACK_IMPORTED_MODULE_2__.transitionStatusMapping
};

/**
 * A button that opens and closes the collapsible panel.
 * Renders a `<button>` element.
 *
 * Documentation: [Base UI Collapsible](https://base-ui.com/react/components/collapsible)
 */
const CollapsibleTrigger = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(function CollapsibleTrigger(componentProps, forwardedRef) {
  const {
    panelId,
    open,
    handleTrigger,
    state,
    disabled: contextDisabled
  } = (0,_root_CollapsibleRootContext_mjs__WEBPACK_IMPORTED_MODULE_5__.useCollapsibleRootContext)();
  const {
    className,
    disabled = contextDisabled,
    render,
    nativeButton = true,
    style,
    ...elementProps
  } = componentProps;
  const {
    getButtonProps,
    buttonRef
  } = (0,_internals_use_button_index_mjs__WEBPACK_IMPORTED_MODULE_4__.useButton)({
    disabled,
    focusableWhenDisabled: true,
    native: nativeButton
  });
  const element = (0,_internals_useRenderElement_mjs__WEBPACK_IMPORTED_MODULE_3__.useRenderElement)('button', componentProps, {
    state,
    ref: [forwardedRef, buttonRef],
    props: [{
      'aria-controls': open ? panelId : undefined,
      'aria-expanded': open,
      onClick: handleTrigger
    }, elementProps, getButtonProps],
    stateAttributesMapping
  });
  return element;
});
if (true) CollapsibleTrigger.displayName = "CollapsibleTrigger";

/***/ },

/***/ "./node_modules/@base-ui/react/collapsible/trigger/CollapsibleTriggerDataAttributes.mjs"
/*!**********************************************************************************************!*\
  !*** ./node_modules/@base-ui/react/collapsible/trigger/CollapsibleTriggerDataAttributes.mjs ***!
  \**********************************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CollapsibleTriggerDataAttributes: () => (/* binding */ CollapsibleTriggerDataAttributes)
/* harmony export */ });
let CollapsibleTriggerDataAttributes = /*#__PURE__*/function (CollapsibleTriggerDataAttributes) {
  /**
   * Present when the collapsible panel is open.
   */
  CollapsibleTriggerDataAttributes["panelOpen"] = "data-panel-open";
  return CollapsibleTriggerDataAttributes;
}({});

/***/ },

/***/ "./node_modules/@base-ui/react/field/control/FieldControl.mjs"
/*!********************************************************************!*\
  !*** ./node_modules/@base-ui/react/field/control/FieldControl.mjs ***!
  \********************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FieldControl: () => (/* binding */ FieldControl)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _base_ui_utils_useControlled__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @base-ui/utils/useControlled */ "./node_modules/@base-ui/utils/useControlled.mjs");
/* harmony import */ var _base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @base-ui/utils/useIsoLayoutEffect */ "./node_modules/@base-ui/utils/useIsoLayoutEffect.mjs");
/* harmony import */ var _base_ui_utils_owner__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @base-ui/utils/owner */ "./node_modules/@base-ui/utils/owner.mjs");
/* harmony import */ var _base_ui_utils_useStableCallback__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @base-ui/utils/useStableCallback */ "./node_modules/@base-ui/utils/useStableCallback.mjs");
/* harmony import */ var _internals_field_root_context_FieldRootContext_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../internals/field-root-context/FieldRootContext.mjs */ "./node_modules/@base-ui/react/internals/field-root-context/FieldRootContext.mjs");
/* harmony import */ var _internals_field_register_control_useRegisterFieldControl_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../internals/field-register-control/useRegisterFieldControl.mjs */ "./node_modules/@base-ui/react/internals/field-register-control/useRegisterFieldControl.mjs");
/* harmony import */ var _internals_form_context_FormContext_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../internals/form-context/FormContext.mjs */ "./node_modules/@base-ui/react/internals/form-context/FormContext.mjs");
/* harmony import */ var _internals_labelable_provider_LabelableContext_mjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../internals/labelable-provider/LabelableContext.mjs */ "./node_modules/@base-ui/react/internals/labelable-provider/LabelableContext.mjs");
/* harmony import */ var _internals_labelable_provider_useLabelableId_mjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../internals/labelable-provider/useLabelableId.mjs */ "./node_modules/@base-ui/react/internals/labelable-provider/useLabelableId.mjs");
/* harmony import */ var _internals_field_constants_constants_mjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../internals/field-constants/constants.mjs */ "./node_modules/@base-ui/react/internals/field-constants/constants.mjs");
/* harmony import */ var _internals_useRenderElement_mjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../internals/useRenderElement.mjs */ "./node_modules/@base-ui/react/internals/useRenderElement.mjs");
/* harmony import */ var _internals_createBaseUIEventDetails_mjs__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../internals/createBaseUIEventDetails.mjs */ "./node_modules/@base-ui/react/internals/createBaseUIEventDetails.mjs");
/* harmony import */ var _internals_reasons_mjs__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../internals/reasons.mjs */ "./node_modules/@base-ui/react/internals/reason-parts.mjs");
/* harmony import */ var _floating_ui_react_utils_mjs__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../floating-ui-react/utils.mjs */ "./node_modules/@base-ui/react/internals/shadowDom.mjs");
'use client';

















/**
 * The form control to label and validate.
 * Renders an `<input>` element.
 *
 * You can omit this part and use any Base UI input component instead. For example,
 * [Input](https://base-ui.com/react/components/input), [Checkbox](https://base-ui.com/react/components/checkbox),
 * or [Select](https://base-ui.com/react/components/select), among others, will work with Field out of the box.
 *
 * Documentation: [Base UI Field](https://base-ui.com/react/components/field)
 */
const FieldControl = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(function FieldControl(componentProps, forwardedRef) {
  const {
    render,
    className,
    id: idProp,
    name: nameProp,
    value: valueProp,
    disabled: disabledProp = false,
    onValueChange,
    defaultValue,
    autoFocus = false,
    style,
    ...elementProps
  } = componentProps;
  const {
    state: fieldState,
    name: fieldName,
    disabled: fieldDisabled,
    setTouched,
    setDirty,
    validityData,
    setFocused,
    setFilled,
    validationMode,
    validation
  } = (0,_internals_field_root_context_FieldRootContext_mjs__WEBPACK_IMPORTED_MODULE_5__.useFieldRootContext)();
  const {
    clearErrors
  } = (0,_internals_form_context_FormContext_mjs__WEBPACK_IMPORTED_MODULE_7__.useFormContext)();
  const disabled = fieldDisabled || disabledProp;
  const name = fieldName ?? nameProp;
  const state = {
    ...fieldState,
    disabled
  };
  const {
    labelId
  } = (0,_internals_labelable_provider_LabelableContext_mjs__WEBPACK_IMPORTED_MODULE_8__.useLabelableContext)();
  const id = (0,_internals_labelable_provider_useLabelableId_mjs__WEBPACK_IMPORTED_MODULE_9__.useLabelableId)({
    id: idProp
  });
  (0,_base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_2__.useIsoLayoutEffect)(() => {
    const hasExternalValue = valueProp != null;
    if (validation.inputRef.current?.value || hasExternalValue && valueProp !== '') {
      setFilled(true);
    } else if (hasExternalValue && valueProp === '') {
      setFilled(false);
    }
  }, [validation.inputRef, setFilled, valueProp]);
  const inputRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
  (0,_base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_2__.useIsoLayoutEffect)(() => {
    if (autoFocus && inputRef.current === (0,_floating_ui_react_utils_mjs__WEBPACK_IMPORTED_MODULE_14__.activeElement)((0,_base_ui_utils_owner__WEBPACK_IMPORTED_MODULE_3__.ownerDocument)(inputRef.current))) {
      setFocused(true);
    }
  }, [autoFocus, setFocused]);
  const [valueUnwrapped] = (0,_base_ui_utils_useControlled__WEBPACK_IMPORTED_MODULE_1__.useControlled)({
    controlled: valueProp,
    default: defaultValue,
    name: 'FieldControl',
    state: 'value'
  });
  const isControlled = valueProp !== undefined;
  const value = isControlled ? valueUnwrapped : undefined;
  const getValueFromInput = (0,_base_ui_utils_useStableCallback__WEBPACK_IMPORTED_MODULE_4__.useStableCallback)(() => validation.inputRef.current?.value);
  (0,_internals_field_register_control_useRegisterFieldControl_mjs__WEBPACK_IMPORTED_MODULE_6__.useRegisterFieldControl)(validation.inputRef, id, value, getValueFromInput, !disabled, nameProp);
  const element = (0,_internals_useRenderElement_mjs__WEBPACK_IMPORTED_MODULE_11__.useRenderElement)('input', componentProps, {
    ref: [forwardedRef, inputRef],
    state,
    props: [{
      id,
      disabled,
      name,
      ref: validation.inputRef,
      'aria-labelledby': labelId,
      autoFocus,
      ...(isControlled ? {
        value
      } : {
        defaultValue
      }),
      onChange(event) {
        const inputValue = event.currentTarget.value;
        onValueChange?.(inputValue, (0,_internals_createBaseUIEventDetails_mjs__WEBPACK_IMPORTED_MODULE_12__.createChangeEventDetails)(_internals_reasons_mjs__WEBPACK_IMPORTED_MODULE_13__.none, event.nativeEvent));
        // `validation.change` reads `markedDirtyRef`, so update dirty before validating.
        setDirty(inputValue !== validityData.initialValue);
        setFilled(inputValue !== '');

        // Workaround for https://github.com/facebook/react/issues/9023
        if (!event.nativeEvent.defaultPrevented) {
          clearErrors(name);
          validation.change(inputValue);
        }
      },
      onFocus() {
        setFocused(true);
      },
      onBlur(event) {
        setTouched(true);
        setFocused(false);
        if (validationMode === 'onBlur') {
          validation.commit(event.currentTarget.value);
        }
      },
      onKeyDown(event) {
        if (event.currentTarget.tagName === 'INPUT' && event.key === 'Enter') {
          setTouched(true);
          validation.commit(event.currentTarget.value);
        }
      }
    }, elementProps, props => validation.getValidationProps(disabled, props)],
    stateAttributesMapping: _internals_field_constants_constants_mjs__WEBPACK_IMPORTED_MODULE_10__.fieldValidityMapping
  });
  return element;
});
if (true) FieldControl.displayName = "FieldControl";

/***/ },

/***/ "./node_modules/@base-ui/react/field/control/FieldControlDataAttributes.mjs"
/*!**********************************************************************************!*\
  !*** ./node_modules/@base-ui/react/field/control/FieldControlDataAttributes.mjs ***!
  \**********************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FieldControlDataAttributes: () => (/* binding */ FieldControlDataAttributes)
/* harmony export */ });
let FieldControlDataAttributes = /*#__PURE__*/function (FieldControlDataAttributes) {
  /**
   * Present when the field is disabled.
   */
  FieldControlDataAttributes["disabled"] = "data-disabled";
  /**
   * Present when the field is in a valid state.
   */
  FieldControlDataAttributes["valid"] = "data-valid";
  /**
   * Present when the field is in an invalid state.
   */
  FieldControlDataAttributes["invalid"] = "data-invalid";
  /**
   * Present when the field has been touched.
   */
  FieldControlDataAttributes["touched"] = "data-touched";
  /**
   * Present when the field's value has changed.
   */
  FieldControlDataAttributes["dirty"] = "data-dirty";
  /**
   * Present when the field is filled.
   */
  FieldControlDataAttributes["filled"] = "data-filled";
  /**
   * Present when the field control is focused.
   */
  FieldControlDataAttributes["focused"] = "data-focused";
  return FieldControlDataAttributes;
}({});

/***/ },

/***/ "./node_modules/@base-ui/react/input/Input.mjs"
/*!*****************************************************!*\
  !*** ./node_modules/@base-ui/react/input/Input.mjs ***!
  \*****************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Input: () => (/* binding */ Input)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _field_index_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../field/index.mjs */ "./node_modules/@base-ui/react/field/control/FieldControl.mjs");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
'use client';




/**
 * A native input element that automatically works with [Field](https://base-ui.com/react/components/field).
 * Renders an `<input>` element.
 *
 * Documentation: [Base UI Input](https://base-ui.com/react/components/input)
 */

const Input = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(function Input(props, forwardedRef) {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_field_index_mjs__WEBPACK_IMPORTED_MODULE_1__.FieldControl, {
    ref: forwardedRef,
    ...props
  });
});
if (true) Input.displayName = "Input";

/***/ },

/***/ "./node_modules/@base-ui/react/internals/composite/root/CompositeRootContext.mjs"
/*!***************************************************************************************!*\
  !*** ./node_modules/@base-ui/react/internals/composite/root/CompositeRootContext.mjs ***!
  \***************************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CompositeRootContext: () => (/* binding */ CompositeRootContext),
/* harmony export */   useCompositeRootContext: () => (/* binding */ useCompositeRootContext)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
'use client';



const CompositeRootContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createContext(undefined);
if (true) CompositeRootContext.displayName = "CompositeRootContext";
function useCompositeRootContext(optional = false) {
  const context = react__WEBPACK_IMPORTED_MODULE_0__.useContext(CompositeRootContext);
  if (context === undefined && !optional) {
    throw new Error( true ? 'Base UI: CompositeRootContext is missing. Composite parts must be placed within <Composite.Root>.' : 0);
  }
  return context;
}

/***/ },

/***/ "./node_modules/@base-ui/react/internals/createBaseUIEventDetails.mjs"
/*!****************************************************************************!*\
  !*** ./node_modules/@base-ui/react/internals/createBaseUIEventDetails.mjs ***!
  \****************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createChangeEventDetails: () => (/* binding */ createChangeEventDetails),
/* harmony export */   createGenericEventDetails: () => (/* binding */ createGenericEventDetails)
/* harmony export */ });
/* harmony import */ var _base_ui_utils_empty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @base-ui/utils/empty */ "./node_modules/@base-ui/utils/empty.mjs");



/**
 * Maps a change `reason` string to the corresponding native event type.
 */

/**
 * Details of custom change events emitted by Base UI components.
 */

/**
 * Details of custom generic events emitted by Base UI components.
 */

/**
 * Creates a Base UI event details object with the given reason and utilities
 * for preventing Base UI's internal event handling.
 */
function createChangeEventDetails(reason, event, trigger, customProperties) {
  let canceled = false;
  let allowPropagation = false;
  const custom = customProperties ?? _base_ui_utils_empty__WEBPACK_IMPORTED_MODULE_0__.EMPTY_OBJECT;
  const details = {
    reason,
    event: event ?? new Event('base-ui'),
    cancel() {
      canceled = true;
    },
    allowPropagation() {
      allowPropagation = true;
    },
    get isCanceled() {
      return canceled;
    },
    get isPropagationAllowed() {
      return allowPropagation;
    },
    trigger,
    ...custom
  };
  return details;
}
function createGenericEventDetails(reason, event, customProperties) {
  const custom = customProperties ?? _base_ui_utils_empty__WEBPACK_IMPORTED_MODULE_0__.EMPTY_OBJECT;
  const details = {
    reason,
    event: event ?? new Event('base-ui'),
    ...custom
  };
  return details;
}

/***/ },

/***/ "./node_modules/@base-ui/react/internals/field-constants/constants.mjs"
/*!*****************************************************************************!*\
  !*** ./node_modules/@base-ui/react/internals/field-constants/constants.mjs ***!
  \*****************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DEFAULT_FIELD_ROOT_STATE: () => (/* binding */ DEFAULT_FIELD_ROOT_STATE),
/* harmony export */   DEFAULT_FIELD_STATE_ATTRIBUTES: () => (/* binding */ DEFAULT_FIELD_STATE_ATTRIBUTES),
/* harmony export */   DEFAULT_VALIDITY_STATE: () => (/* binding */ DEFAULT_VALIDITY_STATE),
/* harmony export */   fieldValidityMapping: () => (/* binding */ fieldValidityMapping)
/* harmony export */ });
/* harmony import */ var _field_control_FieldControlDataAttributes_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../field/control/FieldControlDataAttributes.mjs */ "./node_modules/@base-ui/react/field/control/FieldControlDataAttributes.mjs");

const DEFAULT_VALIDITY_STATE = {
  badInput: false,
  customError: false,
  patternMismatch: false,
  rangeOverflow: false,
  rangeUnderflow: false,
  stepMismatch: false,
  tooLong: false,
  tooShort: false,
  typeMismatch: false,
  valid: null,
  valueMissing: false
};
const DEFAULT_FIELD_STATE_ATTRIBUTES = {
  valid: null,
  touched: false,
  dirty: false,
  filled: false,
  focused: false
};
const DEFAULT_FIELD_ROOT_STATE = {
  disabled: false,
  ...DEFAULT_FIELD_STATE_ATTRIBUTES
};
const fieldValidityMapping = {
  valid(value) {
    if (value === null) {
      return null;
    }
    if (value) {
      return {
        [_field_control_FieldControlDataAttributes_mjs__WEBPACK_IMPORTED_MODULE_0__.FieldControlDataAttributes.valid]: ''
      };
    }
    return {
      [_field_control_FieldControlDataAttributes_mjs__WEBPACK_IMPORTED_MODULE_0__.FieldControlDataAttributes.invalid]: ''
    };
  }
};

/***/ },

/***/ "./node_modules/@base-ui/react/internals/field-register-control/useRegisterFieldControl.mjs"
/*!**************************************************************************************************!*\
  !*** ./node_modules/@base-ui/react/internals/field-register-control/useRegisterFieldControl.mjs ***!
  \**************************************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useRegisterFieldControl: () => (/* binding */ useRegisterFieldControl)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @base-ui/utils/useIsoLayoutEffect */ "./node_modules/@base-ui/utils/useIsoLayoutEffect.mjs");
/* harmony import */ var _field_root_context_FieldRootContext_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../field-root-context/FieldRootContext.mjs */ "./node_modules/@base-ui/react/internals/field-root-context/FieldRootContext.mjs");
'use client';




function useRegisterFieldControl(controlRef, id, value, getFormValueOverride, enabled = true, name) {
  const {
    registerFieldControl
  } = (0,_field_root_context_FieldRootContext_mjs__WEBPACK_IMPORTED_MODULE_2__.useFieldRootContext)();
  const sourceRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
  if (!sourceRef.current) {
    sourceRef.current = Symbol();
  }
  ;(0,_base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_1__.useIsoLayoutEffect)(() => {
    const source = sourceRef.current;
    if (!source || !enabled) {
      return undefined;
    }
    const registration = {
      controlRef,
      getValue: getFormValueOverride,
      id,
      name,
      value
    };
    registerFieldControl(source, registration);
    return () => {
      registerFieldControl(source, undefined);
    };
  }, [controlRef, enabled, getFormValueOverride, id, name, registerFieldControl, value]);
}

/***/ },

/***/ "./node_modules/@base-ui/react/internals/field-root-context/FieldRootContext.mjs"
/*!***************************************************************************************!*\
  !*** ./node_modules/@base-ui/react/internals/field-root-context/FieldRootContext.mjs ***!
  \***************************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DEFAULT_FIELD_ROOT_CONTEXT: () => (/* binding */ DEFAULT_FIELD_ROOT_CONTEXT),
/* harmony export */   FieldRootContext: () => (/* binding */ FieldRootContext),
/* harmony export */   useFieldRootContext: () => (/* binding */ useFieldRootContext)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _base_ui_utils_empty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../noop.mjs */ "./node_modules/@base-ui/utils/empty.mjs");
/* harmony import */ var _field_constants_constants_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../field-constants/constants.mjs */ "./node_modules/@base-ui/react/internals/field-constants/constants.mjs");
'use client';






const DEFAULT_FIELD_ROOT_CONTEXT = {
  invalid: undefined,
  name: undefined,
  validityData: {
    state: _field_constants_constants_mjs__WEBPACK_IMPORTED_MODULE_2__.DEFAULT_VALIDITY_STATE,
    errors: [],
    error: '',
    value: '',
    initialValue: null
  },
  setValidityData: _base_ui_utils_empty__WEBPACK_IMPORTED_MODULE_1__.NOOP,
  disabled: undefined,
  touched: _field_constants_constants_mjs__WEBPACK_IMPORTED_MODULE_2__.DEFAULT_FIELD_STATE_ATTRIBUTES.touched,
  setTouched: _base_ui_utils_empty__WEBPACK_IMPORTED_MODULE_1__.NOOP,
  dirty: _field_constants_constants_mjs__WEBPACK_IMPORTED_MODULE_2__.DEFAULT_FIELD_STATE_ATTRIBUTES.dirty,
  setDirty: _base_ui_utils_empty__WEBPACK_IMPORTED_MODULE_1__.NOOP,
  filled: _field_constants_constants_mjs__WEBPACK_IMPORTED_MODULE_2__.DEFAULT_FIELD_STATE_ATTRIBUTES.filled,
  setFilled: _base_ui_utils_empty__WEBPACK_IMPORTED_MODULE_1__.NOOP,
  focused: _field_constants_constants_mjs__WEBPACK_IMPORTED_MODULE_2__.DEFAULT_FIELD_STATE_ATTRIBUTES.focused,
  setFocused: _base_ui_utils_empty__WEBPACK_IMPORTED_MODULE_1__.NOOP,
  validate: () => null,
  validationMode: 'onSubmit',
  validationDebounceTime: 0,
  shouldValidateOnChange: () => false,
  state: _field_constants_constants_mjs__WEBPACK_IMPORTED_MODULE_2__.DEFAULT_FIELD_ROOT_STATE,
  markedDirtyRef: {
    current: false
  },
  registerFieldControl: _base_ui_utils_empty__WEBPACK_IMPORTED_MODULE_1__.NOOP,
  validation: {
    getValidationProps: (_disabled, props = _base_ui_utils_empty__WEBPACK_IMPORTED_MODULE_1__.EMPTY_OBJECT) => props,
    inputRef: {
      current: null
    },
    registerInput: _base_ui_utils_empty__WEBPACK_IMPORTED_MODULE_1__.NOOP,
    commit: async () => {},
    change: _base_ui_utils_empty__WEBPACK_IMPORTED_MODULE_1__.NOOP
  }
};
const FieldRootContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createContext(DEFAULT_FIELD_ROOT_CONTEXT);
if (true) FieldRootContext.displayName = "FieldRootContext";
function useFieldRootContext(optional = true) {
  const context = react__WEBPACK_IMPORTED_MODULE_0__.useContext(FieldRootContext);
  if (context.setValidityData === _base_ui_utils_empty__WEBPACK_IMPORTED_MODULE_1__.NOOP && !optional) {
    throw new Error( true ? 'Base UI: FieldRootContext is missing. Field parts must be placed within <Field.Root>.' : 0);
  }
  return context;
}

/***/ },

/***/ "./node_modules/@base-ui/react/internals/form-context/FormContext.mjs"
/*!****************************************************************************!*\
  !*** ./node_modules/@base-ui/react/internals/form-context/FormContext.mjs ***!
  \****************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FormContext: () => (/* binding */ FormContext),
/* harmony export */   useFormContext: () => (/* binding */ useFormContext)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _noop_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../noop.mjs */ "./node_modules/@base-ui/utils/empty.mjs");
'use client';



const FormContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createContext({
  formRef: {
    current: {
      fields: new Map()
    }
  },
  errors: {},
  clearErrors: _noop_mjs__WEBPACK_IMPORTED_MODULE_1__.NOOP,
  validationMode: 'onSubmit',
  submitAttemptedRef: {
    current: false
  }
});
if (true) FormContext.displayName = "FormContext";
function useFormContext() {
  return react__WEBPACK_IMPORTED_MODULE_0__.useContext(FormContext);
}

/***/ },

/***/ "./node_modules/@base-ui/react/internals/getStateAttributesProps.mjs"
/*!***************************************************************************!*\
  !*** ./node_modules/@base-ui/react/internals/getStateAttributesProps.mjs ***!
  \***************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getStateAttributesProps: () => (/* binding */ getStateAttributesProps)
/* harmony export */ });
function getStateAttributesProps(state, customMapping) {
  const props = {};

  /* eslint-disable-next-line guard-for-in */
  for (const key in state) {
    const value = state[key];
    if (customMapping?.hasOwnProperty(key)) {
      const customProps = customMapping[key](value);
      if (customProps != null) {
        Object.assign(props, customProps);
      }
      continue;
    }
    if (value === true) {
      props[`data-${key.toLowerCase()}`] = '';
    } else if (value) {
      props[`data-${key.toLowerCase()}`] = value.toString();
    }
  }
  return props;
}

/***/ },

/***/ "./node_modules/@base-ui/react/internals/labelable-provider/LabelableContext.mjs"
/*!***************************************************************************************!*\
  !*** ./node_modules/@base-ui/react/internals/labelable-provider/LabelableContext.mjs ***!
  \***************************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LabelableContext: () => (/* binding */ LabelableContext),
/* harmony export */   useLabelableContext: () => (/* binding */ useLabelableContext)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _noop_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../noop.mjs */ "./node_modules/@base-ui/utils/empty.mjs");
'use client';



/**
 * A context for providing [labelable elements](https://html.spec.whatwg.org/multipage/forms.html#category-label)\
 * with an accessible name (label) and description.
 */
const LabelableContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createContext({
  controlId: undefined,
  registerControlId: _noop_mjs__WEBPACK_IMPORTED_MODULE_1__.NOOP,
  labelId: undefined,
  setLabelId: _noop_mjs__WEBPACK_IMPORTED_MODULE_1__.NOOP,
  messageIds: [],
  setMessageIds: _noop_mjs__WEBPACK_IMPORTED_MODULE_1__.NOOP,
  getDescriptionProps: externalProps => externalProps
});
if (true) LabelableContext.displayName = "LabelableContext";
function useLabelableContext() {
  return react__WEBPACK_IMPORTED_MODULE_0__.useContext(LabelableContext);
}

/***/ },

/***/ "./node_modules/@base-ui/react/internals/labelable-provider/useLabelableId.mjs"
/*!*************************************************************************************!*\
  !*** ./node_modules/@base-ui/react/internals/labelable-provider/useLabelableId.mjs ***!
  \*************************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useLabelableId: () => (/* binding */ useLabelableId)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @base-ui/utils/useIsoLayoutEffect */ "./node_modules/@base-ui/utils/useIsoLayoutEffect.mjs");
/* harmony import */ var _base_ui_utils_useStableCallback__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @base-ui/utils/useStableCallback */ "./node_modules/@base-ui/utils/useStableCallback.mjs");
/* harmony import */ var _base_ui_utils_useRefWithInit__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @base-ui/utils/useRefWithInit */ "./node_modules/@base-ui/utils/useRefWithInit.mjs");
/* harmony import */ var _floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @floating-ui/utils/dom */ "./node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs");
/* harmony import */ var _noop_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../noop.mjs */ "./node_modules/@base-ui/utils/empty.mjs");
/* harmony import */ var _useBaseUiId_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../useBaseUiId.mjs */ "./node_modules/@base-ui/react/internals/useBaseUiId.mjs");
/* harmony import */ var _LabelableContext_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./LabelableContext.mjs */ "./node_modules/@base-ui/react/internals/labelable-provider/LabelableContext.mjs");
'use client';









function useLabelableId(params = {}) {
  const {
    id,
    implicit = false,
    controlRef
  } = params;
  const {
    controlId,
    registerControlId
  } = (0,_LabelableContext_mjs__WEBPACK_IMPORTED_MODULE_7__.useLabelableContext)();
  const defaultId = (0,_useBaseUiId_mjs__WEBPACK_IMPORTED_MODULE_6__.useBaseUiId)(id);
  const controlIdForEffect = implicit ? controlId : undefined;
  const controlSourceRef = (0,_base_ui_utils_useRefWithInit__WEBPACK_IMPORTED_MODULE_3__.useRefWithInit)(() => Symbol('labelable-control'));
  const hasRegisteredRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(false);
  const hadExplicitIdRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(id != null);
  const unregisterControlId = (0,_base_ui_utils_useStableCallback__WEBPACK_IMPORTED_MODULE_2__.useStableCallback)(() => {
    if (!hasRegisteredRef.current || registerControlId === _noop_mjs__WEBPACK_IMPORTED_MODULE_5__.NOOP) {
      return;
    }
    hasRegisteredRef.current = false;
    registerControlId(controlSourceRef.current, undefined);
  });
  (0,_base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_1__.useIsoLayoutEffect)(() => {
    if (registerControlId === _noop_mjs__WEBPACK_IMPORTED_MODULE_5__.NOOP) {
      return undefined;
    }
    let nextId;
    if (implicit) {
      const elem = controlRef?.current;
      if ((0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_4__.isElement)(elem) && elem.closest('label') != null) {
        nextId = id ?? null;
      } else {
        nextId = controlIdForEffect ?? defaultId;
      }
    } else if (id != null) {
      hadExplicitIdRef.current = true;
      nextId = id;
    } else if (hadExplicitIdRef.current) {
      nextId = defaultId;
    } else {
      unregisterControlId();
      return undefined;
    }
    if (nextId === undefined) {
      unregisterControlId();
      return undefined;
    }
    hasRegisteredRef.current = true;
    registerControlId(controlSourceRef.current, nextId);
    return undefined;
  }, [id, controlRef, controlIdForEffect, registerControlId, implicit, defaultId, controlSourceRef, unregisterControlId]);
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    return unregisterControlId;
  }, [unregisterControlId]);
  return controlId ?? defaultId;
}

/***/ },

/***/ "./node_modules/@base-ui/react/internals/reason-parts.mjs"
/*!****************************************************************!*\
  !*** ./node_modules/@base-ui/react/internals/reason-parts.mjs ***!
  \****************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   cancelOpen: () => (/* binding */ cancelOpen),
/* harmony export */   chipRemovePress: () => (/* binding */ chipRemovePress),
/* harmony export */   clearPress: () => (/* binding */ clearPress),
/* harmony export */   closePress: () => (/* binding */ closePress),
/* harmony export */   closeWatcher: () => (/* binding */ closeWatcher),
/* harmony export */   decrementPress: () => (/* binding */ decrementPress),
/* harmony export */   disabled: () => (/* binding */ disabled),
/* harmony export */   drag: () => (/* binding */ drag),
/* harmony export */   escapeKey: () => (/* binding */ escapeKey),
/* harmony export */   focusOut: () => (/* binding */ focusOut),
/* harmony export */   imperativeAction: () => (/* binding */ imperativeAction),
/* harmony export */   incrementPress: () => (/* binding */ incrementPress),
/* harmony export */   initial: () => (/* binding */ initial),
/* harmony export */   inputBlur: () => (/* binding */ inputBlur),
/* harmony export */   inputChange: () => (/* binding */ inputChange),
/* harmony export */   inputClear: () => (/* binding */ inputClear),
/* harmony export */   inputPaste: () => (/* binding */ inputPaste),
/* harmony export */   inputPress: () => (/* binding */ inputPress),
/* harmony export */   itemPress: () => (/* binding */ itemPress),
/* harmony export */   keyboard: () => (/* binding */ keyboard),
/* harmony export */   linkPress: () => (/* binding */ linkPress),
/* harmony export */   listNavigation: () => (/* binding */ listNavigation),
/* harmony export */   missing: () => (/* binding */ missing),
/* harmony export */   none: () => (/* binding */ none),
/* harmony export */   outsidePress: () => (/* binding */ outsidePress),
/* harmony export */   pointer: () => (/* binding */ pointer),
/* harmony export */   scrub: () => (/* binding */ scrub),
/* harmony export */   siblingOpen: () => (/* binding */ siblingOpen),
/* harmony export */   swipe: () => (/* binding */ swipe),
/* harmony export */   trackPress: () => (/* binding */ trackPress),
/* harmony export */   triggerFocus: () => (/* binding */ triggerFocus),
/* harmony export */   triggerHover: () => (/* binding */ triggerHover),
/* harmony export */   triggerPress: () => (/* binding */ triggerPress),
/* harmony export */   wheel: () => (/* binding */ wheel),
/* harmony export */   windowResize: () => (/* binding */ windowResize)
/* harmony export */ });
const none = 'none';
const triggerPress = 'trigger-press';
const triggerHover = 'trigger-hover';
const triggerFocus = 'trigger-focus';
const outsidePress = 'outside-press';
const itemPress = 'item-press';
const closePress = 'close-press';
const linkPress = 'link-press';
const clearPress = 'clear-press';
const chipRemovePress = 'chip-remove-press';
const trackPress = 'track-press';
const incrementPress = 'increment-press';
const decrementPress = 'decrement-press';
const inputChange = 'input-change';
const inputClear = 'input-clear';
const inputBlur = 'input-blur';
const inputPaste = 'input-paste';
const inputPress = 'input-press';
const focusOut = 'focus-out';
const escapeKey = 'escape-key';
const closeWatcher = 'close-watcher';
const listNavigation = 'list-navigation';
const keyboard = 'keyboard';
const pointer = 'pointer';
const drag = 'drag';
const wheel = 'wheel';
const scrub = 'scrub';
const cancelOpen = 'cancel-open';
const siblingOpen = 'sibling-open';
const disabled = 'disabled';
const missing = 'missing';
const initial = 'initial';
const imperativeAction = 'imperative-action';
const swipe = 'swipe';
const windowResize = 'window-resize';

/***/ },

/***/ "./node_modules/@base-ui/react/internals/shadowDom.mjs"
/*!*************************************************************!*\
  !*** ./node_modules/@base-ui/react/internals/shadowDom.mjs ***!
  \*************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   activeElement: () => (/* binding */ activeElement),
/* harmony export */   contains: () => (/* binding */ contains),
/* harmony export */   getTarget: () => (/* binding */ getTarget)
/* harmony export */ });
/* harmony import */ var _floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @floating-ui/utils/dom */ "./node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs");

function activeElement(doc) {
  let element = doc.activeElement;
  while (element?.shadowRoot?.activeElement != null) {
    element = element.shadowRoot.activeElement;
  }
  return element;
}
function contains(parent, child) {
  if (!parent || !child) {
    return false;
  }
  const rootNode = child.getRootNode?.();

  // First, attempt with the faster native method.
  if (parent.contains(child)) {
    return true;
  }

  // Then fall back to traversing out of shadow roots when needed.
  if (rootNode && (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__.isShadowRoot)(rootNode)) {
    let next = child;
    while (next) {
      if (parent === next) {
        return true;
      }
      next = next.parentNode || next.host;
    }
  }
  return false;
}
function getTarget(event) {
  if ('composedPath' in event) {
    return event.composedPath()[0];
  }

  // TS assumes `composedPath()` always exists, but older browsers without
  // shadow DOM support still fall back to `target`.
  return event.target;
}

/***/ },

/***/ "./node_modules/@base-ui/react/internals/stateAttributesMapping.mjs"
/*!**************************************************************************!*\
  !*** ./node_modules/@base-ui/react/internals/stateAttributesMapping.mjs ***!
  \**************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TransitionStatusDataAttributes: () => (/* binding */ TransitionStatusDataAttributes),
/* harmony export */   transitionStatusMapping: () => (/* binding */ transitionStatusMapping)
/* harmony export */ });
let TransitionStatusDataAttributes = /*#__PURE__*/function (TransitionStatusDataAttributes) {
  /**
   * Present when the component is animating in.
   */
  TransitionStatusDataAttributes["startingStyle"] = "data-starting-style";
  /**
   * Present when the component is animating out.
   */
  TransitionStatusDataAttributes["endingStyle"] = "data-ending-style";
  return TransitionStatusDataAttributes;
}({});
const STARTING_HOOK = {
  [TransitionStatusDataAttributes.startingStyle]: ''
};
const ENDING_HOOK = {
  [TransitionStatusDataAttributes.endingStyle]: ''
};
const transitionStatusMapping = {
  transitionStatus(value) {
    if (value === 'starting') {
      return STARTING_HOOK;
    }
    if (value === 'ending') {
      return ENDING_HOOK;
    }
    return null;
  }
};

/***/ },

/***/ "./node_modules/@base-ui/react/internals/use-button/useButton.mjs"
/*!************************************************************************!*\
  !*** ./node_modules/@base-ui/react/internals/use-button/useButton.mjs ***!
  \************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useButton: () => (/* binding */ useButton)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @floating-ui/utils/dom */ "./node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs");
/* harmony import */ var _base_ui_utils_useStableCallback__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @base-ui/utils/useStableCallback */ "./node_modules/@base-ui/utils/useStableCallback.mjs");
/* harmony import */ var _base_ui_utils_error__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @base-ui/utils/error */ "./node_modules/@base-ui/utils/error.mjs");
/* harmony import */ var _base_ui_utils_safeReact__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @base-ui/utils/safeReact */ "./node_modules/@base-ui/utils/safeReact.mjs");
/* harmony import */ var _base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @base-ui/utils/useIsoLayoutEffect */ "./node_modules/@base-ui/utils/useIsoLayoutEffect.mjs");
/* harmony import */ var _merge_props_index_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../merge-props/index.mjs */ "./node_modules/@base-ui/react/merge-props/mergeProps.mjs");
/* harmony import */ var _composite_root_CompositeRootContext_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../composite/root/CompositeRootContext.mjs */ "./node_modules/@base-ui/react/internals/composite/root/CompositeRootContext.mjs");
/* harmony import */ var _utils_useFocusableWhenDisabled_mjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../utils/useFocusableWhenDisabled.mjs */ "./node_modules/@base-ui/react/utils/useFocusableWhenDisabled.mjs");
'use client';










function useButton(parameters = {}) {
  const {
    disabled = false,
    focusableWhenDisabled,
    tabIndex = 0,
    native: isNativeButton = true,
    composite: compositeProp
  } = parameters;
  const elementRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
  const compositeRootContext = (0,_composite_root_CompositeRootContext_mjs__WEBPACK_IMPORTED_MODULE_7__.useCompositeRootContext)(true);
  const isCompositeItem = compositeProp ?? compositeRootContext !== undefined;
  const {
    props: focusableWhenDisabledProps
  } = (0,_utils_useFocusableWhenDisabled_mjs__WEBPACK_IMPORTED_MODULE_8__.useFocusableWhenDisabled)({
    focusableWhenDisabled,
    disabled,
    composite: isCompositeItem,
    tabIndex,
    isNativeButton
  });
  if (true) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
      if (!elementRef.current) {
        return;
      }
      const isButtonTag = isButtonElement(elementRef.current);
      if (isNativeButton) {
        if (!isButtonTag) {
          const ownerStackMessage = _base_ui_utils_safeReact__WEBPACK_IMPORTED_MODULE_4__.SafeReact.captureOwnerStack?.() || '';
          const message = 'A component that acts as a button expected a native <button> because the ' + '`nativeButton` prop is true. Rendering a non-<button> removes native button ' + 'semantics, which can impact forms and accessibility. Use a real <button> in the ' + '`render` prop, or set `nativeButton` to `false`.';
          (0,_base_ui_utils_error__WEBPACK_IMPORTED_MODULE_3__.error)(`${message}${ownerStackMessage}`);
        }
      } else if (isButtonTag) {
        const ownerStackMessage = _base_ui_utils_safeReact__WEBPACK_IMPORTED_MODULE_4__.SafeReact.captureOwnerStack?.() || '';
        const message = 'A component that acts as a button expected a non-<button> because the `nativeButton` ' + 'prop is false. Rendering a <button> keeps native behavior while Base UI applies ' + 'non-native attributes and handlers, which can add unintended extra attributes (such ' + 'as `role` or `aria-disabled`). Use a non-<button> in the `render` prop, or set ' + '`nativeButton` to `true`.';
        (0,_base_ui_utils_error__WEBPACK_IMPORTED_MODULE_3__.error)(`${message}${ownerStackMessage}`);
      }
    }, [isNativeButton]);
  }

  // handles a disabled composite button rendering another button, e.g.
  // <Toolbar.Button disabled render={<Menu.Trigger />} />
  // the `disabled` prop needs to pass through 2 `useButton`s then finally
  // delete the `disabled` attribute from DOM
  const updateDisabled = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(() => {
    const element = elementRef.current;
    if (!isButtonElement(element)) {
      return;
    }
    if (isCompositeItem && disabled && focusableWhenDisabledProps.disabled === undefined && element.disabled) {
      element.disabled = false;
    }
  }, [disabled, focusableWhenDisabledProps.disabled, isCompositeItem]);
  (0,_base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_5__.useIsoLayoutEffect)(updateDisabled, [updateDisabled]);
  const getButtonProps = react__WEBPACK_IMPORTED_MODULE_0__.useCallback((externalProps = {}) => {
    const {
      onClick: externalOnClick,
      onMouseDown: externalOnMouseDown,
      onKeyUp: externalOnKeyUp,
      onKeyDown: externalOnKeyDown,
      onPointerDown: externalOnPointerDown,
      ...otherExternalProps
    } = externalProps;
    return (0,_merge_props_index_mjs__WEBPACK_IMPORTED_MODULE_6__.mergeProps)({
      onClick(event) {
        if (disabled) {
          event.preventDefault();
          return;
        }
        externalOnClick?.(event);
      },
      onMouseDown(event) {
        if (!disabled) {
          externalOnMouseDown?.(event);
        }
      },
      onKeyDown(event) {
        if (disabled) {
          return;
        }
        ;(0,_merge_props_index_mjs__WEBPACK_IMPORTED_MODULE_6__.makeEventPreventable)(event);
        externalOnKeyDown?.(event);
        if (event.baseUIHandlerPrevented) {
          return;
        }
        const isCurrentTarget = event.target === event.currentTarget;
        const currentTarget = event.currentTarget;
        const isButton = isButtonElement(currentTarget);
        const isLink = !isNativeButton && isValidLinkElement(currentTarget);
        const shouldClick = isCurrentTarget && (isNativeButton ? isButton : !isLink);
        const isEnterKey = event.key === 'Enter';
        const isSpaceKey = event.key === ' ';
        const role = currentTarget.getAttribute('role');
        const isTextNavigationRole = role?.startsWith('menuitem') || role === 'option' || role === 'gridcell';
        if (isCurrentTarget && isCompositeItem && isSpaceKey) {
          if (event.defaultPrevented && isTextNavigationRole) {
            return;
          }
          event.preventDefault();
          if (isLink || isNativeButton && isButton) {
            currentTarget.click();
            event.preventBaseUIHandler();
          } else if (shouldClick) {
            externalOnClick?.(event);
            event.preventBaseUIHandler();
          }
          return;
        }

        // Keyboard accessibility for native and non-native elements.
        if (shouldClick) {
          if (!isNativeButton && (isSpaceKey || isEnterKey)) {
            event.preventDefault();
          }
          if (!isNativeButton && isEnterKey) {
            externalOnClick?.(event);
          }
        }
      },
      onKeyUp(event) {
        if (disabled) {
          return;
        }

        // calling preventDefault in keyUp on a <button> will not dispatch a click event if Space is pressed
        // https://codesandbox.io/p/sandbox/button-keyup-preventdefault-dn7f0
        ;(0,_merge_props_index_mjs__WEBPACK_IMPORTED_MODULE_6__.makeEventPreventable)(event);
        externalOnKeyUp?.(event);
        if (event.target === event.currentTarget && isNativeButton && isCompositeItem && isButtonElement(event.currentTarget) && event.key === ' ') {
          event.preventDefault();
          return;
        }
        if (event.baseUIHandlerPrevented) {
          return;
        }

        // Keyboard accessibility for non interactive elements
        if (event.target === event.currentTarget && !isNativeButton && !isCompositeItem && event.key === ' ') {
          externalOnClick?.(event);
        }
      },
      onPointerDown(event) {
        if (disabled) {
          event.preventDefault();
          return;
        }
        externalOnPointerDown?.(event);
      }
    }, isNativeButton ? {
      type: 'button'
    } : {
      role: 'button'
    }, focusableWhenDisabledProps, otherExternalProps);
  }, [disabled, focusableWhenDisabledProps, isCompositeItem, isNativeButton]);
  const buttonRef = (0,_base_ui_utils_useStableCallback__WEBPACK_IMPORTED_MODULE_2__.useStableCallback)(element => {
    elementRef.current = element;
    updateDisabled();
  });
  return {
    getButtonProps,
    buttonRef
  };
}
function isButtonElement(elem) {
  return (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_1__.isHTMLElement)(elem) && elem.tagName === 'BUTTON';
}
function isValidLinkElement(elem) {
  return Boolean(elem?.tagName === 'A' && elem?.href);
}

/***/ },

/***/ "./node_modules/@base-ui/react/internals/useAnimationsFinished.mjs"
/*!*************************************************************************!*\
  !*** ./node_modules/@base-ui/react/internals/useAnimationsFinished.mjs ***!
  \*************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useAnimationsFinished: () => (/* binding */ useAnimationsFinished)
/* harmony export */ });
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-dom */ "react-dom");
/* harmony import */ var _base_ui_utils_useAnimationFrame__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @base-ui/utils/useAnimationFrame */ "./node_modules/@base-ui/utils/useAnimationFrame.mjs");
/* harmony import */ var _base_ui_utils_useStableCallback__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @base-ui/utils/useStableCallback */ "./node_modules/@base-ui/utils/useStableCallback.mjs");
/* harmony import */ var _utils_resolveRef_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/resolveRef.mjs */ "./node_modules/@base-ui/react/utils/resolveRef.mjs");
/* harmony import */ var _stateAttributesMapping_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./stateAttributesMapping.mjs */ "./node_modules/@base-ui/react/internals/stateAttributesMapping.mjs");
'use client';







/**
 * Executes a function once all animations have finished on the provided element.
 * @param elementOrRef - The element to watch for animations.
 * @param waitForStartingStyleRemoved - Whether to wait for [data-starting-style] to be removed before checking for animations.
 * @param treatAbortedAsFinished - Whether to treat aborted animations as finished. If `false`, and there are aborted animations,
 *   the function will check again if any new animations have started and wait for them to finish.
 * @returns A function that takes a callback to execute once all animations have finished, and an optional AbortSignal to abort the callback
 */
function useAnimationsFinished(elementOrRef, waitForStartingStyleRemoved = false, treatAbortedAsFinished = true) {
  const frame = (0,_base_ui_utils_useAnimationFrame__WEBPACK_IMPORTED_MODULE_1__.useAnimationFrame)();
  return (0,_base_ui_utils_useStableCallback__WEBPACK_IMPORTED_MODULE_2__.useStableCallback)((fnToExecute,
  /**
   * An optional [AbortSignal](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal) that
   * can be used to abort `fnToExecute` before all the animations have finished.
   * @default null
   */
  signal = null) => {
    frame.cancel();
    const element = (0,_utils_resolveRef_mjs__WEBPACK_IMPORTED_MODULE_3__.resolveRef)(elementOrRef);
    if (element == null) {
      return;
    }
    const resolvedElement = element;
    const done = () => {
      // Synchronously flush the unmounting of the component so that the browser doesn't
      // paint: https://github.com/mui/base-ui/issues/979
      react_dom__WEBPACK_IMPORTED_MODULE_0__.flushSync(fnToExecute);
    };
    if (typeof resolvedElement.getAnimations !== 'function' || globalThis.BASE_UI_ANIMATIONS_DISABLED) {
      fnToExecute();
      return;
    }
    function exec() {
      Promise.all(resolvedElement.getAnimations().map(animation => animation.finished)).then(() => {
        if (!signal?.aborted) {
          done();
        }
      }).catch(() => {
        if (treatAbortedAsFinished) {
          if (!signal?.aborted) {
            done();
          }
          return;
        }
        const currentAnimations = resolvedElement.getAnimations();
        if (!signal?.aborted && currentAnimations.length > 0 && currentAnimations.some(animation => animation.pending || animation.playState !== 'finished')) {
          // Sometimes animations can be aborted because a property they depend on changes while the animation plays.
          // In such cases, we need to re-check if any new animations have started.
          exec();
        }
      });
    }
    if (waitForStartingStyleRemoved) {
      const startingStyleAttribute = _stateAttributesMapping_mjs__WEBPACK_IMPORTED_MODULE_4__.TransitionStatusDataAttributes.startingStyle;

      // If `[data-starting-style]` isn't present, fall back to waiting one more frame
      // to give "open" animations a chance to be registered.
      if (!resolvedElement.hasAttribute(startingStyleAttribute)) {
        frame.request(exec);
        return;
      }

      // Wait for `[data-starting-style]` to have been removed.
      const attributeObserver = new MutationObserver(() => {
        if (!resolvedElement.hasAttribute(startingStyleAttribute)) {
          attributeObserver.disconnect();
          exec();
        }
      });
      attributeObserver.observe(resolvedElement, {
        attributes: true,
        attributeFilter: [startingStyleAttribute]
      });
      signal?.addEventListener('abort', () => attributeObserver.disconnect(), {
        once: true
      });
      return;
    }
    frame.request(exec);
  });
}

/***/ },

/***/ "./node_modules/@base-ui/react/internals/useBaseUiId.mjs"
/*!***************************************************************!*\
  !*** ./node_modules/@base-ui/react/internals/useBaseUiId.mjs ***!
  \***************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useBaseUiId: () => (/* binding */ useBaseUiId)
/* harmony export */ });
/* harmony import */ var _base_ui_utils_useId__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @base-ui/utils/useId */ "./node_modules/@base-ui/utils/useId.mjs");
'use client';



/**
 * Wraps `useId` and prefixes generated `id`s with `base-ui-`
 * @param {string | undefined} idOverride overrides the generated id when provided
 * @returns {string | undefined}
 */
function useBaseUiId(idOverride) {
  return (0,_base_ui_utils_useId__WEBPACK_IMPORTED_MODULE_0__.useId)(idOverride, 'base-ui');
}

/***/ },

/***/ "./node_modules/@base-ui/react/internals/useOpenChangeComplete.mjs"
/*!*************************************************************************!*\
  !*** ./node_modules/@base-ui/react/internals/useOpenChangeComplete.mjs ***!
  \*************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useOpenChangeComplete: () => (/* binding */ useOpenChangeComplete)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _base_ui_utils_useStableCallback__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @base-ui/utils/useStableCallback */ "./node_modules/@base-ui/utils/useStableCallback.mjs");
/* harmony import */ var _useAnimationsFinished_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./useAnimationsFinished.mjs */ "./node_modules/@base-ui/react/internals/useAnimationsFinished.mjs");
'use client';





/**
 * Calls the provided function when the CSS open/close animation or transition completes.
 */
function useOpenChangeComplete(parameters) {
  const {
    enabled = true,
    open,
    ref,
    onComplete: onCompleteParam
  } = parameters;
  const onComplete = (0,_base_ui_utils_useStableCallback__WEBPACK_IMPORTED_MODULE_1__.useStableCallback)(onCompleteParam);
  const runOnceAnimationsFinish = (0,_useAnimationsFinished_mjs__WEBPACK_IMPORTED_MODULE_2__.useAnimationsFinished)(ref, open, false);
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    if (!enabled) {
      return undefined;
    }
    const abortController = new AbortController();
    runOnceAnimationsFinish(onComplete, abortController.signal);
    return () => {
      abortController.abort();
    };
  }, [enabled, open, onComplete, runOnceAnimationsFinish]);
}

/***/ },

/***/ "./node_modules/@base-ui/react/internals/useRenderElement.mjs"
/*!********************************************************************!*\
  !*** ./node_modules/@base-ui/react/internals/useRenderElement.mjs ***!
  \********************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useRenderElement: () => (/* binding */ useRenderElement)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _base_ui_utils_useMergedRefs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @base-ui/utils/useMergedRefs */ "./node_modules/@base-ui/utils/useMergedRefs.mjs");
/* harmony import */ var _base_ui_utils_getReactElementRef__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @base-ui/utils/getReactElementRef */ "./node_modules/@base-ui/utils/getReactElementRef.mjs");
/* harmony import */ var _base_ui_utils_mergeObjects__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @base-ui/utils/mergeObjects */ "./node_modules/@base-ui/utils/mergeObjects.mjs");
/* harmony import */ var _base_ui_utils_warn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @base-ui/utils/warn */ "./node_modules/@base-ui/utils/warn.mjs");
/* harmony import */ var _base_ui_utils_empty__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @base-ui/utils/empty */ "./node_modules/@base-ui/utils/empty.mjs");
/* harmony import */ var _getStateAttributesProps_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./getStateAttributesProps.mjs */ "./node_modules/@base-ui/react/internals/getStateAttributesProps.mjs");
/* harmony import */ var _utils_resolveClassName_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils/resolveClassName.mjs */ "./node_modules/@base-ui/react/utils/resolveClassName.mjs");
/* harmony import */ var _utils_resolveStyle_mjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../utils/resolveStyle.mjs */ "./node_modules/@base-ui/react/utils/resolveStyle.mjs");
/* harmony import */ var _merge_props_index_mjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../merge-props/index.mjs */ "./node_modules/@base-ui/react/merge-props/mergeProps.mjs");












/**
 * Renders a Base UI element.
 *
 * @param element The default HTML element to render. Can be overridden by the `render` prop.
 * @param componentProps An object containing the `render` and `className` props to be used for element customization. Other props are ignored.
 * @param params Additional parameters for rendering the element.
 */
function useRenderElement(element, componentProps, params = {}) {
  const renderProp = componentProps.render;
  const outProps = useRenderElementProps(componentProps, params);
  if (params.enabled === false) {
    return null;
  }
  const state = params.state ?? _base_ui_utils_empty__WEBPACK_IMPORTED_MODULE_5__.EMPTY_OBJECT;
  return evaluateRenderProp(element, renderProp, outProps, state);
}

/**
 * Computes render element final props.
 */
function useRenderElementProps(componentProps, params = {}) {
  const {
    className: classNameProp,
    style: styleProp,
    render: renderProp
  } = componentProps;
  const {
    state = _base_ui_utils_empty__WEBPACK_IMPORTED_MODULE_5__.EMPTY_OBJECT,
    ref,
    props,
    stateAttributesMapping,
    enabled = true
  } = params;
  const className = enabled ? (0,_utils_resolveClassName_mjs__WEBPACK_IMPORTED_MODULE_7__.resolveClassName)(classNameProp, state) : undefined;
  const style = enabled ? (0,_utils_resolveStyle_mjs__WEBPACK_IMPORTED_MODULE_8__.resolveStyle)(styleProp, state) : undefined;
  const stateProps = enabled ? (0,_getStateAttributesProps_mjs__WEBPACK_IMPORTED_MODULE_6__.getStateAttributesProps)(state, stateAttributesMapping) : _base_ui_utils_empty__WEBPACK_IMPORTED_MODULE_5__.EMPTY_OBJECT;
  const resolvedProps = enabled && props ? resolveRenderFunctionProps(props) : undefined;

  // Ensure outProps is always a new mutable object when enabled, never EMPTY_OBJECT.
  // This prevents potential TypeError when setting ref, className, or style properties,
  // since EMPTY_OBJECT is frozen and mutations would fail in strict mode.
  const outProps = enabled ? (0,_base_ui_utils_mergeObjects__WEBPACK_IMPORTED_MODULE_3__.mergeObjects)(stateProps, resolvedProps) ?? {} : _base_ui_utils_empty__WEBPACK_IMPORTED_MODULE_5__.EMPTY_OBJECT;

  // SAFETY: The `useMergedRefs` functions use a single hook to store the same value,
  // switching between them at runtime is safe. If this assertion fails, React will
  // throw at runtime anyway.
  // This also skips the `useMergedRefs` call on the server, which is fine because
  // refs are not used on the server side.
  /* eslint-disable react-hooks/rules-of-hooks */
  if (typeof document !== 'undefined') {
    if (!enabled) {
      (0,_base_ui_utils_useMergedRefs__WEBPACK_IMPORTED_MODULE_1__.useMergedRefs)(null, null);
    } else if (Array.isArray(ref)) {
      outProps.ref = (0,_base_ui_utils_useMergedRefs__WEBPACK_IMPORTED_MODULE_1__.useMergedRefsN)([outProps.ref, (0,_base_ui_utils_getReactElementRef__WEBPACK_IMPORTED_MODULE_2__.getReactElementRef)(renderProp), ...ref]);
    } else {
      outProps.ref = (0,_base_ui_utils_useMergedRefs__WEBPACK_IMPORTED_MODULE_1__.useMergedRefs)(outProps.ref, (0,_base_ui_utils_getReactElementRef__WEBPACK_IMPORTED_MODULE_2__.getReactElementRef)(renderProp), ref);
    }
  }
  if (!enabled) {
    return _base_ui_utils_empty__WEBPACK_IMPORTED_MODULE_5__.EMPTY_OBJECT;
  }
  if (className !== undefined) {
    outProps.className = (0,_merge_props_index_mjs__WEBPACK_IMPORTED_MODULE_9__.mergeClassNames)(outProps.className, className);
  }
  if (style !== undefined) {
    outProps.style = (0,_base_ui_utils_mergeObjects__WEBPACK_IMPORTED_MODULE_3__.mergeObjects)(outProps.style, style);
  }
  return outProps;
}
function resolveRenderFunctionProps(props) {
  if (Array.isArray(props)) {
    return (0,_merge_props_index_mjs__WEBPACK_IMPORTED_MODULE_9__.mergePropsN)(props);
  }
  return (0,_merge_props_index_mjs__WEBPACK_IMPORTED_MODULE_9__.mergeProps)(undefined, props);
}

// The symbol React uses internally for lazy components
// https://github.com/facebook/react/blob/a0566250b210499b4c5677f5ac2eedbd71d51a1b/packages/shared/ReactSymbols.js#L31
//
// TODO delete once https://github.com/facebook/react/issues/32392 is fixed
const REACT_LAZY_TYPE = Symbol.for('react.lazy');
const COMPONENT_IDENTIFIER_PATTERN = /^[A-Z][A-Za-z0-9$]*$/;
const LOWERCASE_CHARACTER_PATTERN = /[a-z]/;
function evaluateRenderProp(element, render, props, state) {
  if (render) {
    if (typeof render === 'function') {
      if (true) {
        warnIfRenderPropLooksLikeComponent(render);
      }
      return render(props, state);
    }
    const mergedProps = (0,_merge_props_index_mjs__WEBPACK_IMPORTED_MODULE_9__.mergeProps)(props, render.props);
    mergedProps.ref = props.ref;
    let newElement = render;

    // Workaround for https://github.com/facebook/react/issues/32392
    // This works because the toArray() logic unwrap lazy element type in
    // https://github.com/facebook/react/blob/a0566250b210499b4c5677f5ac2eedbd71d51a1b/packages/react/src/ReactChildren.js#L186
    if (newElement?.$$typeof === REACT_LAZY_TYPE) {
      const children = react__WEBPACK_IMPORTED_MODULE_0__.Children.toArray(render);
      newElement = children[0];
    }

    // There is a high number of indirections, the error message thrown by React.cloneElement() is
    // hard to use for developers, this logic provides a better context.
    //
    // Our general guideline is to never change the control flow depending on the environment.
    // However, React.cloneElement() throws if React.isValidElement() is false,
    // so we can throw before with custom message.
    if (true) {
      if (! /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.isValidElement(newElement)) {
        // TODO: fix mui/no-guarded-throw
        // eslint-disable-next-line mui/no-guarded-throw
        throw new Error(['Base UI: The `render` prop was provided an invalid React element as `React.isValidElement(render)` is `false`.', 'A valid React element must be provided to the `render` prop because it is cloned with props to replace the default element.', 'https://base-ui.com/r/invalid-render-prop'].join('\n'));
      }
    }
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.cloneElement(newElement, mergedProps);
  }
  if (element) {
    if (typeof element === 'string') {
      return renderTag(element, props);
    }
  }
  // Unreachable, but the typings on `useRenderElement` need to be reworked
  // to annotate it correctly.
  throw new Error( true ? 'Base UI: Render element or function are not defined.' : 0);
}
function warnIfRenderPropLooksLikeComponent(renderFn) {
  const functionName = renderFn.name;
  if (functionName.length === 0) {
    return;
  }
  if (!COMPONENT_IDENTIFIER_PATTERN.test(functionName)) {
    return;
  }
  if (!LOWERCASE_CHARACTER_PATTERN.test(functionName)) {
    return;
  }
  ;(0,_base_ui_utils_warn__WEBPACK_IMPORTED_MODULE_4__.warn)(`The \`render\` prop received a function named \`${functionName}\` that starts with an uppercase letter.`, 'This usually means a React component was passed directly as `render={Component}`.', 'Base UI calls `render` as a plain function, which can break the Rules of Hooks during reconciliation.', 'If this is an intentional render callback, rename it to start with a lowercase letter.', 'Use `render={<Component />}` or `render={(props) => <Component {...props} />}` instead.', 'https://base-ui.com/r/invalid-render-prop');
}
function renderTag(Tag, props) {
  if (Tag === 'button') {
    return /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
      type: "button",
      ...props,
      key: props.key
    });
  }
  if (Tag === 'img') {
    return /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
      alt: "",
      ...props,
      key: props.key
    });
  }
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Tag, props);
}

/***/ },

/***/ "./node_modules/@base-ui/react/internals/useTransitionStatus.mjs"
/*!***********************************************************************!*\
  !*** ./node_modules/@base-ui/react/internals/useTransitionStatus.mjs ***!
  \***********************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useTransitionStatus: () => (/* binding */ useTransitionStatus)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @base-ui/utils/useIsoLayoutEffect */ "./node_modules/@base-ui/utils/useIsoLayoutEffect.mjs");
/* harmony import */ var _base_ui_utils_useAnimationFrame__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @base-ui/utils/useAnimationFrame */ "./node_modules/@base-ui/utils/useAnimationFrame.mjs");
'use client';




/**
 * Provides a status string for CSS animations.
 * @param open - a boolean that determines if the element is open.
 * @param enableIdleState - a boolean that enables the `'idle'` state between `'starting'` and `'ending'`
 */
function useTransitionStatus(open, enableIdleState = false, deferEndingState = false) {
  const [transitionStatus, setTransitionStatus] = react__WEBPACK_IMPORTED_MODULE_0__.useState(open && enableIdleState ? 'idle' : undefined);
  const [mounted, setMounted] = react__WEBPACK_IMPORTED_MODULE_0__.useState(open);
  if (open && !mounted) {
    setMounted(true);
    setTransitionStatus('starting');
  }
  if (!open && mounted && transitionStatus !== 'ending' && !deferEndingState) {
    setTransitionStatus('ending');
  }
  if (!open && !mounted && transitionStatus === 'ending') {
    setTransitionStatus(undefined);
  }
  ;(0,_base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_1__.useIsoLayoutEffect)(() => {
    if (!open && mounted && transitionStatus !== 'ending' && deferEndingState) {
      const frame = _base_ui_utils_useAnimationFrame__WEBPACK_IMPORTED_MODULE_2__.AnimationFrame.request(() => {
        setTransitionStatus('ending');
      });
      return () => {
        _base_ui_utils_useAnimationFrame__WEBPACK_IMPORTED_MODULE_2__.AnimationFrame.cancel(frame);
      };
    }
    return undefined;
  }, [open, mounted, transitionStatus, deferEndingState]);
  (0,_base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_1__.useIsoLayoutEffect)(() => {
    if (!open || enableIdleState) {
      return undefined;
    }
    const frame = _base_ui_utils_useAnimationFrame__WEBPACK_IMPORTED_MODULE_2__.AnimationFrame.request(() => {
      // Avoid `flushSync` here due to Firefox.
      // See https://github.com/mui/base-ui/pull/3424
      setTransitionStatus(undefined);
    });
    return () => {
      _base_ui_utils_useAnimationFrame__WEBPACK_IMPORTED_MODULE_2__.AnimationFrame.cancel(frame);
    };
  }, [enableIdleState, open]);
  (0,_base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_1__.useIsoLayoutEffect)(() => {
    if (!open || !enableIdleState) {
      return undefined;
    }
    if (open && mounted && transitionStatus !== 'idle') {
      setTransitionStatus('starting');
    }
    const frame = _base_ui_utils_useAnimationFrame__WEBPACK_IMPORTED_MODULE_2__.AnimationFrame.request(() => {
      setTransitionStatus('idle');
    });
    return () => {
      _base_ui_utils_useAnimationFrame__WEBPACK_IMPORTED_MODULE_2__.AnimationFrame.cancel(frame);
    };
  }, [enableIdleState, open, mounted, transitionStatus]);
  return {
    mounted,
    setMounted,
    transitionStatus
  };
}

/***/ },

/***/ "./node_modules/@base-ui/react/merge-props/mergeProps.mjs"
/*!****************************************************************!*\
  !*** ./node_modules/@base-ui/react/merge-props/mergeProps.mjs ***!
  \****************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   makeEventPreventable: () => (/* binding */ makeEventPreventable),
/* harmony export */   mergeClassNames: () => (/* binding */ mergeClassNames),
/* harmony export */   mergeProps: () => (/* binding */ mergeProps),
/* harmony export */   mergePropsN: () => (/* binding */ mergePropsN)
/* harmony export */ });
/* harmony import */ var _base_ui_utils_mergeObjects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @base-ui/utils/mergeObjects */ "./node_modules/@base-ui/utils/mergeObjects.mjs");

const EMPTY_PROPS = {};

/* eslint-disable id-denylist */
/**
 * Merges multiple sets of React props. It follows the Object.assign pattern where the rightmost object's fields overwrite
 * the conflicting ones from others. This doesn't apply to event handlers, `className` and `style` props.
 *
 * Event handlers are merged and called in right-to-left order (rightmost handler executes first, leftmost last).
 * For React synthetic events, the rightmost handler can prevent prior (left-positioned) handlers from executing
 * by calling `event.preventBaseUIHandler()`. For non-synthetic events (custom events with primitive/object values),
 * all handlers always execute without prevention capability.
 *
 * The `className` prop is merged by concatenating classes in right-to-left order (rightmost class appears first in the string).
 * The `style` prop is merged with rightmost styles overwriting the prior ones.
 *
 * Props can either be provided as objects or as functions that take the previous props as an argument.
 * The function will receive the merged props up to that point (going from left to right):
 * so in the case of `(obj1, obj2, fn, obj3)`, `fn` will receive the merged props of `obj1` and `obj2`.
 * The function is responsible for chaining event handlers if needed (that is, we don't run the merge logic).
 *
 * Event handlers returned by the functions are not automatically prevented when `preventBaseUIHandler` is called.
 * They must check `event.baseUIHandlerPrevented` themselves and bail out if it's true.
 *
 * @important **`ref` is not merged.**
 * @param a Props object to merge.
 * @param b Props object to merge. The function will overwrite conflicting props from `a`.
 * @param c Props object to merge. The function will overwrite conflicting props from previous parameters.
 * @param d Props object to merge. The function will overwrite conflicting props from previous parameters.
 * @param e Props object to merge. The function will overwrite conflicting props from previous parameters.
 * @returns The merged props.
 * @public
 */

function mergeProps(a, b, c, d, e) {
  if (!c && !d && !e && !a) {
    return createInitialMergedProps(b);
  }

  // We need to mutably own `merged`.
  let merged = createInitialMergedProps(a);
  if (b) {
    merged = mergeInto(merged, b);
  }
  if (c) {
    merged = mergeInto(merged, c);
  }
  if (d) {
    merged = mergeInto(merged, d);
  }
  if (e) {
    merged = mergeInto(merged, e);
  }
  return merged;
}
/* eslint-enable id-denylist */

/**
 * Merges an arbitrary number of React props using the same logic as {@link mergeProps}.
 * This function accepts an array of props instead of individual arguments.
 *
 * This has slightly lower performance than {@link mergeProps} due to accepting an array
 * instead of a fixed number of arguments. Prefer {@link mergeProps} when merging 5 or
 * fewer prop sets for better performance.
 *
 * @param props Array of props to merge.
 * @returns The merged props.
 * @see mergeProps
 * @public
 */
function mergePropsN(props) {
  if (props.length === 0) {
    return EMPTY_PROPS;
  }
  if (props.length === 1) {
    return createInitialMergedProps(props[0]);
  }

  // We need to mutably own `merged`.
  let merged = createInitialMergedProps(props[0]);
  for (let i = 1; i < props.length; i += 1) {
    merged = mergeInto(merged, props[i]);
  }
  return merged;
}
function createInitialMergedProps(inputProps) {
  if (isPropsGetter(inputProps)) {
    // Getter-returned handlers intentionally keep their existing semantics.
    return {
      ...resolvePropsGetter(inputProps, EMPTY_PROPS)
    };
  }
  return copyInitialProps(inputProps);
}
function mergeInto(merged, inputProps) {
  if (isPropsGetter(inputProps)) {
    return resolvePropsGetter(inputProps, merged);
  }
  return mutablyMergeInto(merged, inputProps);
}
function copyInitialProps(inputProps) {
  const copiedProps = {
    ...inputProps
  };

  // `copiedProps` is our fresh own-object copy, so iterating with `for...in` is safe here.
  // eslint-disable-next-line guard-for-in
  for (const propName in copiedProps) {
    const propValue = copiedProps[propName];
    if (isEventHandler(propName, propValue)) {
      copiedProps[propName] = wrapEventHandler(propValue);
    }
  }
  return copiedProps;
}

/**
 * Merges two sets of props. In case of conflicts, the external props take precedence.
 */
function mutablyMergeInto(mergedProps, externalProps) {
  if (!externalProps) {
    return mergedProps;
  }

  // eslint-disable-next-line guard-for-in
  for (const propName in externalProps) {
    const externalPropValue = externalProps[propName];
    switch (propName) {
      case 'style':
        {
          mergedProps[propName] = (0,_base_ui_utils_mergeObjects__WEBPACK_IMPORTED_MODULE_0__.mergeObjects)(mergedProps.style, externalPropValue);
          break;
        }
      case 'className':
        {
          mergedProps[propName] = mergeClassNames(mergedProps.className, externalPropValue);
          break;
        }
      default:
        {
          if (isEventHandler(propName, externalPropValue)) {
            mergedProps[propName] = mergeEventHandlers(mergedProps[propName], externalPropValue);
          } else {
            mergedProps[propName] = externalPropValue;
          }
        }
    }
  }
  return mergedProps;
}
function isEventHandler(key, value) {
  // This approach is more efficient than using a regex.
  const code0 = key.charCodeAt(0);
  const code1 = key.charCodeAt(1);
  const code2 = key.charCodeAt(2);
  return code0 === 111 /* o */ && code1 === 110 /* n */ && code2 >= 65 /* A */ && code2 <= 90 /* Z */ && (typeof value === 'function' || typeof value === 'undefined');
}
function isPropsGetter(inputProps) {
  return typeof inputProps === 'function';
}
function resolvePropsGetter(inputProps, previousProps) {
  if (isPropsGetter(inputProps)) {
    return inputProps(previousProps);
  }
  return inputProps ?? EMPTY_PROPS;
}
function mergeEventHandlers(ourHandler, theirHandler) {
  if (!theirHandler) {
    return ourHandler;
  }
  if (!ourHandler) {
    return wrapEventHandler(theirHandler);
  }
  return (...args) => {
    const event = args[0];
    if (isSyntheticEvent(event)) {
      const baseUIEvent = event;
      makeEventPreventable(baseUIEvent);
      const result = theirHandler(...args);
      if (!baseUIEvent.baseUIHandlerPrevented) {
        ourHandler?.(...args);
      }
      return result;
    }
    const result = theirHandler(...args);
    ourHandler?.(...args);
    return result;
  };
}
function wrapEventHandler(handler) {
  if (!handler) {
    return handler;
  }
  return (...args) => {
    const event = args[0];
    if (isSyntheticEvent(event)) {
      makeEventPreventable(event);
    }
    return handler(...args);
  };
}
function makeEventPreventable(event) {
  event.preventBaseUIHandler = () => {
    event.baseUIHandlerPrevented = true;
  };
  return event;
}
function mergeClassNames(ourClassName, theirClassName) {
  if (theirClassName) {
    if (ourClassName) {
      // eslint-disable-next-line prefer-template
      return theirClassName + ' ' + ourClassName;
    }
    return theirClassName;
  }
  return ourClassName;
}
function isSyntheticEvent(event) {
  return event != null && typeof event === 'object' && 'nativeEvent' in event;
}

/***/ },

/***/ "./node_modules/@base-ui/react/use-render/useRender.mjs"
/*!**************************************************************!*\
  !*** ./node_modules/@base-ui/react/use-render/useRender.mjs ***!
  \**************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useRender: () => (/* binding */ useRender)
/* harmony export */ });
/* harmony import */ var _internals_useRenderElement_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../internals/useRenderElement.mjs */ "./node_modules/@base-ui/react/internals/useRenderElement.mjs");

/**
 * Renders a Base UI element.
 *
 * @public
 */
function useRender(params) {
  return (0,_internals_useRenderElement_mjs__WEBPACK_IMPORTED_MODULE_0__.useRenderElement)(params.defaultTagName ?? 'div', params, params);
}

/***/ },

/***/ "./node_modules/@base-ui/react/utils/collapsibleOpenStateMapping.mjs"
/*!***************************************************************************!*\
  !*** ./node_modules/@base-ui/react/utils/collapsibleOpenStateMapping.mjs ***!
  \***************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   collapsibleOpenStateMapping: () => (/* binding */ collapsibleOpenStateMapping),
/* harmony export */   triggerOpenStateMapping: () => (/* binding */ triggerOpenStateMapping)
/* harmony export */ });
/* harmony import */ var _collapsible_panel_CollapsiblePanelDataAttributes_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../collapsible/panel/CollapsiblePanelDataAttributes.mjs */ "./node_modules/@base-ui/react/collapsible/panel/CollapsiblePanelDataAttributes.mjs");
/* harmony import */ var _collapsible_trigger_CollapsibleTriggerDataAttributes_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../collapsible/trigger/CollapsibleTriggerDataAttributes.mjs */ "./node_modules/@base-ui/react/collapsible/trigger/CollapsibleTriggerDataAttributes.mjs");


const PANEL_OPEN_HOOK = {
  [_collapsible_panel_CollapsiblePanelDataAttributes_mjs__WEBPACK_IMPORTED_MODULE_0__.CollapsiblePanelDataAttributes.open]: ''
};
const PANEL_CLOSED_HOOK = {
  [_collapsible_panel_CollapsiblePanelDataAttributes_mjs__WEBPACK_IMPORTED_MODULE_0__.CollapsiblePanelDataAttributes.closed]: ''
};
const triggerOpenStateMapping = {
  open(value) {
    if (value) {
      return {
        [_collapsible_trigger_CollapsibleTriggerDataAttributes_mjs__WEBPACK_IMPORTED_MODULE_1__.CollapsibleTriggerDataAttributes.panelOpen]: ''
      };
    }
    return null;
  }
};
const collapsibleOpenStateMapping = {
  open(value) {
    if (value) {
      return PANEL_OPEN_HOOK;
    }
    return PANEL_CLOSED_HOOK;
  }
};

/***/ },

/***/ "./node_modules/@base-ui/react/utils/resolveClassName.mjs"
/*!****************************************************************!*\
  !*** ./node_modules/@base-ui/react/utils/resolveClassName.mjs ***!
  \****************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   resolveClassName: () => (/* binding */ resolveClassName)
/* harmony export */ });
/**
 * If the provided className is a string, it will be returned as is.
 * Otherwise, the function will call the className function with the state as the first argument.
 *
 * @param className
 * @param state
 */
function resolveClassName(className, state) {
  return typeof className === 'function' ? className(state) : className;
}

/***/ },

/***/ "./node_modules/@base-ui/react/utils/resolveRef.mjs"
/*!**********************************************************!*\
  !*** ./node_modules/@base-ui/react/utils/resolveRef.mjs ***!
  \**********************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   resolveRef: () => (/* binding */ resolveRef)
/* harmony export */ });
/**
 * If the provided argument is a ref object, returns its `current` value.
 * Otherwise, returns the argument itself.
 */
function resolveRef(maybeRef) {
  if (maybeRef == null) {
    return maybeRef;
  }
  return 'current' in maybeRef ? maybeRef.current : maybeRef;
}

/***/ },

/***/ "./node_modules/@base-ui/react/utils/resolveStyle.mjs"
/*!************************************************************!*\
  !*** ./node_modules/@base-ui/react/utils/resolveStyle.mjs ***!
  \************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   resolveStyle: () => (/* binding */ resolveStyle)
/* harmony export */ });
/**
 * If the provided style is an object, it will be returned as is.
 * Otherwise, the function will call the style function with the state as the first argument.
 *
 * @param style
 * @param state
 */
function resolveStyle(style, state) {
  return typeof style === 'function' ? style(state) : style;
}

/***/ },

/***/ "./node_modules/@base-ui/react/utils/useFocusableWhenDisabled.mjs"
/*!************************************************************************!*\
  !*** ./node_modules/@base-ui/react/utils/useFocusableWhenDisabled.mjs ***!
  \************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useFocusableWhenDisabled: () => (/* binding */ useFocusableWhenDisabled)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
'use client';


function useFocusableWhenDisabled(parameters) {
  const {
    focusableWhenDisabled,
    disabled,
    composite = false,
    tabIndex: tabIndexProp = 0,
    isNativeButton
  } = parameters;
  const isFocusableComposite = composite && focusableWhenDisabled !== false;
  const isNonFocusableComposite = composite && focusableWhenDisabled === false;

  // we can't explicitly assign `undefined` to any of these props because it
  // would otherwise prevent subsequently merged props from setting them
  const props = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => {
    const additionalProps = {
      // allow Tabbing away from focusableWhenDisabled elements
      onKeyDown(event) {
        if (disabled && focusableWhenDisabled && event.key !== 'Tab') {
          event.preventDefault();
        }
      }
    };
    if (!composite) {
      additionalProps.tabIndex = tabIndexProp;
      if (!isNativeButton && disabled) {
        additionalProps.tabIndex = focusableWhenDisabled ? tabIndexProp : -1;
      }
    }
    if (isNativeButton && (focusableWhenDisabled || isFocusableComposite) || !isNativeButton && disabled) {
      additionalProps['aria-disabled'] = disabled;
    }
    if (isNativeButton && (!focusableWhenDisabled || isNonFocusableComposite)) {
      additionalProps.disabled = disabled;
    }
    return additionalProps;
  }, [composite, disabled, focusableWhenDisabled, isFocusableComposite, isNonFocusableComposite, isNativeButton, tabIndexProp]);
  return {
    props
  };
}

/***/ },

/***/ "./node_modules/@base-ui/utils/addEventListener.mjs"
/*!**********************************************************!*\
  !*** ./node_modules/@base-ui/utils/addEventListener.mjs ***!
  \**********************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addEventListener: () => (/* binding */ addEventListener)
/* harmony export */ });
/**
 * Adds an event listener and returns a cleanup function to remove it.
 */

function addEventListener(target, type, listener, options) {
  target.addEventListener(type, listener, options);
  return () => {
    target.removeEventListener(type, listener, options);
  };
}

/***/ },

/***/ "./node_modules/@base-ui/utils/empty.mjs"
/*!***********************************************!*\
  !*** ./node_modules/@base-ui/utils/empty.mjs ***!
  \***********************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EMPTY_ARRAY: () => (/* binding */ EMPTY_ARRAY),
/* harmony export */   EMPTY_OBJECT: () => (/* binding */ EMPTY_OBJECT),
/* harmony export */   NOOP: () => (/* binding */ NOOP)
/* harmony export */ });
function NOOP() {}
const EMPTY_ARRAY = Object.freeze([]);
const EMPTY_OBJECT = Object.freeze({});

/***/ },

/***/ "./node_modules/@base-ui/utils/error.mjs"
/*!***********************************************!*\
  !*** ./node_modules/@base-ui/utils/error.mjs ***!
  \***********************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   error: () => (/* binding */ error),
/* harmony export */   reset: () => (/* binding */ reset)
/* harmony export */ });
let set;
if (true) {
  set = new Set();
}
function error(...messages) {
  if (true) {
    const messageKey = messages.join(' ');
    if (!set.has(messageKey)) {
      set.add(messageKey);
      console.error(`Base UI: ${messageKey}`);
    }
  }
}
function reset() {
  set?.clear();
}

/***/ },

/***/ "./node_modules/@base-ui/utils/getReactElementRef.mjs"
/*!************************************************************!*\
  !*** ./node_modules/@base-ui/utils/getReactElementRef.mjs ***!
  \************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getReactElementRef: () => (/* binding */ getReactElementRef)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _reactVersion_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./reactVersion.mjs */ "./node_modules/@base-ui/utils/reactVersion.mjs");



/**
 * Extracts the `ref` from a React element, handling different React versions.
 */
function getReactElementRef(element) {
  if (! /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.isValidElement(element)) {
    return null;
  }
  const reactElement = element;
  const propsWithRef = reactElement.props;
  return ((0,_reactVersion_mjs__WEBPACK_IMPORTED_MODULE_1__.isReactVersionAtLeast)(19) ? propsWithRef?.ref : reactElement.ref) ?? null;
}

/***/ },

/***/ "./node_modules/@base-ui/utils/mergeObjects.mjs"
/*!******************************************************!*\
  !*** ./node_modules/@base-ui/utils/mergeObjects.mjs ***!
  \******************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   mergeObjects: () => (/* binding */ mergeObjects)
/* harmony export */ });
function mergeObjects(a, b) {
  if (a && !b) {
    return a;
  }
  if (!a && b) {
    return b;
  }
  if (a || b) {
    return {
      ...a,
      ...b
    };
  }
  return undefined;
}

/***/ },

/***/ "./node_modules/@base-ui/utils/owner.mjs"
/*!***********************************************!*\
  !*** ./node_modules/@base-ui/utils/owner.mjs ***!
  \***********************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ownerDocument: () => (/* binding */ ownerDocument),
/* harmony export */   ownerWindow: () => (/* reexport safe */ _floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__.getWindow)
/* harmony export */ });
/* harmony import */ var _floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @floating-ui/utils/dom */ "./node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs");

function ownerDocument(node) {
  return node?.ownerDocument || document;
}

/***/ },

/***/ "./node_modules/@base-ui/utils/reactVersion.mjs"
/*!******************************************************!*\
  !*** ./node_modules/@base-ui/utils/reactVersion.mjs ***!
  \******************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isReactVersionAtLeast: () => (/* binding */ isReactVersionAtLeast)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");

const majorVersion = parseInt(react__WEBPACK_IMPORTED_MODULE_0__.version, 10);
function isReactVersionAtLeast(reactVersionToCheck) {
  return majorVersion >= reactVersionToCheck;
}

/***/ },

/***/ "./node_modules/@base-ui/utils/safeReact.mjs"
/*!***************************************************!*\
  !*** ./node_modules/@base-ui/utils/safeReact.mjs ***!
  \***************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

let react__WEBPACK_IMPORTED_MODULE_0___namespace_cache;
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SafeReact: () => (/* binding */ SafeReact)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");


/**
 * A clone of the React namespace for reading APIs that may be missing in older
 * supported React versions. Bundlers can rewrite direct `React.someNewApi`
 * reads into named imports, which breaks React 17. Reading from this cloned
 * object keeps those lookups optional.
 *
 * @see https://github.com/mui/material-ui/issues/41190#issuecomment-2040873379
 */
const SafeReact = {
  .../*#__PURE__*/ (react__WEBPACK_IMPORTED_MODULE_0___namespace_cache || (react__WEBPACK_IMPORTED_MODULE_0___namespace_cache = __webpack_require__.t(react__WEBPACK_IMPORTED_MODULE_0__, 2)))
};

/***/ },

/***/ "./node_modules/@base-ui/utils/useAnimationFrame.mjs"
/*!***********************************************************!*\
  !*** ./node_modules/@base-ui/utils/useAnimationFrame.mjs ***!
  \***********************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AnimationFrame: () => (/* binding */ AnimationFrame),
/* harmony export */   useAnimationFrame: () => (/* binding */ useAnimationFrame)
/* harmony export */ });
/* harmony import */ var _useRefWithInit_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./useRefWithInit.mjs */ "./node_modules/@base-ui/utils/useRefWithInit.mjs");
/* harmony import */ var _useOnMount_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./useOnMount.mjs */ "./node_modules/@base-ui/utils/useOnMount.mjs");
'use client';



/** Unlike `setTimeout`, rAF doesn't guarantee a positive integer return value, so we can't have
 * a monomorphic `uint` type with `0` meaning empty.
 * See warning note at:
 * https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame#return_value */
const EMPTY = null;
let LAST_RAF = globalThis.requestAnimationFrame;
class Scheduler {
  /* This implementation uses an array as a backing data-structure for frame callbacks.
   * It allows `O(1)` callback cancelling by inserting a `null` in the array, though it
   * never calls the native `cancelAnimationFrame` if there are no frames left. This can
   * be much more efficient if there is a call pattern that alterns as
   * "request-cancel-request-cancel-…".
   * But in the case of "request-request-…-cancel-cancel-…", it leaves the final animation
   * frame to run anyway. We turn that frame into a `O(1)` no-op via `callbacksCount`. */

  callbacks = [];
  callbacksCount = 0;
  nextId = 1;
  startId = 1;
  isScheduled = false;
  tick = timestamp => {
    this.isScheduled = false;
    const currentCallbacks = this.callbacks;
    const currentCallbacksCount = this.callbacksCount;

    // Update these before iterating, callbacks could call `requestAnimationFrame` again.
    this.callbacks = [];
    this.callbacksCount = 0;
    this.startId = this.nextId;
    if (currentCallbacksCount > 0) {
      for (let i = 0; i < currentCallbacks.length; i += 1) {
        currentCallbacks[i]?.(timestamp);
      }
    }
  };
  request(fn) {
    const id = this.nextId;
    this.nextId += 1;
    this.callbacks.push(fn);
    this.callbacksCount += 1;

    /* In a test environment with fake timers, a fake `requestAnimationFrame` can be called
     * but there's no guarantee that the animation frame will actually run before the fake
     * timers are teared, which leaves `isScheduled` set, but won't run our `tick()`. */
    const didRAFChange =  true && LAST_RAF !== requestAnimationFrame && (LAST_RAF = requestAnimationFrame, true);
    if (!this.isScheduled || didRAFChange) {
      requestAnimationFrame(this.tick);
      this.isScheduled = true;
    }
    return id;
  }
  cancel(id) {
    const index = id - this.startId;
    if (index < 0 || index >= this.callbacks.length) {
      return;
    }
    this.callbacks[index] = null;
    this.callbacksCount -= 1;
  }
}
const scheduler = new Scheduler();
class AnimationFrame {
  static create() {
    return new AnimationFrame();
  }
  static request(fn) {
    return scheduler.request(fn);
  }
  static cancel(id) {
    return scheduler.cancel(id);
  }
  currentId = EMPTY;

  /**
   * Executes `fn` after `delay`, clearing any previously scheduled call.
   */
  request(fn) {
    this.cancel();
    this.currentId = scheduler.request(() => {
      this.currentId = EMPTY;
      fn();
    });
  }
  cancel = () => {
    if (this.currentId !== EMPTY) {
      scheduler.cancel(this.currentId);
      this.currentId = EMPTY;
    }
  };
  disposeEffect = () => {
    return this.cancel;
  };
}

/**
 * A `requestAnimationFrame` with automatic cleanup and guard.
 */
function useAnimationFrame() {
  const timeout = (0,_useRefWithInit_mjs__WEBPACK_IMPORTED_MODULE_0__.useRefWithInit)(AnimationFrame.create).current;
  (0,_useOnMount_mjs__WEBPACK_IMPORTED_MODULE_1__.useOnMount)(timeout.disposeEffect);
  return timeout;
}

/***/ },

/***/ "./node_modules/@base-ui/utils/useControlled.mjs"
/*!*******************************************************!*\
  !*** ./node_modules/@base-ui/utils/useControlled.mjs ***!
  \*******************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useControlled: () => (/* binding */ useControlled)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _error_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./error.mjs */ "./node_modules/@base-ui/utils/error.mjs");
'use client';

// TODO: uncomment once we enable eslint-plugin-react-compiler // eslint-disable-next-line react-compiler/react-compiler -- process.env never changes, dependency arrays are intentionally ignored
/* eslint-disable react-hooks/rules-of-hooks, react-hooks/exhaustive-deps */


function useControlled({
  controlled,
  default: defaultProp,
  name,
  state = 'value'
}) {
  // isControlled is ignored in the hook dependency lists as it should never change.
  const {
    current: isControlled
  } = react__WEBPACK_IMPORTED_MODULE_0__.useRef(controlled !== undefined);
  const [valueState, setValue] = react__WEBPACK_IMPORTED_MODULE_0__.useState(defaultProp);
  const value = isControlled ? controlled : valueState;
  if (true) {
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
      if (isControlled !== (controlled !== undefined)) {
        (0,_error_mjs__WEBPACK_IMPORTED_MODULE_1__.error)([`A component is changing the ${isControlled ? '' : 'un'}controlled ${state} state of ${name} to be ${isControlled ? 'un' : ''}controlled.`, 'Elements should not switch from uncontrolled to controlled (or vice versa).', `Decide between using a controlled or uncontrolled ${name} ` + 'element for the lifetime of the component.', "The nature of the state is determined during the first render. It's considered controlled if the value is not `undefined`.", 'More info: https://fb.me/react-controlled-components'].join('\n'));
      }
    }, [state, name, controlled]);
    const {
      current: defaultValue
    } = react__WEBPACK_IMPORTED_MODULE_0__.useRef(defaultProp);
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
      if (!isControlled && serializeToDevModeString(defaultValue) !== serializeToDevModeString(defaultProp)) {
        (0,_error_mjs__WEBPACK_IMPORTED_MODULE_1__.error)([`A component is changing the default ${state} state of an uncontrolled ${name} after being initialized. ` + `To suppress this warning opt to use a controlled ${name}.`].join('\n'));
      }
    }, [defaultProp]);
  }
  const setValueIfUncontrolled = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(newValue => {
    if (!isControlled) {
      setValue(newValue);
    }
  }, []);
  return [value, setValueIfUncontrolled];
}
function serializeToDevModeString(input) {
  let nextId = 0;
  const seen = new WeakMap();
  try {
    const result = JSON.stringify(input, function replacer(key, value) {
      if (key === '_owner' && this != null && typeof this === 'object' && '$$typeof' in this) {
        return undefined;
      }
      if (typeof value === 'bigint') {
        return `__bigint__:${value}`;
      }
      if (value !== null && typeof value === 'object') {
        const id = seen.get(value);
        if (id !== undefined) {
          return `__object__:${id}`;
        }
        seen.set(value, nextId);
        nextId += 1;
      }
      return value;
    });
    return result ?? `__top__:${typeof input}`;
  } catch {
    return '__unserializable__';
  }
}

/***/ },

/***/ "./node_modules/@base-ui/utils/useId.mjs"
/*!***********************************************!*\
  !*** ./node_modules/@base-ui/utils/useId.mjs ***!
  \***********************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useId: () => (/* binding */ useId)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _safeReact_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./safeReact.mjs */ "./node_modules/@base-ui/utils/safeReact.mjs");
'use client';



let globalId = 0;

// TODO React 17: Remove `useGlobalId` once React 17 support is removed
function useGlobalId(idOverride, prefix = 'mui') {
  const [defaultId, setDefaultId] = react__WEBPACK_IMPORTED_MODULE_0__.useState(idOverride);
  const id = idOverride || defaultId;
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    if (defaultId == null) {
      // Fallback to this default id when possible.
      // Use the incrementing value for client-side rendering only.
      // We can't use it server-side.
      // If you want to use random values please consider the Birthday Problem: https://en.wikipedia.org/wiki/Birthday_problem
      globalId += 1;
      setDefaultId(`${prefix}-${globalId}`);
    }
  }, [defaultId, prefix]);
  return id;
}
const maybeReactUseId = _safeReact_mjs__WEBPACK_IMPORTED_MODULE_1__.SafeReact.useId;

/**
 *
 * @example <div id={useId()} />
 * @param idOverride
 * @returns {string}
 */
function useId(idOverride, prefix) {
  // React.useId() is only available from React 17.0.0.
  if (maybeReactUseId !== undefined) {
    const reactId = maybeReactUseId();
    return idOverride ?? (prefix ? `${prefix}-${reactId}` : reactId);
  }

  // TODO: uncomment once we enable eslint-plugin-react-compiler // eslint-disable-next-line react-compiler/react-compiler
  // eslint-disable-next-line react-hooks/rules-of-hooks -- `React.useId` is invariant at runtime.
  return useGlobalId(idOverride, prefix);
}

/***/ },

/***/ "./node_modules/@base-ui/utils/useIsoLayoutEffect.mjs"
/*!************************************************************!*\
  !*** ./node_modules/@base-ui/utils/useIsoLayoutEffect.mjs ***!
  \************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useIsoLayoutEffect: () => (/* binding */ useIsoLayoutEffect)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
'use client';


const noop = () => {};
const useIsoLayoutEffect = typeof document !== 'undefined' ? react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect : noop;

/***/ },

/***/ "./node_modules/@base-ui/utils/useMergedRefs.mjs"
/*!*******************************************************!*\
  !*** ./node_modules/@base-ui/utils/useMergedRefs.mjs ***!
  \*******************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useMergedRefs: () => (/* binding */ useMergedRefs),
/* harmony export */   useMergedRefsN: () => (/* binding */ useMergedRefsN)
/* harmony export */ });
/* harmony import */ var _useRefWithInit_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./useRefWithInit.mjs */ "./node_modules/@base-ui/utils/useRefWithInit.mjs");


/**
 * Merges refs into a single memoized callback ref or `null`.
 * This makes sure multiple refs are updated together and have the same value.
 *
 * This function accepts up to four refs. If you need to merge more, or have an unspecified number of refs to merge,
 * use `useMergedRefsN` instead.
 */

function useMergedRefs(a, b, c, d) {
  const forkRef = (0,_useRefWithInit_mjs__WEBPACK_IMPORTED_MODULE_0__.useRefWithInit)(createForkRef).current;
  if (didChange(forkRef, a, b, c, d)) {
    update(forkRef, [a, b, c, d]);
  }
  return forkRef.callback;
}

/**
 * Merges an array of refs into a single memoized callback ref or `null`.
 *
 * If you need to merge a fixed number (up to four) of refs, use `useMergedRefs` instead for better performance.
 */
function useMergedRefsN(refs) {
  const forkRef = (0,_useRefWithInit_mjs__WEBPACK_IMPORTED_MODULE_0__.useRefWithInit)(createForkRef).current;
  if (didChangeN(forkRef, refs)) {
    update(forkRef, refs);
  }
  return forkRef.callback;
}
function createForkRef() {
  return {
    callback: null,
    cleanup: null,
    refs: []
  };
}
function didChange(forkRef, a, b, c, d) {
  // prettier-ignore
  return forkRef.refs[0] !== a || forkRef.refs[1] !== b || forkRef.refs[2] !== c || forkRef.refs[3] !== d;
}
function didChangeN(forkRef, newRefs) {
  return forkRef.refs.length !== newRefs.length || forkRef.refs.some((ref, index) => ref !== newRefs[index]);
}
function update(forkRef, refs) {
  forkRef.refs = refs;
  if (refs.every(ref => ref == null)) {
    forkRef.callback = null;
    return;
  }
  forkRef.callback = instance => {
    if (forkRef.cleanup) {
      forkRef.cleanup();
      forkRef.cleanup = null;
    }
    if (instance != null) {
      const cleanupCallbacks = Array(refs.length).fill(null);
      for (let i = 0; i < refs.length; i += 1) {
        const ref = refs[i];
        if (ref == null) {
          continue;
        }
        switch (typeof ref) {
          case 'function':
            {
              const refCleanup = ref(instance);
              if (typeof refCleanup === 'function') {
                cleanupCallbacks[i] = refCleanup;
              }
              break;
            }
          case 'object':
            {
              ref.current = instance;
              break;
            }
          default:
        }
      }
      forkRef.cleanup = () => {
        for (let i = 0; i < refs.length; i += 1) {
          const ref = refs[i];
          if (ref == null) {
            continue;
          }
          switch (typeof ref) {
            case 'function':
              {
                const cleanupCallback = cleanupCallbacks[i];
                if (typeof cleanupCallback === 'function') {
                  cleanupCallback();
                } else {
                  ref(null);
                }
                break;
              }
            case 'object':
              {
                ref.current = null;
                break;
              }
            default:
          }
        }
      };
    }
  };
}

/***/ },

/***/ "./node_modules/@base-ui/utils/useOnMount.mjs"
/*!****************************************************!*\
  !*** ./node_modules/@base-ui/utils/useOnMount.mjs ***!
  \****************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useOnMount: () => (/* binding */ useOnMount)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
'use client';


const EMPTY = [];

/**
 * A React.useEffect equivalent that runs once, when the component is mounted.
 */
function useOnMount(fn) {
  // TODO: uncomment once we enable eslint-plugin-react-compiler // eslint-disable-next-line react-compiler/react-compiler -- no need to put `fn` in the dependency array
  /* eslint-disable react-hooks/exhaustive-deps */
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(fn, EMPTY);
  /* eslint-enable react-hooks/exhaustive-deps */
}

/***/ },

/***/ "./node_modules/@base-ui/utils/useRefWithInit.mjs"
/*!********************************************************!*\
  !*** ./node_modules/@base-ui/utils/useRefWithInit.mjs ***!
  \********************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useRefWithInit: () => (/* binding */ useRefWithInit)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
'use client';


const UNINITIALIZED = {};

/**
 * A React.useRef() that is initialized with a function. Note that it accepts an optional
 * initialization argument, so the initialization function doesn't need to be an inline closure.
 *
 * @usage
 *   const ref = useRefWithInit(sortColumns, columns)
 */

function useRefWithInit(init, initArg) {
  const ref = react__WEBPACK_IMPORTED_MODULE_0__.useRef(UNINITIALIZED);
  if (ref.current === UNINITIALIZED) {
    ref.current = init(initArg);
  }
  return ref;
}

/***/ },

/***/ "./node_modules/@base-ui/utils/useStableCallback.mjs"
/*!***********************************************************!*\
  !*** ./node_modules/@base-ui/utils/useStableCallback.mjs ***!
  \***********************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useStableCallback: () => (/* binding */ useStableCallback)
/* harmony export */ });
/* harmony import */ var _safeReact_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./safeReact.mjs */ "./node_modules/@base-ui/utils/safeReact.mjs");
/* harmony import */ var _useRefWithInit_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./useRefWithInit.mjs */ "./node_modules/@base-ui/utils/useRefWithInit.mjs");
'use client';



const useInsertionEffect = _safeReact_mjs__WEBPACK_IMPORTED_MODULE_0__.SafeReact.useInsertionEffect;
const useSafeInsertionEffect =
// React 17 doesn't have useInsertionEffect.
useInsertionEffect &&
// Preact replaces useInsertionEffect with useLayoutEffect and fires too late.
useInsertionEffect !== _safeReact_mjs__WEBPACK_IMPORTED_MODULE_0__.SafeReact.useLayoutEffect ? useInsertionEffect : fn => fn();
/**
 * Stabilizes the function passed so it's always the same between renders.
 *
 * The function becomes non-reactive to any values it captures.
 * It can safely be passed as a dependency of `React.useMemo` and `React.useEffect` without re-triggering them if its captured values change.
 *
 * The function must only be called inside effects and event handlers, never during render (which throws an error).
 *
 * This hook is a more permissive version of React 19.2's `React.useEffectEvent` in that it can be passed through contexts and called in event handler props, not just effects.
 */
function useStableCallback(callback) {
  const stable = (0,_useRefWithInit_mjs__WEBPACK_IMPORTED_MODULE_1__.useRefWithInit)(createStableCallback).current;
  stable.next = callback;
  useSafeInsertionEffect(stable.effect);
  return stable.trampoline;
}
function createStableCallback() {
  const stable = {
    next: undefined,
    callback: assertNotCalled,
    trampoline: (...args) => stable.callback?.(...args),
    effect: () => {
      stable.callback = stable.next;
    }
  };
  return stable;
}
function assertNotCalled() {
  if (true) {
    // TODO: fix mui/no-guarded-throw
    // eslint-disable-next-line mui/no-guarded-throw
    throw /* minify-error-disabled */new Error('Base UI: Cannot call an event handler while rendering.');
  }
}

/***/ },

/***/ "./node_modules/@base-ui/utils/useValueAsRef.mjs"
/*!*******************************************************!*\
  !*** ./node_modules/@base-ui/utils/useValueAsRef.mjs ***!
  \*******************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useValueAsRef: () => (/* binding */ useValueAsRef)
/* harmony export */ });
/* harmony import */ var _useIsoLayoutEffect_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./useIsoLayoutEffect.mjs */ "./node_modules/@base-ui/utils/useIsoLayoutEffect.mjs");
/* harmony import */ var _useRefWithInit_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./useRefWithInit.mjs */ "./node_modules/@base-ui/utils/useRefWithInit.mjs");
'use client';




/**
 * Untracks the provided value by turning it into a ref to remove its reactivity.
 *
 * Used to access the passed value inside `React.useEffect` without causing the effect to re-run when the value changes.
 */
function useValueAsRef(value) {
  const latest = (0,_useRefWithInit_mjs__WEBPACK_IMPORTED_MODULE_1__.useRefWithInit)(createLatestRef, value).current;
  latest.next = value;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  (0,_useIsoLayoutEffect_mjs__WEBPACK_IMPORTED_MODULE_0__.useIsoLayoutEffect)(latest.effect);
  return latest;
}
function createLatestRef(value) {
  const latest = {
    current: value,
    next: value,
    effect: () => {
      latest.current = latest.next;
    }
  };
  return latest;
}

/***/ },

/***/ "./node_modules/@base-ui/utils/warn.mjs"
/*!**********************************************!*\
  !*** ./node_modules/@base-ui/utils/warn.mjs ***!
  \**********************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   warn: () => (/* binding */ warn)
/* harmony export */ });
let set;
if (true) {
  set = new Set();
}
function warn(...messages) {
  if (true) {
    const messageKey = messages.join(' ');
    if (!set.has(messageKey)) {
      set.add(messageKey);
      console.warn(`Base UI: ${messageKey}`);
    }
  }
}

/***/ },

/***/ "./node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs"
/*!************************************************************************!*\
  !*** ./node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs ***!
  \************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getComputedStyle: () => (/* binding */ getComputedStyle),
/* harmony export */   getContainingBlock: () => (/* binding */ getContainingBlock),
/* harmony export */   getDocumentElement: () => (/* binding */ getDocumentElement),
/* harmony export */   getFrameElement: () => (/* binding */ getFrameElement),
/* harmony export */   getNearestOverflowAncestor: () => (/* binding */ getNearestOverflowAncestor),
/* harmony export */   getNodeName: () => (/* binding */ getNodeName),
/* harmony export */   getNodeScroll: () => (/* binding */ getNodeScroll),
/* harmony export */   getOverflowAncestors: () => (/* binding */ getOverflowAncestors),
/* harmony export */   getParentNode: () => (/* binding */ getParentNode),
/* harmony export */   getWindow: () => (/* binding */ getWindow),
/* harmony export */   isContainingBlock: () => (/* binding */ isContainingBlock),
/* harmony export */   isElement: () => (/* binding */ isElement),
/* harmony export */   isHTMLElement: () => (/* binding */ isHTMLElement),
/* harmony export */   isLastTraversableNode: () => (/* binding */ isLastTraversableNode),
/* harmony export */   isNode: () => (/* binding */ isNode),
/* harmony export */   isOverflowElement: () => (/* binding */ isOverflowElement),
/* harmony export */   isShadowRoot: () => (/* binding */ isShadowRoot),
/* harmony export */   isTableElement: () => (/* binding */ isTableElement),
/* harmony export */   isTopLayer: () => (/* binding */ isTopLayer),
/* harmony export */   isWebKit: () => (/* binding */ isWebKit)
/* harmony export */ });
function hasWindow() {
  return typeof window !== 'undefined';
}
function getNodeName(node) {
  if (isNode(node)) {
    return (node.nodeName || '').toLowerCase();
  }
  // Mocked nodes in testing environments may not be instances of Node. By
  // returning `#document` an infinite loop won't occur.
  // https://github.com/floating-ui/floating-ui/issues/2317
  return '#document';
}
function getWindow(node) {
  var _node$ownerDocument;
  return (node == null || (_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) || window;
}
function getDocumentElement(node) {
  var _ref;
  return (_ref = (isNode(node) ? node.ownerDocument : node.document) || window.document) == null ? void 0 : _ref.documentElement;
}
function isNode(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof Node || value instanceof getWindow(value).Node;
}
function isElement(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof Element || value instanceof getWindow(value).Element;
}
function isHTMLElement(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof HTMLElement || value instanceof getWindow(value).HTMLElement;
}
function isShadowRoot(value) {
  if (!hasWindow() || typeof ShadowRoot === 'undefined') {
    return false;
  }
  return value instanceof ShadowRoot || value instanceof getWindow(value).ShadowRoot;
}
function isOverflowElement(element) {
  const {
    overflow,
    overflowX,
    overflowY,
    display
  } = getComputedStyle(element);
  return /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) && display !== 'inline' && display !== 'contents';
}
function isTableElement(element) {
  return /^(table|td|th)$/.test(getNodeName(element));
}
function isTopLayer(element) {
  try {
    if (element.matches(':popover-open')) {
      return true;
    }
  } catch (_e) {
    // no-op
  }
  try {
    return element.matches(':modal');
  } catch (_e) {
    return false;
  }
}
const willChangeRe = /transform|translate|scale|rotate|perspective|filter/;
const containRe = /paint|layout|strict|content/;
const isNotNone = value => !!value && value !== 'none';
let isWebKitValue;
function isContainingBlock(elementOrCss) {
  const css = isElement(elementOrCss) ? getComputedStyle(elementOrCss) : elementOrCss;

  // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block
  // https://drafts.csswg.org/css-transforms-2/#individual-transforms
  return isNotNone(css.transform) || isNotNone(css.translate) || isNotNone(css.scale) || isNotNone(css.rotate) || isNotNone(css.perspective) || !isWebKit() && (isNotNone(css.backdropFilter) || isNotNone(css.filter)) || willChangeRe.test(css.willChange || '') || containRe.test(css.contain || '');
}
function getContainingBlock(element) {
  let currentNode = getParentNode(element);
  while (isHTMLElement(currentNode) && !isLastTraversableNode(currentNode)) {
    if (isContainingBlock(currentNode)) {
      return currentNode;
    } else if (isTopLayer(currentNode)) {
      return null;
    }
    currentNode = getParentNode(currentNode);
  }
  return null;
}
function isWebKit() {
  if (isWebKitValue == null) {
    isWebKitValue = typeof CSS !== 'undefined' && CSS.supports && CSS.supports('-webkit-backdrop-filter', 'none');
  }
  return isWebKitValue;
}
function isLastTraversableNode(node) {
  return /^(html|body|#document)$/.test(getNodeName(node));
}
function getComputedStyle(element) {
  return getWindow(element).getComputedStyle(element);
}
function getNodeScroll(element) {
  if (isElement(element)) {
    return {
      scrollLeft: element.scrollLeft,
      scrollTop: element.scrollTop
    };
  }
  return {
    scrollLeft: element.scrollX,
    scrollTop: element.scrollY
  };
}
function getParentNode(node) {
  if (getNodeName(node) === 'html') {
    return node;
  }
  const result =
  // Step into the shadow DOM of the parent of a slotted node.
  node.assignedSlot ||
  // DOM Element detected.
  node.parentNode ||
  // ShadowRoot detected.
  isShadowRoot(node) && node.host ||
  // Fallback.
  getDocumentElement(node);
  return isShadowRoot(result) ? result.host : result;
}
function getNearestOverflowAncestor(node) {
  const parentNode = getParentNode(node);
  if (isLastTraversableNode(parentNode)) {
    return (node.ownerDocument || node).body;
  }
  if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) {
    return parentNode;
  }
  return getNearestOverflowAncestor(parentNode);
}
function getOverflowAncestors(node, list, traverseIframes) {
  var _node$ownerDocument2;
  if (list === void 0) {
    list = [];
  }
  if (traverseIframes === void 0) {
    traverseIframes = true;
  }
  const scrollableAncestor = getNearestOverflowAncestor(node);
  const isBody = scrollableAncestor === ((_node$ownerDocument2 = node.ownerDocument) == null ? void 0 : _node$ownerDocument2.body);
  const win = getWindow(scrollableAncestor);
  if (isBody) {
    const frameElement = getFrameElement(win);
    return list.concat(win, win.visualViewport || [], isOverflowElement(scrollableAncestor) ? scrollableAncestor : [], frameElement && traverseIframes ? getOverflowAncestors(frameElement) : []);
  } else {
    return list.concat(scrollableAncestor, getOverflowAncestors(scrollableAncestor, [], traverseIframes));
  }
}
function getFrameElement(win) {
  return win.parent && Object.getPrototypeOf(win.parent) ? win.frameElement : null;
}




/***/ },

/***/ "./node_modules/@wordpress/icons/build-module/library/arrow-left.mjs"
/*!***************************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/arrow-left.mjs ***!
  \***************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ arrow_left_default)
/* harmony export */ });
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
// packages/icons/src/library/arrow-left.tsx


var arrow_left_default = /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.SVG, { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.Path, { d: "M20 11.2H6.8l3.7-3.7-1-1L3.9 12l5.6 5.5 1-1-3.7-3.7H20z" }) });

//# sourceMappingURL=arrow-left.mjs.map


/***/ },

/***/ "./node_modules/@wordpress/icons/build-module/library/chevron-down.mjs"
/*!*****************************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/chevron-down.mjs ***!
  \*****************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ chevron_down_default)
/* harmony export */ });
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
// packages/icons/src/library/chevron-down.tsx


var chevron_down_default = /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.SVG, { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.Path, { d: "M17.5 11.6L12 16l-5.5-4.4.9-1.2L12 14l4.5-3.6 1 1.2z" }) });

//# sourceMappingURL=chevron-down.mjs.map


/***/ },

/***/ "./node_modules/@wordpress/icons/build-module/library/trash.mjs"
/*!**********************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/trash.mjs ***!
  \**********************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ trash_default)
/* harmony export */ });
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
// packages/icons/src/library/trash.tsx


var trash_default = /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.SVG, { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.Path, { fillRule: "evenodd", clipRule: "evenodd", d: "M12 5.5A2.25 2.25 0 0 0 9.878 7h4.244A2.251 2.251 0 0 0 12 5.5ZM12 4a3.751 3.751 0 0 0-3.675 3H5v1.5h1.27l.818 8.997a2.75 2.75 0 0 0 2.739 2.501h4.347a2.75 2.75 0 0 0 2.738-2.5L17.73 8.5H19V7h-3.325A3.751 3.751 0 0 0 12 4Zm4.224 4.5H7.776l.806 8.861a1.25 1.25 0 0 0 1.245 1.137h4.347a1.25 1.25 0 0 0 1.245-1.137l.805-8.861Z" }) });

//# sourceMappingURL=trash.mjs.map


/***/ },

/***/ "./node_modules/@wordpress/ui/build-module/badge/badge.mjs"
/*!*****************************************************************!*\
  !*** ./node_modules/@wordpress/ui/build-module/badge/badge.mjs ***!
  \*****************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Badge: () => (/* binding */ Badge)
/* harmony export */ });
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.mjs");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _text_index_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../text/index.mjs */ "./node_modules/@wordpress/ui/build-module/text/text.mjs");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
// packages/ui/src/badge/badge.tsx



// packages/style-runtime/src/index.ts
var STYLE_HASH_ATTRIBUTE = "data-wp-hash";
function getRuntime() {
  const globalScope = globalThis;
  if (globalScope.__wpStyleRuntime) {
    return globalScope.__wpStyleRuntime;
  }
  globalScope.__wpStyleRuntime = {
    documents: /* @__PURE__ */ new Map(),
    styles: /* @__PURE__ */ new Map(),
    injectedStyles: /* @__PURE__ */ new WeakMap()
  };
  if (typeof document !== "undefined") {
    registerDocument(document);
  }
  return globalScope.__wpStyleRuntime;
}
function documentContainsStyleHash(targetDocument, hash) {
  if (!targetDocument.head) {
    return false;
  }
  for (const style of targetDocument.head.querySelectorAll(
    `style[${STYLE_HASH_ATTRIBUTE}]`
  )) {
    if (style.getAttribute(STYLE_HASH_ATTRIBUTE) === hash) {
      return true;
    }
  }
  return false;
}
function injectStyle(targetDocument, hash, css) {
  if (!targetDocument.head) {
    return;
  }
  const runtime = getRuntime();
  let injectedStyles = runtime.injectedStyles.get(targetDocument);
  if (!injectedStyles) {
    injectedStyles = /* @__PURE__ */ new Set();
    runtime.injectedStyles.set(targetDocument, injectedStyles);
  }
  if (injectedStyles.has(hash)) {
    return;
  }
  if (documentContainsStyleHash(targetDocument, hash)) {
    injectedStyles.add(hash);
    return;
  }
  const style = targetDocument.createElement("style");
  style.setAttribute(STYLE_HASH_ATTRIBUTE, hash);
  style.appendChild(targetDocument.createTextNode(css));
  targetDocument.head.appendChild(style);
  injectedStyles.add(hash);
}
function registerDocument(targetDocument) {
  const runtime = getRuntime();
  runtime.documents.set(
    targetDocument,
    (runtime.documents.get(targetDocument) ?? 0) + 1
  );
  for (const [hash, css] of runtime.styles) {
    injectStyle(targetDocument, hash, css);
  }
  return () => {
    const count = runtime.documents.get(targetDocument);
    if (count === void 0) {
      return;
    }
    if (count <= 1) {
      runtime.documents.delete(targetDocument);
      return;
    }
    runtime.documents.set(targetDocument, count - 1);
  };
}
function registerStyle(hash, css) {
  const runtime = getRuntime();
  runtime.styles.set(hash, css);
  for (const targetDocument of runtime.documents.keys()) {
    injectStyle(targetDocument, hash, css);
  }
}

// packages/ui/src/badge/style.module.css
if (typeof process === "undefined" || "development" !== "test") {
  registerStyle("9db2873e7f", "@layer wp-ui{@layer utilities, components, compositions, overrides;@layer components{._96e6251aad1a6136__badge{border-radius:var(--wpds-border-radius-lg,8px);padding-block:var(--wpds-dimension-padding-xs,4px);padding-inline:var(--wpds-dimension-padding-sm,8px)}._99f7158cb520f750__is-high-intent{background-color:var(--wpds-color-background-surface-error,#f6e6e3);color:var(--wpds-color-foreground-content-error,#470000)}.c20ebef2365bc8b7__is-medium-intent{background-color:var(--wpds-color-background-surface-warning,#fde6be);color:var(--wpds-color-foreground-content-warning,#2e1900)}._365e1626c6202e52__is-low-intent{background-color:var(--wpds-color-background-surface-caution,#fee995);color:var(--wpds-color-foreground-content-caution,#281d00)}._33f8198127ddf4ef__is-stable-intent{background-color:var(--wpds-color-background-surface-success,#c6f7cd);color:var(--wpds-color-foreground-content-success,#002900)}._04c1aca8fc449412__is-informational-intent{background-color:var(--wpds-color-background-surface-info,#deebfa);color:var(--wpds-color-foreground-content-info,#001b4f)}._90726e69d495ec19__is-draft-intent{background-color:var(--wpds-color-background-surface-neutral-weak,#f4f4f4);color:var(--wpds-color-foreground-content-neutral,#1e1e1e)}._898f4a544993bd39__is-none-intent{background-color:var(--wpds-color-background-surface-neutral-strong,#fff);border:var(--wpds-border-width-xs,1px) solid var(--wpds-color-stroke-surface-neutral,#dbdbdb);color:var(--wpds-color-foreground-content-neutral,#1e1e1e);padding-block:calc(var(--wpds-dimension-padding-xs, 4px) - var(--wpds-border-width-xs, 1px));padding-inline:calc(var(--wpds-dimension-padding-sm, 8px) - var(--wpds-border-width-xs, 1px))}}}");
}
var style_default = { "badge": "_96e6251aad1a6136__badge", "is-high-intent": "_99f7158cb520f750__is-high-intent", "is-medium-intent": "c20ebef2365bc8b7__is-medium-intent", "is-low-intent": "_365e1626c6202e52__is-low-intent", "is-stable-intent": "_33f8198127ddf4ef__is-stable-intent", "is-informational-intent": "_04c1aca8fc449412__is-informational-intent", "is-draft-intent": "_90726e69d495ec19__is-draft-intent", "is-none-intent": "_898f4a544993bd39__is-none-intent" };

// packages/ui/src/badge/badge.tsx


var Badge = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.forwardRef)(function Badge2({ intent = "none", className, ...props }, ref) {
  return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(
    _text_index_mjs__WEBPACK_IMPORTED_MODULE_2__.Text,
    {
      ref,
      className: (0,clsx__WEBPACK_IMPORTED_MODULE_0__["default"])(
        style_default.badge,
        style_default[`is-${intent}-intent`],
        className
      ),
      ...props,
      variant: "body-sm"
    }
  );
});

//# sourceMappingURL=badge.mjs.map


/***/ },

/***/ "./node_modules/@wordpress/ui/build-module/card/content.mjs"
/*!******************************************************************!*\
  !*** ./node_modules/@wordpress/ui/build-module/card/content.mjs ***!
  \******************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Content: () => (/* binding */ Content)
/* harmony export */ });
/* harmony import */ var _base_ui_react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @base-ui/react */ "./node_modules/@base-ui/react/use-render/useRender.mjs");
/* harmony import */ var _base_ui_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @base-ui/react */ "./node_modules/@base-ui/react/merge-props/mergeProps.mjs");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
// packages/ui/src/card/content.tsx



// packages/style-runtime/src/index.ts
var STYLE_HASH_ATTRIBUTE = "data-wp-hash";
function getRuntime() {
  const globalScope = globalThis;
  if (globalScope.__wpStyleRuntime) {
    return globalScope.__wpStyleRuntime;
  }
  globalScope.__wpStyleRuntime = {
    documents: /* @__PURE__ */ new Map(),
    styles: /* @__PURE__ */ new Map(),
    injectedStyles: /* @__PURE__ */ new WeakMap()
  };
  if (typeof document !== "undefined") {
    registerDocument(document);
  }
  return globalScope.__wpStyleRuntime;
}
function documentContainsStyleHash(targetDocument, hash) {
  if (!targetDocument.head) {
    return false;
  }
  for (const style of targetDocument.head.querySelectorAll(
    `style[${STYLE_HASH_ATTRIBUTE}]`
  )) {
    if (style.getAttribute(STYLE_HASH_ATTRIBUTE) === hash) {
      return true;
    }
  }
  return false;
}
function injectStyle(targetDocument, hash, css) {
  if (!targetDocument.head) {
    return;
  }
  const runtime = getRuntime();
  let injectedStyles = runtime.injectedStyles.get(targetDocument);
  if (!injectedStyles) {
    injectedStyles = /* @__PURE__ */ new Set();
    runtime.injectedStyles.set(targetDocument, injectedStyles);
  }
  if (injectedStyles.has(hash)) {
    return;
  }
  if (documentContainsStyleHash(targetDocument, hash)) {
    injectedStyles.add(hash);
    return;
  }
  const style = targetDocument.createElement("style");
  style.setAttribute(STYLE_HASH_ATTRIBUTE, hash);
  style.appendChild(targetDocument.createTextNode(css));
  targetDocument.head.appendChild(style);
  injectedStyles.add(hash);
}
function registerDocument(targetDocument) {
  const runtime = getRuntime();
  runtime.documents.set(
    targetDocument,
    (runtime.documents.get(targetDocument) ?? 0) + 1
  );
  for (const [hash, css] of runtime.styles) {
    injectStyle(targetDocument, hash, css);
  }
  return () => {
    const count = runtime.documents.get(targetDocument);
    if (count === void 0) {
      return;
    }
    if (count <= 1) {
      runtime.documents.delete(targetDocument);
      return;
    }
    runtime.documents.set(targetDocument, count - 1);
  };
}
function registerStyle(hash, css) {
  const runtime = getRuntime();
  runtime.styles.set(hash, css);
  for (const targetDocument of runtime.documents.keys()) {
    injectStyle(targetDocument, hash, css);
  }
}

// packages/ui/src/card/style.module.css
if (typeof process === "undefined" || "development" !== "test") {
  registerStyle("5d38cbdd27", "@layer wp-ui{@layer utilities, components, compositions, overrides;@layer components{._02872bf298eadc43__root{--wp-ui-card-padding:var(--wpds-dimension-padding-2xl,24px);--wp-ui-card-header-content-gap:var(--wpds-dimension-gap-xl,24px);--wp-ui-card-header-content-margin:calc(var(--wp-ui-card-header-content-gap) - var(--wp-ui-card-padding));background-color:var(--wpds-color-background-surface-neutral-strong,#fff);border:1px solid var(--wpds-color-stroke-surface-neutral-weak,#f0f0f0);border-radius:var(--wpds-border-radius-lg,8px);color:var(--wpds-color-foreground-content-neutral,#1e1e1e);display:flex;flex-direction:column;overflow:clip}._5dffdaf2a6e669ac__content,.bbccc92e6ba5662d__header{padding:var(--wp-ui-card-padding);&:not(:first-child):not(:last-child){padding-block-end:0}}.bbccc92e6ba5662d__header+._5dffdaf2a6e669ac__content{margin-block-start:var(--wp-ui-card-header-content-margin);padding-block-start:0}.c1fa192587e1b4a6__fullbleed{margin-inline:calc(var(--wp-ui-card-padding)*-1);width:calc(100% + var(--wp-ui-card-padding)*2)}._02872bf298eadc43__root>:is(.bbccc92e6ba5662d__header,._5dffdaf2a6e669ac__content):first-child>.c1fa192587e1b4a6__fullbleed:first-child{margin-block-start:calc(var(--wp-ui-card-padding)*-1)}:is(.bbccc92e6ba5662d__header,._5dffdaf2a6e669ac__content):last-child>.c1fa192587e1b4a6__fullbleed:last-child{margin-block-end:calc(var(--wp-ui-card-padding)*-1)}}}");
}
var style_default = { "root": "_02872bf298eadc43__root", "header": "bbccc92e6ba5662d__header", "content": "_5dffdaf2a6e669ac__content", "fullbleed": "c1fa192587e1b4a6__fullbleed" };

// packages/ui/src/card/content.tsx
var Content = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.forwardRef)(
  function CardContent({ render, ...props }, ref) {
    const element = (0,_base_ui_react__WEBPACK_IMPORTED_MODULE_0__.useRender)({
      defaultTagName: "div",
      render,
      ref,
      props: (0,_base_ui_react__WEBPACK_IMPORTED_MODULE_1__.mergeProps)({ className: style_default.content }, props)
    });
    return element;
  }
);

//# sourceMappingURL=content.mjs.map


/***/ },

/***/ "./node_modules/@wordpress/ui/build-module/card/header.mjs"
/*!*****************************************************************!*\
  !*** ./node_modules/@wordpress/ui/build-module/card/header.mjs ***!
  \*****************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Header: () => (/* binding */ Header)
/* harmony export */ });
/* harmony import */ var _base_ui_react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @base-ui/react */ "./node_modules/@base-ui/react/use-render/useRender.mjs");
/* harmony import */ var _base_ui_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @base-ui/react */ "./node_modules/@base-ui/react/merge-props/mergeProps.mjs");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
// packages/ui/src/card/header.tsx



// packages/style-runtime/src/index.ts
var STYLE_HASH_ATTRIBUTE = "data-wp-hash";
function getRuntime() {
  const globalScope = globalThis;
  if (globalScope.__wpStyleRuntime) {
    return globalScope.__wpStyleRuntime;
  }
  globalScope.__wpStyleRuntime = {
    documents: /* @__PURE__ */ new Map(),
    styles: /* @__PURE__ */ new Map(),
    injectedStyles: /* @__PURE__ */ new WeakMap()
  };
  if (typeof document !== "undefined") {
    registerDocument(document);
  }
  return globalScope.__wpStyleRuntime;
}
function documentContainsStyleHash(targetDocument, hash) {
  if (!targetDocument.head) {
    return false;
  }
  for (const style of targetDocument.head.querySelectorAll(
    `style[${STYLE_HASH_ATTRIBUTE}]`
  )) {
    if (style.getAttribute(STYLE_HASH_ATTRIBUTE) === hash) {
      return true;
    }
  }
  return false;
}
function injectStyle(targetDocument, hash, css) {
  if (!targetDocument.head) {
    return;
  }
  const runtime = getRuntime();
  let injectedStyles = runtime.injectedStyles.get(targetDocument);
  if (!injectedStyles) {
    injectedStyles = /* @__PURE__ */ new Set();
    runtime.injectedStyles.set(targetDocument, injectedStyles);
  }
  if (injectedStyles.has(hash)) {
    return;
  }
  if (documentContainsStyleHash(targetDocument, hash)) {
    injectedStyles.add(hash);
    return;
  }
  const style = targetDocument.createElement("style");
  style.setAttribute(STYLE_HASH_ATTRIBUTE, hash);
  style.appendChild(targetDocument.createTextNode(css));
  targetDocument.head.appendChild(style);
  injectedStyles.add(hash);
}
function registerDocument(targetDocument) {
  const runtime = getRuntime();
  runtime.documents.set(
    targetDocument,
    (runtime.documents.get(targetDocument) ?? 0) + 1
  );
  for (const [hash, css] of runtime.styles) {
    injectStyle(targetDocument, hash, css);
  }
  return () => {
    const count = runtime.documents.get(targetDocument);
    if (count === void 0) {
      return;
    }
    if (count <= 1) {
      runtime.documents.delete(targetDocument);
      return;
    }
    runtime.documents.set(targetDocument, count - 1);
  };
}
function registerStyle(hash, css) {
  const runtime = getRuntime();
  runtime.styles.set(hash, css);
  for (const targetDocument of runtime.documents.keys()) {
    injectStyle(targetDocument, hash, css);
  }
}

// packages/ui/src/card/style.module.css
if (typeof process === "undefined" || "development" !== "test") {
  registerStyle("5d38cbdd27", "@layer wp-ui{@layer utilities, components, compositions, overrides;@layer components{._02872bf298eadc43__root{--wp-ui-card-padding:var(--wpds-dimension-padding-2xl,24px);--wp-ui-card-header-content-gap:var(--wpds-dimension-gap-xl,24px);--wp-ui-card-header-content-margin:calc(var(--wp-ui-card-header-content-gap) - var(--wp-ui-card-padding));background-color:var(--wpds-color-background-surface-neutral-strong,#fff);border:1px solid var(--wpds-color-stroke-surface-neutral-weak,#f0f0f0);border-radius:var(--wpds-border-radius-lg,8px);color:var(--wpds-color-foreground-content-neutral,#1e1e1e);display:flex;flex-direction:column;overflow:clip}._5dffdaf2a6e669ac__content,.bbccc92e6ba5662d__header{padding:var(--wp-ui-card-padding);&:not(:first-child):not(:last-child){padding-block-end:0}}.bbccc92e6ba5662d__header+._5dffdaf2a6e669ac__content{margin-block-start:var(--wp-ui-card-header-content-margin);padding-block-start:0}.c1fa192587e1b4a6__fullbleed{margin-inline:calc(var(--wp-ui-card-padding)*-1);width:calc(100% + var(--wp-ui-card-padding)*2)}._02872bf298eadc43__root>:is(.bbccc92e6ba5662d__header,._5dffdaf2a6e669ac__content):first-child>.c1fa192587e1b4a6__fullbleed:first-child{margin-block-start:calc(var(--wp-ui-card-padding)*-1)}:is(.bbccc92e6ba5662d__header,._5dffdaf2a6e669ac__content):last-child>.c1fa192587e1b4a6__fullbleed:last-child{margin-block-end:calc(var(--wp-ui-card-padding)*-1)}}}");
}
var style_default = { "root": "_02872bf298eadc43__root", "header": "bbccc92e6ba5662d__header", "content": "_5dffdaf2a6e669ac__content", "fullbleed": "c1fa192587e1b4a6__fullbleed" };

// packages/ui/src/card/header.tsx
var Header = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.forwardRef)(
  function CardHeader({ render, ...props }, ref) {
    const element = (0,_base_ui_react__WEBPACK_IMPORTED_MODULE_0__.useRender)({
      defaultTagName: "div",
      render,
      ref,
      props: (0,_base_ui_react__WEBPACK_IMPORTED_MODULE_1__.mergeProps)({ className: style_default.header }, props)
    });
    return element;
  }
);

//# sourceMappingURL=header.mjs.map


/***/ },

/***/ "./node_modules/@wordpress/ui/build-module/card/root.mjs"
/*!***************************************************************!*\
  !*** ./node_modules/@wordpress/ui/build-module/card/root.mjs ***!
  \***************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Root: () => (/* binding */ Root)
/* harmony export */ });
/* harmony import */ var _base_ui_react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @base-ui/react */ "./node_modules/@base-ui/react/use-render/useRender.mjs");
/* harmony import */ var _base_ui_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @base-ui/react */ "./node_modules/@base-ui/react/merge-props/mergeProps.mjs");
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.mjs");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
// packages/ui/src/card/root.tsx




// packages/style-runtime/src/index.ts
var STYLE_HASH_ATTRIBUTE = "data-wp-hash";
function getRuntime() {
  const globalScope = globalThis;
  if (globalScope.__wpStyleRuntime) {
    return globalScope.__wpStyleRuntime;
  }
  globalScope.__wpStyleRuntime = {
    documents: /* @__PURE__ */ new Map(),
    styles: /* @__PURE__ */ new Map(),
    injectedStyles: /* @__PURE__ */ new WeakMap()
  };
  if (typeof document !== "undefined") {
    registerDocument(document);
  }
  return globalScope.__wpStyleRuntime;
}
function documentContainsStyleHash(targetDocument, hash) {
  if (!targetDocument.head) {
    return false;
  }
  for (const style of targetDocument.head.querySelectorAll(
    `style[${STYLE_HASH_ATTRIBUTE}]`
  )) {
    if (style.getAttribute(STYLE_HASH_ATTRIBUTE) === hash) {
      return true;
    }
  }
  return false;
}
function injectStyle(targetDocument, hash, css) {
  if (!targetDocument.head) {
    return;
  }
  const runtime = getRuntime();
  let injectedStyles = runtime.injectedStyles.get(targetDocument);
  if (!injectedStyles) {
    injectedStyles = /* @__PURE__ */ new Set();
    runtime.injectedStyles.set(targetDocument, injectedStyles);
  }
  if (injectedStyles.has(hash)) {
    return;
  }
  if (documentContainsStyleHash(targetDocument, hash)) {
    injectedStyles.add(hash);
    return;
  }
  const style = targetDocument.createElement("style");
  style.setAttribute(STYLE_HASH_ATTRIBUTE, hash);
  style.appendChild(targetDocument.createTextNode(css));
  targetDocument.head.appendChild(style);
  injectedStyles.add(hash);
}
function registerDocument(targetDocument) {
  const runtime = getRuntime();
  runtime.documents.set(
    targetDocument,
    (runtime.documents.get(targetDocument) ?? 0) + 1
  );
  for (const [hash, css] of runtime.styles) {
    injectStyle(targetDocument, hash, css);
  }
  return () => {
    const count = runtime.documents.get(targetDocument);
    if (count === void 0) {
      return;
    }
    if (count <= 1) {
      runtime.documents.delete(targetDocument);
      return;
    }
    runtime.documents.set(targetDocument, count - 1);
  };
}
function registerStyle(hash, css) {
  const runtime = getRuntime();
  runtime.styles.set(hash, css);
  for (const targetDocument of runtime.documents.keys()) {
    injectStyle(targetDocument, hash, css);
  }
}

// packages/ui/src/utils/css/resets.module.css
if (typeof process === "undefined" || "development" !== "test") {
  registerStyle("10f3806643", "@layer wp-ui{@layer utilities, components, compositions, overrides;@layer utilities{._336cd3e4e743482f__box-sizing{box-sizing:border-box;*,:after,:before{box-sizing:inherit}}}}");
}
var resets_default = { "box-sizing": "_336cd3e4e743482f__box-sizing" };

// packages/ui/src/card/style.module.css
if (typeof process === "undefined" || "development" !== "test") {
  registerStyle("5d38cbdd27", "@layer wp-ui{@layer utilities, components, compositions, overrides;@layer components{._02872bf298eadc43__root{--wp-ui-card-padding:var(--wpds-dimension-padding-2xl,24px);--wp-ui-card-header-content-gap:var(--wpds-dimension-gap-xl,24px);--wp-ui-card-header-content-margin:calc(var(--wp-ui-card-header-content-gap) - var(--wp-ui-card-padding));background-color:var(--wpds-color-background-surface-neutral-strong,#fff);border:1px solid var(--wpds-color-stroke-surface-neutral-weak,#f0f0f0);border-radius:var(--wpds-border-radius-lg,8px);color:var(--wpds-color-foreground-content-neutral,#1e1e1e);display:flex;flex-direction:column;overflow:clip}._5dffdaf2a6e669ac__content,.bbccc92e6ba5662d__header{padding:var(--wp-ui-card-padding);&:not(:first-child):not(:last-child){padding-block-end:0}}.bbccc92e6ba5662d__header+._5dffdaf2a6e669ac__content{margin-block-start:var(--wp-ui-card-header-content-margin);padding-block-start:0}.c1fa192587e1b4a6__fullbleed{margin-inline:calc(var(--wp-ui-card-padding)*-1);width:calc(100% + var(--wp-ui-card-padding)*2)}._02872bf298eadc43__root>:is(.bbccc92e6ba5662d__header,._5dffdaf2a6e669ac__content):first-child>.c1fa192587e1b4a6__fullbleed:first-child{margin-block-start:calc(var(--wp-ui-card-padding)*-1)}:is(.bbccc92e6ba5662d__header,._5dffdaf2a6e669ac__content):last-child>.c1fa192587e1b4a6__fullbleed:last-child{margin-block-end:calc(var(--wp-ui-card-padding)*-1)}}}");
}
var style_default = { "root": "_02872bf298eadc43__root", "header": "bbccc92e6ba5662d__header", "content": "_5dffdaf2a6e669ac__content", "fullbleed": "c1fa192587e1b4a6__fullbleed" };

// packages/ui/src/card/root.tsx
var Root = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.forwardRef)(function Card({ render, ...restProps }, ref) {
  const mergedClassName = (0,clsx__WEBPACK_IMPORTED_MODULE_2__["default"])(style_default.root, resets_default["box-sizing"]);
  const element = (0,_base_ui_react__WEBPACK_IMPORTED_MODULE_0__.useRender)({
    defaultTagName: "div",
    render,
    ref,
    props: (0,_base_ui_react__WEBPACK_IMPORTED_MODULE_1__.mergeProps)({ className: mergedClassName }, restProps)
  });
  return element;
});

//# sourceMappingURL=root.mjs.map


/***/ },

/***/ "./node_modules/@wordpress/ui/build-module/collapsible-card/content.mjs"
/*!******************************************************************************!*\
  !*** ./node_modules/@wordpress/ui/build-module/collapsible-card/content.mjs ***!
  \******************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Content: () => (/* binding */ Content2)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.mjs");
/* harmony import */ var _card_index_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../card/index.mjs */ "./node_modules/@wordpress/ui/build-module/card/content.mjs");
/* harmony import */ var _collapsible_index_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../collapsible/index.mjs */ "./node_modules/@wordpress/ui/build-module/collapsible/panel.mjs");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
// packages/ui/src/collapsible-card/content.tsx





// packages/style-runtime/src/index.ts
var STYLE_HASH_ATTRIBUTE = "data-wp-hash";
function getRuntime() {
  const globalScope = globalThis;
  if (globalScope.__wpStyleRuntime) {
    return globalScope.__wpStyleRuntime;
  }
  globalScope.__wpStyleRuntime = {
    documents: /* @__PURE__ */ new Map(),
    styles: /* @__PURE__ */ new Map(),
    injectedStyles: /* @__PURE__ */ new WeakMap()
  };
  if (typeof document !== "undefined") {
    registerDocument(document);
  }
  return globalScope.__wpStyleRuntime;
}
function documentContainsStyleHash(targetDocument, hash) {
  if (!targetDocument.head) {
    return false;
  }
  for (const style of targetDocument.head.querySelectorAll(
    `style[${STYLE_HASH_ATTRIBUTE}]`
  )) {
    if (style.getAttribute(STYLE_HASH_ATTRIBUTE) === hash) {
      return true;
    }
  }
  return false;
}
function injectStyle(targetDocument, hash, css) {
  if (!targetDocument.head) {
    return;
  }
  const runtime = getRuntime();
  let injectedStyles = runtime.injectedStyles.get(targetDocument);
  if (!injectedStyles) {
    injectedStyles = /* @__PURE__ */ new Set();
    runtime.injectedStyles.set(targetDocument, injectedStyles);
  }
  if (injectedStyles.has(hash)) {
    return;
  }
  if (documentContainsStyleHash(targetDocument, hash)) {
    injectedStyles.add(hash);
    return;
  }
  const style = targetDocument.createElement("style");
  style.setAttribute(STYLE_HASH_ATTRIBUTE, hash);
  style.appendChild(targetDocument.createTextNode(css));
  targetDocument.head.appendChild(style);
  injectedStyles.add(hash);
}
function registerDocument(targetDocument) {
  const runtime = getRuntime();
  runtime.documents.set(
    targetDocument,
    (runtime.documents.get(targetDocument) ?? 0) + 1
  );
  for (const [hash, css] of runtime.styles) {
    injectStyle(targetDocument, hash, css);
  }
  return () => {
    const count = runtime.documents.get(targetDocument);
    if (count === void 0) {
      return;
    }
    if (count <= 1) {
      runtime.documents.delete(targetDocument);
      return;
    }
    runtime.documents.set(targetDocument, count - 1);
  };
}
function registerStyle(hash, css) {
  const runtime = getRuntime();
  runtime.styles.set(hash, css);
  for (const targetDocument of runtime.documents.keys()) {
    injectStyle(targetDocument, hash, css);
  }
}

// packages/ui/src/collapsible-card/style.module.css
if (typeof process === "undefined" || "development" !== "test") {
  registerStyle("78199613cf", "@layer wp-ui{@layer utilities, components, compositions, overrides;@layer components{._626190151275d6d3__heading-wrapper{--_gcd-heading-color:inherit;--_gcd-heading-font-size:inherit;--_gcd-heading-font-weight:inherit;--_gcd-heading-margin:0;font-family:inherit;line-height:inherit}.cab17c7a373cb60d__header-content{flex:1;min-width:0}.dd89d27c4f15912d__header-trigger-positioner{align-self:center;flex-shrink:0;max-height:0;overflow:visible}.bcfab5f2448bafef__header-trigger-wrapper{border-radius:var(--wpds-border-radius-sm,2px);display:flex;translate:0 -50%}._3106f8d2b0330faa__header-trigger{@media not (prefers-reduced-motion){transition:rotate .15s ease-out}}._5d2dfcb4085c6d0f__header[data-panel-open] ._3106f8d2b0330faa__header-trigger{rotate:180deg}._5d2dfcb4085c6d0f__header[data-disabled] ._3106f8d2b0330faa__header-trigger{color:var(--wpds-color-foreground-interactive-neutral-disabled,#8d8d8d)}.e34cf37ccd0d81e0__content{height:var(--collapsible-panel-height);margin-block-start:var(--wp-ui-card-header-content-margin);overflow:hidden;&._03cfdbcd710393c9__overflow-visible{overflow:visible}&[hidden]:not([hidden=until-found]){display:none}&[data-ending-style],&[data-starting-style]{height:0}@media not (prefers-reduced-motion){transition:all .15s ease-out}}}@layer compositions{._41bfdbf7b6c087c2__content-inner{padding-block-start:0}._5d2dfcb4085c6d0f__header{align-items:stretch;display:flex;flex-direction:row;gap:var(--wpds-dimension-gap-sm,8px);outline:none;&:not([data-disabled]){cursor:var(--wpds-cursor-control,pointer)}}}}");
}
var style_default = { "heading-wrapper": "_626190151275d6d3__heading-wrapper", "header-content": "cab17c7a373cb60d__header-content", "header-trigger-positioner": "dd89d27c4f15912d__header-trigger-positioner", "header-trigger-wrapper": "bcfab5f2448bafef__header-trigger-wrapper", "header-trigger": "_3106f8d2b0330faa__header-trigger", "header": "_5d2dfcb4085c6d0f__header", "content": "e34cf37ccd0d81e0__content", "overflow-visible": "_03cfdbcd710393c9__overflow-visible", "content-inner": "_41bfdbf7b6c087c2__content-inner" };

// packages/ui/src/collapsible-card/content.tsx

var Content2 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(
  function CollapsibleCardContent({ className, render, children, hiddenUntilFound = true, ...restProps }, ref) {
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(
      _collapsible_index_mjs__WEBPACK_IMPORTED_MODULE_3__.Panel,
      {
        ref,
        className: (state) => (0,clsx__WEBPACK_IMPORTED_MODULE_1__["default"])(
          style_default.content,
          state.open && state.transitionStatus === "idle" && style_default["overflow-visible"],
          className
        ),
        hiddenUntilFound,
        ...restProps,
        children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(
          _card_index_mjs__WEBPACK_IMPORTED_MODULE_2__.Content,
          {
            className: style_default["content-inner"],
            render,
            children
          }
        )
      }
    );
  }
);

//# sourceMappingURL=content.mjs.map


/***/ },

/***/ "./node_modules/@wordpress/ui/build-module/collapsible-card/context.mjs"
/*!******************************************************************************!*\
  !*** ./node_modules/@wordpress/ui/build-module/collapsible-card/context.mjs ***!
  \******************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HeaderDescriptionIdContext: () => (/* binding */ HeaderDescriptionIdContext)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
// packages/ui/src/collapsible-card/context.ts

var HeaderDescriptionIdContext = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createContext)({
  setDescriptionId: () => {
  }
});

//# sourceMappingURL=context.mjs.map


/***/ },

/***/ "./node_modules/@wordpress/ui/build-module/collapsible-card/header.mjs"
/*!*****************************************************************************!*\
  !*** ./node_modules/@wordpress/ui/build-module/collapsible-card/header.mjs ***!
  \*****************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Header: () => (/* binding */ Header2)
/* harmony export */ });
/* harmony import */ var _base_ui_react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @base-ui/react */ "./node_modules/@base-ui/react/use-render/useRender.mjs");
/* harmony import */ var _base_ui_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @base-ui/react */ "./node_modules/@base-ui/react/merge-props/mergeProps.mjs");
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.mjs");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/chevron-down.mjs");
/* harmony import */ var _card_index_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../card/index.mjs */ "./node_modules/@wordpress/ui/build-module/card/header.mjs");
/* harmony import */ var _collapsible_index_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../collapsible/index.mjs */ "./node_modules/@wordpress/ui/build-module/collapsible/trigger.mjs");
/* harmony import */ var _icon_index_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../icon/index.mjs */ "./node_modules/@wordpress/ui/build-module/icon/icon.mjs");
/* harmony import */ var _context_mjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./context.mjs */ "./node_modules/@wordpress/ui/build-module/collapsible-card/context.mjs");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
// packages/ui/src/collapsible-card/header.tsx








// packages/style-runtime/src/index.ts
var STYLE_HASH_ATTRIBUTE = "data-wp-hash";
function getRuntime() {
  const globalScope = globalThis;
  if (globalScope.__wpStyleRuntime) {
    return globalScope.__wpStyleRuntime;
  }
  globalScope.__wpStyleRuntime = {
    documents: /* @__PURE__ */ new Map(),
    styles: /* @__PURE__ */ new Map(),
    injectedStyles: /* @__PURE__ */ new WeakMap()
  };
  if (typeof document !== "undefined") {
    registerDocument(document);
  }
  return globalScope.__wpStyleRuntime;
}
function documentContainsStyleHash(targetDocument, hash) {
  if (!targetDocument.head) {
    return false;
  }
  for (const style of targetDocument.head.querySelectorAll(
    `style[${STYLE_HASH_ATTRIBUTE}]`
  )) {
    if (style.getAttribute(STYLE_HASH_ATTRIBUTE) === hash) {
      return true;
    }
  }
  return false;
}
function injectStyle(targetDocument, hash, css) {
  if (!targetDocument.head) {
    return;
  }
  const runtime = getRuntime();
  let injectedStyles = runtime.injectedStyles.get(targetDocument);
  if (!injectedStyles) {
    injectedStyles = /* @__PURE__ */ new Set();
    runtime.injectedStyles.set(targetDocument, injectedStyles);
  }
  if (injectedStyles.has(hash)) {
    return;
  }
  if (documentContainsStyleHash(targetDocument, hash)) {
    injectedStyles.add(hash);
    return;
  }
  const style = targetDocument.createElement("style");
  style.setAttribute(STYLE_HASH_ATTRIBUTE, hash);
  style.appendChild(targetDocument.createTextNode(css));
  targetDocument.head.appendChild(style);
  injectedStyles.add(hash);
}
function registerDocument(targetDocument) {
  const runtime = getRuntime();
  runtime.documents.set(
    targetDocument,
    (runtime.documents.get(targetDocument) ?? 0) + 1
  );
  for (const [hash, css] of runtime.styles) {
    injectStyle(targetDocument, hash, css);
  }
  return () => {
    const count = runtime.documents.get(targetDocument);
    if (count === void 0) {
      return;
    }
    if (count <= 1) {
      runtime.documents.delete(targetDocument);
      return;
    }
    runtime.documents.set(targetDocument, count - 1);
  };
}
function registerStyle(hash, css) {
  const runtime = getRuntime();
  runtime.styles.set(hash, css);
  for (const targetDocument of runtime.documents.keys()) {
    injectStyle(targetDocument, hash, css);
  }
}

// packages/ui/src/collapsible-card/style.module.css
if (typeof process === "undefined" || "development" !== "test") {
  registerStyle("78199613cf", "@layer wp-ui{@layer utilities, components, compositions, overrides;@layer components{._626190151275d6d3__heading-wrapper{--_gcd-heading-color:inherit;--_gcd-heading-font-size:inherit;--_gcd-heading-font-weight:inherit;--_gcd-heading-margin:0;font-family:inherit;line-height:inherit}.cab17c7a373cb60d__header-content{flex:1;min-width:0}.dd89d27c4f15912d__header-trigger-positioner{align-self:center;flex-shrink:0;max-height:0;overflow:visible}.bcfab5f2448bafef__header-trigger-wrapper{border-radius:var(--wpds-border-radius-sm,2px);display:flex;translate:0 -50%}._3106f8d2b0330faa__header-trigger{@media not (prefers-reduced-motion){transition:rotate .15s ease-out}}._5d2dfcb4085c6d0f__header[data-panel-open] ._3106f8d2b0330faa__header-trigger{rotate:180deg}._5d2dfcb4085c6d0f__header[data-disabled] ._3106f8d2b0330faa__header-trigger{color:var(--wpds-color-foreground-interactive-neutral-disabled,#8d8d8d)}.e34cf37ccd0d81e0__content{height:var(--collapsible-panel-height);margin-block-start:var(--wp-ui-card-header-content-margin);overflow:hidden;&._03cfdbcd710393c9__overflow-visible{overflow:visible}&[hidden]:not([hidden=until-found]){display:none}&[data-ending-style],&[data-starting-style]{height:0}@media not (prefers-reduced-motion){transition:all .15s ease-out}}}@layer compositions{._41bfdbf7b6c087c2__content-inner{padding-block-start:0}._5d2dfcb4085c6d0f__header{align-items:stretch;display:flex;flex-direction:row;gap:var(--wpds-dimension-gap-sm,8px);outline:none;&:not([data-disabled]){cursor:var(--wpds-cursor-control,pointer)}}}}");
}
var style_default = { "heading-wrapper": "_626190151275d6d3__heading-wrapper", "header-content": "cab17c7a373cb60d__header-content", "header-trigger-positioner": "dd89d27c4f15912d__header-trigger-positioner", "header-trigger-wrapper": "bcfab5f2448bafef__header-trigger-wrapper", "header-trigger": "_3106f8d2b0330faa__header-trigger", "header": "_5d2dfcb4085c6d0f__header", "content": "e34cf37ccd0d81e0__content", "overflow-visible": "_03cfdbcd710393c9__overflow-visible", "content-inner": "_41bfdbf7b6c087c2__content-inner" };

// packages/ui/src/utils/css/global-css-defense.module.css
if (typeof process === "undefined" || "development" !== "test") {
  registerStyle("af6d9984a6", "._6defc79820e382c6__button{box-sizing:var(--_gcd-button-box-sizing,border-box);font-family:var(--_gcd-button-font-family,inherit);font-size:var(--_gcd-button-font-size,inherit);font-weight:var(--_gcd-button-font-weight,inherit)}.d2cff2e5dea83bd1__input{box-sizing:var(--_gcd-input-box-sizing,border-box);font-family:var(--_gcd-input-font-family,inherit);font-size:var(--_gcd-input-font-size,inherit);font-weight:var(--_gcd-input-font-weight,inherit);margin:var(--_gcd-input-margin,0);&:is(textarea,[type=text],[type=password],[type=color],[type=date],[type=datetime],[type=datetime-local],[type=email],[type=month],[type=number],[type=search],[type=tel],[type=time],[type=url],[type=week]){background-color:var(--_gcd-input-background-color,transparent);border:var(--_gcd-input-border,none);border-radius:var(--_gcd-input-border-radius,0);box-shadow:var(--_gcd-input-box-shadow,0 0 0 transparent);color:var(--_gcd-input-color,var(--wpds-color-foreground-interactive-neutral,#1e1e1e));&:focus{border-color:var(--_gcd-input-border-color-focus,var(--wp-admin-theme-color));box-shadow:var(--_gcd-input-box-shadow-focus,none);outline:var(--_gcd-input-outline-focus,none)}&:disabled{background:var(--_gcd-input-background-disabled,transparent);border-color:var(--_gcd-input-border-color-disabled,transparent);box-shadow:var(--_gcd-input-box-shadow-disabled,none);color:var(--_gcd-input-color-disabled,var(--wpds-color-foreground-interactive-neutral-disabled,#8d8d8d))}&::placeholder{color:var(--_gcd-input-placeholder-color,var(--wpds-color-foreground-interactive-neutral-disabled,#8d8d8d))}}&:is(textarea,[type=text],[type=password],[type=date],[type=datetime],[type=datetime-local],[type=email],[type=month],[type=number],[type=search],[type=tel],[type=time],[type=url],[type=week]){line-height:var(--_gcd-input-line-height,inherit);min-height:var(--_gcd-input-min-height,auto);padding:var(--_gcd-input-padding,0)}}._547d86373d02e108__textarea{box-sizing:var(--_gcd-textarea-box-sizing,border-box);overflow:var(--_gcd-textarea-overflow,auto);resize:var(--_gcd-textarea-resize,block)}._8c15fd0ed9f28ba4__div{outline:var(--_gcd-div-outline,0 solid transparent)}p._43cec3e1eec1066d__p{font-size:var(--_gcd-p-font-size,13px);line-height:var(--_gcd-p-line-height,1.5);margin:var(--_gcd-p-margin,0)}:is(h1,h2,h3,h4,h5,h6).e97669c6d9a38497__heading{color:var(--_gcd-heading-color,var(--wpds-color-foreground-content-neutral,#1e1e1e));font-size:var(--_gcd-heading-font-size,inherit);font-weight:var(--_gcd-heading-font-weight,var(--wpds-typography-font-weight-emphasis,600));margin:var(--_gcd-heading-margin,0)}._2c0831b0499dbd6e__a,._2c0831b0499dbd6e__a:is(:hover,:focus,:active){border-radius:var(--_gcd-a-border-radius,0);box-shadow:var(--_gcd-a-box-shadow,none);color:var(--_gcd-a-color,inherit);outline:var(--_gcd-a-outline,0 solid transparent);transition:var(--_gcd-a-transition,none)}");
}
var global_css_defense_default = { "button": "_6defc79820e382c6__button", "input": "d2cff2e5dea83bd1__input", "textarea": "_547d86373d02e108__textarea", "div": "_8c15fd0ed9f28ba4__div", "p": "_43cec3e1eec1066d__p", "heading": "e97669c6d9a38497__heading", "a": "_2c0831b0499dbd6e__a" };

// packages/ui/src/utils/css/focus.module.scss
if (typeof process === "undefined" || "development" !== "test") {
  registerStyle("2ffedd8246", "@layer wp-ui{@layer utilities, components, compositions, overrides;@layer utilities{._64de9947bf305b7a__outset-ring--focus-within-visible:focus-within:has(:focus-visible),.af79fb116edb0dd7__outset-ring--focus:focus,.dfcfdc28396e5d98__outset-ring--focus-visible:focus-visible,.e5cd9ee879f6403a__outset-ring--focus-within:focus-within,:focus-visible ._81935a08e952f267__outset-ring--focus-parent-visible{--focus-color:var(--wpds-color-stroke-focus,var(--wp-admin-theme-color,#3858e9));--_gcd-a-outline:var(--wpds-border-width-focus,var(--wp-admin-border-width-focus,2px)) solid var(--wpds-color-stroke-focus,var(--wp-admin-theme-color,#3858e9));--_gcd-div-outline:var(--wpds-border-width-focus,var(--wp-admin-border-width-focus,2px)) solid var(--wpds-color-stroke-focus,var(--wp-admin-theme-color,#3858e9));outline:var(--wpds-border-width-focus,var(--wp-admin-border-width-focus,2px)) solid var(--focus-color);outline-offset:var(--wpds-border-width-focus,var(--wp-admin-border-width-focus,2px))}._3c9f5ee9fc9c136d__outset-ring--focus-within-except-active:focus-within,.abc777e9713fa711__outset-ring--focus-except-active:focus{outline:none}._3c9f5ee9fc9c136d__outset-ring--focus-within-except-active:focus-within:not(:has(:active)),.abc777e9713fa711__outset-ring--focus-except-active:focus:not(:active){--focus-color:var(--wpds-color-stroke-focus,var(--wp-admin-theme-color,#3858e9));--_gcd-a-outline:var(--wpds-border-width-focus,var(--wp-admin-border-width-focus,2px)) solid var(--wpds-color-stroke-focus,var(--wp-admin-theme-color,#3858e9));--_gcd-div-outline:var(--wpds-border-width-focus,var(--wp-admin-border-width-focus,2px)) solid var(--wpds-color-stroke-focus,var(--wp-admin-theme-color,#3858e9));outline:var(--wpds-border-width-focus,var(--wp-admin-border-width-focus,2px)) solid var(--focus-color);outline-offset:var(--wpds-border-width-focus,var(--wp-admin-border-width-focus,2px))}}}");
}
var focus_module_default = { "outset-ring--focus": "af79fb116edb0dd7__outset-ring--focus", "outset-ring--focus-visible": "dfcfdc28396e5d98__outset-ring--focus-visible", "outset-ring--focus-within": "e5cd9ee879f6403a__outset-ring--focus-within", "outset-ring--focus-within-visible": "_64de9947bf305b7a__outset-ring--focus-within-visible", "outset-ring--focus-parent-visible": "_81935a08e952f267__outset-ring--focus-parent-visible", "outset-ring--focus-except-active": "abc777e9713fa711__outset-ring--focus-except-active", "outset-ring--focus-within-except-active": "_3c9f5ee9fc9c136d__outset-ring--focus-within-except-active" };

// packages/ui/src/collapsible-card/header.tsx


var Header2 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.forwardRef)(
  function CollapsibleCardHeader({ children, className, render, ...restProps }, ref) {
    const [descriptionId, setDescriptionId] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useState)();
    const contextValue = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useMemo)(
      () => ({ setDescriptionId }),
      [setDescriptionId]
    );
    return (0,_base_ui_react__WEBPACK_IMPORTED_MODULE_0__.useRender)({
      defaultTagName: "div",
      render,
      ref,
      props: (0,_base_ui_react__WEBPACK_IMPORTED_MODULE_1__.mergeProps)(restProps, {
        className: (0,clsx__WEBPACK_IMPORTED_MODULE_2__["default"])(
          global_css_defense_default.heading,
          style_default["heading-wrapper"],
          className
        ),
        children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_context_mjs__WEBPACK_IMPORTED_MODULE_8__.HeaderDescriptionIdContext.Provider, { value: contextValue, children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(
          _collapsible_index_mjs__WEBPACK_IMPORTED_MODULE_6__.Trigger,
          {
            className: style_default.header,
            render: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_card_index_mjs__WEBPACK_IMPORTED_MODULE_5__.Header, {}),
            nativeButton: false,
            "aria-describedby": descriptionId,
            children: [
              /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("div", { className: style_default["header-content"], children }),
              /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(
                "div",
                {
                  className: (0,clsx__WEBPACK_IMPORTED_MODULE_2__["default"])(
                    style_default["header-trigger-positioner"]
                  ),
                  children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(
                    "div",
                    {
                      className: (0,clsx__WEBPACK_IMPORTED_MODULE_2__["default"])(
                        style_default["header-trigger-wrapper"],
                        global_css_defense_default.div,
                        // While the interactive trigger element is the whole header,
                        // the focus ring will be displayed only on the icon to visually
                        // emulate it being the button.
                        focus_module_default["outset-ring--focus-parent-visible"]
                      ),
                      children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(
                        _icon_index_mjs__WEBPACK_IMPORTED_MODULE_7__.Icon,
                        {
                          icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_4__["default"],
                          className: style_default["header-trigger"]
                        }
                      )
                    }
                  )
                }
              )
            ]
          }
        ) })
      })
    });
  }
);

//# sourceMappingURL=header.mjs.map


/***/ },

/***/ "./node_modules/@wordpress/ui/build-module/collapsible-card/root.mjs"
/*!***************************************************************************!*\
  !*** ./node_modules/@wordpress/ui/build-module/collapsible-card/root.mjs ***!
  \***************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Root: () => (/* binding */ Root3)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _card_index_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../card/index.mjs */ "./node_modules/@wordpress/ui/build-module/card/root.mjs");
/* harmony import */ var _collapsible_index_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../collapsible/index.mjs */ "./node_modules/@wordpress/ui/build-module/collapsible/root.mjs");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
// packages/ui/src/collapsible-card/root.tsx




var Root3 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(
  function CollapsibleCardRoot({ render, ...restProps }, ref) {
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(
      _collapsible_index_mjs__WEBPACK_IMPORTED_MODULE_2__.Root,
      {
        ref,
        render: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_card_index_mjs__WEBPACK_IMPORTED_MODULE_1__.Root, { render }),
        ...restProps
      }
    );
  }
);

//# sourceMappingURL=root.mjs.map


/***/ },

/***/ "./node_modules/@wordpress/ui/build-module/collapsible/panel.mjs"
/*!***********************************************************************!*\
  !*** ./node_modules/@wordpress/ui/build-module/collapsible/panel.mjs ***!
  \***********************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Panel: () => (/* binding */ Panel)
/* harmony export */ });
/* harmony import */ var _base_ui_react_collapsible__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @base-ui/react/collapsible */ "./node_modules/@base-ui/react/collapsible/panel/CollapsiblePanel.mjs");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
// packages/ui/src/collapsible/panel.tsx



var Panel = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.forwardRef)(
  function CollapsiblePanel(props, forwardedRef) {
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_base_ui_react_collapsible__WEBPACK_IMPORTED_MODULE_0__.CollapsiblePanel, { ref: forwardedRef, ...props });
  }
);

//# sourceMappingURL=panel.mjs.map


/***/ },

/***/ "./node_modules/@wordpress/ui/build-module/collapsible/root.mjs"
/*!**********************************************************************!*\
  !*** ./node_modules/@wordpress/ui/build-module/collapsible/root.mjs ***!
  \**********************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Root: () => (/* binding */ Root)
/* harmony export */ });
/* harmony import */ var _base_ui_react_collapsible__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @base-ui/react/collapsible */ "./node_modules/@base-ui/react/collapsible/root/CollapsibleRoot.mjs");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
// packages/ui/src/collapsible/root.tsx



var Root = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.forwardRef)(
  function CollapsibleRoot(props, forwardedRef) {
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_base_ui_react_collapsible__WEBPACK_IMPORTED_MODULE_0__.CollapsibleRoot, { ref: forwardedRef, ...props });
  }
);

//# sourceMappingURL=root.mjs.map


/***/ },

/***/ "./node_modules/@wordpress/ui/build-module/collapsible/trigger.mjs"
/*!*************************************************************************!*\
  !*** ./node_modules/@wordpress/ui/build-module/collapsible/trigger.mjs ***!
  \*************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Trigger: () => (/* binding */ Trigger)
/* harmony export */ });
/* harmony import */ var _base_ui_react_collapsible__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @base-ui/react/collapsible */ "./node_modules/@base-ui/react/collapsible/trigger/CollapsibleTrigger.mjs");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
// packages/ui/src/collapsible/trigger.tsx



var Trigger = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.forwardRef)(
  function CollapsibleTrigger(props, forwardedRef) {
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_base_ui_react_collapsible__WEBPACK_IMPORTED_MODULE_0__.CollapsibleTrigger, { ref: forwardedRef, ...props });
  }
);

//# sourceMappingURL=trigger.mjs.map


/***/ },

/***/ "./node_modules/@wordpress/ui/build-module/form/primitives/input-layout/index.mjs"
/*!****************************************************************************************!*\
  !*** ./node_modules/@wordpress/ui/build-module/form/primitives/input-layout/index.mjs ***!
  \****************************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   InputLayout: () => (/* binding */ InputLayout)
/* harmony export */ });
/* harmony import */ var _input_layout_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./input-layout.mjs */ "./node_modules/@wordpress/ui/build-module/form/primitives/input-layout/input-layout.mjs");
/* harmony import */ var _slot_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./slot.mjs */ "./node_modules/@wordpress/ui/build-module/form/primitives/input-layout/slot.mjs");
// packages/ui/src/form/primitives/input-layout/index.ts


var InputLayout = Object.assign(_input_layout_mjs__WEBPACK_IMPORTED_MODULE_0__.InputLayout, {
  Slot: _slot_mjs__WEBPACK_IMPORTED_MODULE_1__.InputLayoutSlot
});

//# sourceMappingURL=index.mjs.map


/***/ },

/***/ "./node_modules/@wordpress/ui/build-module/form/primitives/input-layout/input-layout.mjs"
/*!***********************************************************************************************!*\
  !*** ./node_modules/@wordpress/ui/build-module/form/primitives/input-layout/input-layout.mjs ***!
  \***********************************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   InputLayout: () => (/* binding */ InputLayout)
/* harmony export */ });
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.mjs");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
// packages/ui/src/form/primitives/input-layout/input-layout.tsx



// packages/style-runtime/src/index.ts
var STYLE_HASH_ATTRIBUTE = "data-wp-hash";
function getRuntime() {
  const globalScope = globalThis;
  if (globalScope.__wpStyleRuntime) {
    return globalScope.__wpStyleRuntime;
  }
  globalScope.__wpStyleRuntime = {
    documents: /* @__PURE__ */ new Map(),
    styles: /* @__PURE__ */ new Map(),
    injectedStyles: /* @__PURE__ */ new WeakMap()
  };
  if (typeof document !== "undefined") {
    registerDocument(document);
  }
  return globalScope.__wpStyleRuntime;
}
function documentContainsStyleHash(targetDocument, hash) {
  if (!targetDocument.head) {
    return false;
  }
  for (const style of targetDocument.head.querySelectorAll(
    `style[${STYLE_HASH_ATTRIBUTE}]`
  )) {
    if (style.getAttribute(STYLE_HASH_ATTRIBUTE) === hash) {
      return true;
    }
  }
  return false;
}
function injectStyle(targetDocument, hash, css) {
  if (!targetDocument.head) {
    return;
  }
  const runtime = getRuntime();
  let injectedStyles = runtime.injectedStyles.get(targetDocument);
  if (!injectedStyles) {
    injectedStyles = /* @__PURE__ */ new Set();
    runtime.injectedStyles.set(targetDocument, injectedStyles);
  }
  if (injectedStyles.has(hash)) {
    return;
  }
  if (documentContainsStyleHash(targetDocument, hash)) {
    injectedStyles.add(hash);
    return;
  }
  const style = targetDocument.createElement("style");
  style.setAttribute(STYLE_HASH_ATTRIBUTE, hash);
  style.appendChild(targetDocument.createTextNode(css));
  targetDocument.head.appendChild(style);
  injectedStyles.add(hash);
}
function registerDocument(targetDocument) {
  const runtime = getRuntime();
  runtime.documents.set(
    targetDocument,
    (runtime.documents.get(targetDocument) ?? 0) + 1
  );
  for (const [hash, css] of runtime.styles) {
    injectStyle(targetDocument, hash, css);
  }
  return () => {
    const count = runtime.documents.get(targetDocument);
    if (count === void 0) {
      return;
    }
    if (count <= 1) {
      runtime.documents.delete(targetDocument);
      return;
    }
    runtime.documents.set(targetDocument, count - 1);
  };
}
function registerStyle(hash, css) {
  const runtime = getRuntime();
  runtime.styles.set(hash, css);
  for (const targetDocument of runtime.documents.keys()) {
    injectStyle(targetDocument, hash, css);
  }
}

// packages/ui/src/utils/css/global-css-defense.module.css
if (typeof process === "undefined" || "development" !== "test") {
  registerStyle("af6d9984a6", "._6defc79820e382c6__button{box-sizing:var(--_gcd-button-box-sizing,border-box);font-family:var(--_gcd-button-font-family,inherit);font-size:var(--_gcd-button-font-size,inherit);font-weight:var(--_gcd-button-font-weight,inherit)}.d2cff2e5dea83bd1__input{box-sizing:var(--_gcd-input-box-sizing,border-box);font-family:var(--_gcd-input-font-family,inherit);font-size:var(--_gcd-input-font-size,inherit);font-weight:var(--_gcd-input-font-weight,inherit);margin:var(--_gcd-input-margin,0);&:is(textarea,[type=text],[type=password],[type=color],[type=date],[type=datetime],[type=datetime-local],[type=email],[type=month],[type=number],[type=search],[type=tel],[type=time],[type=url],[type=week]){background-color:var(--_gcd-input-background-color,transparent);border:var(--_gcd-input-border,none);border-radius:var(--_gcd-input-border-radius,0);box-shadow:var(--_gcd-input-box-shadow,0 0 0 transparent);color:var(--_gcd-input-color,var(--wpds-color-foreground-interactive-neutral,#1e1e1e));&:focus{border-color:var(--_gcd-input-border-color-focus,var(--wp-admin-theme-color));box-shadow:var(--_gcd-input-box-shadow-focus,none);outline:var(--_gcd-input-outline-focus,none)}&:disabled{background:var(--_gcd-input-background-disabled,transparent);border-color:var(--_gcd-input-border-color-disabled,transparent);box-shadow:var(--_gcd-input-box-shadow-disabled,none);color:var(--_gcd-input-color-disabled,var(--wpds-color-foreground-interactive-neutral-disabled,#8d8d8d))}&::placeholder{color:var(--_gcd-input-placeholder-color,var(--wpds-color-foreground-interactive-neutral-disabled,#8d8d8d))}}&:is(textarea,[type=text],[type=password],[type=date],[type=datetime],[type=datetime-local],[type=email],[type=month],[type=number],[type=search],[type=tel],[type=time],[type=url],[type=week]){line-height:var(--_gcd-input-line-height,inherit);min-height:var(--_gcd-input-min-height,auto);padding:var(--_gcd-input-padding,0)}}._547d86373d02e108__textarea{box-sizing:var(--_gcd-textarea-box-sizing,border-box);overflow:var(--_gcd-textarea-overflow,auto);resize:var(--_gcd-textarea-resize,block)}._8c15fd0ed9f28ba4__div{outline:var(--_gcd-div-outline,0 solid transparent)}p._43cec3e1eec1066d__p{font-size:var(--_gcd-p-font-size,13px);line-height:var(--_gcd-p-line-height,1.5);margin:var(--_gcd-p-margin,0)}:is(h1,h2,h3,h4,h5,h6).e97669c6d9a38497__heading{color:var(--_gcd-heading-color,var(--wpds-color-foreground-content-neutral,#1e1e1e));font-size:var(--_gcd-heading-font-size,inherit);font-weight:var(--_gcd-heading-font-weight,var(--wpds-typography-font-weight-emphasis,600));margin:var(--_gcd-heading-margin,0)}._2c0831b0499dbd6e__a,._2c0831b0499dbd6e__a:is(:hover,:focus,:active){border-radius:var(--_gcd-a-border-radius,0);box-shadow:var(--_gcd-a-box-shadow,none);color:var(--_gcd-a-color,inherit);outline:var(--_gcd-a-outline,0 solid transparent);transition:var(--_gcd-a-transition,none)}");
}
var global_css_defense_default = { "button": "_6defc79820e382c6__button", "input": "d2cff2e5dea83bd1__input", "textarea": "_547d86373d02e108__textarea", "div": "_8c15fd0ed9f28ba4__div", "p": "_43cec3e1eec1066d__p", "heading": "e97669c6d9a38497__heading", "a": "_2c0831b0499dbd6e__a" };

// packages/ui/src/utils/css/resets.module.css
if (typeof process === "undefined" || "development" !== "test") {
  registerStyle("10f3806643", "@layer wp-ui{@layer utilities, components, compositions, overrides;@layer utilities{._336cd3e4e743482f__box-sizing{box-sizing:border-box;*,:after,:before{box-sizing:inherit}}}}");
}
var resets_default = { "box-sizing": "_336cd3e4e743482f__box-sizing" };

// packages/ui/src/form/primitives/input-layout/style.module.css
if (typeof process === "undefined" || "development" !== "test") {
  registerStyle("bc14d8e61b", '@layer wp-ui{@layer utilities, components, compositions, overrides;@layer components{.cb2baafdc08746bb__input-layout{--wp-ui-input-layout-padding-inline:var(--wpds-dimension-padding-md,12px);background-color:var(--wpds-color-background-interactive-neutral-weak,#0000);border-color:var(--wpds-color-stroke-interactive-neutral,#8d8d8d);border-radius:var(--wpds-border-radius-sm,2px);border-style:solid;border-width:var(--wpds-border-width-xs,1px);color:var(--wpds-color-foreground-interactive-neutral,#1e1e1e);display:flex;font-family:var(--wpds-typography-font-family-body,-apple-system,system-ui,"Segoe UI","Roboto","Oxygen-Sans","Ubuntu","Cantarell","Helvetica Neue",sans-serif);font-size:max(var(--wpds-typography-font-size-md,13px),16px);height:var(--wpds-dimension-size-lg,40px);line-height:1;@media (min-width:600px){font-size:var(--wpds-typography-font-size-md,13px)}&._0c807a84cbb94e0c__is-size-compact{height:var(--wpds-dimension-size-md,32px)}&._0c807a84cbb94e0c__is-size-compact,&.ed67cda122dc1e7b__is-size-small{--wp-ui-input-layout-padding-inline:var(--wpds-dimension-padding-sm,8px)}&.ed67cda122dc1e7b__is-size-small{height:var(--wpds-dimension-size-sm,24px)}&._6fb7104732387680__is-disabled,&:has([data-can-disable-input-layout][data-disabled]){background-color:var(--wpds-color-background-interactive-neutral-weak-disabled,#0000);border-color:var(--wpds-color-stroke-interactive-neutral-disabled,#dbdbdb);color:var(--wpds-color-foreground-interactive-neutral-disabled,#8d8d8d);@media (forced-colors:active){border-bottom-color:GrayText;border-left-color:GrayText;border-right-color:GrayText;border-top-color:GrayText;color:GrayText}}&._8097270636ca6100__is-borderless{border-color:transparent}&:has(._0d7afad74a057888__input-layout-slot:focus-within){outline:none}&:hover:not(._6fb7104732387680__is-disabled,:has([data-can-disable-input-layout][data-disabled]),._8097270636ca6100__is-borderless){border-color:var(--wpds-color-stroke-interactive-neutral-active,#6e6e6e)}}.c192b41a12b4387b__slot-wrapper{display:contents}._0d7afad74a057888__input-layout-slot{align-items:center;display:flex;&._0c952682762ca288__is-padding-minimal{--wp-ui-input-layout-prefix-padding-start:calc(var(--wp-ui-input-layout-padding-inline) - var(--wpds-dimension-padding-xs, 4px));--wp-ui-input-layout-suffix-padding-end:calc(var(--wp-ui-input-layout-padding-inline) - var(--wpds-dimension-padding-xs, 4px))}[data-slot-type=prefix] &{padding-inline-start:var(--wp-ui-input-layout-prefix-padding-start,var(--wp-ui-input-layout-padding-inline))}[data-slot-type=suffix] &{padding-inline-end:var(--wp-ui-input-layout-suffix-padding-end,var(--wp-ui-input-layout-padding-inline))}}}}');
}
var style_default = { "input-layout": "cb2baafdc08746bb__input-layout", "is-size-compact": "_0c807a84cbb94e0c__is-size-compact", "is-size-small": "ed67cda122dc1e7b__is-size-small", "is-disabled": "_6fb7104732387680__is-disabled", "is-borderless": "_8097270636ca6100__is-borderless", "input-layout-slot": "_0d7afad74a057888__input-layout-slot", "slot-wrapper": "c192b41a12b4387b__slot-wrapper", "is-padding-minimal": "_0c952682762ca288__is-padding-minimal" };

// packages/ui/src/form/primitives/input-layout/input-layout.tsx

var InputLayout = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.forwardRef)(
  function InputLayout2({
    className,
    children,
    visuallyDisabled,
    size = "default",
    isBorderless,
    prefix,
    suffix,
    ...restProps
  }, ref) {
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(
      "div",
      {
        ref,
        className: (0,clsx__WEBPACK_IMPORTED_MODULE_0__["default"])(
          global_css_defense_default.div,
          resets_default["box-sizing"],
          style_default["input-layout"],
          style_default[`is-size-${size}`],
          visuallyDisabled && style_default["is-disabled"],
          isBorderless && style_default["is-borderless"],
          className
        ),
        ...restProps,
        children: [
          _wordpress_element__WEBPACK_IMPORTED_MODULE_1__.Children.count(prefix) > 0 && /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(
            "div",
            {
              className: style_default["slot-wrapper"],
              "data-slot-type": "prefix",
              children: prefix
            }
          ),
          children,
          _wordpress_element__WEBPACK_IMPORTED_MODULE_1__.Children.count(suffix) > 0 && /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(
            "div",
            {
              className: style_default["slot-wrapper"],
              "data-slot-type": "suffix",
              children: suffix
            }
          )
        ]
      }
    );
  }
);

//# sourceMappingURL=input-layout.mjs.map


/***/ },

/***/ "./node_modules/@wordpress/ui/build-module/form/primitives/input-layout/slot.mjs"
/*!***************************************************************************************!*\
  !*** ./node_modules/@wordpress/ui/build-module/form/primitives/input-layout/slot.mjs ***!
  \***************************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   InputLayoutSlot: () => (/* binding */ InputLayoutSlot)
/* harmony export */ });
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.mjs");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
// packages/ui/src/form/primitives/input-layout/slot.tsx



// packages/style-runtime/src/index.ts
var STYLE_HASH_ATTRIBUTE = "data-wp-hash";
function getRuntime() {
  const globalScope = globalThis;
  if (globalScope.__wpStyleRuntime) {
    return globalScope.__wpStyleRuntime;
  }
  globalScope.__wpStyleRuntime = {
    documents: /* @__PURE__ */ new Map(),
    styles: /* @__PURE__ */ new Map(),
    injectedStyles: /* @__PURE__ */ new WeakMap()
  };
  if (typeof document !== "undefined") {
    registerDocument(document);
  }
  return globalScope.__wpStyleRuntime;
}
function documentContainsStyleHash(targetDocument, hash) {
  if (!targetDocument.head) {
    return false;
  }
  for (const style of targetDocument.head.querySelectorAll(
    `style[${STYLE_HASH_ATTRIBUTE}]`
  )) {
    if (style.getAttribute(STYLE_HASH_ATTRIBUTE) === hash) {
      return true;
    }
  }
  return false;
}
function injectStyle(targetDocument, hash, css) {
  if (!targetDocument.head) {
    return;
  }
  const runtime = getRuntime();
  let injectedStyles = runtime.injectedStyles.get(targetDocument);
  if (!injectedStyles) {
    injectedStyles = /* @__PURE__ */ new Set();
    runtime.injectedStyles.set(targetDocument, injectedStyles);
  }
  if (injectedStyles.has(hash)) {
    return;
  }
  if (documentContainsStyleHash(targetDocument, hash)) {
    injectedStyles.add(hash);
    return;
  }
  const style = targetDocument.createElement("style");
  style.setAttribute(STYLE_HASH_ATTRIBUTE, hash);
  style.appendChild(targetDocument.createTextNode(css));
  targetDocument.head.appendChild(style);
  injectedStyles.add(hash);
}
function registerDocument(targetDocument) {
  const runtime = getRuntime();
  runtime.documents.set(
    targetDocument,
    (runtime.documents.get(targetDocument) ?? 0) + 1
  );
  for (const [hash, css] of runtime.styles) {
    injectStyle(targetDocument, hash, css);
  }
  return () => {
    const count = runtime.documents.get(targetDocument);
    if (count === void 0) {
      return;
    }
    if (count <= 1) {
      runtime.documents.delete(targetDocument);
      return;
    }
    runtime.documents.set(targetDocument, count - 1);
  };
}
function registerStyle(hash, css) {
  const runtime = getRuntime();
  runtime.styles.set(hash, css);
  for (const targetDocument of runtime.documents.keys()) {
    injectStyle(targetDocument, hash, css);
  }
}

// packages/ui/src/form/primitives/input-layout/style.module.css
if (typeof process === "undefined" || "development" !== "test") {
  registerStyle("bc14d8e61b", '@layer wp-ui{@layer utilities, components, compositions, overrides;@layer components{.cb2baafdc08746bb__input-layout{--wp-ui-input-layout-padding-inline:var(--wpds-dimension-padding-md,12px);background-color:var(--wpds-color-background-interactive-neutral-weak,#0000);border-color:var(--wpds-color-stroke-interactive-neutral,#8d8d8d);border-radius:var(--wpds-border-radius-sm,2px);border-style:solid;border-width:var(--wpds-border-width-xs,1px);color:var(--wpds-color-foreground-interactive-neutral,#1e1e1e);display:flex;font-family:var(--wpds-typography-font-family-body,-apple-system,system-ui,"Segoe UI","Roboto","Oxygen-Sans","Ubuntu","Cantarell","Helvetica Neue",sans-serif);font-size:max(var(--wpds-typography-font-size-md,13px),16px);height:var(--wpds-dimension-size-lg,40px);line-height:1;@media (min-width:600px){font-size:var(--wpds-typography-font-size-md,13px)}&._0c807a84cbb94e0c__is-size-compact{height:var(--wpds-dimension-size-md,32px)}&._0c807a84cbb94e0c__is-size-compact,&.ed67cda122dc1e7b__is-size-small{--wp-ui-input-layout-padding-inline:var(--wpds-dimension-padding-sm,8px)}&.ed67cda122dc1e7b__is-size-small{height:var(--wpds-dimension-size-sm,24px)}&._6fb7104732387680__is-disabled,&:has([data-can-disable-input-layout][data-disabled]){background-color:var(--wpds-color-background-interactive-neutral-weak-disabled,#0000);border-color:var(--wpds-color-stroke-interactive-neutral-disabled,#dbdbdb);color:var(--wpds-color-foreground-interactive-neutral-disabled,#8d8d8d);@media (forced-colors:active){border-bottom-color:GrayText;border-left-color:GrayText;border-right-color:GrayText;border-top-color:GrayText;color:GrayText}}&._8097270636ca6100__is-borderless{border-color:transparent}&:has(._0d7afad74a057888__input-layout-slot:focus-within){outline:none}&:hover:not(._6fb7104732387680__is-disabled,:has([data-can-disable-input-layout][data-disabled]),._8097270636ca6100__is-borderless){border-color:var(--wpds-color-stroke-interactive-neutral-active,#6e6e6e)}}.c192b41a12b4387b__slot-wrapper{display:contents}._0d7afad74a057888__input-layout-slot{align-items:center;display:flex;&._0c952682762ca288__is-padding-minimal{--wp-ui-input-layout-prefix-padding-start:calc(var(--wp-ui-input-layout-padding-inline) - var(--wpds-dimension-padding-xs, 4px));--wp-ui-input-layout-suffix-padding-end:calc(var(--wp-ui-input-layout-padding-inline) - var(--wpds-dimension-padding-xs, 4px))}[data-slot-type=prefix] &{padding-inline-start:var(--wp-ui-input-layout-prefix-padding-start,var(--wp-ui-input-layout-padding-inline))}[data-slot-type=suffix] &{padding-inline-end:var(--wp-ui-input-layout-suffix-padding-end,var(--wp-ui-input-layout-padding-inline))}}}}');
}
var style_default = { "input-layout": "cb2baafdc08746bb__input-layout", "is-size-compact": "_0c807a84cbb94e0c__is-size-compact", "is-size-small": "ed67cda122dc1e7b__is-size-small", "is-disabled": "_6fb7104732387680__is-disabled", "is-borderless": "_8097270636ca6100__is-borderless", "input-layout-slot": "_0d7afad74a057888__input-layout-slot", "slot-wrapper": "c192b41a12b4387b__slot-wrapper", "is-padding-minimal": "_0c952682762ca288__is-padding-minimal" };

// packages/ui/src/form/primitives/input-layout/slot.tsx

var InputLayoutSlot = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.forwardRef)(function InputLayoutSlot2({ padding = "default", className, ...restProps }, ref) {
  return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(
    "div",
    {
      ref,
      className: (0,clsx__WEBPACK_IMPORTED_MODULE_0__["default"])(
        style_default["input-layout-slot"],
        style_default[`is-padding-${padding}`],
        className
      ),
      ...restProps
    }
  );
});
InputLayoutSlot.displayName = "InputLayout.Slot";

//# sourceMappingURL=slot.mjs.map


/***/ },

/***/ "./node_modules/@wordpress/ui/build-module/form/primitives/input/input.mjs"
/*!*********************************************************************************!*\
  !*** ./node_modules/@wordpress/ui/build-module/form/primitives/input/input.mjs ***!
  \*********************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Input: () => (/* binding */ Input)
/* harmony export */ });
/* harmony import */ var _base_ui_react_input__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @base-ui/react/input */ "./node_modules/@base-ui/react/input/Input.mjs");
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.mjs");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _input_layout_index_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../input-layout/index.mjs */ "./node_modules/@wordpress/ui/build-module/form/primitives/input-layout/index.mjs");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
// packages/ui/src/form/primitives/input/input.tsx




// packages/style-runtime/src/index.ts
var STYLE_HASH_ATTRIBUTE = "data-wp-hash";
function getRuntime() {
  const globalScope = globalThis;
  if (globalScope.__wpStyleRuntime) {
    return globalScope.__wpStyleRuntime;
  }
  globalScope.__wpStyleRuntime = {
    documents: /* @__PURE__ */ new Map(),
    styles: /* @__PURE__ */ new Map(),
    injectedStyles: /* @__PURE__ */ new WeakMap()
  };
  if (typeof document !== "undefined") {
    registerDocument(document);
  }
  return globalScope.__wpStyleRuntime;
}
function documentContainsStyleHash(targetDocument, hash) {
  if (!targetDocument.head) {
    return false;
  }
  for (const style of targetDocument.head.querySelectorAll(
    `style[${STYLE_HASH_ATTRIBUTE}]`
  )) {
    if (style.getAttribute(STYLE_HASH_ATTRIBUTE) === hash) {
      return true;
    }
  }
  return false;
}
function injectStyle(targetDocument, hash, css) {
  if (!targetDocument.head) {
    return;
  }
  const runtime = getRuntime();
  let injectedStyles = runtime.injectedStyles.get(targetDocument);
  if (!injectedStyles) {
    injectedStyles = /* @__PURE__ */ new Set();
    runtime.injectedStyles.set(targetDocument, injectedStyles);
  }
  if (injectedStyles.has(hash)) {
    return;
  }
  if (documentContainsStyleHash(targetDocument, hash)) {
    injectedStyles.add(hash);
    return;
  }
  const style = targetDocument.createElement("style");
  style.setAttribute(STYLE_HASH_ATTRIBUTE, hash);
  style.appendChild(targetDocument.createTextNode(css));
  targetDocument.head.appendChild(style);
  injectedStyles.add(hash);
}
function registerDocument(targetDocument) {
  const runtime = getRuntime();
  runtime.documents.set(
    targetDocument,
    (runtime.documents.get(targetDocument) ?? 0) + 1
  );
  for (const [hash, css] of runtime.styles) {
    injectStyle(targetDocument, hash, css);
  }
  return () => {
    const count = runtime.documents.get(targetDocument);
    if (count === void 0) {
      return;
    }
    if (count <= 1) {
      runtime.documents.delete(targetDocument);
      return;
    }
    runtime.documents.set(targetDocument, count - 1);
  };
}
function registerStyle(hash, css) {
  const runtime = getRuntime();
  runtime.styles.set(hash, css);
  for (const targetDocument of runtime.documents.keys()) {
    injectStyle(targetDocument, hash, css);
  }
}

// packages/ui/src/utils/css/global-css-defense.module.css
if (typeof process === "undefined" || "development" !== "test") {
  registerStyle("af6d9984a6", "._6defc79820e382c6__button{box-sizing:var(--_gcd-button-box-sizing,border-box);font-family:var(--_gcd-button-font-family,inherit);font-size:var(--_gcd-button-font-size,inherit);font-weight:var(--_gcd-button-font-weight,inherit)}.d2cff2e5dea83bd1__input{box-sizing:var(--_gcd-input-box-sizing,border-box);font-family:var(--_gcd-input-font-family,inherit);font-size:var(--_gcd-input-font-size,inherit);font-weight:var(--_gcd-input-font-weight,inherit);margin:var(--_gcd-input-margin,0);&:is(textarea,[type=text],[type=password],[type=color],[type=date],[type=datetime],[type=datetime-local],[type=email],[type=month],[type=number],[type=search],[type=tel],[type=time],[type=url],[type=week]){background-color:var(--_gcd-input-background-color,transparent);border:var(--_gcd-input-border,none);border-radius:var(--_gcd-input-border-radius,0);box-shadow:var(--_gcd-input-box-shadow,0 0 0 transparent);color:var(--_gcd-input-color,var(--wpds-color-foreground-interactive-neutral,#1e1e1e));&:focus{border-color:var(--_gcd-input-border-color-focus,var(--wp-admin-theme-color));box-shadow:var(--_gcd-input-box-shadow-focus,none);outline:var(--_gcd-input-outline-focus,none)}&:disabled{background:var(--_gcd-input-background-disabled,transparent);border-color:var(--_gcd-input-border-color-disabled,transparent);box-shadow:var(--_gcd-input-box-shadow-disabled,none);color:var(--_gcd-input-color-disabled,var(--wpds-color-foreground-interactive-neutral-disabled,#8d8d8d))}&::placeholder{color:var(--_gcd-input-placeholder-color,var(--wpds-color-foreground-interactive-neutral-disabled,#8d8d8d))}}&:is(textarea,[type=text],[type=password],[type=date],[type=datetime],[type=datetime-local],[type=email],[type=month],[type=number],[type=search],[type=tel],[type=time],[type=url],[type=week]){line-height:var(--_gcd-input-line-height,inherit);min-height:var(--_gcd-input-min-height,auto);padding:var(--_gcd-input-padding,0)}}._547d86373d02e108__textarea{box-sizing:var(--_gcd-textarea-box-sizing,border-box);overflow:var(--_gcd-textarea-overflow,auto);resize:var(--_gcd-textarea-resize,block)}._8c15fd0ed9f28ba4__div{outline:var(--_gcd-div-outline,0 solid transparent)}p._43cec3e1eec1066d__p{font-size:var(--_gcd-p-font-size,13px);line-height:var(--_gcd-p-line-height,1.5);margin:var(--_gcd-p-margin,0)}:is(h1,h2,h3,h4,h5,h6).e97669c6d9a38497__heading{color:var(--_gcd-heading-color,var(--wpds-color-foreground-content-neutral,#1e1e1e));font-size:var(--_gcd-heading-font-size,inherit);font-weight:var(--_gcd-heading-font-weight,var(--wpds-typography-font-weight-emphasis,600));margin:var(--_gcd-heading-margin,0)}._2c0831b0499dbd6e__a,._2c0831b0499dbd6e__a:is(:hover,:focus,:active){border-radius:var(--_gcd-a-border-radius,0);box-shadow:var(--_gcd-a-box-shadow,none);color:var(--_gcd-a-color,inherit);outline:var(--_gcd-a-outline,0 solid transparent);transition:var(--_gcd-a-transition,none)}");
}
var global_css_defense_default = { "button": "_6defc79820e382c6__button", "input": "d2cff2e5dea83bd1__input", "textarea": "_547d86373d02e108__textarea", "div": "_8c15fd0ed9f28ba4__div", "p": "_43cec3e1eec1066d__p", "heading": "e97669c6d9a38497__heading", "a": "_2c0831b0499dbd6e__a" };

// packages/ui/src/utils/css/focus.module.scss
if (typeof process === "undefined" || "development" !== "test") {
  registerStyle("2ffedd8246", "@layer wp-ui{@layer utilities, components, compositions, overrides;@layer utilities{._64de9947bf305b7a__outset-ring--focus-within-visible:focus-within:has(:focus-visible),.af79fb116edb0dd7__outset-ring--focus:focus,.dfcfdc28396e5d98__outset-ring--focus-visible:focus-visible,.e5cd9ee879f6403a__outset-ring--focus-within:focus-within,:focus-visible ._81935a08e952f267__outset-ring--focus-parent-visible{--focus-color:var(--wpds-color-stroke-focus,var(--wp-admin-theme-color,#3858e9));--_gcd-a-outline:var(--wpds-border-width-focus,var(--wp-admin-border-width-focus,2px)) solid var(--wpds-color-stroke-focus,var(--wp-admin-theme-color,#3858e9));--_gcd-div-outline:var(--wpds-border-width-focus,var(--wp-admin-border-width-focus,2px)) solid var(--wpds-color-stroke-focus,var(--wp-admin-theme-color,#3858e9));outline:var(--wpds-border-width-focus,var(--wp-admin-border-width-focus,2px)) solid var(--focus-color);outline-offset:var(--wpds-border-width-focus,var(--wp-admin-border-width-focus,2px))}._3c9f5ee9fc9c136d__outset-ring--focus-within-except-active:focus-within,.abc777e9713fa711__outset-ring--focus-except-active:focus{outline:none}._3c9f5ee9fc9c136d__outset-ring--focus-within-except-active:focus-within:not(:has(:active)),.abc777e9713fa711__outset-ring--focus-except-active:focus:not(:active){--focus-color:var(--wpds-color-stroke-focus,var(--wp-admin-theme-color,#3858e9));--_gcd-a-outline:var(--wpds-border-width-focus,var(--wp-admin-border-width-focus,2px)) solid var(--wpds-color-stroke-focus,var(--wp-admin-theme-color,#3858e9));--_gcd-div-outline:var(--wpds-border-width-focus,var(--wp-admin-border-width-focus,2px)) solid var(--wpds-color-stroke-focus,var(--wp-admin-theme-color,#3858e9));outline:var(--wpds-border-width-focus,var(--wp-admin-border-width-focus,2px)) solid var(--focus-color);outline-offset:var(--wpds-border-width-focus,var(--wp-admin-border-width-focus,2px))}}}");
}
var focus_module_default = { "outset-ring--focus": "af79fb116edb0dd7__outset-ring--focus", "outset-ring--focus-visible": "dfcfdc28396e5d98__outset-ring--focus-visible", "outset-ring--focus-within": "e5cd9ee879f6403a__outset-ring--focus-within", "outset-ring--focus-within-visible": "_64de9947bf305b7a__outset-ring--focus-within-visible", "outset-ring--focus-parent-visible": "_81935a08e952f267__outset-ring--focus-parent-visible", "outset-ring--focus-except-active": "abc777e9713fa711__outset-ring--focus-except-active", "outset-ring--focus-within-except-active": "_3c9f5ee9fc9c136d__outset-ring--focus-within-except-active" };

// packages/ui/src/form/primitives/input/style.module.css
if (typeof process === "undefined" || "development" !== "test") {
  registerStyle("41fce05ee0", "@layer wp-ui{@layer utilities, components, compositions, overrides;@layer components{._2ae7be2fc1bb17a3__input{--_gcd-input-padding:var(--wp-ui-input-padding-block,0px) var(--wp-ui-input-layout-padding-inline,0px);background:transparent;border:none;color:var(--wpds-color-foreground-interactive-neutral,#1e1e1e);font-family:inherit;font-size:inherit;line-height:inherit;outline:none;padding-block:var(--wp-ui-input-padding-block,0);padding-inline:var(--wp-ui-input-layout-padding-inline,0);width:100%;&::placeholder{color:var(--wpds-color-foreground-interactive-neutral-disabled,#8d8d8d)}&:disabled,&[aria-disabled=true]{color:var(--wpds-color-foreground-interactive-neutral-disabled,#8d8d8d);@media (forced-colors:active){color:GrayText}}&[type=email],&[type=url]{direction:ltr}&[type=number]{appearance:textfield;&::-webkit-inner-spin-button,&::-webkit-outer-spin-button{appearance:none;margin:0}}}}}");
}
var style_default = { "input": "_2ae7be2fc1bb17a3__input" };

// packages/ui/src/form/primitives/input/input.tsx


var Input = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.forwardRef)(function Input2({ className, size = "default", prefix, suffix, style, ...restProps }, ref) {
  return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(
    _input_layout_index_mjs__WEBPACK_IMPORTED_MODULE_3__.InputLayout,
    {
      className: (0,clsx__WEBPACK_IMPORTED_MODULE_1__["default"])(
        focus_module_default["outset-ring--focus-within"],
        className
      ),
      style,
      size,
      visuallyDisabled: restProps.disabled,
      prefix,
      suffix,
      children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(
        _base_ui_react_input__WEBPACK_IMPORTED_MODULE_0__.Input,
        {
          ref,
          className: (0,clsx__WEBPACK_IMPORTED_MODULE_1__["default"])(global_css_defense_default.input, style_default.input),
          ...restProps
        }
      )
    }
  );
});

//# sourceMappingURL=input.mjs.map


/***/ },

/***/ "./node_modules/@wordpress/ui/build-module/icon/icon.mjs"
/*!***************************************************************!*\
  !*** ./node_modules/@wordpress/ui/build-module/icon/icon.mjs ***!
  \***************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Icon: () => (/* binding */ Icon)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
// packages/ui/src/icon/icon.tsx



var Icon = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(function Icon2({ icon, size = 24, ...restProps }, ref) {
  return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(
    _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.SVG,
    {
      ref,
      ...icon.props,
      ...restProps,
      width: size,
      height: size
    }
  );
});

//# sourceMappingURL=icon.mjs.map


/***/ },

/***/ "./node_modules/@wordpress/ui/build-module/text/text.mjs"
/*!***************************************************************!*\
  !*** ./node_modules/@wordpress/ui/build-module/text/text.mjs ***!
  \***************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Text: () => (/* binding */ Text)
/* harmony export */ });
/* harmony import */ var _base_ui_react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @base-ui/react */ "./node_modules/@base-ui/react/use-render/useRender.mjs");
/* harmony import */ var _base_ui_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @base-ui/react */ "./node_modules/@base-ui/react/merge-props/mergeProps.mjs");
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.mjs");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
// packages/ui/src/text/text.tsx




// packages/style-runtime/src/index.ts
var STYLE_HASH_ATTRIBUTE = "data-wp-hash";
function getRuntime() {
  const globalScope = globalThis;
  if (globalScope.__wpStyleRuntime) {
    return globalScope.__wpStyleRuntime;
  }
  globalScope.__wpStyleRuntime = {
    documents: /* @__PURE__ */ new Map(),
    styles: /* @__PURE__ */ new Map(),
    injectedStyles: /* @__PURE__ */ new WeakMap()
  };
  if (typeof document !== "undefined") {
    registerDocument(document);
  }
  return globalScope.__wpStyleRuntime;
}
function documentContainsStyleHash(targetDocument, hash) {
  if (!targetDocument.head) {
    return false;
  }
  for (const style of targetDocument.head.querySelectorAll(
    `style[${STYLE_HASH_ATTRIBUTE}]`
  )) {
    if (style.getAttribute(STYLE_HASH_ATTRIBUTE) === hash) {
      return true;
    }
  }
  return false;
}
function injectStyle(targetDocument, hash, css) {
  if (!targetDocument.head) {
    return;
  }
  const runtime = getRuntime();
  let injectedStyles = runtime.injectedStyles.get(targetDocument);
  if (!injectedStyles) {
    injectedStyles = /* @__PURE__ */ new Set();
    runtime.injectedStyles.set(targetDocument, injectedStyles);
  }
  if (injectedStyles.has(hash)) {
    return;
  }
  if (documentContainsStyleHash(targetDocument, hash)) {
    injectedStyles.add(hash);
    return;
  }
  const style = targetDocument.createElement("style");
  style.setAttribute(STYLE_HASH_ATTRIBUTE, hash);
  style.appendChild(targetDocument.createTextNode(css));
  targetDocument.head.appendChild(style);
  injectedStyles.add(hash);
}
function registerDocument(targetDocument) {
  const runtime = getRuntime();
  runtime.documents.set(
    targetDocument,
    (runtime.documents.get(targetDocument) ?? 0) + 1
  );
  for (const [hash, css] of runtime.styles) {
    injectStyle(targetDocument, hash, css);
  }
  return () => {
    const count = runtime.documents.get(targetDocument);
    if (count === void 0) {
      return;
    }
    if (count <= 1) {
      runtime.documents.delete(targetDocument);
      return;
    }
    runtime.documents.set(targetDocument, count - 1);
  };
}
function registerStyle(hash, css) {
  const runtime = getRuntime();
  runtime.styles.set(hash, css);
  for (const targetDocument of runtime.documents.keys()) {
    injectStyle(targetDocument, hash, css);
  }
}

// packages/ui/src/text/style.module.css
if (typeof process === "undefined" || "development" !== "test") {
  registerStyle("a495f9d138", '@layer wp-ui{@layer utilities, components, compositions, overrides;@layer components{._83ed8a8da5dd50ea__text{margin:0}._14437cfb77831647__heading-2xl{--_gcd-heading-font-size:var(--wpds-typography-font-size-2xl,32px);--_gcd-heading-font-weight:var(--wpds-typography-font-weight-emphasis,600);--_gcd-p-font-size:var(--wpds-typography-font-size-2xl,32px);--_gcd-p-line-height:var(--wpds-typography-line-height-2xl,40px);font-size:var(--wpds-typography-font-size-2xl,32px);line-height:var(--wpds-typography-line-height-2xl,40px)}._14437cfb77831647__heading-2xl,._3c78b7fa9b4072dd__heading-xl{font-family:var(--wpds-typography-font-family-heading,-apple-system,system-ui,"Segoe UI","Roboto","Oxygen-Sans","Ubuntu","Cantarell","Helvetica Neue",sans-serif);font-weight:var(--wpds-typography-font-weight-emphasis,600)}._3c78b7fa9b4072dd__heading-xl{--_gcd-heading-font-size:var(--wpds-typography-font-size-xl,20px);--_gcd-heading-font-weight:var(--wpds-typography-font-weight-emphasis,600);--_gcd-p-font-size:var(--wpds-typography-font-size-xl,20px);--_gcd-p-line-height:var(--wpds-typography-line-height-md,24px);font-size:var(--wpds-typography-font-size-xl,20px);line-height:var(--wpds-typography-line-height-md,24px)}.aa58f227716bcde2__heading-lg{--_gcd-heading-font-size:var(--wpds-typography-font-size-lg,15px);--_gcd-heading-font-weight:var(--wpds-typography-font-weight-emphasis,600);--_gcd-p-font-size:var(--wpds-typography-font-size-lg,15px);--_gcd-p-line-height:var(--wpds-typography-line-height-sm,20px);font-size:var(--wpds-typography-font-size-lg,15px)}.aa58f227716bcde2__heading-lg,.fc4da56d8dfe52c4__heading-md{font-family:var(--wpds-typography-font-family-heading,-apple-system,system-ui,"Segoe UI","Roboto","Oxygen-Sans","Ubuntu","Cantarell","Helvetica Neue",sans-serif);font-weight:var(--wpds-typography-font-weight-emphasis,600);line-height:var(--wpds-typography-line-height-sm,20px)}.fc4da56d8dfe52c4__heading-md{--_gcd-heading-font-size:var(--wpds-typography-font-size-md,13px);--_gcd-heading-font-weight:var(--wpds-typography-font-weight-emphasis,600);--_gcd-p-font-size:var(--wpds-typography-font-size-md,13px);--_gcd-p-line-height:var(--wpds-typography-line-height-sm,20px);font-size:var(--wpds-typography-font-size-md,13px)}.a9b78c7c82e8dff7__heading-sm{--_gcd-heading-font-size:var(--wpds-typography-font-size-xs,11px);--_gcd-heading-font-weight:var(--wpds-typography-font-weight-emphasis,600);--_gcd-p-font-size:var(--wpds-typography-font-size-xs,11px);--_gcd-p-line-height:var(--wpds-typography-line-height-xs,16px);font-family:var(--wpds-typography-font-family-heading,-apple-system,system-ui,"Segoe UI","Roboto","Oxygen-Sans","Ubuntu","Cantarell","Helvetica Neue",sans-serif);font-size:var(--wpds-typography-font-size-xs,11px);font-weight:var(--wpds-typography-font-weight-emphasis,600);line-height:var(--wpds-typography-line-height-xs,16px);text-transform:uppercase}._305ff559e52180d5__body-xl{--_gcd-heading-font-size:var(--wpds-typography-font-size-xl,20px);--_gcd-heading-font-weight:var(--wpds-typography-font-weight-default,400);--_gcd-p-font-size:var(--wpds-typography-font-size-xl,20px);--_gcd-p-line-height:var(--wpds-typography-line-height-xl,32px);font-size:var(--wpds-typography-font-size-xl,20px);line-height:var(--wpds-typography-line-height-xl,32px)}._305ff559e52180d5__body-xl,.ca1aa3fc2029e958__body-lg{font-family:var(--wpds-typography-font-family-body,-apple-system,system-ui,"Segoe UI","Roboto","Oxygen-Sans","Ubuntu","Cantarell","Helvetica Neue",sans-serif);font-weight:var(--wpds-typography-font-weight-default,400)}.ca1aa3fc2029e958__body-lg{--_gcd-heading-font-size:var(--wpds-typography-font-size-lg,15px);--_gcd-heading-font-weight:var(--wpds-typography-font-weight-default,400);--_gcd-p-font-size:var(--wpds-typography-font-size-lg,15px);--_gcd-p-line-height:var(--wpds-typography-line-height-md,24px);font-size:var(--wpds-typography-font-size-lg,15px);line-height:var(--wpds-typography-line-height-md,24px)}._131101940be12424__body-md{--_gcd-heading-font-size:var(--wpds-typography-font-size-md,13px);--_gcd-heading-font-weight:var(--wpds-typography-font-weight-default,400);--_gcd-p-font-size:var(--wpds-typography-font-size-md,13px);--_gcd-p-line-height:var(--wpds-typography-line-height-sm,20px);font-size:var(--wpds-typography-font-size-md,13px);line-height:var(--wpds-typography-line-height-sm,20px)}._0e8d87a42c1f75fa__body-sm,._131101940be12424__body-md{font-family:var(--wpds-typography-font-family-body,-apple-system,system-ui,"Segoe UI","Roboto","Oxygen-Sans","Ubuntu","Cantarell","Helvetica Neue",sans-serif);font-weight:var(--wpds-typography-font-weight-default,400)}._0e8d87a42c1f75fa__body-sm{--_gcd-heading-font-size:var(--wpds-typography-font-size-sm,12px);--_gcd-heading-font-weight:var(--wpds-typography-font-weight-default,400);--_gcd-p-font-size:var(--wpds-typography-font-size-sm,12px);--_gcd-p-line-height:var(--wpds-typography-line-height-xs,16px);font-size:var(--wpds-typography-font-size-sm,12px);line-height:var(--wpds-typography-line-height-xs,16px)}}}');
}
var style_default = { "text": "_83ed8a8da5dd50ea__text", "heading-2xl": "_14437cfb77831647__heading-2xl", "heading-xl": "_3c78b7fa9b4072dd__heading-xl", "heading-lg": "aa58f227716bcde2__heading-lg", "heading-md": "fc4da56d8dfe52c4__heading-md", "heading-sm": "a9b78c7c82e8dff7__heading-sm", "body-xl": "_305ff559e52180d5__body-xl", "body-lg": "ca1aa3fc2029e958__body-lg", "body-md": "_131101940be12424__body-md", "body-sm": "_0e8d87a42c1f75fa__body-sm" };

// packages/ui/src/utils/css/global-css-defense.module.css
if (typeof process === "undefined" || "development" !== "test") {
  registerStyle("af6d9984a6", "._6defc79820e382c6__button{box-sizing:var(--_gcd-button-box-sizing,border-box);font-family:var(--_gcd-button-font-family,inherit);font-size:var(--_gcd-button-font-size,inherit);font-weight:var(--_gcd-button-font-weight,inherit)}.d2cff2e5dea83bd1__input{box-sizing:var(--_gcd-input-box-sizing,border-box);font-family:var(--_gcd-input-font-family,inherit);font-size:var(--_gcd-input-font-size,inherit);font-weight:var(--_gcd-input-font-weight,inherit);margin:var(--_gcd-input-margin,0);&:is(textarea,[type=text],[type=password],[type=color],[type=date],[type=datetime],[type=datetime-local],[type=email],[type=month],[type=number],[type=search],[type=tel],[type=time],[type=url],[type=week]){background-color:var(--_gcd-input-background-color,transparent);border:var(--_gcd-input-border,none);border-radius:var(--_gcd-input-border-radius,0);box-shadow:var(--_gcd-input-box-shadow,0 0 0 transparent);color:var(--_gcd-input-color,var(--wpds-color-foreground-interactive-neutral,#1e1e1e));&:focus{border-color:var(--_gcd-input-border-color-focus,var(--wp-admin-theme-color));box-shadow:var(--_gcd-input-box-shadow-focus,none);outline:var(--_gcd-input-outline-focus,none)}&:disabled{background:var(--_gcd-input-background-disabled,transparent);border-color:var(--_gcd-input-border-color-disabled,transparent);box-shadow:var(--_gcd-input-box-shadow-disabled,none);color:var(--_gcd-input-color-disabled,var(--wpds-color-foreground-interactive-neutral-disabled,#8d8d8d))}&::placeholder{color:var(--_gcd-input-placeholder-color,var(--wpds-color-foreground-interactive-neutral-disabled,#8d8d8d))}}&:is(textarea,[type=text],[type=password],[type=date],[type=datetime],[type=datetime-local],[type=email],[type=month],[type=number],[type=search],[type=tel],[type=time],[type=url],[type=week]){line-height:var(--_gcd-input-line-height,inherit);min-height:var(--_gcd-input-min-height,auto);padding:var(--_gcd-input-padding,0)}}._547d86373d02e108__textarea{box-sizing:var(--_gcd-textarea-box-sizing,border-box);overflow:var(--_gcd-textarea-overflow,auto);resize:var(--_gcd-textarea-resize,block)}._8c15fd0ed9f28ba4__div{outline:var(--_gcd-div-outline,0 solid transparent)}p._43cec3e1eec1066d__p{font-size:var(--_gcd-p-font-size,13px);line-height:var(--_gcd-p-line-height,1.5);margin:var(--_gcd-p-margin,0)}:is(h1,h2,h3,h4,h5,h6).e97669c6d9a38497__heading{color:var(--_gcd-heading-color,var(--wpds-color-foreground-content-neutral,#1e1e1e));font-size:var(--_gcd-heading-font-size,inherit);font-weight:var(--_gcd-heading-font-weight,var(--wpds-typography-font-weight-emphasis,600));margin:var(--_gcd-heading-margin,0)}._2c0831b0499dbd6e__a,._2c0831b0499dbd6e__a:is(:hover,:focus,:active){border-radius:var(--_gcd-a-border-radius,0);box-shadow:var(--_gcd-a-box-shadow,none);color:var(--_gcd-a-color,inherit);outline:var(--_gcd-a-outline,0 solid transparent);transition:var(--_gcd-a-transition,none)}");
}
var global_css_defense_default = { "button": "_6defc79820e382c6__button", "input": "d2cff2e5dea83bd1__input", "textarea": "_547d86373d02e108__textarea", "div": "_8c15fd0ed9f28ba4__div", "p": "_43cec3e1eec1066d__p", "heading": "e97669c6d9a38497__heading", "a": "_2c0831b0499dbd6e__a" };

// packages/ui/src/text/text.tsx
var Text = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.forwardRef)(function Text2({ variant = "body-md", render, className, ...props }, ref) {
  const element = (0,_base_ui_react__WEBPACK_IMPORTED_MODULE_0__.useRender)({
    render,
    defaultTagName: "span",
    ref,
    props: (0,_base_ui_react__WEBPACK_IMPORTED_MODULE_1__.mergeProps)(props, {
      className: (0,clsx__WEBPACK_IMPORTED_MODULE_2__["default"])(
        style_default.text,
        global_css_defense_default.heading,
        global_css_defense_default.p,
        style_default[variant],
        className
      )
    })
  });
  return element;
});

//# sourceMappingURL=text.mjs.map


/***/ },

/***/ "./node_modules/clsx/dist/clsx.mjs"
/*!*****************************************!*\
  !*** ./node_modules/clsx/dist/clsx.mjs ***!
  \*****************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   clsx: () => (/* binding */ clsx),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function r(e){var t,f,n="";if("string"==typeof e||"number"==typeof e)n+=e;else if("object"==typeof e)if(Array.isArray(e)){var o=e.length;for(t=0;t<o;t++)e[t]&&(f=r(e[t]))&&(n&&(n+=" "),n+=f)}else for(f in e)e[f]&&(n&&(n+=" "),n+=f);return n}function clsx(){for(var e,t,f=0,n="",o=arguments.length;f<o;f++)(e=arguments[f])&&(t=r(e))&&(n&&(n+=" "),n+=t);return n}/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (clsx);

/***/ },

/***/ "./node_modules/react-hook-form/dist/index.esm.mjs"
/*!*********************************************************!*\
  !*** ./node_modules/react-hook-form/dist/index.esm.mjs ***!
  \*********************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Controller: () => (/* binding */ Controller),
/* harmony export */   FieldArray: () => (/* binding */ FieldArray),
/* harmony export */   Form: () => (/* binding */ Form),
/* harmony export */   FormProvider: () => (/* binding */ FormProvider),
/* harmony export */   FormState: () => (/* binding */ FormState),
/* harmony export */   FormStateSubscribe: () => (/* binding */ FormStateSubscribe),
/* harmony export */   Watch: () => (/* binding */ Watch),
/* harmony export */   appendErrors: () => (/* binding */ appendErrors),
/* harmony export */   createFormControl: () => (/* binding */ createFormControl),
/* harmony export */   get: () => (/* binding */ get),
/* harmony export */   set: () => (/* binding */ set),
/* harmony export */   useController: () => (/* binding */ useController),
/* harmony export */   useFieldArray: () => (/* binding */ useFieldArray),
/* harmony export */   useForm: () => (/* binding */ useForm),
/* harmony export */   useFormContext: () => (/* binding */ useFormContext),
/* harmony export */   useFormState: () => (/* binding */ useFormState),
/* harmony export */   useWatch: () => (/* binding */ useWatch)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");


var isCheckBoxInput = (element) => element.type === 'checkbox';

var isFileInput = (element) => element.type === 'file';

var isDateObject = (value) => value instanceof Date;

var isNullOrUndefined = (value) => value == null;

const isObjectType = (value) => typeof value === 'object';
var isObject = (value) => !isNullOrUndefined(value) &&
    !Array.isArray(value) &&
    isObjectType(value) &&
    !isDateObject(value);

var getEventValue = (event) => isObject(event) && event.target
    ? isCheckBoxInput(event.target)
        ? event.target.checked
        : isFileInput(event.target)
            ? event.target.files
            : event.target.value
    : event;

var isNameInFieldArray = (names, name) => name
    .split('.')
    .some((part, index, arr) => !isNaN(Number(part)) && names.has(arr.slice(0, index).join('.')));

var isWeb = typeof window !== 'undefined' &&
    typeof window.HTMLElement !== 'undefined' &&
    typeof document !== 'undefined';

function cloneObject(data) {
    if (data === null || typeof data !== 'object') {
        return data;
    }
    if (data instanceof Date) {
        return new Date(data);
    }
    const isFileListInstance = typeof FileList !== 'undefined' && data instanceof FileList;
    if (isWeb && (data instanceof Blob || isFileListInstance)) {
        return data;
    }
    const isArray = Array.isArray(data);
    if (!isArray && data.constructor !== Object) {
        return data;
    }
    const copy = isArray ? [] : Object.create(Object.getPrototypeOf(data));
    for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
            copy[key] = cloneObject(data[key]);
        }
    }
    return copy;
}

const EVENTS = {
    BLUR: 'blur',
    FOCUS_OUT: 'focusout',
    CHANGE: 'change',
    SUBMIT: 'submit',
    TRIGGER: 'trigger',
    VALID: 'valid',
};
const VALIDATION_MODE = {
    onBlur: 'onBlur',
    onChange: 'onChange',
    onSubmit: 'onSubmit',
    onTouched: 'onTouched',
    all: 'all',
};
const INPUT_VALIDATION_RULES = {
    max: 'max',
    min: 'min',
    maxLength: 'maxLength',
    minLength: 'minLength',
    pattern: 'pattern',
    required: 'required',
    validate: 'validate',
};
const ROOT_ERROR_TYPE = 'root';
const PROTOTYPE_KEYWORDS = ['__proto__', 'constructor', 'prototype'];

const IS_KEY_RE = /^\w*$/;
var isKey = (value) => IS_KEY_RE.test(value);

var isUndefined = (val) => val === undefined;

const FIELD_PATH_RE = /[.[\]'"]/;
var stringToPath = (input) => input.split(FIELD_PATH_RE).filter(Boolean);

var get = (object, path, defaultValue) => {
    if (!path || !isObject(object)) {
        return defaultValue;
    }
    const paths = isKey(path) ? [path] : stringToPath(path);
    if (paths.some((key) => PROTOTYPE_KEYWORDS.includes(key))) {
        return defaultValue;
    }
    const result = paths.reduce((result, key) => {
        return isNullOrUndefined(result) ? undefined : result[key];
    }, object);
    return isUndefined(result) || result === object
        ? isUndefined(object[path])
            ? defaultValue
            : object[path]
        : result;
};

var isBoolean = (value) => typeof value === 'boolean';

var isFunction = (value) => typeof value === 'function';

var set = (object, path, value) => {
    let index = -1;
    const tempPath = isKey(path) ? [path] : stringToPath(path);
    const length = tempPath.length;
    const lastIndex = length - 1;
    while (++index < length) {
        const key = tempPath[index];
        let newValue = value;
        if (index !== lastIndex) {
            const objValue = object[key];
            newValue =
                isObject(objValue) || Array.isArray(objValue)
                    ? objValue
                    : !isNaN(+tempPath[index + 1])
                        ? []
                        : {};
        }
        if (PROTOTYPE_KEYWORDS.includes(key)) {
            return;
        }
        object[key] = newValue;
        object = object[key];
    }
};

/**
 * Separate context for `control` to prevent unnecessary rerenders.
 * Internal hooks that only need control use this instead of full form context.
 */
const HookFormControlContext = react__WEBPACK_IMPORTED_MODULE_0__.createContext(null);
HookFormControlContext.displayName = 'HookFormControlContext';
/**
 * @internal Internal hook to access only control from context.
 */
const useFormControlContext = () => react__WEBPACK_IMPORTED_MODULE_0__.useContext(HookFormControlContext);

var getProxyFormState = (formState, control, localProxyFormState, isRoot = true) => {
    const result = {};
    for (const key in formState) {
        Object.defineProperty(result, key, {
            get: () => {
                const _key = key;
                if (control._proxyFormState[_key] !== VALIDATION_MODE.all) {
                    control._proxyFormState[_key] = !isRoot || VALIDATION_MODE.all;
                }
                localProxyFormState && (localProxyFormState[_key] = true);
                return formState[_key];
            },
        });
    }
    return result;
};

const useIsomorphicLayoutEffect = isWeb
    ? react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect
    : react__WEBPACK_IMPORTED_MODULE_0__.useEffect;

var isPlainObject = (tempObject) => {
    const prototypeCopy = tempObject.constructor && tempObject.constructor.prototype;
    return (isObject(prototypeCopy) && prototypeCopy.hasOwnProperty('isPrototypeOf'));
};

var isPrimitive = (value) => isNullOrUndefined(value) || !isObjectType(value);

const isEmptyObjectWithCustomPrototype = (object, keys) => keys.length === 0 && !Array.isArray(object) && !isPlainObject(object);
function deepEqual(object1, object2, visited = new WeakMap()) {
    if (object1 === object2) {
        return true;
    }
    if (isPrimitive(object1) || isPrimitive(object2)) {
        return Object.is(object1, object2);
    }
    if (isDateObject(object1) && isDateObject(object2)) {
        return Object.is(object1.getTime(), object2.getTime());
    }
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);
    if (keys1.length !== keys2.length) {
        return false;
    }
    if (isEmptyObjectWithCustomPrototype(object1, keys1) ||
        isEmptyObjectWithCustomPrototype(object2, keys2)) {
        return Object.is(object1, object2);
    }
    if (!keys1.length && Array.isArray(object1) !== Array.isArray(object2)) {
        return false;
    }
    const visitedPairs = visited.get(object1);
    if (visitedPairs && visitedPairs.has(object2)) {
        return true;
    }
    if (visitedPairs) {
        visitedPairs.add(object2);
    }
    else {
        const ws = new WeakSet();
        ws.add(object2);
        visited.set(object1, ws);
    }
    for (const key of keys1) {
        const val1 = object1[key];
        if (!(key in object2)) {
            return false;
        }
        if (key !== 'ref') {
            const val2 = object2[key];
            if ((isDateObject(val1) && isDateObject(val2)) ||
                ((isObject(val1) || Array.isArray(val1)) &&
                    (isObject(val2) || Array.isArray(val2)))
                ? !deepEqual(val1, val2, visited)
                : !Object.is(val1, val2)) {
                return false;
            }
        }
    }
    return true;
}

function useResyncOnReconnect() {
    const _connected = react__WEBPACK_IMPORTED_MODULE_0__.useRef(false);
    const _prevValue = react__WEBPACK_IMPORTED_MODULE_0__.useRef(undefined);
    const resyncIfNeeded = react__WEBPACK_IMPORTED_MODULE_0__.useCallback((enabled, getCurrentValue, setValue) => {
        if (enabled && _connected.current) {
            const currentValue = getCurrentValue();
            if (!deepEqual(_prevValue.current, currentValue)) {
                setValue(currentValue);
            }
        }
        _connected.current = true;
    }, []);
    const snapshot = react__WEBPACK_IMPORTED_MODULE_0__.useCallback((enabled, getCurrentValue) => {
        if (enabled) {
            _prevValue.current = cloneObject(getCurrentValue());
        }
    }, []);
    return { resyncIfNeeded, snapshot };
}

/**
 * Subscribes to each form state and isolates re-renders at the custom hook level. It has its own scope for form state subscriptions, so it will not affect other useFormState or useForm instances. Using this hook can reduce the re-render impact on large and complex form applications.
 *
 * @remarks
 * [API](https://react-hook-form.com/docs/useformstate) • [Demo](https://codesandbox.io/s/useformstate-75xly)
 *
 * @param props - Include options to specify fields to subscribe to. {@link UseFormStateReturn}
 *
 * @example
 * ```tsx
 * function App() {
 *   const { register, handleSubmit, control } = useForm({
 *     defaultValues: {
 *     firstName: "firstName"
 *   }});
 *   const { dirtyFields } = useFormState({
 *     control
 *   });
 *   const onSubmit = (data) => console.log(data);
 *
 *   return (
 *     <form onSubmit={handleSubmit(onSubmit)}>
 *       <input {...register("firstName")} placeholder="First Name" />
 *       {dirtyFields.firstName && <p>Field is dirty.</p>}
 *       <input type="submit" />
 *     </form>
 *   );
 * }
 * ```
 */
function useFormState(props) {
    const formControl = useFormControlContext();
    const { control = formControl, disabled, name, exact } = props || {};
    const [formState, updateFormState] = react__WEBPACK_IMPORTED_MODULE_0__.useState(() => ({
        ...control._formState,
        defaultValues: control._defaultValues,
    }));
    const _localProxyFormState = react__WEBPACK_IMPORTED_MODULE_0__.useRef({
        isDirty: false,
        isLoading: false,
        dirtyFields: false,
        touchedFields: false,
        validatingFields: false,
        isValidating: false,
        isValid: false,
        errors: false,
    });
    const { resyncIfNeeded, snapshot } = useResyncOnReconnect();
    useIsomorphicLayoutEffect(() => {
        const getCurrentFormState = () => ({
            ...control._formState,
            defaultValues: control._defaultValues,
        });
        resyncIfNeeded(!disabled, getCurrentFormState, updateFormState);
        const unsubscribe = control._subscribe({
            name,
            formState: _localProxyFormState.current,
            exact,
            callback: (formState) => {
                !disabled &&
                    updateFormState({
                        ...control._formState,
                        ...formState,
                        defaultValues: control._defaultValues,
                    });
            },
        });
        return () => {
            unsubscribe();
            snapshot(!disabled, getCurrentFormState);
        };
    }, [name, disabled, exact, resyncIfNeeded, snapshot]);
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
        _localProxyFormState.current.isValid && control._setValid(true);
    }, [control]);
    return react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => getProxyFormState(formState, control, _localProxyFormState.current, false), [formState, control]);
}

var isString = (value) => typeof value === 'string';

var generateWatchOutput = (names, _names, formValues, isGlobal, defaultValue) => {
    if (isString(names)) {
        isGlobal && _names.watch.add(names);
        return get(formValues, names, defaultValue);
    }
    if (Array.isArray(names)) {
        return names.map((fieldName) => (isGlobal && _names.watch.add(fieldName),
            get(formValues, fieldName)));
    }
    isGlobal && (_names.watchAll = true);
    return formValues;
};

/**
 * Custom hook to subscribe to field changes and isolate re-rendering at the component level.
 *
 * @remarks
 *
 * [API](https://react-hook-form.com/docs/usewatch) • [Demo](https://codesandbox.io/s/react-hook-form-v7-ts-usewatch-h9i5e)
 *
 * @example
 * ```tsx
 * const { control } = useForm();
 * const values = useWatch({
 *   name: "fieldName",
 *   control,
 * })
 * ```
 */
function useWatch(props) {
    const formControl = useFormControlContext();
    const { control = formControl, name, defaultValue, disabled, exact, compute, } = props || {};
    const _defaultValue = react__WEBPACK_IMPORTED_MODULE_0__.useRef(defaultValue);
    const _compute = react__WEBPACK_IMPORTED_MODULE_0__.useRef(compute);
    const _computeFormValues = react__WEBPACK_IMPORTED_MODULE_0__.useRef(undefined);
    const _prevControl = react__WEBPACK_IMPORTED_MODULE_0__.useRef(control);
    const _prevName = react__WEBPACK_IMPORTED_MODULE_0__.useRef(name);
    _compute.current = compute;
    const [value, updateValue] = react__WEBPACK_IMPORTED_MODULE_0__.useState(() => {
        const defaultValue = control._getWatch(name, _defaultValue.current);
        return _compute.current ? _compute.current(defaultValue) : defaultValue;
    });
    const getCurrentOutput = react__WEBPACK_IMPORTED_MODULE_0__.useCallback((values) => {
        const formValues = generateWatchOutput(name, control._names, values || control._formValues, false, _defaultValue.current);
        return _compute.current ? _compute.current(formValues) : formValues;
    }, [control._formValues, control._names, name]);
    const refreshValue = react__WEBPACK_IMPORTED_MODULE_0__.useCallback((values) => {
        if (!disabled) {
            const formValues = generateWatchOutput(name, control._names, values || control._formValues, false, _defaultValue.current);
            if (_compute.current) {
                const computedFormValues = _compute.current(formValues);
                if (!deepEqual(computedFormValues, _computeFormValues.current)) {
                    updateValue(computedFormValues);
                    _computeFormValues.current = computedFormValues;
                }
            }
            else {
                updateValue(formValues);
            }
        }
    }, [control._formValues, control._names, disabled, name]);
    const { resyncIfNeeded, snapshot } = useResyncOnReconnect();
    const _refreshValue = react__WEBPACK_IMPORTED_MODULE_0__.useRef(refreshValue);
    _refreshValue.current = refreshValue;
    const _getCurrentOutput = react__WEBPACK_IMPORTED_MODULE_0__.useRef(getCurrentOutput);
    _getCurrentOutput.current = getCurrentOutput;
    useIsomorphicLayoutEffect(() => {
        if (_prevControl.current !== control ||
            !deepEqual(_prevName.current, name)) {
            _prevControl.current = control;
            _prevName.current = name;
            _refreshValue.current();
        }
        else {
            resyncIfNeeded(!disabled, () => _getCurrentOutput.current(), (currentValue) => {
                updateValue(currentValue);
                _computeFormValues.current = currentValue;
            });
        }
        const unsubscribe = control._subscribe({
            name,
            formState: {
                values: true,
            },
            exact,
            callback: (formState) => {
                _refreshValue.current(formState.values);
            },
        });
        return () => {
            unsubscribe();
            snapshot(!disabled, () => _getCurrentOutput.current());
        };
    }, [control, exact, name, disabled, resyncIfNeeded, snapshot]);
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => control._removeUnmounted());
    // If name or control changed for this render, synchronously reflect the
    // latest value so callers (like useController) see the correct value
    // immediately on the same render.
    // Optimize: Check control reference first before expensive deepEqual
    const controlChanged = _prevControl.current !== control;
    const prevName = _prevName.current;
    // `null`/`undefined` are valid watched values, so a boolean flag (rather
    // than a sentinel return value) decides whether to return the freshly
    // computed output instead of the possibly-stale state value.
    const shouldReturnImmediate = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => {
        if (disabled) {
            return false;
        }
        const nameChanged = !controlChanged && !deepEqual(prevName, name);
        return controlChanged || nameChanged;
    }, [disabled, controlChanged, name, prevName]);
    return shouldReturnImmediate ? getCurrentOutput() : value;
}

/**
 * Custom hook to work with controlled component, this function provide you with both form and field level state. Re-render is isolated at the hook level.
 *
 * @remarks
 * [API](https://react-hook-form.com/docs/usecontroller) • [Demo](https://codesandbox.io/s/usecontroller-0o8px)
 *
 * @param props - the path name to the form field value, and validation rules.
 *
 * @returns field properties, field and form state. {@link UseControllerReturn}
 *
 * @example
 * ```tsx
 * function Input(props) {
 *   const { field, fieldState, formState } = useController(props);
 *   return (
 *     <div>
 *       <input {...field} placeholder={props.name} />
 *       <p>{fieldState.isTouched && "Touched"}</p>
 *       <p>{formState.isSubmitted ? "submitted" : ""}</p>
 *     </div>
 *   );
 * }
 * ```
 */
function useController(props) {
    const formControl = useFormControlContext();
    const { name, disabled, control = formControl, shouldUnregister, defaultValue, exact = true, } = props;
    const isArrayField = isNameInFieldArray(control._names.array, name);
    const defaultValueMemo = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => get(control._formValues, name, get(control._defaultValues, name, defaultValue)), [control, name, defaultValue]);
    const value = useWatch({
        control,
        name,
        defaultValue: defaultValueMemo,
        exact,
    });
    const formState = useFormState({
        control,
        name,
        exact,
    });
    const _props = react__WEBPACK_IMPORTED_MODULE_0__.useRef(props);
    const _proxyRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
    const _registerProps = react__WEBPACK_IMPORTED_MODULE_0__.useRef(control.register(name, {
        ...props.rules,
        value,
        ...(isBoolean(props.disabled) ? { disabled: props.disabled } : {}),
    }));
    _props.current = props;
    const fieldState = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => Object.defineProperties({}, {
        invalid: {
            enumerable: true,
            get: () => !!get(formState.errors, name),
        },
        isDirty: {
            enumerable: true,
            get: () => !!get(formState.dirtyFields, name),
        },
        isTouched: {
            enumerable: true,
            get: () => !!get(formState.touchedFields, name),
        },
        isValidating: {
            enumerable: true,
            get: () => !!get(formState.validatingFields, name),
        },
        error: {
            enumerable: true,
            get: () => get(formState.errors, name),
        },
    }), [formState, name]);
    const onChange = react__WEBPACK_IMPORTED_MODULE_0__.useCallback((event) => {
        const value = getEventValue(event);
        if (!get(control._fields, name)) {
            _registerProps.current = control.register(name, {
                ..._props.current.rules,
                value,
            });
        }
        return _registerProps.current.onChange({
            target: {
                value: getEventValue(event),
                name: name,
            },
            type: EVENTS.CHANGE,
        });
    }, [name, control]);
    const onBlur = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(() => _registerProps.current.onBlur({
        target: {
            value: get(control._formValues, name),
            name: name,
        },
        type: EVENTS.BLUR,
    }), [name, control._formValues]);
    const ref = react__WEBPACK_IMPORTED_MODULE_0__.useCallback((elm) => {
        if (elm) {
            _proxyRef.current = {
                focus: () => isFunction(elm.focus) && elm.focus(),
                select: () => isFunction(elm.select) && elm.select(),
                setCustomValidity: (message) => isFunction(elm.setCustomValidity) && elm.setCustomValidity(message),
                reportValidity: () => isFunction(elm.reportValidity) && elm.reportValidity(),
            };
        }
        const field = get(control._fields, name);
        if (field && field._f && elm) {
            field._f.ref = _proxyRef.current;
        }
    }, [control._fields, name]);
    const field = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => ({
        name,
        value,
        ...(isBoolean(disabled) || formState.disabled
            ? { disabled: formState.disabled || disabled }
            : {}),
        onChange,
        onBlur,
        ref,
    }), [name, disabled, formState.disabled, onChange, onBlur, ref, value]);
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
        const _shouldUnregisterField = control._options.shouldUnregister || shouldUnregister;
        _registerProps.current = control.register(name, {
            ..._props.current.rules,
            ...(isBoolean(_props.current.disabled)
                ? { disabled: _props.current.disabled }
                : {}),
        });
        const updateMounted = (name, value) => {
            const field = get(control._fields, name);
            if (field && field._f) {
                field._f.mount = value;
            }
        };
        updateMounted(name, true);
        if (_shouldUnregisterField) {
            const value = cloneObject(get(shouldUnregister
                ? control._defaultValues
                : control._options.values || control._defaultValues, name, get(control._options.defaultValues, name, _props.current.defaultValue)));
            set(control._defaultValues, name, value);
            if (isUndefined(get(control._formValues, name))) {
                set(control._formValues, name, value);
            }
        }
        !isArrayField && control.register(name);
        if (_proxyRef.current) {
            const field = get(control._fields, name);
            if (field && field._f) {
                field._f.ref = _proxyRef.current;
            }
        }
        return () => {
            (isArrayField
                ? _shouldUnregisterField && !control._state.action
                : _shouldUnregisterField)
                ? control.unregister(name)
                : updateMounted(name, false);
        };
    }, [name, control, isArrayField, shouldUnregister]);
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
        control._setDisabledField({
            disabled,
            name,
        });
    }, [disabled, name, control]);
    return react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => ({
        field,
        formState,
        fieldState,
    }), [field, formState, fieldState]);
}

/**
 * Component based on `useController` hook to work with controlled component.
 *
 * @remarks
 * [API](https://react-hook-form.com/docs/usecontroller/controller) • [Demo](https://codesandbox.io/s/react-hook-form-v6-controller-ts-jwyzw) • [Video](https://www.youtube.com/watch?v=N2UNk_UCVyA)
 *
 * @param props - the path name to the form field value, and validation rules.
 *
 * @returns provide field handler functions, field and form state.
 *
 * @example
 * ```tsx
 * function App() {
 *   const { control } = useForm<FormValues>({
 *     defaultValues: {
 *       test: ""
 *     }
 *   });
 *
 *   return (
 *     <form>
 *       <Controller
 *         control={control}
 *         name="test"
 *         render={({ field: { onChange, onBlur, value, ref }, formState, fieldState }) => (
 *           <>
 *             <input
 *               onChange={onChange} // send value to hook form
 *               onBlur={onBlur} // notify when input is touched
 *               value={value} // return updated value
 *               ref={ref} // set ref for focus management
 *             />
 *             <p>{formState.isSubmitted ? "submitted" : ""}</p>
 *             <p>{fieldState.isTouched ? "touched" : ""}</p>
 *           </>
 *         )}
 *       />
 *     </form>
 *   );
 * }
 * ```
 */
const Controller = (props) => props.render(useController(props));

var generateId = () => typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
    });

var getFocusFieldName = (name, index, options = {}) => options.shouldFocus || isUndefined(options.shouldFocus)
    ? options.focusName ||
        `${name}.${isUndefined(options.focusIndex) ? index : options.focusIndex}.`
    : '';

var getValidationModes = (mode) => ({
    isOnSubmit: !mode || mode === VALIDATION_MODE.onSubmit,
    isOnBlur: mode === VALIDATION_MODE.onBlur,
    isOnChange: mode === VALIDATION_MODE.onChange,
    isOnAll: mode === VALIDATION_MODE.all,
    isOnTouch: mode === VALIDATION_MODE.onTouched,
});

var isWatched = (name, _names, isBlurEvent) => {
    if (isBlurEvent)
        return false;
    if (_names.watchAll || _names.watch.has(name))
        return true;
    for (const watchName of _names.watch) {
        if (name.startsWith(watchName) && name.charAt(watchName.length) === '.')
            return true;
    }
    return false;
};

const iterateFieldsByAction = (fields, action, fieldsNames, abortEarly) => {
    for (const key of fieldsNames || Object.keys(fields)) {
        if (key === '_f') {
            continue;
        }
        const field = fieldsNames ? get(fields, key) : fields[key];
        if (field) {
            const { _f } = field;
            if (_f) {
                if (_f.refs && _f.refs[0] && action(_f.refs[0], key) && !abortEarly) {
                    return true;
                }
                else if (_f.ref && action(_f.ref, _f.name) && !abortEarly) {
                    return true;
                }
                else {
                    if (iterateFieldsByAction(field, action)) {
                        break;
                    }
                }
            }
            else if (isObject(field) || Array.isArray(field)) {
                if (iterateFieldsByAction(field, action)) {
                    break;
                }
            }
        }
    }
    return;
};

var updateFieldArrayRootError = (errors, error, name) => {
    const existingErrors = get(errors, name);
    const fieldArrayErrors = Array.isArray(existingErrors) ? existingErrors : [];
    set(fieldArrayErrors, ROOT_ERROR_TYPE, error[name]);
    set(errors, name, fieldArrayErrors);
    return errors;
};

var isEmptyObject = (value) => isObject(value) && !Object.keys(value).length;

var isHTMLElement = (value) => {
    if (!isWeb) {
        return false;
    }
    const owner = value ? value.ownerDocument : 0;
    return (value instanceof
        (owner && owner.defaultView ? owner.defaultView.HTMLElement : HTMLElement));
};

var isRadioInput = (element) => element.type === 'radio';

var isRegex = (value) => value instanceof RegExp;

var appendErrors = (name, validateAllFieldCriteria, errors, type, message) => validateAllFieldCriteria
    ? {
        ...errors[name],
        types: {
            ...(errors[name] && errors[name].types ? errors[name].types : {}),
            [type]: message || true,
        },
    }
    : {};

const defaultResult = {
    value: false,
    isValid: false,
};
const validResult = { value: true, isValid: true };
var getCheckboxValue = (options) => {
    if (!Array.isArray(options)) {
        return defaultResult;
    }
    if (options.length > 1) {
        const values = options
            .filter((option) => option && option.checked && !option.disabled)
            .map((option) => option.value);
        return { value: values, isValid: !!values.length };
    }
    const option = options[0];
    if (!option || !option.checked || option.disabled) {
        return defaultResult;
    }
    if (!option.attributes || !('value' in option.attributes)) {
        return validResult;
    }
    return isUndefined(option.value) || option.value === ''
        ? validResult
        : { value: option.value, isValid: true };
};

const defaultReturn = {
    isValid: false,
    value: null,
};
var getRadioValue = (options) => Array.isArray(options)
    ? options.reduce((previous, option) => option && option.checked && !option.disabled
        ? {
            isValid: true,
            value: option.value,
        }
        : previous, defaultReturn)
    : defaultReturn;

function getValidateError(result, ref, type = 'validate') {
    if (isString(result) ||
        (Array.isArray(result) && result.every(isString)) ||
        (isBoolean(result) && !result)) {
        return {
            type,
            message: isString(result) ? result : '',
            ref,
        };
    }
}

var getValueAndMessage = (validationData) => isObject(validationData) && !isRegex(validationData)
    ? validationData
    : {
        value: validationData,
        message: '',
    };

var validateField = async (field, disabledFieldNames, formValues, validateAllFieldCriteria, shouldUseNativeValidation, isFieldArray) => {
    const { ref, refs, required, maxLength, minLength, min, max, pattern, validate, name, valueAsNumber, mount, } = field._f;
    const inputValue = get(formValues, name);
    if (!mount || disabledFieldNames.has(name)) {
        return {};
    }
    const inputRef = refs ? refs[0] : ref;
    const setCustomValidity = (message) => {
        if (shouldUseNativeValidation && inputRef.reportValidity) {
            const validityMessage = isBoolean(message) ? '' : message || '';
            if (refs) {
                refs.forEach((ref) => ref.setCustomValidity(validityMessage));
            }
            else {
                inputRef.setCustomValidity(validityMessage);
            }
            inputRef.reportValidity();
        }
    };
    const error = {};
    const isRadio = isRadioInput(ref);
    const isCheckBox = isCheckBoxInput(ref);
    const isRadioOrCheckbox = isRadio || isCheckBox;
    const isEmpty = ((valueAsNumber || isFileInput(ref)) &&
        isUndefined(ref.value) &&
        isUndefined(inputValue)) ||
        (isHTMLElement(ref) && ref.value === '') ||
        inputValue === '' ||
        (Array.isArray(inputValue) && !inputValue.length);
    const appendErrorsCurry = appendErrors.bind(null, name, validateAllFieldCriteria, error);
    const getMinMaxMessage = (exceedMax, maxLengthMessage, minLengthMessage, maxType = INPUT_VALIDATION_RULES.maxLength, minType = INPUT_VALIDATION_RULES.minLength) => {
        const message = exceedMax ? maxLengthMessage : minLengthMessage;
        error[name] = {
            type: exceedMax ? maxType : minType,
            message,
            ref,
            ...appendErrorsCurry(exceedMax ? maxType : minType, message),
        };
    };
    if (isFieldArray
        ? !Array.isArray(inputValue) || !inputValue.length
        : required &&
            ((!isRadioOrCheckbox && (isEmpty || isNullOrUndefined(inputValue))) ||
                (isBoolean(inputValue) && !inputValue) ||
                (isCheckBox && !getCheckboxValue(refs).isValid) ||
                (isRadio && !getRadioValue(refs).isValid))) {
        const { value, message } = isString(required)
            ? { value: !!required, message: required }
            : getValueAndMessage(required);
        if (value) {
            error[name] = {
                type: INPUT_VALIDATION_RULES.required,
                message,
                ref: inputRef,
                ...appendErrorsCurry(INPUT_VALIDATION_RULES.required, message),
            };
            if (!validateAllFieldCriteria) {
                setCustomValidity(message);
                return error;
            }
        }
    }
    if (!isEmpty && (!isNullOrUndefined(min) || !isNullOrUndefined(max))) {
        let exceedMax;
        let exceedMin;
        const maxOutput = getValueAndMessage(max);
        const minOutput = getValueAndMessage(min);
        if (!isNullOrUndefined(inputValue) &&
            !isDateObject(inputValue) &&
            !isNaN(inputValue)) {
            const valueNumber = ref.valueAsNumber ||
                (inputValue ? +inputValue : inputValue);
            if (!isNullOrUndefined(maxOutput.value)) {
                exceedMax = valueNumber > maxOutput.value;
            }
            if (!isNullOrUndefined(minOutput.value)) {
                exceedMin = valueNumber < minOutput.value;
            }
        }
        else {
            const valueDate = ref.valueAsDate || new Date(inputValue);
            const convertTimeToDate = (time) => new Date(new Date().toDateString() + ' ' + time);
            const isTime = ref.type == 'time';
            const isWeek = ref.type == 'week';
            if (isString(maxOutput.value) && inputValue) {
                exceedMax = isTime
                    ? convertTimeToDate(inputValue) > convertTimeToDate(maxOutput.value)
                    : isWeek
                        ? inputValue > maxOutput.value
                        : valueDate > new Date(maxOutput.value);
            }
            if (isString(minOutput.value) && inputValue) {
                exceedMin = isTime
                    ? convertTimeToDate(inputValue) < convertTimeToDate(minOutput.value)
                    : isWeek
                        ? inputValue < minOutput.value
                        : valueDate < new Date(minOutput.value);
            }
        }
        if (exceedMax || exceedMin) {
            getMinMaxMessage(!!exceedMax, maxOutput.message, minOutput.message, INPUT_VALIDATION_RULES.max, INPUT_VALIDATION_RULES.min);
            if (!validateAllFieldCriteria) {
                setCustomValidity(error[name].message);
                return error;
            }
        }
    }
    if ((maxLength || minLength) &&
        !isEmpty &&
        (isString(inputValue) || (isFieldArray && Array.isArray(inputValue)))) {
        const maxLengthOutput = getValueAndMessage(maxLength);
        const minLengthOutput = getValueAndMessage(minLength);
        const exceedMax = !isNullOrUndefined(maxLengthOutput.value) &&
            inputValue.length > +maxLengthOutput.value;
        const exceedMin = !isNullOrUndefined(minLengthOutput.value) &&
            inputValue.length < +minLengthOutput.value;
        if (exceedMax || exceedMin) {
            getMinMaxMessage(exceedMax, maxLengthOutput.message, minLengthOutput.message);
            if (!validateAllFieldCriteria) {
                setCustomValidity(error[name].message);
                return error;
            }
        }
    }
    if (pattern && !isEmpty && isString(inputValue)) {
        const { value: patternValue, message } = getValueAndMessage(pattern);
        if (isRegex(patternValue) && !inputValue.match(patternValue)) {
            error[name] = {
                type: INPUT_VALIDATION_RULES.pattern,
                message,
                ref,
                ...appendErrorsCurry(INPUT_VALIDATION_RULES.pattern, message),
            };
            if (!validateAllFieldCriteria) {
                setCustomValidity(message);
                return error;
            }
        }
    }
    if (validate) {
        if (isFunction(validate)) {
            const result = await validate(inputValue, formValues);
            const validateError = getValidateError(result, inputRef);
            if (validateError) {
                error[name] = {
                    ...validateError,
                    ...appendErrorsCurry(INPUT_VALIDATION_RULES.validate, validateError.message),
                };
                if (!validateAllFieldCriteria) {
                    setCustomValidity(validateError.message);
                    return error;
                }
            }
        }
        else if (isObject(validate)) {
            let validationResult = {};
            for (const key in validate) {
                if (!isEmptyObject(validationResult) && !validateAllFieldCriteria) {
                    break;
                }
                const validateError = getValidateError(await validate[key](inputValue, formValues), inputRef, key);
                if (validateError) {
                    validationResult = {
                        ...validateError,
                        ...appendErrorsCurry(key, validateError.message),
                    };
                    setCustomValidity(validateError.message);
                    if (validateAllFieldCriteria) {
                        error[name] = validationResult;
                    }
                }
            }
            if (!isEmptyObject(validationResult)) {
                error[name] = {
                    ref: inputRef,
                    ...validationResult,
                };
                if (!validateAllFieldCriteria) {
                    return error;
                }
            }
        }
    }
    const fieldError = error[name];
    setCustomValidity(fieldError ? fieldError.message : true);
    return error;
};

var convertToArrayPayload = (value) => (Array.isArray(value) ? value : [value]);

var appendAt = (data, value) => [
    ...data,
    ...convertToArrayPayload(value),
];

var fillEmptyArray = (value) => Array.isArray(value) ? value.map(() => undefined) : undefined;

function insert(data, index, value) {
    return [
        ...data.slice(0, index),
        ...convertToArrayPayload(value),
        ...data.slice(index),
    ];
}

var moveArrayAt = (data, from, to) => {
    if (!Array.isArray(data)) {
        return [];
    }
    if (isUndefined(data[to])) {
        data[to] = undefined;
    }
    data.splice(to, 0, data.splice(from, 1)[0]);
    return data;
};

var prependAt = (data, value) => [
    ...convertToArrayPayload(value),
    ...convertToArrayPayload(data),
];

var compact = (value) => Array.isArray(value) ? value.filter(Boolean) : [];

function removeAtIndexes(data, indexes) {
    let i = 0;
    const temp = [...data];
    for (const index of indexes) {
        temp.splice(index - i, 1);
        i++;
    }
    return compact(temp).length ? temp : [];
}
var removeArrayAt = (data, index) => isUndefined(index)
    ? []
    : removeAtIndexes(data, convertToArrayPayload(index).sort((a, b) => a - b));

var swapArrayAt = (data, indexA, indexB) => {
    [data[indexA], data[indexB]] = [data[indexB], data[indexA]];
};

function baseGet(object, updatePath) {
    const length = updatePath.length - 1;
    let index = 0;
    while (index < length) {
        if (isNullOrUndefined(object)) {
            object = undefined;
            break;
        }
        object = object[updatePath[index]];
        index++;
    }
    return object;
}
function isEmptyArray(obj) {
    for (const key in obj) {
        if (obj.hasOwnProperty(key) && !isUndefined(obj[key])) {
            return false;
        }
    }
    return true;
}
function unset(object, path) {
    if (isString(path) && Object.prototype.hasOwnProperty.call(object, path)) {
        delete object[path];
        return object;
    }
    const paths = Array.isArray(path)
        ? path
        : isKey(path)
            ? [path]
            : stringToPath(path);
    if (paths.some((segment) => PROTOTYPE_KEYWORDS.includes(String(segment)))) {
        return object;
    }
    const childObject = paths.length === 1 ? object : baseGet(object, paths);
    const index = paths.length - 1;
    const key = paths[index];
    if (childObject) {
        delete childObject[key];
    }
    if (index !== 0 &&
        ((isObject(childObject) && isEmptyObject(childObject)) ||
            (Array.isArray(childObject) && isEmptyArray(childObject)))) {
        unset(object, paths.slice(0, -1));
    }
    return object;
}

var updateAt = (fieldValues, index, value) => {
    fieldValues[index] = value;
    return fieldValues;
};

/**
 * A custom hook that exposes convenient methods to perform operations with a list of dynamic inputs that need to be appended, updated, removed etc. • [Demo](https://codesandbox.io/s/react-hook-form-usefieldarray-ssugn) • [Video](https://youtu.be/4MrbfGSFY2A)
 *
 * @remarks
 * [API](https://react-hook-form.com/docs/usefieldarray) • [Demo](https://codesandbox.io/s/react-hook-form-usefieldarray-ssugn)
 *
 * @param props - useFieldArray props
 *
 * @returns methods - functions to manipulate with the Field Arrays (dynamic inputs) {@link UseFieldArrayReturn}
 *
 * @example
 * ```tsx
 * function App() {
 *   const { register, control, handleSubmit, reset, trigger, setError } = useForm({
 *     defaultValues: {
 *       test: []
 *     }
 *   });
 *   const { fields, append } = useFieldArray({
 *     control,
 *     name: "test"
 *   });
 *
 *   return (
 *     <form onSubmit={handleSubmit(data => console.log(data))}>
 *       {fields.map((item, index) => (
 *          <input key={item.id} {...register(`test.${index}.firstName`)}  />
 *       ))}
 *       <button type="button" onClick={() => append({ firstName: "bill" })}>
 *         append
 *       </button>
 *       <input type="submit" />
 *     </form>
 *   );
 * }
 * ```
 */
function useFieldArray(props) {
    const formControl = useFormControlContext();
    const { control = formControl, name, keyName = 'id', disabled, shouldUnregister, rules, } = props;
    const [fields, setFields] = react__WEBPACK_IMPORTED_MODULE_0__.useState(control._getFieldArray(name));
    const ids = react__WEBPACK_IMPORTED_MODULE_0__.useRef(control._getFieldArray(name).map(generateId));
    const _actioned = react__WEBPACK_IMPORTED_MODULE_0__.useRef(false);
    if (!disabled) {
        control._names.array.add(name);
    }
    react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => !disabled &&
        rules &&
        fields.length >= 0 &&
        control.register(name, rules), [control, name, fields.length, rules, disabled]);
    useIsomorphicLayoutEffect(() => {
        if (disabled) {
            return;
        }
        return control._subjects.array.subscribe({
            next: ({ values, name: fieldArrayName, }) => {
                if (fieldArrayName === name || !fieldArrayName) {
                    const fieldValues = get(values, name);
                    if (Array.isArray(fieldValues)) {
                        setFields(fieldValues);
                        ids.current = fieldValues.map(generateId);
                    }
                    else if (!fieldArrayName) {
                        setFields([]);
                        ids.current = [];
                    }
                }
            },
        }).unsubscribe;
    }, [control, name, disabled]);
    const updateValues = react__WEBPACK_IMPORTED_MODULE_0__.useCallback((updatedFieldArrayValues) => {
        _actioned.current = true;
        control._setFieldArray(name, updatedFieldArrayValues);
    }, [control, name]);
    const append = (value, options) => {
        if (disabled) {
            return;
        }
        const appendValue = convertToArrayPayload(cloneObject(value));
        const updatedFieldArrayValues = appendAt(control._getFieldArray(name), appendValue);
        control._names.focus = getFocusFieldName(name, updatedFieldArrayValues.length - 1, options);
        ids.current = appendAt(ids.current, appendValue.map(generateId));
        updateValues(updatedFieldArrayValues);
        setFields(updatedFieldArrayValues);
        control._setFieldArray(name, updatedFieldArrayValues, appendAt, {
            argA: fillEmptyArray(value),
        });
    };
    const prepend = (value, options) => {
        if (disabled) {
            return;
        }
        const prependValue = convertToArrayPayload(cloneObject(value));
        const updatedFieldArrayValues = prependAt(control._getFieldArray(name), prependValue);
        control._names.focus = getFocusFieldName(name, 0, options);
        ids.current = prependAt(ids.current, prependValue.map(generateId));
        updateValues(updatedFieldArrayValues);
        setFields(updatedFieldArrayValues);
        control._setFieldArray(name, updatedFieldArrayValues, prependAt, {
            argA: fillEmptyArray(value),
        });
    };
    const remove = (index) => {
        if (disabled) {
            return;
        }
        const updatedFieldArrayValues = removeArrayAt(control._getFieldArray(name), index);
        ids.current = removeArrayAt(ids.current, index);
        updateValues(updatedFieldArrayValues);
        setFields(updatedFieldArrayValues);
        !Array.isArray(get(control._fields, name)) &&
            set(control._fields, name, undefined);
        control._setFieldArray(name, updatedFieldArrayValues, removeArrayAt, {
            argA: index,
        });
    };
    const insert$1 = (index, value, options) => {
        if (disabled) {
            return;
        }
        const insertValue = convertToArrayPayload(cloneObject(value));
        const updatedFieldArrayValues = insert(control._getFieldArray(name), index, insertValue);
        control._names.focus = getFocusFieldName(name, index, options);
        ids.current = insert(ids.current, index, insertValue.map(generateId));
        updateValues(updatedFieldArrayValues);
        setFields(updatedFieldArrayValues);
        control._setFieldArray(name, updatedFieldArrayValues, insert, {
            argA: index,
            argB: fillEmptyArray(value),
        });
    };
    const swap = (indexA, indexB) => {
        if (disabled) {
            return;
        }
        const updatedFieldArrayValues = control._getFieldArray(name);
        swapArrayAt(updatedFieldArrayValues, indexA, indexB);
        swapArrayAt(ids.current, indexA, indexB);
        updateValues(updatedFieldArrayValues);
        setFields(updatedFieldArrayValues);
        control._setFieldArray(name, updatedFieldArrayValues, swapArrayAt, {
            argA: indexA,
            argB: indexB,
        }, false);
    };
    const move = (from, to) => {
        if (disabled) {
            return;
        }
        const updatedFieldArrayValues = control._getFieldArray(name);
        moveArrayAt(updatedFieldArrayValues, from, to);
        moveArrayAt(ids.current, from, to);
        updateValues(updatedFieldArrayValues);
        setFields(updatedFieldArrayValues);
        control._setFieldArray(name, updatedFieldArrayValues, moveArrayAt, {
            argA: from,
            argB: to,
        }, false);
    };
    const update = (index, value) => {
        if (disabled) {
            return;
        }
        const updateValue = cloneObject(value);
        const updatedFieldArrayValues = updateAt(control._getFieldArray(name), index, updateValue);
        ids.current = [...updatedFieldArrayValues].map((item, i) => !item || i === index ? generateId() : ids.current[i]);
        updateValues(updatedFieldArrayValues);
        setFields([...updatedFieldArrayValues]);
        control._setFieldArray(name, updatedFieldArrayValues, updateAt, {
            argA: index,
            argB: fillEmptyArray(value),
        });
    };
    const replace = (value) => {
        if (disabled) {
            return;
        }
        const updatedFieldArrayValues = convertToArrayPayload(cloneObject(value));
        ids.current = updatedFieldArrayValues.map(generateId);
        updateValues([...updatedFieldArrayValues]);
        setFields([...updatedFieldArrayValues]);
        control._setFieldArray(name, [...updatedFieldArrayValues], (data) => data, {}, true, false);
    };
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
        if (disabled) {
            control._state.actionArrayLengths.delete(name);
            return;
        }
        control._state.action = false;
        control._state.actionArrayLengths.delete(name);
        isWatched(name, control._names) &&
            control._subjects.state.next({
                ...control._formState,
            });
        const validationModes = getValidationModes(control._options.mode);
        if (_actioned.current &&
            (!validationModes.isOnSubmit || control._formState.isSubmitted) &&
            !getValidationModes(control._options.reValidateMode).isOnSubmit &&
            !validationModes.isOnBlur) {
            if (control._options.resolver) {
                control._runSchema([name]).then((result) => {
                    var _a, _b;
                    control._updateIsValidating([name]);
                    const error = get(result.errors, name);
                    const existingError = get(control._formState.errors, name);
                    const existingErrorType = existingError && (existingError.type || ((_a = existingError.root) === null || _a === void 0 ? void 0 : _a.type));
                    const existingErrorMessage = existingError &&
                        (existingError.message || ((_b = existingError.root) === null || _b === void 0 ? void 0 : _b.message));
                    if (existingError
                        ? (!error && existingErrorType) ||
                            (error &&
                                (existingErrorType !== error.type ||
                                    existingErrorMessage !== error.message))
                        : error && error.type) {
                        if (error) {
                            isObject(error) &&
                                !Object.keys(error).some((key) => !Number.isNaN(+key))
                                ? updateFieldArrayRootError(control._formState.errors, { [name]: error }, name)
                                : set(control._formState.errors, name, error);
                        }
                        else {
                            unset(control._formState.errors, name);
                        }
                        control._subjects.state.next({
                            errors: control._formState.errors,
                        });
                    }
                });
            }
            else {
                const field = get(control._fields, name);
                if (field && field._f) {
                    validateField(field, control._names.disabled, control._formValues, control._options.criteriaMode === VALIDATION_MODE.all, control._options.shouldUseNativeValidation, true).then((error) => !isEmptyObject(error) &&
                        control._subjects.state.next({
                            errors: updateFieldArrayRootError(control._formState.errors, error, name),
                        }));
                }
            }
        }
        // External updates that change `fields` (e.g. reset() or setValue() on
        // the array) already notify subscribers with the up-to-date values
        // themselves, so only re-broadcast here for genuine array method calls.
        _actioned.current &&
            control._subjects.state.next({
                name,
                values: cloneObject(control._formValues),
            });
        control._names.focus &&
            iterateFieldsByAction(control._fields, (ref, key) => {
                if (control._names.focus &&
                    key.startsWith(control._names.focus) &&
                    ref.focus) {
                    ref.focus();
                    return 1;
                }
                return;
            });
        control._names.focus = '';
        control._setValid();
        _actioned.current = false;
    }, [fields, name, control, disabled]);
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
        if (!disabled) {
            !get(control._formValues, name) && control._setFieldArray(name);
        }
        return () => {
            control._state.actionArrayLengths.delete(name);
            if (disabled) {
                return;
            }
            const shouldKeepFieldArrayValues = !(control._options.shouldUnregister || shouldUnregister);
            const updateMounted = (name, value) => {
                const field = get(control._fields, name);
                if (field && field._f) {
                    field._f.mount = value;
                }
            };
            if (_actioned.current && shouldKeepFieldArrayValues) {
                control._subjects.state.next({
                    name,
                    values: cloneObject(control._formValues),
                });
            }
            shouldKeepFieldArrayValues
                ? updateMounted(name, false)
                : control.unregister(name);
        };
    }, [name, control, keyName, shouldUnregister, disabled]);
    return {
        swap: react__WEBPACK_IMPORTED_MODULE_0__.useCallback(swap, [updateValues, name, control, disabled]),
        move: react__WEBPACK_IMPORTED_MODULE_0__.useCallback(move, [updateValues, name, control, disabled]),
        prepend: react__WEBPACK_IMPORTED_MODULE_0__.useCallback(prepend, [
            updateValues,
            name,
            control,
            disabled,
        ]),
        append: react__WEBPACK_IMPORTED_MODULE_0__.useCallback(append, [updateValues, name, control, disabled]),
        remove: react__WEBPACK_IMPORTED_MODULE_0__.useCallback(remove, [updateValues, name, control, disabled]),
        insert: react__WEBPACK_IMPORTED_MODULE_0__.useCallback(insert$1, [updateValues, name, control, disabled]),
        update: react__WEBPACK_IMPORTED_MODULE_0__.useCallback(update, [updateValues, name, control, disabled]),
        replace: react__WEBPACK_IMPORTED_MODULE_0__.useCallback(replace, [
            updateValues,
            name,
            control,
            disabled,
        ]),
        fields: react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => fields.map((field, index) => ({
            ...field,
            ...(isBoolean(disabled) ? { disabled } : {}),
            [keyName]: ids.current[index] || generateId(),
        })), [fields, keyName, disabled]),
    };
}

/**
 * Component based on `useFieldArray` hook to work with controlled component.
 *
 * @example
 * ```tsx
 * function App() {
 *   const { control, register } = useForm<FormValues>({
 *     defaultValues: {
 *       test: [
 *         {
 *           value: '',
 *         },
 *       ],
 *     },
 *   });
 *
 *   return (
 *     <form>
 *       <FieldArray
 *         control={control}
 *         name="test"
 *         render={({ fields }) =>
 *           fields.map((field, index) => (
 *             <input key={field.id} {...register(`test.${index}.value`)} />
 *           ))
 *         }
 *       />
 *     </form>
 *   );
 * }
 * ```
 */
const FieldArray = (props) => props.render(useFieldArray(props));

const isFileLike = (value) => (typeof Blob !== 'undefined' && value instanceof Blob) ||
    (typeof File !== 'undefined' && value instanceof File);
const flatten = (obj) => {
    const output = {};
    for (const key of Object.keys(obj)) {
        if (isObjectType(obj[key]) &&
            obj[key] !== null &&
            !isDateObject(obj[key]) &&
            !isFileLike(obj[key])) {
            const nested = flatten(obj[key]);
            for (const nestedKey of Object.keys(nested)) {
                output[`${key}.${nestedKey}`] = nested[nestedKey];
            }
        }
        else {
            output[key] = obj[key];
        }
    }
    return output;
};

function jsonToFormData(json) {
    const result = new FormData();
    const flattenFormValues = flatten(json);
    for (const key in flattenFormValues) {
        result.append(key, flattenFormValues[key]);
    }
    return result;
}

function safeJSONStringify(value) {
    try {
        return JSON.stringify(value);
    }
    catch (_a) {
        return '';
    }
}

function noop() { }

const HookFormContext = react__WEBPACK_IMPORTED_MODULE_0__.createContext(null);
HookFormContext.displayName = 'HookFormContext';
/**
 * This custom hook allows you to access the form context. useFormContext is intended to be used in deeply nested structures, where it would become inconvenient to pass the context as a prop. To be used with {@link FormProvider}.
 *
 * @remarks
 * [API](https://react-hook-form.com/docs/useformcontext) • [Demo](https://codesandbox.io/s/react-hook-form-v7-form-context-ytudi)
 *
 * @returns return all useForm methods
 *
 * @example
 * ```tsx
 * function App() {
 *   const methods = useForm();
 *   const onSubmit = data => console.log(data);
 *
 *   return (
 *     <FormProvider {...methods} >
 *       <form onSubmit={methods.handleSubmit(onSubmit)}>
 *         <NestedInput />
 *         <input type="submit" />
 *       </form>
 *     </FormProvider>
 *   );
 * }
 *
 *  function NestedInput() {
 *   const { register } = useFormContext(); // retrieve all hook methods
 *   return <input {...register("test")} />;
 * }
 * ```
 */
const useFormContext = () => react__WEBPACK_IMPORTED_MODULE_0__.useContext(HookFormContext);
/**
 * A provider component that propagates the `useForm` methods to all children components via [React Context](https://react.dev/reference/react/useContext) API. To be used with {@link useFormContext}.
 *
 * @remarks
 * [API](https://react-hook-form.com/docs/useformcontext) • [Demo](https://codesandbox.io/s/react-hook-form-v7-form-context-ytudi)
 *
 * @param props - all useForm methods
 *
 * @example
 * ```tsx
 * function App() {
 *   const methods = useForm();
 *   const onSubmit = data => console.log(data);
 *
 *   return (
 *     <FormProvider {...methods} >
 *       <form onSubmit={methods.handleSubmit(onSubmit)}>
 *         <NestedInput />
 *         <input type="submit" />
 *       </form>
 *     </FormProvider>
 *   );
 * }
 *
 *  function NestedInput() {
 *   const { register } = useFormContext(); // retrieve all hook methods
 *   return <input {...register("test")} />;
 * }
 * ```
 */
const FormProvider = ({ children, watch, getValues, getErrors, getFieldState, setError, clearErrors, setValue, setValues, trigger, formState, resetField, reset, resetDefaultValues, handleSubmit, unregister, control, register, setFocus, subscribe, }) => {
    const memoizedValue = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => ({
        watch,
        getValues,
        getErrors,
        getFieldState,
        setError,
        clearErrors,
        setValue,
        setValues,
        trigger,
        formState,
        resetField,
        reset,
        resetDefaultValues,
        handleSubmit,
        unregister,
        control,
        register,
        setFocus,
        subscribe,
    }), [
        clearErrors,
        control,
        formState,
        getErrors,
        getFieldState,
        getValues,
        handleSubmit,
        register,
        reset,
        resetDefaultValues,
        resetField,
        setError,
        setFocus,
        setValue,
        setValues,
        subscribe,
        trigger,
        unregister,
        watch,
    ]);
    return (react__WEBPACK_IMPORTED_MODULE_0__.createElement(HookFormContext.Provider, { value: memoizedValue },
        react__WEBPACK_IMPORTED_MODULE_0__.createElement(HookFormControlContext.Provider, { value: memoizedValue.control }, children)));
};

const POST_REQUEST = 'post';
function defaultValidateStatus(status) {
    return status >= 200 && status < 300;
}
/**
 * Form component to manage submission.
 *
 * @param props - to setup submission detail. {@link FormProps}
 *
 * @returns form component or headless render prop.
 *
 * @example
 * ```tsx
 * function App() {
 *   const { control, formState: { errors } } = useForm();
 *
 *   return (
 *     <Form action="/api" control={control}>
 *       <input {...register("name")} />
 *       <p>{errors?.root?.server && 'Server error'}</p>
 *       <button>Submit</button>
 *     </Form>
 *   );
 * }
 * ```
 */
function Form(props) {
    const methods = useFormContext();
    const [mounted, setMounted] = react__WEBPACK_IMPORTED_MODULE_0__.useState(false);
    const { control = methods.control, onSubmit = noop, children, action, method = POST_REQUEST, headers, encType, onError = noop, render, onSuccess = noop, validateStatus = defaultValidateStatus, ...rest } = props;
    const handleSubmit = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => {
        return control.handleSubmit(async (data, event) => {
            const formData = jsonToFormData(data);
            const formDataJson = safeJSONStringify(data);
            if (onSubmit) {
                await onSubmit({
                    data,
                    event,
                    method,
                    formData,
                    formDataJson,
                });
            }
            if (isString(action)) {
                try {
                    const shouldStringifySubmissionData = (headers &&
                        headers['Content-Type'] &&
                        headers['Content-Type'].includes('json')) ||
                        (encType && encType.includes('json'));
                    const response = await fetch(action, {
                        method,
                        headers: {
                            ...headers,
                            ...(encType &&
                                encType !== 'multipart/form-data' && {
                                'Content-Type': encType,
                            }),
                        },
                        body: shouldStringifySubmissionData ? formDataJson : formData,
                    });
                    if (response && !validateStatus(response.status)) {
                        onError({ response });
                        return { type: String(response.status) };
                    }
                    else {
                        onSuccess({ response });
                    }
                }
                catch (error) {
                    onError({ error });
                    return { type: '' };
                }
            }
            if (isFunction(action)) {
                try {
                    await action(formData);
                }
                catch (error) {
                    onError({ error });
                    return { type: '' };
                }
            }
            // Return nothing when successful.
            return;
        });
    }, [
        control,
        onSubmit,
        method,
        action,
        headers,
        encType,
        validateStatus,
        onError,
        onSuccess,
    ]);
    const submit = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(async (event) => {
        const err = await handleSubmit(event);
        if (err && control) {
            control._subjects.state.next({ isSubmitSuccessful: false });
            control.setError('root.server', err);
        }
    }, [handleSubmit, control]);
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
        setMounted(true);
    }, []);
    if (render) {
        return render({ submit });
    }
    // React forbids passing `method`/`encType` alongside a function `action`
    // (a Server-Action-style submission) -- it manages those itself and warns
    // if they're present, so they're only rendered for string/URL actions.
    return (react__WEBPACK_IMPORTED_MODULE_0__.createElement("form", { noValidate: mounted, action: action, ...(!isFunction(action) && { method, encType }), onSubmit: submit, ...rest }, children));
}

const FormState = ({ control, disabled, exact, name, render, }) => render(useFormState({ control, name, disabled, exact }));
/** @deprecated Use `FormState` instead. Kept as an alias for backward compatibility. */
const FormStateSubscribe = FormState;

var createSubject = () => {
    let _observers = [];
    const next = (value) => {
        for (const observer of _observers) {
            observer.next && observer.next(value);
        }
    };
    const subscribe = (observer) => {
        _observers.push(observer);
        return {
            unsubscribe: () => {
                _observers = _observers.filter((o) => o !== observer);
            },
        };
    };
    const unsubscribe = () => {
        _observers = [];
    };
    return {
        get observers() {
            return _observers;
        },
        next,
        subscribe,
        unsubscribe,
    };
};

function extractFormValues(fieldsState, formValues) {
    const values = {};
    for (const key in fieldsState) {
        if (fieldsState.hasOwnProperty(key)) {
            const fieldState = fieldsState[key];
            const fieldValue = formValues[key];
            if (fieldState && isObject(fieldState) && fieldValue) {
                const nestedFieldsState = extractFormValues(fieldState, fieldValue);
                if (isObject(nestedFieldsState)) {
                    values[key] = nestedFieldsState;
                }
            }
            else if (fieldsState[key]) {
                values[key] = fieldValue;
            }
        }
    }
    return values;
}

const hasOwn = (value, key) => value !== null &&
    isObjectType(value) &&
    Object.prototype.hasOwnProperty.call(value, key);
var has = (object, path) => {
    if (!path) {
        return false;
    }
    let result = object;
    for (const key of isKey(path) ? [path] : stringToPath(path)) {
        if (!hasOwn(result, key)) {
            // `get` also resolves a path held as a single literal key, eg `{ 'a.b': 1 }`
            return hasOwn(object, path);
        }
        result = result[key];
    }
    return true;
};

var isMultipleSelect = (element) => element.type === `select-multiple`;

var isRadioOrCheckbox = (ref) => isRadioInput(ref) || isCheckBoxInput(ref);

var live = (ref) => isHTMLElement(ref) && ref.isConnected;

function isDirtyContainer(value) {
    return Array.isArray(value) || isObject(value);
}
function collectDirtyFieldNames(dirtyTree, cachedDirtyFields, prefix = '', names = []) {
    for (const key in dirtyTree) {
        const path = prefix ? `${prefix}.${key}` : key;
        const value = dirtyTree[key];
        if (isDirtyContainer(value) &&
            isDirtyContainer(get(cachedDirtyFields, path))) {
            collectDirtyFieldNames(value, cachedDirtyFields, path, names);
        }
        else {
            names.push(path);
        }
    }
    return names;
}

var objectHasFunction = (data) => {
    for (const key in data) {
        if (isFunction(data[key])) {
            return true;
        }
    }
    return false;
};

function isTraversable(value) {
    return Array.isArray(value) || (isObject(value) && !objectHasFunction(value));
}
function isRegisteredLeaf(fieldRef) {
    return !!(fieldRef && '_f' in fieldRef);
}
function isEmptyDirtyContainer(value) {
    return Array.isArray(value)
        ? !value.some((item) => !isUndefined(item))
        : !Object.keys(value).length;
}
function clearDirtyField(container, key) {
    if (Array.isArray(container)) {
        container[key] = undefined;
    }
    else {
        delete container[key];
    }
}
function markFieldsDirty(data, fields = {}, fieldRefs) {
    for (const key in data) {
        const value = data[key];
        const fieldRef = fieldRefs && fieldRefs[key];
        if (isTraversable(value) &&
            (!Array.isArray(value) || !isRegisteredLeaf(fieldRef))) {
            fields[key] = Array.isArray(value) ? [] : {};
            markFieldsDirty(value, fields[key], fieldRef);
            if (isEmptyDirtyContainer(fields[key])) {
                clearDirtyField(fields, key);
            }
        }
        else if (!isUndefined(value)) {
            fields[key] = true;
        }
    }
    return fields;
}
function getDirtyFields(data, formValues, dirtyFieldsFromValues, fieldRefs) {
    if (!dirtyFieldsFromValues) {
        dirtyFieldsFromValues = markFieldsDirty(formValues, {}, fieldRefs);
    }
    for (const key in data) {
        const value = data[key];
        const fieldRef = fieldRefs && fieldRefs[key];
        if (isTraversable(value) &&
            (!Array.isArray(value) || !isRegisteredLeaf(fieldRef))) {
            if (isUndefined(formValues) || isPrimitive(dirtyFieldsFromValues[key])) {
                dirtyFieldsFromValues[key] = markFieldsDirty(value, Array.isArray(value) ? [] : {}, fieldRef);
            }
            else {
                getDirtyFields(value, isNullOrUndefined(formValues) ? {} : formValues[key], dirtyFieldsFromValues[key], fieldRef);
            }
            if (isEmptyDirtyContainer(dirtyFieldsFromValues[key])) {
                clearDirtyField(dirtyFieldsFromValues, key);
            }
        }
        else if (deepEqual(value, formValues[key])) {
            clearDirtyField(dirtyFieldsFromValues, key);
        }
        else {
            dirtyFieldsFromValues[key] = true;
        }
    }
    return dirtyFieldsFromValues;
}

var getFieldArrayItemNames = (names, name) => {
    const segments = name.split('.');
    const matches = [];
    let prefix = segments[0];
    for (let i = 1; i < segments.length; prefix += '.' + segments[i++]) {
        if (!isNaN(+segments[i]) && names.has(prefix)) {
            matches.push(`${prefix}.${segments[i]}`);
        }
    }
    return matches;
};

var getFieldValueAs = (value, { valueAsNumber, valueAsDate, setValueAs }) => isUndefined(value)
    ? value
    : valueAsNumber
        ? value === ''
            ? NaN
            : value
                ? +value
                : value
        : valueAsDate && isString(value)
            ? new Date(value)
            : setValueAs
                ? setValueAs(value)
                : value;

function getFieldValue(_f) {
    const ref = _f.ref;
    if (isFileInput(ref)) {
        return ref.files;
    }
    if (isRadioInput(ref)) {
        return getRadioValue(_f.refs).value;
    }
    if (isMultipleSelect(ref)) {
        return [...ref.selectedOptions].map(({ value }) => value);
    }
    if (isCheckBoxInput(ref)) {
        return getCheckboxValue(_f.refs).value;
    }
    return getFieldValueAs(ref.value, _f);
}

var getResolverOptions = (fieldsNames, _fields, criteriaMode, shouldUseNativeValidation) => {
    const fields = {};
    for (const name of fieldsNames) {
        const field = get(_fields, name);
        field && set(fields, name, field._f);
    }
    return {
        criteriaMode,
        names: [...fieldsNames],
        fields,
        shouldUseNativeValidation,
    };
};

var getRuleValue = (rule) => isUndefined(rule)
    ? rule
    : isRegex(rule)
        ? rule.source
        : isObject(rule)
            ? isRegex(rule.value)
                ? rule.value.source
                : rule.value
            : rule;

const ASYNC_FUNCTION = 'AsyncFunction';
var hasPromiseValidation = (fieldReference) => {
    if (!fieldReference || !fieldReference.validate)
        return false;
    if (isFunction(fieldReference.validate)) {
        return fieldReference.validate.constructor.name === ASYNC_FUNCTION;
    }
    if (isObject(fieldReference.validate)) {
        for (const key in fieldReference.validate) {
            if (fieldReference.validate[key].constructor
                .name === ASYNC_FUNCTION) {
                return true;
            }
        }
    }
    return false;
};

var hasValidation = (options) => options.mount &&
    (options.required ||
        (!isUndefined(options.required) && options.required !== false) ||
        !isUndefined(options.min) ||
        !isUndefined(options.max) ||
        !isUndefined(options.maxLength) ||
        !isUndefined(options.minLength) ||
        options.pattern ||
        options.validate);

function schemaErrorLookup(errors, _fields, name) {
    const error = get(errors, name);
    if (error || isKey(name)) {
        return {
            error,
            name,
        };
    }
    const names = name.split('.');
    while (names.length) {
        const fieldName = names.join('.');
        const field = get(_fields, fieldName);
        const foundError = get(errors, fieldName);
        if (field && !Array.isArray(field) && name !== fieldName) {
            return { name };
        }
        if (foundError && foundError.type) {
            return {
                name: fieldName,
                error: foundError,
            };
        }
        if (foundError && foundError.root && foundError.root.type) {
            return {
                name: `${fieldName}.root`,
                error: foundError.root,
            };
        }
        names.pop();
    }
    return {
        name,
    };
}

var shouldRenderFormState = (formStateData, _proxyFormState, updateFormState, isRoot) => {
    updateFormState(formStateData);
    const keys = Object.keys(formStateData).filter((key) => key !== 'name');
    return (!keys.length ||
        (isRoot && keys.length >= Object.keys(_proxyFormState).length) ||
        keys.find((key) => _proxyFormState[key] ===
            (!isRoot || VALIDATION_MODE.all)));
};

var shouldSubscribeByName = (name, signalName, exact) => !name ||
    !signalName ||
    name === signalName ||
    convertToArrayPayload(name).some((currentName) => currentName &&
        (exact
            ? currentName === signalName || currentName.startsWith(signalName + '.')
            : currentName.startsWith(signalName) ||
                signalName.startsWith(currentName)));

var skipValidation = (isBlurEvent, isTouched, isSubmitted, reValidateMode, mode) => {
    if (mode.isOnAll) {
        return false;
    }
    else if (!isSubmitted && mode.isOnTouch) {
        return !(isTouched || isBlurEvent);
    }
    else if (isSubmitted ? reValidateMode.isOnBlur : mode.isOnBlur) {
        return !isBlurEvent;
    }
    else if (isSubmitted ? reValidateMode.isOnChange : mode.isOnChange) {
        return isBlurEvent;
    }
    return true;
};

var unsetEmptyArray = (ref, name) => {
    const array = get(ref, name);
    !compact(array).length &&
        !(array === null || array === void 0 ? void 0 : array.root) &&
        unset(ref, name);
};

const defaultOptions = {
    mode: VALIDATION_MODE.onSubmit,
    reValidateMode: VALIDATION_MODE.onChange,
    shouldFocusError: true,
};
const FORM_ERROR_TYPE = 'form';
const updateDirtyFields = (dirtyFields, nextDirtyFields) => {
    for (const key in dirtyFields) {
        if (!(key in nextDirtyFields)) {
            delete dirtyFields[key];
        }
    }
    Object.assign(dirtyFields, nextDirtyFields);
};
const DEFAULT_FORM_STATE = {
    submitCount: 0,
    isDirty: false,
    isReady: false,
    isValidating: false,
    isSubmitted: false,
    isSubmitting: false,
    isSubmitSuccessful: false,
    isValid: false,
    touchedFields: {},
    dirtyFields: {},
    validatingFields: {},
};
function createFormControl(props = {}) {
    let _options = {
        ...defaultOptions,
        ...props,
    };
    let _formState = {
        ...cloneObject(DEFAULT_FORM_STATE),
        isLoading: isFunction(_options.defaultValues),
        errors: _options.errors || {},
        disabled: _options.disabled || false,
    };
    let _fields = {};
    let _defaultValues = isObject(_options.defaultValues) || isObject(_options.values)
        ? cloneObject(_options.defaultValues || _options.values) || {}
        : {};
    let _formValues = _options.shouldUnregister
        ? {}
        : cloneObject(_defaultValues);
    let _state = {
        action: false,
        actionArrayLengths: new Map(),
        mount: false,
        watch: false,
        keepIsValid: false,
    };
    let _names = {
        mount: new Set(),
        disabled: new Set(),
        unMount: new Set(),
        array: new Set(),
        watch: new Set(),
        registerName: new Set(),
    };
    const delayErrorCallbacks = {};
    const timers = {};
    let _valuesSubscriberCount = 0;
    let _validationModeBeforeSubmit = getValidationModes(_options.mode);
    let _validationModeAfterSubmit = getValidationModes(_options.reValidateMode);
    const defaultProxyFormState = {
        isDirty: false,
        dirtyFields: false,
        validatingFields: false,
        touchedFields: false,
        isValidating: false,
        isValid: false,
        errors: false,
    };
    const _proxyFormState = {
        ...defaultProxyFormState,
    };
    let _proxySubscribeFormState = {
        ..._proxyFormState,
    };
    const _subjects = {
        array: createSubject(),
        state: createSubject(),
    };
    let _setValidCallId = 0;
    const shouldDisplayAllAssociatedErrors = _options.criteriaMode === VALIDATION_MODE.all;
    const debounce = (name, callback) => (wait) => {
        clearTimeout(timers[name]);
        timers[name] = setTimeout(callback, wait);
    };
    const _setValid = async (shouldUpdateValid) => {
        if (_state.keepIsValid) {
            return;
        }
        if (!_options.disabled &&
            (_proxyFormState.isValid ||
                _proxySubscribeFormState.isValid ||
                shouldUpdateValid)) {
            const callId = ++_setValidCallId;
            let isValid;
            if (_options.resolver) {
                isValid = isEmptyObject((await _runSchema()).errors);
                callId === _setValidCallId && _updateIsValidating();
            }
            else {
                isValid = await executeBuiltInValidation({
                    fields: _fields,
                    onlyCheckValid: true,
                    eventType: EVENTS.VALID,
                });
            }
            if (callId === _setValidCallId && isValid !== _formState.isValid) {
                _subjects.state.next({
                    isValid,
                });
            }
        }
    };
    const _updateIsValidating = (names, isValidating) => {
        if (!_options.disabled &&
            (_proxyFormState.isValidating ||
                _proxyFormState.validatingFields ||
                _proxySubscribeFormState.isValidating ||
                _proxySubscribeFormState.validatingFields)) {
            (names || _names.mount).forEach((name) => {
                if (name) {
                    isValidating
                        ? set(_formState.validatingFields, name, isValidating)
                        : unset(_formState.validatingFields, name);
                }
            });
            _subjects.state.next({
                validatingFields: _formState.validatingFields,
                isValidating: !isEmptyObject(_formState.validatingFields),
            });
        }
    };
    const _updateDirtyFields = () => {
        _formState.dirtyFields = getDirtyFields(_defaultValues, _formValues, undefined, _fields);
    };
    const _setFieldArray = (name, values = [], method, args, shouldSetValues = true, shouldUpdateFieldsAndState = true) => {
        if (args && method && !_options.disabled) {
            _state.action = true;
            const fields = get(_fields, name);
            if (!_state.actionArrayLengths.has(name)) {
                _state.actionArrayLengths.set(name, Array.isArray(fields) ? fields.length : 0);
            }
            if (shouldUpdateFieldsAndState && Array.isArray(fields)) {
                const fieldValues = method(fields, args.argA, args.argB);
                shouldSetValues && set(_fields, name, fieldValues);
            }
            const fieldArrayErrors = get(_formState.errors, name);
            if (shouldUpdateFieldsAndState && Array.isArray(fieldArrayErrors)) {
                const rootError = fieldArrayErrors.root;
                const errors = method(fieldArrayErrors, args.argA, args.argB) || fieldArrayErrors;
                if (rootError) {
                    errors.root = rootError;
                }
                shouldSetValues && set(_formState.errors, name, errors);
                unsetEmptyArray(_formState.errors, name);
            }
            const touchedFieldsArray = get(_formState.touchedFields, name);
            if ((_proxyFormState.touchedFields ||
                _proxySubscribeFormState.touchedFields) &&
                shouldUpdateFieldsAndState &&
                Array.isArray(touchedFieldsArray)) {
                const touchedFields = method(touchedFieldsArray, args.argA, args.argB);
                shouldSetValues && set(_formState.touchedFields, name, touchedFields);
            }
            if (_proxyFormState.dirtyFields || _proxySubscribeFormState.dirtyFields) {
                _updateDirtyFields();
            }
            _subjects.state.next({
                name,
                isDirty: _getDirty(name, values),
                dirtyFields: _formState.dirtyFields,
                errors: _formState.errors,
                isValid: _formState.isValid,
            });
        }
        else {
            set(_formValues, name, values);
        }
    };
    const updateErrors = (name, error) => {
        set(_formState.errors, name, error);
        _formState.errors = { ..._formState.errors };
        _subjects.state.next({
            errors: _formState.errors,
        });
    };
    const _setErrors = (errors) => {
        _formState.errors = errors;
        _subjects.state.next({
            errors: _formState.errors,
            isValid: false,
        });
    };
    const hasExplicitNullIntermediate = (name) => {
        const segments = isKey(name) ? [name] : stringToPath(name);
        let formValues = _formValues;
        let defaultValues = _defaultValues;
        for (let i = 0; i < segments.length - 1; i++) {
            const key = segments[i];
            formValues = isNullOrUndefined(formValues) ? formValues : formValues[key];
            defaultValues = isNullOrUndefined(defaultValues)
                ? defaultValues
                : defaultValues[key];
            if (formValues === null && defaultValues !== null) {
                return true;
            }
        }
        return false;
    };
    const isStaleArrayIndex = (name) => {
        if (!_state.actionArrayLengths.size) {
            return false;
        }
        const segments = isKey(name) ? [name] : stringToPath(name);
        let node = _formValues;
        let path = '';
        let ownerDepth = -1;
        let ownerPreActionLength = 0;
        for (let i = 0; i < segments.length; i++) {
            if (isNullOrUndefined(node)) {
                return false;
            }
            const key = segments[i];
            path = path ? `${path}.${key}` : key;
            if (Array.isArray(node) && +key >= node.length) {
                return ownerDepth === -1
                    ? false
                    : i === ownerDepth
                        ? +key < ownerPreActionLength
                        : true;
            }
            if (_state.actionArrayLengths.has(path)) {
                ownerDepth = i + 1;
                ownerPreActionLength = _state.actionArrayLengths.get(path);
            }
            node = node[key];
        }
        return false;
    };
    const updateValidAndValue = (name, shouldSkipSetValueAs, value, ref) => {
        const field = get(_fields, name);
        if (field) {
            if (hasExplicitNullIntermediate(name) || isStaleArrayIndex(name)) {
                return;
            }
            const wasUnsetInFormValues = isUndefined(get(_formValues, name));
            const defaultValue = get(_formValues, name, isUndefined(value) ? get(_defaultValues, name) : value);
            isUndefined(defaultValue) ||
                (ref && ref.defaultChecked) ||
                shouldSkipSetValueAs
                ? set(_formValues, name, shouldSkipSetValueAs ? defaultValue : getFieldValue(field._f))
                : setFieldValue(name, defaultValue);
            if (_state.mount && !_state.action) {
                _setValid();
                if (wasUnsetInFormValues &&
                    _formState.isDirty &&
                    (_proxyFormState.isDirty || _proxySubscribeFormState.isDirty)) {
                    const isDirty = _getDirty();
                    if (!isDirty) {
                        _formState.isDirty = false;
                        _subjects.state.next({ ..._formState });
                    }
                }
                if (props.shouldUnregister &&
                    wasUnsetInFormValues &&
                    !isUndefined(get(_formValues, name)) &&
                    isWatched(name, _names)) {
                    _state.watch = true;
                }
            }
        }
    };
    const updateTouchAndDirty = (name, fieldValue, isBlurEvent, shouldDirty, shouldRender) => {
        let shouldUpdateField = false;
        let isPreviousDirty = false;
        const output = {
            name,
        };
        // an explicit programmatic update (e.g. setValue with shouldDirty: true)
        // opts into dirty tracking even when the form is disabled
        if (!_options.disabled || shouldDirty === true) {
            if (!isBlurEvent || shouldDirty) {
                const isCurrentFieldPristine = deepEqual(get(_defaultValues, name), fieldValue);
                if (_proxyFormState.isDirty || _proxySubscribeFormState.isDirty) {
                    isPreviousDirty = _formState.isDirty;
                    _formState.isDirty = output.isDirty =
                        !isCurrentFieldPristine || _getDirty();
                    shouldUpdateField = isPreviousDirty !== output.isDirty;
                }
                isPreviousDirty = !!get(_formState.dirtyFields, name);
                if (isCurrentFieldPristine !== _formState.isDirty) {
                    updateDirtyFields(_formState.dirtyFields, getDirtyFields(_defaultValues, _formValues, undefined, _fields));
                }
                else {
                    isCurrentFieldPristine
                        ? unset(_formState.dirtyFields, name)
                        : set(_formState.dirtyFields, name, true);
                }
                output.dirtyFields = _formState.dirtyFields;
                shouldUpdateField =
                    shouldUpdateField ||
                        ((_proxyFormState.dirtyFields ||
                            _proxySubscribeFormState.dirtyFields) &&
                            isPreviousDirty !== !isCurrentFieldPristine);
            }
            if (isBlurEvent) {
                const isPreviousFieldTouched = get(_formState.touchedFields, name);
                if (!isPreviousFieldTouched) {
                    set(_formState.touchedFields, name, isBlurEvent);
                    output.touchedFields = _formState.touchedFields;
                    shouldUpdateField =
                        shouldUpdateField ||
                            ((_proxyFormState.touchedFields ||
                                _proxySubscribeFormState.touchedFields) &&
                                isPreviousFieldTouched !== isBlurEvent);
                }
            }
            shouldUpdateField && shouldRender && _subjects.state.next(output);
        }
        return shouldUpdateField ? output : {};
    };
    const shouldRenderByError = (name, isValid, error, fieldState) => {
        const previousFieldError = get(_formState.errors, name);
        const shouldUpdateValid = (_proxyFormState.isValid || _proxySubscribeFormState.isValid) &&
            isBoolean(isValid) &&
            _formState.isValid !== isValid;
        if (_options.delayError && error) {
            delayErrorCallbacks[name] = debounce(name, () => updateErrors(name, error));
            delayErrorCallbacks[name](_options.delayError);
        }
        else {
            clearTimeout(timers[name]);
            delete delayErrorCallbacks[name];
            error
                ? set(_formState.errors, name, error)
                : unset(_formState.errors, name);
            _formState.errors = { ..._formState.errors };
        }
        if ((error ? !deepEqual(previousFieldError, error) : previousFieldError) ||
            !isEmptyObject(fieldState) ||
            shouldUpdateValid) {
            const updatedFormState = {
                ...fieldState,
                ...(shouldUpdateValid && isBoolean(isValid) ? { isValid } : {}),
                errors: _formState.errors,
                name,
            };
            _subjects.state.next(updatedFormState);
        }
    };
    const _runSchema = async (name) => {
        _updateIsValidating(name, true);
        return await _options.resolver(_formValues, _options.context, getResolverOptions(name || _names.mount, _fields, _options.criteriaMode, _options.shouldUseNativeValidation));
    };
    const executeSchemaAndUpdateState = async (names) => {
        const { errors } = await _runSchema(names);
        _updateIsValidating(names);
        if (names) {
            for (const name of names) {
                const error = get(errors, name);
                error
                    ? _names.array.has(name) &&
                        isObject(error) &&
                        !Object.keys(error).some((key) => !Number.isNaN(Number(key)))
                        ? updateFieldArrayRootError(_formState.errors, { [name]: error }, name)
                        : set(_formState.errors, name, error)
                    : unset(_formState.errors, name);
            }
            _formState.errors = { ..._formState.errors };
        }
        else {
            _formState.errors = errors;
        }
        return errors;
    };
    const validateForm = async ({ name, eventType, }) => {
        if (props.validate) {
            const result = await props.validate({
                formValues: _formValues,
                formState: _formState,
                name,
                eventType,
            });
            if (isObject(result)) {
                for (const key in result) {
                    const error = result[key];
                    if (error) {
                        setError(`${FORM_ERROR_TYPE}.${key}`, {
                            message: isString(error.message) ? error.message : '',
                            type: error.type || INPUT_VALIDATION_RULES.validate,
                        });
                    }
                }
            }
            else if (isString(result) || !result) {
                setError(FORM_ERROR_TYPE, {
                    message: result || '',
                    type: INPUT_VALIDATION_RULES.validate,
                });
            }
            else {
                clearErrors(FORM_ERROR_TYPE);
            }
            return result;
        }
        return true;
    };
    const executeBuiltInValidation = async ({ fields, onlyCheckValid, name, eventType, context = {
        valid: true,
        runRootValidation: false,
    }, }) => {
        if (props.validate) {
            context.runRootValidation = true;
            const result = await validateForm({
                name,
                eventType,
            });
            if (!result) {
                context.valid = false;
                if (onlyCheckValid) {
                    return context.valid;
                }
            }
        }
        for (const name in fields) {
            const field = fields[name];
            if (field) {
                const { _f, ...fieldValue } = field;
                if (_f) {
                    const isFieldArrayRoot = _names.array.has(_f.name);
                    const isPromiseFunction = field._f && hasPromiseValidation(field._f);
                    const shouldTrackIsValidatingState = _proxyFormState.validatingFields ||
                        _proxyFormState.isValidating ||
                        _proxySubscribeFormState.validatingFields ||
                        _proxySubscribeFormState.isValidating;
                    if (isPromiseFunction && shouldTrackIsValidatingState) {
                        _updateIsValidating([_f.name], true);
                    }
                    const fieldError = await validateField(field, _names.disabled, _formValues, shouldDisplayAllAssociatedErrors, _options.shouldUseNativeValidation && !onlyCheckValid, isFieldArrayRoot);
                    if (isPromiseFunction && shouldTrackIsValidatingState) {
                        _updateIsValidating([_f.name]);
                    }
                    if (fieldError[_f.name]) {
                        context.valid = false;
                        if (onlyCheckValid) {
                            break;
                        }
                    }
                    !onlyCheckValid &&
                        (get(fieldError, _f.name)
                            ? isFieldArrayRoot
                                ? updateFieldArrayRootError(_formState.errors, fieldError, _f.name)
                                : set(_formState.errors, _f.name, fieldError[_f.name])
                            : unset(_formState.errors, _f.name));
                    if (props.shouldUseNativeValidation && fieldError[_f.name]) {
                        break;
                    }
                }
                !isEmptyObject(fieldValue) &&
                    (await executeBuiltInValidation({
                        context,
                        onlyCheckValid,
                        fields: fieldValue,
                        name: name,
                        eventType,
                    }));
            }
        }
        return context.valid;
    };
    const _removeUnmounted = () => {
        for (const name of _names.unMount) {
            const field = get(_fields, name);
            field &&
                (field._f.refs
                    ? field._f.refs.every((ref) => !live(ref))
                    : !live(field._f.ref)) &&
                unregister(name);
        }
        _names.unMount = new Set();
    };
    const _getDirty = (name, data) => (name && data && set(_formValues, name, data),
        !deepEqual(_state.mount ? _formValues : _defaultValues, _defaultValues));
    const _getWatch = (names, defaultValue, isGlobal) => generateWatchOutput(names, _names, {
        ...(_state.mount
            ? _formValues
            : isUndefined(defaultValue) || isString(names)
                ? _defaultValues
                : defaultValue),
    }, isGlobal, defaultValue);
    const _getFieldArray = (name) => compact(get(_state.mount ? _formValues : _defaultValues, name, _options.shouldUnregister ? get(_defaultValues, name, []) : []));
    const setFieldValue = (name, value, options = {}, skipClone = false, skipRender = false, skipValueRender = false) => {
        const field = get(_fields, name);
        let fieldValue = value;
        if (field) {
            const fieldReference = field._f;
            if (fieldReference) {
                !fieldReference.disabled &&
                    set(_formValues, name, getFieldValueAs(value, fieldReference));
                fieldValue =
                    isHTMLElement(fieldReference.ref) && isNullOrUndefined(value)
                        ? ''
                        : value;
                if (isMultipleSelect(fieldReference.ref)) {
                    [...fieldReference.ref.options].forEach((optionRef) => (optionRef.selected = fieldValue.includes(optionRef.value)));
                }
                else if (fieldReference.refs) {
                    if (isCheckBoxInput(fieldReference.ref)) {
                        fieldReference.refs.forEach((checkboxRef) => {
                            if (!checkboxRef.defaultChecked || !checkboxRef.disabled) {
                                if (Array.isArray(fieldValue)) {
                                    checkboxRef.checked = !!fieldValue.find((data) => data === checkboxRef.value);
                                }
                                else {
                                    checkboxRef.checked =
                                        fieldValue === checkboxRef.value || !!fieldValue;
                                }
                            }
                        });
                    }
                    else {
                        fieldReference.refs.forEach((radioRef) => (radioRef.checked = radioRef.value === fieldValue));
                    }
                }
                else if (isFileInput(fieldReference.ref)) {
                    fieldReference.ref.value = '';
                }
                else {
                    fieldReference.ref.value = fieldValue;
                    if (!fieldReference.ref.type && !skipRender && !skipValueRender) {
                        _subjects.state.next({
                            name,
                            values: skipClone ? _formValues : cloneObject(_formValues),
                        });
                    }
                }
            }
        }
        (options.shouldDirty || options.shouldTouch) &&
            updateTouchAndDirty(name, fieldValue, options.shouldTouch, options.shouldDirty, !skipRender);
        options.shouldValidate &&
            trigger(name, {
                delayError: options.delayError,
            });
    };
    const setFieldValues = (name, value, options, skipClone = false, skipRender = false, skipValueRender = false) => {
        if (_names.array.has(name)) {
            _subjects.array.next({
                name,
                values: skipClone ? _formValues : cloneObject(_formValues),
            });
        }
        for (const fieldKey in value) {
            if (!value.hasOwnProperty(fieldKey)) {
                return;
            }
            const fieldValue = value[fieldKey];
            const fieldName = name + '.' + fieldKey;
            const field = get(_fields, fieldName);
            (_names.array.has(name) ||
                isObject(fieldValue) ||
                (field && !field._f)) &&
                !isDateObject(fieldValue)
                ? setFieldValues(fieldName, fieldValue, options, skipClone, skipRender, skipValueRender)
                : setFieldValue(fieldName, fieldValue, options, skipClone, skipRender, skipValueRender);
        }
    };
    const _setValue = (name, value, options, skipClone, skipStateEmit = false) => {
        const field = get(_fields, name);
        const isFieldArray = _names.array.has(name);
        const cloneValue = skipClone ? value : cloneObject(value);
        const previousValue = get(_formValues, name);
        const isValueUnchanged = deepEqual(previousValue, cloneValue);
        if (!isValueUnchanged) {
            set(_formValues, name, cloneValue);
        }
        if (isFieldArray) {
            _subjects.array.next({
                name,
                values: skipClone ? _formValues : cloneObject(_formValues),
            });
            if ((_proxyFormState.isDirty ||
                _proxyFormState.dirtyFields ||
                _proxySubscribeFormState.isDirty ||
                _proxySubscribeFormState.dirtyFields) &&
                options.shouldDirty) {
                _updateDirtyFields();
                if (!skipStateEmit) {
                    _subjects.state.next({
                        name,
                        dirtyFields: _formState.dirtyFields,
                        isDirty: _getDirty(name, cloneValue),
                    });
                }
            }
        }
        else {
            const isEmpty = (Array.isArray(cloneValue) && !cloneValue.length) ||
                isEmptyObject(cloneValue);
            const skipValueRender = !isValueUnchanged && !skipStateEmit;
            if (!field || field._f || isNullOrUndefined(cloneValue) || isEmpty) {
                setFieldValue(name, cloneValue, options, skipClone, skipStateEmit, skipValueRender);
            }
            else {
                setFieldValues(name, cloneValue, options, skipClone, skipStateEmit, skipValueRender);
            }
        }
        if (!isValueUnchanged && !skipStateEmit) {
            const watched = isWatched(name, _names);
            const values = skipClone ? _formValues : cloneObject(_formValues);
            _subjects.state.next({
                ...(watched && _formState),
                name: _state.mount || watched ? name : undefined,
                values,
            });
            if (!isFieldArray) {
                for (const itemName of getFieldArrayItemNames(_names.array, name)) {
                    _subjects.state.next({ name: itemName, values });
                }
            }
        }
    };
    const setValue = (name, value, options = {}) => _setValue(name, value, options, false);
    const setValues = (formValues, options = {}) => {
        const updatedFormValues = isFunction(formValues)
            ? formValues(_formValues)
            : formValues;
        if (!deepEqual(_formValues, updatedFormValues)) {
            _formValues = {
                ..._formValues,
                ...updatedFormValues,
            };
            for (const fieldName of _names.mount) {
                if (has(updatedFormValues, fieldName)) {
                    _setValue(fieldName, get(updatedFormValues, fieldName), options, true, true);
                }
            }
            _subjects.state.next({
                ..._formState,
                name: undefined,
                type: undefined,
                ...(_valuesSubscriberCount ? { values: _formValues } : {}),
            });
            if (options.shouldValidate) {
                _setValid();
            }
        }
    };
    const onChange = async (event) => {
        _state.mount = true;
        const target = event.target;
        let name = target.name;
        let isFieldValueUpdated = true;
        const field = get(_fields, name);
        const _updateIsFieldValueUpdated = (fieldValue) => {
            isFieldValueUpdated =
                Number.isNaN(fieldValue) ||
                    (isDateObject(fieldValue) && isNaN(fieldValue.getTime())) ||
                    deepEqual(fieldValue, get(_formValues, name, fieldValue));
        };
        if (field) {
            let error;
            let isValid;
            const fieldValue = target.type
                ? getFieldValue(field._f)
                : getEventValue(event);
            const isBlurEvent = event.type === EVENTS.BLUR || event.type === EVENTS.FOCUS_OUT;
            const hasNoValidationEffect = !hasValidation(field._f) &&
                !props.validate &&
                !_options.resolver &&
                !get(_formState.errors, name) &&
                !field._f.deps;
            const shouldSkipValidation = hasNoValidationEffect ||
                skipValidation(isBlurEvent, get(_formState.touchedFields, name), _formState.isSubmitted, _validationModeAfterSubmit, _validationModeBeforeSubmit);
            const watched = isWatched(name, _names, isBlurEvent);
            set(_formValues, name, fieldValue);
            if (isBlurEvent) {
                if (!target || !target.readOnly) {
                    field._f.onBlur && field._f.onBlur(event);
                    const pendingDelayError = delayErrorCallbacks[name];
                    pendingDelayError && pendingDelayError(0);
                }
            }
            else if (field._f.onChange) {
                field._f.onChange(event);
            }
            const fieldState = updateTouchAndDirty(name, fieldValue, isBlurEvent);
            const shouldRender = !isEmptyObject(fieldState) || watched;
            !isBlurEvent &&
                _subjects.state.next({
                    name,
                    type: event.type,
                    ...(_valuesSubscriberCount
                        ? { values: cloneObject(_formValues) }
                        : {}),
                });
            if (shouldSkipValidation) {
                if ((!hasNoValidationEffect || !_formState.isValid) &&
                    (_proxyFormState.isValid || _proxySubscribeFormState.isValid)) {
                    if (_options.mode === 'onBlur') {
                        if (isBlurEvent) {
                            _setValid();
                        }
                    }
                    else if (!isBlurEvent) {
                        _setValid();
                    }
                }
                return (shouldRender &&
                    _subjects.state.next({ name, ...(watched ? {} : fieldState) }));
            }
            if (!_options.resolver && props.validate) {
                await validateForm({
                    name: name,
                    eventType: event.type,
                });
            }
            !isBlurEvent && watched && _subjects.state.next({ ..._formState });
            if (_options.resolver) {
                const { errors } = await _runSchema([name]);
                _updateIsValidating([name]);
                _updateIsFieldValueUpdated(fieldValue);
                if (!isFieldValueUpdated) {
                    !isEmptyObject(fieldState) && _subjects.state.next(fieldState);
                    return;
                }
                const previousErrorLookupResult = schemaErrorLookup(_formState.errors, _fields, name);
                const errorLookupResult = schemaErrorLookup(errors, _fields, previousErrorLookupResult.name || name);
                error = errorLookupResult.error;
                name = errorLookupResult.name;
                isValid = isEmptyObject(errors);
            }
            else {
                _updateIsValidating([name], true);
                error = (await validateField(field, _names.disabled, _formValues, shouldDisplayAllAssociatedErrors, _options.shouldUseNativeValidation))[name];
                _updateIsValidating([name]);
                _updateIsFieldValueUpdated(fieldValue);
                if (isFieldValueUpdated) {
                    if (error) {
                        isValid = false;
                    }
                    else if (_proxyFormState.isValid ||
                        _proxySubscribeFormState.isValid) {
                        isValid = await executeBuiltInValidation({
                            fields: _fields,
                            onlyCheckValid: true,
                            name: name,
                            eventType: event.type,
                        });
                    }
                }
            }
            if (isFieldValueUpdated) {
                field._f.deps &&
                    (!Array.isArray(field._f.deps) || field._f.deps.length > 0) &&
                    trigger(field._f.deps);
                shouldRenderByError(name, isValid, error, fieldState);
            }
        }
    };
    const _focusInput = (ref, key) => {
        if (get(_formState.errors, key) && ref.focus) {
            ref.focus();
            return 1;
        }
        return;
    };
    const trigger = async (name, options = {}) => {
        let isValid;
        let validationResult;
        const fieldNames = convertToArrayPayload(name);
        if (_options.resolver) {
            const errors = await executeSchemaAndUpdateState(isUndefined(name) ? name : fieldNames);
            isValid = isEmptyObject(errors);
            validationResult = name
                ? !fieldNames.some((name) => get(errors, name))
                : isValid;
        }
        else if (name) {
            validationResult = (await Promise.all(fieldNames.map(async (fieldName) => {
                const field = get(_fields, fieldName);
                return await executeBuiltInValidation({
                    fields: field && field._f ? { [fieldName]: field } : field,
                    eventType: EVENTS.TRIGGER,
                });
            }))).every(Boolean);
            !(!validationResult && !_formState.isValid) && _setValid();
        }
        else {
            validationResult = isValid = await executeBuiltInValidation({
                fields: _fields,
                name,
                eventType: EVENTS.TRIGGER,
            });
        }
        if (options.delayError && _options.delayError && isString(name)) {
            const error = get(_formState.errors, name);
            if (error) {
                unset(_formState.errors, name);
                delayErrorCallbacks[name] = debounce(name, () => updateErrors(name, error));
                delayErrorCallbacks[name](_options.delayError);
            }
            else {
                clearTimeout(timers[name]);
                delete delayErrorCallbacks[name];
            }
        }
        _subjects.state.next({
            ...(!isString(name) ||
                ((_proxyFormState.isValid || _proxySubscribeFormState.isValid) &&
                    isValid !== _formState.isValid)
                ? {}
                : { name }),
            ...(_options.resolver || !name ? { isValid } : {}),
            errors: _formState.errors,
        });
        options.shouldFocus &&
            !validationResult &&
            iterateFieldsByAction(_fields, _focusInput, name ? fieldNames : _names.mount);
        return validationResult;
    };
    const getValues = (fieldNames, config) => {
        let values = {
            ...(_state.mount ? _formValues : _defaultValues),
        };
        if (config) {
            values = extractFormValues(config.dirtyFields ? _formState.dirtyFields : _formState.touchedFields, values);
        }
        return isUndefined(fieldNames)
            ? values
            : isString(fieldNames)
                ? get(values, fieldNames)
                : fieldNames.map((name) => get(values, name));
    };
    const getErrors = (fieldNames) => isUndefined(fieldNames)
        ? { ..._formState.errors }
        : isString(fieldNames)
            ? get(_formState.errors, fieldNames)
            : fieldNames.map((name) => get(_formState.errors, name));
    const getFieldState = (name, formState) => {
        const targetFormState = formState || _formState;
        const error = get(targetFormState.errors, name);
        return {
            invalid: !!error,
            isDirty: !!get(targetFormState.dirtyFields, name),
            error,
            isValidating: !!get(_formState.validatingFields, name),
            isTouched: !!get(targetFormState.touchedFields, name),
        };
    };
    const clearErrors = (name) => {
        const names = name ? convertToArrayPayload(name) : undefined;
        names === null || names === void 0 ? void 0 : names.forEach((inputName) => unset(_formState.errors, inputName));
        if (names) {
            names.forEach((inputName) => {
                _subjects.state.next({
                    name: inputName,
                    errors: _formState.errors,
                });
            });
        }
        else {
            _formState.errors = {};
            _subjects.state.next({
                errors: _formState.errors,
            });
        }
    };
    const setError = (name, error, options) => {
        const ref = (get(_fields, name, { _f: {} })._f || {}).ref;
        const currentError = get(_formState.errors, name) || {};
        const { ref: currentRef, message, type, ...restOfErrorTree } = currentError;
        set(_formState.errors, name, {
            ...restOfErrorTree,
            ...error,
            ref,
        });
        _subjects.state.next({
            name,
            errors: _formState.errors,
            isValid: false,
        });
        options && options.shouldFocus && ref && ref.focus && ref.focus();
    };
    const watch = (name, defaultValue) => {
        if (isFunction(name)) {
            _valuesSubscriberCount++;
            const { unsubscribe } = _subjects.state.subscribe({
                next: (payload) => 'values' in payload &&
                    name(payload.values || _getWatch(undefined, defaultValue), payload),
            });
            let called = false;
            return {
                unsubscribe: () => {
                    if (called) {
                        return;
                    }
                    called = true;
                    _valuesSubscriberCount--;
                    unsubscribe();
                },
            };
        }
        return _getWatch(name, defaultValue, true);
    };
    const _subscribe = (props) => {
        var _a;
        const needsValues = !!((_a = props.formState) === null || _a === void 0 ? void 0 : _a.values);
        if (needsValues) {
            _valuesSubscriberCount++;
        }
        const { unsubscribe } = _subjects.state.subscribe({
            next: (formState) => {
                if (shouldSubscribeByName(props.name, formState.name, props.exact) &&
                    shouldRenderFormState(formState, props.formState || _proxyFormState, _setFormState, props.reRenderRoot)) {
                    const snapshot = { ..._formValues };
                    props.callback({
                        values: snapshot,
                        ..._formState,
                        ...formState,
                        defaultValues: _defaultValues,
                    });
                }
            },
        });
        if (!needsValues) {
            return unsubscribe;
        }
        let called = false;
        return () => {
            if (called) {
                return;
            }
            called = true;
            _valuesSubscriberCount--;
            unsubscribe();
        };
    };
    const subscribe = (props) => {
        _state.mount = true;
        _proxySubscribeFormState = {
            ..._proxySubscribeFormState,
            ...props.formState,
        };
        return _subscribe({
            ...props,
            formState: {
                ...defaultProxyFormState,
                ...props.formState,
            },
        });
    };
    const unregister = (name, options = {}) => {
        for (const fieldName of name ? convertToArrayPayload(name) : _names.mount) {
            _names.mount.delete(fieldName);
            _names.array.delete(fieldName);
            if (!options.keepValue) {
                unset(_fields, fieldName);
                unset(_formValues, fieldName);
            }
            !options.keepError && unset(_formState.errors, fieldName);
            !options.keepDirty && unset(_formState.dirtyFields, fieldName);
            !options.keepTouched && unset(_formState.touchedFields, fieldName);
            !options.keepIsValidating &&
                unset(_formState.validatingFields, fieldName);
            !_options.shouldUnregister &&
                !options.keepDefaultValue &&
                unset(_defaultValues, fieldName);
        }
        _valuesSubscriberCount &&
            _subjects.state.next({
                values: cloneObject(_formValues),
            });
        _subjects.state.next({
            ..._formState,
            ...(options.keepDirty ? {} : { isDirty: _getDirty() }),
        });
        !options.keepIsValid && _setValid();
    };
    const _setDisabledField = ({ disabled, name, }) => {
        if ((isBoolean(disabled) && _state.mount) ||
            !!disabled ||
            _names.disabled.has(name)) {
            const wasDisabled = _names.disabled.has(name);
            const isDisabled = !!disabled;
            const disabledStateChanged = wasDisabled !== isDisabled;
            disabled ? _names.disabled.add(name) : _names.disabled.delete(name);
            disabledStateChanged && _state.mount && !_state.action && _setValid();
        }
    };
    const register = (name, options = {}) => {
        let field = get(_fields, name);
        const disabledIsDefined = isBoolean(options.disabled) || isBoolean(_options.disabled);
        const shouldRevalidateRemount = !_names.registerName.has(name) && field && field._f && !field._f.mount;
        set(_fields, name, {
            ...(field || {}),
            _f: {
                ...(field && field._f ? field._f : { ref: { name } }),
                name,
                mount: true,
                ...options,
            },
        });
        _names.mount.add(name);
        if (field && !shouldRevalidateRemount) {
            _setDisabledField({
                disabled: isBoolean(options.disabled)
                    ? options.disabled
                    : _options.disabled,
                name,
            });
        }
        else {
            updateValidAndValue(name, true, options.value);
        }
        return {
            ...(disabledIsDefined
                ? { disabled: options.disabled || _options.disabled }
                : {}),
            ...(_options.progressive
                ? {
                    required: !!options.required,
                    min: getRuleValue(options.min),
                    max: getRuleValue(options.max),
                    minLength: getRuleValue(options.minLength),
                    maxLength: getRuleValue(options.maxLength),
                    pattern: getRuleValue(options.pattern),
                }
                : {}),
            name,
            onChange,
            onBlur: onChange,
            ref: (ref) => {
                if (ref) {
                    _names.registerName.add(name);
                    register(name, options);
                    _names.registerName.delete(name);
                    field = get(_fields, name);
                    const fieldRef = isUndefined(ref.value)
                        ? ref.querySelectorAll
                            ? ref.querySelectorAll('input,select,textarea')[0] || ref
                            : ref
                        : ref;
                    const radioOrCheckbox = isRadioOrCheckbox(fieldRef);
                    const refs = field._f.refs || [];
                    if (radioOrCheckbox
                        ? refs.find((option) => option === fieldRef)
                        : fieldRef === field._f.ref) {
                        return;
                    }
                    const newField = {
                        ...field._f,
                    };
                    if (radioOrCheckbox) {
                        newField.refs = [
                            ...refs.filter(live),
                            fieldRef,
                            ...(Array.isArray(get(_defaultValues, name)) ? [{}] : []),
                        ];
                        newField.ref = { type: fieldRef.type, name };
                    }
                    else {
                        newField.ref = fieldRef;
                        delete newField.refs;
                    }
                    set(_fields, name, {
                        _f: newField,
                    });
                    updateValidAndValue(name, false, undefined, fieldRef);
                }
                else {
                    field = get(_fields, name, {});
                    if (field._f) {
                        field._f.mount = false;
                    }
                    (_options.shouldUnregister || options.shouldUnregister) &&
                        !(isNameInFieldArray(_names.array, name) && _state.action) &&
                        _names.unMount.add(name);
                }
            },
        };
    };
    const _focusError = () => _options.shouldFocusError &&
        !_options.shouldUseNativeValidation &&
        iterateFieldsByAction(_fields, _focusInput, _names.mount);
    const _disableForm = (disabled) => {
        if (isBoolean(disabled)) {
            _subjects.state.next({ disabled });
            iterateFieldsByAction(_fields, (ref, name) => {
                const currentField = get(_fields, name);
                if (currentField) {
                    ref.disabled = currentField._f.disabled || disabled;
                    if (Array.isArray(currentField._f.refs)) {
                        currentField._f.refs.forEach((inputRef) => {
                            inputRef.disabled = currentField._f.disabled || disabled;
                        });
                    }
                }
            }, 0, false);
        }
    };
    const handleSubmit = (onValid, onInvalid) => async (e) => {
        let result = undefined;
        let onValidError = undefined;
        if (e) {
            e.preventDefault && e.preventDefault();
            e.persist &&
                e.persist();
        }
        let fieldValues = cloneObject(_formValues);
        _subjects.state.next({
            isSubmitting: true,
        });
        if (_options.resolver) {
            const { errors, values } = await _runSchema();
            _updateIsValidating();
            _formState.errors = errors;
            fieldValues = cloneObject(values);
        }
        else {
            await executeBuiltInValidation({
                fields: _fields,
                eventType: EVENTS.SUBMIT,
            });
        }
        if (_names.disabled.size) {
            for (const name of _names.disabled) {
                unset(fieldValues, name);
            }
        }
        unset(_formState.errors, ROOT_ERROR_TYPE);
        if (isEmptyObject(_formState.errors)) {
            _subjects.state.next({
                errors: {},
            });
            try {
                result = await onValid(fieldValues, e);
            }
            catch (error) {
                onValidError = error;
            }
        }
        else {
            if (onInvalid) {
                await onInvalid({ ..._formState.errors }, e);
            }
            _focusError();
            setTimeout(_focusError);
        }
        _subjects.state.next({
            isSubmitted: true,
            isSubmitting: false,
            isSubmitSuccessful: isEmptyObject(_formState.errors) && !onValidError,
            submitCount: _formState.submitCount + 1,
            errors: _formState.errors,
        });
        if (onValidError) {
            throw onValidError;
        }
        return result;
    };
    const resetField = (name, options = {}) => {
        if (get(_fields, name)) {
            if (isUndefined(options.defaultValue)) {
                setValue(name, cloneObject(get(_defaultValues, name)));
            }
            else {
                setValue(name, options.defaultValue);
                set(_defaultValues, name, cloneObject(options.defaultValue));
            }
            if (!options.keepTouched) {
                unset(_formState.touchedFields, name);
            }
            if (!options.keepDirty) {
                unset(_formState.dirtyFields, name);
                _formState.isDirty = options.defaultValue
                    ? _getDirty(name, cloneObject(get(_defaultValues, name)))
                    : _getDirty();
            }
            if (!options.keepError) {
                unset(_formState.errors, name);
                _proxyFormState.isValid && _setValid();
            }
            _subjects.state.next({ ..._formState });
        }
    };
    const _reset = (formValues, keepStateOptions = {}) => {
        const updatedValues = formValues ? cloneObject(formValues) : _defaultValues;
        const cloneUpdatedValues = cloneObject(updatedValues);
        const isEmptyResetValues = isEmptyObject(formValues);
        const values = cloneUpdatedValues;
        const fieldRefs = _fields;
        if (!keepStateOptions.keepDefaultValues) {
            _defaultValues = updatedValues;
        }
        if (!keepStateOptions.keepValues) {
            if (keepStateOptions.keepDirtyValues) {
                const fieldsToCheck = new Set([
                    ..._names.mount,
                    ...collectDirtyFieldNames(getDirtyFields(_defaultValues, _formValues, undefined, fieldRefs), _formState.dirtyFields),
                ]);
                for (const fieldName of fieldsToCheck) {
                    const isDirty = get(_formState.dirtyFields, fieldName);
                    const existingValue = get(_formValues, fieldName);
                    const newValue = get(values, fieldName);
                    if (isDirty && !isUndefined(existingValue)) {
                        set(values, fieldName, existingValue);
                    }
                    else if (!isDirty && !isUndefined(newValue)) {
                        setValue(fieldName, newValue);
                    }
                }
            }
            else {
                if (isWeb && isUndefined(formValues)) {
                    for (const name of _names.mount) {
                        const field = get(_fields, name);
                        if (field && field._f) {
                            const fieldReference = Array.isArray(field._f.refs)
                                ? field._f.refs[0]
                                : field._f.ref;
                            if (isHTMLElement(fieldReference)) {
                                const form = fieldReference.closest('form');
                                if (form) {
                                    form.reset();
                                    break;
                                }
                            }
                        }
                    }
                }
                if (keepStateOptions.keepFieldsRef) {
                    for (const fieldName of _names.mount) {
                        setValue(fieldName, get(values, fieldName));
                    }
                }
                else {
                    _fields = {};
                }
            }
            if (_options.shouldUnregister) {
                _formValues = keepStateOptions.keepDefaultValues
                    ? cloneObject(_defaultValues)
                    : {};
                if (keepStateOptions.keepFieldsRef) {
                    for (const fieldName of _names.mount) {
                        set(_formValues, fieldName, get(values, fieldName));
                    }
                }
            }
            else {
                _formValues = cloneObject(values);
            }
            _subjects.array.next({
                values: { ...values },
            });
            _subjects.state.next({
                name: undefined,
                type: undefined,
                values: { ...values },
            });
        }
        _names = {
            mount: keepStateOptions.keepDirtyValues ? _names.mount : new Set(),
            unMount: new Set(),
            array: new Set(),
            registerName: new Set(),
            disabled: new Set(),
            watch: new Set(),
            watchAll: false,
            focus: '',
        };
        _state.mount =
            !_proxyFormState.isValid ||
                !!keepStateOptions.keepIsValid ||
                !!keepStateOptions.keepDirtyValues ||
                (!_options.shouldUnregister && !isEmptyObject(values));
        _state.watch = !!_options.shouldUnregister;
        _state.keepIsValid = !!keepStateOptions.keepIsValid;
        _state.action = false;
        _state.actionArrayLengths.clear();
        if (!keepStateOptions.keepErrors) {
            _formState.errors = {};
        }
        _subjects.state.next({
            submitCount: keepStateOptions.keepSubmitCount
                ? _formState.submitCount
                : 0,
            isDirty: isEmptyResetValues
                ? false
                : keepStateOptions.keepDirty
                    ? _formState.isDirty
                    : keepStateOptions.keepValues
                        ? _getDirty()
                        : !!(keepStateOptions.keepDefaultValues &&
                            !deepEqual(formValues, _defaultValues)),
            isSubmitted: keepStateOptions.keepIsSubmitted
                ? _formState.isSubmitted
                : false,
            dirtyFields: isEmptyResetValues
                ? {}
                : keepStateOptions.keepDirtyValues
                    ? keepStateOptions.keepDefaultValues && _formValues
                        ? getDirtyFields(_defaultValues, _formValues, undefined, fieldRefs)
                        : _formState.dirtyFields
                    : keepStateOptions.keepDefaultValues && formValues
                        ? getDirtyFields(_defaultValues, formValues, undefined, fieldRefs)
                        : keepStateOptions.keepDirty
                            ? _formState.dirtyFields
                            : {},
            touchedFields: keepStateOptions.keepTouched
                ? _formState.touchedFields
                : {},
            errors: keepStateOptions.keepErrors ? _formState.errors : {},
            isSubmitSuccessful: keepStateOptions.keepIsSubmitSuccessful
                ? _formState.isSubmitSuccessful
                : false,
            isSubmitting: false,
            defaultValues: _defaultValues,
        });
    };
    const reset = (formValues, keepStateOptions) => _reset(isFunction(formValues)
        ? formValues(_formValues)
        : formValues, { ..._options.resetOptions, ...keepStateOptions });
    const setFocus = (name, options = {}) => {
        const field = get(_fields, name);
        const fieldReference = field && field._f;
        if (fieldReference) {
            const fieldRef = fieldReference.refs
                ? fieldReference.refs[0]
                : fieldReference.ref;
            if (fieldRef.focus) {
                setTimeout(() => {
                    fieldRef.focus();
                    options.shouldSelect &&
                        isFunction(fieldRef.select) &&
                        fieldRef.select();
                });
            }
        }
    };
    const _setFormState = (updatedFormState) => {
        // `name`, `type`, and `values` describe the event that produced this
        // update, not the form's persisted state (they aren't part of
        // `FormState`). Merging them in would leak a stale `name`/`type` from
        // one event into a later, unrelated notification that doesn't specify
        // its own.
        const { name, type, values, ...formState } = updatedFormState;
        _formState = {
            ..._formState,
            ...formState,
        };
    };
    _subjects.state.subscribe({ next: _setFormState });
    const _resetDefaultValues = () => isFunction(_options.defaultValues) &&
        _options.defaultValues().then((values) => {
            reset(values, _options.resetOptions);
            _subjects.state.next({
                isLoading: false,
            });
        });
    const resetDefaultValues = (values, options = {}) => {
        _defaultValues = cloneObject(values);
        if (!options.keepDirty) {
            const newDirtyFields = getDirtyFields(_defaultValues, _formValues, undefined, _fields);
            _formState.dirtyFields = newDirtyFields;
            _formState.isDirty = !isEmptyObject(newDirtyFields);
        }
        if (!options.keepIsValid) {
            _setValid();
        }
        _subjects.state.next({
            ..._formState,
            defaultValues: _defaultValues,
        });
    };
    const methods = {
        control: {
            register,
            unregister,
            getFieldState,
            handleSubmit,
            setError,
            _subscribe,
            _runSchema,
            _updateIsValidating,
            _focusError,
            _getWatch,
            _getDirty,
            _setValid,
            _setFieldArray,
            _setDisabledField,
            _setErrors,
            _getFieldArray,
            _reset,
            _resetDefaultValues,
            _removeUnmounted,
            _disableForm,
            _subjects,
            _proxyFormState,
            get _fields() {
                return _fields;
            },
            get _formValues() {
                return _formValues;
            },
            get _state() {
                return _state;
            },
            set _state(value) {
                _state = value;
            },
            get _defaultValues() {
                return _defaultValues;
            },
            get _names() {
                return _names;
            },
            set _names(value) {
                _names = value;
            },
            get _formState() {
                return _formState;
            },
            get _options() {
                return _options;
            },
            set _options(value) {
                _options = {
                    ..._options,
                    ...value,
                };
                _validationModeBeforeSubmit = getValidationModes(_options.mode);
                _validationModeAfterSubmit = getValidationModes(_options.reValidateMode);
            },
        },
        subscribe,
        trigger,
        register,
        handleSubmit,
        watch,
        setValue,
        setValues,
        getValues,
        getErrors,
        reset,
        resetField,
        resetDefaultValues,
        clearErrors,
        unregister,
        setError,
        setFocus,
        getFieldState,
    };
    return {
        ...methods,
        formControl: methods,
    };
}

/**
 * Custom hook to manage the entire form.
 *
 * @remarks
 * [API](https://react-hook-form.com/docs/useform) • [Demo](https://codesandbox.io/s/react-hook-form-get-started-ts-5ksmm) • [Video](https://www.youtube.com/watch?v=RkXv4AXXC_4)
 *
 * @param props - form configuration and validation parameters.
 *
 * @returns methods - individual functions to manage the form state. {@link UseFormReturn}
 *
 * @example
 * ```tsx
 * function App() {
 *   const { register, handleSubmit, watch, formState: { errors } } = useForm();
 *   const onSubmit = data => console.log(data);
 *
 *   console.log(watch("example"));
 *
 *   return (
 *     <form onSubmit={handleSubmit(onSubmit)}>
 *       <input defaultValue="test" {...register("example")} />
 *       <input {...register("exampleRequired", { required: true })} />
 *       {errors.exampleRequired && <span>This field is required</span>}
 *       <button>Submit</button>
 *     </form>
 *   );
 * }
 * ```
 */
function useForm(props = {}) {
    const _formControl = react__WEBPACK_IMPORTED_MODULE_0__.useRef(undefined);
    const _values = react__WEBPACK_IMPORTED_MODULE_0__.useRef(undefined);
    const _formControlProp = react__WEBPACK_IMPORTED_MODULE_0__.useRef(props.formControl);
    const [formState, updateFormState] = react__WEBPACK_IMPORTED_MODULE_0__.useState(() => ({
        ...cloneObject(DEFAULT_FORM_STATE),
        isLoading: isFunction(props.defaultValues),
        errors: props.errors || {},
        disabled: props.disabled || false,
        defaultValues: isFunction(props.defaultValues)
            ? undefined
            : props.defaultValues,
    }));
    if (!_formControl.current ||
        (props.formControl && _formControlProp.current !== props.formControl)) {
        _formControlProp.current = props.formControl;
        if (props.formControl) {
            _formControl.current = {
                ...props.formControl,
                formState,
            };
            if (props.defaultValues && !isFunction(props.defaultValues)) {
                props.formControl.reset(props.defaultValues, props.resetOptions);
            }
        }
        else {
            const { formControl, ...rest } = createFormControl(props);
            _formControl.current = {
                ...rest,
                formState,
            };
        }
    }
    const control = _formControl.current.control;
    control._options = props;
    const { resyncIfNeeded, snapshot } = useResyncOnReconnect();
    useIsomorphicLayoutEffect(() => {
        const getCurrentFormState = () => ({
            ...control._formState,
            defaultValues: control._defaultValues,
        });
        resyncIfNeeded(true, getCurrentFormState, updateFormState);
        const unsubscribe = control._subscribe({
            formState: control._proxyFormState,
            callback: () => updateFormState({
                ...control._formState,
                defaultValues: control._defaultValues,
            }),
            reRenderRoot: true,
        });
        updateFormState((data) => ({
            ...data,
            isReady: true,
        }));
        control._formState.isReady = true;
        return () => {
            unsubscribe();
            snapshot(true, getCurrentFormState);
        };
    }, [control, resyncIfNeeded, snapshot]);
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => control._disableForm(props.disabled), [control, props.disabled]);
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
        if (props.mode) {
            control._options.mode = props.mode;
        }
        if (props.reValidateMode) {
            control._options.reValidateMode = props.reValidateMode;
        }
    }, [control, props.mode, props.reValidateMode]);
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
        if (props.errors) {
            control._setErrors(props.errors);
            control._focusError();
        }
    }, [control, props.errors]);
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
        props.shouldUnregister &&
            control._subjects.state.next({
                values: control._getWatch(),
            });
    }, [control, props.shouldUnregister]);
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
        if (control._proxyFormState.isDirty) {
            const isDirty = control._getDirty();
            if (isDirty !== formState.isDirty) {
                control._subjects.state.next({
                    isDirty,
                });
            }
        }
    }, [control, formState.isDirty]);
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
        var _a;
        if (props.values && !deepEqual(props.values, _values.current)) {
            control._reset(props.values, {
                keepFieldsRef: true,
                ...control._options.resetOptions,
            });
            if (!((_a = control._options.resetOptions) === null || _a === void 0 ? void 0 : _a.keepIsValid)) {
                control._setValid();
            }
            _values.current = props.values;
            updateFormState((state) => ({ ...state }));
        }
        else {
            control._resetDefaultValues();
        }
    }, [control, props.values]);
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
        if (!control._state.mount) {
            control._setValid();
            control._state.mount = true;
        }
        if (control._state.watch) {
            control._state.watch = false;
            control._subjects.state.next({ ...control._formState });
        }
        control._removeUnmounted();
    });
    _formControl.current.formState = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => getProxyFormState(formState, control), [control, formState]);
    return _formControl.current;
}

/**
 * Watch component that subscribes to form field changes and re-renders when watched fields update.
 *
 * @param control - The form control object from useForm
 * @param name - Can be field name, array of field names, or undefined to watch the entire form
 * @param disabled - Disable subscription
 * @param exact - Whether to watch exact field names or not
 * @param defaultValue - The default value to use if the field is not yet set
 * @param compute - Function to compute derived values from watched fields
 * @param render - The function that receives watched values and returns ReactNode
 * @returns The result of calling render function with watched values
 *
 * @example
 * The `Watch` component only re-render when the values of `foo`, `bar`, and `baz.qux` change.
 * The types of `foo`, `bar`, and `baz.qux` are precisely inferred.
 *
 * ```tsx
 * const { control } = useForm();
 *
 * <Watch
 *   control={control}
 *   names={['foo', 'bar', 'baz.qux']}
 *   render={([foo, bar, baz_qux]) => <div>{foo}{bar}{baz_qux}</div>}
 * />
 * ```
 */
const Watch = (props) => props.render(useWatch({ name: props.names, ...props }));


//# sourceMappingURL=index.esm.mjs.map


/***/ },

/***/ "./node_modules/react-router/dist/development/chunk-62JRHF6Z.mjs"
/*!***********************************************************************!*\
  !*** ./node_modules/react-router/dist/development/chunk-62JRHF6Z.mjs ***!
  \***********************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

let react__WEBPACK_IMPORTED_MODULE_0___namespace_cache;
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Action: () => (/* binding */ Action),
/* harmony export */   Await: () => (/* binding */ Await),
/* harmony export */   AwaitContextProvider: () => (/* binding */ AwaitContextProvider),
/* harmony export */   BrowserRouter: () => (/* binding */ BrowserRouter),
/* harmony export */   CRITICAL_CSS_DATA_ATTRIBUTE: () => (/* binding */ CRITICAL_CSS_DATA_ATTRIBUTE),
/* harmony export */   DataRouterContext: () => (/* binding */ DataRouterContext),
/* harmony export */   DataRouterStateContext: () => (/* binding */ DataRouterStateContext),
/* harmony export */   ENABLE_DEV_WARNINGS: () => (/* binding */ ENABLE_DEV_WARNINGS),
/* harmony export */   ErrorResponseImpl: () => (/* binding */ ErrorResponseImpl),
/* harmony export */   FetchersContext: () => (/* binding */ FetchersContext),
/* harmony export */   Form: () => (/* binding */ Form),
/* harmony export */   FrameworkContext: () => (/* binding */ FrameworkContext),
/* harmony export */   HashRouter: () => (/* binding */ HashRouter),
/* harmony export */   HistoryRouter: () => (/* binding */ HistoryRouter),
/* harmony export */   IDLE_BLOCKER: () => (/* binding */ IDLE_BLOCKER),
/* harmony export */   IDLE_FETCHER: () => (/* binding */ IDLE_FETCHER),
/* harmony export */   IDLE_NAVIGATION: () => (/* binding */ IDLE_NAVIGATION),
/* harmony export */   Link: () => (/* binding */ Link),
/* harmony export */   Links: () => (/* binding */ Links),
/* harmony export */   LocationContext: () => (/* binding */ LocationContext),
/* harmony export */   MemoryRouter: () => (/* binding */ MemoryRouter),
/* harmony export */   Meta: () => (/* binding */ Meta),
/* harmony export */   NO_BODY_STATUS_CODES: () => (/* binding */ NO_BODY_STATUS_CODES),
/* harmony export */   NavLink: () => (/* binding */ NavLink),
/* harmony export */   Navigate: () => (/* binding */ Navigate),
/* harmony export */   NavigationContext: () => (/* binding */ NavigationContext),
/* harmony export */   Outlet: () => (/* binding */ Outlet),
/* harmony export */   PROTOCOL_RELATIVE_URL_REGEX: () => (/* binding */ PROTOCOL_RELATIVE_URL_REGEX),
/* harmony export */   PrefetchPageLinks: () => (/* binding */ PrefetchPageLinks),
/* harmony export */   RSCRouterContext: () => (/* binding */ RSCRouterContext),
/* harmony export */   RemixErrorBoundary: () => (/* binding */ RemixErrorBoundary),
/* harmony export */   Route: () => (/* binding */ Route),
/* harmony export */   RouteContext: () => (/* binding */ RouteContext),
/* harmony export */   Router: () => (/* binding */ Router),
/* harmony export */   RouterContextProvider: () => (/* binding */ RouterContextProvider),
/* harmony export */   RouterProvider: () => (/* binding */ RouterProvider),
/* harmony export */   Routes: () => (/* binding */ Routes),
/* harmony export */   SINGLE_FETCH_REDIRECT_STATUS: () => (/* binding */ SINGLE_FETCH_REDIRECT_STATUS),
/* harmony export */   Scripts: () => (/* binding */ Scripts),
/* harmony export */   ScrollRestoration: () => (/* binding */ ScrollRestoration),
/* harmony export */   SingleFetchRedirectSymbol: () => (/* binding */ SingleFetchRedirectSymbol),
/* harmony export */   StaticRouter: () => (/* binding */ StaticRouter),
/* harmony export */   StaticRouterProvider: () => (/* binding */ StaticRouterProvider),
/* harmony export */   StreamTransfer: () => (/* binding */ StreamTransfer),
/* harmony export */   URL_LIMIT: () => (/* binding */ URL_LIMIT),
/* harmony export */   ViewTransitionContext: () => (/* binding */ ViewTransitionContext),
/* harmony export */   WithComponentProps: () => (/* binding */ WithComponentProps),
/* harmony export */   WithErrorBoundaryProps: () => (/* binding */ WithErrorBoundaryProps),
/* harmony export */   WithHydrateFallbackProps: () => (/* binding */ WithHydrateFallbackProps),
/* harmony export */   convertRoutesToDataRoutes: () => (/* binding */ convertRoutesToDataRoutes),
/* harmony export */   createBrowserHistory: () => (/* binding */ createBrowserHistory),
/* harmony export */   createBrowserRouter: () => (/* binding */ createBrowserRouter),
/* harmony export */   createClientRoutes: () => (/* binding */ createClientRoutes),
/* harmony export */   createClientRoutesWithHMRRevalidationOptOut: () => (/* binding */ createClientRoutesWithHMRRevalidationOptOut),
/* harmony export */   createContext: () => (/* binding */ createContext),
/* harmony export */   createHashHistory: () => (/* binding */ createHashHistory),
/* harmony export */   createHashRouter: () => (/* binding */ createHashRouter),
/* harmony export */   createMemoryHistory: () => (/* binding */ createMemoryHistory),
/* harmony export */   createMemoryRouter: () => (/* binding */ createMemoryRouter),
/* harmony export */   createPath: () => (/* binding */ createPath),
/* harmony export */   createRequestInit: () => (/* binding */ createRequestInit),
/* harmony export */   createRouter: () => (/* binding */ createRouter),
/* harmony export */   createRoutesFromChildren: () => (/* binding */ createRoutesFromChildren),
/* harmony export */   createRoutesFromElements: () => (/* binding */ createRoutesFromElements),
/* harmony export */   createSearchParams: () => (/* binding */ createSearchParams),
/* harmony export */   createServerRoutes: () => (/* binding */ createServerRoutes),
/* harmony export */   createStaticHandler: () => (/* binding */ createStaticHandler),
/* harmony export */   createStaticHandler2: () => (/* binding */ createStaticHandler2),
/* harmony export */   createStaticRouter: () => (/* binding */ createStaticRouter),
/* harmony export */   data: () => (/* binding */ data),
/* harmony export */   decodeRedirectErrorDigest: () => (/* binding */ decodeRedirectErrorDigest),
/* harmony export */   decodeRouteErrorResponseDigest: () => (/* binding */ decodeRouteErrorResponseDigest),
/* harmony export */   decodeViaTurboStream: () => (/* binding */ decodeViaTurboStream),
/* harmony export */   encode: () => (/* binding */ encode),
/* harmony export */   escapeHtml: () => (/* binding */ escapeHtml),
/* harmony export */   generatePath: () => (/* binding */ generatePath),
/* harmony export */   getManifestPath: () => (/* binding */ getManifestPath),
/* harmony export */   getPatchRoutesOnNavigationFunction: () => (/* binding */ getPatchRoutesOnNavigationFunction),
/* harmony export */   getPathsWithAncestors: () => (/* binding */ getPathsWithAncestors),
/* harmony export */   getSingleFetchDataStrategyImpl: () => (/* binding */ getSingleFetchDataStrategyImpl),
/* harmony export */   getStaticContextFromError: () => (/* binding */ getStaticContextFromError),
/* harmony export */   getTurboStreamSingleFetchDataStrategy: () => (/* binding */ getTurboStreamSingleFetchDataStrategy),
/* harmony export */   hasInvalidProtocol: () => (/* binding */ hasInvalidProtocol),
/* harmony export */   hydrationRouteProperties: () => (/* binding */ hydrationRouteProperties),
/* harmony export */   instrumentHandler: () => (/* binding */ instrumentHandler),
/* harmony export */   invariant: () => (/* binding */ invariant),
/* harmony export */   isDataWithResponseInit: () => (/* binding */ isDataWithResponseInit),
/* harmony export */   isMutationMethod: () => (/* binding */ isMutationMethod),
/* harmony export */   isRedirectResponse: () => (/* binding */ isRedirectResponse),
/* harmony export */   isRedirectStatusCode: () => (/* binding */ isRedirectStatusCode),
/* harmony export */   isResponse: () => (/* binding */ isResponse),
/* harmony export */   isRouteErrorResponse: () => (/* binding */ isRouteErrorResponse),
/* harmony export */   mapRouteProperties: () => (/* binding */ mapRouteProperties),
/* harmony export */   matchPath: () => (/* binding */ matchPath),
/* harmony export */   matchRoutes: () => (/* binding */ matchRoutes),
/* harmony export */   matchRoutesImpl: () => (/* binding */ matchRoutesImpl),
/* harmony export */   noActionDefinedError: () => (/* binding */ noActionDefinedError),
/* harmony export */   parsePath: () => (/* binding */ parsePath),
/* harmony export */   redirect: () => (/* binding */ redirect),
/* harmony export */   redirectDocument: () => (/* binding */ redirectDocument),
/* harmony export */   renderMatches: () => (/* binding */ renderMatches),
/* harmony export */   replace: () => (/* binding */ replace),
/* harmony export */   resolvePath: () => (/* binding */ resolvePath),
/* harmony export */   setIsHydrated: () => (/* binding */ setIsHydrated),
/* harmony export */   shouldHydrateRouteLoader: () => (/* binding */ shouldHydrateRouteLoader),
/* harmony export */   singleFetchUrl: () => (/* binding */ singleFetchUrl),
/* harmony export */   stripBasename: () => (/* binding */ stripBasename),
/* harmony export */   stripIndexParam: () => (/* binding */ stripIndexParam),
/* harmony export */   useActionData: () => (/* binding */ useActionData),
/* harmony export */   useAsyncError: () => (/* binding */ useAsyncError),
/* harmony export */   useAsyncValue: () => (/* binding */ useAsyncValue),
/* harmony export */   useBeforeUnload: () => (/* binding */ useBeforeUnload),
/* harmony export */   useBlocker: () => (/* binding */ useBlocker),
/* harmony export */   useFetcher: () => (/* binding */ useFetcher),
/* harmony export */   useFetchers: () => (/* binding */ useFetchers),
/* harmony export */   useFogOFWarDiscovery: () => (/* binding */ useFogOFWarDiscovery),
/* harmony export */   useFormAction: () => (/* binding */ useFormAction),
/* harmony export */   useHref: () => (/* binding */ useHref),
/* harmony export */   useInRouterContext: () => (/* binding */ useInRouterContext),
/* harmony export */   useLinkClickHandler: () => (/* binding */ useLinkClickHandler),
/* harmony export */   useLoaderData: () => (/* binding */ useLoaderData),
/* harmony export */   useLocation: () => (/* binding */ useLocation),
/* harmony export */   useMatch: () => (/* binding */ useMatch),
/* harmony export */   useMatches: () => (/* binding */ useMatches),
/* harmony export */   useNavigate: () => (/* binding */ useNavigate),
/* harmony export */   useNavigation: () => (/* binding */ useNavigation),
/* harmony export */   useNavigationType: () => (/* binding */ useNavigationType),
/* harmony export */   useOutlet: () => (/* binding */ useOutlet),
/* harmony export */   useOutletContext: () => (/* binding */ useOutletContext),
/* harmony export */   useParams: () => (/* binding */ useParams),
/* harmony export */   usePrompt: () => (/* binding */ usePrompt),
/* harmony export */   useResolvedPath: () => (/* binding */ useResolvedPath),
/* harmony export */   useRevalidator: () => (/* binding */ useRevalidator),
/* harmony export */   useRoute: () => (/* binding */ useRoute),
/* harmony export */   useRouteError: () => (/* binding */ useRouteError),
/* harmony export */   useRouteLoaderData: () => (/* binding */ useRouteLoaderData),
/* harmony export */   useRouterState: () => (/* binding */ useRouterState),
/* harmony export */   useRoutes: () => (/* binding */ useRoutes),
/* harmony export */   useScrollRestoration: () => (/* binding */ useScrollRestoration),
/* harmony export */   useSearchParams: () => (/* binding */ useSearchParams),
/* harmony export */   useSubmit: () => (/* binding */ useSubmit),
/* harmony export */   useViewTransitionState: () => (/* binding */ useViewTransitionState),
/* harmony export */   warnOnce: () => (/* binding */ warnOnce),
/* harmony export */   withComponentProps: () => (/* binding */ withComponentProps),
/* harmony export */   withErrorBoundaryProps: () => (/* binding */ withErrorBoundaryProps),
/* harmony export */   withHydrateFallbackProps: () => (/* binding */ withHydrateFallbackProps)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/**
 * react-router v7.18.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
var __typeError = (msg) => {
  throw TypeError(msg);
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);

// lib/router/url.ts
var ABSOLUTE_URL_REGEX = /^(?:[a-z][a-z0-9+.-]*:|[\\/]{2})/i;
var PROTOCOL_RELATIVE_URL_REGEX = /^[\\/]{2}/;
function normalizeProtocolRelativeUrl(url, protocol) {
  return protocol + url.replace(/\\/g, "/");
}

// lib/router/history.ts
var Action = /* @__PURE__ */ ((Action2) => {
  Action2["Pop"] = "POP";
  Action2["Push"] = "PUSH";
  Action2["Replace"] = "REPLACE";
  return Action2;
})(Action || {});
var PopStateEventType = "popstate";
function isLocation(obj) {
  return typeof obj === "object" && obj != null && "pathname" in obj && "search" in obj && "hash" in obj && "state" in obj && "key" in obj;
}
function createMemoryHistory(options = {}) {
  let { initialEntries = ["/"], initialIndex, v5Compat = false } = options;
  let entries;
  entries = initialEntries.map(
    (entry, index2) => createMemoryLocation(
      entry,
      typeof entry === "string" ? null : entry.state,
      index2 === 0 ? "default" : void 0,
      typeof entry === "string" ? void 0 : entry.mask
    )
  );
  let index = clampIndex(
    initialIndex == null ? entries.length - 1 : initialIndex
  );
  let action = "POP" /* Pop */;
  let listener = null;
  function clampIndex(n) {
    return Math.min(Math.max(n, 0), entries.length - 1);
  }
  function getCurrentLocation() {
    return entries[index];
  }
  function createMemoryLocation(to, state = null, key, mask) {
    let location = createLocation(
      entries ? getCurrentLocation().pathname : "/",
      to,
      state,
      key,
      mask
    );
    warning(
      location.pathname.charAt(0) === "/",
      `relative pathnames are not supported in memory history: ${JSON.stringify(
        to
      )}`
    );
    return location;
  }
  function createHref2(to) {
    return typeof to === "string" ? to : createPath(to);
  }
  let history = {
    get index() {
      return index;
    },
    get action() {
      return action;
    },
    get location() {
      return getCurrentLocation();
    },
    createHref: createHref2,
    createURL(to) {
      return new URL(createHref2(to), "http://localhost");
    },
    encodeLocation(to) {
      let path = typeof to === "string" ? parsePath(to) : to;
      return {
        pathname: path.pathname || "",
        search: path.search || "",
        hash: path.hash || ""
      };
    },
    push(to, state) {
      action = "PUSH" /* Push */;
      let nextLocation = isLocation(to) ? to : createMemoryLocation(to, state);
      index += 1;
      entries.splice(index, entries.length, nextLocation);
      if (v5Compat && listener) {
        listener({ action, location: nextLocation, delta: 1 });
      }
    },
    replace(to, state) {
      action = "REPLACE" /* Replace */;
      let nextLocation = isLocation(to) ? to : createMemoryLocation(to, state);
      entries[index] = nextLocation;
      if (v5Compat && listener) {
        listener({ action, location: nextLocation, delta: 0 });
      }
    },
    go(delta) {
      action = "POP" /* Pop */;
      let nextIndex = clampIndex(index + delta);
      let nextLocation = entries[nextIndex];
      index = nextIndex;
      if (listener) {
        listener({ action, location: nextLocation, delta });
      }
    },
    listen(fn) {
      listener = fn;
      return () => {
        listener = null;
      };
    }
  };
  return history;
}
function createBrowserHistory(options = {}) {
  function createBrowserLocation(window2, globalHistory) {
    let maskedLocation = globalHistory.state?.masked;
    let { pathname, search, hash } = maskedLocation || window2.location;
    return createLocation(
      "",
      { pathname, search, hash },
      // state defaults to `null` because `window.history.state` does
      globalHistory.state && globalHistory.state.usr || null,
      globalHistory.state && globalHistory.state.key || "default",
      maskedLocation ? {
        pathname: window2.location.pathname,
        search: window2.location.search,
        hash: window2.location.hash
      } : void 0
    );
  }
  function createBrowserHref(window2, to) {
    return typeof to === "string" ? to : createPath(to);
  }
  return getUrlBasedHistory(
    createBrowserLocation,
    createBrowserHref,
    null,
    options
  );
}
function createHashHistory(options = {}) {
  function createHashLocation(window2, globalHistory) {
    let {
      pathname = "/",
      search = "",
      hash = ""
    } = parsePath(window2.location.hash.substring(1));
    if (!pathname.startsWith("/") && !pathname.startsWith(".")) {
      pathname = "/" + pathname;
    }
    return createLocation(
      "",
      { pathname, search, hash },
      // state defaults to `null` because `window.history.state` does
      globalHistory.state && globalHistory.state.usr || null,
      globalHistory.state && globalHistory.state.key || "default"
    );
  }
  function createHashHref(window2, to) {
    let base = window2.document.querySelector("base");
    let href = "";
    if (base && base.getAttribute("href")) {
      let url = window2.location.href;
      let hashIndex = url.indexOf("#");
      href = hashIndex === -1 ? url : url.slice(0, hashIndex);
    }
    return href + "#" + (typeof to === "string" ? to : createPath(to));
  }
  function validateHashLocation(location, to) {
    warning(
      location.pathname.charAt(0) === "/",
      `relative pathnames are not supported in hash history.push(${JSON.stringify(
        to
      )})`
    );
  }
  return getUrlBasedHistory(
    createHashLocation,
    createHashHref,
    validateHashLocation,
    options
  );
}
function invariant(value, message) {
  if (value === false || value === null || typeof value === "undefined") {
    throw new Error(message);
  }
}
function warning(cond, message) {
  if (!cond) {
    if (typeof console !== "undefined") console.warn(message);
    try {
      throw new Error(message);
    } catch (e) {
    }
  }
}
function createKey() {
  return Math.random().toString(36).substring(2, 10);
}
function getHistoryState(location, index) {
  return {
    usr: location.state,
    key: location.key,
    idx: index,
    masked: location.mask ? {
      pathname: location.pathname,
      search: location.search,
      hash: location.hash
    } : void 0
  };
}
function createLocation(current, to, state = null, key, mask) {
  let location = {
    pathname: typeof current === "string" ? current : current.pathname,
    search: "",
    hash: "",
    ...typeof to === "string" ? parsePath(to) : to,
    state,
    // TODO: This could be cleaned up.  push/replace should probably just take
    // full Locations now and avoid the need to run through this flow at all
    // But that's a pretty big refactor to the current test suite so going to
    // keep as is for the time being and just let any incoming keys take precedence
    key: to && to.key || key || createKey(),
    mask
  };
  return location;
}
function createPath({
  pathname = "/",
  search = "",
  hash = ""
}) {
  if (search && search !== "?")
    pathname += search.charAt(0) === "?" ? search : "?" + search;
  if (hash && hash !== "#")
    pathname += hash.charAt(0) === "#" ? hash : "#" + hash;
  return pathname;
}
function parsePath(path) {
  let parsedPath = {};
  if (path) {
    let hashIndex = path.indexOf("#");
    if (hashIndex >= 0) {
      parsedPath.hash = path.substring(hashIndex);
      path = path.substring(0, hashIndex);
    }
    let searchIndex = path.indexOf("?");
    if (searchIndex >= 0) {
      parsedPath.search = path.substring(searchIndex);
      path = path.substring(0, searchIndex);
    }
    if (path) {
      parsedPath.pathname = path;
    }
  }
  return parsedPath;
}
function getUrlBasedHistory(getLocation, createHref2, validateLocation, options = {}) {
  let { window: window2 = document.defaultView, v5Compat = false } = options;
  let globalHistory = window2.history;
  let action = "POP" /* Pop */;
  let listener = null;
  let index = getIndex();
  if (index == null) {
    index = 0;
    globalHistory.replaceState({ ...globalHistory.state, idx: index }, "");
  }
  function getIndex() {
    let state = globalHistory.state || { idx: null };
    return state.idx;
  }
  function handlePop() {
    action = "POP" /* Pop */;
    let nextIndex = getIndex();
    let delta = nextIndex == null ? null : nextIndex - index;
    index = nextIndex;
    if (listener) {
      listener({ action, location: history.location, delta });
    }
  }
  function push(to, state) {
    action = "PUSH" /* Push */;
    let location = isLocation(to) ? to : createLocation(history.location, to, state);
    if (validateLocation) validateLocation(location, to);
    index = getIndex() + 1;
    let historyState = getHistoryState(location, index);
    let url = history.createHref(location.mask || location);
    try {
      globalHistory.pushState(historyState, "", url);
    } catch (error) {
      if (error instanceof DOMException && error.name === "DataCloneError") {
        throw error;
      }
      window2.location.assign(url);
    }
    if (v5Compat && listener) {
      listener({ action, location: history.location, delta: 1 });
    }
  }
  function replace2(to, state) {
    action = "REPLACE" /* Replace */;
    let location = isLocation(to) ? to : createLocation(history.location, to, state);
    if (validateLocation) validateLocation(location, to);
    index = getIndex();
    let historyState = getHistoryState(location, index);
    let url = history.createHref(location.mask || location);
    globalHistory.replaceState(historyState, "", url);
    if (v5Compat && listener) {
      listener({ action, location: history.location, delta: 0 });
    }
  }
  function createURL(to) {
    return createBrowserURLImpl(window2, to);
  }
  let history = {
    get action() {
      return action;
    },
    get location() {
      return getLocation(window2, globalHistory);
    },
    listen(fn) {
      if (listener) {
        throw new Error("A history only accepts one active listener");
      }
      window2.addEventListener(PopStateEventType, handlePop);
      listener = fn;
      return () => {
        window2.removeEventListener(PopStateEventType, handlePop);
        listener = null;
      };
    },
    createHref(to) {
      return createHref2(window2, to);
    },
    createURL,
    encodeLocation(to) {
      let url = createURL(to);
      return {
        pathname: url.pathname,
        search: url.search,
        hash: url.hash
      };
    },
    push,
    replace: replace2,
    go(n) {
      return globalHistory.go(n);
    }
  };
  return history;
}
function createBrowserURLImpl(windowImpl, to, isAbsolute = false) {
  let base = "http://localhost";
  if (windowImpl) {
    base = windowImpl.location.origin !== "null" ? windowImpl.location.origin : windowImpl.location.href;
  }
  invariant(base, "No window.location.(origin|href) available to create URL");
  let href = typeof to === "string" ? to : createPath(to);
  href = href.replace(/ $/, "%20");
  if (!isAbsolute && PROTOCOL_RELATIVE_URL_REGEX.test(href)) {
    href = base + href;
  }
  return new URL(href, base);
}

// lib/router/utils.ts
function createContext(defaultValue) {
  return { defaultValue };
}
var _map;
var RouterContextProvider = class {
  /**
   * Create a new `RouterContextProvider` instance
   * @param init An optional initial context map to populate the provider with
   */
  constructor(init) {
    __privateAdd(this, _map, /* @__PURE__ */ new Map());
    if (init) {
      for (let [context, value] of init) {
        this.set(context, value);
      }
    }
  }
  /**
   * Access a value from the context. If no value has been set for the context,
   * it will return the context's `defaultValue` if provided, or throw an error
   * if no `defaultValue` was set.
   * @param context The context to get the value for
   * @returns The value for the context, or the context's `defaultValue` if no
   * value was set
   */
  get(context) {
    if (__privateGet(this, _map).has(context)) {
      return __privateGet(this, _map).get(context);
    }
    if (context.defaultValue !== void 0) {
      return context.defaultValue;
    }
    throw new Error("No value found for context");
  }
  /**
   * Set a value for the context. If the context already has a value set, this
   * will overwrite it.
   *
   * @param context The context to set the value for
   * @param value The value to set for the context
   * @returns {void}
   */
  set(context, value) {
    __privateGet(this, _map).set(context, value);
  }
};
_map = new WeakMap();
var unsupportedLazyRouteObjectKeys = /* @__PURE__ */ new Set([
  "lazy",
  "caseSensitive",
  "path",
  "id",
  "index",
  "children"
]);
function isUnsupportedLazyRouteObjectKey(key) {
  return unsupportedLazyRouteObjectKeys.has(
    key
  );
}
var unsupportedLazyRouteFunctionKeys = /* @__PURE__ */ new Set([
  "lazy",
  "caseSensitive",
  "path",
  "id",
  "index",
  "middleware",
  "children"
]);
function isUnsupportedLazyRouteFunctionKey(key) {
  return unsupportedLazyRouteFunctionKeys.has(
    key
  );
}
function isIndexRoute(route) {
  return route.index === true;
}
function convertRoutesToDataRoutes(routes, mapRouteProperties2, parentPath = [], manifest = {}, allowInPlaceMutations = false) {
  return routes.map((route, index) => {
    let treePath = [...parentPath, String(index)];
    let id = typeof route.id === "string" ? route.id : treePath.join("-");
    invariant(
      route.index !== true || !route.children,
      `Cannot specify children on an index route`
    );
    invariant(
      allowInPlaceMutations || !manifest[id],
      `Found a route id collision on id "${id}".  Route id's must be globally unique within Data Router usages`
    );
    if (isIndexRoute(route)) {
      let indexRoute = {
        ...route,
        id
      };
      manifest[id] = mergeRouteUpdates(
        indexRoute,
        mapRouteProperties2(indexRoute)
      );
      return indexRoute;
    } else {
      let pathOrLayoutRoute = {
        ...route,
        id,
        children: void 0
      };
      manifest[id] = mergeRouteUpdates(
        pathOrLayoutRoute,
        mapRouteProperties2(pathOrLayoutRoute)
      );
      if (route.children) {
        pathOrLayoutRoute.children = convertRoutesToDataRoutes(
          route.children,
          mapRouteProperties2,
          treePath,
          manifest,
          allowInPlaceMutations
        );
      }
      return pathOrLayoutRoute;
    }
  });
}
function mergeRouteUpdates(route, updates) {
  return Object.assign(route, {
    ...updates,
    ...typeof updates.lazy === "object" && updates.lazy != null ? {
      lazy: {
        ...route.lazy,
        ...updates.lazy
      }
    } : {}
  });
}
function matchRoutes(routes, locationArg, basename = "/") {
  return matchRoutesImpl(routes, locationArg, basename, false);
}
function matchRoutesImpl(routes, locationArg, basename, allowPartial, precomputedBranches) {
  let location = typeof locationArg === "string" ? parsePath(locationArg) : locationArg;
  let pathname = stripBasename(location.pathname || "/", basename);
  if (pathname == null) {
    return null;
  }
  let branches = precomputedBranches ?? flattenAndRankRoutes(routes);
  let matches = null;
  let decoded = decodePath(pathname);
  for (let i = 0; matches == null && i < branches.length; ++i) {
    matches = matchRouteBranch(
      branches[i],
      decoded,
      allowPartial
    );
  }
  return matches;
}
function convertRouteMatchToUiMatch(match, loaderData) {
  let { route, pathname, params } = match;
  return {
    id: route.id,
    pathname,
    params,
    data: loaderData[route.id],
    loaderData: loaderData[route.id],
    handle: route.handle
  };
}
function flattenAndRankRoutes(routes) {
  let branches = flattenRoutes(routes);
  rankRouteBranches(branches);
  return branches;
}
function flattenRoutes(routes, branches = [], parentsMeta = [], parentPath = "", _hasParentOptionalSegments = false) {
  let flattenRoute = (route, index, hasParentOptionalSegments = _hasParentOptionalSegments, relativePath) => {
    let meta = {
      relativePath: relativePath === void 0 ? route.path || "" : relativePath,
      caseSensitive: route.caseSensitive === true,
      childrenIndex: index,
      route
    };
    if (meta.relativePath.startsWith("/")) {
      if (!meta.relativePath.startsWith(parentPath) && hasParentOptionalSegments) {
        return;
      }
      invariant(
        meta.relativePath.startsWith(parentPath),
        `Absolute route path "${meta.relativePath}" nested under path "${parentPath}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`
      );
      meta.relativePath = meta.relativePath.slice(parentPath.length);
    }
    let path = joinPaths([parentPath, meta.relativePath]);
    let routesMeta = parentsMeta.concat(meta);
    if (route.children && route.children.length > 0) {
      invariant(
        // Our types know better, but runtime JS may not!
        // @ts-expect-error
        route.index !== true,
        `Index routes must not have child routes. Please remove all child routes from route path "${path}".`
      );
      flattenRoutes(
        route.children,
        branches,
        routesMeta,
        path,
        hasParentOptionalSegments
      );
    }
    if (route.path == null && !route.index) {
      return;
    }
    branches.push({
      path,
      score: computeScore(path, route.index),
      routesMeta: routesMeta.map((meta2, i) => {
        let [matcher, params] = compilePath(
          meta2.relativePath,
          meta2.caseSensitive,
          i === routesMeta.length - 1
        );
        return {
          ...meta2,
          matcher,
          compiledParams: params
        };
      })
    });
  };
  routes.forEach((route, index) => {
    if (route.path === "" || !route.path?.includes("?")) {
      flattenRoute(route, index);
    } else {
      for (let exploded of explodeOptionalSegments(route.path)) {
        flattenRoute(route, index, true, exploded);
      }
    }
  });
  return branches;
}
function explodeOptionalSegments(path) {
  let segments = path.split("/");
  if (segments.length === 0) return [];
  let [first, ...rest] = segments;
  let isOptional = first.endsWith("?");
  let required = first.replace(/\?$/, "");
  if (rest.length === 0) {
    return isOptional ? [required, ""] : [required];
  }
  let restExploded = explodeOptionalSegments(rest.join("/"));
  let result = [];
  result.push(
    ...restExploded.map(
      (subpath) => subpath === "" ? required : [required, subpath].join("/")
    )
  );
  if (isOptional) {
    result.push(...restExploded);
  }
  return result.map(
    (exploded) => path.startsWith("/") && exploded === "" ? "/" : exploded
  );
}
function rankRouteBranches(branches) {
  branches.sort(
    (a, b) => a.score !== b.score ? b.score - a.score : compareIndexes(
      a.routesMeta.map((meta) => meta.childrenIndex),
      b.routesMeta.map((meta) => meta.childrenIndex)
    )
  );
}
var paramRe = /^:[\w-]+$/;
var dynamicSegmentValue = 3;
var indexRouteValue = 2;
var emptySegmentValue = 1;
var staticSegmentValue = 10;
var splatPenalty = -2;
var isSplat = (s) => s === "*";
function computeScore(path, index) {
  let segments = path.split("/");
  let initialScore = segments.length;
  if (segments.some(isSplat)) {
    initialScore += splatPenalty;
  }
  if (index) {
    initialScore += indexRouteValue;
  }
  return segments.filter((s) => !isSplat(s)).reduce(
    (score, segment) => score + (paramRe.test(segment) ? dynamicSegmentValue : segment === "" ? emptySegmentValue : staticSegmentValue),
    initialScore
  );
}
function compareIndexes(a, b) {
  let siblings = a.length === b.length && a.slice(0, -1).every((n, i) => n === b[i]);
  return siblings ? (
    // If two routes are siblings, we should try to match the earlier sibling
    // first. This allows people to have fine-grained control over the matching
    // behavior by simply putting routes with identical paths in the order they
    // want them tried.
    a[a.length - 1] - b[b.length - 1]
  ) : (
    // Otherwise, it doesn't really make sense to rank non-siblings by index,
    // so they sort equally.
    0
  );
}
function matchRouteBranch(branch, pathname, allowPartial = false) {
  let { routesMeta } = branch;
  let matchedParams = {};
  let matchedPathname = "/";
  let matches = [];
  for (let i = 0; i < routesMeta.length; ++i) {
    let meta = routesMeta[i];
    let end = i === routesMeta.length - 1;
    let remainingPathname = matchedPathname === "/" ? pathname : pathname.slice(matchedPathname.length) || "/";
    let pattern = {
      path: meta.relativePath,
      caseSensitive: meta.caseSensitive,
      end
    };
    let match = (
      // Use precomputed matcher if it exists
      meta.matcher && meta.compiledParams ? matchPathImpl(
        pattern,
        remainingPathname,
        meta.matcher,
        meta.compiledParams
      ) : matchPath(pattern, remainingPathname)
    );
    let route = meta.route;
    if (!match && end && allowPartial && !routesMeta[routesMeta.length - 1].route.index) {
      match = matchPath(
        {
          path: meta.relativePath,
          caseSensitive: meta.caseSensitive,
          end: false
        },
        remainingPathname
      );
    }
    if (!match) {
      return null;
    }
    Object.assign(matchedParams, match.params);
    matches.push({
      // TODO: Can this as be avoided?
      params: matchedParams,
      pathname: joinPaths([matchedPathname, match.pathname]),
      pathnameBase: normalizePathname(
        joinPaths([matchedPathname, match.pathnameBase])
      ),
      route
    });
    if (match.pathnameBase !== "/") {
      matchedPathname = joinPaths([matchedPathname, match.pathnameBase]);
    }
  }
  return matches;
}
function generatePath(originalPath, params = {}) {
  let path = originalPath;
  if (path.endsWith("*") && path !== "*" && !path.endsWith("/*")) {
    warning(
      false,
      `Route path "${path}" will be treated as if it were "${path.replace(/\*$/, "/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${path.replace(/\*$/, "/*")}".`
    );
    path = path.replace(/\*$/, "/*");
  }
  const prefix = path.startsWith("/") ? "/" : "";
  const stringify2 = (p) => p == null ? "" : typeof p === "string" ? p : String(p);
  const segments = path.split(/\/+/).map((segment, index, array) => {
    const isLastSegment = index === array.length - 1;
    if (isLastSegment && segment === "*") {
      return stringify2(params["*"]);
    }
    const keyMatch = segment.match(/^:([\w-]+)(\??)(.*)/);
    if (keyMatch) {
      const [, key, optional, suffix] = keyMatch;
      let param = params[key];
      invariant(optional === "?" || param != null, `Missing ":${key}" param`);
      return encodeURIComponent(stringify2(param)) + suffix;
    }
    return segment.replace(/\?$/g, "");
  }).filter((segment) => !!segment);
  return prefix + segments.join("/");
}
function matchPath(pattern, pathname) {
  if (typeof pattern === "string") {
    pattern = { path: pattern, caseSensitive: false, end: true };
  }
  let [matcher, compiledParams] = compilePath(
    pattern.path,
    pattern.caseSensitive,
    pattern.end
  );
  return matchPathImpl(pattern, pathname, matcher, compiledParams);
}
function matchPathImpl(pattern, pathname, matcher, compiledParams) {
  let match = pathname.match(matcher);
  if (!match) return null;
  let matchedPathname = match[0];
  let pathnameBase = matchedPathname.replace(/(.)\/+$/, "$1");
  let captureGroups = match.slice(1);
  let params = compiledParams.reduce(
    (memo2, { paramName, isOptional }, index) => {
      if (paramName === "*") {
        let splatValue = captureGroups[index] || "";
        pathnameBase = matchedPathname.slice(0, matchedPathname.length - splatValue.length).replace(/(.)\/+$/, "$1");
      }
      const value = captureGroups[index];
      if (isOptional && !value) {
        memo2[paramName] = void 0;
      } else {
        memo2[paramName] = (value || "").replace(/%2F/g, "/");
      }
      return memo2;
    },
    {}
  );
  return {
    params,
    pathname: matchedPathname,
    pathnameBase,
    pattern
  };
}
function compilePath(path, caseSensitive = false, end = true) {
  warning(
    path === "*" || !path.endsWith("*") || path.endsWith("/*"),
    `Route path "${path}" will be treated as if it were "${path.replace(/\*$/, "/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${path.replace(/\*$/, "/*")}".`
  );
  let params = [];
  let regexpSource = "^" + path.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(
    /\/:([\w-]+)(\?)?/g,
    (match, paramName, isOptional, index, str) => {
      params.push({ paramName, isOptional: isOptional != null });
      if (isOptional) {
        let nextChar = str.charAt(index + match.length);
        if (nextChar && nextChar !== "/") {
          return "/([^\\/]*)";
        }
        return "(?:/([^\\/]*))?";
      }
      return "/([^\\/]+)";
    }
  ).replace(/\/([\w-]+)\?(\/|$)/g, "(/$1)?$2");
  if (path.endsWith("*")) {
    params.push({ paramName: "*" });
    regexpSource += path === "*" || path === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$";
  } else if (end) {
    regexpSource += "\\/*$";
  } else if (path !== "" && path !== "/") {
    regexpSource += "(?:(?=\\/|$))";
  } else {
  }
  let matcher = new RegExp(regexpSource, caseSensitive ? void 0 : "i");
  return [matcher, params];
}
function decodePath(value) {
  try {
    return value.split("/").map((v) => decodeURIComponent(v).replace(/\//g, "%2F")).join("/");
  } catch (error) {
    warning(
      false,
      `The URL path "${value}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${error}).`
    );
    return value;
  }
}
function stripBasename(pathname, basename) {
  if (basename === "/") return pathname;
  if (!pathname.toLowerCase().startsWith(basename.toLowerCase())) {
    return null;
  }
  let startIndex = basename.endsWith("/") ? basename.length - 1 : basename.length;
  let nextChar = pathname.charAt(startIndex);
  if (nextChar && nextChar !== "/") {
    return null;
  }
  return pathname.slice(startIndex) || "/";
}
function prependBasename({
  basename,
  pathname
}) {
  return pathname === "/" ? basename : joinPaths([basename, pathname]);
}
var isAbsoluteUrl = (url) => ABSOLUTE_URL_REGEX.test(url);
function resolvePath(to, fromPathname = "/") {
  let {
    pathname: toPathname,
    search = "",
    hash = ""
  } = typeof to === "string" ? parsePath(to) : to;
  let pathname;
  if (toPathname) {
    toPathname = removeDoubleSlashes(toPathname);
    if (toPathname.startsWith("/")) {
      pathname = resolvePathname(toPathname.substring(1), "/");
    } else {
      pathname = resolvePathname(toPathname, fromPathname);
    }
  } else {
    pathname = fromPathname;
  }
  return {
    pathname,
    search: normalizeSearch(search),
    hash: normalizeHash(hash)
  };
}
function resolvePathname(relativePath, fromPathname) {
  let segments = removeTrailingSlash(fromPathname).split("/");
  let relativeSegments = relativePath.split("/");
  relativeSegments.forEach((segment) => {
    if (segment === "..") {
      if (segments.length > 1) segments.pop();
    } else if (segment !== ".") {
      segments.push(segment);
    }
  });
  return segments.length > 1 ? segments.join("/") : "/";
}
function getInvalidPathError(char, field, dest, path) {
  return `Cannot include a '${char}' character in a manually specified \`to.${field}\` field [${JSON.stringify(
    path
  )}].  Please separate it out to the \`to.${dest}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function getPathContributingMatches(matches) {
  return matches.filter(
    (match, index) => index === 0 || match.route.path && match.route.path.length > 0
  );
}
function getResolveToMatches(matches) {
  let pathMatches = getPathContributingMatches(matches);
  return pathMatches.map(
    (match, idx) => idx === pathMatches.length - 1 ? match.pathname : match.pathnameBase
  );
}
function resolveTo(toArg, routePathnames, locationPathname, isPathRelative = false) {
  let to;
  if (typeof toArg === "string") {
    to = parsePath(toArg);
  } else {
    to = { ...toArg };
    invariant(
      !to.pathname || !to.pathname.includes("?"),
      getInvalidPathError("?", "pathname", "search", to)
    );
    invariant(
      !to.pathname || !to.pathname.includes("#"),
      getInvalidPathError("#", "pathname", "hash", to)
    );
    invariant(
      !to.search || !to.search.includes("#"),
      getInvalidPathError("#", "search", "hash", to)
    );
  }
  let isEmptyPath = toArg === "" || to.pathname === "";
  let toPathname = isEmptyPath ? "/" : to.pathname;
  let from;
  if (toPathname == null) {
    from = locationPathname;
  } else {
    let routePathnameIndex = routePathnames.length - 1;
    if (!isPathRelative && toPathname.startsWith("..")) {
      let toSegments = toPathname.split("/");
      while (toSegments[0] === "..") {
        toSegments.shift();
        routePathnameIndex -= 1;
      }
      to.pathname = toSegments.join("/");
    }
    from = routePathnameIndex >= 0 ? routePathnames[routePathnameIndex] : "/";
  }
  let path = resolvePath(to, from);
  let hasExplicitTrailingSlash = toPathname && toPathname !== "/" && toPathname.endsWith("/");
  let hasCurrentTrailingSlash = (isEmptyPath || toPathname === ".") && locationPathname.endsWith("/");
  if (!path.pathname.endsWith("/") && (hasExplicitTrailingSlash || hasCurrentTrailingSlash)) {
    path.pathname += "/";
  }
  return path;
}
var removeDoubleSlashes = (path) => path.replace(/[\\/]{2,}/g, "/");
var joinPaths = (paths) => removeDoubleSlashes(paths.join("/"));
var removeTrailingSlash = (path) => path.replace(/\/+$/, "");
var normalizePathname = (pathname) => removeTrailingSlash(pathname).replace(/^\/*/, "/");
var normalizeSearch = (search) => !search || search === "?" ? "" : search.startsWith("?") ? search : "?" + search;
var normalizeHash = (hash) => !hash || hash === "#" ? "" : hash.startsWith("#") ? hash : "#" + hash;
var DataWithResponseInit = class {
  constructor(data2, init) {
    this.type = "DataWithResponseInit";
    this.data = data2;
    this.init = init || null;
  }
};
function data(data2, init) {
  return new DataWithResponseInit(
    data2,
    typeof init === "number" ? { status: init } : init
  );
}
var redirect = (url, init = 302) => {
  let responseInit = init;
  if (typeof responseInit === "number") {
    responseInit = { status: responseInit };
  } else if (typeof responseInit.status === "undefined") {
    responseInit.status = 302;
  }
  let headers = new Headers(responseInit.headers);
  headers.set("Location", url);
  return new Response(null, { ...responseInit, headers });
};
var redirectDocument = (url, init) => {
  let response = redirect(url, init);
  response.headers.set("X-Remix-Reload-Document", "true");
  return response;
};
var replace = (url, init) => {
  let response = redirect(url, init);
  response.headers.set("X-Remix-Replace", "true");
  return response;
};
var SUPPORTED_ERROR_TYPES = [
  "EvalError",
  "RangeError",
  "ReferenceError",
  "SyntaxError",
  "TypeError",
  "URIError"
];
var ErrorResponseImpl = class {
  constructor(status, statusText, data2, internal = false) {
    this.status = status;
    this.statusText = statusText || "";
    this.internal = internal;
    if (data2 instanceof Error) {
      this.data = data2.toString();
      this.error = data2;
    } else {
      this.data = data2;
    }
  }
};
function isRouteErrorResponse(error) {
  return error != null && typeof error.status === "number" && typeof error.statusText === "string" && typeof error.internal === "boolean" && "data" in error;
}
function getRoutePattern(matches) {
  let parts = matches.map((m) => m.route.path).filter(Boolean);
  return joinPaths(parts) || "/";
}
var isBrowser = typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined";
function parseToInfo(_to, basename) {
  let to = _to;
  if (typeof to !== "string" || !ABSOLUTE_URL_REGEX.test(to)) {
    return {
      absoluteURL: void 0,
      isExternal: false,
      to
    };
  }
  let absoluteURL = to;
  let isExternal = false;
  if (isBrowser) {
    try {
      let currentUrl = new URL(window.location.href);
      let targetUrl = PROTOCOL_RELATIVE_URL_REGEX.test(to) ? new URL(normalizeProtocolRelativeUrl(to, currentUrl.protocol)) : new URL(to);
      let path = stripBasename(targetUrl.pathname, basename);
      if (targetUrl.origin === currentUrl.origin && path != null) {
        to = path + targetUrl.search + targetUrl.hash;
      } else {
        isExternal = true;
      }
    } catch (e) {
      warning(
        false,
        `<Link to="${to}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`
      );
    }
  }
  return {
    absoluteURL,
    isExternal,
    to
  };
}

// lib/router/instrumentation.ts
var UninstrumentedSymbol = Symbol("Uninstrumented");
function getRouteInstrumentationUpdates(fns, route) {
  let aggregated = {
    lazy: [],
    "lazy.loader": [],
    "lazy.action": [],
    "lazy.middleware": [],
    middleware: [],
    loader: [],
    action: []
  };
  fns.forEach(
    (fn) => fn({
      id: route.id,
      index: route.index,
      path: route.path,
      instrument(i) {
        let keys = Object.keys(aggregated);
        for (let key of keys) {
          if (i[key]) {
            aggregated[key].push(i[key]);
          }
        }
      }
    })
  );
  let updates = {};
  if (typeof route.lazy === "function" && aggregated.lazy.length > 0) {
    let instrumented = wrapImpl(aggregated.lazy, route.lazy, () => void 0);
    if (instrumented) {
      updates.lazy = instrumented;
    }
  }
  if (typeof route.lazy === "object") {
    let lazyObject = route.lazy;
    ["middleware", "loader", "action"].forEach((key) => {
      let lazyFn = lazyObject[key];
      let instrumentations = aggregated[`lazy.${key}`];
      if (typeof lazyFn === "function" && instrumentations.length > 0) {
        let instrumented = wrapImpl(instrumentations, lazyFn, () => void 0);
        if (instrumented) {
          updates.lazy = Object.assign(updates.lazy || {}, {
            [key]: instrumented
          });
        }
      }
    });
  }
  ["loader", "action"].forEach((key) => {
    let handler = route[key];
    if (typeof handler === "function" && aggregated[key].length > 0) {
      let original = handler[UninstrumentedSymbol] ?? handler;
      let instrumented = wrapImpl(
        aggregated[key],
        original,
        (...args) => getHandlerInfo(args[0])
      );
      if (instrumented) {
        if (key === "loader" && original.hydrate === true) {
          instrumented.hydrate = true;
        }
        instrumented[UninstrumentedSymbol] = original;
        updates[key] = instrumented;
      }
    }
  });
  if (route.middleware && route.middleware.length > 0 && aggregated.middleware.length > 0) {
    updates.middleware = route.middleware.map((middleware) => {
      let original = middleware[UninstrumentedSymbol] ?? middleware;
      let instrumented = wrapImpl(
        aggregated.middleware,
        original,
        (...args) => getHandlerInfo(args[0])
      );
      if (instrumented) {
        instrumented[UninstrumentedSymbol] = original;
        return instrumented;
      }
      return middleware;
    });
  }
  return updates;
}
function instrumentClientSideRouter(router, fns) {
  let aggregated = {
    navigate: [],
    fetch: []
  };
  fns.forEach(
    (fn) => fn({
      instrument(i) {
        let keys = Object.keys(i);
        for (let key of keys) {
          if (i[key]) {
            aggregated[key].push(i[key]);
          }
        }
      }
    })
  );
  if (aggregated.navigate.length > 0) {
    let navigate = router.navigate[UninstrumentedSymbol] ?? router.navigate;
    let instrumentedNavigate = wrapImpl(
      aggregated.navigate,
      navigate,
      (...args) => {
        let [to, opts] = args;
        return {
          to: typeof to === "number" || typeof to === "string" ? to : to ? createPath(to) : ".",
          ...getRouterInfo(router, opts ?? {})
        };
      }
    );
    if (instrumentedNavigate) {
      instrumentedNavigate[UninstrumentedSymbol] = navigate;
      router.navigate = instrumentedNavigate;
    }
  }
  if (aggregated.fetch.length > 0) {
    let fetch2 = router.fetch[UninstrumentedSymbol] ?? router.fetch;
    let instrumentedFetch = wrapImpl(aggregated.fetch, fetch2, (...args) => {
      let [key, , href, opts] = args;
      return {
        href: href ?? ".",
        fetcherKey: key,
        ...getRouterInfo(router, opts ?? {})
      };
    });
    if (instrumentedFetch) {
      instrumentedFetch[UninstrumentedSymbol] = fetch2;
      router.fetch = instrumentedFetch;
    }
  }
  return router;
}
function instrumentHandler(handler, fns) {
  let aggregated = {
    request: []
  };
  fns.forEach(
    (fn) => fn({
      instrument(i) {
        let keys = Object.keys(i);
        for (let key of keys) {
          if (i[key]) {
            aggregated[key].push(i[key]);
          }
        }
      }
    })
  );
  let instrumentedHandler = handler;
  if (aggregated.request.length > 0) {
    instrumentedHandler = wrapImpl(aggregated.request, handler, (...args) => {
      let [request, context] = args;
      return {
        request: getReadonlyRequest(request),
        context: context != null ? getReadonlyContext(context) : context
      };
    });
  }
  return instrumentedHandler;
}
function wrapImpl(impls, handler, getInfo) {
  if (impls.length === 0) {
    return null;
  }
  return async (...args) => {
    let result = await recurseRight(
      impls,
      getInfo(...args),
      () => handler(...args),
      impls.length - 1
    );
    if (result.type === "error") {
      throw result.value;
    }
    return result.value;
  };
}
async function recurseRight(impls, info, handler, index) {
  let impl = impls[index];
  let result;
  if (!impl) {
    try {
      let value = await handler();
      result = { type: "success", value };
    } catch (e) {
      result = { type: "error", value: e };
    }
  } else {
    let handlerPromise = void 0;
    let callHandler = async () => {
      if (handlerPromise) {
        console.error("You cannot call instrumented handlers more than once");
      } else {
        handlerPromise = recurseRight(impls, info, handler, index - 1);
      }
      result = await handlerPromise;
      invariant(result, "Expected a result");
      if (result.type === "error" && result.value instanceof Error) {
        return { status: "error", error: result.value };
      }
      return { status: "success", error: void 0 };
    };
    try {
      await impl(callHandler, info);
    } catch (e) {
      console.error("An instrumentation function threw an error:", e);
    }
    if (!handlerPromise) {
      await callHandler();
    }
    await handlerPromise;
  }
  if (result) {
    return result;
  }
  return {
    type: "error",
    value: new Error("No result assigned in instrumentation chain.")
  };
}
function getHandlerInfo(args) {
  let { request, context, params, pattern } = args;
  return {
    request: getReadonlyRequest(request),
    params: { ...params },
    pattern,
    context: getReadonlyContext(context)
  };
}
function getRouterInfo(router, opts) {
  return {
    currentUrl: createPath(router.state.location),
    ..."formMethod" in opts ? { formMethod: opts.formMethod } : {},
    ..."formEncType" in opts ? { formEncType: opts.formEncType } : {},
    ..."formData" in opts ? { formData: opts.formData } : {},
    ..."body" in opts ? { body: opts.body } : {}
  };
}
function getReadonlyRequest(request) {
  return {
    method: request.method,
    url: request.url,
    headers: {
      get: (...args) => request.headers.get(...args)
    }
  };
}
function getReadonlyContext(context) {
  if (isPlainObject(context)) {
    let frozen = { ...context };
    Object.freeze(frozen);
    return frozen;
  } else {
    return {
      get: (ctx) => context.get(ctx)
    };
  }
}
var objectProtoNames = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function isPlainObject(thing) {
  if (thing === null || typeof thing !== "object") {
    return false;
  }
  const proto = Object.getPrototypeOf(thing);
  return proto === Object.prototype || proto === null || Object.getOwnPropertyNames(proto).sort().join("\0") === objectProtoNames;
}

// lib/router/router.ts
var validMutationMethodsArr = [
  "POST",
  "PUT",
  "PATCH",
  "DELETE"
];
var validMutationMethods = new Set(
  validMutationMethodsArr
);
var validRequestMethodsArr = [
  "GET",
  ...validMutationMethodsArr
];
var validRequestMethods = new Set(validRequestMethodsArr);
var redirectStatusCodes = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
var redirectPreserveMethodStatusCodes = /* @__PURE__ */ new Set([307, 308]);
var IDLE_NAVIGATION = {
  state: "idle",
  location: void 0,
  matches: void 0,
  historyAction: void 0,
  formMethod: void 0,
  formAction: void 0,
  formEncType: void 0,
  formData: void 0,
  json: void 0,
  text: void 0
};
var IDLE_FETCHER = {
  state: "idle",
  data: void 0,
  formMethod: void 0,
  formAction: void 0,
  formEncType: void 0,
  formData: void 0,
  json: void 0,
  text: void 0
};
var IDLE_BLOCKER = {
  state: "unblocked",
  proceed: void 0,
  reset: void 0,
  location: void 0
};
var defaultMapRouteProperties = (route) => ({
  hasErrorBoundary: Boolean(route.hasErrorBoundary)
});
var TRANSITIONS_STORAGE_KEY = "remix-router-transitions";
var ResetLoaderDataSymbol = Symbol("ResetLoaderData");
var _routes, _branches, _hmrRoutes, _hmrBranches;
var DataRoutes = class {
  constructor(routes) {
    __privateAdd(this, _routes);
    __privateAdd(this, _branches);
    __privateAdd(this, _hmrRoutes);
    __privateAdd(this, _hmrBranches);
    __privateSet(this, _routes, routes);
    __privateSet(this, _branches, flattenAndRankRoutes(routes));
  }
  /** The stable route tree */
  get stableRoutes() {
    return __privateGet(this, _routes);
  }
  /** The in-flight route tree if one is active, otherwise the stable tree */
  get activeRoutes() {
    return __privateGet(this, _hmrRoutes) ?? __privateGet(this, _routes);
  }
  /** Pre-computed branches */
  get branches() {
    return __privateGet(this, _hmrBranches) ?? __privateGet(this, _branches);
  }
  get hasHMRRoutes() {
    return __privateGet(this, _hmrRoutes) != null;
  }
  /** Replace the stable route tree and recompute its branches */
  setRoutes(routes) {
    __privateSet(this, _routes, routes);
    __privateSet(this, _branches, flattenAndRankRoutes(routes));
  }
  /** Set a new in-flight route tree and recompute its branches */
  setHmrRoutes(routes) {
    __privateSet(this, _hmrRoutes, routes);
    __privateSet(this, _hmrBranches, flattenAndRankRoutes(routes));
  }
  /** Commit in-flight routes/branches to the stable slot and clear in-flight */
  commitHmrRoutes() {
    if (__privateGet(this, _hmrRoutes)) {
      __privateSet(this, _routes, __privateGet(this, _hmrRoutes));
      __privateSet(this, _branches, __privateGet(this, _hmrBranches));
      __privateSet(this, _hmrRoutes, void 0);
      __privateSet(this, _hmrBranches, void 0);
    }
  }
};
_routes = new WeakMap();
_branches = new WeakMap();
_hmrRoutes = new WeakMap();
_hmrBranches = new WeakMap();
function createRouter(init) {
  const routerWindow = init.window ? init.window : typeof window !== "undefined" ? window : void 0;
  const isBrowser3 = typeof routerWindow !== "undefined" && typeof routerWindow.document !== "undefined" && typeof routerWindow.document.createElement !== "undefined";
  invariant(
    init.routes.length > 0,
    "You must provide a non-empty routes array to createRouter"
  );
  let hydrationRouteProperties2 = init.hydrationRouteProperties || [];
  let _mapRouteProperties = init.mapRouteProperties || defaultMapRouteProperties;
  let mapRouteProperties2 = _mapRouteProperties;
  if (init.instrumentations) {
    let instrumentations = init.instrumentations;
    mapRouteProperties2 = (route) => {
      return {
        ..._mapRouteProperties(route),
        ...getRouteInstrumentationUpdates(
          instrumentations.map((i) => i.route).filter(Boolean),
          route
        )
      };
    };
  }
  let manifest = {};
  let dataRoutes = new DataRoutes(
    convertRoutesToDataRoutes(
      init.routes,
      mapRouteProperties2,
      void 0,
      manifest
    )
  );
  let basename = init.basename || "/";
  if (!basename.startsWith("/")) {
    basename = `/${basename}`;
  }
  let dataStrategyImpl = init.dataStrategy || defaultDataStrategyWithMiddleware;
  let future = {
    ...init.future
  };
  let unlistenHistory = null;
  let subscribers = /* @__PURE__ */ new Set();
  let bufferedInitialStateUpdate = null;
  let savedScrollPositions2 = null;
  let getScrollRestorationKey2 = null;
  let getScrollPosition = null;
  let initialScrollRestored = init.hydrationData != null;
  let initialMatches = matchRoutesImpl(
    dataRoutes.activeRoutes,
    init.history.location,
    basename,
    false,
    dataRoutes.branches
  );
  let initialMatchesIsFOW = false;
  let initialErrors = null;
  let initialized;
  let renderFallback;
  if (initialMatches == null && !init.patchRoutesOnNavigation) {
    let error = getInternalRouterError(404, {
      pathname: init.history.location.pathname
    });
    let { matches, route } = getShortCircuitMatches(dataRoutes.activeRoutes);
    initialized = true;
    renderFallback = !initialized;
    initialMatches = matches;
    initialErrors = { [route.id]: error };
  } else {
    if (initialMatches && !init.hydrationData) {
      let fogOfWar = checkFogOfWar(
        initialMatches,
        dataRoutes.activeRoutes,
        init.history.location.pathname
      );
      if (fogOfWar.active) {
        initialMatches = null;
      }
    }
    if (!initialMatches) {
      initialized = false;
      renderFallback = !initialized;
      initialMatches = [];
      let fogOfWar = checkFogOfWar(
        null,
        dataRoutes.activeRoutes,
        init.history.location.pathname
      );
      if (fogOfWar.active && fogOfWar.matches) {
        initialMatchesIsFOW = true;
        initialMatches = fogOfWar.matches;
      }
    } else if (initialMatches.some((m) => m.route.lazy)) {
      initialized = false;
      renderFallback = !initialized;
    } else if (!initialMatches.some((m) => routeHasLoaderOrMiddleware(m.route))) {
      initialized = true;
      renderFallback = !initialized;
    } else {
      let loaderData = init.hydrationData ? init.hydrationData.loaderData : null;
      let errors = init.hydrationData ? init.hydrationData.errors : null;
      let relevantMatches = initialMatches;
      if (errors) {
        let idx = initialMatches.findIndex(
          (m) => errors[m.route.id] !== void 0
        );
        relevantMatches = relevantMatches.slice(0, idx + 1);
      }
      renderFallback = false;
      initialized = true;
      relevantMatches.forEach((m) => {
        let status = getRouteHydrationStatus(m.route, loaderData, errors);
        renderFallback = renderFallback || status.renderFallback;
        initialized = initialized && !status.shouldLoad;
      });
    }
  }
  let router;
  let state = {
    historyAction: init.history.action,
    location: init.history.location,
    matches: initialMatches,
    initialized,
    renderFallback,
    navigation: IDLE_NAVIGATION,
    // Don't restore on initial updateState() if we were SSR'd
    restoreScrollPosition: init.hydrationData != null ? false : null,
    preventScrollReset: false,
    revalidation: "idle",
    loaderData: init.hydrationData && init.hydrationData.loaderData || {},
    actionData: init.hydrationData && init.hydrationData.actionData || null,
    errors: init.hydrationData && init.hydrationData.errors || initialErrors,
    fetchers: /* @__PURE__ */ new Map(),
    blockers: /* @__PURE__ */ new Map()
  };
  let pendingAction = "POP" /* Pop */;
  let pendingPopstateNavigationDfd = null;
  let pendingPreventScrollReset = false;
  let pendingNavigationController;
  let pendingViewTransitionEnabled = false;
  let appliedViewTransitions = /* @__PURE__ */ new Map();
  let removePageHideEventListener = null;
  let isUninterruptedRevalidation = false;
  let isRevalidationRequired = false;
  let cancelledFetcherLoads = /* @__PURE__ */ new Set();
  let fetchControllers = /* @__PURE__ */ new Map();
  let incrementingLoadId = 0;
  let pendingNavigationLoadId = -1;
  let fetchReloadIds = /* @__PURE__ */ new Map();
  let fetchRedirectIds = /* @__PURE__ */ new Set();
  let fetchLoadMatches = /* @__PURE__ */ new Map();
  let activeFetchers = /* @__PURE__ */ new Map();
  let fetchersQueuedForDeletion = /* @__PURE__ */ new Set();
  let blockerFunctions = /* @__PURE__ */ new Map();
  let unblockBlockerHistoryUpdate = void 0;
  let pendingRevalidationDfd = null;
  function initialize() {
    unlistenHistory = init.history.listen(
      ({ action: historyAction, location, delta }) => {
        if (unblockBlockerHistoryUpdate) {
          unblockBlockerHistoryUpdate();
          unblockBlockerHistoryUpdate = void 0;
          return;
        }
        warning(
          blockerFunctions.size === 0 || delta != null,
          "You are trying to use a blocker on a POP navigation to a location that was not created by @remix-run/router. This will fail silently in production. This can happen if you are navigating outside the router via `window.history.pushState`/`window.location.hash` instead of using router navigation APIs.  This can also happen if you are using createHashRouter and the user manually changes the URL."
        );
        let blockerKey = shouldBlockNavigation({
          currentLocation: state.location,
          nextLocation: location,
          historyAction
        });
        if (blockerKey && delta != null) {
          let nextHistoryUpdatePromise = new Promise((resolve) => {
            unblockBlockerHistoryUpdate = resolve;
          });
          init.history.go(delta * -1);
          updateBlocker(blockerKey, {
            state: "blocked",
            location,
            proceed() {
              updateBlocker(blockerKey, {
                state: "proceeding",
                proceed: void 0,
                reset: void 0,
                location
              });
              nextHistoryUpdatePromise.then(() => init.history.go(delta));
            },
            reset() {
              let blockers = new Map(state.blockers);
              blockers.set(blockerKey, IDLE_BLOCKER);
              updateState({ blockers });
            }
          });
          pendingPopstateNavigationDfd?.resolve();
          pendingPopstateNavigationDfd = null;
          return;
        }
        return startNavigation(historyAction, location);
      }
    );
    if (isBrowser3) {
      restoreAppliedTransitions(routerWindow, appliedViewTransitions);
      let _saveAppliedTransitions = () => persistAppliedTransitions(routerWindow, appliedViewTransitions);
      routerWindow.addEventListener("pagehide", _saveAppliedTransitions);
      removePageHideEventListener = () => routerWindow.removeEventListener("pagehide", _saveAppliedTransitions);
    }
    if (!state.initialized) {
      startNavigation("POP" /* Pop */, state.location, {
        initialHydration: true
      });
    }
    return router;
  }
  function dispose() {
    if (unlistenHistory) {
      unlistenHistory();
    }
    if (removePageHideEventListener) {
      removePageHideEventListener();
    }
    subscribers.clear();
    pendingNavigationController && pendingNavigationController.abort();
    state.fetchers.forEach((_, key) => deleteFetcher(state.fetchers, key));
    state.blockers.forEach((_, key) => deleteBlocker(key));
  }
  function subscribe(fn) {
    subscribers.add(fn);
    if (bufferedInitialStateUpdate) {
      let { newErrors } = bufferedInitialStateUpdate;
      bufferedInitialStateUpdate = null;
      fn(state, {
        deletedFetchers: [],
        newErrors,
        viewTransitionOpts: void 0,
        flushSync: false
      });
    }
    return () => subscribers.delete(fn);
  }
  function updateState(newState, opts = {}) {
    if (newState.matches) {
      newState.matches = newState.matches.map((m) => {
        let route = manifest[m.route.id];
        let matchRoute = m.route;
        if (matchRoute.element !== route.element || matchRoute.errorElement !== route.errorElement || matchRoute.hydrateFallbackElement !== route.hydrateFallbackElement) {
          return {
            ...m,
            route
          };
        }
        return m;
      });
    }
    state = {
      ...state,
      ...newState
    };
    let unmountedFetchers = [];
    let mountedFetchers = [];
    state.fetchers.forEach((fetcher, key) => {
      if (fetcher.state === "idle") {
        if (fetchersQueuedForDeletion.has(key)) {
          unmountedFetchers.push(key);
        } else {
          mountedFetchers.push(key);
        }
      }
    });
    fetchersQueuedForDeletion.forEach((key) => {
      if (!state.fetchers.has(key) && !fetchControllers.has(key)) {
        unmountedFetchers.push(key);
      }
    });
    if (subscribers.size === 0) {
      bufferedInitialStateUpdate = { newErrors: newState.errors ?? null };
    }
    [...subscribers].forEach(
      (subscriber) => subscriber(state, {
        deletedFetchers: unmountedFetchers,
        newErrors: newState.errors ?? null,
        viewTransitionOpts: opts.viewTransitionOpts,
        flushSync: opts.flushSync === true
      })
    );
    unmountedFetchers.forEach((key) => deleteFetcher(state.fetchers, key));
    mountedFetchers.forEach((key) => state.fetchers.delete(key));
  }
  function completeNavigation(location, newState, { flushSync } = {}) {
    let isActionReload = state.actionData != null && state.navigation.formMethod != null && isMutationMethod(state.navigation.formMethod) && state.navigation.state === "loading" && location.state?._isRedirect !== true;
    let actionData;
    if (newState.actionData) {
      if (Object.keys(newState.actionData).length > 0) {
        actionData = newState.actionData;
      } else {
        actionData = null;
      }
    } else if (isActionReload) {
      actionData = state.actionData;
    } else {
      actionData = null;
    }
    let loaderData = newState.loaderData ? mergeLoaderData(
      state.loaderData,
      newState.loaderData,
      newState.matches || [],
      newState.errors
    ) : state.loaderData;
    let blockers = state.blockers;
    if (blockers.size > 0) {
      blockers = new Map(blockers);
      blockers.forEach((_, k) => blockers.set(k, IDLE_BLOCKER));
    }
    let restoreScrollPosition = isUninterruptedRevalidation ? false : getSavedScrollPosition(location, newState.matches || state.matches);
    let preventScrollReset = pendingPreventScrollReset === true || state.navigation.formMethod != null && isMutationMethod(state.navigation.formMethod) && location.state?._isRedirect !== true;
    dataRoutes.commitHmrRoutes();
    if (isUninterruptedRevalidation) {
    } else if (pendingAction === "POP" /* Pop */) {
    } else if (pendingAction === "PUSH" /* Push */) {
      init.history.push(location, location.state);
    } else if (pendingAction === "REPLACE" /* Replace */) {
      init.history.replace(location, location.state);
    }
    let viewTransitionOpts;
    if (pendingAction === "POP" /* Pop */) {
      let priorPaths = appliedViewTransitions.get(state.location.pathname);
      if (priorPaths && priorPaths.has(location.pathname)) {
        viewTransitionOpts = {
          currentLocation: state.location,
          nextLocation: location
        };
      } else if (appliedViewTransitions.has(location.pathname)) {
        viewTransitionOpts = {
          currentLocation: location,
          nextLocation: state.location
        };
      }
    } else if (pendingViewTransitionEnabled) {
      let toPaths = appliedViewTransitions.get(state.location.pathname);
      if (toPaths) {
        toPaths.add(location.pathname);
      } else {
        toPaths = /* @__PURE__ */ new Set([location.pathname]);
        appliedViewTransitions.set(state.location.pathname, toPaths);
      }
      viewTransitionOpts = {
        currentLocation: state.location,
        nextLocation: location
      };
    }
    updateState(
      {
        ...newState,
        // matches, errors, fetchers go through as-is
        actionData,
        loaderData,
        historyAction: pendingAction,
        location,
        initialized: true,
        renderFallback: false,
        navigation: IDLE_NAVIGATION,
        revalidation: "idle",
        restoreScrollPosition,
        preventScrollReset,
        blockers
      },
      {
        viewTransitionOpts,
        flushSync: flushSync === true
      }
    );
    pendingAction = "POP" /* Pop */;
    pendingPreventScrollReset = false;
    pendingViewTransitionEnabled = false;
    isUninterruptedRevalidation = false;
    isRevalidationRequired = false;
    pendingPopstateNavigationDfd?.resolve();
    pendingPopstateNavigationDfd = null;
    pendingRevalidationDfd?.resolve();
    pendingRevalidationDfd = null;
  }
  async function navigate(to, opts) {
    pendingPopstateNavigationDfd?.resolve();
    pendingPopstateNavigationDfd = null;
    if (typeof to === "number") {
      if (!pendingPopstateNavigationDfd) {
        pendingPopstateNavigationDfd = createDeferred();
      }
      let promise = pendingPopstateNavigationDfd.promise;
      init.history.go(to);
      return promise;
    }
    let normalizedPath = normalizeTo(
      state.location,
      state.matches,
      basename,
      to,
      opts?.fromRouteId,
      opts?.relative
    );
    let { path, submission, error } = normalizeNavigateOptions(
      false,
      normalizedPath,
      opts
    );
    let maskPath;
    if (opts?.mask) {
      let partialPath = typeof opts.mask === "string" ? parsePath(opts.mask) : {
        ...state.location.mask,
        ...opts.mask
      };
      maskPath = {
        pathname: "",
        search: "",
        hash: "",
        ...partialPath
      };
    }
    let currentLocation = state.location;
    let nextLocation = createLocation(
      currentLocation,
      path,
      opts && opts.state,
      void 0,
      maskPath
    );
    nextLocation = {
      ...nextLocation,
      ...init.history.encodeLocation(nextLocation)
    };
    let userReplace = opts && opts.replace != null ? opts.replace : void 0;
    let historyAction = "PUSH" /* Push */;
    if (userReplace === true) {
      historyAction = "REPLACE" /* Replace */;
    } else if (userReplace === false) {
    } else if (submission != null && isMutationMethod(submission.formMethod) && submission.formAction === state.location.pathname + state.location.search) {
      historyAction = "REPLACE" /* Replace */;
    }
    let preventScrollReset = opts && "preventScrollReset" in opts ? opts.preventScrollReset === true : void 0;
    let flushSync = (opts && opts.flushSync) === true;
    let blockerKey = shouldBlockNavigation({
      currentLocation,
      nextLocation,
      historyAction
    });
    if (blockerKey) {
      updateBlocker(blockerKey, {
        state: "blocked",
        location: nextLocation,
        proceed() {
          updateBlocker(blockerKey, {
            state: "proceeding",
            proceed: void 0,
            reset: void 0,
            location: nextLocation
          });
          navigate(to, opts);
        },
        reset() {
          let blockers = new Map(state.blockers);
          blockers.set(blockerKey, IDLE_BLOCKER);
          updateState({ blockers });
        }
      });
      return;
    }
    await startNavigation(historyAction, nextLocation, {
      submission,
      // Send through the formData serialization error if we have one so we can
      // render at the right error boundary after we match routes
      pendingError: error,
      preventScrollReset,
      replace: opts && opts.replace,
      enableViewTransition: opts && opts.viewTransition,
      flushSync,
      callSiteDefaultShouldRevalidate: opts && opts.defaultShouldRevalidate
    });
  }
  function revalidate() {
    if (!pendingRevalidationDfd) {
      pendingRevalidationDfd = createDeferred();
    }
    interruptActiveLoads();
    updateState({ revalidation: "loading" });
    let promise = pendingRevalidationDfd.promise;
    if (state.navigation.state === "submitting") {
      return promise;
    }
    if (state.navigation.state === "idle") {
      startNavigation(state.historyAction, state.location, {
        startUninterruptedRevalidation: true
      });
      return promise;
    }
    startNavigation(
      pendingAction || state.historyAction,
      state.navigation.location,
      {
        overrideNavigation: state.navigation,
        // Proxy through any rending view transition
        enableViewTransition: pendingViewTransitionEnabled === true
      }
    );
    return promise;
  }
  async function startNavigation(historyAction, location, opts) {
    pendingNavigationController && pendingNavigationController.abort();
    pendingNavigationController = null;
    pendingAction = historyAction;
    isUninterruptedRevalidation = (opts && opts.startUninterruptedRevalidation) === true;
    saveScrollPosition(state.location, state.matches);
    pendingPreventScrollReset = (opts && opts.preventScrollReset) === true;
    pendingViewTransitionEnabled = (opts && opts.enableViewTransition) === true;
    let routesToUse = dataRoutes.activeRoutes;
    let matches = opts?.initialHydration && state.matches && state.matches.length > 0 && !initialMatchesIsFOW ? (
      // `matchRoutes()` has already been called if we're in here via `router.initialize()`
      state.matches
    ) : matchRoutesImpl(
      routesToUse,
      location,
      basename,
      false,
      dataRoutes.branches
    );
    let flushSync = (opts && opts.flushSync) === true;
    if (matches && state.initialized && !isRevalidationRequired && isHashChangeOnly(state.location, location) && !(opts && opts.submission && isMutationMethod(opts.submission.formMethod))) {
      completeNavigation(location, { matches }, { flushSync });
      return;
    }
    let fogOfWar = checkFogOfWar(matches, routesToUse, location.pathname);
    if (fogOfWar.active && fogOfWar.matches) {
      matches = fogOfWar.matches;
    }
    if (!matches) {
      let { error, notFoundMatches, route } = handleNavigational404(
        location.pathname
      );
      completeNavigation(
        location,
        {
          matches: notFoundMatches,
          loaderData: {},
          errors: {
            [route.id]: error
          }
        },
        { flushSync }
      );
      return;
    }
    let loadingNavigation = opts && opts.overrideNavigation ? {
      ...opts.overrideNavigation,
      matches,
      historyAction
    } : void 0;
    pendingNavigationController = new AbortController();
    let request = createClientSideRequest(
      init.history,
      location,
      pendingNavigationController.signal,
      opts && opts.submission
    );
    let scopedContext = init.getContext ? await init.getContext() : new RouterContextProvider();
    let pendingActionResult;
    if (opts && opts.pendingError) {
      pendingActionResult = [
        findNearestBoundary(matches).route.id,
        { type: "error" /* error */, error: opts.pendingError }
      ];
    } else if (opts && opts.submission && isMutationMethod(opts.submission.formMethod)) {
      let actionResult = await handleAction(
        request,
        location,
        opts.submission,
        matches,
        historyAction,
        scopedContext,
        fogOfWar.active,
        opts && opts.initialHydration === true,
        { replace: opts.replace, flushSync }
      );
      if (actionResult.shortCircuited) {
        return;
      }
      if (actionResult.pendingActionResult) {
        let [routeId, result] = actionResult.pendingActionResult;
        if (isErrorResult(result) && isRouteErrorResponse(result.error) && result.error.status === 404) {
          pendingNavigationController = null;
          completeNavigation(location, {
            matches: actionResult.matches,
            loaderData: {},
            errors: {
              [routeId]: result.error
            }
          });
          return;
        }
      }
      matches = actionResult.matches || matches;
      pendingActionResult = actionResult.pendingActionResult;
      loadingNavigation = getLoadingNavigation(
        location,
        matches,
        historyAction,
        opts.submission
      );
      flushSync = false;
      fogOfWar.active = false;
      request = createClientSideRequest(
        init.history,
        request.url,
        request.signal
      );
    }
    let {
      shortCircuited,
      matches: updatedMatches,
      loaderData,
      errors,
      workingFetchers
    } = await handleLoaders(
      request,
      location,
      matches,
      historyAction,
      scopedContext,
      fogOfWar.active,
      loadingNavigation,
      opts && opts.submission,
      opts && opts.fetcherSubmission,
      opts && opts.replace,
      opts && opts.initialHydration === true,
      flushSync,
      pendingActionResult,
      opts && opts.callSiteDefaultShouldRevalidate
    );
    if (shortCircuited) {
      return;
    }
    pendingNavigationController = null;
    completeNavigation(location, {
      matches: updatedMatches || matches,
      ...getActionDataForCommit(pendingActionResult),
      loaderData,
      errors,
      ...workingFetchers ? { fetchers: workingFetchers } : {}
    });
  }
  async function handleAction(request, location, submission, matches, historyAction, scopedContext, isFogOfWar, initialHydration, opts = {}) {
    interruptActiveLoads();
    let navigation = getSubmittingNavigation(
      location,
      matches,
      historyAction,
      submission
    );
    updateState({ navigation }, { flushSync: opts.flushSync === true });
    if (isFogOfWar) {
      let discoverResult = await discoverRoutes(
        matches,
        location.pathname,
        request.signal
      );
      if (discoverResult.type === "aborted") {
        return { shortCircuited: true };
      } else if (discoverResult.type === "error") {
        if (discoverResult.partialMatches.length === 0) {
          let { matches: matches2, route } = getShortCircuitMatches(
            dataRoutes.activeRoutes
          );
          return {
            matches: matches2,
            pendingActionResult: [
              route.id,
              {
                type: "error" /* error */,
                error: discoverResult.error
              }
            ]
          };
        }
        let boundaryId = findNearestBoundary(discoverResult.partialMatches).route.id;
        return {
          matches: discoverResult.partialMatches,
          pendingActionResult: [
            boundaryId,
            {
              type: "error" /* error */,
              error: discoverResult.error
            }
          ]
        };
      } else if (!discoverResult.matches) {
        let { notFoundMatches, error, route } = handleNavigational404(
          location.pathname
        );
        return {
          matches: notFoundMatches,
          pendingActionResult: [
            route.id,
            {
              type: "error" /* error */,
              error
            }
          ]
        };
      } else {
        matches = discoverResult.matches;
      }
    }
    let result;
    let actionMatch = getTargetMatch(matches, location);
    if (!actionMatch.route.action && !actionMatch.route.lazy) {
      result = {
        type: "error" /* error */,
        error: getInternalRouterError(405, {
          method: request.method,
          pathname: location.pathname,
          routeId: actionMatch.route.id
        })
      };
    } else {
      let dsMatches = getTargetedDataStrategyMatches(
        mapRouteProperties2,
        manifest,
        request,
        location,
        matches,
        actionMatch,
        initialHydration ? [] : hydrationRouteProperties2,
        scopedContext
      );
      let results = await callDataStrategy(
        request,
        location,
        dsMatches,
        scopedContext,
        null
      );
      result = results[actionMatch.route.id];
      if (!result) {
        for (let match of matches) {
          if (results[match.route.id]) {
            result = results[match.route.id];
            break;
          }
        }
      }
      if (request.signal.aborted) {
        return { shortCircuited: true };
      }
    }
    if (isRedirectResult(result)) {
      let replace2;
      if (opts && opts.replace != null) {
        replace2 = opts.replace;
      } else {
        let location2 = normalizeRedirectLocation(
          result.response.headers.get("Location"),
          new URL(request.url),
          basename,
          init.history
        );
        replace2 = location2 === state.location.pathname + state.location.search;
      }
      await startRedirectNavigation(request, result, true, {
        submission,
        replace: replace2
      });
      return { shortCircuited: true };
    }
    if (isErrorResult(result)) {
      let boundaryMatch = findNearestBoundary(matches, actionMatch.route.id);
      if ((opts && opts.replace) !== true) {
        pendingAction = "PUSH" /* Push */;
      }
      return {
        matches,
        pendingActionResult: [
          boundaryMatch.route.id,
          result,
          actionMatch.route.id
        ]
      };
    }
    return {
      matches,
      pendingActionResult: [actionMatch.route.id, result]
    };
  }
  async function handleLoaders(request, location, matches, historyAction, scopedContext, isFogOfWar, overrideNavigation, submission, fetcherSubmission, replace2, initialHydration, flushSync, pendingActionResult, callSiteDefaultShouldRevalidate) {
    let loadingNavigation = overrideNavigation || getLoadingNavigation(location, matches, historyAction, submission);
    let activeSubmission = submission || fetcherSubmission || getSubmissionFromNavigation(loadingNavigation);
    let shouldUpdateNavigationState = !isUninterruptedRevalidation && !initialHydration;
    if (isFogOfWar) {
      if (shouldUpdateNavigationState) {
        let actionData = getUpdatedActionData(pendingActionResult);
        updateState(
          {
            navigation: loadingNavigation,
            ...actionData !== void 0 ? { actionData } : {}
          },
          {
            flushSync
          }
        );
      }
      let discoverResult = await discoverRoutes(
        matches,
        location.pathname,
        request.signal
      );
      if (discoverResult.type === "aborted") {
        return { shortCircuited: true };
      } else if (discoverResult.type === "error") {
        if (discoverResult.partialMatches.length === 0) {
          let { matches: matches2, route } = getShortCircuitMatches(
            dataRoutes.activeRoutes
          );
          return {
            matches: matches2,
            loaderData: {},
            errors: {
              [route.id]: discoverResult.error
            }
          };
        }
        let boundaryId = findNearestBoundary(discoverResult.partialMatches).route.id;
        return {
          matches: discoverResult.partialMatches,
          loaderData: {},
          errors: {
            [boundaryId]: discoverResult.error
          }
        };
      } else if (!discoverResult.matches) {
        let { error, notFoundMatches, route } = handleNavigational404(
          location.pathname
        );
        return {
          matches: notFoundMatches,
          loaderData: {},
          errors: {
            [route.id]: error
          }
        };
      } else {
        matches = discoverResult.matches;
      }
    }
    let routesToUse = dataRoutes.activeRoutes;
    let { dsMatches, revalidatingFetchers } = getMatchesToLoad(
      request,
      scopedContext,
      mapRouteProperties2,
      manifest,
      init.history,
      state,
      matches,
      activeSubmission,
      location,
      initialHydration ? [] : hydrationRouteProperties2,
      initialHydration === true,
      isRevalidationRequired,
      cancelledFetcherLoads,
      fetchersQueuedForDeletion,
      fetchLoadMatches,
      fetchRedirectIds,
      routesToUse,
      basename,
      init.patchRoutesOnNavigation != null,
      dataRoutes.branches,
      pendingActionResult,
      callSiteDefaultShouldRevalidate
    );
    pendingNavigationLoadId = ++incrementingLoadId;
    if (!init.dataStrategy && !dsMatches.some((m) => m.shouldLoad) && !dsMatches.some(
      (m) => m.route.middleware && m.route.middleware.length > 0
    ) && revalidatingFetchers.length === 0) {
      let workingFetchers2 = new Map(state.fetchers);
      let didUpdateFetcherRedirects2 = markFetchRedirectsDone(workingFetchers2);
      completeNavigation(
        location,
        {
          matches,
          loaderData: {},
          // Commit pending error if we're short circuiting
          errors: pendingActionResult && isErrorResult(pendingActionResult[1]) ? { [pendingActionResult[0]]: pendingActionResult[1].error } : null,
          ...getActionDataForCommit(pendingActionResult),
          ...didUpdateFetcherRedirects2 ? { fetchers: workingFetchers2 } : {}
        },
        { flushSync }
      );
      return { shortCircuited: true };
    }
    if (shouldUpdateNavigationState) {
      let updates = {};
      if (!isFogOfWar) {
        updates.navigation = loadingNavigation;
        let actionData = getUpdatedActionData(pendingActionResult);
        if (actionData !== void 0) {
          updates.actionData = actionData;
        }
      }
      if (revalidatingFetchers.length > 0) {
        updates.fetchers = getUpdatedRevalidatingFetchers(revalidatingFetchers);
      }
      updateState(updates, { flushSync });
    }
    revalidatingFetchers.forEach((rf) => {
      abortFetcher(rf.key);
      if (rf.controller) {
        fetchControllers.set(rf.key, rf.controller);
      }
    });
    let abortPendingFetchRevalidations = () => revalidatingFetchers.forEach((f) => abortFetcher(f.key));
    if (pendingNavigationController) {
      pendingNavigationController.signal.addEventListener(
        "abort",
        abortPendingFetchRevalidations
      );
    }
    let { loaderResults, fetcherResults } = await callLoadersAndMaybeResolveData(
      dsMatches,
      revalidatingFetchers,
      request,
      location,
      scopedContext
    );
    if (request.signal.aborted) {
      return { shortCircuited: true };
    }
    if (pendingNavigationController) {
      pendingNavigationController.signal.removeEventListener(
        "abort",
        abortPendingFetchRevalidations
      );
    }
    revalidatingFetchers.forEach((rf) => fetchControllers.delete(rf.key));
    let redirect2 = findRedirect(loaderResults);
    if (redirect2) {
      await startRedirectNavigation(request, redirect2.result, true, {
        replace: replace2
      });
      return { shortCircuited: true };
    }
    redirect2 = findRedirect(fetcherResults);
    if (redirect2) {
      fetchRedirectIds.add(redirect2.key);
      await startRedirectNavigation(request, redirect2.result, true, {
        replace: replace2
      });
      return { shortCircuited: true };
    }
    let workingFetchers = new Map(state.fetchers);
    let { loaderData, errors } = processLoaderData(
      state,
      matches,
      loaderResults,
      pendingActionResult,
      revalidatingFetchers,
      fetcherResults,
      workingFetchers
    );
    if (initialHydration && state.errors) {
      errors = { ...state.errors, ...errors };
    }
    let didUpdateFetcherRedirects = markFetchRedirectsDone(workingFetchers);
    let didAbortFetchLoads = abortStaleFetchLoads(
      pendingNavigationLoadId,
      workingFetchers
    );
    let shouldUpdateFetchers = didUpdateFetcherRedirects || didAbortFetchLoads || revalidatingFetchers.length > 0;
    return {
      matches,
      loaderData,
      errors,
      ...shouldUpdateFetchers ? { workingFetchers } : {}
    };
  }
  function getUpdatedActionData(pendingActionResult) {
    if (pendingActionResult && !isErrorResult(pendingActionResult[1])) {
      return {
        [pendingActionResult[0]]: pendingActionResult[1].data
      };
    } else if (state.actionData) {
      if (Object.keys(state.actionData).length === 0) {
        return null;
      } else {
        return state.actionData;
      }
    }
  }
  function getUpdatedRevalidatingFetchers(revalidatingFetchers) {
    let workingFetchers = new Map(state.fetchers);
    revalidatingFetchers.forEach((rf) => {
      let fetcher = workingFetchers.get(rf.key);
      let revalidatingFetcher = getLoadingFetcher(
        void 0,
        fetcher ? fetcher.data : void 0
      );
      workingFetchers.set(rf.key, revalidatingFetcher);
    });
    return workingFetchers;
  }
  async function fetch2(key, routeId, href, opts) {
    abortFetcher(key);
    let flushSync = (opts && opts.flushSync) === true;
    let routesToUse = dataRoutes.activeRoutes;
    let normalizedPath = normalizeTo(
      state.location,
      state.matches,
      basename,
      href,
      routeId,
      opts?.relative
    );
    let matches = matchRoutesImpl(
      routesToUse,
      normalizedPath,
      basename,
      false,
      dataRoutes.branches
    );
    let fogOfWar = checkFogOfWar(matches, routesToUse, normalizedPath);
    if (fogOfWar.active && fogOfWar.matches) {
      matches = fogOfWar.matches;
    }
    if (!matches) {
      setFetcherError(
        key,
        routeId,
        getInternalRouterError(404, { pathname: normalizedPath }),
        { flushSync }
      );
      return;
    }
    let { path, submission, error } = normalizeNavigateOptions(
      true,
      normalizedPath,
      opts
    );
    if (error) {
      setFetcherError(key, routeId, error, { flushSync });
      return;
    }
    let scopedContext = init.getContext ? await init.getContext() : new RouterContextProvider();
    let preventScrollReset = (opts && opts.preventScrollReset) === true;
    if (submission && isMutationMethod(submission.formMethod)) {
      await handleFetcherAction(
        key,
        routeId,
        path,
        matches,
        scopedContext,
        fogOfWar.active,
        flushSync,
        preventScrollReset,
        submission,
        opts && opts.defaultShouldRevalidate
      );
      return;
    }
    fetchLoadMatches.set(key, { routeId, path });
    await handleFetcherLoader(
      key,
      routeId,
      path,
      matches,
      scopedContext,
      fogOfWar.active,
      flushSync,
      preventScrollReset,
      submission
    );
  }
  async function handleFetcherAction(key, routeId, path, requestMatches, scopedContext, isFogOfWar, flushSync, preventScrollReset, submission, callSiteDefaultShouldRevalidate) {
    interruptActiveLoads();
    fetchLoadMatches.delete(key);
    let existingFetcher = state.fetchers.get(key);
    updateFetcherState(key, getSubmittingFetcher(submission, existingFetcher), {
      flushSync
    });
    let abortController = new AbortController();
    let fetchRequest = createClientSideRequest(
      init.history,
      path,
      abortController.signal,
      submission
    );
    if (isFogOfWar) {
      let discoverResult = await discoverRoutes(
        requestMatches,
        new URL(fetchRequest.url).pathname,
        fetchRequest.signal,
        key
      );
      if (discoverResult.type === "aborted") {
        return;
      } else if (discoverResult.type === "error") {
        setFetcherError(key, routeId, discoverResult.error, { flushSync });
        return;
      } else if (!discoverResult.matches) {
        setFetcherError(
          key,
          routeId,
          getInternalRouterError(404, { pathname: path }),
          { flushSync }
        );
        return;
      } else {
        requestMatches = discoverResult.matches;
      }
    }
    let match = getTargetMatch(requestMatches, path);
    if (!match.route.action && !match.route.lazy) {
      let error = getInternalRouterError(405, {
        method: submission.formMethod,
        pathname: path,
        routeId
      });
      setFetcherError(key, routeId, error, { flushSync });
      return;
    }
    fetchControllers.set(key, abortController);
    let originatingLoadId = incrementingLoadId;
    let fetchMatches = getTargetedDataStrategyMatches(
      mapRouteProperties2,
      manifest,
      fetchRequest,
      path,
      requestMatches,
      match,
      hydrationRouteProperties2,
      scopedContext
    );
    let actionResults = await callDataStrategy(
      fetchRequest,
      path,
      fetchMatches,
      scopedContext,
      key
    );
    let actionResult = actionResults[match.route.id];
    if (!actionResult) {
      for (let match2 of fetchMatches) {
        if (actionResults[match2.route.id]) {
          actionResult = actionResults[match2.route.id];
          break;
        }
      }
    }
    if (fetchRequest.signal.aborted) {
      if (fetchControllers.get(key) === abortController) {
        fetchControllers.delete(key);
      }
      return;
    }
    if (fetchersQueuedForDeletion.has(key)) {
      if (isRedirectResult(actionResult) || isErrorResult(actionResult)) {
        updateFetcherState(key, getDoneFetcher(void 0));
        return;
      }
    } else {
      if (isRedirectResult(actionResult)) {
        fetchControllers.delete(key);
        if (pendingNavigationLoadId > originatingLoadId) {
          updateFetcherState(key, getDoneFetcher(void 0));
          return;
        } else {
          fetchRedirectIds.add(key);
          updateFetcherState(key, getLoadingFetcher(submission));
          return startRedirectNavigation(fetchRequest, actionResult, false, {
            fetcherSubmission: submission,
            preventScrollReset
          });
        }
      }
      if (isErrorResult(actionResult)) {
        setFetcherError(key, routeId, actionResult.error);
        return;
      }
    }
    let nextLocation = state.navigation.location || state.location;
    let revalidationRequest = createClientSideRequest(
      init.history,
      nextLocation,
      abortController.signal
    );
    let routesToUse = dataRoutes.activeRoutes;
    let matches = state.navigation.state !== "idle" ? matchRoutesImpl(
      routesToUse,
      state.navigation.location,
      basename,
      false,
      dataRoutes.branches
    ) : state.matches;
    invariant(matches, "Didn't find any matches after fetcher action");
    let loadId = ++incrementingLoadId;
    fetchReloadIds.set(key, loadId);
    let { dsMatches, revalidatingFetchers } = getMatchesToLoad(
      revalidationRequest,
      scopedContext,
      mapRouteProperties2,
      manifest,
      init.history,
      state,
      matches,
      submission,
      nextLocation,
      hydrationRouteProperties2,
      false,
      isRevalidationRequired,
      cancelledFetcherLoads,
      fetchersQueuedForDeletion,
      fetchLoadMatches,
      fetchRedirectIds,
      routesToUse,
      basename,
      init.patchRoutesOnNavigation != null,
      dataRoutes.branches,
      [match.route.id, actionResult],
      callSiteDefaultShouldRevalidate
    );
    let loadFetcher = getLoadingFetcher(submission, actionResult.data);
    let workingFetchers = new Map(state.fetchers);
    workingFetchers.set(key, loadFetcher);
    revalidatingFetchers.filter((rf) => rf.key !== key).forEach((rf) => {
      let staleKey = rf.key;
      let existingFetcher2 = workingFetchers.get(staleKey);
      let revalidatingFetcher = getLoadingFetcher(
        void 0,
        existingFetcher2 ? existingFetcher2.data : void 0
      );
      workingFetchers.set(staleKey, revalidatingFetcher);
      abortFetcher(staleKey);
      if (rf.controller) {
        fetchControllers.set(staleKey, rf.controller);
      }
    });
    updateState({ fetchers: workingFetchers });
    let abortPendingFetchRevalidations = () => revalidatingFetchers.forEach((rf) => abortFetcher(rf.key));
    abortController.signal.addEventListener(
      "abort",
      abortPendingFetchRevalidations
    );
    let { loaderResults, fetcherResults } = await callLoadersAndMaybeResolveData(
      dsMatches,
      revalidatingFetchers,
      revalidationRequest,
      nextLocation,
      scopedContext
    );
    if (abortController.signal.aborted) {
      return;
    }
    abortController.signal.removeEventListener(
      "abort",
      abortPendingFetchRevalidations
    );
    fetchReloadIds.delete(key);
    fetchControllers.delete(key);
    revalidatingFetchers.forEach((r) => fetchControllers.delete(r.key));
    let fetcherIsMounted = state.fetchers.has(key);
    let getRedirectStateWithDoneFetcher = (s) => {
      if (!fetcherIsMounted) return s;
      let workingFetchers2 = new Map(s.fetchers);
      workingFetchers2.set(key, getDoneFetcher(actionResult.data));
      return { ...s, fetchers: workingFetchers2 };
    };
    let redirect2 = findRedirect(loaderResults);
    if (redirect2) {
      state = getRedirectStateWithDoneFetcher(state);
      return startRedirectNavigation(
        revalidationRequest,
        redirect2.result,
        false,
        { preventScrollReset }
      );
    }
    redirect2 = findRedirect(fetcherResults);
    if (redirect2) {
      fetchRedirectIds.add(redirect2.key);
      state = getRedirectStateWithDoneFetcher(state);
      return startRedirectNavigation(
        revalidationRequest,
        redirect2.result,
        false,
        { preventScrollReset }
      );
    }
    let finalFetchers = new Map(state.fetchers);
    if (fetcherIsMounted) {
      finalFetchers.set(key, getDoneFetcher(actionResult.data));
    }
    let { loaderData, errors } = processLoaderData(
      state,
      matches,
      loaderResults,
      void 0,
      revalidatingFetchers,
      fetcherResults,
      finalFetchers
    );
    abortStaleFetchLoads(loadId, finalFetchers);
    if (state.navigation.state === "loading" && loadId > pendingNavigationLoadId) {
      invariant(pendingAction, "Expected pending action");
      pendingNavigationController && pendingNavigationController.abort();
      completeNavigation(state.navigation.location, {
        matches,
        loaderData,
        errors,
        fetchers: finalFetchers
      });
    } else {
      updateState({
        errors,
        loaderData: mergeLoaderData(
          state.loaderData,
          loaderData,
          matches,
          errors
        ),
        fetchers: finalFetchers
      });
      isRevalidationRequired = false;
    }
  }
  async function handleFetcherLoader(key, routeId, path, matches, scopedContext, isFogOfWar, flushSync, preventScrollReset, submission) {
    let existingFetcher = state.fetchers.get(key);
    updateFetcherState(
      key,
      getLoadingFetcher(
        submission,
        existingFetcher ? existingFetcher.data : void 0
      ),
      { flushSync }
    );
    let abortController = new AbortController();
    let fetchRequest = createClientSideRequest(
      init.history,
      path,
      abortController.signal
    );
    if (isFogOfWar) {
      let discoverResult = await discoverRoutes(
        matches,
        new URL(fetchRequest.url).pathname,
        fetchRequest.signal,
        key
      );
      if (discoverResult.type === "aborted") {
        return;
      } else if (discoverResult.type === "error") {
        setFetcherError(key, routeId, discoverResult.error, { flushSync });
        return;
      } else if (!discoverResult.matches) {
        setFetcherError(
          key,
          routeId,
          getInternalRouterError(404, { pathname: path }),
          { flushSync }
        );
        return;
      } else {
        matches = discoverResult.matches;
      }
    }
    let match = getTargetMatch(matches, path);
    fetchControllers.set(key, abortController);
    let originatingLoadId = incrementingLoadId;
    let dsMatches = getTargetedDataStrategyMatches(
      mapRouteProperties2,
      manifest,
      fetchRequest,
      path,
      matches,
      match,
      hydrationRouteProperties2,
      scopedContext
    );
    let results = await callDataStrategy(
      fetchRequest,
      path,
      dsMatches,
      scopedContext,
      key
    );
    let result = results[match.route.id];
    if (!result) {
      for (let match2 of matches) {
        if (results[match2.route.id]) {
          result = results[match2.route.id];
          break;
        }
      }
    }
    if (fetchControllers.get(key) === abortController) {
      fetchControllers.delete(key);
    }
    if (fetchRequest.signal.aborted) {
      return;
    }
    if (fetchersQueuedForDeletion.has(key)) {
      updateFetcherState(key, getDoneFetcher(void 0));
      return;
    }
    if (isRedirectResult(result)) {
      if (pendingNavigationLoadId > originatingLoadId) {
        updateFetcherState(key, getDoneFetcher(void 0));
        return;
      } else {
        fetchRedirectIds.add(key);
        await startRedirectNavigation(fetchRequest, result, false, {
          preventScrollReset
        });
        return;
      }
    }
    if (isErrorResult(result)) {
      setFetcherError(key, routeId, result.error);
      return;
    }
    updateFetcherState(key, getDoneFetcher(result.data));
  }
  async function startRedirectNavigation(request, redirect2, isNavigation, {
    submission,
    fetcherSubmission,
    preventScrollReset,
    replace: replace2
  } = {}) {
    if (!isNavigation) {
      pendingPopstateNavigationDfd?.resolve();
      pendingPopstateNavigationDfd = null;
    }
    if (redirect2.response.headers.has("X-Remix-Revalidate")) {
      isRevalidationRequired = true;
    }
    let location = redirect2.response.headers.get("Location");
    invariant(location, "Expected a Location header on the redirect Response");
    location = normalizeRedirectLocation(
      location,
      new URL(request.url),
      basename,
      init.history
    );
    let redirectLocation = createLocation(state.location, location, {
      _isRedirect: true
    });
    if (isBrowser3) {
      let isDocumentReload = false;
      if (redirect2.response.headers.has("X-Remix-Reload-Document")) {
        isDocumentReload = true;
      } else if (isAbsoluteUrl(location)) {
        const url = createBrowserURLImpl(routerWindow, location, true);
        isDocumentReload = // Hard reload if it's an absolute URL to a new origin
        url.origin !== routerWindow.location.origin || // Hard reload if it's an absolute URL that does not match our basename
        stripBasename(url.pathname, basename) == null;
      }
      if (isDocumentReload) {
        if (replace2) {
          routerWindow.location.replace(location);
        } else {
          routerWindow.location.assign(location);
        }
        return;
      }
    }
    pendingNavigationController = null;
    let redirectNavigationType = replace2 === true || redirect2.response.headers.has("X-Remix-Replace") ? "REPLACE" /* Replace */ : "PUSH" /* Push */;
    let { formMethod, formAction, formEncType } = state.navigation;
    if (!submission && !fetcherSubmission && formMethod && formAction && formEncType) {
      submission = getSubmissionFromNavigation(state.navigation);
    }
    let activeSubmission = submission || fetcherSubmission;
    if (redirectPreserveMethodStatusCodes.has(redirect2.response.status) && activeSubmission && isMutationMethod(activeSubmission.formMethod)) {
      await startNavigation(redirectNavigationType, redirectLocation, {
        submission: {
          ...activeSubmission,
          formAction: location
        },
        // Preserve these flags across redirects
        preventScrollReset: preventScrollReset || pendingPreventScrollReset,
        enableViewTransition: isNavigation ? pendingViewTransitionEnabled : void 0
      });
    } else {
      let overrideNavigation = getLoadingNavigation(
        redirectLocation,
        [],
        redirectNavigationType,
        submission
      );
      await startNavigation(redirectNavigationType, redirectLocation, {
        overrideNavigation,
        // Send fetcher submissions through for shouldRevalidate
        fetcherSubmission,
        // Preserve these flags across redirects
        preventScrollReset: preventScrollReset || pendingPreventScrollReset,
        enableViewTransition: isNavigation ? pendingViewTransitionEnabled : void 0
      });
    }
  }
  async function callDataStrategy(request, path, matches, scopedContext, fetcherKey) {
    let results;
    let dataResults = {};
    try {
      results = await callDataStrategyImpl(
        dataStrategyImpl,
        request,
        path,
        matches,
        fetcherKey,
        scopedContext,
        false
      );
    } catch (e) {
      matches.filter((m) => m.shouldLoad).forEach((m) => {
        dataResults[m.route.id] = {
          type: "error" /* error */,
          error: e
        };
      });
      return dataResults;
    }
    if (request.signal.aborted) {
      return dataResults;
    }
    if (!isMutationMethod(request.method)) {
      for (let match of matches) {
        if (results[match.route.id]?.type === "error" /* error */) {
          break;
        }
        if (!results.hasOwnProperty(match.route.id) && !state.loaderData.hasOwnProperty(match.route.id) && (!state.errors || !state.errors.hasOwnProperty(match.route.id)) && match.shouldCallHandler()) {
          results[match.route.id] = {
            type: "error" /* error */,
            result: new Error(
              `No result returned from dataStrategy for route ${match.route.id}`
            )
          };
        }
      }
    }
    for (let [routeId, result] of Object.entries(results)) {
      if (isRedirectDataStrategyResult(result)) {
        let response = result.result;
        dataResults[routeId] = {
          type: "redirect" /* redirect */,
          response: normalizeRelativeRoutingRedirectResponse(
            response,
            request,
            routeId,
            matches,
            basename
          )
        };
      } else {
        dataResults[routeId] = await convertDataStrategyResultToDataResult(result);
      }
    }
    return dataResults;
  }
  async function callLoadersAndMaybeResolveData(matches, fetchersToLoad, request, location, scopedContext) {
    let loaderResultsPromise = callDataStrategy(
      request,
      location,
      matches,
      scopedContext,
      null
    );
    let fetcherResultsPromise = Promise.all(
      fetchersToLoad.map(async (f) => {
        if (f.matches && f.match && f.request && f.controller) {
          let results = await callDataStrategy(
            f.request,
            f.path,
            f.matches,
            scopedContext,
            f.key
          );
          let result = results[f.match.route.id];
          return { [f.key]: result };
        } else {
          return Promise.resolve({
            [f.key]: {
              type: "error" /* error */,
              error: getInternalRouterError(404, {
                pathname: f.path
              })
            }
          });
        }
      })
    );
    let loaderResults = await loaderResultsPromise;
    let fetcherResults = (await fetcherResultsPromise).reduce(
      (acc, r) => Object.assign(acc, r),
      {}
    );
    return {
      loaderResults,
      fetcherResults
    };
  }
  function interruptActiveLoads() {
    isRevalidationRequired = true;
    fetchLoadMatches.forEach((_, key) => {
      if (fetchControllers.has(key)) {
        cancelledFetcherLoads.add(key);
      }
      abortFetcher(key);
    });
  }
  function updateFetcherState(key, fetcher, opts = {}) {
    let workingFetchers = new Map(state.fetchers);
    workingFetchers.set(key, fetcher);
    updateState(
      { fetchers: workingFetchers },
      { flushSync: (opts && opts.flushSync) === true }
    );
  }
  function setFetcherError(key, routeId, error, opts = {}) {
    let boundaryMatch = findNearestBoundary(state.matches, routeId);
    let workingFetchers = new Map(state.fetchers);
    deleteFetcher(workingFetchers, key);
    updateState(
      {
        errors: {
          [boundaryMatch.route.id]: error
        },
        fetchers: workingFetchers
      },
      { flushSync: (opts && opts.flushSync) === true }
    );
  }
  function getFetcher(key) {
    activeFetchers.set(key, (activeFetchers.get(key) || 0) + 1);
    if (fetchersQueuedForDeletion.has(key)) {
      fetchersQueuedForDeletion.delete(key);
    }
    return state.fetchers.get(key) || IDLE_FETCHER;
  }
  function resetFetcher(key, opts) {
    abortFetcher(key, opts?.reason);
    updateFetcherState(key, getDoneFetcher(null));
  }
  function deleteFetcher(fetchers, key) {
    let fetcher = state.fetchers.get(key);
    if (fetchControllers.has(key) && !(fetcher && fetcher.state === "loading" && fetchReloadIds.has(key))) {
      abortFetcher(key);
    }
    fetchLoadMatches.delete(key);
    fetchReloadIds.delete(key);
    fetchRedirectIds.delete(key);
    fetchersQueuedForDeletion.delete(key);
    cancelledFetcherLoads.delete(key);
    fetchers.delete(key);
  }
  function queueFetcherForDeletion(key) {
    let count = (activeFetchers.get(key) || 0) - 1;
    if (count <= 0) {
      activeFetchers.delete(key);
      fetchersQueuedForDeletion.add(key);
    } else {
      activeFetchers.set(key, count);
    }
    updateState({ fetchers: new Map(state.fetchers) });
  }
  function abortFetcher(key, reason) {
    let controller = fetchControllers.get(key);
    if (controller) {
      controller.abort(reason);
      fetchControllers.delete(key);
    }
  }
  function markFetchersDone(keys, fetchers) {
    for (let key of keys) {
      let fetcher = fetchers.get(key);
      invariant(fetcher, `Expected fetcher: ${key}`);
      let doneFetcher = getDoneFetcher(fetcher.data);
      fetchers.set(key, doneFetcher);
    }
  }
  function markFetchRedirectsDone(fetchers) {
    let doneKeys = [];
    let didUpdateFetchers = false;
    for (let key of fetchRedirectIds) {
      let fetcher = fetchers.get(key);
      invariant(fetcher, `Expected fetcher: ${key}`);
      if (fetcher.state === "loading") {
        fetchRedirectIds.delete(key);
        doneKeys.push(key);
        didUpdateFetchers = true;
      }
    }
    markFetchersDone(doneKeys, fetchers);
    return didUpdateFetchers;
  }
  function abortStaleFetchLoads(landedId, fetchers) {
    let yeetedKeys = [];
    for (let [key, id] of fetchReloadIds) {
      if (id < landedId) {
        let fetcher = fetchers.get(key);
        invariant(fetcher, `Expected fetcher: ${key}`);
        if (fetcher.state === "loading") {
          abortFetcher(key);
          fetchReloadIds.delete(key);
          yeetedKeys.push(key);
        }
      }
    }
    markFetchersDone(yeetedKeys, fetchers);
    return yeetedKeys.length > 0;
  }
  function getBlocker(key, fn) {
    let blocker = state.blockers.get(key) || IDLE_BLOCKER;
    if (blockerFunctions.get(key) !== fn) {
      blockerFunctions.set(key, fn);
    }
    return blocker;
  }
  function deleteBlocker(key) {
    state.blockers.delete(key);
    blockerFunctions.delete(key);
  }
  function updateBlocker(key, newBlocker) {
    let blocker = state.blockers.get(key) || IDLE_BLOCKER;
    invariant(
      blocker.state === "unblocked" && newBlocker.state === "blocked" || blocker.state === "blocked" && newBlocker.state === "blocked" || blocker.state === "blocked" && newBlocker.state === "proceeding" || blocker.state === "blocked" && newBlocker.state === "unblocked" || blocker.state === "proceeding" && newBlocker.state === "unblocked",
      `Invalid blocker state transition: ${blocker.state} -> ${newBlocker.state}`
    );
    let blockers = new Map(state.blockers);
    blockers.set(key, newBlocker);
    updateState({ blockers });
  }
  function shouldBlockNavigation({
    currentLocation,
    nextLocation,
    historyAction
  }) {
    if (blockerFunctions.size === 0) {
      return;
    }
    if (blockerFunctions.size > 1) {
      warning(false, "A router only supports one blocker at a time");
    }
    let entries = Array.from(blockerFunctions.entries());
    let [blockerKey, blockerFunction] = entries[entries.length - 1];
    let blocker = state.blockers.get(blockerKey);
    if (blocker && blocker.state === "proceeding") {
      return;
    }
    if (blockerFunction({ currentLocation, nextLocation, historyAction })) {
      return blockerKey;
    }
  }
  function handleNavigational404(pathname) {
    let error = getInternalRouterError(404, { pathname });
    let routesToUse = dataRoutes.activeRoutes;
    let { matches, route } = getShortCircuitMatches(routesToUse);
    return { notFoundMatches: matches, route, error };
  }
  function enableScrollRestoration(positions, getPosition, getKey) {
    savedScrollPositions2 = positions;
    getScrollPosition = getPosition;
    getScrollRestorationKey2 = getKey || null;
    if (!initialScrollRestored && state.navigation === IDLE_NAVIGATION) {
      initialScrollRestored = true;
      let y = getSavedScrollPosition(state.location, state.matches);
      if (y != null) {
        updateState({ restoreScrollPosition: y });
      }
    }
    return () => {
      savedScrollPositions2 = null;
      getScrollPosition = null;
      getScrollRestorationKey2 = null;
    };
  }
  function getScrollKey(location, matches) {
    if (getScrollRestorationKey2) {
      let key = getScrollRestorationKey2(
        location,
        matches.map((m) => convertRouteMatchToUiMatch(m, state.loaderData))
      );
      return key || location.key;
    }
    return location.key;
  }
  function saveScrollPosition(location, matches) {
    if (savedScrollPositions2 && getScrollPosition) {
      let key = getScrollKey(location, matches);
      savedScrollPositions2[key] = getScrollPosition();
    }
  }
  function getSavedScrollPosition(location, matches) {
    if (savedScrollPositions2) {
      let key = getScrollKey(location, matches);
      let y = savedScrollPositions2[key];
      if (typeof y === "number") {
        return y;
      }
    }
    return null;
  }
  function checkFogOfWar(matches, routesToUse, pathname) {
    if (init.patchRoutesOnNavigation) {
      let activeBranches = dataRoutes.branches;
      if (!matches) {
        let fogMatches = matchRoutesImpl(
          routesToUse,
          pathname,
          basename,
          true,
          activeBranches
        );
        return { active: true, matches: fogMatches || [] };
      } else {
        if (Object.keys(matches[0].params).length > 0) {
          let partialMatches = matchRoutesImpl(
            routesToUse,
            pathname,
            basename,
            true,
            activeBranches
          );
          return { active: true, matches: partialMatches };
        }
      }
    }
    return { active: false, matches: null };
  }
  async function discoverRoutes(matches, pathname, signal, fetcherKey) {
    if (!init.patchRoutesOnNavigation) {
      return { type: "success", matches };
    }
    let partialMatches = matches;
    while (true) {
      let localManifest = manifest;
      try {
        await init.patchRoutesOnNavigation({
          signal,
          path: pathname,
          matches: partialMatches,
          fetcherKey,
          patch: (routeId, children) => {
            if (signal.aborted) return;
            patchRoutesImpl(
              routeId,
              children,
              dataRoutes,
              localManifest,
              mapRouteProperties2,
              false
            );
          }
        });
      } catch (e) {
        return { type: "error", error: e, partialMatches };
      }
      if (signal.aborted) {
        return { type: "aborted" };
      }
      let activeBranches = dataRoutes.branches;
      let newMatches = matchRoutesImpl(
        dataRoutes.activeRoutes,
        pathname,
        basename,
        false,
        activeBranches
      );
      let newPartialMatches = null;
      if (newMatches) {
        if (Object.keys(newMatches[0].params).length === 0) {
          return { type: "success", matches: newMatches };
        } else {
          newPartialMatches = matchRoutesImpl(
            dataRoutes.activeRoutes,
            pathname,
            basename,
            true,
            activeBranches
          );
          let matchedDeeper = newPartialMatches && partialMatches.length < newPartialMatches.length && compareMatches(
            partialMatches,
            newPartialMatches.slice(0, partialMatches.length)
          );
          if (!matchedDeeper) {
            return { type: "success", matches: newMatches };
          }
        }
      }
      if (!newPartialMatches) {
        newPartialMatches = matchRoutesImpl(
          dataRoutes.activeRoutes,
          pathname,
          basename,
          true,
          activeBranches
        );
      }
      if (!newPartialMatches || compareMatches(partialMatches, newPartialMatches)) {
        return { type: "success", matches: null };
      }
      partialMatches = newPartialMatches;
    }
  }
  function compareMatches(a, b) {
    return a.length === b.length && a.every((m, i) => m.route.id === b[i].route.id);
  }
  function _internalSetRoutes(newRoutes) {
    manifest = {};
    dataRoutes.setHmrRoutes(
      convertRoutesToDataRoutes(
        newRoutes,
        mapRouteProperties2,
        void 0,
        manifest
      )
    );
  }
  function patchRoutes(routeId, children, unstable_allowElementMutations = false) {
    patchRoutesImpl(
      routeId,
      children,
      dataRoutes,
      manifest,
      mapRouteProperties2,
      unstable_allowElementMutations
    );
    if (!dataRoutes.hasHMRRoutes) {
      updateState({});
    }
  }
  router = {
    get basename() {
      return basename;
    },
    get future() {
      return future;
    },
    get state() {
      return state;
    },
    get routes() {
      return dataRoutes.stableRoutes;
    },
    get branches() {
      return dataRoutes.branches;
    },
    get manifest() {
      return manifest;
    },
    get window() {
      return routerWindow;
    },
    initialize,
    subscribe,
    enableScrollRestoration,
    navigate,
    fetch: fetch2,
    revalidate,
    // Passthrough to history-aware createHref used by useHref so we get proper
    // hash-aware URLs in DOM paths
    createHref: (to) => init.history.createHref(to),
    encodeLocation: (to) => init.history.encodeLocation(to),
    getFetcher,
    resetFetcher,
    deleteFetcher: queueFetcherForDeletion,
    dispose,
    getBlocker,
    deleteBlocker,
    patchRoutes,
    _internalFetchControllers: fetchControllers,
    // TODO: Remove setRoutes, it's temporary to avoid dealing with
    // updating the tree while validating the update algorithm.
    _internalSetRoutes,
    _internalSetStateDoNotUseOrYouWillBreakYourApp(newState) {
      updateState(newState);
    }
  };
  if (init.instrumentations) {
    router = instrumentClientSideRouter(
      router,
      init.instrumentations.map((i) => i.router).filter(Boolean)
    );
  }
  return router;
}
function createStaticHandler(routes, opts) {
  invariant(
    routes.length > 0,
    "You must provide a non-empty routes array to createStaticHandler"
  );
  let manifest = {};
  let basename = (opts ? opts.basename : null) || "/";
  let _mapRouteProperties = opts?.mapRouteProperties || defaultMapRouteProperties;
  let mapRouteProperties2 = _mapRouteProperties;
  let future = {
    ...opts?.future
  };
  if (opts?.instrumentations) {
    let instrumentations = opts.instrumentations;
    mapRouteProperties2 = (route) => {
      return {
        ..._mapRouteProperties(route),
        ...getRouteInstrumentationUpdates(
          instrumentations.map((i) => i.route).filter(Boolean),
          route
        )
      };
    };
  }
  let dataRoutes = convertRoutesToDataRoutes(
    routes,
    mapRouteProperties2,
    void 0,
    manifest
  );
  let routeBranches = flattenAndRankRoutes(dataRoutes);
  async function query(request, {
    requestContext,
    filterMatchesToLoad,
    skipLoaderErrorBubbling,
    skipRevalidation,
    dataStrategy,
    generateMiddlewareResponse,
    normalizePath
  } = {}) {
    let normalizePathImpl = normalizePath || defaultNormalizePath;
    let method = request.method;
    let location = createLocation(
      "",
      normalizePathImpl(request),
      null,
      "default"
    );
    let matches = matchRoutesImpl(
      dataRoutes,
      location,
      basename,
      false,
      routeBranches
    );
    requestContext = requestContext != null ? requestContext : new RouterContextProvider();
    if (!isValidMethod(method) && method !== "HEAD") {
      let error = getInternalRouterError(405, { method });
      let { matches: methodNotAllowedMatches, route } = getShortCircuitMatches(dataRoutes);
      let staticContext = {
        basename,
        location,
        matches: methodNotAllowedMatches,
        loaderData: {},
        actionData: null,
        errors: {
          [route.id]: error
        },
        statusCode: error.status,
        loaderHeaders: {},
        actionHeaders: {}
      };
      return generateMiddlewareResponse ? generateMiddlewareResponse(() => Promise.resolve(staticContext)) : staticContext;
    } else if (!matches) {
      let error = getInternalRouterError(404, { pathname: location.pathname });
      let { matches: notFoundMatches, route } = getShortCircuitMatches(dataRoutes);
      let staticContext = {
        basename,
        location,
        matches: notFoundMatches,
        loaderData: {},
        actionData: null,
        errors: {
          [route.id]: error
        },
        statusCode: error.status,
        loaderHeaders: {},
        actionHeaders: {}
      };
      return generateMiddlewareResponse ? generateMiddlewareResponse(() => Promise.resolve(staticContext)) : staticContext;
    }
    if (generateMiddlewareResponse) {
      invariant(
        requestContext instanceof RouterContextProvider,
        "When using middleware in `staticHandler.query()`, any provided `requestContext` must be an instance of `RouterContextProvider`"
      );
      try {
        await loadLazyMiddlewareForMatches(
          matches,
          manifest,
          mapRouteProperties2
        );
        let renderedStaticContext;
        let response = await runServerMiddlewarePipeline(
          {
            request,
            url: createDataFunctionUrl(request, location),
            pattern: getRoutePattern(matches),
            matches,
            params: matches[0].params,
            // If we're calling middleware then it must be enabled so we can cast
            // this to the proper type knowing it's not an `AppLoadContext`
            context: requestContext
          },
          async () => {
            let res = await generateMiddlewareResponse(
              async (revalidationRequest, opts2 = {}) => {
                let result2 = await queryImpl(
                  revalidationRequest,
                  location,
                  matches,
                  requestContext,
                  dataStrategy || null,
                  skipLoaderErrorBubbling === true,
                  null,
                  "filterMatchesToLoad" in opts2 ? opts2.filterMatchesToLoad ?? null : filterMatchesToLoad ?? null,
                  skipRevalidation === true
                );
                if (isResponse(result2)) {
                  return result2;
                }
                renderedStaticContext = { location, basename, ...result2 };
                return renderedStaticContext;
              }
            );
            return res;
          },
          async (error, routeId) => {
            if (isRedirectResponse(error)) {
              return error;
            }
            if (isResponse(error)) {
              try {
                error = new ErrorResponseImpl(
                  error.status,
                  error.statusText,
                  await parseResponseBody(error)
                );
              } catch (e) {
                error = e;
              }
            }
            if (isDataWithResponseInit(error)) {
              error = dataWithResponseInitToErrorResponse(error);
            }
            if (renderedStaticContext) {
              if (routeId in renderedStaticContext.loaderData) {
                renderedStaticContext.loaderData[routeId] = void 0;
              }
              let staticContext = getStaticContextFromError(
                dataRoutes,
                renderedStaticContext,
                error,
                skipLoaderErrorBubbling ? routeId : findNearestBoundary(matches, routeId).route.id
              );
              return generateMiddlewareResponse(
                () => Promise.resolve(staticContext)
              );
            } else {
              let boundaryRouteId = skipLoaderErrorBubbling ? routeId : findNearestBoundary(
                matches,
                matches.find(
                  (m) => m.route.id === routeId || m.route.loader
                )?.route.id || routeId
              ).route.id;
              let staticContext = {
                matches,
                location,
                basename,
                loaderData: {},
                actionData: null,
                errors: {
                  [boundaryRouteId]: error
                },
                statusCode: isRouteErrorResponse(error) ? error.status : 500,
                actionHeaders: {},
                loaderHeaders: {}
              };
              return generateMiddlewareResponse(
                () => Promise.resolve(staticContext)
              );
            }
          }
        );
        invariant(isResponse(response), "Expected a response in query()");
        return response;
      } catch (e) {
        if (isResponse(e)) {
          return e;
        }
        throw e;
      }
    }
    let result = await queryImpl(
      request,
      location,
      matches,
      requestContext,
      dataStrategy || null,
      skipLoaderErrorBubbling === true,
      null,
      filterMatchesToLoad || null,
      skipRevalidation === true
    );
    if (isResponse(result)) {
      return result;
    }
    return { location, basename, ...result };
  }
  async function queryRoute(request, {
    routeId,
    requestContext,
    dataStrategy,
    generateMiddlewareResponse,
    normalizePath
  } = {}) {
    let normalizePathImpl = normalizePath || defaultNormalizePath;
    let method = request.method;
    let location = createLocation(
      "",
      normalizePathImpl(request),
      null,
      "default"
    );
    let matches = matchRoutesImpl(
      dataRoutes,
      location,
      basename,
      false,
      routeBranches
    );
    requestContext = requestContext != null ? requestContext : new RouterContextProvider();
    if (!isValidMethod(method) && method !== "HEAD" && method !== "OPTIONS") {
      throw getInternalRouterError(405, { method });
    } else if (!matches) {
      throw getInternalRouterError(404, { pathname: location.pathname });
    }
    let match = routeId ? matches.find((m) => m.route.id === routeId) : getTargetMatch(matches, location);
    if (routeId && !match) {
      throw getInternalRouterError(403, {
        pathname: location.pathname,
        routeId
      });
    } else if (!match) {
      throw getInternalRouterError(404, { pathname: location.pathname });
    }
    if (generateMiddlewareResponse) {
      invariant(
        requestContext instanceof RouterContextProvider,
        "When using middleware in `staticHandler.queryRoute()`, any provided `requestContext` must be an instance of `RouterContextProvider`"
      );
      await loadLazyMiddlewareForMatches(matches, manifest, mapRouteProperties2);
      let response = await runServerMiddlewarePipeline(
        {
          request,
          url: createDataFunctionUrl(request, location),
          pattern: getRoutePattern(matches),
          matches,
          params: matches[0].params,
          // If we're calling middleware then it must be enabled so we can cast
          // this to the proper type knowing it's not an `AppLoadContext`
          context: requestContext
        },
        async () => {
          let res = await generateMiddlewareResponse(
            async (innerRequest) => {
              let result2 = await queryImpl(
                innerRequest,
                location,
                matches,
                requestContext,
                dataStrategy || null,
                false,
                match,
                null,
                false
              );
              let processed = handleQueryResult(result2);
              return isResponse(processed) ? processed : typeof processed === "string" ? new Response(processed) : Response.json(processed);
            }
          );
          return res;
        },
        (error) => {
          if (isDataWithResponseInit(error)) {
            return Promise.resolve(dataWithResponseInitToResponse(error));
          }
          if (isResponse(error)) {
            return Promise.resolve(error);
          }
          throw error;
        }
      );
      return response;
    }
    let result = await queryImpl(
      request,
      location,
      matches,
      requestContext,
      dataStrategy || null,
      false,
      match,
      null,
      false
    );
    return handleQueryResult(result);
    function handleQueryResult(result2) {
      if (isResponse(result2)) {
        return result2;
      }
      let error = result2.errors ? Object.values(result2.errors)[0] : void 0;
      if (error !== void 0) {
        throw error;
      }
      if (result2.actionData) {
        return Object.values(result2.actionData)[0];
      }
      if (result2.loaderData) {
        return Object.values(result2.loaderData)[0];
      }
      return void 0;
    }
  }
  async function queryImpl(request, location, matches, requestContext, dataStrategy, skipLoaderErrorBubbling, routeMatch, filterMatchesToLoad, skipRevalidation) {
    invariant(
      request.signal,
      "query()/queryRoute() requests must contain an AbortController signal"
    );
    try {
      if (isMutationMethod(request.method)) {
        let result2 = await submit(
          request,
          location,
          matches,
          routeMatch || getTargetMatch(matches, location),
          requestContext,
          dataStrategy,
          skipLoaderErrorBubbling,
          routeMatch != null,
          filterMatchesToLoad,
          skipRevalidation
        );
        return result2;
      }
      let result = await loadRouteData(
        request,
        location,
        matches,
        requestContext,
        dataStrategy,
        skipLoaderErrorBubbling,
        routeMatch,
        filterMatchesToLoad
      );
      return isResponse(result) ? result : {
        ...result,
        actionData: null,
        actionHeaders: {}
      };
    } catch (e) {
      if (isDataStrategyResult(e) && isResponse(e.result)) {
        if (e.type === "error" /* error */) {
          throw e.result;
        }
        return e.result;
      }
      if (isRedirectResponse(e)) {
        return e;
      }
      throw e;
    }
  }
  async function submit(request, location, matches, actionMatch, requestContext, dataStrategy, skipLoaderErrorBubbling, isRouteRequest, filterMatchesToLoad, skipRevalidation) {
    let result;
    if (!actionMatch.route.action && !actionMatch.route.lazy) {
      let error = getInternalRouterError(405, {
        method: request.method,
        pathname: new URL(request.url).pathname,
        routeId: actionMatch.route.id
      });
      if (isRouteRequest) {
        throw error;
      }
      result = {
        type: "error" /* error */,
        error
      };
    } else {
      let dsMatches = getTargetedDataStrategyMatches(
        mapRouteProperties2,
        manifest,
        request,
        location,
        matches,
        actionMatch,
        [],
        requestContext
      );
      let results = await callDataStrategy(
        request,
        location,
        dsMatches,
        isRouteRequest,
        requestContext,
        dataStrategy
      );
      result = results[actionMatch.route.id];
      if (request.signal.aborted) {
        throwStaticHandlerAbortedError(request, isRouteRequest);
      }
    }
    if (isRedirectResult(result)) {
      throw new Response(null, {
        status: result.response.status,
        headers: {
          Location: result.response.headers.get("Location")
        }
      });
    }
    if (isRouteRequest) {
      if (isErrorResult(result)) {
        throw result.error;
      }
      return {
        matches: [actionMatch],
        loaderData: {},
        actionData: { [actionMatch.route.id]: result.data },
        errors: null,
        // Note: statusCode + headers are unused here since queryRoute will
        // return the raw Response or value
        statusCode: 200,
        loaderHeaders: {},
        actionHeaders: {}
      };
    }
    if (skipRevalidation) {
      if (isErrorResult(result)) {
        let boundaryMatch = skipLoaderErrorBubbling ? actionMatch : findNearestBoundary(matches, actionMatch.route.id);
        return {
          statusCode: isRouteErrorResponse(result.error) ? result.error.status : result.statusCode != null ? result.statusCode : 500,
          actionData: null,
          actionHeaders: {
            ...result.headers ? { [actionMatch.route.id]: result.headers } : {}
          },
          matches,
          loaderData: {},
          errors: {
            [boundaryMatch.route.id]: result.error
          },
          loaderHeaders: {}
        };
      } else {
        return {
          actionData: {
            [actionMatch.route.id]: result.data
          },
          actionHeaders: result.headers ? { [actionMatch.route.id]: result.headers } : {},
          matches,
          loaderData: {},
          errors: null,
          statusCode: result.statusCode || 200,
          loaderHeaders: {}
        };
      }
    }
    let loaderRequest = new Request(request.url, {
      headers: request.headers,
      redirect: request.redirect,
      signal: request.signal
    });
    if (isErrorResult(result)) {
      let boundaryMatch = skipLoaderErrorBubbling ? actionMatch : findNearestBoundary(matches, actionMatch.route.id);
      let handlerContext2 = await loadRouteData(
        loaderRequest,
        location,
        matches,
        requestContext,
        dataStrategy,
        skipLoaderErrorBubbling,
        null,
        filterMatchesToLoad,
        [boundaryMatch.route.id, result]
      );
      return {
        ...handlerContext2,
        statusCode: isRouteErrorResponse(result.error) ? result.error.status : result.statusCode != null ? result.statusCode : 500,
        actionData: null,
        actionHeaders: {
          ...result.headers ? { [actionMatch.route.id]: result.headers } : {}
        }
      };
    }
    let handlerContext = await loadRouteData(
      loaderRequest,
      location,
      matches,
      requestContext,
      dataStrategy,
      skipLoaderErrorBubbling,
      null,
      filterMatchesToLoad
    );
    return {
      ...handlerContext,
      actionData: {
        [actionMatch.route.id]: result.data
      },
      // action status codes take precedence over loader status codes
      ...result.statusCode ? { statusCode: result.statusCode } : {},
      actionHeaders: result.headers ? { [actionMatch.route.id]: result.headers } : {}
    };
  }
  async function loadRouteData(request, location, matches, requestContext, dataStrategy, skipLoaderErrorBubbling, routeMatch, filterMatchesToLoad, pendingActionResult) {
    let isRouteRequest = routeMatch != null;
    if (isRouteRequest && !routeMatch?.route.loader && !routeMatch?.route.lazy) {
      throw getInternalRouterError(400, {
        method: request.method,
        pathname: new URL(request.url).pathname,
        routeId: routeMatch?.route.id
      });
    }
    let dsMatches;
    if (routeMatch) {
      dsMatches = getTargetedDataStrategyMatches(
        mapRouteProperties2,
        manifest,
        request,
        location,
        matches,
        routeMatch,
        [],
        requestContext
      );
    } else {
      let maxIdx = pendingActionResult && isErrorResult(pendingActionResult[1]) ? (
        // Up to but not including the boundary
        matches.findIndex((m) => m.route.id === pendingActionResult[0]) - 1
      ) : void 0;
      let pattern = getRoutePattern(matches);
      dsMatches = matches.map((match, index) => {
        if (maxIdx != null && index > maxIdx) {
          return getDataStrategyMatch(
            mapRouteProperties2,
            manifest,
            request,
            location,
            pattern,
            match,
            [],
            requestContext,
            false
          );
        }
        return getDataStrategyMatch(
          mapRouteProperties2,
          manifest,
          request,
          location,
          pattern,
          match,
          [],
          requestContext,
          (match.route.loader || match.route.lazy) != null && (!filterMatchesToLoad || filterMatchesToLoad(match))
        );
      });
    }
    if (!dataStrategy && !dsMatches.some((m) => m.shouldLoad)) {
      return {
        matches,
        loaderData: {},
        errors: pendingActionResult && isErrorResult(pendingActionResult[1]) ? {
          [pendingActionResult[0]]: pendingActionResult[1].error
        } : null,
        statusCode: 200,
        loaderHeaders: {}
      };
    }
    let results = await callDataStrategy(
      request,
      location,
      dsMatches,
      isRouteRequest,
      requestContext,
      dataStrategy
    );
    if (request.signal.aborted) {
      throwStaticHandlerAbortedError(request, isRouteRequest);
    }
    let handlerContext = processRouteLoaderData(
      matches,
      results,
      pendingActionResult,
      true,
      skipLoaderErrorBubbling
    );
    return {
      ...handlerContext,
      matches
    };
  }
  async function callDataStrategy(request, location, matches, isRouteRequest, requestContext, dataStrategy) {
    let results = await callDataStrategyImpl(
      dataStrategy || defaultDataStrategy,
      request,
      location,
      matches,
      null,
      requestContext,
      true
    );
    let dataResults = {};
    await Promise.all(
      matches.map(async (match) => {
        if (!(match.route.id in results)) {
          return;
        }
        let result = results[match.route.id];
        if (isRedirectDataStrategyResult(result)) {
          let response = result.result;
          throw normalizeRelativeRoutingRedirectResponse(
            response,
            request,
            match.route.id,
            matches,
            basename
          );
        }
        if (isRouteRequest) {
          if (isResponse(result.result)) {
            throw result;
          } else if (isDataWithResponseInit(result.result)) {
            throw dataWithResponseInitToResponse(result.result);
          }
        }
        dataResults[match.route.id] = await convertDataStrategyResultToDataResult(result);
      })
    );
    return dataResults;
  }
  return {
    dataRoutes,
    _internalRouteBranches: routeBranches,
    query,
    queryRoute
  };
}
function getStaticContextFromError(routes, handlerContext, error, boundaryId) {
  let errorBoundaryId = boundaryId || handlerContext._deepestRenderedBoundaryId || routes[0].id;
  return {
    ...handlerContext,
    statusCode: isRouteErrorResponse(error) ? error.status : 500,
    errors: {
      [errorBoundaryId]: error
    }
  };
}
function throwStaticHandlerAbortedError(request, isRouteRequest) {
  if (request.signal.reason !== void 0) {
    throw request.signal.reason;
  }
  let method = isRouteRequest ? "queryRoute" : "query";
  throw new Error(
    `${method}() call aborted without an \`AbortSignal.reason\`: ${request.method} ${request.url}`
  );
}
function isSubmissionNavigation(opts) {
  return opts != null && ("formData" in opts && opts.formData != null || "body" in opts && opts.body !== void 0);
}
function defaultNormalizePath(request) {
  let url = new URL(request.url);
  return {
    pathname: url.pathname,
    search: url.search,
    hash: url.hash
  };
}
function normalizeTo(location, matches, basename, to, fromRouteId, relative) {
  let contextualMatches;
  let activeRouteMatch;
  if (fromRouteId) {
    contextualMatches = [];
    for (let match of matches) {
      contextualMatches.push(match);
      if (match.route.id === fromRouteId) {
        activeRouteMatch = match;
        break;
      }
    }
  } else {
    contextualMatches = matches;
    activeRouteMatch = matches[matches.length - 1];
  }
  let path = resolveTo(
    to ? to : ".",
    getResolveToMatches(contextualMatches),
    stripBasename(location.pathname, basename) || location.pathname,
    relative === "path"
  );
  if (to == null) {
    path.search = location.search;
    path.hash = location.hash;
  }
  if ((to == null || to === "" || to === ".") && activeRouteMatch) {
    let nakedIndex = hasNakedIndexQuery(path.search);
    if (activeRouteMatch.route.index && !nakedIndex) {
      path.search = path.search ? path.search.replace(/^\?/, "?index&") : "?index";
    } else if (!activeRouteMatch.route.index && nakedIndex) {
      let params = new URLSearchParams(path.search);
      let indexValues = params.getAll("index");
      params.delete("index");
      indexValues.filter((v) => v).forEach((v) => params.append("index", v));
      let qs = params.toString();
      path.search = qs ? `?${qs}` : "";
    }
  }
  if (basename !== "/") {
    path.pathname = prependBasename({ basename, pathname: path.pathname });
  }
  return createPath(path);
}
function normalizeNavigateOptions(isFetcher, path, opts) {
  if (!opts || !isSubmissionNavigation(opts)) {
    return { path };
  }
  if (opts.formMethod && !isValidMethod(opts.formMethod)) {
    return {
      path,
      error: getInternalRouterError(405, { method: opts.formMethod })
    };
  }
  let getInvalidBodyError = () => ({
    path,
    error: getInternalRouterError(400, { type: "invalid-body" })
  });
  let rawFormMethod = opts.formMethod || "get";
  let formMethod = rawFormMethod.toUpperCase();
  let formAction = stripHashFromPath(path);
  if (opts.body !== void 0) {
    if (opts.formEncType === "text/plain") {
      if (!isMutationMethod(formMethod)) {
        return getInvalidBodyError();
      }
      let text = typeof opts.body === "string" ? opts.body : opts.body instanceof FormData || opts.body instanceof URLSearchParams ? (
        // https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#plain-text-form-data
        Array.from(opts.body.entries()).reduce(
          (acc, [name, value]) => `${acc}${name}=${value}
`,
          ""
        )
      ) : String(opts.body);
      return {
        path,
        submission: {
          formMethod,
          formAction,
          formEncType: opts.formEncType,
          formData: void 0,
          json: void 0,
          text
        }
      };
    } else if (opts.formEncType === "application/json") {
      if (!isMutationMethod(formMethod)) {
        return getInvalidBodyError();
      }
      try {
        let json = typeof opts.body === "string" ? JSON.parse(opts.body) : opts.body;
        return {
          path,
          submission: {
            formMethod,
            formAction,
            formEncType: opts.formEncType,
            formData: void 0,
            json,
            text: void 0
          }
        };
      } catch (e) {
        return getInvalidBodyError();
      }
    }
  }
  invariant(
    typeof FormData === "function",
    "FormData is not available in this environment"
  );
  let searchParams;
  let formData;
  if (opts.formData) {
    searchParams = convertFormDataToSearchParams(opts.formData);
    formData = opts.formData;
  } else if (opts.body instanceof FormData) {
    searchParams = convertFormDataToSearchParams(opts.body);
    formData = opts.body;
  } else if (opts.body instanceof URLSearchParams) {
    searchParams = opts.body;
    formData = convertSearchParamsToFormData(searchParams);
  } else if (opts.body == null) {
    searchParams = new URLSearchParams();
    formData = new FormData();
  } else {
    try {
      searchParams = new URLSearchParams(opts.body);
      formData = convertSearchParamsToFormData(searchParams);
    } catch (e) {
      return getInvalidBodyError();
    }
  }
  let submission = {
    formMethod,
    formAction,
    formEncType: opts && opts.formEncType || "application/x-www-form-urlencoded",
    formData,
    json: void 0,
    text: void 0
  };
  if (isMutationMethod(submission.formMethod)) {
    return { path, submission };
  }
  let parsedPath = parsePath(path);
  if (isFetcher && parsedPath.search && hasNakedIndexQuery(parsedPath.search)) {
    searchParams.append("index", "");
  }
  parsedPath.search = `?${searchParams}`;
  return { path: createPath(parsedPath), submission };
}
function getMatchesToLoad(request, scopedContext, mapRouteProperties2, manifest, history, state, matches, submission, location, lazyRoutePropertiesToSkip, initialHydration, isRevalidationRequired, cancelledFetcherLoads, fetchersQueuedForDeletion, fetchLoadMatches, fetchRedirectIds, routesToUse, basename, hasPatchRoutesOnNavigation, branches, pendingActionResult, callSiteDefaultShouldRevalidate) {
  let actionResult = pendingActionResult ? isErrorResult(pendingActionResult[1]) ? pendingActionResult[1].error : pendingActionResult[1].data : void 0;
  let currentUrl = history.createURL(state.location);
  let nextUrl = history.createURL(location);
  let maxIdx;
  if (initialHydration && state.errors) {
    let boundaryId = Object.keys(state.errors)[0];
    maxIdx = matches.findIndex((m) => m.route.id === boundaryId);
  } else if (pendingActionResult && isErrorResult(pendingActionResult[1])) {
    let boundaryId = pendingActionResult[0];
    maxIdx = matches.findIndex((m) => m.route.id === boundaryId) - 1;
  }
  let actionStatus = pendingActionResult ? pendingActionResult[1].statusCode : void 0;
  let shouldSkipRevalidation = actionStatus && actionStatus >= 400;
  let baseShouldRevalidateArgs = {
    currentUrl,
    currentParams: state.matches[0]?.params || {},
    nextUrl,
    nextParams: matches[0].params,
    ...submission,
    actionResult,
    actionStatus
  };
  let pattern = getRoutePattern(matches);
  let dsMatches = matches.map((match, index) => {
    let { route } = match;
    let forceShouldLoad = null;
    if (maxIdx != null && index > maxIdx) {
      forceShouldLoad = false;
    } else if (route.lazy) {
      forceShouldLoad = true;
    } else if (!routeHasLoaderOrMiddleware(route)) {
      forceShouldLoad = false;
    } else if (initialHydration) {
      let { shouldLoad: shouldLoad2 } = getRouteHydrationStatus(
        route,
        state.loaderData,
        state.errors
      );
      forceShouldLoad = shouldLoad2;
    } else if (isNewLoader(state.loaderData, state.matches[index], match)) {
      forceShouldLoad = true;
    }
    if (forceShouldLoad !== null) {
      return getDataStrategyMatch(
        mapRouteProperties2,
        manifest,
        request,
        location,
        pattern,
        match,
        lazyRoutePropertiesToSkip,
        scopedContext,
        forceShouldLoad
      );
    }
    let defaultShouldRevalidate = false;
    if (typeof callSiteDefaultShouldRevalidate === "boolean") {
      defaultShouldRevalidate = callSiteDefaultShouldRevalidate;
    } else if (shouldSkipRevalidation) {
      defaultShouldRevalidate = false;
    } else if (isRevalidationRequired) {
      defaultShouldRevalidate = true;
    } else if (currentUrl.pathname + currentUrl.search === nextUrl.pathname + nextUrl.search) {
      defaultShouldRevalidate = true;
    } else if (currentUrl.search !== nextUrl.search) {
      defaultShouldRevalidate = true;
    } else if (isNewRouteInstance(state.matches[index], match)) {
      defaultShouldRevalidate = true;
    }
    let shouldRevalidateArgs = {
      ...baseShouldRevalidateArgs,
      defaultShouldRevalidate
    };
    let shouldLoad = shouldRevalidateLoader(match, shouldRevalidateArgs);
    return getDataStrategyMatch(
      mapRouteProperties2,
      manifest,
      request,
      location,
      pattern,
      match,
      lazyRoutePropertiesToSkip,
      scopedContext,
      shouldLoad,
      shouldRevalidateArgs,
      callSiteDefaultShouldRevalidate
    );
  });
  let revalidatingFetchers = [];
  fetchLoadMatches.forEach((f, key) => {
    if (initialHydration || !matches.some((m) => m.route.id === f.routeId) || fetchersQueuedForDeletion.has(key)) {
      return;
    }
    let fetcher = state.fetchers.get(key);
    let isMidInitialLoad = fetcher && fetcher.state !== "idle" && fetcher.data === void 0;
    let fetcherMatches = matchRoutesImpl(
      routesToUse,
      f.path,
      basename ?? "/",
      false,
      branches
    );
    if (!fetcherMatches) {
      if (hasPatchRoutesOnNavigation && isMidInitialLoad) {
        return;
      }
      revalidatingFetchers.push({
        key,
        routeId: f.routeId,
        path: f.path,
        matches: null,
        match: null,
        request: null,
        controller: null
      });
      return;
    }
    if (fetchRedirectIds.has(key)) {
      return;
    }
    let fetcherMatch = getTargetMatch(fetcherMatches, f.path);
    let fetchController = new AbortController();
    let fetchRequest = createClientSideRequest(
      history,
      f.path,
      fetchController.signal
    );
    let fetcherDsMatches = null;
    if (cancelledFetcherLoads.has(key)) {
      cancelledFetcherLoads.delete(key);
      fetcherDsMatches = getTargetedDataStrategyMatches(
        mapRouteProperties2,
        manifest,
        fetchRequest,
        f.path,
        fetcherMatches,
        fetcherMatch,
        lazyRoutePropertiesToSkip,
        scopedContext
      );
    } else if (isMidInitialLoad) {
      if (isRevalidationRequired) {
        fetcherDsMatches = getTargetedDataStrategyMatches(
          mapRouteProperties2,
          manifest,
          fetchRequest,
          f.path,
          fetcherMatches,
          fetcherMatch,
          lazyRoutePropertiesToSkip,
          scopedContext
        );
      }
    } else {
      let defaultShouldRevalidate;
      if (typeof callSiteDefaultShouldRevalidate === "boolean") {
        defaultShouldRevalidate = callSiteDefaultShouldRevalidate;
      } else if (shouldSkipRevalidation) {
        defaultShouldRevalidate = false;
      } else {
        defaultShouldRevalidate = isRevalidationRequired;
      }
      let shouldRevalidateArgs = {
        ...baseShouldRevalidateArgs,
        defaultShouldRevalidate
      };
      if (shouldRevalidateLoader(fetcherMatch, shouldRevalidateArgs)) {
        fetcherDsMatches = getTargetedDataStrategyMatches(
          mapRouteProperties2,
          manifest,
          fetchRequest,
          f.path,
          fetcherMatches,
          fetcherMatch,
          lazyRoutePropertiesToSkip,
          scopedContext,
          shouldRevalidateArgs
        );
      }
    }
    if (fetcherDsMatches) {
      revalidatingFetchers.push({
        key,
        routeId: f.routeId,
        path: f.path,
        matches: fetcherDsMatches,
        match: fetcherMatch,
        request: fetchRequest,
        controller: fetchController
      });
    }
  });
  return { dsMatches, revalidatingFetchers };
}
function routeHasLoaderOrMiddleware(route) {
  return route.loader != null || route.middleware != null && route.middleware.length > 0;
}
function getRouteHydrationStatus(route, loaderData, errors) {
  if (route.lazy) {
    return { shouldLoad: true, renderFallback: true };
  }
  if (!routeHasLoaderOrMiddleware(route)) {
    return { shouldLoad: false, renderFallback: false };
  }
  let hasData = loaderData != null && route.id in loaderData;
  let hasError = errors != null && errors[route.id] !== void 0;
  if (!hasData && hasError) {
    return { shouldLoad: false, renderFallback: false };
  }
  if (typeof route.loader === "function" && route.loader.hydrate === true) {
    return { shouldLoad: true, renderFallback: !hasData };
  }
  let shouldLoad = !hasData && !hasError;
  return { shouldLoad, renderFallback: shouldLoad };
}
function isNewLoader(currentLoaderData, currentMatch, match) {
  let isNew = (
    // [a] -> [a, b]
    !currentMatch || // [a, b] -> [a, c]
    match.route.id !== currentMatch.route.id
  );
  let isMissingData = !currentLoaderData.hasOwnProperty(match.route.id);
  return isNew || isMissingData;
}
function isNewRouteInstance(currentMatch, match) {
  let currentPath = currentMatch.route.path;
  return (
    // param change for this match, /users/123 -> /users/456
    currentMatch.pathname !== match.pathname || // splat param changed, which is not present in match.path
    // e.g. /files/images/avatar.jpg -> files/finances.xls
    currentPath != null && currentPath.endsWith("*") && currentMatch.params["*"] !== match.params["*"]
  );
}
function shouldRevalidateLoader(loaderMatch, arg) {
  if (loaderMatch.route.shouldRevalidate) {
    let routeChoice = loaderMatch.route.shouldRevalidate(arg);
    if (typeof routeChoice === "boolean") {
      return routeChoice;
    }
  }
  return arg.defaultShouldRevalidate;
}
function patchRoutesImpl(routeId, children, dataRoutes, manifest, mapRouteProperties2, allowElementMutations) {
  let childrenToPatch;
  if (routeId) {
    let route = manifest[routeId];
    invariant(
      route,
      `No route found to patch children into: routeId = ${routeId}`
    );
    if (!route.children) {
      route.children = [];
    }
    childrenToPatch = route.children;
  } else {
    childrenToPatch = dataRoutes.activeRoutes;
  }
  let uniqueChildren = [];
  let existingChildren = [];
  children.forEach((newRoute) => {
    let existingRoute = childrenToPatch.find(
      (existingRoute2) => isSameRoute(newRoute, existingRoute2)
    );
    if (existingRoute) {
      existingChildren.push({ existingRoute, newRoute });
    } else {
      uniqueChildren.push(newRoute);
    }
  });
  if (uniqueChildren.length > 0) {
    let newRoutes = convertRoutesToDataRoutes(
      uniqueChildren,
      mapRouteProperties2,
      [routeId || "_", "patch", String(childrenToPatch?.length || "0")],
      manifest
    );
    childrenToPatch.push(...newRoutes);
  }
  if (allowElementMutations && existingChildren.length > 0) {
    for (let i = 0; i < existingChildren.length; i++) {
      let { existingRoute, newRoute } = existingChildren[i];
      let existingRouteTyped = existingRoute;
      let [newRouteTyped] = convertRoutesToDataRoutes(
        [newRoute],
        mapRouteProperties2,
        [],
        // Doesn't matter for mutated routes since they already have an id
        {},
        // Don't touch the manifest here since we're updating in place
        true
      );
      Object.assign(existingRouteTyped, {
        element: newRouteTyped.element ? newRouteTyped.element : existingRouteTyped.element,
        errorElement: newRouteTyped.errorElement ? newRouteTyped.errorElement : existingRouteTyped.errorElement,
        hydrateFallbackElement: newRouteTyped.hydrateFallbackElement ? newRouteTyped.hydrateFallbackElement : existingRouteTyped.hydrateFallbackElement
      });
    }
  }
  if (!dataRoutes.hasHMRRoutes) {
    dataRoutes.setRoutes([...dataRoutes.activeRoutes]);
  }
}
function isSameRoute(newRoute, existingRoute) {
  if ("id" in newRoute && "id" in existingRoute && newRoute.id === existingRoute.id) {
    return true;
  }
  if (!(newRoute.index === existingRoute.index && newRoute.path === existingRoute.path && newRoute.caseSensitive === existingRoute.caseSensitive)) {
    return false;
  }
  if ((!newRoute.children || newRoute.children.length === 0) && (!existingRoute.children || existingRoute.children.length === 0)) {
    return true;
  }
  return newRoute.children?.every(
    (aChild, i) => existingRoute.children?.some((bChild) => isSameRoute(aChild, bChild))
  ) ?? false;
}
var lazyRoutePropertyCache = /* @__PURE__ */ new WeakMap();
var loadLazyRouteProperty = ({
  key,
  route,
  manifest,
  mapRouteProperties: mapRouteProperties2
}) => {
  let routeToUpdate = manifest[route.id];
  invariant(routeToUpdate, "No route found in manifest");
  if (!routeToUpdate.lazy || typeof routeToUpdate.lazy !== "object") {
    return;
  }
  let lazyFn = routeToUpdate.lazy[key];
  if (!lazyFn) {
    return;
  }
  let cache = lazyRoutePropertyCache.get(routeToUpdate);
  if (!cache) {
    cache = {};
    lazyRoutePropertyCache.set(routeToUpdate, cache);
  }
  let cachedPromise = cache[key];
  if (cachedPromise) {
    return cachedPromise;
  }
  let propertyPromise = (async () => {
    let isUnsupported = isUnsupportedLazyRouteObjectKey(key);
    let staticRouteValue = routeToUpdate[key];
    let isStaticallyDefined = staticRouteValue !== void 0 && key !== "hasErrorBoundary";
    if (isUnsupported) {
      warning(
        !isUnsupported,
        "Route property " + key + " is not a supported lazy route property. This property will be ignored."
      );
      cache[key] = Promise.resolve();
    } else if (isStaticallyDefined) {
      warning(
        false,
        `Route "${routeToUpdate.id}" has a static property "${key}" defined. The lazy property will be ignored.`
      );
    } else {
      let value = await lazyFn();
      if (value != null) {
        Object.assign(routeToUpdate, { [key]: value });
        Object.assign(routeToUpdate, mapRouteProperties2(routeToUpdate));
      }
    }
    if (typeof routeToUpdate.lazy === "object") {
      routeToUpdate.lazy[key] = void 0;
      if (Object.values(routeToUpdate.lazy).every((value) => value === void 0)) {
        routeToUpdate.lazy = void 0;
      }
    }
  })();
  cache[key] = propertyPromise;
  return propertyPromise;
};
var lazyRouteFunctionCache = /* @__PURE__ */ new WeakMap();
function loadLazyRoute(route, type, manifest, mapRouteProperties2, lazyRoutePropertiesToSkip) {
  let routeToUpdate = manifest[route.id];
  invariant(routeToUpdate, "No route found in manifest");
  if (!route.lazy) {
    return {
      lazyRoutePromise: void 0,
      lazyHandlerPromise: void 0
    };
  }
  if (typeof route.lazy === "function") {
    let cachedPromise = lazyRouteFunctionCache.get(routeToUpdate);
    if (cachedPromise) {
      return {
        lazyRoutePromise: cachedPromise,
        lazyHandlerPromise: cachedPromise
      };
    }
    let lazyRoutePromise2 = (async () => {
      invariant(
        typeof route.lazy === "function",
        "No lazy route function found"
      );
      let lazyRoute = await route.lazy();
      let routeUpdates = {};
      for (let lazyRouteProperty in lazyRoute) {
        let lazyValue = lazyRoute[lazyRouteProperty];
        if (lazyValue === void 0) {
          continue;
        }
        let isUnsupported = isUnsupportedLazyRouteFunctionKey(lazyRouteProperty);
        let staticRouteValue = routeToUpdate[lazyRouteProperty];
        let isStaticallyDefined = staticRouteValue !== void 0 && // This property isn't static since it should always be updated based
        // on the route updates
        lazyRouteProperty !== "hasErrorBoundary";
        if (isUnsupported) {
          warning(
            !isUnsupported,
            "Route property " + lazyRouteProperty + " is not a supported property to be returned from a lazy route function. This property will be ignored."
          );
        } else if (isStaticallyDefined) {
          warning(
            !isStaticallyDefined,
            `Route "${routeToUpdate.id}" has a static property "${lazyRouteProperty}" defined but its lazy function is also returning a value for this property. The lazy route property "${lazyRouteProperty}" will be ignored.`
          );
        } else {
          routeUpdates[lazyRouteProperty] = lazyValue;
        }
      }
      Object.assign(routeToUpdate, routeUpdates);
      Object.assign(routeToUpdate, {
        // To keep things framework agnostic, we use the provided `mapRouteProperties`
        // function to set the framework-aware properties (`element`/`hasErrorBoundary`)
        // since the logic will differ between frameworks.
        ...mapRouteProperties2(routeToUpdate),
        lazy: void 0
      });
    })();
    lazyRouteFunctionCache.set(routeToUpdate, lazyRoutePromise2);
    lazyRoutePromise2.catch(() => {
    });
    return {
      lazyRoutePromise: lazyRoutePromise2,
      lazyHandlerPromise: lazyRoutePromise2
    };
  }
  let lazyKeys = Object.keys(route.lazy);
  let lazyPropertyPromises = [];
  let lazyHandlerPromise = void 0;
  for (let key of lazyKeys) {
    if (lazyRoutePropertiesToSkip && lazyRoutePropertiesToSkip.includes(key)) {
      continue;
    }
    let promise = loadLazyRouteProperty({
      key,
      route,
      manifest,
      mapRouteProperties: mapRouteProperties2
    });
    if (promise) {
      lazyPropertyPromises.push(promise);
      if (key === type) {
        lazyHandlerPromise = promise;
      }
    }
  }
  let lazyRoutePromise = lazyPropertyPromises.length > 0 ? Promise.all(lazyPropertyPromises).then(() => {
  }) : void 0;
  lazyRoutePromise?.catch(() => {
  });
  lazyHandlerPromise?.catch(() => {
  });
  return {
    lazyRoutePromise,
    lazyHandlerPromise
  };
}
function isNonNullable(value) {
  return value !== void 0;
}
function loadLazyMiddlewareForMatches(matches, manifest, mapRouteProperties2) {
  let promises = matches.map(({ route }) => {
    if (typeof route.lazy !== "object" || !route.lazy.middleware) {
      return void 0;
    }
    return loadLazyRouteProperty({
      key: "middleware",
      route,
      manifest,
      mapRouteProperties: mapRouteProperties2
    });
  }).filter(isNonNullable);
  return promises.length > 0 ? Promise.all(promises) : void 0;
}
async function defaultDataStrategy(args) {
  let matchesToLoad = args.matches.filter((m) => m.shouldLoad);
  let keyedResults = {};
  let results = await Promise.all(matchesToLoad.map((m) => m.resolve()));
  results.forEach((result, i) => {
    keyedResults[matchesToLoad[i].route.id] = result;
  });
  return keyedResults;
}
async function defaultDataStrategyWithMiddleware(args) {
  if (!args.matches.some((m) => m.route.middleware)) {
    return defaultDataStrategy(args);
  }
  return runClientMiddlewarePipeline(args, () => defaultDataStrategy(args));
}
function runServerMiddlewarePipeline(args, handler, errorHandler) {
  return runMiddlewarePipeline(
    args,
    handler,
    processResult,
    isResponse,
    errorHandler
  );
  function processResult(result) {
    return isDataWithResponseInit(result) ? dataWithResponseInitToResponse(result) : result;
  }
}
function runClientMiddlewarePipeline(args, handler) {
  return runMiddlewarePipeline(
    args,
    handler,
    (r) => {
      if (isRedirectResponse(r)) {
        throw r;
      }
      return r;
    },
    isDataStrategyResults,
    errorHandler
  );
  function errorHandler(error, routeId, nextResult) {
    if (nextResult) {
      return Promise.resolve(
        Object.assign(nextResult.value, {
          [routeId]: { type: "error", result: error }
        })
      );
    } else {
      let { matches } = args;
      let maxBoundaryIdx = Math.min(
        // Throwing route
        Math.max(
          matches.findIndex((m) => m.route.id === routeId),
          0
        ),
        // or the shallowest route that needs to load data
        Math.max(
          matches.findIndex((m) => m.shouldCallHandler()),
          0
        )
      );
      let boundaryRouteId = findNearestBoundary(
        matches,
        matches[maxBoundaryIdx].route.id
      ).route.id;
      return Promise.resolve({
        [boundaryRouteId]: { type: "error", result: error }
      });
    }
  }
}
async function runMiddlewarePipeline(args, handler, processResult, isResult, errorHandler) {
  let { matches, ...dataFnArgs } = args;
  let tuples = matches.flatMap(
    (m) => m.route.middleware ? m.route.middleware.map((fn) => [m.route.id, fn]) : []
  );
  let result = await callRouteMiddleware(
    dataFnArgs,
    tuples,
    handler,
    processResult,
    isResult,
    errorHandler
  );
  return result;
}
async function callRouteMiddleware(args, middlewares, handler, processResult, isResult, errorHandler, idx = 0) {
  let { request } = args;
  if (request.signal.aborted) {
    throw request.signal.reason ?? new Error(`Request aborted: ${request.method} ${request.url}`);
  }
  let tuple = middlewares[idx];
  if (!tuple) {
    let result = await handler();
    return result;
  }
  let [routeId, middleware] = tuple;
  let nextResult;
  let next = async () => {
    if (nextResult) {
      throw new Error("You may only call `next()` once per middleware");
    }
    try {
      let result = await callRouteMiddleware(
        args,
        middlewares,
        handler,
        processResult,
        isResult,
        errorHandler,
        idx + 1
      );
      nextResult = { value: result };
      return nextResult.value;
    } catch (error) {
      nextResult = { value: await errorHandler(error, routeId, nextResult) };
      return nextResult.value;
    }
  };
  try {
    let value = await middleware(args, next);
    let result = value != null ? processResult(value) : void 0;
    if (isResult(result)) {
      return result;
    } else if (nextResult) {
      return result ?? nextResult.value;
    } else {
      nextResult = { value: await next() };
      return nextResult.value;
    }
  } catch (error) {
    let response = await errorHandler(error, routeId, nextResult);
    return response;
  }
}
function getDataStrategyMatchLazyPromises(mapRouteProperties2, manifest, request, match, lazyRoutePropertiesToSkip) {
  let lazyMiddlewarePromise = loadLazyRouteProperty({
    key: "middleware",
    route: match.route,
    manifest,
    mapRouteProperties: mapRouteProperties2
  });
  let lazyRoutePromises = loadLazyRoute(
    match.route,
    isMutationMethod(request.method) ? "action" : "loader",
    manifest,
    mapRouteProperties2,
    lazyRoutePropertiesToSkip
  );
  return {
    middleware: lazyMiddlewarePromise,
    route: lazyRoutePromises.lazyRoutePromise,
    handler: lazyRoutePromises.lazyHandlerPromise
  };
}
function getDataStrategyMatch(mapRouteProperties2, manifest, request, path, pattern, match, lazyRoutePropertiesToSkip, scopedContext, shouldLoad, shouldRevalidateArgs = null, callSiteDefaultShouldRevalidate) {
  let isUsingNewApi = false;
  let _lazyPromises = getDataStrategyMatchLazyPromises(
    mapRouteProperties2,
    manifest,
    request,
    match,
    lazyRoutePropertiesToSkip
  );
  return {
    ...match,
    _lazyPromises,
    shouldLoad,
    shouldRevalidateArgs,
    shouldCallHandler(defaultShouldRevalidate) {
      isUsingNewApi = true;
      if (!shouldRevalidateArgs) {
        return shouldLoad;
      }
      if (typeof callSiteDefaultShouldRevalidate === "boolean") {
        return shouldRevalidateLoader(match, {
          ...shouldRevalidateArgs,
          defaultShouldRevalidate: callSiteDefaultShouldRevalidate
        });
      }
      if (typeof defaultShouldRevalidate === "boolean") {
        return shouldRevalidateLoader(match, {
          ...shouldRevalidateArgs,
          defaultShouldRevalidate
        });
      }
      return shouldRevalidateLoader(match, shouldRevalidateArgs);
    },
    resolve(handlerOverride) {
      let { lazy, loader, middleware } = match.route;
      let callHandler = isUsingNewApi || shouldLoad || handlerOverride && !isMutationMethod(request.method) && (lazy || loader);
      let isMiddlewareOnlyRoute = middleware && middleware.length > 0 && !loader && !lazy;
      if (callHandler && (isMutationMethod(request.method) || !isMiddlewareOnlyRoute)) {
        return callLoaderOrAction({
          request,
          path,
          pattern,
          match,
          lazyHandlerPromise: _lazyPromises?.handler,
          lazyRoutePromise: _lazyPromises?.route,
          handlerOverride,
          scopedContext
        });
      }
      return Promise.resolve({ type: "data" /* data */, result: void 0 });
    }
  };
}
function getTargetedDataStrategyMatches(mapRouteProperties2, manifest, request, path, matches, targetMatch, lazyRoutePropertiesToSkip, scopedContext, shouldRevalidateArgs = null) {
  return matches.map((match) => {
    if (match.route.id !== targetMatch.route.id) {
      return {
        ...match,
        shouldLoad: false,
        shouldRevalidateArgs,
        shouldCallHandler: () => false,
        _lazyPromises: getDataStrategyMatchLazyPromises(
          mapRouteProperties2,
          manifest,
          request,
          match,
          lazyRoutePropertiesToSkip
        ),
        resolve: () => Promise.resolve({ type: "data", result: void 0 })
      };
    }
    return getDataStrategyMatch(
      mapRouteProperties2,
      manifest,
      request,
      path,
      getRoutePattern(matches),
      match,
      lazyRoutePropertiesToSkip,
      scopedContext,
      true,
      shouldRevalidateArgs
    );
  });
}
async function callDataStrategyImpl(dataStrategyImpl, request, path, matches, fetcherKey, scopedContext, isStaticHandler) {
  if (matches.some((m) => m._lazyPromises?.middleware)) {
    await Promise.all(matches.map((m) => m._lazyPromises?.middleware));
  }
  let dataStrategyArgs = {
    request,
    url: createDataFunctionUrl(request, path),
    pattern: getRoutePattern(matches),
    params: matches[0].params,
    context: scopedContext,
    matches
  };
  let runClientMiddleware = isStaticHandler ? () => {
    throw new Error(
      "You cannot call `runClientMiddleware()` from a static handler `dataStrategy`. Middleware is run outside of `dataStrategy` during SSR in order to bubble up the Response.  You can enable middleware via the `respond` API in `query`/`queryRoute`"
    );
  } : (cb) => {
    let typedDataStrategyArgs = dataStrategyArgs;
    return runClientMiddlewarePipeline(typedDataStrategyArgs, () => {
      return cb({
        ...typedDataStrategyArgs,
        fetcherKey,
        runClientMiddleware: () => {
          throw new Error(
            "Cannot call `runClientMiddleware()` from within an `runClientMiddleware` handler"
          );
        }
      });
    });
  };
  let results = await dataStrategyImpl({
    ...dataStrategyArgs,
    fetcherKey,
    runClientMiddleware
  });
  try {
    await Promise.all(
      matches.flatMap((m) => [
        m._lazyPromises?.handler,
        m._lazyPromises?.route
      ])
    );
  } catch (e) {
  }
  return results;
}
async function callLoaderOrAction({
  request,
  path,
  pattern,
  match,
  lazyHandlerPromise,
  lazyRoutePromise,
  handlerOverride,
  scopedContext
}) {
  let result;
  let onReject;
  let isAction = isMutationMethod(request.method);
  let type = isAction ? "action" : "loader";
  let runHandler = (handler) => {
    let reject;
    let abortPromise = new Promise((_, r) => reject = r);
    onReject = () => reject();
    request.signal.addEventListener("abort", onReject);
    let actualHandler = (ctx) => {
      if (typeof handler !== "function") {
        return Promise.reject(
          new Error(
            `You cannot call the handler for a route which defines a boolean "${type}" [routeId: ${match.route.id}]`
          )
        );
      }
      return handler(
        {
          request,
          url: createDataFunctionUrl(request, path),
          pattern,
          params: match.params,
          context: scopedContext
        },
        ...ctx !== void 0 ? [ctx] : []
      );
    };
    let handlerPromise = (async () => {
      try {
        let val = await (handlerOverride ? handlerOverride((ctx) => actualHandler(ctx)) : actualHandler());
        return { type: "data", result: val };
      } catch (e) {
        return { type: "error", result: e };
      }
    })();
    return Promise.race([handlerPromise, abortPromise]);
  };
  try {
    let handler = isAction ? match.route.action : match.route.loader;
    if (lazyHandlerPromise || lazyRoutePromise) {
      if (handler) {
        let handlerError;
        let [value] = await Promise.all([
          // If the handler throws, don't let it immediately bubble out,
          // since we need to let the lazy() execution finish so we know if this
          // route has a boundary that can handle the error
          runHandler(handler).catch((e) => {
            handlerError = e;
          }),
          // Ensure all lazy route promises are resolved before continuing
          lazyHandlerPromise,
          lazyRoutePromise
        ]);
        if (handlerError !== void 0) {
          throw handlerError;
        }
        result = value;
      } else {
        await lazyHandlerPromise;
        let handler2 = isAction ? match.route.action : match.route.loader;
        if (handler2) {
          [result] = await Promise.all([runHandler(handler2), lazyRoutePromise]);
        } else if (type === "action") {
          let url = new URL(request.url);
          let pathname = url.pathname + url.search;
          throw getInternalRouterError(405, {
            method: request.method,
            pathname,
            routeId: match.route.id
          });
        } else {
          return { type: "data" /* data */, result: void 0 };
        }
      }
    } else if (!handler) {
      let url = new URL(request.url);
      let pathname = url.pathname + url.search;
      throw getInternalRouterError(404, {
        pathname
      });
    } else {
      result = await runHandler(handler);
    }
  } catch (e) {
    return { type: "error" /* error */, result: e };
  } finally {
    if (onReject) {
      request.signal.removeEventListener("abort", onReject);
    }
  }
  return result;
}
async function parseResponseBody(response) {
  let contentType = response.headers.get("Content-Type");
  if (contentType && /\bapplication\/json\b/.test(contentType)) {
    return response.body == null ? null : response.json();
  }
  return response.text();
}
async function convertDataStrategyResultToDataResult(dataStrategyResult) {
  let { result, type } = dataStrategyResult;
  if (isResponse(result)) {
    let data2;
    try {
      data2 = await parseResponseBody(result);
    } catch (e) {
      return { type: "error" /* error */, error: e };
    }
    if (type === "error" /* error */) {
      return {
        type: "error" /* error */,
        error: new ErrorResponseImpl(result.status, result.statusText, data2),
        statusCode: result.status,
        headers: result.headers
      };
    }
    return {
      type: "data" /* data */,
      data: data2,
      statusCode: result.status,
      headers: result.headers
    };
  }
  if (type === "error" /* error */) {
    if (isDataWithResponseInit(result)) {
      if (result.data instanceof Error) {
        return {
          type: "error" /* error */,
          error: result.data,
          statusCode: result.init?.status,
          headers: result.init?.headers ? new Headers(result.init.headers) : void 0
        };
      }
      return {
        type: "error" /* error */,
        error: dataWithResponseInitToErrorResponse(result),
        statusCode: isRouteErrorResponse(result) ? result.status : void 0,
        headers: result.init?.headers ? new Headers(result.init.headers) : void 0
      };
    }
    return {
      type: "error" /* error */,
      error: result,
      statusCode: isRouteErrorResponse(result) ? result.status : void 0
    };
  }
  if (isDataWithResponseInit(result)) {
    return {
      type: "data" /* data */,
      data: result.data,
      statusCode: result.init?.status,
      headers: result.init?.headers ? new Headers(result.init.headers) : void 0
    };
  }
  return { type: "data" /* data */, data: result };
}
function normalizeRelativeRoutingRedirectResponse(response, request, routeId, matches, basename) {
  let location = response.headers.get("Location");
  invariant(
    location,
    "Redirects returned/thrown from loaders/actions must have a Location header"
  );
  if (!isAbsoluteUrl(location)) {
    let trimmedMatches = matches.slice(
      0,
      matches.findIndex((m) => m.route.id === routeId) + 1
    );
    location = normalizeTo(
      new URL(request.url),
      trimmedMatches,
      basename,
      location
    );
    response.headers.set("Location", location);
  }
  return response;
}
var invalidProtocols = [
  "about:",
  "blob:",
  "chrome:",
  "chrome-untrusted:",
  "content:",
  "data:",
  "devtools:",
  "file:",
  "filesystem:",
  // eslint-disable-next-line no-script-url
  "javascript:"
];
function hasInvalidProtocol(location) {
  try {
    return invalidProtocols.includes(new URL(location).protocol);
  } catch {
    return false;
  }
}
function normalizeRedirectLocation(location, currentUrl, basename, historyInstance) {
  if (isAbsoluteUrl(location)) {
    let normalizedLocation = location;
    let url = PROTOCOL_RELATIVE_URL_REGEX.test(normalizedLocation) ? new URL(
      normalizeProtocolRelativeUrl(normalizedLocation, currentUrl.protocol)
    ) : new URL(normalizedLocation);
    if (hasInvalidProtocol(url.toString())) {
      throw new Error("Invalid redirect location");
    }
    let isSameBasename = stripBasename(url.pathname, basename) != null;
    if (url.origin === currentUrl.origin && isSameBasename) {
      return removeDoubleSlashes(url.pathname) + url.search + url.hash;
    }
  }
  try {
    let url = historyInstance.createURL(location);
    if (hasInvalidProtocol(url.toString())) {
      throw new Error("Invalid redirect location");
    }
  } catch (e) {
  }
  return location;
}
function createClientSideRequest(history, location, signal, submission) {
  let url = history.createURL(stripHashFromPath(location)).toString();
  let init = { signal };
  if (submission && isMutationMethod(submission.formMethod)) {
    let { formMethod, formEncType } = submission;
    init.method = formMethod.toUpperCase();
    if (formEncType === "application/json") {
      init.headers = new Headers({ "Content-Type": formEncType });
      init.body = JSON.stringify(submission.json);
    } else if (formEncType === "text/plain") {
      init.body = submission.text;
    } else if (formEncType === "application/x-www-form-urlencoded" && submission.formData) {
      init.body = convertFormDataToSearchParams(submission.formData);
    } else {
      init.body = submission.formData;
    }
  }
  return new Request(url, init);
}
function createDataFunctionUrl(request, path) {
  let url = new URL(request.url);
  let parsed = typeof path === "string" ? parsePath(path) : path;
  url.pathname = parsed.pathname || "/";
  if (parsed.search) {
    let searchParams = new URLSearchParams(parsed.search);
    let indexValues = searchParams.getAll("index");
    searchParams.delete("index");
    for (let value of indexValues.filter(Boolean)) {
      searchParams.append("index", value);
    }
    url.search = searchParams.size ? `?${searchParams.toString()}` : "";
  } else {
    url.search = "";
  }
  url.hash = parsed.hash || "";
  return url;
}
function convertFormDataToSearchParams(formData) {
  let searchParams = new URLSearchParams();
  for (let [key, value] of formData.entries()) {
    searchParams.append(key, typeof value === "string" ? value : value.name);
  }
  return searchParams;
}
function convertSearchParamsToFormData(searchParams) {
  let formData = new FormData();
  for (let [key, value] of searchParams.entries()) {
    formData.append(key, value);
  }
  return formData;
}
function processRouteLoaderData(matches, results, pendingActionResult, isStaticHandler = false, skipLoaderErrorBubbling = false) {
  let loaderData = {};
  let errors = null;
  let statusCode;
  let foundError = false;
  let loaderHeaders = {};
  let pendingError = pendingActionResult && isErrorResult(pendingActionResult[1]) ? pendingActionResult[1].error : void 0;
  matches.forEach((match) => {
    if (!(match.route.id in results)) {
      return;
    }
    let id = match.route.id;
    let result = results[id];
    invariant(
      !isRedirectResult(result),
      "Cannot handle redirect results in processLoaderData"
    );
    if (isErrorResult(result)) {
      let error = result.error;
      if (pendingError !== void 0) {
        error = pendingError;
        pendingError = void 0;
      }
      errors = errors || {};
      if (skipLoaderErrorBubbling) {
        errors[id] = error;
      } else {
        let boundaryMatch = findNearestBoundary(matches, id);
        if (errors[boundaryMatch.route.id] == null) {
          errors[boundaryMatch.route.id] = error;
        }
      }
      if (!isStaticHandler) {
        loaderData[id] = ResetLoaderDataSymbol;
      }
      if (!foundError) {
        foundError = true;
        statusCode = isRouteErrorResponse(result.error) ? result.error.status : 500;
      }
      if (result.headers) {
        loaderHeaders[id] = result.headers;
      }
    } else {
      loaderData[id] = result.data;
      if (result.statusCode && result.statusCode !== 200 && !foundError) {
        statusCode = result.statusCode;
      }
      if (result.headers) {
        loaderHeaders[id] = result.headers;
      }
    }
  });
  if (pendingError !== void 0 && pendingActionResult) {
    errors = { [pendingActionResult[0]]: pendingError };
    if (pendingActionResult[2]) {
      loaderData[pendingActionResult[2]] = void 0;
    }
  }
  return {
    loaderData,
    errors,
    statusCode: statusCode || 200,
    loaderHeaders
  };
}
function processLoaderData(state, matches, results, pendingActionResult, revalidatingFetchers, fetcherResults, workingFetchers) {
  let { loaderData, errors } = processRouteLoaderData(
    matches,
    results,
    pendingActionResult
  );
  revalidatingFetchers.filter((f) => !f.matches || f.matches.some((m) => m.shouldLoad)).forEach((rf) => {
    let { key, match, controller } = rf;
    if (controller && controller.signal.aborted) {
      return;
    }
    let result = fetcherResults[key];
    invariant(result, "Did not find corresponding fetcher result");
    if (isErrorResult(result)) {
      let boundaryMatch = findNearestBoundary(state.matches, match?.route.id);
      if (!(errors && errors[boundaryMatch.route.id])) {
        errors = {
          ...errors,
          [boundaryMatch.route.id]: result.error
        };
      }
      workingFetchers.delete(key);
    } else if (isRedirectResult(result)) {
      invariant(false, "Unhandled fetcher revalidation redirect");
    } else {
      let doneFetcher = getDoneFetcher(result.data);
      workingFetchers.set(key, doneFetcher);
    }
  });
  return { loaderData, errors };
}
function mergeLoaderData(loaderData, newLoaderData, matches, errors) {
  let mergedLoaderData = Object.entries(newLoaderData).filter(([, v]) => v !== ResetLoaderDataSymbol).reduce((merged, [k, v]) => {
    merged[k] = v;
    return merged;
  }, {});
  for (let match of matches) {
    let id = match.route.id;
    if (!newLoaderData.hasOwnProperty(id) && loaderData.hasOwnProperty(id) && match.route.loader) {
      mergedLoaderData[id] = loaderData[id];
    }
    if (errors && errors.hasOwnProperty(id)) {
      break;
    }
  }
  return mergedLoaderData;
}
function getActionDataForCommit(pendingActionResult) {
  if (!pendingActionResult) {
    return {};
  }
  return isErrorResult(pendingActionResult[1]) ? {
    // Clear out prior actionData on errors
    actionData: {}
  } : {
    actionData: {
      [pendingActionResult[0]]: pendingActionResult[1].data
    }
  };
}
function findNearestBoundary(matches, routeId) {
  let eligibleMatches = routeId ? matches.slice(0, matches.findIndex((m) => m.route.id === routeId) + 1) : [...matches];
  return eligibleMatches.reverse().find((m) => m.route.hasErrorBoundary === true) || matches[0];
}
function getShortCircuitMatches(routes) {
  let route = routes.length === 1 ? routes[0] : routes.find((r) => r.index || !r.path || r.path === "/") || {
    id: `__shim-error-route__`
  };
  return {
    matches: [
      {
        params: {},
        pathname: "",
        pathnameBase: "",
        route
      }
    ],
    route
  };
}
function getInternalRouterError(status, {
  pathname,
  routeId,
  method,
  type,
  message
} = {}) {
  let statusText = "Unknown Server Error";
  let errorMessage = "Unknown @remix-run/router error";
  if (status === 400) {
    statusText = "Bad Request";
    if (method && pathname && routeId) {
      errorMessage = `You made a ${method} request to "${pathname}" but did not provide a \`loader\` for route "${routeId}", so there is no way to handle the request.`;
    } else if (type === "invalid-body") {
      errorMessage = "Unable to encode submission body";
    }
  } else if (status === 403) {
    statusText = "Forbidden";
    errorMessage = `Route "${routeId}" does not match URL "${pathname}"`;
  } else if (status === 404) {
    statusText = "Not Found";
    errorMessage = `No route matches URL "${pathname}"`;
  } else if (status === 405) {
    statusText = "Method Not Allowed";
    if (method && pathname && routeId) {
      errorMessage = `You made a ${method.toUpperCase()} request to "${pathname}" but did not provide an \`action\` for route "${routeId}", so there is no way to handle the request.`;
    } else if (method) {
      errorMessage = `Invalid request method "${method.toUpperCase()}"`;
    }
  }
  return new ErrorResponseImpl(
    status || 500,
    statusText,
    new Error(errorMessage),
    true
  );
}
function findRedirect(results) {
  let entries = Object.entries(results);
  for (let i = entries.length - 1; i >= 0; i--) {
    let [key, result] = entries[i];
    if (isRedirectResult(result)) {
      return { key, result };
    }
  }
}
function stripHashFromPath(path) {
  let parsedPath = typeof path === "string" ? parsePath(path) : path;
  return createPath({ ...parsedPath, hash: "" });
}
function isHashChangeOnly(a, b) {
  if (a.pathname !== b.pathname || a.search !== b.search) {
    return false;
  }
  if (a.hash === "") {
    return b.hash !== "";
  } else if (a.hash === b.hash) {
    return true;
  } else if (b.hash !== "") {
    return true;
  }
  return false;
}
function dataWithResponseInitToResponse(data2) {
  return Response.json(data2.data, data2.init ?? void 0);
}
function dataWithResponseInitToErrorResponse(data2) {
  return new ErrorResponseImpl(
    data2.init?.status ?? 500,
    data2.init?.statusText ?? "Internal Server Error",
    data2.data
  );
}
function isDataStrategyResults(result) {
  return result != null && typeof result === "object" && Object.entries(result).every(
    ([key, value]) => typeof key === "string" && isDataStrategyResult(value)
  );
}
function isDataStrategyResult(result) {
  return result != null && typeof result === "object" && "type" in result && "result" in result && (result.type === "data" /* data */ || result.type === "error" /* error */);
}
function isRedirectDataStrategyResult(result) {
  return isResponse(result.result) && redirectStatusCodes.has(result.result.status);
}
function isErrorResult(result) {
  return result.type === "error" /* error */;
}
function isRedirectResult(result) {
  return (result && result.type) === "redirect" /* redirect */;
}
function isDataWithResponseInit(value) {
  return typeof value === "object" && value != null && "type" in value && "data" in value && "init" in value && value.type === "DataWithResponseInit";
}
function isResponse(value) {
  return value != null && typeof value.status === "number" && typeof value.statusText === "string" && typeof value.headers === "object" && typeof value.body !== "undefined";
}
function isRedirectStatusCode(statusCode) {
  return redirectStatusCodes.has(statusCode);
}
function isRedirectResponse(result) {
  return isResponse(result) && isRedirectStatusCode(result.status) && result.headers.has("Location");
}
function isValidMethod(method) {
  return validRequestMethods.has(method.toUpperCase());
}
function isMutationMethod(method) {
  return validMutationMethods.has(method.toUpperCase());
}
function hasNakedIndexQuery(search) {
  return new URLSearchParams(search).getAll("index").some((v) => v === "");
}
function getTargetMatch(matches, location) {
  let search = typeof location === "string" ? parsePath(location).search : location.search;
  if (matches[matches.length - 1].route.index && hasNakedIndexQuery(search || "")) {
    return matches[matches.length - 1];
  }
  let pathMatches = getPathContributingMatches(matches);
  return pathMatches[pathMatches.length - 1];
}
function getSubmissionFromNavigation(navigation) {
  let { formMethod, formAction, formEncType, text, formData, json } = navigation;
  if (!formMethod || !formAction || !formEncType) {
    return;
  }
  if (text != null) {
    return {
      formMethod,
      formAction,
      formEncType,
      formData: void 0,
      json: void 0,
      text
    };
  } else if (formData != null) {
    return {
      formMethod,
      formAction,
      formEncType,
      formData,
      json: void 0,
      text: void 0
    };
  } else if (json !== void 0) {
    return {
      formMethod,
      formAction,
      formEncType,
      formData: void 0,
      json,
      text: void 0
    };
  }
}
function getLoadingNavigation(location, matches, historyAction, submission) {
  if (submission) {
    let navigation = {
      state: "loading",
      location,
      matches,
      historyAction,
      formMethod: submission.formMethod,
      formAction: submission.formAction,
      formEncType: submission.formEncType,
      formData: submission.formData,
      json: submission.json,
      text: submission.text
    };
    return navigation;
  } else {
    let navigation = {
      state: "loading",
      location,
      matches,
      historyAction,
      formMethod: void 0,
      formAction: void 0,
      formEncType: void 0,
      formData: void 0,
      json: void 0,
      text: void 0
    };
    return navigation;
  }
}
function getSubmittingNavigation(location, matches, historyAction, submission) {
  let navigation = {
    state: "submitting",
    location,
    matches,
    historyAction,
    formMethod: submission.formMethod,
    formAction: submission.formAction,
    formEncType: submission.formEncType,
    formData: submission.formData,
    json: submission.json,
    text: submission.text
  };
  return navigation;
}
function getLoadingFetcher(submission, data2) {
  if (submission) {
    let fetcher = {
      state: "loading",
      formMethod: submission.formMethod,
      formAction: submission.formAction,
      formEncType: submission.formEncType,
      formData: submission.formData,
      json: submission.json,
      text: submission.text,
      data: data2
    };
    return fetcher;
  } else {
    let fetcher = {
      state: "loading",
      formMethod: void 0,
      formAction: void 0,
      formEncType: void 0,
      formData: void 0,
      json: void 0,
      text: void 0,
      data: data2
    };
    return fetcher;
  }
}
function getSubmittingFetcher(submission, existingFetcher) {
  let fetcher = {
    state: "submitting",
    formMethod: submission.formMethod,
    formAction: submission.formAction,
    formEncType: submission.formEncType,
    formData: submission.formData,
    json: submission.json,
    text: submission.text,
    data: existingFetcher ? existingFetcher.data : void 0
  };
  return fetcher;
}
function getDoneFetcher(data2) {
  let fetcher = {
    state: "idle",
    formMethod: void 0,
    formAction: void 0,
    formEncType: void 0,
    formData: void 0,
    json: void 0,
    text: void 0,
    data: data2
  };
  return fetcher;
}
function restoreAppliedTransitions(_window, transitions) {
  try {
    let sessionPositions = _window.sessionStorage.getItem(
      TRANSITIONS_STORAGE_KEY
    );
    if (sessionPositions) {
      let json = JSON.parse(sessionPositions);
      for (let [k, v] of Object.entries(json || {})) {
        if (v && Array.isArray(v)) {
          transitions.set(k, new Set(v || []));
        }
      }
    }
  } catch (e) {
  }
}
function persistAppliedTransitions(_window, transitions) {
  if (transitions.size > 0) {
    let json = {};
    for (let [k, v] of transitions) {
      json[k] = [...v];
    }
    try {
      _window.sessionStorage.setItem(
        TRANSITIONS_STORAGE_KEY,
        JSON.stringify(json)
      );
    } catch (error) {
      warning(
        false,
        `Failed to save applied view transitions in sessionStorage (${error}).`
      );
    }
  }
}
function createDeferred() {
  let resolve;
  let reject;
  let promise = new Promise((res, rej) => {
    resolve = async (val) => {
      res(val);
      try {
        await promise;
      } catch (e) {
      }
    };
    reject = async (error) => {
      rej(error);
      try {
        await promise;
      } catch (e) {
      }
    };
  });
  return {
    promise,
    //@ts-ignore
    resolve,
    //@ts-ignore
    reject
  };
}

// lib/context.ts
;
var DataRouterContext = react__WEBPACK_IMPORTED_MODULE_0__.createContext(null);
DataRouterContext.displayName = "DataRouter";
var DataRouterStateContext = react__WEBPACK_IMPORTED_MODULE_0__.createContext(null);
DataRouterStateContext.displayName = "DataRouterState";
var RSCRouterContext = react__WEBPACK_IMPORTED_MODULE_0__.createContext(false);
function useIsRSCRouterContext() {
  return react__WEBPACK_IMPORTED_MODULE_0__.useContext(RSCRouterContext);
}
var ViewTransitionContext = react__WEBPACK_IMPORTED_MODULE_0__.createContext({
  isTransitioning: false
});
ViewTransitionContext.displayName = "ViewTransition";
var FetchersContext = react__WEBPACK_IMPORTED_MODULE_0__.createContext(
  /* @__PURE__ */ new Map()
);
FetchersContext.displayName = "Fetchers";
var AwaitContext = react__WEBPACK_IMPORTED_MODULE_0__.createContext(null);
AwaitContext.displayName = "Await";
var AwaitContextProvider = (props) => react__WEBPACK_IMPORTED_MODULE_0__.createElement(AwaitContext.Provider, props);
var NavigationContext = react__WEBPACK_IMPORTED_MODULE_0__.createContext(
  null
);
NavigationContext.displayName = "Navigation";
var LocationContext = react__WEBPACK_IMPORTED_MODULE_0__.createContext(
  null
);
LocationContext.displayName = "Location";
var RouteContext = react__WEBPACK_IMPORTED_MODULE_0__.createContext({
  outlet: null,
  matches: [],
  isDataRoute: false
});
RouteContext.displayName = "Route";
var RouteErrorContext = react__WEBPACK_IMPORTED_MODULE_0__.createContext(null);
RouteErrorContext.displayName = "RouteError";
var ENABLE_DEV_WARNINGS = true;

// lib/hooks.tsx


// lib/errors.ts
var ERROR_DIGEST_BASE = "REACT_ROUTER_ERROR";
var ERROR_DIGEST_REDIRECT = "REDIRECT";
var ERROR_DIGEST_ROUTE_ERROR_RESPONSE = "ROUTE_ERROR_RESPONSE";
function decodeRedirectErrorDigest(digest) {
  if (digest.startsWith(`${ERROR_DIGEST_BASE}:${ERROR_DIGEST_REDIRECT}:{`)) {
    try {
      let parsed = JSON.parse(digest.slice(28));
      if (typeof parsed === "object" && parsed && typeof parsed.status === "number" && typeof parsed.statusText === "string" && typeof parsed.location === "string" && typeof parsed.reloadDocument === "boolean" && typeof parsed.replace === "boolean") {
        return parsed;
      }
    } catch {
    }
  }
}
function decodeRouteErrorResponseDigest(digest) {
  if (digest.startsWith(
    `${ERROR_DIGEST_BASE}:${ERROR_DIGEST_ROUTE_ERROR_RESPONSE}:{`
  )) {
    try {
      let parsed = JSON.parse(digest.slice(40));
      if (typeof parsed === "object" && parsed && typeof parsed.status === "number" && typeof parsed.statusText === "string") {
        return new ErrorResponseImpl(
          parsed.status,
          parsed.statusText,
          parsed.data
        );
      }
    } catch {
    }
  }
}

// lib/hooks.tsx
function useHref(to, { relative } = {}) {
  invariant(
    useInRouterContext(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    `useHref() may be used only in the context of a <Router> component.`
  );
  let { basename, navigator } = react__WEBPACK_IMPORTED_MODULE_0__.useContext(NavigationContext);
  let { hash, pathname, search } = useResolvedPath(to, { relative });
  let joinedPathname = pathname;
  if (basename !== "/") {
    joinedPathname = pathname === "/" ? basename : joinPaths([basename, pathname]);
  }
  return navigator.createHref({ pathname: joinedPathname, search, hash });
}
function useInRouterContext() {
  return react__WEBPACK_IMPORTED_MODULE_0__.useContext(LocationContext) != null;
}
function useLocation() {
  invariant(
    useInRouterContext(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    `useLocation() may be used only in the context of a <Router> component.`
  );
  return react__WEBPACK_IMPORTED_MODULE_0__.useContext(LocationContext).location;
}
function useNavigationType() {
  return react__WEBPACK_IMPORTED_MODULE_0__.useContext(LocationContext).navigationType;
}
function useMatch(pattern) {
  invariant(
    useInRouterContext(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    `useMatch() may be used only in the context of a <Router> component.`
  );
  let { pathname } = useLocation();
  return react__WEBPACK_IMPORTED_MODULE_0__.useMemo(
    () => matchPath(pattern, decodePath(pathname)),
    [pathname, pattern]
  );
}
var navigateEffectWarning = `You should call navigate() in a React.useEffect(), not when your component is first rendered.`;
function useIsomorphicLayoutEffect(cb) {
  let isStatic = react__WEBPACK_IMPORTED_MODULE_0__.useContext(NavigationContext).static;
  if (!isStatic) {
    react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect(cb);
  }
}
function useNavigate() {
  let { isDataRoute } = react__WEBPACK_IMPORTED_MODULE_0__.useContext(RouteContext);
  return isDataRoute ? useNavigateStable() : useNavigateUnstable();
}
function useNavigateUnstable() {
  invariant(
    useInRouterContext(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    `useNavigate() may be used only in the context of a <Router> component.`
  );
  let dataRouterContext = react__WEBPACK_IMPORTED_MODULE_0__.useContext(DataRouterContext);
  let { basename, navigator } = react__WEBPACK_IMPORTED_MODULE_0__.useContext(NavigationContext);
  let { matches } = react__WEBPACK_IMPORTED_MODULE_0__.useContext(RouteContext);
  let { pathname: locationPathname } = useLocation();
  let routePathnamesJson = JSON.stringify(getResolveToMatches(matches));
  let activeRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(false);
  useIsomorphicLayoutEffect(() => {
    activeRef.current = true;
  });
  let navigate = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(
    (to, options = {}) => {
      warning(activeRef.current, navigateEffectWarning);
      if (!activeRef.current) return;
      if (typeof to === "number") {
        navigator.go(to);
        return;
      }
      let path = resolveTo(
        to,
        JSON.parse(routePathnamesJson),
        locationPathname,
        options.relative === "path"
      );
      if (dataRouterContext == null && basename !== "/") {
        path.pathname = path.pathname === "/" ? basename : joinPaths([basename, path.pathname]);
      }
      (!!options.replace ? navigator.replace : navigator.push)(
        path,
        options.state,
        options
      );
    },
    [
      basename,
      navigator,
      routePathnamesJson,
      locationPathname,
      dataRouterContext
    ]
  );
  return navigate;
}
var OutletContext = react__WEBPACK_IMPORTED_MODULE_0__.createContext(null);
function useOutletContext() {
  return react__WEBPACK_IMPORTED_MODULE_0__.useContext(OutletContext);
}
function useOutlet(context) {
  let outlet = react__WEBPACK_IMPORTED_MODULE_0__.useContext(RouteContext).outlet;
  return react__WEBPACK_IMPORTED_MODULE_0__.useMemo(
    () => outlet && /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(OutletContext.Provider, { value: context }, outlet),
    [outlet, context]
  );
}
function useParams() {
  let { matches } = react__WEBPACK_IMPORTED_MODULE_0__.useContext(RouteContext);
  let routeMatch = matches[matches.length - 1];
  return routeMatch?.params ?? {};
}
function useResolvedPath(to, { relative } = {}) {
  let { matches } = react__WEBPACK_IMPORTED_MODULE_0__.useContext(RouteContext);
  let { pathname: locationPathname } = useLocation();
  let routePathnamesJson = JSON.stringify(getResolveToMatches(matches));
  return react__WEBPACK_IMPORTED_MODULE_0__.useMemo(
    () => resolveTo(
      to,
      JSON.parse(routePathnamesJson),
      locationPathname,
      relative === "path"
    ),
    [to, routePathnamesJson, locationPathname, relative]
  );
}
function useRoutes(routes, locationArg) {
  return useRoutesImpl(routes, locationArg);
}
function useRoutesImpl(routes, locationArg, dataRouterOpts) {
  invariant(
    useInRouterContext(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    `useRoutes() may be used only in the context of a <Router> component.`
  );
  let { navigator } = react__WEBPACK_IMPORTED_MODULE_0__.useContext(NavigationContext);
  let { matches: parentMatches } = react__WEBPACK_IMPORTED_MODULE_0__.useContext(RouteContext);
  let routeMatch = parentMatches[parentMatches.length - 1];
  let parentParams = routeMatch ? routeMatch.params : {};
  let parentPathname = routeMatch ? routeMatch.pathname : "/";
  let parentPathnameBase = routeMatch ? routeMatch.pathnameBase : "/";
  let parentRoute = routeMatch && routeMatch.route;
  if (ENABLE_DEV_WARNINGS) {
    let parentPath = parentRoute && parentRoute.path || "";
    warningOnce(
      parentPathname,
      !parentRoute || parentPath.endsWith("*") || parentPath.endsWith("*?"),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${parentPathname}" (under <Route path="${parentPath}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${parentPath}"> to <Route path="${parentPath === "/" ? "*" : `${parentPath}/*`}">.`
    );
  }
  let locationFromContext = useLocation();
  let location;
  if (locationArg) {
    let parsedLocationArg = typeof locationArg === "string" ? parsePath(locationArg) : locationArg;
    invariant(
      parentPathnameBase === "/" || parsedLocationArg.pathname?.startsWith(parentPathnameBase),
      `When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${parentPathnameBase}" but pathname "${parsedLocationArg.pathname}" was given in the \`location\` prop.`
    );
    location = parsedLocationArg;
  } else {
    location = locationFromContext;
  }
  let pathname = location.pathname || "/";
  let remainingPathname = pathname;
  if (parentPathnameBase !== "/") {
    let parentSegments = parentPathnameBase.replace(/^\//, "").split("/");
    let segments = pathname.replace(/^\//, "").split("/");
    remainingPathname = "/" + segments.slice(parentSegments.length).join("/");
  }
  let matches = dataRouterOpts && dataRouterOpts.state.matches.length ? (
    // If we're in a data router, use the matches we've already identified but ensure
    // we have the latest route instances from the manifest in case elements have changed
    dataRouterOpts.state.matches.map(
      (m) => Object.assign(m, {
        route: dataRouterOpts.manifest[m.route.id] || m.route
      })
    )
  ) : matchRoutes(routes, { pathname: remainingPathname });
  if (ENABLE_DEV_WARNINGS) {
    warning(
      parentRoute || matches != null,
      `No routes matched location "${location.pathname}${location.search}${location.hash}" `
    );
    warning(
      matches == null || matches[matches.length - 1].route.element !== void 0 || matches[matches.length - 1].route.Component !== void 0 || matches[matches.length - 1].route.lazy !== void 0,
      `Matched leaf route at location "${location.pathname}${location.search}${location.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`
    );
  }
  let renderedMatches = _renderMatches(
    matches && matches.map(
      (match) => Object.assign({}, match, {
        params: Object.assign({}, parentParams, match.params),
        pathname: joinPaths([
          parentPathnameBase,
          // Re-encode pathnames that were decoded inside matchRoutes.
          // Pre-encode `%`, `?` and `#` ahead of `encodeLocation` because it uses
          // `new URL()` internally and we need to prevent it from treating
          // them as separators
          navigator.encodeLocation ? navigator.encodeLocation(
            match.pathname.replace(/%/g, "%25").replace(/\?/g, "%3F").replace(/#/g, "%23")
          ).pathname : match.pathname
        ]),
        pathnameBase: match.pathnameBase === "/" ? parentPathnameBase : joinPaths([
          parentPathnameBase,
          // Re-encode pathnames that were decoded inside matchRoutes
          // Pre-encode `%`, `?` and `#` ahead of `encodeLocation` because it uses
          // `new URL()` internally and we need to prevent it from treating
          // them as separators
          navigator.encodeLocation ? navigator.encodeLocation(
            match.pathnameBase.replace(/%/g, "%25").replace(/\?/g, "%3F").replace(/#/g, "%23")
          ).pathname : match.pathnameBase
        ])
      })
    ),
    parentMatches,
    dataRouterOpts
  );
  if (locationArg && renderedMatches) {
    return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
      LocationContext.Provider,
      {
        value: {
          location: {
            pathname: "/",
            search: "",
            hash: "",
            state: null,
            key: "default",
            mask: void 0,
            ...location
          },
          navigationType: "POP" /* Pop */
        }
      },
      renderedMatches
    );
  }
  return renderedMatches;
}
function DefaultErrorComponent() {
  let error = useRouteError();
  let message = isRouteErrorResponse(error) ? `${error.status} ${error.statusText}` : error instanceof Error ? error.message : JSON.stringify(error);
  let stack = error instanceof Error ? error.stack : null;
  let lightgrey = "rgba(200,200,200, 0.5)";
  let preStyles = { padding: "0.5rem", backgroundColor: lightgrey };
  let codeStyles = { padding: "2px 4px", backgroundColor: lightgrey };
  let devInfo = null;
  if (ENABLE_DEV_WARNINGS) {
    console.error(
      "Error handled by React Router default ErrorBoundary:",
      error
    );
    devInfo = /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", null, "\u{1F4BF} Hey developer \u{1F44B}"), /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", null, "You can provide a way better UX than this when your app throws errors by providing your own ", /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement("code", { style: codeStyles }, "ErrorBoundary"), " or", " ", /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement("code", { style: codeStyles }, "errorElement"), " prop on your route."));
  }
  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement("h2", null, "Unexpected Application Error!"), /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement("h3", { style: { fontStyle: "italic" } }, message), stack ? /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement("pre", { style: preStyles }, stack) : null, devInfo);
}
var defaultErrorElement = /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(DefaultErrorComponent, null);
var RenderErrorBoundary = class extends react__WEBPACK_IMPORTED_MODULE_0__.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: props.location,
      revalidation: props.revalidation,
      error: props.error
    };
  }
  static getDerivedStateFromError(error) {
    return { error };
  }
  static getDerivedStateFromProps(props, state) {
    if (state.location !== props.location || state.revalidation !== "idle" && props.revalidation === "idle") {
      return {
        error: props.error,
        location: props.location,
        revalidation: props.revalidation
      };
    }
    return {
      error: props.error !== void 0 ? props.error : state.error,
      location: state.location,
      revalidation: props.revalidation || state.revalidation
    };
  }
  componentDidCatch(error, errorInfo) {
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    } else {
      console.error(
        "React Router caught the following error during render",
        error
      );
    }
  }
  render() {
    let error = this.state.error;
    if (this.context && typeof error === "object" && error && "digest" in error && typeof error.digest === "string") {
      const decoded = decodeRouteErrorResponseDigest(error.digest);
      if (decoded) error = decoded;
    }
    let result = error !== void 0 ? /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(RouteContext.Provider, { value: this.props.routeContext }, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
      RouteErrorContext.Provider,
      {
        value: error,
        children: this.props.component
      }
    )) : this.props.children;
    if (this.context) {
      return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(RSCErrorHandler, { error }, result);
    }
    return result;
  }
};
RenderErrorBoundary.contextType = RSCRouterContext;
var errorRedirectHandledMap = /* @__PURE__ */ new WeakMap();
function RSCErrorHandler({
  children,
  error
}) {
  let { basename } = react__WEBPACK_IMPORTED_MODULE_0__.useContext(NavigationContext);
  if (typeof error === "object" && error && "digest" in error && typeof error.digest === "string") {
    let redirect2 = decodeRedirectErrorDigest(error.digest);
    if (redirect2) {
      let existingRedirect = errorRedirectHandledMap.get(error);
      if (existingRedirect) throw existingRedirect;
      let parsed = parseToInfo(redirect2.location, basename);
      let target = parsed.absoluteURL || parsed.to;
      if (hasInvalidProtocol(target)) {
        throw new Error("Invalid redirect location");
      }
      if (isBrowser && !errorRedirectHandledMap.get(error)) {
        if (parsed.isExternal || redirect2.reloadDocument) {
          window.location.href = target;
        } else {
          const redirectPromise = Promise.resolve().then(
            () => window.__reactRouterDataRouter.navigate(parsed.to, {
              replace: redirect2.replace
            })
          );
          errorRedirectHandledMap.set(error, redirectPromise);
          throw redirectPromise;
        }
      }
      return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement("meta", { httpEquiv: "refresh", content: `0;url=${target}` });
    }
  }
  return children;
}
function RenderedRoute({ routeContext, match, children }) {
  let dataRouterContext = react__WEBPACK_IMPORTED_MODULE_0__.useContext(DataRouterContext);
  if (dataRouterContext && dataRouterContext.static && dataRouterContext.staticContext && (match.route.errorElement || match.route.ErrorBoundary)) {
    dataRouterContext.staticContext._deepestRenderedBoundaryId = match.route.id;
  }
  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(RouteContext.Provider, { value: routeContext }, children);
}
function _renderMatches(matches, parentMatches = [], dataRouterOpts) {
  let dataRouterState = dataRouterOpts?.state;
  if (matches == null) {
    if (!dataRouterState) {
      return null;
    }
    if (dataRouterState.errors) {
      matches = dataRouterState.matches;
    } else if (parentMatches.length === 0 && !dataRouterState.initialized && dataRouterState.matches.length > 0) {
      matches = dataRouterState.matches;
    } else {
      return null;
    }
  }
  let renderedMatches = matches;
  let errors = dataRouterState?.errors;
  if (errors != null) {
    let errorIndex = renderedMatches.findIndex(
      (m) => m.route.id && errors?.[m.route.id] !== void 0
    );
    invariant(
      errorIndex >= 0,
      `Could not find a matching route for errors on route IDs: ${Object.keys(
        errors
      ).join(",")}`
    );
    renderedMatches = renderedMatches.slice(
      0,
      Math.min(renderedMatches.length, errorIndex + 1)
    );
  }
  let renderFallback = false;
  let fallbackIndex = -1;
  if (dataRouterOpts && dataRouterState) {
    renderFallback = dataRouterState.renderFallback;
    for (let i = 0; i < renderedMatches.length; i++) {
      let match = renderedMatches[i];
      if (match.route.HydrateFallback || match.route.hydrateFallbackElement) {
        fallbackIndex = i;
      }
      if (match.route.id) {
        let { loaderData, errors: errors2 } = dataRouterState;
        let needsToRunLoader = match.route.loader && !loaderData.hasOwnProperty(match.route.id) && (!errors2 || errors2[match.route.id] === void 0);
        if (match.route.lazy || needsToRunLoader) {
          if (dataRouterOpts.isStatic) {
            renderFallback = true;
          }
          if (fallbackIndex >= 0) {
            renderedMatches = renderedMatches.slice(0, fallbackIndex + 1);
          } else {
            renderedMatches = [renderedMatches[0]];
          }
          break;
        }
      }
    }
  }
  let onErrorHandler = dataRouterOpts?.onError;
  let onError = dataRouterState && onErrorHandler ? (error, errorInfo) => {
    onErrorHandler(error, {
      location: dataRouterState.location,
      params: dataRouterState.matches?.[0]?.params ?? {},
      pattern: getRoutePattern(dataRouterState.matches),
      errorInfo
    });
  } : void 0;
  return renderedMatches.reduceRight(
    (outlet, match, index) => {
      let error;
      let shouldRenderHydrateFallback = false;
      let errorElement = null;
      let hydrateFallbackElement = null;
      if (dataRouterState) {
        error = errors && match.route.id ? errors[match.route.id] : void 0;
        errorElement = match.route.errorElement || defaultErrorElement;
        if (renderFallback) {
          if (fallbackIndex < 0 && index === 0) {
            warningOnce(
              "route-fallback",
              false,
              "No `HydrateFallback` element provided to render during initial hydration"
            );
            shouldRenderHydrateFallback = true;
            hydrateFallbackElement = null;
          } else if (fallbackIndex === index) {
            shouldRenderHydrateFallback = true;
            hydrateFallbackElement = match.route.hydrateFallbackElement || null;
          }
        }
      }
      let matches2 = parentMatches.concat(renderedMatches.slice(0, index + 1));
      let getChildren = () => {
        let children;
        if (error) {
          children = errorElement;
        } else if (shouldRenderHydrateFallback) {
          children = hydrateFallbackElement;
        } else if (match.route.Component) {
          children = /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(match.route.Component, null);
        } else if (match.route.element) {
          children = match.route.element;
        } else {
          children = outlet;
        }
        return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
          RenderedRoute,
          {
            match,
            routeContext: {
              outlet,
              matches: matches2,
              isDataRoute: dataRouterState != null
            },
            children
          }
        );
      };
      return dataRouterState && (match.route.ErrorBoundary || match.route.errorElement || index === 0) ? /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
        RenderErrorBoundary,
        {
          location: dataRouterState.location,
          revalidation: dataRouterState.revalidation,
          component: errorElement,
          error,
          children: getChildren(),
          routeContext: { outlet: null, matches: matches2, isDataRoute: true },
          onError
        }
      ) : getChildren();
    },
    null
  );
}
function getDataRouterConsoleError(hookName) {
  return `${hookName} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function useDataRouterContext(hookName) {
  let ctx = react__WEBPACK_IMPORTED_MODULE_0__.useContext(DataRouterContext);
  invariant(ctx, getDataRouterConsoleError(hookName));
  return ctx;
}
function useDataRouterState(hookName) {
  let state = react__WEBPACK_IMPORTED_MODULE_0__.useContext(DataRouterStateContext);
  invariant(state, getDataRouterConsoleError(hookName));
  return state;
}
function useRouteContext(hookName) {
  let route = react__WEBPACK_IMPORTED_MODULE_0__.useContext(RouteContext);
  invariant(route, getDataRouterConsoleError(hookName));
  return route;
}
function useCurrentRouteId(hookName) {
  let route = useRouteContext(hookName);
  let thisRoute = route.matches[route.matches.length - 1];
  invariant(
    thisRoute.route.id,
    `${hookName} can only be used on routes that contain a unique "id"`
  );
  return thisRoute.route.id;
}
function useRouteId() {
  return useCurrentRouteId("useRouteId" /* UseRouteId */);
}
function useNavigation() {
  let state = useDataRouterState("useNavigation" /* UseNavigation */);
  return react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => {
    let { matches, historyAction, ...rest } = state.navigation;
    return rest;
  }, [state.navigation]);
}
function useRevalidator() {
  let dataRouterContext = useDataRouterContext("useRevalidator" /* UseRevalidator */);
  let state = useDataRouterState("useRevalidator" /* UseRevalidator */);
  let revalidate = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(async () => {
    await dataRouterContext.router.revalidate();
  }, [dataRouterContext.router]);
  return react__WEBPACK_IMPORTED_MODULE_0__.useMemo(
    () => ({ revalidate, state: state.revalidation }),
    [revalidate, state.revalidation]
  );
}
function useMatches() {
  let { matches, loaderData } = useDataRouterState(
    "useMatches" /* UseMatches */
  );
  return react__WEBPACK_IMPORTED_MODULE_0__.useMemo(
    () => matches.map((m) => convertRouteMatchToUiMatch(m, loaderData)),
    [matches, loaderData]
  );
}
function useLoaderData() {
  let state = useDataRouterState("useLoaderData" /* UseLoaderData */);
  let routeId = useCurrentRouteId("useLoaderData" /* UseLoaderData */);
  return state.loaderData[routeId];
}
function useRouteLoaderData(routeId) {
  let state = useDataRouterState("useRouteLoaderData" /* UseRouteLoaderData */);
  return state.loaderData[routeId];
}
function useActionData() {
  let state = useDataRouterState("useActionData" /* UseActionData */);
  let routeId = useCurrentRouteId("useLoaderData" /* UseLoaderData */);
  return state.actionData ? state.actionData[routeId] : void 0;
}
function useRouteError() {
  let error = react__WEBPACK_IMPORTED_MODULE_0__.useContext(RouteErrorContext);
  let state = useDataRouterState("useRouteError" /* UseRouteError */);
  let routeId = useCurrentRouteId("useRouteError" /* UseRouteError */);
  if (error !== void 0) {
    return error;
  }
  return state.errors?.[routeId];
}
function useAsyncValue() {
  let value = react__WEBPACK_IMPORTED_MODULE_0__.useContext(AwaitContext);
  return value?._data;
}
function useAsyncError() {
  let value = react__WEBPACK_IMPORTED_MODULE_0__.useContext(AwaitContext);
  return value?._error;
}
var blockerId = 0;
function useBlocker(shouldBlock) {
  let { router, basename } = useDataRouterContext("useBlocker" /* UseBlocker */);
  let state = useDataRouterState("useBlocker" /* UseBlocker */);
  let [blockerKey, setBlockerKey] = react__WEBPACK_IMPORTED_MODULE_0__.useState("");
  let blockerFunction = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(
    (arg) => {
      if (typeof shouldBlock !== "function") {
        return !!shouldBlock;
      }
      if (basename === "/") {
        return shouldBlock(arg);
      }
      let { currentLocation, nextLocation, historyAction } = arg;
      return shouldBlock({
        currentLocation: {
          ...currentLocation,
          pathname: stripBasename(currentLocation.pathname, basename) || currentLocation.pathname
        },
        nextLocation: {
          ...nextLocation,
          pathname: stripBasename(nextLocation.pathname, basename) || nextLocation.pathname
        },
        historyAction
      });
    },
    [basename, shouldBlock]
  );
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    let key = String(++blockerId);
    setBlockerKey(key);
    return () => router.deleteBlocker(key);
  }, [router]);
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    if (blockerKey !== "") {
      router.getBlocker(blockerKey, blockerFunction);
    }
  }, [router, blockerKey, blockerFunction]);
  return blockerKey && state.blockers.has(blockerKey) ? state.blockers.get(blockerKey) : IDLE_BLOCKER;
}
function useNavigateStable() {
  let { router } = useDataRouterContext("useNavigate" /* UseNavigateStable */);
  let id = useCurrentRouteId("useNavigate" /* UseNavigateStable */);
  let activeRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(false);
  useIsomorphicLayoutEffect(() => {
    activeRef.current = true;
  });
  let navigate = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(
    async (to, options = {}) => {
      warning(activeRef.current, navigateEffectWarning);
      if (!activeRef.current) return;
      if (typeof to === "number") {
        await router.navigate(to);
      } else {
        await router.navigate(to, { fromRouteId: id, ...options });
      }
    },
    [router, id]
  );
  return navigate;
}
var alreadyWarned = {};
function warningOnce(key, cond, message) {
  if (!cond && !alreadyWarned[key]) {
    alreadyWarned[key] = true;
    warning(false, message);
  }
}
function useRoute(...args) {
  const currentRouteId = useCurrentRouteId(
    "useRoute" /* UseRoute */
  );
  const id = args[0] ?? currentRouteId;
  const state = useDataRouterState("useRoute" /* UseRoute */);
  const route = state.matches.find(({ route: route2 }) => route2.id === id);
  if (route === void 0) return void 0;
  return {
    handle: route.route.handle,
    loaderData: state.loaderData[id],
    actionData: state.actionData?.[id]
  };
}
function toRouterStateMatch(match) {
  return {
    id: match.route.id,
    pathname: match.pathname,
    params: match.params,
    handle: match.route.handle
  };
}
function useRouterState() {
  let {
    location,
    historyAction: type,
    matches,
    navigation
  } = useDataRouterState("unstable_useRouterState" /* UseRouterState */);
  let active = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(
    () => ({
      type,
      location,
      searchParams: new URLSearchParams(location.search),
      params: matches[matches.length - 1]?.params ?? {},
      matches: matches.map((m) => toRouterStateMatch(m))
    }),
    [location, matches, type]
  );
  let pending = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => {
    if (navigation.state === "idle") return null;
    let shared = {
      type: navigation.historyAction,
      location: navigation.location,
      searchParams: new URLSearchParams(navigation.location.search),
      params: navigation.matches[navigation.matches.length - 1]?.params ?? {},
      matches: navigation.matches.map((m) => toRouterStateMatch(m))
    };
    return navigation.state === "loading" ? {
      ...shared,
      state: "loading",
      formMethod: navigation.formMethod,
      formAction: navigation.formAction,
      formEncType: navigation.formEncType,
      formData: navigation.formData,
      json: navigation.json,
      text: navigation.text
    } : {
      ...shared,
      state: "submitting",
      formMethod: navigation.formMethod,
      formAction: navigation.formAction,
      formEncType: navigation.formEncType,
      formData: navigation.formData,
      json: navigation.json,
      text: navigation.text
    };
  }, [navigation]);
  return react__WEBPACK_IMPORTED_MODULE_0__.useMemo(
    () => ({ active, pending }),
    [active, pending]
  );
}

// lib/components.tsx
;

// lib/server-runtime/warnings.ts
var alreadyWarned2 = {};
function warnOnce(condition, message) {
  if (!condition && !alreadyWarned2[message]) {
    alreadyWarned2[message] = true;
    console.warn(message);
  }
}

// lib/components.tsx
var USE_OPTIMISTIC = "useOptimistic";
var useOptimisticImpl = /*#__PURE__*/ (react__WEBPACK_IMPORTED_MODULE_0___namespace_cache || (react__WEBPACK_IMPORTED_MODULE_0___namespace_cache = __webpack_require__.t(react__WEBPACK_IMPORTED_MODULE_0__, 2)))[USE_OPTIMISTIC];
var stableUseOptimisticSetter = () => void 0;
function useOptimisticSafe(val) {
  if (useOptimisticImpl) {
    return useOptimisticImpl(val);
  } else {
    return [val, stableUseOptimisticSetter];
  }
}
function mapRouteProperties(route) {
  let updates = {
    // Note: this check also occurs in createRoutesFromChildren so update
    // there if you change this -- please and thank you!
    hasErrorBoundary: route.hasErrorBoundary || route.ErrorBoundary != null || route.errorElement != null
  };
  if (route.Component) {
    if (ENABLE_DEV_WARNINGS) {
      if (route.element) {
        warning(
          false,
          "You should not include both `Component` and `element` on your route - `Component` will be used."
        );
      }
    }
    Object.assign(updates, {
      element: react__WEBPACK_IMPORTED_MODULE_0__.createElement(route.Component),
      Component: void 0
    });
  }
  if (route.HydrateFallback) {
    if (ENABLE_DEV_WARNINGS) {
      if (route.hydrateFallbackElement) {
        warning(
          false,
          "You should not include both `HydrateFallback` and `hydrateFallbackElement` on your route - `HydrateFallback` will be used."
        );
      }
    }
    Object.assign(updates, {
      hydrateFallbackElement: react__WEBPACK_IMPORTED_MODULE_0__.createElement(route.HydrateFallback),
      HydrateFallback: void 0
    });
  }
  if (route.ErrorBoundary) {
    if (ENABLE_DEV_WARNINGS) {
      if (route.errorElement) {
        warning(
          false,
          "You should not include both `ErrorBoundary` and `errorElement` on your route - `ErrorBoundary` will be used."
        );
      }
    }
    Object.assign(updates, {
      errorElement: react__WEBPACK_IMPORTED_MODULE_0__.createElement(route.ErrorBoundary),
      ErrorBoundary: void 0
    });
  }
  return updates;
}
var hydrationRouteProperties = [
  "HydrateFallback",
  "hydrateFallbackElement"
];
function createMemoryRouter(routes, opts) {
  return createRouter({
    basename: opts?.basename,
    getContext: opts?.getContext,
    future: opts?.future,
    history: createMemoryHistory({
      initialEntries: opts?.initialEntries,
      initialIndex: opts?.initialIndex
    }),
    hydrationData: opts?.hydrationData,
    routes,
    hydrationRouteProperties,
    mapRouteProperties,
    dataStrategy: opts?.dataStrategy,
    patchRoutesOnNavigation: opts?.patchRoutesOnNavigation,
    instrumentations: opts?.instrumentations
  }).initialize();
}
var Deferred = class {
  constructor() {
    this.status = "pending";
    this.promise = new Promise((resolve, reject) => {
      this.resolve = (value) => {
        if (this.status === "pending") {
          this.status = "resolved";
          resolve(value);
        }
      };
      this.reject = (reason) => {
        if (this.status === "pending") {
          this.status = "rejected";
          reject(reason);
        }
      };
    });
  }
};
function RouterProvider({
  router,
  flushSync: reactDomFlushSyncImpl,
  onError,
  useTransitions
}) {
  let unstable_rsc = useIsRSCRouterContext();
  useTransitions = unstable_rsc || useTransitions;
  let [_state, setStateImpl] = react__WEBPACK_IMPORTED_MODULE_0__.useState(router.state);
  let [state, setOptimisticState] = useOptimisticSafe(_state);
  let [pendingState, setPendingState] = react__WEBPACK_IMPORTED_MODULE_0__.useState();
  let [vtContext, setVtContext] = react__WEBPACK_IMPORTED_MODULE_0__.useState({
    isTransitioning: false
  });
  let [renderDfd, setRenderDfd] = react__WEBPACK_IMPORTED_MODULE_0__.useState();
  let [transition, setTransition] = react__WEBPACK_IMPORTED_MODULE_0__.useState();
  let [interruption, setInterruption] = react__WEBPACK_IMPORTED_MODULE_0__.useState();
  let fetcherData = react__WEBPACK_IMPORTED_MODULE_0__.useRef(/* @__PURE__ */ new Map());
  let setState = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(
    (newState, { deletedFetchers, newErrors, flushSync, viewTransitionOpts }) => {
      if (newErrors && onError) {
        Object.values(newErrors).forEach(
          (error) => onError(error, {
            location: newState.location,
            params: newState.matches[0]?.params ?? {},
            pattern: getRoutePattern(newState.matches)
          })
        );
      }
      newState.fetchers.forEach((fetcher, key) => {
        if (fetcher.data !== void 0) {
          fetcherData.current.set(key, fetcher.data);
        }
      });
      deletedFetchers.forEach((key) => fetcherData.current.delete(key));
      warnOnce(
        flushSync === false || reactDomFlushSyncImpl != null,
        'You provided the `flushSync` option to a router update, but you are not using the `<RouterProvider>` from `react-router/dom` so `ReactDOM.flushSync()` is unavailable.  Please update your app to `import { RouterProvider } from "react-router/dom"` and ensure you have `react-dom` installed as a dependency to use the `flushSync` option.'
      );
      let isViewTransitionAvailable = router.window != null && router.window.document != null && typeof router.window.document.startViewTransition === "function";
      warnOnce(
        viewTransitionOpts == null || isViewTransitionAvailable,
        "You provided the `viewTransition` option to a router update, but you do not appear to be running in a DOM environment as `window.startViewTransition` is not available."
      );
      if (!viewTransitionOpts || !isViewTransitionAvailable) {
        if (reactDomFlushSyncImpl && flushSync) {
          reactDomFlushSyncImpl(() => setStateImpl(newState));
        } else if (useTransitions === false) {
          setStateImpl(newState);
        } else {
          react__WEBPACK_IMPORTED_MODULE_0__.startTransition(() => {
            if (useTransitions === true) {
              setOptimisticState((s) => getOptimisticRouterState(s, newState));
            }
            setStateImpl(newState);
          });
        }
        return;
      }
      if (reactDomFlushSyncImpl && flushSync) {
        reactDomFlushSyncImpl(() => {
          if (transition) {
            renderDfd?.resolve();
            transition.skipTransition();
          }
          setVtContext({
            isTransitioning: true,
            flushSync: true,
            currentLocation: viewTransitionOpts.currentLocation,
            nextLocation: viewTransitionOpts.nextLocation
          });
        });
        let t = router.window.document.startViewTransition(() => {
          reactDomFlushSyncImpl(() => setStateImpl(newState));
        });
        t.finished.finally(() => {
          reactDomFlushSyncImpl(() => {
            setRenderDfd(void 0);
            setTransition(void 0);
            setPendingState(void 0);
            setVtContext({ isTransitioning: false });
          });
        });
        reactDomFlushSyncImpl(() => setTransition(t));
        return;
      }
      if (transition) {
        renderDfd?.resolve();
        transition.skipTransition();
        setInterruption({
          state: newState,
          currentLocation: viewTransitionOpts.currentLocation,
          nextLocation: viewTransitionOpts.nextLocation
        });
      } else {
        setPendingState(newState);
        setVtContext({
          isTransitioning: true,
          flushSync: false,
          currentLocation: viewTransitionOpts.currentLocation,
          nextLocation: viewTransitionOpts.nextLocation
        });
      }
    },
    [
      router.window,
      reactDomFlushSyncImpl,
      transition,
      renderDfd,
      useTransitions,
      setOptimisticState,
      onError
    ]
  );
  react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect(() => router.subscribe(setState), [router, setState]);
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    if (vtContext.isTransitioning && !vtContext.flushSync) {
      setRenderDfd(new Deferred());
    }
  }, [vtContext]);
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    if (renderDfd && pendingState && router.window) {
      let newState = pendingState;
      let renderPromise = renderDfd.promise;
      let transition2 = router.window.document.startViewTransition(async () => {
        if (useTransitions === false) {
          setStateImpl(newState);
        } else {
          react__WEBPACK_IMPORTED_MODULE_0__.startTransition(() => {
            if (useTransitions === true) {
              setOptimisticState((s) => getOptimisticRouterState(s, newState));
            }
            setStateImpl(newState);
          });
        }
        await renderPromise;
      });
      transition2.finished.finally(() => {
        setRenderDfd(void 0);
        setTransition(void 0);
        setPendingState(void 0);
        setVtContext({ isTransitioning: false });
      });
      setTransition(transition2);
    }
  }, [
    pendingState,
    renderDfd,
    router.window,
    useTransitions,
    setOptimisticState
  ]);
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    if (renderDfd && pendingState && state.location.key === pendingState.location.key) {
      renderDfd.resolve();
    }
  }, [renderDfd, transition, state.location, pendingState]);
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    if (!vtContext.isTransitioning && interruption) {
      setPendingState(interruption.state);
      setVtContext({
        isTransitioning: true,
        flushSync: false,
        currentLocation: interruption.currentLocation,
        nextLocation: interruption.nextLocation
      });
      setInterruption(void 0);
    }
  }, [vtContext.isTransitioning, interruption]);
  let navigator = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => {
    return {
      createHref: router.createHref,
      encodeLocation: router.encodeLocation,
      go: (n) => router.navigate(n),
      push: (to, state2, opts) => router.navigate(to, {
        state: state2,
        preventScrollReset: opts?.preventScrollReset
      }),
      replace: (to, state2, opts) => router.navigate(to, {
        replace: true,
        state: state2,
        preventScrollReset: opts?.preventScrollReset
      })
    };
  }, [router]);
  let basename = router.basename || "/";
  let dataRouterContext = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(
    () => ({
      router,
      navigator,
      static: false,
      basename,
      onError
    }),
    [router, navigator, basename, onError]
  );
  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(DataRouterContext.Provider, { value: dataRouterContext }, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(DataRouterStateContext.Provider, { value: state }, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(FetchersContext.Provider, { value: fetcherData.current }, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(ViewTransitionContext.Provider, { value: vtContext }, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
    Router,
    {
      basename,
      location: state.location,
      navigationType: state.historyAction,
      navigator,
      useTransitions
    },
    /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
      MemoizedDataRoutes,
      {
        routes: router.routes,
        manifest: router.manifest,
        future: router.future,
        state,
        isStatic: false,
        onError
      }
    )
  ))))), null);
}
function getOptimisticRouterState(currentState, newState) {
  return {
    // Don't surface "current location specific" stuff mid-navigation
    // (historyAction, location, matches, loaderData, errors, initialized,
    // restoreScroll, preventScrollReset, blockers, etc.)
    ...currentState,
    // Only surface "pending/in-flight stuff"
    // (navigation, revalidation, actionData, fetchers, )
    navigation: newState.navigation.state !== "idle" ? newState.navigation : currentState.navigation,
    revalidation: newState.revalidation !== "idle" ? newState.revalidation : currentState.revalidation,
    actionData: newState.navigation.state !== "submitting" ? newState.actionData : currentState.actionData,
    fetchers: newState.fetchers
  };
}
var MemoizedDataRoutes = react__WEBPACK_IMPORTED_MODULE_0__.memo(DataRoutes2);
function DataRoutes2({
  routes,
  manifest,
  future,
  state,
  isStatic,
  onError
}) {
  return useRoutesImpl(routes, void 0, {
    manifest,
    state,
    isStatic,
    onError,
    future
  });
}
function MemoryRouter({
  basename,
  children,
  initialEntries,
  initialIndex,
  useTransitions
}) {
  let historyRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef();
  if (historyRef.current == null) {
    historyRef.current = createMemoryHistory({
      initialEntries,
      initialIndex,
      v5Compat: true
    });
  }
  let history = historyRef.current;
  let [state, setStateImpl] = react__WEBPACK_IMPORTED_MODULE_0__.useState({
    action: history.action,
    location: history.location
  });
  let setState = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(
    (newState) => {
      if (useTransitions === false) {
        setStateImpl(newState);
      } else {
        react__WEBPACK_IMPORTED_MODULE_0__.startTransition(() => setStateImpl(newState));
      }
    },
    [useTransitions]
  );
  react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect(() => history.listen(setState), [history, setState]);
  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
    Router,
    {
      basename,
      children,
      location: state.location,
      navigationType: state.action,
      navigator: history,
      useTransitions
    }
  );
}
function Navigate({
  to,
  replace: replace2,
  state,
  relative
}) {
  invariant(
    useInRouterContext(),
    // TODO: This error is probably because they somehow have 2 versions of
    // the router loaded. We can help them understand how to avoid that.
    `<Navigate> may be used only in the context of a <Router> component.`
  );
  let { static: isStatic } = react__WEBPACK_IMPORTED_MODULE_0__.useContext(NavigationContext);
  warning(
    !isStatic,
    `<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.`
  );
  let { matches } = react__WEBPACK_IMPORTED_MODULE_0__.useContext(RouteContext);
  let { pathname: locationPathname } = useLocation();
  let navigate = useNavigate();
  let path = resolveTo(
    to,
    getResolveToMatches(matches),
    locationPathname,
    relative === "path"
  );
  let jsonPath = JSON.stringify(path);
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    navigate(JSON.parse(jsonPath), { replace: replace2, state, relative });
  }, [navigate, jsonPath, relative, replace2, state]);
  return null;
}
function Outlet(props) {
  return useOutlet(props.context);
}
function Route(props) {
  invariant(
    false,
    `A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.`
  );
}
function Router({
  basename: basenameProp = "/",
  children = null,
  location: locationProp,
  navigationType = "POP" /* Pop */,
  navigator,
  static: staticProp = false,
  useTransitions
}) {
  invariant(
    !useInRouterContext(),
    `You cannot render a <Router> inside another <Router>. You should never have more than one in your app.`
  );
  let basename = basenameProp.replace(/^\/*/, "/");
  let navigationContext = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(
    () => ({
      basename,
      navigator,
      static: staticProp,
      useTransitions,
      future: {}
    }),
    [basename, navigator, staticProp, useTransitions]
  );
  if (typeof locationProp === "string") {
    locationProp = parsePath(locationProp);
  }
  let {
    pathname = "/",
    search = "",
    hash = "",
    state = null,
    key = "default",
    mask
  } = locationProp;
  let locationContext = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => {
    let trailingPathname = stripBasename(pathname, basename);
    if (trailingPathname == null) {
      return null;
    }
    return {
      location: {
        pathname: trailingPathname,
        search,
        hash,
        state,
        key,
        mask
      },
      navigationType
    };
  }, [basename, pathname, search, hash, state, key, navigationType, mask]);
  warning(
    locationContext != null,
    `<Router basename="${basename}"> is not able to match the URL "${pathname}${search}${hash}" because it does not start with the basename, so the <Router> won't render anything.`
  );
  if (locationContext == null) {
    return null;
  }
  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(NavigationContext.Provider, { value: navigationContext }, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(LocationContext.Provider, { children, value: locationContext }));
}
function Routes({
  children,
  location
}) {
  return useRoutes(createRoutesFromChildren(children), location);
}
function Await({
  children,
  errorElement,
  resolve
}) {
  let dataRouterContext = react__WEBPACK_IMPORTED_MODULE_0__.useContext(DataRouterContext);
  let dataRouterStateContext = react__WEBPACK_IMPORTED_MODULE_0__.useContext(DataRouterStateContext);
  let onError = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(
    (error, errorInfo) => {
      if (dataRouterContext && dataRouterContext.onError && dataRouterStateContext) {
        dataRouterContext.onError(error, {
          location: dataRouterStateContext.location,
          params: dataRouterStateContext.matches[0]?.params || {},
          pattern: getRoutePattern(dataRouterStateContext.matches),
          errorInfo
        });
      }
    },
    [dataRouterContext, dataRouterStateContext]
  );
  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
    AwaitErrorBoundary,
    {
      resolve,
      errorElement,
      onError
    },
    /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(ResolveAwait, null, children)
  );
}
var AwaitErrorBoundary = class extends react__WEBPACK_IMPORTED_MODULE_0__.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error) {
    return { error };
  }
  componentDidCatch(error, errorInfo) {
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    } else {
      console.error(
        "<Await> caught the following error during render",
        error,
        errorInfo
      );
    }
  }
  render() {
    let { children, errorElement, resolve } = this.props;
    let promise = null;
    let status = 0 /* pending */;
    if (!(resolve instanceof Promise)) {
      status = 1 /* success */;
      promise = Promise.resolve();
      Object.defineProperty(promise, "_tracked", { get: () => true });
      Object.defineProperty(promise, "_data", { get: () => resolve });
    } else if (this.state.error) {
      status = 2 /* error */;
      let renderError = this.state.error;
      promise = Promise.reject().catch(() => {
      });
      Object.defineProperty(promise, "_tracked", { get: () => true });
      Object.defineProperty(promise, "_error", { get: () => renderError });
    } else if (resolve._tracked) {
      promise = resolve;
      status = "_error" in promise ? 2 /* error */ : "_data" in promise ? 1 /* success */ : 0 /* pending */;
    } else {
      status = 0 /* pending */;
      Object.defineProperty(resolve, "_tracked", { get: () => true });
      promise = resolve.then(
        (data2) => Object.defineProperty(resolve, "_data", { get: () => data2 }),
        (error) => {
          this.props.onError?.(error);
          Object.defineProperty(resolve, "_error", { get: () => error });
        }
      );
    }
    if (status === 2 /* error */ && !errorElement) {
      throw promise._error;
    }
    if (status === 2 /* error */) {
      return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(AwaitContext.Provider, { value: promise, children: errorElement });
    }
    if (status === 1 /* success */) {
      return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(AwaitContext.Provider, { value: promise, children });
    }
    throw promise;
  }
};
function ResolveAwait({
  children
}) {
  let data2 = useAsyncValue();
  let toRender = typeof children === "function" ? children(data2) : children;
  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, toRender);
}
function createRoutesFromChildren(children, parentPath = []) {
  let routes = [];
  react__WEBPACK_IMPORTED_MODULE_0__.Children.forEach(children, (element, index) => {
    if (!react__WEBPACK_IMPORTED_MODULE_0__.isValidElement(element)) {
      return;
    }
    let treePath = [...parentPath, index];
    if (element.type === react__WEBPACK_IMPORTED_MODULE_0__.Fragment) {
      routes.push.apply(
        routes,
        createRoutesFromChildren(element.props.children, treePath)
      );
      return;
    }
    invariant(
      element.type === Route,
      `[${typeof element.type === "string" ? element.type : element.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`
    );
    invariant(
      !element.props.index || !element.props.children,
      "An index route cannot have child routes."
    );
    let route = {
      id: element.props.id || treePath.join("-"),
      caseSensitive: element.props.caseSensitive,
      element: element.props.element,
      Component: element.props.Component,
      index: element.props.index,
      path: element.props.path,
      middleware: element.props.middleware,
      loader: element.props.loader,
      action: element.props.action,
      hydrateFallbackElement: element.props.hydrateFallbackElement,
      HydrateFallback: element.props.HydrateFallback,
      errorElement: element.props.errorElement,
      ErrorBoundary: element.props.ErrorBoundary,
      hasErrorBoundary: element.props.hasErrorBoundary === true || element.props.ErrorBoundary != null || element.props.errorElement != null,
      shouldRevalidate: element.props.shouldRevalidate,
      handle: element.props.handle,
      lazy: element.props.lazy
    };
    if (element.props.children) {
      route.children = createRoutesFromChildren(
        element.props.children,
        treePath
      );
    }
    routes.push(route);
  });
  return routes;
}
var createRoutesFromElements = createRoutesFromChildren;
function renderMatches(matches) {
  return _renderMatches(matches);
}
function useRouteComponentProps() {
  return {
    params: useParams(),
    loaderData: useLoaderData(),
    actionData: useActionData(),
    matches: useMatches()
  };
}
function WithComponentProps({
  children
}) {
  const props = useRouteComponentProps();
  return react__WEBPACK_IMPORTED_MODULE_0__.cloneElement(children, props);
}
function withComponentProps(Component4) {
  return function WithComponentProps2() {
    const props = useRouteComponentProps();
    return react__WEBPACK_IMPORTED_MODULE_0__.createElement(Component4, props);
  };
}
function useHydrateFallbackProps() {
  return {
    params: useParams(),
    loaderData: useLoaderData(),
    actionData: useActionData()
  };
}
function WithHydrateFallbackProps({
  children
}) {
  const props = useHydrateFallbackProps();
  return react__WEBPACK_IMPORTED_MODULE_0__.cloneElement(children, props);
}
function withHydrateFallbackProps(HydrateFallback) {
  return function WithHydrateFallbackProps2() {
    const props = useHydrateFallbackProps();
    return react__WEBPACK_IMPORTED_MODULE_0__.createElement(HydrateFallback, props);
  };
}
function useErrorBoundaryProps() {
  return {
    params: useParams(),
    loaderData: useLoaderData(),
    actionData: useActionData(),
    error: useRouteError()
  };
}
function WithErrorBoundaryProps({
  children
}) {
  const props = useErrorBoundaryProps();
  return react__WEBPACK_IMPORTED_MODULE_0__.cloneElement(children, props);
}
function withErrorBoundaryProps(ErrorBoundary) {
  return function WithErrorBoundaryProps2() {
    const props = useErrorBoundaryProps();
    return react__WEBPACK_IMPORTED_MODULE_0__.createElement(ErrorBoundary, props);
  };
}

// lib/dom/dom.ts
var defaultMethod = "get";
var defaultEncType = "application/x-www-form-urlencoded";
function isHtmlElement(object) {
  return typeof HTMLElement !== "undefined" && object instanceof HTMLElement;
}
function isButtonElement(object) {
  return isHtmlElement(object) && object.tagName.toLowerCase() === "button";
}
function isFormElement(object) {
  return isHtmlElement(object) && object.tagName.toLowerCase() === "form";
}
function isInputElement(object) {
  return isHtmlElement(object) && object.tagName.toLowerCase() === "input";
}
function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}
function shouldProcessLinkClick(event, target) {
  return event.button === 0 && // Ignore everything but left clicks
  (!target || target === "_self") && // Let browser handle "target=_blank" etc.
  !isModifiedEvent(event);
}
function createSearchParams(init = "") {
  return new URLSearchParams(
    typeof init === "string" || Array.isArray(init) || init instanceof URLSearchParams ? init : Object.keys(init).reduce((memo2, key) => {
      let value = init[key];
      return memo2.concat(
        Array.isArray(value) ? value.map((v) => [key, v]) : [[key, value]]
      );
    }, [])
  );
}
function getSearchParamsForLocation(locationSearch, defaultSearchParams) {
  let searchParams = createSearchParams(locationSearch);
  if (defaultSearchParams) {
    defaultSearchParams.forEach((_, key) => {
      if (!searchParams.has(key)) {
        defaultSearchParams.getAll(key).forEach((value) => {
          searchParams.append(key, value);
        });
      }
    });
  }
  return searchParams;
}
var _formDataSupportsSubmitter = null;
function isFormDataSubmitterSupported() {
  if (_formDataSupportsSubmitter === null) {
    try {
      new FormData(
        document.createElement("form"),
        // @ts-expect-error if FormData supports the submitter parameter, this will throw
        0
      );
      _formDataSupportsSubmitter = false;
    } catch (e) {
      _formDataSupportsSubmitter = true;
    }
  }
  return _formDataSupportsSubmitter;
}
var supportedFormEncTypes = /* @__PURE__ */ new Set([
  "application/x-www-form-urlencoded",
  "multipart/form-data",
  "text/plain"
]);
function getFormEncType(encType) {
  if (encType != null && !supportedFormEncTypes.has(encType)) {
    warning(
      false,
      `"${encType}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${defaultEncType}"`
    );
    return null;
  }
  return encType;
}
function getFormSubmissionInfo(target, basename) {
  let method;
  let action;
  let encType;
  let formData;
  let body;
  if (isFormElement(target)) {
    let attr = target.getAttribute("action");
    action = attr ? stripBasename(attr, basename) : null;
    method = target.getAttribute("method") || defaultMethod;
    encType = getFormEncType(target.getAttribute("enctype")) || defaultEncType;
    formData = new FormData(target);
  } else if (isButtonElement(target) || isInputElement(target) && (target.type === "submit" || target.type === "image")) {
    let form = target.form;
    if (form == null) {
      throw new Error(
        `Cannot submit a <button> or <input type="submit"> without a <form>`
      );
    }
    let attr = target.getAttribute("formaction") || form.getAttribute("action");
    action = attr ? stripBasename(attr, basename) : null;
    method = target.getAttribute("formmethod") || form.getAttribute("method") || defaultMethod;
    encType = getFormEncType(target.getAttribute("formenctype")) || getFormEncType(form.getAttribute("enctype")) || defaultEncType;
    formData = new FormData(form, target);
    if (!isFormDataSubmitterSupported()) {
      let { name, type, value } = target;
      if (type === "image") {
        let prefix = name ? `${name}.` : "";
        formData.append(`${prefix}x`, "0");
        formData.append(`${prefix}y`, "0");
      } else if (name) {
        formData.append(name, value);
      }
    }
  } else if (isHtmlElement(target)) {
    throw new Error(
      `Cannot submit element that is not <form>, <button>, or <input type="submit|image">`
    );
  } else {
    method = defaultMethod;
    action = null;
    encType = defaultEncType;
    body = target;
  }
  if (formData && encType === "text/plain") {
    body = formData;
    formData = void 0;
  }
  return { action, method: method.toLowerCase(), encType, formData, body };
}

// lib/dom/ssr/single-fetch.tsx
;

// vendor/turbo-stream-v2/utils.ts
var HOLE = -1;
var NAN = -2;
var NEGATIVE_INFINITY = -3;
var NEGATIVE_ZERO = -4;
var NULL = -5;
var POSITIVE_INFINITY = -6;
var UNDEFINED = -7;
var TYPE_BIGINT = "B";
var TYPE_DATE = "D";
var TYPE_ERROR = "E";
var TYPE_MAP = "M";
var TYPE_NULL_OBJECT = "N";
var TYPE_PROMISE = "P";
var TYPE_REGEXP = "R";
var TYPE_SET = "S";
var TYPE_SYMBOL = "Y";
var TYPE_URL = "U";
var TYPE_PREVIOUS_RESOLVED = "Z";
var Deferred2 = class {
  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }
};
function createLineSplittingTransform() {
  const decoder = new TextDecoder();
  let leftover = "";
  return new TransformStream({
    transform(chunk, controller) {
      const str = decoder.decode(chunk, { stream: true });
      const parts = (leftover + str).split("\n");
      leftover = parts.pop() || "";
      for (const part of parts) {
        controller.enqueue(part);
      }
    },
    flush(controller) {
      if (leftover) {
        controller.enqueue(leftover);
      }
    }
  });
}

// vendor/turbo-stream-v2/flatten.ts
var TIME_LIMIT_MS = 1;
var getNow = () => Date.now();
var yieldToMain = () => new Promise((resolve) => setTimeout(resolve, 0));
async function flatten(input) {
  const { indices } = this;
  const existing = indices.get(input);
  if (existing) return [existing];
  if (input === void 0) return UNDEFINED;
  if (input === null) return NULL;
  if (Number.isNaN(input)) return NAN;
  if (input === Number.POSITIVE_INFINITY) return POSITIVE_INFINITY;
  if (input === Number.NEGATIVE_INFINITY) return NEGATIVE_INFINITY;
  if (input === 0 && 1 / input < 0) return NEGATIVE_ZERO;
  const index = this.index++;
  indices.set(input, index);
  const stack = [[input, index]];
  await stringify.call(this, stack);
  return index;
}
async function stringify(stack) {
  const { deferred, indices, plugins, postPlugins } = this;
  const str = this.stringified;
  let lastYieldTime = getNow();
  const flattenValue = (value) => {
    const existing = indices.get(value);
    if (existing) return [existing];
    if (value === void 0) return UNDEFINED;
    if (value === null) return NULL;
    if (Number.isNaN(value)) return NAN;
    if (value === Number.POSITIVE_INFINITY) return POSITIVE_INFINITY;
    if (value === Number.NEGATIVE_INFINITY) return NEGATIVE_INFINITY;
    if (value === 0 && 1 / value < 0) return NEGATIVE_ZERO;
    const index = this.index++;
    indices.set(value, index);
    stack.push([value, index]);
    return index;
  };
  let i = 0;
  while (stack.length > 0) {
    const now = getNow();
    if (++i % 6e3 === 0 && now - lastYieldTime >= TIME_LIMIT_MS) {
      await yieldToMain();
      lastYieldTime = getNow();
    }
    const [input, index] = stack.pop();
    const partsForObj = (obj) => Object.keys(obj).map((k) => `"_${flattenValue(k)}":${flattenValue(obj[k])}`).join(",");
    let error = null;
    switch (typeof input) {
      case "boolean":
      case "number":
      case "string":
        str[index] = JSON.stringify(input);
        break;
      case "bigint":
        str[index] = `["${TYPE_BIGINT}","${input}"]`;
        break;
      case "symbol": {
        const keyFor = Symbol.keyFor(input);
        if (!keyFor) {
          error = new Error(
            "Cannot encode symbol unless created with Symbol.for()"
          );
        } else {
          str[index] = `["${TYPE_SYMBOL}",${JSON.stringify(keyFor)}]`;
        }
        break;
      }
      case "object": {
        if (!input) {
          str[index] = `${NULL}`;
          break;
        }
        const isArray = Array.isArray(input);
        let pluginHandled = false;
        if (!isArray && plugins) {
          for (const plugin of plugins) {
            const pluginResult = plugin(input);
            if (Array.isArray(pluginResult)) {
              pluginHandled = true;
              const [pluginIdentifier, ...rest] = pluginResult;
              str[index] = `[${JSON.stringify(pluginIdentifier)}`;
              if (rest.length > 0) {
                str[index] += `,${rest.map((v) => flattenValue(v)).join(",")}`;
              }
              str[index] += "]";
              break;
            }
          }
        }
        if (!pluginHandled) {
          let result = isArray ? "[" : "{";
          if (isArray) {
            for (let i2 = 0; i2 < input.length; i2++)
              result += (i2 ? "," : "") + (i2 in input ? flattenValue(input[i2]) : HOLE);
            str[index] = `${result}]`;
          } else if (input instanceof Date) {
            const dateTime = input.getTime();
            str[index] = `["${TYPE_DATE}",${Number.isNaN(dateTime) ? JSON.stringify("invalid") : dateTime}]`;
          } else if (input instanceof URL) {
            str[index] = `["${TYPE_URL}",${JSON.stringify(input.href)}]`;
          } else if (input instanceof RegExp) {
            str[index] = `["${TYPE_REGEXP}",${JSON.stringify(
              input.source
            )},${JSON.stringify(input.flags)}]`;
          } else if (input instanceof Set) {
            if (input.size > 0) {
              str[index] = `["${TYPE_SET}",${[...input].map((val) => flattenValue(val)).join(",")}]`;
            } else {
              str[index] = `["${TYPE_SET}"]`;
            }
          } else if (input instanceof Map) {
            if (input.size > 0) {
              str[index] = `["${TYPE_MAP}",${[...input].flatMap(([k, v]) => [flattenValue(k), flattenValue(v)]).join(",")}]`;
            } else {
              str[index] = `["${TYPE_MAP}"]`;
            }
          } else if (input instanceof Promise) {
            str[index] = `["${TYPE_PROMISE}",${index}]`;
            deferred[index] = input;
          } else if (input instanceof Error) {
            str[index] = `["${TYPE_ERROR}",${JSON.stringify(input.message)}`;
            if (input.name !== "Error") {
              str[index] += `,${JSON.stringify(input.name)}`;
            }
            str[index] += "]";
          } else if (Object.getPrototypeOf(input) === null) {
            str[index] = `["${TYPE_NULL_OBJECT}",{${partsForObj(input)}}]`;
          } else if (isPlainObject2(input)) {
            str[index] = `{${partsForObj(input)}}`;
          } else {
            error = new Error("Cannot encode object with prototype");
          }
        }
        break;
      }
      default: {
        const isArray = Array.isArray(input);
        let pluginHandled = false;
        if (!isArray && plugins) {
          for (const plugin of plugins) {
            const pluginResult = plugin(input);
            if (Array.isArray(pluginResult)) {
              pluginHandled = true;
              const [pluginIdentifier, ...rest] = pluginResult;
              str[index] = `[${JSON.stringify(pluginIdentifier)}`;
              if (rest.length > 0) {
                str[index] += `,${rest.map((v) => flattenValue(v)).join(",")}`;
              }
              str[index] += "]";
              break;
            }
          }
        }
        if (!pluginHandled) {
          error = new Error("Cannot encode function or unexpected type");
        }
      }
    }
    if (error) {
      let pluginHandled = false;
      if (postPlugins) {
        for (const plugin of postPlugins) {
          const pluginResult = plugin(input);
          if (Array.isArray(pluginResult)) {
            pluginHandled = true;
            const [pluginIdentifier, ...rest] = pluginResult;
            str[index] = `[${JSON.stringify(pluginIdentifier)}`;
            if (rest.length > 0) {
              str[index] += `,${rest.map((v) => flattenValue(v)).join(",")}`;
            }
            str[index] += "]";
            break;
          }
        }
      }
      if (!pluginHandled) {
        throw error;
      }
    }
  }
}
var objectProtoNames2 = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function isPlainObject2(thing) {
  const proto = Object.getPrototypeOf(thing);
  return proto === Object.prototype || proto === null || Object.getOwnPropertyNames(proto).sort().join("\0") === objectProtoNames2;
}

// vendor/turbo-stream-v2/unflatten.ts
var globalObj = typeof window !== "undefined" ? window : typeof globalThis !== "undefined" ? globalThis : void 0;
function unflatten(parsed) {
  const { hydrated, values } = this;
  if (typeof parsed === "number") return hydrate.call(this, parsed);
  if (!Array.isArray(parsed) || !parsed.length) throw new SyntaxError();
  const startIndex = values.length;
  for (const value of parsed) {
    values.push(value);
  }
  hydrated.length = values.length;
  return hydrate.call(this, startIndex);
}
function hydrate(index) {
  const { hydrated, values, deferred, plugins } = this;
  let result;
  const stack = [
    [
      index,
      (v) => {
        result = v;
      }
    ]
  ];
  let postRun = [];
  while (stack.length > 0) {
    const [index2, set] = stack.pop();
    switch (index2) {
      case UNDEFINED:
        set(void 0);
        continue;
      case NULL:
        set(null);
        continue;
      case NAN:
        set(NaN);
        continue;
      case POSITIVE_INFINITY:
        set(Infinity);
        continue;
      case NEGATIVE_INFINITY:
        set(-Infinity);
        continue;
      case NEGATIVE_ZERO:
        set(-0);
        continue;
    }
    if (hydrated[index2]) {
      set(hydrated[index2]);
      continue;
    }
    const value = values[index2];
    if (!value || typeof value !== "object") {
      hydrated[index2] = value;
      set(value);
      continue;
    }
    if (Array.isArray(value)) {
      if (typeof value[0] === "string") {
        const [type, b, c] = value;
        switch (type) {
          case TYPE_DATE:
            set(hydrated[index2] = new Date(b));
            continue;
          case TYPE_URL:
            set(hydrated[index2] = new URL(b));
            continue;
          case TYPE_BIGINT:
            set(hydrated[index2] = BigInt(b));
            continue;
          case TYPE_REGEXP:
            set(hydrated[index2] = new RegExp(b, c));
            continue;
          case TYPE_SYMBOL:
            set(hydrated[index2] = Symbol.for(b));
            continue;
          case TYPE_SET:
            const newSet = /* @__PURE__ */ new Set();
            hydrated[index2] = newSet;
            for (let i = value.length - 1; i > 0; i--)
              stack.push([
                value[i],
                (v) => {
                  newSet.add(v);
                }
              ]);
            set(newSet);
            continue;
          case TYPE_MAP:
            const map = /* @__PURE__ */ new Map();
            hydrated[index2] = map;
            for (let i = value.length - 2; i > 0; i -= 2) {
              const r = [];
              stack.push([
                value[i + 1],
                (v) => {
                  r[1] = v;
                }
              ]);
              stack.push([
                value[i],
                (k) => {
                  r[0] = k;
                }
              ]);
              postRun.push(() => {
                map.set(r[0], r[1]);
              });
            }
            set(map);
            continue;
          case TYPE_NULL_OBJECT:
            const obj = /* @__PURE__ */ Object.create(null);
            hydrated[index2] = obj;
            for (const key of Object.keys(b).reverse()) {
              const r = [];
              stack.push([
                b[key],
                (v) => {
                  r[1] = v;
                }
              ]);
              stack.push([
                Number(key.slice(1)),
                (k) => {
                  r[0] = k;
                }
              ]);
              postRun.push(() => {
                obj[r[0]] = r[1];
              });
            }
            set(obj);
            continue;
          case TYPE_PROMISE:
            if (hydrated[b]) {
              set(hydrated[index2] = hydrated[b]);
            } else {
              const d = new Deferred2();
              deferred[b] = d;
              set(hydrated[index2] = d.promise);
            }
            continue;
          case TYPE_ERROR:
            const [, message, errorType] = value;
            let error = errorType && globalObj && SUPPORTED_ERROR_TYPES.includes(errorType) && errorType in globalObj && typeof globalObj[errorType] === "function" ? new globalObj[errorType](message) : new Error(message);
            hydrated[index2] = error;
            set(error);
            continue;
          case TYPE_PREVIOUS_RESOLVED:
            set(hydrated[index2] = hydrated[b]);
            continue;
          default:
            if (Array.isArray(plugins)) {
              const r = [];
              const vals = value.slice(1);
              for (let i = 0; i < vals.length; i++) {
                const v = vals[i];
                stack.push([
                  v,
                  (v2) => {
                    r[i] = v2;
                  }
                ]);
              }
              postRun.push(() => {
                for (const plugin of plugins) {
                  const result2 = plugin(value[0], ...r);
                  if (result2) {
                    set(hydrated[index2] = result2.value);
                    return;
                  }
                }
                throw new SyntaxError();
              });
              continue;
            }
            throw new SyntaxError();
        }
      } else {
        const array = [];
        hydrated[index2] = array;
        for (let i = 0; i < value.length; i++) {
          const n = value[i];
          if (n !== HOLE) {
            stack.push([
              n,
              (v) => {
                array[i] = v;
              }
            ]);
          }
        }
        set(array);
        continue;
      }
    } else {
      const object = {};
      hydrated[index2] = object;
      for (const key of Object.keys(value).reverse()) {
        const r = [];
        stack.push([
          value[key],
          (v) => {
            r[1] = v;
          }
        ]);
        stack.push([
          Number(key.slice(1)),
          (k) => {
            r[0] = k;
          }
        ]);
        postRun.push(() => {
          object[r[0]] = r[1];
        });
      }
      set(object);
      continue;
    }
  }
  while (postRun.length > 0) {
    postRun.pop()();
  }
  return result;
}

// vendor/turbo-stream-v2/turbo-stream.ts
async function decode(readable, options) {
  const { plugins } = options ?? {};
  const done = new Deferred2();
  const reader = readable.pipeThrough(createLineSplittingTransform()).getReader();
  const decoder = {
    values: [],
    hydrated: [],
    deferred: {},
    plugins
  };
  const decoded = await decodeInitial.call(decoder, reader);
  let donePromise = done.promise;
  if (decoded.done) {
    done.resolve();
  } else {
    donePromise = decodeDeferred.call(decoder, reader).then(done.resolve).catch((reason) => {
      for (const deferred of Object.values(decoder.deferred)) {
        deferred.reject(reason);
      }
      done.reject(reason);
    });
  }
  return {
    done: donePromise.then(() => reader.closed),
    value: decoded.value
  };
}
async function decodeInitial(reader) {
  const read = await reader.read();
  if (!read.value) {
    throw new SyntaxError();
  }
  let line;
  try {
    line = JSON.parse(read.value);
  } catch (reason) {
    throw new SyntaxError();
  }
  return {
    done: read.done,
    value: unflatten.call(this, line)
  };
}
async function decodeDeferred(reader) {
  let read = await reader.read();
  while (!read.done) {
    if (!read.value) continue;
    const line = read.value;
    switch (line[0]) {
      case TYPE_PROMISE: {
        const colonIndex = line.indexOf(":");
        const deferredId = Number(line.slice(1, colonIndex));
        const deferred = this.deferred[deferredId];
        if (!deferred) {
          throw new Error(`Deferred ID ${deferredId} not found in stream`);
        }
        const lineData = line.slice(colonIndex + 1);
        let jsonLine;
        try {
          jsonLine = JSON.parse(lineData);
        } catch (reason) {
          throw new SyntaxError();
        }
        const value = unflatten.call(this, jsonLine);
        deferred.resolve(value);
        break;
      }
      case TYPE_ERROR: {
        const colonIndex = line.indexOf(":");
        const deferredId = Number(line.slice(1, colonIndex));
        const deferred = this.deferred[deferredId];
        if (!deferred) {
          throw new Error(`Deferred ID ${deferredId} not found in stream`);
        }
        const lineData = line.slice(colonIndex + 1);
        let jsonLine;
        try {
          jsonLine = JSON.parse(lineData);
        } catch (reason) {
          throw new SyntaxError();
        }
        const value = unflatten.call(this, jsonLine);
        deferred.reject(value);
        break;
      }
      default:
        throw new SyntaxError();
    }
    read = await reader.read();
  }
}
function encode(input, options) {
  const { onComplete, plugins, postPlugins, signal } = options ?? {};
  const encoder = {
    deferred: {},
    index: 0,
    indices: /* @__PURE__ */ new Map(),
    stringified: [],
    plugins,
    postPlugins,
    signal
  };
  const textEncoder = new TextEncoder();
  let lastSentIndex = 0;
  const readable = new ReadableStream({
    async start(controller) {
      const id = await flatten.call(encoder, input);
      if (Array.isArray(id)) {
        throw new Error("This should never happen");
      }
      if (id < 0) {
        controller.enqueue(textEncoder.encode(`${id}
`));
      } else {
        controller.enqueue(
          textEncoder.encode(`[${encoder.stringified.join(",")}]
`)
        );
        lastSentIndex = encoder.stringified.length - 1;
      }
      const seenPromises = /* @__PURE__ */ new WeakSet();
      let processingChain = Promise.resolve();
      if (Object.keys(encoder.deferred).length) {
        let raceDone;
        const racePromise = new Promise((resolve, reject) => {
          raceDone = resolve;
          if (signal) {
            const rejectPromise = () => reject(signal.reason || new Error("Signal was aborted."));
            if (signal.aborted) {
              rejectPromise();
            } else {
              signal.addEventListener("abort", (event) => {
                rejectPromise();
              });
            }
          }
        });
        while (Object.keys(encoder.deferred).length > 0) {
          for (const [deferredId, deferred] of Object.entries(
            encoder.deferred
          )) {
            if (seenPromises.has(deferred)) continue;
            seenPromises.add(
              // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
              encoder.deferred[Number(deferredId)] = Promise.race([
                racePromise,
                deferred
              ]).then(
                (resolved) => {
                  processingChain = processingChain.then(async () => {
                    const id2 = await flatten.call(encoder, resolved);
                    if (Array.isArray(id2)) {
                      controller.enqueue(
                        textEncoder.encode(
                          `${TYPE_PROMISE}${deferredId}:[["${TYPE_PREVIOUS_RESOLVED}",${id2[0]}]]
`
                        )
                      );
                      encoder.index++;
                      lastSentIndex++;
                    } else if (id2 < 0) {
                      controller.enqueue(
                        textEncoder.encode(
                          `${TYPE_PROMISE}${deferredId}:${id2}
`
                        )
                      );
                    } else {
                      const values = encoder.stringified.slice(lastSentIndex + 1).join(",");
                      controller.enqueue(
                        textEncoder.encode(
                          `${TYPE_PROMISE}${deferredId}:[${values}]
`
                        )
                      );
                      lastSentIndex = encoder.stringified.length - 1;
                    }
                  });
                  return processingChain;
                },
                (reason) => {
                  processingChain = processingChain.then(async () => {
                    if (!reason || typeof reason !== "object" || !(reason instanceof Error)) {
                      reason = new Error("An unknown error occurred");
                    }
                    const id2 = await flatten.call(encoder, reason);
                    if (Array.isArray(id2)) {
                      controller.enqueue(
                        textEncoder.encode(
                          `${TYPE_ERROR}${deferredId}:[["${TYPE_PREVIOUS_RESOLVED}",${id2[0]}]]
`
                        )
                      );
                      encoder.index++;
                      lastSentIndex++;
                    } else if (id2 < 0) {
                      controller.enqueue(
                        textEncoder.encode(
                          `${TYPE_ERROR}${deferredId}:${id2}
`
                        )
                      );
                    } else {
                      const values = encoder.stringified.slice(lastSentIndex + 1).join(",");
                      controller.enqueue(
                        textEncoder.encode(
                          `${TYPE_ERROR}${deferredId}:[${values}]
`
                        )
                      );
                      lastSentIndex = encoder.stringified.length - 1;
                    }
                  });
                  return processingChain;
                }
              ).finally(() => {
                delete encoder.deferred[Number(deferredId)];
              })
            );
          }
          await Promise.race(Object.values(encoder.deferred));
        }
        raceDone();
      }
      await Promise.all(Object.values(encoder.deferred));
      await processingChain;
      controller.close();
      onComplete?.();
    }
  });
  return readable;
}

// lib/dom/ssr/data.ts
async function createRequestInit(request) {
  let init = { signal: request.signal };
  if (request.method !== "GET") {
    init.method = request.method;
    let contentType = request.headers.get("Content-Type");
    if (contentType && /\bapplication\/json\b/.test(contentType)) {
      init.headers = { "Content-Type": contentType };
      init.body = JSON.stringify(await request.json());
    } else if (contentType && /\btext\/plain\b/.test(contentType)) {
      init.headers = { "Content-Type": contentType };
      init.body = await request.text();
    } else if (contentType && /\bapplication\/x-www-form-urlencoded\b/.test(contentType)) {
      init.body = new URLSearchParams(await request.text());
    } else {
      init.body = await request.formData();
    }
  }
  return init;
}

// lib/dom/ssr/markup.ts
var ESCAPE_LOOKUP = {
  "&": "\\u0026",
  ">": "\\u003e",
  "<": "\\u003c",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
var ESCAPE_REGEX = /[&><\u2028\u2029]/g;
function escapeHtml(html) {
  return html.replace(ESCAPE_REGEX, (match) => ESCAPE_LOOKUP[match]);
}

// lib/dom/ssr/invariant.ts
function invariant2(value, message) {
  if (value === false || value === null || typeof value === "undefined") {
    throw new Error(message);
  }
}

// lib/dom/ssr/single-fetch.tsx
var SingleFetchRedirectSymbol = Symbol("SingleFetchRedirect");
var SingleFetchNoResultError = class extends Error {
};
var SINGLE_FETCH_REDIRECT_STATUS = 202;
var NO_BODY_STATUS_CODES = /* @__PURE__ */ new Set([100, 101, 204, 205]);
function StreamTransfer({
  context,
  identifier,
  reader,
  textDecoder,
  nonce
}) {
  if (!context.renderMeta || !context.renderMeta.didRenderScripts) {
    return null;
  }
  if (!context.renderMeta.streamCache) {
    context.renderMeta.streamCache = {};
  }
  let { streamCache } = context.renderMeta;
  let promise = streamCache[identifier];
  if (!promise) {
    promise = streamCache[identifier] = reader.read().then((result) => {
      streamCache[identifier].result = {
        done: result.done,
        value: textDecoder.decode(result.value, { stream: true })
      };
    }).catch((e) => {
      streamCache[identifier].error = e;
    });
  }
  if (promise.error) {
    throw promise.error;
  }
  if (promise.result === void 0) {
    throw promise;
  }
  let { done, value } = promise.result;
  let scriptTag = value ? /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
    "script",
    {
      nonce,
      dangerouslySetInnerHTML: {
        __html: `window.__reactRouterContext.streamController.enqueue(${escapeHtml(
          JSON.stringify(value)
        )});`
      }
    }
  ) : null;
  if (done) {
    return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, scriptTag, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
      "script",
      {
        nonce,
        dangerouslySetInnerHTML: {
          __html: `window.__reactRouterContext.streamController.close();`
        }
      }
    ));
  } else {
    return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, scriptTag, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Suspense, null, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
      StreamTransfer,
      {
        context,
        identifier: identifier + 1,
        reader,
        textDecoder,
        nonce
      }
    )));
  }
}
function getTurboStreamSingleFetchDataStrategy(getRouter, manifest, routeModules, ssr, basename, trailingSlashAware) {
  let dataStrategy = getSingleFetchDataStrategyImpl(
    getRouter,
    (match) => {
      let manifestRoute = manifest.routes[match.route.id];
      invariant2(manifestRoute, "Route not found in manifest");
      return {
        hasLoader: manifestRoute.hasLoader,
        hasClientLoader: manifestRoute.hasClientLoader
      };
    },
    fetchAndDecodeViaTurboStream,
    ssr,
    basename,
    trailingSlashAware
  );
  return async (args) => args.runClientMiddleware(dataStrategy);
}
function getSingleFetchDataStrategyImpl(getRouter, getRouteInfo, fetchAndDecode, ssr, basename, trailingSlashAware, shouldAllowOptOut = () => true) {
  return async (args) => {
    let { request, matches, fetcherKey } = args;
    let router = getRouter();
    if (request.method !== "GET") {
      return singleFetchActionStrategy(
        args,
        fetchAndDecode,
        basename,
        trailingSlashAware
      );
    }
    let foundRevalidatingServerLoader = matches.some((m) => {
      let { hasLoader, hasClientLoader } = getRouteInfo(m);
      return m.shouldCallHandler() && hasLoader && !hasClientLoader;
    });
    if (!ssr && !foundRevalidatingServerLoader) {
      return nonSsrStrategy(
        args,
        getRouteInfo,
        fetchAndDecode,
        basename,
        trailingSlashAware
      );
    }
    if (fetcherKey) {
      return singleFetchLoaderFetcherStrategy(
        args,
        fetchAndDecode,
        basename,
        trailingSlashAware
      );
    }
    return singleFetchLoaderNavigationStrategy(
      args,
      router,
      getRouteInfo,
      fetchAndDecode,
      ssr,
      basename,
      trailingSlashAware,
      shouldAllowOptOut
    );
  };
}
async function singleFetchActionStrategy(args, fetchAndDecode, basename, trailingSlashAware) {
  let actionMatch = args.matches.find((m) => m.shouldCallHandler());
  invariant2(actionMatch, "No action match found");
  let actionStatus = void 0;
  let result = await actionMatch.resolve(async (handler) => {
    let result2 = await handler(async () => {
      let { data: data2, status } = await fetchAndDecode(
        args,
        basename,
        trailingSlashAware,
        [actionMatch.route.id]
      );
      actionStatus = status;
      return unwrapSingleFetchResult(data2, actionMatch.route.id);
    });
    return result2;
  });
  if (isResponse(result.result) || isRouteErrorResponse(result.result) || isDataWithResponseInit(result.result)) {
    return { [actionMatch.route.id]: result };
  }
  return {
    [actionMatch.route.id]: {
      type: result.type,
      result: data(result.result, actionStatus)
    }
  };
}
async function nonSsrStrategy(args, getRouteInfo, fetchAndDecode, basename, trailingSlashAware) {
  let matchesToLoad = args.matches.filter((m) => m.shouldCallHandler());
  let results = {};
  await Promise.all(
    matchesToLoad.map(
      (m) => m.resolve(async (handler) => {
        try {
          let { hasClientLoader } = getRouteInfo(m);
          let routeId = m.route.id;
          let result = hasClientLoader ? await handler(async () => {
            let { data: data2 } = await fetchAndDecode(
              args,
              basename,
              trailingSlashAware,
              [routeId]
            );
            return unwrapSingleFetchResult(data2, routeId);
          }) : await handler();
          results[m.route.id] = { type: "data", result };
        } catch (e) {
          results[m.route.id] = { type: "error", result: e };
        }
      })
    )
  );
  return results;
}
async function singleFetchLoaderNavigationStrategy(args, router, getRouteInfo, fetchAndDecode, ssr, basename, trailingSlashAware, shouldAllowOptOut = () => true) {
  let routesParams = /* @__PURE__ */ new Set();
  let foundOptOutRoute = false;
  let routeDfds = args.matches.map(() => createDeferred2());
  let singleFetchDfd = createDeferred2();
  let results = {};
  let resolvePromise = Promise.all(
    args.matches.map(
      async (m, i) => m.resolve(async (handler) => {
        routeDfds[i].resolve();
        let routeId = m.route.id;
        let { hasLoader, hasClientLoader } = getRouteInfo(m);
        let defaultShouldRevalidate = !m.shouldRevalidateArgs || m.shouldRevalidateArgs.actionStatus == null || m.shouldRevalidateArgs.actionStatus < 400;
        let shouldCall = m.shouldCallHandler(defaultShouldRevalidate);
        if (!shouldCall) {
          foundOptOutRoute || (foundOptOutRoute = m.shouldRevalidateArgs != null && // This is a revalidation,
          hasLoader);
          return;
        }
        if (shouldAllowOptOut(m) && hasClientLoader) {
          if (hasLoader) {
            foundOptOutRoute = true;
          }
          try {
            let result = await handler(async () => {
              let { data: data2 } = await fetchAndDecode(
                args,
                basename,
                trailingSlashAware,
                [routeId]
              );
              return unwrapSingleFetchResult(data2, routeId);
            });
            results[routeId] = { type: "data", result };
          } catch (e) {
            results[routeId] = { type: "error", result: e };
          }
          return;
        }
        if (hasLoader) {
          routesParams.add(routeId);
        }
        try {
          let result = await handler(async () => {
            let data2 = await singleFetchDfd.promise;
            return unwrapSingleFetchResult(data2, routeId);
          });
          results[routeId] = { type: "data", result };
        } catch (e) {
          results[routeId] = { type: "error", result: e };
        }
      })
    )
  );
  await Promise.all(routeDfds.map((d) => d.promise));
  let isInitialLoad = !router.state.initialized && router.state.navigation.state === "idle";
  if ((isInitialLoad || routesParams.size === 0) && !window.__reactRouterHdrActive) {
    singleFetchDfd.resolve({ routes: {} });
  } else {
    let targetRoutes = ssr && foundOptOutRoute && routesParams.size > 0 ? [...routesParams.keys()] : void 0;
    try {
      let data2 = await fetchAndDecode(
        args,
        basename,
        trailingSlashAware,
        targetRoutes
      );
      singleFetchDfd.resolve(data2.data);
    } catch (e) {
      singleFetchDfd.reject(e);
    }
  }
  await resolvePromise;
  await bubbleMiddlewareErrors(
    singleFetchDfd.promise,
    args.matches,
    routesParams,
    results
  );
  return results;
}
async function bubbleMiddlewareErrors(singleFetchPromise, matches, routesParams, results) {
  try {
    let middlewareError;
    let fetchedData = await singleFetchPromise;
    if ("routes" in fetchedData) {
      for (let match of matches) {
        if (match.route.id in fetchedData.routes) {
          let routeResult = fetchedData.routes[match.route.id];
          if ("error" in routeResult) {
            middlewareError = routeResult.error;
            if (results[match.route.id]?.result == null) {
              results[match.route.id] = {
                type: "error",
                result: middlewareError
              };
            }
            break;
          }
        }
      }
    }
    if (middlewareError !== void 0) {
      Array.from(routesParams.values()).forEach((routeId) => {
        if (results[routeId].result instanceof SingleFetchNoResultError) {
          results[routeId].result = middlewareError;
        }
      });
    }
  } catch (e) {
  }
}
async function singleFetchLoaderFetcherStrategy(args, fetchAndDecode, basename, trailingSlashAware) {
  let fetcherMatch = args.matches.find((m) => m.shouldCallHandler());
  invariant2(fetcherMatch, "No fetcher match found");
  let routeId = fetcherMatch.route.id;
  let result = await fetcherMatch.resolve(
    async (handler) => handler(async () => {
      let { data: data2 } = await fetchAndDecode(args, basename, trailingSlashAware, [
        routeId
      ]);
      return unwrapSingleFetchResult(data2, routeId);
    })
  );
  return { [fetcherMatch.route.id]: result };
}
function stripIndexParam(url) {
  let indexValues = url.searchParams.getAll("index");
  url.searchParams.delete("index");
  let indexValuesToKeep = [];
  for (let indexValue of indexValues) {
    if (indexValue) {
      indexValuesToKeep.push(indexValue);
    }
  }
  for (let toKeep of indexValuesToKeep) {
    url.searchParams.append("index", toKeep);
  }
  return url;
}
function singleFetchUrl(reqUrl, basename, trailingSlashAware, extension) {
  let url = typeof reqUrl === "string" ? new URL(
    reqUrl,
    // This can be called during the SSR flow via PrefetchPageLinksImpl so
    // don't assume window is available
    typeof window === "undefined" ? "server://singlefetch/" : window.location.origin
  ) : reqUrl;
  if (trailingSlashAware) {
    if (url.pathname.endsWith("/")) {
      url.pathname = `${url.pathname}_.${extension}`;
    } else {
      url.pathname = `${url.pathname}.${extension}`;
    }
  } else {
    if (url.pathname === "/") {
      url.pathname = `_root.${extension}`;
    } else if (basename && stripBasename(url.pathname, basename) === "/") {
      url.pathname = `${removeTrailingSlash(basename)}/_root.${extension}`;
    } else {
      url.pathname = `${removeTrailingSlash(url.pathname)}.${extension}`;
    }
  }
  return url;
}
async function fetchAndDecodeViaTurboStream(args, basename, trailingSlashAware, targetRoutes) {
  let { request } = args;
  let url = singleFetchUrl(request.url, basename, trailingSlashAware, "data");
  if (request.method === "GET") {
    url = stripIndexParam(url);
    if (targetRoutes) {
      url.searchParams.set("_routes", targetRoutes.join(","));
    }
  }
  let res = await fetch(url, await createRequestInit(request));
  if (res.status >= 400 && !res.headers.has("X-Remix-Response")) {
    throw new ErrorResponseImpl(res.status, res.statusText, await res.text());
  }
  if (res.status === 204 && res.headers.has("X-Remix-Redirect")) {
    return {
      status: SINGLE_FETCH_REDIRECT_STATUS,
      data: {
        redirect: {
          redirect: res.headers.get("X-Remix-Redirect"),
          status: Number(res.headers.get("X-Remix-Status") || "302"),
          revalidate: res.headers.get("X-Remix-Revalidate") === "true",
          reload: res.headers.get("X-Remix-Reload-Document") === "true",
          replace: res.headers.get("X-Remix-Replace") === "true"
        }
      }
    };
  }
  if (NO_BODY_STATUS_CODES.has(res.status)) {
    let routes = {};
    if (targetRoutes && request.method !== "GET") {
      routes[targetRoutes[0]] = { data: void 0 };
    }
    return {
      status: res.status,
      data: { routes }
    };
  }
  invariant2(res.body, "No response body to decode");
  try {
    let decoded = await decodeViaTurboStream(res.body, window);
    let data2;
    if (request.method === "GET") {
      let typed = decoded.value;
      if (SingleFetchRedirectSymbol in typed) {
        data2 = { redirect: typed[SingleFetchRedirectSymbol] };
      } else {
        data2 = { routes: typed };
      }
    } else {
      let typed = decoded.value;
      let routeId = targetRoutes?.[0];
      invariant2(routeId, "No routeId found for single fetch call decoding");
      if ("redirect" in typed) {
        data2 = { redirect: typed };
      } else {
        data2 = { routes: { [routeId]: typed } };
      }
    }
    return { status: res.status, data: data2 };
  } catch (e) {
    throw new Error("Unable to decode turbo-stream response");
  }
}
function decodeViaTurboStream(body, global) {
  return decode(body, {
    plugins: [
      (type, ...rest) => {
        if (type === "SanitizedError") {
          let [name, message, stack] = rest;
          let Constructor = Error;
          if (name && SUPPORTED_ERROR_TYPES.includes(name) && name in global && // @ts-expect-error
          typeof global[name] === "function") {
            Constructor = global[name];
          }
          let error = new Constructor(message);
          error.stack = stack;
          return { value: error };
        }
        if (type === "ErrorResponse") {
          let [data2, status, statusText] = rest;
          return {
            value: new ErrorResponseImpl(status, statusText, data2)
          };
        }
        if (type === "SingleFetchRedirect") {
          return { value: { [SingleFetchRedirectSymbol]: rest[0] } };
        }
        if (type === "SingleFetchClassInstance") {
          return { value: rest[0] };
        }
        if (type === "SingleFetchFallback") {
          return { value: void 0 };
        }
      }
    ]
  });
}
function unwrapSingleFetchResult(result, routeId) {
  if ("redirect" in result) {
    let {
      redirect: location,
      revalidate,
      reload,
      replace: replace2,
      status
    } = result.redirect;
    throw redirect(location, {
      status,
      headers: {
        // Three R's of redirecting (lol Veep)
        ...revalidate ? { "X-Remix-Revalidate": "yes" } : null,
        ...reload ? { "X-Remix-Reload-Document": "yes" } : null,
        ...replace2 ? { "X-Remix-Replace": "yes" } : null
      }
    });
  }
  let routeResult = result.routes[routeId];
  if (routeResult == null) {
    throw new SingleFetchNoResultError(
      `No result found for routeId "${routeId}"`
    );
  } else if ("error" in routeResult) {
    throw routeResult.error;
  } else if ("data" in routeResult) {
    return routeResult.data;
  } else {
    throw new Error(`Invalid response found for routeId "${routeId}"`);
  }
}
function createDeferred2() {
  let resolve;
  let reject;
  let promise = new Promise((res, rej) => {
    resolve = async (val) => {
      res(val);
      try {
        await promise;
      } catch (e) {
      }
    };
    reject = async (error) => {
      rej(error);
      try {
        await promise;
      } catch (e) {
      }
    };
  });
  return {
    promise,
    //@ts-ignore
    resolve,
    //@ts-ignore
    reject
  };
}

// lib/dom/ssr/errorBoundaries.tsx
;

// lib/dom/ssr/components.tsx


// lib/dom/ssr/routeModules.ts
async function loadRouteModule(route, routeModulesCache) {
  if (route.id in routeModulesCache) {
    return routeModulesCache[route.id];
  }
  try {
    let routeModule = await import(
      /* @vite-ignore */
      /* webpackIgnore: true */
      route.module
    );
    routeModulesCache[route.id] = routeModule;
    return routeModule;
  } catch (error) {
    console.error(
      `Error loading route module \`${route.module}\`, reloading page...`
    );
    console.error(error);
    if (window.__reactRouterContext && window.__reactRouterContext.isSpaMode && // @ts-expect-error
    /* unsupported import.meta.hot */ undefined) // removed by dead control flow
{}
    window.location.reload();
    return new Promise(() => {
    });
  }
}

// lib/dom/ssr/links.ts
function getKeyedLinksForMatches(matches, routeModules, manifest) {
  let descriptors = matches.map((match) => {
    let module = routeModules[match.route.id];
    let route = manifest.routes[match.route.id];
    return [
      route && route.css ? route.css.map((href) => ({ rel: "stylesheet", href })) : [],
      module?.links?.() || []
    ];
  }).flat(2);
  let preloads = getModuleLinkHrefs(matches, manifest);
  return dedupeLinkDescriptors(descriptors, preloads);
}
function getRouteCssDescriptors(route) {
  if (!route.css) return [];
  return route.css.map((href) => ({ rel: "stylesheet", href }));
}
async function prefetchRouteCss(route) {
  if (!route.css) return;
  let descriptors = getRouteCssDescriptors(route);
  await Promise.all(descriptors.map(prefetchStyleLink));
}
async function prefetchStyleLinks(route, routeModule) {
  if (!route.css && !routeModule.links || !isPreloadSupported()) return;
  let descriptors = [];
  if (route.css) {
    descriptors.push(...getRouteCssDescriptors(route));
  }
  if (routeModule.links) {
    descriptors.push(...routeModule.links());
  }
  if (descriptors.length === 0) return;
  let styleLinks = [];
  for (let descriptor of descriptors) {
    if (!isPageLinkDescriptor(descriptor) && descriptor.rel === "stylesheet") {
      styleLinks.push({
        ...descriptor,
        rel: "preload",
        as: "style"
      });
    }
  }
  await Promise.all(styleLinks.map(prefetchStyleLink));
}
async function prefetchStyleLink(descriptor) {
  return new Promise((resolve) => {
    if (descriptor.media && !window.matchMedia(descriptor.media).matches || document.querySelector(
      `link[rel="stylesheet"][href="${descriptor.href}"]`
    )) {
      return resolve();
    }
    let link = document.createElement("link");
    Object.assign(link, descriptor);
    function removeLink() {
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
    }
    link.onload = () => {
      removeLink();
      resolve();
    };
    link.onerror = () => {
      removeLink();
      resolve();
    };
    document.head.appendChild(link);
  });
}
function isPageLinkDescriptor(object) {
  return object != null && typeof object.page === "string";
}
function isHtmlLinkDescriptor(object) {
  if (object == null) {
    return false;
  }
  if (object.href == null) {
    return object.rel === "preload" && typeof object.imageSrcSet === "string" && typeof object.imageSizes === "string";
  }
  return typeof object.rel === "string" && typeof object.href === "string";
}
async function getKeyedPrefetchLinks(matches, manifest, routeModules) {
  let links = await Promise.all(
    matches.map(async (match) => {
      let route = manifest.routes[match.route.id];
      if (route) {
        let mod = await loadRouteModule(route, routeModules);
        return mod.links ? mod.links() : [];
      }
      return [];
    })
  );
  return dedupeLinkDescriptors(
    links.flat(1).filter(isHtmlLinkDescriptor).filter((link) => link.rel === "stylesheet" || link.rel === "preload").map(
      (link) => link.rel === "stylesheet" ? { ...link, rel: "prefetch", as: "style" } : { ...link, rel: "prefetch" }
    )
  );
}
function getNewMatchesForLinks(page, nextMatches, currentMatches, manifest, location, mode) {
  let isNew = (match, index) => {
    if (!currentMatches[index]) return true;
    return match.route.id !== currentMatches[index].route.id;
  };
  let matchPathChanged = (match, index) => {
    return (
      // param change, /users/123 -> /users/456
      currentMatches[index].pathname !== match.pathname || // splat param changed, which is not present in match.path
      // e.g. /files/images/avatar.jpg -> files/finances.xls
      currentMatches[index].route.path?.endsWith("*") && currentMatches[index].params["*"] !== match.params["*"]
    );
  };
  if (mode === "assets") {
    return nextMatches.filter(
      (match, index) => isNew(match, index) || matchPathChanged(match, index)
    );
  }
  if (mode === "data") {
    return nextMatches.filter((match, index) => {
      let manifestRoute = manifest.routes[match.route.id];
      if (!manifestRoute || !manifestRoute.hasLoader) {
        return false;
      }
      if (isNew(match, index) || matchPathChanged(match, index)) {
        return true;
      }
      if (match.route.shouldRevalidate) {
        let routeChoice = match.route.shouldRevalidate({
          currentUrl: new URL(
            location.pathname + location.search + location.hash,
            window.origin
          ),
          currentParams: currentMatches[0]?.params || {},
          nextUrl: new URL(page, window.origin),
          nextParams: match.params,
          defaultShouldRevalidate: true
        });
        if (typeof routeChoice === "boolean") {
          return routeChoice;
        }
      }
      return true;
    });
  }
  return [];
}
function getModuleLinkHrefs(matches, manifest, { includeHydrateFallback } = {}) {
  return dedupeHrefs(
    matches.map((match) => {
      let route = manifest.routes[match.route.id];
      if (!route) return [];
      let hrefs = [route.module];
      if (route.clientActionModule) {
        hrefs = hrefs.concat(route.clientActionModule);
      }
      if (route.clientLoaderModule) {
        hrefs = hrefs.concat(route.clientLoaderModule);
      }
      if (includeHydrateFallback && route.hydrateFallbackModule) {
        hrefs = hrefs.concat(route.hydrateFallbackModule);
      }
      if (route.imports) {
        hrefs = hrefs.concat(route.imports);
      }
      return hrefs;
    }).flat(1)
  );
}
function dedupeHrefs(hrefs) {
  return [...new Set(hrefs)];
}
function sortKeys(obj) {
  let sorted = {};
  let keys = Object.keys(obj).sort();
  for (let key of keys) {
    sorted[key] = obj[key];
  }
  return sorted;
}
function dedupeLinkDescriptors(descriptors, preloads) {
  let set = /* @__PURE__ */ new Set();
  let preloadsSet = new Set(preloads);
  return descriptors.reduce((deduped, descriptor) => {
    let alreadyModulePreload = preloads && !isPageLinkDescriptor(descriptor) && descriptor.as === "script" && descriptor.href && preloadsSet.has(descriptor.href);
    if (alreadyModulePreload) {
      return deduped;
    }
    let key = JSON.stringify(sortKeys(descriptor));
    if (!set.has(key)) {
      set.add(key);
      deduped.push({ key, link: descriptor });
    }
    return deduped;
  }, []);
}
var _isPreloadSupported;
function isPreloadSupported() {
  if (_isPreloadSupported !== void 0) {
    return _isPreloadSupported;
  }
  let el = document.createElement("link");
  _isPreloadSupported = el.relList.supports("preload");
  el = null;
  return _isPreloadSupported;
}

// lib/dom/ssr/fog-of-war.ts
;

// lib/dom/ssr/routes.tsx


// lib/dom/ssr/fallback.tsx

function RemixRootDefaultHydrateFallback() {
  let { nonce } = useFrameworkContext();
  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(BoundaryShell, { title: "Loading...", renderScripts: true }, ENABLE_DEV_WARNINGS ? /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
    "script",
    {
      nonce,
      dangerouslySetInnerHTML: {
        __html: `
              console.log(
                "\u{1F4BF} Hey developer \u{1F44B}. You can provide a way better UX than this " +
                "when your app is loading JS modules and/or running \`clientLoader\` " +
                "functions. Check out https://reactrouter.com/start/framework/route-module#hydratefallback " +
                "for more information."
              );
            `
      }
    }
  ) : null);
}

// lib/dom/ssr/routes.tsx
function groupRoutesByParentId(manifest) {
  let routes = {};
  Object.values(manifest).forEach((route) => {
    if (route) {
      let parentId = route.parentId || "";
      if (!routes[parentId]) {
        routes[parentId] = [];
      }
      routes[parentId].push(route);
    }
  });
  return routes;
}
function getRouteComponents(route, routeModule, isSpaMode) {
  let Component4 = getRouteModuleComponent(routeModule);
  let HydrateFallback = routeModule.HydrateFallback && (!isSpaMode || route.id === "root") ? routeModule.HydrateFallback : route.id === "root" ? RemixRootDefaultHydrateFallback : void 0;
  let ErrorBoundary = routeModule.ErrorBoundary ? routeModule.ErrorBoundary : route.id === "root" ? () => /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(RemixRootDefaultErrorBoundary, { error: useRouteError() }) : void 0;
  if (route.id === "root" && routeModule.Layout) {
    return {
      ...Component4 ? {
        element: /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(routeModule.Layout, null, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(Component4, null))
      } : { Component: Component4 },
      ...ErrorBoundary ? {
        errorElement: /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(routeModule.Layout, null, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(ErrorBoundary, null))
      } : { ErrorBoundary },
      ...HydrateFallback ? {
        hydrateFallbackElement: /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(routeModule.Layout, null, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(HydrateFallback, null))
      } : { HydrateFallback }
    };
  }
  return { Component: Component4, ErrorBoundary, HydrateFallback };
}
function createServerRoutes(manifest, routeModules, future, isSpaMode, parentId = "", routesByParentId = groupRoutesByParentId(manifest), spaModeLazyPromise = Promise.resolve({ Component: () => null })) {
  return (routesByParentId[parentId] || []).map((route) => {
    let routeModule = routeModules[route.id];
    invariant2(
      routeModule,
      "No `routeModule` available to create server routes"
    );
    let dataRoute = {
      ...getRouteComponents(route, routeModule, isSpaMode),
      caseSensitive: route.caseSensitive,
      id: route.id,
      index: route.index,
      path: route.path,
      handle: routeModule.handle,
      // For SPA Mode, all routes are lazy except root.  However we tell the
      // router root is also lazy here too since we don't need a full
      // implementation - we just need a `lazy` prop to tell the RR rendering
      // where to stop which is always at the root route in SPA mode
      lazy: isSpaMode ? () => spaModeLazyPromise : void 0,
      // For partial hydration rendering, we need to indicate when the route
      // has a loader/clientLoader, but it won't ever be called during the static
      // render, so just give it a no-op function so we can render down to the
      // proper fallback
      loader: route.hasLoader || route.hasClientLoader ? () => null : void 0
      // We don't need middleware/action/shouldRevalidate on these routes since
      // they're for a static render
    };
    let children = createServerRoutes(
      manifest,
      routeModules,
      future,
      isSpaMode,
      route.id,
      routesByParentId,
      spaModeLazyPromise
    );
    if (children.length > 0) dataRoute.children = children;
    return dataRoute;
  });
}
function createClientRoutesWithHMRRevalidationOptOut(needsRevalidation, manifest, routeModulesCache, initialState, ssr, isSpaMode) {
  return createClientRoutes(
    manifest,
    routeModulesCache,
    initialState,
    ssr,
    isSpaMode,
    "",
    groupRoutesByParentId(manifest),
    needsRevalidation
  );
}
function preventInvalidServerHandlerCall(type, route) {
  if (type === "loader" && !route.hasLoader || type === "action" && !route.hasAction) {
    let fn = type === "action" ? "serverAction()" : "serverLoader()";
    let msg = `You are trying to call ${fn} on a route that does not have a server ${type} (routeId: "${route.id}")`;
    console.error(msg);
    throw new ErrorResponseImpl(400, "Bad Request", new Error(msg), true);
  }
}
function noActionDefinedError(type, routeId) {
  let article = type === "clientAction" ? "a" : "an";
  let msg = `Route "${routeId}" does not have ${article} ${type}, but you are trying to submit to it. To fix this, please add ${article} \`${type}\` function to the route`;
  console.error(msg);
  throw new ErrorResponseImpl(405, "Method Not Allowed", new Error(msg), true);
}
function createClientRoutes(manifest, routeModulesCache, initialState, ssr, isSpaMode, parentId = "", routesByParentId = groupRoutesByParentId(manifest), needsRevalidation) {
  return (routesByParentId[parentId] || []).map((route) => {
    let routeModule = routeModulesCache[route.id];
    function fetchServerHandler(singleFetch) {
      invariant2(
        typeof singleFetch === "function",
        "No single fetch function available for route handler"
      );
      return singleFetch();
    }
    function fetchServerLoader(singleFetch) {
      if (!route.hasLoader) return Promise.resolve(null);
      return fetchServerHandler(singleFetch);
    }
    function fetchServerAction(singleFetch) {
      if (!route.hasAction) {
        throw noActionDefinedError("action", route.id);
      }
      return fetchServerHandler(singleFetch);
    }
    function prefetchModule(modulePath) {
      import(
        /* @vite-ignore */
        /* webpackIgnore: true */
        modulePath
      );
    }
    function prefetchRouteModuleChunks(route2) {
      if (route2.clientActionModule) {
        prefetchModule(route2.clientActionModule);
      }
      if (route2.clientLoaderModule) {
        prefetchModule(route2.clientLoaderModule);
      }
    }
    async function prefetchStylesAndCallHandler(handler) {
      let cachedModule = routeModulesCache[route.id];
      let linkPrefetchPromise = cachedModule ? prefetchStyleLinks(route, cachedModule) : Promise.resolve();
      try {
        return handler();
      } finally {
        await linkPrefetchPromise;
      }
    }
    let dataRoute = {
      id: route.id,
      index: route.index,
      path: route.path
    };
    if (routeModule) {
      Object.assign(dataRoute, {
        ...dataRoute,
        ...getRouteComponents(route, routeModule, isSpaMode),
        middleware: routeModule.clientMiddleware,
        handle: routeModule.handle,
        shouldRevalidate: getShouldRevalidateFunction(
          dataRoute.path,
          routeModule,
          route,
          ssr,
          needsRevalidation
        )
      });
      let hasInitialData = initialState && initialState.loaderData && route.id in initialState.loaderData;
      let initialData = hasInitialData ? initialState?.loaderData?.[route.id] : void 0;
      let hasInitialError = initialState && initialState.errors && route.id in initialState.errors;
      let initialError = hasInitialError ? initialState?.errors?.[route.id] : void 0;
      let isHydrationRequest = needsRevalidation == null && (routeModule.clientLoader?.hydrate === true || !route.hasLoader);
      dataRoute.loader = async ({ request, params, context, pattern, url }, singleFetch) => {
        let _isHydrationRequest = isHydrationRequest;
        isHydrationRequest = false;
        let result = await prefetchStylesAndCallHandler(async () => {
          invariant2(
            routeModule,
            "No `routeModule` available for critical-route loader"
          );
          if (!routeModule.clientLoader) {
            return fetchServerLoader(singleFetch);
          }
          return routeModule.clientLoader({
            request,
            params,
            context,
            pattern,
            url,
            async serverLoader() {
              preventInvalidServerHandlerCall("loader", route);
              if (_isHydrationRequest) {
                if (hasInitialData) {
                  return initialData;
                }
                if (hasInitialError) {
                  throw initialError;
                }
              }
              return fetchServerLoader(singleFetch);
            }
          });
        });
        return result;
      };
      dataRoute.loader.hydrate = shouldHydrateRouteLoader(
        route.id,
        routeModule.clientLoader,
        route.hasLoader,
        isSpaMode
      );
      dataRoute.action = ({ request, params, context, pattern, url }, singleFetch) => {
        return prefetchStylesAndCallHandler(async () => {
          invariant2(
            routeModule,
            "No `routeModule` available for critical-route action"
          );
          if (!routeModule.clientAction) {
            if (isSpaMode) {
              throw noActionDefinedError("clientAction", route.id);
            }
            return fetchServerAction(singleFetch);
          }
          return routeModule.clientAction({
            request,
            params,
            context,
            pattern,
            url,
            async serverAction() {
              preventInvalidServerHandlerCall("action", route);
              return fetchServerAction(singleFetch);
            }
          });
        });
      };
    } else {
      if (!route.hasClientLoader) {
        dataRoute.loader = (_, singleFetch) => prefetchStylesAndCallHandler(() => {
          return fetchServerLoader(singleFetch);
        });
      }
      if (!route.hasClientAction) {
        dataRoute.action = (_, singleFetch) => prefetchStylesAndCallHandler(() => {
          if (isSpaMode) {
            throw noActionDefinedError("clientAction", route.id);
          }
          return fetchServerAction(singleFetch);
        });
      }
      let lazyRoutePromise;
      async function getLazyRoute() {
        if (lazyRoutePromise) {
          return await lazyRoutePromise;
        }
        lazyRoutePromise = (async () => {
          if (route.clientLoaderModule || route.clientActionModule) {
            await new Promise((resolve) => setTimeout(resolve, 0));
          }
          let routeModulePromise = loadRouteModuleWithBlockingLinks(
            route,
            routeModulesCache
          );
          prefetchRouteModuleChunks(route);
          return await routeModulePromise;
        })();
        return await lazyRoutePromise;
      }
      dataRoute.lazy = {
        loader: route.hasClientLoader ? async () => {
          let { clientLoader } = route.clientLoaderModule ? await import(
            /* @vite-ignore */
            /* webpackIgnore: true */
            route.clientLoaderModule
          ) : await getLazyRoute();
          invariant2(clientLoader, "No `clientLoader` export found");
          return (args, singleFetch) => clientLoader({
            ...args,
            async serverLoader() {
              preventInvalidServerHandlerCall("loader", route);
              return fetchServerLoader(singleFetch);
            }
          });
        } : void 0,
        action: route.hasClientAction ? async () => {
          let clientActionPromise = route.clientActionModule ? import(
            /* @vite-ignore */
            /* webpackIgnore: true */
            route.clientActionModule
          ) : getLazyRoute();
          prefetchRouteModuleChunks(route);
          let { clientAction } = await clientActionPromise;
          invariant2(clientAction, "No `clientAction` export found");
          return (args, singleFetch) => clientAction({
            ...args,
            async serverAction() {
              preventInvalidServerHandlerCall("action", route);
              return fetchServerAction(singleFetch);
            }
          });
        } : void 0,
        middleware: route.hasClientMiddleware ? async () => {
          let { clientMiddleware } = route.clientMiddlewareModule ? await import(
            /* @vite-ignore */
            /* webpackIgnore: true */
            route.clientMiddlewareModule
          ) : await getLazyRoute();
          invariant2(clientMiddleware, "No `clientMiddleware` export found");
          return clientMiddleware;
        } : void 0,
        shouldRevalidate: async () => {
          let lazyRoute = await getLazyRoute();
          return getShouldRevalidateFunction(
            dataRoute.path,
            lazyRoute,
            route,
            ssr,
            needsRevalidation
          );
        },
        handle: async () => (await getLazyRoute()).handle,
        // No need to wrap these in layout since the root route is never
        // loaded via route.lazy()
        Component: async () => (await getLazyRoute()).Component,
        ErrorBoundary: route.hasErrorBoundary ? async () => (await getLazyRoute()).ErrorBoundary : void 0
      };
    }
    let children = createClientRoutes(
      manifest,
      routeModulesCache,
      initialState,
      ssr,
      isSpaMode,
      route.id,
      routesByParentId,
      needsRevalidation
    );
    if (children.length > 0) dataRoute.children = children;
    return dataRoute;
  });
}
function getShouldRevalidateFunction(path, route, manifestRoute, ssr, needsRevalidation) {
  if (needsRevalidation) {
    return wrapShouldRevalidateForHdr(
      manifestRoute.id,
      route.shouldRevalidate,
      needsRevalidation
    );
  }
  if (!ssr && manifestRoute.hasLoader && !manifestRoute.hasClientLoader) {
    let myParams = path ? compilePath(path)[1].map((p) => p.paramName) : [];
    const didParamsChange = (opts) => myParams.some((p) => opts.currentParams[p] !== opts.nextParams[p]);
    if (route.shouldRevalidate) {
      let fn = route.shouldRevalidate;
      return (opts) => fn({
        ...opts,
        defaultShouldRevalidate: didParamsChange(opts)
      });
    } else {
      return (opts) => didParamsChange(opts);
    }
  }
  return route.shouldRevalidate;
}
function wrapShouldRevalidateForHdr(routeId, routeShouldRevalidate, needsRevalidation) {
  let handledRevalidation = false;
  return (arg) => {
    if (!handledRevalidation) {
      handledRevalidation = true;
      return needsRevalidation.has(routeId);
    }
    return routeShouldRevalidate ? routeShouldRevalidate(arg) : arg.defaultShouldRevalidate;
  };
}
async function loadRouteModuleWithBlockingLinks(route, routeModules) {
  let routeModulePromise = loadRouteModule(route, routeModules);
  let prefetchRouteCssPromise = prefetchRouteCss(route);
  let routeModule = await routeModulePromise;
  await Promise.all([
    prefetchRouteCssPromise,
    prefetchStyleLinks(route, routeModule)
  ]);
  return {
    Component: getRouteModuleComponent(routeModule),
    ErrorBoundary: routeModule.ErrorBoundary,
    clientMiddleware: routeModule.clientMiddleware,
    clientAction: routeModule.clientAction,
    clientLoader: routeModule.clientLoader,
    handle: routeModule.handle,
    links: routeModule.links,
    meta: routeModule.meta,
    shouldRevalidate: routeModule.shouldRevalidate
  };
}
function getRouteModuleComponent(routeModule) {
  if (routeModule.default == null) return void 0;
  let isEmptyObject = typeof routeModule.default === "object" && Object.keys(routeModule.default).length === 0;
  if (!isEmptyObject) {
    return routeModule.default;
  }
}
function shouldHydrateRouteLoader(routeId, clientLoader, hasLoader, isSpaMode) {
  return isSpaMode && routeId !== "root" || clientLoader != null && (clientLoader.hydrate === true || hasLoader !== true);
}

// lib/dom/ssr/fog-of-war.ts
var nextPaths = /* @__PURE__ */ new Set();
var discoveredPathsMaxSize = 1e3;
var discoveredPaths = /* @__PURE__ */ new Set();
var URL_LIMIT = 7680;
function getPathsWithAncestors(paths) {
  let result = /* @__PURE__ */ new Set();
  paths.forEach((path) => {
    if (!path.startsWith("/")) {
      path = `/${path}`;
    }
    for (let i = 1; i < path.length; i++) {
      if (path[i] === "/") {
        result.add(path.slice(0, i));
      }
    }
    result.add(path);
  });
  return Array.from(result);
}
function isFogOfWarEnabled(routeDiscovery, ssr) {
  return routeDiscovery.mode === "lazy" && ssr === true;
}
function getPartialManifest({ sri, ...manifest }, router) {
  let routeIds = new Set(router.state.matches.map((m) => m.route.id));
  let segments = router.state.location.pathname.split("/").filter(Boolean);
  let paths = ["/"];
  segments.pop();
  while (segments.length > 0) {
    paths.push(`/${segments.join("/")}`);
    segments.pop();
  }
  paths.forEach((path) => {
    let matches = matchRoutesImpl(
      router.routes,
      path,
      router.basename || "/",
      false,
      router.branches
    );
    if (matches) {
      matches.forEach((m) => routeIds.add(m.route.id));
    }
  });
  let initialRoutes = [...routeIds].reduce(
    (acc, id) => Object.assign(acc, { [id]: manifest.routes[id] }),
    {}
  );
  return {
    ...manifest,
    routes: initialRoutes,
    sri: sri ? true : void 0
  };
}
function getPatchRoutesOnNavigationFunction(getRouter, manifest, routeModules, ssr, routeDiscovery, isSpaMode, basename) {
  if (!isFogOfWarEnabled(routeDiscovery, ssr)) {
    return void 0;
  }
  return async ({ path, patch, signal, fetcherKey }) => {
    if (discoveredPaths.has(path)) {
      return;
    }
    let { state } = getRouter();
    await fetchAndApplyManifestPatches(
      [path],
      // If we're patching for a fetcher call, reload the current location
      // Otherwise prefer any ongoing navigation location
      fetcherKey ? window.location.href : createPath(state.navigation.location || state.location),
      manifest,
      routeModules,
      ssr,
      isSpaMode,
      basename,
      routeDiscovery.manifestPath,
      patch,
      signal
    );
  };
}
function useFogOFWarDiscovery(router, manifest, routeModules, ssr, routeDiscovery, isSpaMode) {
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    if (!isFogOfWarEnabled(routeDiscovery, ssr) || // @ts-expect-error - TS doesn't know about this yet
    window.navigator?.connection?.saveData === true) {
      return;
    }
    function registerElement(el) {
      let path = el.tagName === "FORM" ? el.getAttribute("action") : el.getAttribute("href");
      if (!path) {
        return;
      }
      let pathname = el.tagName === "A" ? el.pathname : new URL(path, window.location.origin).pathname;
      if (!discoveredPaths.has(pathname)) {
        nextPaths.add(pathname);
      }
    }
    async function fetchPatches() {
      document.querySelectorAll("a[data-discover], form[data-discover]").forEach(registerElement);
      let lazyPaths = Array.from(nextPaths.keys()).filter((path) => {
        if (discoveredPaths.has(path)) {
          nextPaths.delete(path);
          return false;
        }
        return true;
      });
      if (lazyPaths.length === 0) {
        return;
      }
      try {
        await fetchAndApplyManifestPatches(
          lazyPaths,
          null,
          manifest,
          routeModules,
          ssr,
          isSpaMode,
          router.basename,
          routeDiscovery.manifestPath,
          router.patchRoutes
        );
      } catch (e) {
        console.error("Failed to fetch manifest patches", e);
      }
    }
    let debouncedFetchPatches = debounce(fetchPatches, 100);
    fetchPatches();
    let observer = new MutationObserver(() => debouncedFetchPatches());
    observer.observe(document.documentElement, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ["data-discover", "href", "action"]
    });
    return () => observer.disconnect();
  }, [ssr, isSpaMode, manifest, routeModules, router, routeDiscovery]);
}
function getManifestPath(_manifestPath, basename) {
  let manifestPath = _manifestPath || "/__manifest";
  return basename == null ? manifestPath : joinPaths([basename, manifestPath]);
}
var MANIFEST_VERSION_STORAGE_KEY = "react-router-manifest-version";
async function fetchAndApplyManifestPatches(paths, errorReloadPath, manifest, routeModules, ssr, isSpaMode, basename, manifestPath, patchRoutes, signal) {
  paths = getPathsWithAncestors(paths);
  const searchParams = new URLSearchParams();
  searchParams.set("paths", paths.sort().join(","));
  searchParams.set("version", manifest.version);
  let url = new URL(
    getManifestPath(manifestPath, basename),
    window.location.origin
  );
  url.search = searchParams.toString();
  if (url.toString().length > URL_LIMIT) {
    nextPaths.clear();
    return;
  }
  let serverPatches;
  try {
    let res = await fetch(url, { signal });
    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    } else if (res.status === 204 && res.headers.has("X-Remix-Reload-Document")) {
      if (!errorReloadPath) {
        console.warn(
          "Detected a manifest version mismatch during eager route discovery. The next navigation/fetch to an undiscovered route will result in a new document navigation to sync up with the latest manifest."
        );
        return;
      }
      try {
        if (sessionStorage.getItem(MANIFEST_VERSION_STORAGE_KEY) === manifest.version) {
          console.error(
            "Unable to discover routes due to manifest version mismatch."
          );
          return;
        }
        sessionStorage.setItem(MANIFEST_VERSION_STORAGE_KEY, manifest.version);
      } catch {
      }
      window.location.href = errorReloadPath;
      console.warn("Detected manifest version mismatch, reloading...");
      await new Promise(() => {
      });
    } else if (res.status >= 400) {
      throw new Error(await res.text());
    }
    try {
      sessionStorage.removeItem(MANIFEST_VERSION_STORAGE_KEY);
    } catch {
    }
    serverPatches = await res.json();
  } catch (e) {
    if (signal?.aborted) return;
    throw e;
  }
  let knownRoutes = new Set(Object.keys(manifest.routes));
  let patches = Object.values(serverPatches).reduce((acc, route) => {
    if (route && !knownRoutes.has(route.id)) {
      acc[route.id] = route;
    }
    return acc;
  }, {});
  Object.assign(manifest.routes, patches);
  paths.forEach((p) => addToFifoQueue(p, discoveredPaths));
  let parentIds = /* @__PURE__ */ new Set();
  Object.values(patches).forEach((patch) => {
    if (patch && (!patch.parentId || !patches[patch.parentId])) {
      parentIds.add(patch.parentId);
    }
  });
  parentIds.forEach(
    (parentId) => patchRoutes(
      parentId || null,
      createClientRoutes(patches, routeModules, null, ssr, isSpaMode, parentId)
    )
  );
}
function addToFifoQueue(path, queue) {
  if (queue.size >= discoveredPathsMaxSize) {
    let first = queue.values().next().value;
    queue.delete(first);
  }
  queue.add(path);
}
function debounce(callback, wait) {
  let timeoutId;
  return (...args) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => callback(...args), wait);
  };
}

// lib/dom/ssr/components.tsx
function useDataRouterContext2() {
  let context = react__WEBPACK_IMPORTED_MODULE_0__.useContext(DataRouterContext);
  invariant2(
    context,
    "You must render this element inside a <DataRouterContext.Provider> element"
  );
  return context;
}
function useDataRouterStateContext() {
  let context = react__WEBPACK_IMPORTED_MODULE_0__.useContext(DataRouterStateContext);
  invariant2(
    context,
    "You must render this element inside a <DataRouterStateContext.Provider> element"
  );
  return context;
}
var FrameworkContext = react__WEBPACK_IMPORTED_MODULE_0__.createContext(void 0);
FrameworkContext.displayName = "FrameworkContext";
function useFrameworkContext() {
  let context = react__WEBPACK_IMPORTED_MODULE_0__.useContext(FrameworkContext);
  invariant2(
    context,
    "You must render this element inside a <HydratedRouter> element"
  );
  return context;
}
function usePrefetchBehavior(prefetch, theirElementProps) {
  let frameworkContext = react__WEBPACK_IMPORTED_MODULE_0__.useContext(FrameworkContext);
  let [maybePrefetch, setMaybePrefetch] = react__WEBPACK_IMPORTED_MODULE_0__.useState(false);
  let [shouldPrefetch, setShouldPrefetch] = react__WEBPACK_IMPORTED_MODULE_0__.useState(false);
  let { onFocus, onBlur, onMouseEnter, onMouseLeave, onTouchStart } = theirElementProps;
  let ref = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    if (prefetch === "render") {
      setShouldPrefetch(true);
    }
    if (prefetch === "viewport") {
      let callback = (entries) => {
        entries.forEach((entry) => {
          setShouldPrefetch(entry.isIntersecting);
        });
      };
      let observer = new IntersectionObserver(callback, { threshold: 0.5 });
      if (ref.current) observer.observe(ref.current);
      return () => {
        observer.disconnect();
      };
    }
  }, [prefetch]);
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    if (maybePrefetch) {
      let id = setTimeout(() => {
        setShouldPrefetch(true);
      }, 100);
      return () => {
        clearTimeout(id);
      };
    }
  }, [maybePrefetch]);
  let setIntent = () => {
    setMaybePrefetch(true);
  };
  let cancelIntent = () => {
    setMaybePrefetch(false);
    setShouldPrefetch(false);
  };
  if (!frameworkContext) {
    return [false, ref, {}];
  }
  if (prefetch !== "intent") {
    return [shouldPrefetch, ref, {}];
  }
  return [
    shouldPrefetch,
    ref,
    {
      onFocus: composeEventHandlers(onFocus, setIntent),
      onBlur: composeEventHandlers(onBlur, cancelIntent),
      onMouseEnter: composeEventHandlers(onMouseEnter, setIntent),
      onMouseLeave: composeEventHandlers(onMouseLeave, cancelIntent),
      onTouchStart: composeEventHandlers(onTouchStart, setIntent)
    }
  ];
}
function composeEventHandlers(theirHandler, ourHandler) {
  return (event) => {
    theirHandler && theirHandler(event);
    if (!event.defaultPrevented) {
      ourHandler(event);
    }
  };
}
function getActiveMatches(matches, errors, isSpaMode) {
  if (isSpaMode && !isHydrated) {
    return [matches[0]];
  }
  if (errors) {
    let errorIdx = matches.findIndex((m) => errors[m.route.id] !== void 0);
    return matches.slice(0, errorIdx + 1);
  }
  return matches;
}
var CRITICAL_CSS_DATA_ATTRIBUTE = "data-react-router-critical-css";
function Links({ nonce, crossOrigin }) {
  let {
    isSpaMode,
    manifest,
    routeModules,
    criticalCss,
    nonce: contextNonce
  } = useFrameworkContext();
  let { errors, matches: routerMatches } = useDataRouterStateContext();
  let matches = getActiveMatches(routerMatches, errors, isSpaMode);
  let keyedLinks = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(
    () => getKeyedLinksForMatches(matches, routeModules, manifest),
    [matches, routeModules, manifest]
  );
  if (nonce == null && contextNonce) {
    nonce = contextNonce;
  }
  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, typeof criticalCss === "string" ? /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
    "style",
    {
      ...{ [CRITICAL_CSS_DATA_ATTRIBUTE]: "" },
      nonce,
      dangerouslySetInnerHTML: { __html: criticalCss }
    }
  ) : null, typeof criticalCss === "object" ? /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
    "link",
    {
      ...{ [CRITICAL_CSS_DATA_ATTRIBUTE]: "" },
      rel: "stylesheet",
      href: criticalCss.href,
      nonce,
      crossOrigin
    }
  ) : null, keyedLinks.map(
    ({ key, link }) => isPageLinkDescriptor(link) ? /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
      PrefetchPageLinks,
      {
        key,
        nonce,
        ...link,
        crossOrigin: link.crossOrigin ?? crossOrigin
      }
    ) : /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
      "link",
      {
        key,
        nonce,
        ...link,
        crossOrigin: link.crossOrigin ?? crossOrigin
      }
    )
  ));
}
function PrefetchPageLinks({ page, ...linkProps }) {
  let rsc = useIsRSCRouterContext();
  let { nonce: contextNonce } = useFrameworkContext();
  let { router } = useDataRouterContext2();
  let matches = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(
    () => matchRoutes(router.routes, page, router.basename),
    [router.routes, page, router.basename]
  );
  if (!matches) {
    return null;
  }
  if (linkProps.nonce == null && contextNonce) {
    linkProps = { ...linkProps, nonce: contextNonce };
  }
  if (rsc) {
    return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(RSCPrefetchPageLinksImpl, { page, matches, ...linkProps });
  }
  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(PrefetchPageLinksImpl, { page, matches, ...linkProps });
}
function useKeyedPrefetchLinks(matches) {
  let { manifest, routeModules } = useFrameworkContext();
  let [keyedPrefetchLinks, setKeyedPrefetchLinks] = react__WEBPACK_IMPORTED_MODULE_0__.useState([]);
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    let interrupted = false;
    void getKeyedPrefetchLinks(matches, manifest, routeModules).then(
      (links) => {
        if (!interrupted) {
          setKeyedPrefetchLinks(links);
        }
      }
    );
    return () => {
      interrupted = true;
    };
  }, [matches, manifest, routeModules]);
  return keyedPrefetchLinks;
}
function RSCPrefetchPageLinksImpl({
  page,
  matches: nextMatches,
  ...linkProps
}) {
  let location = useLocation();
  let { future } = useFrameworkContext();
  let { basename } = useDataRouterContext2();
  let dataHrefs = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => {
    if (page === location.pathname + location.search + location.hash) {
      return [];
    }
    let url = singleFetchUrl(
      page,
      basename,
      future.v8_trailingSlashAwareDataRequests,
      "rsc"
    );
    let hasSomeRoutesWithShouldRevalidate = false;
    let targetRoutes = [];
    for (let match of nextMatches) {
      if (typeof match.route.shouldRevalidate === "function") {
        hasSomeRoutesWithShouldRevalidate = true;
      } else {
        targetRoutes.push(match.route.id);
      }
    }
    if (hasSomeRoutesWithShouldRevalidate && targetRoutes.length > 0) {
      url.searchParams.set("_routes", targetRoutes.join(","));
    }
    return [url.pathname + url.search];
  }, [
    basename,
    future.v8_trailingSlashAwareDataRequests,
    page,
    location,
    nextMatches
  ]);
  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, dataHrefs.map((href) => /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement("link", { key: href, rel: "prefetch", as: "fetch", href, ...linkProps })));
}
function PrefetchPageLinksImpl({
  page,
  matches: nextMatches,
  ...linkProps
}) {
  let location = useLocation();
  let { future, manifest, routeModules } = useFrameworkContext();
  let { basename } = useDataRouterContext2();
  let { loaderData, matches } = useDataRouterStateContext();
  let newMatchesForData = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(
    () => getNewMatchesForLinks(
      page,
      nextMatches,
      matches,
      manifest,
      location,
      "data"
    ),
    [page, nextMatches, matches, manifest, location]
  );
  let newMatchesForAssets = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(
    () => getNewMatchesForLinks(
      page,
      nextMatches,
      matches,
      manifest,
      location,
      "assets"
    ),
    [page, nextMatches, matches, manifest, location]
  );
  let dataHrefs = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => {
    if (page === location.pathname + location.search + location.hash) {
      return [];
    }
    let routesParams = /* @__PURE__ */ new Set();
    let foundOptOutRoute = false;
    nextMatches.forEach((m) => {
      let manifestRoute = manifest.routes[m.route.id];
      if (!manifestRoute || !manifestRoute.hasLoader) {
        return;
      }
      if (!newMatchesForData.some((m2) => m2.route.id === m.route.id) && m.route.id in loaderData && routeModules[m.route.id]?.shouldRevalidate) {
        foundOptOutRoute = true;
      } else if (manifestRoute.hasClientLoader) {
        foundOptOutRoute = true;
      } else {
        routesParams.add(m.route.id);
      }
    });
    if (routesParams.size === 0) {
      return [];
    }
    let url = singleFetchUrl(
      page,
      basename,
      future.v8_trailingSlashAwareDataRequests,
      "data"
    );
    if (foundOptOutRoute && routesParams.size > 0) {
      url.searchParams.set(
        "_routes",
        nextMatches.filter((m) => routesParams.has(m.route.id)).map((m) => m.route.id).join(",")
      );
    }
    return [url.pathname + url.search];
  }, [
    basename,
    future.v8_trailingSlashAwareDataRequests,
    loaderData,
    location,
    manifest,
    newMatchesForData,
    nextMatches,
    page,
    routeModules
  ]);
  let moduleHrefs = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(
    () => getModuleLinkHrefs(newMatchesForAssets, manifest),
    [newMatchesForAssets, manifest]
  );
  let keyedPrefetchLinks = useKeyedPrefetchLinks(newMatchesForAssets);
  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, dataHrefs.map((href) => /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement("link", { key: href, rel: "prefetch", as: "fetch", href, ...linkProps })), moduleHrefs.map((href) => /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement("link", { key: href, rel: "modulepreload", href, ...linkProps })), keyedPrefetchLinks.map(({ key, link }) => (
    // these don't spread `linkProps` because they are full link descriptors
    // already with their own props
    /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
      "link",
      {
        key,
        nonce: linkProps.nonce,
        ...link,
        crossOrigin: link.crossOrigin ?? linkProps.crossOrigin
      }
    )
  )));
}
function Meta() {
  let { isSpaMode, routeModules } = useFrameworkContext();
  let {
    errors,
    matches: routerMatches,
    loaderData
  } = useDataRouterStateContext();
  let location = useLocation();
  let _matches = getActiveMatches(routerMatches, errors, isSpaMode);
  let error = null;
  if (errors) {
    error = errors[_matches[_matches.length - 1].route.id];
  }
  let meta = [];
  let leafMeta = null;
  let matches = [];
  for (let i = 0; i < _matches.length; i++) {
    let _match = _matches[i];
    let routeId = _match.route.id;
    let data2 = loaderData[routeId];
    let params = _match.params;
    let routeModule = routeModules[routeId];
    let routeMeta = [];
    let match = {
      id: routeId,
      data: data2,
      loaderData: data2,
      meta: [],
      params: _match.params,
      pathname: _match.pathname,
      handle: _match.route.handle,
      error
    };
    matches[i] = match;
    if (routeModule?.meta) {
      routeMeta = typeof routeModule.meta === "function" ? routeModule.meta({
        data: data2,
        loaderData: data2,
        params,
        location,
        matches,
        error
      }) : Array.isArray(routeModule.meta) ? [...routeModule.meta] : routeModule.meta;
    } else if (leafMeta) {
      routeMeta = [...leafMeta];
    }
    routeMeta = routeMeta || [];
    if (!Array.isArray(routeMeta)) {
      throw new Error(
        "The route at " + _match.route.path + " returns an invalid value. All route meta functions must return an array of meta objects.\n\nTo reference the meta function API, see https://reactrouter.com/start/framework/route-module#meta"
      );
    }
    match.meta = routeMeta;
    matches[i] = match;
    meta = [...routeMeta];
    leafMeta = meta;
  }
  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, meta.flat().map((metaProps) => {
    if (!metaProps) {
      return null;
    }
    if ("tagName" in metaProps) {
      let { tagName, ...rest } = metaProps;
      if (!isValidMetaTag(tagName)) {
        console.warn(
          `A meta object uses an invalid tagName: ${tagName}. Expected either 'link' or 'meta'`
        );
        return null;
      }
      let Comp = tagName;
      return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(Comp, { key: JSON.stringify(rest), ...rest });
    }
    if ("title" in metaProps) {
      return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement("title", { key: "title" }, String(metaProps.title));
    }
    if ("charset" in metaProps) {
      metaProps.charSet ?? (metaProps.charSet = metaProps.charset);
      delete metaProps.charset;
    }
    if ("charSet" in metaProps && metaProps.charSet != null) {
      return typeof metaProps.charSet === "string" ? /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement("meta", { key: "charSet", charSet: metaProps.charSet }) : null;
    }
    if ("script:ld+json" in metaProps) {
      try {
        let json = JSON.stringify(metaProps["script:ld+json"]);
        return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
          "script",
          {
            key: `script:ld+json:${json}`,
            type: "application/ld+json",
            dangerouslySetInnerHTML: { __html: escapeHtml(json) }
          }
        );
      } catch (e) {
        return null;
      }
    }
    return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement("meta", { key: JSON.stringify(metaProps), ...metaProps });
  }));
}
function isValidMetaTag(tagName) {
  return typeof tagName === "string" && /^(meta|link)$/.test(tagName);
}
var isHydrated = false;
function setIsHydrated() {
  isHydrated = true;
}
function Scripts(scriptProps) {
  let {
    manifest,
    serverHandoffString,
    isSpaMode,
    renderMeta,
    routeDiscovery,
    ssr,
    nonce: contextNonce
  } = useFrameworkContext();
  let { router, static: isStatic, staticContext } = useDataRouterContext2();
  let { matches: routerMatches } = useDataRouterStateContext();
  let isRSCRouterContext = useIsRSCRouterContext();
  let enableFogOfWar = isFogOfWarEnabled(routeDiscovery, ssr);
  if (scriptProps.nonce == null && contextNonce) {
    scriptProps = { ...scriptProps, nonce: contextNonce };
  }
  if (renderMeta) {
    renderMeta.didRenderScripts = true;
  }
  let matches = getActiveMatches(routerMatches, null, isSpaMode);
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    setIsHydrated();
  }, []);
  let initialScripts = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => {
    if (isRSCRouterContext) {
      return null;
    }
    let streamScript = "window.__reactRouterContext.stream = new ReadableStream({start(controller){window.__reactRouterContext.streamController = controller;}}).pipeThrough(new TextEncoderStream());";
    let contextScript = staticContext ? `window.__reactRouterContext = ${serverHandoffString};${streamScript}` : " ";
    let routeModulesScript = !isStatic ? " " : `${manifest.hmr?.runtime ? `import ${JSON.stringify(manifest.hmr.runtime)};` : ""}${!enableFogOfWar ? `import ${JSON.stringify(manifest.url)}` : ""};
${matches.map((match, routeIndex) => {
      let routeVarName = `route${routeIndex}`;
      let manifestEntry = manifest.routes[match.route.id];
      invariant2(manifestEntry, `Route ${match.route.id} not found in manifest`);
      let {
        clientActionModule,
        clientLoaderModule,
        clientMiddlewareModule,
        hydrateFallbackModule,
        module
      } = manifestEntry;
      let chunks = [
        ...clientActionModule ? [
          {
            module: clientActionModule,
            varName: `${routeVarName}_clientAction`
          }
        ] : [],
        ...clientLoaderModule ? [
          {
            module: clientLoaderModule,
            varName: `${routeVarName}_clientLoader`
          }
        ] : [],
        ...clientMiddlewareModule ? [
          {
            module: clientMiddlewareModule,
            varName: `${routeVarName}_clientMiddleware`
          }
        ] : [],
        ...hydrateFallbackModule ? [
          {
            module: hydrateFallbackModule,
            varName: `${routeVarName}_HydrateFallback`
          }
        ] : [],
        { module, varName: `${routeVarName}_main` }
      ];
      if (chunks.length === 1) {
        return `import * as ${routeVarName} from ${JSON.stringify(module)};`;
      }
      let chunkImportsSnippet = chunks.map((chunk) => `import * as ${chunk.varName} from "${chunk.module}";`).join("\n");
      let mergedChunksSnippet = `const ${routeVarName} = {${chunks.map((chunk) => `...${chunk.varName}`).join(",")}};`;
      return [chunkImportsSnippet, mergedChunksSnippet].join("\n");
    }).join("\n")}
  ${enableFogOfWar ? (
      // Inline a minimal manifest with the SSR matches
      `window.__reactRouterManifest = ${JSON.stringify(
        getPartialManifest(manifest, router),
        null,
        2
      )};`
    ) : ""}
  window.__reactRouterRouteModules = {${matches.map((match, index) => `${JSON.stringify(match.route.id)}:route${index}`).join(",")}};

import(${JSON.stringify(manifest.entry.module)});`;
    return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
      "script",
      {
        ...scriptProps,
        suppressHydrationWarning: true,
        dangerouslySetInnerHTML: { __html: contextScript },
        type: void 0
      }
    ), /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
      "script",
      {
        ...scriptProps,
        suppressHydrationWarning: true,
        dangerouslySetInnerHTML: { __html: routeModulesScript },
        type: "module",
        async: true
      }
    ));
  }, []);
  let preloads = isHydrated || isRSCRouterContext ? [] : [
    // Dedupe through a Set
    ...new Set(
      manifest.entry.imports.concat(
        getModuleLinkHrefs(matches, manifest, {
          includeHydrateFallback: true
        })
      )
    )
  ];
  let sri = typeof manifest.sri === "object" ? manifest.sri : {};
  warnOnce(
    !isRSCRouterContext,
    "The <Scripts /> element is a no-op when using RSC and can be safely removed."
  );
  return isHydrated || isRSCRouterContext ? null : /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, typeof manifest.sri === "object" ? /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
    "script",
    {
      ...scriptProps,
      "rr-importmap": "",
      type: "importmap",
      suppressHydrationWarning: true,
      dangerouslySetInnerHTML: {
        __html: JSON.stringify({
          integrity: sri
        })
      }
    }
  ) : null, !enableFogOfWar ? /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
    "link",
    {
      rel: "modulepreload",
      href: manifest.url,
      crossOrigin: scriptProps.crossOrigin,
      integrity: sri[manifest.url],
      nonce: scriptProps.nonce,
      suppressHydrationWarning: true
    }
  ) : null, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
    "link",
    {
      rel: "modulepreload",
      href: manifest.entry.module,
      crossOrigin: scriptProps.crossOrigin,
      integrity: sri[manifest.entry.module],
      nonce: scriptProps.nonce,
      suppressHydrationWarning: true
    }
  ), preloads.map((path) => /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
    "link",
    {
      key: path,
      rel: "modulepreload",
      href: path,
      crossOrigin: scriptProps.crossOrigin,
      integrity: sri[path],
      nonce: scriptProps.nonce,
      suppressHydrationWarning: true
    }
  )), initialScripts);
}
function mergeRefs(...refs) {
  return (value) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") {
        ref(value);
      } else if (ref != null) {
        ref.current = value;
      }
    });
  };
}

// lib/dom/ssr/errorBoundaries.tsx
var RemixErrorBoundary = class extends react__WEBPACK_IMPORTED_MODULE_0__.Component {
  constructor(props) {
    super(props);
    this.state = { error: props.error || null, location: props.location };
  }
  static getDerivedStateFromError(error) {
    return { error };
  }
  static getDerivedStateFromProps(props, state) {
    if (state.location !== props.location) {
      return { error: props.error || null, location: props.location };
    }
    return { error: props.error || state.error, location: state.location };
  }
  render() {
    if (this.state.error) {
      return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
        RemixRootDefaultErrorBoundary,
        {
          error: this.state.error,
          isOutsideRemixApp: true
        }
      );
    } else {
      return this.props.children;
    }
  }
};
function RemixRootDefaultErrorBoundary({
  error,
  isOutsideRemixApp
}) {
  let { nonce } = useFrameworkContext();
  console.error(error);
  let heyDeveloper = /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
    "script",
    {
      nonce,
      dangerouslySetInnerHTML: {
        __html: `
        console.log(
          "\u{1F4BF} Hey developer \u{1F44B}. You can provide a way better UX than this when your app throws errors. Check out https://reactrouter.com/how-to/error-boundary for more information."
        );
      `
      }
    }
  );
  if (isRouteErrorResponse(error)) {
    return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(BoundaryShell, { title: "Unhandled Thrown Response!" }, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement("h1", { style: { fontSize: "24px" } }, error.status, " ", error.statusText), ENABLE_DEV_WARNINGS ? heyDeveloper : null);
  }
  let errorInstance;
  if (error instanceof Error) {
    errorInstance = error;
  } else {
    let errorString = error == null ? "Unknown Error" : typeof error === "object" && "toString" in error ? error.toString() : JSON.stringify(error);
    errorInstance = new Error(errorString);
  }
  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
    BoundaryShell,
    {
      title: "Application Error!",
      isOutsideRemixApp
    },
    /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement("h1", { style: { fontSize: "24px" } }, "Application Error"),
    /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
      "pre",
      {
        style: {
          padding: "2rem",
          background: "hsla(10, 50%, 50%, 0.1)",
          color: "red",
          overflow: "auto"
        }
      },
      errorInstance.stack
    ),
    heyDeveloper
  );
}
function BoundaryShell({
  title,
  renderScripts,
  isOutsideRemixApp,
  children
}) {
  let { routeModules } = useFrameworkContext();
  if (routeModules.root?.Layout && !isOutsideRemixApp) {
    return children;
  }
  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement("html", { lang: "en" }, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement("head", null, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement("meta", { charSet: "utf-8" }), /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
    "meta",
    {
      name: "viewport",
      content: "width=device-width,initial-scale=1,viewport-fit=cover"
    }
  ), /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement("title", null, title)), /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement("body", null, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement("main", { style: { fontFamily: "system-ui, sans-serif", padding: "2rem" } }, children, renderScripts ? /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(Scripts, null) : null)));
}

// lib/dom/lib.tsx
;
var isBrowser2 = typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined";
try {
  if (isBrowser2) {
    window.__reactRouterVersion = // @ts-expect-error
    "7.18.2";
  }
} catch (e) {
}
function createBrowserRouter(routes, opts) {
  return createRouter({
    basename: opts?.basename,
    getContext: opts?.getContext,
    future: opts?.future,
    history: createBrowserHistory({ window: opts?.window }),
    hydrationData: opts?.hydrationData || parseHydrationData(),
    routes,
    mapRouteProperties,
    hydrationRouteProperties,
    dataStrategy: opts?.dataStrategy,
    patchRoutesOnNavigation: opts?.patchRoutesOnNavigation,
    window: opts?.window,
    instrumentations: opts?.instrumentations
  }).initialize();
}
function createHashRouter(routes, opts) {
  return createRouter({
    basename: opts?.basename,
    getContext: opts?.getContext,
    future: opts?.future,
    history: createHashHistory({ window: opts?.window }),
    hydrationData: opts?.hydrationData || parseHydrationData(),
    routes,
    mapRouteProperties,
    hydrationRouteProperties,
    dataStrategy: opts?.dataStrategy,
    patchRoutesOnNavigation: opts?.patchRoutesOnNavigation,
    window: opts?.window,
    instrumentations: opts?.instrumentations
  }).initialize();
}
function parseHydrationData() {
  let state = window?.__staticRouterHydrationData;
  if (state && state.errors) {
    state = {
      ...state,
      errors: deserializeErrors(state.errors)
    };
  }
  return state;
}
function deserializeErrors(errors) {
  if (!errors) return null;
  let entries = Object.entries(errors);
  let serialized = {};
  for (let [key, val] of entries) {
    if (val && val.__type === "RouteErrorResponse") {
      serialized[key] = new ErrorResponseImpl(
        val.status,
        val.statusText,
        val.data,
        val.internal === true
      );
    } else if (val && val.__type === "Error") {
      if (typeof val.__subType === "string" && SUPPORTED_ERROR_TYPES.includes(val.__subType)) {
        let ErrorConstructor = window[val.__subType];
        if (typeof ErrorConstructor === "function") {
          try {
            let error = new ErrorConstructor(val.message);
            error.stack = "";
            serialized[key] = error;
          } catch (e) {
          }
        }
      }
      if (serialized[key] == null) {
        let error = new Error(val.message);
        error.stack = "";
        serialized[key] = error;
      }
    } else {
      serialized[key] = val;
    }
  }
  return serialized;
}
function BrowserRouter({
  basename,
  children,
  useTransitions,
  window: window2
}) {
  let historyRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef();
  if (historyRef.current == null) {
    historyRef.current = createBrowserHistory({ window: window2, v5Compat: true });
  }
  let history = historyRef.current;
  let [state, setStateImpl] = react__WEBPACK_IMPORTED_MODULE_0__.useState({
    action: history.action,
    location: history.location
  });
  let setState = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(
    (newState) => {
      if (useTransitions === false) {
        setStateImpl(newState);
      } else {
        react__WEBPACK_IMPORTED_MODULE_0__.startTransition(() => setStateImpl(newState));
      }
    },
    [useTransitions]
  );
  react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect(() => history.listen(setState), [history, setState]);
  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
    Router,
    {
      basename,
      children,
      location: state.location,
      navigationType: state.action,
      navigator: history,
      useTransitions
    }
  );
}
function HashRouter({
  basename,
  children,
  useTransitions,
  window: window2
}) {
  let historyRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef();
  if (historyRef.current == null) {
    historyRef.current = createHashHistory({ window: window2, v5Compat: true });
  }
  let history = historyRef.current;
  let [state, setStateImpl] = react__WEBPACK_IMPORTED_MODULE_0__.useState({
    action: history.action,
    location: history.location
  });
  let setState = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(
    (newState) => {
      if (useTransitions === false) {
        setStateImpl(newState);
      } else {
        react__WEBPACK_IMPORTED_MODULE_0__.startTransition(() => setStateImpl(newState));
      }
    },
    [useTransitions]
  );
  react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect(() => history.listen(setState), [history, setState]);
  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
    Router,
    {
      basename,
      children,
      location: state.location,
      navigationType: state.action,
      navigator: history,
      useTransitions
    }
  );
}
function HistoryRouter({
  basename,
  children,
  history,
  useTransitions
}) {
  let [state, setStateImpl] = react__WEBPACK_IMPORTED_MODULE_0__.useState({
    action: history.action,
    location: history.location
  });
  let setState = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(
    (newState) => {
      if (useTransitions === false) {
        setStateImpl(newState);
      } else {
        react__WEBPACK_IMPORTED_MODULE_0__.startTransition(() => setStateImpl(newState));
      }
    },
    [useTransitions]
  );
  react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect(() => history.listen(setState), [history, setState]);
  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
    Router,
    {
      basename,
      children,
      location: state.location,
      navigationType: state.action,
      navigator: history,
      useTransitions
    }
  );
}
HistoryRouter.displayName = "unstable_HistoryRouter";
var Link = react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(
  function LinkWithRef({
    onClick,
    discover = "render",
    prefetch = "none",
    relative,
    reloadDocument,
    replace: replace2,
    mask,
    state,
    target,
    to,
    preventScrollReset,
    viewTransition,
    defaultShouldRevalidate,
    ...rest
  }, forwardedRef) {
    let { basename, navigator, useTransitions } = react__WEBPACK_IMPORTED_MODULE_0__.useContext(NavigationContext);
    let isAbsolute = typeof to === "string" && ABSOLUTE_URL_REGEX.test(to);
    let parsed = parseToInfo(to, basename);
    to = parsed.to;
    let href = useHref(to, { relative });
    let location = useLocation();
    let maskedHref = null;
    if (mask) {
      let resolved = resolveTo(
        mask,
        [],
        location.mask ? location.mask.pathname : "/",
        true
      );
      if (basename !== "/") {
        resolved.pathname = resolved.pathname === "/" ? basename : joinPaths([basename, resolved.pathname]);
      }
      maskedHref = navigator.createHref(resolved);
    }
    let [shouldPrefetch, prefetchRef, prefetchHandlers] = usePrefetchBehavior(
      prefetch,
      rest
    );
    let internalOnClick = useLinkClickHandler(to, {
      replace: replace2,
      mask,
      state,
      target,
      preventScrollReset,
      relative,
      viewTransition,
      defaultShouldRevalidate,
      useTransitions
    });
    function handleClick(event) {
      if (onClick) onClick(event);
      if (!event.defaultPrevented) {
        internalOnClick(event);
      }
    }
    let isSpaLink = !(parsed.isExternal || reloadDocument);
    let link = (
      // eslint-disable-next-line jsx-a11y/anchor-has-content
      /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
        "a",
        {
          ...rest,
          ...prefetchHandlers,
          href: (isSpaLink ? maskedHref : void 0) || parsed.absoluteURL || href,
          onClick: isSpaLink ? handleClick : onClick,
          ref: mergeRefs(forwardedRef, prefetchRef),
          target,
          "data-discover": !isAbsolute && discover === "render" ? "true" : void 0
        }
      )
    );
    return shouldPrefetch && !isAbsolute ? /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, link, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(PrefetchPageLinks, { page: href })) : link;
  }
);
Link.displayName = "Link";
var NavLink = react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(
  function NavLinkWithRef({
    "aria-current": ariaCurrentProp = "page",
    caseSensitive = false,
    className: classNameProp = "",
    end = false,
    style: styleProp,
    to,
    viewTransition,
    children,
    ...rest
  }, ref) {
    let path = useResolvedPath(to, { relative: rest.relative });
    let location = useLocation();
    let routerState = react__WEBPACK_IMPORTED_MODULE_0__.useContext(DataRouterStateContext);
    let { navigator, basename } = react__WEBPACK_IMPORTED_MODULE_0__.useContext(NavigationContext);
    let isTransitioning = routerState != null && // Conditional usage is OK here because the usage of a data router is static
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useViewTransitionState(path) && viewTransition === true;
    let toPathname = navigator.encodeLocation ? navigator.encodeLocation(path).pathname : path.pathname;
    let locationPathname = location.pathname;
    let nextLocationPathname = routerState && routerState.navigation && routerState.navigation.location ? routerState.navigation.location.pathname : null;
    if (!caseSensitive) {
      locationPathname = locationPathname.toLowerCase();
      nextLocationPathname = nextLocationPathname ? nextLocationPathname.toLowerCase() : null;
      toPathname = toPathname.toLowerCase();
    }
    if (nextLocationPathname && basename) {
      nextLocationPathname = stripBasename(nextLocationPathname, basename) || nextLocationPathname;
    }
    const endSlashPosition = toPathname !== "/" && toPathname.endsWith("/") ? toPathname.length - 1 : toPathname.length;
    let isActive = locationPathname === toPathname || !end && locationPathname.startsWith(toPathname) && locationPathname.charAt(endSlashPosition) === "/";
    let isPending = nextLocationPathname != null && (nextLocationPathname === toPathname || !end && nextLocationPathname.startsWith(toPathname) && nextLocationPathname.charAt(toPathname.length) === "/");
    let renderProps = {
      isActive,
      isPending,
      isTransitioning
    };
    let ariaCurrent = isActive ? ariaCurrentProp : void 0;
    let className;
    if (typeof classNameProp === "function") {
      className = classNameProp(renderProps);
    } else {
      className = [
        classNameProp,
        isActive ? "active" : null,
        isPending ? "pending" : null,
        isTransitioning ? "transitioning" : null
      ].filter(Boolean).join(" ");
    }
    let style = typeof styleProp === "function" ? styleProp(renderProps) : styleProp;
    return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
      Link,
      {
        ...rest,
        "aria-current": ariaCurrent,
        className,
        ref,
        style,
        to,
        viewTransition
      },
      typeof children === "function" ? children(renderProps) : children
    );
  }
);
NavLink.displayName = "NavLink";
var Form = react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(
  ({
    discover = "render",
    fetcherKey,
    navigate,
    reloadDocument,
    replace: replace2,
    state,
    method = defaultMethod,
    action,
    onSubmit,
    relative,
    preventScrollReset,
    viewTransition,
    defaultShouldRevalidate,
    ...props
  }, forwardedRef) => {
    let { useTransitions } = react__WEBPACK_IMPORTED_MODULE_0__.useContext(NavigationContext);
    let submit = useSubmit();
    let formAction = useFormAction(action, { relative });
    let formMethod = method.toLowerCase() === "get" ? "get" : "post";
    let isAbsolute = typeof action === "string" && ABSOLUTE_URL_REGEX.test(action);
    let submitHandler = (event) => {
      onSubmit && onSubmit(event);
      if (event.defaultPrevented) return;
      event.preventDefault();
      let submitter = event.nativeEvent.submitter;
      let submitMethod = submitter?.getAttribute("formmethod") || method;
      let doSubmit = () => submit(submitter || event.currentTarget, {
        fetcherKey,
        method: submitMethod,
        navigate,
        replace: replace2,
        state,
        relative,
        preventScrollReset,
        viewTransition,
        defaultShouldRevalidate
      });
      if (useTransitions && navigate !== false) {
        react__WEBPACK_IMPORTED_MODULE_0__.startTransition(() => doSubmit());
      } else {
        doSubmit();
      }
    };
    return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
      "form",
      {
        ref: forwardedRef,
        method: formMethod,
        action: formAction,
        onSubmit: reloadDocument ? onSubmit : submitHandler,
        ...props,
        "data-discover": !isAbsolute && discover === "render" ? "true" : void 0
      }
    );
  }
);
Form.displayName = "Form";
function ScrollRestoration({
  getKey,
  storageKey,
  ...props
}) {
  let remixContext = react__WEBPACK_IMPORTED_MODULE_0__.useContext(FrameworkContext);
  let { basename } = react__WEBPACK_IMPORTED_MODULE_0__.useContext(NavigationContext);
  let location = useLocation();
  let matches = useMatches();
  useScrollRestoration({ getKey, storageKey });
  let ssrKey = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(
    () => {
      if (!remixContext || !getKey) return null;
      let userKey = getScrollRestorationKey(
        location,
        matches,
        basename,
        getKey
      );
      return userKey !== location.key ? userKey : null;
    },
    // Nah, we only need this the first time for the SSR render
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  if (!remixContext || remixContext.isSpaMode) {
    return null;
  }
  let restoreScroll = ((storageKey2, restoreKey) => {
    if (!window.history.state || !window.history.state.key) {
      let key = Math.random().toString(32).slice(2);
      window.history.replaceState({ key }, "");
    }
    try {
      let positions = JSON.parse(sessionStorage.getItem(storageKey2) || "{}");
      let storedY = positions[restoreKey || window.history.state.key];
      if (typeof storedY === "number") {
        window.scrollTo(0, storedY);
      }
    } catch (error) {
      console.error(error);
      sessionStorage.removeItem(storageKey2);
    }
  }).toString();
  if (props.nonce == null && remixContext?.nonce) {
    props.nonce = remixContext.nonce;
  }
  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
    "script",
    {
      ...props,
      suppressHydrationWarning: true,
      dangerouslySetInnerHTML: {
        __html: `(${restoreScroll})(${escapeHtml(
          JSON.stringify(storageKey || SCROLL_RESTORATION_STORAGE_KEY)
        )}, ${escapeHtml(JSON.stringify(ssrKey))})`
      }
    }
  );
}
ScrollRestoration.displayName = "ScrollRestoration";
function getDataRouterConsoleError2(hookName) {
  return `${hookName} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function useDataRouterContext3(hookName) {
  let ctx = react__WEBPACK_IMPORTED_MODULE_0__.useContext(DataRouterContext);
  invariant(ctx, getDataRouterConsoleError2(hookName));
  return ctx;
}
function useDataRouterState2(hookName) {
  let state = react__WEBPACK_IMPORTED_MODULE_0__.useContext(DataRouterStateContext);
  invariant(state, getDataRouterConsoleError2(hookName));
  return state;
}
function useLinkClickHandler(to, {
  target,
  replace: replaceProp,
  mask,
  state,
  preventScrollReset,
  relative,
  viewTransition,
  defaultShouldRevalidate,
  useTransitions
} = {}) {
  let navigate = useNavigate();
  let location = useLocation();
  let path = useResolvedPath(to, { relative });
  return react__WEBPACK_IMPORTED_MODULE_0__.useCallback(
    (event) => {
      if (shouldProcessLinkClick(event, target)) {
        event.preventDefault();
        let replace2 = replaceProp !== void 0 ? replaceProp : createPath(location) === createPath(path);
        let doNavigate = () => navigate(to, {
          replace: replace2,
          mask,
          state,
          preventScrollReset,
          relative,
          viewTransition,
          defaultShouldRevalidate
        });
        if (useTransitions) {
          react__WEBPACK_IMPORTED_MODULE_0__.startTransition(() => doNavigate());
        } else {
          doNavigate();
        }
      }
    },
    [
      location,
      navigate,
      path,
      replaceProp,
      mask,
      state,
      target,
      to,
      preventScrollReset,
      relative,
      viewTransition,
      defaultShouldRevalidate,
      useTransitions
    ]
  );
}
function useSearchParams(defaultInit) {
  warning(
    typeof URLSearchParams !== "undefined",
    `You cannot use the \`useSearchParams\` hook in a browser that does not support the URLSearchParams API. If you need to support Internet Explorer 11, we recommend you load a polyfill such as https://github.com/ungap/url-search-params.`
  );
  let defaultSearchParamsRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(createSearchParams(defaultInit));
  let hasSetSearchParamsRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(false);
  let location = useLocation();
  let searchParams = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(
    () => (
      // Only merge in the defaults if we haven't yet called setSearchParams.
      // Once we call that we want those to take precedence, otherwise you can't
      // remove a param with setSearchParams({}) if it has an initial value
      getSearchParamsForLocation(
        location.search,
        hasSetSearchParamsRef.current ? null : defaultSearchParamsRef.current
      )
    ),
    [location.search]
  );
  let navigate = useNavigate();
  let setSearchParams = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(
    (nextInit, navigateOptions) => {
      const newSearchParams = createSearchParams(
        typeof nextInit === "function" ? nextInit(new URLSearchParams(searchParams)) : nextInit
      );
      hasSetSearchParamsRef.current = true;
      navigate("?" + newSearchParams, navigateOptions);
    },
    [navigate, searchParams]
  );
  return [searchParams, setSearchParams];
}
var fetcherId = 0;
var getUniqueFetcherId = () => `__${String(++fetcherId)}__`;
function useSubmit() {
  let { router } = useDataRouterContext3("useSubmit" /* UseSubmit */);
  let { basename } = react__WEBPACK_IMPORTED_MODULE_0__.useContext(NavigationContext);
  let currentRouteId = useRouteId();
  let routerFetch = router.fetch;
  let routerNavigate = router.navigate;
  return react__WEBPACK_IMPORTED_MODULE_0__.useCallback(
    async (target, options = {}) => {
      let { action, method, encType, formData, body } = getFormSubmissionInfo(
        target,
        basename
      );
      if (options.navigate === false) {
        let key = options.fetcherKey || getUniqueFetcherId();
        await routerFetch(key, currentRouteId, options.action || action, {
          defaultShouldRevalidate: options.defaultShouldRevalidate,
          preventScrollReset: options.preventScrollReset,
          formData,
          body,
          formMethod: options.method || method,
          formEncType: options.encType || encType,
          flushSync: options.flushSync
        });
      } else {
        await routerNavigate(options.action || action, {
          defaultShouldRevalidate: options.defaultShouldRevalidate,
          preventScrollReset: options.preventScrollReset,
          formData,
          body,
          formMethod: options.method || method,
          formEncType: options.encType || encType,
          replace: options.replace,
          state: options.state,
          fromRouteId: currentRouteId,
          flushSync: options.flushSync,
          viewTransition: options.viewTransition
        });
      }
    },
    [routerFetch, routerNavigate, basename, currentRouteId]
  );
}
function useFormAction(action, { relative } = {}) {
  let { basename } = react__WEBPACK_IMPORTED_MODULE_0__.useContext(NavigationContext);
  let routeContext = react__WEBPACK_IMPORTED_MODULE_0__.useContext(RouteContext);
  invariant(routeContext, "useFormAction must be used inside a RouteContext");
  let [match] = routeContext.matches.slice(-1);
  let path = { ...useResolvedPath(action ? action : ".", { relative }) };
  let location = useLocation();
  if (action == null) {
    path.search = location.search;
    let params = new URLSearchParams(path.search);
    let indexValues = params.getAll("index");
    let hasNakedIndexParam = indexValues.some((v) => v === "");
    if (hasNakedIndexParam) {
      params.delete("index");
      indexValues.filter((v) => v).forEach((v) => params.append("index", v));
      let qs = params.toString();
      path.search = qs ? `?${qs}` : "";
    }
  }
  if ((!action || action === ".") && match.route.index) {
    path.search = path.search ? path.search.replace(/^\?/, "?index&") : "?index";
  }
  if (basename !== "/") {
    path.pathname = path.pathname === "/" ? basename : joinPaths([basename, path.pathname]);
  }
  return createPath(path);
}
function useFetcher({
  key
} = {}) {
  let { router } = useDataRouterContext3("useFetcher" /* UseFetcher */);
  let state = useDataRouterState2("useFetcher" /* UseFetcher */);
  let fetcherData = react__WEBPACK_IMPORTED_MODULE_0__.useContext(FetchersContext);
  let route = react__WEBPACK_IMPORTED_MODULE_0__.useContext(RouteContext);
  let routeId = route.matches[route.matches.length - 1]?.route.id;
  invariant(fetcherData, `useFetcher must be used inside a FetchersContext`);
  invariant(route, `useFetcher must be used inside a RouteContext`);
  invariant(
    routeId != null,
    `useFetcher can only be used on routes that contain a unique "id"`
  );
  let defaultKey = react__WEBPACK_IMPORTED_MODULE_0__.useId();
  let [fetcherKey, setFetcherKey] = react__WEBPACK_IMPORTED_MODULE_0__.useState(key || defaultKey);
  if (key && key !== fetcherKey) {
    setFetcherKey(key);
  }
  let { deleteFetcher, getFetcher, resetFetcher, fetch: routerFetch } = router;
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    getFetcher(fetcherKey);
    return () => deleteFetcher(fetcherKey);
  }, [deleteFetcher, getFetcher, fetcherKey]);
  let load = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(
    async (href, opts) => {
      invariant(routeId, "No routeId available for fetcher.load()");
      await routerFetch(fetcherKey, routeId, href, opts);
    },
    [fetcherKey, routeId, routerFetch]
  );
  let submitImpl = useSubmit();
  let submit = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(
    async (target, opts) => {
      await submitImpl(target, {
        ...opts,
        navigate: false,
        fetcherKey
      });
    },
    [fetcherKey, submitImpl]
  );
  let reset = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(
    (opts) => resetFetcher(fetcherKey, opts),
    [resetFetcher, fetcherKey]
  );
  let FetcherForm = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => {
    let FetcherForm2 = react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(
      (props, ref) => {
        return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(Form, { ...props, navigate: false, fetcherKey, ref });
      }
    );
    FetcherForm2.displayName = "fetcher.Form";
    return FetcherForm2;
  }, [fetcherKey]);
  let fetcher = state.fetchers.get(fetcherKey) || IDLE_FETCHER;
  let data2 = fetcherData.get(fetcherKey);
  let fetcherWithComponents = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(
    () => ({
      Form: FetcherForm,
      submit,
      load,
      reset,
      ...fetcher,
      data: data2
    }),
    [FetcherForm, submit, load, reset, fetcher, data2]
  );
  return fetcherWithComponents;
}
function useFetchers() {
  let state = useDataRouterState2("useFetchers" /* UseFetchers */);
  return react__WEBPACK_IMPORTED_MODULE_0__.useMemo(
    () => Array.from(state.fetchers.entries()).map(([key, fetcher]) => ({
      ...fetcher,
      key
    })),
    [state.fetchers]
  );
}
var SCROLL_RESTORATION_STORAGE_KEY = "react-router-scroll-positions";
var savedScrollPositions = {};
function getScrollRestorationKey(location, matches, basename, getKey) {
  let key = null;
  if (getKey) {
    if (basename !== "/") {
      key = getKey(
        {
          ...location,
          pathname: stripBasename(location.pathname, basename) || location.pathname
        },
        matches
      );
    } else {
      key = getKey(location, matches);
    }
  }
  if (key == null) {
    key = location.key;
  }
  return key;
}
function useScrollRestoration({
  getKey,
  storageKey
} = {}) {
  let { router } = useDataRouterContext3("useScrollRestoration" /* UseScrollRestoration */);
  let { restoreScrollPosition, preventScrollReset } = useDataRouterState2(
    "useScrollRestoration" /* UseScrollRestoration */
  );
  let { basename } = react__WEBPACK_IMPORTED_MODULE_0__.useContext(NavigationContext);
  let location = useLocation();
  let matches = useMatches();
  let navigation = useNavigation();
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    window.history.scrollRestoration = "manual";
    return () => {
      window.history.scrollRestoration = "auto";
    };
  }, []);
  usePageHide(
    react__WEBPACK_IMPORTED_MODULE_0__.useCallback(() => {
      if (navigation.state === "idle") {
        let key = getScrollRestorationKey(location, matches, basename, getKey);
        savedScrollPositions[key] = window.scrollY;
      }
      try {
        sessionStorage.setItem(
          storageKey || SCROLL_RESTORATION_STORAGE_KEY,
          JSON.stringify(savedScrollPositions)
        );
      } catch (error) {
        warning(
          false,
          `Failed to save scroll positions in sessionStorage, <ScrollRestoration /> will not work properly (${error}).`
        );
      }
      window.history.scrollRestoration = "auto";
    }, [navigation.state, getKey, basename, location, matches, storageKey])
  );
  if (typeof document !== "undefined") {
    react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect(() => {
      try {
        let sessionPositions = sessionStorage.getItem(
          storageKey || SCROLL_RESTORATION_STORAGE_KEY
        );
        if (sessionPositions) {
          savedScrollPositions = JSON.parse(sessionPositions);
        }
      } catch (e) {
      }
    }, [storageKey]);
    react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect(() => {
      let disableScrollRestoration = router?.enableScrollRestoration(
        savedScrollPositions,
        () => window.scrollY,
        getKey ? (location2, matches2) => getScrollRestorationKey(location2, matches2, basename, getKey) : void 0
      );
      return () => disableScrollRestoration && disableScrollRestoration();
    }, [router, basename, getKey]);
    react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect(() => {
      if (restoreScrollPosition === false) {
        return;
      }
      if (typeof restoreScrollPosition === "number") {
        window.scrollTo(0, restoreScrollPosition);
        return;
      }
      try {
        if (location.hash) {
          let el = document.getElementById(
            decodeURIComponent(location.hash.slice(1))
          );
          if (el) {
            el.scrollIntoView();
            return;
          }
        }
      } catch {
        warning(
          false,
          `"${location.hash.slice(
            1
          )}" is not a decodable element ID. The view will not scroll to it.`
        );
      }
      if (preventScrollReset === true) {
        return;
      }
      window.scrollTo(0, 0);
    }, [location, restoreScrollPosition, preventScrollReset]);
  }
}
function useBeforeUnload(callback, options) {
  let { capture } = options || {};
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    let opts = capture != null ? { capture } : void 0;
    window.addEventListener("beforeunload", callback, opts);
    return () => {
      window.removeEventListener("beforeunload", callback, opts);
    };
  }, [callback, capture]);
}
function usePageHide(callback, options) {
  let { capture } = options || {};
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    let opts = capture != null ? { capture } : void 0;
    window.addEventListener("pagehide", callback, opts);
    return () => {
      window.removeEventListener("pagehide", callback, opts);
    };
  }, [callback, capture]);
}
function usePrompt({
  when,
  message
}) {
  let blocker = useBlocker(when);
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    if (blocker.state === "blocked") {
      let proceed = window.confirm(message);
      if (proceed) {
        setTimeout(blocker.proceed, 0);
      } else {
        blocker.reset();
      }
    }
  }, [blocker, message]);
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    if (blocker.state === "blocked" && !when) {
      blocker.reset();
    }
  }, [blocker, when]);
}
function useViewTransitionState(to, { relative } = {}) {
  let vtContext = react__WEBPACK_IMPORTED_MODULE_0__.useContext(ViewTransitionContext);
  invariant(
    vtContext != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
  );
  let { basename } = useDataRouterContext3(
    "useViewTransitionState" /* useViewTransitionState */
  );
  let path = useResolvedPath(to, { relative });
  if (!vtContext.isTransitioning) {
    return false;
  }
  let currentPath = stripBasename(vtContext.currentLocation.pathname, basename) || vtContext.currentLocation.pathname;
  let nextPath = stripBasename(vtContext.nextLocation.pathname, basename) || vtContext.nextLocation.pathname;
  return matchPath(path.pathname, nextPath) != null || matchPath(path.pathname, currentPath) != null;
}

// lib/dom/server.tsx
;
function StaticRouter({
  basename,
  children,
  location: locationProp = "/"
}) {
  if (typeof locationProp === "string") {
    locationProp = parsePath(locationProp);
  }
  let action = "POP" /* Pop */;
  let location = {
    pathname: locationProp.pathname || "/",
    search: locationProp.search || "",
    hash: locationProp.hash || "",
    state: locationProp.state != null ? locationProp.state : null,
    key: locationProp.key || "default",
    mask: void 0
  };
  let staticNavigator = getStatelessNavigator();
  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
    Router,
    {
      basename,
      children,
      location,
      navigationType: action,
      navigator: staticNavigator,
      static: true,
      useTransitions: false
    }
  );
}
function StaticRouterProvider({
  context,
  router,
  hydrate: hydrate2 = true,
  nonce
}) {
  invariant(
    router && context,
    "You must provide `router` and `context` to <StaticRouterProvider>"
  );
  let dataRouterContext = {
    router,
    navigator: getStatelessNavigator(),
    static: true,
    staticContext: context,
    basename: context.basename || "/"
  };
  let fetchersContext = /* @__PURE__ */ new Map();
  let hydrateScript = "";
  if (hydrate2 !== false) {
    let data2 = {
      loaderData: context.loaderData,
      actionData: context.actionData,
      errors: serializeErrors(context.errors)
    };
    let json = escapeHtml(JSON.stringify(JSON.stringify(data2)));
    hydrateScript = `window.__staticRouterHydrationData = JSON.parse(${json});`;
  }
  let { state } = dataRouterContext.router;
  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(DataRouterContext.Provider, { value: dataRouterContext }, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(DataRouterStateContext.Provider, { value: state }, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(FetchersContext.Provider, { value: fetchersContext }, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(ViewTransitionContext.Provider, { value: { isTransitioning: false } }, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
    Router,
    {
      basename: dataRouterContext.basename,
      location: state.location,
      navigationType: state.historyAction,
      navigator: dataRouterContext.navigator,
      static: dataRouterContext.static,
      useTransitions: false
    },
    /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
      DataRoutes2,
      {
        manifest: router.manifest,
        routes: router.routes,
        future: router.future,
        state,
        isStatic: true
      }
    )
  ))))), hydrateScript ? /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
    "script",
    {
      suppressHydrationWarning: true,
      nonce,
      dangerouslySetInnerHTML: { __html: hydrateScript }
    }
  ) : null);
}
function serializeErrors(errors) {
  if (!errors) return null;
  let entries = Object.entries(errors);
  let serialized = {};
  for (let [key, val] of entries) {
    if (isRouteErrorResponse(val)) {
      serialized[key] = { ...val, __type: "RouteErrorResponse" };
    } else if (val instanceof Error) {
      serialized[key] = {
        message: val.message,
        __type: "Error",
        // If this is a subclass (i.e., ReferenceError), send up the type so we
        // can re-create the same type during hydration.
        ...val.name !== "Error" ? {
          __subType: val.name
        } : {}
      };
    } else {
      serialized[key] = val;
    }
  }
  return serialized;
}
function getStatelessNavigator() {
  return {
    createHref,
    encodeLocation,
    push(to) {
      throw new Error(
        `You cannot use navigator.push() on the server because it is a stateless environment. This error was probably triggered when you did a \`navigate(${JSON.stringify(to)})\` somewhere in your app.`
      );
    },
    replace(to) {
      throw new Error(
        `You cannot use navigator.replace() on the server because it is a stateless environment. This error was probably triggered when you did a \`navigate(${JSON.stringify(to)}, { replace: true })\` somewhere in your app.`
      );
    },
    go(delta) {
      throw new Error(
        `You cannot use navigator.go() on the server because it is a stateless environment. This error was probably triggered when you did a \`navigate(${delta})\` somewhere in your app.`
      );
    },
    back() {
      throw new Error(
        `You cannot use navigator.back() on the server because it is a stateless environment.`
      );
    },
    forward() {
      throw new Error(
        `You cannot use navigator.forward() on the server because it is a stateless environment.`
      );
    }
  };
}
function createStaticHandler2(routes, opts) {
  return createStaticHandler(routes, {
    ...opts,
    mapRouteProperties
  });
}
function createStaticRouter(routes, context, opts = {}) {
  let manifest = {};
  let dataRoutes = convertRoutesToDataRoutes(
    routes,
    mapRouteProperties,
    void 0,
    manifest
  );
  let matches = context.matches.map((match) => {
    let route = manifest[match.route.id] || match.route;
    return {
      ...match,
      route
    };
  });
  let msg = (method) => `You cannot use router.${method}() on the server because it is a stateless environment`;
  return {
    get basename() {
      return context.basename;
    },
    get future() {
      return {
        v8_middleware: false,
        v8_passThroughRequests: false,
        v8_trailingSlashAwareDataRequests: false,
        ...opts?.future
      };
    },
    get state() {
      return {
        historyAction: "POP" /* Pop */,
        location: context.location,
        matches,
        loaderData: context.loaderData,
        actionData: context.actionData,
        errors: context.errors,
        initialized: true,
        renderFallback: false,
        navigation: IDLE_NAVIGATION,
        restoreScrollPosition: null,
        preventScrollReset: false,
        revalidation: "idle",
        fetchers: /* @__PURE__ */ new Map(),
        blockers: /* @__PURE__ */ new Map()
      };
    },
    get routes() {
      return dataRoutes;
    },
    get branches() {
      return opts.branches;
    },
    get manifest() {
      return manifest;
    },
    get window() {
      return void 0;
    },
    initialize() {
      throw msg("initialize");
    },
    subscribe() {
      throw msg("subscribe");
    },
    enableScrollRestoration() {
      throw msg("enableScrollRestoration");
    },
    navigate() {
      throw msg("navigate");
    },
    fetch() {
      throw msg("fetch");
    },
    revalidate() {
      throw msg("revalidate");
    },
    createHref,
    encodeLocation,
    getFetcher() {
      return IDLE_FETCHER;
    },
    deleteFetcher() {
      throw msg("deleteFetcher");
    },
    resetFetcher() {
      throw msg("resetFetcher");
    },
    dispose() {
      throw msg("dispose");
    },
    getBlocker() {
      return IDLE_BLOCKER;
    },
    deleteBlocker() {
      throw msg("deleteBlocker");
    },
    patchRoutes() {
      throw msg("patchRoutes");
    },
    _internalFetchControllers: /* @__PURE__ */ new Map(),
    _internalSetRoutes() {
      throw msg("_internalSetRoutes");
    },
    _internalSetStateDoNotUseOrYouWillBreakYourApp() {
      throw msg("_internalSetStateDoNotUseOrYouWillBreakYourApp");
    }
  };
}
function createHref(to) {
  return typeof to === "string" ? to : createPath(to);
}
function encodeLocation(to) {
  let href = typeof to === "string" ? to : createPath(to);
  href = href.replace(/ $/, "%20");
  let encoded = ABSOLUTE_URL_REGEX.test(href) ? new URL(href) : new URL(href, "http://localhost");
  return {
    pathname: encoded.pathname,
    search: encoded.search,
    hash: encoded.hash
  };
}




/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	const __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		const cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		const module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			const e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			const getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/create fake namespace object */
/******/ 	(() => {
/******/ 		const getProto = Object.getPrototypeOf ? (obj) => (Object.getPrototypeOf(obj)) : (obj) => (obj.__proto__);
/******/ 		let leafPrototypes;
/******/ 		// create a fake namespace object
/******/ 		// mode & 1: value is a module id, require it
/******/ 		// mode & 2: merge all properties of value into the ns
/******/ 		// mode & 4: return value when already ns object
/******/ 		// mode & 16: return value when it's Promise-like
/******/ 		// mode & 8|1: behave like require
/******/ 		__webpack_require__.t = function(value, mode) {
/******/ 			if(mode & 1) value = this(value);
/******/ 			if(mode & 8) return value;
/******/ 			if(typeof value === 'object' && value) {
/******/ 				if((mode & 4) && value.__esModule) return value;
/******/ 				if((mode & 16) && typeof value.then === 'function') return value;
/******/ 			}
/******/ 			const ns = Object.create(null);
/******/ 			__webpack_require__.r(ns);
/******/ 			const def = {};
/******/ 			leafPrototypes = leafPrototypes || [null, getProto({}), getProto([]), getProto(getProto)];
/******/ 			for(var current = mode & 2 && value; (typeof current == 'object' || typeof current == 'function') && !~leafPrototypes.indexOf(current); current = getProto(current)) {
/******/ 				Object.getOwnPropertyNames(current).forEach((key) => (def[key] = () => (value[key])));
/******/ 			}
/******/ 			def['default'] = () => (value);
/******/ 			__webpack_require__.d(ns, def);
/******/ 			return ns;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter/value functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			if(Array.isArray(definition)) {
/******/ 				var i = 0;
/******/ 				while(i < definition.length) {
/******/ 					var key = definition[i++];
/******/ 					var binding = definition[i++];
/******/ 					if(!__webpack_require__.o(exports, key)) {
/******/ 						if(binding === 0) {
/******/ 							Object.defineProperty(exports, key, { enumerable: true, value: definition[i++] });
/******/ 						} else {
/******/ 							Object.defineProperty(exports, key, { enumerable: true, get: binding });
/******/ 						}
/******/ 					} else if(binding === 0) { i++; }
/******/ 				}
/******/ 			} else {
/******/ 				for(var key in definition) {
/******/ 					if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 						Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.hasOwn(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
let __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!***********************!*\
  !*** ./src/index.tsx ***!
  \***********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/dom-ready */ "@wordpress/dom-ready");
/* harmony import */ var _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_App__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/App */ "./src/components/App.tsx");
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./index.scss */ "./src/index.scss");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__);





_wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_0___default()(() => {
  const root = document.getElementById('clypper-rbp-app');
  if (!root) return;
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createRoot)(root).render(/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_components_App__WEBPACK_IMPORTED_MODULE_2__["default"], {}));
});
})();

/******/ })()
;
//# sourceMappingURL=index.js.map