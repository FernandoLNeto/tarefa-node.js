const fs = require("fs");
const readline = require("readline");
const { EventEmitter } = require("events");
const eventEmitter = new EventEmitter();

const leitor = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

eventEmitter.on("resumo", (listNumber, listString, soma) => {
  console.log("Quandida de linhas somente com números: ", listNumber.length);
  console.log("A soma dos numeros no arquivo é: ", soma);
  console.log("Quantidade de linhas com texto e númros: ", listString.length);
  console.timeEnd("label");
  iniciarNovamente();
});

function iniciar() {
  leitor.question("informe o nome do arquivo: ", function (resposta) {
    processo(resposta);
  });
}

function processo(caminho) {
  fs.readFile(caminho, "utf8", (err, data) => {
    console.time("label");
    if (err) {
      console.error(err);
      return;
    }
    const lista = data.split("\r\n");
    const listNumber = lista.filter((number) => !isNaN(number));
    const listString = lista.filter((string) => isNaN(string));
    var soma = 0;

    listNumber.map((item) => (soma += parseInt(item)));
    eventEmitter.emit("resumo", listNumber, listString, soma);
  });
}

iniciar();

function iniciarNovamente() {
  leitor.question(
    "Deseja continuar a execução? \n Digite S ou N:",
    function (resposta) {
      if (resposta == "S") {
        console.clear();
        iniciar();
      } else {
        console.clear();
        setTimeout(() => {
          console.clear();
          leitor.close();
        }, 3000);
        console.log("Finalizando programa...");
      }
    }
  );
}
