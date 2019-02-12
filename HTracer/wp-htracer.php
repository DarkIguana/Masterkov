<?php
/*
Plugin Name: HTracer
Description: Плагин для автопродвижения сайта по НЧ и СЧ запросам
Author: Hkey
Version: 3
*/
$GLOBALS['htracer_is_wp_plugin']=true;

$GLOBALS['htracer_trace']=false;
$GLOBALS['htracer_mysql']=true;

include_once(dirname(__FILE__).'/HTracer.php');
class WP_HTracer
{
	function WP_HTracer()
	{
		$this->read_ini();
		$charset=get_bloginfo('charset');
		if($charset && trim($charset))
			$GLOBALS['htracer_encoding']=strtolower($charset);
			
		add_action('init', array(&$this, 'init_action'));
		add_action('admin_menu', array(&$this, 'admin_menu'));//Добавляем опции в админку
		add_filter('the_content', array(&$this, 'the_content_filter'),100);
		add_filter('wp_list_categories', array(&$this, 'wp_list_filter'),100);
		add_filter('wp_list_pages', array(&$this, 'wp_list_filter'),100);
		add_filter('widget_text', array(&$this, 'widget_text'),100);
		//widget_text
		add_filter('aioseop_keywords', array(&$this, 'aioseop_keywords_filter'));
	}
	function widget_text($Text,$Inst=false)
	{
		if(function_exists('htracer_insert_clouds'))
			return htracer_insert_clouds($Text);
		return $Text;
	}

	function init_action()
	{	
		if(!$this->options['not_trace'])
			HTracer::AddQuery();
			
		if($this->options['insert_in_all'])
		{
			$GLOBALS['insert_keywords_where']='a_title+img_alt+meta_keys';
			$GLOBALS['insert_keywords_params']=$this->options['insert_in_all_pars'];
			ob_start('insert_keywords_cb');
		}
		//if($this->options['test_mode'])
		//	$GLOBALS['htracer_test']=true;
	}
	function admin_menu()
	{
		add_options_page('HTracer', 'HTracer', 8,'HTracer', array(&$this, 'admin'));
	}
	function wp_head_action()
	{
		if($this->options['add_meta_keywords'])
			the_meta_keys_tag();
	}
	function aioseop_keywords_filter($content)
	{
		$keys='';
		if($this->options['add_meta_keywords'])
			$keys=get_meta_keywords();
		if($content && $keys)
			$content.=', ';
		return $content.$keys;
	}
	function cloud_filter($content)
	{
		if($this->options['replace_cloud'])
			$content=get_keys_cloud($this->options['replace_cloud_pars']);
		return $content;
	}
	function wp_list_filter($content)
	{
		if($this->options['insert_in_list'])
			$content=insert_keywords($content,'a_title',$this->options['insert_in_list_pars']);
		return $content;
	}
function close_dangling_tags($html){
  #put all opened tags into an array
  preg_match_all("#<([a-z]+)( .*)?(?!/)>#iU",$html,$result);
  $openedtags=$result[1];
 
  #put all closed tags into an array
  preg_match_all("#</([a-z]+)>#iU",$html,$result);
  $closedtags=$result[1];
  $len_opened = count($openedtags);
  # all tags are closed
  if(count($closedtags) == $len_opened){
    return $html;
  }
 
  $openedtags = array_reverse($openedtags);
  # close tags
  for($i=0;$i < $len_opened;$i++) {
    if (!in_array($openedtags[$i],$closedtags)){
      $html .= '</'.$openedtags[$i].'>';
    } else {
      unset($closedtags[array_search($openedtags[$i],$closedtags)]);
    }
  }
  return $html;
}

	function the_content_filter($content)
	{
		if($this->options['insert_in_content'])
			$content=insert_keywords($content,'a_title+img_alt',$this->options['insert_in_list_pars']);
		if(is_single() && $this->options['clinks'])	
			$content=hkey_insert_context_links($content);
		if(is_single() && $this->options['add_to_content_end'])	
		{
			$content=str_replace('^','&*+hrs+*',$content);//экранируем символ ^
			$content=str_replace(array('<br />','<br/>','<br>'),array('^','^','^'),$content);//заменяем БР на ^ 
			$content=rtrim($content,'^'); // удаляем брейкеты с конца
			$content=str_replace('^','<br />',$content);//востанавливаем БР 
			$content=str_replace('&*+hrs+*','^',$content);//деэкранируем символ ^
			$content=$content.'<br />'.get_keys_cloud($this->options['add_to_content_end_pars']);
		}
		return $content;
	}
	function OutInput($Name,$Type='checkbox')
	{
		$Value=$this->options[$Name];
		if(!function_exists('get_magic_quotes_gpc')||!get_magic_quotes_gpc())
			$Value=addslashes($Value);
		if($Type=='checkbox')
		{
			if(isset($this->options[$Name]) && $this->options[$Name])
				echo "<input name='$Name' id='$Name' type='$Type' checked='checked' value='1' />";
			else
				echo "<input name='$Name' id='$Name' type='$Type' value='1' />";
		}
		else
			echo "<input name='$Name' id='$Name' type='$Type' value='$Value' size='55' />";
	}
	function admin()
	{
		if($_POST['was_wp_options_post'])
			$this->LoadFromPost();
		$tabSelected=0;
		if(isset($_POST['was_ht_admin_post_tmp'])||isset($_POST['was_ht_admin_post'])
		||isset($_POST['change_query_weigth']) ||isset($_POST['ht_page']))
			$tabSelected=2;
		elseif($_POST['was_ht_import_post']||$_POST['ht_in_csv_import'])
			$tabSelected=3;
		elseif($_POST['was_ht_export_post'])
			$tabSelected=4;
			
			
		$hURL= $_SERVER['REQUEST_URI'];
		$hURL=explode('/wp-admin/',$hURL,2);
		if(count($hURL)===1)
			$hURL=explode("\\wp-admin\\",$hURL,2);
		if(count($hURL)===1)
			$hURL='';
		else
			$hURL=$hURL[0];
		$hURL='http://'.$_SERVER['SERVER_NAME'].$hURL.'/'.'wp-content/plugins/HTracer/admin/options.php';
		 //;
		$aCS=ht_calc_wp_key();
		$hURL.='?wp_akey='.$aCS;
		
		?>
		<script type="text/javascript">
			function SetAdvField(id,val)
			{
				if(!val)
					jQuery('#'+id).css('display','none');
				else
					jQuery('#'+id).css('display','inline');
			}
			function SetAdvFields()
			{
				window.setTimeout(function(){SetAdvFields0();});
			}
			function SetAdvFields0()
			{
				try{
					var val = jQuery('#show_all_options').attr('checked');	
					SetAdvField('insert_in_list_pars',val);
					SetAdvField('insert_in_content_pars',val);
					SetAdvField('add_to_content_end_pars',val);
					SetAdvField('replace_cloud_pars',val);
					SetAdvField('insert_in_all_pars',val);
					SetAdvField('insert_in_all_td',val);

					SetAdvField('pars_str',val);
					SetAdvField('not_trace_span',val);
					SetAdvField('not_trace_ptd',val);
				}catch(e){}
			}
			jQuery(document).ready(function(){
				SetAdvFields();
			});
		</script>
		<style>
			#options, #options td
			{
				font-size: 12pt;
			}
			#options input[type='checkbox']
			{
				margin-bottom:5px;
			}
		</style>
		<div class="wrap">
			<div id='options' style='padding: 20px; '>
				<div id="icon-options-general" class="icon32"><br></div>
				<h2>Настройки HTracer</h2>

				
				<form method="post">
					<input type="hidden" name='waspost' value='1' />
					<input type="hidden" name='was_wp_options_post' value='1' />
					<table>
						<tr><td colspan="2"><input type='checkbox' id='show_all_options' onclick='SetAdvFields()' /> Показать все опции</td></tr>
						<tr><td colspan="2"><br /></td></tr>
						<tr><td colspan="2"><?php $this->OutInput('add_meta_keywords');?> Добавлять Meta Keywords <i>(плагин <a href="http://wordpress.org/extend/plugins/all-in-one-seo-pack/">All In One SEO Pack</a> должен быть подключен)</i></td></tr>
						<tr><td></td><td><b id='pars_str'>Параметры:</b></td></tr>
						<tr><td><?php $this->OutInput('insert_in_list');?>    		В списках категорий и страниц раставлять титлы ссылок				  </td><td><?php $this->OutInput('insert_in_list_pars'		,'text');?></td></tr>
						<tr><td><?php $this->OutInput('insert_in_content');?> 		Вставлять титлы ссылок и альты картинок в тексте поста&nbsp;&nbsp;    </td><td><?php $this->OutInput('insert_in_content_pars'	,'text');?></td></tr>
						<tr><td><?php $this->OutInput('replace_cloud');?>	  		Заменить стандартное облако семантическим					 		  </td><td><?php $this->OutInput('replace_cloud_pars'		,'text');?></td></tr>
						<tr><td id='insert_in_all_td'><?php $this->OutInput('insert_in_all');?>	  		Раставлять титлы ссылок и альты везде			  </td><td><?php $this->OutInput('insert_in_all_pars'		,'text');?></td></tr>
						<tr><td><?php $this->OutInput('add_to_content_end');?>		Добавить список ссылок в конец текста поста 						  </td><td><?php $this->OutInput('add_to_content_end_pars'	,'text');?></td></tr>
						<tr><td colspan="2"><?php $this->OutInput('clinks');?> Вставлять контекстные ссылки</td></tr>
						<tr><td colspan="2" id='not_trace_ptd'><br /></td></tr>
						<tr><td colspan="2"><span id='not_trace_span'><?php $this->OutInput('not_trace');?> НЕ запоминать переходы</span></td></tr>
					</table>
					<br />
					<input type="submit" class='button-primary' value='Обновить настройки' /> 
				</form>
			</div>	
			<a href='<?php echo $hURL;?>'>Перейти в админку HTracer</a>
		</div>
		<script type="text/javascript">
		/* <![CDATA[ */
			jQuery(document).ready(function(){
				jQuery('html,body').scrollTop(0);
			});	
		/* ]]> */
		</script>
			
<?php
		HTracer::CreateTables();
		$this->write_ini();		
		//echo '<br><br><H1>Просмотр и редактирование запросов</H1>';	
		//include(dirname(__FILE__).'/admin.php');
		//echo '<br><br><H1>Импорт запросов</H1>';	
		//include(dirname(__FILE__).'/import.php');
?>
		
<?php
	}
	function LoadFromPost()
	{
		if(!$_POST['waspost'])
			return;
		$this->options=Array();
		
		foreach($_POST as $key => $Value)
		{
			$Value=stripslashes($Value);
			$this->options[$key]=$Value;
		}
	}
	function read_ini($path=false)
	{
		if($this->options && count($this->options))
			return;
		if(!$path)
			$path=dirname(__FILE__).'/wp_options.ini';
		$assoc_array=@parse_ini_file($path,true);
		foreach ($assoc_array as $key => $item) 
		{
			if (is_array($item))
				foreach ($item as $key2 => $item2) 
					$assoc_array[$key][$key2]=stripslashes($item2);
			else	
				$assoc_array[$key]= stripslashes($item);
		}
		$this->options=$assoc_array;
	}
	function write_ini($path=false, $assoc_array=false) 
	{	
		if(!$path)
			$path=dirname(__FILE__).'/wp_options.ini';
		if(!$assoc_array)	
			$assoc_array=$this->options;
		foreach ($assoc_array as $key => $item) 
		{
			if (is_array($item)) 
			{
				$content .= "\n[$key]\n";
				foreach ($item as $key2 => $item2) 
				{
					$item2=addslashes($item2);
					$content .= "$key2 = \"$item2\"\n";
				}
			}	 
			else 
			{
				$item=addslashes($item);
				$content .= "$key = \"$item\"\n";
			}
		}
		$handle = fopen($path, 'w');
		if (!$handle||!fwrite($handle, $content))
			return false;
		fclose($handle);
		return true;
	}
};
$WP_HTracer= new WP_HTracer();
?>