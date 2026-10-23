const $btnKick = document.getElementById('btn-kick');
const $btnSuperKick = document.getElementById('btn-super-kick');

const character = {
    name: 'Pikachu',
    defaultHP: 100,
    damageHP: 100,
    elHP: document.getElementById('health-character'),
    elProgressbar: document.getElementById('progressbar-character'),
};

const enemy = {
    name: 'Charmander',
    defaultHP: 100,
    damageHP: 100,
    elHP: document.getElementById('health-enemy'),
    elProgressbar: document.getElementById('progressbar-enemy'),
};

function random(num) {
    return Math.ceil(Math.random() * num);
}

function renderHPLife(person) {
    person.elHP.innerText = person.damageHP + ' / ' + person.defaultHP;
}

function renderProgressbarHP(person) {
    person.elProgressbar.style.width = person.damageHP + '%';

    if (person.damageHP > 60) {
        person.elProgressbar.classList.remove('low', 'critical');
    } else if (person.damageHP <= 60 && person.damageHP > 20) {
        person.elProgressbar.classList.add('low');
        person.elProgressbar.classList.remove('critical');
    } else {
        person.elProgressbar.classList.add('critical');
        person.elProgressbar.classList.remove('low');
    }
}

function renderHP(person) {
    renderHPLife(person);
    renderProgressbarHP(person);
}

function changeHP(count, person) {
    if (person.damageHP <= count) {
        person.damageHP = 0;
        renderHP(person);
        alert('Бідний ' + person.name + ' програв бій!');
        $btnKick.disabled = true;
        $btnSuperKick.disabled = true;
    } else {
        person.damageHP -= count;
        renderHP(person);
    }
}

function attack(characterMaxDamage, enemyMaxDamage) {
    changeHP(random(characterMaxDamage), character);
    if (character.damageHP > 0) {
        changeHP(random(enemyMaxDamage), enemy);
    }
}

$btnKick.addEventListener('click', function () {
    console.log('Thunder Jolt!');
    attack(20, 20);
});

$btnSuperKick.addEventListener('click', function () {
    console.log('Electro Ball!');
    attack(15, 40);
});

function init() {
    console.log('Start Game!');
    renderHP(character);
    renderHP(enemy);
}

init();