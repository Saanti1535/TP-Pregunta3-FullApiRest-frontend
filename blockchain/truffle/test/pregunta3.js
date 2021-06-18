const Pregunta3 = artifacts.require("./Pregunta3.sol")
const assert = require('assert')

let smartContract

contract('Falopa', async (usuarios) => {
    let pregunta;
    let estado; //= "Activo" //Estados.Activo


    beforeEach('Inicialización', async () => {
        smartContract = await Pregunta3.new();  // vs. deployed() que devuelve un singleton
        // await smartContract.duenio = 0x0E15d9b5fC43d66B5981ef9f247c6d51b3cECaFa
        // await smartContract.cambiarEstado("Activo");
        // pregunta = await smartContract.nuevaPregunta("pregunta1", ["opcion1", "opcion2"], "opcion1", 10);
        // const textoDeLaPregunta = await smartContract.pregunta.call(pregunta).textoPregunta;
        // assert.equal(100, balance)
    })

    // it("sarasa", async () => {
    //     var alguien = await smartContract.getSender()
    //     console.log(alguien)
    //     assert.equal(alguien, "");
    // })

    // it("sarasa2", async () => {
    //     var unEstado = await smartContract.getEnum()
    //     assert.equal(unEstado, "");
    // })

    it("Cambio de estado por un usuario X", async() => {
        var alguien = usuarios[0] // 0xC9EE4f93134C0161fF79eA2C85AC29eb7Fb93752 //
        await smartContract.cambiarEstado(await smartContract.getEnum());
        assert.equal(await smartContract.estado.call(), 1); 
    })

    // it('should allow to withdraw money if there is enough', async () => {
    //     await walletSmartContract.withdraw(theAccount, 20);
    //     const balance = await walletSmartContract.wallet.call(theAccount);
    //     assert.equal(balance, 80);
    // })
})