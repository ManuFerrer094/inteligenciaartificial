<?php
 $email = "asdsdñF@asdf.com"; 
 $regex = '/^[_a-zñ0-9-]+(\.[_a-zñ0-9-]+)*@[a-zñ0-9-]+(\.[a-zñ0-9-]+)*(\.[a-z]{2,3})$/i'; 
 if(preg_match($regex, $email)){
     echo "El email es valido";
     
 }else{
     echo "invalid email";
     
 }
 

?>