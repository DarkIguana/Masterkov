<?php
class wdg_cart {
	var $over = '';
	function __construct() {
		$qty = 0;
		$total = isset($_SESSION['total'])?number_format($_SESSION['total'],0, ' ', ' '):'0';
		if (isset($_SESSION['cart']) && count($_SESSION['cart'])>0){
			foreach ($_SESSION['cart'] as $id=>$sizes){
			   
				if (is_array($sizes)){
					foreach ($sizes as $q){
						
						$qty+=$q;
					}
				}
			}
		}
		$this->over = '<ul>
				<li id="qty">Количество: <span id="qty">'.$qty.'</span> '.StringPlural::Plural($qty, array('товар', "товара", "товаров")).'</li>
				<li>Сумма:  <span id="total">'.$total.' руб.</span></li>				
			</ul>';
		if ($qty>0){
			$this->over .='<p id="of"><a href="?cart">Оформить заказ</a></p>';
		}
	}
}




?>
