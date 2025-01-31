<?php
namespace App\Models;

use App\Config\Database;
use PDO;

class Permission
{
    private $db;

    public function __construct()
    {
        $oDb = new Database();
        $this->db = $oDb->connect();
    }

    public function create($role_id, $permission_name)
    {
        $query = "INSERT INTO PERMISSION (role_id, permission_name) VALUES (:role_id, :permission_name)";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':role_id', $role_id);
        $stmt->bindParam(':permission_name', $permission_name);

        if ($stmt->execute()) {
            return $this->db->lastInsertId(); 
        } else {
            return false; 
        }
    }

    public function getById($id)
    {
        $query = "SELECT id, role_id, permission_name FROM PERMISSION WHERE id = :id";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':id', $id);
        $stmt->execute();

        return $stmt->fetch(PDO::FETCH_ASSOC); 
    }

    public function getAll()
    {
        $query = "SELECT id, role_id, permission_name FROM PERMISSION";
        $stmt = $this->db->prepare($query);
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC); 
    }

    public function getByRoleId($role_id)
    {
        $query = "SELECT id, role_id, permission_name FROM PERMISSION WHERE role_id = :role_id";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':role_id', $role_id);
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC); 
    }

    public function update($id, $role_id, $permission_name)
    {
        $query = "UPDATE PERMISSION SET role_id = :role_id, permission_name = :permission_name WHERE id = :id";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':id', $id);
        $stmt->bindParam(':role_id', $role_id);
        $stmt->bindParam(':permission_name', $permission_name);

        return $stmt->execute(); 
    }

    public function delete($id)
    {
        $query = "DELETE FROM PERMISSION WHERE id = :id";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':id', $id);

        return $stmt->execute(); 
    }

    public function deleteByRoleId($role_id)
    {
        $query = "DELETE FROM PERMISSION WHERE role_id = :role_id";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':role_id', $role_id);

        return $stmt->execute(); 
    }

    public function permissionValidation($role_id, $permission_name)
    {
        $query = "SELECT COUNT(*) as count FROM PERMISSION WHERE role_id = :role_id AND permission_name = :permission_name";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':role_id', $role_id);
        $stmt->bindParam(':permission_name', $permission_name);
        $stmt->execute();

        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        return ($result['count'] > 0);
    }
}