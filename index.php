<link rel="stylesheet" type="text/css" href="libs/jquery-ui/css/jquery-ui.css">
<script src="libs/jquery/jquery.min.js"></script>
<script src="libs/jquery-ui/js/jquery-ui.min.js"></script>
<script src="js/autocomplete.js"></script>

<?php  
    function autocomplete($label) {
        echo "<div class='auto-complete'>";
        echo "  <p>$label: <input type='text' id='skill_input'/></p>";
        echo "  <ul id='autocomplete_items' class='ui-menu-item'></ul>";
        echo "</div>";
    }
?>

<?php  
    echo (autocomplete('Algo'))
?>

