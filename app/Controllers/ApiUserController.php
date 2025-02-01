<?php

namespace App\Controllers;

use App\Controllers\AuthController;
use App\Models\User;
use App\Models\Permission;

class ApiUserController
{
    public function user($id)
    {
        $method = $_SERVER['REQUEST_METHOD'];
        $oAuth = new AuthController();
        $response = $oAuth->validateRequest();
        if ($response['code'] == 200) {
            $user = new User();
            $currentUserId = $response['data']->user_id;
            switch ($method) {
                case 'GET':
                    if ($this->validateAction($response, "read_users") || ($this->validateAction($response, "update_profile") && $id == $currentUserId) ) {
                        echo json_encode($user->findById($id));
                        
                    } else {
                        echo json_encode(['code' => 299, 'message' => 'Not authorized - read users']);
                    }
                    break;
                case 'PUT':
                    if ($this->validateAction($response, "update_users") || ($this->validateAction($response, "update_profile") && $id == $currentUserId)) {
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
                    } else {
                        echo json_encode(['code' => 299, 'message' => 'Not authorized - update users']);
                    }

                    break;
                case 'DELETE':
                    if (!$this->validateAction($response, "delete_users")) {
                        echo json_encode(['code' => 299, 'message' => 'Not authorized - delete users']);
                    } else {
                        $response = $user->delete($id);
                        if ($response['code'] == 200) {
                            echo json_encode(['code' => 200, 'message' => $response['message']]);
                        } else {
                            echo json_encode(['code' => 300, 'message' => $response['error']]);
                        }
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
                    if (!$this->validateAction($response, "read_users")) {
                        echo json_encode(['code' => 299, 'message' => 'Not authorized - read users']);
                    } else {
                        $users = $user->getAll();
                        echo json_encode($users);
                    }
                    break;

                case 'POST':
                    if (!$this->validateAction($response, "create_users")) {
                        echo json_encode(['code' => 299, 'message' => 'Not authorized - create users']);
                    } else {
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
                    }
                    break;
            }
        } else {
            echo json_encode(['code' => 298, 'message' => $response['message']]);
        }
    }

    private function validateAction($response, $perm_name)
    {
        $oPermission = new Permission();
        $rol_id = $response['data']->rol_id;

        return $oPermission->permissionValidation($rol_id, $perm_name);
    }
}
