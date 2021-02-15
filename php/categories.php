<?php
require('./header.php');
if($_SERVER['REQUEST_METHOD']=="POST")
{
    $result=array();
    $email=$_POST['email'];
    $sql="SELECT tag FROM imagedetails WHERE email='".$email."' AND tag <>''" ;
    $res=mysqli_query($conn,$sql);
    $rowseffected=mysqli_num_rows($res);
    //echo $rowseffected;
    $res=mysqli_query($conn,$sql);
    $rowseffected=mysqli_num_rows($res);
    while($row=mysqli_fetch_array($res))
    {
        $temp=array("category"=>$row[0]);
        array_push($result,$temp);

    }
    echo json_encode($result);
}


?>

