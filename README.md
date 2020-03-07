<h1 align="center">
  <br>
  <a href="https://cubos.io"><img src="https://user-images.githubusercontent.com/8952441/75359066-94044a00-5892-11ea-9ea6-2027e027870f.jpeg" alt="Cubos" width="200"></a>
  <br>
  Cubos CLI
  <br>
</h1>

<h4 align="center">Development tool for <a href="http://cubos.io" target="_blank">Cubos</a>.</h4>

<p align="center">
  <a href="https://badge.fury.io/js/cubos-cli">
    <img src="https://badge.fury.io/js/cubos-cli.svg"
         alt="Cubos CLI">
  </a>
</p>

**Installation**
---

1. Install with [`npm`](https://www.npmjs.com/package/cubos-cli)
    + `$ npm install cubos-cli`

**How To Use**
---

1. Create a controller
    + `$ cubos-cli -c ted`
2. Create a controller with tests
    + `$ cubos-cli -c ted -t`
3. Create a controller with model and tests
    + `$ cubos-cli -c ted -m cpf:string value:number -t`
4. Create a controller with functions,  model and tests
    + `$ cubos-cli -c ted -f getHistoryTed#cpf:string saveHistoryTed#cpf:string,value:money -t -m cpf:string value:number`
5. Create a controller with functions,  model, tests and repository
    + `$ cubos-cli -c ted -f getHistoryTed#cpf:string saveHistoryTed#cpf:string,value:money -t -m cpf:string value:number -r`
6. Helper
    + `$ cubos-cli -h`
    
**After running what should i do?**
---

`$ npm run sdkgen`
