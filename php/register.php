<?php
   include './header.php';
    if($_SERVER['REQUEST_METHOD'] == 'POST')
    {
        $result=array();
        $name=$_POST['name'];
        $email=$_POST['email'];
        $password=$_POST['password'];
        $sql="select * from userdetails where email='$email'";
        $res=mysqli_query($conn,$sql);
        $rowseffected=mysqli_num_rows($res);
    //echo $rowseffected;
        if($rowseffected>0)
        {
            $result["message"]="User Already Exists please login";
            $result["status"]="false"; 
        }
        else
        {

            $sql="INSERT INTO userdetails SET name = '".$name."', email = '".$email."', password = '".$password."'";
            
            if(mysqli_query($conn,$sql))
            {
                    $result["message"]="Registration sucessful ";
                    $result["status"]="true";
            }
            else
            {
                $result["message"]="Registration Failed";
                $result["status"]="false";
            }
            
        }
        echo json_encode($result);
    }
    
    ?>