<?php
class form {
	var $over = "";
	var $defValues = array ();
	function post($name, $default = "") {
		$this->defValues [$name] = $default;
		$val = isset ( $_POST [$name] ) ? trim ( self::decode ( $_POST [$name] ) ) : '';
		if (! empty ( $val )) {
			$val = strip_tags ( $val );
			$val = str_replace ( "{", "", $val );
			$val = str_replace ( "}", "", $val );
		} else {
			return $default;
		}
		return $val;
	}
	function decode($str) {
		return @iconv ( "utf-8", "windows-1251", $str );
	}
	function isDefault($values) {
		foreach ( $this->defValues as $nam => $val ) {
			if ($values [$nam] == $val) {
				return true;
			}
		}
		return false;
	}
	function isAlphaNum($str){
		$str = 
		$allow = "qwertyuiopasdfghjklzxcvbnm1234567890йцукенгшщзхъфывапролджэячсмитьбю";
		$allow = str_split($allow);
	}
	function isEmpty($values) {
		foreach ( $values as $val ) {
			$val = trim ( $val );
			if (empty ( $val )) {
				return true;
			}
		}
		return false;
	}
	function getEmailAdmin() {
		$sql = mysql_query ( "select * from `site_setting` where `option`='email_admin'" );
		if (is_resource ( $sql ) && mysql_num_rows ( $sql ) > 0) {
			$row = mysql_fetch_assoc ( $sql );
			return $row ['value'];
		}
		return "";
	}
	function encode($str){
		return iconv("windows-1251", "utf-8", $str);
	}
	function __construct() {
		
		$values ['name'] ='Представьтесь';
		$values ['date_from'] ='Дата заезда';
		$values ['date_to'] ='Дата выезда';
		$values ['phone'] = 'Контактный телефон';
		$values ['type_number'] = 'Тип номера';
		$values ['qty_people'] ='Кол-во чел.';
		$values ['prim'] = 'Примечания';
		
		if (isset ( $_POST ['ajax'] )) {
			$values ['name'] = self::post ( 'name', 'Представьтесь' );
		$values ['date_from'] = self::post ( 'date_from', 'Дата заезда' );
		$values ['date_to'] = self::post ( 'date_to', 'Дата выезда' );
		$values ['phone'] = self::post ( 'phone', 'Контактный телефон' );
		$values ['type_number'] = self::post ( 'type_number', 'Тип номера' );
		$values ['qty_people'] = self::post ( 'qty_people', 'Кол-во чел.' );
		$values ['prim'] = self::post ( 'prim', 'Примечания' );
			if ($this->isDefault ( $values ) == true) {
				$json = json_encode ( array ("msg" => $this->encode("Не заполненны обязательные поля") ) );
				exit ( $json );
			} elseif ($this->isEmpty ( $values ) == true) {
				$json = json_encode ( array ("msg" => $this->encode("Не заполненны обязательные поля" )) );
				exit ( $json );
			} else {
				$msg = "<table width='550'>";
				foreach ( $this->defValues as $name => $val ) {
					if ($name == "name") {
						$val = "Ф.И.О";
					}
					$msg .= "<tr>
					<td width='200' style='vertical-align:top;'><strong>{$val}:</strong></td>
					<td style='vertical-align:top;'>{$values[$name]}</td>
					</tr>
					<tr><td colspan='2' height='5'>&nbsp;</td></tr>
					";
				}
				$msg .= "</table>";
				$json = json_encode ( array ("msg" => iconv ( "windows-1251", "utf-8", "Ваша заявка успешно отправлена" ), "success" => true ) );
				$send = new Email ();
				$send->setFrom ( "robot@" . preg_replace ( "/www./is", "", getenv ( 'HTTP_HOST' ) ) );
				$send->EmailHTML ( $this->getEmailAdmin (), "Заявка с сайта", $msg );
				exit ( $json );
			}
			
			exit ( "{failure:true}" );
		}
		
		$this->over = '
		<script>
		function submitOrder(){
		Ext.Ajax.request({
		     form:"zayavka",
		     method:"post",
		     params:{ajax:true},
		     url:"/",
		     success:function(o){
		         var enc = Ext.decode(o.responseText);
		         if (enc.success){
		              if (enc.msg){
		               msg(enc.msg);
		             }
		             else {
		              msg("Заявка успешно отправлена");
		             }
	             }
	             else {
	                 if (enc.msg){
		               msg(enc.msg);
		             }
		             else {
		                msg("Не удалось отправить заявку");
		             }
	             }
	         }
	      });
		}
		
		function msg(msg){
		if (!Ext.get(\'Message\')){
			
		   $(document.body).append(\'<div style="display:none; z-index:5000;" id="Message"><p align="center">\'+msg+\'</p></div>\');
		}

		$(\'#Message\').html(\'<p align="center">\'+msg+\'</p>\');
		$(\'#Message\').dialog({
			autoOpen:true,
			modal:true,
			zIndex:270000,
			width:320,
		});;
		}
		</script>
		<form method="post" name="zayavka" id="zayavka">

                    <div class="float">
                        <table class="form_input m_20">
                            <tr>
                                <td class="lt">&nbsp;</td>
                                <td class="t"><div class="w_215"></div></td>
                                <td class="rt">&nbsp;</td>
                            </tr>
                            <tr>
                                <td class="lb">&nbsp;</td>
                                <td class="b">&nbsp;</td>
                                <td class="rb">&nbsp;</td>
                            </tr>
                        </table>
                        <div class="absolute"><input class="input w_215" type="text" name="name" value="' . htmlspecialchars ( $values ['name'] ) . '" onclick="this.value=\'\'" /></div>
                    </div>
                    <div class="float">
                        <table class="form_input m_15">
                            <tr>
                                <td class="lt">&nbsp;</td>
                                <td class="t"><div class="w_120"></div> </td>
                                <td class="rt">&nbsp;</td>
                            </tr>
                            <tr>
                                <td class="lb">&nbsp;</td>
                                <td class="b">&nbsp;</td>
                                <td class="rb">&nbsp;</td>
                            </tr>
                        </table>
                        <div class="absolute"><input class="input w_120 date_from_value" type="text" name="date_from" value="' . htmlspecialchars ( $values ['date_from'] ) . '" onclick="this.value=\'\'" /></div>
                    </div>
                    <input type="hidden"  class="date_from" style="margin-top:10px;display:none;" />
                    <script>
                    $(document).ready(function(){
                     $( ".date_from" ).datepicker({"dateFormat":"dd.mm.yy",showOn: "button", 
		   onSelect:function(text){$(".date_from_value").val(text)},
		   monthNames:["Январь","Февраль","Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
		   monthNamesShort:["Янв","Фев","Мар", "Апр", "Май", "Июнь", "Июль", "Авг", "Сен", "Окт", "Ноя", "Дек"],
		   dayNamesMin:["Вc", "Пон", "Вт", "Ср", "Чт", "Пт", "Сб"],
		    dayNamesShort:["Вc", "Пон", "Вт", "Ср", "Чт", "Пт", "Сб"],
		   dayNames:["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"],
			buttonImage: "/template/default/images/calendar.png", buttonImageOnly:true
	});
	});
	</script>
                    <div class="float">
                        <table class="form_input m_15">
                            <tr>
                                <td class="lt">&nbsp;</td>
                                <td class="t"><div class="w_120"></div> </td>
                                <td class="rt">&nbsp;</td>
                            </tr>
                            <tr>
                                <td class="lb">&nbsp;</td>
                                <td class="b">&nbsp;</td>
                                <td class="rb">&nbsp;</td>
                            </tr>
                        </table>
                        <div class="absolute"><input class="input w_120 date_to_value" type="text" name="date_to" value="' . htmlspecialchars ( $values ['date_to'] ) . '" onclick="this.value=\'\'" /></div>
                    </div>
                    <input type="hidden" class="date_to" style="margin-top:10px;display:none;" />
                    <script>
                    $(document).ready(function(){
                     $( ".date_to" ).datepicker({"dateFormat":"yy-mm-dd",showOn: "button", 
		   onSelect:function(text){$(".date_to_value").val(text)},
		   monthNames:["Январь","Февраль","Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
		   monthNamesShort:["Янв","Фев","Мар", "Апр", "Май", "Июнь", "Июль", "Авг", "Сен", "Окт", "Ноя", "Дек"],
		   dayNamesMin:["Вc", "Пон", "Вт", "Ср", "Чт", "Пт", "Сб"],
		    dayNamesShort:["Вc", "Пон", "Вт", "Ср", "Чт", "Пт", "Сб"],
		   dayNames:["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"],
			buttonImage: "/template/default/images/calendar.png", buttonImageOnly:true
	});
	});
	</script>
                    

                    <div style="clear:both;"></div>
                    <br />
                    <div class="float">
                        <table class="form_input m_20">
                            <tr>
                                <td class="lt">&nbsp;</td>
                                <td class="t"><div class="w_215"></div> </td>
                                <td class="rt">&nbsp;</td>
                            </tr>
                            <tr>
                                <td class="lb">&nbsp;</td>
                                <td class="b">&nbsp;</td>
                                <td class="rb">&nbsp;</td>
                            </tr>
                        </table>
                        <div class="absolute"><input class="input w_215" type="text" name="phone" value="' . htmlspecialchars ( $values ['phone'] ) . '" onclick="this.value=\'\'" /></div>
                    </div>
                    <div class="float">
                        <table class="form_input m_15">
                            <tr>
                                <td class="lt">&nbsp;</td>
                                <td class="t"><div class="w_180"></div> </td>
                                <td class="rt">&nbsp;</td>
                            </tr>
                            <tr>
                                <td class="lb">&nbsp;</td>
                                <td class="b">&nbsp;</td>
                                <td class="rb">&nbsp;</td>
                            </tr>
                        </table>
                        <div class="absolute"><input class="input w_180" type="text" name="type_number" value="' . self::html ( $values ['type_number'] ) . '" onclick="this.value=\'\'" /></div>
                    </div>
                    
                    <div class="float">
                        <table class="form_input m_15">
                            <tr>
                                <td class="lt">&nbsp;</td>
                                <td class="t"><div class="w_130">&nbsp;</div></td>
                                <td class="rt">&nbsp;</td>
                            </tr>
                            <tr>
                                <td class="lb">&nbsp;</td>
                                <td class="b">&nbsp;</td>
                                <td class="rb">&nbsp;</td>
                            </tr>
                        </table>
                        <div class="absolute">
                            <input class="input w_130" type="text" name="qty_people" value="' . self::html ( $values ['qty_people'] ) . '" onclick="this.value=\'\'" />
                        </div>
                    </div>
                    <div style="clear:both;"></div><br />

                    <div class="float">
                        <table class="form_input m_20">
                            <tr>
                                <td class="lt">&nbsp;</td>
                                <td class="t">&nbsp;</td>
                                <td class="rt">&nbsp;</td>
                            </tr>
                            <tr>
                                <td class="l">&nbsp;</td>
                                <td class="c">
                                    <div style="width:480px; height:60px;"></div>
                                </td>
                                <td class="r">&nbsp;</td>
                            </tr>
                            <tr>
                                <td class="lb">&nbsp;</td>
                                <td class="b">&nbsp;</td>
                                <td class="rb">&nbsp;</td>
                            </tr>
                        </table>
                        <div class="absolute">
                            <textarea class="textarea" name="prim" id="prim" rows="3" cols="1" onclick="this.value=\'\'">' . $this->html ( $values ['prim'] ) . '</textarea>
                        </div>
                    </div>
                    <div style="clear:both;"></div><br />
                    <a href="#" onclick="submitOrder(); return false;" class="send"><img src="template/default/images/send.png" alt="" /></a>

                    <div class="form_detail">
                        <img src="template/default/images/form_next.png" alt="" /><br />
                        <a href="?pages=46"><img src="template/default/images/form_detail.png" alt="" /></a>
                    </div>
                </form>';
	}
	function html($val) {
		return htmlspecialchars ( $val );
	}
}