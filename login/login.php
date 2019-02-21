<?php
    $foto=$_FILES['pic']['name'];
    $nome=$_POST['nome'];
    $email=$_POST['email'];
    $senha1=$_POST['senha1'];
    $senha2=$_POST['senha2'];    

    if($nome=="" or $email=="" or $foto=="" or $senha1=="" or $senha2=="")
    {
        if($foto=="")
        {
            echo json_encode('Adicione uma foto.');
        }
        elseif($nome==""){
            echo json_encode('Adicione um nome.');
        }
        elseif($email==""){
            echo json_encode('Adicione um email.');
        }
        elseif($senha1==""){
            echo json_encode('Adicione uma senha e repita ela.');
        }
        elseif($senha2==""){
            echo json_encode('Adicione uma senha e repita ela.');
        }       
    }
    else{
        if($senha1==$senha2){
            $pdo = new PDO("mysql:host=localhost;dbname=simulador", "root", "");

            $id="";
            $tipo="Formulario";
            $senha=$senha1;

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
            
            $alteracao=$stmt->rowCount();

            if($alteracao==1)
            {
                if(isset($_FILES['pic']))
                {
                    $ext = strtolower(substr($_FILES['pic']['name'],-4)); //Pegando extensão do arquivo
                    $new_name = date("Y.m.d-H.i.s");// . $ext; //Definindo um novo nome para o arquivo
                    $dir = './images/'; //Diretório para uploads 
                    move_uploaded_file($_FILES['pic']['tmp_name'], $dir.$new_name.$ext); //Fazer upload do arquivo
                }
            }

            echo json_encode(200);

        }else{
            echo json_encode('Suas senhas são diferentes. Adicione uma senha e repita ela.');
        }
    }
?>