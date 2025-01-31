<?php

namespace App\Controllers;

use App\Controllers\AuthController;
use App\Models\User;

class ApiUserController
{
    public function user($id)
    {
        $method = $_SERVER['REQUEST_METHOD'];
        $oAuth = new AuthController();
        $response = $oAuth->validateRequest();
        if ($response['code'] == 200) {
            $user = new User();
            switch ($method) {
                case 'GET':
                    echo json_encode($user->findById($id));
                    break;
                case 'PUT':
                    $data = json_decode(file_get_contents("php://input"), true);
                    if ($data) {
                        $response = $user->update($id, $data);
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
                    $response = $user->delete($id);
                    if ($response['code'] == 200) {
                        echo json_encode(['code' => 200, 'message' => $response['message']]);
                    } else {
                        echo json_encode(['code' => 300, 'message' => $response['error']]);
                    }
                    break;
            }
        }
    }

    public function users()
    {
        $method = $_SERVER['REQUEST_METHOD'];

        $oAuth = new AuthController();
        $response = $oAuth->validateRequest();

        if ($response['code'] == 200) {
            $user = new User();
            switch ($method) {
                case 'GET':
                    $users = $user->getAll();
                    echo json_encode($users);
                    break;

                case 'POST':
                    $data = json_decode(file_get_contents("php://input"), true);
                    if ($data) {
                        $response = $user->create($data);
                        if ($response['code'] == 200) {
                            echo json_encode(['code' => 200, 'message' => 'User created with ID:' . $response['id']]);
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
}