<?php
class comments extends glb {
	var $over = "";
	var $params = array (
			"template" => "index" 
	);
	function __construct() {
		if (isset ( $_POST ['ajax'] )) {
			Header ( "Content-type: text/html; charset=utf-8" );
			$id = isset ( $_POST ['id'] ) ? ( int ) $_POST ['id'] : 0;
			$sql = mysql_query ( "select * from `reviews` where `active`!=2 and `id`!='{$id}' order by rand() desc limit 1" );
			if (is_resource ( $sql ) && mysql_num_rows ( $sql ) > 0) {
				$row = mysql_fetch_assoc ( $sql );
				$out = '
			
					
                		<b>����� � �������</b>
		<p>' . $row ['text'] . '<span><span>' . $row ['name'] . '</span></span></p>
		<a href="#" class="rev" id="reviewsb" ><span>��������� �����</span></a>
			
			
			
			';
				echo iconv ( 'windows-1251', 'utf-8', $out );
			}
			exit ();
		}
		
		$values = array ();
		$values ['name'] = isset ( $_POST ['name'] ) ? $this->no ( $_POST ['name'] ) : '';
		$values ['code'] = isset ( $_POST ['code'] ) ? $this->no ( $_POST ['code'] ) : '';
		$values ['email'] = isset ( $_POST ['email'] ) ? $this->no ( $_POST ['email'] ) : '';
		$values ['where'] = isset ( $_POST ['where'] ) ? $this->no ( $_POST ['where'] ) : '';
		$values ['answer'] = isset ( $_POST ['answer'] ) ? $this->no ( $_POST ['answer'] ) : '';
		extract ( $values );
		$error = "";
		if (isset ( $_POST ['submitReview'] )) {
			$codeImage = $_SESSION ['secret_code'];
			if (! $this->test ( $name ) or ! $this->test ( $email ) or ! $this->test ( $answer ) or ! $this->test ( $code )) {
				$error .= "<p align='center' style='color:red'><b>�� ��������� ������������ ����</b></p>";
			} elseif ($codeImage != $code) {
				$error .= "<p align='center' style='color:red'><b>����� � �������� �������� �� �����</b></p>";
			} elseif (! preg_match ( "/^[a-z0-9_.-]+@([a-z0-9_]+.)+[a-z]{2,4}$/i", $email )) {
				$error .= "<p align='center' style='color:red'><b>�� ��������� ��������� ���� EMail</b></p>";
			} else {
				
				$msg = "<b>���:</b>$name<br/>
				<b>Email:</b>$email<br/>
				<b>������:</b>$answer<br/>";
				$name = addslashes ( $name );
				$email = addslashes ( $email );
				$where = addslashes ( $where );
				$answer = addslashes ( $answer );
				$page = addslashes ( $_SERVER ['REQUEST_URI'] );
				$ip = addslashes ( $_SERVER ['REMOTE_ADDR'] );
				$time = time ();
				mysql_query ( "insert into `reviews` (`name`, `email`, `text`, `active`, `date`) value ('$name', '$email',  '$answer', '1', '$time')" );
				$headers = 'From: robot@' . $_SERVER ['HTTP_HOST'] . "\r\n" . "Content-Type: text/html;" . 'charset="windows-1251"';
				// mail ( $this->getEmail (), " ������ � ����� " . $_SERVER
				// ['HTTP_HOST'], $msg, $headers ); //2sell@mail.ru
				$name = "";
				$email = "";
				$where = "";
				$answer = "";
				unset ( $_SESSION ['secret_code'] );
				$error .= "<p align='center' style='color:red'><b>��� ����� ������� ��������!</b></p>";
			}
		}
		
		$d = '';
		$dop = '';
		if (isset ( $_GET ['page'] )) {
			$dop = ' - �������� ' . $_GET ['page'];
		}
		BreadcrumbsTitle::set ( '������ � ������ � ��������� ��������� - ���������� ������� � ������ ������� � ������' . $dop );
		$_SESSION ['Titles'] ['desc'] = '������ � ������ � ��������� ���������, ������ ����� �������� � ����������� ���������� ��������� �����.';
		$_SESSION ['Titles'] ['keys'] = '������ � ���������';
		Breadcrumbs::add ( "<a href=\"?reviews\">������</a>" );
		$page = isset ( $_GET ['page'] ) ? $_GET ['page'] - 1 : 0;
		$limit = 10;
		$start = abs ( $limit * $page );
		$sql = mysql_query ( "select * from `reviews` where `active`!=2 order by `date` desc limit $start, $limit" );
		$count = mysql_result ( mysql_query ( "select COUNT(*) from `reviews` where `active`!=2" ), 0 );
		
		if ($count == 0) {
			$this->over = "<p>��� �� ������ ������</p>" . $this->form ( $error );
			return true;
		}
		$page = isset ( $_GET ['page'] ) ? $_GET ['page'] : 1;
		$numPages = ceil ( $count / $limit );
		
		$d .= '<div class="review-in">
				
				
				<img class="review-pic-in" alt="" src="template/default/img/review-pic.png">';
		while ( $row = mysql_fetch_array ( $sql ) ) {
			$d .= '<div class="review-in-item">
                    	<div class="review-in-author">' . $row ['name'] . '</div>
                        <div class="review-in-date">' . $this->date_rus ( $row ['date'] ) . '</div>
                        <div class="cl"></div>
                        <div class="review-in-cont">
                        	<p> ' . nl2br ( trim ( $row ['text'] ) ) . '</p>
                        	<img alt="" src="template/default/img/review-arrow.png">
                        </div>
                    </div>	';
		}
		/*
		 * $d .= "</div><br />��������: ";
		 * for($i = 1; $i <= $numPages; $i ++) {
		 * if ($i == $page) {
		 * $d .= "<strong>$i</strong>&nbsp;&nbsp;";
		 * } else {
		 * if ($i == 1) {
		 * $d .= "<a href='?reviews'>$i</a>&nbsp;&nbsp;";
		 * } else {
		 * $d .= "<a href='?reviews&page=$i'>$i</a>&nbsp;&nbsp;";
		 * }
		 * }
		 * }
		 */
		
		$d .= "</center>";
		
		$d .= "";
		$this->over .= $d; // . $this->form ( $error );
	}
	function getEmail() {
		$sql = mysql_query ( "SELECT * FROM `site_setting` WHERE `option` = 'admin_email'" );
		if (mysql_num_rows ( $sql ) > 0) {
			$row = mysql_fetch_assoc ( $sql );
			return $row ['value'];
		}
	}
	function date_rus($time = "") {
		$day = date ( "j", $time );
		$month = date ( "m", $time );
		$year = date ( "Y", $time );
		$hour = date ( "H", $time );
		$minute = date ( "i", $time );
		$dd = date ( 'w', $time );
		
		switch ($dd) {
			case 0 :
				$dd = '�����������';
				break;
			case 1 :
				$dd = '�����������';
				break;
			case 2 :
				$dd = '�������';
				break;
			case 3 :
				$dd = '�����';
				break;
			case 4 :
				$dd = '�������';
				break;
			case 5 :
				$dd = '�������';
				break;
			case 6 :
				$dd = '�������';
				break;
		}
		
		switch ($month) {
			case '01' :
				$month = "������";
				break;
			case '02' :
				$month = "�������";
				break;
			case '03' :
				$month = "�����";
				break;
			case '04' :
				$month = "������";
				break;
			case '05' :
				$month = "���";
				break;
			case '06' :
				$month = "����";
				break;
			case '07' :
				$month = "����";
				break;
			case '08' :
				$month = "�������";
				break;
			case '09' :
				$month = "��������";
				break;
			case '10' :
				$month = "�������";
				break;
			case '11' :
				$month = "������";
				break;
			case '12' :
				$month = "�������";
				break;
		}
		return "$day $month $year �.";
	}
	function no($str) {
		$str = str_replace ( "{", "", $str );
		$str = str_replace ( "}", "", $str );
		return strip_tags ( ($str) );
	}
	function test($str) {
		return preg_match ( "/[a-zA-Z0-9�-��-�]/is", $str );
	}
	function form($error) {
		$d = "";
		$values = array ();
		$values ['name'] = isset ( $_POST ['name'] ) ? $this->no ( $_POST ['name'] ) : '';
		$values ['code'] = isset ( $_POST ['code'] ) ? $this->no ( $_POST ['code'] ) : '';
		$values ['email'] = isset ( $_POST ['email'] ) ? $this->no ( $_POST ['email'] ) : '';
		$values ['where'] = isset ( $_POST ['where'] ) ? $this->no ( $_POST ['where'] ) : '';
		$values ['answer'] = isset ( $_POST ['answer'] ) ? $this->no ( $_POST ['answer'] ) : '';
		extract ( $values );
		// $error = "";
		/*
		 * if (isset ( $_POST ['submitReview'] )) { $codeImage = $_SESSION
		 * ['secret_code']; if (! $this->test ( $name ) or ! $this->test (
		 * $email ) or ! $this->test ( $answer ) or ! $this->test ( $code )) {
		 * $error .= "<p align='center' style='color:red'><b>�� ����������
		 * ������������ ����</b></p>"; } elseif ($codeImage != $code) { $error
		 * .= "<p align='center' style='color:red'><b>����� � �������� ��������
		 * �� �����</b></p>"; } elseif (! preg_match (
		 * "/^[a-z0-9_.-]+@([a-z0-9_]+.)+[a-z]{2,4}$/i", $email )) { $error .=
		 * "<p align='center' style='color:red'><b>�� ��������� ��������� ����
		 * EMail</b></p>"; } else { $msg = "<b>���:</b>$name<br/>
		 * <b>Email:</b>$email<br/> <b>������:</b>$answer<br/>"; $name =
		 * addslashes ( $name ); $email = addslashes ( $email ); $where =
		 * addslashes ( $where ); $answer = addslashes ( $answer ); $page =
		 * addslashes ( $_SERVER ['REQUEST_URI'] ); $ip = addslashes ( $_SERVER
		 * ['REMOTE_ADDR'] ); $time = time (); mysql_query ( "insert into
		 * `reviews` (`name`, `email`, `text`, `active`, `date`) value ('$name',
		 * '$email', '$answer', '1', '$time')" ); $headers = 'From: robot@' .
		 * $_SERVER ['HTTP_HOST'] . "\r\n" . "Content-Type: text/html;" .
		 * 'charset="windows-1251"'; //mail ( $this->getEmail (), " ������ �
		 * ����� " . $_SERVER ['HTTP_HOST'], $msg, $headers ); //2sell@mail.ru
		 * $name = ""; $email = ""; $where = ""; $answer = ""; $error .= "<p
		 * align='center' style='color:red'><b>��� ����� �������
		 * ��������!</b></p>"; } }
		 */
		$d .= ' <p align="center">&nbsp;</p>
		<p class="p_comments">�������� �����</p>
		<a name="addComment"></a>
      
     ' . $error . '
     
      <table id="reviewsForm" >
      
        <tr>
          <td><form method="post">
     
      <strong>���� ���:</strong>
      <input type="text" name="name" value="' . htmlspecialchars ( $name ) . '" class="inp1" />
      <strong>E-mail (�� ������������ �� �����):</strong>
      <input type="text" name="email" value="' . htmlspecialchars ( $email ) . '" class="inp1" />
     
      <strong>����� ������:</strong>
      <textarea rows="4" cols="40" name="answer" class="inp2">' . $answer . '</textarea>
	  <strong>������� ����� � ��������</strong>
		<table><tr><td width="220"  style="vertical-align:middle"><input type="text" name="code" class="inp1" style="width:200px" /></td><td style="vertical-align:top"><img src="getcaptcha.php"  height="35"/></td></tr></table>
      
    
<br/>
      <input type="submit" class="button56" name="submitReview" value="�������� �����" /></form>
      </form></td>
        </tr>
      </table>
      
      
      <p >&nbsp;</p>
		';
		return $d;
	}
}
class comments_admin extends admin {
	function __construct() {
		if (! isset ( $_SESSION ['admin'] )) {
			exit ();
		}
	}
	function SaveRecord() {
		$name = isset ( $_POST ['name'] ) ? addslashes ( $this->encode ( $_POST ['name'] ) ) : '';
		$text = isset ( $_POST ['text'] ) ? addslashes ( $this->encode ( $_POST ['text'] ) ) : '';
		$email = isset ( $_POST ['email'] ) ? addslashes ( $this->encode ( $_POST ['email'] ) ) : '';
		$answer = isset ( $_POST ['answer'] ) ? addslashes ( $this->encode ( $_POST ['answer'] ) ) : '';
		$city = isset ( $_POST ['city'] ) ? addslashes ( $this->encode ( $_POST ['city'] ) ) : '';
		$homepage = isset ( $_POST ['homepage'] ) ? addslashes ( $this->encode ( $_POST ['homepage'] ) ) : '';
		$id = isset ( $_POST ['id'] ) ? addslashes ( $_POST ['id'] ) : 0;
		$date = isset ( $_POST ['date'] ) ? strtotime ( $_POST ['date'] ) : 0;
		
		if (empty ( $id ) or $id == 0) {
			mysql_query ( "insert into `reviews` (`name`, `text`, `active`, `email`, `answer`, `city`, `homepage`, `date`) value ('$name', '$text', '1', '$email', '$answer', '$city', '$homepage', '$date')" );
		} else {
			mysql_query ( "update `reviews` set `name`='$name', `email`='$email', `city`='$city', `homepage`='$homepage', `text`='$text', `answer`='$answer', `date`='$date' where `id`='$id'" );
		}
		echo "{success:true}";
	}
	function UpdateRecord() {
		$active = isset ( $_POST ['active'] ) ? mysql_real_escape_string ( $_POST ['active'] ) : 2;
		$id = isset ( $_POST ['id'] ) ? mysql_real_escape_string ( $_POST ['id'] ) : 0;
		if (! empty ( $id ) && $id != 0) {
			mysql_query ( "update `reviews` set `active`='$active' where `id`='$id'" );
		}
		echo "33";
	}
	function DeleteRecord() {
		$id = isset ( $_POST ['id'] ) ? ( int ) $_POST ['id'] : 0;
		if (! empty ( $id ) && $id != 0) {
			mysql_query ( "delete from `reviews` where `id`='$id' limit 1" );
		}
		echo "55";
	}
	function Listing() {
		$sql_count = "SELECT * FROM reviews order by `active` desc";
		$sql = $sql_count . " LIMIT " . ( int ) $_POST ['start'] . ", " . ( int ) $_POST ['limit'];
		$rs_count = mysql_query ( $sql_count );
		$rows = mysql_num_rows ( $rs_count );
		$rs = mysql_query ( $sql );
		if ($rows > 0) {
			while ( $obj = mysql_fetch_array ( $rs ) ) {
				
				$arr ['id'] = $this->en ( $obj ['id'] );
				$arr ['name'] = $this->en ( $obj ['name'] );
				$arr ['date'] = date ( "d-m-Y", $obj ['date'] );
				$arr ['answer'] = $this->en ( $obj ['answer'] );
				$arr ['answerHtml'] = $this->en ( nl2br ( $obj ['answer'] ) );
				$arr ['city'] = $this->en ( $obj ['city'] );
				$arr ['homepage'] = $this->en ( $obj ['homepage'] );
				$arr ['email'] = $this->en ( $obj ['email'] );
				$arr ['text'] = $this->en ( $obj ['text'] );
				$arr ['textHtml'] = $this->en ( nl2br ( $obj ['text'] ) );
				$arr ['active'] = $obj ['active'];
				$new [] = $arr;
			}
			$jsonresult = $this->JEncode ( $new );
			echo '({"total":"' . $rows . '","results":' . $jsonresult . '})';
		} else {
			echo '({"total":"0", "results":""})';
		}
	}
}