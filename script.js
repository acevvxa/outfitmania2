// 🌌 Stars background
const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const stars = Array.from({length:200},() => ({
  x:Math.random()*canvas.width,
  y:Math.random()*canvas.height,
  size:Math.random()*2,
  speed:Math.random()*0.5,
  color:'#7b2ff7'
}));

let darkMode=false;

function drawStars(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  stars.forEach(star=>{
    ctx.fillStyle = star.color;
    ctx.beginPath();
    ctx.arc(star.x,star.y,star.size,0,Math.PI*2);
    ctx.fill();
    star.y+=star.speed;
    if(star.y>canvas.height) star.y=0;
  });
  requestAnimationFrame(drawStars);
}
drawStars();

// 🧢 Clothing: brand → product → image
const hats = {
    "None": {"None":"images/hats/hat5.png"},
    "LV": {"Black LV Beanie":"images/hats/hat2.png"}
};
const hoodies = {
  "Sp5der": {"Black & White Sp5der Hoodie":"images/hoodies/hoodie1.png"},
  "Burberry": {"Black Burberry Zip-Up":"images/hoodies/hoodie4.png"},
  "Others": {"Plain Black Zip-Up":"images/hoodies/hoodie5.png","Plain Dark Blue Zip-Up":"images/hoodies/hoodie6.png"}
};
const pants = {
  "Purple Brand": {"Blue Purple Brand Jeans":"images/pants/pants2.png"},
  "Zara": {"Gray Zara Jeans":"images/pants/pants9.png","Black Zara Jeans":"images/pants/pants10.png","Blue Zara Jeans":"images/pants/pants11.png"},
  "Nike": {"Gray Nike Sweatpants":"images/pants/pants4.png","Black Nike Sweatpants":"images/pants/pants5.png","White Nike Sweatpants":"images/pants/pants6.png"}
};
const shoes = {
  "LV": {"Black & White LV Skates":"images/shoes/shoe3.png"},
  "Dior":{"Black & White Dior B30s":"images/shoes/shoe1.png","Black Dior B22s":"images/shoes/shoe2.png"},
  "Nike":{"Black Nike Air Force 1s":"images/shoes/shoe9.png"}
};

// 🔽 Populate select with optgroups
function populateSelectWithBrands(selectId, category){
  const select=document.getElementById(selectId);
  select.innerHTML="";
  for(const [brand, products] of Object.entries(category)){
    const group=document.createElement("optgroup");
    group.label=brand;
    for(const [name,path] of Object.entries(products)){
      const option=document.createElement("option");
      option.value=path;
      option.textContent=name;
      group.appendChild(option);
    }
    select.appendChild(group);
  }
  // default first product
  const firstPath=Object.values(Object.values(category)[0])[0];
  changeItem(selectId.replace("Select",""), firstPath);
}

// 🔄 Change clothing image
function changeItem(type,value){document.getElementById(type).src=value;}

// 💾 Save & Load outfit
function saveOutfit(){
  const outfit={
    hat: document.getElementById('hatSelect').value,
    hoodie: document.getElementById('hoodieSelect').value,
    pants: document.getElementById('pantsSelect').value,
    shoes: document.getElementById('shoesSelect').value
  };
  localStorage.setItem('savedOutfit',JSON.stringify(outfit));
  alert('Outfit saved!');
}

function loadOutfit(){
  const saved=JSON.parse(localStorage.getItem('savedOutfit'));
  if(saved){
    changeItem('hat',saved.hat);
    changeItem('hoodie',saved.hoodie);
    changeItem('pants',saved.pants);
    changeItem('shoes',saved.shoes);

    document.getElementById('hatSelect').value=saved.hat;
    document.getElementById('hoodieSelect').value=saved.hoodie;
    document.getElementById('pantsSelect').value=saved.pants;
    document.getElementById('shoesSelect').value=saved.shoes;

    alert('Outfit loaded!');
  } else alert('No outfit saved yet.');
}

// 🌙 Dark mode toggle (slider)
const darkModeToggle=document.getElementById('darkModeToggle');
darkModeToggle.onchange=()=>{
  darkMode=!darkMode;
  document.body.classList.toggle('dark-mode',darkMode);

  // update star colors
  stars.forEach(star=>{
    star.color = darkMode ? (Math.random()>0.5?'#7b2ff7':'#00c6ff') : '#7b2ff7';
  });

  // update select colors dynamically
  document.querySelectorAll('select').forEach(select=>{
    if(darkMode){
      select.style.background='#222';
      select.style.color='white';
    } else {
      select.style.background='white';
      select.style.color='black';
    }
  });
};

// 🚀 Init
window.onload=function(){
  populateSelectWithBrands('hatSelect',hats);
  populateSelectWithBrands('hoodieSelect',hoodies);
  populateSelectWithBrands('pantsSelect',pants);
  populateSelectWithBrands('shoesSelect',shoes);
};
