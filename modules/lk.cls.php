<?php
class lk extends glb {
	var $over = "";
	var $params = array('template'=>'cabinet2');
	function toIndex() {
		return header ( "Location:/" );
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
	function changeData(){
		$d = "";
			
		$d .= '<div class="about">';
		$row = Users::$row;
		$nickname = isset ( $_POST ['nickname'] ) ? strip_tags ( trim ( $_POST ['nickname'] ) ) : $row ['nickname'];
		
		$name = isset ( $_POST ['name'] ) ? strip_tags ( trim ( $_POST ['name'] ) ) : $row ['name'];
		$lname = isset ( $_POST ['lname'] ) ? strip_tags ( trim ( $_POST ['lname'] ) ) : $row ['lname'];
		$phone = isset ( $_POST ['phone'] ) ? strip_tags ( trim ( $_POST ['phone'] ) ) : $row ['phone'];
		$phone_code = isset ( $_POST ['phone_code'] ) ? strip_tags ( trim ( $_POST ['phone_code'] ) ) : $row ['phone_code'];
		$adres = isset ( $_POST ['adres'] ) ? strip_tags ( $_POST ['adres'] ) : $row ['address'];
		$current = isset ( $_POST ['current'] ) ? $_POST ['current'] : '';
		$time = strtotime(Users::$row['birthday']);
		$day = isset($_POST['day'])?$_POST['day']:date('d', $time);
		$month = isset($_POST['month'])?$_POST['month']:date('m', $time);
		$year = isset($_POST['year'])?$_POST['year']:date('Y', $time);
		
		$daySelect = '<select name="day">';
		for ($i=1;$i<=31;$i++){
			$num = $i;
			if (strlen($num)==1){
				$num='0'.$i;
			}
			$dop = '';
			if ($day==$num){
				$dop=' selected';
			}
			$daySelect.='<option value="'.$num.'"'.$dop.'>'.$num.'</option>';
		}
		$daySelect.="</select>";
		
		$monthSelect = '<select name="month">';
		for ($i=1;$i<=12;$i++){
			$num = $i;
			if (strlen($num)==1){
				$num='0'.$i;
			}
			$dop = '';
			if ($month==$num){
				$dop=' selected';
			}
			$monthSelect.='<option value="'.$num.'"'.$dop.'>'.self::getMonth($num).'</option>';
		}
		$monthSelect.="</select>";
		
		$yearSelect = '<select name="year">';
		for ($i=1940;$i<=(int)date('Y')-17;$i++){
			$num = $i;
			if (strlen($num)==1){
				$num='0'.$i;
			}
			$dop = '';
			if ($year==$num){
				$dop=' selected';
			}
			$yearSelect.='<option value="'.$num.'"'.$dop.'>'.$num.'</option>';
		}
		$yearSelect.="</select>";
		$work = isset($_POST['work'])?(int)$_POST['work']:$row['work'];
		if ($work!=0 && $work!=1 && $work!=2){
			$work = 0;
		}
		
		$country = isset($_POST['country'])?(int)$_POST['country']:$row['country'];
		$countrySelect = '<select name="country">';
		$countrySelect.='<option value="0"'.($country==0?' selected':'').'>�� �������</option>';
		foreach (Users::$countries as $code=>$countryName){
			$dop = '';
			if ($code==$country){
				$dop = ' selected';
			}
			$countrySelect.='<option value="'.$code.'"'.$dop.'>'.$countryName.'</option>';
		}
		
		$countrySelect.='</select>';
		if (isset ( $_POST ['save'] )) {
			if (empty ( $name ) or empty ( $lname ) or empty ( $current )) {
				$d .= '<center><strong>�� �� ��������� ������������ ����</center><br/>';
			}elseif (!checkdate($month, $day, $year)){
				$d .= '<center><strong>�� ����� ���������� ���� ��������</center><br/>';
			} else {
				if ($row ['pass'] != base64_encode ( $current )) {
					$d .= '<center><strong>������� ������ ����� �� �����</center><br/>';
				} else {
					$name = mysql_real_escape_string( $name );
					$lname = mysql_real_escape_string( $lname );
					$nickname = mysql_real_escape_string( $nickname );
					$birthday = mysql_real_escape_string("{$year}-{$month}-{$day}");
					$work = mysql_real_escape_string($work);
					$phone =  mysql_real_escape_string ( $phone );
					$phone_code =  mysql_real_escape_string ( $phone_code );
					$country = mysql_real_escape_string ( $country );
					
					mysql_query ( "update `shop_users` set `name`='$name',`lname`='$lname',`nickname`='$nickname', `phone`='$phone',`phone_code`='$phone_code', `country`='$country', `work`='{$work}', `birthday`='{$birthday}' where `id`='{$row['id']}'" );
					$d .= '<center><strong>������ ������� ��������� </center><br/>';
					//header("Location: /lk.html");
				}
			}
		}
		
		
		
		$work = '<select name="work">
		<option value="0"'.($work==0?' selected':'').'>����������</option>
		<option value="1"'.($work==1?' selected':'').'>��������</option>
		<option value="2"'.($work==2?' selected':'').'>�������</option>
		</select>';
		
		
		$d .= "
		<form method='POST'>
		<table class='table_reg'>
		<tr><td height='30' width='140'><strong>E-mail:</strong></td><td>$row[email]</td></tr>
		
		<tr><td height='30' width='130'><strong>��� *:</strong></td><td><input type='text' class='w210' name='name' value='".htmlspecialchars($name)."' /></td></tr>
		<tr><td height='30' width='130'><strong>������� *:</strong></td><td><input type='text' class='w210' name='lname' value='".htmlspecialchars($lname)."' /></td></tr>
		<tr><td height='30' width='130'><strong>�������:</strong></td><td><input type='text' class='w210' name='nickname' value='".htmlspecialchars($nickname)."' /></td></tr>
		
		<tr><td height='30' width='130'><strong>���� ��������:</strong></td><td>{$daySelect}{$monthSelect}{$yearSelect}</td></tr>
		<tr><td height='30' width='130'><strong>������������:</strong></td><td>{$work}</td></tr>
		
		<tr><td height='30' width='130'><strong>�������:</strong></td><td>+7 (<input class='w210' style='width:50px' type='text' name='phone_code' value='$phone_code' maxlength='3' size='2'/>) <input maxlength='10' type='text' name='phone' value='$phone' class='w210' /></td></tr>
		<tr><td height='30' width='130'><strong>������:</strong></td><td>{$countrySelect}</td></tr>
		<tr><td height='30' width='130'><strong>������� ������ *:</strong></td><td><input class='w210' type='password' name='current' value='$current'></td></tr>
		<tr><td colspan='2'><br/><br/><center><input type='submit' value='���������' name='save' /> &nbsp; <a href='?lk&change''>�������� ������</a></center></td></tr>
		</table>
		</form>
		";
		$d .= "</center></div>";
		return "<div class='infoBlock1'><h2>��������� ������ ������</h2>" . $d . "</div>";
		
	}
	function __construct() {
		if (isset ( $_GET ['logout'] )) {
			Users::unsetCookie();
			unset ( $_SESSION ['user'] );
			unset ( $_SESSION ['uid'] );
			$this->toIndex ();
			return true;
		}
		$d = "";
		//var_dump(Users::iUser());
		if (Users::iUser()==true) {
			if (isset ( $_GET ['change'] )) {
				
				$error = 0;
				$current = isset ( $_POST ['current'] ) ? $_POST ['current'] : '';
				$user = Users::$row['id'];
				$pass = isset ( $_POST ['pass'] ) ? $_POST ['pass'] : '';
				$rpass = isset ( $_POST ['rpass'] ) ? $_POST ['rpass'] : '';
				Breadcrumbs::add ( "����� ������" );
				BreadcrumbsTitle::add ( "����� ������" );
				$d .= '<div class="about2">';
				$d .= "<!--<p align='center'><strong>����� ������</strong></p>--><center>";
				if (isset ( $_POST ['change'] )) {
					if (empty ( $current ) or empty ( $pass ) or empty ( $rpass )) {
						$d .= "<p style='color:red; font-weight:bold;'>�� ��������� ������������ ����</p>";
						$error ++;
					} else {
						$curr = base64_encode ( $current );
						
						$row = Users::$row;
						if ($curr != $row ['pass']) {
							$d .= "<p style='color:red; font-weight:bold;'>������� ������ ����� �� �����</p>";
							$error ++;
						} elseif (base64_decode ( $row ['pass'] ) == $pass) {
						
						} elseif (strlen ( $pass ) < 6) {
							$d .= "<p style='color:red; font-weight:bold;'>������ ������� ��������</p>";
							$error ++;
						} 

						elseif ($pass != $rpass) {
							$d .= "<p style='color:red; font-weight:bold;'>������ �� ���������</p>";
							$error ++;
						}
						if ($error == 0) {
							$pass = base64_encode ( $pass );
							mysql_query ( "update `shop_users` set `pass`='$pass' where `id`='$user'" );
							$d .= "������ ������� �����";
							$d .= "</center></div>";
							$this->over = $d;
							return true;
						}
					}
				
				}
				
				$d .= "
			<form method='POST'>
			<table style='margin-bottom:130px'>
			<tr><td height='30' width='130'><strong>������� ������:</strong></td><td><input class='w210' type='password' name='current' value='$current'></td></tr>
			<tr><td><strong>����� ������:</strong></td><td><input class='w210' type='password' name='pass'></td></tr>
			<tr><td height='15'>&nbsp;</td><td style='font-size:9px;vertical-align:top; text-align:right;'>������� 6 ��������</td></tr>
			<tr><td height='30'><strong>��������� ������:</strong></td><td><input type='password' class='w210' name='rpass'></td></tr>
			<tr><td>&nbsp;</td><td><br /><input type='submit' name='change' value='������� ������'></td></tr>
			</table>
			</form>
			";
				
				$d .= "</center></div>";
				$this->over = "<div class='infoBlock1'><h2>��������� ������</h2>" . $d . "</div>";
				return true;
			}
			/* else {
				$user = ( int ) $_SESSION ['uid'];
				$sql = mysql_query ( "select * from `shop_users` where `id`='$user'" );
				if (mysql_num_rows ( $sql ) > 0) {
					$d = "";
					
					$d .= '<div class="about">';
					$d .= "<p align='center'><strong>������ �������</strong></p><center>";
					
					$row = mysql_fetch_array ( $sql );
					$fio = isset ( $_POST ['fio'] ) ? strip_tags ( trim ( $_POST ['fio'] ) ) : $row ['name'];
					$tel = isset ( $_POST ['tel'] ) ? strip_tags ( trim ( $_POST ['tel'] ) ) : $row ['phone'];
					$adres = isset ( $_POST ['adres'] ) ? strip_tags ( $_POST ['adres'] ) : $row ['address'];
					$current = isset ( $_POST ['current'] ) ? $_POST ['current'] : '';
					
					if (isset ( $_POST ['save'] )) {
						if (empty ( $fio ) or empty ( $current )) {
							$d .= '<center><strong>�� �� ��������� ������������ ����</center><br/>';
						} else {
							if ($row ['pass'] != base64_encode ( $current )) {
								$d .= '<center><strong>������� ������ ����� �� �����</center><br/>';
							} else {
								$fio = addslashes ( $fio );
								$tel = addslashes ( $tel );
								$adres = addslashes ( $adres );
								mysql_query ( "update `shop_users` set `name`='$fio', `phone`='$tel', `address`='$adres' where `id`='$user'" );
								$d .= '<center><strong>������ ������� ��������� </center><br/>';
							}
						}
					}
					$d .= "
			<form method='POST'>
			<table>
			<tr><td height='30' width='140'><strong>E-mail:</strong></td><td>$row[email]</td></tr>
			<tr><td height='30' width='130'><strong>�.�.� *:</strong></td><td><input type='text' name='fio' value='$fio' /></td></tr>
			<tr><td height='30' width='130'><strong>�������:</strong></td><td><input type='text' name='tel' value='$tel' /></td></tr>
			<tr><td height='30' width='130'><strong>�����:</strong></td><td><textarea name='adres' style='height:50px; '>$adres</textarea></td></tr>
			<tr><td height='30' width='130'><strong>������� ������ *:</strong></td><td><input type='password' name='current' value='$current'></td></tr>
			<tr><td colspan='2'><br/><br/><center><input type='submit' value='���������' name='save' /> &nbsp; <a href='?lk&change' style='color:white'>�������� ������</a></center></td></tr>
			</table>
			</form>
			";
					$d .= "</center></div>";
					$this->over = "<div class='text'>" . $d . "</div>";
					return true;
				} else {
				
				}
			}
			*/
			
			if (isset($_GET['changedata'])){
			
				
				$this->over = $this->changeData();
				return true;
			
		}
		
		$sms = '�� ����������';
		if (!empty(Users::$row['phone']) && !empty(Users::$row['phone_code'])){
			$sms = '+7 ('.Users::$row['phone_code'].') '.Users::$row['phone'].'';
		}
		$birthday = '�� ����������';
		if (Users::$row['birthday']!='0000-00-00'){
			$time = strtotime(Users::$row['birthday']);
			$birthday = date('d', $time).' '.self::getMonth(date("m", $time)).' '.date('Y', $time).' �.';
		}
		
			$out = '';
			$out.='<div class="infoBlock1">
		<h2>������ �������</h2>
		<div class="userpic"><img src="template/default/img/pic72.jpg" alt="" /></div>
		
		<div class="userinfo">
			<table>
				<tr>
					<th colspan="2">'.Users::$row['nickname'].'<img src="template/default/img/klarpic1.gif" alt="" class="klarpic1" /><img src="'.Users::getFlag().'" alt="" class="klarpic2" /></th>
				</tr>
				<tr>
					<td>�����:</td>
					<td><a href="mailto:'.Users::$row['email'].'">'.Users::$row['email'].'</a></td>
				</tr>
				<tr>
					<td>���:</td>
					<td>'.Users::$row['name'].'</td>
				</tr>
				<tr>
					<td>�������:</td>
					<td>'.Users::$row['lname'].'</td>
				</tr>
				<tr>
					<td>���� ��������:</td>
					<td>'.$birthday.'</td>
				</tr>
				<tr>
					<td>������������ �������� ��������:</td>
					<td><input type="checkbox" checked="checked" class="check16" /><img src="template/default/img/pic16c-on.gif" class="pic16" alt="" /></td>
				</tr>
				<tr>
					<td>�������� SMS:</td>
					<td>'.$sms.'</td>
				</tr>
			</table>
		</div>
		<a class="btn144a" href="?lk&changedata"><img src="template/default/img/pic144a.jpg" alt="" /></a>
		
		<div class="statusBlock2">
			<img src="template/default/img/pic105b.jpg" alt="" />
			<ul>
				<li><span><img src="template/default/img/pic15.gif" alt="" />+15</span><a href="#">������ ����������</a></li>
				<li><span><img src="template/default/img/pic15.gif" alt="" />+42</span><a href="#">�������� � ������ ����</a></li>				
			</ul>
			
		</div>
	</div>';
			
			
			$out.='	<div class="infoBlock2" style="float:left">
		<ul class="tabs25">
			<li class="act1">������ ���� �����</li>
			<li>������� outfit</li>
			<li>Create your fashion wall</li>
			<li>���������</li>
			<li>������</li>
			
		</ul>
		
		<div class="tabContent">
			<p>������ � ����������</p>
		</div>
		
		<div class="tabContent"><p>������ � ����������</p></div>
		<div class="tabContent"><p>������ � ����������</p></div>
		<div class="tabContent"><p>������ � ����������</p></div>
		<div class="tabContent"><p>������ � ����������</p></div>
	
		
		<div class="infoBlock2Bottom"><img src="template/default/img/pix.gif" alt="" height="10" width="1" /></div>
	</div>
	
	<div class="block204">
		<img src="template/default/img/pic137.jpg" alt="" /><br /><br />
		<p>������� �� �����:<span>150 000 ���. </span></p>
		<p>��� ����������� �����������:</p><br />
		<input type="text" class="w160" />
		<a href="#" class="btn73"><img src="template/default/img/btn73.gif" alt="" /></a>
	</div>';
			
			$this->over = $out;
		   return true;
		}
		if (isset ( $_GET ['recover'] )) {
			Breadcrumbs::add ( "�������������� ������" );
			BreadcrumbsTitle::add ( "�������������� ������" );
			$email = isset ( $_POST ['email'] ) ? $_POST ['email'] : '';
			if (isset ( $_POST ['recover'] )) {
				if (empty ( $email )) {
					$d .= "<p style='color:red; font-weight:bold;'>�� ��������� ������������ ����</p>";
				} else {
					$email = strtolower ( addslashes ( $email ) );
					$sql = mysql_query ( "select * from `shop_users` where `email`='$email' limit 1" );
					if (mysql_num_rows ( $sql ) > 0) {
						$row = mysql_fetch_array ( $sql );
						$epass = base64_decode ( $row ['pass'] );
						$d .= '<div class="about">';
						$d .= "<p align='center'><strong>������������� ������</strong></p><center>";
						$d .= "��� ������ ��� ������ �� ��������� email �����<br/><br/>";
						$d .= "</center></div>";
						$this->over = $d;
						$headers = 'From: robot@' . $_SERVER ['HTTP_HOST'] . "\r\n" . "Content-Type: text/html;" . 'charset="windows-1251"';
						$msg = "�������������� ������ ��� ����� �� ���� <a href='http://www.$_SERVER[HTTP_HOST]'>$_SERVER[HTTP_HOST]</a>.<br />
<br />
������ ��� �����:<br />
E-Mail: $row[user]<br />
������: $epass	<br/><br/>
		
C ���������, ������������� ����� <a href='http://www.$_SERVER[HTTP_HOST]'>$_SERVER[HTTP_HOST]</a>
		";
						mail ( $row ['user'], "�������������� ������", $msg, $headers );
						return true;
					} else {
						$d .= "<p style='color:red; font-weight:bold;'>������������ � ����� Email ������� �� �������</p>";
					}
				}
			}
			$d .= '<div class="about2">';
			$d .= "<h2 align='center'>�������������� ������</h2><center>";
			
			$d .= "
			<form method='POST'>
			<table style='margin-bottom:140px'>
			<tr><td height='30' width='150'><strong>������� ���� Email:</strong></td><td><input class='w210' type='text' name='email'></td></tr>
			<tr><td colspan='7' ><center><br /><input type='submit' class='reg_in' name='recover' value='��������� ������'></center></td></tr>
			</table>
			</form>
			<br/><br/>
			";
			$d .= "</center></div>";
			$this->over = "<div class='text'>" . $d . "</div>";
			return true;
		}
		$error = 0;
		// print_r($_SESSION);
		Breadcrumbs::add ( "������ �������" );
		BreadcrumbsTitle::add ( "������ �������" );
		$d .= '<div class="about">';
		$d .= "<h2 style='text-align:center'>������ �������</h2><center>";
		$email = isset ( $_POST ['email'] ) ? $_POST ['email'] : '';
		$pass = isset ( $_POST ['pass'] ) ? $_POST ['pass'] : '';
		if (isset ( $_POST ['Login'] )) {
			if (empty ( $email ) or empty ( $pass )) {
				$d .= "<p style='color:red; font-weight:bold;'>�� ��������� ������������ ����</p>";
				$error ++;
			} else {
				$email = strtolower ( addslashes ( $email ) );
				$pass = base64_encode ( $pass );
				$sql = mysql_query ( "select `id`, `pass` from `shop_users` where `email`='$email' and `pass`='$pass'" );
				if (is_resource ( $sql ) && mysql_num_rows ( $sql ) > 0) {
					$row = mysql_fetch_array ( $sql );
					Users::setCookie($row['id'], md5(base64_encode($row['pass'])));
					$_SESSION ['user'] = $email;
					$_SESSION ['uid'] = ( int ) $row ['id'];
					$this->toIndex ();
					$_SESSION ['user'] = $email;
					$_SESSION ['uid'] = ( int ) $row ['id'];
				} else {
					$d .= "<p style='color:red; font-weight:bold;'>�������� ���� Email ��� ������ �� ���������</p>";
					$error ++;
				}
			}
		}
		
		$d .= "
			<form method='POST'>
			<table style='margin-bottom:120px'>
			<tr><td height='30' width='80'><strong>Email:</strong></td><td><input class='w210' type='text' name='email'></td></tr>
			<tr><td height='30'><strong>������:</strong></td><td><input class='w210' type='password' name='pass'></td></tr>
			<tr><td>&nbsp;</td><td><br /><input type='submit' name='Login' value='�����'>&nbsp; <br/><br/> <a href='?reg'>�����������</a> | <a href='?lk&recover=password'>������ ������?</a><center></td></tr>
			</table>
			</form>
			";
		$d .= "</center></div>";
		$this->over = "<div class='text'>" . $d . "</div>";
	}
}