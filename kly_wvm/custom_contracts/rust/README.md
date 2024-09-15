# Dependencies


## 1. Rust version

Install Rust first

Then move to older version - we need `v1.64.0`

```bash
rustup install 1.64.0
```

```bash
rustup default 1.64.0
```

Check if you really have appropriate version

```bash
rustc --version
```
Output:

```bash
rustc 1.64.0 (a55dd71d5 2022-09-19)
```


## 2. `wasm-pack` installation


```bash
npm install wasm-pack@0.10.3 -g
```


## 3. Build project to get bytecode of smart contract

```bash
wasm-pack build --target nodejs --release
```