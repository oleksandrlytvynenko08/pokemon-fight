const $btnKick = document.getElementById("btn-kick");
const $btnSuperKick = document.getElementById("btn-super-kick");
const $logs = document.querySelector("#logs");

const random = num => Math.ceil(Math.random() * num);

const countBtn = (count = 7, el) => {
    let clicks = 0;
    return () => {
        clicks++;
        count--;
        console.log(`Кнопка "${el.innerText}": клік №${clicks}. Залишилося натискань: ${count}`);
        
        if (count === 0) {
            el.disabled = true;
            console.log(`Ліміт вичерпано! Кнопку "${el.innerText}" заблоковано.`);
        }
    };
};

const kickCounter = countBtn(7, $btnKick);
const superKickCounter = countBtn(7, $btnSuperKick);

const generateLog = (firstPerson, secondPerson, count) => {
    const { name: firstName, damageHP, defaultHP } = firstPerson;
    const { name: secondName } = secondPerson;

    const logs = [
        `${firstName} вспомнил что-то важное, но неожиданно ${secondName}, не помня себя от испуга, ударил в предплечье врага.`,
        `${firstName} поперхнулся, и за это ${secondName} с испугу приложил прямой удар коленом в лоб врага.`,
        `${firstName} забылся, но в это время наглый ${secondName}, приняв волевое решение, неслышно подойдя сзади, ударил.`,
        `${firstName} пришел в себя, но неожиданно ${secondName} случайно нанес мощнейший удар.`,
        `${firstName} поперхнулся, но в это время ${secondName} нехотя раздробил кулаком врага.`,
        `${firstName} удивился, а ${secondName} пошатнувшись влепил подлый удар.`,
        `${firstName} высморкался, но неожиданно ${secondName} провел дробящий удар.`,
        `${firstName} пошатнулся, и внезапно наглый ${secondName} беспричинно ударил в ногу противника.`,
        `${firstName} расстроился, как вдруг, неожиданно ${secondName} случайно влепил стопой в живот соперника.`,
        `${firstName} пытался что-то сказать, но вдруг, неожиданно ${secondName} со скуки, разбил бровь сопернику.`
    ];

    return `${logs[random(logs.length) - 1]} -${count}, [${damageHP}/${defaultHP}]`;
};

function renderHPLife() {
    const { elHP, damageHP, defaultHP } = this;
    elHP.innerText = `${damageHP} / ${defaultHP}`;
}

function renderProgressbarHP() {
    const { elProgressbar, damageHP } = this;
    elProgressbar.style.width = `${damageHP}%`;

    if (damageHP > 60) {
        elProgressbar.classList.remove("low", "critical");
    } else if (damageHP <= 60 && damageHP > 20) {
        elProgressbar.classList.add("low");
        elProgressbar.classList.remove("critical");
    } else {
        elProgressbar.classList.add("critical");
        elProgressbar.classList.remove("low");
    }
}

function renderHP() {
    this.renderHPLife();
    this.renderProgressbarHP();
}

function changeHP(count) {
    this.damageHP -= count;

    if (this.damageHP < 0) {
        this.damageHP = 0;
    }

    this.renderHP();

    const logText = this === enemy 
        ? generateLog(this, character, count) 
        : generateLog(this, enemy, count);

    const $p = document.createElement("p");
    $p.innerText = logText;

    $logs.insertBefore($p, $logs.children[0]);

    if (this.damageHP === 0) {
        const { name } = this;
        alert(`Бідний ${name} програв бій!`);
        $btnKick.disabled = true;
        $btnSuperKick.disabled = true;
    }
}

const character = {
    name: "Pikachu",
    defaultHP: 100,
    damageHP: 100,
    elHP: document.getElementById("health-character"),
    elProgressbar: document.getElementById("progressbar-character"),
    changeHP,
    renderHP,
    renderHPLife,
    renderProgressbarHP,
};

const enemy = {
    name: "Charmander",
    defaultHP: 100,
    damageHP: 100,
    elHP: document.getElementById("health-enemy"),
    elProgressbar: document.getElementById("progressbar-enemy"),
    changeHP,
    renderHP,
    renderHPLife,
    renderProgressbarHP,
};

const attack = (characterMaxDamage, enemyMaxDamage) => {
    enemy.changeHP(random(enemyMaxDamage));
    if (enemy.damageHP > 0) {
        character.changeHP(random(characterMaxDamage));
    }
};

$btnKick.addEventListener('click', () => {
    kickCounter();
    attack(20, 20);
});

$btnSuperKick.addEventListener('click', () => {
    superKickCounter();
    attack(15, 40);
});

const init = () => {
    character.renderHP();
    enemy.renderHP();
};

init();