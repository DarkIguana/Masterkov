<?php
class wdg_gallery {
    var $over = "";
    function __construct() {
        $out = "";
        $row = array();
        $sql = mysql_query("SELECT `gallery`.`name`, `gallery`.`date`, `gallery_img`.`id`, `gallery_img`.`ext`, `gallery_img`.`iditem`, `gallery_img`.`osn`  FROM `gallery`, `gallery_img` where `gallery`.`id`=`gallery_img`.`iditem` and `gallery`.`active`=1 and `gallery_img`.`osn`='1'  group by `gallery`.`id` order by `gallery_img`.`osn` desc, `gallery_img`.`pos` asc ");
        if (is_resource($sql) && mysql_num_rows($sql) > 0) {
            $out .= '<div class="box_slider" id="vmc-slide"><ul>';
            while (($row = mysql_fetch_assoc($sql)) != false) {
                $date = strtotime($row ['date']);
                $out .= '	<li title=" ' . $row ['name'] . ' ">
                <img src="/thumbs/crop/227x162/files/gallery/o_' . $row ['id'] . '.' . $row ['ext'] . '">
                </li>';
            }
            $out .= ' </ul></div>';
        }
        $this->over = $out;
    }
}
?>