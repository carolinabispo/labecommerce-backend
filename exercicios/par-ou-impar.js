const playerUser = process.argv[2]
const playerNumber = parseInt(process.argv[3])


function randomNumber() {
    return Math.floor(Math.random() * 6);

  }

  const computerParOuImpar = playerUser === 'par' ? 'impar' : 'par'
  const computerNuber = randomNumber() 

  const total = playerNumber + computerNuber
  const resultado = total % 2 === 0 ? 'par' : 'impar'

  let winner;

  if(resultado === playerUser && playerUser !== computerParOuImpar) {
    winner = 'Você ganhou'
  } else {
    winner = "Você perdeu"
  }

  console.log(`Você escolheu ${playerUser} seu numero é ${playerNumber } e o computador escolheu ${computerParOuImpar} o número do computado é ${computerNuber} o resultado foi ${total} e ${winner}`);