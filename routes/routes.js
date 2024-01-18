
const express = require('express');
const client = require('../db');
const { getAllRoles, getRoleById, createRole, updateRole, deleteRole } = require('./controller');

const router = express.Router();


router.get('/roles', async (req, res) => {
    const roles = await getAllRoles();

    if(!roles) {
        res.status(404).json({
            status: 'fail',
            message: 'No roles found'
        });
    }

    res.status(200).json({
        status: 'success',
        data: roles
    });
});

router.get('/roles/:id', async (req, res) => {
    const role = await getRoleById(req.params.id);

    if(!role) {
        res.status(404).json({
            status: 'fail',
            message: 'No role found'
        });
    }

    res.status(200).json({
        status: 'success',
        data: role
    });
});

router.post('/roles', async (req, res) => {
    
    const newRole = await createRole(req.body);

    if(!newRole) {
        res.status(404).json({
            status: 'fail',
            message: 'No role created'
        });
    }
    res.status(201).json({
        status: 'success',
        message: 'New role created',
        data: newRole
    });
});

router.put('/roles/:id', async (req, res) => {
    const updatedRole = await updateRole(req.params.id, req.body);

    if(!updatedRole) {
        res.status(404).json({
            status: 'fail',
            message: 'No role updated'
        });
    }
    res.status(200).json({
        status: 'success',
        message: 'Role updated',
        data: updatedRole
    });
});

router.delete('/roles/:id', async (req, res) => {
    const isRoleDeleted = await deleteRole(req.params.id);

    if(!isRoleDeleted) {
        res.status(404).json({
            status: 'fail',
            message: 'No role deleted'
        });
    }

    res.status(200).json({
        status: 'success',
        message: 'Role deleted',
    });
});


module.exports = router;