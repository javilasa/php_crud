<?php

namespace App\Controllers;

use App\Controllers\AuthController;
use App\Models\Role;
use App\Models\Permission;

class ApiRolController
{
  public function roles()
  {
    $method = $_SERVER['REQUEST_METHOD'];

    $oAuth = new AuthController();
    $response = $oAuth->validateRequest();

    if ($response['code'] == 200) {

      $rol = new Role();
      switch ($method) {
        case 'GET':
          if (!$this->validateAction($response, "read_roles")) {
            echo json_encode(['code' => 299, 'message' => 'Not authorized - read roles']);
          } else {
            $roles = $rol->getAll();
            echo json_encode($roles);
          }
          break;

        case 'POST':
          if (!$this->validateAction($response, "create_roles")) {
            echo json_encode(['code' => 299, 'message' => 'Not authorized - create roles']);
          } else {
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
          }
          break;
      }
    } else {
      echo json_encode(['error' => $response['message']]);
    }
  }

  public function rol($id)
  {
    $method = $_SERVER['REQUEST_METHOD'];

    $oAuth = new AuthController();
    $response = $oAuth->validateRequest();

    if ($response['code'] == 200) {

      $rol = new Role();
      switch ($method) {
        case 'GET':
          if (!$this->validateAction($response, "read_roles")) {
            echo json_encode(['code' => 299, 'message' => 'Not authorized - read roles']);
          } else {
            echo json_encode($rol->findById($id));
          }
          break;
        case 'PUT':
          if (!$this->validateAction($response, "update_roles")) {
            echo json_encode(['code' => 299, 'message' => 'Not authorized - update roles']);
          } else {
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
          }
          break;
        case 'DELETE':
          if (!$this->validateAction($response, "delete_roles")) {
            echo json_encode(['code' => 299, 'message' => 'Not authorized - delete roles']);
          } else {
            $response = $rol->delete($id);
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

  public function List()
  {
    $oAuth = new AuthController();
    $response = $oAuth->validateRequest();

    if ($response['code'] == 200) {
      $rol = new Role();
      $roles = $rol->getAll();
      echo json_encode($roles);
    }
  }

  private function validateAction($response, $perm_name)
  {
    $oPermission = new Permission();
    $rol_id = $response['data']->rol_id;

    return $oPermission->permissionValidation($rol_id, $perm_name);
  }
}
