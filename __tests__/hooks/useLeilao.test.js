import useLeilao from '../../src/hooks/useLeilao';
import { obtemLeilao } from '../../src/repositorio/leilao';
import { renderHook, act } from '@testing-library/react-hooks';
import { obtemLancesDoLeilao, adicionaLance } from '../../src/repositorio/lance';

jest.mock('../../src/repositorio/lance')
jest.mock('../../src/repositorio/leilao')

const mockLeilao = [{
    id: 1,
    nome: "Leilao",
    descricao: "Leilao",
    valorInicial: 1000,
    icone: "Leilao",
    cor: "#ffba05"
}]

const mockLeilaoAtualizado = [
    {
        id: 1,
        nome: "Leilao Atualizado",
        descricao: "Leilao Atualizado",
        valorInicial: 1000,
        icone: "Leilao Atualizado",
        cor: "#ffba05"
    }
]

const mockLances = [{
    valor: 1000.00,
    leilaoId: 1,
    id: 1
}]

describe("hooks/useLeilao", () => {

    it("must update the auction", async () => {
        obtemLeilao.mockImplementation(() => mockLeilao)
        obtemLancesDoLeilao.mockImplementation(() => mockLances)

        const { result, waitForNextUpdate } = renderHook(() => useLeilao())
        expect(result.current[0]).toEqual({})

        await waitForNextUpdate()
        obtemLeilao.mockImplementation(() => mockLeilaoAtualizado)
        expect(result.current[0]).toEqual({ ...mockLeilao, lances: mockLances })

        await act(() => result.current[1]())
        expect(result.current[0]).toEqual({ ...mockLeilaoAtualizado, lances: mockLances })
    })

    it('must make a post on API', async () => {
        adicionaLance.mockImplementation(() => true)
        const { result } = renderHook(() => useLeilao())

        let ErrText = ''
        await act(() => ErrText = result.current[2]('a')) // testing an error
        expect(ErrText._3).toEqual('Lance inválido, digite um valor como: "100" ou "99,99"')

        let errBid = ''
        await act(() => errBid = result.current[2]('100')) // testing an error
        expect(errBid._3).toEqual('Lance menor que o maior lance já realizado')

        let postSuccess
        await act(() => postSuccess = result.current[2]('2000'))
        expect(postSuccess._3).toEqual('Lance enviado com sucesso')

        adicionaLance.mockImplementation(() => false)

        let postFailed
        await act(() => postFailed = result.current[2]('2100')) // testing an error
        expect(postFailed._3).toEqual('Lance não enviado, tente novamente')
    })
})