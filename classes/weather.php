<?
class weather_class extends glb {
	var $City = 27;
	var $city_id = 0;
	var $over="";
	var $weather_table	= "weather_forecast";
	var $current_table	= "weather_current";
	var $city_table		= "weather_city";
	var $country_table	= "weather_country";

	var $weather_data	= array();
	var $current_data	= array();
	var $city_data		= array();
	var $country_data	= array();

	var $aviableData	= false;
	var $aviableRecords	= 0;
	var $limit_days		= 5;

	// current weather options
	var $max_current_time_delay = 10; // in hours


	var $unionSeparator = " .. ";
	var $date_text_format = "%d.%m.%Y";

	// separators for union
	var $t_separator = " .. ";
	var $p_separator = "-";
	var $w_separator = "-";
	var $sw_separator = "-";
	var $h_separator = "-";

	var $t_order = "DESC";

	// visual data manipulation
	var $visual_datetext_change = true;
	var $visual_daytext_add = true;
	var $visual_timeofday_add = true;
	var $visual_cloudimage_add = true;
	var $visual_cloudtext_add = true;
	var $visual_windtext_add = true;

	var $visual_tunion_add = true;
	var $visual_punion_add = true;
	var $visual_wunion_add = true;
	var $visual_swunion_add = true;
	var $visual_hunion_add = true;

	var $light_wind_rumb = false;
	var $current_vector_transform = true;
	var $register_hits = false;

	function setTitle($til)
	{
		
		$_SESSION['Titles']['title'] = $_SESSION['Titles']['title']." / Погода / $til";
	}
	
	/*
	function construct()
	{
		$d="";
		if (!isset($_GET['city']) && !isset($_GET['country']))
		{
			$d.="<center><h2>Выберите свою странну</h2></center>";
			$sql = mysql_query("select * from `weather_country` order by `name`");
			$i=0;
			$d.="<p>&nbsp;</p>";
			$d.="<table width='100%'><tr>";
			$num = mysql_num_rows($sql);
			$col = ceil($num/3);
			
			while ($row = mysql_fetch_array($sql))
			{
				$i++;
				if ($i==1)
				{
					$d.="<td width='33%' height='25'>";
				}
				$d.="<a href='?weather&country=$row[id]'><b>$row[name]</b></a><br><br>";
				if ($i==$col)
				{
					$d.="</td>";
					$i=0;
				}
				
			}
			$d.="</tr></table>";
			$this->over = $d;
		}
		elseif (isset($_GET['country']))
		{
			$country = $this->getCountryOb($_GET['country'])->name;
			$this->setTitle($country);
			$d.="<a href='?weather'>Погода</a> / $country &nbsp;&nbsp;&nbsp;&nbsp; <a href='?weather'>Выбрать другую страну</a>";
			$d.="<center><h2>Выберите свой город</h2></center>";
			$sql = mysql_query("select * from `weather_city` where `country_id`='$_GET[country]' order by `name`");
			$i=0;
			$d.="<p>&nbsp;</p>";
			$d.="<table width='100%'><tr>";
			$num = mysql_num_rows($sql);
			$col = ceil($num/3);
			
			while ($row = mysql_fetch_array($sql))
			{
				$i++;
				if ($i==1)
				{
					$d.="<td width='33%' height='25'>";
				}
				$d.="<a href='?weather&city=$row[id]'><b>$row[name]</b></a><br><br>";
				if ($i==$col)
				{
					$d.="</td>";
					$i=0;
				}
				$this->word_for_keys($row['name']);
			}
			$d.="</tr></table>";
			$this->over = $d;
		}
		else
		{
			$city = $this->getCityOb($_GET['city']);
				$this->setTitle("$city->country / $city->name");
			if ($city != false)
			{
			$d.= '<p><a href="?weather">Погода</a> / <a href="?weather&country='.$city->country_id.'">'.$city->country.'</a> / '.$city->name.'</p>';
			$this->setCityID($_GET['city']);
			$d.=$this->VisualWeather($this->getWeather());
			$this->over = $d;
			$this->word_for_keys("$city->country,$city->name");
			}
			else 
			{
				$this->over = "<center>Город не найден</center>";
			}
		}
		
	}
	*/
	function getCityOb($idCity)
	{
		$sql = mysql_query("select * from `weather_city` where `id`='$idCity'");
		if (mysql_num_rows($sql)>0)
		{
			$dbl = mysql_fetch_object($sql);
			return $dbl;
		}
		else {
			return false;
		}
	}
	function getCountryOb($idCity)
	{
		$sql = mysql_query("select * from `weather_country` where `id`='$idCity'");
		if (mysql_num_rows($sql)>0)
		{
			$dbl = mysql_fetch_object($sql);
			return $dbl;
		}
		else {
			return false;
		}
	}
	function VisualWeather($array)
	{
			$d='<link rel="stylesheet" href="template/default/css/weather.css" />';
		foreach ($array as $va=>$date)
		{
			if (!preg_match("/[а-я]/is", $date[0]['date_text_visual'])){$todayText =$date[0]['day_text_visual']; $dt = $date[0]['date_text_visual'];}else{$todayText=$date[0]["date_text_visual"]; $dt = date("d.m.Y", strtotime($date[0]['date']));}
				$d.='<table  class="b-forecast-details"><tbody class="near">
            <tr class="header">
                <th class="day"></th>
                <th class="date"></th>
              
                <th class="t"></th>
                <th class="icon"></th>
                <th class="data"></th>
                <th class="pressure">мм&nbsp;рт.&nbsp;ст.</th>

                <th class="moisture"></th>
                <th class="wind">м/с</th>
                <th class="wind-icon"></th>
                <th class="addon"></th>
            </tr>
            <tr class="t18 weekend">
                <th rowspan="4">&nbsp;</th>
                <th class="date" rowspan="4"><h title="погода на '.$todayText.'"><strong>погода на <br />'.$todayText.' <br /> <small>'.$dt.'</small></strong></h3></th>';
				$date =array_reverse($date);
			foreach ($date as $s)
				{
					
				
					$hour_text_visual = $s['hour_text_visual'];
					$cloud_text = $s['cloud_text'];
					$cloud_image = $s['cloud_image'];
					$h_union = $s['h_union'];
					$p_union = $s['p_union'];
					$t_union =  $s['t_union'];
					$w_union = $s['w_union'];
					$w_rumb_text = $s['w_rumb_text'];
			

              
              $d.='<td class="t"><strong>'.$hour_text_visual.'</strong> <span>'.$t_union.'</span></td>
                <td class="icon"><img src="images/clipart/'.$cloud_image.'" alt="'.$cloud_text.'" height="52" /></td>
                <td class="data">'.$cloud_text.'</td>
                <td class="pressure">'.$p_union.'</td>

                <td class="moisture">'.$h_union.'%</td>
                <td class="wind">'.$w_rumb_text.'<br />'.$w_union.' </td>
                <td class="wind-icon"></td>
               
            </tr>';
				}
				$d.="</table>";
		}
	    return $d;
	}
	

	function setCityID ($city_id) {
		if ((int)$city_id > 0) {
			$this->city_id = $city_id;
		}
	}
	function setDayLimit ($limit) {
		if ((int)$limit > 0) {
			$this->limit_days = $limit;
		}
	}
	function setRegisterHit ($register) {
		if ((bool)$register == true) {
			$this->register_hits = true;
		} else $this->register_hits = false;
	}
	function setUnionSeparator ($separator, $key_name = "") {
		if ($key_name == "")
		$this->unionSeparator = $separator;
		else {
			$key_name .= "_separator";
			$this->$key_name = $separator;
		}
	}
	function disableCurrentVectorTransform() {
		$this->current_vector_transform = false;
	}

	function disableAllVisual () {
		$this->visual_datetext_change = false;
		$this->visual_daytext_add = false;
		$this->visual_timeofday_add = false;
		$this->visual_cloudimage_add = false;
		$this->visual_cloudtext_add = false;
		$this->visual_windtext_add = false;

		$this->visual_tunion_add = false;
		$this->visual_punion_add = false;
		$this->visual_wunion_add = false;
		$this->visual_swunion_add = false;
		$this->visual_hunion_add = false;
	}

	/**
	 * return info about city (one of many)
	 * possible options (all options are optional)
	 * 		array (
	 *			'city_id' => 10,
	 *			'country_id' => '804',
	 *			'country' => 'Россия',
	 * 		)
	 */
	function getCityList($options = array()) {
		$local_city_data = array();
		$where = array();

		# possible options of filtering
		if (!empty($options['city_id']))
		$where[] = "id = ".$options['city_id'];
		if (!empty($options['country_id']))
		$where[] = "country_id = ".$options['country_id'];
		if (!empty($options['country']))
		$where[] = "country = ".$options['country'];

		# build SQL request
		$_sql = "SELECT `id`, `name`, `region`, `country`, `country_id`
				FROM `%s` %s ORDER BY `name` ASC";
		$sql = sprintf($_sql,
		$this->city_table,
		!empty($where) ? "WHERE ".implode(" AND ", $where) : ""
		);
		$result = mysql_query($sql);

		while ($_city = mysql_fetch_assoc($result)) {
			$this->city_data[$_city['id']] = array (
			'id'		=> $_city['id'],
			'name'		=> $_city['name'],
			'region'	=> $_city['region'],
			'country'	=> $_city['country'],
			'country_id'=> $_city['country_id'],
			);
			$local_city_data[] = $this->city_data[$_city['id']];
		}

		return $local_city_data;
	}


	/**
	 * get info about ONE city
	 */
	function getCity($city_id) {
		return !empty($this->city_data[$city_id]) ? array($this->city_data[$city_id]) : $this->getCityList(array('city_id' => $city_id));
	}

	function getCityName($city_id) {
		$city_name = "CITY NAME NOT FOUND";

		$city_data = $this->getCity($city_id);
		if (!empty($city_data)) {
			$city_name = $city_data[0]['name'];
		}
		return $city_name;
	}


	/**
	 * return info about country (one of many)
	 * possible options (all options are optional)
	 * 		array (
	 *			'country_id' => '804'
	 * 		)
	 */
	function getCountryList($options = array()) {
		$local_country_data = array();
		$where = array();

		# possible options of filtering
		if (!empty($options['country_id']))
		$where[] = "id = ".$options['country_id'];

		# build SQL request
		$_sql = "SELECT `id`, `iso2`, `iso3`, `name`
				FROM `%s` %s ORDER BY `name` ASC";
		$sql = sprintf($_sql,
		$this->country_table,
		!empty($where) ? "WHERE ".implode(" AND ", $where) : ""
		);
		$result = mysql_query($sql);

		while ($_city = mysql_fetch_assoc($result)) {
			$this->country_data[$_city['id']] = array (
			'id'	=> $_city['id'],
			'iso2'	=> $_city['iso2'],
			'iso3'	=> $_city['iso3'],
			'name'	=> $_city['name'],
			);
			$local_country_data[] = $this->country_data[$_city['id']];
		}

		return $local_country_data;
	}


	/**
	 * get info about ONE city
	 */
	function getCountry($country_id) {
		return !empty($this->country_data[$country_id]) ? array($this->country_data[$country_id]) : $this->getCountryList(array('country_id' => $country_id));
	}

	function getCountryName($country_id) {
		$country_name = "COUNTRY NAME NOT FOUND";

		$country_data = $this->getCountry($country_id);
		if (!empty($country_data)) {
			$country_name = $country_data[0]['name'];
		}
		return $country_name;
	}


	/**
	 * MAIN CLASS FUNCTION
	 * get weather forecast for some city into array
	 */
	function getWeather($options = array()) {
		if ($this->getWeatherData($options)) {
			$this->processingWeatherData();
			// register hit data to weather
			if ((bool)$this->register_hits)
			$this->_registerHits();
		}
		return $this->weather_data;
	}


	function getCurrent($options = array()) {
		if ($this->_getCurrentData($options)) {
			$this->_processingCurrentData();
		}
		// if we have only one data return it as simply vector (not array)
		return count($this->current_data)==1&&(bool)$this->current_vector_transform ? $this->current_data[0] : $this->current_data;
	}

	// for older version support
	function getCurrentWeather($options = array()) {
		return $this->getCurrent($options);
	}

	function _getCurrentData($options = array()) {

		$where = array();
		$where[] = sprintf("city_id = %d", $this->city_id);

		// check options for current hour
		if (!empty($options['from_date'])) {
			$where[] = "date >= '".$options['from_date'].":00:00'";
			if (!empty($options['to_date'])) {
				$where[] = "date <= '".$options['to_date'].":00:00'";
			}
			$order_and_limit = "ORDER BY id ASC";
		}
		else {
			$where[] = sprintf("date > DATE_SUB(NOW(), INTERVAL %d HOUR)", $this->max_current_time_delay);
			$order_and_limit = "ORDER BY id DESC LIMIT 1";
		}

		$_sql = "SELECT DISTINCT `city_id`, `date`, `cloud`, `t`, `t_flik`, `p`, `w`, `w_rumb`, `h`,
					`last_updated` date_add, DATE_FORMAT(last_updated, '%%H') hour, UNIX_TIMESTAMP(`last_updated`) date_text
				FROM %s WHERE %s %s";
		$sql = sprintf($_sql,
		$this->current_table,
		implode(" AND ", $where),
		$order_and_limit
		);

		$res = mysql_query($sql);

		if (mysql_num_rows($res) > 0) {
			while($_temp = mysql_fetch_assoc($res)) {
				$this->current_data[] = $_temp;
			}
			return true;
		}
		else return false;
	}

	function _processingCurrentData() {
		foreach ($this->current_data as $key=>$wd) {
			// image for site
			if ($this->visual_cloudimage_add) {
				$wd["cloud_image"] = $this->getCloudImage($wd["cloud"]);
				$wd["cloud_image_timed"] = $this->getTimedCloudImage($wd["hour"], $wd["cloud"]);
			}
			// windtext
			if ($this->visual_windtext_add)
			$wd["w_rumb_text"] = $this->getTextWind($wd["w_rumb"]);

			// plus + temp
			if ($wd["t"] > 0)
			$wd["t"] = "+".$wd["t"];

			// plus + temp
			if ($wd["t_flik"] > 0)
			$wd["t_flik"] = "+".$wd["t_flik"];

			// image text
			if ($this->visual_cloudtext_add) {
				$wd["cloud_text"] = $this->getCloudText($wd["cloud"]);
			}

			$wd['updated'] = date('d.m H:i', $wd['date_text']);
			$wd['date_interval'] = $this->_getTextDateInterval($wd['date_text']);

			// store WD processed data
			$this->current_data[$key] = $wd;
		}
		return;
	}



	########################################################################
	#                                                                      #
	#                        Data select section                           #
	#                                                                      #
	########################################################################

	function getWeatherData($options = array()) {
		if ($this->checkDataInSystem()) {
			$this->weather_data = array();

			// where section
			$where = array(
			sprintf("w.city_id = %d", $this->city_id),
			);

			// sort date (night on first or on last place)
			$date_sort = !empty($options['night_date_sub']) ? true : false;


			if (!empty($options['from_date'])) {
				$date_parce = explode(" ", $options['from_date']);
				$hour = "";
				if (!empty($date_parce[1])) {
					$hour = (int)$date_parce[1];
				}
				$where[] = "((w.date >= '".$date_parce[0]."'".($hour != "" ? " AND w.hour >= '".$hour."') OR (w.date > '".$date_parce[0]."'" : "")."))";

				if (!empty($options['to_date'])) {
					$date_parce = explode(" ", $options['to_date']);
					$hour = "";
					if (!empty($date_parce[1])) {
						$hour = (int)$date_parce[1];
					}
					$where[] = "((w.date <= '".$date_parce[0]."'".($hour != "" ? " AND w.hour <= '".$hour."') OR (w.date < '".$date_parce[0]."'" : "")."))";
				}

			}
			else {
				//$where[] = sprintf("((w.date = CURDATE() AND w.hour > %d) OR w.date > CURDATE())", date("G")+3);

				if ($this->limit_days > 0) {
					$where[] = sprintf("(w.date < DATE_ADD(CURDATE(), INTERVAL %d DAY) OR (w.date < DATE_ADD(CURDATE(), INTERVAL %d DAY) AND w.hour < %d))",
					$this->limit_days,
					$this->limit_days+1,
					date("G")+3
					);
				}
			}

			// sql section
			$_sql = "
				SELECT UNIX_TIMESTAMP(date) date_text,
					DATE_FORMAT(date, '%%w') day, UNIX_TIMESTAMP(date) date_unix, DATE_SUB(w.date, INTERVAL 1 DAY) date_night,
					date, hour, cloud, precip, t_min, t_max, p_min, p_max, w_min, w_max, w_rumb, h_min, h_max, wpi AS accuracy
				FROM %s w
				WHERE %s
				ORDER BY w.date, w.hour DESC
			";
			$sql = sprintf($_sql,
			$this->weather_table,
			implode(" AND ", $where)
			);
			$result = mysql_query($sql);

			while($data = mysql_fetch_assoc($result)) {

				if ($data['date_text'] == mktime(0,0,0,date('m'),date('d'),date('Y')) || ($date_sort && $data['date_text'] == mktime(0,0,0,date('m'),date('d')+1,date('Y')) && $data['hour'] >=0 && $data['hour'] < 6)) {
					$data['date_text'] = 'today';
					$date = date('Y-m-d');
				}
				elseif ($data['date_text'] == mktime(0,0,0,date('m'),date('d')+1,date('Y')) || ($date_sort && $data['date_text'] == mktime(0,0,0,date('m'),date('d')+2,date('Y')) && $data['hour'] >=0 && $data['hour'] < 6)) {
					$data['date_text'] = 'tomorrow';
					$date = date('Y-m-d', mktime(0,0,0,date('m'),date('d')+1,date('Y')));
				}
				elseif ($date_sort && $data['hour'] >=0 && $data['hour'] < 6) {
					$date = date('Y-m-d', $data['date_text']-60*60*23);
					$data['date_text'] = date('d.m.Y', $data['date_text']-60*60*23);
				}
				else {
					$date = date('Y-m-d', $data['date_text']);
					$data['date_text'] = date('d.m.Y', $data['date_text']);
				}

				$this->weather_data[$date][] = $data;
			}

		}
		else {
			return false;
		}
		return true;
	}

	function checkDataInSystem() {
		$this->aviableData = false;
		$_sql = "
			SELECT COUNT(*) count FROM ".$this->weather_table." w
			WHERE w.city_id = %d AND ((w.date = CURDATE() AND w.hour > %d) OR (w.date > CURDATE()))
		";
		$sql = sprintf($_sql,
		$this->city_id,
		date("G")-3
		);
		$res = mysql_query($sql);
		if(($this->aviableRecords = mysql_result($res, 0, "count")) > 0)
		$this->aviableData = true;

		return $this->aviableData;
	}

	function sortWeatherData($sort_param) {
		$new_weather_data = array();
		foreach ($this->weather_data as $data => $weather_data) {
			foreach ($weather_data as $weather) {
				$new_weather_data[$data][$weather[$sort_param]][] = $weather;
			}
		}
		return $new_weather_data;
	}


	######################################
	# Visual section

	function processingWeatherData() {
		foreach ($this->weather_data as $date => $weather_item) {
			foreach ($weather_item as $w_key => $w_value) {
				$wd = &$this->weather_data[$date][$w_key];
				// text date localized
				if ($this->visual_datetext_change)
				$wd["date_text_visual"] = $this->getTextDate($w_value["date_text"], $date);
				// add day text
				if ($this->visual_daytext_add)
				$wd["day_text_visual"] = $this->getTextDay($w_value["day"]);
				// add time of day
				if ($this->visual_timeofday_add) {
					$wd["hour_text"] = $this->getTimeOfDay($w_value["hour"]);
					$wd["hour_text_visual"] = $this->getTextTimeOfDay($w_value["hour"]);
				}
				// image for site
				if ($this->visual_cloudimage_add) {
					$wd["cloud_image"] = $this->getCloudImage($w_value["cloud"]);
					$wd["cloud_image_timed"] = $this->getTimedCloudImage($w_value["hour"], $w_value["cloud"]);
				}

				// image text
				if ($this->visual_cloudtext_add) {
					$wd["cloud_text"] = $this->getCloudText($w_value["cloud"]);
				}

				// union processing data
				if ($this->visual_tunion_add)
				$wd["t_union"] = $this->getUnionData($w_value["t_min"], $w_value["t_max"], false, $this->t_separator, $this->t_order);
				if ($this->visual_punion_add)
				$wd["p_union"] = $this->getUnionData($w_value["p_min"], $w_value["p_max"], true, $this->p_separator);
				if ($this->visual_wunion_add)
				$wd["w_union"] = $this->getUnionData($w_value["w_min"], $w_value["w_max"], true, $this->w_separator);
				if ($this->visual_hunion_add)
				$wd["h_union"] = $this->getUnionData($w_value["h_min"], $w_value["h_max"], true, $this->h_separator);

				// windtext
				if ($this->visual_windtext_add)
				$wd["w_rumb_text"] = $this->getTextWind($w_value["w_rumb"]);
			}
		}
	}



	function getTextDate ($date, $orig_date) {
		$textDate = array(
		"today" => array(
		"small"	=> "Сег.",
		"full"	=> "Сегодня",
		),
		"tomorrow" => array(
		"small"	=> "Зав.",
		"full"	=> "Завтра",
		),
		);
		$textType = !empty($this->weather_data[$orig_date]) && count($this->weather_data[$orig_date]) > 1 ? "full" : "small";

		if (isset($textDate[$date][$textType]))
		$date = $textDate[$date][$textType];

		return $date;
	}



	function getTextDay ($day) {
		switch ($day) {
			case 0: $printDay = 'Вс'; break;
			case 1: $printDay = 'Пн'; break;
			case 2: $printDay = 'Вт'; break;
			case 3: $printDay = 'Ср'; break;
			case 4: $printDay = 'Чт'; break;
			case 5: $printDay = 'Пт'; break;
			case 6: $printDay = 'Сб'; break;
		}

		return $printDay;
	}

	function getTimeOfDay ($hour) {
		if( $hour >= 0 && $hour < 6 )
		$hour = 0;
		elseif ( $hour >= 6 && $hour < 12 )
		$hour = 1;
		elseif ( $hour >= 12 && $hour < 18 )
		$hour = 2;
		elseif ( $hour >= 18 && $hour <= 23 )
		$hour = 3;
		return $hour;
	}


	function getTextTimeOfDay ($hour) {
		$hour = $this->getTimeOfDay($hour);
		switch($hour) {
			case 0: $hour = "ночь"; break;
			case 1: $hour = "утро"; break;
			case 2: $hour = "день"; break;
			case 3: $hour = "вечер"; break;
		}

		return $hour;
	}


	function getTextWind($wind) {
		if (preg_match("/^\d{1,3}$/", $wind)) {
			$wind = $this->light_wind_rumb ? $this->getLightTextRumb($wind) : $this->getTextRumb($wind);
		}
		switch($wind) {
			case "N":	$wind_direction = "С"; break;
			case "NNE":	$wind_direction = "С,С-В"; break;
			case "NE":	$wind_direction = "С-В"; break;
			case "ENE":	$wind_direction = "В,С-В"; break;
			case "E":	$wind_direction = "В"; break;
			case "ESE":	$wind_direction = "В,Ю-В"; break;
			case "SE":	$wind_direction = "Ю-В"; break;
			case "SSE":	$wind_direction = "Ю,Ю-В"; break;
			case "S":	$wind_direction = "Ю"; break;
			case "SSW":	$wind_direction = "Ю,Ю-З"; break;
			case "SW":	$wind_direction = "Ю-З"; break;
			case "WSW":	$wind_direction = "З,Ю-З"; break;
			case "W":	$wind_direction = "З"; break;
			case "WNW":	$wind_direction = "З,С-З"; break;
			case "NW":	$wind_direction = "С-З"; break;
			case "NNW":	$wind_direction = "С,С-З"; break;
		}

		return $wind_direction;
	}

	function getTextRumb ($w_rumb) {
		if ($w_rumb >=0 && $w_rumb < 20) $wind_direction = "N";
		elseif ($w_rumb >=20 && $w_rumb < 35) $wind_direction = "NNE";
		elseif ($w_rumb >=35 && $w_rumb < 55) $wind_direction = "NE";
		elseif ($w_rumb >=55 && $w_rumb < 70) $wind_direction = "ENE";
		elseif ($w_rumb >=70 && $w_rumb < 110) $wind_direction = "E";
		elseif ($w_rumb >=110 && $w_rumb < 125) $wind_direction = "ESE";
		elseif ($w_rumb >=125 && $w_rumb < 145) $wind_direction = "SE";
		elseif ($w_rumb >=145 && $w_rumb < 160) $wind_direction = "SSE";
		elseif ($w_rumb >=160 && $w_rumb < 200) $wind_direction = "S";
		elseif ($w_rumb >=200 && $w_rumb < 215) $wind_direction = "SSW";
		elseif ($w_rumb >=215 && $w_rumb < 235) $wind_direction = "SW";
		elseif ($w_rumb >=235 && $w_rumb < 250) $wind_direction = "WSW";
		elseif ($w_rumb >=250 && $w_rumb < 290) $wind_direction = "W";
		elseif ($w_rumb >=290 && $w_rumb < 305) $wind_direction = "WNW";
		elseif ($w_rumb >=305 && $w_rumb < 325) $wind_direction = "NW";
		elseif ($w_rumb >=325 && $w_rumb < 340) $wind_direction = "NNW";
		else $wind_direction = "N";
		return $wind_direction;
	}

	function getLightTextRumb ($w_rumb) {
		if ($w_rumb >=0 && $w_rumb < 35) $wind_direction = "N";
		elseif ($w_rumb >=35 && $w_rumb < 70) $wind_direction = "NE";
		elseif ($w_rumb >=70 && $w_rumb < 125) $wind_direction = "E";
		elseif ($w_rumb >=125 && $w_rumb < 160) $wind_direction = "SE";
		elseif ($w_rumb >=160 && $w_rumb < 215) $wind_direction = "S";
		elseif ($w_rumb >=215 && $w_rumb < 250) $wind_direction = "SW";
		elseif ($w_rumb >=250 && $w_rumb < 305) $wind_direction = "W";
		elseif ($w_rumb >=305 && $w_rumb < 340) $wind_direction = "NW";
		else $wind_direction = "N";
		return $wind_direction;
	}


	function getCloudImage($precip) {
		if($precip >= 0 && $precip < 10) {
			$image = "_0_sun.gif";
		}
		elseif($precip >= 10 && $precip < 20) {
			$image = "_1_sun_cl.gif";
		}
		elseif($precip >= 20 && $precip < 30) {
			$image = "_2_cloudy.gif";
		}
		elseif($precip >= 30 && $precip < 40) {
			$image = "_3_pasmurno.gif";
		}
		elseif($precip >= 40 && $precip < 50) {
			$image = "_4_short_rain.gif";
		}
		elseif($precip >= 50 && $precip < 60) {
			$image = "_5_rain.gif";
		}
		elseif($precip >= 60 && $precip < 70) {
			$image = "_6_lightning.gif";
		}
		elseif($precip >= 70 && $precip < 80) {
			$image = "_7_hail.gif";
		}
		elseif($precip >= 80 && $precip < 90) {
			$image = "_8_rain_swon.gif";
		}
		elseif($precip >= 90 && $precip < 100) {
			$image = "_9_snow.gif";
		}
		elseif($precip >= 100 && $precip < 110) {
			$image = "_10_heavy_snow.gif";
		}
		else {
			$image = "_255_NA.gif";
		}
		return $image;
	}

	function getCloudText($precip) {
		if($precip >= 0 && $precip < 10) {
			$image = "Ясно";
		}
		elseif($precip >= 10 && $precip < 20) {
			$image = "Небольшая облачность";
		}
		elseif($precip >= 20 && $precip < 30) {
			$image = "Облачно";
		}
		elseif($precip >= 30 && $precip < 40) {
			$image = "Пасмурно";
		}
		elseif($precip >= 40 && $precip < 50) {
			$image = "Кратковременные дожди";
		}
		elseif($precip >= 50 && $precip < 60) {
			$image = "Дождь";
		}
		elseif($precip >= 60 && $precip < 70) {
			$image = "Гроза";
		}
		elseif($precip >= 70 && $precip < 80) {
			$image = "Град";
		}
		elseif($precip >= 80 && $precip < 90) {
			$image = "Снег с дождем";
		}
		elseif($precip >= 90 && $precip < 100) {
			$image = "Небольшой снег";
		}
		elseif($precip >= 100 && $precip < 110) {
			$image = "Снег";
		}
		else {
			$image = "";
		}

		return $image;
	}

	function getTimedCloudImage ($hour, $precip) {
		$hour_numeric = $this->getTimeOfDay($hour);
		$image = $this->getCloudImage($precip);

		return (in_array($hour_numeric, array(0,3)) ? str_replace("sun", "moon", $image) : $image);
	}


	function getUnionData($min, $max, $unsigned = true, $separator = false, $order = "") {
		if ($separator === false)
		$separator = $this->unionSeparator;

		if (empty($order))
		$order = $unsigned == true ? "ASC" : "DESC";

		if (!$unsigned) {
			if($min > 0) $min = "+".$min; elseif($min < 0) $min = "".$min;
			if($max > 0) $max = "+".$max; elseif($max < 0) $max = "".$max;
		}

		return ($min==$max ? $min : ($order == "ASC" ? $min.$separator.$max : $max.$separator.$min));
	}

	function _getTextDateInterval ($date_from, $date_to = 0) {
		if ($date_to == 0) $date_to = time();

		$diff = abs($date_to - $date_from);
		$return_text = "";

		$text_array = array(
		" секунд",
		" минут",
		"1 час",
		"1&frac12; часа",
		" часа",
		" день"
		);

		if ($diff < 60 ) $textDateInterval = (int)($diff).$text_array[0];
		elseif ($diff >= 60 && $diff < 3600 ) $textDateInterval = (int)($diff/60).$text_array[1];
		elseif ($diff >= 3600 && $diff < 5400 ) $textDateInterval = $text_array[2];
		elseif ($diff >= 5400 && $diff < 7200 ) $textDateInterval = $text_array[3];
		elseif ($diff >= 7200 && $diff < 86400 ) $textDateInterval = (int)($diff/3600).$text_array[4];
		elseif ($diff >= 86400 && $diff < 1209600 ) $textDateInterval = (int)($diff/86400).$text_array[5];
		else $textDateInterval = date('d.m H:i');

		return $textDateInterval;
	}

}


//<link href="style.css" rel="stylesheet" type="text/css" media="screen, projection"/>
