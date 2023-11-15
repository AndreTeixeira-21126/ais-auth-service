const router = require('express').Router();
const userController = require('../controllers/userController');


/** 
 * @openapi
 * /api/users/register:
 *   post:
 *     description: Register a new user
 *     summary: Register a new user
 *     tags: [Users]
 *   
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/RegisterUserRequestBody'
 *     responses:
 *       200:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/RegisterUserSuccessResponse'
 *       400:
 *         description: Required fields are missing | Password must be at least 6 characters | Username or email already exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/RegisterUserErrorResponse'
 *                              
 *     
*/
router.post('/register', userController.register);

/**
 * @openapi
 * /api/users/login:
 *   post:
 *     description: Login a user
 *     summary: Login a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/LoginUserRequestBody'
 *     responses:
 *       200:
 *         description: JWT token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/LoginUserSuccessResponse'
 *       400:
 *         description: Email or password is incorrect | Please fill all required fields
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/LoginUserErrorResponse'
 *        
 */
router.post('/login', userController.login)

/**
 * @openapi
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *       description: JWT token
 *       in: header
 *       name: Authorization
 */


/**
 * @openapi
 * /api/users/profile:
 *   get:
 *     description: Get user profile
 *     summary: Get user profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/UserResponse'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/NoTokenErrorResponse'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/UserNotFoundErrorResponse'
 *       
 */
router.get('/profile', userController.getUserProfile);


/**
 * @openapi
 * /api/users/delete:
 *   delete:
 *     description: Delete user
 *     summary: Delete user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/UserDeletedSuccessfullyResponse'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/NoTokenErrorResponse'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/UserNotFoundErrorResponse'
 */
router.delete('/delete', userController.deleteUser);

/**
 * @openapi
 * /api/users/update:
 *   put:
 *     description: Update user
 *     summary: Update user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/UpdateUserRequestBody'
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/UpdateUserSuccessResponse'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/NoTokenErrorResponse'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/UserNotFoundErrorResponse'
 *           
 *       
 */
router.put('/update', userController.updateUser);

/**
 * @openapi
 * tags:
 *   - name: Users
 *     description: User management and login
 *   
 * definitions:
 *   UpdateUserSuccessResponse:
 *     type: object
 *     properties:
 *       message:
 *         type: string
 *         description: Message from the server
 *         example: User updated successfully
 *   UpdateUserRequestBody:
 *     type: object
 *     properties:
 *       first_name:
 *         type: string
 *         description: First name of the user
 *         example: John
 *         required: false
 *       last_name:
 *         type: string
 *         description: Last name of the user
 *         example: Doe
 *         required: false
 *       birth_date:
 *         type: string
 *         format: date
 *         description: Date of birth
 *         example: 1990-01-01
 *         required: false
 *       username:
 *         type: string
 *         description: Must be unique
 *         example: johndoe
 *         required: false
 *   UserDeletedSuccessfullyResponse:
 *     type: object
 *     properties:
 *       message:
 *         type: string
 *         description: Message from the server
 *         example: User deleted successfully
 *   UserNotFoundErrorResponse:
 *     type: object
 *     properties:
 *       message:
 *         type: string
 *         description: Error message
 *         example: User not found
 *   NoTokenErrorResponse:
 *     type: object
 *     properties:
 *       message:
 *         type: string
 *         description: Error message
 *         example: Unauthorized
 *   RegisterUserRequestBody:
 *     type: object
 *     properties:
 *       first_name:
 *         type: string
 *         description: First name of the user
 *         example: John
 *       last_name:
 *         type: string
 *         description: Last name of the user
 *         example: Doe
 *       birth_date:
 *         type: string
 *         format: date
 *         description: Date of birth
 *         example: 1990-01-01
 *       username:
 *         type: string
 *         description: Must be unique
 *         example: johndoe
 *       password:
 *         type: string
 *         description: Minimum 6 characters
 *         example: password
 *       email:
 *         type: string
 *         format: email
 *         example: 'johndoe@test.com'
 *         description: Email address of the user
 *   RegisterUserSuccessResponse:
 *     type: object
 *     properties:
 *       message:
 *         type: string
 *         description: Message from the server
 *         example: User created successfully
 * 
 *   RegisterUserErrorResponse:
 *     type: object
 *     properties:
 *       message:
 *         type: string
 *         description: Error message
 *         example: Please fill all required fields
 *   LoginUserRequestBody:
 *     type: object
 *     properties:
 *       email:
 *         type: string
 *         format: email
 *         example: 'johndoe@test.com'
 *         description: Email address of the user
 *       password:
 *         type: string
 *         description: Minimum 6 characters
 *         example: password
 *   LoginUserSuccessResponse:
 *     type: object
 *     properties:
 *       token:
 *         type: string
 *         description: JWT token
 *         example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
 *         format: jwt         
 *   LoginUserErrorResponse:
 *     type: object
 *     properties:
 *       message:
 *         type: string
 *         description: Error message
 *         example: Email or password is incorrect
 *   UserResponse:
 *     type: object
 *     properties:
 *       _id:
 *         type: string
 *         description: User ID
 *         example: 5f8e7f3b0c3b4f2d9c2d4c7b
 *         format: ObjectId
 *         readOnly: true
 *       username:
 *         type: string
 *         description: Username
 *         example: johndoe
 *         readOnly: true
 *       email:
 *         type: string
 *         description: Email address
 *         example: 'johndoe@test.com'
 *         format: email
 *         readOnly: true
 *       first_name:
 *         type: string
 *         description: First name
 *         example: John
 *         readOnly: true
 *       last_name:
 *         type: string
 *         description: Last name
 *         example: Doe
 *         readOnly: true
 *       birth_date:
 *         type: string
 *         format: date
 *         description: Date of birth
 *         example: 1990-01-01
 *         readOnly: true
 *       last_access_date:
 *         type: string
 *         format: date-time
 *         description: Last access date
 *         example: 2020-10-19T11:23:56.000Z
 *         readOnly: true
 */
module.exports = router;