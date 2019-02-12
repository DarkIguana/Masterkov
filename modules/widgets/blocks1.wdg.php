<?
class blocks1 extends admin
{
	var $over = '';

	function __construct()
	{
		if(isset($_GET['pages']) && $_GET['pages']!=4)
		{
			$this->over=<<<HTML
				<div class="block9b">
					<ul class="options">
						<li><a href="#price" class="opt1">Прайс лист</a></li>
						<li><a href="#photo" class="opt2">Фото выполненных работ</a></li>
					</ul>
					<div style="clear: both"></div>
				</div>
HTML;
		}
	}

}