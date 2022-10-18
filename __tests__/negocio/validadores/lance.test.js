import { validaFormatoNumericoDoLance, validaLance } from '../../../src/negocio/validadores/lance'

describe("negocio/validadores/lance", () => {

    it("must return 'Lance Valido' and 'Lance Invalido'", () => {

        const lanceValido = validaFormatoNumericoDoLance('1000')
        expect(lanceValido).toEqual('Lance válido')

        const lanceInvalido = validaFormatoNumericoDoLance('aaa')
        expect(lanceInvalido).toEqual('Lance inválido, digite um valor como: "100" ou "99,99"')
    })

    it("must validate the bid", () => {

        const sameValue = 1000
        const valueHigher = 1200
        const valueLower = 900
        const auction = {
            '0': {
                id: 1,
                nome: 'Auction',
                descricao: 'Auction',
                valorInicial: 1000,
                icone: 'Auction',
                cor: '#ffba05'
            },
            lances: [{ valor: 1100, leilaoId: 1, id: 1 }]
        }

        const validatingBidLower1 = validaLance(sameValue, auction)
        // expect(validatingBidLower1).toEqual('Lance menor que o maior lance já realizado')

        // const validatingBidHigher = validaLance(valueHigher, auction)
        // expect(validatingBidHigher).toEqual('Lance válido')

        // const validatingBidLower = validaLance(valueLower, auction)
        // expect(validatingBidLower).toEqual('Lance menor que o maior lance já realizado')
    })
})