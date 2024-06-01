<?php 
class Base {

    private static $hostdb = "db";
    private static $portdb = "3306";
    private static $dbnamedb = "pokeaventura";
    private static $userdb = "root";
    private static $passworddb = "root_password";

    public static function conexion() {
        try {
            $conexion = new PDO("mysql:host=" . self::$hostdb . ";port=" . self::$portdb . ";dbname=" . self::$dbnamedb, self::$userdb, self::$passworddb);
            $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $conexion->exec("SET CHARACTER SET utf8");
            return $conexion;
        } catch (Exception $e) {
            echo "Error al realizar la conexión: " . $e->getMessage();
        }
    }

    //aqui hago las funciones que llamaran a funciones.php

    //index.js------
    public static function loginDB($user, $pass) {
        $sql="SELECT * FROM cuenta WHERE username = ? AND password = ?";
        $con = self::conexion();
        $res = $con->prepare($sql);
        $res->bindParam(1, $user);
        $res->bindParam(2, $pass);
        $res->execute();
        $con = null;
        return $res->fetchAll(PDO::FETCH_ASSOC);
    }
    
    public static function getCompiDB($idCuenta) {
        $sql="SELECT * FROM compi WHERE id_cuenta = ?";
        $con = self::conexion();
        $res = $con->prepare($sql);
        $res->bindParam(1, $idCuenta);
        $res->execute();
        $con = null;
        return $res->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function getDatosRazaCompiDB($idRaza) {
        $sql="SELECT * FROM starter WHERE id_raza = ?";
        $con = self::conexion();
        $res = $con->prepare($sql);
        $res->bindParam(1, $idRaza);
        $res->execute();
        $con = null;
        return $res->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function cargarItemsDB() {
        $sql="SELECT * FROM `item`;";
        $con = self::conexion();
        $res = $con->prepare($sql);
        $res->execute();
        $con = null;

        return $res->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function getEnemyDB($idEnemigo) {
        $sql="SELECT * FROM enemigo WHERE id_enemigo = ?";
        $con = self::conexion();
        $res = $con->prepare($sql);
        $res->bindParam(1, $idEnemigo);
        $res->execute();
        $con = null;
        return $res->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function updateCompiDB($id_raza, $nivel, $exp, $exp_next, $hp_actual, $hp_max, $atk, $id_compi) {
        $sql="UPDATE `compi` SET `id_raza` = ?, `nivel` = ?, `exp` = ?, `exp_next` = ?, `hp_actual` = ?, `hp_max` = ?, `atk` = ? WHERE `compi`.`id_compi` = ? ";
        $con = self::conexion();
        $res = $con->prepare($sql);
        $res->bindParam(1, $id_raza);
        $res->bindParam(2, $nivel);
        $res->bindParam(3, $exp);
        $res->bindParam(4, $exp_next);
        $res->bindParam(5, $hp_actual);
        $res->bindParam(6, $hp_max);
        $res->bindParam(7, $atk);
        $res->bindParam(8, $id_compi);
        $res->execute();
        $con = null;
        return $res->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function getItemDB($idItem) {
        $sql="SELECT * FROM item WHERE id_item = ?";
        $con = self::conexion();
        $res = $con->prepare($sql);
        $res->bindParam(1, $idItem);
        $res->execute();
        $con = null;
        return $res->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function addItemInventarioDB($idCuenta, $idItem) {
        $sql="INSERT INTO inventario (id_cuenta, id_item, cantidad) VALUES (?, ?, 1) ON DUPLICATE KEY UPDATE cantidad = cantidad + 1;";
        $con = self::conexion();
        $res = $con->prepare($sql);
        $res->bindParam(1, $idCuenta);
        $res->bindParam(2, $idItem);
        $res->execute();
        $con = null;
        return $res->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function reduceItemInventarioDB($idCuenta, $idItem) {
        $sql="UPDATE inventario SET cantidad = GREATEST(cantidad - 1, 0) WHERE id_cuenta = ? AND id_item = ?;";
        $con = self::conexion();
        $res = $con->prepare($sql);
        $res->bindParam(1, $idCuenta);
        $res->bindParam(2, $idItem);
        $res->execute();
        $con = null;
        return $res->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function getCantidadItemDB($idCuenta, $idItem) {
        $sql="SELECT cantidad FROM inventario WHERE id_cuenta = ? AND id_item = ?;";
        $con = self::conexion();
        $res = $con->prepare($sql);
        $res->bindParam(1, $idCuenta);
        $res->bindParam(2, $idItem);
        $res->execute();
        $con = null;
        $cantidad = $res->fetchColumn();
        if ($cantidad == false) {
            return "-1";
        } else {
            return $cantidad;
        }
    }

    public static function updateMoneyDB($idCuenta, $nuevoMoney) {
        $sql="UPDATE cuenta SET cuenta.money = ? WHERE cuenta.id_cuenta = ? ";
        $con = self::conexion();
        $res = $con->prepare($sql);
        $res->bindParam(1, $nuevoMoney);
        $res->bindParam(2, $idCuenta);
        $res->execute();
        $con = null;
        return $res->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function updateHpDB($idCompi, $nuevoHp) {
        $sql="UPDATE compi SET hp_actual = ? WHERE id_compi = ? ";
        $con = self::conexion();
        $res = $con->prepare($sql);
        $res->bindParam(1, $nuevoHp);
        $res->bindParam(2, $idCompi);
        $res->execute();
        $con = null;
        return $res->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function comprobarUsernameDB($user){
        $sql="SELECT * FROM cuenta WHERE username = ?";
        $con = self::conexion();
        $res = $con->prepare($sql);
        $res->bindParam(1, $user);
        $res->execute();
        $con = null;
        return $res->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function addCuentaDB($username, $password, $correo, $nombre, $fecha_creacion, $avatar, $money, $admin) {
        $sql="INSERT INTO `cuenta` (`username`, `password`, `correo`, `nombre`, `fecha_creacion`, `avatar`, `money`, `admin`) VALUES (?, ?, ?, ?, ?, ?, ?, ?) ";
        $con = self::conexion();
        $res = $con->prepare($sql);
        $res->bindParam(1, $username);
        $res->bindParam(2, $password);
        $res->bindParam(3, $correo);
        $res->bindParam(4, $nombre);
        $res->bindParam(5, $fecha_creacion);
        $res->bindParam(6, $avatar);
        $res->bindParam(7, $money);
        $res->bindParam(8, $admin);
        $res->execute();
        $con = null;
        return $res->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function addCompiDB($id_cuenta, $id_raza, $mote, $nivel, $exp, $exp_next, $hp, $atk) {
        $sql="INSERT INTO `compi` (`id_cuenta`, `id_raza`, `mote`, `nivel`, `exp`, `exp_next`, `hp_actual`, `hp_max`, `atk`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?) ";
        $con = self::conexion();
        $res = $con->prepare($sql);
        $res->bindParam(1, $id_cuenta);
        $res->bindParam(2, $id_raza);
        $res->bindParam(3, $mote);
        $res->bindParam(4, $nivel);
        $res->bindParam(5, $exp);
        $res->bindParam(6, $exp_next);
        $res->bindParam(7, $hp);
        $res->bindParam(8, $hp);
        $res->bindParam(9, $atk);
        $res->execute();
        $con = null;
        return $res->fetchAll(PDO::FETCH_ASSOC);
    }
}
?>