<?php
class form_order {
	var $over = '';
	function __construct() {
		$out = '';
		
		$fields = array (
				1 => 'email',
				2 => 'name',
				3 => 'comment'
				
		);
		$names = array (
				1 => 'E-mail', 
				2 => 'Имя',
				3 => 'Комментарий'
				
		);
		
		foreach ( $fields as $field ) {
			$$field = isset ( $_POST [$field] ) ? trim ( strip_tags ( $_POST [$field] ) ) : '';
			$$field = str_replace ( "{", "", $$field );
			$$field = str_replace ( "}", "", $$field );
			$new = "h{$field}";
			$$new = htmlspecialchars ( $$field );
		}
		if (isset ( $_POST ['orderForm'] )) {
			if (empty ( $name ) or empty ( $email )) {
				$out .= '<script>alert("Не заполнены обязательные поля")</script>';
			} elseif (! preg_match ( "/^[a-z0-9_.-]+@([a-z0-9_]+.)+[a-z]{2,4}$/i", $email )) {
				$out .= '<script>alert("Не верно введён Email адрес")</script>';
			}  else {
				$out .= '<script>alert("Ваша заявка отправлена. В ближайшее время наши специалисты свяжутся с Вами.Спасибо, что обратились к нам!")</script>';
				
				$msg = '<table>';
				foreach ($names as $num=>$value){
					$msg.="<tr><td>{$value}:</td><td>".nl2br($$fields[$num])."</td></tr>";
				}
				$msg.='</table>';
				$send = new Email();
				$send->setFrom('info@'.preg_replace('/www./is', '', getenv('HTTP_HOST')));
				
				$send->EmailHTML($this->getEmailAdmin(), 'Заявка с сайта', $msg);
				foreach ( $fields as $field ) {
					$$field = '';
					
					$new = "h{$field}";
					$$new = '';
				}
			
			}
		}
		
$out .= <<<HTML
		<div class="form-request">
							<div class="form-request-ttl">
								<img src="template/default/img/ttl1.png" alt="">
							</div>
		<form method="post" name="submitForm" id="submitForm" enctype="multipart/form-data">
		<input type="hidden" name="orderForm" value="1" />
				<input name="email" value="{$hemail}" type="text" placeholder="E-mail" class="field">
				<input name="name" value="{$hname}" type="text" placeholder="Имя" class="field">
				<textarea name="comment" value="{$hcomment}" cols="" rows="" placeholder="Комментарий"
									class="textarea"></textarea>
				<button onclick="document.getElementById('submitForm').submit(); return false;" type="submit" class="btn-request">Отправить</button>
		</form>
</div>
HTML;
		
		$this->over = $out;
	}
	function getEmailAdmin() {
		$sql = mysql_query ( "select * from `site_setting` where `option`='email_admin'" );
		if (is_resource ( $sql ) && mysql_num_rows ( $sql ) > 0) {
			$row = mysql_fetch_assoc ( $sql );
			return $row ['value'];
		}
		return "";
	}
}

?>