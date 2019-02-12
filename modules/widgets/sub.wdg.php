<?php
class sub {
	var $over = "";
	var $cats = array ();
	function __construct() {
		if (class_exists ( 'pages' )) {
		/*	
			if (($out = $this->getChilds ()) == false && $this->galleryExists ( pages::$PageRow ['gallery'] ) != false && ($gal = $this->getItemImage ( pages::$PageRow ['gallery'] )) != false) {
				
				$image = "<p><center><a href='?gallery'><img src='files/gallery/{$gal['min']}' width='180' border='0'/></a></center></p>";
				$this->over = '<div class="text_content_menu">
              <div class="text_content_menu_patch">&nbsp;</div>
              <div class="text_content_ribbon"><img src="template/default/images/ribbon.png" /></div>
              <div class="text_content_menu_main">
                 ' . $image . '
                <div class="text_content_search">
                  <form name="SearchForm" method="get" action="/pages.html">
                  <div class="text_content_search_input">
                    <input type="text" name="search" value="Поиск" onclick="this.value=\'\'" />
                  </div>
                  <a href="#" onclick="SearchForm.submit(); return false;"><img src="template/default/images/text_menu_search.png" align="left" /></a>
                  </form>
                </div>
                
              </div>
            </div>';
			} 

			else*/if (($out = $this->getChilds ())) {
				/*if (($gal = $this->getItemImage ( pages::$PageRow ['gallery'] )) != false) {
					$image = "<p><center><a href='?gallery'><img src='files/gallery/{$gal['min']}' width='180' border='0'/></a></center></p>";
				}
				else {
					$image = "";
				}
				*/
				$this->over = '<div class="text_content_menu">
              <div class="text_content_menu_patch">&nbsp;</div>
              <div class="text_content_ribbon"><img src="template/default/images/ribbon.png" /></div>
              <div class="text_content_menu_main">
                <ul>
                 ' . $out . '
                </ul>
              
                <div class="text_content_search">
                  <form name="SearchForm" method="get" action="/pages.html">
                  <div class="text_content_search_input">
                    <input type="text" name="search" value="Поиск" onclick="this.value=\'\'" />
                  </div>
                  <a href="#" onclick="SearchForm.submit(); return false;"><img src="template/default/images/text_menu_search.png" align="left" /></a>
                  </form>
                </div>
              </div>
            </div>';
			} else {
				$this->over = '<style>.text_content_main {width:98% !important;padding-left:10px;}
				.jScrollPaneContainer{
			  background:none!important;
		    }
		    .jScrollPaneContainer2{
		    background:url(/template/default/themes/lozenge/image/track_bot.png) 851px 447px no-repeat !important;
		    }
				</style>';
			}
		} else {
			$this->over = '<style>.text_content_main {width:98% !important;padding-left:10px;}
			
			.jScrollPaneContainer{
			  background:none !important;
		    }
		    .jScrollPaneContainer2{
		    background:url(/template/default/themes/lozenge/image/track_bot.png) 881px 447px no-repeat !important;
		    }
			</style>';
		}
	
	}
	function getItemImage($id) {
		$sql = mysql_query ( "select * from `gallery_img` where `iditem`='$id' order by rand() limit 1" );
		if (is_resource ( $sql ) && mysql_num_rows ( $sql ) > 0) {
			$row = mysql_fetch_array ( $sql, MYSQL_ASSOC );
			
			return array ("min" => "s_{$row['id']}.{$row['ext']}", "big" => "b_{$row['id']}.{$row['ext']}", "orig" => "o_{$row['id']}.{$row['ext']}" );
		}
		return false;
	}
	function galleryExists($id) {
		$sql = mysql_query ( "select count(*) from `gallery` where `id`='{$id}'" );
		if (is_resource ( $sql ) && mysql_result ( $sql, 0 ) > 0) {
			return true;
		}
		return false;
	}
	function getparent($id) {
		$sql = mysql_query ( "Select `parentId` from `pages` where `Id`='{$id}' limit 1" );
		if (is_resource ( $sql ) && mysql_num_rows ( $sql ) > 0) {
			$row = mysql_fetch_assoc ( $sql );
			if ($row ['parentId'] != 0) {
				return $row ['parentId'];
			}
		}
		return false;
	}
	function getIdsCat($id = 0) {
		if ($id == 0) {
			return true;
		}
		$this->cats [] = $id;
		$sql = mysql_query ( "select `parentId` from `pages` where `Id`='{$id}' limit 1" );
		if (is_resource ( $sql ) && mysql_num_rows ( $sql ) > 0) {
			$row = mysql_fetch_assoc ( $sql );
			$this->getIdsCat ( $row ['parentId'] );
		}
	}
	function has($id) {
		$sql = mysql_query ( "select count(*) from `pages` where `parentId`='{$id}'" );
		if (is_resource ( $sql ) && ($count = mysql_result ( $sql, 0 )) > 0) {
			return true;
		}
		return false;
	}
	function getParentChilds() {
		
		foreach ( $this->cats as $id ) {
			
			if ($this->has ( $id ) == true) {
				return mysql_query ( "select `Id`, `Title` from `pages` where `parentId`='{$id}'" );
			}
		}
		
		return false;
	}
	function getChilds() {
		$this->getIdsCat ( pages::$PageRow ['Id'] );
		
		/*$sql = mysql_query ( "select `Id`, `Title` from `pages` where `parentId`='" . pages::$PageRow ['Id'] . "'" );
		if (is_resource ( $sql ) && mysql_num_rows ( $sql ) == 0 && pages::$PageLevel>=1 or ! is_resource ( $sql ) && pages::$PageLevel>=1) {
		    $sql = mysql_query ( "select `Id`, `Title` from `pages` where `parentId`='" . $this->getparent(pages::$PageRow ['Id']) . "'" );
		}
		*/
		$sql = $this->getParentChilds ();
		$out = "";
		if (is_resource ( $sql ) && mysql_num_rows ( $sql ) > 0) {
			while ( ($row = mysql_fetch_assoc ( $sql )) != false ) {
				$cls = "";
				if (pages::$PageRow ['Id'] == $row ['Id']) {
					$cls = " class=\"here\"";
				}
				$out .= "<li><a href='?pages={$row['Id']}'{$cls}>{$row['Title']}</a></li>";
			}
			return $out;
		}
		
		return false;
	
	}
}