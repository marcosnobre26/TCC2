<?php

    var_dump($_POST['id']);
    
    $id=$_POST['id'];
    $nome=$_POST['nome'];
    $foto=$_POST['foto'];
    
    $pdo = new PDO("mysql:host=localhost;dbname=simulador", "root", "");    
     
    try {
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);        
        $stmt = $pdo->prepare("INSERT INTO tb_login_facebook (nome, foto, id_facebook) VALUES('$nome', '$id', '$foto')");      
        //echo $stmt->rowCount();
    } catch(PDOException $e) {
        echo 'Error: ' . $e->getMessage();
    }




?>