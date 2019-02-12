<?
class portfolio extends glb {
	public $over = "";
	public $catid = 0;
	public $itemid = 0;
	public $item = "";
	
	public $params = array("template"=>"index");
	
	
	function __construct() {
	
	        if (!isset($_SESSION['mak']))
			{
				$_SESSION['mak'] = array();
			}
		$this->over = $this->getPage ();
	
	}
	
	function getPage() {
		$out = '';
		
		
		$catId = isset ( $_GET ['catid'] ) ? (int)$_GET ['catid'] : '0'; // Категория
		$idItem = isset ( $_GET ['portfolio'] ) ? (int)$_GET ['portfolio'] : '0'; // Индефикатор товара
		$descCatSql = mysql_query ( "select * from `shop_cat` where id='$catId'" );
	if (mysql_num_rows ( $descCatSql ) > 0) {
			$descCat = mysql_fetch_array ( $descCatSql );
			if (! empty ( $descCat ['desc'] )) {
				//$out .= "<div class=\"shopblock\">$descCat[desc]</div>";
			}
		}
		if ($catId != 0 && ! empty ( $catId ) && is_numeric ( $catId )) {
			switch ($catId) {
				case is_numeric ( $catId ) && ! empty ( $catId ) :
					$this->catid = $catId;
					$out .= $this->getItemsFromCategories ( $catId );
					
					break;
				default :
					$out .= $this->getItemsFromCategories ( 'all' );
					break;
			}
			
		} elseif ($idItem != 0 && ! empty ( $idItem ) && is_numeric ( $idItem )) {
		
			
		
			$out .= $this->getDescItem ( $idItem );
		} elseif (isset ( $_GET ['portfolio'] ) && $_GET ['portfolio'] == "sale") {
			$out .= $this->getItemsFromCategories ( 'sale' );
		} else {
			$out .= $this->getItemsFromCategories ( 'all' );
		}
		
		
		
		$this->road ();
		return $out;
	}
	
	function get_name_cat($id) {
		$sql = mysql_query ( "select * from shop_cat where id='$id'" );
		$row = mysql_fetch_array ( $sql );
		return $row ['name'];
	}
	function valute() {
		$row = mysql_fetch_array ( mysql_query ( "select * from settings_shop where param='valute'" ) );
		$val = $row ['value'];
		if ($val == 0) {
			return 'руб.';
		} elseif ($val == 1) {
			return "$";
		} else {
			return "€";
		}
	}
	
	function getParentCat($id) {
		$d = "";
		$sql = mysql_query ( "select * from `shop_cat` where `id`='$id'" );
		$row = mysql_fetch_array ( $sql );
		if ($row ['parentId'] != 0) {
			$sql = mysql_query ( "select * from `shop_cat` where `id`='$row[parentId]'" );
			if (mysql_num_rows ( $sql ) > 0) {
				$row = mysql_fetch_array ( $sql );
				if ($row ['parentId'] != "0") {
					$d .= $this->getParentCat ( $row ['id'] );
				}
				$d .= " <a href='?portfolio&catid=$row[id]'>$row[name]</a> / ";
				return $d;
			}
		}
		return "";
	}
	function getByCat($cat)
	{
		$results = mysql_query("(SELECT * FROM `shop_items` WHERE `cat_id` not in (0,$cat) group by `cat_id` order by `cat_id`) UNION (SELECT * FROM `shop_items` WHERE `cat_id` not in (0,$cat)  order by RAND()) limit 8");
		$out="";
	$i = 0;
		$open = 0;
		$t=0;
		$num = mysql_num_rows($results);
		while ( $row = mysql_fetch_array ( $results ) ) {
			$i ++;
			$t++;
			if ($i==1)
			{
				$out.='<table  border="0" align="center" cellpadding="0" cellspacing="0">';
				$out.="<tr>";
				$open=1;
			}
			$out .= '<td width="200"  height="150" align="left" valign="top" bgcolor="D67C61" >'.$this->getCatItem ( $row )."</td>";
			if ($i!=3)
			{
				$out.=' <td width="10" align="left" valign="top"  >&nbsp;</td>';
			}
			if ($i!=3 && $t==$num)
			{
			$out .= '<td width="200"  align="left" valign="top" bgcolor="D67C61" >&nbsp;</td>';
			}
			if ($i==3 or $i!=3 && $t==$num)
			{
				$out.="</tr>";
				$out.="</table><br/>";
				$open=0;
					$i = 0;
			}
			
			
		}
		if ($open == 1)
		{
			$out.="</tr></table><br/>";
		}
		
		return ' <table width="690" border="0" cellspacing="0" cellpadding="0" class="main">
        <tr>
          <td width="12" height="12" class="tl">&nbsp;</td>
          <td class="top">&nbsp;</td>
          <td width="12" class="tr">&nbsp;</td>
        </tr>
        <tr>
          <td class="left">&nbsp;</td>
          <td class="cent"><p><strong>Макеты других категорий</strong></p>
           '.$out.'
          </td>
          <td class="right">&nbsp;</td>
        </tr>
        <tr>
          <td height="12" class="bl">&nbsp;</td>
          <td class="bottom">&nbsp;</td>
          <td class="br">&nbsp;</td>
        </tr>
       
      </table>';
	}
	function road() {
		
		$NameOfCat = $this->get_name_cat($this->catid);
		
		if ($this->catid != 0) {
			$thcat = "{$this->getParentCat($this->catid)}  <a href='?portfolio&catid=$this->catid'>{$NameOfCat}</a> ";
		} else {
			$thcat = "";
		}
		if ($this->item != "") {
			
			$this->item = " / " . $this->item . "";
		}
		$_SESSION ['Road'] = "<a href='?portfolio'>Портфолио</a> / $thcat " . $this->item;
		$_SESSION ['Titles']['title'] .= " / Портфолио / ".strip_tags(" $thcat " . $this->item);
		return "  $thcat  " . $this->item;
	}
	
	/**
	 * @param $id Индефикатор Товара
	 * @return Возвращает товар
	 */
	function getDescItem($id) {
		$sql = mysql_query ( "select * from `shop_items` where `id`='$id' " );
		if (mysql_num_rows ( $sql ) == 0) {return "Товара не существует";}
		$row = mysql_fetch_array($sql);
	if (!in_array($id, $_SESSION['mak']))
			{
				
			 $_SESSION['mak'][] = $id;
			}
		$glHeight = "430";
		$oldPrice="";
		if (!empty($row['price_rozn']) && $row['price_opt'] != 0){
			$oldPrice = '<p><s>'.$row['price_opt'].' руб.</s></p>';
		}
		if (!empty($row['photo']) && file_exists("files/shop/".$row['photo']))
		{
			//$row['photo'] = str_replace("s_", "b_", $row['photo']);
			
			$ddr = $_SERVER['DOCUMENT_ROOT']."/files/shop/$row[photo]";
			$size = getimagesize($ddr);
			$sd = "";
			if ($size[1]>=440)
			{
				$sd="height='440'";
			}
			else  
			{
				$sd = "height='$size[1]'";
			}
			$glHeight = $size[1];
			$ism =str_replace("s_", "b_", $row['photo']);
			$bigImage ="<a href=\"files/shop/$ism\" class=\"highslide\" onclick=\"return hs.expand(this)\" rel=\"gallery\"><img src=\"files/shop/$row[photo]\" width=\"200\" height=\"150\" border=\"0\" style='cursor:pointer;'></a>";
		}
		
		$images = '<table  align=center border="0" cellpadding="0" cellspacing="8">
		';
		
		$ImagesSql = mysql_query ( "select * from `shop_images` where `iditem`='$row[id]'" );
		$i = 0;
		$num = mysql_num_rows ( $ImagesSql );
		
		$b = 0;
		while ( $img = mysql_fetch_array ( $ImagesSql ) ) {
			
			if (file_exists ( "files/shop/s_$img[id].$img[photo]" )) {
				$i ++;
				$b ++;
				if ($i==1)
				{
					$images.="<tr height='75'>";
				}
				$ddr = $_SERVER['DOCUMENT_ROOT']."/files/shop/b_$img[id].$img[photo]";
			$size = getimagesize($ddr);
				if (! isset ( $bigImage ) or isset($bigImage) && empty($bigImage)) {
					if (file_exists ( "files/shop/b_$img[id].$img[photo]" )) {
						$bigImage = "<a href=\"files/shop/b_$img[id].$img[photo]\" class=\"highslide\" onclick=\"return hs.expand(this)\" rel=\"gallery\"><img src=\"files/shop/s_$img[id].$img[photo]\" width=\"200\" height=\"150\" border=\"0\" style='cursor:pointer;'></a>";
					    $glHeight=$size[1];
					    
					}
				}
				$images .= '<td width="110" height="75" ><a href="files/shop/b_'.$img['id'].'.'.$img['photo'].'" class="highslide" onclick="return hs.expand(this)" rel="gallery"><img src="files/shop/s_' . $img ['id'] . '.' . $img ['photo'] . '" style="cursor:pointer;" width="100" height="75" border="0"  alt=""/></a></td>';
				if ($i == 6) {
					$images .= '</tr>';
					$i = 0;
				} 
			}
		
		}
	$images.='</table>
	 ';
		
		if (!isset($bigImage) or isset($bigImage) && empty($bigImage))
		{
			$bigImage="&nbsp;";
		}
		$this->item = $row ['name'];
		$this->catid = $row ['cat_id'];
	$out='
	
	<p>
  <strong><noindex>Цена на изготовление архитектурного макета зависит от его размера (площади 
  обрабатываемой поверхности), категории сложности (отделка фасада, кровли, детализации 
  архитектурными элементами), предназначение макета (выставочный ли это или рабочий 
  макет).</noindex></strong></p>
	<table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr> 
    <td width="50%" align="left" valign="top"> <center><table width="205" align=center border="0" cellpadding="0" cellspacing="4">

        <tbody align=center valign=center>
          <tr align="center" bgcolor="D4D0C8"> 
            <td width="204">'.$bigImage.'</td>
          </tr>
      </table></center></td>
    <td width="50%" valign="top" style="vertical-align:top;"> <p class="text"><b><font color="D67C61">'.$row['name'].'</font></b></p>
      <p class="text">'.$row['fulldesc'].'</p>

      <p class="text"> размер подмакетника: '.$row['art'].'<br />
        материал:'.$row['shortdesc'].'<br />
        М '.$row['price_opt'].' </p></td>
  </tr>
  <tr> 
    <td colspan="2" align="left" valign="top">
    <p>'.$images.'&nbsp;</p>
      </td>
  </tr>
  <tr> 
    <td height="40" colspan="2" align="left" valign="top">&nbsp;</td>
  </tr>
  
</table>
	';
		
         		return $out;
	}
	
	function getCatItem($row) {
		$out = "";
		$oldPrice = "";
		if (! empty ( $row ['price_rozn'] ) && $row ['price_opt'] != 0) {
			$oldPrice = '<p><s>' . number_format ( $row ['price_opt'], "", 0, "" ) . ' руб.</s></p>';
		}
		
		$out=' <a href="?portfolio='.$row['id'].'"  target="_self"><img border="0" src="'.$this->getItemImage($row).'" width="200" height="150" title="'.htmlspecialchars($row['name']).'" alt="'.htmlspecialchars($row['name']).'"/></a><br>
		 <a href="?portfolio='.$row['id'].'"  target="_self" style="font-size:9px;color:grey">'.$row['name'].'</a>
		  ';
		return $out;
	}
	
	function getItemsFromCategories($id = "all", $orderBy = "order by `name` asc") {
		if (isset ( $_GET ['sort'] )) {
			if ($_GET ['sort'] == 'alf') {
				$_SESSION ['shop_sort'] = 'name';
			} elseif ($_GET ['sort'] == 'price')
				$_SESSION ['shop_sort'] = 'price';
		}
		
		$per_page = 9;
		
		if (isset ( $_GET ['limit'] )) {
			switch ($_GET ['limit']) {
				case "10" :
					$_SESSION ['shop_limit'] = 9;
					break;
				case "20" :
					$_SESSION ['shop_limit'] = 20;
					break;
				case "all" :
					$_SESSION ['shop_limit'] = "all";
					break;
				default :
					$_SESSION ['shop_limit'] = 9;
					break;
			}
		}
		
		if (isset ( $_SESSION ['shop_limit'] )) {
			$per_page = $_SESSION ['shop_limit'];
		}
		
		if (isset ( $_GET ['page'] )) {
			$page = $_GET ['page'] - 1;
		} else {
			$page = 0;
		}
		$start = abs ( $per_page * $page );
		
		if (isset ( $_SESSION ['shop_sort'] )) {
			switch ($_SESSION ['shop_sort']) {
				case "name" :
					$orderBy = "order by `name` asc";
					break;
				case "price" :
					$orderBy = "order by `price_rozn` asc";
					break;
			}
		}
		$orderBy = "order by `pos`";
		$sql = "";
		if ($id != 'all' && $id != 'sale') {
			$testCategory = mysql_query ( "select * from `shop_cat` where `id`='$id'" );
			if (mysql_num_rows ( $testCategory ) == 0) {
				return "Категории не существует";
			}
		}
		if ($per_page == "all") {
			$limitSql = "";
		} else {
			$limitSql = "limit $start,$per_page";
		}
		switch ($id) {
			case 'all' :
				$sql = "select * from `shop_items` where `cat_id`!='0' $orderBy ";
				$sql_count = "select * from `shop_items` where `cat_id`!='0'";
				break;
			case 'sale' :
				$sql = "select * from `shop_items` where `cat_id`!='0' and `onsells`='1' $orderBy";
				$sql_count = "select * from `shop_items` where `cat_id`!='0' and `onsells`='1'";
				break;
			default :
				
				$categorys = $this->testCategory ( $id );
				if ($categorys == 0) {
					$sql = "select * from `shop_items` where `cat_id`='$id'  and `cat_id`!='0' $orderBy ";
					$sql_count = "select * from `shop_items` where `cat_id`='$id' and `cat_id`!='0'";
				} else {
					$sql = "select * from `shop_items` where `cat_id` IN ($categorys)  and `cat_id`!='0' $orderBy ";
					$sql_count = "select * from `shop_items` where `cat_id` IN ($categorys) and `cat_id`!='0'";
				}
				break;
		
		}
		
		$results = mysql_query ( $sql );
		if (mysql_num_rows ( $results ) == 0) {
			return "Нет ни одной записи";
		}
		$numColumns = 2;
		$i = 0;
		
		if (isset ( $_GET ['catid'] )) {
			$cat = "&catid=$_GET[catid]";
		} else {
			$cat = "";
		}
		if (isset ( $_GET ['page'] )) {
			$page = "&page=$_GET[page]";
		} else {
			$page = "";
		}
		if (isset ( $_GET ['limit'] )) {
			$limit = "&limit=$_GET[limit]";
		} else {
			$limit = "";
		}
		if (isset ( $_GET ['catalog'] ) && $_GET ['catalog'] == 'sale') {
			$shop = "?portfolio=sale";
		} else {
			$shop = "?portfolio";
		}
	
		$start = 1;
		$pages = "Страница: ";
		if ($per_page != "all") {
			$count = mysql_query ( $sql_count );
			
			$num_pages = ceil ( mysql_num_rows ( $count ) / $per_page );
			
			
				if (isset ( $_GET ['page'] )) {
					$st = $_GET ['page'];
				} else {
					$st = 1;
				}
				for($i = 1; $i <= $num_pages; $i ++) {
					if ($st == $i) {
						$pages .= "<span>$i</span> &nbsp; ";
					} else {
						$pages .= "<a href='{$shop}{$cat}&page=$i'>$i</a> &nbsp; ";
					}
					if ($i != $num_pages) {
						$pages .= "| &nbsp;";
					}
				}
			}
		
		
		if ($per_page == "all") {
			$pagesDis = "";
		} else {
			$pagesDis ="";// '<li><strong>страница:</strong> &nbsp;' . $pages . '</li>';
		}
		
		$out = '<ul class="option_s">
              
              <li><strong>выводить по:</strong>&nbsp; ' . $limit . '</li>

              ' . $pagesDis . '

              <li class="search">
                <form method="post" action="/search/">
                  <input id="SearchForm" value="поиск по сайту" name="search" class="s_form1" type="text">
                  <br>
                  <input value="найти" style="display: none;" name="submit" type="submit">
                </form>
              </li>
            </ul><p>&nbsp;</p>

';
		$out="";
		if (isset ( $_GET ['page'] )) {
			$lastpage = '&page=' . $_GET ['page'];
		} else {
			$lastpage = '';
		}
		$_SESSION ['lastpage'] = "?shop{$cat}{$lastpage}";
	//	$out .= '<table border="0" cellspacing="0" cellpadding="0" align="center">';
		$i = 0;
		$open = 0;
		$t=0;
		$num = mysql_num_rows($results);
		while ( $row = mysql_fetch_array ( $results ) ) {
			$i ++;
			$t++;
			if ($i==1)
			{
				$out.='<table  border="0" align="center" cellpadding="0" cellspacing="0">';
				$out.="<tr>";
				$open=1;
			}
			$out .= '<td width="200"  height="150" align="left" valign="top" bgcolor="D67C61" >'.$this->getCatItem ( $row )."</td>";
			if ($i!=3)
			{
				$out.=' <td width="10" align="left" valign="top"  >&nbsp;</td>';
			}
			if ($i!=3 && $t==$num)
			{
			$out .= '<td width="200"  align="left" valign="top" bgcolor="D67C61" >&nbsp;</td>';
			}
			if ($i==3 or $i!=3 && $t==$num)
			{
				$out.="</tr>";
				$out.="</table><br/>";
				$open=0;
					$i = 0;
			}
			
			
		}
		if ($open == 1)
		{
			$out.="</tr></table><br/>";
		}
	//	$out.="</table>";
		return $out;
	}
	function getItemImage($row) {
		if (! empty ( $row ['photo'] ) && file_exists ( "files/shop/$row[photo]" )) {
			return "files/shop/$row[photo]";
		} else {
			$sql = mysql_query ( "select * from `shop_images` where `iditem`='$row[id]'" );
			if (mysql_num_rows ( $sql ) > 0) {
				while ( $row2 = mysql_fetch_array ( $sql ) ) {
					if (file_exists ( "files/shop/s_$row2[id].$row2[photo]" )) {
						return "files/shop/s_$row2[id].$row2[photo]";
					}
				}
			}
		}
		return "images/zaglushka.gif";
	}
	function testCategory($id) {
		if (! empty ( $id ) && is_numeric ( $id )) {
			$sql = mysql_query ( "select * from `shop_cat` where `parentId`='$id'" ) or die ( mysql_error () );
			$out = "$id";
			$i = 0;
			if (mysql_num_rows ( $sql ) > 0) {
				while ( $row = mysql_fetch_array ( $sql ) ) {
					$out .= ",$row[id]";
					$test = mysql_query ( "select * from `shop_cat` where `parentId`='$row[id]'" );
					if (mysql_num_rows ( $test ) > 0) {
						$out .= $this->testCategory ( $row ['id'] );
					}
				}
				return $out;
			} else {
				return 0;
			}
		
		}
	}
	function pages($onpage = 10) {
	
	}

}
?>
