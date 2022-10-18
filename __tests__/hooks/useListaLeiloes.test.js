import { obtemLeiloes } from '../../src/repositorio/leilao';
import useListaLeiloes from '../../src/hooks/useListaLeiloes';
import { renderHook, act } from '@testing-library/react-hooks';

jest.mock('../../src/repositorio/leilao')

const mockLeiloes = [
    {
        id: 1,
        nome: 'Leilao',
        descricao: 'Descricao do leilao'
    }
]

const mockLeiloesAtualizada = [
    {
        id: 1,
        nome: 'Leilao',
        descricao: 'Descricao do leilao'
    },
    {
        id: 2,
        nome: 'Leilao 2',
        descricao: 'Descricao do leilao 2'
    }
]

describe("hooks/useListaLeiloes", () => {

    it('must return an auction list to get an update', async () => {

        obtemLeiloes.mockImplementation(() => mockLeiloes)

        const { result, waitForNextUpdate } = renderHook(() => useListaLeiloes());
        expect(result.current[0]).toEqual([])

        await waitForNextUpdate();
        expect(result.current[0]).toEqual(mockLeiloes)

        obtemLeiloes.mockImplementation(() => mockLeiloesAtualizada)

        await act(() => result.current[1]())
        expect(result.current[0]).toEqual(mockLeiloesAtualizada)
    })
})