<?php 

    include("base.php");

    //aqui van las diferentes tomas de datos de las funciones en base.php

    if (isset($_POST['loginDB'])) {
        $user = $_POST['user'];
        $pass = $_POST['pass'];

        $datos = Base::loginDB($user, $pass);
        echo json_encode($datos);
    } 
    
    else if (isset($_POST['getCompiDB'])) {
        $idCuenta = intval($_POST['idCuenta']);

        $datos = Base::getCompiDB($idCuenta);
        echo json_encode($datos);
    }
    
    else if (isset($_POST['getDatosRazaCompiDB'])) {
        $idRaza = intval($_POST['idRaza']);

        $datos = Base::getDatosRazaCompiDB($idRaza);
        echo json_encode($datos);
    }

    else if (isset($_POST['cargarItemsDB'])) {
        $datos = Base::cargarItemsDB();

        /* $ids = array();
        if ($datos->rowCount() > 0) {
            while ($row = $datos->fetch(PDO::FETCH_ASSOC)) {
                $ids[] = $row['id_item'];
            }
            echo json_encode($ids);
        } else {
            echo "0";
        } */

        

        echo json_encode($datos);
    }

    else if (isset($_POST['getEnemyDB'])) {
        $idEnemigo = intval($_POST['idEnemigo']);

        $datos = Base::getEnemyDB($idEnemigo);
        echo json_encode($datos);
    }

    else if (isset($_POST['updateCompiDB'])) {
        $id_compi = intval($_POST['id_compi']);
        $id_raza = intval($_POST['id_raza']);
        $nivel = intval($_POST['nivel']);
        $exp = intval($_POST['exp']);
        $exp_next = intval($_POST['exp_next']);
        $hp_actual = intval($_POST['hp_actual']);
        $hp_max = intval($_POST['hp_max']);
        $atk = intval($_POST['atk']);

        $datos = Base::updateCompiDB($id_raza, $nivel, $exp, $exp_next, $hp_actual, $hp_max, $atk, $id_compi);
        if ($datos > 0) {
            echo "1";
        } else {
            echo "0";
        }
    }

    else if (isset($_POST['getItemDB'])) {
        $idItem = intval($_POST['idItem']);

        $datos = Base::getItemDB($idItem);
        echo json_encode($datos);
    }

    else if (isset($_POST['addItemInventarioDB'])) {
        $idCuenta = intval($_POST['idCuenta']);
        $idItem = intval($_POST['idItem']);

        $datos = Base::addItemInventarioDB($idCuenta, $idItem);
        if ($datos > 0) {
            echo "1";
        } else {
            echo "0";
        }
    }

    else if (isset($_POST['reduceItemInventarioDB'])) {
        $idCuenta = intval($_POST['idCuenta']);
        $idItem = intval($_POST['idItem']);

        $datos = Base::reduceItemInventarioDB($idCuenta, $idItem);
        if ($datos > 0) {
            echo "1";
        } else {
            echo "0";
        }
    }

    else if (isset($_POST['getCantidadItemDB'])) {
        $idCuenta = intval($_POST['idCuenta']);
        $idItem = intval($_POST['idItem']);

        $datos = Base::getCantidadItemDB($idCuenta, $idItem);
        echo $datos;
    }

    else if (isset($_POST['updateMoneyDB'])) {
        $idCuenta = intval($_POST['idCuenta']);
        $nuevoMoney = intval($_POST['nuevoMoney']);

        $datos = Base::updateMoneyDB($idCuenta, $nuevoMoney);
        if ($datos > 0) {
            echo "1";
        } else {
            echo "0";
        }
    }

    else if (isset($_POST['updateHpDB'])) {
        $idCompi = intval($_POST['idCompi']);
        $nuevoHp = intval($_POST['nuevoHp']);

        $datos = Base::updateHpDB($idCompi, $nuevoHp);
        if ($datos > 0) {
            echo "1";
        } else {
            echo "0";
        }
    }

    else if (isset($_POST['comprobarUsernameDB'])) {
        $user = $_POST['user'];

        $datos = Base::comprobarUsernameDB($user);
        echo json_encode($datos);
    }

    else if (isset($_POST['addCuentaDB'])) {
        $username = $_POST['username'];
        $password = $_POST['password'];
        $correo = $_POST['correo'];
        $nombre = $_POST['nombre'];
        $fecha_creacion = $_POST['fecha_creacion'];
        $avatar = $_POST['avatar'];
        $money = intval($_POST['money']);
        $admin = intval($_POST['admin']);

        $datos = Base::addCuentaDB($username, $password, $correo, $nombre, $fecha_creacion, $avatar, $money, $admin);
        if ($datos > 0) {
            echo "1";
        } else {
            echo "0";
        }
    }

    else if (isset($_POST['addCompiDB'])) {
        $id_cuenta = intval($_POST['id_cuenta']);
        $id_raza = intval($_POST['id_raza']);
        $mote = $_POST['mote'];
        $nivel = 1;
        $exp = 0;
        $exp_next = 40; //40 -> lvl2, 60 -> lvl3, 80 -> lvl4, 100 lvl5
        $hp = intval($_POST['hp']);
        $atk = intval($_POST['atk']);

        $datos = Base::addCompiDB($id_cuenta, $id_raza, $mote, $nivel, $exp, $exp_next, $hp, $atk);
        if ($datos > 0) {
            echo "1";
        } else {
            echo "0";
        }
    }

?>