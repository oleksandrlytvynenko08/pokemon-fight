const $btnKick = document.getElementById('btn-kick');
const $btnSuperKick = document.getElementById('btn-super-kick');

function random(num) {
    return Math.ceil(Math.random() * num);
}

function renderHPLife() {
    this.elHP.innerText = this.damageHP + ' / ' + this.defaultHP;
}

function renderProgressbarHP() {
    this.elProgressbar.style.width = this.damageHP + '%';

    if (this.damageHP > 60) {
        this.elProgressbar.classList.remove('low', 'critical');
    } else if (this.damageHP <= 60 && this.damageHP > 20) {
        this.elProgressbar.classList.add('low');
        this.elProgressbar.classList.remove('critical');
    } else {
        this.elProgressbar.classList.add('critical');
        this.elProgressbar.classList.remove('low');
    }
}

function renderHP() {
    this.renderHPLife();
    this.renderProgressbarHP();
}

function changeHP(count) {
    if (this.damageHP <= count) {
        this.damageHP = 0;
        this.renderHP();
        alert('Бідний ' + this.name + ' програв бій!');
        $btnKick.disabled = true;
        $btnSuperKick.disabled = true;
    } else {
        this.damageHP -= count;
        this.renderHP();
    }
}

const character = {
    name: 'Pikachu',
    defaultHP: 100,
    damageHP: 100,
    elHP: document.getElementById('health-character'),
    elProgressbar: document.getElementById('progressbar-character'),
    changeHP: changeHP,
    renderHP: renderHP,
    renderHPLife: renderHPLife,
    renderProgressbarHP: renderProgressbarHP,
};

const enemy = {
    name: 'Charmander',
    defaultHP: 100,
    damageHP: 100,
    elHP: document.getElementById('health-enemy'),
    elProgressbar: document.getElementById('progressbar-enemy'),
    changeHP: changeHP,
    renderHP: renderHP,
    renderHPLife: renderHPLife,
    renderProgressbarHP: renderProgressbarHP,
};

function attack(characterMaxDamage, enemyMaxDamage) {
    enemy.changeHP(random(enemyMaxDamage));
    if (enemy.damageHP > 0) {
        character.changeHP(random(characterMaxDamage));
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
    console.log('Start Game with this!');
    character.renderHP();
    enemy.renderHP();
}

init();