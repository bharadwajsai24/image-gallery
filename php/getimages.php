<?php
require ('./header.php');
if($_SERVER['REQUEST_METHOD']=="POST")
{
        $email=$_POST['email'];
        $sql="SELECT * FROM imagedetails WHERE email='".$email."'";
        $res=mysqli_query($conn,$sql);
        $result=array();
        $images=array();
        while($row=mysqli_fetch_array($res))
        {
            $filepath=$row[1];
            $splitfilepath=explode(".",$filepath);
            $length=count($splitfilepath);
            $extention=$splitfilepath[$length-1];
            $sno=$row[0];
            $imageData = base64_encode(file_get_contents($filepath));
            $temp=array(
                "imagedata"=>$imageData,
                "extention"=>$extention,
                "sno"=>$sno
            );
            array_push($result,$temp);
        }
        $jsondata=array();
        $jsondata["urls"]=$result;
        echo json_encode($jsondata);
}

?>