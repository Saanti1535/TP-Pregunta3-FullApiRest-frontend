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

    // it("Crear una nueva pregunta", async() => {
    //     let pregunta;
    //     let unAutor = usuarios[2];
    //     let textoPregunta = "¿Será la primera pregunta?";
    //     let opciones = ["Si", "No", "No sabe no contesta"];
    //     let respuesta = "Si";
    //     let puntos = 10;

    //     await smartContract.nuevaPregunta(unAutor, textoPregunta, opciones, respuesta, puntos);
    //     pregunta = await smartContract.obtenerPregunta(1);

    //     assert.equal(pregunta.textoPregunta, textoPregunta);
    // })

    // it("El promedio de puntos de un usuario que no respondió nada", async() => {
    //     let usuario = usuarios[9];
    //     let promedio = await smartContract.promedioRespuestas(usuario);

    //     assert.equal(promedio, 0);
    // })

    
})