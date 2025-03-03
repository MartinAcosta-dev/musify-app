// user.interface.ts
export interface User {
    _id: string;    // El ID del usuario
    name: string;   // El nombre del usuario
    surname: string; // El apellido del usuario
    email: string;  // El correo electrónico del usuario
    password: string; // La contraseña (aunque generalmente no deberías almacenar la contraseña en el frontend)
    role: string;   // El rol del usuario, por ejemplo, 'ROLE_ADMIN'
    image: string;  // La URL de la imagen del usuario
    __v: number;    // La versión del usuario, usualmente gestionado por MongoDB
  }
  