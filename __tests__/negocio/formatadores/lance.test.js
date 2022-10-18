import { formataMaiorLanceDoLeilao } from "../../../src/negocio/formatadores/lance";

describe("negocio/formatadores/lance", () => {

    it("must return the number 10", () => {
        const lances = [
            {
              "valor": 1000,
              "id": 1
            },
            {
              "valor": 1000.01,
              "id": 1
            },
            {
              "valor": 800.01,
              "id": 1
            },
            {
              "valor": 800.02,
              "id": 1
            }
          ]
        const result = formataMaiorLanceDoLeilao(lances, 900)

        expect(result).toBe(1000.01)
    })
})