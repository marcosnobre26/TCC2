<?php

    $id=$_POST['id'];
    $nome=$_POST['nome'];
    $email=$_POST['email'];
    $foto=$_POST['foto'];
    $tipo=$_POST['tipo'];
    $senha=$_POST['senha'];
    
    $pdo = new PDO("mysql:host=localhost;dbname=simulador", "root", "");
     
    try {
        $cont=0;
        $consulta = $pdo->query("SELECT nome, id_conta FROM perfil;");
        while ($linha = $consulta->fetch(PDO::FETCH_ASSOC)) {

            if($linha['nome']===$nome && $linha['id_conta']===$id)
            {
                $cont=$cont+1;//quer dizer que o registro já existe
            }
        }

        if($cont==0){
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);        
            $stmt = $pdo->prepare("INSERT INTO perfil (nome, foto, email, id_conta, tipo, senha) VALUES(:nome, :foto, :email, :id_conta, :tipo, :senha)");      
            $stmt->execute(array(
                ':nome' => $nome,
                ':foto' => $foto,
                ':email' => $email,
                ':id_conta' => $id,
                ':tipo' => $tipo,
                ':senha' => $senha
              ));
            
            echo $stmt->rowCount();
        }
        
    } catch(PDOException $e) {
        echo 'Error: ' . $e->getMessage();
    }

    function input($name, $default = null) {

        if(isset($_GET[$name])) {
            return $_GET[$name];
        }

        
        if(isset($_POST[$name])) {
            return $_POST[$name];
        }

        return $default;
    }