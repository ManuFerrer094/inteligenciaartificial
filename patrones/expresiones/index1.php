<?php

    $loquebuscas = "Pep";
    $dondelobuscas = "Pepe vino a verme esta mañana";
    
    
    if(strpos($dondelobuscas, $loquebuscas) !== false){
        echo "Efectivamente existe la palabra Pepe dentro del string";
    }else{
        echo "No parece que este";
    }

?>