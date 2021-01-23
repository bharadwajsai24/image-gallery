<?php
require('./header.php');
if($_SERVER['REQUEST_METHOD']=="POST")
{
    $result=array();
    $email=$_POST['email'];
    $password=$_POST['password'];
    $sql="SELECT * FROM userdetails WHERE email='".$email."' AND password='".$password."'";
    $res=mysqli_query($conn,$sql);
    $rowseffected=mysqli_num_rows($res);
    if($rowseffected>0)
    {
        $result["messsage"]="Authentication Successful";
        $result["status"]="true"; 
    }
    else
    {
    $result["messsage"]="Authentication Failed";
    $result["status"]="false"; 
    }
    echo json_encode($result);
}
?>

