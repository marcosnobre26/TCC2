<?php
    $email=(isset($_POST['form34']))? $_POST['form34']: '';
    //$email=$_POST['form34'];
    var_dump($_POST);
    var_dump($email);

    if(isset($_FILES['pic']))
    {
        $ext = strtolower(substr($_FILES['pic']['name'],-4)); //Pegando extensão do arquivo
        $new_name = date("Y.m.d-H.i.s");// . $ext; //Definindo um novo nome para o arquivo
        $dir = './images/'; //Diretório para uploads 
        move_uploaded_file($_FILES['pic']['tmp_name'], $dir.$new_name.$ext); //Fazer upload do arquivo
        echo("Imagen enviada com sucesso!");
    } 
?>