import apiLeiloes from '../../src/servicos/apiLeiloes'
import { obtemLancesDoLeilao, adicionaLance } from '../../src/repositorio/lance'

jest.mock('../../src/servicos/apiLeiloes')

const mockLances = [
    {
        id: 1,
        valor: 500.00,
        leilaoId: 1
    },
    {
        id: 2,
        valor: 900.00,
        leilaoId: 2
    },
    {
        id: 3,
        valor: 700.00,
        leilaoId: 1
    }
]

const getBidsFromAuction = (id) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const searchId = id[Number(id.indexOf("="))+1]
            const result = mockLances.filter((item) => {
                return item.leilaoId == searchId
            })

            resolve({
                data: result
            })
        }, 200)
    })
}

const getBidsFromAuctionErro = () => {
    return new Promise((_, reject) => {
        setTimeout(() => {
            reject()
        }, 200)
    })
}

const postNewBid = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, 200)
    })
}

const postNewBidErr = () => {
    return new Promise((_, reject) => {
        setTimeout(() => {
            reject()
        }, 200)
    })
}

describe("src/repositorio/lance", () => {

    describe("obtemLancesDoLeilao()", () => {
        it("must return all the bids of the auction ID", async () => {

            apiLeiloes.get.mockImplementation((id) => getBidsFromAuction(id))
            const getBids = await obtemLancesDoLeilao(1)

            expect(getBids).toEqual([
                { id: 1, valor: 500, leilaoId: 1 },
                { id: 3, valor: 700, leilaoId: 1 }
            ])

            apiLeiloes.get.mockImplementation(() => getBidsFromAuctionErro())
            const getBidsErr = await obtemLancesDoLeilao()

            expect(getBidsErr).toEqual([])
        })

        describe("adicionaLance()", () => {

            it("must return true", async () => {

                apiLeiloes.post.mockImplementation(() => postNewBid())
                const addNewBid = await adicionaLance()

                expect(addNewBid).toBeTruthy()
            })

            it("must return false", async () => {

                apiLeiloes.post.mockClear();

                apiLeiloes.post.mockImplementation(() => postNewBidErr())
                const addNewBidErr = await adicionaLance()

                expect(addNewBidErr).toBeFalsy()
            })
        })
    })
})