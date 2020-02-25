# Cubos CLI

## Instal:
npm i -D cubos-cli

## Use:
npx cubos-cli -h:
npx cubos-cli -c ted 
npx cubos-cli -c ted -s
npx cubos-cli -c ted -ts
npx cubos-cli -c ted -ts -m cpf:string value:number
npx cubos-cli -c ted -f getTed#id:int createTed#value:int,cpf:string -ts
npx cubos-cli -c ted -f getTed#id:int createTed#value:int,cpf:string -m cpf:string value:number -ts
