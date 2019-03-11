<?php
session_start ();
session_cache_limiter ( 'nocache' );

require ("classes/global.php");
$glb = new glb ();
$glb->connect_db ();
$values = array ();
$names = array ();
Header ( "Content-type: text/html; charset=utf-8" );
if (isset ( $_POST ['order'] )) {
	
	$values ['name'] = isset ( $_POST ['name'] ) ? $_POST ['name'] : '';
	$names ['name'] = "���";
	
	$values ['email'] = isset ( $_POST ['email'] ) ? $_POST ['email'] : '';
	$names ['email'] = "E-mail ";
	
	$values ['item'] = isset ( $_POST ['item'] ) ? $_POST ['item'] : '';
	$names ['item'] = "������������ ������";
	
	$values ['comment'] = isset ( $_POST ['comment'] ) ? $_POST ['comment'] : '';
	$names ['comment'] = "�����������";
} else {
	$values ['name'] = isset ( $_POST ['name'] ) ? $_POST ['name'] : '';
	$names ['name'] = "���";
	$values ['phone'] = isset ( $_POST ['phone'] ) ? $_POST ['phone'] : '';
	$names ['phone'] = "������� ��� ��������� ������";
	$values ['s'] = isset ( $_POST ['s'] ) ? $_POST ['s'] : '';
	
	$names ['s'] = "����� ������";
	
	$values ['comment'] = isset ( $_POST ['comment'] ) ? $_POST ['comment'] : '';
	$names ['comment'] = "�����������";
}
if (count ( $_POST ) > 0) {
	$fieldsEmpty = false;
	foreach ( $values as $name => $val ) {
		$val = trim ( strip_tags ( $val ) );
		$values [$name] = $glb->encode ( $val );
		if (! preg_match ( "/[a-zA-Z0-9�-��-�]/is", $val ) && ! in_array ( $name, array (
				'comment' 
		) )) {
			$fieldsEmpty = true;
		}
	}
	if ($fieldsEmpty == true) {
		echo "{failure:true, msg:'{$glb->en('��� ���� ����������� ��� ����������! ��������� �������...')}'}";
		exit ();
	} else {
		$sendMail = new Email ();
		$sendMail->setFrom ( 'info@' . preg_replace ( "/www./", "", getenv ( 'HTTP_HOST' ) ) );
		
		$html = '<div style="color: #333;font-family: Verdana, Tahoma, Arial, Helvetica, sans-serif;font-size: 12px;">';
		foreach ( $names as $field => $name ) {
			$html .= "<b>$name:</b> {$values[$field]}<br/>";
		}
		
		$html .= "</div>";
		$to = emailAdmin ();
		$name = iconv ( 'cp1251', 'utf-8', '�������� ������' );
		if (isset ( $_POST ['order'] )) {
			$name = iconv ( 'cp1251', 'utf-8', '����� ������ ' . $values ['item'] );
		} else {
			$name = iconv ( 'cp1251', 'utf-8', '�������� ������' );
		}
		$sendMail->EmailHTML ( $to, $name, $html );
		$_SESSION ['secret_code2'] = '';
		echo "{success:true}";
		exit ();
	}
}
function emailAdmin() {
                $sql = mysql_query ( "select `value` from `site_setting` where `siteoption`='email_admin' limit 1" );
	if (mysql_num_rows ( $sql ) > 0) {
		$row = mysql_fetch_array ( $sql, MYSQL_ASSOC );
		if (! empty ( $row ['value'] )) {
			return $row ['value'];
		}
	}
	return "";
}

