pageLoader();

function pageLoader(){
    const navLinks = document.getElementsByClassName('nav-link')
    for (let link of navLinks){
        link.addEventListener('click',changeDiv)
    }
    const findCountriesForm = document.querySelector('#find-country-form');
    findCountriesForm.addEventListener('submit',e=>findCountry(e));
}

function changeDiv(e){
    const switchOff = document.getElementsByClassName('is-visible');
    for(let div of switchOff){
        div.classList.replace('is-visible','is-invisible');
        let navLink = document.getElementsByName(div.id)[0];
        navLink.classList.remove('active');
    }
    let switchOnTarget = e.target.name;
    const switchOn = document.getElementById(switchOnTarget);
    switchOn.classList.replace('is-invisible','is-visible');
    e.target.classList.add('active')
}

function findCountry(event){
    event.preventDefault();
    const country = event.target.elements[0].value;
    const url = `https://restcountries.com/v3.1/name/${country}`;
    fetch(url)
    .then(response=>response.json())
    .then(data => displayCountry(data))
    .catch(err => console.error(err))
}

function unpack(attribute){
    result = []
    function helper(attr){
    if(typeof(attr)=='string'){
        result.push(attr)
    }
    else if(Array.isArray(attr)){
        for(let item of attr){
            helper(item)
        }
    }
    else if(attr instanceof Object){
        for(let key in attr){
            helper(attr[key])
        }
    }
    }
    helper(attribute)
    return result.join('\n')

}


function displayCountry(data){
    for(let el of ['viewname','viewcapital','viewflag','viewcurrency','viewlanguages','viewarms']){
        document.getElementById(el).innerHTML=''
    }
    let countryName = document.createElement('countryName');
    countryName.innerText = data[0].name['official'] ?? '-';
    document.getElementById('viewname').appendChild(countryName);
    let countryCapital = document.createElement('countryCapital');
    countryCapital.innerText = data[0].capital ?? '-';
    document.getElementById('viewcapital').appendChild(countryCapital);
    let countryFlag = document.createElement('countryFlag');
    countryFlag.innerText = data[0].flag ?? '-';
    document.getElementById('viewflag').appendChild(countryFlag)
    let countryCurrency = document.createElement('countryCurrency');
    countryCurrency.innerText = unpack(data[0].currencies) ?? '-';
    document.getElementById('viewcurrency').appendChild(countryCurrency);
    let countryLanguages = document.createElement('countryLanguages');
    countryLanguages.innerText = unpack(data[0].languages) ?? '-';
    document.getElementById('viewlanguages').appendChild(countryLanguages);
    let countryArms = document.createElement('img');
    countryArms.src = data[0].coatOfArms.png ?? '-';
    document.getElementById('viewarms').appendChild(countryArms);
}