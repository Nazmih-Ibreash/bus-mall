//(`user strict`);

let firstImgIndex = 0;
let secondImgIndex = 0;
let lastImgIndex = 0;


let products = [];
let arrIndex = [];

function FavProduct(name, imgPath) {
    this.name = name;
    this.imgPath = imgPath;
    this.numOfTimesImgSeen = 0;
    this.numOfImgClicks = 0;

    products.push(this);
}



new FavProduct('bag', 'img/bag.jpg');
new FavProduct('banana', 'img/banana.jpg');
new FavProduct('bathroom', 'img/bathroom.jpg');
new FavProduct('boots', 'img/boots.jpg');
new FavProduct('breakfast', 'img/breakfast.jpg');
new FavProduct('bubblegum', 'img/bubblegum.jpg');
new FavProduct('chair', 'img/chair.jpg');
new FavProduct('cthulhu', 'img/cthulhu.jpg');
new FavProduct('dog-duck', 'img/dog-duck.jpg');
new FavProduct('dragon', 'img/dragon.jpg');
new FavProduct('pen', 'img/pen.jpg');
new FavProduct('pet-sweep', 'img/pet-sweep.jpg');
new FavProduct('scissors', 'img/scissors.jpg');
new FavProduct('shark', 'img/shark.jpg');
new FavProduct('sweep', 'img/sweep.png');
new FavProduct('tauntaun', 'img/tauntaun.jpg');
new FavProduct('unicorn', 'img/unicorn.jpg');
new FavProduct('usb', 'img/usb.gif');
new FavProduct('water-can', 'img/water-can.jpg');
new FavProduct('wine-glass', 'img/wine-glass.jpg');

console.log(products);
console.log('products length: ' + products.length);

function genearateIndex() {
    return Math.floor(Math.random() * products.length);
}

// console.log(firstImgIndex);
// console.log(secondImgIndex);
// console.log(lastImgIndex);

let firstDiv = document.getElementById("first");
let secondDiv = document.getElementById("second");
let lastDiv = document.getElementById("last");


console.log(firstDiv);
console.log(secondDiv);
console.log(lastDiv);


//firstDiv.src = products[firstImgIndex].imgPath;
//let firstPic = firstDiv.appendchild('img');

function generateRandomImgs() {
    firstImgIndex = genearateIndex();
    secondImgIndex = genearateIndex();
    lastImgIndex = genearateIndex();

    while (firstImgIndex === secondImgIndex || secondImgIndex === lastImgIndex || firstImgIndex === lastImgIndex) {
        firstImgIndex = genearateIndex();
        secondImgIndex = genearateIndex();
        lastImgIndex = genearateIndex();
    }

    firstDiv.src = products[firstImgIndex].imgPath;
    secondDiv.src = products[secondImgIndex].imgPath;
    lastDiv.src = products[lastImgIndex].imgPath;
}

generateRandomImgs();
arrIndex.includes(firstImgIndex, secondImgIndex, lastImgIndex);

let attempts = 25;
let userClicks = 0;

firstDiv.addEventListener('click', clickEvent);
secondDiv.addEventListener('click', clickEvent);
lastDiv.addEventListener('click', clickEvent);


function clickEvent(event) {
    console.log(event.target.id);

    while (arrIndex.includes(firstImgIndex, secondImgIndex, lastImgIndex)) {
        generateRandomImgs();
    }

    products[firstImgIndex].numOfTimesImgSeen++;
    products[secondImgIndex].numOfTimesImgSeen++;
    products[lastImgIndex].numOfTimesImgSeen++;

    userClicks++;

    if (userClicks < attempts) {
        if (event.target.id === 'first') {
            products[firstImgIndex].numOfImgClicks++;
        } else if (event.target.id === 'second') {
            products[secondImgIndex].numOfImgClicks++;
        } else {
            products[lastImgIndex].numOfImgClicks++;
        }
        arrIndex.length=0;
        arrIndex.push(firstImgIndex, secondImgIndex, lastImgIndex);
        generateRandomImgs();
    }
    else {
        let resSection = document.getElementById('getResults');
        let resButton = document.createElement('button');
        resButton.textContent = 'view results';
        resSection.appendChild(resButton);

        resButton.addEventListener('click', viewResults);

        function viewResults(event) {
            let resultList = document.createElement('ul');
            resSection.appendChild(resultList);

            for (let i = 0; i < products.length; i++) {
                let listItems = document.createElement('li');
                resultList.appendChild(listItems);
                listItems.textContent = `${products[i].name} had ${products[i].numOfImgClicks} votes, and was seen ${products[i].numOfTimesImgSeen} times.`;
            }
        }
        firstDiv.removeEventListener('click', clickEvent);
        secondDiv.removeEventListener('click', clickEvent);
        lastDiv.removeEventListener('click', clickEvent);
    }

}