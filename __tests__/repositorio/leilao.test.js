import apiLeiloes from '../../src/servicos/apiLeiloes'
import { obtemLeiloes, obtemLeilao } from "../../src/repositorio/leilao";

jest.mock('../../src/servicos/apiLeiloes')

const mockLeiloes = [
    {
        id: 1,
        nome: 'Leilao',
        descricao: 'Descricao do leilao'
    },
    {
        id: 2,
        nome: 'Leilao2',
        descricao: 'Descricao do leilao2'
    }
];

const mockRequisicao = (retorno) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                data: retorno
            })
        }, 200)
    })
}

const mockRequisicaoErro = () => {
    return new Promise((_, reject) => {
        setTimeout(() => {
            reject()
        }, 200)
    })
}

const mockRequisicaoLeilao = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const result = mockLeiloes.reduce((_, currValue) => {
                return currValue.id == 2 && currValue
            })

            resolve({
                data: result
            })
        }, 200)
    })
}

const mockRequisicaoLeilaoErro = () => {
    return new Promise((_, reject) => {
        setTimeout(() => {
            reject()
        }, 200)
    })
}

describe("repositorio/leilao", () => {

    beforeEach(() => {
        apiLeiloes.get.mockClear();
    })

    describe("obtemLeiloes()", () => {

        it("must return a list of auctions", async () => {

            apiLeiloes.get.mockImplementation(() => mockRequisicao(mockLeiloes))
            const auctions = await obtemLeiloes();

            expect(auctions).toEqual(mockLeiloes)

            expect(apiLeiloes.get).toHaveBeenCalledWith('/leiloes')
            expect(apiLeiloes.get).toHaveBeenCalledTimes(1)
        })

        it("must return an empty list when the request fails", async () => {

            apiLeiloes.get.mockImplementation(() => mockRequisicaoErro())
            const auctions = await obtemLeiloes();

            expect(auctions).toEqual([])

            expect(apiLeiloes.get).toHaveBeenCalledWith('/leiloes')
            expect(apiLeiloes.get).toHaveBeenCalledTimes(1)
        })
    })

    describe("obtemLeilao()", () => {

        it("must return just the auction from the id that i will ask", async () => {

            apiLeiloes.get.mockImplementation(() => mockRequisicaoLeilao())
            const auction = await obtemLeilao()
    
            expect(auction).toEqual({ id: 2, nome: 'Leilao2', descricao: 'Descricao do leilao2' })
        })
    
        it("must return an empty object", async () => {
    
            apiLeiloes.get.mockImplementation(() => mockRequisicaoLeilaoErro())
            const auction = await obtemLeilao()
    
            expect(auction).toEqual({})
        })
    })
})
