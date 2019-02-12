<?

/**
 * Модуль Pages 1.2
 *
 */
class pages extends glb
{

    public $over = "";

    var $link = "";

    var $name = "";

    var $title = "";

    static $PageRow = null;

    static $PageLevel = 0;

    var $nowCat = array();

    var $params = array(
        "template" => "index"
    );

    var $road = array();

    var $roadTitle = array();

    function __construct()
    {
        $this->over = self::get_page();
    }

    function getParent1($id)
    {
        if ($id == 0) {
            return true;
        }
        $this->nowCat[] = $id;
        $sql = mysql_query("select `parentId` from `price_cat` where `id`='{$id}' limit 1");
        if (is_resource($sql) && mysql_num_rows($sql) > 0) {
            $row = mysql_fetch_assoc($sql);
            return $this->getParent1($row['parentId']);
        }
        return false;
    }

    function getRoad($id)
    {
        if ($id == 0) {
            return '';
        }
        $d = '';
        $sql = mysql_query("select `Id`, `parentId`, `Title` from `pages` where `Id`='$id'");
        $row = mysql_fetch_array($sql);
        if ($row['parentId'] != 0) {
            $this->getRoad($row['parentId']);
        }
        Breadcrumbs::add("<a href='?pages=$row[Id]'>$row[Title]</a>");
        BreadcrumbsTitle::add("$row[Title]");
        return $d;
    }

    function getPageLevel($id)
    {
        if ($id == 0) {
            return true;
        }
        self::$PageLevel ++;
        $sql = mysql_query("select `parentId` from `pages` where `Id`='{$id}' limit 1");
        if (is_resource($sql) && mysql_num_rows($sql) > 0) {
            $row = mysql_fetch_assoc($sql);
            return self::getPageLevel($row['parentId']);
        }
    }

    private function get_page()
    {
        $out = '';
        if (isset($_GET['isIndex'])) {
            $sql = $this->query("SELECT * FROM `pages` where `OnIndex`='1' limit 1");
            $row = mysql_fetch_array($sql);
            $this->params['template'] = "main";
        } else {
            if (isset($_GET['pages'])) {
                $id = $_GET['pages'];
            } else {
                $id = 0;
            }
            
            $sql = $this->query("SELECT * FROM `pages` where `Id`='$id' limit 1");
            $row = mysql_fetch_array($sql);
            
            $this->title = $row['Title'];
        }
        
        if (mysql_num_rows($sql) == 0) {
            header("HTTP/1.x 404 Not Found");
            return "Страница не найдена";
        } elseif (isset($row['Active']) && $row['Active'] == 2) {
            header("HTTP/1.x 404 Not Found");
            return "Страница не активна";
        } else {
            $this->getRoad($row['Id']);
            if (! empty($row['Title_Page'])) {
                BreadcrumbsTitle::set($row['Title_Page']);
            } else {
                BreadcrumbsTitle::set($row['Title']);
            }
            if (! empty($row['Desc_Page'])) {
                $_SESSION['Titles']['desc'] = $row['Desc_Page'];
            }
            if (! empty($row['Keys_Page'])) {
                $_SESSION['Titles']['keys'] = $row['Keys_Page'];
            }
            if ($row['isService'] == 1) {
                $this->params['template'] = 'usluga';
            }
            $arts = array();
            if (! empty($row['arts'])) {
                $exp = explode(",", $row['arts']);
                if (count($exp) > 0) {
                    foreach ($exp as $str) {
                        $str = trim($str);
                        if (! empty($str)) {
                            $arts[] = "'" . mysql_real_escape_string($str) . "'";
                        }
                    }
                }
            }
            
            if (count($arts) > 0) {
                $sql = mysql_query("select * from `shop_items` where `art` in (" . implode(", ", $arts) . ") and `cat_id`!='0'");
                if (is_resource($sql) && mysql_num_rows($sql) > 0) {
                    $out .= '<div class="block678">
<ul class="jcarousel-skin-tango2" id="list152">';
                    while (($row2 = mysql_fetch_assoc($sql)) != false) {
                        $price = number_format($row2['price_rozn'], 0, ' ', ' ');
                        $newPrice = $row2['price_opt'];
                        if ($newPrice > 0) {
                            // $prices = '<span class="pr1">' . $price . '</span><span class="pr2"> ' . number_format ( $row2 ['price_opt'], 0, ' ', ' ' ) . ' <span>руб.</span></span>';
                            $row2['price_rozn'] = number_format($row2['price_opt'], 0, ' ', ' ');
                        }
                        
                        $image = $this->getItemImageShop($row2, 1);
                        $idImage = 0;
                        $min = '';
                        if ($image != false) {
                            $idImage = (int) @$image['id'];
                            $min = $image['min'];
                            $image = '<a href="?shop=' . $row2['id'] . '"><img src="/thumbs/136x179/' . str_replace("files/shop/", "", $image['big']) . '" alt=""></a>';
                        } else {
                            $image = '';
                        }
                        $out .= '<li>' . $image . '
<h6><a href="?shop=' . $row2['id'] . '">' . $row2['name'] . '</a></h6>
<p>Цена: <span><b>' . $row2['price_rozn'] . '</b> руб.</span></p>
</li>';
                    }
                    $out .= '</ul></div>';
                }
            }
            
            self::getPageLevel($row['Id']);
            self::$PageRow = $row;
            $design = mysql_fetch_array(mysql_query("select * from `modules_option` where `option`='Design' and `module`='pages'"));
            $design = $design['value'];
            
            $replaces = array(
                "/{title}/is" => $row['Title'],
                "/{id}/is" => $row['Id'],
                "/{text}/is" => $row['Text']
            );
            $this->title = $row['Title'];
            
            return $out . $this->_replace($replaces, $design) . $this->getImages($row['gallery']);
        }
    }

    function replace($text)
    {
        $text = explode("<BBB>", $text);
        $i = 0;
        $total = count($text);
        $road = array();
        foreach ($text as $s) {
            $i ++;
            if ($i == $total) {
                $s = strip_tags($s);
            }
            $road[] = $s;
        }
        return implode(" / ", $road);
    }

    function getItemImageShop($row, $mass = 0)
    {
        if (! empty($row['photo']) && file_exists("files/shop/$row[photo]")) {
            if ($mass == 0) {
                return "files/shop/$row[photo]";
            } else {
                return array(
                    "min" => "files/shop/$row[photo]",
                    "big" => "files/shop/" . str_replace("s", "b", $row['photo'])
                );
            }
        } else {
            $sql = mysql_query("select * from `shop_images` where `iditem`='$row[id]'");
            if (mysql_num_rows($sql) > 0) {
                while ($row2 = mysql_fetch_array($sql)) {
                    if (file_exists("files/shop/s_$row2[id].$row2[photo]")) {
                        if ($mass == 0) {
                            return "files/shop/s_$row2[id].$row2[photo]";
                        } else {
                            return array(
                                "id" => $row2['id'],
                                "min" => "files/shop/s_$row2[id].$row2[photo]",
                                "big" => "files/shop/b_$row2[id].$row2[photo]"
                            );
                        }
                    }
                }
            }
        }
        return false;
    }

    function nameGallery($id)
    {
        // $sql = mysql_query("select `name` from `gallery` where `id`='$id'");
        // if (is_resource($sql) && mysql_num_rows($sql)>0){
        // $row = mysql_fetch_assoc($sql);
        return "<h3 style='color: #000000;font: bold 22px Arial; margin: 0;padding-bottom: 20px;'>Фотогалерея</h3>";
        // }
        return '';
    }

    function getImages($id)
    {
        $out = "";
        $sql = mysql_query("select * from `gallery_img` where `iditem`='{$id}' order by rand() limit 3");
        if (is_resource($sql) && ($num = mysql_num_rows($sql)) > 0) {
            $out .= $this->nameGallery($id) . '<center><table>';
            $i = 0;
            $v = 0;
            while (($row = mysql_fetch_assoc($sql)) != false) {
                $i ++;
                $v ++;
                $class = "";
                if ($i == 1) {
                    $out .= "<tr>";
                }
                $image = array(
                    "min" => "s_{$row['id']}.{$row['ext']}",
                    "orig" => "o_{$row['id']}.{$row['ext']}"
                );
                
                $out .= '<td width="150"><a href="files/gallery/' . $image['orig'] . '" class="highslide" onclick="return hs.expand(this, {slideshowGroup: \'gallery\',
align: \'center\',
	
	
	
	dimmingOpacity: 0,
transitions: [\'expand\', \'crossfade\'],
	
	
	marginLeft: 100,
	marginBottom: 200,
    height:750,
    width:750})">
					<img border="0" class="img_gall" src="files/gallery/' . $image['min'] . '" width="150" />
					</a>
					</td>';
                if ($i < 4) {
                    $out .= '<td width="30">&nbsp;</td>';
                }
                
                if ($i == 4 or $v == $num) {
                    $i = 0;
                    $out .= "</tr>";
                    if ($v != $num) {
                        $out .= "<tr><td colspan='10' height='25'>&nbsp;</td></tr>";
                    }
                }
            }
            $out .= '</table></center><p align="right" ><a href="/gallery.html#gal' . $id . '" style="color: #0081B9;display: inline-block;font-size: 14px;">еще фотографии</a></p>';
        }
        return $out;
    }
}

/**
 * Класс административной части модуля PAGES
 */
class pages_admin extends admin
{

    var $Version = "1.2";

    var $Pos = 0;

    var $ModuleName = "Основные разделы";

    var $PathModule = "Разделы сайта";

    var $ModuleID = "pages";

    var $PathPos = "0";

    var $File = "pages.js";

    var $Global = 1;

    var $Icon = "pages";

    function UpdateImagePos()
    {
        $id = isset($_POST['id']) ? (int) $_POST['id'] : 0;
        $pos = isset($_POST['pos']) ? (int) $_POST['pos'] : 0;
        mysql_query("update `pages_img` set `pos`='{$pos}', `itog`='" . (int) $_POST['itog'] . "' where `id`='{$id}' limit 1");
        echo "33";
    }

    function ResizeImage($image_from, $image_to, $fitwidth = 450, $fitheight = 450, $quality = 100)
    {
        global $php_inc;
        
        $os = $originalsize = getimagesize($image_from);
        
        if ($originalsize[2] != 2 && $originalsize[2] != 3 && $originalsize[2] != 1 && $originalsize[2] != 6 && ($originalsize[2] < 9 or $originalsize[2] > 12)) {
            return false;
        }
        
        if ($originalsize[0] > $fitwidth or $originalsize[1] > $fitheight) {
            $h = getimagesize($image_from);
            if (($h[0] / $fitwidth) > ($h[1] / $fitheight)) {
                $fitheight = $h[1] * $fitwidth / $h[0];
            } else {
                $fitwidth = $h[0] * $fitheight / $h[1];
            }
            
            if ($os[2] == 1) {
                $i = @imagecreatefromgif($image_from);
                if (! $i) {
                    return false;
                }
                $o = ImageCreateTrueColor($fitwidth, $fitheight);
                
                $trans_color = imagecolortransparent($i);
                $trans_index = imagecolorallocate($i, $trans_color['red'], $trans_color['green'], $trans_color['blue']);
                imagecolortransparent($i, $trans_index);
                
                imagesavealpha($i, true);
                imagesavealpha($o, true);
                imagecopyresampled($o, $i, 0, 0, 0, 0, $fitwidth, $fitheight, $h[0], $h[1]);
                imagegif($o, $image_to);
                chmod($image_to, 0777);
                imagedestroy($o);
                imagedestroy($i);
            } 

            elseif ($os[2] == 2 or ($os[2] >= 9 && $os[2] <= 12)) {
                $i = @ImageCreateFromJPEG($image_from);
                if (! $i) {
                    return false;
                }
                $o = ImageCreateTrueColor($fitwidth, $fitheight);
                imagecopyresampled($o, $i, 0, 0, 0, 0, $fitwidth, $fitheight, $h[0], $h[1]);
                imagejpeg($o, $image_to, $quality);
                chmod($image_to, 0777);
                imagedestroy($o);
                imagedestroy($i);
            } elseif ($os[2] == 3) {
                $i = @ImageCreateFromPng($image_from);
                if (! $i) {
                    return false;
                }
                $o = ImageCreateTrueColor($fitwidth, $fitheight);
                imagesavealpha($i, true);
                
                imagesavealpha($i, true);
                imagealphablending($o, false);
                
                imagesavealpha($o, true);
                imagecopyresampled($o, $i, 0, 0, 0, 0, $fitwidth, $fitheight, $h[0], $h[1]);
                
                imagesavealpha($o, true);
                imagepng($o, $image_to);
                chmod($image_to, 0777);
                imagedestroy($o);
                imagedestroy($i);
            }
            
            return 2;
        }
        if ($originalsize[0] <= $fitwidth && $originalsize[1] <= $fitheight) {
            if ($os[2] == 1) {
                $i = @imagecreatefromgif($image_from);
                if (! $i) {
                    return false;
                }
                imagesavealpha($i, true);
                imagegif($i, $image_to);
            } elseif ($os[2] == 3) {
                $i = @ImageCreateFromPng($image_from);
                if (! $i) {
                    return false;
                }
                imagesavealpha($i, true);
                imagepng($i, $image_to);
            } else {
                $i = @ImageCreateFromJPEG($image_from);
                if (! $i) {
                    return false;
                }
                imagejpeg($i, $image_to, $quality);
            }
            imagedestroy($i);
            chmod($image_to, 0777);
            return 1;
        }
    }

    function UploadPhotoGallery()
    {
        if (isset($_POST['id']) && ! empty($_POST['id'])) {
            mysql_query("insert into `pages_img` values ('', '$_POST[id]','', '', '0', '0')");
            $id = mysql_insert_id();
            $uploaddir = $_SERVER['DOCUMENT_ROOT'] . "/files/pages/";
            $p = pathinfo(basename($_FILES['photo-path']['name']));
            if (isset($p['extension'])) {
                $ext = strtolower($p['extension']);
                
                if (in_array($ext, array(
                    "jpg",
                    "jpeg",
                    "png",
                    "gif"
                ))) {
                    $uploadfile1 = $uploaddir . "b_$id.$ext";
                    $uploadfile2 = $uploaddir . "s_$id.$ext";
                    $uploadfile3 = $uploaddir . "o_$id.$ext";
                    if (move_uploaded_file($_FILES['photo-path']['tmp_name'], $uploadfile3)) {
                        
                        $this->ResizeImage($uploadfile3, $uploadfile1, 720, 480);
                        if (copy($uploadfile1, $uploadfile2)) {
                            $this->ResizeImage($uploadfile2, $uploadfile2, 220, 162);
                        }
                        
                        mysql_query("update `pages_img` set `ext`='$ext' where `id`='$id' limit 1");
                    } else {
                        mysql_query("delete from `pages_img` where `id`='$id' limit 1");
                        echo "{failure:true}";
                        exit();
                    }
                } else {
                    mysql_query("delete from `pages_img` where `id`='$id' limit 1");
                    echo "{failure:true}";
                    exit();
                }
            } else {
                mysql_query("delete from `pages_img` where `id`='$id' limit 1");
                echo "{failure:true}";
                exit();
            }
        }
        echo "{success:true}";
    }

    function deleteImage()
    {
        $id = (int) $_POST['id'];
        $sql = mysql_query("select * from `pages_img` where `id`='$id' limit 1");
        $row = mysql_fetch_array($sql);
        $dir = $_SERVER['DOCUMENT_ROOT'] . "/files/pages/";
        $file = "s_{$row['id']}.{$row['ext']}";
        $file2 = "b_{$row['id']}.{$row['ext']}";
        if (file_exists($dir . $file)) {
            $dd = $dir . $file;
            @unlink($dd);
        }
        if (file_exists($dir . $file2)) {
            $dd = $dir . $file2;
            @unlink($dd);
        }
        $file3 = "o_{$row['id']}.{$row['ext']}";
        if (file_exists($dir . $file3)) {
            $dd = $dir . $file3;
            @unlink($dd);
        }
        mysql_query("delete from `pages_img` where `id`='$row[id]' limit 1");
        echo "33";
    }

    function setOsnImage()
    {
        $id = (int) $_POST['id'];
        $sql = mysql_query("select `id`,`iditem` from `pages_img` where `id`='$id' limit 1");
        $row = mysql_fetch_array($sql);
        mysql_query("update `pages_img` set `osn`='0' where `iditem`='$row[iditem]'");
        mysql_query("update `pages_img` set `osn`='1' where `id`='$row[id]'");
    }

    function Listing_Images()
    {
        $id = (int) $_POST['dd'];
        $_POST['start'] = isset($_POST['start']) ? (int) $_POST['start'] : 0;
        $_POST['limit'] = isset($_POST['limit']) ? (int) $_POST['limit'] : 25;
        $sql_count = "SELECT * FROM `pages_img` where `iditem`='$id'";
        $sql = $sql_count . " LIMIT " . (int) $_POST['start'] . ", " . (int) $_POST['limit'];
        $rs_count = mysql_query($sql_count) or die("kjdfsk");
        $rows = mysql_num_rows($rs_count);
        $rs = mysql_query($sql) or die("HELLO");
        $arr = array();
        $arr2 = array();
        if ($rows > 0) {
            while ($obj = mysql_fetch_array($rs)) {
                $arr2['id'] = $this->en($obj['id']);
                $arr2['image'] = "o_{$obj['id']}.{$obj['ext']}";
                $arr2['file'] = "o_{$obj['id']}.{$obj['ext']}";
                $arr2['osn'] = $obj['osn'];
                $arr2['pos'] = $obj['pos'];
                $arr2['itog'] = $obj['itog'];
                $arr[] = $arr2;
            }
            $jsonresult = $this->JEncode($arr);
            echo '({"total":"' . $rows . '","results":' . $jsonresult . '})';
        } else {
            echo '({"total":"0", "results":""})';
        }
    }

    function InstallModule()
    {
        $sql = mysql_query("select * from `modules` where `ModuleID`='{$this->ModuleID}'");
        $sql2 = mysql_query("select * from `modulesPath` where `Name`='{$this->PathModule}'");
        if (mysql_num_rows($sql2) == 0) {
            mysql_query("insert into `modulesPath` values ('', '{$this->PathModule}', '{$this->PathPos}')");
        }
        if (mysql_num_rows($sql) == 0) {
            mysql_query("insert into `modules` (`Name`, `ModulePath`, `ModuleID`, `Version`, `File`, `Active`, `isGlobal`, `Module_Icon`, `Pos`) value ('$this->ModuleName', '$this->PathModule', '{$this->ModuleID}', '$this->Version', '{$this->File}', '1', '{$this->Global}', '{$this->Icon}', '$this->Pos')");
        } else {
            $row = mysql_fetch_array($sql);
            if ($row['Version'] != $this->Version) {
                mysql_query("update `modules` set `Version`='$this->Version' where `Id`='$row[Id]'");
            }
        }
    }

    function DeleteModule()
    {
        mysql_query("delete from `modules` where `ModuleID`='{$this->ModuleID}'");
        $sql2 = mysql_query("select * from `modulesPath` where `Name`='{$this->PathModule}'");
        if (mysql_num_rows($sql2) == 0) {
            mysql_query("delete from `modulesPath` where `Name`='{$this->PathModule}'");
        }
    }

    function __construct()
    {
        if (! isset($_SESSION['admin'])) {
            exit('CheckLogin');
        }
    }

    function LoadSetting()
    {
        $sql = mysql_query("select * from modules_option where `option`='Design' and `module`='pages' limit 1");
        $design = mysql_fetch_array($sql);
        $a = array(
            "design" => $this->en($design['value'])
        );
        echo "{success:true, data:{$this->JEncode($a)}}";
    }

    function SaveSetting()
    {
        $design = addslashes($this->encode($_POST['design']));
        mysql_query("update `modules_option` set `value`='$design' where `option`='Design' and `module`='pages' limit 1") or die("{failure:true}");
        echo "{success:true}";
    }

    function listing_parents_auxpages($parentId, $br = "--")
    {
    
        global $arr;
        $orderBy = 'order by ';
        if (isset($_POST['sort'])) {
            switch ($_POST['sort']) {
                case "Id":
                case "id":
                    $orderBy .= "`Id`";
                    break;
                case "title":
                case "title2":
                    $orderBy .= "`Title`";
                    break;
                case "inMenu":
                    $orderBy .= " `inMenu`";
                    break;
                case "module":
                case "pos":
                    $orderBy .= "`module`";
                    break;
                case "active":
                    $orderBy .= "`Active`";
                    break;
                case "isService":
                    $orderBy .= "`isService`";
                    break;
                default:
                    $orderBy .= "`module`";
            }
        } else {
            $orderBy .= "`module`";
        }
        if (isset($_POST['dir'])) {
            $orderBy .= " {$_POST['dir']}";
        } else {
            $orderBy .= " asc";
        }
        
        $sql_count = "SELECT * FROM `pages` where `parentId`=$parentId {$orderBy}";
        $sql = $sql_count . " order by `module` desc LIMIT " . (int) $_POST['start'] . ", " . (int) $_POST['limit'];
        $rs_count = mysql_query($sql_count);
        $rows = mysql_num_rows($rs_count);
        $rs = mysql_query($sql);
        if ($rows > 0) {
            $dd = $br;
            while ($obj = mysql_fetch_array($rs_count)) {
                $br = $dd;
                $parentName = mysql_fetch_array(mysql_query("select `Title` from `pages` where `Id`='$obj[parentId]'  order by `parentId` ASC"));
                $parentName = $parentName['Title'];
                $arr2['id'] = $obj['Id'];
                $arr2['title'] = $this->en($obj['Title']);
                $arr2['title2'] = "$br" . $this->en($obj['Title']) . "";
                $arr2['parentId'] = $obj['parentId'];
                if ($obj['parentId'] == 0) {
                    $arr2['parentName'] = $this->en("Основной раздел");
                } else {
                    $arr2['parentName'] = $this->en($parentName);
                }
                $arr2['text'] = $this->en($obj['Text']);
                $arr2['textblock'] = $this->en($obj['textblock']);
                $arr2['desc'] = $this->en($obj['Desc_Page']);
                $arr2['secondTitle'] = $this->en($obj['secondTitle']);
                $arr2['url'] = $this->en($obj['url']);
                $arr2['arts'] = $this->en($obj['arts']);
                $arr2['copy'] = $this->en($obj['copy']);
                $arr2['galleryTitle'] = $this->en($obj['galleryTitle']);
                $arr2['gallery'] = $this->en($obj['gallery']);
                $arr2['gallery_name'] = $this->en($this->getGalleryName($obj['gallery']));
                $arr2['inMenu'] = $obj['inMenu'];
                $arr2['isService'] = $obj['isService'];
                $arr2['keys'] = $this->en($obj['Keys_Page']);
                $arr2['pos'] = $this->en($obj['module']);
                $arr2['link'] = "?pages=" . $obj['Id'];
                $arr2['title_page'] = $this->en($obj['Title_Page']);
                if ($obj['OnIndex'] == 1) {
                    $arr2['index'] = $this->en('Основная страница');
                } else {
                    $arr2['index'] = "";
                }
                $arr2['active'] = $this->en($obj['Active']);
                $arr[] = $arr2;
                unset($arr2);
                $ss3 = mysql_query("select * from `pages` where `parentId`='$obj[Id]'");
                $nump = mysql_num_rows($ss3);
                if ($nump > 0) {
                    $br .= "--";
                    $this->listing_parents_auxpages($obj['Id'], $br);
                }
            }
        }
    }

    function getGalleryName($id)
    {
        $sql = mysql_query("select `name` from `gallery` where `id`='{$id}' limit 1");
        if (is_resource($sql) && mysql_num_rows($sql) > 0) {
            $row = mysql_fetch_assoc($sql);
            return $row['name'];
        }
        return 'Не выбрана';
    }

    protected function read()
    {
        $br = "";
        if (isset($_POST['start']) && $_POST['start'] == "") {
            $_POST['start'] == "0";
        }
        global $arr;
        
        $orderBy = 'order by ';
        if (isset($_POST['sort'])) {
            switch ($_POST['sort']) {
                case "Id":
                case "id":
                    $orderBy .= "`Id`";
                    break;
                case "active":
                    $orderBy .= "`Active`";
                    break;
                case "title":
                case "title2":
                    $orderBy .= "`Title`";
                    break;
                case "inMenu":
                    $orderBy .= " `inMenu`";
                    break;
                case "module":
                case "pos":
                    $orderBy .= "`module`";
                    break;
                case "isService":
                    $orderBy .= "`isService`";
                    break;
                default:
                    $orderBy .= "`module`";
            }
        } else {
            $orderBy .= "`module`";
        }
        if (isset($_POST['dir'])) {
            $orderBy .= " {$_POST['dir']}";
        } else {
            $orderBy .= " asc";
        }
        
        $sql_count = "SELECT * FROM pages where `parentId`=0 {$orderBy}";
        $sql = $sql_count . " LIMIT " . (int) $_POST['start'] . ", " . (int) $_POST['limit'];
        $rs_count = mysql_query($sql_count);
        $rows = mysql_num_rows($rs_count);
        $rs = mysql_query($sql);
        if ($rows > 0) {
            while ($obj = mysql_fetch_array($rs)) {
                $parentName = mysql_fetch_array(mysql_query("select `Title` from `pages` where `Id`='$obj[parentId]' order by `parentId` ASC"));
                $parentName = $parentName['Title'];
                $arr2['id'] = $obj['Id'];
                $arr2['title'] = $this->en($obj['Title']);
                $arr2['title2'] = "<b>" . $this->en($obj['Title']) . "</b>";
                $arr2['parentId'] = $obj['parentId'];
                if ($obj['parentId'] == 0) {
                    $arr2['parentName'] = $this->en("Основной раздел");
                } else {
                    $arr2['parentName'] = $this->en($parentName);
                }
                $arr2['arts'] = $this->en($obj['arts']);
                $arr2['text'] = $this->en($obj['Text']);
                $arr2['secondTitle'] = $this->en($obj['secondTitle']);
                $arr2['textblock'] = $this->en($obj['textblock']);
                $arr2['inMenu'] = $obj['inMenu'];
                $arr2['copy'] = $this->en($obj['copy']);
                $arr2['gallery'] = $this->en($obj['gallery']);
                $arr2['galleryTitle'] = $this->en($obj['galleryTitle']);
                $arr2['gallery_name'] = $this->en($this->getGalleryName($obj['gallery']));
                $arr2['isService'] = $obj['isService'];
                $arr2['desc'] = $this->en($obj['Desc_Page']);
                $arr2['link'] = "?pages=" . $obj['Id'];
                $arr2['url'] = $this->en($obj['url']);
                $arr2['keys'] = $this->en($obj['Keys_Page']);
                $arr2['pos'] = $this->en($obj['module']);
                $arr2['title_page'] = $this->en($obj['Title_Page']);
                $arr2['secondTitle'] = $this->en($obj['secondTitle']);
                if ($obj['OnIndex'] == 1) {
                    $arr2['index'] = $this->en('Главная');
                } else {
                    $arr2['index'] = "";
                }
                $arr2['active'] = $this->en($obj['Active']);
                $arr[] = $arr2;
                unset($arr2);
                $ss3 = mysql_query("select * from `pages` where `parentId`='$obj[Id]'");
                $nump = mysql_num_rows($ss3);
                if ($nump > 0) {
                    $br = "--";
                    
                    $this->listing_parents_auxpages($obj['Id'], $br);
                }
            }
            $jsonresult = $this->JEncode($arr);
            echo '({"total":"' . $rows . '","results":' . $jsonresult . '})';
        } else {
            echo $this->JEncode(array(
                "total" => 0,
                "results" => "",
                "sql" => $sql_count
            ));
            
            // echo '{"total":"0", "results":""}';
        }
    }

    function replaceNames()
    {
        unset($_POST['module']);
		//print_r($_POST);
        foreach ($_POST as $name => $val) {
            switch ($name) {
                case "text":
                    unset($_POST[$name]);
                    $name = "Text";
                    break;
                case "keys":
                    unset($_POST[$name]);
                    $name = "Keys_Page";
                    break;
				case "canoniacl":
                    //unset($_POST[$name]);
                    $name = 7896;
                    break;
                case "title":
                    unset($_POST[$name]);
                    $name = "Title";
                    break;
                case "desc":
                    unset($_POST[$name]);
                    $name = "Desc_Page";
                    break;
                case "title_page":
                    unset($_POST[$name]);
                    $name = "Title_Page";
                    break;
                case "active":
                    unset($_POST[$name]);
                    $name = "Active";
                    break;
                case "pos":
                    unset($_POST[$name]);
                    
                    $name = "module";
                    break;
            }
            $_POST[$name] = $val;
        }
        return $_POST;
    }

    protected function homepage()
    {
        mysql_query("update pages set `OnIndex`=0 where `OnIndex`=1");
        mysql_query("update pages set `OnIndex`='1' where id='$_POST[id]'");
        echo "{success:true}";
    }

    protected function destroy()
    {
        $id = isset($_POST['id']) ? (int) $_POST['id'] : 0;
        
        $action = $this->en("Удаление страницы");
        $err = $this->en("Невозможно выполнить запрос, попробуйте чуть позднее");
        $succ = $this->en("Страница удалена");
        mysql_query("DELETE FROM `pages` WHERE `Id`='$id'") or die('{failure:true, errorMsg:"' . $err . '", action:"' . $action . '"}');
        echo "{success: true, msg:'$succ', action:'$action'}";
    }

    function object2array($object)
    {
        $return = NULL;
        if (is_array($object)) {
            foreach ($object as $key => $value) {
                $return[$key] = $this->object2array($value);
            }
        } else {
            if (is_object($object)) {
                $var = get_object_vars($object);
                
                foreach ($var as $key => $value) {
                    
                    $return[$key] = $this->object2array($value);
                }
            } else {
                return $object;
            }
        }
        
        return $return;
    }

    protected function update()
    {
        $update = array();
        $id = isset($_POST['id']) ? (int) $_POST['id'] : 0;
        unset($_POST['id']);
        $_POST = $this->replaceNames();
        
        if ($id == 0 or empty($id)) {
            $fields = array();
            $values = array();
            
            foreach ($_POST as $name => $value) {
                // ! preg_match ( "/(parentName|task|xaction)/is", $name )
                if (! in_array(strtolower($name), array(
                    "parentname",
                    "gallery_name",
                    "task",
                    "xaction"
                ))) {
                    $fields[] = "`$name`";
                    $values[] = "'" . addslashes($value) . "'";
                }
            }
            mysql_query("insert into `pages` (" . implode(",", $fields) . ") values (" . implode(",", $values) . ")") or die("{failure:true}");
            $newId = mysql_insert_id();
            $this->uploadPhoto($newId);
        } else {
            $values = array();
            foreach ($_POST as $name => $value) {
                if (! in_array(strtolower($name), array(
                    "parentname",
                    "gallery_name",
                    "task",
                    "xaction"
                ))) {
                    
                    $values[] = "`$name`='" . addslashes($value) . "'";
                }
            }
            if (count($values) > 0) {
                mysql_query("update `pages` set " . implode(",", $values) . " where `Id`='$id'") or die("{failure:true}\n" . mysql_error());
            } else {
                echo "{success:true}";
            }
            $this->uploadPhoto($id, true);
        }
        echo "{success:true}";
    }

    function A2S($Array, $Sep = ",", $Closer = "", $Slashes = false)
    {
        if (is_array($Array)) {
            $string = "";
            $i = 0;
            foreach ($Array as $name => $value) {
                $i ++;
                if ($i > 1) {
                    $string .= "{$Sep}";
                }
                if (is_array($value)) {
                    $this->A2S($value, $Sep, $Closer, $Slashes);
                } else {
                    if ($Slashes == true) {
                        $value = addslashes($value);
                    }
                    $string .= "{$Closer}{$value}{$Closer}";
                }
            }
            return $string;
        }
        return $Array;
    }

    protected function create()
    {
        // $_POST['results'] = str_replace("\\n", "", $_POST['results']);
        $json = $_POST['results'];
        $json = str_replace("[", "", $json);
        $json = str_replace("]", "", $json);
        $result = $this->JEncode($json, 0);
        $insert = "";
        $fileds = "";
        $fileds .= "`Title`,";
        $fileds .= "`Text`,";
        $fileds .= "`textblock`,";
        
        $fileds .= "`parentId`,";
        $fileds .= "`module`";
        $insert .= "'" . addslashes($this->encode($result->title)) . "',";
        $insert .= "'" . addslashes($this->encode($result->text)) . "',";
        $insert .= "'" . addslashes($this->encode($result->textblock)) . "',";
        
        $insert .= "'" . addslashes($this->encode($result->parentId)) . "',";
        $insert .= "'" . addslashes($this->encode($result->module)) . "'";
        if (isset($result->title_page)) {
            $insert .= ",";
            $insert .= "'" . addslashes($this->encode($result->title_page)) . "',";
            $insert .= "'" . addslashes($this->encode($result->keys)) . "',";
            $insert .= "'" . addslashes($this->encode($result->desc)) . "',";
            $insert .= "'" . addslashes($this->encode($result->url)) . "',";
            $insert .= "'" . addslashes($this->encode($result->secondTitle)) . "',";
            $insert .= "'" . addslashes($this->encode($result->copy)) . "'";
            
            $fileds .= ",";
            $fileds .= "`Title_Page`,";
            $fileds .= "`Keys_Page`,";
            $fileds .= "`Desc_Page`,";
            $fileds .= "`url`,";
            $fields .= "`secondTitle`";
            $fileds .= "`copy`";
        }
        $insert = "insert into pages ($fileds) values ($insert)";
        mysql_query($insert) or die(mysql_error());
        $id = mysql_insert_id();
        $this->uploadPhoto($id);
        echo "{success:true, msg:''}";
    }

    function uploadPhoto($id, $deleteOld = false)
    {
        $allow = array(
            "jpg",
            "jpeg",
            "png",
            "gif",
            "bmp",
            "tiff"
        );
        if (! empty($id) && $id != 0) {
            if (isset($_FILES['photo-path']) && isset($_FILES['photo-path']['name']) && ! empty($_FILES['photo-path']['name'])) {
                $pathinfo = pathinfo($_FILES['photo-path']['name']);
                if (isset($pathinfo['extension'])) {
                    $ext = strtolower($pathinfo['extension']);
                    if (in_array($ext, $allow)) {
                        if ($deleteOld == true) {
                            $sql = mysql_query("select `photo` from `pages` where `Id`='$id'");
                            if (mysql_num_rows($sql) > 0) {
                                $row = mysql_fetch_assoc($sql);
                                if (! empty($row['photo']) && file_exists($row['photo'])) {
                                    @unlink($row['photo']);
                                }
                            }
                        }
                        $newFile = 'files/pages/' . $id . '.' . $ext;
                        if (move_uploaded_file($_FILES['photo-path']['tmp_name'], $newFile)) {
                            
                            chmod($newFile, 0777);
                            $newFile = addslashes($newFile);
                            mysql_query("update `pages` set `photo`='$newFile' where `Id`='$id'");
                        }
                    }
                }
            }
        }
        return true;
    }

    protected function Load_Tree_Pages()
    {
        echo $this->JEncode($this->getRoot_Aux());
    }

    protected function getChild_Aux($id)
    {
        $sql = mysql_query("select * from `pages` where parentId='$id'");
        $num = mysql_num_rows($sql);
        while ($row = mysql_fetch_array($sql)) {
            $child = $this->getChild_Aux($row['Id']);
            $tmp['text'] = $this->en($row['Title']);
            $tmp['id'] = $row['Id'];
            if (is_array($child)) {
                $tmp['leaf'] = false;
            } else {
                $tmp['leaf'] = true;
            }
            $tmp['children'] = $child;
            $children[] = $tmp;
            unset($tmp);
        }
        if (! isset($children)) {
            $children = "";
        }
        return $children;
    }

    protected function getRoot_Aux()
    {
        $sql = mysql_query("select * from `pages` where parentId=0");
        $num = mysql_num_rows($sql);
        if ($num == "0") {
            $nodes = "";
        }
        while ($row = mysql_fetch_array($sql)) {
            $child = $this->getChild_Aux($row['Id']);
            
            $tmp['text'] = $this->en($row['Title']);
            $tmp['id'] = $row['Id'];
            if (is_array($child)) {
                $tmp['leaf'] = false;
            } else {
                $tmp['leaf'] = true;
            }
            $tmp['children'] = $child;
            $nodes[] = $tmp;
            unset($tmp);
        }
        return $nodes;
    }

    function addAdv()
    {
        $id = isset($_POST['id']) ? (int) $_POST['id'] : 0;
        $page = isset($_POST['page']) ? (int) $_POST['page'] : 0;
        if ($id != 0 && $page != 0) {
            $count = mysql_result(mysql_query("select COUNT(*) from `pages_adv` where `page`='$page' and `adv`='$id'"), 0);
            if ($count == 0) {
                mysql_query("insert into `pages_adv` (`page`, `adv`) values ('$page', '$id')");
            }
        }
    }

    function deleteAdv()
    {
        $id = isset($_POST['id']) ? (int) $_POST['id'] : 0;
        mysql_query("delete from `pages_adv` where `id`='$id' limit 1");
    }

    function ListingAdvAll()
    {
        $sql_count = "SELECT * FROM `advant` order by `pos` asc";
        $sql = $sql_count;
        $rs_count = mysql_query($sql_count) or die("kjdfsk");
        $rows = mysql_num_rows($rs_count);
        $rs = mysql_query($sql) or die("HELLO");
        $arr = array();
        $arr2 = array();
        if ($rows > 0) {
            while ($obj = mysql_fetch_array($rs, MYSQL_ASSOC)) {
                $record = $obj;
                
                $arr[] = $this->winDecode($record);
            }
            $jsonresult = $this->JEncode($arr);
            echo '({"total":"' . $rows . '","results":' . $jsonresult . '})';
        } else {
            echo '({"total":"0", "results":""})';
        }
    }

    function ListingAdv()
    {
        $sql_count = "SELECT `advant`.`name`, `pages_adv`.`id` FROM `pages_adv`,`advant` where `pages_adv`.`page`='$_POST[id]' and `pages_adv`.`adv`=`advant`.`id`";
        // $sql = $sql_count . " LIMIT " . ( int ) $_POST ['start'] . ", " . (
        // int ) $_POST ['limit'];
        $rs_count = mysql_query($sql_count) or die("kjdfsk");
        $rows = mysql_num_rows($rs_count);
        $rs = mysql_query($sql_count) or die("HELLO");
        $arr = array();
        $arr2 = array();
        if ($rows > 0) {
            while ($obj = mysql_fetch_array($rs, MYSQL_ASSOC)) {
                $record = $obj;
                
                $arr[] = $this->winDecode($record);
            }
            $jsonresult = $this->JEncode($arr);
            echo '({"total":"' . $rows . '","results":' . $jsonresult . '})';
        } else {
            echo '({"total":"0", "results":""})';
        }
    }

    function winDecode($string)
    {
        if (is_array($string)) {
            $newArray = array();
            foreach ($string as $name => $value) {
                if (is_array($value)) {
                    $newArray[$name] = $this->winDecode($value);
                } else {
                    if (is_string($value)) {
                        $newArray[$name] = iconv("windows-1251", "utf-8", $value);
                    } else {
                        $newArray[$name] = $value;
                    }
                }
            }
            return $newArray;
        } else {
            if (is_string($string)) {
                return iconv("windows-1251", "utf-8", $string);
            }
        }
        return $string;
    }
}

