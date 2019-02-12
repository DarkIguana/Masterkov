<?php 
class time {
	var $over = "";
	function __construct(){
		$year = date("Y");
		$month = date("m")-1;
		$day = date('d');
		$hour = date("H");
		$min = date("i");
		$sec = date("s");
		$ms = (int)number_format(date("u")/1000, 0, '','');
		$this->over = '<script>
		function ahead(){
		   return new Date('.$year.', '.$month.', '.$day.', '.$hour.','.$min.', '.$sec.');
		}
		$(document).ready(function(){
		var dd = new Date('.$year.', '.$month.', '.$day.', 21,0);
		
		$("#Time").countdown({until:dd,serverSync: ahead, layout: "<span>{hn}</span> час. <span>{mn}</span> мин. <span>{sn}</span> сек."});
		});
		
		</script>';
	}
}