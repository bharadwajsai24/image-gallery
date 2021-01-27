<?php 
require('./header.php');
if($_SERVER['REQUEST_METHOD']=="POST")
{
    $filename=$_FILES['image']['name'];
    $tempname=$_FILES['image']['tmp_name'];
    $email=$_POST['email'];
    $location="../uploads/file";
    $sql="SELECT LAST_INSERT_ID() FROM imagedetails";
    $res=mysqli_query($conn,$sql);
    $row=mysqli_fetch_array($res);
    $maxno=$row[0];
    if($maxno==null)
    {
        $maxno=0;
    }
    else
    {
        $maxno+=1;
    }
    $type=strtolower(pathinfo($filename,PATHINFO_EXTENSION));
    $location=$location.$maxno.".".$type;
    $result=array();
    if($type === 'png' || $type=="jpg" || $type=="jpeg")
    {
        
        move_uploaded_file($tempname,$location);
        $sql="INSERT INTO imagedetails SET imagepath='".$location."',email='".$email."'";
        $res=mysqli_query($conn,$sql);
        $result["status"]="true";
       
    }
    else
    {
        $result["status"]="false";
    }


    echo json_encode($result);


}
?>