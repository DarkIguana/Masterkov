<?php
class sform {
	var $over = "";
	var $defValues = array ();
	function __construct(){

		$this->over=<<<HTML
			<div class="fbf">
			<form id="sform" method="post" action="">
				<table>
					<caption><span>������� �������� ���������</span>������� � ������� ��� ��� �����</caption>
					<tr>
						<td><input type="text" name="name" placeholder="���"></td>
						<td><input type="text" name="phone" placeholder="�������/E-mail"></td>
					</tr>
				</table>
				<em><input type="button" onclick="callbackpostForm123();return false;"  name="sendsform" value="���������"></em>
				</form>
			</div>
HTML;

	}
}