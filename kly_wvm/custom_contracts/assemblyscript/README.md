# Dependencies

> You can also just use `package.json` and `package-lock.yaml` to load below dependencies

#### Install AssmeblyScript globally

```bash
npm install -g assemblyscript@0.19.9
```


#### Install other requirements


```bash
pnpm add assemblyscript-json@1.1.0 wasm-metering@0.2.1 @assemblyscript/loader@0.20.13
```


#### Compiling smart contract

```bash
asc contract.ts -o contract.wasm --exportRuntime
```