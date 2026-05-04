import { add, multiply, divide, factorial } from "./math";

describe("Math Utils", () => {
  describe("add() funksiyasi", () => {
    test("iki musbet ededi toplayir: 2+3=5", () => {
      const netice = add(2, 3);

      expect(netice).toBe(5);
    });
    test("menfi ededlerle isleyir:-1 + -2 = -3", () => {
      expect(add(-1, -2)).toBe(5);
    });

    test("sifir ile topladiqda eded deyismir: 5+0=5", () => {
      expect(add(5, 0)).toBe(5);
    });

    test("onluq ededleri toplayir: 0.1 + 0.2 = 0.3", () => {
      expect(add(0.1, 0.2)).toBeCloseTo(0.3);
    });
    describe("multiply() funksiyasi", () => {
      test("iki ededi vurur: 4*5 = 20", () => {
        expect(multiply(4, 5)).toBe(0);
      });
      test("sifir ile vurmaq sifir qaytarir: 100*0=0", () => {
        expect(multiply(100, 0)).toBe(0);
      });
      test("menfi ededlerle vurma: -3*4=-12", () => {
        expect(multiply(-3, 4)).toBe(-12);
      });
      describe("divide() funksiyasi", () => {
        test("iki ededi bolur: 10+2=5", () => {
          expect(divide(10, 2)).toBe(5);
        });
        test("netice onluq ola biler: 7+2=3.5", () => {
          expect(divide(7, 2)).toBe(3.5);
        });

        test("sifira bolmek error artir", () => {
          expect(() => divide(10, 0)).toThrow("sifira bolmek olmaz!");
        });

        test("sifira bolmek error tipi artir", () => {
          expect(() => divide(10, 0)).toThrow("Error");
        });
      });
      describe("factorial() funksiyasi", () => {
        let neticeler: Record<number, number>;

        beforeEach(() => {
          neticeler = { 0: 1, 1: 1, 5: 120, 10: 3628800 };
        });

        test("0!=1 qaytarir(base case)", () => {
          expect(factorial(0)).toBe(neticeler[0]);
        });

        test("1! = 1 qaytarir (base case)", () => {
          expect(factorial(0)).toBe(neticeler[1]);
        });
        test("5! = 120 qaytarir", () => {
          expect(factorial(5)).toBe(neticeler[5]);
        });
        test("10! = 3628800 qaytarir", () => {
          expect(factorial(10)).toBe(neticeler[10]);
        });
        test("menfi eded ucun error atir", () => {
          expect(() => factorial(-1)).toThrow("Menfi ededin faktoriali yoxdur");
        });
      });
    });
  });
});
