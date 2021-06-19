const Pregunta3 = artifacts.require("./Pregunta3.sol")
const assert = require('assert')

let smartContract

contract('Falopa', async (usuarios) => {

    beforeEach('Inicialización', async () => {
        smartContract = await Pregunta3.new();
        await smartContract.cambiarEstado(Pregunta3.Estado.Activo);
        assert.equal(await smartContract.estado.call(), 0);
    })

    it("Alguien que no es el owner no puede cambiar el estado", async() => {
        let alguien = usuarios[5] // El owner es usuarios[0]
        let nuevoEstado = Pregunta3.Estado.Activo // 0
        let err = null

        try {
            await smartContract.cambiarEstado(nuevoEstado, {from: alguien})
        } catch (error) {
            err = error
        }

        assert.ok(err instanceof Error)
    })

    it("El owner puede cambiar el estado", async() => {
        let nuevoEstado = Pregunta3.Estado.Bootstrap // Corresponde al número 3
        await smartContract.cambiarEstado(nuevoEstado);
        assert.equal(await smartContract.estado.call(), 3); 
    })

    it("Crear una nueva pregunta", async() => {
        let pregunta;
        let unAutor = usuarios[2];
        let textoPregunta = "¿Será la primera pregunta?";
        let opciones = ["Si", "No", "No sabe no contesta"];
        let respuesta = "Si";
        let puntos = 10;

        await smartContract.nuevaPregunta(unAutor, textoPregunta, opciones, respuesta, puntos);
        pregunta = await smartContract.obtenerPregunta.call(1);

        assert.equal(pregunta.textoPregunta, textoPregunta);
    })

    it("Un usuario responde una pregunta de forma correcta", async() => {
        let pregunta;
        let unAutor = usuarios[2];
        let textoPregunta = "¿Cuanto es 2+2?";
        let opciones = ["5", "4", "3"];
        let respuesta = "4";
        let puntos = 5;

        await smartContract.nuevaPregunta(unAutor, textoPregunta, opciones, respuesta, puntos);
        pregunta = await smartContract.obtenerPregunta.call(1);
        
        let respuestaDelUsuario = "4"

        await smartContract.responderPregunta(1, respuestaDelUsuario)

        assert.equal(pregunta.respuestaCorrecta, respuestaDelUsuario);
    })

    it("No se puede responder una pregunta estando el contrato en modo bootstrap", async() => {
        let unAutor = usuarios[2];
        let textoPregunta = "¿Cuanto es 2+2?";
        let opciones = ["5", "4", "3"];
        let respuesta = "4";
        let puntos = 5;

        await smartContract.cambiarEstado(3)
        await smartContract.nuevaPregunta(unAutor, textoPregunta, opciones, respuesta, puntos);
        
        let respuestaDelUsuario = "4"

        try {
            await smartContract.responderPregunta(1, respuestaDelUsuario)
        } catch (error) {
            err = error
        }

        assert.ok(err instanceof Error)
        assert(err, "No puede realizarse")
    })

    it("El promedio de puntos de un usuario que no respondió nada", async() => {
        let usuario = usuarios[9];
        let promedio = await smartContract.promedioRespuestas.call(usuario);

        assert.equal(promedio, 0);
    })
    

    it("El promedio de puntos de un usuario que respondio dos preguntas", async() => {
        let unAutor = usuarios[2];
        let textoPregunta = "¿Cuanto es 2+2?";
        let opciones = ["5", "4", "3"];
        let respuesta = "4";
        let puntos = 5;

        await smartContract.nuevaPregunta(unAutor, textoPregunta, opciones, respuesta, puntos);
        await smartContract.nuevaPregunta(unAutor, "¿Cuanto es 10 + 10", ["5", "4", "20"], "20", 15);

        let usuario = usuarios[0];
        await smartContract.responderPregunta(1, "4")
        await smartContract.responderPregunta(2, "20")

        let promedioEsperado = 10
        let promedio = await smartContract.promedioRespuestas.call(usuario); // Ver por que el promedio no devuelve un numero, seguro
                                                                            // sea por el usuario 
        assert.equal(promedio, promedioEsperado);
    })

    
})