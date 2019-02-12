<?
class cart extends glb {
	var $over = "";
	var $user = 0;
	var $sk = 0;
	// var $params = array ('template' => 'basket' );
	function __construct() {
		Breadcrumbs::add ( 'Корзина' );
		BreadcrumbsTitle::set ( 'Корзина' );
		if (isset ( $_SESSION ['user'] ) && isset ( $_SESSION ['uid'] ) && ! empty ( $_SESSION ['user'] ) && ! empty ( $_SESSION ['uid'] ) && is_numeric ( $_SESSION ['uid'] )) {
			$user = ( int ) $_SESSION ['uid'];
			
			$sql = mysql_query ( "select `sk`,`id` from `shop_users` where `id`='$user' limit 1" );
			if (mysql_num_rows ( $sql ) > 0) {
				$row = mysql_fetch_array ( $sql );
				$sk = $row ['sk'];
				$this->user = $row ['id'];
				if ($sk > 0) {
					$this->sk = $sk;
				}
			} else {
				unset ( $_SESSION ['user'] );
				unset ( $_SESSION ['uid'] );
			}
		}
		if (isset ( $_POST ['task'] )) {
			if ($_POST ['task'] == 'updateCart') {
				$itemTotal = 0;
				$_POST ['id'] = ( int ) $_POST ['id'];
				if (isset ( $_SESSION ['cart'] [$_POST ['id']] [$this->encode ( $_POST ['size'] )] )) {
					$_SESSION ['cart'] [$_POST ['id']] [$this->encode ( $_POST ['size'] )] = ( int ) $_POST ['qty'];
					$sql = mysql_query ( "select `price_rozn`, `price_opt` from `shop_items` where `id`='{$_POST['id']}' limit 1" );
					if (is_resource ( $sql ) && mysql_num_rows ( $sql ) > 0) {
						$row = mysql_fetch_assoc ( $sql );
						if ($row ['price_opt'] > 0) {
							$itemTotal = $row ['price_opt'] * $_POST ['qty'];
						} else {
							$itemTotal = $row ['price_rozn'] * $_POST ['qty'];
						}
					}
				}
				$_SESSION ['total'] = $this->price ( $_SESSION ['cart'] );
				$delivery = $this->getDelivery ( $_POST ['delId'] );
				$showDelivery = true;
				
				if ($delivery != false) {
					if ($delivery ['price2'] > 0 && $_SESSION ['total'] >= $delivery ['price2']) {
						$showDelivery = false;
						$_POST ['delivery'] = 0;
					}
				}
				
				echo json_encode ( array (
						"success" => true,
						'priceDel' =>$_POST['delivery'],
						'delivery' => $showDelivery,
						"item" => $this->en ( number_format ( $itemTotal, 0, ' ', ' ' ) . "" ),
						"total" => $this->en ( number_format ( $_SESSION ['total'], 0, ' ', ' ' ) . "" ),
						"totalwith" => $this->en ( number_format ( $_SESSION ['total'] + $_POST ['delivery'], 0, ' ', ' ' ) . "" ) 
				) );
				exit ();
			}
			if ($_POST ['task'] == 'updateAllCart') {
				$itemTotal = 0;
				
				$_SESSION ['total'] = $this->price ( $_SESSION ['cart'] );
				$delivery = $this->getDelivery ( $_POST ['id'] );
				$showDelivery = true;
				if ($delivery != false) {
					if ($delivery ['price2'] > 0 && $_SESSION ['total'] >= $delivery ['price2']) {
						$showDelivery = false;
						$_POST ['delivery'] = 0;
					}
				}
				echo json_encode ( array (
						"success" => true,
						'priceDel' =>$_POST['delivery'],
						'delivery' => $showDelivery,
						"total" => $this->en ( number_format ( $_SESSION ['total'], 0, ' ', ' ' ) . "" ),
						"totalwith" => $this->en ( number_format ( $_SESSION ['total'] + $_POST ['delivery'], 0, ' ', ' ' ) . "" ) 
				) );
				exit ();
			} elseif ($_POST ['task'] == 'deleteCartItem') {
				$_POST ['id'] = ( int ) $_POST ['id'];
				if (isset ( $_SESSION ['cart'] [$_POST ['id']] [$this->encode ( $_POST ['size'] )] )) {
					
					unset ( $_SESSION ['cart'] [$_POST ['id']] [$this->encode ( $_POST ['size'] )] );
					if (count ( $_SESSION ['cart'] [$_POST ['id']] ) == 0) {
						unset ( $_SESSION ['cart'] [$_POST ['id']] );
					}
					$_SESSION ['total'] = $this->price ( $_SESSION ['cart'] );
					$delivery = $this->getDelivery ( $_POST ['id'] );
					$showDelivery = true;
					if ($delivery != false) {
						if ($delivery ['price2'] > 0 && $_SESSION ['total'] >= $delivery ['price2']) {
							$showDelivery = false;
							$_POST ['delivery'] = 0;
						}
					}
					echo json_encode ( array (
							"success" => true,
							'priceDel' =>$_POST['delivery'],
							'delivery' => $showDelivery,
							"total" => $this->en ( number_format ( $_SESSION ['total'], 0, ' ', ' ' ) . "" ),
							"totalwith" => $this->en ( number_format ( $_SESSION ['total'] + $_POST ['delivery'], 0, ' ', ' ' ) . "" ) 
					) );
				} else {
					echo "{failure:true}";
				}
				exit ();
			}
		}
		
		if (isset ( $_POST ['add'] )) {
			$add = $this->addItem ( ( int ) $_POST ['add'] );
			if ($add == false) {
				// print_r($_SESSION);
				if (isset ( $_GET ['ajax'] )) {
					echo "{msg:'',name,'',pr:''}";
				}
				$this->over = 'Товар не найден';
				return false;
			}
		}
		if (isset ( $_GET ['delete'] )) {
			$this->deleteItem ( $_GET ['delete'] );
			header ( "Location:/cart.html" );
		}
		if (isset ( $_GET ['cart'] ) && $_GET ['cart'] == "order") {
			
			$_SESSION ['Road'] .= "Оформление заказа";
			$r = "<div class=\"shopblock text\">";
			$r .= $this->getOrderForm ();
			$r .= "</div>";
			$this->over = $r;
			return true;
		}
		
		$_SESSION ['Road'] .= "Корзина";
		$this->cart ();
	}
	function deleteItem($id) {
		if (isset ( $_SESSION ['cart'] )) {
			if (isset ( $_SESSION ['cart'] [$id] )) {
				unset ( $_SESSION ['cart'] [$id] );
				$_SESSION ['total'] = $this->price ( $_SESSION ['cart'] );
			}
		}
	}
	function getItemImage($row, $mass = 0) {
		if (! empty ( $row ['photo'] ) && file_exists ( "files/shop/$row[photo]" )) {
			if ($mass == 0) {
				return "files/shop/$row[photo]";
			} else {
				return array (
						"min" => "files/shop/$row[photo]",
						"big" => "files/shop/" . str_replace ( "s", "b", $row ['photo'] ) 
				);
			}
		} else {
			$sql = mysql_query ( "select * from `shop_images` where `iditem`='$row[id]'" );
			if (mysql_num_rows ( $sql ) > 0) {
				while ( $row2 = mysql_fetch_array ( $sql ) ) {
					if (file_exists ( "files/shop/s_$row2[id].$row2[photo]" )) {
						if ($mass == 0) {
							return "files/shop/s_$row2[id].$row2[photo]";
						} else {
							return array (
									"id" => $row2 ['id'],
									"min" => "files/shop/s_$row2[id].$row2[photo]",
									"big" => "files/shop/b_$row2[id].$row2[photo]" 
							);
						}
					}
				}
			}
		}
		return false;
	}
	function theCart() {
		if (isset ( $_SESSION ['cart'] )) {
			
			$z = 0;
			$d = "";
			foreach ( $_SESSION ['cart'] as $id => $qty ) {
				$z ++;
				if ($z == 1) {
					$d .= "$id";
				} else {
					$d .= ",$id";
				}
			}
			
			$z = 0;
			
			$sql = "select * from shop_items where id in ($d)";
			$result = mysql_query ( $sql );
			$d = "";
			while ( $row = mysql_fetch_array ( $result ) ) {
				$z ++;
				$pri = number_format ( ($row ['price_rozn'] * $qty) / $qty, 2, ".", "" );
				$tot = number_format ( $pri * $qty, 2, ".", "" );
				$d .= '<tr>
              <td width="56"><img src="' . $this->getItemImage ( $row ) . '" alt="" height="50" width="51"></td>
              <td><p>' . $row ['name'] . '</p>
              <p><strong>' . $qty . 'х' . number_format ( $row ['price_rozn'], "", 0, "" ) . '</strong></p></td>
            </tr>';
			}
			return '<table class="cart_prev" width="150" border="0" cellpadding="0" cellspacing="0"><tbody>
            ' . $d . '
            <tr>
              <td colspan="2"><p class="total">Всего на: <span>' . $_SESSION ['total'] . ' руб.</span></p>

              <p><a href="?cart"><div class="data"><ul><li style="font:bold 11px \'Arial\'"><center>перейти к оформлению</center></li></ul></div></a></p></td>
            </tr>
          </tbody></table>';
		} else {
			return "<p class='total'>Ваша корзина пуста</p>";
		}
	}
	function addItem($id) {
		$new = $id;
		$test = mysql_query ( "select `name` from `shop_items` where `id`='$id'" ) or die ( "{msg:'',name,'',pr:''}" );
		if (mysql_num_rows ( $test ) < '1')
			return false;
		
		$params = array ();
		if (isset ( $_POST ['fullness'] ) && $_POST ['fullness'] != 'false') {
			$params ['fullness'] = $_POST ['fullness'];
		}
		if (isset ( $_POST ['size'] ) && $_POST ['size'] != 'false') {
			$params ['size'] = $_POST ['size'];
		}
		if (isset ( $_POST ['color'] ) && $_POST ['color'] != 'false') {
			$params ['color'] = $this->encode ( $_POST ['color'] );
		}
		if (isset ( $_POST ['style'] ) && $_POST ['style'] != 'false') {
			$params ['style'] = $this->encode ( $_POST ['style'] );
		}
		$params = serialize ( $params );
		$kol = isset ( $_POST ['kol'] ) ? ( int ) $_POST ['kol'] : 1;
		$row = mysql_fetch_array ( $test );
		$size = isset ( $_POST ['size'] ) ? $_POST ['size'] : '';
		if (! isset ( $_SESSION ['cart'] )) {
			$_SESSION ['cart'] = array ();
			$_SESSION ['items'] = 0;
			$_SESSION ['total'] = 0.00;
		}
		if (isset ( $_SESSION ['cart'] [$new] [$params] )) {
			$_SESSION ['cart'] [$new] [$params] += $kol;
			$_SESSION ['total'] = $this->price ( $_SESSION ['cart'] );
		} else {
			$_SESSION ['cart'] [$new] [$params] = 1;
			$_SESSION ['total'] = $this->price ( $_SESSION ['cart'] );
		}
		if (isset ( $_POST ['ajax'] )) {
			$qty = 0;
			$total = isset ( $_SESSION ['total'] ) ? number_format ( $_SESSION ['total'], 0, ' ', ' ' ) : '0';
			if (isset ( $_SESSION ['cart'] ) && count ( $_SESSION ['cart'] ) > 0) {
				foreach ( $_SESSION ['cart'] as $id => $sizes ) {
					
					if (is_array ( $sizes )) {
						foreach ( $sizes as $q ) {
							
							$qty += $q;
						}
					}
				}
			}
			$data = array (
					'total' => $this->en ( $total . " руб." ),
					"qty" => $this->en ( 'Количество: <span id="qty">' . $qty . '</span> ' . StringPlural::Plural ( $qty, array (
							'товар',
							"товара",
							"товаров",
					
					) ) . '' ),'of'=>$this->en('<p id="of"><a href="/cart.html">Оформить заказ</a></p>') 
			);
			exit ( json_encode ( $data ) );
		}
		header ( "Location:/cart.html" );
		return true;
	}
	function getSizes($id) {
		$colors = array ();
		$sql = mysql_query ( "SELECT `shop_sizes`.`name`, `shop_sizes_values`.`store`
				FROM `shop_sizes` , `shop_sizes_values`
				WHERE `shop_sizes_values`.`iditem` = '{$id}'
				AND `shop_sizes`.`id` = `shop_sizes_values`.`value`
				AND `shop_sizes`.`active` = '1'" );
		if (is_resource ( $sql ) && mysql_num_rows ( $sql ) > 0) {
			while ( ($row = mysql_fetch_assoc ( $sql )) != false ) {
				$colors [] = $row ['name'];
			}
		}
		return $colors;
	}
	function getColors($id) {
		$colors = array ();
		$sql = mysql_query ( "SELECT `shop_colors`.`name`
				FROM `shop_colors` , `shop_colors_values`
				WHERE `shop_colors_values`.`iditem` = '{$id}'
				AND `shop_colors`.`id` = `shop_colors_values`.`value`
				AND `shop_colors`.`active` = '1'" );
		if (is_resource ( $sql ) && mysql_num_rows ( $sql ) > 0) {
			while ( ($row = mysql_fetch_assoc ( $sql )) != false ) {
				$colors [] = $row ['name'];
			}
		}
		return $colors;
	}
	function getCountDown($row) {
		$out = '';
		if ($row ['stock'] == 1) {
			$time = @strtotime ( "{$row['dateTo']} {$row['timeTo']}" );
			if ($time > time ()) {
				$year = date ( "Y" );
				$month = date ( "m" ) - 1;
				$day = date ( 'd' );
				$hour = date ( "H" );
				$min = date ( "i" );
				$sec = date ( "s" );
				$ms = ( int ) number_format ( date ( "u" ) / 1000, 0, '', '' );
				
				$year2 = date ( "Y", $time );
				$month2 = date ( "m", $time ) - 1;
				$hour2 = date ( "H", $time );
				$day2 = date ( 'd', $time );
				$minute = date ( "i", $time );
				$out = '
				
					<table class="tbl3">
						<tbody><tr>
							<th colspan="2">На этот товар действует акция</th>
						</tr>
						<tr>
							<td>
								<ul class="countdown" id="Stock' . $row ['id'] . '">
									
								</ul>
							</td>
							<td>
								&nbsp;
							</td>
						</tr>
					</tbody></table>
				
				<script>
				function ahead(){
				return new Date(' . $year . ', ' . $month . ', ' . $day . ', ' . $hour . ',' . $min . ', ' . $sec . ');
			}
			$(document).ready(function(){
			var dd = new Date(' . $year2 . ', ' . $month2 . ', ' . $day2 . ', ' . $hour2 . ',' . $minute . ');
	
			$("#Stock' . $row ['id'] . '").countdown({until:dd,format:\'HMS\',serverSync: ahead, layout: "<li><span>{hn}</span></li><li>:</li><li><span>{mn}</span></li><li>:</li><li><span>{sn}</span></li>"});
			});
	
			</script>';
			}
		}
		return $out;
	}
	function isStockActive($row) {
		if ($row ['stock'] == 1) {
			$time = @strtotime ( "{$row['dateTo']} {$row['timeTo']}" );
			if ($time > time ()) {
				return true;
			}
		}
		return false;
	}
	function cart() {
		global $_SESSION;
		$d = '<div class="basketBlock">
		';
		$fields = array (
				'delivery_price',
				'name',
				'phone',
				'email',
				'index',
				'city',
				'street',
				'house',
				'korpus',
				'podezd',
				'level',
				'kv',
				'obhvati',
				'comment' 
		);
		foreach ( $fields as $fieldName ) {
			
			$$fieldName = isset ( $_POST [$fieldName] ) ? trim ( strip_tags ( $_POST [$fieldName] ) ) : '';
			$$fieldName = str_replace ( "{", "", $$fieldName );
			$$fieldName = str_replace ( "}", "", $$fieldName );
		}
		
		if (isset ( $_GET ['order'] )) {
		} else {
			if (isset ( $_POST ['save'] )) {
				foreach ( $_SESSION ['cart'] as $id => $qty ) {
					if ($_POST [$id] == '0') {
						unset ( $_SESSION ['cart'] [$id] );
					} else
						
						$_SESSION ['cart'] [$id] = $_POST [$id];
				}
				
				$_SESSION ['total'] = $this->price ( $_SESSION ['cart'] );
			}
			if (isset ( $_POST ['delete'] ) && isset ( $_POST ['del'] )) {
				foreach ( $_POST ['del'] as $id ) {
					if (isset ( $_SESSION ['cart'] [$id] )) {
						unset ( $_SESSION ['cart'] [$id] );
					}
				}
				$_SESSION ['total'] = $this->price ( $_SESSION ['cart'] );
			}
			if (isset ( $_SESSION ['cart'] ) && count ( $_SESSION ['cart'] ) > 0) {
				
				if (isset ( $_POST ['order'] )) {
					$req = array (
							'name',
							'phone',
							'email',
							'city',
							'street',
							'kv' 
					);
					$isEmpty = false;
					foreach ( $req as $fieldName ) {
						if (empty ( $$fieldName )) {
							$isEmpty = true;
							break;
						}
					}
					if ($isEmpty == true) {
						$d .= '<script>alert(\'Не заполнены обязательные поля\')</script>';
					} elseif (! preg_match ( "/^[a-z0-9_.-]+@([a-z0-9_]+.)+[a-z]{2,4}$/i", $email )) {
						$d .= '<script>alert(\'Не верно заполнено поле Эл. почта\')</script>';
					} else {
						$id = $this->orderF ();
						$this->over = "<div class=\"shopblock\"><center>Ваш номер заказа: $id<br>Наши менеджеры свяжутся с Вами для подтверждения и согласования перечня заказываемых товаров.<br>
						Обо всех изменениях состояния заказа Вы будете информированы по e-mail.<br>
						</center></div>";
						return true;
					}
				}
				$d .= '
				
	<form method="POST" action="/cart.html" name="order" id="order">
	<input type="hidden" name="order" value="true" />
             <table class="bsk1" width="100%"><tr>
				<th>Арт.</th>
				<th>Фото</th>
				<th style="padding-right: 125px;">Наименование</th>
				<th>Цена</th>				
				<th style="padding: 0pt 50px 0pt 15px;">Кол-во</th>
				<th>Сумма</th>				
				<th>Удалить</th>
			</tr>';
				
				foreach ( $_SESSION ['cart'] as $id => $sizeqty ) {
					
					$sql = "select * from shop_items where id = '$id'";
					
					$result = mysql_query ( $sql );
					$row = mysql_fetch_array ( $result );
					$sizes = implode ( "/", $this->getSizes ( $row ['id'] ) );
					$pri = number_format ( ($row ['price_rozn']), 0, " ", " " );
					$new = number_format ( ($row ['price_opt']), 0, " ", " " );
					
					$colors = implode ( ", ", $this->getColors ( $row ['id'] ) );
					$image = $this->getItemImage ( $row, 1 );
					if ($image != false) {
						$image = '<a href="?shop=' . $row ['id'] . '"><img class="prev70" width="70" src="' . $image ['min'] . '" alt="" /></a>';
					} else {
						$image = '&nbsp;';
					}
					$num = 0;
					
					foreach ( $sizeqty as $size => $qty ) {
						
						$num ++;
						if ($row ['price_opt'] > 0) {
							$tot = number_format ( ($row ['price_opt'] * ( int ) $qty), 0, " ", " " );
							$price = $new;
						} else {
							$price = $pri;
							$tot = number_format ( ($row ['price_rozn'] * ( int ) $qty), 0, " ", " " );
						}
						$params = unserialize ( $size );
						$dop = '';
						if (isset ( $params ['size'] )) {
							$dop .= '<tr>
							<td class="par2"><span>размер</span></td>
							<td class="">' . $params ['size'] . '</td>
						</tr>';
						}
						if (isset ( $params ['color'] )) {
							$dop .= '<tr>
							<td class="par2"><span>цвет</span></td>
							<td class="">' . $params ['color'] . '</td>
						</tr>';
						}
						if (isset ( $params ['fullness'] )) {
							$dop .= '<tr>
							<td class="par2"><span>полнота</span></td>
							<td class="">' . $params ['fullness'] . '</td>
						</tr>';
						}
						if (isset ( $params ['style'] )) {
							$dop .= '<tr>
							<td class="par2"><span>фасон трусиков</span></td>
							<td class="">' . $params ['style'] . '</td>
						</tr>';
						}
						if (! empty ( $dop )) {
							$dop = '<table>' . $dop . '</table>';
						}
						$d .= <<<HTML
						
						<tr  row="{$row['id']}_{$num}">
				<td class="par1" style="font-style: italic;">{$row['art']}</td>
				<td class="par1">{$image}</td>
				<td class="par1">
					<h3><a href="?shop={$row['id']}">{$row['name']}</a></h3>
					{$dop}
				</td>
				<td class="par1"><span class="pr3">{$price} руб.</span></td>
				<td class="par1">
				<img class="min12" alt="" onclick="$(this).next().val(Number(Number($(this).next().val())-1)); updateCart({$row['id']}, $(this).next().val(), $('#{$row['id']}_{$num}_size').html(), '{$row['id']}_{$num}', Number($('#priceDelivery').html()),$('#priceId').val());" src="template/default/img/mn12.gif">
				<input type="text" value="{$qty}" disabled="disabled"  maxlength="3" class="w32">
				<img class="plus12" onclick="$(this).prev().val(Number(Number($(this).prev().val())+1)); updateCart({$row['id']}, $(this).prev().val(), $('#{$row['id']}_{$num}_size').html(), '{$row['id']}_{$num}',Number($('#priceDelivery').html()),$('#priceId').val());" alt="" src="template/default/img/pl12.gif"></td>
				<td class="par1"><span class="pr4"><strong>{$tot}</strong> руб.</span></td>
				<td class="par1">
				<textarea style="display:none" id="{$row['id']}_{$num}_size">{$size}</textarea>
				<img class="close21" alt="" onclick="return deleteCartItem('{$row['id']}_{$num}', $('#{$row['id']}_{$num}_size').html(), {$id}, Number($('#priceDelivery').html()),$('#priceId').val())" src="template/default/img/close21.gif"></td>
			</tr>
						
				
HTML;
					}
				}
				
				$total = number_format ( $_SESSION ['total'], 0, " ", " " );
				
				$d .= '
				
	</TABLE>

    ';
				$delivery = '';
				$deliveryFirst = '';
				$priceId = 0;
				$showDelivery = 'true';
				$s = mysql_query ( "select * from `shop_delivery` where `active`='1'" );
				if (is_resource ( $s ) && mysql_num_rows ( $s ) > 0) {
					$i = 0;
					while ( ($row = mysql_fetch_assoc ( $s )) != false ) {
						$i ++;
						if ($i == 1) {
							$priceId = $row ['id'];
							if ($row ['price2'] != 0 && $_SESSION ['total'] >= $row ['price2']) {
								$deliveryFirst = 0;
								// $row['price'] = 0;
								$showDelivery = 'false';
							} else {
								$deliveryFirst = number_format ( $row ['price'], 0, ' ', ' ' );
							}
						}
						$dop = '';
						if ($delivery_price == $row ['id']) {
							$priceId = $row ['id'];
							if ($row ['price2'] != 0 && $_SESSION ['total'] >= $row ['price2']) {
								// $row['price'] = 0;
								$showDelivery = 'false';
								$deliveryFirst = 0;
							} else {
								$deliveryFirst = number_format ( $row ['price'], 0, ' ', ' ' );
							}
							$dop = ' selected="selected"';
						}
						$delivery .= '<option show="' . $showDelivery . '" price="' . number_format ( $row ['price'], 0, ' ', ' ' ) . '" priceId="' . $row ['id'] . '" ' . $dop . ' value="' . $row ['id'] . '">' . $row ['name'] . '</option>';
					}
				}
				
				$d .= '
						<input type="hidden" id="priceId" value="{$priceId}" />
						
						<table class="data1">
			<tbody><tr>
				<td>Выберите регион доставки</td>
				<td><select name="delivery_price" id="selectDelivery" onchange="$(\'#priceDelivery\').html($(\'#selectDelivery option[value=\\\'\'+this.value+\'\\\']\').attr(\'price\')); if ($(\'#selectDelivery option[value=\\\'\'+this.value+\'\\\']\').attr(\'show\')==\'true\'){$(\'#deliveryText\').css(\'display\', \'block\')}else{$(\'#deliveryText\').css(\'display\', \'none\')} $(\'#priceId\').val(this.value); updateAllCart($(\'#priceDelivery\').html(),$(\'#priceId\').val());" class="w562">' . $delivery . '</select><a class="srvLink1" href="?pages=3"  target="_blank">Информация о доставке</a></td>
			</tr>
			<tr>
				<td colspan="2" >
					<div class="blockSum52">
						<p><span class="qa1">Сумма:</span> <span class="qa2">Товаров на</span> <span class="qa3" id="totalPrice">' . $total . '</span> руб. 
								 
								 <span class="qa3">+</span> <span class="qa2">доставка</span> <span class="qa3" id="priceDelivery">' . $deliveryFirst . '</span> руб.
								 		
								<span class="qa4">Итого с доставкой:</span> <span class="qa3" id="totalWith">' . number_format ( $_SESSION ['total'] + $deliveryFirst, 0, " ", " " ) . '</span> руб.
										
							</p>
					</div>
				</td>
			</tr>
			<tr>
				<td><p>Имя<span class="cm1">*</span></p></td>
				<td><input type="text" name="name" value="' . htmlspecialchars ( $name ) . '" class="w561" /></td>				
			</tr>
			
			<tr>
				<td><p>Телефон<span class="cm1">*</span></p></td>
				<td><input type="text" name="phone" value="' . htmlspecialchars ( $phone ) . '" class="w561" /></td>				
			</tr>
			
			<tr>
				<td><p>Эл. почта<span class="cm1">*</span></p></td>
				<td><input type="text" name="email" value="' . htmlspecialchars ( $email ) . '" class="w561" /></td>				
			</tr>
			
			<tr>
				<td><p>Город<span class="cm1">*</span></p></td>
				<td>
					<table>
						<tr>
							<td><input type="text" name="city" value="' . htmlspecialchars ( $city ) . '" class="w420" /></td>
							<td><span>Индекс</span></td>							
							<td><input type="text" name="index" value="' . htmlspecialchars ( $index ) . '" class="w47" value="753000" /></td>
						</tr>
					</table>
				</td>				
			</tr>
			
			<tr>
				<td><p>Улица<span class="cm1">*</span></p></td>
				<td><input type="text" name="street" value="' . htmlspecialchars ( $street ) . '" class="w561" /></td>				
			</tr>
			
			<tr>
				<td><p>Дом<span class="cm1">*</span></p></td>
				<td>
					<table>
						<tr>
							<td><input type="text" class="w47" value="' . htmlspecialchars ( $house ) . '" name="house" /></td>
							<td><span>Корпус</span></td>							
							<td><input type="text" name="korpus" value="' . htmlspecialchars ( $korpus ) . '" class="w47" /></td>
							<td><span>Подъезд</span></td>							
							<td><input type="text" name="podezd" value="' . htmlspecialchars ( $podezd ) . '" class="w47" /></td>
							<td><span>Этаж</span></td>		
							<td><input type="text" name="level" value="' . htmlspecialchars ( $level ) . '" class="w47" /></td>							
							<td><span>Квартира<span class="cm1">*</span></span></td>
							<td><input type="text" name="kv" value="' . htmlspecialchars ( $kv ) . '" class="w47" /></td>		
						</tr>
					</table>
				</td>				
			</tr>
			
			<tr>
				<td><p>Обхваты<span class="cm2">(бюста, под бюстом, бедер)</span></p></td>
				<td><textarea class="h51" rows="5" name="obhvati" cols="40">' . htmlspecialchars ( $obhvati ) . '</textarea></td>				
			</tr>
			
			<tr>
				<td><p>Комментарий</p></td>
				<td><textarea class="h111" rows="5" name="comment" cols="40">' . htmlspecialchars ( $comment ) . '</textarea><br /><br /></td>				
			</tr>
			<tr>
				<td><p class="cm3">* - обязательны для<br />&nbsp;&nbsp;&nbsp;заполнения</p></td>
				<td><img src="template/default/img/btn153a.gif" onclick="document.getElementById(\'order\').submit()"  alt="" class="btn153a" /></td>
			</tr>
		</tbody></table>';
				
				/*
				 * $d .= '<p class="total"><strong>Итого:</strong> ' . $total .
				 * ' руб.<br/>'; if ($this->user != 0) { if ($this->sk > 0) {
				 * $sk = $this->sk; $totsk = ($total * $sk) / 100; $alltsk =
				 * $total - $totsk; $alltsk = number_format ( $alltsk, 2, ".",
				 * "" ); $d .= '<strong>Ваша скидка:</strong> ' . $sk .
				 * '%<br/>'; $d .= '<strong>Итого со скидкой:</strong> ' .
				 * $alltsk . ' руб.'; } } $d .= "</p><br/>"; $d .= '<p
				 * align="right"><input type="submit" name="save" class="reg_in"
				 * value="Сохранить">&nbsp;&nbsp;&nbsp;<input type="submit"
				 * name="delete" class="reg_in" value="Удалить">'; if (isset (
				 * $_SESSION ['lastpage'] )) { $link = "<a
				 * href='$_SESSION[lastpage]' class='total'>Продолжить
				 * покупки</a>"; } else { $link = ""; } if (isset ( $_SESSION
				 * ['lastpage'] )) { $d .= '<br><br>&nbsp;&nbsp;' . $link; } $d
				 * .= '&nbsp;&nbsp;<input
				 * onclick="location.replace(\'/cart-order.html\')"
				 * type="button" class="reg_in" value="Оформить заказ" /></p>';
				 */
				$d .= "</form>";
			} else {
				
				if (isset ( $_SESSION ['lastpage'] )) {
					$d .= "<center><span style='font:12px arial;font-weight:bold;'>Нет товаров в списке</span></center><br><br><center><p class='total' style='font-size:13px;'><a href='$_SESSION[lastpage]' class='total'>Продолжить покупки</a></p><br></center>";
				} else {
					$d .= "<br><center><h3>Нет товаров в списке</h3></center>";
				}
			}
		}
		$d .= '</div>';
		$this->over = $d;
	}
	function Sk($price) {
		if ($this->user != 0) {
			if ($this->sk > 0) {
				$sk = $this->sk;
				$totsk = ($price * $sk) / 100;
				$alltsk = $price - $totsk;
				return $alltsk;
			}
		}
		return $price;
	}
	function getErrorForm() {
		$error = array ();
		if (isset ( $_POST ['fio'] ) && empty ( $_POST ['fio'] ) or isset ( $_POST ['fio'] ) && ! preg_match ( "/[а-яa-zA-ZА-Я]/is", $_POST ['fio'] )) {
			$error [] = "Не заполненно или содержит ошибки поле Ф.И.О";
		}
		if (isset ( $_POST ['tel'] ) && empty ( $_POST ['tel'] ) or isset ( $_POST ['tel'] ) && ! preg_match ( "/[0-9]/is", $_POST ['tel'] )) {
			$error [] = "Не заполненно или содержит ошибки поле Телефон";
		}
		if (! preg_match ( "/^[a-z0-9_.-]+@([a-z0-9_]+.)+[a-z]{2,4}$/i", $_POST ['email'] ) or isset ( $_POST ['email'] ) && empty ( $_POST ['email'] )) {
			$error [] = "Не заполненно или содержит ошибки поле Email";
		}
		if (isset ( $_POST ['adres'] ) && empty ( $_POST ['adres'] ) or isset ( $_POST ['adres'] ) && ! preg_match ( "/[0-9a-zА-Яа-яA-Z]/is", $_POST ['adres'] )) {
			$error [] = "Не заполненно или содержит ошибки поле Адрес";
		}
		
		return $error;
	}
	function getOrderForm() {
		$d = "";
		if (isset ( $_SESSION ['cart'] ) && count ( $_SESSION ['cart'] ) > 0) {
			$d .= '<p>&nbsp; </p><p style="font-weight:bold;font-size:12px;">Вы заказали <span style="color:red; font-weight:bold;">' . count ( $_SESSION ['cart'] ) . ' шт.</span>
          товаров на общую сумму: <span style="color:red; font-weight:bold;">' . $_SESSION ['total'] . ' руб.</span></p><p>Для оформления заказа просим Вас заполнить необходимые поля формы:</p>';
			if (isset ( $_SESSION ['lastpage'] )) {
				$link = "<a href='$_SESSION[lastpage]'>Продолжить покупки</a>";
			} else {
				$link = "";
			}
			
			if (isset ( $_SESSION ['user'] ) && isset ( $_SESSION ['uid'] ) && ! empty ( $_SESSION ['user'] ) && ! empty ( $_SESSION ['uid'] ) && is_numeric ( $_SESSION ['uid'] )) {
				$user = ( int ) $_SESSION ['uid'];
				$sql = mysql_query ( "select * from `shop_users` where `id`='$user' limit 1" );
				if (mysql_num_rows ( $sql ) > 0) {
					$row = mysql_fetch_array ( $sql );
					$fio = isset ( $_POST ['fio'] ) ? strip_tags ( $_POST ['fio'] ) : $row ['fio'];
					$email = isset ( $_POST ['email'] ) ? strip_tags ( strtolower ( $_POST ['email'] ) ) : $row ['user'];
					$time = isset ( $_POST ['time'] ) ? strip_tags ( trim ( $_POST ['time'] ) ) : '';
					$adres = isset ( $_POST ['adres'] ) ? strip_tags ( $_POST ['adres'] ) : $row ['adres'];
					$tel = isset ( $_POST ['tel'] ) ? strip_tags ( $_POST ['tel'] ) : $row ['tel'];
					$coment = isset ( $_POST ['coment'] ) ? strip_tags ( $_POST ['coment'] ) : '';
				} else {
					unset ( $_SESSION ['user'] );
					unset ( $_SESSION ['uid'] );
					$fio = isset ( $_POST ['fio'] ) ? strip_tags ( $_POST ['fio'] ) : '';
					$email = isset ( $_POST ['email'] ) ? strip_tags ( strtolower ( $_POST ['email'] ) ) : '';
					$time = isset ( $_POST ['time'] ) ? strip_tags ( trim ( $_POST ['time'] ) ) : "";
					$adres = isset ( $_POST ['adres'] ) ? strip_tags ( $_POST ['adres'] ) : '';
					$tel = isset ( $_POST ['tel'] ) ? strip_tags ( $_POST ['tel'] ) : '';
					$coment = isset ( $_POST ['coment'] ) ? strip_tags ( $_POST ['coment'] ) : '';
				}
			} else {
				$fio = isset ( $_POST ['fio'] ) ? strip_tags ( $_POST ['fio'] ) : '';
				$email = isset ( $_POST ['email'] ) ? strip_tags ( strtolower ( $_POST ['email'] ) ) : '';
				$time = isset ( $_POST ['time'] ) ? strip_tags ( trim ( $_POST ['time'] ) ) : "";
				$adres = isset ( $_POST ['adres'] ) ? strip_tags ( $_POST ['adres'] ) : '';
				$tel = isset ( $_POST ['tel'] ) ? strip_tags ( $_POST ['tel'] ) : '';
				$coment = isset ( $_POST ['coment'] ) ? strip_tags ( $_POST ['coment'] ) : '';
			}
			
			if (isset ( $_POST ['OrderShop'] )) {
				$errors = $this->getErrorForm ();
				
				if (count ( $errors ) == 0) {
					$id = $this->orderF ();
					return "<div class=\"shopblock\"><center>Ваш номер заказа: $id<br>Наши менеджеры свяжутся с Вами для подтверждения и согласования перечня заказываемых товаров.<br>
Обо всех изменениях состояния заказа Вы будете информированы по e-mail.<br>
</center></div>";
					return true;
				} else {
					$d .= "<br><center>";
					foreach ( $errors as $error ) {
						$d .= "<font color='RED'>$error</font><br>";
					}
					$d .= "</center><br>";
				}
			}
			$d .= '
			
			<p>&nbsp;</p>
          <center>
		<form method="POST">
	
		<h1><strong>Оформление заказа</strong></h1>
		<p><br>
		<table width="50%" cellpadding="10" cellspacing="10">
           <tr>
              <td width="80" height="30"><strong>Ф.И.О:</strong></td>
                 <td><input type="text" name="fio" value="' . $fio . '" size="30"></td>
</tr>
<tr>
<td width="80" height="30"><strong>Телефон:</strong></td>
<td><input type="text" name="tel" value="' . $tel . '" size="30"></td>
</tr>
<tr>
<td width="80" height="30"><strong>Email:</strong></td>
<td><input type="text" name="email" value="' . $email . '" size="30"></td>
</tr>

<tr>
<td width="80" height="30"><strong>Удобное время:</strong></td>
<td><input type="text" name="time" value="' . $time . '" size="30"></td>
</tr>
<tr><td colspan="2">&nbsp;</td></tr>
<tr>
<td width="80" height="30" style="vertical-align:top;"><strong>Адрес:</strong></td>
<td><textarea name="adres" cols="35" rows="7">' . $adres . '</textarea></td>
</tr>
<tr><td colspan="2">&nbsp;</td></tr>
<tr>
<td width="140" height="30"><strong>Комментарии:</strong></td>
<td><textarea name="coment" cols="35" rows="7">' . $coment . '</textarea></td>
</tr>
</table>
</p>
<br><br>
<input type="submit" value="Оформить заказ" class="reg_in" name="OrderShop">

</form>
<br><br>' . $link . '&nbsp; &nbsp;<a href="?cart">Вернуться в корзину</a>
</center>

';
		} else {
			return "Ваша корзина пуста, вы не можете сделать заказ";
		}
		return $d;
	}
	function price($cart) {
		$price = 0.0;
		if (is_array ( $cart )) {
			foreach ( $cart as $id => $sizeqty ) {
				foreach ( $sizeqty as $size => $qty ) {
					$sql = "select `price_rozn`, `stock`, `price_opt`, `dateTo`, `timeTo` from shop_items where id='$id'";
					$result = mysql_query ( $sql );
					if ($result) {
						$row = mysql_fetch_assoc ( $result );
						
						if ($row ['price_opt'] > 0) {
							$item_price = $row ['price_opt'];
						} else {
							$item_price = $row ['price_rozn'];
						}
						
						$price += $item_price * $qty;
					}
				}
			}
		}
		return $price;
	}
	function getDelivery($id) {
		$id = ( int ) $id;
		$sql = mysql_query ( "select * from `shop_delivery` where `id`='{$id}' limit 1" );
		if (is_resource ( $sql ) && mysql_num_rows ( $sql ) > 0) {
			$row = mysql_fetch_assoc ( $sql );
			return array (
					"name" => $row ['name'],
					"price" => $row ['price'],
					"price2" => $row ['price2'] 
			);
		}
		return false;
	}
	function orderF() {
		$fields = array (
				'name',
				'phone',
				'email',
				'index',
				'city',
				'street',
				'house',
				'korpus',
				'podezd',
				'level',
				'kv',
				'obhvati',
				'comment',
				'delivery_price' 
		);
		foreach ( $fields as $fieldName ) {
			
			$$fieldName = isset ( $_POST [$fieldName] ) ? trim ( strip_tags ( $_POST [$fieldName] ) ) : '';
			$$fieldName = str_replace ( "{", "", $$fieldName );
			$$fieldName = str_replace ( "}", "", $$fieldName );
		}
		$fieldsLabel = array (
				'Имя',
				"Телефон",
				"Эл. почта",
				'Индекс',
				'Город',
				'Улица',
				'Дом',
				'Корпус',
				'Подъезд',
				'Этаж',
				'Квартира',
				'Обхваты(бюста, под бюстом, бедер)',
				'Комментарий' 
		);
		
		$date = time ();
		$uid = isset ( $_SESSION ['uid'] ) ? $_SESSION ['uid'] : 0;
		$sk = 0;
		if ($uid != 0) {
			$sql = mysql_query ( "select * from `shop_users` where `id`='$uid' limit 1" );
			if (mysql_num_rows ( $sql ) > 0) {
				$row = mysql_fetch_array ( $sql );
				$sk = $row ['sk'];
			}
		}
		$time = time ();
		
		mysql_query ( "insert into shop_orders (`time`, `sk`, `suma`, `date`, `status`) values ( '$time', '$sk', '" . $this->Sk ( $_SESSION ['total'] ) . "', '$date', '0')" ) or die ( mysql_error () );
		$id_order = mysql_insert_id ();
		$values = array ();
		foreach ( $fields as $fieldName ) {
			if ($fieldName == 'delivery_price') {
				$del = $this->getDelivery ( $$fieldName );
				if (is_array ( $del )) {
					$values [] = "`delivery`='" . mysql_real_escape_string ( $del ['name'] ) . "'";
					$values [] = "`delivery_price`='" . mysql_real_escape_string ( $del ['price'] ) . "'";
				}
				
				continue;
			}
			$values [] = "`{$fieldName}`='" . mysql_real_escape_string ( $$fieldName ) . "'";
		}
		mysql_query ( "update `shop_orders` set " . implode ( ", ", $values ) . " where `id`='{$id_order}'" ) or die ( mysql_error () );
		$allprice = 0;
		$tovars = "";
		foreach ( $_SESSION ['cart'] as $id => $qtysizes ) {
			
			$sql = "select * from shop_items where id = '$id'";
			$result = mysql_query ( $sql );
			$row = mysql_fetch_array ( $result );
			foreach ( $qtysizes as $size => $qty ) {
				$price = $row ['price_rozn'];
				
				if ($row ['price_opt'] > 0) {
					$price = $row ['price_opt'];
				}
				
				mysql_query ( "insert into shop_orders_items (`id_order`, `id_item`, `art`, `name`, `price_rozn`, `price_opt`, `kol`) values ( '$id_order', '$id', '" . mysql_real_escape_string ( $row ['art'] ) . "', '" . mysql_real_escape_string ( $row ['name'] ) . "', '" . $price . "', '$row[price_opt]', '$qty')" ) or die ( mysql_error () );
				$idItem = mysql_insert_id ();
				$params = unserialize ( $size );
				$dop = array ();
				$update = array ();
				if (isset ( $params ['size'] )) {
					$update [] = "`size`='" . mysql_real_escape_string ( $params ['size'] ) . "'";
					$dop [] = 'размер: ' . $params ['size'] . '';
				}
				if (isset ( $params ['color'] )) {
					$update [] = "`color`='" . mysql_real_escape_string ( $params ['color'] ) . "'";
					$dop [] = 'цвет: ' . $params ['color'] . '';
				}
				if (isset ( $params ['fullness'] )) {
					$update [] = "`fullness`='" . mysql_real_escape_string ( $params ['fullness'] ) . "'";
					$dop [] = 'полнота:' . $params ['fullness'] . '';
				}
				if (isset ( $params ['style'] )) {
					$update [] = "`style`='" . mysql_real_escape_string ( $params ['style'] ) . "'";
					$dop [] = 'фасон трусиков: ' . $params ['style'];
				}
				
				if (count ( $dop ) > 0) {
					$dop = "(" . implode ( ", ", $dop ) . ")";
				} else {
					$dop = '';
				}
				if (count ( $update ) > 0) {
					mysql_query ( "update `shop_orders_items` set " . implode ( ", ", $update ) . " where `id`='{$idItem}'" );
				}
				$all4item = $price * $qty;
				$allprice += $all4item;
				$price = number_format ( $price, 0, ' ', ' ' );
				$all4item = number_format ( $all4item, 0, ' ', ' ' );
				$tovars .= "<tr>
				<td style='border:1px solid grey; color: #333;font-family: Verdana, Tahoma, Arial, Helvetica, sans-serif;font-size: 11px;'  align='left'>$row[art]</td>
				<td style='border:1px solid grey; color: #333;font-family: Verdana, Tahoma, Arial, Helvetica, sans-serif;font-size: 11px;'  align='left'>$row[name] {$dop}</td>
				<td style='border:1px solid grey;color: #333;font-family: Verdana, Tahoma, Arial, Helvetica, sans-serif;font-size: 11px;'  align='center'>$qty</td>
				<td style='border:1px solid grey;color: #333;font-family: Verdana, Tahoma, Arial, Helvetica, sans-serif;font-size: 11px;'  align='center'>{$price}</td>
				<td style='border:1px solid grey;color: #333;font-family: Verdana, Tahoma, Arial, Helvetica, sans-serif;font-size: 11px;' align='right'>$all4item</td>
				<tr>
				";
			}
		}
		
		$info = '<table>';
		
		foreach ( $fields as $fieldNum => $fieldName ) {
			if (isset ( $fieldsLabel [$fieldNum] )) {
				$label = $fieldsLabel [$fieldNum];
				$info .= '<tr><td style=" color: #333;font-family: Verdana, Tahoma, Arial, Helvetica, sans-serif;font-size: 11px;"><strong>' . $label . ':<strong> </td><td style=" color: #333;font-family: Verdana, Tahoma, Arial, Helvetica, sans-serif;font-size: 11px;">' . nl2br ( $$fieldName ) . '</td></tr>';
			}
		}
		
		$delivery = '';
		if ($delivery_price) {
			$del = $this->getDelivery ( $delivery_price );
			if (is_array ( $del )) {
				if ($del ['price2'] > 0 && $_SESSION ['total'] >= $del ['price2']) {
					$del['price'] = 0;
				}
			
				
				//if ($del ['price2'] > 0 && $_SESSION ['total'] >= $del ['price2']) {
					$delivery .= "<tr>
<td colspan='4' style='vertical-align:middle;border:1px solid grey;color: #333;font-family: Verdana, Tahoma, Arial, Helvetica, sans-serif;font-size: 11px;'><b>Доставка \"{$del['name']}\"</b></td>			
<td  style='border:1px solid grey;color: #333;font-family: Verdana, Tahoma, Arial, Helvetica, sans-serif;font-size: 11px;' align='right'><b>" . number_format ( $del ['price'], 0,  " ", " " ) . " руб.</b></td>		
</tr>	";
					$delivery .= "<tr>
				<td colspan='4' style='vertical-align:middle;border:1px solid grey;color: #333;font-family: Verdana, Tahoma, Arial, Helvetica, sans-serif;font-size: 11px;'><b>Итого с доставкой</b></td>
				<td  style='border:1px solid grey;color: #333;font-family: Verdana, Tahoma, Arial, Helvetica, sans-serif;font-size: 11px;' align='right'><b>" . number_format ( ($allprice + $del ['price']), 0, ' ', ' ' ) . " руб.</b></td>
				</tr>	";
				//}
			}
		}
		
		$info .= '</table>';
		// $comment =encode($_POST['comment']);
		$s = mysql_query ( "select * from settings_shop where param='order_email'" );
		$r = mysql_fetch_array ( $s );
		$dd = date ( 'd.m.Y' );
		
		$msg = "
<html>
<head>

<meta http-equiv=\"Content-Type\" content=\"text/html; charset=windows-1251\">
</head>
<body style='background-color: #fff;color: #333;font-family: Verdana, Tahoma, Arial, Helvetica, sans-serif;font-size: 11px;'>
<style>
BODY {
	background-color: #fff;
	color: #333;
	font-family: Verdana, Tahoma, Arial, Helvetica, sans-serif;
	font-size: 11px;
}
TABLE {
	border-collapse: collapse;
	border-spacing: 0;
	border: 0px;
	

}
TD {
	
	color: #333;font-family: Verdana, Tahoma, Arial, Helvetica, sans-serif;font-size: 11px;
}


</style>
<table border='0' width='100%'>
<tr>
<td style='color: #333;font-family: Verdana, Tahoma, Arial, Helvetica, sans-serif;font-size: 11px;'>
В Интернет-Магазине \"$_SERVER[HTTP_HOST]\" на Ваш адрес электронной почты $_POST[email], был оформлен заказ №$id_order от $dd<br><br>

<table width='650' cellpadding='3' cellspacing='0' style='border-collapse: collapse;border-spacing: 0;border: 0px;'>
<tbody>
<tr>
<td width='100' style='border:1px solid grey; color: #333;font-family: Verdana, Tahoma, Arial, Helvetica, sans-serif;font-size: 11px;' align='center'><b>Артикул</b> </td>
<td width='300' style='border:1px solid grey; color: #333;font-family: Verdana, Tahoma, Arial, Helvetica, sans-serif;font-size: 11px;' align='center'><b>Наименование</b> </td>
<td width='40' style='border:1px solid grey;color: #333;font-family: Verdana, Tahoma, Arial, Helvetica, sans-serif;font-size: 11px;' align='center'><b>Кол-во</b></td>
<td width='70' style='border:1px solid grey;color: #333;font-family: Verdana, Tahoma, Arial, Helvetica, sans-serif;font-size: 11px;' align='center'><b>Цена</b></td>
<td width='100' style='border:1px solid grey;color: #333;font-family: Verdana, Tahoma, Arial, Helvetica, sans-serif;font-size: 11px;' align='center'><b>всего руб.</b></td>                      
</tr>
<tr>
 $tovars
<tr>
<td colspan='4' style='border:1px solid grey;color: #333;font-family: Verdana, Tahoma, Arial, Helvetica, sans-serif;font-size: 11px;'><b>Итого</b></td>			
<td  style='border:1px solid grey;color: #333;font-family: Verdana, Tahoma, Arial, Helvetica, sans-serif;font-size: 11px;' align='right'><b>$allprice руб.</b></td>		
</tr>	
{$delivery}
</tbody>		
</table>

<br>


<br>
Контактные данные:<br>
            <br>
           {$info}
<br>           
Ваш заказ находится на стадии обработки. Наши менеджеры свяжутся с Вами для подтверждения и согласования перечня заказываемых товаров.
Обо всех изменениях состояния заказа Вы будете информированы по e-mail $_POST[email] .<br><br>

Благодарим Вас за покупку!
</td></tr></table>
</body>
</html>
";
		$Mail = new Email();
		$Mail->EmailHTML( $r ['value'], "Заказ #$id_order", $msg);
		$Mail = new Email();
		$Mail->EmailHTML(  $_POST ['email'], "Заказ #$id_order", $msg);
		$headers = 'From: robot@' . $_SERVER ['HTTP_HOST'] . "\r\n" . "Content-Type: text/html;" . 'charset="windows-1251"';
		//mail ( $r ['value'], "Заказ #$id_order", $msg, $headers ) or die ( "NOT SEND $r[value]" );
		//mail ( $_POST ['email'], "Заказ #$id_order", $msg, $headers ) or die ( "NOT SEND $r[value]" );
		unset ( $_SESSION ['cart'] );
		unset ( $_SESSION ['total'] );
		return $id_order;
	}
}
