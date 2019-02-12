<?php
class order_form extends glb {
	var $over = '';
	var $val = array ();
	function post($name) {
		$post = isset ( $_POST [$name] ) ? $_POST [$name] : '';
		$post = str_replace ( "{", "", $post );
		$post = str_replace ( "}", "", $post );
		$post = strip_tags ( $post );
		$post = trim ( $post );
		return $post;
	}
	function v($name) {
		return htmlspecialchars ( $this->val [$name] );
	}
	function getEmailAdmin() {
		$sql = mysql_query ( "select * from `site_setting` where `option`='email_admin'" );
		if (is_resource ( $sql ) && mysql_num_rows ( $sql ) > 0) {
			$row = mysql_fetch_assoc ( $sql );
			return $row ['value'];
		}
		return "";
	}
	function isEmpty() {
		foreach ( $this->val as $val ) {
			if (empty ( $val )) {
				return true;
			}
		}
		return false;
	}
	function __construct() {
		$values = array ();
		for($i = 1; $i <= 7; $i ++) {
			$values ["v{$i}"] = $this->post ( "v{$i}" );
		}
		$this->val = $values;
		$error = "";
		if (isset ( $_POST ['Submit'] )) {
			if ($this->isEmpty () == true) {
				$error = "<p class=\"block1bold\" align='center'>��� ���� ����������� ��� ����������</p>";
			} elseif (! preg_match ( "/^[a-z0-9_.-]+@([a-z0-9_]+.)+[a-z]{2,4}$/i", $this->val ["v2"] )) {
				$error = "<p class=\"block1bold\" align='center'>�� ����� ������ Email �����</p>";
			} elseif ($this->strtomin ( $_SESSION ['secret_code'] ) != $this->strtomin ( $this->val ['v7'] )) {
				$error = "<p class=\"block1bold\" align='center'>�� ����� ������� ����� � ��������</p>";
			} else {
				$msg = "<table>
				
				<tr><td width='225'><strong>���:</strong></td><td width='350'>{$this->val['v1']}</td></tr>
				<tr><td ><strong>e-mail:</strong></td><td>{$this->val['v2']}</td></tr>
				<tr><td ><strong>�����:</strong></td><td>{$this->val['v3']}</td></tr>
				<tr><td ><strong>�����:</strong></td><td>{$this->val['v4']}</td></tr>
				<tr><td ><strong>��� ������ � ����� �����:</strong></td><td>{$this->val['v5']}</td></tr>
				<tr><td ><strong>������::</strong></td><td>" . nl2br ( $this->val ['v6'] ) . "</td></tr>
				</table>
				";
				$error = "<p class=\"block1bold\" align='center'>���� ������ ������� ����������</p>";
				for($i = 1; $i <= 7; $i ++) {
					$values ["v{$i}"] = '';
				}
				$_SESSION ['secret_code'] = '';
				$send = new Email ();
				$send->setFrom ( 'robot@' . preg_replace ( "/www./is", "", getenv ( 'HTTP_HOST' ) ) );
				$send->EmailHTML ( $this->getEmailAdmin (), '������ � �����' . preg_replace ( "/www./is", "", getenv ( 'HTTP_HOST' ) ), $msg );
			}
		}
		
		$out = '<p class="block1bold">����� ��-���� ������:</p><a name="order"></a>';
		$out .= $error;
		$out .= '<form method="POST" action="#order">
		
  <table width="100%" class="block1">
    <tbody><tr> 
      <td align="right" width="180"> ���� ���:</td>
      <td width="70%" align="left"> <input type="text" value="' . $this->v ( 'v1' ) . '" size="30" style="BACKGROUND-COLOR: #ffffff; BORDER-BOTTOM: #CCCCCC 1px solid; BORDER-LEFT: #CCCCCC 1px  solid; BORDER-RIGHT: #CCCCCC 1px  solid; BORDER-TOP: #CCCCCC 1px solid; FONT-SIZE: 12px" name="v1"> 
      </td>
    </tr>
    <tr> 
      <td align="right"> ��� e-mail:</td>
      <td width="70%" align="left"> <input type="text" value="' . $this->v ( 'v2' ) . '" size="30" style="BACKGROUND-COLOR: #ffffff; BORDER-BOTTOM: #CCCCCC 1px solid; BORDER-LEFT: #CCCCCC 1px  solid; BORDER-RIGHT: #CCCCCC 1px  solid; BORDER-TOP: #CCCCCC 1px solid; FONT-SIZE: 12px" name="v2"> 
      </td>
    </tr>
    <tr> 
      <td align="right"> �����:</td>
      <td align="left"> <input type="text" size="30" value="' . $this->v ( 'v3' ) . '" style="BACKGROUND-COLOR: #ffffff; BORDER-BOTTOM: #CCCCCC 1px solid; BORDER-LEFT: #CCCCCC 1px  solid; BORDER-RIGHT: #CCCCCC 1px  solid; BORDER-TOP: #CCCCCC 1px solid; FONT-SIZE: 12px" name="v3"> 
      </td>
    </tr>
    <tr> 
      <td align="right"> ��� �������:</td>
      <td align="left"> <input type="text" value="' . $this->v ( 'v4' ) . '" size="30" style="BACKGROUND-COLOR: #ffffff; BORDER-BOTTOM: #CCCCCC 1px solid; BORDER-LEFT: #CCCCCC 1px  solid; BORDER-RIGHT: #CCCCCC 1px  solid; BORDER-TOP: #CCCCCC 1px solid; FONT-SIZE: 12px" name="v4"> 
      </td>
    </tr>
    <tr> 
      <td align="right"> ��� �� ������ � ����� �����:</td>
      <td width="70%" align="left"> <input type="text" value="' . $this->v ( 'v5' ) . '" size="30" style="BACKGROUND-COLOR: #ffffff; BORDER-BOTTOM: #CCCCCC 1px solid; BORDER-LEFT: #CCCCCC 1px  solid; BORDER-RIGHT: #CCCCCC 1px  solid; BORDER-TOP: #CCCCCC 1px solid; FONT-SIZE: 12px" name="v5"> 
      </td>
    </tr>
    <tr> 
      <td align="right"> ���� ������:</td>
      <td width="70%" align="left"> <textarea rows="6" style="BACKGROUND-COLOR: #ffffff; BORDER-BOTTOM: #CCCCCC 1px solid; BORDER-LEFT: #CCCCCC 1px  solid; BORDER-RIGHT: #CCCCCC 1px  solid; BORDER-TOP: #CCCCCC 1px solid; FONT-SIZE: 12px" name="v6" cols="40">' . $this->v ( 'v6' ) . '</textarea> 
      </td>
    </tr>
    <tr> 
      <td align="right" colspan="2">&nbsp;</td>
    </tr>
      <tr> 
      <td align="right"> ����� � ��������:</td>
      <td width="70%" align="left"> 
      <table>
      <tr><td>
      <input type="text" size="30" style="BACKGROUND-COLOR: #ffffff; BORDER-BOTTOM: #CCCCCC 1px solid; BORDER-LEFT: #CCCCCC 1px  solid; BORDER-RIGHT: #CCCCCC 1px  solid; BORDER-TOP: #CCCCCC 1px solid; FONT-SIZE: 12px" name="v7"> 
 </td>
      <td>&nbsp;</td>
      <td><img src="/getcaptcha.php" width="140" />
      </td>
      </tr></table>
      </td>
    </tr>
    <tr> 
      <td align="right" colspan="2">&nbsp;</td>
    </tr>
    <tr> 
      <td align="right">&nbsp;</td>
      <td width="70%" align="left"> 
      
      <input type="submit" name="Submit" style="BACKGROUND-COLOR: #FFFFFF ; BORDER-BOTTOM: #CCCCCC 2px solid; BORDER-LEFT: #������ 2px solid; BORDER-RIGHT: #������ 2px solid; BORDER-TOP: #������ 2px solid; FONT-SIZE: 12px; " value="��������� ������"> 
     
      
      </td>
    </tr>
   
  </tbody></table>
</form>';
		
		$out .= '<p>����� ��������� ����� ������, �������� ��������� � ���� � ������� ��� ������ 
    ����� ������. <span class="block1bold">�������� ! ��� ���� ����������� ��� 
    ���������� !</span><br></p>';
		
		$this->over = $out;
	}
}