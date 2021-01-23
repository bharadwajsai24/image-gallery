<?php
   include './header.php';
    if($_SERVER['REQUEST_METHOD'] == 'POST')
    {
        $result=array();
        $name=$_POST['name'];
        $email=$_POST['email'];
        $password=$_POST['password'];
        $sql="INSERT INTO userdetails SET name = '".$name."', email = '".$email."', password = '".$password."'";
        
        if(mysqli_query($conn,$sql))
        {
                $result["message"]="Registration sucessful ";
                $result["status"]="true";
        }
        else
        {
            $result["message"]="Registration Failed ";
            $result["status"]="false";
        }
        echo json_encode($result);
    }
    
    ?>