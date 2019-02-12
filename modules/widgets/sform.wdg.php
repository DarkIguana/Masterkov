<?php
class sform {
	var $over = "";
	var $defValues = array ();
	function __construct(){

		$this->over=<<<HTML
			<div class="fbf">
			<form id="sform" method="post" action="">
				<table>
					<caption><span>Вызвать сметчика бесплатно</span>Приедем в удобное для Вас время</caption>
					<tr>
						<td><input type="text" name="name" placeholder="Имя"></td>
						<td><input type="text" name="phone" placeholder="Телефон/E-mail"></td>
					</tr>
				</table>
				<em><input type="button" onclick="callbackpostForm123();return false;"  name="sendsform" value="Отправить"></em>
				</form>
			</div>
HTML;

	}
}