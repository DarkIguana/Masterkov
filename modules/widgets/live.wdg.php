<?php 
class live {
	var $over ='';
	function __construct(){
		$status = isset($_SESSION['chat_status'])?$_SESSION['chat_status']:'open';
		if ($status=='close'){
			$this->over = '
			<div style="text-align:center;width:175px; position:fixed;height:46px; top:210px; z-index:5;left:-146px; background:url(/quest.gif) no-repeat" id="online_chat">

<a href="javascript:void(window.open(\'/livezilla/chat.php\',\'\',\'width=590,height=580,left=0,top=0,resizable=yes,menubar=no,location=no,status=yes,scrollbars=yes\'))";>
<img src="/quest.gif"  id="liveImage" alt="LiveZilla Live Help"></a>
<div  style="position:absolute; z-index:6; width:29px; height:46px;top:0px; left:146px; cursor:pointer;" id="openChat">&nbsp;</div>


<noscript><div><a href="/livezilla/chat.php"; target="_blank">Start Live Help Chat</a></div></noscript>
</div>';
		}
		else {
					$this->over = '<div class="open_chat" style="text-align:center;width:175px; position:fixed;height:46px; top:210px; z-index:5;left:0; background:url(/quest.gif) no-repeat" id="online_chat">

<a href="javascript:void(window.open(\'/livezilla/chat.php\',\'\',\'width=590,height=580,left=0,top=0,resizable=yes,menubar=no,location=no,status=yes,scrollbars=yes\'))";>
<img src="/quest.gif" id="liveImage" alt="LiveZilla Live Help"></a>
<div  style="position:absolute; z-index:6; width:29px; height:46px;top:0px; left:146px; cursor:pointer;" id="openChat">&nbsp;</div>
<noscript><div><a href="/livezilla/chat.php"; target="_blank">Start Live Help Chat</a></div></noscript>
</div>';
		}
	}
}