<?php

    var_dump($_POST['id']);
    
    $id=$_POST['id'];
    $nome=$_POST['nome'];
    $foto=$_POST['foto'];
    $tipo=$_POST['tipo'];
    $senha=$_POST['senha'];
    
    $pdo = new PDO("mysql:host=localhost;dbname=simulador", "root", "");    
     
    try {
        $cont=0;
        $consulta = $pdo->query("SELECT nome, id_conta FROM perfil;");
        while ($linha = $consulta->fetch(PDO::FETCH_ASSOC)) {
            //echo "Nome: {$linha['nome']} - Usuário: {$linha['id_conta']}<br />";

            if($linha['nome']===$nome && $linha['id_conta']===$id)
            {
                $cont=$cont+1;//quer dizer que o registro já existe
            }
        }

        if($cont==0){
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);        
            $stmt = $pdo->prepare("INSERT INTO perfil (nome, foto, id_conta, tipo, senha) VALUES(:nome, :foto, :id_conta, :tipo, :senha)");      
            $stmt->execute(array(
                ':nome' => $nome,
                ':foto' => $foto,
                ':id_conta' => $id,
                ':tipo' => $tipo,
                ':senha' => $senha
              ));
            
            echo $stmt->rowCount();
        }
        
    } catch(PDOException $e) {
        echo 'Error: ' . $e->getMessage();
    }
?>