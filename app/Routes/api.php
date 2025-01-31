<?php
return [
    '/api/login' => 'AuthController@login',

    '/api/users' => 'ApiUserController@users',
    '/api/users/{id}' => 'ApiUserController@user',

    '/api/roles' => 'ApiRolController@roles',
    '/api/roles/{id}' => 'ApiRolController@rol'
];
