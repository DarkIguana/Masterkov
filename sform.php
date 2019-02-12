<?php
session_start ();
session_cache_limiter ( 'nocache' );

require ("classes/global.php");
$glb = new glb ();
$glb->connect_db ();
$values = array ();
$names = array ();
Header ( "Content-type: text/html; charset=utf-8" );


$values ['name'] = isset ( $_POST ['name'] ) ? $_POST ['name'] : '';
$names ['name'] = "Имя";
$values ['phone'] = isset ( $_POST ['phone'] ) ? $_POST ['phone'] : '';
$names ['phone'] = "Телефон/E-mail";

if (count ( $_POST ) > 0) {
	$fieldsEmpty = false;
	foreach ( $values as $name => $val ) {
		$val = trim ( strip_tags ( $val ) );
		$values [$name] = $glb->encode ( $val );
		if (! preg_match ( "/[a-zA-Z0-9А-Яа-я]/is", $val ) && ! in_array ( $name, array (
				'comment'
		) )) {
			$fieldsEmpty = true;
		}
	}
	if ($fieldsEmpty == true) {
		echo "{failure:true, msg:'{$glb->en('Все поля обязательны для заполнения! повторите попытку...')}'}";
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
		$name = iconv ( 'cp1251', 'utf-8', 'Вызвать сметчика' );

		$sendMail->EmailHTML ( $to, $name, $html );
		$_SESSION ['secret_code2'] = '';
		echo "{success:true}";
		exit ();
	}
}
function emailAdmin() {
	$sql = mysql_query ( "select `value` from `site_setting` where `option`='email_admin' limit 1" );
	if (mysql_num_rows ( $sql ) > 0) {
		$row = mysql_fetch_array ( $sql, MYSQL_ASSOC );
		if (! empty ( $row ['value'] )) {
			return $row ['value'];
		}
	}
	return "";
}

