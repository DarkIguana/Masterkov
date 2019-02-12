<?php
class fullsearch {
	var $over = '';
	var $cats = array ();
	function __construct() {
		$sql = mysql_query ( "select `id`, `name`, `photo` from `shop_cat` where `parentId`='0' and LENGTH(`photo`)>0 order by `pos` asc" );
		if (is_resource ( $sql ) && mysql_num_rows ( $sql ) > 0) {
			while ( ($row = mysql_fetch_assoc ( $sql )) != false ) {
				if (file_exists ( 'files/shop/' . $row ['photo'] )) {
					$this->cats [$row ['name']] = array ();
					$this->loadChild ( $row ['id'], $row ['name'] );
				}
			}
		}
		$opt = '';
		foreach ( $this->cats as $group => $options ) {
			$opt .= '<optgroup label="' . htmlspecialchars ( $group ) . '">';
			foreach ( $options as $id => $name ) {
				$opt .= '<option value="'.$id.'">'.$name.'</option>';
			}
			$opt .= '</optgroup>';
		}
		$this->over = '<form action="/shop-search.html" id="fullsearch" method="get">
				<fieldset>
					<select size="1" name="category">
				     <option value="-1">категория</option>		
						'.$opt.'
					</select>
					<select size="1" name="price">
						<option value="0">цена</option>		
						<option value="1">от 0 до 1000</option>
						<option value="2">от 1000 до 3000</option>
						<option value="3">от 3000 до 8000</option>
					</select>
				</fieldset>
			</form><img src="template/default/img/btn105a.gif" onclick="document.getElementById(\'fullsearch\').submit();" alt="" class="btn105a" />';
	}
	function loadChild($id, $group = '') {
		$out = '';
		$sql = mysql_query ( "select `id`, `name` from `shop_cat` where `parentId`='{$id}' order by `pos`" );
		if (is_resource ( $sql ) && mysql_num_rows ( $sql ) > 0) {
			
			while ( ($row = mysql_fetch_assoc ( $sql )) != false ) {
				$this->cats [$group] [$row ['id']] = $row ['name'];
			}
		
		}
		return $out;
	}
}
