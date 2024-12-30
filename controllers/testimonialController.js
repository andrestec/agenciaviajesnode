import { Testimonial} from '../model/Testimoniales.js';

const guardarTestimoniales = async (req, res) => {
    //Destruting
    const {nombre, correo, mensaje} = req.body;
    
    const errores = [];

    //validar
    if(nombre.trim() === ''){
        errores.push({mensaje: 'El nombre esta vació'});
    }

    if(correo.trim() === ''){
        errores.push({mensaje: 'El Correo esta vació'});
    }

    if(mensaje.trim() === ''){
        errores.push({mensaje: 'El mensaje esta vació'});
    }

    if(errores.length > 0){
        const testimoniales = await Testimonial.findAll();
        
        //Mostrar la vista con errores
        res.render('testimoniales', {
            pagina: "Testimoniales",
            errores,
            nombre,
            correo,
            mensaje, 
            testimoniales
        });
       
    }else{
        try {
            await Testimonial.create({
                nombre, 
                correo,
                mensaje
            });
            res.redirect('/testimoniales');
        } catch (error) {
            console.log(error)
        }
    }
}

export {
    guardarTestimoniales
}