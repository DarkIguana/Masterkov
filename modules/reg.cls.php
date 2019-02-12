<?php
class reg extends glb {
	var $over = "";
	
	function __construct() {
		if (Users::iUser () == true) {
			header ( "Location: /" );
			return true;
		}
		$_SESSION ['Road'] .= " �����������";
		Breadcrumbs::add ( "�����������" );
		BreadcrumbsTitle::add ( "�����������" );
		// $_SESSION ['Titles'] ['title'] .= " | �����������";
		$d = '<div class="about2">';
		$d .= "<h2 style='margin-top:-17px'>�����������</h2>";
		
		$d .= $this->getForm ();
		
		$d .= "</div>";
		$this->over = "<div class='text'>" . $d . "</div>";
	}
	function getMonth($num) {
		$Month = "";
		switch ($num) {
			case "01" :
				$Month = "������";
				break;
			case "02" :
				$Month = "�������";
				break;
			case "03" :
				$Month = "�����";
				break;
			case "04" :
				$Month = "������";
				break;
			case "05" :
				$Month = "���";
				break;
			case "06" :
				$Month = "����";
				break;
			case "07" :
				$Month = "����";
				break;
			case "08" :
				$Month = "�������";
				break;
			case "09" :
				$Month = "��������";
				break;
			case "10" :
				$Month = "�������";
				break;
			case "11" :
				$Month = "������";
				break;
			case "12" :
				$Month = "�������";
				break;
		}
		return $Month;
	}
	function getForm() {
		$d = "";
		$nickname = isset ( $_POST ['nickname'] ) ? strip_tags ( trim ( $_POST ['nickname'] ) ) : '';
		$secret = isset ( $_POST ['secret'] ) ? strip_tags ( trim ( $_POST ['secret'] ) ) : '';
		$name = isset ( $_POST ['name'] ) ? strip_tags ( trim ( $_POST ['name'] ) ) : '';
		$pass = isset ( $_POST ['pass'] ) ? strip_tags ( trim ( $_POST ['pass'] ) ) : '';
		$rpass = isset ( $_POST ['rpass'] ) ? strip_tags ( trim ( $_POST ['rpass'] ) ) : '';
		$lname = isset ( $_POST ['lname'] ) ? strip_tags ( trim ( $_POST ['lname'] ) ) : '';
		$phone = isset ( $_POST ['phone'] ) ? strip_tags ( trim ( $_POST ['phone'] ) ) : '';
		$phone_code = isset ( $_POST ['phone_code'] ) ? strip_tags ( trim ( $_POST ['phone_code'] ) ) : '';
		$adres = isset ( $_POST ['adres'] ) ? strip_tags ( $_POST ['adres'] ) : '';
		$current = isset ( $_POST ['current'] ) ? $_POST ['current'] : '';
		$email = isset ( $_POST ['email'] ) ? addslashes ( strtolower ( $_POST ['email'] ) ) : '';
		
		$day = isset ( $_POST ['day'] ) ? $_POST ['day'] : '';
		$month = isset ( $_POST ['month'] ) ? $_POST ['month'] : '';
		$year = isset ( $_POST ['year'] ) ? $_POST ['year'] : '';
		
		$daySelect = '<select name="day">';
		for($i = 1; $i <= 31; $i ++) {
			$num = $i;
			if (strlen ( $num ) == 1) {
				$num = '0' . $i;
			}
			$dop = '';
			if ($day == $num) {
				$dop = ' selected';
			}
			$daySelect .= '<option value="' . $num . '"' . $dop . '>' . $num . '</option>';
		}
		$daySelect .= "</select>";
		
		$monthSelect = '<select name="month">';
		for($i = 1; $i <= 12; $i ++) {
			$num = $i;
			if (strlen ( $num ) == 1) {
				$num = '0' . $i;
			}
			$dop = '';
			if ($month == $num) {
				$dop = ' selected';
			}
			$monthSelect .= '<option value="' . $num . '"' . $dop . '>' . self::getMonth ( $num ) . '</option>';
		}
		$monthSelect .= "</select>";
		
		$yearSelect = '<select name="year">';
		for($i = 1940; $i <= ( int ) date ( 'Y' ) - 17; $i ++) {
			$num = $i;
			if (strlen ( $num ) == 1) {
				$num = '0' . $i;
			}
			$dop = '';
			if ($year == $num) {
				$dop = ' selected';
			}
			$yearSelect .= '<option value="' . $num . '"' . $dop . '>' . $num . '</option>';
		}
		$yearSelect .= "</select>";
		$work = isset ( $_POST ['work'] ) ? ( int ) $_POST ['work'] : 0;
		if ($work != 0 && $work != 1 && $work != 2) {
			$work = 0;
		}
		
		$country = isset ( $_POST ['country'] ) ? ( int ) $_POST ['country'] : 174;
		$countrySelect = '<select name="country">';
		$countrySelect .= '<option value="0"' . ($country == 0 ? ' selected' : '') . '>�� �������</option>';
		foreach ( Users::$countries as $code => $countryName ) {
			$dop = '';
			if ($code == $country) {
				$dop = ' selected';
			}
			$countrySelect .= '<option value="' . $code . '"' . $dop . '>' . $countryName . '</option>';
		}
		
		$countrySelect .= '</select>';
		
		$error = 0;
		if (isset ( $_POST ['Reg'] ) && isset ( $_SESSION ['Message'] )) {
			unset ( $_POST );
		} elseif (! isset ( $_POST ['Reg'] ) && isset ( $_SESSION ['Message'] )) {
			unset ( $_SESSION ['Message'] );
		}
		if (isset ( $_POST ['Reg'] )) {
			
			$mailTest = addslashes (trim(strtolower( $_POST ['email'])));
			$sql = mysql_query ( "select COUNT(*) from `shop_users` where `email`='$mailTest'" );
			$result = mysql_result ( $sql, 0 );
			if (empty ( $name ) or empty ( $email ) or empty ( $code ) or empty ( $pass ) or empty ( $rpass )) {
				$d .= "<p style='color:red; font-weight:bold;'>�� ��������� ������������ ����</p>";
				$error ++;
			} elseif (! preg_match ( "/^[a-z0-9_.-]+@([a-z0-9_]+.)+[a-z]{2,4}$/i", $_POST ['email'] )) {
				$d .= "<p style='color:red; font-weight:bold;'>�� ��������� �������� Email �����</p>";
				$error ++;
			} elseif ($result > 0) {
				$d .= "<p style='color:red; font-weight:bold;'>����� ������������ ��� ����������</p>";
				$error ++;
			} elseif (! isset ( $_SESSION ['secret_code'] ) or isset ( $_SESSION ['secret_code'] ) && mb_strtolower ( $_SESSION ['secret_code'], 'cp1251' ) != mb_strtolower ( $secret )) {
				$d .= "<p style='color:red; font-weight:bold;'>�� ����� ������� ����� � ��������</p>";
				$error ++;
			} elseif (preg_match ( "/[�-��-�'\"]/is", $pass )) {
				$d .= "<p style='color:red; font-weight:bold;'>������ ����� ��������� ������ ��������� ����� � �����</p>";
				$error ++;
			} elseif (strlen ( $pass ) < 6) {
				$d .= "<p style='color:red; font-weight:bold;'>������ ������� ��������</p>";
				$error ++;
			} elseif ($pass != $rpass) {
				$d .= "<p style='color:red; font-weight:bold;'>������ �� ���������</p>";
				$error ++;
			}
			
			if ($error == 0) {
				$_SESSION ['Message'] = true;
				$email = isset ( $_POST ['email'] ) ? addslashes ( strtolower ( $_POST ['email'] ) ) : '';
				$pass = isset ( $_POST ['pass'] ) ? base64_encode ( $_POST ['pass'] ) : '';
				$epass = isset ( $_POST ['pass'] ) ? $_POST ['pass'] : '';
				mysql_query ( "insert into `shop_users` (`pass`, `email`) value ('$pass','$email')" );
				$newId = mysql_insert_id ();
				Users::setCookie ( $newId, md5 ( $pass ) );
				$name = mysql_real_escape_string ( $name );
				$lname = mysql_real_escape_string ( $lname );
				$nickname = mysql_real_escape_string ( $nickname );
				$birthday = mysql_real_escape_string ( "{$year}-{$month}-{$day}" );
				$work = mysql_real_escape_string ( $work );
				$phone = mysql_real_escape_string ( $phone );
				$phone_code = mysql_real_escape_string ( $phone_code );
				$country = mysql_real_escape_string ( $country );
				unset($_SESSION ['secret_code']);
				mysql_query ( "update `shop_users` set `name`='$name',`lname`='$lname',`nickname`='$nickname', `phone`='$phone',`phone_code`='$phone_code', `country`='$country', `work`='{$work}', `birthday`='{$birthday}' where `id`='{$newId}'" );
				
				$_SESSION ['user'] = $email;
				$_SESSION ['uid'] = $newId;
				$headers = 'From: robot@' . $_SERVER ['HTTP_HOST'] . "\r\n" . "Content-Type: text/html;" . 'charset="windows-1251"';
				$msg = " ������ ����! �� ������� ������ �����������.<br />
<br />
������ ��� �����:<br />
E-Mail: $_POST[email]<br />
������: $epass	<br/><br/>
		
C ���������, ������������� ����� $_SERVER[HTTP_HOST]
		";
				mail ( $_POST ['email'], "����������� �� ����� $_SERVER[HTTP_HOST]", $msg, $headers );
				return "<center><strong>�� ������� ������������������ �� �����</strong></center>";
			}
		}
		$work = '<select name="work">
		<option value="0"' . ($work == 0 ? ' selected' : '') . '>����������</option>
		<option value="1"' . ($work == 1 ? ' selected' : '') . '>��������</option>
		<option value="2"' . ($work == 2 ? ' selected' : '') . '>�������</option>
		</select>';
		
		$d .= "<form method='POST'><table width='100%' class='table_reg'>";
		$d .= "<tr><td height='30'><strong>* Email:</strong></td><td width='150'><input class='w210' type='text' name='email' value='$email'></td></tr>";
		$d .= "<tr><td height='30' width='130'><strong>��� *:</strong></td><td><input class='w210' type='text' name='name' value='" . htmlspecialchars ( $name ) . "' /></td></tr>
		<tr><td height='30' width='130'><strong>������� *:</strong></td><td><input class='w210' type='text' name='lname' value='" . htmlspecialchars ( $lname ) . "' /></td></tr>
		<tr><td height='30' width='130'><strong>�������:</strong></td><td><input class='w210' type='text' name='nickname' value='" . htmlspecialchars ( $nickname ) . "' /></td></tr>
		
		<tr><td height='30' width='130'><strong>���� ��������:</strong></td><td>{$daySelect}{$monthSelect}{$yearSelect}</td></tr>
		<tr><td height='30' width='130'><strong>������������:</strong></td><td>{$work}</td></tr>
		
		<tr><td height='30' width='130'><strong>�������:</strong></td><td>+7 (<input class='w210' style='width:40px' type='text' name='phone_code' value='$phone_code' maxlength='3' size='2'/>) <input maxlength='10' type='text' name='phone' value='$phone' class='w210' /></td></tr>
		<tr><td height='30' width='130'><strong>������:</strong></td><td>{$countrySelect}</td></tr>
		";
		$d .= "<tr><td height='30'><strong>* ������:</strong></td><td><input class='w210' type='password' name='pass' ></td></tr>";
		$d .= "<tr><td height='15'>&nbsp;</td><td style='font-size:9px;vertical-align:top; text-align:left;'>������� 6 ��������</td></tr>";
		$d .= "<tr><td height='30'><strong>* ��������� ������:</strong></td><td><input class='w210' type='password' name='rpass'></td></tr>";
		
		$d .= "<tr><td height='30'><strong>* ������� ����� � ��������:</strong></td><td><input class='w210' type='text' name='secret'></td></tr>";
		$d .= "<tr><td height='30'>&nbsp;</td><td><img src='/getcaptcha.php' /></td></tr>";
		
		$d .= "<tr><td>&nbsp;</td><td><input type='submit' name='Reg' class='reg_in' value='�����������'></td></tr>";
		$d .= "</table></form>";
		return $d;
	}
}