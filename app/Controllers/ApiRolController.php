<?php

namespace App\Controllers;

use App\Controllers\AuthController;
use App\Models\Role;

class ApiRolController
{
    public function roles() {
        $method = $_SERVER['REQUEST_METHOD'];

        $oAuth = new AuthController();
        $response = $oAuth->validateRequest();

        if ($response['code'] == 200) {
            $rol = new Role();
            switch ($method) {
                case 'GET':
                    $users = $rol->getAll();
                    echo json_encode($users);
                    break;

                case 'POST':
                    $data = json_decode(file_get_contents("php://input"), true);
                    if ($data) {
                        $response = $rol->create($data);
                        if ($response['code'] == 200) {
                            echo json_encode(['code' => 200, 'message' => 'Rol created with ID:' . $response['id']]);
                        } else {
                            echo json_encode(['code' => 300, 'message' => $response['error']]);
                        }
                    } else {
                        echo "No Data";
                    }

                    break;
            }
        } else {
            echo json_encode(['error' => $response['message']]);
        }

    }

    public function rol($id) {
        $method = $_SERVER['REQUEST_METHOD'];

        $oAuth = new AuthController();
        $response = $oAuth->validateRequest();
        
        if ($response['code'] == 200) {
            $rol = new Role();
            switch ($method) {
                case 'GET':
                    echo json_encode($rol->findById($id));
                    break;
                case 'PUT':
                    $data = json_decode(file_get_contents("php://input"), true);
                    if ($data) {
                        $response = $rol->update($id, $data);
                        if ($response['code'] == 200) {
                            echo json_encode(['code' => 200, 'message' => $response['message']]);
                        } else {
                            echo json_encode(['code' => 300, 'message' => $response['error']]);
                        }
                    } else {
                        echo "No Data";
                    }
                    break;
                case 'DELETE':
                    $response = $rol->delete($id);
                    if ($response['code'] == 200) {
                        echo json_encode(['code' => 200, 'message' => $response['message']]);
                    } else {
                        echo json_encode(['code' => 300, 'message' => $response['error']]);
                    }
                    break;
            }
        }
    }

}