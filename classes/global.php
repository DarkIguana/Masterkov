<?php
require dirname ( __FILE__ ) . '/FirePHP.php';
define ( 'DEBUG', true );
define ( 'APPLICATION_PATH', dirname ( dirname ( __FILE__ ) ) );
define ( 'PEARPATH', dirname ( __FILE__ ) . '/extra' );

$ModulesPaths = array ();
$ModulesPaths [] = get_include_path ();
$ModulesPaths [] = realpath ( APPLICATION_PATH . '/classes' );
$ModulesPaths [] = realpath ( APPLICATION_PATH . '/classes/extra' );

set_include_path ( implode ( PATH_SEPARATOR, $ModulesPaths ) );

// Extras

require_once 'PEAR.php';
require_once 'PEAR5.php';
require_once 'MDB2.php';
require_once 'Log.php';
require_once 'Net/IDNA2.php';
require_once 'Validate/Validate.php';
require_once 'Net/URL2.php';
require_once 'Net/URL/Mapper.php';
require_once 'Image/Tools/Thumbnail.php';
require_once 'Image/Transform.php';
class StringPlural {
	/**
	 * ���������� ���������� ����
	 */
	const PLURAL_DEFAULT_LANG = 'ru';
	
	/**
	 * �������� ���������� ����� ����� ��� �����������(!) ����� � ������������ �
	 * ������ ������������ ����������.
	 * ���������� ���� ������������ ���������� PLURAL_DEFAULT_LANG (�� �������
	 * "ru") � ������ ������.
	 *
	 * @param integer $amount
	 *        	����� ������������ ���������� "���������" �����
	 * @param mixed $_        	
	 *
	 * @example self::Plural(1, array('����', '�����', '�������')); //����
	 * @example self::Plural(2, '����', '�����', '�������'); //�����
	 * @example self::Plural(5, '����', '�����', '�������'); //�������
	 *         
	 * @return string
	 */
	static function Plural($amount, $_) {
		$argv = func_get_args ();
		$arr = array ();
		
		if (is_array ( $_ )) {
			$arr = $_;
		} else {
			for($i = 1, $x = count ( $argv ); $i < $x; $i ++)
				$arr [] = $argv [$i];
		}
		
		return self::PluralLang ( self::PLURAL_DEFAULT_LANG, $amount, $arr );
	}
	
	/**
	 * �������� ���������� ����� ����� ��� ����������� ����� � ������������ �
	 * ������ ������������ ����������
	 *
	 * @param integer $amount
	 *        	����� ������������ ���������� "���������" �����
	 * @param mixed $_        	
	 *
	 * @example self::PluralEn(1, array('window', 'windows')); //window
	 * @example self::PluralEn(2, 'window', 'windows'); //windows
	 *         
	 * @return string
	 */
	static function PluralEn($amount, $_) {
		$argv = func_get_args ();
		$arr = array ();
		
		if (is_array ( $_ )) {
			$arr = $_;
		} else {
			for($i = 1, $x = count ( $argv ); $i < $x; $i ++)
				$arr [] = $argv [$i];
		}
		
		return self::PluralLang ( 'en', $amount, $arr );
	}
	
	/**
	 * �������� ���������� ����� ����� ��� ������� ����� � ������������ � ������
	 * ������������ ����������
	 *
	 * @param string $lang
	 *        	������������� ����� ��� �������� ����� ���������� ����� �����
	 * @param integer $amount
	 *        	����� ������������ ���������� "���������" �����
	 * @param mixed $_        	
	 *
	 * @example self::PluralLang('en', 1, array('window', 'windows')); //window
	 * @example self::PluralLang('en', 2, 'window', 'windows'); //windows
	 *         
	 * @return string
	 */
	static function PluralLang($lang, $amount, $_) {
		$argv = func_get_args ();
		
		if (count ( $argv ) < 3) {
			trigger_error ( __METHOD__ . ': missing required arguments', E_USER_WARNING );
			return null;
		}
		
		$amount = ( int ) $amount;
		
		$form = self::PluralLangGetForm ( $lang, $amount );
		if (is_array ( $_ )) {
			if (array_key_exists ( $form, $_ )) {
				return $_ [$form];
			} elseif (count ( $_ > 0 )) {
				return $_ [0];
			} else {
				trigger_error ( __METHOD__ . ': missing required arguments', E_USER_WARNING );
				return null;
			}
		} else {
			if (array_key_exists ( ($form + 2), $argv )) {
				return $argv [$form + 2];
			} else {
				return $argv [2];
			}
		}
	}
	
	/**
	 * �������� ���������� ��������� �������������� ����� ��� ������� �����
	 *
	 * @param string $lang
	 *        	������������� �����
	 * @return integer ���������� ���������
	 */
	static function PluralLangGetCount($lang) {
		switch ($lang) {
			case 'ach' :
			case 'af' :
			case 'ak' :
			case 'am' :
			case 'an' :
			case 'arn' :
			case 'ast' :
			case 'az' :
			case 'bg' :
			case 'bn' :
			case 'br' :
			case 'ca' :
			case 'da' :
			case 'de' :
			case 'el' :
			case 'en' :
			case 'eo' :
			case 'es' :
			case 'et' :
			case 'eu' :
			case 'fi' :
			case 'fil' :
			case 'fo' :
			case 'fr' :
			case 'fur' :
			case 'fy' :
			case 'gl' :
			case 'gu' :
			case 'ha' :
			case 'he' :
			case 'hi' :
			case 'hu' :
			case 'ia' :
			case 'is' :
			case 'it' :
			case 'jv' :
			case 'kn' :
			case 'ku' :
			case 'lb' :
			case 'ln' :
			case 'mai' :
			case 'mfe' :
			case 'mg' :
			case 'mi' :
			case 'mk' :
			case 'ml' :
			case 'mn' :
			case 'mr' :
			case 'nah' :
			case 'nap' :
			case 'nb' :
			case 'ne' :
			case 'nl' :
			case 'se' :
			case 'nn' :
			case 'no' :
			case 'nso' :
			case 'oc' :
			case 'or' :
			case 'ps' :
			case 'pa' :
			case 'pap' :
			case 'pms' :
			case 'pt' :
			case 'rm' :
			case 'sco' :
			case 'si' :
			case 'so' :
			case 'son' :
			case 'sq' :
			case 'sw' :
			case 'sv' :
			case 'ta' :
			case 'te' :
			case 'ti' :
			case 'tk' :
			case 'tr' :
			case 'ur' :
			case 'wa' :
			case 'yo' :
				return 2;
			case 'ar' :
				return 6;
			case 'ay' :
			case 'bo' :
			case 'cgg' :
			case 'dz' :
			case 'fa' :
			case 'hy' :
			case 'id' :
			case 'ja' :
			case 'jbo' :
			case 'ka' :
			case 'kk' :
			case 'km' :
			case 'ko' :
			case 'ky' :
			case 'lo' :
			case 'ms' :
			case 'sah' :
			case 'su' :
			case 'tg' :
			case 'th' :
			case 'tt' :
			case 'ug' :
			case 'uz' :
			case 'vi' :
			case 'wo' :
			case 'zh' :
				return 1;
			case 'be' :
			case 'bs' :
			case 'cs' :
			case 'hr' :
			case 'lt' :
			case 'lv' :
			case 'mnk' :
			case 'pl' :
			case 'ro' :
			case 'ru' :
			case 'sk' :
			case 'sr' :
			case 'uk' :
				return 3;
			case 'cy' :
			case 'gd' :
			case 'kw' :
			case 'mt' :
			case 'sl' :
				return 4;
			case 'ga' :
				return 5;
			default :
				return 1;
		}
	}
	
	/**
	 * �������� ������������� ����� �������������� �����
	 *
	 * @param string $lang
	 *        	������������� �����
	 * @param integer $n
	 *        	����� �� ������� ������������ ����� �����
	 * @return integer ������������� ����� �����
	 */
	private static function PluralLangGetForm($lang, $n) {
		switch ($lang) {
			case 'ach' :
			case 'ak' :
			case 'am' :
			case 'arn' :
			case 'br' :
			case 'fil' :
			case 'fr' :
			case 'ln' :
			case 'mfe' :
			case 'mg' :
			case 'mi' :
			case 'oc' :
			case 'ti' :
			case 'tr' :
			case 'wa' :
				return ( int ) ($n > 1);
			case 'af' :
			case 'an' :
			case 'ast' :
			case 'az' :
			case 'bg' :
			case 'bn' :
			case 'ca' :
			case 'da' :
			case 'de' :
			case 'el' :
			case 'en' :
			case 'eo' :
			case 'es' :
			case 'et' :
			case 'eu' :
			case 'fi' :
			case 'fo' :
			case 'fur' :
			case 'fy' :
			case 'gl' :
			case 'gu' :
			case 'ha' :
			case 'he' :
			case 'hi' :
			case 'hu' :
			case 'ia' :
			case 'it' :
			case 'kn' :
			case 'ku' :
			case 'lb' :
			case 'mai' :
			case 'ml' :
			case 'mn' :
			case 'mr' :
			case 'nah' :
			case 'nap' :
			case 'nb' :
			case 'ne' :
			case 'nl' :
			case 'se' :
			case 'nn' :
			case 'no' :
			case 'nso' :
			case 'or' :
			case 'ps' :
			case 'pa' :
			case 'pap' :
			case 'pms' :
			case 'pt' :
			case 'rm' :
			case 'sco' :
			case 'si' :
			case 'so' :
			case 'son' :
			case 'sq' :
			case 'sw' :
			case 'sv' :
			case 'ta' :
			case 'te' :
			case 'tk' :
			case 'ur' :
			case 'yo' :
				return ( int ) ($n != 1);
			case 'jv' :
				return ( int ) ($n != 0);
			case 'ay' :
			case 'bo' :
			case 'cgg' :
			case 'dz' :
			case 'fa' :
			case 'hy' :
			case 'id' :
			case 'ja' :
			case 'jbo' :
			case 'ka' :
			case 'kk' :
			case 'km' :
			case 'ko' :
			case 'ky' :
			case 'lo' :
			case 'ms' :
			case 'sah' :
			case 'su' :
			case 'tg' :
			case 'th' :
			case 'tt' :
			case 'ug' :
			case 'uz' :
			case 'vi' :
			case 'wo' :
			case 'zh' :
				return ( int ) (0);
			
			case 'be' :
			case 'bs' :
			case 'hr' :
			case 'ru' :
			case 'sr' :
			case 'uk' :
				return ( int ) ($n % 10 == 1 && $n % 100 != 11 ? 0 : ($n % 10 >= 2 && $n % 10 <= 4 && ($n % 100 < 10 || $n % 100 >= 20) ? 1 : 2));
			case 'lt' :
				return ( int ) ($n % 10 == 1 && $n % 100 != 11 ? 0 : ($n % 10 >= 2 && ($n % 100 < 10 or $n % 100 >= 20) ? 1 : 2));
			case 'lv' :
				return ( int ) ($n % 10 == 1 && $n % 100 != 11 ? 0 : ($n != 0 ? 1 : 2));
			case 'mt' :
				return ( int ) ($n == 1 ? 0 : ($n == 0 || ($n % 100 > 1 && $n % 100 < 11) ? 1 : (($n % 100 > 10 && $n % 100 < 20) ? 2 : 3)));
			case 'pl' :
				return ( int ) ($n == 1 ? 0 : ($n % 10 >= 2 && $n % 10 <= 4 && ($n % 100 < 10 || $n % 100 >= 20) ? 1 : 2));
			case 'ar' :
				return ( int ) ($n == 0 ? 0 : ($n == 1 ? 1 : ($n == 2 ? 2 : ($n % 100 >= 3 && $n % 100 <= 10 ? 3 : ($n % 100 >= 11 ? 4 : 5)))));
			case 'gd' :
				return ( int ) (($n == 1 || $n == 11) ? 0 : (($n == 2 || $n == 12) ? 1 : (($n > 2 && $n < 20) ? 2 : 3)));
			case 'is' :
				return ( int ) ($n % 10 != 1 || $n % 100 == 11);
			
			case 'cs' :
			case 'sk' :
				return ( int ) (($n == 1) ? 0 : (($n >= 2 && $n <= 4) ? 1 : 2));
			case 'cy' :
				return ( int ) (($n == 1) ? 0 : (($n == 2) ? 1 : (($n != 8 && $n != 11) ? 2 : 3)));
			case 'ga' :
				return ( int ) (($n == 1) ? 0 : (($n == 2) ? 1 : ($n < 7 ? 2 : ($n < 11 ? 3 : 4))));
			case 'kw' :
				return ( int ) (($n == 1) ? 0 : (($n == 2) ? 1 : (($n == 3) ? 2 : 3)));
			
			case 'mk' :
				return ( int ) (($n == 1 || $n % 10 == 1) ? 0 : 1);
			case 'mnk' :
				return ( int ) ($n == 0 ? 0 : ($n == 1 ? 1 : 2));
			
			case 'ro' :
				return ( int ) ($n == 1 ? 0 : (($n == 0 || ($n % 100 > 0 && $n % 100 < 20)) ? 1 : 2));
			case 'sl' :
				return ( int ) ($n % 100 == 1 ? 1 : ($n % 100 == 2 ? 2 : ($n % 100 == 3 || $n % 100 == 4 ? 3 : 0)));
			default :
				return 0;
		}
	}
}
class Users {
	public static $row = null;
	protected static $iUser = false;
	public static $countries = array (
			1 => '���������',
			2 => '�������',
			3 => '�����������',
			4 => '�������� �������',
			5 => '��������� �������',
			6 => '�������',
			7 => '�����',
			8 => '������������ �����',
			9 => '�������',
			10 => '������',
			11 => '�������',
			12 => '������� � �������',
			13 => '���������',
			14 => '�������',
			15 => '�����',
			16 => '����������',
			17 => '��������� �������',
			18 => '���������',
			19 => '��������',
			20 => '�������',
			21 => '����������',
			22 => '�����',
			23 => '�������',
			24 => '�����',
			25 => '���������� �������',
			26 => '��������',
			27 => '�������',
			28 => '������ � �����������',
			29 => '��������',
			30 => '��������',
			31 => '���������� ���������� � ��������� ������',
			32 => '������',
			33 => '�������-����',
			34 => '�������',
			35 => '�����',
			36 => '�������',
			37 => '�������',
			38 => '��������������',
			39 => '�������',
			40 => '���������',
			41 => '���������� ���������� �������',
			42 => '������������ ���������� �������',
			43 => '��������� �����',
			44 => '�������',
			45 => '�����',
			46 => '������',
			47 => '���������� �����',
			48 => '������',
			49 => '������',
			50 => '����',
			51 => '���������',
			52 => '���������',
			53 => '������',
			54 => '������-�����',
			55 => '��������',
			56 => '������',
			57 => '���������',
			58 => '��������',
			59 => '�������',
			60 => '�������',
			61 => '���������� (���������������� �������)',
			62 => '������',
			63 => '������',
			64 => '����',
			65 => '�����',
			66 => '������',
			67 => '�������',
			68 => '��������',
			69 => '������������� ����������',
			70 => '������',
			71 => '������',
			72 => '��������',
			73 => '�������',
			74 => '�����',
			75 => '���������',
			76 => '��������',
			77 => '����',
			78 => '����',
			79 => '��������',
			80 => '��������',
			81 => '�������',
			82 => '������',
			83 => '�����',
			84 => '����-�����',
			85 => '���������',
			86 => '��������� �������',
			87 => '��������',
			88 => '�������',
			89 => '������',
			90 => '��������� �������',
			91 => '�����',
			92 => '�����',
			93 => '���������� ����',
			94 => '��������',
			95 => '��������',
			96 => '��������� �������� ����������',
			97 => '��������� ����������',
			98 => '��������� �������',
			99 => '��������',
			100 => '������',
			101 => '���������� �����',
			102 => '��������������� ���������� �����',
			103 => '��������� �������-��������������� ����������',
			104 => '���������� �����',
			105 => '���������� ������',
			106 => '�����-����',
			107 => '���-������',
			108 => '����',
			109 => '������',
			110 => '������� ����',
			111 => '�������',
			112 => '����',
			113 => '������',
			114 => '������',
			115 => '�������',
			116 => '�����',
			117 => '�����',
			118 => '�����',
			119 => '�����������',
			120 => '����������',
			121 => '��������',
			122 => '����������',
			123 => '����������',
			124 => '�������',
			125 => '�������',
			126 => '���������� ���������',
			127 => '������',
			128 => '��������',
			129 => '����',
			130 => '��������',
			131 => '������',
			132 => '�������',
			133 => '���������',
			134 => '���������� �������',
			135 => '�������',
			136 => '�������',
			137 => '������������ ����� ����������',
			138 => '��������',
			139 => '��������',
			140 => '������',
			141 => '��������',
			142 => '����������',
			143 => '������',
			144 => '������ ���',
			145 => '�������-����������� ����������',
			146 => '�������',
			147 => '�����',
			148 => '�����',
			149 => '�����',
			150 => '�������',
			151 => '����������',
			152 => '���������',
			153 => '����',
			154 => '����� ��������',
			155 => '����� ���������',
			156 => '��������',
			157 => '������ �������',
			158 => '����������� �������� �������',
			159 => '����',
			160 => '��������',
			161 => '�����',
			162 => '������������ ������������ �������������',
			163 => '������',
			164 => '����� � ����� ������',
			165 => '��������',
			166 => '����',
			167 => '������� �������',
			168 => '������',
			169 => '����������',
			170 => '��������������� ���������� ����������',
			171 => '������-����',
			172 => '�������',
			173 => '������ ��������� (���������)',
			174 => '������',
			175 => '������',
			176 => '�������',
			177 => '���������',
			178 => '�����',
			179 => '���-������',
			180 => '���-���� � ��������',
			181 => '��������� �������� ��������������� ����������',
			182 => '���������� ������',
			183 => '���������',
			184 => '������� ������ �����, ���������� � �������-��-�����',
			185 => '�������� ���������� �������',
			186 => '�������� ���������� ��������� �����',
			187 => '����������� �������',
			188 => '�������',
			189 => '���-���������',
			190 => '���-������ (�������� �������)',
			191 => '���-���� � �������',
			192 => '����-������� � ���������',
			193 => '����-���� � �����',
			194 => '����-�����',
			195 => '������',
			196 => '�����',
			197 => '������',
			198 => '����-�������',
			199 => '��������',
			200 => '�����',
			201 => '��������',
			202 => '��������',
			203 => '���������� ����� �������',
			204 => '���������� �������',
			205 => '������',
			206 => '����������',
			207 => '�����',
			208 => '�������',
			209 => '������-�����',
			210 => '�����������',
			211 => '�������',
			212 => '��������',
			213 => 'Ҹ��� � ������',
			214 => '����',
			215 => '�������',
			216 => '�����',
			217 => '�������� � ������',
			218 => '������',
			219 => '�����',
			220 => '���������',
			221 => '������',
			222 => '������',
			223 => '����������',
			224 => '�������',
			225 => '������ � ������',
			226 => '�������',
			227 => '��������� �������',
			228 => '�����',
			229 => '���������',
			230 => '���������',
			231 => '������������ �������',
			232 => '�������',
			233 => '����������� ������',
			234 => '����������� ���������',
			235 => '����������� ����� � �������������� ����������',
			236 => '��������',
			237 => '��������������������� ����������',
			238 => '���',
			239 => '����������',
			240 => '�����',
			241 => '����',
			242 => '���������',
			243 => '������',
			244 => '����������',
			245 => '���-�����',
			246 => '�������',
			247 => '�������������� ������',
			248 => '�������',
			249 => '�������',
			250 => '�������',
			251 => '����� ������� � ����� ���������� �������',
			252 => '���������� ����� ������',
			253 => '����-����������� ����������',
			254 => '����� �����',
			255 => '������',
			256 => '������' 
	);
	public static function getFlag() {
		if (self::$iUser) {
			if (self::$row) {
				if (isset ( self::$countries [self::$row ['country']] )) {
					if (file_exists ( 'flags/' . self::$row ['country'] . '.png' )) {
						return 'flags/' . self::$row ['country'] . '.png';
					}
					if (file_exists ( 'flags/' . self::$row ['country'] . '.gif' )) {
						return 'flags/' . self::$row ['country'] . '.gif';
					}
					if (file_exists ( 'flags/' . self::$row ['country'] . '.jpg' )) {
						return 'flags/' . self::$row ['country'] . '.jpg';
					}
					if (file_exists ( 'flags/' . self::$row ['country'] . '.jpeg' )) {
						return 'flags/' . self::$row ['country'] . '.jpeg';
					}
				}
			}
		}
		return false;
	}
	public static function getUser() {
		if (isset ( $_COOKIE ['userID'] ) && isset ( $_COOKIE ['key'] )) {
			$user = ( int ) $_COOKIE ['userID'];
			
			$sql = mysql_query ( "select * from `shop_users` where `id`='$user'  limit 1" );
			if (is_resource ( $sql ) && mysql_num_rows ( $sql ) > 0) {
				$row = mysql_fetch_assoc ( $sql );
				$pass = md5 ( base64_encode ( $row ['pass'] ) );
				
				if ($pass == $_COOKIE ['key']) {
					
					self::$iUser = true;
					session_register ( 'user', $row ['email'] );
					session_register ( 'uid', $row ['id'] );
					$_SESSION ['user'] = $row ['email'];
					$_SESSION ['uid'] = $row ['id'];
					self::$row = $row;
				}
			}
		} elseif (isset ( $_SESSION ['user'] ) && isset ( $_SESSION ['uid'] ) && ! empty ( $_SESSION ['user'] ) && ! empty ( $_SESSION ['uid'] ) && is_numeric ( $_SESSION ['uid'] )) {
			$user = ( int ) $_SESSION ['uid'];
			$sql = mysql_query ( "select * from `shop_users` where `id`='$user'  limit 1" );
			if (is_resource ( $sql ) && mysql_num_rows ( $sql ) > 0) {
				self::$iUser = true;
				self::$row = mysql_fetch_assoc ( $sql );
			}
		}
	}
	static function setCookie($user, $pass) {
		$time = time () + (60 * 60 * 24 * 7);
		$host = preg_replace ( "/www/is", "", getenv ( 'HTTP_HOST' ) );
		setcookie ( "userID", $user, $time, "/", $host );
		setcookie ( "key", $pass, $time, "/", $host );
	}
	static function unsetCookie() {
		$time = time () + (20);
		$host = preg_replace ( "/www/is", "", getenv ( 'HTTP_HOST' ) );
		setcookie ( "userID", '', $time, "/", $host );
		setcookie ( "key", '', $time, "/", $host );
	}
	static function iUser() {
		return self::$iUser;
	}
}
class SystemUsers {
	protected static $params = array ();
	protected static $acl = array (
			"pages" => array (
					"module" => 'pages' 
			),
			"blocks" => array (
					"module" => 'blocks' 
			),
			"news" => array (
					"module" => 'news' 
			),
			"articles" => array (
					"module" => 'articles' 
			),
			"price" => array (
					"module" => 'price' 
			),
			"faq" => array (
					"module" => 'faq' 
			),
			"files" => array (
					"module" => 'files' 
			),
			"banners" => array (
					"module" => 'banners' 
			),
			"slider" => array (
					"module" => 'slider' 
			),
			"pricelistfiles" => array (
					"module" => 'pricelistfiles' 
			),
			"shop-users" => array (
					"module" => 'shop' 
			),
			"shop-newsletter" => array (
					"module" => 'shop' 
			),
			"site_settings" => array (
					"module" => 'additional' 
			),
			"UploadFiles" => array (
					"module" => 'additional' 
			),
			"SystemUsers" => array (
					"module" => 'systemusers' 
			) 
	);
	static function iUser($login = null, $password = null) {
		if ($login == null && $password == null) {
			if (isset ( $_COOKIE ['user'] ) && isset ( $_COOKIE ['passwd'] )) {
				
				$user = mysql_real_escape_string ( $_COOKIE ['user'] );
				$passwd = mysql_real_escape_string ( $_COOKIE ['passwd'] );
				$sql = mysql_query ( "select * from `users` where `login`='{$user}' and `password`='{$passwd}' limit 1" );
				if (is_resource ( $sql ) && mysql_num_rows ( $sql ) > 0) {
					self::$params = mysql_fetch_assoc ( $sql );
					$_SESSION ['admin'] = $_COOKIE ['user'];
					return true;
				}
			}
		} else {
			$user = mysql_real_escape_string ( $login );
			$passwd = mysql_real_escape_string ( md5 ( $password ) );
			
			$sql = mysql_query ( "select * from `users` where `login`='{$user}' and `password`='{$passwd}' limit 1" );
			if (is_resource ( $sql ) && mysql_num_rows ( $sql ) > 0) {
				
				self::$params = mysql_fetch_assoc ( $sql );
				$_SESSION ['admin'] = $login;
				setcookie ( 'user', $login, time () + 60 * 60 * 24 * 7, '/', preg_replace ( "/www./", "", "." . getenv ( 'HTTP_HOST' ) ) );
				setcookie ( 'passwd', md5 ( $password ), time () + 60 * 60 * 24 * 7, '/', preg_replace ( "/www./", "", "." . getenv ( 'HTTP_HOST' ) ) );
				
				return true;
			}
		}
		return false;
	}
	static function isAllowed($resource) {
		if (isset ( self::$params [$resource] ) && self::$params [$resource] == 1) {
			return true;
		}
		return false;
	}
}
class CatalogSystem {
	protected static $CategoryDisable = array ();
	public static function loadDisabledCategory() {
		$sql = mysql_query ( "select `id` from `price_cat` where `active`='0'" );
		if (is_resource ( $sql ) && mysql_num_rows ( $sql ) > 0) {
			while ( ($row = mysql_fetch_assoc ( $sql )) != false ) {
				self::$CategoryDisable [] = $row ['id'];
				self::loadDisabledChildren ( $row ['id'] );
			}
		}
	}
	protected static function loadDisabledChildren($id) {
		$sql = mysql_query ( "select `id` from `price_cat` where `parentId`='{$id}'" );
		if (is_resource ( $sql ) && mysql_num_rows ( $sql ) > 0) {
			while ( ($row = mysql_fetch_assoc ( $sql )) != false ) {
				self::$CategoryDisable [] = $row ['id'];
			}
		}
	}
	public static function getDisabledCategoryImplode() {
		if (count ( self::$CategoryDisable ) > 0) {
			return implode ( ", ", self::$CategoryDisable );
		}
		return false;
	}
}
class Email {
	protected $attache = array ();
	protected $error = array ();
	protected $hash = null;
	protected $headers = "";
	protected $message = "";
	protected $from = "";
	protected $charset = "windows-1251";
	protected $TransferEncoding = "Quot-Printed";
	function setFrom($from) {
		if (is_string ( $from ) && ! empty ( $from )) {
			$this->from = $from;
		}
	}
	function __construct() {
		$this->hash = "==x" . md5 ( time () ) . "x";
	}
	function EmailHTML($to, $subject = "", $html = "") {
		$this->headers .= "MIME-Version: 1.0\n";
		if (! empty ( $this->from )) {
			$this->headers .= "From:$this->from\n";
		} else {
			$this->headers .= "From: info@" . str_replace ( "www.", "", getenv ( 'HTTP_HOST' ) ) . "\n";
		}
		$this->headers .= "X-Sender: < " . getenv ( 'HTTP_HOST' ) . " >\n";
		$this->headers .= "Content-Type: multipart/mixed;";
		$this->headers .= " boundary=\"{$this->hash}\"\n\n";
		
		$this->message .= "--{$this->hash}\n";
		$this->message .= "Content-Type:text/html; charset=\"{$this->charset}\"\n";
		$this->message .= "Content-Transfer-Encoding: {$this->TransferEncoding}\n\n";
		$this->message .= $html . "\n\n";
		
		if (count ( $this->attache ) > 0) {
			$this->message .= $this->addFiles ();
		}
		mail ( $to, $subject, $this->message, $this->headers );
	}
	function EmailTXT($to, $subject, $html) {
		$this->headers .= "MIME-Version: 1.0\n";
		if (! empty ( $this->from )) {
			$this->headers .= "From:$this->from\n";
		}
		$this->headers .= "X-Sender: < " . getenv ( 'HTTP_HOST' ) . " >\n";
		$this->headers .= "Content-Type: multipart/mixed;";
		
		$this->headers .= " boundary=\"{$this->hash}\"\n\n";
		$this->message .= "--{$this->hash}\n";
		$this->message .= "Content-Type:text/plain; charset=\"{$this->charset}\"\n";
		$this->message .= "Content-Transfer-Encoding: {$this->TransferEncoding}\n\n";
		
		$this->message .= $html . "\n\n";
		
		if (count ( $this->attache ) > 0) {
			$this->message .= $this->addFiles ();
		}
		mail ( $to, $subject, $this->message, $this->headers );
	}
	function addFiles() {
		$a = "";
		foreach ( $this->attache as $file ) {
			$a .= "--{$this->hash}\n";
			$a .= "Content-Type: {$file[2]}; name=\"{$file[1]}\"\n";
			$a .= "Content-Transfer-Encoding: base64\n";
			$a .= "Content-Disposition: attachment\n\n";
			$a .= $file [0];
			$a .= "\n";
		}
		return $a;
	}
	function addFile($file, $filename = "file") {
		if (empty ( $filename )) {
			$filename = "file";
		}
		$info = $this->fileInfo ( $file );
		$type = $this->getType ( $info ['extReal'] );
		$data = file_get_contents ( $file );
		$data = chunk_split ( base64_encode ( $data ) );
		$this->attache [] = array (
				$data,
				$filename . $info ['ext'],
				$type 
		);
	}
	function addFileUploaded($tmp, $realFile, $filename = "file") {
		if (empty ( $filename )) {
			$filename = "file";
		}
		$info = $this->fileInfo ( $realFile );
		$type = $this->getType ( $info ['extReal'] );
		$data = file_get_contents ( $tmp );
		$data = chunk_split ( base64_encode ( $data ) );
		$this->attache [] = array (
				$data,
				$filename . $info ['ext'],
				$type 
		);
	}
	function getType($ext) {
		$type = "application/octet-stream";
		switch ($ext) {
			case "oda" :
				$type = "application/oda";
				break;
			case "pdf" :
				$type = "application/pdf";
				break;
			case "eps" :
			case "ps" :
			case "ai" :
				$type = "application/postscript";
			case "rtf" :
				$type = "application/rtf";
				break;
			case "bcpio" :
				$type = "application/x-bcpio";
				break;
			case "cpio" :
				$type = "application/x-cpio";
				break;
			case "csh" :
				$type = "application/x-csh";
				break;
			case "dvi" :
				$type = "application/x-dvi";
				break;
			case "gtar" :
				$type = "application/x-gtar";
				break;
			case "hdf" :
				$type = "application/x-hdf";
				break;
			case "latex" :
				$type = "application/x-latex";
				break;
			case "mif" :
				$type = "applicatlon/x-mif";
				break;
			case "cdf" :
			case "nc" :
				$type = "application/x-netcdf";
			
			case "sh" :
				$type = "application/x-sh";
				break;
			case "shar" :
				$type = "application/x-shar";
				break;
			case "sv4cpio" :
				$type = "application/x-sv4cpio";
				break;
			case "sv4crc" :
				$type = "application/x-sv4crc";
				break;
			case "tar" :
				$type = "application/x-tar";
				break;
			case "tcl" :
				$type = "application/x-tcl";
				break;
			case "tex" :
				$type = "application/x-tex";
				break;
			case "texi" :
			case "texinfo" :
				$type = "application/x-texinfo";
				break;
			case "man" :
				$type = "application/x-troff-man";
				break;
			case "me" :
				$type = "application/x-troff-me";
				break;
			case "ms" :
				$type = "application/x-troff-ms";
				break;
			case "tr" :
			case "roff" :
			case "t" :
				$type = "applicatlon/x-troff";
			
			case "ustar" :
				$type = "application/x-ustar";
				break;
			case "src" :
				$type = "application/x-wais-source";
				break;
			case "zip" :
				$type = "application/zip";
				break;
			case "snd" :
			case "au" :
				$type = "application/basic";
				break;
			case "aif" :
			case "aiff" :
			case "aifc" :
				$type = "application/x-aiff";
			case "wav" :
				$type = "application/x-wav";
				break;
			case "gif" :
				$type = "image/gif";
				break;
			case "ief" :
				$type = "image/ief";
				break;
			case "jpeg" :
			case "jpg" :
			case "jpe" :
				$type = "image/jpeg";
				break;
			case "png" :
				$type = "image/png";
				break;
			case "tiff" :
			case "tif" :
				$type = "image/tiff";
				break;
			case "ras" :
				$type = "image/x-cmu-raster";
				break;
			case "rpnm" :
				$type = "image/x-portable-anymap";
				break;
			case "pbm" :
				$type = "image/x-portable-bitmap";
				break;
			case "pgm" :
				$type = "image/x-portable-graymap";
				break;
			case "ppm" :
				$type = "image/x-portable-pixmap";
				break;
			case "rgb" :
				$type = "image/x-rgb";
				break;
			case "xbm" :
				$type = "image/x-xbitmap";
				break;
			case "xpm" :
				$type = "imaqe/x-xpixrnap";
				break;
			case "xwd" :
				$type = "image/x-xwindowdump";
				break;
			case "htm" :
			case "html" :
				$type = "text/html";
				break;
			case "txt" :
				$type = "text/plain";
				break;
			case "rtx" :
				$type = "text/richtext";
				break;
			case "tsv" :
				$type = "text/tab-separated-values";
				break;
			case "etx" :
				$type = "text/x-setext";
				break;
			case "mpeg" :
			case "mpe" :
			case "mpg" :
				$type = "video/mpeg";
				break;
			case "qt" :
			case "mov" :
				$type = "video/quicktime";
				break;
			case "qvi" :
				$type = "video/x-msvideo";
				break;
			case "movie" :
				$type = "video/x-sgi-movie";
				break;
			default :
				$type = "application/octet-stream";
				break;
		}
		return $type;
	}
	function fileInfo($file) {
		$path = pathinfo ( $file );
		if (! isset ( $path ['extension'] )) {
			$path ['extension'] = "";
		}
		return array (
				"ext" => (! empty ( $path ['extension'] )) ? ".{$path['extension']}" : '',
				"extReal" => strtolower ( $path ['extension'] ) 
		);
	}
}
class Safe {
	function __construct() {
		$this->SafeGet ();
		if (isset ( $_GET ['debug'] )) {
		}
	}
	function SafeValue($value) {
		if (empty ( $value ))
			return "";
		return mysql_real_escape_string ( $value );
	}
	function SafeGet() {
		if (isset ( $_GET ) && count ( $_GET ) > 0) {
			foreach ( $_GET as $name => $value ) {
				$_GET [$name] = $this->SafeValue ( $value );
			}
		}
	}
}
class LogFF {
	protected static $FirePHP = null;
	public static function log($object, $label = null, $options = array()) {
		if (defined ( 'DEBUG' ) && DEBUG == true) {
			if (is_null ( self::$FirePHP )) {
				self::$FirePHP = FirePHP::getInstance ( true );
			}
			return self::$FirePHP->fb ( $object, $label, FirePHP::LOG, $options );
		}
	}
	public static function info($object, $label = null, $options = array()) {
		if (defined ( 'DEBUG' ) && DEBUG == true) {
			if (is_null ( self::$FirePHP )) {
				self::$FirePHP = FirePHP::getInstance ( true );
			}
			return self::$FirePHP->fb ( $object, $label, FirePHP::INFO, $options );
		}
	}
	public static function warn($object, $label = null, $options = array()) {
		if (defined ( 'DEBUG' ) && DEBUG == true) {
			if (is_null ( self::$FirePHP )) {
				self::$FirePHP = FirePHP::getInstance ( true );
			}
			return self::$FirePHP->fb ( $object, $label, FirePHP::WARN, $options );
		}
	}
	public static function error($object, $label = null, $options = array()) {
		if (defined ( 'DEBUG' ) && DEBUG == true) {
			if (is_null ( self::$FirePHP )) {
				self::$FirePHP = FirePHP::getInstance ( true );
			}
			return self::$FirePHP->fb ( $object, $label, FirePHP::ERROR, $options );
		}
	}
}
class global_ini {
	protected $dirmdl = "modules/";
	protected $dirwdg = "widgets/";
	protected $dircls = "classes/";
	protected $homepath = "";
	var $Template = "";
	public function connect_db() {
		include ("config.ini.php");
		
		$this->Template = $_TEMPLATE;
		mysql_connect ( $_HOST, $_USER, $_PASS ) or die ( mysql_error () );
		mysql_select_db ( $_DB ) or die ( mysql_error () );
		mysql_query ( "SET CHARACTER SET CP1251" );
	}
	protected function errors() {
		$this->class_req ( "error.php" );
	}
	
	/**
	 * ������� ������� require()
	 *
	 * @param
	 *        	���� � ����� $file
	 */
	protected function req($file) {
		if (file_exists ( $file )) {
			require_once ($file);
		}
	}
	/**
	 * ���������� PHP ����� �� �����, ���� ���� ���������
	 *
	 * @param
	 *        	���� ������ $class
	 */
	protected function class_req($class) {
		if (file_exists ( $this->homepath . $this->dircls . $class )) {
			$this->req ( $this->homepath . $this->dircls . $class );
		}
	}
	/**
	 * ��������� �������� ���������
	 *
	 * @param
	 *        	������ ���� � ����� $path
	 */
	function set_home_path($path) {
		if (isset ( $path )) {
			$this->homepath = $path;
		}
	}
	/**
	 * ���������� ����� ������, ���� ������ ����������
	 *
	 * @param
	 *        	��� ������ $module
	 */
	public function req_module($module) {
		if (isset ( $module )) {
			$this->req ( $this->dirmdl . $module . ".cls.php" );
		}
	}
	/**
	 * ��������� ����� �������, ���� ������ ����������
	 *
	 * @param
	 *        	��� ������� $widget
	 */
	protected function req_widget($widget) {
		if (isset ( $widget )) {
			$this->req ( $this->dirmdl . $this->dirwdg . $widget . ".wdg.php" );
		}
	}
	function JEncode($arr, $en = 1) {
		require_once ("JSON.php"); // if php<5.2 need JSON class
		$json = new Services_JSON (); // instantiate new json object
		if ($en == 1) {
			$data = $json->encode ( $arr ); // encode the data in json format
		} else {
			$data = $json->decode ( $arr );
		}
		
		return $data;
	}
}
class admin extends global_ini {
	var $login = false;
	function __construct($exec = true) {
		if (isset ( $_GET ['xaction'] ) && $_GET ['xaction'] == 'exit') {
			session_unset ();
			setcookie ( 'user', '', time (), '/', preg_replace ( "www.", "", "." . getenv ( 'HTTP_HOST' ) ) );
			setcookie ( 'passwd', '', time (), '/', preg_replace ( "www.", "", "." . getenv ( 'HTTP_HOST' ) ) );
			
			header ( "Location: /admincp.php" );
		}
		
		if ($exec == true) {
			
			$this->connect_db ();
			if (! SystemUsers::iUser ()) {
				$this->login = false;
				return false;
			}
			if (isset ( $_GET ['help'] )) {
				$sql = mysql_query ( "select * from `modules_option` where `module`='$_GET[help]' and `option`='help' limit 1" );
				$help = mysql_fetch_array ( $sql );
				echo $help ['value'];
				exit ();
			}
			if (isset ( $_POST ['xaction'] )) {
				$task = $_POST ['xaction'];
			} elseif (isset ( $_POST ['task'] )) {
				$task = $_POST ['task'];
			}
			if (isset ( $_POST ['module'] )) {
				$module = $_POST ['module'];
				$extclass = $module . "_admin";
			}
			if (! isset ( $module )) {
				$module = "";
			}
			if (! isset ( $task )) {
				$task = "";
			}
			if (! isset ( $extclass )) {
				$extclass = "";
			}
			if (isset ( $task ) && $task != "") {
				if (! class_exists ( $extclass )) {
					$this->req_module ( $module );
					if (class_exists ( $extclass )) {
						$mod = new $extclass ();
						$mod->$task ();
					}
				} else {
					$mod = new $extclass ();
					$mod->$task ();
				}
				exit ();
			}
		} else {
			$this->connect_db ();
			if (! SystemUsers::iUser ()) {
				$this->login = false;
				return false;
			}
		}
	}
	function tr($str) {
		$str = str_replace ( "�", "a", $str );
		$str = str_replace ( "�", "a", $str );
		$str = str_replace ( "�", "b", $str );
		$str = str_replace ( "�", "b", $str );
		$str = str_replace ( "�", "v", $str );
		$str = str_replace ( "�", "v", $str );
		$str = str_replace ( "�", "g", $str );
		$str = str_replace ( "�", "g", $str );
		$str = str_replace ( "�", "d", $str );
		$str = str_replace ( "�", "d", $str );
		$str = str_replace ( "�", "e", $str );
		$str = str_replace ( "�", "e", $str );
		$str = str_replace ( "�", "e", $str );
		$str = str_replace ( "�", "e", $str );
		$str = str_replace ( "�", "k", $str );
		$str = str_replace ( "�", "k", $str );
		$str = str_replace ( "�", "o", $str );
		$str = str_replace ( "�", "o", $str );
		$str = str_replace ( "�", "l", $str );
		$str = str_replace ( "�", "l", $str );
		$str = str_replace ( "�", "p", $str );
		$str = str_replace ( "�", "p", $str );
		$str = str_replace ( "�", "r", $str );
		$str = str_replace ( "�", "r", $str );
		$str = str_replace ( "�", "y", $str );
		$str = str_replace ( "�", "y", $str );
		$str = str_replace ( "�", "u", $str );
		$str = str_replace ( "�", "u", $str );
		$str = str_replace ( "�", "f", $str );
		$str = str_replace ( "�", "f", $str );
		$str = str_replace ( "�", "t", $str );
		$str = str_replace ( "�", "t", $str );
		$str = str_replace ( "�", "j", $str );
		$str = str_replace ( "�", "j", $str );
		$str = str_replace ( "�", "s", $str );
		$str = str_replace ( "�", "s", $str );
		$str = str_replace ( "�", "ya", $str );
		$str = str_replace ( "�", "ya", $str );
		$str = str_replace ( "�", "ch", $str );
		$str = str_replace ( "�", "ch", $str );
		$str = str_replace ( "�", "i", $str );
		$str = str_replace ( "�", "i", $str );
		$str = str_replace ( "�", "i", $str );
		$str = str_replace ( "�", "i", $str );
		$str = str_replace ( "�", "m", $str );
		$str = str_replace ( "�", "m", $str );
		$str = str_replace ( "�", "n", $str );
		$str = str_replace ( "�", "n", $str );
		$str = str_replace ( "�", "h", $str );
		$str = str_replace ( "�", "h", $str );
		$str = str_replace ( "�", "sh", $str );
		$str = str_replace ( "�", "sh", $str );
		$str = str_replace ( "�", "sh'", $str );
		$str = str_replace ( "�", "sh'", $str );
		$str = str_replace ( "�", "c", $str );
		$str = str_replace ( "�", "c", $str );
		$str = str_replace ( "�", "k", $str );
		$str = str_replace ( "�", "k", $str );
		$str = str_replace ( "�", "z", $str );
		$str = str_replace ( "�", "z", $str );
		$str = str_replace ( "�", "", $str );
		$str = str_replace ( "�", "", $str );
		$str = str_replace ( "�", "e", $str );
		$str = str_replace ( "�", "e", $str );
		$str = str_replace ( " ", "_", $str );
		$str = str_replace ( "  ", "_", $str );
		$str = strtolower ( $str );
		return $str;
	}
	protected function id_rep($id) {
		$id = str_replace ( "\"", "", $id );
		$id = str_replace ( "[", "", $id );
		$id = str_replace ( "]", "", $id );
		$id = str_replace ( "\\", "", $id );
		return $id;
	}
	function encode($str) {
		if ($text = iconv ( "UTF-8", "windows-1251", $str )) {
			return $text;
		} else {
			if ($text = mb_convert_encoding ( $str, "windows-1251", "utf-8" )) {
				return $text;
			} else {
				return $str;
			}
		}
	}
	function en($str) {
		$text = @iconv ( "windows-1251", "UTF-8", $str );
		
		return $text;
	}
}
class CheckLogin_admin extends admin {
	function __construct() {
	}
	protected function CheckLogin() {
		if (! isset ( $_SESSION ['admin'] ) or $_SESSION ['admin'] == null) {
			echo '33';
		}
	}
	function SaveStat($stat = "") {
		$dir = $_SERVER ['DOCUMENT_ROOT'];
		$ip = $_SERVER ['REMOTE_ADDR'];
		$agent = addslashes ( $_SERVER ['HTTP_USER_AGENT'] );
		$date = time ();
		mysql_query ( "insert into `stat` (`module`, `comment`, `date`, `ip`, `user_agent`) values ('admin_login', '$stat', '$date', '$ip', '$agent')" ) or die ( mysql_error () );
		$id_query = mysql_insert_id ();
		
		// @require_once($dir."/classes/PEAR.php");
		// @require_once($dir."/classes/Net/GeoIP.php");
		/*
		 * $geoip = @Net_GeoIP::getInstance($dir."/data/GeoIPCity.dat"); if
		 * ($geoip) { $location = $geoip->lookupLocation($ip);
		 * mysql_query("update `stat` set `city`='$location->city',
		 * `region`='$location->countryName', `height`='$location->latitude',
		 * `dolg`='$location->longitude' where `id`='$id_query'"); }
		 */
	}
	protected function AdminLogin() {
		$sql = mysql_query ( "select * from users where login='$_POST[loginadmin]' and password='" . md5 ( $_POST ['loginpass'] ) . "'" );
		$users = mysql_num_rows ( $sql );
		if ($users != 0) {
			$_SESSION ['admin'] = $_POST ['loginadmin'];
			$time = time ();
			$ip = $_SERVER ['REMOTE_ADDR'];
			$this->SaveStat ( "success login" ); // mysql_query("insert into
			                                     // logs_adminlogin (`Ip`, `Time`)
			                                     // values
			                                     // ('$ip', '$time')");
			echo "{success:true}";
		} else {
			$this->SaveStat ( "failure login" );
			$result = array (
					"success" => false,
					"message" => $this->en ( "�������� ���� ����� ��� ������ �����������" ) 
			);
			echo $this->JEncode ( $result );
			
			// echo '{failure:true,success:false,
			// message:"'.$this->en("�������� ���� ����� ��� ������
			// �����������").'"}';
		}
	}
}
class not_found {
	var $over = "";
	function __construct() {
		header ( "HTTP/1.x 404 Not Found" );
		$_SESSION ['Titles'] ['title'] = "�������� �� �������";
		$_SESSION ['Road'] = ' �������� �� �������';
		$this->over = "<p align='center'>�������� �� �������</p>";
	}
}
class Response {
	static function error404() {
		header ( "HTTP/1.x 404 Not Found" );
	}
}
class glb extends global_ini {
	var $startTime;
	var $endTime;
	protected $templ = "advokat";
	protected $vars = array ();
	private $template;
	var $chpu = 1;
	var $FileTemplate = "index";
	var $extention = "html";
	private $module = "pages";
	private $dirtmpl = "template/";
	static $RewriteUrl = null;
	static $rewriteUrls = array ();
	static $defaultUrls = array ();
	var $test = 1;
	function urlencode($url) {
		if (substr ( $url, 0, 1 ) == '/') {
			$url = substr ( $url, 1, strlen ( $url ) );
		}
		$newUrl = $url;
		$ext = pathinfo ( $newUrl, PATHINFO_EXTENSION );
		
		if (strlen ( $ext ) > 0) {
			$ext = "." . $ext;
			$newUrl = substr ( $url, 0, strlen ( $url ) - strlen ( $ext ) );
		}
		$exp = explode ( '/', $newUrl );
		foreach ( $exp as $s => $u ) {
			$exp [$s] = urlencode ( $u );
		}
		return implode ( "/", $exp ) . $ext;
	}
	public function encode($str) {
		$text = iconv ( "UTF-8", "windows-1251", $str );
		
		return $text;
	}
	function translit($str) {
		$str = $this->strtomin ( $str );
		$new = "~`!@#$%^&*()+=\\|\�<>{}[]:;'\",.?/";
		$p = str_split ( $new );
		
		foreach ( $p as $n => $v ) {
			$str = trim ( str_replace ( $v, "", $str ) );
		}
		
		$new = array (
				"/�/" => "y",
				"/�/" => "c",
				"/�/" => "u",
				"/�/" => "k",
				"/�/" => "e",
				"/�/" => "e",
				"/�/" => "n",
				"/�/" => "g",
				"/�/" => "sh",
				"/�/" => "sh",
				"/�/" => "z",
				"/�/" => "h",
				"/�/" => "",
				"/�/" => "f",
				"/�/" => "i",
				"/�/" => "v",
				"/�/" => "a",
				"/�/" => "p",
				"/�/" => "r",
				"/�/" => "o",
				"/�/" => "l",
				"/�/" => "d",
				"/�/" => "j",
				"/�/" => "e",
				"/�/" => "ya",
				"/�/" => "ch",
				"/�/" => "s",
				"/�/" => "m",
				"/�/" => "i",
				"/�/" => "t",
				"/�/" => "",
				"/�/" => "b",
				"/�/" => "u"
				
		);
		
		$str = preg_replace ( array_keys ( $new ), array_values ( $new ), $str );
		$str = trim ( $str );
		$str = str_replace ( "       ", "_", $str );
		$str = str_replace ( "      ", "_", $str );
		$str = str_replace ( "     ", "_", $str );
		$str = str_replace ( "    ", "_", $str );
		$str = str_replace ( "   ", "_", $str );
		$str = str_replace ( "  ", "_", $str );
		$str = str_replace ( " ", "_", $str );
		return $str;
	}
	function strtomin($str) {
		$big = "��������������������������������QWERTYUIOPASDFGHJKLZXCVBNM";
		$min = "��������������������������������qwertyuiopasdfghjklzxcvbnm";
		$split = str_split ( $big );
		$split2 = str_split ( $min );
		$ar = array ();
		foreach ( $split as $n => $t ) {
			$ar ["/$t/is"] = $split2 [$n];
		}
		return preg_replace ( array_keys ( $ar ), array_values ( $ar ), $str );
	}
	public function en($str) {
		$text = iconv ( "windows-1251", "UTF-8", $str );
		
		return $text;
	}
	public function word_for_keys($ph) {
		// $a = str_word_count($ph, 1, "a..zA..Z�..��..�0..9");
		// $ph="";
		// foreach ($a as $word)
		// {
		// $ph.=", $word";
		// }
		// $_SESSION['Titles']['keys'] .= $ph;
	}
	function getUrls() {
	}
	function addDefaultUrl($module, $string, $params = array()) {
		self::$defaultUrls [$module] [$string] = $params;
	}
	function defineDefaultUrls() {
		self::$RewriteUrl = Net_URL_Mapper::getInstance ();
		$host = getenv ( 'HTTP_HOST' );
		if (substr ( $host, 0, 4 ) == 'www.') {
			$host = substr ( $host, 4, strlen ( $host ) );
			header ( "HTTP/1.1 301 Moved Permanently" );
			header ( "Location: http://{$host}" . getenv ( 'REQUEST_URI' ) );
			exit ();
		}
		
		$r301 = array ();
		
		// pages
		$sql = mysql_query ( "select `Id`, `url`, `Title` from `pages` where LENGTH(`url`)>0 group by `url`" );
		if (is_resource ( $sql ) && mysql_num_rows ( $sql ) > 0) {
			while ( ($row = mysql_fetch_assoc ( $sql )) != false ) {
				self::$rewriteUrls ['pages'] [$row ['Id']] = '' . $this->urlencode ( $row ['url'] );
				
				self::$RewriteUrl->connect ( '' . $this->urlencode ( $row ['url'] ), array (
						'module' => 'pages',
						'pages' => $row ['Id'] 
				) );
				
				$r301 ['/pages/' . $row ['Id']] = '/' . $this->urlencode ( $row ['url'] );
				$r301 ['/' . $row ['Id']] = '/' . $this->urlencode ( $row ['url'] );
				
				$r301 ['/pages-' . $row ['Id'] . '.html'] = '/' . $this->urlencode ( $row ['url'] );
				$r301 ['/' . $this->urlencode ( $this->translit ( $row ['Title'] ) )] = '/' . $this->urlencode ( $row ['url'] );
				$r301 ['/pages/' . $this->urlencode ( $row ['url'] )] = '/' . $this->urlencode ( $row ['url'] );
				
				$r301 ['/pages/' . $this->urlencode ( $this->translit ( $row ['Title'] ) )] = '/' . $this->urlencode ( $row ['url'] );
			}
		}
		
		
		
		$sql = mysql_query ( "select `Id`, `Title` from `pages`" );
		if (is_resource ( $sql ) && mysql_num_rows ( $sql ) > 0) {
			while ( ($row = mysql_fetch_assoc ( $sql )) != false ) {
				if (! isset ( self::$rewriteUrls ['pages'] [$row ['Id']] )) {
					self::$rewriteUrls ['pages'] [$row ['Id']] = '' . $this->urlencode ( $this->translit ( $row ['Title'] ) );
				}
				self::$RewriteUrl->connect ( '' . $this->urlencode ( $this->translit ( $row ['Title'] ) ), array (
						'module' => 'pages',
						'pages' => $row ['Id'] 
				) );
				
				$r301 ['/pages/' . $this->urlencode ( $this->translit ( $row ['Title'] ) ) . ''] = '/' . $this->urlencode ( $this->translit ( $row ['Title'] ) );
				$r301 ['/pages/' . $row ['Id'] . ''] = '/' . $this->urlencode ( $this->translit ( $row ['Title'] ) );
				$r301 ['/' . $row ['Id'] . ''] = '/' . $this->urlencode ( $this->translit ( $row ['Title'] ) );
				
				$r301 ['/pages-' . $row ['Id'] . '.html'] = '/' . $this->urlencode ( $this->translit ( $row ['Title'] ) );
			}
		}
		
		$r301 ['/shop.html'] = '/shop';
		// news
		$sql = mysql_query ( "select `id`, `url`, `name` from `shop_items` where LENGTH(`url`)>0 group by `url`" );
		if (is_resource ( $sql ) && mysql_num_rows ( $sql ) > 0) {
			while ( ($row = mysql_fetch_assoc ( $sql )) != false ) {
				self::$rewriteUrls ['shop'] [$row ['id']] = 'shop/' . $this->urlencode ( $row ['url'] );
				
				self::$RewriteUrl->connect ( 'shop/' . $this->urlencode ( $row ['url'] ), array (
						'module' => 'shop',
						'shop' => $row ['id'] 
				) );
				
				$r301 ['/shop/' . $row ['id'] . ''] = '/shop/' . $this->urlencode ( $row ['url'] );
				
				$r301 ['/shop-' . $row ['id'] . '.html'] = '/shop/' . $this->urlencode ( $row ['url'] );
				$r301 ['/shop/' . $this->urlencode ( $this->translit ( $row ['name'] ) . '_no' . $row ['id'] )] = '/shop/' . $this->urlencode ( $row ['url'] );
			}
		}
		$sql = mysql_query ( "select `id`, `name` from `shop_items`" );
		if (is_resource ( $sql ) && mysql_num_rows ( $sql ) > 0) {
			while ( ($row = mysql_fetch_assoc ( $sql )) != false ) {
				if (! isset ( self::$rewriteUrls ['shop'] [$row ['id']] )) {
					self::$rewriteUrls ['shop'] [$row ['id']] = 'shop/' . $this->urlencode ( $this->translit ( $row ['name'] ) ) . '_no' . $row ['id'];
				}
				self::$RewriteUrl->connect ( 'shop/' . $this->urlencode ( $this->translit ( $row ['name'] ) . '_no' . $row ['id'] ), array (
						'module' => 'shop',
						'shop' => $row ['id'] 
				) );
				
				$r301 ['/shop-' . $row ['id'] . '.html'] = '/shop/' . $this->urlencode ( $this->translit ( $row ['name'] ) . '_no' . $row ['id'] );
				$r301 ['/shop/' . $row ['id'] . ''] = '/shop/' . $this->urlencode ( $this->translit ( $row ['name'] ) . '_no' . $row ['id'] );
			}
		}
		$sql = mysql_query ( "select `id`, `url`, `name` from `shop_cat` where LENGTH(`url`)>0 group by `url`" );
		if (is_resource ( $sql ) && mysql_num_rows ( $sql ) > 0) {
			while ( ($row = mysql_fetch_assoc ( $sql )) != false ) {
				
				self::$rewriteUrls ['shop_cat'] [$row ['id']] = 'shop/' . $this->urlencode ( $row ['url'] );
				
				self::$RewriteUrl->connect ( 'shop/' . $this->urlencode ( $row ['url'] ), array (
						'module' => 'shop',
						'catid' => $row ['id'] 
				) );
				
				$r301 ['/shop/catid/' . $row ['id'] . ''] = '/shop/' . $this->urlencode ( $row ['url'] );
				
				$r301 ['/shop-catid-' . $row ['id'] . '.html'] = '/shop/' . $this->urlencode ( $row ['url'] );
				$r301 ['/shop/' . $this->urlencode ( $this->translit ( $row ['name'] ) )] = '/shop/' . $this->urlencode ( $row ['url'] );
			}
		}
		$sql = mysql_query ( "select `id`, `name` from `shop_cat`" );
		if (is_resource ( $sql ) && mysql_num_rows ( $sql ) > 0) {
			while ( ($row = mysql_fetch_assoc ( $sql )) != false ) {
				
				
				if (! isset ( self::$rewriteUrls ['shop_cat'] [$row ['id']] )) {
					
					self::$rewriteUrls ['shop_cat'] [$row ['id']] = 'shop/' . $this->urlencode ( $this->translit ( $row ['name'] ) );
				}
				self::$RewriteUrl->connect ( 'shop/' . $this->urlencode ( $this->translit ( $row ['name'] ) ), array (
						'module' => 'shop',
						'catid' => $row ['id'] 
				) );
				
				$r301 ['/shop-catid-' . $row ['id'] . '.html'] = '/shop/' . $this->urlencode ( $this->translit ( $row ['name'] ) );
				$r301 ['/shop/catid/' . $row ['id'] . ''] = '/shop/' . $this->urlencode ( $this->translit ( $row ['name'] ) );
			}
		}
		
		
		$r301 ['/news.html'] = '/news';
		// news
		$sql = mysql_query ( "select `id`, `url`, `name` from `news` where LENGTH(`url`)>0 group by `url`" );
		if (is_resource ( $sql ) && mysql_num_rows ( $sql ) > 0) {
			while ( ($row = mysql_fetch_assoc ( $sql )) != false ) {
				self::$rewriteUrls ['news'] [$row ['id']] = 'news/' . $this->urlencode ( $row ['url'] );
				
				self::$RewriteUrl->connect ( 'news/' . $this->urlencode ( $row ['url'] ), array (
						'module' => 'news',
						'news' => $row ['id'] 
				) );
				
				/* $r301 ['/news/' . $row ['id'] . ''] = '/news/' . $this->urlencode ( $row ['url'] );
				
				$r301 ['/news-' . $row ['id'] . '.html'] = '/news/' . $this->urlencode ( $row ['url'] );
				$r301 ['/news/' . $this->urlencode ( $this->translit ( $row ['name'] ) )] = '/news/' . $this->urlencode ( $row ['url'] ); */
			}
		}
		$sql = mysql_query ( "select `id`, `name` from `news`" );
		if (is_resource ( $sql ) && mysql_num_rows ( $sql ) > 0) {
			while ( ($row = mysql_fetch_assoc ( $sql )) != false ) {
				if (! isset ( self::$rewriteUrls ['news'] [$row ['id']] )) {
					self::$rewriteUrls ['news'] [$row ['id']] = 'news/' . $this->urlencode ( $this->translit ( $row ['name'] ) );
				}
				self::$RewriteUrl->connect ( 'news/' . $this->urlencode ( $this->translit ( $row ['name'] ) ), array (
						'module' => 'news',
						'news' => $row ['id'] 
				) );
				
				//$r301 ['/news-' . $row ['id'] . '.html'] = '/news/' . $this->urlencode ( $this->translit ( $row ['name'] ) );
				//$r301 ['/news/' . $row ['id'] . ''] = '/news/' . $this->urlencode ( $this->translit ( $row ['name'] ) );
			}
		}
		$r301 ['/articles.html'] = '/articles';
		// articles
		$sql = mysql_query ( "select `id`, `url`, `name` from `articles` where LENGTH(`url`)>0 group by `url`" );
		if (is_resource ( $sql ) && mysql_num_rows ( $sql ) > 0) {
			while ( ($row = mysql_fetch_assoc ( $sql )) != false ) {
				self::$rewriteUrls ['articles'] [$row ['id']] = 'articles/' . $this->urlencode ( $row ['url'] );
				
				self::$RewriteUrl->connect ( 'articles/' . $this->urlencode ( $row ['url'] ), array (
						'module' => 'articles',
						'articles' => $row ['id'] 
				) );
				
				$r301 ['/articles/' . $row ['id'] . ''] = '/articles/' . $this->urlencode ( $row ['url'] );
				
				$r301 ['/articles-' . $row ['id'] . '.html'] = '/articles/' . $this->urlencode ( $row ['url'] );
				$r301 ['/articles/' . $this->urlencode ( $this->translit ( $row ['name'] ) )] = '/articles/' . $this->urlencode ( $row ['url'] );
			}
		}
		$sql = mysql_query ( "select `id`, `name` from `articles`" );
		if (is_resource ( $sql ) && mysql_num_rows ( $sql ) > 0) {
			while ( ($row = mysql_fetch_assoc ( $sql )) != false ) {
				if (! isset ( self::$rewriteUrls ['articles'] [$row ['id']] )) {
					self::$rewriteUrls ['articles'] [$row ['id']] = 'articles/' . $this->urlencode ( $this->translit ( $row ['name'] ) );
				}
				self::$RewriteUrl->connect ( 'articles/' . $this->urlencode ( $this->translit ( $row ['name'] ) ), array (
						'module' => 'articles',
						'articles' => $row ['id'] 
				) );
				
				$r301 ['/articles-' . $row ['id'] . '.html'] = '/articles/' . $this->urlencode ( $this->translit ( $row ['name'] ) );
				$r301 ['/articles/' . $row ['id'] . ''] = '/articles/' . $this->urlencode ( $this->translit ( $row ['name'] ) );
			}
		}
		
		$r301 ['/help.html'] = '/help';
		// articles
		$sql = mysql_query ( "select `id`, `url`, `name` from `articles` where LENGTH(`url`)>0 and `cat_id`='1' group by `url`" );
		if (is_resource ( $sql ) && mysql_num_rows ( $sql ) > 0) {
			while ( ($row = mysql_fetch_assoc ( $sql )) != false ) {
				self::$rewriteUrls ['help'] [$row ['id']] = 'help/' . $this->urlencode ( $row ['url'] );
				
				self::$RewriteUrl->connect ( 'help/' . $this->urlencode ( $row ['url'] ), array (
						'module' => 'help',
						'help' => $row ['id'] 
				) );
				
				$r301 ['/help/' . $row ['id'] . ''] = '/help/' . $this->urlencode ( $row ['url'] );
				
				$r301 ['/help-' . $row ['id'] . '.html'] = '/help/' . $this->urlencode ( $row ['url'] );
				$r301 ['/help/' . $this->urlencode ( $this->translit ( $row ['name'] ) )] = '/help/' . $this->urlencode ( $row ['url'] );
			}
		}
		$sql = mysql_query ( "select `id`, `name` from `articles` where `cat_id`='1'" );
		if (is_resource ( $sql ) && mysql_num_rows ( $sql ) > 0) {
			while ( ($row = mysql_fetch_assoc ( $sql )) != false ) {
				if (! isset ( self::$rewriteUrls ['help'] [$row ['id']] )) {
					self::$rewriteUrls ['help'] [$row ['id']] = 'help/' . $this->urlencode ( $this->translit ( $row ['name'] ) );
				}
				self::$RewriteUrl->connect ( 'help/' . $this->urlencode ( $this->translit ( $row ['name'] ) ), array (
						'module' => 'help',
						'help' => $row ['id'] 
				) );
				
				$r301 ['/help-' . $row ['id'] . '.html'] = '/help/' . $this->urlencode ( $this->translit ( $row ['name'] ) );
				$r301 ['/help/' . $row ['id'] . ''] = '/help/' . $this->urlencode ( $this->translit ( $row ['name'] ) );
			}
		}
		
		$r301 ['/faq.html'] = '/faq';
		$modules = array (
				// 'gallery' => 'gallery',
				'news' => 'news',
				'faq' => 'faq',
				
				'articles' => 'articles',
				'pages' => 'pages',
				'search' => 'search',
			
				'shop' => 'shop',
				'cart' => 'cart',
				'reviews' => 'comments',
				'gallery' => 'gallery',
				'help' => 'help',
				'sitemap' => 'mapsite' ,
				'advice' => 'advice'
		);
		self::$RewriteUrl->connect ( 'search.html', array (
				'module' => 'search' 
		) );
		self::$RewriteUrl->connect ( 'cart.html', array (
				'module' => 'cart' 
		) );
		self::$RewriteUrl->connect ( 'shop-search.html', array (
				'module' => 'shop',
				'shop' => 'search',
				'search' => true 
		) );
		foreach ( $modules as $name => $module ) {
			self::$RewriteUrl->connect ( $name, array (
					'module' => $module 
			) );
			self::$RewriteUrl->connect ( $name . '/:' . $module, array (
					'module' => $module 
			) );
			self::$RewriteUrl->connect ( $name . '/catid/:catid', array (
					'module' => $module 
			) );
			self::$RewriteUrl->connect ( $name . '/catid/:catid/page/:page', array (
					'module' => $module 
			) );
			self::$RewriteUrl->connect ( $name . '/page/:page', array (
					'module' => $module 
			) );
		}
		include 'redirect.php';
		$path = parse_url ( getenv ( 'REQUEST_URI' ), PHP_URL_PATH );
		
		//if (isset ( $r301 [$path] )) {
			$path = parse_url(getenv('REQUEST_URI'), PHP_URL_PATH);
			$query =  parse_url(getenv('REQUEST_URI'), PHP_URL_QUERY);
			foreach ($r301 as $old=>$new){
				if ($old==$path or $old=="{$path}/"){
					if (!empty($query)){
						$query="?{$query}";
					}
					header ( "HTTP/1.1 301 Moved Permanently" );
					header ( "Location: {$new}{$query}" );
					exit ();
				}
			}
			
			
		//}
		
		/*
		 * self::addDefaultUrl ( "pages", "pages-(?P<pages>[0-9]+?).html" );
		 * self::addDefaultUrl ( "news", "news.html" ); self::addDefaultUrl (
		 * "news", "news-page-(?P<page>[0-9]+?).html" ); self::addDefaultUrl (
		 * "news", "news-(?P<news>[0-9]+?).html" ); self::addDefaultUrl (
		 * "articles", "articles.html" ); self::addDefaultUrl ( "articles",
		 * "articles-page-(?P<page>[0-9]+?).html" ); self::addDefaultUrl (
		 * "articles", "articles-(?P<articles>[0-9]+?).html" );
		 * self::addDefaultUrl ( "help", "help.html" ); self::addDefaultUrl (
		 * "help", "help-page-(?P<page>[0-9]+?).html" ); self::addDefaultUrl (
		 * "help", "help-(?P<help>[0-9]+?).html" ); self::addDefaultUrl ( "faq",
		 * "faq.html" ); self::addDefaultUrl ( "gallery", "gallery.html" );
		 * self::addDefaultUrl ( "gallery", "gallery-(?P<gallery>[0-9]+?).html"
		 * ); self::addDefaultUrl ( "photos", "photos.html" );
		 * self::addDefaultUrl ( "photos", "photos-(?P<photos>[0-9]+?).html" );
		 * self::addDefaultUrl ( "faq", "faq-page-(?P<page>[0-9]+?).html" );
		 * self::addDefaultUrl ( "comments", "reviews.html" );
		 * self::addDefaultUrl ( "comments",
		 * "reviews-page-(?P<page>[0-9]+?).html" ); self::addDefaultUrl (
		 * "cart", "cart.html" ); self::addDefaultUrl ( "cart",
		 * "cart-order.html", array ('order' => true ) ); self::addDefaultUrl (
		 * "lk", "lk.html" ); self::addDefaultUrl ( "lk", "lk-logout.html",
		 * array ("logout" => true ) ); self::addDefaultUrl ( "lk",
		 * "lk-change.html", array ("change" => true ) ); self::addDefaultUrl (
		 * "lk", "lk-changedata.html", array ("changedata" => true ) );
		 * self::addDefaultUrl ( "lk", "lk-recover.html", array ("recover" =>
		 * true ) ); self::addDefaultUrl ( "lk", "lk-recover-password.html",
		 * array ("recover" => true ) ); self::addDefaultUrl ( "reg", "reg.html"
		 * ); self::addDefaultUrl ( "shop", "shop-debug.html", array ("debug" =>
		 * true ) ); self::addDefaultUrl ( "shop", "shop-new.html", array ("new"
		 * => true ) ); self::addDefaultUrl ( "shop", "shop-favorite.html",
		 * array ("favorite" => true ) ); self::addDefaultUrl ( "shop",
		 * "shop-search.html", array ("search" => true ) ); self::addDefaultUrl
		 * ( "shop", "shop-favorite-page-(?P<page>[0-9]+?).html", array
		 * ("favorite" => true ) ); self::addDefaultUrl ( "shop",
		 * "shop-new-page-(?P<page>[0-9]+?).html", array ("new" => true ) );
		 * self::addDefaultUrl ( "shop",
		 * "shop-search-page-(?P<page>[0-9]+?).html", array ("search" => true )
		 * ); self::addDefaultUrl ( "shop", "shop-(?'shop'[0-9]+?).html" );
		 * self::addDefaultUrl ( "shop",
		 * "shop-quickview-(?'quickview'[0-9]+?).html" ); self::addDefaultUrl (
		 * "shop", "shop-catid-(?P<catid>[0-9]+?).html" ); self::addDefaultUrl (
		 * "shop", "shop-catid-(?P<catid>[0-9]+?)-page-(?P<page>[0-9]+?).html"
		 * ); self::addDefaultUrl ( "search", "search.html" );
		 */
		$this->var = 2;
	}
	function view() {
		
		// $dir = $_SERVER['DOCUMENT_ROOT']."/sess/";
		$_SESSION ['Titles'] = array (
				"desc" => "",
				"keys" => ""
		);
		$_SESSION ['Road'] = "";
		$_SESSION ['Title_road'] = "";
		$_SESSION ['Razd_road'] = "";
		$this->connect_db ();
		Users::getUser ();
		self::defineDefaultUrls ();
		CatalogSystem::loadDisabledCategory ();
		self::getUrls ();
		$this->C_P_U ();
		// print_r(self::$rewriteGet);
		
		new Safe ();
		$this->set_default_titles ();
		
		if ($this->Template != "") {
			$this->templ = $this->Template;
		}
		if (isset ( $_GET ['module'] )) {
			
			if (! class_exists ( $this->module )) {
				$this->req_module ( $_GET ['module'] );
			}
			if (class_exists ( $_GET ['module'] )) {
				
				$mod = new $_GET ['module'] ();
				$this->set_module_tpl ( $mod );
			} else {
				header ( "HTTP/1.x 404 Not Found" );
				$mod = new not_found ();
				$this->set_module_tpl ( $mod );
			}
		} elseif (! isset ( $_GET ['module'] ) && $_SERVER ['REQUEST_URI'] != "/") {
			header ( "HTTP/1.x 404 Not Found" );
			$mod = new not_found ();
			$this->set_module_tpl ( $mod );
		} else {
			if (! class_exists ( $this->module )) {
				$this->req_module ( $this->module );
			}
			if (class_exists ( $this->module )) {
				
				$mod = new $this->module ();
				$this->set_module_tpl ( $mod );
			} else {
				// header("Location: /error.html");
			}
		}
		
		$this->install_module ();
		$this->install_widgets ();
		$this->show ();
	}
	function set_default_titles() {
		$sql = mysql_query ( "select * from `site_setting`" );
		while ( $row = mysql_fetch_array ( $sql ) ) {
			switch ($row ['option']) {
				case "title" :
					BreadcrumbsTitle::add ( $row ['value'] );
					break;
				case "desc" :
					$_SESSION ['Titles'] ['desc'] = $row ['value'];
					break;
				case "keys" :
					$_SESSION ['Titles'] ['keys'] = $row ['value'];
					break;
				case "razd_road" :
					$_SESSION ['Razd_road'] = $row ['value'];
					break;
			}
		}
	}
	function setTemplateFile($file) {
		$this->FileTemplate = $file;
	}
	function _replace($input, $design) {
		$design = preg_replace ( array_keys ( $input ), array_values ( $input ), $design );
		return $design;
	}
	function _before_while($design) {
		preg_match_all ( "/(.*?){while}/is", $design, $_before_while );
		
		if (isset ( $_before_while [1] )) {
			if (isset ( $_before_while [1] [0] )) {
				return $_before_while [1] [0];
			}
		}
	}
	function _after_while($design) {
		preg_match_all ( "/{\/while}(.*)/is", $design, $_after_while );
		if (isset ( $_after_while [1] )) {
			if (isset ( $_after_while [1] [0] )) {
				return $_after_while [1] [0];
			}
		}
	}
	function _while($input, $design) {
		preg_match_all ( "/{while}(.*?){\/while}/is", $design, $_while );
		if (isset ( $_while [1] )) {
			$while = preg_replace ( array_keys ( $input ), array_values ( $input ), $_while [1] [0] );
		}
		if (isset ( $while )) {
			return $while;
		}
	}
	function start() {
		$this->startTime = gettimeofday ();
	}
	function stop() {
		$this->endTime = gettimeofday ();
	}
	function elapsed() {
		return (($this->endTime ["sec"] - $this->startTime ["sec"]) * 1000000 + ($this->endTime ["usec"] - $this->startTime ["usec"])) / 1000000;
	}
	protected function chpu_links_replace($a) {
		preg_match_all ( "/href=(\"|')(.*?)(\"|')/is", $a, $links_chpu );
		
		foreach ( $links_chpu [2] as $num => $link ) {
			
			if (! preg_match ( "/href=(\"|')(http:\/\/)/is", $links_chpu [0] [$num] )) {
				$links_chpu [2] [$num] = htmlspecialchars_decode ( $links_chpu [2] [$num] );
				
				$link = $links_chpu [2] [$num];
				$link = htmlspecialchars_decode ( $link );
				
				if (substr ( $link, 0, 1 ) == "/") {
					continue;
				}
				$l = str_replace ( "?", "", $link );
				$l = preg_replace ( "/&amp;/is", "/", $l );
				
				$l = preg_replace ( "/&/is", "/", $l );
				$l = str_replace ( "=", "/", $l );
				$pz = pathinfo ( $l );
				if (preg_match ( "/mailto:/", $l )) {
					continue;
				}
				if (preg_match ( "/javascript:/", $l )) {
					continue;
				}
				if (preg_match ( "/#/", $l )) {
					continue;
				}
				if (substr ( $l, 0, 1 ) == '/') {
					continue;
				}
				if ($l != "/" && substr ( $l, 0, 1 ) != "/" && ! empty ( $l ) && ! isset ( $pz ['extension'] ) && substr ( $l, 0, 7 ) != "http://" && substr ( $l, 0, 8 ) != "https://") {
					
					$l = $l;
					$get = self::$RewriteUrl->match ( $l );
					
					if (isset ( $get ['module'] )) {
						
						if ($get ['module'] == 'pages' && isset ( $get ['pages'] ) && isset ( self::$rewriteUrls ['pages'] [( int ) $get ['pages']] )) {
							$l = self::$rewriteUrls ['pages'] [( int ) $get ['pages']];
						} elseif ($get ['module'] == 'news' && isset ( $get ['news'] ) && isset ( self::$rewriteUrls ['news'] [( int ) $get ['news']] )) {
							$l = self::$rewriteUrls ['news'] [( int ) $get ['news']];
						} elseif ($get ['module'] == 'articles' && isset ( $get ['articles'] ) && isset ( self::$rewriteUrls ['articles'] [( int ) $get ['articles']] )) {
							
							$l = self::$rewriteUrls ['articles'] [( int ) $get ['articles']];
						} elseif ($get ['module'] == 'help' && isset ( $get ['help'] ) && isset ( self::$rewriteUrls ['help'] [( int ) $get ['help']] )) {
							
							$l = self::$rewriteUrls ['help'] [( int ) $get ['help']];
						} elseif ($get ['module'] == 'shop' && isset ( $get ['catid'] ) && isset ( self::$rewriteUrls ['shop_cat'] [( int ) $get ['catid']] )) {
							
							$l = self::$rewriteUrls ['shop_cat'] [( int ) $get ['catid']];
						} elseif ($get ['module'] == 'shop' && isset ( $get ['shop'] ) && isset ( self::$rewriteUrls ['shop'] [( int ) $get ['shop']] )) {
							
							$l = self::$rewriteUrls ['shop'] [( int ) $get ['shop']];
						}
					}
				}
				
				// if (substr($l,0,1)!="/")continue;
				$a = str_replace ( $links_chpu [0] [$num], "href={$links_chpu [1] [$num]}$l{$links_chpu [1] [$num]}", $a );
				$links_chpu [0] [$num] = str_replace ( $links_chpu [0] [$num], "href={$links_chpu [1] [$num]}$l{$links_chpu [1] [$num]}", $links_chpu [0] [$num] );
				if ($this->chpu == 2) {
					if (! preg_match ( "/href=(\"|')\//is", $links_chpu [0] [$num] )) {
						
						$a = str_replace ( $links_chpu [0] [$num], "href='/$l'", $a );
					}
				}
			}
		}
		
		preg_match_all ( "/src=(\"|')(.*?)(\"|')/is", $a, $images_chpu );
		foreach ( $images_chpu [2] as $num => $link ) {
			if (substr ( $link, 0, 1 ) == "/") {
				continue;
			}
			if (! eregi ( "http://", $link ) && ! empty ( $link )) {
				$a = str_replace ( $images_chpu [0] [$num], "src={$images_chpu [1] [$num]}/{$link}{$images_chpu [3] [$num]}", $a );
			}
		}
		return $a;
	}
	function parseLink($link) {
		$iz = $link;
		$URIelements = array_values ( array_filter ( explode ( '-', $iz ) ) );
		$G = array ();
		$count = count ( $URIelements );
		foreach ( $URIelements as $key => $val ) {
			if ($key == 0) {
				$G ['module'] = $val;
			}
			
			if (! isset ( $_GET ['module'] )) {
				
				if ($count == 1) {
					if (! is_numeric ( $val )) {
						$G ['module'] = $val;
					}
				}
				if ($count == 2 && $key == 0) {
					if (! is_numeric ( $val )) {
						$G ['module'] = $val;
					}
				}
				
				if ($val == "module") {
					$next = $key + 1;
					if (isset ( $URIelements [$next] )) {
						$G [$val] = $URIelements [$next];
					}
				}
				if ($count == 2) {
					$next = $key + 1;
					if (isset ( $URIelements [$next] )) {
						$G [$val] = $URIelements [$next];
					}
				}
			}
			if (! is_numeric ( $val )) {
				
				$next = $key + 1;
				if (isset ( $URIelements [$next] )) {
					$nn = $URIelements [$next];
				}
				if (isset ( $nn )) {
					
					$G [$val] = $nn;
				}
			}
		}
		return $G;
	}
	protected function loadtime() {
		return "�������� ��������������� �� " . round ( $this->elapsed (), 4 ) . " ���.";
	}
	private function C_P_U() {
		$path = getenv ( 'REQUEST_URI' );
		$path2 = parse_url ( getenv ( 'REQUEST_URI' ), PHP_URL_PATH );
		if ($path == "/" or $path2 == '/') {
			$_GET ['module'] = 'pages';
			$_GET ['isIndex'] = true;
			return true;
		}
		$match = self::$RewriteUrl->match ( getenv ( 'REQUEST_URI' ) );
		if ($match) {
			
			$_GET = array_merge ( $_GET, $match );
		} else {
			
			$match = self::$RewriteUrl->match ( $path2 );
			$_GET = array_merge ( $_GET, $match );
		}
		return true;
		foreach ( self::$defaultUrls as $module => $urls ) {
			if ($route == true) {
				break;
			}
			foreach ( $urls as $url => $addparams ) {
				$params ['module'] = $module;
				$url2 = str_replace ( "/", "\/", $url );
				if (preg_match ( "/$url2/", $path, $p )) {
					
					unset ( $p [0] );
					foreach ( array_keys ( $p ) as $key ) {
						if (! is_string ( $key )) {
							unset ( $p [$key] );
						}
					}
					$totalParams = count ( $p );
					
					foreach ( $p as $pNum => $value ) {
						if (empty ( $value )) {
							unset ( $p [$pNum] );
						}
					}
					
					if ($totalParams != count ( $p )) {
						$params ['module'] = false;
						break;
					}
					$params = array_merge ( $params, $p );
					$params = array_merge ( $params, $addparams );
					foreach ( array_keys ( $params ) as $key ) {
						
						if (! is_string ( $key )) {
							
							unset ( $params [$key] );
						}
					}
					
					$route = true;
					break;
				} else {
					$params ['module'] = false;
				}
			}
		}
		if ($params ['module'] != false) {
			$_GET = array_merge ( $_GET, $params );
			return true;
		}
		
		$_GET = array_merge ( $_GET, $params );
		
		return true;
		
		$parse = parse_url ( "http://{$_SERVER['HTTP_HOST']}{$_SERVER['REQUEST_URI']}" );
		$path = parse_url ( "http://{$_SERVER['HTTP_HOST']}{$_SERVER['REQUEST_URI']}", PHP_URL_PATH );
		
		$pathinfo = isset ( $parse ['filename'] ) ? pathinfo ( $parse ['filename'] ) : '';
		foreach ( self::$rewriteGet as $module => $paths ) {
			if (isset ( $paths [$path] )) {
				$_GET = $paths [$path];
				self::AfterExt ();
				return true;
			}
		}
		
		if (isset ( $parse ['path'] ) && $parse ['path'] == "/" && isset ( $parse ['query'] ) && ! empty ( $parse ['query'] )) {
			$_GET ['module'] = 'pages';
			return true;
		}
		
		$ch = $this->chpu;
		if (! preg_match ( "/.{$this->extention}/is", $_SERVER ['REQUEST_URI'] ) && $_SERVER ['REQUEST_URI'] != "/") {
			$ch = 2;
		}
		if ($ch == 0) {
			$_GET = array ();
			$exp = explode ( "&", $_SERVER ['QUERY_STRING'] );
			$count = count ( $exp );
			
			foreach ( $exp as $key => $value ) {
				
				$ex = explode ( "=", $value );
				foreach ( $ex as $z => $val ) {
					if (! isset ( $_GET ['module'] )) {
						if ($count == 1 && $z == "0" or $key == 0 && $z == 0) {
							
							$_GET ['module'] = $val;
							if (isset ( $ex [1] )) {
								$_GET [$val] = $ex [1];
							}
						}
					} else {
						if (isset ( $ex [1] )) {
							$_GET [$val] = $ex [1];
						}
					}
				}
			}
		} elseif ($ch == 1) {
			$iz = $_SERVER ['REQUEST_URI'];
			preg_match ( "/\/(.*).{$this->extention}/is", $iz, $out );
			if (isset ( $out [1] )) {
				$iz = $out [1];
			} else {
				$iz = "";
			}
			
			$URIelements = array_values ( array_filter ( explode ( '-', $iz ) ) );
			$_GET = array ();
			$count = count ( $URIelements );
			foreach ( $URIelements as $key => $val ) {
				if ($key == 0) {
					$_GET ['module'] = $val;
				}
				
				if (! isset ( $_GET ['module'] )) {
					
					if ($count == 1) {
						if (! is_numeric ( $val )) {
							$_GET ['module'] = $val;
						}
					}
					if ($count == 2 && $key == 0) {
						if (! is_numeric ( $val )) {
							$_GET ['module'] = $val;
						}
					}
					
					if ($val == "module") {
						$next = $key + 1;
						if (isset ( $URIelements [$next] )) {
							$_GET [$val] = $URIelements [$next];
						}
					}
					if ($count == 2) {
						$next = $key + 1;
						if (isset ( $URIelements [$next] )) {
							$_GET [$val] = $URIelements [$next];
						}
					}
				}
				if (! is_numeric ( $val )) {
					
					$next = $key + 1;
					if (isset ( $URIelements [$next] )) {
						$nn = $URIelements [$next];
					}
					if (isset ( $nn )) {
						
						$_GET [$val] = $nn;
					}
				}
			}
			
			foreach ( $_GET as $name => $value ) {
				if (preg_match ( "/c([0-9]+)/is", $name, $n )) {
					$_GET ['catid'] = $n [1];
				}
				if (preg_match ( "/a([0-9]+)/is", $name, $n )) {
					$_GET ['articles'] = $n [1];
				}
			}
			$this->AfterExt ();
		} elseif ($this->chpu == 2) {
			$URI = $_SERVER ['REQUEST_URI'];
			$URIelements = array_values ( array_filter ( explode ( '/', $URI ) ) );
			$_GET = array ();
			$count = count ( $URIelements );
			foreach ( $URIelements as $key => $val ) {
				if ($key == 0) {
					$_GET ['module'] = $val;
				}
				// echo $_GET['module'];
				
				if (! isset ( $_GET ['module'] )) {
					
					if ($count == 1) {
						if (! is_numeric ( $val )) {
							$_GET ['module'] = $val;
						}
					}
					if ($count == 2 && $key == 0) {
						if (! is_numeric ( $val )) {
							$_GET ['module'] = $val;
						}
					}
					
					if ($val == "module") {
						$next = $key + 1;
						if (isset ( $URIelements [$next] )) {
							$_GET [$val] = $URIelements [$next];
						}
					}
					if ($count == 2) {
						$next = $key + 1;
						if (isset ( $URIelements [$next] )) {
							$_GET [$val] = $URIelements [$next];
						}
					}
				}
				if (! is_numeric ( $val )) {
					
					$next = $key + 1;
					if (isset ( $URIelements [$next] )) {
						$nn = $URIelements [$next];
					}
					if (isset ( $nn )) {
						
						$_GET [$val] = $nn;
					}
				}
			}
		}
	}
	function AfterExt() {
		// $extention;
		$iz = $_SERVER ['REQUEST_URI'];
		preg_match ( "/\/(.*?).{$this->extention}[?](.*)/is", $iz, $out );
		if (isset ( $out [2] )) {
			$exp = explode ( "&", $out [2] );
			foreach ( $exp as $values ) {
				$exp2 = explode ( "=", $values );
				if (isset ( $exp2 [0] ) && ! empty ( $exp2 [0] )) {
					if (isset ( $exp2 [1] ) && ! empty ( $exp2 [1] )) {
						if (! isset ( $_GET [$exp2 [0]] )) {
							$_GET [$exp2 [0]] = $exp2 [1];
						}
					}
				}
			}
		}
	}
	private function show() {
		$page = $this->chpu_links_replace ( $this->template );
		$this->stop ();
		$page = str_replace ( "{time}", $this->loadtime (), $page );
		echo $page;
	}
	protected function init_module_by_get() {
		// if (!isset($_GET['id']) && !isset($_GET['module']) &&
		// !is_null($_GET))
		// {
		foreach ( $_GET as $ind => $value ) {
			// echo "$ind ==> $value <br>";
			if ($ind == "0" && ! is_int ( $value )) {
				$this->module = $value;
			}
		}
		
		// }
	}
	protected function get_template() {
		if (file_exists ( "template/" . $this->templ . "/{$this->FileTemplate}.html" )) {
			
			$this->template = file_get_contents ( $this->dirtmpl . $this->templ . "/{$this->FileTemplate}.html" );
		} else {
			echo "����������� ������! �� ������ ������ �����!";
			exit ();
		}
	}
	/**
	 * ������� ���������� ������
	 */
	protected function install_module() {
		$this->get_template ();
		foreach ( $this->vars as $find => $replace ) {
			preg_match ( "/{{$find}}/is", $this->template, $match );
			
			if (isset ( $match [0] ) && ! empty ( $match [0] )) {
				
				$this->template = str_replace ( $match [0], $replace, $this->template );
			}
		}
	}
	/**
	 * ��������� �������� � ������
	 */
	protected function install_widgets() {
		preg_match_all ( "/{([a-zA-Z0-9_!+@#$%^&*()|\:;\"'\][}{]+)}/is", $this->template, $widgets );
		foreach ( $widgets [1] as $wid ) {
			$widget = strtolower ( $wid );
			if (! class_exists ( $widget )) {
				$this->req_widget ( $widget );
			}
			if (class_exists ( $widget )) {
				$mod = new $widget ();
				$mod->over = $this->install_widget_in_widgets ( $mod->over );
				$this->template = str_replace ( "{" . $wid . "}", $mod->over, $this->template );
			}
			if (preg_match ( "/block_/is", $wid )) {
				
				$ww = str_replace ( "block_", "", $wid );
				$row = mysql_fetch_array ( mysql_query ( "select * from blocks where `name` like '%$ww%'" ) );
				if ($row ['text']) {
					$row ['text'] = $this->install_widget_in_widgets ( $row ['text'] );
					$this->template = str_replace ( "{" . $wid . "}", $row ['text'], $this->template );
				}
			}
		}
	}
	protected function install_widget_in_widgets($over) {
		preg_match_all ( "/{([a-zA-Z0-9_!+@#$%^&*()|\:;\"'\][}{]+)}/is", $over, $widgets );
		if (isset ( $widgets [1] )) {
			foreach ( $widgets [1] as $wid ) {
				$widget = strtolower ( $wid );
				if (! class_exists ( $widget )) {
					$this->req_widget ( $widget );
				}
				if (class_exists ( $widget )) {
					$mod = new $widget ();
					$mod->over = $this->install_widget_in_widgets ( $mod->over );
					$over = str_replace ( "{" . $wid . "}", $mod->over, $over );
				}
				if (preg_match ( "/block_/is", $wid )) {
					
					$ww = str_replace ( "block_", "", $wid );
					$row = mysql_fetch_array ( mysql_query ( "select * from blocks where `name` like '%$ww%'" ) );
					if ($row ['text']) {
						$row ['text'] = $this->install_widget_in_widgets ( $row ['text'] );
						$over = str_replace ( "{" . $wid . "}", $row ['text'], $over );
					}
				}
			}
		}
		return $over;
	}
	protected function set_module_tpl($mod) {
		if (isset ( $mod->params )) {
			if (isset ( $mod->params ['template'] )) {
				$this->FileTemplate = $mod->params ['template'];
			}
		}
		$this->set_tpl ( "MODULE", $mod->over );
	}
	protected function add_tpl($cls) {
		foreach ( $cls->add_tpls () as $key => $value ) {
			$this->set_tpl ( $key, $value );
		}
	}
	public function set_template($template) {
		if ($s != null) {
			$this->templ = "$template";
		} else {
			$this->templ = "default";
		}
	}
	protected function set_tpl($key, $value = "") {
		if ($key != null) {
			$this->vars [$key] = $value;
		}
	}
	/**
	 * ������� ������� mysql_query
	 *
	 * @param
	 *        	������ � ���� ������ $query
	 * @return ������� ������� mysql_query
	 */
	protected function query($query) {
		if (isset ( $query )) {
			$result = mysql_query ( $query ) or die ( mysql_error () );
			return $result;
		}
	}
}
class Breadcrumbs {
	protected static $lastLink = false;
	protected static $path = array ();
	protected static $closer = '';
	static function add($key) {
		self::$path [] = $key;
	}
	static function lastLink($bool) {
		self::$lastLink = $bool;
	}
	static function forward() {
		krsort ( self::$path );
	}
	static function closer($tag = "li", $optionTag = "") {
		$path = self::$path;
		if (self::$lastLink == false) {
			unset($path [count ( $path ) - 1]);
			//if (count ( $path ) == 1) {
			//	$path [0] = trim ( strip_tags ( $path [count ( $path ) - 1] ) );
			//} elseif (count ( $path ) > 1) {
			//	$path [count ( $path ) - 1] = trim ( strip_tags ( $path [count ( $path ) - 1] ) );
			//}
		}
		$out = '';
		foreach ( $path as $url ) {
			$out .= "<{$tag} {$optionTag}>{$url}</{$tag}>";
		}
		$out.="<{$tag} {$optionTag}></{$tag}>";
		return $out;
	}
	static function get($sep = " / ") {
		$path = self::$path;
		if (self::$lastLink == false) {
			$path [count ( $path ) - 1] = trim ( strip_tags ( $path [count ( $path ) - 1] ) );
		}
		
		return implode ( $sep, $path );
	}
	static function getClear($sep = " / ") {
		$new = array ();
		foreach ( self::$path as $key ) {
			$key = trim ( strip_tags ( $key ) );
		}
		return implode ( $sep, $new );
	}
}
class BreadcrumbsTitle {
	protected static $path = array ();
	static function add($key) {
		self::$path [] = $key;
	}
	static function set($key){
		self::$path  = array($key);
		//self:$path = array($key);
	} 
	static function forward() {
		krsort ( self::$path );
	}
	static function getClear($sep = " / ") {
		$new = array ();
		foreach ( self::$path as $key ) {
			$new [] = trim ( strip_tags ( $key ) );
		}
		return implode ( $sep, $new );
	}
}
class title {
	var $over = "";
	function __construct() {
		$this->over = BreadcrumbsTitle::getClear ( ' / ' );
	}
}
class desc {
	var $over = "";
	function __construct() {
		$this->over = $_SESSION ['Titles'] ['desc'];
	}
}
class keys {
	var $over = "";
	function __construct() {
		$this->over = '<meta content="'.$_SESSION ['Titles'] ['keys'].'" name="keywords" />
		<link href="http://masterkov.ru'.$_SERVER['REQUEST_URI'].'" rel="canonical" />';
	}
}
class road {
	var $over = "";
	function __construct() {
		$this->over = Breadcrumbs::closer ();
	}
}
