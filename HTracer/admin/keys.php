<?php 
	$GLOBALS['ht_admin_page']='keys';
	include_once('functions.php');
	if(isset($_POST['ajax']) && $_POST['ajax'])
		htracer_admin_header(false);
	else
		htracer_admin_header('Ключевые слова');
	if(isset($_POST['waspost']) && $_POST['waspost'])
	{	
		if($_POST['form']=='export')
		{
			$TA='
				<textarea id="export_data_textarea" onfocus="this.select()"
					spellcheck="false" wrap="off"
					style="
						font-size:8pt;
						white-space:nowrap; 
						width:460px; 
						height:250px; 
						overflow:scroll;
					">'.
						htracer_admin_export_get_data(true).'
				</textarea>';
			
			if($_REQUEST['export_dest']=='sape')
				echo ht_trans('В Sape нажмите "+URL"->"добавить URLы списком" и вставьте:').'<br /><br />'
					.$TA."
					<br /><br />
					<div id='export_optimize_options'>					
						<i>".ht_trans('Удалить все ключи по которым сайт уже в')."</i>
						<br />Top-<select id='ya_min_pos' style='width:50px'>
								<option value='1'>1</option>
								<option selected='selected' value='3'>3</option>
								<option value='5>5</option>
								<option value='10'>10</option>
							</select> 
						выдачи 
						<select id='export_optimize_se' style='width:100px'>
							<option value='yandex'>".ht_trans('Яндекс')."</option>
							<option value='google'>Google</option>
						</select> 
						<br /><br /><input type='button' id='optimize_project' value='".ht_trans('Поехали')."' onclick='start_project_optimization()' />
					</div>
					<div id='export_optimize_results' style='display:none'>
						<div id='export_optimize_processbar' style='width: 460px;'></div>
						".ht_trans('Прогресс').": <b id='export_optimize_cur_str'>0</b> 
								".ht_trans('из')." <b id='export_optimize_count'>1000</b> &nbsp;&nbsp;&nbsp;&nbsp; 
								<span id='google_ban' style='display:none'>Google ban... waiting <span id='google_ban_sec'>30</span> seconds</span> <br />
						".ht_trans('Удалено')." : <b id='export_optimize_deleted'>0</b>
					</div>
					";
			else
			{
				$Download_URL='export_file.php'
								.'?export_dest='.$_REQUEST['export_dest']
								.'&maxpages='.$_REQUEST['maxpages']
								.'&budget='.$_REQUEST['budget']
								.'&needtop='.$_REQUEST['needtop'];

				$TA=str_replace("\r",'',$TA);
				$TA=str_replace("\n",'\n',$TA);
				$TA=str_replace('"',"'",$TA);
				$TA=str_replace("'","\\"."'",$TA);
?>


				<ol>
					<li>
						<a href="<?php echo $Download_URL?>"><?php echo ht_trans('Скачайте файл');?></a><br /> 
						<span style='color:gray'>
							<?php echo ht_trans('или создайте новый');?>
							<span class='hint' onclick="ShowHintDialog('','<?php echo $TA;?>');"><?php echo ht_trans('со следующим содержимым');?> </span> 
							<?php echo ht_trans('и расширением');?> .csv 
						</span>
					</li>	
					<?php if($_REQUEST['export_dest']=='seopult'||$_REQUEST['export_dest']=='webeffector'): ?>
						<li>
							<?php echo ht_trans('Откройте этот файл в MS Excel или в Open Office Calc');?><br /> 
							<span style='color:gray'>
								<?php echo ht_trans('кодировка: UTF-8, разделитель столбцов &mdash; tab');?><br /> 
							</span>
						</li>
						<li><?php echo ht_trans('Сохраните его в формате .xls (MS.Excel 97-2003)');?></li>
					<?php endif;?>	
					<?php if($_REQUEST['export_dest']=='seopult'): ?>
						<li><?php echo ht_trans('Откройте в SEOPult необходимый_проект->ключевые слова');?></li>
						<li><?php echo ht_trans('Найдите заголовок "Пакетная работа с ключевыми словами"');?></li>
						<li><?php echo ht_trans('Под этим заголовком будет форма для загрузки файла, благодаря которой загрузите .xls файл');?></li>
					<?php elseif($_REQUEST['export_dest']=='webeffector'): ?>
						<li><?php echo ht_trans('Создайте новый проект в WebEffector (Быстрый запуск проекта)');?></li>
						<li><?php echo ht_trans('Внизу страницы будет поле для загрузки файла (Загрузка из таблицы Excel)');?></li>
						<li><?php echo ht_trans('Загрузите в это поле .xls файл');?></li>
					<?php elseif($_REQUEST['export_dest']=='rookee'): ?>
						<li>
							<?php echo ht_trans('В Rookee в правом верхнем углу таблицы с ключевыми словами есть');?> 
							<a href="http://www.rookee.ru/post/2010/06/29/%D0%AD%D0%BA%D1%81%D0%BF%D0%BE%D1%80%D1%82-%D0%B8-%D0%B8%D0%BC%D0%BF%D0%BE%D1%80%D1%82-%D0%B2%D0%BC%D0%B5%D1%81%D1%82%D0%B5-%D0%B2%D0%B5%D1%81%D0%B5%D0%BB%D0%B5%D0%B5.aspx"
								><?php echo ht_trans('кнопка "импортировать запросы"');?> </a>, 
							<?php echo ht_trans('нажмите ее');?>
						</li>
						<li><?php echo ht_trans('Выберите этот файл и импортируйте его');?></li>
					<?php endif;?>	
				</ol>
<?php
			}
			if(isset($_POST['ajax']) && $_POST['ajax'])
				exit();
		}
		elseif($_POST['form']=='keys')
		{
			ht_proccess_key_table_update();
			echo "<h1>".ht_trans('Данные были обновлены')."</h1>"; 
		}
		elseif($_POST['form']=='synhr')
		{
			echo "<h2>".ht_trans('Были синхронизированы фильтры. Общее число изменений').": ".HTracer::SynhrFilters()."</h2>";
		}
		elseif($_POST['form']=='db_clear')
		{
			set_time_limit(600);
			HTracer::DelAllFiles('cash');
			HTracer::DelAllFiles('query');
			HTracer::TrancateTables();
			echo "<h2>".ht_trans('БД была очищена')."</h2>";
		}
		elseif($_POST['form']=='ga_import')
		{
			set_time_limit(600);
			echo '<h2>'.ht_trans('Была импортирована информация. Общее число переходов:').HTracer::ImportFromGA($_POST['data']).'</h2>';
		}
	}
	if(isset($_POST['ajax']) && $_POST['ajax'])
		exit();
	if(!$GLOBALS['htracer_mysql'])
	{		
?>
		<div class='header_message'>
			<?php echo ht_trans('Эта страница недоступна при храненении информации в файлах, а не в MySQL');?>. <br /><br />
		</div>	
<?php
		htracer_admin_footer();	
		exit();
	}
?>
<script>
	var save_str_tr='<?php echo ht_trans('Сохранить')?>';
	var saving_str='<?php echo ht_trans('Сохранение...')?>';
	var saved_str='<?php echo ht_trans('Сохранено')?>';
	var loading_str='<?php echo ht_trans('Загрузка...')?>';
	var exportg_str_tr='<?php echo ht_trans('Экспортировать')?>';
	var not_save_confirm='<?php echo ht_trans('Внесенные изменения не будут сохранены. Продолжить?')?>';
	var is_ru_lang= false;
	<?php if(ht_trans_is_ru()):?>
		is_ru_lang= true;
	<?php endif;//(!ht_trans_is_ru()):?>
</script>
	<script src="keys.js" type="text/javascript"></script>

	<form method='post' id='active_keys'>
		<table class='szebra data_table' cellspacing='0' id='keys_table'>
			<thead>	
				<tr class='header_line'>
					<th class='sc_th'><div class='hint' 
						hcontent='
							<?php echo ht_trans('Семантическое ядро');?>.<br /><br />
							<?php echo ht_trans('Если вы уберете галочку и нажмете сохранить, то ключ удалиться отовсюду кроме админки');?>.<br /><br />
							<?php echo ht_trans('Если вы хотите чтобы ключ не показывался и в админке — поставьте ему Вес=0');?>.					
							<?php echo ShowSetTableValuesForm('sc',true);?>
							<br /><br />
						'
						><?php echo ht_trans('СЯ');?></div></th>
					<th class='key_th'><div style='float:left; display:inline'><?php echo ht_trans('Ключ');?></div></th>
					<th class='out_th'>
						<div class='hint' hcontent='
							<?php echo ht_trans('Благодаря этому полю вы можете изменить отображение ключевика на сайте');?>.<br /><br />
							<?php echo ht_trans('Влияет на все кроме поисковых подсказок и meta keywords');?>.
							'><?php echo ht_trans('Написание');?>
						</div>
					</th>
					<th class='eva_th'><div class='hint' hcontent='
							<?php echo ht_trans('При стандартных настройках вес ключевика равен числу переходов по нему');?>. <br /><br />
							<?php echo ht_trans('Влияет на частоту выпадений ключевика на странице и на сайте');?>.
							<?php echo ShowSetTableValuesForm('eva',false,1);?>
							<br /><br />
						'><?php echo ht_trans('Вес');?></div></th>
					<th class='cl_th'><div class='hint' hcontent='
						<?php echo ht_trans('Разрешено ли использовать ли этот ключ для построения контекстных ссылок');?>.
						<?php echo ShowSetTableValuesForm('cl',true);?>
						<br /><br />
						'><?php echo ht_trans('КС');?></div></th>
					<th class='url_th'><div style='float:left; display:inline'><?php echo ht_trans('Страница');?></div></th>
				</tr>
				</thead>	
				<tbody></tbody>	
		</table>
		<input type='hidden' name='waspost' value='1' />
		<input type='hidden' name='form' value='keys' />
		<input type='submit' id='submit_btn' value='<?php echo ht_trans('Сохранить');?>' />
		<span style='float:right; margin-top:3px; font-size:120%; cursor:pointer; border-bottom: 1px dashed black'
			  onclick="addKey()"><?php echo ht_trans('Добавить ключевик');?></span>
	</form>
		<hr />
		<h2><?php echo ht_trans('Действия');?></h2>
		<div id="accordion">
			<?php include('actions/synhr.php'); ?>
			<h3><a href="#db_clear"><?php echo ht_trans('Удалить все ключевики');?></a></h3>
			<div>
				<form method='post'>
					<?php echo ht_trans('Удаляет всю информацию о переходах, страницах и ключевиках хранящуюся в БД HTracer');?>.<br /><br />
					<input type='hidden' name='waspost' value='1' />
					<input type='hidden' name='form' value='db_clear' />
					<input type='submit' id='clear_btn' value='<?php echo ht_trans('Отчистить БД');?>' />
				</form>
			</div>
			<h3><a href="#ga_import"><?php echo ht_trans('Импорт из Google Analitics');?></a></h3>
			<div>			
				<link rel="stylesheet" href="http://krewenki.github.com/jquery-lightbox/css/lightbox.css" type="text/css" media="screen" />
				<script src="http://github.com/krewenki/jquery-lightbox/raw/master/jquery.lightbox.js"></script>
				<script>
					$(function(){
						$(".ga_image").lightbox({
							fitToScreen: true,
							imageClickClose: false
						});
					});
				</script>
				
				<?php if($GLOBALS['htracer_mysql_set_names']=='auto' && ht_trans_is_ru()):?>
					Перед импортом данных в HTracer рекомендуеться несколько раз перейти на ваш сайт по запросам содержащим русские буквы.<br /><br />
				<?php endif;?>
				<?php echo ht_trans('Импорт данных в HTracer нужен для того, чтобы HTracer быстрее начал работать в полную силу');?>.<br />
				<?php echo ht_trans('Импорт данных следует проводить только один раз за всю работу скрипта, сразу после его установки');?>.
				<ol class="normal_ul">
					<li>
						<?php echo ht_trans('Зайдите в старую версию');?> <a href='https://www.google.com/analytics/settings/?pli=1'>Google Analitics</a> <?php echo ht_trans('и выберите сайт');?> 
					</li>
					<li>	
						<?php echo ht_trans('Перейдите в "обзор содержания"');?> 					
						(<a href="images/ga_step_1.png" title='<?php echo ht_trans('Перейдите в "обзор содержания"');?>' class="ga_image" rel="ga"
							><?php echo ht_trans('"Обзор содержания"->"посмотреть отчет"');?></a>)
					</li>
					<li>	
						<?php echo ht_trans('Нажмите по ссылке');?>
						"<a href="images/ga_step_2.png" title='<?php echo ht_trans('Нажмите по ссылке "просмотреть полный отчет"');?>' class="ga_image" rel="ga"
							><?php echo ht_trans('просмотреть весь отчет');?></a>"
					</li>
					<li>	
						<?php echo ht_trans('Вверху таблицы, рядом с надписью "страницы"');?>	
						<a href="images/ga_step_3.png"  title='<?php echo ht_trans('Вверху таблицы, рядом с надписью "страницы", есть выпадающий список("нет")');?>.' class="ga_image" rel="ga">
							<?php echo ht_trans('выпадающий список("нет")');?></a>.
						<?php echo ht_trans('Выберите в нем');?>
						"<a href="images/ga_step_3b.png" title='<?php echo ht_trans('Выберите "Ключевое слово"');?>' class="ga_image" rel="ga"
							><?php echo ht_trans('Ключевое слово');?></a>"
					</li>
					<li>	
						<?php echo ht_trans('Под таблицей есть ссылка');?>
						"<a href="images/ga_step_4.png" title='<?php echo ht_trans('Под таблицей есть ссылка расширенный фильтр шелкните на ней');?>.' class="ga_image" rel="ga"
							><?php echo ht_trans('расширенный фильтр');?></a>" <?php echo ht_trans('шелкните по ней');?>
					</li>
					<li>	
						<?php echo ht_trans('Выберите');?> 
						"<a href="images/ga_step_5.png" title='<?php echo ht_trans('Выберите "исключая" и впишите "not set" и нажмите "применить"');?>' class="ga_image" rel="ga"
							><?php echo ht_trans('исключая');?></a>", <?php echo ht_trans('впишите "not set" и нажмите "применить"');?>
					</li>
					<li>
						<?php echo ht_trans('Кликните по');?>  
						<a href="images/ga_step_6.png" title='<?php echo ht_trans('Выберите как можно больший диапозон дат');?>' class="ga_image" rel="ga"
							><?php echo ht_trans('датам');?></a>
						<?php echo ht_trans('над графиком и выберите как можно ');?>
						<a href="images/ga_step_6b.png" title='<?php echo ht_trans('Выберите как можно больший диапозон дат');?>' class="ga_image" rel="ga">
							<?php echo ht_trans('больший диапозон дат');?>
						</a>
					</li>
					<li>	
						<?php echo ht_trans('Под таблицей справа есть');?>
						<a href="images/ga_step_7.png" title='<?php echo ht_trans('Под таблицей справа есть выпадающий список("10") выберите в нем 500');?>' class="ga_image" rel="ga"
							><?php echo ht_trans('выпадающий список("10")');?>
						</a>
						<?php echo ht_trans('выберите в нем');?> 
						<a href="images/ga_step_7b.png" title='<?php echo ht_trans('Под таблицей справа есть выпадающий список("10") выберите в нем 500');?>' class="ga_image" rel="ga"
							>500</a>
					</li>
					<li>	
						<?php echo ht_trans('Вверху над графиком есть');?>
						<a href="images/ga_step_8.png" title='<?php echo ht_trans('Нажмите кнопку "Экспортировать"');?>' class="ga_image" rel="ga">
							<?php echo ht_trans('кнопка "Экспортировать"');?></a>. 
						<?php echo ht_trans('Нажмите ее и выберите');?>
						<a href="images/ga_step_8b.png" title='<?php echo ht_trans('выберите CSV');?>' class="ga_image" rel="ga">
							CSV
						</a>
					</li>
					<li>		
						<?php echo ht_trans('Файл открывайте текстовым редактором отличным от блокнота');?>
					</li>		
				</ol>
				<form method='post'>
				
					<textarea name="data" wrap="off" rows="10" style="width:720px; white-space:nowrap; font-size:90%"></textarea><br />
					<input type='hidden' name='waspost' value='1' />
					<input type='hidden' name='form' value='ga_import' />
					<input type='submit' id='import_btn' value='<?php echo ht_trans('Импортировать');?>' />
				</form>
			</div>
			<h3><a href="#csv_import"><?php echo ht_trans('Импорт из CSV');?></a></h3>
			<div>
				<?php if($GLOBALS['htracer_mysql_set_names']=='auto' && ht_trans_is_ru()):?>
					Перед импортом данных в HTracer рекомендуеться несколько раз перейти на ваш сайт по запросам содержащим русские буквы.<br /><br />
				<?php endif;?>
				<?php echo ht_trans('Импорт данных в HTracer нужен для того, чтобы HTracer быстрее начал работать в полную силу');?>.<br />
				<?php echo ht_trans('Импорт данных следует проводить только один раз за всю работу скрипта, сразу после его установки');?>.
				<ul>
					
					<li><span class='hint' hcontent='
						<ul>
							<li>CSV</li>
							<li>TSV</li>
							<li>DSV <?php echo ht_trans('с произвольным разделителем');?></li>
							<li><?php echo ht_trans('Простой список, где каждый запрос идет с новой строки');?></li>
							<li><?php echo ht_trans('Разделенные пробелом запрос и вес');?></li>
						</ul>	
						<br />
						<?php echo ht_trans('Поддерживается импорт неполных данных, когда в данных нет целевой страницы или веса запроса либо того и другого');?>.
						<?php echo ht_trans('В этом случае: URL будет уточняться из выдачи Google, а число запросов из данных Yandex.WordStat');?>.<br />
						<br />
						<?php echo ht_trans('Например, можно задать простой список запросов, где каждый запрос идет в отдельной строке');?>.
						<?php if(ht_trans_is_ru()):?>
							Однако, лучше использовать <a href="http://htracer.ru/keysyn2/1step.php">специальный сервис для составления семантического ядра</a>.<br /> 
						<?php endif;?>
					'><?php echo ht_trans('Поддерживаемые форматы');?></span></li> 
					<?php if(ht_trans_is_ru()):?>
						<li><span class='hint' hcontent='
							<ol>
								<li>Откройте страницу "http://www.liveinternet.ru/stat/<i>site.ru</i>/queries.html (вместо site.ru введите ваш домен) и введите пароль</li>
								<li>Откройте страницу "http://www.liveinternet.ru/stat/<i>site.ru</i>/queries.csv?period=month&amp;per_page=100&amp;total=yes"</li>
								<li>Скопируйте данные в поле ввода</li>
							</ol>		
						'>Как импортировать из LiveInternet?</span></li>
					<?php endif;?>
					<li><span class='hint' hcontent='
						<ol>
							<li><?php echo ht_trans('Сохраните данные в формате CSV');?></li>
							<li><?php echo ht_trans('Откройте этот файл в любом текстовом редакторе, кроме блокнота');?></li>
							<li><?php echo ht_trans('Скопируйте содержимое файла в поле ввода');?></li>
						</ol>		
					'><?php echo ht_trans('Как импортировать из MS Excel или из Open Office Calc?');?></span></li>
				</ul>
				<form method='post' action='CSV_Import.php'>
					<textarea name="CSVData" wrap="off" rows="10" style="width:720px; white-space:nowrap; font-size:90%"></textarea><br />
					<input type='hidden' name='waspost' value='1' />
					<input type='hidden' name='form' value='csv_import' />
					<input type="hidden" name="step" value="2" />
					<input type="hidden" name="ht_in_csv_import" value="1" />
					<input type='submit' id='ga_import_btn' value='<?php echo ht_trans('Импортировать');?>' />
				</form>
			</div>
		<?php if(ht_trans_is_ru()):?>
			<h3><a href="#export"><?php echo ht_trans('Экспорт');?></a></h3>
			<div>
				<table width="100%"><tr><td  valign='top'>
					<form method='post' id='export_form'>
						<b><?php echo ht_trans('Куда экспортируем');?>:</b><br />
						<select name='export_dest' id='export_dest' style='width:auto'>
							<option value='sape' checked='checked'>Sape</option>
							<option value='webeffector'>WebEffector</option>
							<option value='seopult'>SEOPult</option>
							<option value='rookee'>Rookee</option>
						</select><br />
						<b class='hint' hcontent='
							<?php echo ht_trans('Число страниц ключи которых будут экспортироваться');?>.<br /><br />
							<?php echo ht_trans('Однако, из-за отсутствия необходимого числа страниц в БД число экспортируемых страниц часто получается меньше этого значения');?>.
						'><?php echo ht_trans('Максимум страниц');?>:</b><br />
						<input name='maxpages' id='maxpages' value='100' size='5' /><br />
						<b id='b_needtop' hcontent='
							<?php echo ht_trans('От 1 до 50. На какую позицию необходимо выйти по ключевым словам');?>.
						'><?php echo ht_trans('Требуемый топ');?>:</b><br />
						<input name='needtop' id='needtop' value='10' size='5' /><br />
						<b class='hint' id='b_budget' hcontent='
							<?php echo ht_trans('Бюджет между ключами распределяется пропорционально их весу');?>.<br /><br />
							<?php echo ht_trans('Если бюджет ключа меньше 25 руб в месяц для SEO пульта и 1 руб для WebEffector, то страница не будет экспортироваться');?>. 
						'><?php echo ht_trans('Общий бюджет');?>:</b><br />
						<input name='budget' id='budget' value='1000' size='5' /> <span id='s_rub'><?php echo ht_trans('руб/месяц')?></span><br />
						<br />
						<input type='hidden' name='waspost' value='1' />
						<input type='hidden' name='form' value='export' />
						<input type='submit' id='export_btn' value='<?php echo ht_trans('Экспортировать');?>' />
					</form>
				</td><td id='logos_td' align='center'>
					<img src='images/sape.jpg'        id="sape_img" 		onclick="$('#export_dest').val('sape'); $('#export_dest').trigger('change');" />
					<img src='images/webeffector.png' id="webeffector_img" onclick="$('#export_dest').val('webeffector'); $('#export_dest').trigger('change');" />
					<br />
					<img src='images/seopult.png'     id="seopult_img" 	onclick="$('#export_dest').val('seopult'); $('#export_dest').trigger('change');" />
					<img src='images/rookee.jpg'      id="rookee_img" 		onclick="$('#export_dest').val('rookee'); $('#export_dest').trigger('change');" />
				</td></tr></table>
			</div>
		<?php endif;?>	
		</div>	
<?php htracer_admin_footer();?>	