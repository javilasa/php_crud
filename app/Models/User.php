<?php

namespace App\Models;

use App\Config\Database;
use PDO;
use PDOException;

class User
{
  private $conn;

  public function __construct()
  {
    $db = new Database();
    $this->conn = $db->connect();
  }

  public function getAll()
  {
    $query = "            
            SELECT 
                USER.id, 
                USER.name, 
                USER.email, 
                USER.password, 
                USER.role_id, 
                ROLES.role_name 
            FROM USER 
            LEFT JOIN ROLES ON USER.role_id = ROLES.id
            ORDER BY USER.id
        ";
    $stmt = $this->conn->prepare($query);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

  public function findById($id)
  {
    $query = "           
            SELECT 
                USER.id, 
                USER.name, 
                USER.email, 
                USER.password, 
                USER.role_id, 
                ROLES.role_name 
            FROM USER 
            LEFT JOIN ROLES ON USER.role_id = ROLES.id  
            WHERE USER.id = :id
        ";
    $stmt = $this->conn->prepare($query);
    $stmt->bindParam(':id', $id);
    $stmt->execute();
    return $stmt->fetch(PDO::FETCH_ASSOC);
  }

  public function findByEmail($email)
  {
    $query = "
            SELECT 
                USER.id, 
                USER.name, 
                USER.email, 
                USER.password, 
                USER.role_id, 
                ROLES.role_name 
            FROM USER 
            INNER JOIN ROLES ON USER.role_id = ROLES.id 
            WHERE USER.email = :email
        ";

    $stmt = $this->conn->prepare($query);
    $stmt->bindParam(':email', $email);
    $stmt->execute();
    return $stmt->fetch(PDO::FETCH_ASSOC);
  }

  public function create($data)
  {
    try {
      $query = "INSERT INTO USER (name, email, password, role_id) VALUES (:name, :email, :password, :role_id)";
      $stmt = $this->conn->prepare($query);
      $stmt->bindParam(':name', $data['name']);
      $stmt->bindParam(':email', $data['email']);
      $hashedPassword = password_hash($data['password'], PASSWORD_BCRYPT);
      $stmt->bindParam(':password', $hashedPassword);
      $stmt->bindParam(':role_id', $data['role_id']);
      $stmt->execute();
      return ['code' => 200, 'id' => $this->conn->lastInsertId()];
    } catch (PDOException $e) {
      if ($e->getCode() == 23000) {
        return ['code' => 300, 'error' => 'The email already exists.'];
      }
      return ['code' => 301, 'error' => 'Error inserting User: ' . $e->getMessage()];
    }
  }

  public function update($id, $data)
  {
    try {
      $query = "UPDATE USER SET name = :name, email = :email";

      if (!empty($data['role_id'])) {
        $query .= ", role_id = :role_id";
      }

      if (!empty($data['password'])) {
        $query .= ", password = :password";
      }

      $query .= " WHERE id = :id";

      $stmt = $this->conn->prepare($query);

      $stmt->bindParam(':id', $id);
      $stmt->bindParam(':name', $data['name']);
      $stmt->bindParam(':email', $data['email']);

      if (!empty($data['role_id'])) {
        $stmt->bindParam(':role_id', $data['role_id']);
      }

      if (!empty($data['password'])) {
        $hashedPassword = password_hash($data['password'], PASSWORD_BCRYPT);
        $stmt->bindParam(':password', $hashedPassword);
      }

      $stmt->execute();

      return ['code' => 200, 'message' => 'The User was updated successfully'];
    } catch (PDOException $e) {
      if ($e->getCode() == 23000) {
        return ['code' => 300, 'error' => 'The email already exists.'];
      }
      return ['code' => 301, 'error' => 'Error updating User: ' . $e->getMessage()];
    }
  }

  public function delete($id)
  {
    $query = "DELETE FROM USER WHERE id = :id";
    $stmt = $this->conn->prepare($query);
    $stmt->bindParam(':id', $id);
    $stmt->execute();
    return ['code' => 200, 'message' => 'User deleted succesfully'];
  }
}
