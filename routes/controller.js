const client = require("../db");

const getAllRoles = async () => {
    try {
        const roles = await client.query('SELECT * FROM roles');
        return roles.rows;
    } catch (err) {
        console.error(err.message);
    }
};

const getRoleById = async (id) => {
    try {
        const role = await client.query('SELECT * FROM roles WHERE role_id = $1', [id]);
        return role.rows[0];
    } catch (err) {
        console.error(err.message);
    }
}

const createRole = async (role) => {
    try {

        const role_name = role.role_name;
        const role_function_name = role.function_name;
        const role_read = role.read; 
        const role_write = role.write; 
        const role_update = role.update;
        const role_delete = role.delete; 
        
        await client.query('INSERT INTO roles (role_name, function_name, read, write, update, delete) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [role_name, role_function_name, role_read, role_write, role_update, role_delete]);

        const newRole = await client.query('SELECT * FROM roles ORDER BY role_id DESC LIMIT 1');

        return newRole.rows[0];

    } catch (err) {
        console.error(err.message);
    }
};

const updateRole = async (id, role) => {
    try {
        const role_name = role.role_name;
        const role_function_name = role.function_name;
        const role_read = role.read; 
        const role_write = role.write; 
        const role_update = role.update;
        const role_delete = role.delete; 

        await client.query('UPDATE roles SET role_name = $1, function_name = $2, read = $3, write = $4, update = $5, delete = $6 WHERE role_id = $7', [role_name, role_function_name, role_read, role_write, role_update, role_delete, id]);

        const updatedRole = await client.query('SELECT * FROM roles WHERE role_id = $1', [id]);

        return updatedRole.rows[0];
    }
    catch (err) {
        console.error(err.message);
    }
};

const deleteRole = async (id) => {
    try {
        await client.query('DELETE FROM roles WHERE role_id = $1', [id]);
   
        return true;
   
    } catch (err) {
        console.error(err.message);
    }
}

module.exports = {
    getAllRoles,
    getRoleById,
    createRole,
    updateRole,
    deleteRole
};
