<?php

namespace App\Models;

use App\Config\Database;
use PDO;
use PDOException;

class Role
{
  private $conn;

  public function __construct()
  {
    $db = new Database();
    $this->conn = $db->connect();
  }

  public function getAll()
  {
    $query = "SELECT id, role_name FROM ROLES ORDER BY id";
    $stmt = $this->conn->prepare($query);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

  public function findById($id)
  {
    $query = "SELECT id, role_name FROM ROLES WHERE id = :id";
    $stmt = $this->conn->prepare($query);
    $stmt->bindParam(':id', $id);
    $stmt->execute();
    return $stmt->fetch(PDO::FETCH_ASSOC);
  }

  public function create($data)
  {
    try {
      $query = "INSERT INTO ROLES (role_name) VALUES (:role_name)";
      $stmt = $this->conn->prepare($query);
      $stmt->bindParam(':role_name', $data['role_name']);
      $stmt->execute();

      return ['code' => 200, 'id' => $this->conn->lastInsertId()];
    } catch (PDOException $e) {
      if ($e->getCode() == 23000) {
        return ['code' => 300, 'error' => 'The rol already exists.'];
      }
      return ['code' => 301, 'error' => 'Error inserting rol: ' . $e->getMessage()];
    }
  }


  public function update($id, $data)
  {
    try {
      $query = "UPDATE ROLES SET role_name = :role_name WHERE id = :id";
      $stmt = $this->conn->prepare($query);
      $stmt->bindParam(':id', $id);
      $stmt->bindParam(':role_name', $data['role_name']);
      $stmt->execute();
      return ['code' => 200, 'message' => 'The Rol was updated successfully'];
    } catch (PDOException $e) {
      if ($e->getCode() == 23000) {
        return ['code' => 300, 'error' => 'The rol already exists.'];
      }
      return ['code' => 301, 'error' => 'Error inserting rol: ' . $e->getMessage()];
    }
  }


  public function delete($id)
  {
    $query = "DELETE FROM ROLES WHERE id = :id";
    $stmt = $this->conn->prepare($query);
    $stmt->bindParam(':id', $id);
    $stmt->execute();
    return ['code' => 200, 'message' => 'Rol deleted succesfully'];
  }
}
