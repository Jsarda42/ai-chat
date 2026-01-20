"use client";
import { useEffect, useState } from "react";

type Operator = "+" | "-" | "×" | "÷" | null;

export default function WasmCalculator() {
  const [module, setModule] = useState<any>(null);
  const [display, setDisplay] = useState("0");
  const [storedValue, setStoredValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<Operator>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "/wasm/calculator.js";
    script.async = true;

    script.onload = async () => {
      // @ts-ignore
      const m = await window.createCalculatorModule();
      setModule(m);
    };

    document.body.appendChild(script);
  }, []);

  function inputNumber(num: string) {
    setDisplay(display === "0" ? num : display + num);
  }

  function inputOperator(op: Operator) {
    setStoredValue(parseFloat(display));
    setOperator(op);
    setDisplay("0");
  }

  function calculate() {
    if (!module || storedValue === null || !operator) return;

    const current = parseFloat(display);
    let result = 0;

    switch (operator) {
      case "+":
        result = module.ccall("add", "number", ["number", "number"], [storedValue, current]);
        break;
      case "-":
        result = module.ccall("subtract", "number", ["number", "number"], [storedValue, current]);
        break;
      case "×":
        result = module.ccall("multiply", "number", ["number", "number"], [storedValue, current]);
        break;
      case "÷":
        result = module.ccall("divide", "number", ["number", "number"], [storedValue, current]);
        break;
    }

    setDisplay(result.toString());
    setStoredValue(null);
    setOperator(null);
  }

  function clear() {
    setDisplay("0");
    setStoredValue(null);
    setOperator(null);
  }

  if (!module) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Loading WASM Calculator…
      </div>
    );
  }

  const button =
    "text-white h-14 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xl font-medium transition cursor-pointer";

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-80 rounded-2xl bg-white p-4 shadow-2xl border border-white/10">
        <div className="mb-4 rounded-lg bg-black p-3 text-right text-2xl font-mono text-white">
          {display}
        </div>

        <div className="grid grid-cols-4 gap-2">
          <button onClick={clear} className={`${button} col-span-2 bg-red-600 hover:bg-red-500`}>
            C
          </button>
          <button onClick={() => inputOperator("÷")} className={button}>÷</button>
          <button onClick={() => inputOperator("×")} className={button}>×</button>

          {[7,8,9].map(n => (
            <button key={n} onClick={() => inputNumber(n.toString())} className={button}>{n}</button>
          ))}
          <button onClick={() => inputOperator("-")} className={button}>-</button>

          {[4,5,6].map(n => (
            <button key={n} onClick={() => inputNumber(n.toString())} className={button}>{n}</button>
          ))}
          <button onClick={() => inputOperator("+")} className={button}>+</button>

          {[1,2,3].map(n => (
            <button key={n} onClick={() => inputNumber(n.toString())} className={button}>{n}</button>
          ))}

          <button onClick={() => inputNumber("0")} className={`${button} col-span-2`}>0</button>
          <button onClick={calculate} className={`${button} bg-blue-600 hover:bg-blue-500`}>=</button>
        </div>
      </div>
    </div>
  );
}
