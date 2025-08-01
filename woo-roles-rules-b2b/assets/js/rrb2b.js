/**
 * @preserve
 * JS Scripts for Roles & Rules B2B for WooCommerce
 * by Consortia AS
 * @package rrb2b/js
 * @endpreserve
 */

(function($) {

	const url = new URL(window.location.href);
	var   tab = url.searchParams.get('tab');

	jQuery(document).ready(function ( $ ) {

		// Check if Bootstrap's tooltip is not present or not properly initialized
		if (typeof $.fn.tooltip === 'undefined' || !$.fn.tooltip.Constructor || !$.fn.tooltip.Constructor.VERSION) {
			// Apply jQuery UI's tooltip if Bootstrap's tooltip is not loaded
			$(document).tooltip();
		}

		// Check if dark mode is enabled
		const body    = $('body');
		var dark_mode = cyp_object.use_dark_mode && cyp_object.use_dark_mode === 'yes' ? true : false;

		if (dark_mode) {
			body.addClass('dark-mode');
		} else {
			body.removeClass('dark-mode');
		}
			
		$('input[name="date_from"]').datepicker();
		$('input[name="date_to"]').datepicker();

		tab = ( null === tab ) ? 'rules' : tab;

		// Rules - General tab
		if ( 'rules' === tab ) {

			$('select[name="reduce_regular_type"]').select2({
				placeholder: 'Select reduction or increase type',
				multiple: false,
				allowClear: true,
				width: '100%'
			});

			$('select[name="coupon"]').select2({
				placeholder: cyp_object.select_coupon,
				multiple: false,
				allowClear: true,
				width: '300px'
			});

			$('#product_filter_role').select2({
				placeholder: cyp_object.filter_by_role,
				multiple: false,
				allowClear: true,
				width: '250px'
			});
			
			$('#select_role_to_add').select2({
				placeholder: cyp_object.select_role,
				multiple: false,
				allowClear: true,
				width: '300px'
			});
			$('#select_role_to_add').val(null).trigger('change');

			$('select[name="reduce_categories"]').select2({
				placeholder: cyp_object.select_categories,
				multiple: true,
				closeOnSelect: false,
				allowClear: true,
				width: '100%'
			});

			//Find categories and select them
			$('select[name="reduce_categories"]').each( function() {
				var id = this.id.split('reduce_categories_list_')[1];
				var hiddenInput = $('#selected_categories_' + id).val();
				if ( hiddenInput ) {
					// Split the string into an array of selected category slugs
					var selectedCategories = hiddenInput.split(',');
		
					// Set the selected options for the current select2 element
					$(this).val(selectedCategories).trigger('change');
				} else {
					$(this).val(null).trigger('change');
				}
			});

			//Update categories (hidden input)
			$('select[name="reduce_categories"]').on('change', function() {
				//Get the id
				var id = this.id.split('reduce_categories_list_')[1];
				// Get all selected categories (as an array of values)
				var selected = $(this).val();

				// Convert the selected categories array to a comma-separated string
				var selectedString = selected ? selected.join(',') : '';
			
				// Update the hidden input with the selected categories
				$('#selected_categories_' + id).val(selectedString);
			});

		}
		
		// Categories tab
		if ( 'categories' === tab ) {

			$('select[name="product_cat_to_add"]').on('change', rrb2bSetSelectedCategories );

			$('select[name="product_cat_to_add"]').select2({
				placeholder: cyp_object.add_categories,
				multiple: true,
				closeOnSelect: false,
				allowClear: true,
				//scrollAfterSelect: false,
				width: '300px'
			});

			$('#category_filter_role').select2({
				placeholder: cyp_object.filter_by_role,
				multiple: false,
				allowClear: true,
				width: '250px'
			});

			$('#copy_category_rule_from').select2({
				placeholder: cyp_object.rule_to_copy,
				multiple: false,
				allowClear: true,
				width: '300px'
			});

			$('#copy_category_rule_to').select2({
				placeholder: cyp_object.rule_destination,
				multiple: true,
				closeOnSelect: false,
				allowClear: true,
				width: '100%'
			});
			
			// Ensure no option is selected initially
			$('#copy_category_rule_from').val(null).trigger('change');
			$('#copy_category_rule_to').val(null).trigger('change');
			$('select[name="product_cat_to_add"]').val(null).trigger('change');
		}

		// Products tab
		if ( 'products' === tab ) {

			var role_id = url.searchParams.get('role');

			if ( role_id ) {
				rrb2b_toggle_div_prod(role_id);
			}
			
			$('.dropdown_product_cat').select2({
				placeholder: cyp_object.add_cat_products,
				multiple: false,
				allowClear: true,
				width: 'resolve'
			});

			$('#product_filter_role').select2({
				placeholder: cyp_object.filter_by_role,
				multiple: false,
				allowClear: true,
				width: '250px'
			});

			$('#copy_product_rule_from').select2({
				placeholder: cyp_object.rule_to_copy,
				multiple: false,
				allowClear: true,
				width: '300px'
			});

			$('#copy_product_rule_to').select2({
				placeholder: cyp_object.rule_destination,
				multiple: true,
				closeOnSelect: false,
				allowClear: true,
				width: '100%'
			});
			
			// Ensure no option is selected initially
			$('#copy_product_rule_from').val(null).trigger('change');
			$('#copy_product_rule_to').val(null).trigger('change');
		}


	});

	function rrb2bCopyCategoryRules() {

		var roles     = [];
		var from_rule = $('#copy_category_rule_from option:selected').val();

		$('#copy_category_rule_to option:selected').each(function(){
			if ( '' !== this.value ) {
				roles.push( this.value );
			}
		});

		//Refesh select2
		$('#copy_category_rule_from').val(null).trigger('change');
		$('#copy_category_rule_to').val(null).trigger('change');

		var nonce_val = $( '#_wpnonce' ).val();
		var json_data = { action: 'rrb2b_copy_rules_to', nonce: nonce_val, type: 'category', from: from_rule, to: roles.toString() };

		$.ajax(
			{
				type: 'POST',
				url: ajaxurl,
				datatype: 'json',
				data: json_data,
				success: function( response ) {
					//console.log( response );
					reloadPage( 200 );
					$('.cas-notice3').show();
				},
				error: function( response ){
					console.log( response );
				}
			}
		);

	}
	window.rrb2bCopyCategoryRules = rrb2bCopyCategoryRules;

	function rrb2bCopyProductRules() {
		var roles     = [];
		var from_rule = $('#copy_product_rule_from option:selected').val();

		$('#copy_product_rule_to option:selected').each(function(){
			if ( '' !== this.value ) {
				roles.push( this.value );
			}
		});

		//Refesh select2
		$('#copy_product_rule_from').val(null).trigger('change');
		$('#copy_product_rule_to').val(null).trigger('change');

		var nonce_val = $( '#_wpnonce' ).val();
		var json_data = { action: 'rrb2b_copy_rules_to', nonce: nonce_val, type: 'product', from: from_rule, to: roles.toString() };

		$.ajax(
			{
				type: 'POST',
				url: ajaxurl,
				datatype: 'json',
				data: json_data,
				success: function( response ) {
					//console.log( response );
					reloadPage( 200 );
					$('.cas-notice3').show();
				},
				error: function( response ){
					console.log( response );
				}
			}
		);
	}
	window.rrb2bCopyProductRules = rrb2bCopyProductRules;

	function rrb2bFindDuplicates( tableName, removeName ) {

		var idOccurrences   = {}; // Object to track occurrences of each ID
		var remove_chk_name = ( 'product' === removeName ) ? 'product_remove' : 'category_remove';
		
		$('#' + tableName + ' tbody tr').each(function() {
			var frm = this.children[0].children[0];
			var id = frm['id'].value;

			// Track occurrences of each ID
			if (idOccurrences[id]) {
				idOccurrences[id].push(frm);
			} else {
				idOccurrences[id] = [frm];
			}
		});

		// Check for duplicates and mark the rows
		for (var id in idOccurrences) {
			if (idOccurrences[id].length > 1) {
				var count = 0;
				idOccurrences[id].forEach(function(frm) {
					if ( count > 0 ) {
						frm[remove_chk_name].checked = true;
						$(frm).closest('tr').addClass('duplicate-row');
					}
					count++;
				});
			}
		}

	}
	window.rrb2bFindDuplicates = function( tableName, removeName ) {
		rrb2bFindDuplicates(tableName,removeName);
	}

	function clearSale( obj ){

		var theForm = $(obj.form)[0];

		theForm['reduce_sale_value'].value = '';
		theForm['date_from'].value = '';
		theForm['date_to'].value = '';
		theForm['reduce_sale_type'].value = '';
		theForm['time_from'].value = '00:00';
		theForm['time_to'].value = '23:59';

	}
	window.clearSale = function(obj){
		clearSale(obj);
	}

	function formChanged( obj ) {

		$('#btn_'+obj).css('color', 'red');
		$('#msg_'+obj).css('display', 'block');
		
	}
	window.formChanged = function(obj){
		formChanged(obj);
	}

	function deleteRule( obj ) {

		var confirm_delete = confirm( $( '#msg-confirm-delete' ).val() );

		if ( confirm_delete === true ) {

			var theForm   = $(obj.form)[0];
			var nonce_val = $( '#_wpnonce' ).val();
			var json_data = { action: 'rrb2b_delete_rule_callback', nonce: nonce_val, role_id: theForm['id'].value };

			sendJson( ajaxurl, json_data );
			
			event.preventDefault();

		}

	}
	window.deleteRule = function(obj){
		deleteRule(obj);
	}

	function sendJson( ajaxurl, json_data ) {

		jQuery.ajax(
			{
				type: 'POST',
				url: ajaxurl,
				datatype: 'json',
				data: json_data,
				success: function( response ) {
					//console.log( response );
					reloadPage( 200 );
				},
				error: function( response ){
					console.log( response );
				}
			}
		);

	}
	window.sendJson = function(ajax, json_data){
		sendJson(ajax, json_data);
	}

	function reloadPage( msec ) {

		setTimeout(
			function() {
				location.reload();
			},
			msec
		);

	}
	window.reloadPage = function(msec){
		reloadPage(msec);
	}

	function findCategoryProducts( id ) {

		var nonce_val = $( '#_wpnonce' ).val();
		var form      = $( "#rrb2b-select-category-" + id );
		var element   = form[0].elements;
		var json_data = { action: 'rrb2b_ajax_get_products_category', nonce: nonce_val, page: element['page'].value, 
							tab: element['tab'].value, category: element['product_cat'].value, 
							id: element['rule-id'].value, variations: element['variations'].checked };
		
		progressBar('start', id);
		
		$.ajax(
			{
				type: 'POST',
				url: ajaxurl,
				datatype: 'json',
				data: json_data,
				success: function( response ) {
					//console.log( response );
					//reloadPage( 300 );
					let newUrl = new URL(window.location.href);
					newUrl.searchParams.set('role', id );
					window.location.href = newUrl.toString();
				},
				error: function( response ){
					console.log( response );
					progressBar('stop', id);
				}
			}
		);	

		event.preventDefault();

	}
	window.findCategoryProducts = function(id){
		findCategoryProducts(id);
	}

	function findProducts( id ) {
		
		var nonce_val = $( '#_wpnonce' ).val();
		var json_data = { action: 'rrb2b_ajax_get_products', nonce: nonce_val, search: '', };
	
		$( "#product_search_" + id ).autocomplete({
			source: function( request, response ) {
				json_data.search = request.term;
				$.ajax( {
					url: ajaxurl,
					data: json_data,
					dataType: "json", 
				
					success: function( data ) {
						response( data );
						//console.log(data);
					}
					
				} );
			},
			minLength: 2,
			select: function( event, ui ) {
				var url = $( '#product_add_' + id ).attr('href');
				$( '#product_add_' + id ).attr('href', url + ui.item.data + '&name=' + ui.item.value);
			}
		});
	}
	window.findProducts = function(id){
		findProducts(id);
	}

	function rrb2b_filter_products( id ) {
		
		var table  = $('#rrb2b_table_'+ id +' tbody tr');
		var filter = $( '#product_filter_'+ id ).val();
		var arr    = [];

		if ( filter.length > 0 ) {
			filter = filter.toLowerCase().replace( ',', '' );
			arr    = filter.split( ' ' );
		}

		table.each(
			function() {
				var textValue = this.children[1].children[1].value;

				if (textValue.length > 0) {
					var txt   = textValue.toLowerCase();
					var count = 0;
					for( var i = 0; i < arr.length; i++ ) {
						if ( txt.match( arr[i] ) ) {
							count++;
						} 
					}
					if ( count === arr.length ) {
						this.style.display = '';
					} else {
						this.style.display = 'none';
					}
				} 
			}
		);	
	}
	window.rrb2b_filter_products = function(id){
		rrb2b_filter_products(id);
	}

	function rrb2b_filter_categories( id ) {
		
		var table  = $('#rrb2b_table_cat_'+ id +' tbody tr');
		var filter = $( '#category_filter_'+ id ).val();
		var arr    = [];

		if ( filter.length > 0 ) {
			filter = filter.toLowerCase().replace( ',', '' );
			arr    = filter.split( ' ' );
		}

		table.each(
			function() {
				var parent    = this.children[0].children[0][3].value;
				var textValue = this.children[0].children[0][1].value;

				if (textValue.length > 0) {
					var txt   = textValue.toLowerCase();
					var count = 0;
					for( var i = 0; i < arr.length; i++ ) {
						if ( txt.match( arr[i] )  || parent.toLowerCase().match( arr[i] ) ) {
							count++;
						} 
					}
					if ( count === arr.length ) {
						this.style.display = '';
					} else {
						this.style.display = 'none';
					}
				} 
			}
		);	
	}
	window.rrb2b_filter_categories = function(id){
		rrb2b_filter_categories(id);
	}

	function updateProducts( id ) {

		var nonce_val = $( '#_wpnonce' ).val();
		var json_data = { action: 'rrb2b_ajax_update_product_rule', rule_id: id, nonce: nonce_val, rows: [] };
		var count     = 0;

		$('#updateButton-'+id).removeClass('button-primary');
		$('.notice-info').hide();

		$( '#rrb2b_table_' + id + ' tbody tr' ).each(
			function() {
				var frm           = this.children[1].children[0];
				var frm_elements  = frm.form.elements;
				var remove_status = frm_elements['product_remove'].checked;

				var frm_data = {
					rule_id: id,
					remove: remove_status,
					product_id: frm_elements['product_id'].value,
					product_name: frm_elements['product_name'].value,
					reduce_type: frm_elements['reduce_regular_type'].value,
					reduce_value: frm_elements['adjust_value'].value,
					reduce_type_qty: frm_elements['reduce_regular_type_qty'].value,
					reduce_value_qty: frm_elements['adjust_value_qty'].value,
					min_qty: frm_elements['min_qty'].value,
					is_variable: frm_elements['variable'].value,
				};
				json_data.rows.push( frm_data );
				count++;
			
				if (remove_status) {
					$(this).hide();
				}
			}

		);

		if ( count > 0 ) {
			
			localStorage.setItem( 'eid', id );
			progressBar('start', id);

			$.ajax(
				{
					type: 'POST',
					url: ajaxurl,
					datatype: 'json',
					data: json_data,
					success: function( response ) {
						//console.log( response );
						//reloadPageArgs( 200 );
						$('#cas-notice-product-changed').show();
						$( '#prod1_'+id ).show();
						$( '#prod2_'+id ).show();
						progressBar('stop', id);
						$('#updateButton-'+id).addClass('button-primary');
					},
					error: function( response ){
						console.log( response );
						progressBar('stop', id);
					}
				}
			);
		}
		

		event.preventDefault();
	}
	window.updateProducts = function(id){
		updateProducts(id);
	}

	function updateSingleCategories( id ) {

		var nonce_val     = $( '#_wpnonce' ).val();
		var json_data     = { action: 'rrb2b_ajax_update_single_category_rule', rule_id: id, nonce: nonce_val, rows: [] };
		var count         = 0;

		$('#updateSingleCatButton-'+id).removeClass('button-primary');
		$('.notice-info').hide();

		$( '#rrb2b_table_cat_' + id + ' tbody tr' ).each(
			function() {
				var frm           = this.children[1].children[0];
				var frm_elements  = frm.form.elements;
				var remove_status = frm_elements['category_remove'].checked;

				var frm_data = { rule_id: id,
					remove: remove_status, id: frm_elements['id'].value, hidden: frm_elements['category_hidden'].checked,
					slug: frm_elements['slug'].value, name: frm_elements['category_name'].value, reduce_type: frm_elements['reduce_regular_type'].value, 
					reduce_value: frm_elements['adjust_value'].value, sale: frm_elements['category_sale'].checked,
					reduce_type_qty: frm_elements['reduce_regular_type_qty'].value,
					reduce_value_qty: frm_elements['adjust_value_qty'].value, min_qty: frm_elements['min_qty'].value,
				};
				json_data.rows.push( frm_data );
				count++;

				if (remove_status) {
					$(this).hide();
				}
			}

		);

		if ( count > 0 ) {
			
			localStorage.setItem( 'eid', id );

			$.ajax(
				{
					type: 'POST',
					url: ajaxurl,
					datatype: 'json',
					data: json_data,
					success: function( response ) {
						//console.log( response );
						//reloadPageArgs( 200 );
						$('#cas-notice-category-changed').show();
						$( '#div_'+id ).show();
						$( '#cat_'+id ).show();
						$('#updateSingleCatButton-'+id).addClass('button-primary');
					},
					error: function( response ){
						console.log( response );
					}
				}
			);
		}
		

		event.preventDefault();

	}
	window.updateSingleCategories = function(id){
		updateSingleCategories(id);
	}

	function reloadPageArgs( msec ) {

		const url = new URL(window.location.href);
		url.searchParams.set('eid', localStorage.getItem('eid'));

		setTimeout(
			function() {
				window.location.href = url.toString();
			},
			msec
		);

	}
	window.reloadPageArgs = function(msec){
		reloadPageArgs(msec);
	}

	function rrb2b_delete_role( role, name ) {

		var nonce_val = $( '#_wpnonce' ).val();
		var json_data = { action: 'rrb2b_delete_role', the_role: role, nonce: nonce_val };

		if (confirm( cyp_object.delete_role_txt + ' ' + name + cyp_object.delete_role_confirm )) {
			$.ajax(
				{
					type: 'POST',
					url: ajaxurl,
					datatype: 'json',
					data: json_data,
					success: function( response ) {
						//console.log( response );
						reloadPage( 100 );
					},
					error: function( response ){
						console.log( response );
					}
				}
			);
		}

		event.preventDefault();
	}
	window.rrb2b_delete_role = function(role,name){
		rrb2b_delete_role(role,name);
	}

	function productFilterByRole() {

		var role_id = $('#product_filter_role :selected').val();
		var url     = window.location.href;

		window.location.href = url + '&filter=' + role_id;

	}
	window.productFilterByRole = productFilterByRole;

	function categoryFilterByRole() {
		
		var role_id = $('#category_filter_role :selected').val();
		var url     = window.location.href;

		window.location.href = url + '&filter=' + role_id;

	}
	window.categoryFilterByRole = categoryFilterByRole;

	function setCheckedCategories( id ) {
		
		var form        = $('#frm_single_categories_' + id)[0];
		var url         = form['rule_url'].value;
		var cats_to_add = [];

		//Get checked categories
		$('#product_cat_to_add_' + id + ' option').each(function(){
			if ('' !== this.value && this.selected) {
				cats_to_add.push( this.value );
			}
		});

		if (cats_to_add.length > 0) {
			$('#categories_add_'+id).attr('href', url + cats_to_add.toString());
		}
		
	}
	window.setCheckedCategories = function(obj){
		setCheckedCategories(obj);
	}

	window.rrb2bSetSelectedCategories = function() {
		var form = $(this).closest('form')[0];
		var id   = form['rule_id'].value;
		var url  = form['rule_url'].value;

		var cats_to_add = [];

		//Get checked categories
		$('#product_cat_to_add_' + id + ' option').each(function(){
			if ('' !== this.value && this.selected) {
				cats_to_add.push( this.value );
			}
		});
		if (cats_to_add.length > 0) {
			$('#categories_add_'+id).attr('href', url + cats_to_add.toString());
		}
	}

	function checkCategories( id ) {

		var form        = $('#frm_single_categories_' + id)[0];
		var url         = form['rule_url'].value;
		var cats_to_add = [];

		//Check all categories
		$('#product_cat_to_add_' + id + ' option').each(function(){
			if('' !== this.value){
				this.selected = true;
				cats_to_add.push( this.value );
			}
		}).trigger('change');

		$('#categories_add_'+id).attr('href', url + cats_to_add.toString());

	}
	window.checkCategories = function(id){
		checkCategories(id);
	}

	function progressBar( option, id ) {
		
		if (option === 'start') {
			$('#rrb2b-saving-'+id).removeClass('rrb2b-saving').addClass('rrb2b-saving-show');
			var v = 0;
			
			setInterval(
				function() {
					if ( v > 100) {
						v = 0;
					}
					$('#pbar-saving-'+id).val(v);
					v += 5;
				},
				50
			);
		} else {
			$('#rrb2b-saving-'+id).removeClass('rrb2b-saving-show').addClass('rrb2b-saving');
		}

	}
	window.progressBar = function(option,id){
		progressBar(option,id);
	}

	function checkForRemove( id, name ) {

		var checked = $('#' + name + '_' + id).prop('checked');
		$('#rrb2b_table_cat_' + id + ' tbody input[name="'+name+'"]').attr('checked', checked);

	}
	window.checkForRemove = function(id,name){
		checkForRemove(id,name);
	}

	function catBulkCheck( id, name, table ) {

		var checked = $('#' + name + '_' + id).prop('checked');
		$('#' + table + '_' + id + ' tbody input[name="'+name+'"]:visible').attr('checked', checked);

	}
	window.catBulkCheck = function(id,name,table){
		catBulkCheck(id,name,table);
	}

	function catBulkSelect( id, name, table ) {

		var selected = $('#' + name + '_' + id + ' :selected').val();

		$('#' + table + '_' + id + ' tbody select[name="'+name+'"]:visible' ).each(function(){
			this.value = selected;
		});

	}
	window.catBulkSelect = function(id,name,table){
		catBulkSelect(id,name,table);
	}

	function catBulkInput( id, name, table ) {

		var inputVal = $('#' + name + '_' + id ).val();

		$('#' + table + '_' + id + ' tbody input[name="'+name+'"]:visible' ).each(function(){
			this.value = inputVal;
		});

	}
	window.catBulkInput = function(id,name,table){
		catBulkInput(id,name,table);
	}

	function genCatCheck( id ) {
		
		var checked     = $('#chk-all-cat_'+id).prop('checked');
		var cats_to_add = [];

		//Check all categories
		$('#reduce_categories_list_' + id + ' option').each(function(){
			if('' !== this.value){
				this.selected = checked;//true;
				checked ? cats_to_add.push( this.value ) : '';
			}
		}).trigger('change');

		$('#selected_categories_'+id).val(cats_to_add.toString());

	}
	window.genCatCheck = function(id){
		genCatCheck(id);
	}

	function rrb2b_show_hidden( id ) {
		
		var listName = $('#'+id)[0].className;
		
		if ( 'rrb2b-collapsible' === listName ) {
			$('#'+id).removeClass('rrb2b-collapsible').addClass('rrb2b-collapsible-show');
			return;
		}
		if ( 'rrb2b-collapsible-show' === listName ) {
			$('#'+id).removeClass('rrb2b-collapsible-show').addClass('rrb2b-collapsible');
			return;
		}
	}
	window.rrb2b_show_hidden = function(id){
		rrb2b_show_hidden(id);
	}

	function rrb2b_toggle_div_cat( id ) {
		$( '#div_'+id ).toggle();
		$( '#cat_'+id ).toggle();
	}
	window.rrb2b_toggle_div_cat = function(id){
		rrb2b_toggle_div_cat(id);
	}

	function rrb2b_toggle_div_prod( id ) {
		$( '#prod1_'+id ).toggle();
		$( '#prod2_'+id ).toggle();
	}
	window.rrb2b_toggle_div_prod = function(id){
		rrb2b_toggle_div_prod(id);
	}

})(jQuery);