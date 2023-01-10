export default function control(input) {
    const errors = {}

    //Name input
    if(!input.username) errors.username = 'Campo requerido';
    if(input.username.length < 2) errors.username = 'Caracteres insuficientes';
    // else if(!/^[^@]+@[^@]+.[a-zA-Z]{2,}$/.test(input.username)) errors.username = 'No es un email';
    //Password input
    if(!input.password) errors.password = 'Contraseña requerida';
    if(input.password.length < 8) errors.password = 'Debe incluir 8 caracteres'; 
    
    return errors
}