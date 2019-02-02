<?php

include "../Database.php";

$data = json_decode(file_get_contents("php://input"));
$process=$dbbanco->real_escape_string($data->processos);
$algoritm=$dbbanco->real_escape_string($data->algoritmo);

echo $process;
echo $algoritm;

$query = "INSERT INTO exercicios (processos, algoritmo) VALUES ('".$process."', '".$algoritm."')";

$dbbanco->query($query);

?>