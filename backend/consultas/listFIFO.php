<?php

include "../Database.php";

$query = "SELECT * FROM exercicios WHERE algoritmo = 'FIFO'";
$rs = $dbbanco->query($query);

while($row=$rs->fetch_assoc()){
    $data[] = $row;

}

print json_encode($data);

?>
