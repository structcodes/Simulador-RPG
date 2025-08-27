// Pegando elementos do HTML
const diceTypeEl = document.getElementById('diceType');
const rollBtn = document.getElementById('rollBtn');
const rerollBtn = document.getElementById('rerollBtn');
const diceVisual = document.getElementById('diceVisual');
const resultValue = document.getElementById('resultValue');

// Gerar número aleatório entre 1 e max (Inclusivo)
function roll(max) {
  return Math.floor(Math.random() * max ) + 1;2
}

// Animação: mostra números mudando rapidamente e retorna o valor final
 function animateRoll(slides, duration = 800, interval = 50) {
  return new Promise((resolve) => {
    const stopTime = Date.now() + duration;
    diceVisual.classList.add('rolling');
    const tick = setInterval (()=> {
      const temp = roll(slides);
      diceVisual.textContent = temp;
    }, interval);

    setTimeout(()=> {
      clearInterval(tick);
      diceVisual.classList.remove('rolling');
      const final = roll(slides);
      diceVisual.textContent = final;
      resolve(final);
    }, duration);
  })
 }

//  função principal de rolar 
 async function doRoll() {
  const sides = Number(diceTypeEl.value) || 6;
  // desativa botões para evitar cliques múltiplos
  rollBtn.disable = true;
  rerollBtn.desable = true;
  rollBtn.textContent = 'Rolando';

  try{
   const result = await animateRoll(sides, 900, 40);
    resultValue.textContent = result + ' (D' + sides + ')';
    }catch(e){
      console.error(e);
    }finally{
      rollBtn.disabled = false;
      rerollBtn.disabled = false;
      rollBtn.textContent = 'Rolar';
    }
 }

  rollBtn.addEventListener('click', doRoll);
    rerollBtn.addEventListener('click', doRoll);

    // Permitir rolar com Enter quando select estiver em foco
    diceTypeEl.addEventListener('keydown', (e)=>{
      if(e.key === 'Enter') doRoll();
    });

    // Inicializa com D6
    diceVisual.textContent = '6';
    resultValue.textContent = '—';