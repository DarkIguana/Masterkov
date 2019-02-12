<?php

session_start();
require("classes/global.php");
$try = false;

$b = array_keys(array_merge($_POST, $_GET));
$a = array("module", "task", "xaction");
$exec = false;
foreach ($a as $h){
	if (in_array($h,$b)){
		$exec = true;
		break;
	}
}
$glb = new admin();
if (isset($_POST['user']) && isset($_POST['passwd'])){
	
	if (SystemUsers::iUser($_POST['user'], $_POST['passwd'])){
		$glb->login = true;
		header("Location: /admincp.php");
	}
	else {
		$try = true;
	}
}
if ($glb->login==false && $exec==true){
	echo "{failure:true, login:false}";
}
elseif (!SystemUsers::iUser()) {
	
	?>
	<html>
<head>
<style>
#loading{
        position:absolute;
        left:40%;
        top:40%;
        padding:2px;
        z-index:20001;
        height:auto;
    }
    #loading a {
        color:#225588;
    }
    #loading .loading-indicator{
        background:white;
        color:#444;
        font:bold 13px tahoma,arial,helvetica;
        padding:10px;
        width:350px;
        margin:0;
        height:auto;
    }
    #loading-msg {
        
        font: normal 10px arial,tahoma,sans-serif;
    }
</style>
<meta http-equiv="Content-Type" content="text/html; charset=windows-1251">
		<title>Панель управления сайтом</title>
	    <link rel="stylesheet" type="text/css" href="core/css/ext-all.css" />
	   
	   <link rel="stylesheet" type="text/css" href="core/css/coreadmin.css" />
	    <link rel="stylesheet" type="text/css" href="core/adminjs/ux/Ext.ux.grid.GridSummary.css" />
	     <link rel="stylesheet" type="text/css" href="core/css/virtualkeyboard.css" />
	     
	
	 <!--       

    	<script type="text/javascript">var ErrorAdmin="";</script>-->
</head>
<body>
<div id="loading-mask" style=""></div>
<div id="loading">
    <div class="loading-indicator" style="">
    <form method="post">
   
    <center><img align="center" src="core/re.png" width="150" style="margin-right:8px;vertical-align:top;"></center><br> <br />
    <?php
      if ($try){
      	 echo "<p align='center'>Не правильный логин или пароль</p>";
      }
    ?>
    
    <table>
    <tr><td>Имя пользователя:</td><td width="10">&nbsp;</td><td><input type="text" name="user" /></td></tr>
    <tr><td>Пароль:</td><td width="10">&nbsp;</td><td><input type="password" name="passwd" /></td></tr>
    <tr><td colspan="3">&nbsp;</td></tr>
    <tr><td colspan="3"><center><input type="submit" name="Login" value="Войти"/></center></td></tr>
    </table>
    </form>
    </div>

</div>
</body>
</html>
	<?php 
	exit();
}
?>
<html>
<head>
<style>
#loading{
        position:absolute;
        left:40%;
        top:40%;
        padding:2px;
        z-index:20001;
        height:auto;
    }
    #loading a {
        color:#225588;
    }
    #loading .loading-indicator{
        background:white;
        color:#444;
        font:bold 13px tahoma,arial,helvetica;
        padding:10px;
        width:250px;
        margin:0;
        height:auto;
    }
    #loading-msg {
        
        font: normal 10px arial,tahoma,sans-serif;
    }
</style>
<meta http-equiv="Content-Type" content="text/html; charset=windows-1251">
		<title>Панель управления сайтом</title>
		 
	    <link rel="stylesheet" type="text/css" href="core/css/ext-all.css" />
	   
	   <link rel="stylesheet" type="text/css" href="core/css/coreadmin.css" />
	    <link rel="stylesheet" type="text/css" href="core/adminjs/ux/Ext.ux.grid.GridSummary.css" />
	     <link rel="stylesheet" type="text/css" href="core/css/virtualkeyboard.css" />
	     
	
	 <!--       

    	<script type="text/javascript">var ErrorAdmin="";</script>-->
</head>
<body>
<div id="loading-mask" style=""></div>
<div id="loading">
    <div class="loading-indicator" style=""><img src="core/re.png" width="150" style="margin-right:8px;float:left;vertical-align:top;"><br> <br /><span id="loading-msg">Загрузка</span></div>

</div>
 <script type="text/javascript">document.getElementById('loading-msg').innerHTML = 'Загрузка интерфейса...';</script>
  <script type="text/javascript" src="core/ext-base.js"></script>
  
	    <script type="text/javascript" src="core/ext-all.js"></script>
	     <script type="text/javascript" src="core/ux-all.js"></script>
	 
	   <script>
	   Ext.override(Ext.grid.ColumnModel, {
		    // private
		    destroyConfig: function() {
		        for (var i = 0, len = this.config.length; i < len; i++) {
		            Ext.destroy(this.config[i]);
		        }
		    },

		    destroy : function() {
		        this.destroyConfig();
		        this.purgeListeners();
		    },
		    
		    setConfig: function(config, initial) {
		        var i, c, len;
		        if (!initial) { // cleanup
		            delete this.totalWidth;
		            this.destroyConfig();
		        }

		        // backward compatibility
		        this.defaults = Ext.apply({
		            width: this.defaultWidth,
		            sortable: this.defaultSortable
		        }, this.defaults);

		        this.config = config;
		        this.lookup = {};

		        for (i = 0, len = config.length; i < len; i++) {
		            c = Ext.applyIf(config[i], this.defaults);
		            // if no id, create one using column's ordinal position
		            if (Ext.isEmpty(c.id)) {
		                c.id = i;
		            }
		            if (!c.isColumn) {
		                var Cls = Ext.grid.Column.types[c.xtype || 'gridcolumn'];
		                c = new Cls(c);
		                config[i] = c;
		            }
		            this.lookup[c.id] = c;
		        }
		        if (!initial) {
		            this.fireEvent('configchange', this);
		        }
		    }
		});
	   </script>
	    <script type="text/javascript" src="core/ext-lang-ru.js"></script>
	    <script type="text/javascript" src="core/App.js"></script>
	    
	   	    <script type="text/javascript" src="core/adminjs/ux/virtualkeyboard.js"></script>
        <script type="text/javascript" src="core/adminjs/ux/plugins/virtualkeyboard.js"></script>
    
      <script type="text/javascript" src="core/adminjs/ux/Ext.ux.form.LoginDialog.js"></script>
        
	  <script type="text/javascript" src="core/adminjs/ux/miframe.js"></script>
	  <script type="text/javascript" src="core/adminjs/ux/tiny_mce/tiny_mce.js"></script>
	    <script type="text/javascript" src="core/adminjs/ux/Ext.ux.TinyMCE.js"></script>
	     <script type="text/javascript" src="core/adminjs/all.js"></script>
	     
	  <script type="text/javascript" src="core/adminjs/ux/Ext.ux.grid.RowActions.js"></script>
	    <script type="text/javascript" src="core/adminjs/ux/FileUploadField.js"></script>
	   <script type="text/javascript" src="core/adminjs/ux/data-view-plugins.js"></script>
	    <script type="text/javascript" src="core/adminjs/ux/Ext.ux.grid.GridSummary.js"></script>
	    <script type="text/javascript" src="core/adminjs/ux/Ext.ux.Plugin.RemoteComponent.js"></script>
	     <script type="text/javascript" src="core/adminjs/ux/Ext.ux.UploadDialog.js"></script>

	   <script type="text/javascript">document.getElementById('loading-msg').innerHTML = 'Загрузка модулей...';</script>
	      <script type="text/javascript" src="core/adminjs/medialib.js"></script>
	     
	       
	<?php
	    $files = array(
	    'site_settings'=>'core/adminjs/site_settings.js',
	    'pages'=>'core/adminjs/pages.js',
	    'blocks'=>'core/adminjs/blocks.js',
	    'news'=>'core/adminjs/news.js',
	    'articles'=>'core/adminjs/articles.js',
	   // 'price'=>'core/adminjs/price.js',
	   // 'shop'=>'core/adminjs/shop.js',
	   // 'faq'=>'core/adminjs/faq.js',
	   // 'files'=>'core/adminjs/files.js',
	    'reviews'=>'core/adminjs/reviews.js',
		'tips'=>'core/adminjs/tips.js',
	   // 'banners'=>'core/adminjs/banners.js',
	   // 'slider'=>'core/adminjs/slider.js',
	   // 'pricelistfiles'=>'core/adminjs/pricelistfiles.js',
	   // 'newsletter'=>'core/adminjs/newsletter.js',
	   // 'users'=>'core/adminjs/users.js',
	  //  'systemusers'=>'core/adminjs/systemusers.js',
	    );
	    $names = array("pages"=>'Основные разделы', "blocks"=>"Блоки", "news"=>"Новости",
	    "articles"=>"Спецпредложения",
	    "price"=>"Каталог",
	    "shop"=>"Магазин",
	    "faq"=>"Вопрос-ответ",
	    "files"=>"Публикации",
	    "banners"=>"Баннеры",
	    "slider"=>"Основные направления",
	    "pricelistfiles"=>"Прайс-листы",
	    "newsletter"=>"Подписка", 
	    "reviews"=>"Отзывы",
		"tips"=>"Советы",
	    "users"=>"Пользователи",
	    "systemusers"=>"Администраторы"
	    );
	 
	  $a = array();
	   foreach ($files as $resource=>$file){
	   
	  
	   	if (SystemUsers::isAllowed($resource)){
	   		
	   		echo ' <script type="text/javascript" src="'.$file.'"></script>';
	   	}
	   }
	 
	?>


	<script type="text/javascript" src="core/adminjs/gallery.js"></script>
	<script type="text/javascript" src="core/adminjs/slider.js"></script>
	<script type="text/javascript" src="core/adminjs/advice.js"></script>
	 <script type="text/javascript" src="core/adminjs/pass.js"></script>
 <script type="text/javascript">document.getElementById('loading-msg').innerHTML = 'Инцилизация...';</script>
<script type="text/javascript" src="core/adminjs/admin.js"></script>

</body>
</html>