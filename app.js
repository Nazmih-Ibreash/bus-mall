//(`user strict`);

let firstImgIndex = 0;
let secondImgIndex = 0;
let lastImgIndex = 0;


let products = [];
let oldArrIndex = [];
let newArrIndex = [];

let productsName = [];
let productsVotes = [];
let productsSeen = [];



function FavProduct(name, imgPath) {
    this.name = name;
    this.imgPath = imgPath;
    this.numOfTimesImgSeen = 0;
    this.numOfImgClicks = 0;

    products.push(this);
    productsName.push(this.name);



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

let firstDiv = document.getElementById("first");
let secondDiv = document.getElementById("second");
let lastDiv = document.getElementById("last");

console.log(firstDiv);
console.log(secondDiv);
console.log(lastDiv);

function generateRandomImgs() {
    firstImgIndex = genearateIndex();
    secondImgIndex = genearateIndex();
    lastImgIndex = genearateIndex();

    while (firstImgIndex === secondImgIndex || secondImgIndex === lastImgIndex || firstImgIndex === lastImgIndex) {
        firstImgIndex = genearateIndex();
        secondImgIndex = genearateIndex();
        lastImgIndex = genearateIndex();
    }
    newArrIndex.push(firstImgIndex);
    newArrIndex.push(secondImgIndex);
    newArrIndex.push(lastImgIndex);

    while (oldArrIndex.includes(newArrIndex[0]) || oldArrIndex.includes(newArrIndex[1]) || oldArrIndex.includes(newArrIndex[2])) {
        newArrIndex.length = 0;
        generateRandomImgs();
        console.log('new in check ' + newArrIndex);
    }
    firstDiv.src = products[firstImgIndex].imgPath;
    secondDiv.src = products[secondImgIndex].imgPath;
    lastDiv.src = products[lastImgIndex].imgPath;
}

generateRandomImgs();

oldArrIndex.push(firstImgIndex);
oldArrIndex.push(secondImgIndex);
oldArrIndex.push(lastImgIndex);
console.log('old  ' + oldArrIndex);
//console.log('new  '+ newArrIndex);



///////////////////////////////////////////////////////////////////////////////////////////////
////////LAB 13 LOCAL STORAGE ///////////////////////////////////////////////////////////////////////////////////////

function storage() {
    let stringOfProducts = JSON.stringify(products);
    //console.log('stringOfProducts: ' + stringOfProducts);

    localStorage.setItem('favProd', stringOfProducts);
    //localStorage.setItem('favProd', stringOfProducts);
}
let stringToArrayData ;
function getFromStorage() {
    let data = localStorage.getItem('favProd');
    //console.log('getFromStorage' + data);

    stringToArrayData = JSON.parse(data);
    //console.log('stringToArrayData' + stringToArrayData);

    if (stringToArrayData !== null) {
        products = stringToArrayData;
    }


}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let attempts = 25;
let userClicks = 0;

firstDiv.addEventListener('click', clickEvent);
secondDiv.addEventListener('click', clickEvent);
lastDiv.addEventListener('click', clickEvent);

function clickEvent(event) {
    console.log(event.target.id);
    console.log(newArrIndex);

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
        oldArrIndex.length = 0;
        //oldArrIndex=newArrIndex;
        oldArrIndex.push(firstImgIndex);
        oldArrIndex.push(secondImgIndex);
        oldArrIndex.push(lastImgIndex);

        generateRandomImgs();
    }
    else {
        storage();
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
            resButton.removeEventListener('click', viewResults);
        }
        for (let i = 0; i < products.length; i++) {
            productsVotes.push(products[i].numOfImgClicks);
            productsSeen.push(products[i].numOfTimesImgSeen);
            // localStorage.setItem('numOfImgClicks', (products[i].numOfImgClicks));
            // // stringToArrayData[numOfImgClicks].push(products[i].numOfImgClicks);
            // // stringToArrayData[numOfTimesImgSeen].push(products[i].numOfTimesImgSeen);
            // console.log(localStorage);
        }

        chart();
        console.log(products);

        firstDiv.removeEventListener('click', clickEvent);
        secondDiv.removeEventListener('click', clickEvent);
        lastDiv.removeEventListener('click', clickEvent);
    }

}


// chart.js
function chart() {
    let ctx = document.getElementById('myChart').getContext('2d');

    let chart = new Chart(ctx, {
        // what type is the chart
        type: 'bar',

        //  the data for showing
        data: {
            //  for the names
            labels: productsName,

            datasets: [
                {
                    label: 'Fav Products Votes',
                    data: productsVotes,
                    backgroundColor: [
                        '#ff8882',
                    ],

                    borderWidth: 1
                },

                {
                    label: 'Products Shown',
                    data: productsSeen,
                    backgroundColor: [
                        '#194350',
                    ],

                    borderWidth: 1
                }

            ]
        },
        options: {}
    });

}

getFromStorage();
